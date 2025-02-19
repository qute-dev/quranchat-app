import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

import { Message } from 'src/models';
import { getReply } from 'src/services/nlp';

function chatStore() {
  const chatHeight = ref(500);
  const method = ref<'nlp' | 'llm'>('nlp');

  const userId = ref('');
  const messages = ref([] as Message[]);

  const filteredMsgs = computed(() =>
    messages.value
      .filter((msg) => msg.method === method.value)
      .sort((a, b) => (a.time || 0) - (b.time || 0))
  );

  async function sendMessage(text: string) {
    init();

    const msg: Message = {
      id: uuid(),
      time: Date.now(),
      text,
      from: 'user',
      method: method.value,
    };

    messages.value.push(msg);

    let answer: Message;

    try {
      answer = await getReply(text, userId.value);
    } catch (err) {
      console.error(err);

      answer = {
        id: uuid(),
        text: `Error send message: ${err}`,
        from: 'bot',
        method: msg.method,
        time: Date.now(),
      };
    }

    answer.method = msg.method;
    answer.from = 'bot';

    // update waktu biar ga overlap
    msg.time = (answer.time || Date.now()) - 1000;

    messages.value.push(answer);
  }

  function init() {
    if (!userId.value) userId.value = uuid();
  }

  function clear() {
    messages.value = [];
  }

  return {
    chatHeight,
    userId,
    method,
    messages,
    filteredMsgs,
    init,
    sendMessage,
    clear,
  };
}

export const useChatStore = defineStore('chat', chatStore, {
  persist: true,
  // persist: { storage: localStorage },
});
