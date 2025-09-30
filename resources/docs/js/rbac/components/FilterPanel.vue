<template>
  <div class="flex items-center gap-4">
    <!-- Product Area Filter -->
    <select
      :value="selectedProductArea"
      @change="handleProductAreaChange"
      class="px-4 py-3 border border-[#E6E6EB] rounded-lg text-sm text-[#1C1C1E] bg-white focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors font-IBMPlex"
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

    <!-- Clear Filters -->
    <button
      v-if="hasActiveFilters"
      @click="clearAllFilters"
      class="px-4 py-2 text-sm text-[#1C1C1E] opacity-60 hover:opacity-80 underline font-IBMPlex transition-opacity"
    >
      Clear filters
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
  }
})

// Events
const emit = defineEmits(['update:filters'])

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
const hasActiveFilters = computed(() => {
  return props.filters.productAreas.length > 0
})

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

const clearAllFilters = () => {
  emit('update:filters', {
    productAreas: []
  })
}
</script>
