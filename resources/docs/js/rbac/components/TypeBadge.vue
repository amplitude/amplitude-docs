<template>
  <span 
    class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium font-IBMPlex cursor-help"
    :class="badgeClasses"
    :title="tooltipText"
  >
    {{ displayLabel }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  advanced: {
    type: Boolean,
    required: true
  }
})

// Computed
const displayLabel = computed(() => {
  return props.advanced ? 'Advanced' : 'Basic'
})

const badgeClasses = computed(() => {
  return props.advanced 
    ? 'bg-[#FF6C2D] bg-opacity-10 text-[#FF6C2D] border border-[#FF6C2D] border-opacity-20' 
    : 'bg-[#0066FF] bg-opacity-10 text-[#0066FF] border border-[#0066FF] border-opacity-20'
})

const tooltipText = computed(() => {
  return props.advanced 
    ? 'Permissions that require careful consideration and are typically reserved for administrators or power users'
    : 'Standard permissions that are commonly used and safe for most users'
})
</script>
