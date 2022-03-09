<template>
  <article>
    <app-nav />

    <landing-hero />
    <landing-started />
    <landing-join />

    <app-footer />
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import AppNav from "@/components/layout/AppNav.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import LandingHero from "@/components/landing/LandingHero.vue";
import LandingStarted from '@/components/landing/LandingStarted.vue';
import LandingJoin from "@/components/landing/LandingJoin.vue";

export default Vue.extend({
  name: 'IndexPage',

  components: {
    AppNav,
    AppFooter,
    LandingHero,
    LandingStarted,
    LandingJoin
  }
});
</script>
