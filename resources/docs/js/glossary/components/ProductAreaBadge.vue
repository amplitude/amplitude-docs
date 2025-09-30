<template>
  <span 
    class="platform-badge inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amp-light-purple-200 text-amp-light-purple-900 transition-transform hover:scale-105"
    :title="`Product Area: ${displayName}`"
  >
    <span class="text-xs">📦</span>
    <span>{{ displayName }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  area: {
    type: String,
    required: true
  }
})

const displayName = computed(() => {
  return props.area.replace(/&/g, '&amp;').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
})
</script>
