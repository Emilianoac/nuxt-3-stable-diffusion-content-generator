<script lang="ts" setup>
  import ModalLogin from "@/components/ModalLogin.vue"
  import { imageSchema, styles_preset, type ImageSchema } from "@/schemas/imageSchema";
  import type { FormSubmitEvent } from "#ui/types"
  import type { EndpointResponse} from "@/types/index";

  const store = useUserStore();
  const modal = useModal();

  async function onSubmit (event: FormSubmitEvent<ImageSchema>) {
    if (!store.user) {
      modal.open(ModalLogin);
      return;
    }

    // Get user token to validate request
    const accessToken = await store.user.getIdToken()
    
    try {
      store.$patch({isLoading: true});
      const {data } = await useFetch("api/create/text-to-image",{
        method: "post",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(event.data)
      })
      
      store.$patch({generatedImage: data.value as EndpointResponse, isgeneratedImageSaved: false});
      store.$patch({isLoading: false});
    } catch (error: any) {
      store.$patch({error: { status: true, message: error.message}});
    } finally {
      store.$patch({isLoading: false});
    }
  }
</script>

<template>

<UForm 
  class="space-y-4 dark:bg-cloud-burst-800 p-4 rounded-md" 
  :schema="imageSchema" 
  :state="store.newImage" 
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
      <UTextarea v-model="store.newImage.prompt" placeholder="Insert prompt" />
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
      <UTextarea v-model="store.newImage.negative_prompt" placeholder="Insert negative prompt" />
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
      <USelect v-model="store.newImage.style_preset" :options="styles_preset" />
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
      <UInput v-model="store.newImage.seed" type="number" placeholder="Seed" />
    </template> 
  </UFormGroup>

  <!-- Steps -->
  <UFormGroup 
    name="steps" 
    :ui="{label: { base: 'flex justify-between items-center w-full mb-1'}}">
    <template #label>
      <span >Steps: <strong>{{ store.newImage.steps.toString()}}</strong> </span>
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
      <URange :min="10" :max="20" v-model="store.newImage.steps" />
    </template> 
  </UFormGroup>

  <!-- Cfg_scale -->
  <UFormGroup 
    name="cfg_scale"
    :ui="{label: { base: 'flex justify-between items-center w-full mb-1'}}">
    <template #label>
      <span >CFG Scale: <strong>{{ store.newImage.cfg_scale.toString()}}</strong> </span>
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
      <URange :min="0" :max="35" v-model="store.newImage.cfg_scale" />
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
