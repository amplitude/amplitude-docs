<template>
  <div class="w-full font-IBMPlex glossary-app">
    <!-- View Toggle -->
    <div class="mb-6">
      <div class="flex items-center gap-1 p-1 bg-[#F6F6F9] rounded-lg w-fit">
        <button 
          @click="currentView = 'events'"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
            currentView === 'events' 
              ? 'bg-white text-[#0066FF] shadow-sm' 
              : 'text-[#1C1C1E] opacity-70 hover:opacity-100'
          ]"
        >
          📅 Events View
        </button>
        <button 
          @click="currentView = 'properties'"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
            currentView === 'properties' 
              ? 'bg-white text-[#0066FF] shadow-sm' 
              : 'text-[#1C1C1E] opacity-70 hover:opacity-100'
          ]"
        >
          🏷️ Properties View
        </button>
      </div>
    </div>

    <!-- Events View -->
    <div v-if="currentView === 'events'">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 class="text-2xl font-bold text-[#1C1C1E] font-IBMPlex">Event Glossary</h1>
            <p class="text-[#1C1C1E] opacity-70 mt-2 font-IBMPlex">Search and filter all available events and their properties</p>
          </div>
          <StatsDisplay 
            :total-count="data?.events_count || 0"
            :filtered-count="filteredEvents.length"
            :is-searching="isSearching"
            :current-query="searchQuery"
            entity-type="events"
          />
        </div>
      </div>

      <!-- Sticky Search and Filters -->
      <div class="sticky top-24 z-20">
        <div class="flex flex-col lg:flex-row gap-6">
          <SearchBar 
            v-model:query="searchQuery"
            @clear="clearSearch"
            placeholder="Search events..."
          />
          <SimpleFilterPanel 
            v-model:filters="filters"
            :available-product-areas="availableProductAreas"
            :available-platforms="availablePlatforms"
          />
        </div>
      </div>

      <!-- Loading State -->
      <LoadingSpinner v-if="isLoading" />
      
      <!-- Events Table -->
      <div v-else-if="!isLoading && filteredEvents.length > 0" class="overflow-x-auto">
        <EventsTable
          :events="filteredEvents"
          :sort-field="sortField"
          :sort-direction="sortDirection"
          @sort="handleSort"
        />
      </div>
      
      <!-- Empty State -->
      <EmptyState 
        v-else-if="!isLoading && filteredEvents.length === 0 && !error"
        :is-searching="isSearching"
        :query="searchQuery"
        entity-type="events"
        @clear-search="clearSearch"
      />

      <!-- Error State -->
      <ErrorState v-if="error" :error="error" @retry="loadData" />
    </div>

    <!-- Properties View -->
    <PropertiesView 
      v-else-if="currentView === 'properties'"
      :is-local="isLocal"
      :data-url="dataUrl"
      @view-event="switchToEventView"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useDataLoader } from '../composables/shared/useDataLoader'
import { useSearch } from '../composables/shared/useSearch'
import { useFilters } from '../composables/shared/useFilters'
import { useSorting } from '../composables/shared/useSorting'

// Components
import SearchBar from '../components/shared/SearchBar.vue'
import SimpleFilterPanel from './components/SimpleFilterPanel.vue'
import EventsTable from './components/EventsTable.vue'
import StatsDisplay from '../components/shared/StatsDisplay.vue'
import LoadingSpinner from '../components/shared/LoadingSpinner.vue'
import EmptyState from '../components/shared/EmptyState.vue'
import ErrorState from '../components/shared/ErrorState.vue'
import PropertiesView from './components/PropertiesView.vue'

// Props
const props = defineProps({
  isLocal: {
    type: Boolean,
    default: false
  },
  dataUrl: {
    type: String,
    default: '/docs/glossary-data.json'
  },
  searchDebounce: {
    type: Number,
    default: 150
  },
  maxResults: {
    type: Number,
    default: 50
  }
})

// State
const currentView = ref('events') // 'events' or 'properties'

// Composables
const { data, isLoading, error, loadData } = useDataLoader(props.dataUrl, 'events')
const { searchQuery, searchResults, performSearch, clearSearch: clearSearchResults } = useSearch('events')
const { 
  filters, 
  filteredResults, 
  availablePlatforms, 
  availableProductAreas,
  initializeFilters,
  hasActiveFilters
} = useFilters('events')
const { sortField, sortDirection, sortedResults, handleSort } = useSorting('title', 'asc')

// Computed
const isSearching = computed(() => searchQuery.value.length >= 2)

const filteredEvents = computed(() => {
  let events = data.value?.events || []
  
  // Apply search if query exists
  if (isSearching.value && searchResults.value.length > 0) {
    events = searchResults.value
  }
  
  // Apply filters
  const filtered = filteredResults.value(events)
  
  // Apply sorting
  return sortedResults.value(filtered)
})

// Methods
const clearSearch = () => {
  searchQuery.value = ''
  clearSearchResults()
}

const clearAllFilters = () => {
  filters.value = {
    productAreas: [],
    platforms: [],
    advanced: null,
    hasProperties: null,
    propertyTypes: []
  }
}

const switchToEventView = (eventId) => {
  currentView.value = 'events'
  // Could add logic to highlight specific event
}

const toggleProperties = (eventId) => {
  // Handle properties toggle if needed
}

// Watchers
watch(() => data.value, (newData) => {
  if (newData) {
    initializeFilters(newData.events)
  }
}, { immediate: true })

watch(searchQuery, (newQuery) => {
  if (data.value?.events) {
    performSearch(newQuery, data.value, props.searchDebounce)
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  loadData()
})
</script>

<style scoped>
/* Ensure the app container allows for sticky positioning */
.glossary-app {
  position: relative;
  height: auto;
  overflow: visible;
}

/* Make table headers sticky below the filters */
:deep(.events-table thead) {
  position: sticky;
  top: 122px; /* Adjusted to be below the new sticky filter container */
  z-index: 10;
  background-color: #F6F6F9;
}

/* Make product area headers sticky below table headers */
:deep(.product-area-header) {
  position: sticky;
  top: 171px; /* Adjusted to be below the sticky table headers */
  z-index: 5;
  background-color: #F6F6F9;
}

/* Ensure parent containers don't interfere with sticky positioning */
:deep(#glossary-container) {
  position: relative;
  overflow: visible;
}
</style>
