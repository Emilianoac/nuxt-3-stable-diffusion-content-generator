
<script lang="ts" setup>
  import { useDark } from "@vueuse/core";
  import MyLoading from "@/components/MyLoading.vue";

  const userStore = useUserStore();
  const imageGenerationStore = useImageGenerationStore();

  useDark();
</script>

<template>
<MyHeader/>
  <NuxtPage/>
  <UModals/>
  <UNotifications/>
  <MyLoading :loading="userStore.isLoading || imageGenerationStore.isLoading"/>
</template>

<style lang="postcss">
  body {
    height: 100vh;
    background-attachment: fixed;
    @apply bg-gradient-to-bl bg-no-repeat;
    @apply bg-slate-100 dark:from-cloud-burst-900 dark:to-cloud-burst-500;
  }
</style>
