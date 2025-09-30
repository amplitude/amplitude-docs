<template>
  <div 
    class="event-list-item bg-white rounded-lg p-3 border border-amp-gray-100 hover:border-amp-blue-300 hover:bg-amp-blue-25 transition-all duration-200 cursor-pointer edit-container"
    @click="$emit('view-event', event.id)"
  >
    <!-- Edit Link (Local Development) -->
    <EditLink 
      v-if="isLocal"
      :event-id="event.id"
      type="event"
    />
    
    <div class="flex items-start justify-between gap-3">
      <div class="flex-1 min-w-0">
        <h6 class="text-sm font-medium text-amp-gray-900 mb-1 truncate">{{ event.title }}</h6>
        <p class="text-xs text-amp-gray-600 line-clamp-2 mb-2">{{ event.description }}</p>
        
        <!-- Badges -->
        <div class="flex flex-wrap gap-1">
          <!-- Platform badges -->
          <PlatformBadge
            v-for="platform in event.platform"
            :key="platform"
            :platform="platform"
          />
          
          <!-- Product area badges -->
          <ProductAreaBadge
            v-for="area in event.product_area || []"
            :key="area"
            :area="area"
          />
        </div>
      </div>
      
      <!-- Action button -->
      <button 
        class="flex-shrink-0 text-amp-blue-600 hover:text-amp-blue-800 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-amp-blue-500"
        @click.stop="$emit('view-event', event.id)"
        title="View event details"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import PlatformBadge from './PlatformBadge.vue'
import ProductAreaBadge from './ProductAreaBadge.vue'
import EditLink from './EditLink.vue'

defineProps({
  event: {
    type: Object,
    required: true
  },
  isLocal: {
    type: Boolean,
    default: false
  }
})

defineEmits(['view-event'])
</script>

<style scoped>
.event-list-item {
  position: relative;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.edit-container {
  position: relative;
}
</style>
