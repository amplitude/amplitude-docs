<template>
  <div class="text-center py-16">
    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-amp-gray-100 flex items-center justify-center">
      <svg class="w-8 h-8 text-amp-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
    <h3 class="text-lg font-medium text-amp-gray-900 mb-2">{{ title }}</h3>
    <p class="text-amp-gray-600">{{ message }}</p>
    
    <div v-if="isSearching && query" class="mt-4">
      <button
        @click="$emit('clear-search')"
        class="inline-flex items-center gap-2 px-4 py-2 text-sm text-amp-blue-600 hover:text-amp-blue-800 underline transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        Clear search
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isSearching: {
    type: Boolean,
    default: false
  },
  query: {
    type: String,
    default: ''
  },
  entityType: {
    type: String,
    default: 'events',
    validator: (value) => ['events', 'properties'].includes(value)
  }
})

const emit = defineEmits(['clear-search'])

const entityName = computed(() => props.entityType)

const title = computed(() => {
  return props.isSearching ? `No ${entityName.value} found` : `No ${entityName.value} available`
})

const message = computed(() => {
  if (props.isSearching && props.query) {
    return `No ${entityName.value} match "${props.query}". Try adjusting your search terms.`
  } else if (props.isSearching) {
    return 'Try adjusting your search terms or filters'
  } else {
    return `There are no ${entityName.value} to display`
  }
})
</script>
