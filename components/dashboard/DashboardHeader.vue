<template>
  <header>
    <h1>{{ title }}</h1>

    <div class="company">
      <div class="image-container">
        <div class="image"></div>
      </div>
      <p>Company Name</p>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ""
    }
  }
});
</script>

<style scoped>
header {
  @apply flex justify-between items-center mb-12;
}

h1 {
  @apply font-bold text-2xl;
}

.company {
  @apply flex items-center gap-4;
}

.image {
  @apply w-12 h-12 rounded-full bg-gray-200;
}
</style>