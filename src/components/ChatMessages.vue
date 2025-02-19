<template>
  <div class="bg-grey-2 q-mt-sm" style="border-radius: 16px;">
    <!-- MESSAGES  -->
    <q-scroll-area ref="msgScroll" :style="`height: ${chatStore.chatHeight}px;`">
      <q-list class="q-px-md">
        <!-- NO MESSAGE -->
        <div v-if="!chatStore.filteredMsgs.length" class="text-center">
          <div v-if="chatStore.method === 'nlp'" class="column items-center full-width">
            <q-badge>Cepat & tepat dg kata kunci/perintah.</q-badge>
            <div class="row items-center q-gutter-x-xs q-pt-sm">
              <q-btn v-for="text in samples" :key="text" rounded outline dense size="sm" color="primary" :label="text"
                @click="sendText(text)" class="q-px-sm q-my-xs" />
            </div>
            <div class="row q-mt-md q-gutter-x-md">
              <div v-if="!$q.platform.is.nativeMobileWrapper" class="q-mt-md">
                <q-btn rounded color="secondary" glossy label="INSTALL APP" :icon="ionLogoGooglePlaystore" to="/apk" />
              </div>
              <div class="q-mt-md">
                <q-btn rounded color="info" glossy label="CARA PAKAI" :icon="ionHelpBuoyOutline"
                  href="https://www.instagram.com/p/C5pbe2fyXN-/" target="_blank" />
              </div>
            </div>
          </div>
          <q-badge v-else-if="chatStore.method === 'llm'">Lebih interaktif dg generatif AI (segera hadir).</q-badge>
        </div>
        <!-- LIST MESSAGE -->
        <template v-for="(msg, index) in chatStore.filteredMsgs" :key="index">
          <q-chat-message :text="generateTexts(msg)" :text-html="msg.from === 'bot'" :sent="msg.from === 'user'"
            :bg-color="msg.from === 'user' ? 'teal-2' : 'grey-2'" :text-color="msg.from === 'user' ? 'black' : 'black'"
            class="cursor-pointer" @click="msg.from === 'bot'" />
          <div v-if="msg.from === 'bot' && msg.data?.next" class="full-width text-center">
            <q-btn dense rounded outline color="primary" label="Lanjut" class="q-px-sm" @click="sendText('lanjut')" />
          </div>
        </template>
      </q-list>
    </q-scroll-area>

    <!-- INPUT -->
    <q-input ref="msgInput" outlined rounded autofocus dense v-model="msgText"
      :placeholder="chatStore.method === 'llm' ? 'Coming Soon...' : 'Masukkan keyword/perintah'"
      @keydown.enter="sendMessage" class="q-my-sm">
      <template v-slot:append>
        <q-btn dense flat round color="primary" :disable="chatStore.method === 'llm'" :icon="ionPaperPlaneOutline"
          @click="sendMessage" class="q-ml-xs" />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { QInput, QScrollArea, copyToClipboard, useQuasar } from 'quasar';

import {
  ionPaperPlaneOutline,
  ionLogoGooglePlaystore,
  ionHelpBuoyOutline
} from '@quasar/extras/ionicons-v7';

import { useChatStore } from 'src/stores/chat-store';
import { sleep } from 'src/utils';
import { Message } from 'src/models';

const chatStore = useChatStore();
const $q = useQuasar();

const msgScroll = ref<QScrollArea>();
const msgInput = ref<QInput>();
const msgText = ref('');

watch(
  () => chatStore.method,
  async () => {
    msgInput.value?.focus();
    await scrollToBottom();
  },
  { immediate: true }
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const samples = ref(['al ikhlas', 'an nahl 3-10', 'malaikat', '2 185', 'surat 114', 'ar rahman', 'nikah', 'rezeki']);

async function scrollToBottom() {
  await sleep(100);
  msgScroll?.value?.setScrollPercentage('vertical', 1);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateTexts(msg: Message) {
  const texts = [msg.text || ''];

  const chapter = msg.data?.chapter;

  if (chapter) {
    let title = `<div class=text-subtitle1>\uFD3E QS. ${chapter.name} (${chapter.id})`;

    if (msg.data?.verses) {
      const { verses } = msg.data;

      if (verses.length > 0) title += ` : ${verses[0].verse}`;
      if (verses.length > 1) title += ` - ${verses[verses.length - 1].verse}`;
    }

    title += ' \uFD3F</div>';

    texts.push(title);
  }

  if (msg.data?.verses && msg.data?.translations) {
    for (let i = 0; i < msg.data.verses.length; i++) {
      const verse = msg.data.verses[i];
      const trans = msg.data.translations[i];

      // jaga2 kalau kosongan
      if (!verse || !trans) continue;

      if (!chapter) {
        texts.push(`QS. ${verse.chapter}:${verse.verse}`);
      }

      texts.push(`<div class="text-right text-h5">${verse.text} <span class="text-subtitle1">(${arabicNumber(verse.verse)})</span></div>`);
      texts.push(`<div class="text-italic"">${trans.verse}. ${trans.text}</div>`);
    }
  }

  return texts;
}

function arabicNumber(num: number) {
  const numberArr = num.toString().split('');
  const arabicArr = numberArr.map((s) => String.fromCharCode(0x0660 + parseInt(s)));

  return arabicArr.join('');
};

async function sendMessage() {
  if (!msgText.value || chatStore.method === 'llm') return;

  // msgScroll?.value?.setScrollPercentage('vertical', 1);
  await scrollToBottom();
  await sleep(100);

  const offset = msgScroll?.value?.getScrollPosition();
  const top = offset?.top === 0 ? 0 : (offset?.top || 0) + 400;

  await chatStore.sendMessage(msgText.value);
  msgText.value = '';

  msgScroll?.value?.setScrollPosition('vertical', top, 300);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function sendText(text: string) {
  msgText.value = text;
  await sendMessage();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function copyText(text: string) {
  await copyToClipboard(text);
  $q.notify({ message: 'Text copied to clipboard', timeout: 500, color: 'info' });
}

onMounted(async () => {
  await chatStore.init();
  await scrollToBottom();
})

</script>
