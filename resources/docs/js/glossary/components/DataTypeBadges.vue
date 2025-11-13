<template>
  <div class="flex flex-wrap gap-1">
    <span
      v-for="type in types"
      :key="type"
      class="data-type-badge inline-flex items-center px-2 py-1 text-xs bg-amp-green-50 text-amp-green-700 rounded-md font-medium border border-amp-green-200"
      :title="`Data Type: ${type}`"
    >
      {{ type }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  types: {
    type: Array,
    default: () => []
  }
})
</script>
