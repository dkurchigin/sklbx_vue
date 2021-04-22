import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartLoading: false,
    cartLoadingFailed: false,
  },
  mutations: {
    updateCartProductAmount(state, { productId, amount }) {
      // eslint-disable-next-line no-shadow
      const item = state.cartProducts.find((item) => item.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(
        // eslint-disable-next-line arrow-body-style
        (item) => {
          return {
            productId: item.product.id,
            amount: item.quantity,
          };
        },
      );
    },
    cartLoadingChangeState(state, bool) {
      state.cartLoading = bool;
    },
    cartLoadingFailedChangeState(state, bool) {
      state.cartLoadingFailed = bool;
    },
  },
  getters: {
    cartLoading(state) {
      return state.cartLoading;
    },
    cartLoadingFailed(state) {
      return state.cartLoadingFailed;
    },
    cardDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);

        return {
          ...item,
          product: {
            ...product,
            img: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cardDetailProducts.reduce(
        (acc, item) => (item.product.price * item.amount) + acc, 0,
      );
    },
    cartTotalAmount(state, getters) {
      return getters.cardDetailProducts.reduce(
        (acc, item) => item.amount + acc, 0,
      );
    },
  },
  actions: {
    loadCart(context) {
      context.commit('cartLoadingChangeState', true);
      context.commit('cartLoadingFailedChangeState', false);

      return (new Promise((resolve) => setTimeout(resolve, 0)))
        // eslint-disable-next-line arrow-body-style
        .then(() => {
          return axios.get(`${API_BASE_URL}/api/baskets`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
            .then((response) => {
              if (!context.state.userAccessKey) {
                localStorage.setItem('userAccessKey', response.data.user.accessKey);
                context.commit('updateUserAccessKey', response.data.user.accessKey);
              }
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            })
            // eslint-disable-next-line no-return-assign
            .catch(() => context.commit('cartLoadingFailedChangeState', true))
            .then(() => { context.commit('cartLoadingChangeState', false); });
        });
    },
    addProductToCart(context, { productId, amount }) {
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        // eslint-disable-next-line arrow-body-style
        .then(() => {
          return axios.post(`${API_BASE_URL}/api/baskets/products`, {
            productId,
            quantity: amount,
          },
          { params: { userAccessKey: context.state.userAccessKey } })
            .then((response) => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            });
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      if (amount < 1) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      },
      { params: { userAccessKey: context.state.userAccessKey } })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteCartProduct(context, productId) {
      context.commit('deleteCartProduct', productId);

      // eslint-disable-next-line consistent-return
      return axios.delete(`${API_BASE_URL}/api/baskets/products?userAccessKey=${context.state.userAccessKey}`, {
        data: {
          productId,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        });
    },
  },
});
