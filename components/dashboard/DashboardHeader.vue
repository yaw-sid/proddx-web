<template>
  <header>
    <!-- Modal Content -->
    <modal-window :show="showCompanyDetails" @close="closeCompanyDetails">
      <div class="m-content">
        <div class="image-container">
          <div class="image"></div>
        </div>

        <div class="name">
          <text-field v-model="currentCompany.name" placeholder="Company Name" :disabled="disabled" />
          <app-button color="primary" type="text" class="edit-btn" @click.native="editCompanyName()">Edit</app-button>
        </div>

        <div class="flex justify-center">
          <app-button :loading="saving" color="success" :disabled="disabled" @click.native="saveCompanyDetails()">Save</app-button>
        </div>
      </div>
    </modal-window>
    <!-- Main Content -->
    <h1>{{ title }}</h1>

    <div class="company" @click="displayCompanyDetails()">
      <div class="image-container">
        <div class="image"></div>
      </div>
      <div v-if="loading"></div>
      <p v-else>{{ company.name }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import AppButton from "@/components/forms/AppButton.vue";
import ModalWindow from "@/components/others/ModalWindow.vue";
import TextField from "@/components/forms/TextField.vue";
import { Company } from '~/models/company';

export default Vue.extend({

  components: {
    AppButton,
    ModalWindow,
    TextField
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },

  data: () => ({
    loading: true,
    showCompanyDetails: false,
    currentCompany: new Company("", "", "", ""),
    defaultCompany: new Company("", "", "", ""),
    disabled: true,
    saving: false
  }),

  computed: {
    company(): Company {
      return this.$store.getters["companies/getCompany"];
    }
  },

  async mounted() {
    if (!this.company.name) {
      try {
        await this.$store.dispatch("companies/loadCompany", "1");
      } catch (error) {
        console.error(error);
        this.$toast.error("Failed to load company data!");
      } finally {
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  },

  methods: {
    displayCompanyDetails() {
      this.currentCompany = Object.assign({}, this.company);
      this.showCompanyDetails = true;
    },

    closeCompanyDetails() {
      this.showCompanyDetails = false;
      this.disabled = true;
      this.currentCompany = Object.assign({}, this.defaultCompany);
    },

    editCompanyName() {
      this.disabled = false;
    },

    async saveCompanyDetails() {
      this.saving = true;

      try {
        await this.$store.dispatch("companies/editCompany", this.currentCompany);
        this.$toast.success("Successful!");
        this.closeCompanyDetails();
      } catch (error) {
        console.error(error);
        this.$toast.error("Failed to save!");
      } finally {
        this.saving = false;
      }
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
  @apply flex items-center gap-4 cursor-pointer relative;
}

.image {
  @apply w-12 h-12 rounded-full bg-gray-200;
}

.dropdown {
  @apply absolute inset-0 top-full shadow transition h-0;
}

.dropdown > div {
  @apply flex items-center gap-4;
}

/* 

  Modal

*/
.m-content {
  @apply bg-white p-8 rounded-lg w-1/3 2xl:w-1/4;
}

.m-content .image-container {
  @apply flex justify-center mb-4;
}

.m-content .image {
  @apply w-32 h-32;
}

.name {
  @apply flex justify-center items-center gap-4 mb-4;
}

.edit-btn {
  @apply text-sm;
}
</style>