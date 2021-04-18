<template>
  <router-link class="header__cart" href="cart.html" aria-label="Корзина с товарами"
               :to="{name: 'cart'}">
    <img v-if="$store.state.cartLoading" src="img/svg/Spinner-1s-51px.svg"
         alt="Логотип интернет магазина Технозавррр"
         width="33" height="33">
    <svg v-else width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">
      {{ $store.state.cartProducts.length }}
    </span>
  </router-link>
</template>

<script>
export default {
  name: 'CartIndicator',
};
</script>
