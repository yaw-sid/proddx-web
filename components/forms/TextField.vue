<template>
  <input 
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    ref="textField"
    @input="handleInput"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    id: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
  },

  methods: {
    handleInput() {
      this.$emit("input", (<HTMLInputElement>this.$refs.textField).value);
    }
  }
});
</script>

<style scoped>
input {
  @apply p-4 rounded border border-transparent outline-none transition bg-gray-50 focus:bg-white focus:border-blue-600;
}
</style>