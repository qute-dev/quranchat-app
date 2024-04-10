<template>
  <div></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
  const url = 'https://play.google.com/store/apps/details?id=org.qute.quranchat.mobile'

  window.location.href = url;
});
</script>
