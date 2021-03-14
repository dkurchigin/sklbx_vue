<template>
  <li class="catalog__item">
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

    <ul class="colors colors--black">
      <ColorBlock :colors="getColors" :current-color.sync="getColors[0]"></ColorBlock>
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
      color: '#73b6ea',
    };
  },
  props: ['product'],
  computed: {
    getColors() {
      const trueColors = [];

      const colorsIds = this.product.colors;
      // eslint-disable-next-line no-plusplus
      colorsIds.forEach((item) => {
        trueColors.push(colors.filter((color) => color.id === item)[0]);
      });
      return trueColors;
    },
  },
};
</script>
