<template>
  <button 
    v-if="eventCount > 0"
    @click="$emit('click')"
    class="related-events-btn inline-flex items-center gap-2 text-amp-blue-600 text-sm font-medium hover:text-amp-blue-800 focus:outline-none underline-offset-2 hover:underline transition-all duration-200"
  >
    <svg 
      :class="[
        'w-4 h-4 transition-transform duration-200',
        isExpanded ? 'rotate-90' : ''
      ]"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
    <span>{{ buttonText }}</span>
  </button>
  
  <div 
    v-else
    class="text-sm text-amp-gray-500 italic flex items-center gap-2"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
    </svg>
    No related events
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  eventCount: {
    type: Number,
    required: true
  },
  isExpanded: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonText = computed(() => {
  if (props.isExpanded) {
    return 'Hide Events'
  }
  return `View ${props.eventCount} Related Event${props.eventCount !== 1 ? 's' : ''}`
})
</script>
