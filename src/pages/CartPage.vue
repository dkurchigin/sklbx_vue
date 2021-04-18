<template>
  <div class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalAmount }} товара
      </span>
    </div>

    <section class="cart">
      <div v-if="cartLoading"><PreUploader/></div>
      <div v-else-if="cartLoadingFailed">Не удалось загрузить корзину!</div>
      <div v-if="products && !cartLoading">
        <form class="cart__form form" action="#" method="POST">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item"/>
          </ul>

          <div class="cart__block">
            <p class="cart__desc">
              Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
            </p>
            <p class="cart__price">
              Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
            </p>

            <button class="cart__button button button--primery" type="submit">
              Оформить заказ
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import PreUploader from '@/components/PreUploader.vue';

export default {
  name: 'CartPage',
  components: { CartItem, PreUploader },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({
      products: 'cardDetailProducts',
      totalPrice: 'cartTotalPrice',
      totalAmount: 'cartTotalAmount',
      cartLoading: 'cartLoading',
      cartLoadingFailed: 'cartLoadingFailed',
    }),
  },
};
</script>
