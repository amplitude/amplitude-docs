<template>
  <a 
    :href="editUrl"
    target="_blank"
    rel="noopener noreferrer"
    :class="[
      'edit-link inline-flex items-center gap-1 px-2 py-1 text-xs text-amp-blue-600 hover:text-amp-blue-800 transition-all duration-200 opacity-0 invisible',
      type === 'event' ? 'edit-link-event' : 'edit-link-property'
    ]"
    :title="linkTitle"
  >
    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
    </svg>
    Edit
  </a>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  eventId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['event', 'property'].includes(value)
  }
})

const editUrl = computed(() => {
  const collection = props.type === 'event' ? 'glossary_events' : 'glossary_properties'
  return `/cp/collections/${collection}/entries/${props.eventId}/edit`
})

const linkTitle = computed(() => {
  return `Edit this ${props.type} in Statamic CP`
})
</script>

<style scoped>
.edit-link-event {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  border: 1px solid #DEDFE2;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.edit-link-property {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  border: 1px solid #DEDFE2;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
</style>
