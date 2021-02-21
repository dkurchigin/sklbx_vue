import Vue from 'vue';
import App from './App.vue';
import {first_message, second_message} from './data';
import alert_function from './alerts';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

alert_function(first_message)
alert_function(second_message)
