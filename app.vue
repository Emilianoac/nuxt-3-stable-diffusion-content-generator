
<script lang="ts" setup>
  import MyLoading from "@/components/MyLoading.vue";
  
  const imageStore = useImageStore();
</script>

<template>
<MyHeader/>
  <NuxtPage/>
  <UModals/>
  <UNotifications/>
  <MyLoading :loading="imageStore.isLoading"/>
</template>

<style lang="postcss">
  body {
    height: 100vh;
    background-attachment: fixed;
    @apply bg-gradient-to-bl bg-no-repeat;
    @apply bg-slate-100 dark:from-cloud-burst-900 dark:to-cloud-burst-500;
  }
</style>
