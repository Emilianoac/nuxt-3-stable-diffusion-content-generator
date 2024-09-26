<script lang="ts" setup>
  definePageMeta({ middleware: ["02-get-user-images"] });
  useSeoMeta({title: "Gallery | Pixur"});
  
  const store = useUserStore();
  const isLoadingImages = ref(true);
</script>

<template>
  <UContainer class="py-5">
    <div 
      v-if="!store.userImages.length && !store.isLoading" 
      class="text-2xl text-center dark:text-cloud-burst-400 font-bold mt-10">
      You don't have any images yet.
    </div>
    
    <div 
      v-else
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <template v-if="store.userImages.length">
        <ULink    
          :to="`/gallery/${image.name.split('.')[0]}`"
          v-for="image in store.userImages">
            <img
              :key="image.name" 
              :src="image.url" 
              @load="isLoadingImages = false"
              class="w-max h-max object-cover rounded-sm hover:opacity-80 cursor-pointer bg-cloud-burst-100"
            />
        </ULink>
      </template>
      <template v-else-if="isLoadingImages && !store.userImages.length">
        <USkeleton
          v-for="n in 12" 
          :key="n" 
          class="w-full h-64"
        />
      </template>
    </div>
  </UContainer>
</template>
