<template>
  <span 
    class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold font-IBMPlex"
    :class="badgeClasses"
  >
    {{ displayLabel }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  productArea: {
    type: String,
    required: true
  }
})

// Product area mapping and colors using Amplitude design system
const productAreaConfig = {
  'admin': { 
    label: 'Admin', 
    classes: 'bg-[#0066FF] text-white' 
  },
  'charts-metrics': { 
    label: 'Charts & Metrics', 
    classes: 'bg-[#0066FF] bg-opacity-10 text-[#0066FF] border border-[#0066FF] border-opacity-20' 
  },
  'data-management': { 
    label: 'Data Management', 
    classes: 'bg-[#FF6C2D] bg-opacity-10 text-[#FF6C2D] border border-[#FF6C2D] border-opacity-20' 
  },
  'audiences': { 
    label: 'Audiences', 
    classes: 'bg-[#0066FF] bg-opacity-10 text-[#0066FF] border border-[#0066FF] border-opacity-20' 
  },
  'integrations': { 
    label: 'Integrations', 
    classes: 'bg-[#FF6C2D] bg-opacity-10 text-[#FF6C2D] border border-[#FF6C2D] border-opacity-20' 
  },
  'session-replay': { 
    label: 'Session Replay', 
    classes: 'bg-[#0066FF] bg-opacity-10 text-[#0066FF] border border-[#0066FF] border-opacity-20' 
  },
  'heatmaps': { 
    label: 'Heatmaps', 
    classes: 'bg-[#FF6C2D] bg-opacity-10 text-[#FF6C2D] border border-[#FF6C2D] border-opacity-20' 
  },
  'guides-surveys': { 
    label: 'Guides & Surveys', 
    classes: 'bg-[#0066FF] bg-opacity-10 text-[#0066FF] border border-[#0066FF] border-opacity-20' 
  },
  'resource-center': { 
    label: 'Resource Center & Content', 
    classes: 'bg-[#FF6C2D] bg-opacity-10 text-[#FF6C2D] border border-[#FF6C2D] border-opacity-20' 
  },
  'experiment': { 
    label: 'Experiment', 
    classes: 'bg-[#0066FF] bg-opacity-10 text-[#0066FF] border border-[#0066FF] border-opacity-20' 
  }
}

// Computed
const displayLabel = computed(() => {
  return productAreaConfig[props.productArea]?.label || props.productArea
})

const badgeClasses = computed(() => {
  return productAreaConfig[props.productArea]?.classes || 'bg-[#F6F6F9] text-[#1C1C1E] border border-[#E6E6EB]'
})
</script>
