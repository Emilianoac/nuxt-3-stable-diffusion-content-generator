<script lang="ts" setup>
  import { z } from "zod"
  import type { FormSubmitEvent } from "#ui/types"

  const emit = defineEmits(["new-image"])

  // Reactive state for new image
  const newImage = reactive({
    link: "",
    isPending: false,
    error: false
  })

  // List of styles preset available for the model
  const styles_preset = [
    "none",
    "anime",
    "3d-model",
    "analog-film",
    "cinematic",
    "comic-book",
    "digital-art",
    "enhance",
    "fantasy-art",
    "isometric",
    "line-art",
    "low-poly",
    "modeling-compound",
    "neon-punk",
    "origami",
    "photographic",
    "pixel-art",
    "tile-texture"
  ]

  // Create zod schema
  const schema = z.object({
    prompt: z.string().min(1, "Prompt is required"),
    negative_prompt: z.string().optional(),
    style_preset: z.string().refine((val) => styles_preset.includes(val), {
      message: "Invalid style preset"
    }),
    seed: z
      .number()
      .int("Seed must be integer number")
      .nonnegative("Seed must be a positive number"),
    steps: z
      .number()
      .min(10,"Min value is 1")
      .max(20, "Max Value is 20")
      .int("Steps must be integer number")
      .positive("Steps must be a positive number"),
    cfg_scale: z.
      number()
      .min(0)
      .max(35)
      .int("Scale must be integer number")
      .positive("Scale must be a positive number"),
  })

  // Extract schema type
  type Schema = z.output<typeof schema>

  // Create reactive state
  const state = reactive({
    prompt: undefined,
    negative_prompt: undefined,
    style_preset: "none",
    seed: 0,
    steps: 15,
    cfg_scale: 7,
  })

  // Submit data to the server
  async function onSubmit (event: FormSubmitEvent<Schema>) {
    const imageParams = Object.assign({}, event.data)
    try {
      newImage.isPending = true
      emit("new-image", {
        imageResult: newImage,
        imageParams: imageParams
      })
      const res = await $fetch<Promise<{image: string, seed: number}>>("api/create/text-to-image",{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(event.data)
      })
      newImage.link = `data:image/png;base64,${res.image}`
      imageParams.seed = res.seed
    } catch (error) {
      newImage.error = true
      console.error(error)
    } finally {
      newImage.isPending = false
    }

    emit("new-image", {
      imageResult: newImage,
      imageParams: imageParams
    })
  }
</script>

<template>
  <UCard>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
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
          <UTextarea v-model="state.prompt" placeholder="Insert prompt" />
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
          <UTextarea v-model="state.negative_prompt" placeholder="Insert negative prompt" />
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
          <USelect v-model="state.style_preset" :options="styles_preset" />
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
          <UInput v-model="state.seed" type="number" placeholder="Seed" />
        </template> 
      </UFormGroup>

      <!-- Steps -->
      <UFormGroup 
        name="steps" 
        :ui="{label: { base: 'flex justify-between items-center w-full mb-1'}}">
        <template #label>
          <span >Steps: <strong>{{ state.steps.toString()}}</strong> </span>
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
          <URange :min="10" :max="20" v-model="state.steps" />
        </template> 
      </UFormGroup>

      <!-- Cfg_scale -->
      <UFormGroup 
        name="cfg_scale"
        :ui="{label: { base: 'flex justify-between items-center w-full mb-1'}}">
        <template #label>
          <span >CFG Scale: <strong>{{ state.cfg_scale.toString()}}</strong> </span>
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
          <URange :min="0" :max="35" v-model="state.cfg_scale" />
        </template> 
      </UFormGroup>

      <!-- Submit -->
      <div class="flex justify-end">
        <UButton size="lg" class="ms-auto me-0 font-bold" type="submit">Generate</UButton>
      </div>
      <span class="text-xs opacity-40 mt-4 block">Model: stable-diffusion-xl-1024-v1-0</span>
    </UForm>
  </UCard>
</template>

<style lang="scss" scoped></style>
