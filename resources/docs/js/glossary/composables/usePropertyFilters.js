import { ref, computed } from 'vue'

export function usePropertyFilters() {
  const filters = ref({
    propertyTypes: [], // core, product, event
    dataTypes: [], // string, number, boolean, timestamp
    usageRange: null, // low, medium, high
    hasDescription: null // true/false/null for all
  })

  const availablePropertyTypes = ref(['core', 'product', 'event'])
  const availableDataTypes = ref([])
  const availableUsageRanges = ref(['low', 'medium', 'high'])

  const initializeFilters = (properties) => {
    if (!properties || !Array.isArray(properties)) return

    // Extract unique data types
    const dataTypes = new Set()
    
    properties.forEach(property => {
      if (property.data_type && Array.isArray(property.data_type)) {
        property.data_type.forEach(type => dataTypes.add(type))
      }
    })

    availableDataTypes.value = Array.from(dataTypes).sort()

    console.log('Initialized property filters:', {
      propertyTypes: availablePropertyTypes.value,
      dataTypes: availableDataTypes.value
    })
  }

  const categorizeByUsage = (properties) => {
    if (!properties.length) return { low: [], medium: [], high: [] }

    const sorted = [...properties].sort((a, b) => a.usageCount - b.usageCount)
    const third = Math.floor(sorted.length / 3)
    
    return {
      low: sorted.slice(0, third),
      medium: sorted.slice(third, third * 2),
      high: sorted.slice(third * 2)
    }
  }

  const filteredResults = computed(() => {
    return (properties) => {
      if (!properties || !Array.isArray(properties)) return []

      return properties.filter(property => {
        // Property type filter
        if (filters.value.propertyTypes.length > 0) {
          const hasMatchingType = Array.from(property.relationships || []).some(type => 
            filters.value.propertyTypes.includes(type)
          )
          if (!hasMatchingType) return false
        }

        // Data type filter
        if (filters.value.dataTypes.length > 0) {
          const hasMatchingDataType = property.data_type?.some(type => 
            filters.value.dataTypes.includes(type)
          )
          if (!hasMatchingDataType) return false
        }

        // Usage range filter
        if (filters.value.usageRange) {
          const usageCategories = categorizeByUsage(properties)
          const categoryProperties = usageCategories[filters.value.usageRange] || []
          if (!categoryProperties.find(p => p.id === property.id)) return false
        }

        // Description filter
        if (filters.value.hasDescription !== null) {
          const hasDesc = Boolean(property.description && property.description.trim())
          if (filters.value.hasDescription !== hasDesc) return false
        }

        return true
      })
    }
  })

  const clearFilters = () => {
    filters.value = {
      propertyTypes: [],
      dataTypes: [],
      usageRange: null,
      hasDescription: null
    }
  }

  const hasActiveFilters = computed(() => {
    return filters.value.propertyTypes.length > 0 ||
           filters.value.dataTypes.length > 0 ||
           filters.value.usageRange !== null ||
           filters.value.hasDescription !== null
  })

  const togglePropertyTypeFilter = (type) => {
    const index = filters.value.propertyTypes.indexOf(type)
    if (index > -1) {
      filters.value.propertyTypes.splice(index, 1)
    } else {
      filters.value.propertyTypes.push(type)
    }
  }

  const toggleDataTypeFilter = (type) => {
    const index = filters.value.dataTypes.indexOf(type)
    if (index > -1) {
      filters.value.dataTypes.splice(index, 1)
    } else {
      filters.value.dataTypes.push(type)
    }
  }

  const setUsageRangeFilter = (range) => {
    filters.value.usageRange = filters.value.usageRange === range ? null : range
  }

  const setDescriptionFilter = (value) => {
    filters.value.hasDescription = filters.value.hasDescription === value ? null : value
  }

  return {
    filters,
    filteredResults,
    availablePropertyTypes,
    availableDataTypes,
    availableUsageRanges,
    hasActiveFilters,
    initializeFilters,
    clearFilters,
    togglePropertyTypeFilter,
    toggleDataTypeFilter,
    setUsageRangeFilter,
    setDescriptionFilter,
    categorizeByUsage
  }
}
