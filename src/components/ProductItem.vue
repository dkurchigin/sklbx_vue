<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#"
       @click.prevent="$emit('gotoPage', 'product', {id: product.id})">
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

    <ul class="colors colors--black">
      <ColorBlock class="colors_black" :colors="productColors"
                  :current-color.sync="color"></ColorBlock>
    </ul>
  </li>
</template>

<script>
import ColorBlock from '@/components/ColorBlock.vue';
import colors from '../data/colors';

export default {
  components: { ColorBlock },
  data() {
    return {
      color: this.product.colors[0],
    };
  },
  props: ['product'],
  computed: {
    productColors() {
      return this.product.colors.map((id) => colors.find((c) => c.id === id));
    },
  },
};
</script>
