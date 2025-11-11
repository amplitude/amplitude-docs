<template>
  <svg 
    class="w-4 h-4 text-gray-400" 
    :class="{ 'text-gray-600': isActive }"
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <!-- Default sort icon (both arrows) -->
    <path 
      v-if="!isActive"
      fill-rule="evenodd" 
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
      clip-rule="evenodd" 
    />
    
    <!-- Sort up (ascending) -->
    <path 
      v-else-if="direction === 'asc'"
      fill-rule="evenodd" 
      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" 
      clip-rule="evenodd" 
    />
    
    <!-- Sort down (descending) -->
    <path 
      v-else
      fill-rule="evenodd" 
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
      clip-rule="evenodd" 
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  field: {
    type: String,
    required: true
  },
  currentField: {
    type: String,
    required: true
  },
  direction: {
    type: String,
    required: true
  }
})

// Computed
const isActive = computed(() => props.field === props.currentField)
</script>
