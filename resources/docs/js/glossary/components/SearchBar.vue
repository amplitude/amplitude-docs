<template>
  <div class="flex-1 max-w-lg">
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-amp-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input 
        v-model="searchValue"
        type="text" 
        :placeholder="placeholder" 
        class="search-input block w-full pl-12 pr-12 py-3 border border-amp-gray-200 rounded-lg bg-white text-amp-gray-900 placeholder-amp-gray-500 focus:outline-none focus:ring-2 focus:ring-amp-blue-500 focus:border-amp-blue-500 transition-colors"
        @keydown.escape="handleClear"
      >
      <div 
        v-show="searchValue" 
        class="absolute inset-y-0 right-0 pr-4 flex items-center"
      >
        <button 
          @click="handleClear"
          class="text-amp-gray-400 hover:text-amp-gray-600 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-amp-blue-500"
          title="Clear search"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  query: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search events...'
  }
})

const emit = defineEmits(['update:query', 'clear'])

const searchValue = computed({
  get() {
    return props.query
  },
  set(value) {
    emit('update:query', value)
  }
})

const handleClear = () => {
  emit('update:query', '')
  emit('clear')
}
</script>

<style scoped>
/* Search Focus Ring */
.search-input:focus {
  box-shadow: 0 0 0 3px rgba(30, 97, 240, 0.1);
}
</style>
