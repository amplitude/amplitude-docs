<template>
  <div class="flex flex-col items-center justify-center py-16">
    <div class="animate-spin rounded-full h-8 w-8 border-2 border-amp-gray-200 border-t-amp-blue-500"></div>
    <span class="mt-3 text-amp-gray-600 loading-text">Loading events...</span>
  </div>
</template>

<style scoped>
/* Loading Animation */
@keyframes pulse-blue {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading-text {
  animation: pulse-blue 1.5s ease-in-out infinite;
}
</style>
