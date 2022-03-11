<template>
  <header>
    <div class="text">
      <h1>Manage your customer <span>feedback</span></h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus minima nisi tenetur ex cupiditate odit reprehenderit nostrum alias voluptatem ipsam veritatis, harum dolor minus placeat, expedita doloribus quam quasi? Dolorem.</p>
      <div class="button-container">
        <app-button to="#get-started">How it works</app-button>
      </div>
    </div>

    <div class="image">
      <div class="hero-image"></div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import AppButton from "@/components/forms/AppButton.vue"

export default Vue.extend({
  components: { AppButton }
})
</script>

<style scoped>
header {
  @apply px-4 py-8 md:px-8 md:py-10 lg:flex lg:justify-between lg:items-center lg:gap-8 lg:max-w-screen-2xl lg:mx-auto lg:px-12 lg:py-20;
}

.text {
  @apply mb-8 lg:flex-1;
}

h1 {
  @apply text-4xl font-semibold text-center mb-8 md:text-5xl lg:text-left lg:text-6xl lg:leading-snug;
}

h1 span {
  @apply text-blue-600;
}

p {
  @apply text-center mb-8 lg:text-left;
}

.button-container {
  @apply flex justify-center lg:justify-start;
}

.image {
  @apply lg:flex-1;
}

.hero-image {
  @apply bg-gray-200 h-96 w-full;
}
</style>