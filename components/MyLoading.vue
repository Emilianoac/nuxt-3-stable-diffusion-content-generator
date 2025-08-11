<script lang="ts" setup>
  import LogoIcon from "@/components/icons/LogoIcon.vue";

  defineProps({
    loading: Boolean,
    message: String
  })
</script>

<template>
  <div 
    v-if="loading"
    class="loading fixed bg-slate-950/30  backdrop-blur-md w-full h-full top-0 left-0 flex justify-center items-center">
    <LogoIcon class="animate-spin h-8 w-8" />
  </div>
</template>

<style scoped>
  .loading {
    z-index: 1000;
  }
</style>
