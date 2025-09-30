<template>
  <div class="flex items-center gap-2">
    <!-- Filter Toggle Button -->
    <button
      @click="$emit('toggle-filters')"
      class="inline-flex items-center px-6 py-3 border border-[#E6E6EB] rounded-lg text-sm font-medium text-[#1C1C1E] bg-white hover:bg-[#F6F6F9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066FF] transition-colors font-IBMPlex"
      :class="{ 'bg-[#0066FF] bg-opacity-10 border-[#0066FF] text-[#0066FF]': hasActiveFilters }"
    >
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
      Filters
      <span v-if="hasActiveFilters" class="ml-2 inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-[#0066FF] text-white font-IBMPlex">
        {{ activeFilterCount }}
      </span>
    </button>

    <!-- Quick Filters -->
    <div class="hidden sm:flex items-center gap-2">
      <!-- Product Area Quick Filter -->
      <select
        :value="selectedProductArea"
        @change="handleProductAreaChange"
        class="px-4 py-3 border border-[#E6E6EB] rounded-lg text-sm text-[#1C1C1E] bg-white focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors font-IBMPlex"
      >
        <option value="">All Areas</option>
        <option 
          v-for="area in availableProductAreas" 
          :key="area" 
          :value="area"
        >
          {{ getProductAreaLabel(area) }}
        </option>
      </select>

      <!-- Advanced Filter -->
      <select
        :value="selectedAdvanced"
        @change="handleAdvancedChange"
        class="px-4 py-3 border border-[#E6E6EB] rounded-lg text-sm text-[#1C1C1E] bg-white focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors font-IBMPlex"
      >
        <option value="">All Types</option>
        <option value="false">Basic Only</option>
        <option value="true">Advanced Only</option>
      </select>
    </div>

    <!-- Clear Filters -->
    <button
      v-if="hasActiveFilters"
      @click="clearAllFilters"
      class="text-sm text-[#1C1C1E] opacity-50 hover:opacity-70 underline font-IBMPlex transition-opacity"
    >
      Clear
    </button>
  </div>

  <!-- Expanded Filter Panel -->
  <div v-if="showFilters" class="mt-6 p-6 bg-[#F6F6F9] rounded-lg border border-[#E6E6EB]">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Product Areas -->
      <div>
        <h4 class="text-sm font-semibold text-[#1C1C1E] mb-3 font-IBMPlex">Product Areas</h4>
        <div class="space-y-2 max-h-48 overflow-y-auto">
          <label 
            v-for="area in availableProductAreas" 
            :key="area"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :checked="filters.productAreas.includes(area)"
              @change="toggleProductArea(area)"
              class="rounded border-[#E6E6EB] text-[#0066FF] focus:ring-[#0066FF] focus:ring-offset-0"
            />
            <span class="ml-3 text-sm text-[#1C1C1E] font-IBMPlex">
              {{ getProductAreaLabel(area) }}
            </span>
          </label>
        </div>
      </div>

      <!-- Permission Type -->
      <div>
        <h4 class="text-sm font-semibold text-[#1C1C1E] mb-3 font-IBMPlex">Permission Type</h4>
        <div class="space-y-2">
          <label class="flex items-center">
            <input
              type="radio"
              :checked="filters.advanced === null"
              @change="setAdvancedFilter(null)"
              name="advanced"
              class="border-[#E6E6EB] text-[#0066FF] focus:ring-[#0066FF] focus:ring-offset-0"
            />
            <span class="ml-3 text-sm text-[#1C1C1E] font-IBMPlex">All Types</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              :checked="filters.advanced === false"
              @change="setAdvancedFilter(false)"
              name="advanced"
              class="border-[#E6E6EB] text-[#0066FF] focus:ring-[#0066FF] focus:ring-offset-0"
            />
            <span class="ml-3 text-sm text-[#1C1C1E] font-IBMPlex">Basic Only</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              :checked="filters.advanced === true"
              @change="setAdvancedFilter(true)"
              name="advanced"
              class="border-[#E6E6EB] text-[#0066FF] focus:ring-[#0066FF] focus:ring-offset-0"
            />
            <span class="ml-3 text-sm text-[#1C1C1E] font-IBMPlex">Advanced Only</span>
          </label>
        </div>
      </div>
    </div>
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
  showFilters: {
    type: Boolean,
    default: false
  }
})

// Events
const emit = defineEmits(['update:filters', 'toggle-filters'])

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
  return props.filters.productAreas.length > 0 || props.filters.advanced !== null
})

const activeFilterCount = computed(() => {
  let count = 0
  if (props.filters.productAreas.length > 0) count += props.filters.productAreas.length
  if (props.filters.advanced !== null) count += 1
  return count
})

const selectedProductArea = computed(() => {
  return props.filters.productAreas.length === 1 ? props.filters.productAreas[0] : ''
})

const selectedAdvanced = computed(() => {
  return props.filters.advanced === null ? '' : props.filters.advanced.toString()
})

// Methods
const getProductAreaLabel = (area) => {
  return productAreaMap[area] || area
}

const toggleProductArea = (area) => {
  const newFilters = { ...props.filters }
  const index = newFilters.productAreas.indexOf(area)
  
  if (index > -1) {
    newFilters.productAreas.splice(index, 1)
  } else {
    newFilters.productAreas.push(area)
  }
  
  emit('update:filters', newFilters)
}

const setAdvancedFilter = (value) => {
  const newFilters = { ...props.filters }
  newFilters.advanced = value
  emit('update:filters', newFilters)
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

const handleAdvancedChange = (event) => {
  const value = event.target.value
  const newFilters = { ...props.filters }
  
  if (value === '') {
    newFilters.advanced = null
  } else {
    newFilters.advanced = value === 'true'
  }
  
  emit('update:filters', newFilters)
}

const clearAllFilters = () => {
  emit('update:filters', {
    productAreas: [],
    advanced: null
  })
}
</script>
