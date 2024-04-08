<template>
  <q-layout view="hHr lpR lfr" style="max-width: 560px; height: 95vh; margin: auto; background-color: #f4f9ff;">
    <q-resize-observer @resize="onResize" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useChatStore } from 'src/stores/chat-store';

const chatStore = useChatStore();

function onResize() {
  // console.log('onResize', window.innerHeight, $q.screen);
  chatStore.chatHeight = window.innerHeight - 175;
}
</script>
