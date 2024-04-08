import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

import { Message } from 'src/models';
import { getReply } from 'src/services/nlp';

function chatStore() {
  const chatHeight = ref(500);
  const method = ref<'nlp' | 'llm'>('nlp');

  const user = ref('');
  const messages = ref([] as Message[]);

  const filteredMsgs = computed(() =>
    messages.value
      .filter((msg) => msg.method === method.value)
      .sort((a, b) => (a.time || 0) - (b.time || 0))
  );

  async function sendMessage(text: string) {
    const msg: Message = {
      id: `${messages.value.length}`,
      time: Date.now(),
      text,
      from: 'me',
      method: method.value,
    };

    messages.value.push(msg);

    const answer = await getReply(text, user.value);

    answer.method = msg.method;
    answer.from = 'bot';

    messages.value.push(answer);
  }

  function init() {
    if (!user.value) user.value = uuid();
  }

  function clear() {
    messages.value = [];
  }

  return {
    chatHeight,
    method,
    messages,
    filteredMsgs,
    init,
    sendMessage,
    clear,
  };
}

export const useChatStore = defineStore('chat', chatStore, {
  // persist: true,
  persist: { storage: sessionStorage },
});
