<template>
  <div class="space-y-6">
    <!-- Properties Overview -->
    <div class="bg-white rounded-lg border border-[#E6E6EB] p-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-sm font-semibold text-[#1C1C1E] font-IBMPlex">Properties Overview</h4>
        <div class="flex items-center gap-2">
          <span class="text-xs text-[#1C1C1E] opacity-60 font-IBMPlex">{{ totalPropertiesCount }} total</span>
          <button 
            v-if="activeFilter !== 'all'"
            @click="setActiveFilter('all')"
            class="text-xs text-[#0066FF] hover:text-[#0052CC] font-IBMPlex underline"
          >
            Show All
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button 
          v-if="hasEventProperties"
          @click="setActiveFilter('event')"
          :class="[
            'text-center p-3 rounded-lg transition-all duration-200 cursor-pointer hover:shadow-md',
            activeFilter === 'event' 
              ? 'bg-[#E0E7FF] border-2 border-[#0066FF] shadow-md' 
              : 'bg-[#F0F4FF] border-2 border-transparent hover:border-[#E0E7FF]'
          ]"
        >
          <div class="text-lg font-semibold text-[#1C1C1E] font-IBMPlex">{{ eventPropertiesCount }}</div>
          <div class="text-xs text-[#1C1C1E] opacity-70 font-IBMPlex">Event-Specific</div>
        </button>
        <button 
          v-if="hasProductProperties"
          @click="setActiveFilter('product')"
          :class="[
            'text-center p-3 rounded-lg transition-all duration-200 cursor-pointer hover:shadow-md',
            activeFilter === 'product' 
              ? 'bg-[#E0F2FE] border-2 border-[#0066FF] shadow-md' 
              : 'bg-[#F0F9FF] border-2 border-transparent hover:border-[#E0F2FE]'
          ]"
        >
          <div class="text-lg font-semibold text-[#1C1C1E] font-IBMPlex">{{ productPropertiesCount }}</div>
          <div class="text-xs text-[#1C1C1E] opacity-70 font-IBMPlex">Product-Specific</div>
        </button>
        <button 
          v-if="hasCoreProperties"
          @click="setActiveFilter('core')"
          :class="[
            'text-center p-3 rounded-lg transition-all duration-200 cursor-pointer hover:shadow-md',
            activeFilter === 'core' 
              ? 'bg-[#E6E6EB] border-2 border-[#0066FF] shadow-md' 
              : 'bg-[#F6F6F9] border-2 border-transparent hover:border-[#E6E6EB]'
          ]"
        >
          <div class="text-lg font-semibold text-[#1C1C1E] font-IBMPlex">{{ corePropertiesCount }}</div>
          <div class="text-xs text-[#1C1C1E] opacity-70 font-IBMPlex">Core Properties</div>
        </button>
      </div>
    </div>

    <!-- Event-Specific Properties -->
    <div v-if="shouldShowEventProperties" class="space-y-3">
      <div class="flex items-center gap-2">
        <span class="text-xs">⚡</span>
        <h5 class="text-sm font-semibold text-[#1C1C1E] font-IBMPlex">Event-Specific Properties</h5>
        <span class="px-2 py-1 text-xs bg-[#F0F4FF] text-[#1C1C1E] rounded-full font-IBMPlex">{{ eventPropertiesCount }}</span>
      </div>
      <p class="text-xs text-[#1C1C1E] opacity-70 font-IBMPlex mb-3">Properties that are unique to this specific event</p>
      <div class="space-y-2">
        <PropertyItem 
          v-for="property in event.event_specific_properties" 
          :key="property.id" 
          :property="property"
          type="event"
        />
      </div>
    </div>

    <!-- Product-Specific Properties -->
    <div v-if="shouldShowProductProperties" class="space-y-3">
      <div class="flex items-center gap-2">
        <span class="text-xs">📦</span>
        <h5 class="text-sm font-semibold text-[#1C1C1E] font-IBMPlex">Product-Specific Properties</h5>
        <span class="px-2 py-1 text-xs bg-[#F0F9FF] text-[#1C1C1E] rounded-full font-IBMPlex">{{ productPropertiesCount }}</span>
      </div>
      <p class="text-xs text-[#1C1C1E] opacity-70 font-IBMPlex mb-3">Properties specific to certain product areas or features</p>
      <div class="space-y-2">
        <PropertyItem 
          v-for="property in event.product_specific_properties" 
          :key="property.id" 
          :property="property"
          type="product"
        />
      </div>
    </div>

    <!-- Core Properties -->
    <div v-if="shouldShowCoreProperties" class="space-y-3">
      <div class="flex items-center gap-2">
        <span class="text-xs">🔧</span>
        <h5 class="text-sm font-semibold text-[#1C1C1E] font-IBMPlex">Core Properties</h5>
        <span class="px-2 py-1 text-xs bg-[#F6F6F9] text-[#1C1C1E] rounded-full font-IBMPlex">{{ corePropertiesCount }}</span>
      </div>
      <p class="text-xs text-[#1C1C1E] opacity-70 font-IBMPlex mb-3">Standard properties available across all events</p>
      <div class="space-y-2">
        <PropertyItem 
          v-for="property in event.core_properties" 
          :key="property.id" 
          :property="property"
          type="core"
        />
      </div>
    </div>

    <!-- No Properties Message -->
    <div v-if="!hasAnyProperties" class="text-center py-8">
      <div class="text-[#1C1C1E] opacity-50 font-IBMPlex">No properties available for this event</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import PropertyItem from './PropertyItem.vue'

// Props
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

// State
const activeFilter = ref('all') // 'all', 'event', 'product', 'core'

// Methods
const setActiveFilter = (filter) => {
  activeFilter.value = filter
}

// Computed
const hasEventProperties = computed(() => 
  props.event.event_specific_properties && props.event.event_specific_properties.length > 0
)

const hasProductProperties = computed(() => 
  props.event.product_specific_properties && props.event.product_specific_properties.length > 0
)

const hasCoreProperties = computed(() => 
  props.event.core_properties && props.event.core_properties.length > 0
)

const hasAnyProperties = computed(() => 
  hasEventProperties.value || hasProductProperties.value || hasCoreProperties.value
)

const eventPropertiesCount = computed(() => 
  props.event.event_specific_properties?.length || 0
)

const productPropertiesCount = computed(() => 
  props.event.product_specific_properties?.length || 0
)

const corePropertiesCount = computed(() => 
  props.event.core_properties?.length || 0
)

const totalPropertiesCount = computed(() => 
  eventPropertiesCount.value + productPropertiesCount.value + corePropertiesCount.value
)

// Filter visibility computed properties
const shouldShowEventProperties = computed(() => 
  hasEventProperties.value && (activeFilter.value === 'all' || activeFilter.value === 'event')
)

const shouldShowProductProperties = computed(() => 
  hasProductProperties.value && (activeFilter.value === 'all' || activeFilter.value === 'product')
)

const shouldShowCoreProperties = computed(() => 
  hasCoreProperties.value && (activeFilter.value === 'all' || activeFilter.value === 'core')
)
</script>
