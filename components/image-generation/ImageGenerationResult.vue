<script lang="ts" setup>
  const imageGenerationStore = useImageGenerationStore();
  const { processImageAndSave, error } = useImageGeneration();
  const toast = useToast();
  const isImageDetailsOpen = ref(false);


  async function handleSave() {
    await processImageAndSave();

    if (!error.value.status) {
      toast.add({
        title: "Image saved successfully",
        description: "Your image has been saved to your account.",
        color: "green",
      });
    } else {
      toast.add({
        title: "Error saving image",
        description: error.value.message,
        color: "red",
      });
    }
  }
</script>

<template>
  <!-- Placeholder Image -->
  <Icon v-if="!imageGenerationStore.generatedImage.isGenerated" class=" text-[10em] lg:text-[20em] text-slate-300 dark:text-cloud-burst-500" name="material-symbols:image-outline"/>
  
  <div v-else>
    <!-- Actions -->
    <div class="flex items-center justify-end top-0 right-0 py-2 w-full">
      <UTooltip :text="!imageGenerationStore.generatedImage.isSaved ? 'Save image' : 'Image is already saved'">
        <UButton size="xs" :disabled="imageGenerationStore.generatedImage.isSaved" color="primary" @click="handleSave"
          class="me-2 font-bold disabled:opacity-50">
          <Icon name="material-symbols:save" />
        </UButton>
      </UTooltip>
      <UTooltip text="Download Image">
        <UButton size="xs" color="black" class="me-2 font-bold" :to="imageGenerationStore.generatedImage.base64"
          download="generatedImage.png">
          <Icon name="material-symbols:download-2" />
        </UButton>
      </UTooltip>
      <UTooltip text="Image Details">
        <UButton color="black" label="Open" @click="isImageDetailsOpen = true">
          <Icon name="material-symbols:info-outline" />
        </UButton>
      </UTooltip>
    </div>

    <!-- Generated Image -->
    <img class="rounded-md lg:h-[80vh]" :src="imageGenerationStore.generatedImage.base64" />
  </div>

  <!-- Generated image details -->
  <UModal v-model="isImageDetailsOpen">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold leading-6 text-gray-900 dark:text-white"> Image Details</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isImageDetailsOpen = false" />
        </div>
      </template>
      <ul class="max-h-[400px] overflow-auto">
        <li v-for="(value, key, index) in imageGenerationStore.generatedImage.data" :key="index">
          <template v-if="value">
            <p class="font-bold ">{{ key.split("_").join(" ") }}</p>
            <p class="opacity-70">{{ value }}</p>
            <hr class="my-2 opacity-15">
          </template>
        </li>
      </ul>
    </UCard>
  </UModal>
</template>

<style lang="postcss" scoped></style>
