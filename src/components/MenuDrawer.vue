<template>
  <q-dialog v-model="value" value position="bottom">
    <q-card class="full-width">
      <q-list>
        <menu-item title="BERANDA" :icon="ionHomeOutline" to="/" />
        <menu-item title="INSTAGRAM" :icon="ionLogoInstagram" href="https://instagram.com/quranchat.me"
          target="_blank" />
        <menu-item title="QUTE RESEARCH" :icon="ionEggOutline" href="https://qute.dev" target="_blank" />
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {
  ionEggOutline,
  ionHomeOutline,
  ionLogoInstagram,
} from '@quasar/extras/ionicons-v7'

import MenuItem from './MenuItem.vue';
import { computed } from 'vue';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

</script>
