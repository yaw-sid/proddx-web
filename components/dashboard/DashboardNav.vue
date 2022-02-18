<template>
  <section>
    <div>
      <div class="brand">
        <div>
          <div class="image-container">
            <div class="image"></div>
          </div>
          <p class="name">Proddx</p>
        </div>
      </div>

      <div class="tab active" @click="changeTab(0)">
        <span class="material-icons">home</span>
        <p>Home</p>
      </div>
      <div class="tab" @click="changeTab(1)">
        <span class="material-icons">inventory_2</span>
        <p>Products</p>
      </div>
      <div class="tab" @click="changeTab(2)">
        <span class="material-icons">reviews</span>
        <p>Reviews</p>
      </div>
    </div>
    <div>
      <div class="tab" @click="logout()">
        <span class="material-icons">logout</span>
        <p>Logout</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data: () => ({
    currentTab: 0
  }),

  methods: {
    changeTab(index: number) {
      const tabs = document.getElementsByClassName("tab");
      tabs[this.currentTab].classList.remove("active");
      tabs[index].classList.add("active");
      this.currentTab = index;
      this.$emit("changeTab", this.currentTab);
    },

    async logout() {
      try {
        await this.$store.dispatch("companies/logout");
        this.$router.push({
          path: "/"
        });
      } catch (error) {
        console.error(error);
        this.$toast.error("Failed to logout!");
      }
    }
  }
});
</script>

<style scoped>
section {
  @apply flex flex-col justify-between min-h-screen bg-gray-100 pt-12;
}

.brand {
  @apply flex justify-center mb-8;
}

.brand > div {
  @apply flex items-center gap-4;
}

.image {
  @apply w-16 h-16 rounded-full bg-blue-500;
}

.tab {
  @apply flex items-center gap-4 ml-8 p-6 rounded-lg cursor-pointer transition;
}

.tab.active {
  @apply bg-white;

  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.tab span {
  @apply transition;
}

.tab.active span {
  @apply text-blue-600;
}

.tab p {
  @apply text-lg transition;
}

.tab.active p {
  @apply text-blue-600;
}
</style>