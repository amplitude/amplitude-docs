<template>
  <button 
    :class="[
      'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent hover:text-amp-blue-600 hover:border-amp-blue-300 transition-colors',
      active ? activeClasses : 'text-amp-gray-600'
    ]"
    @click="$emit('click')"
    role="tab"
    :aria-selected="active"
  >
    <div :class="[
      'w-4 h-4 rounded-full flex items-center justify-center',
      iconClasses
    ]">
      <span class="text-xs leading-none">{{ icon }}</span>
    </div>
    <span><slot></slot></span>
    <span :class="[
      'px-2 py-1 text-xs rounded-full',
      badgeClasses
    ]">
      <slot name="count"></slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'blue'
  }
})

const emit = defineEmits(['click'])

const activeClasses = computed(() => {
  return 'border-amp-blue-500 text-amp-blue-600 bg-amp-blue-50'
})

const iconClasses = computed(() => {
  const colorClasses = {
    purple: 'bg-amp-light-purple-400 text-white',
    blue: 'bg-amp-blue-600 text-white',
    gray: 'bg-amp-gray-600 text-white'
  }
  return colorClasses[props.color] || colorClasses.blue
})

const badgeClasses = computed(() => {
  if (props.active) {
    const activeColorClasses = {
      purple: 'bg-amp-light-purple-900 text-amp-light-purple-300',
      blue: 'bg-amp-blue-100 text-amp-blue-700',
      gray: 'bg-amp-gray-100 text-amp-gray-700'
    }
    return activeColorClasses[props.color] || activeColorClasses.blue
  } else {
    return 'bg-amp-gray-100 text-amp-gray-600'
  }
})
</script>
