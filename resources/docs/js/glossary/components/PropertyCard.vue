<template>
  <div 
    :class="[
      'property-card bg-white rounded-xl p-6 border edit-container transition-all duration-200',
      isExpanded ? 'expanded border-amp-blue-500 shadow-lg' : 'border-amp-gray-200 hover:border-amp-blue-500 hover:shadow-md'
    ]"
    :data-property-id="property.id" 
    :data-property-title="property.title"
  >
    <!-- Edit Link (Local Development) -->
    <EditLink 
      v-if="isLocal"
      :event-id="property.id"
      type="property"
    />

    <!-- Property Header -->
    <div class="property-grid">
      <div class="flex flex-col justify-center space-y-3">
        <div>
          <h3 class="text-lg font-semibold text-amp-gray-900 mb-2">{{ property.title }}</h3>
          <div class="flex flex-wrap gap-2 mb-3">
            <PropertyTypeBadges :types="Array.from(property.relationships || [])" />
            <DataTypeBadges v-if="property.data_type" :types="property.data_type" />
            <UsageBadge :count="property.usageCount" />
          </div>
        </div>
      </div>
      
      <div class="flex lg:justify-center items-center">
        <RelatedEventsButton
          :event-count="property.relatedEvents?.length || 0"
          :is-expanded="isExpanded"
          @click="$emit('toggle-events', property.id)"
        />
      </div>
      
      <div class="flex items-center">
        <p class="text-amp-gray-700 leading-relaxed">
          {{ property.description || 'No description available' }}
        </p>
      </div>
    </div>
    
    <!-- Mobile Events Button -->
    <div class="lg:hidden mt-4 pt-4 border-t border-amp-gray-100">
      <RelatedEventsButton
        :event-count="property.relatedEvents?.length || 0"
        :is-expanded="isExpanded"
        @click="$emit('toggle-events', property.id)"
      />
    </div>
    
    <!-- Related Events Container -->
    <RelatedEventsPanel
      v-if="isExpanded"
      :property="property"
      :related-events="relatedEvents"
      :is-local="isLocal"
      @view-event="$emit('view-event', $event)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PropertyTypeBadges from './PropertyTypeBadges.vue'
import DataTypeBadges from './DataTypeBadges.vue'
import UsageBadge from './UsageBadge.vue'
import RelatedEventsButton from './RelatedEventsButton.vue'
import RelatedEventsPanel from './RelatedEventsPanel.vue'
import EditLink from './EditLink.vue'

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
  },
  expandedProperty: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['toggle-events', 'view-event'])

const isExpanded = computed(() => {
  return props.expandedProperty === props.property.id
})
</script>

<style scoped>
/* Property Card Styles */
.property-card {
  transition: all 0.2s ease-in-out;
}

/* Responsive Grid */
@media (min-width: 1024px) {
  .property-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 1.5rem;
    align-items: center;
  }
}

/* Mobile Optimizations */
@media (max-width: 1023px) {
  .property-card {
    padding: 1rem;
  }
}

/* Edit Container positioning */
.edit-container {
  position: relative;
}
</style>
