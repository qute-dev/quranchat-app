<template>
  <q-page class="column">
    <!-- TOP HEADER  -->
    <page-header title="QuranChat.me" subtitle="Jadi lebih dekat setiap hari 💖" :icon="ionMenuOutline"
      @icon-click="showMenu = !showMenu" />

    <!-- MENU DRAWER -->
    <menu-drawer v-model="showMenu" />

    <div class="q-mx-md q-pt-xs">
      <mode-tabs />
      <chat-messages />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import {
  ionMenuOutline,
} from '@quasar/extras/ionicons-v7'

import PageHeader from 'src/components/PageHeader.vue';
import MenuDrawer from 'src/components/MenuDrawer.vue';
import ChatMessages from 'src/components/ChatMessages.vue';
import ModeTabs from 'src/components/ModeTabs.vue';

const showMenu = ref(false);

</script>
