<script lang="ts" setup>
  import { z } from "zod"
  import type { FormSubmitEvent } from "#ui/types"

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
    try {
      newImage.isPending = true
      const res = await $fetch<Promise<{image: string}>>("api/create/text-to-image",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(event.data)
      })
      newImage.link = `data:image/png;base64,${res.image}`
    } catch (error) {
      newImage.error = true
      console.error(error)
    } finally {
      newImage.isPending = false
    }
  }
</script>

<template>
  <UContainer class="my-5">
    <MyLoading v-if="newImage.isPending" />
    <div class="grid lg:grid-cols-3 gap-5">
      <div>
        <UCard>
          <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">    
            <h1 class="font-bold text-lg">Create a new image</h1>        
            <!-- Prompt -->
            <UFormGroup label="Prompt" name="prompt">
              <UTextarea v-model="state.prompt" placeholder="Insert prompt"/>
            </UFormGroup>
            
            <!-- Negative Prompt -->
            <UFormGroup label="Negative Prompt" name="negative_prompt">
              <UTextarea v-model="state.negative_prompt" placeholder="Insert negative prompt"/>
            </UFormGroup>

            <!-- Style Preset --> 
            <UFormGroup label="Style Preset" name="style_preset">
              <USelect v-model="state.style_preset" :options="styles_preset"/>
            </UFormGroup>

            <!-- Seed -->
            <UFormGroup label="Seed" name="seed">
              <UInput v-model="state.seed" type="number" placeholder="Seed"/>
            </UFormGroup>

            <!-- Steps -->
            <UFormGroup label="Steps" name="steps" :hint="state.steps.toString()">
              <URange :min="10" :max="20" v-model="state.steps"/>
            </UFormGroup>

            <!-- Cfg_scale -->
            <UFormGroup label="CFG Scale" name="cfg_scale" :hint="state.cfg_scale.toString()">
              <URange :min="0" :max="35" v-model="state.cfg_scale"/>
            </UFormGroup>

            <!-- Submit -->
            <div class="flex justify-end">
              <UButton size="lg" class="ms-auto me-0 font-bold" type="submit">Generate</UButton>
            </div>
            <span class="text-xs opacity-40 mt-4 block">Model: stable-diffusion-xl-1024-v1-0</span>
          </UForm>
        </UCard>
      </div>
      <div class="lg:col-span-2 flex justify-center items-center">
        <Icon v-if="!newImage.link" class="text-[20em] text-cloud-burst-900" name="material-symbols:image-outline"/>
        <div v-if="newImage.link" class="relative">
          <img class="rounded-md lg:h-[85vh]" :src="newImage.link">
          <UButton 
            size="xs" 
            class="absolute top-2 right-2" 
            :to="newImage.link" 
            download="newImage.png">
              Download Image
              <Icon name="material-symbols:download-2"/>
            </UButton>
        </div>
      </div>
    </div>
  </UContainer>
</template>

