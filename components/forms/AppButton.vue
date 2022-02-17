<template>
  <button v-if="!to" :class="`app-button ${color} ${type} ${disabled ? 'disabled' : ''}`" :disabled="disabled">
    <svg v-show="loading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>

    <slot />
  </button>
  <nuxt-link 
    v-else 
    :to="to"
    :class="`app-button ${color} ${type}`"
  > 
    <slot />
  </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    loading: Boolean,
    to: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    type: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
.app-button {
  @apply inline-flex justify-center items-center gap-2 border-none text-white rounded px-4 py-2 no-underline transition hover:bg-transparent lg:text-lg lg:px-5 lg:py-3;
}

.text {
  @apply hover:underline;
}

.primary {
  @apply bg-blue-600 hover:text-blue-600 focus:bg-blue-600 focus:text-white;
}

.primary.text {
  @apply text-blue-600 bg-transparent hover:text-blue-500;
}

.success {
  @apply bg-green-600 hover:text-green-600 focus:bg-green-600 focus:text-white;
}

.success.text {
  @apply text-green-600 bg-transparent hover:text-green-500;
}

.warning {
  @apply bg-yellow-600 hover:text-yellow-600 focus:bg-yellow-600 focus:text-white;
}

.warning.text {
  @apply text-yellow-600 bg-transparent hover:text-yellow-500;
}

.danger {
  @apply bg-red-600 hover:text-red-600 focus:bg-red-600 focus:text-white;
}

.danger.text {
  @apply text-red-600 bg-transparent hover:text-red-500;
}

.disabled {
  @apply bg-gray-400 cursor-not-allowed hover:bg-gray-400;
}

.disabled.text {
  @apply text-gray-400 bg-transparent hover:text-gray-400;
}

svg {
  @apply w-5 h-5 text-white;

  animation: spin 1s infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>