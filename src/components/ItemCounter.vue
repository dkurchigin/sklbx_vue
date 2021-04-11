<template>
    <div class="form__counter">
      <button type="button" aria-label="Убрать один товар"
              @click.prevent="productAmount--">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="productAmount">

      <button type="button" aria-label="Добавить один товар"
              @click.prevent="productAmount++">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
</template>

<script>
export default {
  name: 'ItemCounter',
  props: ['count'],
  computed: {
    productAmount: {
      get() {
        return this.count;
      },
      // eslint-disable-next-line consistent-return
      set(value) {
        if (value >= 1) {
          return this.$emit('update:count', value);
        }
      },
    },
  },
};
</script>

<style scoped>

</style>
