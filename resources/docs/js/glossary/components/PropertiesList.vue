<template>
  <div class="space-y-3">
    <div
      v-for="property in properties"
      :key="property.id"
      class="property-row bg-white rounded-lg p-4 border border-amp-gray-100 edit-container transition-colors hover:bg-amp-gray-50"
    >
      <!-- Edit Link (Local Development) -->
      <EditLink 
        v-if="isLocal"
        :event-id="property.id"
        type="property"
      />
      
      <div class="flex flex-col lg:flex-row lg:items-start gap-3">
        <!-- Property Name -->
        <div class="lg:w-1/3">
          <h5 class="text-sm font-semibold text-amp-gray-900">{{ property.title }}</h5>
          <div v-if="property.data_type && property.data_type.length > 0" class="flex flex-wrap gap-1 mt-2">
            <span
              v-for="type in property.data_type"
              :key="type"
              class="inline-flex items-center px-2 py-1 text-xs bg-amp-blue-50 text-amp-blue-700 rounded-md font-medium"
            >
              {{ type }}
            </span>
          </div>
        </div>
        
        <!-- Property Description -->
        <div class="lg:w-2/3">
          <p class="text-sm text-amp-gray-700 leading-relaxed">{{ property.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EditLink from './EditLink.vue'

defineProps({
  properties: {
    type: Array,
    default: () => []
  },
  isLocal: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.edit-container {
  position: relative;
}

.property-row:hover .edit-link {
  opacity: 1;
  visibility: visible;
}
</style>
