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
import products from './data/products';
import BasePagination from './components/BasePagination.vue';
import ProductList from './components/ProductList.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
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
        let coloredProducts;

        filteredProducts.forEach((item) => {
          if (item.colors.includes(this.filterColor)) {
            coloredProducts.push(item);
          }
        });
        alert(coloredProducts.length);
        // eslint-disable-next-line max-len
        filteredProducts = filteredProducts.filter((product) => product.colors.includes(this.filterColor));
      }
      return filteredProducts;
    },
    getProducts() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>
