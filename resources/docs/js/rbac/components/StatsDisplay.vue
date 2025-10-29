<template>
  <div class="text-right">
    <div class="text-sm text-gray-500">
      <span v-if="isSearching && currentQuery">
        Searching for "<span class="font-medium">{{ currentQuery }}</span>"
      </span>
      <span v-else-if="filteredCount !== permissionsCount">
        Showing {{ filteredCount }} of {{ permissionsCount }} permissions
      </span>
      <span v-else>
        {{ permissionsCount }} permissions
      </span>
    </div>
    <div v-if="filteredCount !== permissionsCount" class="text-xs text-gray-400 mt-1">
      {{ permissionsCount - filteredCount }} filtered out
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  permissionsCount: {
    type: Number,
    default: 0
  },
  filteredCount: {
    type: Number,
    default: 0
  },
  isSearching: {
    type: Boolean,
    default: false
  },
  currentQuery: {
    type: String,
    default: ''
  }
})
</script>
