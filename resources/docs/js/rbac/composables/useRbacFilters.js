import { ref, computed } from 'vue'

export function useRbacFilters() {
  const filters = ref({
    productAreas: []
  })

  const availableProductAreas = ref([])

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

  const initializeFilters = (permissions) => {
    if (!permissions || !Array.isArray(permissions)) return

    // Extract unique product areas
    const productAreas = new Set()

    permissions.forEach(permission => {
      if (permission.product_area) {
        productAreas.add(permission.product_area)
      }
    })

    availableProductAreas.value = Array.from(productAreas)
      .sort((a, b) => {
        const labelA = productAreaMap[a] || a
        const labelB = productAreaMap[b] || b
        return labelA.localeCompare(labelB)
      })

    console.log('Initialized RBAC filters:', {
      productAreas: availableProductAreas.value
    })
  }

  const filteredResults = computed(() => {
    return (permissions) => {
      if (!permissions || !Array.isArray(permissions)) return []

      return permissions.filter(permission => {
        // Product area filter
        if (filters.value.productAreas.length > 0) {
          if (!filters.value.productAreas.includes(permission.product_area)) {
            return false
          }
        }


        return true
      })
    }
  })

  const clearFilters = () => {
    filters.value = {
      productAreas: []
    }
  }

  const hasActiveFilters = computed(() => {
    return filters.value.productAreas.length > 0
  })

  const toggleProductAreaFilter = (area) => {
    const index = filters.value.productAreas.indexOf(area)
    if (index > -1) {
      filters.value.productAreas.splice(index, 1)
    } else {
      filters.value.productAreas.push(area)
    }
  }

  const getProductAreaLabel = (area) => {
    return productAreaMap[area] || area
  }

  return {
    filters,
    filteredResults,
    availableProductAreas,
    hasActiveFilters,
    initializeFilters,
    clearFilters,
    toggleProductAreaFilter,
    getProductAreaLabel
  }
}
