<template>
  <div class="bg-grey-2 q-mt-sm" style="border-radius: 16px">
    <!-- MESSAGES  -->
    <q-scroll-area ref="msgScroll" style="height: 70vh;">
      <q-list class="q-px-md">
        <template v-for="(msg) in chatStore.filteredMsgs" :key="msg.id">
          <q-chat-message :text="generateTexts(msg)" :text-html="msg.from === 'bot'" :sent="msg.from === 'me'"
            :bg-color="msg.from === 'me' ? 'teal-2' : 'grey-3'" :text-color="msg.from === 'me' ? 'black' : 'black'"
            class="cursor-pointer" @click="msg.from === 'bot'" />
          <div v-if="msg.from === 'bot' && msg.data?.next" class="full-width text-center">
            <q-btn dense rounded outline color="primary" label="Lanjut" class="q-px-sm" @click="nextResult" />
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

import { ionPaperPlaneOutline } from '@quasar/extras/ionicons-v7';

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

async function scrollToBottom() {
  await sleep(100);
  msgScroll?.value?.setScrollPercentage('vertical', 1);
}

function generateTexts(msg: Message) {
  const texts = [msg.text || ''];

  const chapter = msg.data?.chapter;

  if (chapter) {
    let title = `QS ${chapter.name}`;

    if (msg.data?.verses?.length === 1) title += `:${msg.data?.verses[0].verse}`

    texts.push(title);
  }

  if (msg.data?.verses && msg.data?.translations) {
    for (let i = 0; i < msg.data.verses.length; i++) {
      const verse = msg.data.verses[i];
      const trans = msg.data.translations[i];

      if (!chapter) {
        texts.push(`QS ${verse.chapter}:${verse.verse}`);
      }

      texts.push(`<div class="text-right text-h5">${verse.text}<span class="text-caption"> (${verse.verse})</span></div>`);
      texts.push(`<div class="text-italic"">${trans.text}</div>`);
    }
  }

  return texts;
}

async function sendMessage() {
  if (!msgText.value || chatStore.method === 'llm') return;

  const offset = msgScroll?.value?.getScrollPosition();

  await chatStore.sendMessage(msgText.value);
  msgText.value = '';

  msgScroll?.value?.setScrollPosition('vertical', (offset?.top || 0) + 400, 250);
};

async function nextResult() {
  msgText.value = 'lanjut';

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
