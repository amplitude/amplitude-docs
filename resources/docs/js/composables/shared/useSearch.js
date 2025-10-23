import { ref } from 'vue'

export function useSearch(searchType = 'generic') {
  const searchQuery = ref('')
  const searchResults = ref([])
  const isSearching = ref(false)

  // Debounce utility
  let searchTimeout = null

  const performSearch = (query, data, debounceMs = 150) => {
    if (!query || query.length < 2 || !data) {
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
      const results = executeSearch(query, data)
      searchResults.value = results
      isSearching.value = false
    }, debounceMs)
  }

  const executeSearch = (query, data) => {
    // Handle different data structures
    if (searchType === 'events' || (data?.search_index && data?.events)) {
      return executeEventSearch(query, data)
    } else if (searchType === 'permissions' || Array.isArray(data)) {
      return executeGenericSearch(query, data)
    } else if (data?.permissions) {
      return executeGenericSearch(query, data.permissions)
    } else if (data?.events) {
      return executeGenericSearch(query, data.events)
    }
    
    return executeGenericSearch(query, data)
  }

  const executeEventSearch = (query, data) => {
    if (!data?.search_index || !data?.events) {
      return executeGenericSearch(query, data?.events || [])
    }

    const queryWords = query.toLowerCase().split(/\W+/).filter(word => word.length >= 2)
    const eventScores = new Map()
    const searchIndex = data.search_index

    // Search using the pre-built index
    queryWords.forEach(word => {
      // Exact matches
      if (searchIndex.terms && searchIndex.terms[word]) {
        searchIndex.terms[word].forEach(match => {
          const eventId = match.id
          const score = match.score
          eventScores.set(eventId, (eventScores.get(eventId) || 0) + score)
        })
      }

      // Partial matches for autocomplete-like behavior
      if (searchIndex.terms) {
        Object.keys(searchIndex.terms).forEach(indexWord => {
          if (indexWord.startsWith(word) && indexWord !== word) {
            searchIndex.terms[indexWord].forEach(match => {
              const eventId = match.id
              const score = Math.floor(match.score / 2) // Lower score for partial matches
              eventScores.set(eventId, (eventScores.get(eventId) || 0) + score)
            })
          }
        })
      }
    })

    // Convert to results array
    const eventIds = Array.from(eventScores.keys())
    const results = data.events
      .filter(event => eventIds.includes(event.id))
      .map(event => ({
        ...event,
        score: eventScores.get(event.id)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 50) // Limit results

    return results
  }

  const executeGenericSearch = (query, items) => {
    if (!items || !Array.isArray(items)) {
      return []
    }

    const queryLower = query.toLowerCase()
    const queryWords = queryLower.split(/\W+/).filter(word => word.length >= 2)
    
    const results = items.filter(item => {
      // Search in title
      if (item.title?.toLowerCase().includes(queryLower)) {
        return true
      }
      
      // Search in description
      if (item.description?.toLowerCase().includes(queryLower)) {
        return true
      }
      
      // Search in actions (for permissions)
      if (item.actions?.some(action => 
        action.toLowerCase().includes(queryLower)
      )) {
        return true
      }
      
      // Search in product area
      if (item.product_area?.toLowerCase().includes(queryLower)) {
        return true
      }

      // Search in platform (for events)
      if (item.platform?.some(platform => 
        platform.toLowerCase().includes(queryLower)
      )) {
        return true
      }
      
      // Multi-word search
      if (queryWords.length > 1) {
        const searchText = [
          item.title,
          item.description,
          item.product_area,
          ...(item.actions || []),
          ...(item.platform || [])
        ].join(' ').toLowerCase()
        
        return queryWords.every(word => searchText.includes(word))
      }
      
      return false
    })

    // Sort by relevance (title matches first, then description, then other fields)
    results.sort((a, b) => {
      const aTitle = a.title?.toLowerCase().includes(queryLower) ? 3 : 0
      const aDesc = a.description?.toLowerCase().includes(queryLower) ? 2 : 0
      const aOther = (
        (a.actions?.some(action => action.toLowerCase().includes(queryLower)) ? 1 : 0) +
        (a.platform?.some(platform => platform.toLowerCase().includes(queryLower)) ? 1 : 0) +
        (a.product_area?.toLowerCase().includes(queryLower) ? 1 : 0)
      )
      const aScore = aTitle + aDesc + aOther
      
      const bTitle = b.title?.toLowerCase().includes(queryLower) ? 3 : 0
      const bDesc = b.description?.toLowerCase().includes(queryLower) ? 2 : 0
      const bOther = (
        (b.actions?.some(action => action.toLowerCase().includes(queryLower)) ? 1 : 0) +
        (b.platform?.some(platform => platform.toLowerCase().includes(queryLower)) ? 1 : 0) +
        (b.product_area?.toLowerCase().includes(queryLower) ? 1 : 0)
      )
      const bScore = bTitle + bDesc + bOther
      
      if (aScore !== bScore) {
        return bScore - aScore
      }
      
      return a.title?.localeCompare(b.title) || 0
    })

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

  // Fuzzy search enhancement (future improvement)
  const fuzzySearch = (query, text, threshold = 0.6) => {
    const queryLower = query.toLowerCase()
    const textLower = text.toLowerCase()
    
    // Simple fuzzy matching
    if (textLower.includes(queryLower)) {
      return 1.0
    }
    
    // Basic Levenshtein distance approximation
    const distance = levenshteinDistance(queryLower, textLower)
    const maxLength = Math.max(queryLower.length, textLower.length)
    const similarity = 1 - (distance / maxLength)
    
    return similarity >= threshold ? similarity : 0
  }

  const levenshteinDistance = (str1, str2) => {
    const matrix = []
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        }
      }
    }
    
    return matrix[str2.length][str1.length]
  }

  return {
    searchQuery,
    searchResults,
    isSearching,
    performSearch,
    clearSearch,
    fuzzySearch
  }
}
