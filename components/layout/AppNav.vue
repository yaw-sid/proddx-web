<template>
  <div class="app-nav">
    <nav>
      <div class="brand">
        <div class="logo"></div>
      </div>

      <div class="actions">
        <app-button>Sign Up</app-button>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppButton from "@/components/forms/AppButton.vue"

export default Vue.extend({
  components: { AppButton }  
})
</script>

<style scoped>
nav {
  @apply flex justify-between items-center p-4 md:px-8 lg:max-w-screen-2xl lg:mx-auto lg:px-12;
}

.logo {
  @apply h-16 w-16 rounded-full bg-gray-600;
}
</style>