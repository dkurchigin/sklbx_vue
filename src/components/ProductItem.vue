<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }}
    </span>

    <ul class="colors colors--black">
      <ColorBlock class="colors_black" :colors="productColors"
                  :current-color.sync="color"></ColorBlock>
    </ul>
  </li>
</template>

<script>
import ColorBlock from '@/components/ColorBlock.vue';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  components: { ColorBlock },
  data() {
    return {
      color: this.product.colors[0].id,
    };
  },
  props: ['product'],
  computed: {
    productColors() {
      return this.product.colors;
    },
  },
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
};
</script>
