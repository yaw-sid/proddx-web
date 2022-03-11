<template>
  <small :class="color"><slot /></small>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    color: {
      type: String,
      default: "primary"
    }
  }
})
</script>

<style scoped>
.primary {
  @apply text-blue-600;
}

.warning {
  @apply text-yellow-600;
}

.danger {
  @apply text-red-600;
}
</style>