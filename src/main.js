import Vue from 'vue';
import router from '@/router';
import App from './App.vue';
import { firstMessage, secondMessage } from './data';
import alertFunction from './alerts';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

alertFunction(firstMessage);
alertFunction(secondMessage);
