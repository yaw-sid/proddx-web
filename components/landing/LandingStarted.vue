<template>
  <section id="get-started">
    <div class="landing-started">
      <h2>Get <span>Started</span></h2>

      <div class="steps">
        <landing-step 
          v-for="(step, index) in steps" :key="index"
          :bullet="step.index"
          :title="step.title"
          :text="step.text" 
          class="step"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import LandingStep from "@/components/landing/LandingStep.vue"

export default Vue.extend({
  components: {
    LandingStep
  },

  data: () => ({
    steps: [
      {
        index: "1",
        title: "Register",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, porro quibusdam praesentium maxime itaque consequatur natus a vel ratione at quos velit qui! Veritatis dolorum totam commodi perferendis, laborum cum!"
      }, {
        index: "2",
        title: "Add Your Products",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nulla iste voluptates, quidem tenetur modi at cumque, dignissimos fugiat nihil neque ipsa tempora voluptatum eos deleniti non. Aliquid, voluptatem placeat."
      }, {
        index: "3",
        title: "Generate Feedback URL",
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga maiores eligendi, temporibus maxime ipsum, at ab alias voluptatem inventore odio nihil! Accusantium obcaecati possimus neque modi tempore laborum, iusto nam?"
      }
    ]
  })
})
</script>

<style scoped>
section {
  @apply px-4 py-6 bg-gray-100;
}

.landing-started {
  @apply lg:max-w-screen-2xl lg:mx-auto lg:px-12 lg:py-12;
}

h2 {
  @apply text-4xl text-center font-semibold mb-8;
}

h2 span {
  @apply text-blue-600;
}

.steps {
  @apply lg:flex lg:justify-between lg:gap-8 xl:gap-12;
}

.step {
  @apply lg:flex-1;
}
</style>