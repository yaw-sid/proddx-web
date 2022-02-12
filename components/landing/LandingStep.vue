<template>
  <div class="landing-step">
    <div class="bullet">{{ bullet }}</div>
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    bullet: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    }
  }
})
</script>

<style scoped>
.landing-step {
  @apply flex flex-col items-center gap-3 mb-8;
}

.bullet {
  @apply w-14 h-14 flex justify-center items-center text-4xl text-white rounded-full bg-blue-600;
}

h3 {
  @apply text-blue-600 text-xl font-semibold text-center;
}

p {
  @apply text-center;
}
</style>