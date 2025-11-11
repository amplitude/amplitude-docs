import { createApp } from 'vue'
import RbacPermissionsApp from './rbac/RbacPermissionsApp.vue'

// Initialize the Vue app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('rbac-permissions-container')
  
  if (container) {
    const app = createApp(RbacPermissionsApp, {
      isLocal: window.APP_CONFIG?.isLocal || false,
      dataUrl: window.APP_CONFIG?.dataUrl || '/docs/rbac-permissions-data.json',
      searchDebounce: window.APP_CONFIG?.searchDebounce || 150,
      maxResults: window.APP_CONFIG?.maxResults || 100
    })

    // Make the app globally accessible for debugging
    window.rbacPermissions = app.mount('#rbac-permissions-container')
  }
})
