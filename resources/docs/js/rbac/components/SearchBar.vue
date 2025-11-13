<template>
  <div class="relative flex-1 max-w-md">
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-[#1C1C1E] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        :value="query"
        @input="$emit('update:query', $event.target.value)"
        type="text"
        :placeholder="placeholder"
        class="block w-full pl-10 pr-10 py-3 border border-[#E6E6EB] rounded-lg text-sm text-[#1C1C1E] placeholder-[#1C1C1E] placeholder-opacity-50 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors font-IBMPlex"
      />
      <div v-if="query" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <button
          @click="$emit('clear')"
          class="text-[#1C1C1E] opacity-50 hover:opacity-70 focus:outline-none transition-opacity"
          type="button"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  query: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search...'
  }
})

// Events
defineEmits(['update:query', 'clear'])
</script>
