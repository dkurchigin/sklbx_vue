<template>
  <MainPage v-if="currentPage === 'main'"></MainPage>
  <ProductPage v-else-if="currentPage === 'product'"></ProductPage>
  <NotFoundPage v-else></NotFoundPage>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

export default {
  name: 'App',
  components: { MainPage, ProductPage, NotFoundPage },
  data() {
    return {
      currentPage: 'main',
    };
  },
};
</script>
