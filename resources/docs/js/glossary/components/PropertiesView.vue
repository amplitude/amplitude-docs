<template>
  <div class="w-full font-IBMPlex">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-medium text-amp-gray-900 font-Gellix">Property Glossary</h1>
          <p class="text-amp-gray-600 mt-1">Explore all properties and the events they belong to</p>
        </div>
        <StatsDisplay 
          :properties-count="totalProperties" 
          :filtered-count="filteredProperties.length"
          :is-searching="isSearching"
          :current-query="searchQuery"
          view-type="properties"
        />
      </div>
      
      <!-- Enhanced Search with Filters -->
      <div class="flex flex-col lg:flex-row gap-4">
        <SearchBar 
          v-model:query="searchQuery"
          @clear="clearSearch"
          placeholder="Search properties..."
        />
        <PropertyFilterPanel 
          v-model:filters="filters"
          :available-property-types="availablePropertyTypes"
          :available-data-types="availableDataTypes"
          :show-filters="showFilters"
          @toggle-filters="showFilters = !showFilters"
        />
      </div>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="isLoading" />
    
    <!-- Content -->
    <div v-else-if="!isLoading && filteredProperties.length > 0" class="space-y-4">
      <PropertyCard
        v-for="property in filteredProperties"
        :key="property.id"
        :property="property"
        :related-events="getRelatedEvents(property.id)"
        :is-local="isLocal"
        :expanded-property="expandedProperty"
        @toggle-events="toggleEvents"
        @view-event="$emit('view-event', $event)"
      />
    </div>
    
    <!-- Empty State -->
    <EmptyState 
      v-else-if="!isLoading && filteredProperties.length === 0" 
      :is-searching="isSearching"
      :query="searchQuery"
      entity-type="properties"
    />
    
    <!-- Error State -->
    <ErrorState v-if="error" :error="error" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useGlossaryData } from '../composables/useGlossaryData'
import { usePropertyView } from '../composables/usePropertyView'
import { usePropertySearch } from '../composables/usePropertySearch'
import { usePropertyFilters } from '../composables/usePropertyFilters'

// Components
import SearchBar from './SearchBar.vue'
import PropertyFilterPanel from './PropertyFilterPanel.vue'
import PropertyCard from './PropertyCard.vue'
import StatsDisplay from './StatsDisplay.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import EmptyState from './EmptyState.vue'
import ErrorState from './ErrorState.vue'

// Props
const props = defineProps({
  isLocal: {
    type: Boolean,
    default: false
  },
  dataUrl: {
    type: String,
    default: '/docs/glossary-data.json'
  }
})

// Events
const emit = defineEmits(['view-event'])

// State
const showFilters = ref(false)

// Composables
const { data, isLoading, error, loadData } = useGlossaryData(props.dataUrl)
const { 
  properties, 
  expandedProperty, 
  transformEventsToProperties, 
  togglePropertyEvents,
  getRelatedEvents 
} = usePropertyView()
const { searchQuery, searchResults, performSearch, clearSearch: clearSearchResults } = usePropertySearch()

// Watch for search query changes to trigger search or clear results
const { 
  filters, 
  filteredResults, 
  availablePropertyTypes, 
  availableDataTypes,
  initializeFilters 
} = usePropertyFilters()

// Computed
const isSearching = computed(() => searchQuery.value.length >= 2)

const totalProperties = computed(() => properties.value.length)

const filteredProperties = computed(() => {
  let propertiesList = properties.value
  
  console.log(`📊 PropertiesView filtering: query="${searchQuery.value}", isSearching=${isSearching.value}, searchResults=${searchResults.value.length}, totalProps=${properties.value.length}`)
  
  // Apply search filtering: only filter if we have search results OR if not searching at all
  if (isSearching.value) {
    if (searchResults.value.length > 0) {
      // If we have search results, show only those
      const resultIds = searchResults.value.map(r => r.id)
      propertiesList = propertiesList.filter(prop => resultIds.includes(prop.id))
      console.log(`🔄 Applied search filter: ${propertiesList.length} properties after filtering`)
    } else {
      // If searching but no results, show empty list (correct behavior)
      propertiesList = []
      console.log(`❌ No search results, showing empty list`)
    }
  } else {
    console.log(`🚫 Not searching, showing all ${propertiesList.length} properties`)
  }
  
  // Apply filters to the resulting list
  const finalResult = filteredResults.value(propertiesList)
  console.log(`✅ Final filtered result: ${finalResult.length} properties`)
  return finalResult
})

// Methods
const clearSearch = () => {
  // SearchBar will handle clearing its own value via v-model
  // We just need to clear the search results
  clearSearchResults()
}

const toggleEvents = (propertyId) => {
  togglePropertyEvents(propertyId)
}

// Watchers
watch(searchQuery, (newQuery) => {
  if (newQuery.length >= 2) {
    performSearch(newQuery, properties.value)
  } else {
    // Clear search results when query is less than 2 characters
    clearSearchResults()
  }
}, { 
  flush: 'post'
})

// Watch for data changes to transform and initialize
watch(data, (newData) => {
  if (newData) {
    transformEventsToProperties(newData)
    initializeFilters(properties.value)
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  loadData()
})
</script>

<style scoped>
/* Component-specific styles */
</style>
