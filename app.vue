
<script lang="ts" setup>
  import MyLoading from "@/components/MyLoading.vue";

  const userStore = useUserStore();
  const imageGenerationStore = useImageGenerationStore();
</script>

<template>
<MyHeader/>
  <NuxtPage/>
  <UModals/>
  <UNotifications/>
  <MyLoading :loading="userStore.isLoading || imageGenerationStore.isLoading"/>
</template>

<style lang="postcss">
  html {
    height: 100vh;
    background-attachment: fixed;
    @apply bg-gradient-to-bl bg-no-repeat from-cloud-burst-900  to-cloud-burst-500;
  }
</style>
