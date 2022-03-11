<template>
  <div v-if="loading"></div>
  <section v-else>
    <!-- Modal Window -->
    <modal-window id="modal" :show="displayProductModal" @close="closeProductModal()">
      <div class="m-content">
        <app-alert v-if="invalidName" color="danger">Invalid Product name</app-alert>
        <div class="heading">
          <text-field 
            v-model="currentProduct.name" 
            class="m-text-field" placeholder="Product name" 
            :disabled="disabled" 
          />
          <app-button 
            v-if="currentProduct.feedback_url" 
            color="primary" 
            type="text" 
            class="m-edit-btn" 
            @click.native="enableTextField()"
          >Edit</app-button>
        </div>

        <template v-if="currentProduct.feedback_url">
          <h3>Feedback URL</h3>
          <div class="image-container">
            <qrcode-vue v-if="displayProductModal" :value="currentProduct.feedback_url" :size="150" level="H" />
          </div>
          <div class="url">
            <text-field id="feedback-input" v-model="currentProduct.feedback_url" :disabled="true" />
            <app-button color="primary" type="text" @click.native="copyToClipboard()">
              <span class="material-icons">content_copy</span>
            </app-button>
            <div v-if="copied" class="copied">Copied!</div>
          </div>
        </template>

        <div class="flex justify-center">
          <app-button 
            :color="'success'" 
            :loading="saving" 
            :disabled="disabled" 
            @click.native="save()"
          >Save</app-button>
        </div>
      </div>
    </modal-window>

    <!-- Main Interface -->
    <div class="search">
      <text-field v-model="productName" class="text-field" placeholder="Search for product" />
      <app-button color="success" @click.native="addNewProduct()">Add Product</app-button>
    </div>

    <div class="products">
      <div 
        v-for="product in filteredProducts" :key="product.id" 
        class="product"
        @click="showProductDetails(product)"
      >
        <h3>{{ product.name }}</h3>
        <div>
          <p>Avg. rating</p>
          <div class="ratings">
            <span v-for="n in product.rating" :key="n" class="material-icons">star</span>
          </div>
        </div>
        <div>
          <p>No. of reviews</p>
          <p>{{ numberOfProductReviews(product.id) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import QrcodeVue from 'qrcode.vue'
import AppAlert from "@/components/forms/AppAlert.vue";
import AppButton from "@/components/forms/AppButton.vue";
import ModalWindow from "@/components/others/ModalWindow.vue";
import TextField from "@/components/forms/TextField.vue";
import { Product } from '~/models/product';
import { Review } from '~/models/review';
import { companyNameValidation } from "@/utils/validations";
import { Company } from '~/models/company';

export default Vue.extend({
  components: {
    AppAlert,
    AppButton,
    ModalWindow,
    TextField,
    QrcodeVue
  },

  data: () => ({
    loading: true,
    saving: false,
    productName: "",
    currentProduct: new Product("", "", "", "", 0),
    defaultProduct: new Product("", "", "", "", 0),
    displayProductModal: false,
    disabled: false,
    invalidName: false,
    copied: false,
  }),

  computed: {
    company(): Company {
      return this.$store.getters["companies/getCompany"];
    },

    products(): Product[] {
      return this.$store.getters["products/getProducts"]
        .filter((p: Product) => p.company_id === this.company.id);
    },

    filteredProducts(): Product[] {
      return this.filterByName(this.products);
    },

    reviews(): Review[] {
      return this.$store.getters["reviews/getReviews"]
        .filter((r: Review) => r.company_id === this.company.id);
    },
    
    token() {
      return localStorage.getItem("proddx_token") || "";
    }
  },

  async mounted() {
    const promises = [];

    if (!this.company.name) {
      const userId = JSON.parse(atob(this.token.split(".")[1])).id;
      await this.$store.dispatch("companies/loadCompany", {
        id: userId,
        token: this.token
      }).catch(error => this.$toast.error(error));
    }
    
    if (!this.products.length) {
      promises.push(this.$store.dispatch("products/loadProducts", { companyId: this.company.id, token: this.token }));
    }
    if (!this.reviews.length) {
      promises.push(this.$store.dispatch("reviews/loadReviews", { companyId: this.company.id, token: this.token }));
    }

    try {
      await Promise.all(promises);
    } catch (error) {
      console.error(error);
      this.$toast.error("Failed to load data!");
    } finally {
      this.loading = false;
    }
  },

  methods: {
    filterByName(products: Product[]) {
      if (this.productName) {
        const condition = new RegExp(this.productName, "i");
        return products.filter((p) => condition.test(p.name));
      }
      return products;
    },

    numberOfProductReviews(id: string) {
      return this.reviews.filter((r) => r.product_id === id).length;
    },

    showProductDetails(p: Product) {
      this.currentProduct = Object.assign(new Product("", "", "", "", 0), p);
      this.displayProductModal = true;
      this.disabled = true;
    },

    addNewProduct() {
      this.currentProduct = Object.assign(new Product("", "", "", "", 0), this.defaultProduct);
      this.displayProductModal = true;
      this.disabled = false;
    },

    closeProductModal() {
      this.currentProduct = Object.assign(new Product("", "", "", "", 0), this.defaultProduct);
      this.displayProductModal = false;
      this.copied = false;
    },

    enableTextField() {
      this.disabled = false;
    },

    copyToClipboard() {
      const textarea = document.createElement("textarea");
      textarea.textContent = this.currentProduct.feedback_url;
      textarea.style.position = "fixed";
      document.getElementById("modal")?.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.getElementById("modal")?.removeChild(textarea);
      this.copied = true;
      setTimeout(() => { this.copied = false }, 2000);
    },

    async save() {
      this.saving = true;

      if (!companyNameValidation(this.currentProduct.name)) {
        this.invalidName = true;
        this.saving = false;
        return;
      }

      this.currentProduct.company_id = this.company.id;
      let action = "products/insertProduct";
      if (this.currentProduct.id) {
        action = "products/editProduct";
      }

      try {
        await this.$store.dispatch(action, {
          data: this.currentProduct,
          token: this.token
        });
        this.$toast.success("Successful!");
      } catch (error) {
        console.error(error);
        this.$toast.error("Failed!");
      } finally {
        this.saving = false;
        this.closeProductModal();
      }
    }
  }
});
</script>

<style scoped>
.search {
  @apply flex items-center gap-4 mb-12;
}

.text-field {
  @apply w-2/5;
}

.products {
  @apply flex gap-6;
}

.product {
  @apply shadow p-6 w-1/4 cursor-pointer transition hover:shadow-md;
}

h3 {
  @apply font-semibold text-lg text-blue-600;
}

.product > div {
  @apply flex justify-between items-center;
}

.product span {
  @apply text-green-600;
}

/* 

  Modal

*/
.m-content {
  @apply bg-white p-8 rounded-lg;
}

.heading {
  @apply flex items-center gap-4 mb-6;
}

.m-text-field {
  @apply text-2xl font-bold;
}

.m-edit-btn {
  @apply text-sm;
}

.m-content h3 {
  @apply text-base font-semibold text-black mb-4;
}

.image-container {
  @apply flex justify-center mb-4 relative;
}

.image-container:hover #download-btn {
  @apply visible;
}

.url {
  @apply relative flex justify-center items-center gap-4 mb-4;
}

.copied {
  @apply absolute right-0 bottom-4 p-1 text-sm text-white bg-blue-600 rounded transition;
}
</style>