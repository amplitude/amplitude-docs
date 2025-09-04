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
  }
})

const shouldShow = computed(() => {
  return props.eventsCount > 0 || props.filteredCount > 0
})

const primaryText = computed(() => {
  if (props.isSearching && props.currentQuery) {
    return `${props.filteredCount} search results for "${props.currentQuery}"`
  } else if (props.isSearching) {
    return `${props.filteredCount} results`
  } else {
    return `${props.eventsCount} events`
  }
})

const secondaryText = computed(() => {
  if (props.isSearching && props.eventsCount > 0) {
    return `of ${props.eventsCount} total events`
  }
  return ''
})
</script>
