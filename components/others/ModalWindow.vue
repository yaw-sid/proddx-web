<template>
  <aside :id="id" ref="modal" @click.self="close">
    <slot class="content"/>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ""
    }
  },

  watch: {
    show(val) {
      if (val) {
        (<HTMLElement>this.$refs.modal).classList.add("open");
      } else {
        this.close();
      }
    }
  },

  methods: {
    close() {
      (<HTMLElement>this.$refs.modal).classList.remove("open");
      this.$emit("close");
    }
  }
});
</script>

<style scoped>
aside {
  @apply flex justify-center items-center fixed inset-0 w-0 h-0 opacity-0 invisible;

  background-color: rgba(0, 0, 0, 0.7);
}

aside.open {
  @apply opacity-100 visible z-10 w-full h-screen;
}

aside.open .content {
  @apply scale-100;
}
</style>