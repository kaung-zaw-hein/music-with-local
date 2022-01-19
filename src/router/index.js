import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const Home = () => import('../views/Home.vue');
const About = () => import('../views/About.vue');
const Manage = () => import(/* webpackChunkName: "groupedChunk" */'../views/Manage.vue');
const Song = () => import(/* webpackChunkName: "groupedChunk" */'../views/Song.vue');
const Uploader = () => import('../views/Uploader.vue');
const Genre = () => import('../views/Genre.vue');

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
    path: '/song/:id',
    name: 'Song',
    component: Song,
    props:true,
  },
  {
    path: '/uploader/:pp',
    name: 'Uploader',
    component: Uploader,
    props:true,
  },
  {
    path: '/genres/:tags',
    name: 'Genre',
    component: Genre,
    props:true,
  },
  {
    path: '/:catchAll(.*)*',
    redirect: {name: 'Home'},
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass:"link-active"
});

router.beforeEach((to, from, next) => {
  if(!to.matched.some((record) => record.meta.requiresAuth)){
    next();
    return;
  }
  if(store.state.auth.userLoggedIn){
    next();
  }else{
    next({name : 'Home'});
  }


});

export default router;
