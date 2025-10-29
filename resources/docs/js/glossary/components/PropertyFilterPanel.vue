<template>
  <div class="flex-shrink-0">
    <!-- Filter Toggle Button (Mobile) -->
    <button
      @click="$emit('toggle-filters')"
      class="lg:hidden inline-flex items-center gap-2 px-4 py-3 border border-amp-gray-200 rounded-lg bg-white text-amp-gray-700 hover:bg-amp-gray-50 transition-colors"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
      </svg>
      Property Filters
      <span v-if="hasActiveFilters" class="w-2 h-2 bg-amp-blue-500 rounded-full"></span>
    </button>

    <!-- Filter Panel -->
    <div 
      :class="[
        'lg:block',
        showFilters ? 'block' : 'hidden'
      ]"
      class="absolute lg:relative top-full lg:top-auto left-0 lg:left-auto right-0 lg:right-auto z-10 lg:z-auto mt-2 lg:mt-0 p-4 lg:p-0 bg-white lg:bg-transparent border lg:border-0 border-amp-gray-200 rounded-lg lg:rounded-none shadow-lg lg:shadow-none"
    >
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Property Type Filter -->
        <div v-if="availablePropertyTypes.length > 0" class="filter-group">
          <label class="block text-sm font-medium text-amp-gray-700 mb-2">Property Type</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="type in availablePropertyTypes"
              :key="type"
              @click="togglePropertyTypeFilter(type)"
              :class="[
                'px-3 py-1 text-xs rounded-full border transition-colors',
                filters.propertyTypes.includes(type)
                  ? getActiveTypeClasses(type)
                  : 'bg-white border-amp-gray-200 text-amp-gray-600 hover:border-amp-gray-300'
              ]"
            >
              {{ formatTypeName(type) }}
            </button>
          </div>
        </div>

        <!-- Data Type Filter -->
        <!-- <div v-if="availableDataTypes.length > 0" class="filter-group">
          <label class="block text-sm font-medium text-amp-gray-700 mb-2">Data Type</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="dataType in availableDataTypes"
              :key="dataType"
              @click="toggleDataTypeFilter(dataType)"
              :class="[
                'px-3 py-1 text-xs rounded-full border transition-colors',
                filters.dataTypes.includes(dataType)
                  ? 'bg-amp-green-100 border-amp-green-300 text-amp-green-800'
                  : 'bg-white border-amp-gray-200 text-amp-gray-600 hover:border-amp-gray-300'
              ]"
            >
              {{ dataType }}
            </button>
          </div>
        </div> -->

        <!-- Usage Range Filter -->
       
        <!-- Clear Filters -->
        <div v-if="hasActiveFilters" class="filter-group">
          <button
            @click="clearFilters"
            class="px-3 py-1 text-xs text-amp-red-600 hover:text-amp-red-800 underline transition-colors"
          >
            Clear all filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  availablePropertyTypes: {
    type: Array,
    default: () => []
  },
  availableDataTypes: {
    type: Array,
    default: () => []
  },
  showFilters: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:filters', 'toggle-filters'])

const hasActiveFilters = computed(() => {
  return props.filters.propertyTypes.length > 0 ||
         props.filters.dataTypes.length > 0 ||
         props.filters.usageRange !== null ||
         props.filters.hasDescription !== null
})

const togglePropertyTypeFilter = (type) => {
  const newTypes = [...props.filters.propertyTypes]
  const index = newTypes.indexOf(type)
  
  if (index > -1) {
    newTypes.splice(index, 1)
  } else {
    newTypes.push(type)
  }
  
  emit('update:filters', {
    ...props.filters,
    propertyTypes: newTypes
  })
}

const toggleDataTypeFilter = (type) => {
  const newTypes = [...props.filters.dataTypes]
  const index = newTypes.indexOf(type)
  
  if (index > -1) {
    newTypes.splice(index, 1)
  } else {
    newTypes.push(type)
  }
  
  emit('update:filters', {
    ...props.filters,
    dataTypes: newTypes
  })
}

const setUsageRangeFilter = (range) => {
  emit('update:filters', {
    ...props.filters,
    usageRange: props.filters.usageRange === range ? null : range
  })
}

const setDescriptionFilter = (value) => {
  emit('update:filters', {
    ...props.filters,
    hasDescription: props.filters.hasDescription === value ? null : value
  })
}

const clearFilters = () => {
  emit('update:filters', {
    propertyTypes: [],
    dataTypes: [],
    usageRange: null,
    hasDescription: null
  })
}

const formatTypeName = (type) => {
  const names = {
    core: 'Core',
    product: 'Product',
    event: 'Event'
  }
  return names[type] || type.charAt(0).toUpperCase() + type.slice(1)
}

const getActiveTypeClasses = (type) => {
  const classes = {
    core: 'bg-amp-gray-100 border-amp-gray-300 text-amp-gray-800',
    product: 'bg-amp-blue-100 border-amp-blue-300 text-amp-blue-800',
    event: 'bg-amp-light-purple-100 border-amp-light-purple-300 text-amp-light-purple-800'
  }
  return classes[type] || 'bg-amp-gray-100 border-amp-gray-300 text-amp-gray-800'
}
</script>

<style scoped>
.filter-group {
  min-width: 0; /* Prevents flex items from overflowing */
}
</style>
