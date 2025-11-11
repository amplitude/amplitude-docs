<template>
  <div class="properties-content bg-amp-gray-50 rounded-xl mt-6 p-6 border border-amp-gray-200 animate-fade-in">
    <div v-if="hasAnyProperties">
      <div class="mb-4">
        <h4 class="text-lg font-medium text-amp-gray-900 mb-2">Event Properties</h4>
        <p class="text-sm text-amp-gray-600">Properties are organized by their scope and application:</p>
      </div>
      
      <!-- Tab Navigation -->
      <div class="flex border-b border-amp-gray-200 mb-6" role="tablist">
        <TabButton
          v-if="hasEventProperties"
          :active="activeTab === 'event'"
          @click="activeTab = 'event'"
          icon="⚡"
          color="purple"
        >
          Event-Specific
          <template #count>{{ event.event_specific_properties?.length || 0 }}</template>
        </TabButton>
        
        <TabButton
          v-if="hasProductProperties"
          :active="activeTab === 'product'"
          @click="activeTab = 'product'"
          icon="📦"
          color="blue"
        >
          Product-Specific
          <template #count>{{ event.product_specific_properties?.length || 0 }}</template>
        </TabButton>
        
        <TabButton
          v-if="hasCoreProperties"
          :active="activeTab === 'core'"
          @click="activeTab = 'core'"
          icon="✓"
          color="gray"
        >
          Core Properties
          <template #count>{{ event.core_properties?.length || 0 }}</template>
        </TabButton>
      </div>
      
      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Event-Specific Properties -->
        <div 
          v-if="hasEventProperties && activeTab === 'event'"
          class="tab-panel animate-fade-in"
          role="tabpanel"
        >
          <div class="mb-4">
            <p class="text-sm text-amp-gray-600">Properties unique to this specific event:</p>
          </div>
          <PropertiesList 
            :properties="event.event_specific_properties"
            :is-local="isLocal"
          />
        </div>
        
        <!-- Product-Specific Properties -->
        <div 
          v-if="hasProductProperties && activeTab === 'product'"
          class="tab-panel animate-fade-in"
          role="tabpanel"
        >
          <div class="mb-4">
            <p class="text-sm text-amp-gray-600">Properties that apply to this product area:</p>
          </div>
          <PropertiesList 
            :properties="event.product_specific_properties"
            :is-local="isLocal"
          />
        </div>
        
        <!-- Core Properties -->
        <div 
          v-if="hasCoreProperties && activeTab === 'core'"
          class="tab-panel animate-fade-in"
          role="tabpanel"
        >
          <div class="mb-4">
            <p class="text-sm text-amp-gray-600">Standard properties available across all events:</p>
          </div>
          <PropertiesList 
            :properties="event.core_properties"
            :is-local="isLocal"
          />
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-8">
      <p class="text-amp-gray-500 italic">No properties available for this event.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TabButton from './TabButton.vue'
import PropertiesList from './PropertiesList.vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  isLocal: {
    type: Boolean,
    default: false
  }
})

const activeTab = ref('')

const hasCoreProperties = computed(() => {
  return props.event.core_properties && props.event.core_properties.length > 0
})

const hasProductProperties = computed(() => {
  return props.event.product_specific_properties && props.event.product_specific_properties.length > 0
})

const hasEventProperties = computed(() => {
  return props.event.event_specific_properties && props.event.event_specific_properties.length > 0
})

const hasAnyProperties = computed(() => {
  return hasCoreProperties.value || hasProductProperties.value || hasEventProperties.value
})

// Set default active tab based on available properties
onMounted(() => {
  if (hasEventProperties.value) {
    activeTab.value = 'event'
  } else if (hasProductProperties.value) {
    activeTab.value = 'product'
  } else if (hasCoreProperties.value) {
    activeTab.value = 'core'
  }
})
</script>

<style scoped>
@keyframes fadeIn {
  /* from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  } */
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.properties-content {
  transition: all 0.3s ease-in-out;
}
</style>
