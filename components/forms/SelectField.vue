<template>
  <select 
    :id="id"
    ref="selectField"
    :value="value"
    :disabled="disabled"
    :class="disabled || !value ? 'text-gray-600' : ''"
    @input="handleInput"
  >
    <option disabled selected hidden value="">{{ placeholder }}</option>
    <option v-for="(option, index) in options" :key="index" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    id: {
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: []
    }
  },

  methods: {
    handleInput() {
      this.$emit("input", (<HTMLSelectElement>this.$refs.selectField).value);
    }
  }
});
</script>

<style scoped>
select {
  @apply p-4 rounded border border-transparent outline-none transition bg-gray-50 focus:bg-white focus:border-blue-600;
}
</style>