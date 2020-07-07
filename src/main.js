import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { SparklineComponent, SparklinePlugin } from '@syncfusion/ej2-vue-charts';
Vue.component(SparklinePlugin.name, SparklineComponent);
import {vueImgPreview} from 'vue-img-preview'
import { ChartPlugin} from "@syncfusion/ej2-vue-charts";
import VuePlyr from 'vue-plyr'
import AsyncComputed from 'vue-async-computed'
import VueJWT from 'vuejs-jwt'

Vue.use(VueJWT)

var VueScrollTo = require('vue-scrollto');

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})


Vue.use(AsyncComputed);
Vue.use(VuePlyr)
Vue.use(ChartPlugin);
Vue.component('vue-img-preview', vueImgPreview)
Vue.config.productionTip = false;
Vue.use(Vuelidate)
Vue.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
Vue.component('')

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  icons: {
    iconfont: 'faSvg',
},
}).$mount('#app')
