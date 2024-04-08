<template>
  <div class="q-mb-xs row items-center">
    <q-btn rounded :outline="chatStore.method !== 'nlp'" color="primary" @click="chatStore.method = 'nlp'"
      label="Classic" class="q-mr-sm" />
    <q-btn rounded :outline="chatStore.method !== 'llm'" color="primary" @click="chatStore.method = 'llm'"
      label="Gen-AI" />
    <q-space />
    <q-btn round flat color="red" :icon="ionTrashOutline" @click="clearMsgs" />
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ionTrashOutline } from '@quasar/extras/ionicons-v7';

import { useChatStore } from 'src/stores/chat-store';

const $q = useQuasar();
const chatStore = useChatStore();

function clearMsgs() {
  $q.dialog({
    message: 'Hapus semua chat?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    chatStore.clear();
  });
}

</script>
