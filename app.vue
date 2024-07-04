
<script lang="ts" setup>
  const {globalState} = useGlobalState();
</script>

<template>
  <MyLoading :loading="globalState.loading"/>
  <MyHeader/>
  <NuxtPage/>
  <UModals/>
</template>

<style lang="postcss">
  html {
    height: 100vh;
    background-attachment: fixed;
    @apply bg-gradient-to-bl bg-no-repeat from-cloud-burst-900  to-cloud-burst-500;
  }
</style>
