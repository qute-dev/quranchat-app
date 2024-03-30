import { ref } from 'vue';
import { defineStore } from 'pinia';

import { Message } from 'src/models';

function chatStore() {
  const method = ref<'nlp' | 'llm'>('nlp');

  const messages = ref<Message[]>();

  function sendMessage(text: string) {
    if (messages.value) {
      const message: Message = {
        id: `${messages.value.length}`,
        time: new Date().toISOString(),
        text,
        name: 'Me',
        from: 'me',
      };

      messages.value.push(message);
    }
  }

  function init() {
    const dummyMessages: Message[] = [];

    for (let i = 0; i < 15; i++) {
      dummyMessages.push({
        id: `${i}`,
        time: new Date(2022, 1, i + 1, 12, 30, 0).toISOString(),
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        name: `Username ${i}`,
        from: i % 2 === 0 ? 'me' : 'bot',
      });
    }

    messages.value = dummyMessages;
  }

  return { method, messages, init, sendMessage };
}

export const useChatStore = defineStore('chat', chatStore, {
  persist: { storage: sessionStorage },
});
