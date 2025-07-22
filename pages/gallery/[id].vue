<script lang="ts" setup>
  import formatDate from "@/utils/formatDate";

  const route = useRoute();
  const id = route.params.id;

  const { getSingleImage, image, isLoading, error } = useUserImages();

  onNuxtReady(async () => {
    if (id) {
      await getSingleImage(id as string);
    }
  });
</script>

<template>
  <UContainer class="py-5">
    
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10 ">
      <USkeleton class="w-full md:h-[80vh] h-[400px]" />
      <USkeleton class="w-full md:h-[80vh] h-[600px]" />
    </div>

    <div v-if="image">
      <div class="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10">
        <div>
          <img class="w-full rounded-md" :src="image.url" alt="">
        </div>
        <div>
          <p class="mb-3 dark:text-cloud-burst-300 text-sm">{{ formatDate(image.timestamp) }}</p>

          <div class="mb-5">
            <p className="font-bold mb-1">Prompt</p>
            <p class="bg-slate-200 dark:bg-cloud-burst-700 p-3 rounded-md">
              {{ image.prompt }}
            </p>
          </div>
          <div class="mb-5" v-if="image.negative_prompt">
            <p className="font-bold mb-1">Negative Promt</p>
            <p class="bg-slate-200 dark:bg-cloud-burst-700 p-3 rounded-md">
              {{ image.negative_prompt }}
            </p>
          </div>
          <!--SEED-->
          <div class="mb-5">
            <p className="font-bold mb-1">Seed</p>
            <p class="bg-slate-200 dark:bg-cloud-burst-700 p-3 rounded-md">
              {{ image.seed }}
            </p>
          </div>
          <!--STEPS-->
          <div class="mb-5">
            <p className="font-bold mb-1">Steps</p>
            <p class="bg-slate-200 dark:bg-cloud-burst-700 p-3 rounded-md">
              {{ image.steps }}
            </p>
          </div>    
          <!--DIMENSIONS-->
          <div class="mb-5">
            <p className="font-bold mb-1">Dimensions</p>
            <p class="bg-slate-200 dark:bg-cloud-burst-700 p-3 rounded-md">
              {{ image.dimensions }}
            </p>
          </div>
          <!--cfg scale-->
          <div class="mb-5">
            <p className="font-bold mb-1">CFG Scale</p>
            <p class="bg-slate-200 dark:bg-cloud-burst-700 p-3 rounded-md">
              {{ image.cfg_scale }}
            </p>
          </div>
          <!-- MODEL -->
          <div class="mb-5">
            <p className="font-bold mb-1">Model</p>
            <p class="bg-slate-200 dark:bg-cloud-burst-700 p-3 rounded-md">
              {{ image.model }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
  
  <div class="text-center" v-if="error.status">
    <p class="text-2xl text-slate-500 dark:text-cloud-burst-400 font-bold mt-10">
      {{error.message || "An error occurred while fetching the image."}}
    </p>
    <UButton to="/" class=" mt-5 text-center">
      Go back to home
    </UButton>
  </div>
</template>

<style lang="postcss" scoped>
  
</style>
