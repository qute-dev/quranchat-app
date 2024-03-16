import { ref } from 'vue';
import { defineStore } from 'pinia';

import { Message } from 'src/models';

function chatStore() {
  const messages = ref<Message[]>();

  return { messages };
}

export const usechatStore = defineStore('booking', chatStore, {
  persist: { storage: sessionStorage },
});
