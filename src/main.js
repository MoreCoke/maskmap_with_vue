import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import './bus';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);


new Vue({
  render: h => h(App),
}).$mount('#app');
