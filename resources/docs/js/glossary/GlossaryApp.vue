<template>
  <div class="w-full font-IBMPlex" id="glossary-container">
    <!-- View Toggle -->
    <div class="mb-6">
      <div class="flex items-center gap-1 p-1 bg-amp-gray-100 rounded-lg w-fit">
        <button 
          @click="currentView = 'events'"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
            currentView === 'events' 
              ? 'bg-white text-amp-blue-600 shadow-sm' 
              : 'text-amp-gray-600 hover:text-amp-gray-900'
          ]"
        >
          📅 Events View
        </button>
        <button 
          @click="currentView = 'properties'"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
            currentView === 'properties' 
              ? 'bg-white text-amp-blue-600 shadow-sm' 
              : 'text-amp-gray-600 hover:text-amp-gray-900'
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
            <h1 class="text-2xl font-medium text-amp-gray-900 font-Gellix">Event Glossary</h1>
            <p class="text-amp-gray-600 mt-1">Discover all available events and their properties</p>
          </div>
          <StatsDisplay 
            :events-count="data?.events_count" 
            :filtered-count="filteredEvents.length"
            :is-searching="isSearching"
            :current-query="searchQuery"
            view-type="events"
          />
        </div>
        
        <!-- Enhanced Search with Filters -->
        <div class="flex flex-col lg:flex-row gap-4">
          <SearchBar 
            v-model:query="searchQuery"
            @clear="clearSearch"
          />
          <FilterPanel 
            v-model:filters="filters"
            :available-platforms="availablePlatforms"
            :available-product-areas="availableProductAreas"
            :show-filters="showFilters"
            @toggle-filters="showFilters = !showFilters"
          />
        </div>
      </div>

      <!-- Loading State -->
      <LoadingSpinner v-if="isLoading" />
      
      <!-- Content -->
      <div v-else-if="!isLoading && filteredEvents.length > 0" class="space-y-4">
        <EventCard
          v-for="event in filteredEvents"
          :key="event.id"
          :event="event"
          :is-local="isLocal"
          :expanded-event="expandedEvent"
          @toggle-properties="toggleProperties"
        />
      </div>
      
      <!-- Empty State -->
      <EmptyState 
        v-else-if="!isLoading && filteredEvents.length === 0" 
        :is-searching="isSearching"
        :query="searchQuery"
      />
      
      <!-- Error State -->
      <ErrorState v-if="error" :error="error" />
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
import { useGlossaryData } from './composables/useGlossaryData'
import { useSearch } from './composables/useSearch'
import { useFilters } from './composables/useFilters'

// Components
import SearchBar from './components/SearchBar.vue'
import FilterPanel from './components/FilterPanel.vue'
import EventCard from './components/EventCard.vue'
import StatsDisplay from './components/StatsDisplay.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import EmptyState from './components/EmptyState.vue'
import ErrorState from './components/ErrorState.vue'
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
const expandedEvent = ref(null)
const showFilters = ref(false)

// Composables
const { data, isLoading, error, loadData } = useGlossaryData(props.dataUrl)
const { searchQuery, searchResults, performSearch, clearSearch: clearSearchResults } = useSearch()
const { 
  filters, 
  filteredResults, 
  availablePlatforms, 
  availableProductAreas,
  initializeFilters 
} = useFilters()

// Computed
const isSearching = computed(() => searchQuery.value.length >= 2)

const filteredEvents = computed(() => {
  let events = data.value?.events || []
  
  // Apply search if query exists
  if (isSearching.value && searchResults.value.length > 0) {
    events = searchResults.value
  }
  
  // Apply filters
  return filteredResults.value(events)
})

// Methods
const clearSearch = () => {
  searchQuery.value = ''
  clearSearchResults()
}

const toggleProperties = (eventId) => {
  if (expandedEvent.value === eventId) {
    expandedEvent.value = null
  } else {
    expandedEvent.value = eventId
  }
}

const switchToEventView = (eventId) => {
  currentView.value = 'events'
  // Optionally expand the specific event
  if (eventId) {
    expandedEvent.value = eventId
  }
}

// Watchers
watch(searchQuery, (newQuery) => {
  if (newQuery.length >= 2) {
    performSearch(newQuery, data.value)
  } else if (newQuery.length === 0) {
    clearSearchResults()
  }
}, { 
  flush: 'post' // Ensure DOM updates before search
})

// Watch for data changes to initialize filters
watch(data, (newData) => {
  if (newData) {
    initializeFilters(newData.events)
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  loadData()
})
</script>

<style scoped>
/* Component-specific styles can go here */
/* Most styles will come from Tailwind classes */
</style>
