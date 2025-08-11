<script lang="ts" setup>
  const { recentImages, isLoading, getImagesHistory } = useImageHistory();

  onNuxtReady(() => {
    getImagesHistory();
  });
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
    <h2 class="text-lg font-bold mb-4">Recent generated images</h2>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="(item, index) in recentImages" :key="index" class="p-2 bg-slate-50 dark:bg-gray-700 rounded-lg">
        <img 
          :src="item.base64" 
          alt="Generated Image" 
          class="w-full h-auto rounded-md"
        />
      </div>
    </div>
    <div v-if="!recentImages.length" class="text-center text-gray-300 dark:text-gray-400 my-5">
      You don't have any generated images yet.
    </div>
  </div>
  
</template>

<style lang="postcss" scoped>
  
</style>
