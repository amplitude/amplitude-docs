<template>
  <div class="permissions-table-container bg-white border border-[#E6E6EB] rounded-lg overflow-hidden shadow-sm">
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
          <th 
            scope="col" 
            class="px-6 py-4 text-left text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors font-IBMPlex"
            @click="$emit('sort', 'advanced')"
          >
            <div class="flex items-center space-x-2">
              <span>Type</span>
              <SortIcon :field="'advanced'" :current-field="sortField" :direction="sortDirection" />
            </div>
          </th>
          <th 
            scope="col" 
            class="px-6 py-4 text-left text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors font-IBMPlex"
            @click="$emit('sort', 'description')"
          >
            <div class="flex items-center space-x-2">
              <span>Description</span>
              <SortIcon :field="'description'" :current-field="sortField" :direction="sortDirection" />
            </div>
          </th>
          <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider font-IBMPlex">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <template v-for="group in groupedPermissions" :key="group.productArea">
          <!-- Product Area Header Row -->
          <tr class="product-area-header bg-[#F6F6F9]">
            <td colspan="4" class="px-6 py-6 border-b border-[#E6E6EB]">
              <div class="flex items-center space-x-3">
                <ProductAreaBadge :product-area="group.productArea" />
                <span class="text-sm font-medium text-[#1C1C1E] font-IBMPlex">({{ group.permissions.length }} permissions)</span>
              </div>
            </td>
          </tr>
          
          <!-- Permissions in this group -->
          <tr 
            v-for="permission in group.permissions" 
            :key="permission.id"
            class="hover:bg-[#F6F6F9] transition-colors border-b border-[#E6E6EB] last:border-b-0"
          >
            <td class="px-6 py-4">
              <div class="font-medium text-[#1C1C1E] text-sm font-IBMPlex">{{ permission.title }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <TypeBadge :advanced="permission.advanced" />
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-[#1C1C1E] max-w-md leading-relaxed font-IBMPlex">
                {{ permission.description || 'No description available' }}
              </div>
            </td>
            <td class="px-6 py-4">
              <ActionsList :actions="permission.actions" />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Components
import SortIcon from './SortIcon.vue'
import ProductAreaBadge from './ProductAreaBadge.vue'
import TypeBadge from './TypeBadge.vue'
import ActionsList from './ActionsList.vue'

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
