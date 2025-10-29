<template>
  <span 
    class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#F0F4FF] text-[#1C1C1E] transition-transform hover:scale-105 font-IBMPlex"
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

// Product area mapping (consistent with filters)
const productAreaMap = {
  'admin': 'Admin',
  'charts-metrics': 'Charts & Metrics',
  'data-management': 'Data Management',
  'audiences': 'Audiences',
  'integrations': 'Integrations',
  'session-replay': 'Session Replay',
  'heatmaps': 'Heatmaps',
  'guides-surveys': 'Guides & Surveys',
  'resource-center': 'Resource Center & Content',
  'experiment': 'Experiment'
}

const displayName = computed(() => {
  return productAreaMap[props.area] || props.area.replace(/&/g, '&amp;').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
})
</script>
