<template>
  <div class="flex items-center gap-3">
    <!-- Product Area Filter -->
    <select
      :value="selectedProductArea"
      @change="handleProductAreaChange"
      class="px-4 py-3 border border-[#E6E6EB] rounded-lg text-sm text-[#1C1C1E] bg-white focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors font-IBMPlex whitespace-nowrap"
    >
      <option value="">All Product Areas</option>
      <option 
        v-for="area in availableProductAreas" 
        :key="area" 
        :value="area"
      >
        {{ getProductAreaLabel(area) }}
      </option>
    </select>

    <!-- Toggle Expand/Collapse Control -->
    <button
      @click="$emit('toggle-expand-collapse')"
      class="px-4 py-3 border border-[#E6E6EB] rounded-lg text-sm text-[#1C1C1E] bg-white hover:bg-[#F6F6F9] focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors font-IBMPlex flex items-center gap-2 whitespace-nowrap"
      :title="isExpanded ? 'Collapse all permissions' : 'Expand all permissions'"
    >
      <svg 
        class="w-4 h-4 transform transition-transform duration-200" 
        :class="{ 'rotate-180': isExpanded }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
      <span>{{ isExpanded ? 'Collapse All' : 'Expand All' }}</span>
    </button>
  </div>

</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  availableProductAreas: {
    type: Array,
    default: () => []
  },
  isExpanded: {
    type: Boolean,
    default: false
  }
})

// Events
const emit = defineEmits(['update:filters', 'toggle-expand-collapse'])

// Product area mapping
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

// Computed
const selectedProductArea = computed(() => {
  return props.filters.productAreas.length === 1 ? props.filters.productAreas[0] : ''
})

// Methods
const getProductAreaLabel = (area) => {
  return productAreaMap[area] || area
}

const handleProductAreaChange = (event) => {
  const value = event.target.value
  const newFilters = { ...props.filters }
  
  if (value) {
    newFilters.productAreas = [value]
  } else {
    newFilters.productAreas = []
  }
  
  emit('update:filters', newFilters)
}

</script>
