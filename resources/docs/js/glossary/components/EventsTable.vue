<template>
  <div class="events-table-container bg-white border border-[#E6E6EB] rounded-lg overflow-hidden shadow-sm">
    <table class="min-w-full divide-y divide-[#E6E6EB] mt-0">
      <thead class="bg-[#F6F6F9]">
        <tr>
          <th 
            scope="col" 
            class="px-6 py-4 text-left text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors font-IBMPlex"
            @click="$emit('sort', 'title')"
          >
            <div class="flex items-center space-x-2">
              <span>Event</span>
              <SortIcon :field="'title'" :current-field="sortField" :direction="sortDirection" />
            </div>
          </th>
          <th 
            scope="col" 
            class="px-6 py-4 text-left text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors font-IBMPlex"
            @click="$emit('sort', 'platform')"
          >
            <div class="flex items-center space-x-2">
              <span>Platform</span>
              <SortIcon :field="'platform'" :current-field="sortField" :direction="sortDirection" />
            </div>
          </th>
          <th 
            scope="col" 
            class="px-6 py-4 text-left text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors font-IBMPlex"
            @click="$emit('sort', 'properties_count')"
          >
            <div class="flex items-center space-x-2">
              <span>Properties</span>
              <SortIcon :field="'properties_count'" :current-field="sortField" :direction="sortDirection" />
            </div>
          </th>
          <th scope="col" class="px-6 py-4 text-center text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider font-IBMPlex w-16">
            <!-- Expand column -->
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <template v-for="group in groupedEvents" :key="group.productArea">
          <!-- Product Area Header Row -->
          <tr class="product-area-header bg-[#F6F6F9]">
            <td colspan="4" class="px-6 py-6 border-b border-[#E6E6EB]">
              <div class="flex items-center space-x-3">
                <span class="text-base font-semibold text-[#1C1C1E] font-IBMPlex">{{ getProductAreaLabel(group.productArea) }}</span>
                <span class="text-sm font-medium text-[#1C1C1E] opacity-70 font-IBMPlex">({{ group.events.length }} events)</span>
              </div>
            </td>
          </tr>
          
          <!-- Events in this group -->
          <template v-for="event in group.events" :key="event.id">
            <!-- Main event row -->
            <tr 
              class="hover:bg-[#F6F6F9] transition-colors border-b border-[#E6E6EB] cursor-pointer"
              @click="toggleExpansion(event.id)"
            >
              <td class="px-6 py-4">
                <div class="font-medium text-[#1C1C1E] text-sm font-IBMPlex">{{ event.title }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <PlatformBadge 
                    v-for="platform in event.platform" 
                    :key="platform" 
                    :platform="platform" 
                  />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-[#1C1C1E] font-IBMPlex">
                  <div class="flex items-center gap-2">
                    <span>{{ getTotalProperties(event) }} properties</span>
                    <div class="flex gap-1">
                      <span v-if="event.event_specific_properties?.length" 
                            class="inline-flex items-center px-1.5 py-0.5 text-xs bg-[#F0F4FF] text-[#1C1C1E] rounded font-IBMPlex"
                            title="Event-specific properties">
                        ⚡{{ event.event_specific_properties.length }}
                      </span>
                      <span v-if="event.product_specific_properties?.length" 
                            class="inline-flex items-center px-1.5 py-0.5 text-xs bg-[#F0F9FF] text-[#1C1C1E] rounded font-IBMPlex"
                            title="Product-specific properties">
                        📦{{ event.product_specific_properties.length }}
                      </span>
                      <span v-if="event.core_properties?.length" 
                            class="inline-flex items-center px-1.5 py-0.5 text-xs bg-[#F6F6F9] text-[#1C1C1E] rounded font-IBMPlex"
                            title="Core properties">
                        🔧{{ event.core_properties.length }}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-center">
                <button 
                  class="text-[#1C1C1E] opacity-50 hover:opacity-70 transition-opacity"
                  @click.stop="toggleExpansion(event.id)"
                >
                  <svg 
                    class="w-5 h-5 transform transition-transform duration-200"
                    :class="{ 'rotate-180': expandedRows.has(event.id) }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </td>
            </tr>
            
            <!-- Expanded details row -->
            <tr 
              v-if="expandedRows.has(event.id)"
              class="bg-[#F6F6F9] border-b border-[#E6E6EB]"
            >
              <td colspan="4" class="px-6 py-6">
                <div class="space-y-4">
                  <!-- Description -->
                  <div>
                    <h4 class="text-sm font-semibold text-[#1C1C1E] mb-2 font-IBMPlex">Description</h4>
                    <p class="text-sm text-[#1C1C1E] leading-relaxed font-IBMPlex">
                      {{ event.description || 'No description available' }}
                    </p>
                  </div>
                  
                  <!-- Product Areas -->
                  <div v-if="event.product_area && event.product_area.length > 0">
                    <h4 class="text-sm font-semibold text-[#1C1C1E] mb-2 font-IBMPlex">Product Areas</h4>
                    <div class="flex flex-wrap gap-2">
                      <ProductAreaBadge 
                        v-for="area in event.product_area" 
                        :key="area" 
                        :area="area" 
                      />
                    </div>
                  </div>
                  
                  <!-- Properties -->
                  <div v-if="getTotalProperties(event) > 0">
                    <EnhancedPropertiesList :event="event" />
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// Components
import SortIcon from '../../rbac/components/SortIcon.vue'
import PlatformBadge from './PlatformBadge.vue'
import ProductAreaBadge from './ProductAreaBadge.vue'
import EnhancedPropertiesList from './EnhancedPropertiesList.vue'

// Reactive state for expanded rows
const expandedRows = ref(new Set())

// Props
const props = defineProps({
  events: {
    type: Array,
    required: true
  },
  sortField: {
    type: String,
    required: true
  },
  sortDirection: {
    type: String,
    required: true
  }
})

// Events
defineEmits(['sort'])

// Methods
const toggleExpansion = (eventId) => {
  if (expandedRows.value.has(eventId)) {
    expandedRows.value.delete(eventId)
  } else {
    expandedRows.value.add(eventId)
  }
}

const getTotalProperties = (event) => {
  return (event.core_properties_count || 0) + 
         (event.product_specific_properties_count || 0) + 
         (event.event_specific_properties_count || 0)
}

const getProductAreaLabel = (area) => {
  return productAreaMap[area] || area
}

// Product area mapping for sorting
const productAreaMap = {
  'admin': 'Admin',
  'charts-metrics': 'Charts & Metrics',
  'data-management': 'Data Management',
  'audiences': 'Audiences',
  'integrations': 'Integrations',
  'session-replay': 'Session Replay',
  'heatmaps': 'Heatmaps',
  'guides-surveys': 'Guides & Surveys',
  'resource-center': 'Resource Center & Content',
  'experiment': 'Experiment'
}

// Computed
const groupedEvents = computed(() => {
  // Group events by product area
  const groups = {}
  
  props.events.forEach(event => {
    // Use the first product area or 'other' if none
    const area = event.product_area?.[0] || 'other'
    if (!groups[area]) {
      groups[area] = []
    }
    groups[area].push(event)
  })
  
  // Convert to array and sort by product area name
  return Object.keys(groups)
    .sort((a, b) => {
      const labelA = productAreaMap[a] || a
      const labelB = productAreaMap[b] || b
      return labelA.localeCompare(labelB)
    })
    .map(area => ({
      productArea: area,
      events: groups[area].sort((a, b) => {
        // Sort events within each group based on current sort field
        let aValue, bValue
        
        switch (props.sortField) {
          case 'title':
            aValue = a.title?.toLowerCase() || ''
            bValue = b.title?.toLowerCase() || ''
            break
          case 'platform':
            aValue = a.platform?.[0]?.toLowerCase() || ''
            bValue = b.platform?.[0]?.toLowerCase() || ''
            break
          case 'properties_count':
            aValue = getTotalProperties(a)
            bValue = getTotalProperties(b)
            break
          default:
            aValue = a.title?.toLowerCase() || ''
            bValue = b.title?.toLowerCase() || ''
        }
        
        let comparison = 0
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue
        } else {
          if (aValue < bValue) {
            comparison = -1
          } else if (aValue > bValue) {
            comparison = 1
          }
        }
        
        return props.sortDirection === 'desc' ? -comparison : comparison
      })
    }))
})
</script>

<style scoped>
/* Ensure the table container allows for sticky positioning */
.events-table-container {
  position: relative;
  height: auto;
  overflow: visible;
}

/* Make table headers sticky */
:deep(.events-table thead) {
  position: sticky;
  top: 122px; /* Below the sticky filter container */
  z-index: 10;
  background-color: #F6F6F9;
}

/* Make product area headers sticky below table headers */
:deep(.product-area-header) {
  position: sticky;
  top: 171px; /* Below the sticky table headers */
  z-index: 5;
  background-color: #F6F6F9;
}
</style>
