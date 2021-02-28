<template>
  <section class="catalog">

        <ul class="catalog__list">
          <li class="catalog__item" v-for="(product, index) in getProducts" :key="index">
            <a class="catalog__pic" href="#">
              <img :src="product.img" :alt="product.title">
            </a>

            <h3 class="catalog__title">
              <a href="#">
                {{ product.title }}
              </a>
            </h3>

            <span class="catalog__price">
              {{ product.price }}
            </span>
          </li>
        </ul>
      <BasePagination v-model="page" :count="countProducts"
      :per-page="productsPerPage"></BasePagination>
      </section>
</template>

<script>
import products from './data/products';
import BasePagination from './components/BasePagination.vue';

export default {
  name: 'App',
  components: { BasePagination },
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
