<script lang="ts" setup>

  interface FormCreateImageProps {
    imageResult: {
      link: string
      isPending: boolean
      error: {
        status: boolean
        message: string
      }
    },
    imageParams: {
      prompt: string
      negative_prompt: string
      style_preset: string
      seed: number
      steps: number
      cfg_scale: number,
      model: string
      width: number
      height: number
    }
  }

  const isImageDetailsOpen = ref(false)

  // Reactive state for new image
  const newImage = reactive({
    link: "",
    isPending: false,
    error: {
      status: false,
      message: ""
    }
  })

  // Reactive state for image params
  const imageParams = reactive({
    prompt: "",
    negative_prompt: "",
    style_preset: "",
    seed: 0,
    steps:0,
    cfg_scale: 0,
    model: "stable-diffusion-xl-1024-v1-0",
    width: "1024px",
    height: "1024px"
  })
  
  /**
   * Handle new image event from FormCreateImage component
   * @param data
   */
  function onNewImage(data : FormCreateImageProps) {
    newImage.link = data.imageResult.link
    newImage.isPending = data.imageResult.isPending
    newImage.error.message = data.imageResult.error.message
    newImage.error.status = data.imageResult.error.status
    imageParams.prompt = data.imageParams.prompt
    imageParams.negative_prompt = data.imageParams.negative_prompt
    imageParams.style_preset = data.imageParams.style_preset
    imageParams.seed = data.imageParams.seed
    imageParams.steps = data.imageParams.steps
    imageParams.cfg_scale = data.imageParams.cfg_scale
  }

  function reloadPage() {
    window.location.reload()
  }
</script>

<template>
  <UContainer class="my-5">
    <MyLoading :loading="newImage.isPending" message="Generating Image..."/>
    <div class="grid lg:grid-cols-3 gap-5">
      <div class="order-1 lg:order-0">
        <FormCreateImage @new-image="onNewImage"/>
      </div>
      <div class="lg:col-span-2 flex justify-center items-center order-0 lg:order-1">
        <!-- Placholder Image -->
        <Icon 
          v-if="!newImage.link" 
          class=" text-[10em] lg:text-[20em] text-cloud-burst-500" 
          name="material-symbols:image-outline"
        />
        <!-- Generated Image -->
        <div v-if="newImage.link" class="relative">
          <img class="rounded-md lg:h-[85vh]" :src="newImage.link">
          <!-- Actions -->
          <div class="absolute flex items-center justify-end top-0 right-0 p-2 w-full bg-gradient-to-b from-black to-black/0 ">
            <UButton 
              size="xs" 
              color="black"
              class="me-2 font-bold" 
              :to="newImage.link" 
              download="newImage.png">
                Download Image <Icon name="material-symbols:download-2"/>
            </UButton>
            <UTooltip text="Image Details">
              <UButton color="black" label="Open" @click="isImageDetailsOpen = true">
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
        <li v-for="(value, key, index) in imageParams">
          <template v-if="value">
            <p class="font-bold ">{{ key.split("_").join(" ") }}</p>
            <p class="opacity-70">{{ value }}</p>
            <hr class="my-2 opacity-15">
          </template>
        </li>
      </ul>
    </UCard>
  </UModal>

  <!-- Error Alert -->
  <UModal v-model="newImage.error.status">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold leading-6 text-gray-900 dark:text-white">
            An error ocurred
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="newImage.error.status = false" />
        </div>
      </template>
      <div class="p-5 text-center">
        <Icon name="material-symbols:warning" class="text-4xl text-red-500"/>
        <p class="mt-3"> {{ newImage.error.message }} </p>
        <div v-if="newImage.error.message === 'CSRF Token Mismatch'">
          <p class="text-xs"> Please reload the page </p>
          <UButton color="white" class="mt-3" @click="reloadPage">Reload Page</UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

