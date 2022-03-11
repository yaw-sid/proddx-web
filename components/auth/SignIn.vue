<template>
  <aside ref="signIn" @click.self="close">
    <form @submit.prevent="submit">
      <h2>Sign In</h2>
      <div>
        <app-alert color="danger" v-show="isInvalidEmail">Invalid email</app-alert>
        <text-field v-model="email" type="email" class="form-control" placeholder="Company email" />
      </div>
      <div>
        <text-field v-model="password" type="password" class="form-control password" placeholder="Password" />
      </div>
      <div class="flex justify-end">
        <app-button :loading="loading">Submit</app-button>
      </div>
    </form>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue';
import AppAlert from "@/components/forms/AppAlert.vue";
import AppButton from "@/components/forms/AppButton.vue";
import TextField from "@/components/forms/TextField.vue";
import { SignInData } from "@/models/authentication";
import { signIn } from "@/services/authentication";
import { emailValidation } from "@/utils/validations";

export default Vue.extend({
  components: {
    AppAlert,
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
    loading: false,
    isInvalidEmail: false
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

      if (!emailValidation(this.email)) {
        this.isInvalidEmail = true;
        this.loading = false;
        return;
      }

      const data = new SignInData(this.email, this.password);

      try {
        const response = await signIn(data);
        localStorage.setItem("proddx_token", response.data.token);
        this.close();
        this.$router.push({
          path: "/dashboard"
        });
      } catch (error) {
        console.error(error);
        this.$toast.error("Failed to sign in! Please try again");
      } finally {
        this.loading = false;
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

.password {
  @apply tracking-wide;
  
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.password::placeholder {
  font-family: 'Montserrat', sans-serif;
}

.password:-ms-input-placeholder {
  font-family: 'Montserrat', sans-serif;
}

.password::-ms-input-placeholder {
  font-family: 'Montserrat', sans-serif;
}
</style>