<script lang="ts" setup>
  import formatDate from "@/utils/formatDate";
  import type { ImageData} from "@/types/index";

  const route = useRoute();
  const store = useUserStore();;

  const id = route.params.id;
  let imageData = ref<ImageData  | null >(null);

  watchEffect( async () => {
    if (store.user == null && store.isLoading === false) navigateTo("/");

    if ( store.user) {
      imageData.value = await store.getImageById(id as string) ?? null;
      document.title = `${imageData.value?.prompt} | Pixur`;
    }
  });
</script>

<template>
  <UContainer class="py-5">
    <div v-if="imageData && !store.isLoading">
      <div class="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10">
        <div>
          <img class="w-full rounded-md" :src="imageData.url" alt="">
        </div>
        <div>
          <p class="mb-3 dark:text-cloud-burst-300 text-sm">{{ formatDate(imageData.timestamp) }}</p>

          <div class="mb-5">
            <p className="dark:text-white font-bold mb-1">Prompt</p>
            <p class="dark:text-white border dark:bg-cloud-burst-500 dark:border-cloud-burst-800 p-3 rounded-md">
              {{ imageData.prompt }}
            </p>
          </div>
          <div class="mb-5" v-if="imageData.negative_prompt">
            <p className="dark:text-white font-bold mb-1">Negative Promt</p>
            <p class="dark:text-white border dark:bg-cloud-burst-500 dark:border-cloud-burst-800 p-3 rounded-md">
              {{ imageData.negative_prompt }}
            </p>
          </div>
          <!--SEED-->
          <div class="mb-5">
            <p className="dark:text-white font-bold mb-1">Seed</p>
            <p class="dark:text-white border dark:bg-cloud-burst-500 dark:border-cloud-burst-800 p-3 rounded-md">
              {{ imageData.seed }}
            </p>
          </div>
          <!--STEPS-->
          <div class="mb-5">
            <p className="dark:text-white font-bold mb-1">Steps</p>
            <p class="dark:text-white border dark:bg-cloud-burst-500 dark:border-cloud-burst-800 p-3 rounded-md">
              {{ imageData.steps }}
            </p>
          </div>    
          <!--DIMENSIONS-->
          <div class="mb-5">
            <p className="dark:text-white font-bold mb-1">Dimensions</p>
            <p class="dark:text-white border dark:bg-cloud-burst-500 dark:border-cloud-burst-800 p-3 rounded-md">
              {{ imageData.dimensions }}
            </p>
          </div>
          <!--cfg scale-->
          <div class="mb-5">
            <p className="dark:text-white font-bold mb-1">CFG Scale</p>
            <p class="dark:text-white border dark:bg-cloud-burst-500 dark:border-cloud-burst-800 p-3 rounded-md">
              {{ imageData.cfg_scale }}
            </p>
          </div>
          <!-- MODEL -->
          <div class="mb-5">
            <p className="dark:text-white font-bold mb-1">Model</p>
            <p class="dark:text-white border dark:bg-cloud-burst-500 dark:border-cloud-burst-800 p-3 rounded-md">
              {{ imageData.model }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
  <div class="text-center" v-if="!imageData && !store.isLoading" >
    <p class="text-2xl dark:text-cloud-burst-400 font-bold mt-10">
      This image does not exist.
    </p>
    <UButton to="/" class=" mt-5 text-center">
      Go back to home
    </UButton>
  </div>
</template>

<style lang="postcss" scoped>
  
</style>
