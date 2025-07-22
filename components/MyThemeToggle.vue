<script lang="ts" setup>
  import { useDark, useToggle } from "@vueuse/core";

  const isDark = useDark();
  const toggle = useToggle(isDark);
</script>

<template>
  <button 
    @click="toggle()" 
    aria-label="Switch theme" 
    class="p-2 w-8 h-8 rounded-full flex justify-center items-center bg-slate-100 hover:bg-slate-200 dark:bg-cloud-burst-700 hover:dark:bg-cloud-burst-500 border border-slate-200 dark:border-cloud-burst-500">
      <UTooltip
        :text="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
        <Icon name="material-symbols:dark-mode" v-if="isDark" />
        <Icon name="material-symbols:light-mode" v-else />
      </UTooltip>
  </button>
</template>

<style lang="postcss" scoped></style>
