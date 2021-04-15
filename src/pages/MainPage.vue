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
        <PreUploader v-if="productsLoading"/>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров
          <button @click.prevent="loadProducts">Попробовать ещё раз</button>
        </div>
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
// ПОДСКАЖИТЕ КАК ПОДКЛЮЧИТЬ ВЕБПАК!!!!
// ТАК И НЕ ПОНЯЛ ВСЕХ ХИТРОСПЛЕТЕНИЙ
import PreUploader from '@/components/PreUploader.vue';

export default {
  name: 'MainApp',
  components: {
    BasePagination, ProductList, ProductFilter, PreUploader,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
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
      this.productsLoading = true;
      this.productsLoadingFailed = false;
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
          .then(response => this.productsData = response.data)
          // eslint-disable-next-line no-return-assign
          .catch(() => this.productsLoadingFailed = true)
          // eslint-disable-next-line no-return-assign
          .then(() => this.productsLoading = false);
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
