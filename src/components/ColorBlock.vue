<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio"
               :value="color.id" v-model="computedColor">
        <span class="colors__value" :style="{'background-color': color.value}">
                  </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ColorBlock',
  props: ['colors', 'currentColor'],
  computed: {
    computedColor: {
      get() {
        return this.currentColor;
      },
      set(value) {
        return this.$emit('update:currentColor', value);
      },
    },
  },
};
</script>
