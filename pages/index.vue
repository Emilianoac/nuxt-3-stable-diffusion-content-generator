<script lang="ts" setup>
  useSeoMeta({ title: "Pixur | AI Image Generator", description: "Pixur is an AI Image Generator."});
</script>

<template>
  <UContainer class="my-5">
    <div class="grid lg:grid-cols-3 gap-5">
      <div class="order-1 lg:order-0">
        <ImageGenerationForm/>
      </div>
      <div class="lg:col-span-2 flex justify-center items-center order-0 lg:order-1">
        <ImageGenerationResult/>
      </div>
    </div>
  </UContainer>
</template>

