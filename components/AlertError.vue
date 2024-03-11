<script setup lang="ts">
  const props = defineProps({
    error: {
      type: Boolean,
      default: false
    }
  })

  const error = ref(props.error)
</script>

<template>
  <UModal v-model="error">
    <div class="p-4">
      error
    </div>
  </UModal>
</template>

