<template>
  <div class="permissions-table-container bg-white border border-[#E6E6EB] mt-4 rounded-lg shadow-sm overflow-clip">
    <table class="min-w-full divide-y divide-[#E6E6EB] mt-0">
      <thead class="bg-[#F6F6F9]">
        <tr>
          <th 
            scope="col" 
            class="px-6 py-4 text-left text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors font-IBMPlex"
            style="width: 35%;"
            @click="$emit('sort', 'title')"
          >
            <div class="flex items-center space-x-2">
              <span>Permission</span>
              <SortIcon :field="'title'" :current-field="sortField" :direction="sortDirection" />
            </div>
          </th>
          <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider font-IBMPlex" style="width: 50%;">
            Description
          </th>
          <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider font-IBMPlex" style="width: 10%;">
            Actions
          </th>
          <th scope="col" class="px-6 py-4 text-center text-xs font-semibold text-[#1C1C1E] uppercase tracking-wider font-IBMPlex" style="width: 5%;">
            <!-- Expand column -->
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <template v-for="group in groupedPermissions" :key="group.productArea">
          <!-- Product Area Header Row -->
          <tr class="product-area-header bg-[#F6F6F9]">
            <td colspan="4" class="px-6 py-6 border-b border-[#E6E6EB]">
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
              class="hover:bg-[#F6F6F9] transition-colors border-b border-[#E6E6EB]"
              :class="{ 'cursor-pointer': permission.actions && permission.actions.length > 0 }"
              @click="permission.actions && permission.actions.length > 0 ? toggleExpansion(permission.id) : null"
            >
              <!-- Permission Name & Badge -->
              <td class="px-6 py-5 align-top">
                <div class="flex flex-col gap-2">
                  <div class="font-medium text-[#1C1C1E] text-sm font-IBMPlex leading-relaxed">{{ permission.title }}</div>
                  <div>
                    <TypeBadge :advanced="permission.advanced" />
                  </div>
                </div>
              </td>
              
              <!-- Description -->
              <td class="px-6 py-5 align-top">
                <p class="text-sm text-[#1C1C1E] leading-relaxed font-IBMPlex opacity-80">
                  {{ permission.description || 'No description available' }}
                </p>
              </td>
              
              <!-- Actions Count -->
              <td class="px-6 py-5 align-top">
                <div class="text-sm text-[#1C1C1E] font-IBMPlex">
                  {{ permission.actions?.length || 0 }} action{{ (permission.actions?.length || 0) !== 1 ? 's' : '' }}
                </div>
              </td>
              
              <!-- Expand Button -->
              <td class="px-6 py-5 text-center align-top">
                <button 
                  v-if="permission.actions && permission.actions.length > 0"
                  class="text-[#1C1C1E] opacity-50 hover:opacity-70 transition-opacity"
                  @click.stop="toggleExpansion(permission.id)"
                  :title="expandedRows.has(permission.id) ? 'Hide actions' : 'Show actions'"
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
            
            <!-- Expanded actions row -->
            <tr 
              v-if="expandedRows.has(permission.id) && permission.actions && permission.actions.length > 0"
              class="bg-[#F6F6F9] border-b border-[#E6E6EB]"
            >
              <td colspan="4" class="px-6 py-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <!-- Left Column: Default Roles Section -->
                  <div>
                    <h4 class="text-sm font-semibold text-[#1C1C1E] mb-3 font-IBMPlex">Default Roles</h4>
                    <div v-if="permission.default_permissions && permission.default_permissions.length > 0">
                      <p class="text-xs text-[#1C1C1E] opacity-70 font-IBMPlex mb-3">
                        This permission is granted by default to the following roles:
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <DefaultPermissionsBadge 
                          v-for="role in permission.default_permissions" 
                          :key="role" 
                          :role="role"
                        />
                      </div>
                    </div>
                    <div v-else>
                      <p class="text-xs text-[#1C1C1E] opacity-50 font-IBMPlex italic">
                        No default roles assigned
                      </p>
                    </div>
                  </div>
                  
                  <!-- Right Column: Actions Section -->
                  <div>
                    <h4 class="text-sm font-semibold text-[#1C1C1E] mb-3 font-IBMPlex">Available Actions</h4>
                    <div class="space-y-2">
                      <div 
                        v-for="(action, index) in permission.actions" 
                        :key="index"
                        class="flex items-start space-x-2 text-sm text-[#1C1C1E] font-IBMPlex"
                      >
                        <span class="text-[#0066FF] mt-1">•</span>
                        <span class="leading-relaxed">{{ action }}</span>
                      </div>
                    </div>
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
import DefaultPermissionsBadge from './DefaultPermissionsBadge.vue'

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

const expandAll = () => {
  // Add all permission IDs to expandedRows
  props.permissions.forEach(permission => {
    if (permission.actions && permission.actions.length > 0) {
      expandedRows.value.add(permission.id)
    }
  })
}

const collapseAll = () => {
  // Clear all expanded rows
  expandedRows.value.clear()
}

// Expose methods to parent component
defineExpose({
  expandAll,
  collapseAll
})

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

<style scoped>
/* Ensure IBM Plex Sans is used throughout the entire table */
.permissions-table-container,
.permissions-table-container * {
  font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
