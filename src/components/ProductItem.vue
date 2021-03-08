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
      <li class="colors__item" v-for="one_color in getColors" :key="one_color.value">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio"
                 :checked="one_color.value">
          <span class="colors__value" :style="{'background-color': one_color.value}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import colors from '../data/colors';

export default {
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
