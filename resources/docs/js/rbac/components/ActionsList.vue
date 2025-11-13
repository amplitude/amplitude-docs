<template>
  <div v-if="actions && actions.length > 0" class="text-sm text-gray-600">
    <div 
      v-for="(action, index) in displayActions" 
      :key="index"
      class="mb-1"
    >
      • {{ action }}
    </div>
    <button 
      v-if="hasMoreActions"
      @click="showAll = !showAll"
      class="text-blue-600 hover:text-blue-800 text-xs mt-1 underline"
    >
      {{ showAll ? 'Show less' : `Show ${actions.length - maxVisible} more` }}
    </button>
  </div>
  <div v-else class="text-sm text-gray-400">
    No specific actions
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  actions: {
    type: Array,
    default: () => []
  },
  maxVisible: {
    type: Number,
    default: 3
  }
})

// State
const showAll = ref(false)

// Computed
const hasMoreActions = computed(() => {
  return props.actions && props.actions.length > props.maxVisible
})

const displayActions = computed(() => {
  if (!props.actions || props.actions.length === 0) {
    return []
  }
  
  if (showAll.value || props.actions.length <= props.maxVisible) {
    return props.actions
  }
  
  return props.actions.slice(0, props.maxVisible)
})
</script>
