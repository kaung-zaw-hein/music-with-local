import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Manage from '../views/Manage.vue';
import store from '@/store';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/manage-music',
    name: 'Manage',
    alias: "/manage-brnyr",
    meta:{
      requiresAuth: true,
    },
    component: Manage,
  },
  {
    path: '/manage',
    redirect: {name: 'Manage'},
  },
  {
    path: '/:catchAll(.*)*',
    redirect: {name: 'Home'},
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass:"text-yellow-500"
});

router.beforeEach((to, from, next) => {
  if(!to.matched.some((record) => record.meta.requiresAuth)){
    next();
    return;
  }
  if(store.state.userLoggedIn){
    next();
  }else{
    next({name : 'Home'});
  }


});

export default router;
