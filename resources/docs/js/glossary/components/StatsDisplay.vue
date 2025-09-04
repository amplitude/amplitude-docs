<template>
  <div 
    v-show="shouldShow" 
    class="flex items-center gap-4 text-sm text-amp-gray-500"
  >
    <span class="px-3 py-1 bg-amp-gray-50 rounded-full">
      {{ primaryText }}
    </span>
    <span 
      v-show="isSearching && secondaryText" 
      class="px-3 py-1 bg-amp-blue-50 text-amp-blue-700 rounded-full"
    >
      {{ secondaryText }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  eventsCount: {
    type: Number,
    default: 0
  },
  propertiesCount: {
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
  viewType: {
    type: String,
    default: 'events', // 'events' or 'properties'
    validator: (value) => ['events', 'properties'].includes(value)
  }
})

const totalCount = computed(() => {
  return props.viewType === 'properties' ? props.propertiesCount : props.eventsCount
})

const entityName = computed(() => {
  return props.viewType === 'properties' ? 'properties' : 'events'
})

const entityNameSingular = computed(() => {
  return props.viewType === 'properties' ? 'property' : 'event'
})

const shouldShow = computed(() => {
  return totalCount.value > 0 || props.filteredCount > 0
})

const primaryText = computed(() => {
  if (props.isSearching && props.currentQuery) {
    return `${props.filteredCount} search results for "${props.currentQuery}"`
  } else if (props.isSearching) {
    return `${props.filteredCount} results`
  } else {
    return `${totalCount.value} ${entityName.value}`
  }
})

const secondaryText = computed(() => {
  if (props.isSearching && totalCount.value > 0) {
    return `of ${totalCount.value} total ${entityName.value}`
  }
  return ''
})
</script>
