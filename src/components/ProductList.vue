<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id"
                 :product="product" :all_colors="all_colors"></ProductItem>
  </ul>
</template>
<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products', 'all_colors'],
  components: { ProductItem },
};
</script>
