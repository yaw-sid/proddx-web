<template>
  <section>
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
    <div class="tab" @click="changeTab(3)">
      <span class="material-icons">account_circle</span>
      <p>Account</p>
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
    }
  }
});
</script>

<style scoped>
section {
  @apply h-screen bg-gray-100 pt-12;
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