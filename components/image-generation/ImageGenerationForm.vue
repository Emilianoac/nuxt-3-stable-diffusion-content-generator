<script lang="ts" setup>
  import { imageSchema, type ImageSchema } from "@/schemas/imageSchema";
  import type { FormSubmitEvent } from "#ui/types";
  import ModalLogin from "@/components/ModalLogin.vue";

  const userStore = useUserStore();
  const { generateImage, newImageParams, error } = useImageGeneration();
  const modal = useModal();

  async function onSubmit (event: FormSubmitEvent<ImageSchema>) {
    if (!userStore.user) return modal.open(ModalLogin);
    await generateImage(event.data);
  }
</script>

<template>
  <!-- Image Generation Form -->
  <UForm 
    class="bg-white dark:bg-cloud-burst-800 space-y-4 p-4 rounded-md" 
    :schema="imageSchema" 
    :state="newImageParams" 
    @submit="onSubmit">
    <h1 class="font-bold text-lg">Create a new image</h1>

    <!-- Prompt -->
    <UFormGroup 
      name="prompt"
      :ui="{label: { base: 'flex justify-between items-center w-full mb-1'}}">
      <template #label>
        <span>Prompt</span>
        <UPopover :ui="{wrapper: 'flex'}">
          <UButton 
            size="2xs" 
            :padded="false" 
            color="cloud-burst" 
            :ui="{ rounded: 'rounded-full'}" 
            icon="i-heroicons-information-circle-20-solid"
          />
          <template #panel>
            <div class="p-4">
              <p> The prompt is a parameter that tells Stable Diffusion <br>
                what you want to see in the generated images. <br>
                e.g. "a cat in the forest sleeping on a tree" <br>
              </p>
            </div>
          </template>
        </UPopover>
      </template>
      <template #default>
        <UTextarea v-model="newImageParams.prompt" placeholder="Insert prompt" />
      </template> 
    </UFormGroup>

    <!-- Negative Prompt -->
    <UFormGroup 
      name="negative_prompt"
      :ui="{label: { base: 'flex justify-between items-center w-full mb-1'}}">
      <template #label>
        <span >Negative Prompt</span>
        <UPopover :ui="{wrapper: 'flex'}">
          <UButton 
            size="2xs" 
            :padded="false" 
            color="cloud-burst" 
            :ui="{ rounded: 'rounded-full'}" 
            icon="i-heroicons-information-circle-20-solid"
          />
          <template #panel>
            <div class="p-4">
              <p> The negative prompt is a parameter that tells Stable Diffusion <br>
                what <strong>you don't want to see</strong>  in the generated images. <br>
                e.g. "blurry, low quality, not realistic"
              </p>
            </div>
          </template>
        </UPopover>
      </template>
      <template #default>
        <UTextarea v-model="newImageParams.negative_prompt" placeholder="Insert negative prompt" />
      </template> 
    </UFormGroup>

    <!-- Seed -->
    <UFormGroup 
      name="seed"
      :ui="{label: { base: 'flex justify-between items-center w-full mb-1'}}">
      <template #label>
        <span >Seed</span>
        <UPopover :ui="{wrapper: 'flex'}">
          <UButton 
            size="2xs" 
            :padded="false" 
            color="cloud-burst" 
            :ui="{ rounded: 'rounded-full'}" icon="i-heroicons-information-circle-20-solid"
          />
          <template #panel>
            <div class="p-4">
              <p> A number for image generation. 
              <strong>0 assigns a random seed.</strong>  
              <br> a specific one reproduces identical results.</p>
            </div>
          </template>
        </UPopover>
      </template>
      <template #default>
        <UInput v-model="newImageParams.seed" type="number" placeholder="Seed" />
      </template> 
    </UFormGroup>

    <!-- Steps -->
    <UFormGroup 
      name="steps" 
      :ui="{label: { base: 'flex justify-between items-center w-full mb-1'}}">
      <template #label>
        <span >Steps: <strong>{{newImageParams.steps.toString()}}</strong> </span>
        <UPopover :ui="{wrapper: 'flex'}">
          <UButton 
            size="2xs" 
            :padded="false" 
            color="cloud-burst" 
            :ui="{ rounded: 'rounded-full'}" 
            icon="i-heroicons-information-circle-20-solid"
          />
          <template #panel>
            <div class="p-4">
              <p> Number of diffusion steps to run.</p>
            </div>
          </template>
        </UPopover>
      </template>
      <template #default>
        <URange :min="10" :max="20" v-model="newImageParams.steps" />
      </template> 
    </UFormGroup>

    <!-- Cfg_scale -->
    <UFormGroup 
      name="cfg_scale"
      :ui="{label: { base: 'flex justify-between items-center w-full mb-1'}}">
      <template #label>
        <span >CFG Scale: <strong>{{ newImageParams.cfg_scale.toString()}}</strong> </span>
        <UPopover :ui="{wrapper: 'flex'}">
          <UButton 
            size="2xs" 
            :padded="false" 
            color="cloud-burst" 
            :ui="{ rounded: 'rounded-full' }" 
            icon="i-heroicons-information-circle-20-solid"
          />
          <template #panel>
            <div class="p-4">
              <p>
                Adjusts how closely the image follows the text. <br>
                Higher values mean closer adherence to text but less diversity. <br> 
                Optimal between 7-12 for creative results.
              </p>
            </div>
          </template>
        </UPopover>
      </template>
      <template #default>
        <URange :min="0" :max="35" v-model="newImageParams.cfg_scale" />
      </template>
    </UFormGroup>

    <!-- Submit -->
    <div class="flex justify-end">
      <UButton size="lg" class="ms-auto me-0 font-bold" type="submit">Generate</UButton>
    </div>
    <span class="text-xs opacity-40 mt-4 block">Model: stable-diffusion-xl-1024-v1-0</span>
  </UForm>

  <!-- Error Alert -->
  <UModal v-model="error.status">
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
            @click="error = { status: false, message: '' }" 
          />
        </div>
      </template>
      <div class="p-5 text-center">
        <Icon name="material-symbols:warning" class="text-4xl text-red-500"/>
        <p class="mt-3"> {{ error.message }} </p>
      </div>
    </UCard>
  </UModal> 
</template>

<style lang="scss" scoped></style>
