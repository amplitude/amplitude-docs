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
              :total-count="data?.permissions_count || 0"
              :filtered-count="filteredPermissions.length"
              :is-searching="isSearching"
              :current-query="searchQuery"
              entity-type="permissions"
            />
      </div>
    </div>

    <!-- Search and Filters -->
    <div>
      <div class="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 w-full">
        <div class="flex-1">
          <SearchBar 
            v-model:query="searchQuery"
            @clear="clearSearch"
            placeholder="Search permissions..."
          />
        </div>
        <FilterPanel 
          v-model:filters="filters"
          :available-product-areas="availableProductAreas"
          :is-expanded="isAllExpanded"
          @toggle-expand-collapse="toggleExpandCollapse"
        />
      </div>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="isLoading" />
    
    <!-- Permissions Table -->
    <div v-else-if="!isLoading && filteredPermissions.length > 0" class="overflow-x-auto">
      <PermissionsTable
        ref="permissionsTableRef"
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
    <ErrorState v-if="error" :error="error" @retry="loadData" />
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
import FilterPanel from './components/FilterPanel.vue'
import PermissionsTable from './components/PermissionsTable.vue'
import StatsDisplay from '../components/shared/StatsDisplay.vue'
import LoadingSpinner from '../components/shared/LoadingSpinner.vue'
import EmptyState from '../components/shared/EmptyState.vue'
import ErrorState from '../components/shared/ErrorState.vue'

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
const permissionsTableRef = ref(null)
const isAllExpanded = ref(false) // Default state is collapsed (Expand button shown)

// Composables
const { data, isLoading, error, loadData } = useDataLoader(props.dataUrl, 'permissions')
const { searchQuery, searchResults, performSearch, clearSearch: clearSearchResults } = useSearch('permissions')
const { 
  filters, 
  filteredResults, 
  availableProductAreas,
  initializeFilters,
  hasActiveFilters
} = useFilters('permissions')
const { sortField, sortDirection, sortedResults, handleSort } = useSorting('title', 'asc')

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

const toggleExpandCollapse = () => {
  if (permissionsTableRef.value) {
    if (isAllExpanded.value) {
      // Currently expanded, so collapse
      permissionsTableRef.value.collapseAll()
      isAllExpanded.value = false
    } else {
      // Currently collapsed, so expand
      permissionsTableRef.value.expandAll()
      isAllExpanded.value = true
    }
  }
}


// Watchers
watch(() => data.value, (newData) => {
  if (newData) {
    initializeFilters(newData.permissions)
  }
}, { immediate: true })

watch(searchQuery, (newQuery) => {
  if (data.value?.permissions) {
    performSearch(newQuery, data.value.permissions, props.searchDebounce)
  }
}, { immediate: true })

// Lifecycle
onMounted(async () => {
  await loadData()
})
</script>

