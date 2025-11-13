import { ref } from 'vue'

export function useRbacSearch() {
  const searchQuery = ref('')
  const searchResults = ref([])
  const isSearching = ref(false)

  // Debounce utility
  let searchTimeout = null

  const performSearch = (query, permissions) => {
    if (!query || query.length < 2 || !permissions) {
      searchResults.value = []
      isSearching.value = false
      return
    }

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    // Debounce the search
    searchTimeout = setTimeout(() => {
      isSearching.value = true
      const results = executeSearch(query, permissions)
      searchResults.value = results
      isSearching.value = false
    }, 150)
  }

  const executeSearch = (query, permissions) => {
    if (!permissions || !Array.isArray(permissions)) {
      return []
    }

    const queryLower = query.toLowerCase()
    const queryWords = queryLower.split(/\W+/).filter(word => word.length >= 2)
    
    const results = permissions.filter(permission => {
      // Search in title
      if (permission.title?.toLowerCase().includes(queryLower)) {
        return true
      }
      
      // Search in description
      if (permission.description?.toLowerCase().includes(queryLower)) {
        return true
      }
      
      // Search in actions
      if (permission.actions?.some(action => 
        action.toLowerCase().includes(queryLower)
      )) {
        return true
      }
      
      // Search in product area
      if (permission.product_area?.toLowerCase().includes(queryLower)) {
        return true
      }
      
      // Multi-word search
      if (queryWords.length > 1) {
        const searchText = [
          permission.title,
          permission.description,
          permission.product_area,
          ...(permission.actions || [])
        ].join(' ').toLowerCase()
        
        return queryWords.every(word => searchText.includes(word))
      }
      
      return false
    })

    // Sort by relevance (title matches first, then description, then actions)
    results.sort((a, b) => {
      const aTitle = a.title?.toLowerCase().includes(queryLower) ? 3 : 0
      const aDesc = a.description?.toLowerCase().includes(queryLower) ? 2 : 0
      const aActions = a.actions?.some(action => action.toLowerCase().includes(queryLower)) ? 1 : 0
      const aScore = aTitle + aDesc + aActions
      
      const bTitle = b.title?.toLowerCase().includes(queryLower) ? 3 : 0
      const bDesc = b.description?.toLowerCase().includes(queryLower) ? 2 : 0
      const bActions = b.actions?.some(action => action.toLowerCase().includes(queryLower)) ? 1 : 0
      const bScore = bTitle + bDesc + bActions
      
      if (aScore !== bScore) {
        return bScore - aScore
      }
      
      return a.title.localeCompare(b.title)
    })

    console.log(`Search for "${query}" returned ${results.length} results`)
    return results.slice(0, 50) // Limit results
  }

  const clearSearch = () => {
    searchQuery.value = ''
    searchResults.value = []
    isSearching.value = false
    
    if (searchTimeout) {
      clearTimeout(searchTimeout)
      searchTimeout = null
    }
  }

  return {
    searchQuery,
    searchResults,
    isSearching,
    performSearch,
    clearSearch
  }
}
