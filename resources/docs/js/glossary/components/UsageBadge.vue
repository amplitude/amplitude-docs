<template>
  <span 
    :class="[
      'usage-badge inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-transform hover:scale-105',
      getUsageClasses(count)
    ]"
    :title="`Used in ${count} event${count !== 1 ? 's' : ''}`"
  >
    <span class="text-xs">{{ getUsageIcon(count) }}</span>
    <span>{{ count }} event{{ count !== 1 ? 's' : '' }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  count: {
    type: Number,
    required: true
  }
})

const getUsageClasses = (count) => {
  if (count >= 30) {
    return 'bg-amp-red-100 text-amp-red-800 border border-amp-red-300' // High usage
  } else if (count >= 10) {
    return 'bg-amp-orange-100 text-amp-orange-800 border border-amp-orange-300' // Medium usage
  } else if (count >= 3) {
    return 'bg-amp-yellow-100 text-amp-yellow-800 border border-amp-yellow-300' // Low usage
  } else {
    return 'bg-amp-gray-100 text-amp-gray-600 border border-amp-gray-300' // Very low usage
  }
}

const getUsageIcon = (count) => {
  if (count >= 30) {
    return '🔥' // High usage
  } else if (count >= 10) {
    return '📈' // Medium usage
  } else if (count >= 3) {
    return '📊' // Low usage
  } else {
    return '📉' // Very low usage
  }
}
</script>
