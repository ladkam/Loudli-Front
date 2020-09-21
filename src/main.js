import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import underscore from 'vue-underscore';
Vue.use(underscore);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { SparklineComponent, SparklinePlugin } from '@syncfusion/ej2-vue-charts';
Vue.component(SparklinePlugin.name, SparklineComponent);
import {vueImgPreview} from 'vue-img-preview'
import VueJWT from 'vuejs-jwt'

import VueSvgGauge from 'vue-svg-gauge'
import {BulletChartPlugin} from '@syncfusion/ej2-vue-charts';
import VuePlotly from '@statnett/vue-plotly'
import VueHtml2pdf from 'vue-html2pdf'
Vue.use(VueHtml2pdf)


Vue.use(BulletChartPlugin)

Vue.use(VuePlotly)

Vue.use(VueSvgGauge)

import HistogramSlider from 'vue-histogram-slider';
import 'vue-histogram-slider/dist/histogram-slider.css';

Vue.component(HistogramSlider.name, HistogramSlider);


Vue.use(VueJWT)
Vue.component('vue-img-preview', vueImgPreview)
Vue.config.productionTip = false;
Vue.use(Vuelidate)
Vue.component('font-awesome-icon', FontAwesomeIcon) // Register component globally



new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  icons: {
    iconfont: 'fa',
},
}).$mount('#app')


