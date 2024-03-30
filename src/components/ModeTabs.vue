<template>
  <div class="q-mt-md q-mb-sm q-px-md row items-center">
    <q-btn rounded :outline="chatStore.method !== 'nlp'" color="primary" @click="chatStore.method = 'nlp'"
      label="Classic" class="q-mr-sm" />
    <q-btn rounded :outline="chatStore.method !== 'llm'" color="primary" @click="chatStore.method = 'llm'"
      label="Gen-AI" />
  </div>
  <div class="q-mt-sm q-px-md text-caption">
    <div v-if="chatStore.method === 'nlp'">Cara singkat dan tepat, gunakan kata kunci dan perintah untuk eksplorasi.
    </div>
    <div v-else-if="chatStore.method === 'llm'">Lebih interaktif dg generatif AI (experimental).</div>
  </div>
</template>

<script setup lang="ts">

import { useChatStore } from 'src/stores/chat-store';

const chatStore = useChatStore();

</script>
