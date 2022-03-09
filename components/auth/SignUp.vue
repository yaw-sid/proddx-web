<template>
  <aside ref="signUp" @click.self="close">
    <form @submit.prevent="submit">
      <h2>Sign Up</h2>
      <div>
        <app-alert v-show="isInvalidName" color="danger">Invalid Company Name</app-alert>
        <text-field v-model="name" type="text" class="form-control" placeholder="Company name" />
      </div>
      <div>
        <app-alert v-show="isInvalidEmail" color="danger">Invalid email</app-alert>
        <text-field v-model="email" type="email" class="form-control" placeholder="Company email" />
      </div>
      <text-field v-model="password" type="password" class="form-control password" placeholder="Password" />
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
import { SignUpData } from "@/models/authentication";
import { signUp } from "@/services/authentication";
import { emailValidation, companyNameValidation } from "@/utils/validations";

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
    name: "",
    email: "",
    password: "",
    loading: false,
    isInvalidName: false,
    isInvalidEmail: false
  }),

  watch: {
    show(val) {
      if (val) {
        (<HTMLElement>this.$refs.signUp).classList.add("open");
      } else {
        this.close();
      }
    }
  },

  methods: {
    close() {
      (<HTMLElement>this.$refs.signUp).classList.remove("open");
      this.$emit("close");
    },

    async submit() {
      this.loading = true;

      let error = false;
      if (!companyNameValidation(this.name)) {
        this.isInvalidName = true;
        error = true;
      }
      if (!emailValidation(this.email)) {
        this.isInvalidEmail = true;
        error = true;
      }
      if (error) {
        this.loading = false;
        return;
      }

      const data = new SignUpData(this.name, this.email, this.password);

      try {
        await signUp(data);
        this.close();
        this.$toast.success("Successful! Please login");
      } catch (error) {
        console.error(error);
        this.$toast.error("Failed to sign up! Please try again");
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