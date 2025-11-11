<template>
  <div class="property-item bg-white rounded-lg border border-[#E6E6EB] p-4 hover:shadow-sm transition-shadow">
    <div class="flex flex-col sm:flex-row sm:items-start gap-3">
      <!-- Property Name and Type -->
      <div class="sm:w-1/3">
        <div class="flex items-center gap-2 mb-2">
          <h6 class="text-sm font-medium text-[#1C1C1E] font-IBMPlex">{{ property.title }}</h6>
          <PropertyTypeBadge :type="type" />
        </div>
        
        <!-- Data Types -->
        <div v-if="property.data_type && property.data_type.length > 0" class="flex flex-wrap gap-1">
          <span
            v-for="dataType in property.data_type"
            :key="dataType"
            class="inline-flex items-center px-2 py-1 text-xs bg-[#F0F4FF] text-[#1C1C1E] rounded-md font-medium font-IBMPlex"
          >
            {{ formatDataType(dataType) }}
          </span>
        </div>
      </div>
      
      <!-- Property Description -->
      <div class="sm:w-2/3">
        <p class="text-sm text-[#1C1C1E] leading-relaxed font-IBMPlex">
          {{ property.description || 'No description available' }}
        </p>
        
        <!-- Additional Property Info -->
        <div v-if="hasAdditionalInfo" class="mt-2 pt-2 border-t border-[#E6E6EB]">
          <div class="flex flex-wrap gap-4 text-xs text-[#1C1C1E] opacity-70 font-IBMPlex">
            <span v-if="property.property_type">
              Type: {{ formatPropertyType(property.property_type) }}
            </span>
            <span v-if="property.required">
              Required
            </span>
            <span v-if="property.deprecated">
              Deprecated
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PropertyTypeBadge from './PropertyTypeBadge.vue'

// Props
const props = defineProps({
  property: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['event', 'product', 'core'].includes(value)
  }
})

// Computed
const hasAdditionalInfo = computed(() => 
  props.property.property_type || props.property.required || props.property.deprecated
)

// Methods
const formatDataType = (dataType) => {
  const typeMap = {
    'string': 'String',
    'number': 'Number',
    'boolean': 'Boolean',
    'array': 'Array',
    'object': 'Object',
    'date': 'Date',
    'datetime': 'DateTime',
    'integer': 'Integer',
    'float': 'Float'
  }
  return typeMap[dataType] || dataType.charAt(0).toUpperCase() + dataType.slice(1)
}

const formatPropertyType = (propertyType) => {
  const typeMap = {
    'core': 'Core Property',
    'product': 'Product Property',
    'event': 'Event Property',
    'user': 'User Property',
    'group': 'Group Property'
  }
  return typeMap[propertyType] || propertyType.charAt(0).toUpperCase() + propertyType.slice(1)
}
</script>
