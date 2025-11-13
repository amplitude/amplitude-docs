import { ref, computed } from 'vue'

export function useFilters() {
  const filters = ref({
    platforms: [],
    productAreas: [],
    propertyTypes: [],
    hasProperties: null // null = all, true = with properties, false = without properties
  })

  const availablePlatforms = ref([])
  const availableProductAreas = ref([])
  const availablePropertyTypes = ref(['core', 'product', 'event'])

  const initializeFilters = (events) => {
    if (!events || !Array.isArray(events)) return

    // Extract unique platforms
    const platforms = new Set()
    const productAreas = new Set()

    events.forEach(event => {
      // Platforms
      if (event.platform && Array.isArray(event.platform)) {
        event.platform.forEach(platform => platforms.add(platform))
      }
      
      // Product areas
      if (event.product_area && Array.isArray(event.product_area)) {
        event.product_area.forEach(area => productAreas.add(area))
      }
    })

    availablePlatforms.value = Array.from(platforms).sort()
    availableProductAreas.value = Array.from(productAreas).sort()

    console.log('Initialized filters:', {
      platforms: availablePlatforms.value,
      productAreas: availableProductAreas.value
    })
  }

  const filteredResults = computed(() => {
    return (events) => {
      if (!events || !Array.isArray(events)) return []

      return events.filter(event => {
        // Platform filter
        if (filters.value.platforms.length > 0) {
          const hasMatchingPlatform = event.platform?.some(platform => 
            filters.value.platforms.includes(platform)
          )
          if (!hasMatchingPlatform) return false
        }

        // Product area filter
        if (filters.value.productAreas.length > 0) {
          const hasMatchingProductArea = event.product_area?.some(area => 
            filters.value.productAreas.includes(area)
          )
          if (!hasMatchingProductArea) return false
        }

        // Properties filter
        if (filters.value.hasProperties !== null) {
          const totalProperties = (event.core_properties_count || 0) + 
                                 (event.product_specific_properties_count || 0) + 
                                 (event.event_specific_properties_count || 0)
          
          if (filters.value.hasProperties && totalProperties === 0) return false
          if (!filters.value.hasProperties && totalProperties > 0) return false
        }

        return true
      })
    }
  })

  const clearFilters = () => {
    filters.value = {
      platforms: [],
      productAreas: [],
      propertyTypes: [],
      hasProperties: null
    }
  }

  const hasActiveFilters = computed(() => {
    return filters.value.platforms.length > 0 ||
           filters.value.productAreas.length > 0 ||
           filters.value.propertyTypes.length > 0 ||
           filters.value.hasProperties !== null
  })

  const togglePlatformFilter = (platform) => {
    const index = filters.value.platforms.indexOf(platform)
    if (index > -1) {
      filters.value.platforms.splice(index, 1)
    } else {
      filters.value.platforms.push(platform)
    }
  }

  const toggleProductAreaFilter = (area) => {
    const index = filters.value.productAreas.indexOf(area)
    if (index > -1) {
      filters.value.productAreas.splice(index, 1)
    } else {
      filters.value.productAreas.push(area)
    }
  }

  const setPropertiesFilter = (value) => {
    filters.value.hasProperties = value
  }

  return {
    filters,
    filteredResults,
    availablePlatforms,
    availableProductAreas,
    availablePropertyTypes,
    hasActiveFilters,
    initializeFilters,
    clearFilters,
    togglePlatformFilter,
    toggleProductAreaFilter,
    setPropertiesFilter
  }
}
