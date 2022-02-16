<template>
  <div v-if="loading"></div>
  <section v-else>
    <div class="products">
      <div 
        v-for="product in products" 
        :key="product.id" 
        :class="`product ${product.id == currentProduct.id ? 'active' : ''}`"
        @click="changeProduct(product)"
      >{{ product.name }}</div>
    </div>

    <div class="charts">
      <div>
        <line-chart class="w-full" :chart-data="points" :chart-labels="labels" />
      </div>
      <div>
        <doughnut-chart :chart-data="piePoints" :chart-labels="pieLabels" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Category } from "@/models/category";
import { Product } from "@/models/product";
import { Review } from "@/models/review";

import LineChart from "@/components/dashboard/LineChart";
import DoughnutChart from "@/components/dashboard/DoughnutChart";

export default Vue.extend({
  components: {
    LineChart,
    DoughnutChart
  },

  data: () => ({
    loading: true,
    currentProduct: new Product("", "", "", "", 0)
  }),

  computed: {
    products() {
      return this.$store.getters["products/getProducts"];
    },

    reviews() {
      return this.$store.getters["reviews/getReviews"]
        .filter((r: Review) => (r.product === this.currentProduct.id) && (Date.now() - r.date_created.getTime() < (5 * 24 * 60 * 60 * 1000)))
        .sort((a: Review, b: Review) => a.date_created .getTime() - b.date_created.getTime());
    },

    categories() {
      return this.$store.getters["categories/getCategories"]
        .filter((c: Category) => c.product === this.currentProduct.id);
    },

    chartData() {
      return this.reviews.reduce((prev: any, curr: Review) => {
        const key = curr.date_created.toLocaleString().substring(0, 10);
        // eslint-disable-next-line no-prototype-builtins
        if (!prev.hasOwnProperty(key)) {
          prev[key] = 0;
        }
        prev[key]++;
        return prev;
      }, {});
    },

    labels() {
      return Object.keys(this.chartData);
    },

    points() {
      return Object.keys(this.chartData).map(k => this.chartData[k]);
    },

    pieData() {
      return this.categories.reduce((prev: any, curr: Category) => {
        const key = curr.label;
        // eslint-disable-next-line no-prototype-builtins
        if (!prev.hasOwnProperty(key)) {
          prev[key] = 0;
        }
        prev[key]++;
        return prev;
      }, {});
    },

    pieLabels() {
      return Object.keys(this.pieData);
    },

    piePoints() {
      return Object.keys(this.pieData).map(k => this.pieData[k]);
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
    if (!this.categories.length) {
      promises.push(this.$store.dispatch("categories/loadCategories", "1"));
    }

    if (promises.length > 0) {
      await Promise.all(promises).catch((err: any) => {
        // eslint-disable-next-line no-console
        console.error(err);
        this.$toast.error("Failed to load data!");
      });
    }

    this.currentProduct = this.products[0];
    this.loading = false;
  },

  methods: {
    changeProduct(p: Product) {
      this.currentProduct = p;
    }
  }
});
</script>

<style scoped>
.products {
  @apply flex gap-6 mb-24;
}

.product {
  @apply p-5 shadow text-xl rounded-xl cursor-pointer transition hover:text-blue-600 hover:shadow-md;
}

.product.active {
  @apply bg-blue-600 text-white;
}

.charts {
  @apply flex items-center gap-8;
}

.charts > div:first-child {
  @apply w-2/3;
}

.charts > div:last-child {
  @apply w-1/3;
}
</style>