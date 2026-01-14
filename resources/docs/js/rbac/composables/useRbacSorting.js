import { ref, computed } from 'vue'

export function useRbacSorting() {
  const sortField = ref('title')
  const sortDirection = ref('asc') // 'asc' or 'desc'

  const sortedResults = computed(() => {
    return (permissions) => {
      if (!permissions || !Array.isArray(permissions)) return []

      // Since we're grouping by product area in the table component,
      // we'll sort within each group rather than globally
      // The table component handles the grouping and internal sorting
      return [...permissions].sort((a, b) => {
        let aValue, bValue

            switch (sortField.value) {
              case 'title':
                aValue = a.title?.toLowerCase() || ''
                bValue = b.title?.toLowerCase() || ''
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

  return {
    sortField,
    sortDirection,
    sortedResults,
    handleSort,
    getSortIcon,
    isSortedBy
  }
}
