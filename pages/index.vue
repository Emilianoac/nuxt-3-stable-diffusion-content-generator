<script lang="ts" setup>
  const {globalState} = useGlobalState();
  import saveImage from "@/utils/saveImage";

  // Define page title and description
  useSeoMeta({
    title: "Pixur | AI Image Generator",
    description: "Pixur is an AI Image Generator."
  });

  // Check if image details modal is open
  const isImageDetailsOpen = ref(false)

  // Save generated image.
  async function handleSave() {
    await saveImage(globalState.generatedImage);
  }
</script>

<template>
  <UContainer class="my-5">
    <MyLoading 
      :loading="globalState.generatedImage.isPending" 
      message="Generating Image..."
    />
    <MyLoading 
      :loading="globalState.savingImage.isPending" 
      message="Saving Image..."
    />
    <div class="grid lg:grid-cols-3 gap-5">
      <div class="order-1 lg:order-0">
        <FormCreateImage/>
      </div>
      <div class="lg:col-span-2 flex justify-center items-center order-0 lg:order-1">
        <!-- Placholder Image -->
        <Icon 
          v-if="!globalState.generatedImage.data?.base64" 
          class=" text-[10em] lg:text-[20em] text-cloud-burst-500" 
          name="material-symbols:image-outline"
        />
        <!-- Generated Image -->
        <div v-else class="relative">
          <img 
            class="rounded-md lg:h-[85vh]" 
            :src="globalState.generatedImage.data.base64"
          />
          <!-- Actions -->
          <div class="absolute flex items-center justify-end top-0 right-0 p-2 w-full bg-gradient-to-b from-black to-black/0 ">
            <UTooltip 
              :text="!globalState.savingImage.status ? 'Save image' : 'Image is already saved' ">
              <UButton 
                size="xs" 
                :disabled="globalState.savingImage.status"
                color="primary"
                @click="handleSave"
                class="me-2 font-bold disabled:opacity-50">
                  <Icon name="material-symbols:save"/>
              </UButton>
            </UTooltip>
            <UTooltip text="Download Image">
              <UButton 
                size="xs" 
                color="black"
                class="me-2 font-bold" 
                :to="globalState.generatedImage.data.base64" 
                download="generatedImage.png">
                  <Icon name="material-symbols:download-2"/>
              </UButton>
            </UTooltip>
            <UTooltip text="Image Details">
              <UButton 
                color="black" 
                label="Open" 
                @click="isImageDetailsOpen = true">
                <Icon name="material-symbols:info-outline"/>
              </UButton>
            </UTooltip>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
  <!-- Generated image details -->
  <UModal v-model="isImageDetailsOpen">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold leading-6 text-gray-900 dark:text-white">
            Image Details
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isImageDetailsOpen = false" />
        </div>
      </template>
      <ul class="max-h-[400px] overflow-auto">
        <li v-for="(value, key, index) in globalState.generatedImage.data">
          <p class="font-bold ">{{ key.split("_").join(" ") }}</p>
          <p class="opacity-70">{{ value }}</p>
          <hr class="my-2 opacity-15">
        </li>
      </ul>
    </UCard>
  </UModal>

  <!-- Error Alert -->
  <UModal v-model="globalState.generatedImage.error.status">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold leading-6 text-gray-900 dark:text-white">
            An error ocurred
          </h3>
          <UButton 
            color="gray" 
            variant="ghost" 
            icon="i-heroicons-x-mark-20-solid" 
            class="-my-1" 
            @click="globalState.generatedImage.error.status = false" 
          />
        </div>
      </template>
      <div class="p-5 text-center">
        <Icon name="material-symbols:warning" class="text-4xl text-red-500"/>
        <p class="mt-3"> {{ globalState.generatedImage.error.message }} </p>
      </div>
    </UCard>
  </UModal>
</template>

