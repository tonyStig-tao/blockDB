import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// eslint-disable-next-line import/extensions
import './plugins/element.js';
// eslint-disable-next-line import/order
import JsonViewer from 'vue-json-viewer';

Vue.config.productionTip = false;

Vue.use(JsonViewer);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
