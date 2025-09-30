import { ref } from 'vue'

export function useRbacData(dataUrl) {
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
        throw new Error(`HTTP ${response.status}: Failed to load RBAC permissions data`)
      }
      
      data.value = await response.json()
      console.log(`Loaded ${data.value.permissions_count} RBAC permissions`)
      
    } catch (err) {
      console.error('Failed to load RBAC permissions data:', err)
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  const getPermission = (permissionId) => {
    if (cache.has(permissionId)) {
      return cache.get(permissionId)
    }
    
    const permission = data.value?.permissions.find(p => p.id === permissionId)
    if (permission) {
      cache.set(permissionId, permission)
    }
    return permission
  }

  const clearCache = () => {
    cache.clear()
  }

  return {
    data,
    isLoading,
    error,
    loadData,
    getPermission,
    clearCache
  }
}
