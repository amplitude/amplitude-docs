import { ref } from 'vue'

export function useGlossaryData(dataUrl) {
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
        throw new Error(`HTTP ${response.status}: Failed to load glossary data`)
      }
      
      data.value = await response.json()
      console.log(`Loaded ${data.value.events_count} events and ${data.value.properties_count} properties`)
      
    } catch (err) {
      console.error('Failed to load glossary data:', err)
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  const getEvent = (eventId) => {
    if (cache.has(eventId)) {
      return cache.get(eventId)
    }
    
    const event = data.value?.events.find(e => e.id === eventId)
    if (event) {
      cache.set(eventId, event)
    }
    return event
  }

  const clearCache = () => {
    cache.clear()
  }

  return {
    data,
    isLoading,
    error,
    loadData,
    getEvent,
    clearCache
  }
}
