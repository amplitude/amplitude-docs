<template>
  <div class="related-events-content bg-amp-gray-50 rounded-xl mt-6 p-6 border border-amp-gray-200 animate-fade-in">
    <div class="mb-4">
      <h4 class="text-lg font-medium text-amp-gray-900 mb-2">Related Events</h4>
      <p class="text-sm text-amp-gray-600">Events that use the "{{ property.title }}" property:</p>
    </div>
    
    <!-- Events grouped by relationship type -->
    <div class="space-y-6">
      <!-- Event-specific usage -->
      <div v-if="eventSpecificEvents.length > 0">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-4 h-4 rounded-full bg-amp-light-purple-400 flex items-center justify-center">
            <span class="text-xs text-white">🎯</span>
          </div>
          <h5 class="text-sm font-medium text-amp-gray-900">Event-Specific Usage</h5>
          <span class="px-2 py-1 text-xs bg-amp-light-purple-100 text-amp-light-purple-700 rounded-full">
            {{ eventSpecificEvents.length }}
          </span>
        </div>
        <div class="grid gap-2">
          <EventListItem
            v-for="event in eventSpecificEvents"
            :key="`event-${event.id}`"
            :event="event"
            :is-local="isLocal"
            @view-event="$emit('view-event', event.id)"
          />
        </div>
      </div>
      
      <!-- Product-specific usage -->
      <div v-if="productSpecificEvents.length > 0">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-4 h-4 rounded-full bg-amp-blue-600 flex items-center justify-center">
            <span class="text-xs text-white">📦</span>
          </div>
          <h5 class="text-sm font-medium text-amp-gray-900">Product-Specific Usage</h5>
          <span class="px-2 py-1 text-xs bg-amp-blue-100 text-amp-blue-700 rounded-full">
            {{ productSpecificEvents.length }}
          </span>
        </div>
        <div class="grid gap-2">
          <EventListItem
            v-for="event in productSpecificEvents"
            :key="`product-${event.id}`"
            :event="event"
            :is-local="isLocal"
            @view-event="$emit('view-event', event.id)"
          />
        </div>
      </div>
      
      <!-- Core usage -->
      <div v-if="coreEvents.length > 0">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-4 h-4 rounded-full bg-amp-gray-600 flex items-center justify-center">
            <span class="text-xs text-white">⚡</span>
          </div>
          <h5 class="text-sm font-medium text-amp-gray-900">Core Usage</h5>
          <span class="px-2 py-1 text-xs bg-amp-gray-100 text-amp-gray-700 rounded-full">
            {{ coreEvents.length }}
          </span>
        </div>
        <div class="grid gap-2">
          <EventListItem
            v-for="event in coreEvents"
            :key="`core-${event.id}`"
            :event="event"
            :is-local="isLocal"
            @view-event="$emit('view-event', event.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import EventListItem from './EventListItem.vue'

const props = defineProps({
  property: {
    type: Object,
    required: true
  },
  relatedEvents: {
    type: Array,
    default: () => []
  },
  isLocal: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['view-event'])

const eventSpecificEvents = computed(() => {
  return props.relatedEvents.filter(event => event.relationship === 'event')
})

const productSpecificEvents = computed(() => {
  return props.relatedEvents.filter(event => event.relationship === 'product')
})

const coreEvents = computed(() => {
  return props.relatedEvents.filter(event => event.relationship === 'core')
})
</script>

<style scoped>
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.related-events-content {
  transition: all 0.3s ease-in-out;
}
</style>
