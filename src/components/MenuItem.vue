<template>
  <q-item clickable :to="to">
    <q-item-section avatar>
      <q-icon color="primary" :name="icon" size="sm" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineProps<{ to: string, title: string, icon: string }>();
</script>
