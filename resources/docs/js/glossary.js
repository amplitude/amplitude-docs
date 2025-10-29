import { createApp } from 'vue'
import GlossaryApp from './glossary/GlossaryAppTable.vue'

// Initialize the Vue app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('glossary-container')
  
  if (container) {
    const app = createApp(GlossaryApp, {
      isLocal: window.APP_CONFIG?.isLocal || false,
      dataUrl: window.APP_CONFIG?.dataUrl || '/docs/glossary-data.json',
      searchDebounce: window.APP_CONFIG?.searchDebounce || 150,
      maxResults: window.APP_CONFIG?.maxResults || 50
    })

    // Make the app globally accessible for debugging
    window.glossary = app.mount('#glossary-container')
  }
})
