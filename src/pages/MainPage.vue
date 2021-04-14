<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
                     :category-id.sync="filterCategoryId"
                     :color-id.sync="filterColor"></ProductFilter>
      <section class="catalog">

        <ProductList :products="getProducts"></ProductList>
        <BasePagination v-model="page" :count="countProducts"
                        :per-page="productsPerPage"></BasePagination>
      </section>
    </div>
  </main>
</template>

<script>
import products from '@/data/products';
import BasePagination from '@/components/BasePagination.vue';
import ProductList from '@/components/ProductList.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';

export default {
  name: 'MainApp',
  components: { BasePagination, ProductList, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 3,
      products,
      productsData: null,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        // eslint-disable-next-line max-len
        filteredProducts = filteredProducts.filter((product) => product.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        // eslint-disable-next-line max-len
        filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
      }
      if (this.filterCategoryId) {
        // eslint-disable-next-line max-len
        filteredProducts = filteredProducts.filter((product) => product.categoryId === this.filterCategoryId);
      }
      if (this.filterColor) {
        // eslint-disable-next-line max-len
        filteredProducts = filteredProducts.filter((product) => product.colors.some((element) => element === this.filterColor));
      }
      return filteredProducts;
    },
    getProducts() {
      // eslint-disable-next-line arrow-body-style, arrow-parens
      return this.productsData ? this.productsData.items.map(product => {
        return {
          ...product,
          image: product.image.file.url,
        };
      }) : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      axios.get(`https://vue-study.skillbox.cc/api/products?page=${this.page}&limit=${this.productsPerPage}`)
        // eslint-disable-next-line no-return-assign,arrow-parens
        .then(response => this.productsData = response.data);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
