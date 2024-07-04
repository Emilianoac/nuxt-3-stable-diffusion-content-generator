<script lang="ts" setup>
  import ModalLogin from "@/components/ModalLogin.vue"
  import { imageSchema, styles_preset, type ImageSchema } from "@/schemas/imageSchema";
  import type { FormSubmitEvent } from "#ui/types"
  import type { EndpointResponse} from "@/types/index";

  const {globalState} = useGlobalState();
  const modal = useModal()

  // Submit data to the server
  async function onSubmit (event: FormSubmitEvent<ImageSchema>) {
    // If user is not logged in, open login modal
    if (!globalState.user) {
      modal.open(ModalLogin);
      return;
    }
    // Get user token to validate request
    const accessToken = await globalState.user.getIdToken()
    
    try {
      globalState.generatedImage.isPending = true;
      globalState.generatedImage.error.status = false;
      const {data, pending, error} = await useFetch("api/create/text-to-image",{
        method: "post",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(event.data)
      })
      
      // Handle fetch error
      if (error.value) {
        throw new Error(error.value.data.message);
      }
      globalState.generatedImage.data = data.value as EndpointResponse;
      globalState.savingImage.status = false;

    } catch (error: any) {
      globalState.generatedImage.error.status = true;
      globalState.generatedImage.error.message = error.message;
    } finally {
      globalState.generatedImage.isPending = false;
    }
  }
</script>

<template>

<UForm 
  class="space-y-4 dark:bg-cloud-burst-800 p-4 rounded-md" 
  :schema="imageSchema" 
  :state="globalState.formImage" 
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
      <UTextarea v-model="globalState.formImage.prompt" placeholder="Insert prompt" />
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
      <UTextarea v-model="globalState.formImage.negative_prompt" placeholder="Insert negative prompt" />
    </template> 
  </UFormGroup>

  <!-- Style Preset -->
  <UFormGroup 
    name="style_preset"
    :ui="{label: { base: 'flex justify-between items-center w-full mb-1'}}">
    <template #label>
      <span >Style Preset</span>
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
            <p> Style to guide the image model towards a particular style.</p>
          </div>
        </template>
      </UPopover>
    </template>
    <template #default>
      <USelect v-model="globalState.formImage.style_preset" :options="styles_preset" />
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
      <UInput v-model="globalState.formImage.seed" type="number" placeholder="Seed" />
    </template> 
  </UFormGroup>

  <!-- Steps -->
  <UFormGroup 
    name="steps" 
    :ui="{label: { base: 'flex justify-between items-center w-full mb-1'}}">
    <template #label>
      <span >Steps: <strong>{{ globalState.formImage.steps.toString()}}</strong> </span>
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
      <URange :min="10" :max="20" v-model="globalState.formImage.steps" />
    </template> 
  </UFormGroup>

  <!-- Cfg_scale -->
  <UFormGroup 
    name="cfg_scale"
    :ui="{label: { base: 'flex justify-between items-center w-full mb-1'}}">
    <template #label>
      <span >CFG Scale: <strong>{{ globalState.formImage.cfg_scale.toString()}}</strong> </span>
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
      <URange :min="0" :max="35" v-model="globalState.formImage.cfg_scale" />
    </template> 
  </UFormGroup>

  <!-- Submit -->
  <div class="flex justify-end">
    <UButton size="lg" class="ms-auto me-0 font-bold" type="submit">Generate</UButton>
  </div>
  <span class="text-xs opacity-40 mt-4 block">Model: stable-diffusion-xl-1024-v1-0</span>
</UForm>

</template>

<style lang="scss" scoped></style>
