<template>
  <div 
    :class="[
      'event-card bg-white rounded-xl p-6 border edit-container transition-all duration-200',
      isExpanded ? 'expanded border-amp-blue-500 shadow-lg' : 'border-amp-gray-200 hover:border-amp-blue-500 hover:shadow-md'
    ]"
    :data-event-id="event.id" 
    :data-event-title="event.title"
  >
    <!-- Edit Link (Local Development) -->
    <EditLink 
      v-if="isLocal"
      :event-id="event.id"
      type="event"
    />

    <!-- Event Header -->
    <div class="event-grid">
      <div class="flex flex-col justify-center space-y-3">
        <div>
          <h3 class="text-lg font-semibold text-amp-gray-900 mb-2">{{ event.title }}</h3>
          <div class="flex flex-wrap gap-2 mb-2">
            <PlatformBadge
              v-for="platform in event.platform"
              :key="platform"
              :platform="platform"
            />
            <ProductAreaBadge
              v-for="area in event.product_area || []"
              :key="area"
              :area="area"
            />
          </div>
        </div>
      </div>
      
      <div class="flex lg:justify-center items-center">
        <PropertiesButton
          :total-properties="totalProperties"
          :is-expanded="isExpanded"
          @click="$emit('toggle-properties', event.id)"
        />
      </div>
      
      <div class="flex items-center">
        <p class="text-amp-gray-700 leading-relaxed">{{ event.description }}</p>
      </div>
    </div>
    
    <!-- Mobile Properties Button -->
    <div class="lg:hidden mt-4 pt-4 border-t border-amp-gray-100">
      <PropertiesButton
        :total-properties="totalProperties"
        :is-expanded="isExpanded"
        @click="$emit('toggle-properties', event.id)"
      />
    </div>
    
    <!-- Properties Container -->
    <PropertiesPanel
      v-if="isExpanded"
      :event="event"
      :is-local="isLocal"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PlatformBadge from './PlatformBadge.vue'
import ProductAreaBadge from './ProductAreaBadge.vue'
import PropertiesButton from './PropertiesButton.vue'
import PropertiesPanel from './PropertiesPanel.vue'
import EditLink from './EditLink.vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  isLocal: {
    type: Boolean,
    default: false
  },
  expandedEvent: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['toggle-properties'])

const isExpanded = computed(() => {
  return props.expandedEvent === props.event.id
})

const totalProperties = computed(() => {
  return (props.event.core_properties_count || 0) + 
         (props.event.product_specific_properties_count || 0) + 
         (props.event.event_specific_properties_count || 0)
})
</script>

<style scoped>
/* Event Card Styles */
.event-card {
  transition: all 0.2s ease-in-out;
}


/* Responsive Grid */
@media (min-width: 1024px) {
  .event-grid {
    display: grid;
    grid-template-columns: 280px 1fr 2fr;
    gap: 1.5rem;
    align-items: center;
  }
}

/* Mobile Optimizations */
@media (max-width: 1023px) {
  .event-card {
    padding: 1rem;
  }
}

/* Edit Container positioning */
.edit-container {
  position: relative;
}
</style>
