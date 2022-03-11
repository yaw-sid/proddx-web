<template>
  <div v-if="loading"></div>
  <section v-else>
    <div class="charts">
      <div>
        <line-chart class="w-full" :chart-data="points" :chart-labels="labels" chart-title="Past 5 days" />
      </div>
      <div>
        <doughnut-chart :chart-data="piePoints" :chart-labels="pieLabels" chart-title="Reviews per product" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Company } from '~/models/company';
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
    loading: true
  }),

  computed: {
    company(): Company {
      return this.$store.getters["companies/getCompany"];
    },

    products(): Product[] {
      return this.$store.getters["products/getProducts"].filter((p: Product) => p.company_id === this.company.id);
    },

    reviews(): Review[] {
      return this.$store.getters["reviews/getReviews"]
        .filter((r: Review) => (r.company_id === this.company.id) && (Date.now() - new Date(r.created_at).getTime() <= (5 * 24 * 60 * 60 * 1000)))
        .sort((a: Review, b: Review) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    },

    labels(): string[] {
      const dates: string[] = [];
      const currentDate = new Date(Date.now() - 4*24*60*60*1000);
      for (let i = 0; i < 5; i++) {
        dates.push(currentDate.toLocaleString().substring(0, 10));
        currentDate.setTime(currentDate.getTime() + 24*60*60*1000);
      }
      return dates;
    },

    points(): number[] {
      return this.labels.map((date) => this.reviews.filter((r) => new Date(r.created_at).toLocaleString().substring(0, 10) === date).length);
    },

    pieData(): any {
      return this.reviews.reduce((prev: any, curr: Review) => {
        const key = this.getProductName(curr.product_id);
        // eslint-disable-next-line no-prototype-builtins
        if (!prev.hasOwnProperty(key)) {
          prev[key] = 0;
        }
        prev[key]++;
        return prev;
      }, {});
    },

    pieLabels(): string[] {
      return Object.keys(this.pieData);
    },

    piePoints(): string[] {
      return Object.keys(this.pieData).map(k => this.pieData[k]);
    },
    
    token() {
      return localStorage.getItem("proddx_token") || "";
    }
  },

  async mounted() {
    const promises: Promise<any>[] = [];
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

    if (promises.length > 0) {
      await Promise.all(promises).catch((err: any) => {
        console.error(err);
        this.$toast.error("Failed to load data!");
      });
    }

    this.loading = false;
  },

  methods: {
    getProductName(productId: string) {
      return this.products.find(p => p.id === productId)?.name || "";
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