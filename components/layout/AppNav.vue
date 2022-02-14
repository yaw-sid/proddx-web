<template>
  <div class="app-nav">
    <nav>
      <div class="brand">
        <nuxt-link class="logo" to="/"></nuxt-link>
      </div>

      <div class="actions">
        <app-button type="text" @click.native="displaySignIn">Sign In</app-button>
        <app-button @click.native="displaySignUp">Sign Up</app-button>
      </div>
    </nav>

    <sign-in :show="showSignIn" @close="closeSignIn" />
    <sign-up :show="showSignUp" @close="closeSignUp" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppButton from "@/components/forms/AppButton.vue";
import SignIn from "@/components/auth/SignIn.vue";
import SignUp from "@/components/auth/SignUp.vue";

export default Vue.extend({
  components: { 
    AppButton,
    SignIn,
    SignUp 
  },

  data: () => ({
    showSignIn: false,
    showSignUp: false
  }),

  methods: {
    displaySignIn() {
      this.showSignIn = true;
    },

    closeSignIn() {
      this.showSignIn = false;
    },

    displaySignUp() {
      this.showSignUp = true;
    },

    closeSignUp() {
      this.showSignUp = false;
    }
  }
});
</script>

<style scoped>
nav {
  @apply flex justify-between items-center p-4 md:px-8 lg:max-w-screen-2xl lg:mx-auto lg:px-12;
}

.logo {
  @apply block h-16 w-16 rounded-full bg-gray-600;
}
</style>