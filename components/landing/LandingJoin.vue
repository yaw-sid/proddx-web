<template>
  <section>
    <div class="landing-join">
      <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit</h3>
      <div class="flex justify-center">
        <app-button>Register Now</app-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import AppButton from "@/components/forms/AppButton.vue";

export default Vue.extend({
  components: { AppButton }
});
</script>

<style scoped>
section {
  @apply px-4 py-16;
}

.landing-join {
  @apply lg:max-w-screen-2xl lg:mx-auto lg:px-12 lg:py-12;
}

h3 {
  @apply text-3xl text-center font-semibold mb-8 lg:text-4xl;
}
</style>