import { ref, computed } from 'vue'

export function useSorting(defaultField = 'title', defaultDirection = 'asc') {
  const sortField = ref(defaultField)
  const sortDirection = ref(defaultDirection) // 'asc' or 'desc'

  const sortedResults = computed(() => {
    return (items) => {
      if (!items || !Array.isArray(items)) return []

      return [...items].sort((a, b) => {
        let aValue, bValue

        switch (sortField.value) {
          case 'title':
            aValue = a.title?.toLowerCase() || ''
            bValue = b.title?.toLowerCase() || ''
            break
          case 'description':
            aValue = a.description?.toLowerCase() || ''
            bValue = b.description?.toLowerCase() || ''
            break
          case 'product_area':
            // First sort by product area, then by title within each area
            const aArea = a.product_area?.toLowerCase() || ''
            const bArea = b.product_area?.toLowerCase() || ''
            if (aArea !== bArea) {
              aValue = aArea
              bValue = bArea
            } else {
              aValue = a.title?.toLowerCase() || ''
              bValue = b.title?.toLowerCase() || ''
            }
            break
          case 'platform':
            // Sort by first platform, then by title
            const aPlatform = a.platform?.[0]?.toLowerCase() || ''
            const bPlatform = b.platform?.[0]?.toLowerCase() || ''
            if (aPlatform !== bPlatform) {
              aValue = aPlatform
              bValue = bPlatform
            } else {
              aValue = a.title?.toLowerCase() || ''
              bValue = b.title?.toLowerCase() || ''
            }
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
          case 'properties_count':
            // Sort by total properties count
            const aCount = (a.core_properties_count || 0) + 
                          (a.product_specific_properties_count || 0) + 
                          (a.event_specific_properties_count || 0)
            const bCount = (b.core_properties_count || 0) + 
                          (b.product_specific_properties_count || 0) + 
                          (b.event_specific_properties_count || 0)
            if (aCount !== bCount) {
              aValue = aCount
              bValue = bCount
            } else {
              aValue = a.title?.toLowerCase() || ''
              bValue = b.title?.toLowerCase() || ''
            }
            break
          case 'actions_count':
            // Sort by actions count
            const aActionsCount = a.actions?.length || 0
            const bActionsCount = b.actions?.length || 0
            if (aActionsCount !== bActionsCount) {
              aValue = aActionsCount
              bValue = bActionsCount
            } else {
              aValue = a.title?.toLowerCase() || ''
              bValue = b.title?.toLowerCase() || ''
            }
            break
          case 'type':
            // Sort by type (for properties)
            aValue = a.type?.toLowerCase() || ''
            bValue = b.type?.toLowerCase() || ''
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

        return sortDirection.value === 'desc' ? -comparison : comparison
      })
    }
  })

  const handleSort = (field) => {
    if (sortField.value === field) {
      // Toggle direction if same field
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      // New field, default to ascending
      sortField.value = field
      sortDirection.value = 'asc'
    }
  }

  const getSortIcon = (field) => {
    if (sortField.value !== field) {
      return 'sort'
    }
    return sortDirection.value === 'asc' ? 'sort-up' : 'sort-down'
  }

  const isSortedBy = (field) => {
    return sortField.value === field
  }

  const setSortField = (field, direction = 'asc') => {
    sortField.value = field
    sortDirection.value = direction
  }

  return {
    sortField,
    sortDirection,
    sortedResults,
    handleSort,
    getSortIcon,
    isSortedBy,
    setSortField
  }
}
