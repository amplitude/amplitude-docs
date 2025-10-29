import { ref } from 'vue'

export function useDataLoader(dataUrl, entityType = 'items') {
  const data = ref(null)
  const isLoading = ref(true)
  const error = ref(null)
  const cache = new Map()

  const loadData = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await fetch(dataUrl)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to load ${entityType} data`)
      }
      
      data.value = await response.json()
      
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  const getItem = (itemId, collectionKey = null) => {
    if (cache.has(itemId)) {
      return cache.get(itemId)
    }
    
    let collection = []
    if (collectionKey && data.value?.[collectionKey]) {
      collection = data.value[collectionKey]
    } else if (data.value?.permissions) {
      collection = data.value.permissions
    } else if (data.value?.events) {
      collection = data.value.events
    } else if (Array.isArray(data.value)) {
      collection = data.value
    }
    
    const item = collection.find(item => item.id === itemId)
    if (item) {
      cache.set(itemId, item)
    }
    return item
  }

  const clearCache = () => {
    cache.clear()
  }

  return {
    data,
    isLoading,
    error,
    loadData,
    getItem,
    clearCache
  }
}
