import { createApp } from 'vue';
import VueHead from 'vue-head'

import App from './App.vue';
import './registerServiceWorker';
import store from './store';

require('@/assets/scss/style.scss');

createApp(App).use(store).mount('#app');
createApp(App).use(VueHead)
