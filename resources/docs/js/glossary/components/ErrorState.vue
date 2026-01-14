<template>
  <div class="text-center py-16">
    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
      <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
      </svg>
    </div>
    <h3 class="text-lg font-medium text-amp-gray-900 mb-2">Failed to load glossary</h3>
    <p class="text-amp-gray-600 mb-4">{{ errorMessage }}</p>
    
    <button
      @click="$emit('retry')"
      class="inline-flex items-center gap-2 px-4 py-2 bg-amp-blue-600 text-white rounded-lg hover:bg-amp-blue-700 transition-colors"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
      Try again
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  error: {
    type: Error,
    required: true
  }
})

const emit = defineEmits(['retry'])

const errorMessage = computed(() => {
  if (props.error.message.includes('HTTP')) {
    return 'There was a problem loading the data. Please check your connection and try again.'
  }
  return props.error.message || 'An unexpected error occurred. Please try refreshing the page.'
})
</script>
