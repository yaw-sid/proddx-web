<template>
  <div v-if="loading"></div>
  <section v-else>
    <!-- Modal Window -->
    <modal-window :show="displayProductModal" @close="closeProductModal()">
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
            <div class="qr-code"></div>
          </div>
          <div class="url">
            <text-field v-model="currentProduct.feedback_url" :disabled="true" />
            <app-button color="primary" type="text">
              <span class="material-icons">content_copy</span>
            </app-button>
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
import AppAlert from "@/components/forms/AppAlert.vue";
import AppButton from "@/components/forms/AppButton.vue";
import ModalWindow from "@/components/others/ModalWindow.vue";
import TextField from "@/components/forms/TextField.vue";
import { Product } from '~/models/product';
import { Review } from '~/models/review';
import { companyNameValidation } from "@/utils/validations";

export default Vue.extend({
  components: {
    AppAlert,
    AppButton,
    ModalWindow,
    TextField
  },

  data: () => ({
    loading: true,
    saving: false,
    productName: "",
    filteredProducts: [] as Product[],
    currentProduct: new Product("", "", "", "", 0),
    defaultProduct: new Product("", "", "", "", 0),
    displayProductModal: false,
    disabled: false,
    invalidName: false
  }),

  computed: {
    products(): Product[] {
      return this.$store.getters["products/getProducts"]
        .filter((p: Product) => p.company === "1");
    },

    reviews(): Review[] {
      return this.$store.getters["reviews/getReviews"]
        .filter((r: Review) => r.company === "1");
    }
  },

  watch: {
    productName(val: string) {
      const condition = new RegExp(val, "i");
      this.filteredProducts = this.products.filter(p => condition.test(p.name));
    }
  },

  async mounted() {
    const promises = [];

    if (!this.products.length) {
      promises.push(this.$store.dispatch("products/loadProducts", "1"));
    }
    if (!this.reviews.length) {
      promises.push(this.$store.dispatch("reviews/loadReviews", "1"));
    }

    try {
      await Promise.all(promises);
      this.filteredProducts = this.products.slice();
    } catch (error) {
      console.error(error);
      this.$toast.error("Failed to load data!");
    } finally {
      this.loading = false;
    }
  },

  methods: {
    numberOfProductReviews(id: string) {
      return this.reviews.filter((r) => r.product === id).length;
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
    },

    enableTextField() {
      this.disabled = false;
    },

    async save() {
      this.saving = true;

      if (!companyNameValidation(this.currentProduct.name)) {
        this.invalidName = true;
        this.saving = false;
        return;
      }

      this.currentProduct.company = "1";

      try {
        await this.$store.dispatch("products/insertProduct", this.currentProduct);
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
  @apply flex justify-center mb-4;
}

.qr-code {
  @apply w-36 h-36 bg-gray-200;
}

.url {
  @apply flex justify-center items-center gap-4 mb-4;
}
</style>