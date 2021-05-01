<template>
  <div>
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in products" :key="item.productId">
        <h3>{{ item.product.title }}</h3>
        <b>{{ item.product.price }} ₽</b>
        <span>Артикул: {{ item.productId }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ amount }}</b> товара на сумму <b>{{ total }} ₽</b></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinalCardProducts',
  props: ['products', 'amount', 'total'],
};
</script>

<style scoped>

</style>
