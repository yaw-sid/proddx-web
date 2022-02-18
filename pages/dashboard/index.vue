<template>
  <article>
    <dashboard-nav class="nav" @changeTab="tabChanged" />
    <div class="content">
      <dashboard-header :title="tabName" />

      <dashboard-overview v-if="tabName == 'Overview'" />
      <dashboard-products v-else-if="tabName == 'Products'" />
      <dashboard-reviews v-else-if="tabName == 'Reviews'" />
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import DashboardNav from "@/components/dashboard/DashboardNav.vue";
import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";
import DashboardOverview from "@/components/dashboard/DashboardOverview.vue";
import DashboardProducts from "@/components/dashboard/DashboardProducts.vue";
import DashboardReviews from "@/components/dashboard/DashboardReviews.vue";

export default Vue.extend({
  components: {
    DashboardNav,
    DashboardHeader,
    DashboardOverview,
    DashboardProducts,
    DashboardReviews
  },

  data: () => ({
    tabName: "Overview"
  }),

  methods: {
    tabChanged(e: number) {
      switch (e) {
        case 0:
          this.tabName = "Overview";
          break;
        case 1:
          this.tabName = "Products";
          break;
        case 2:
          this.tabName = "Reviews";
          break;
        case 3:
          this.tabName = "Account";
          break;
      }
    }
  }
});
</script>

<style scoped>
body {
  font-family: 'Montserrat', sans-serif;
}

article {
  @apply flex;
}

.nav {
  @apply w-3/12;
}

.content {
  @apply p-8 w-9/12;
}
</style>