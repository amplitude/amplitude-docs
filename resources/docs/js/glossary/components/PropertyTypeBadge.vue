<template>
  <span 
    :class="badgeClasses"
    class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full font-IBMPlex"
  >
    <span class="mr-1">{{ icon }}</span>
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['event', 'product', 'core'].includes(value)
  }
})

// Computed
const badgeClasses = computed(() => {
  const classMap = {
    'event': 'bg-[#F0F4FF] text-[#1C1C1E] border border-[#E0E7FF]',
    'product': 'bg-[#F0F9FF] text-[#1C1C1E] border border-[#E0F2FE]',
    'core': 'bg-[#F6F6F9] text-[#1C1C1E] border border-[#E6E6EB]'
  }
  return classMap[props.type] || classMap.core
})

const icon = computed(() => {
  const iconMap = {
    'event': '⚡',
    'product': '📦',
    'core': '🔧'
  }
  return iconMap[props.type] || '🔧'
})

const label = computed(() => {
  const labelMap = {
    'event': 'Event',
    'product': 'Product',
    'core': 'Core'
  }
  return labelMap[props.type] || 'Core'
})
</script>
