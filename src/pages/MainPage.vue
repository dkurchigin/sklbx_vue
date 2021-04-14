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
import BasePagination from '@/components/BasePagination.vue';
import ProductList from '@/components/ProductList.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

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
      productsData: null,
    };
  },
  computed: {
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
      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColor,
          },
        })
          // eslint-disable-next-line no-return-assign,arrow-parens
          .then(response => this.productsData = response.data);
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
