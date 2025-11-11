import { ref } from 'vue'

export function usePropertySearch() {
  const searchQuery = ref('')
  const searchResults = ref([])
  const isSearching = ref(false)

  // Debounce utility
  let searchTimeout = null

  const performSearch = (query, properties) => {
    if (!query || query.length < 2 || !properties) {
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
      const results = executePropertySearch(query, properties)
      searchResults.value = results
      isSearching.value = false
    }, 150)
  }

  const executePropertySearch = (query, properties) => {
    console.log(`🔍 Property search executing: "${query}" on ${properties.length} properties`)
    const queryLower = query.toLowerCase()
    const queryWords = queryLower.split(/\W+/).filter(word => word.length >= 2)
    
    const scored = properties.map(property => {
      let score = 0
      
      // Exact title match gets highest score
      if (property.title.toLowerCase() === queryLower) {
        score += 100
      }
      
      // Title contains query
      if (property.title.toLowerCase().includes(queryLower)) {
        score += 50
      }
      
      // Description contains query
      if (property.description && property.description.toLowerCase().includes(queryLower)) {
        score += 30
      }
      
      // Data type matches
      if (property.data_type?.some(type => type.toLowerCase().includes(queryLower))) {
        score += 25
      }
      
      // Property type matches
      if (property.property_type && property.property_type.toLowerCase().includes(queryLower)) {
        score += 20
      }
      
      // Related event titles contain query
      const relatedEventMatches = property.relatedEvents?.filter(event => 
        event.title.toLowerCase().includes(queryLower)
      ).length || 0
      score += relatedEventMatches * 10
      
      // Individual word matches in title and description
      queryWords.forEach(word => {
        if (property.title.toLowerCase().includes(word)) {
          score += 15
        }
        if (property.description && property.description.toLowerCase().includes(word)) {
          score += 10
        }
      })
      
      // Boost score based on usage frequency (more used = slightly higher score)
      score += Math.min(property.usageCount || 0, 10)
      
      return { ...property, searchScore: score }
    })
    
    // Filter properties by relevance score and sort by score
    // For short specific queries, require higher scores to avoid too many weak matches
    const minScore = queryWords.length === 1 && queryWords[0].length <= 5 ? 50 : 20
    
    const results = scored
      .filter(property => property.searchScore >= minScore)
      .sort((a, b) => b.searchScore - a.searchScore)
      .slice(0, 20) // Limit to top 20 most relevant results
    
    console.log(`🎯 Property search results for "${query}":`, {
      totalProperties: properties.length,
      scoredProperties: scored.length,
      minScoreThreshold: minScore,
      resultsWithScore: results.length,
      topResults: results.slice(0, 5).map(r => ({ title: r.title, score: r.searchScore }))
    })
    
    return results
  }

  const clearSearch = () => {
    // Don't modify searchQuery here - that should be controlled by parent component via v-model
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
