import { ref, computed } from 'vue'

export function useFilters(filterType = 'generic') {
  const filters = ref({
    productAreas: [],
    platforms: [],
    advanced: null,
    hasProperties: null,
    propertyTypes: []
  })

  const availableProductAreas = ref([])
  const availablePlatforms = ref([])
  const availablePropertyTypes = ref([])

  // Product area mapping (shared between implementations)
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

  // Platform mapping
  const platformMap = {
    'web': 'Web',
    'ios': 'iOS',
    'android': 'Android',
    'all': 'All'
  }

  const initializeFilters = (data) => {
    if (!data) return

    let items = []
    if (Array.isArray(data)) {
      items = data
    } else if (data.permissions) {
      items = data.permissions
    } else if (data.events) {
      items = data.events
    } else if (data.properties) {
      items = data.properties
    }

    if (!Array.isArray(items)) return

    // Extract unique product areas
    const productAreas = new Set()
    const platforms = new Set()
    const propertyTypes = new Set()

    items.forEach(item => {
      // Product areas
      if (item.product_area) {
        productAreas.add(item.product_area)
      }

      // Platforms (for events)
      if (item.platform && Array.isArray(item.platform)) {
        item.platform.forEach(platform => platforms.add(platform))
      }

      // Property types (for properties)
      if (item.type) {
        propertyTypes.add(item.type)
      }
    })

    // Sort and set available options
    availableProductAreas.value = Array.from(productAreas)
      .sort((a, b) => {
        const labelA = productAreaMap[a] || a
        const labelB = productAreaMap[b] || b
        return labelA.localeCompare(labelB)
      })

    availablePlatforms.value = Array.from(platforms)
      .sort((a, b) => {
        const labelA = platformMap[a] || a
        const labelB = platformMap[b] || b
        return labelA.localeCompare(labelB)
      })

    availablePropertyTypes.value = Array.from(propertyTypes).sort()
  }

  const filteredResults = computed(() => {
    return (items) => {
      if (!items || !Array.isArray(items)) return []

      return items.filter(item => {
        // Product area filter
        if (filters.value.productAreas.length > 0) {
          if (!filters.value.productAreas.includes(item.product_area)) {
            return false
          }
        }

        // Platform filter (for events)
        if (filters.value.platforms.length > 0) {
          if (!item.platform || !Array.isArray(item.platform)) {
            return false
          }
          const hasMatchingPlatform = item.platform.some(platform => 
            filters.value.platforms.includes(platform)
          )
          if (!hasMatchingPlatform) {
            return false
          }
        }

        // Advanced filter (for permissions)
        if (filters.value.advanced !== null) {
          if (filters.value.advanced && !item.advanced) {
            return false
          }
          if (!filters.value.advanced && item.advanced) {
            return false
          }
        }

        // Properties filter (for events)
        if (filters.value.hasProperties !== null) {
          const hasProperties = (
            (item.core_properties_count || 0) +
            (item.product_specific_properties_count || 0) +
            (item.event_specific_properties_count || 0)
          ) > 0
          
          if (filters.value.hasProperties && !hasProperties) {
            return false
          }
          if (!filters.value.hasProperties && hasProperties) {
            return false
          }
        }

        // Property types filter
        if (filters.value.propertyTypes.length > 0) {
          if (!filters.value.propertyTypes.includes(item.type)) {
            return false
          }
        }

        return true
      })
    }
  })

  const clearFilters = () => {
    filters.value = {
      productAreas: [],
      platforms: [],
      advanced: null,
      hasProperties: null,
      propertyTypes: []
    }
  }

  const hasActiveFilters = computed(() => {
    return (
      filters.value.productAreas.length > 0 ||
      filters.value.platforms.length > 0 ||
      filters.value.advanced !== null ||
      filters.value.hasProperties !== null ||
      filters.value.propertyTypes.length > 0
    )
  })

  // Individual filter methods
  const toggleProductAreaFilter = (area) => {
    const index = filters.value.productAreas.indexOf(area)
    if (index > -1) {
      filters.value.productAreas.splice(index, 1)
    } else {
      filters.value.productAreas.push(area)
    }
  }

  const togglePlatformFilter = (platform) => {
    const index = filters.value.platforms.indexOf(platform)
    if (index > -1) {
      filters.value.platforms.splice(index, 1)
    } else {
      filters.value.platforms.push(platform)
    }
  }

  const setAdvancedFilter = (value) => {
    filters.value.advanced = value
  }

  const setPropertiesFilter = (value) => {
    filters.value.hasProperties = value
  }

  const togglePropertyTypeFilter = (type) => {
    const index = filters.value.propertyTypes.indexOf(type)
    if (index > -1) {
      filters.value.propertyTypes.splice(index, 1)
    } else {
      filters.value.propertyTypes.push(type)
    }
  }

  // Label formatting methods
  const getProductAreaLabel = (area) => {
    return productAreaMap[area] || area
  }

  const getPlatformLabel = (platform) => {
    return platformMap[platform] || platform.charAt(0).toUpperCase() + platform.slice(1)
  }

  return {
    filters,
    filteredResults,
    availableProductAreas,
    availablePlatforms,
    availablePropertyTypes,
    hasActiveFilters,
    initializeFilters,
    clearFilters,
    toggleProductAreaFilter,
    togglePlatformFilter,
    setAdvancedFilter,
    setPropertiesFilter,
    togglePropertyTypeFilter,
    getProductAreaLabel,
    getPlatformLabel
  }
}
