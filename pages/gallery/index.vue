<script lang="ts" setup>
  const {globalState} = useGlobalState();

  // Define page title
  useSeoMeta({
    title: "Gallery | Pixur"
  });

</script>

<template>
  <UContainer class="py-5">
    <div 
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <template v-if="Object.keys(globalState.images).length">
        <img 
        v-for="image in  globalState.images" 
        :key="image.name" 
        loading="lazy"
        :src="image.url" 
        class="w-full h-full object-cover rounded-sm hover:opacity-80 cursor-pointer"
        />
      </template>
      <template v-else>
        <USkeleton
          v-for="n in 12" 
          :key="n" 
          class="w-full h-64"
        />
      </template>
    </div>
  </UContainer>
</template>
