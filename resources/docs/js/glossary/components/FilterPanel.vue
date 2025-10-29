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
      Filters
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
        <!-- Platform Filter -->
        <div v-if="availablePlatforms.length > 0" class="filter-group">
          <label class="block text-sm font-medium text-amp-gray-700 mb-2">Platform</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="platform in availablePlatforms"
              :key="platform"
              @click="togglePlatformFilter(platform)"
              :class="[
                'px-3 py-1 text-xs rounded-full border transition-colors',
                filters.platforms.includes(platform)
                  ? 'bg-amp-blue-100 border-amp-blue-300 text-amp-blue-800'
                  : 'bg-white border-amp-gray-200 text-amp-gray-600 hover:border-amp-gray-300'
              ]"
            >
              {{ formatPlatformLabel(platform) }}
            </button>
          </div>
        </div>

        <!-- Product Area Filter -->
        <div v-if="availableProductAreas.length > 0" class="filter-group">
          <label class="block text-sm font-medium text-amp-gray-700 mb-2">Product Area</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="area in availableProductAreas"
              :key="area"
              @click="toggleProductAreaFilter(area)"
              :class="[
                'px-3 py-1 text-xs rounded-full border transition-colors',
                filters.productAreas.includes(area)
                  ? 'bg-amp-purple-100 border-amp-purple-300 text-amp-purple-800'
                  : 'bg-white border-amp-gray-200 text-amp-gray-600 hover:border-amp-gray-300'
              ]"
            >
              {{ formatProductAreaLabel(area) }}
            </button>
          </div>
        </div>

        <!-- Properties Filter -->
        <!-- <div class="filter-group">
          <label class="block text-sm font-medium text-amp-gray-700 mb-2">Properties</label>
          <div class="flex flex-wrap gap-2">
            <button
              @click="setPropertiesFilter(null)"
              :class="[
                'px-3 py-1 text-xs rounded-full border transition-colors',
                filters.hasProperties === null
                  ? 'bg-amp-gray-100 border-amp-gray-300 text-amp-gray-800'
                  : 'bg-white border-amp-gray-200 text-amp-gray-600 hover:border-amp-gray-300'
              ]"
            >
              All
            </button>
            <button
              @click="setPropertiesFilter(true)"
              :class="[
                'px-3 py-1 text-xs rounded-full border transition-colors',
                filters.hasProperties === true
                  ? 'bg-amp-green-100 border-amp-green-300 text-amp-green-800'
                  : 'bg-white border-amp-gray-200 text-amp-gray-600 hover:border-amp-gray-300'
              ]"
            >
              With Properties
            </button>
            <button
              @click="setPropertiesFilter(false)"
              :class="[
                'px-3 py-1 text-xs rounded-full border transition-colors',
                filters.hasProperties === false
                  ? 'bg-amp-red-100 border-amp-red-300 text-amp-red-800'
                  : 'bg-white border-amp-gray-200 text-amp-gray-600 hover:border-amp-gray-300'
              ]"
            >
              Without Properties
            </button>
          </div>
        </div> -->

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
  availablePlatforms: {
    type: Array,
    default: () => []
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

const emit = defineEmits(['update:filters', 'toggle-filters'])

const hasActiveFilters = computed(() => {
  return props.filters.platforms.length > 0 ||
         props.filters.productAreas.length > 0 ||
         props.filters.hasProperties !== null
})

const togglePlatformFilter = (platform) => {
  const newPlatforms = [...props.filters.platforms]
  const index = newPlatforms.indexOf(platform)
  
  if (index > -1) {
    newPlatforms.splice(index, 1)
  } else {
    newPlatforms.push(platform)
  }
  
  emit('update:filters', {
    ...props.filters,
    platforms: newPlatforms
  })
}

const toggleProductAreaFilter = (area) => {
  const newAreas = [...props.filters.productAreas]
  const index = newAreas.indexOf(area)
  
  if (index > -1) {
    newAreas.splice(index, 1)
  } else {
    newAreas.push(area)
  }
  
  emit('update:filters', {
    ...props.filters,
    productAreas: newAreas
  })
}

const setPropertiesFilter = (value) => {
  emit('update:filters', {
    ...props.filters,
    hasProperties: value
  })
}

const clearFilters = () => {
  emit('update:filters', {
    platforms: [],
    productAreas: [],
    propertyTypes: [],
    hasProperties: null
  })
}

const formatPlatformLabel = (platform) => {
  const labels = {
    web: 'Web',
    ios: 'iOS',
    android: 'Android',
    all: 'All'
  }
  return labels[platform] || platform.charAt(0).toUpperCase() + platform.slice(1)
}

const formatProductAreaLabel = (area) => {
  return area.replace(/&/g, '&').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}
</script>

<style scoped>
.filter-group {
  min-width: 0; /* Prevents flex items from overflowing */
}
</style>
