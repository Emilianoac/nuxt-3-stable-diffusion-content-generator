<script lang="ts" setup>
  useSeoMeta({title: "Gallery | Pixur"});
  
  const { getPaginatedImages, images, hasLoadedOnce } = useUserImages();

  onNuxtReady(() => {
    if (!images.value.length) {
      getPaginatedImages();
    }
  });
</script>

<template>
  <UContainer class="py-5">
    <div v-if="hasLoadedOnce && !images.length" class="text-2xl text-center dark:text-cloud-burst-400 font-bold mt-10">
      You don't have any images yet.
    </div>
    
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <template v-if="images.length">
        <ULink    
          :to="`/gallery/${image.name.split('.')[0]}`"
          v-for="image in images">
            <img
              :key="image.name" 
              :src="image.url" 
              class="w-max h-max object-cover rounded-sm hover:opacity-80 cursor-pointer bg-cloud-burst-100"
            />
        </ULink>
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
