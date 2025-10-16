<template>
  <div class="permissions-table-container bg-white border border-[#E6E6EB] mt-4 rounded-lg overflow-hidden shadow-sm">
    <table class="min-w-full divide-y divide-[#E6E6EB] mt-0">
      <thead class="bg-[#F6F6F9]">
        <tr>
          <th 
            scope="col" 
            class="px-6 py-4 text-left text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors font-IBMPlex"
            @click="$emit('sort', 'title')"
          >
            <div class="flex items-center space-x-2">
              <span>Permission</span>
              <SortIcon :field="'title'" :current-field="sortField" :direction="sortDirection" />
            </div>
          </th>
          <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider font-IBMPlex">
            Actions
          </th>
          <th scope="col" class="px-6 py-4 text-center text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider font-IBMPlex w-16">
            <!-- Expand column -->
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <template v-for="group in groupedPermissions" :key="group.productArea">
          <!-- Product Area Header Row -->
          <tr class="product-area-header bg-[#F6F6F9]">
            <td colspan="3" class="px-6 py-6 border-b border-[#E6E6EB]">
              <div class="flex items-center space-x-3">
                <span class="text-base font-semibold text-[#1C1C1E] font-IBMPlex">{{ getProductAreaLabel(group.productArea) }}</span>
                <span class="text-sm font-medium text-[#1C1C1E] opacity-70 font-IBMPlex">({{ group.permissions.length }} permissions)</span>
              </div>
            </td>
          </tr>
          
          <!-- Permissions in this group -->
          <template v-for="permission in group.permissions" :key="permission.id">
            <!-- Main permission row -->
            <tr 
              class="hover:bg-[#F6F6F9] transition-colors border-b border-[#E6E6EB] cursor-pointer"
              @click="toggleExpansion(permission.id)"
            >
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="font-medium text-[#1C1C1E] text-sm font-IBMPlex">{{ permission.title }}</div>
                  <TypeBadge :advanced="permission.advanced" />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-[#1C1C1E] font-IBMPlex">
                  {{ permission.actions?.length || 0 }} action{{ (permission.actions?.length || 0) !== 1 ? 's' : '' }}
                </div>
              </td>
              <td class="px-6 py-4 text-center">
                <button 
                  class="text-[#1C1C1E] opacity-50 hover:opacity-70 transition-opacity"
                  @click.stop="toggleExpansion(permission.id)"
                >
                  <svg 
                    class="w-5 h-5 transform transition-transform duration-200"
                    :class="{ 'rotate-180': expandedRows.has(permission.id) }"
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
              v-if="expandedRows.has(permission.id)"
              class="bg-[#F6F6F9] border-b border-[#E6E6EB]"
            >
              <td colspan="3" class="px-6 py-6">
                <div class="grid grid-cols-2 gap-4">
                  <!-- Description -->
                  <div>
                    <h4 class="text-sm font-semibold text-[#1C1C1E] mb-2 font-IBMPlex">Description</h4>
                    <p class="text-sm text-[#1C1C1E] leading-relaxed font-IBMPlex">
                      {{ permission.description || 'No description available' }}
                    </p>
                  </div>
                  
                  <!-- Actions -->
                  <div v-if="permission.actions && permission.actions.length > 0">
                    <h4 class="text-sm font-semibold text-[#1C1C1E] mb-2 font-IBMPlex">Actions</h4>
                    <ActionsList :actions="permission.actions" />
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
import SortIcon from './SortIcon.vue'
import TypeBadge from './TypeBadge.vue'
import ActionsList from './ActionsList.vue'

// Reactive state for expanded rows
const expandedRows = ref(new Set())

// Props
const props = defineProps({
  permissions: {
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
const toggleExpansion = (permissionId) => {
  if (expandedRows.value.has(permissionId)) {
    expandedRows.value.delete(permissionId)
  } else {
    expandedRows.value.add(permissionId)
  }
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
const groupedPermissions = computed(() => {
  // Group permissions by product area
  const groups = {}
  
  props.permissions.forEach(permission => {
    const area = permission.product_area || 'other'
    if (!groups[area]) {
      groups[area] = []
    }
    groups[area].push(permission)
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
      permissions: groups[area].sort((a, b) => {
        // Sort permissions within each group based on current sort field
        let aValue, bValue
        
        switch (props.sortField) {
          case 'title':
            aValue = a.title?.toLowerCase() || ''
            bValue = b.title?.toLowerCase() || ''
            break
          case 'description':
            aValue = a.description?.toLowerCase() || ''
            bValue = b.description?.toLowerCase() || ''
            break
          case 'advanced':
            // Sort by advanced flag, then by title
            if (a.advanced !== b.advanced) {
              aValue = a.advanced ? 1 : 0
              bValue = b.advanced ? 1 : 0
            } else {
              aValue = a.title?.toLowerCase() || ''
              bValue = b.title?.toLowerCase() || ''
            }
            break
          default:
            aValue = a.title?.toLowerCase() || ''
            bValue = b.title?.toLowerCase() || ''
        }
        
        let comparison = 0
        if (aValue < bValue) {
          comparison = -1
        } else if (aValue > bValue) {
          comparison = 1
        }
        
        return props.sortDirection === 'desc' ? -comparison : comparison
      })
    }))
})
</script>
