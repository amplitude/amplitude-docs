<template>
  <span 
    class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium font-IBMPlex"
    :class="badgeClasses"
  >
    {{ displayLabel }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  role: {
    type: String,
    required: true,
    validator: (value) => ['admin', 'manager', 'member', 'viewer'].includes(value)
  }
})

// Computed
const displayLabel = computed(() => {
  const labels = {
    'admin': 'Admin',
    'manager': 'Manager',
    'member': 'Member',
    'viewer': 'Viewer'
  }
  return labels[props.role] || props.role
})

const badgeClasses = computed(() => {
  const classes = {
    'admin': 'bg-purple-100 text-purple-800 border border-purple-200',
    'manager': 'bg-blue-100 text-blue-800 border border-blue-200',
    'member': 'bg-green-100 text-green-800 border border-green-200',
    'viewer': 'bg-gray-100 text-gray-800 border border-gray-200'
  }
  return classes[props.role] || 'bg-gray-100 text-gray-800 border border-gray-200'
})
</script>

