<template>
  <!-- TOP HEADER  -->
  <page-header title="QuranChat.me" subtitle="Menjadi lebih dekat setiap hari 💖" :icon="ionMenuOutline"
    @icon-click="showMenu = !showMenu" />

  <!-- MENU DRAWER -->
  <menu-drawer v-model="showMenu" />

  <q-page class="q-mx-md q-mt-md">
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import {
  ionMenuOutline,
} from '@quasar/extras/ionicons-v7'

import PageHeader from 'src/components/PageHeader.vue';
import MenuDrawer from 'src/components/MenuDrawer.vue';

const showMenu = ref(false);

</script>
