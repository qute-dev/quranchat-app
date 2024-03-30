<template>
  <div class="bg-grey-2 q-mt-sm" style="border-radius: 16px">
    <!-- MESSAGES  -->
    <q-scroll-area ref="msgScroll" style="height: 70vh;">
      <q-list class="q-px-md">
        <template v-for="(msg, index) in chatStore.filteredMsgs" :key="index">
          <q-chat-message :name="msg.name" :text="[msg.text]" :sent="msg.from === 'me'"
            :bg-color="msg.from === 'me' ? 'teal-2' : 'grey-1'" :text-color="msg.from === 'me' ? 'black' : 'black'"
            class="cursor-pointer" @click="msg.from === 'bot' && copyText(msg.text)" />
        </template>
      </q-list>
    </q-scroll-area>

    <!-- INPUT -->
    <q-input outlined rounded autofocus v-model="msgText" dense @keydown.enter="sendMessage" class="q-my-sm">
      <template v-slot:append>
        <q-btn dense flat :icon="ionPaperPlaneOutline" @click="sendMessage" class="q-ml-xs" />
      </template>
    </q-input>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { QScrollArea, copyToClipboard, useQuasar } from 'quasar';

import { ionPaperPlaneOutline } from '@quasar/extras/ionicons-v7';

import { useChatStore } from 'src/stores/chat-store';
import { sleep } from 'src/utils';

const chatStore = useChatStore();
const $q = useQuasar();

const msgScroll = ref<QScrollArea>();
const msgText = ref('');

watch(
  () => chatStore.method,
  () => scrollToBottom(),
  { immediate: true }
)

async function scrollToBottom() {
  await sleep(100);
  msgScroll?.value?.setScrollPercentage('vertical', 1);
}

async function sendMessage() {
  await chatStore.sendMessage(msgText.value);
  msgText.value = '';
  await scrollToBottom();
};

async function copyText(text: string) {
  await copyToClipboard(text);
  $q.notify({ message: 'Text copied to clipboard', timeout: 500, color: 'info' });
}

onMounted(async () => {
  await chatStore.init();
  await scrollToBottom();
})

</script>
