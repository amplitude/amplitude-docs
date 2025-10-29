<template>
  <div class="flex flex-wrap gap-1">
    <span
      v-for="type in types"
      :key="type"
      :class="[
        'property-type-badge inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-transform hover:scale-105',
        getBadgeClasses(type)
      ]"
      :title="`${formatTypeName(type)} Property`"
    >
      <span class="text-xs">{{ getTypeIcon(type) }}</span>
      <span>{{ formatTypeName(type) }}</span>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  types: {
    type: Array,
    default: () => []
  }
})

const getBadgeClasses = (type) => {
  const classes = {
    core: 'bg-amp-gray-100 text-amp-gray-800 border border-amp-gray-300',
    product: 'bg-amp-blue-100 text-amp-blue-800 border border-amp-blue-300',
    event: 'bg-amp-light-purple-100 text-amp-light-purple-800 border border-amp-light-purple-300'
  }
  return classes[type] || 'bg-amp-gray-100 text-amp-gray-600'
}

const getTypeIcon = (type) => {
  const icons = {
    core: '⚡',
    product: '📦',
    event: '🎯'
  }
  return icons[type] || '•'
}

const formatTypeName = (type) => {
  const names = {
    core: 'Core',
    product: 'Product',
    event: 'Event'
  }
  return names[type] || type.charAt(0).toUpperCase() + type.slice(1)
}
</script>
