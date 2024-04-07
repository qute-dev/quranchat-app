<template>
  <q-header style="background-color: #f4f9ff;">
    <q-toolbar class="q-pl-md q-pr-md q-pt-sm">
      <q-btn v-if="backButton" round flat dense color="primary" :icon="ionChevronBackOutline"
        @click="$emit('backClick')" />

      <q-img v-else src="~/assets/quranchat-logo.png" style="width:32px" to="/" class="cursor-pointer" />

      <q-toolbar-title>
        <div class="text-primary text-subtitle1 text-bold" style="line-height: normal;">{{ title }}
          <q-badge color="orange" text-color="white" label="beta" />
        </div>
        <div class="text-caption text-primary">{{ subtitle }}</div>
      </q-toolbar-title>

      <q-btn v-if="icon" color="primary" flat dense round :icon="icon" @click="$emit('iconClick')" />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ionChevronBackOutline } from '@quasar/extras/ionicons-v7';

defineProps<{
  title?: string,
  subtitle?: string,
  backButton?: boolean,
  icon?: string
}>();

defineEmits(['backClick', 'iconClick']);

</script>
