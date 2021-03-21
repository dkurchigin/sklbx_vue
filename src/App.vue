<template>
  <component :is="currentPageComponent" :page-params="CurrentPageParams"
             @gotoPage="(pageName, pageParams) =>
             gotoPage(pageName, pageParams)"></component>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  name: 'App',
  components: { MainPage, ProductPage, NotFoundPage },
  data() {
    return {
      currentPage: 'main',
      CurrentPageParams: {},
    };
  },
  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageComponent = pageParams || {};
    },
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },
};
</script>
