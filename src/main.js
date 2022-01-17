import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './includes/validation';
import {auth} from  './includes/firebase';
import Icon from './directives/icon';
import './assets/tailwind.css';
import './assets/main.css';
import i18n from './includes/i18n'

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(i18n).use(router).use(store).use(VeeValidatePlugin).directive('icon',Icon).mount('#app')

    // app.use(store);
    // app.use(router);
    // app.use(VeeValidatePlugin);

    // app.mount('#app');
  }
});



