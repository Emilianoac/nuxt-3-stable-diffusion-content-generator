
<script lang="ts" setup>
  const store = useUserStore();
</script>

<template>
  <MyLoading :loading="store.isLoading"/>
  <MyHeader/>
  <NuxtPage/>
  <UModals/>
  <UNotifications/>
</template>

<style lang="postcss">
  html {
    height: 100vh;
    background-attachment: fixed;
    @apply bg-gradient-to-bl bg-no-repeat from-cloud-burst-900  to-cloud-burst-500;
  }
</style>
