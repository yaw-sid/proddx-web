<template>
  <aside ref="signIn" @click.self="close">
    <form @submit.prevent="submit">
      <h2>Sign In</h2>
      <text-field v-model="email" type="email" class="form-control" placeholder="Company email" />
      <text-field v-model="password" type="password" class="form-control" placeholder="Password" />
      <div class="flex justify-end">
        <app-button :loading="loading">Submit</app-button>
      </div>
    </form>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue';
import AppButton from "@/components/forms/AppButton.vue";
import TextField from "@/components/forms/TextField.vue";
import { SignInData } from "@/models/authentication";
import { signIn } from "@/services/authentication";

export default Vue.extend({
  components: {
    AppButton,
    TextField
  },

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    email: "",
    password: "",
    loading: false
  }),

  watch: {
    show(val) {
      if (val) {
        (<HTMLElement>this.$refs.signIn).classList.add("open");
      } else {
        this.close();
      }
    }
  },

  methods: {
    close() {
      (<HTMLElement>this.$refs.signIn).classList.remove("open");
      this.$emit("close");
    },

    async submit() {
      this.loading = true;

      const data = new SignInData(this.email, this.password);

      try {
        await signIn(data);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
        this.close();
      }
    }
  }
});
</script>

<style scoped>
aside {
  @apply flex justify-center items-center fixed inset-0 w-0 h-0 opacity-0 invisible;

  background-color: rgba(0, 0, 0, 0.7);
}

aside.open {
  @apply opacity-100 visible z-10 w-full h-screen;
}

aside.open form {
  @apply scale-100;
}

form {
  @apply bg-white p-6 rounded w-11/12 mx-auto scale-0 transition-transform md:max-w-lg lg:p-8;
}

h2 {
  @apply font-semibold text-xl mb-6 md:mb-8;
}

.form-control {
  @apply w-full mb-4;
}
</style>