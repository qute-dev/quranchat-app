import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { Message } from 'src/models';

function chatStore() {
  const method = ref<'nlp' | 'llm'>('nlp');

  const messages = ref([] as Message[]);

  const filteredMsgs = computed(() =>
    messages.value.filter((msg) => msg.method === method.value)
  );

  function sendMessage(text: string) {
    const msg: Message = {
      id: `${messages.value.length}`,
      time: new Date().toISOString(),
      text,
      name: 'Me',
      from: 'me',
      method: method.value,
    };

    messages.value.push(msg);
  }

  function init() {
    if (messages.value?.length) return;

    for (let i = 0; i < 15; i++) {
      messages.value?.push({
        id: `${i}`,
        time: new Date(2022, 1, i + 1, 12, 30, 0).toISOString(),
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        name: `Username ${i}`,
        method: 'nlp',
        from: i % 2 === 0 ? 'me' : 'bot',
      });
    }
  }

  return { method, messages, filteredMsgs, init, sendMessage };
}

export const useChatStore = defineStore('chat', chatStore, {
  // persist: true,
  persist: { storage: sessionStorage },
});
