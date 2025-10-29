<template>
  <span 
    :class="[
      'platform-badge inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-transform hover:scale-105',
      config.color
    ]"
    :title="config.label"
  >
    <span class="text-xs">{{ config.icon }}</span>
    <span>{{ config.label }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  platform: {
    type: String,
    required: true
  }
})

const config = computed(() => {
  const configs = {
    web: { color: 'bg-mint-100 text-mint-800', icon: '🌐', label: 'Web' },
    ios: { color: 'bg-amp-gray-100 text-amp-gray-800', icon: '📱', label: 'iOS' },
    android: { color: 'bg-amp-light-teal-200 text-amp-dark-teal', icon: '🤖', label: 'Android' },
    all: { color: 'bg-amp-blue-100 text-amp-blue-800', icon: '⭐', label: 'All Platforms' }
  }
  
  return configs[props.platform] || { 
    color: 'bg-amp-blue-100 text-amp-blue-800', 
    icon: '⭐', 
    label: props.platform.charAt(0).toUpperCase() + props.platform.slice(1)
  }
})
</script>
