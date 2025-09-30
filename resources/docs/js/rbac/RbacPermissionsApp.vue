<template>
  <div class="w-full font-IBMPlex rbac-permissions-app">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-[#1C1C1E] font-IBMPlex">RBAC Permissions Reference</h1>
          <p class="text-[#1C1C1E] opacity-70 mt-2 font-IBMPlex">Search and filter all available Role-Based Access Control permissions</p>
        </div>
        <StatsDisplay 
          :permissions-count="data?.permissions_count" 
          :filtered-count="filteredPermissions.length"
          :is-searching="isSearching"
          :current-query="searchQuery"
        />
      </div>
    </div>

    <!-- Sticky Search and Filters -->
    <div class="sticky top-24 z-20">
      <div class="flex flex-col lg:flex-row gap-6">
        <SearchBar 
          v-model:query="searchQuery"
          @clear="clearSearch"
          placeholder="Search permissions..."
        />
        <FilterPanel 
          v-model:filters="filters"
          :available-product-areas="availableProductAreas"
          :show-filters="showFilters"
          @toggle-filters="showFilters = !showFilters"
        />
      </div>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="isLoading" />
    
    <!-- Permissions Table -->
    <div v-else-if="!isLoading && filteredPermissions.length > 0" class="overflow-x-auto">
      <PermissionsTable
        :permissions="filteredPermissions"
        :sort-field="sortField"
        :sort-direction="sortDirection"
        @sort="handleSort"
      />
    </div>
    
    <!-- Empty State -->
    <EmptyState 
      v-else-if="!isLoading && filteredPermissions.length === 0" 
      :is-searching="isSearching"
      :query="searchQuery"
      entity-type="permissions"
    />
    
    <!-- Error State -->
    <ErrorState v-if="error" :error="error" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRbacData } from './composables/useRbacData'
import { useRbacSearch } from './composables/useRbacSearch'
import { useRbacFilters } from './composables/useRbacFilters'
import { useRbacSorting } from './composables/useRbacSorting'

// Components
import SearchBar from '../glossary/components/SearchBar.vue'
import FilterPanel from './components/FilterPanel.vue'
import PermissionsTable from './components/PermissionsTable.vue'
import StatsDisplay from './components/StatsDisplay.vue'
import LoadingSpinner from '../glossary/components/LoadingSpinner.vue'
import EmptyState from '../glossary/components/EmptyState.vue'
import ErrorState from '../glossary/components/ErrorState.vue'

// Props
const props = defineProps({
  isLocal: {
    type: Boolean,
    default: false
  },
  dataUrl: {
    type: String,
    default: '/docs/rbac-permissions-data.json'
  },
  searchDebounce: {
    type: Number,
    default: 150
  },
  maxResults: {
    type: Number,
    default: 100
  }
})

// State
const showFilters = ref(false)

// Composables
const { data, isLoading, error, loadData } = useRbacData(props.dataUrl)
const { searchQuery, searchResults, performSearch, clearSearch: clearSearchResults } = useRbacSearch()
const { 
  filters, 
  filteredResults, 
  availableProductAreas,
  initializeFilters 
} = useRbacFilters()
const { sortField, sortDirection, sortedResults, handleSort } = useRbacSorting()

// Computed
const isSearching = computed(() => searchQuery.value.length >= 2)

const filteredPermissions = computed(() => {
  let permissions = data.value?.permissions || []
  
  // Apply search if query exists
  if (isSearching.value && searchResults.value.length > 0) {
    permissions = searchResults.value
  }
  
  // Apply filters
  const filtered = filteredResults.value(permissions)
  
  // Apply sorting
  return sortedResults.value(filtered)
})

// Methods
const clearSearch = () => {
  searchQuery.value = ''
  clearSearchResults()
}

// Watchers
watch(() => data.value, (newData) => {
  if (newData) {
    initializeFilters(newData.permissions)
  }
}, { immediate: true })

watch(searchQuery, (newQuery) => {
  if (data.value) {
    performSearch(newQuery, data.value.permissions)
  }
})

// Initialize
onMounted(async () => {
  await loadData()
})
</script>

<style scoped>
/* Ensure the app container allows for sticky positioning */
.rbac-permissions-app {
  position: relative;
  height: auto;
  overflow: visible;
}

.sticky-filters-container {
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: white;
  border-bottom: 1px solid #E6E6EB;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

/* Ensure the table container allows for sticky positioning */
:deep(.permissions-table-container) {
  position: relative;
  overflow: visible;
}

/* Make table headers sticky below the filters */
:deep(.permissions-table thead) {
  position: sticky;
  top: 97px;
  z-index: 10;
  background-color: #F6F6F9;
}

/* Make product area headers sticky below table headers */
:deep(.product-area-header) {
  z-index: 5;
  background-color: #F6F6F9;
}

/* Ensure parent containers don't interfere with sticky positioning */
:deep(#rbac-permissions-container) {
  position: relative;
  overflow: visible;
}
</style>
