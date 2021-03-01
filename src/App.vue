<template>
  <section class="catalog">

      <ProductList :products="getProducts"></ProductList>
      <BasePagination v-model="page" :count="countProducts"
      :per-page="productsPerPage"></BasePagination>
      </section>
</template>

<script>
import products from './data/products';
import BasePagination from './components/BasePagination.vue';
import ProductList from './components/ProductList.vue';

export default {
  name: 'App',
  components: { BasePagination, ProductList },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      products,
    };
  },
  computed: {
    getProducts() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    },
  },
};
</script>
