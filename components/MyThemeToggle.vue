<script lang="ts" setup>
  const colorMode = useColorMode();
  const isDark = computed({
    get() {
      return colorMode.value === "dark";
    },
    set(value: boolean) {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    }
  })
</script>

<template>
  <div class="flex flex-col justify-start"> 
    <span class="text-xs block mb-2 text-start">Select theme</span>
    <div class="flex items-center gap-2">
      <UToggle
        v-model="isDark"
        on-icon="heroicons:moon"
        off-icon="heroicons:sun"
      />
      <p class="text-xs text-gray-500 dark:text-slate-200 ">
        {{ isDark ? "Dark Mode" : "Light Mode" }}
      </p>

    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
