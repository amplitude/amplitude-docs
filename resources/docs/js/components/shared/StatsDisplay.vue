<template>
  <div class="text-right">
    <div class="text-sm text-[#1C1C1E] opacity-70 font-IBMPlex">
      <span v-if="isSearching && currentQuery">
        Searching for "<span class="font-medium">{{ currentQuery }}</span>"
      </span>
      <span v-else-if="filteredCount !== totalCount">
        Showing {{ filteredCount }} of {{ totalCount }} {{ entityName }}
      </span>
      <span v-else>
        {{ totalCount }} {{ entityName }}
      </span>
    </div>
    <div v-if="filteredCount !== totalCount" class="text-xs text-[#1C1C1E] opacity-50 mt-1 font-IBMPlex">
      {{ totalCount - filteredCount }} filtered out
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  // For permissions/events count
  totalCount: {
    type: Number,
    default: 0
  },
  filteredCount: {
    type: Number,
    default: 0
  },
  isSearching: {
    type: Boolean,
    default: false
  },
  currentQuery: {
    type: String,
    default: ''
  },
  entityType: {
    type: String,
    default: 'items',
    validator: (value) => ['events', 'properties', 'permissions', 'items'].includes(value)
  },
  // Legacy props for backward compatibility
  eventsCount: {
    type: Number,
    default: null
  },
  propertiesCount: {
    type: Number,
    default: null
  },
  permissionsCount: {
    type: Number,
    default: null
  },
  viewType: {
    type: String,
    default: null
  }
})

// Computed
const totalCount = computed(() => {
  // New unified interface
  if (props.totalCount > 0) {
    return props.totalCount
  }
  
  // Legacy compatibility
  if (props.permissionsCount !== null) {
    return props.permissionsCount
  }
  
  if (props.viewType === 'properties' && props.propertiesCount !== null) {
    return props.propertiesCount
  }
  
  if (props.eventsCount !== null) {
    return props.eventsCount
  }
  
  return 0
})

const entityName = computed(() => {
  // Legacy compatibility
  if (props.viewType === 'properties') {
    return 'properties'
  }
  
  if (props.permissionsCount !== null) {
    return 'permissions'
  }
  
  if (props.eventsCount !== null) {
    return 'events'
  }
  
  // New unified interface
  return props.entityType
})
</script>
