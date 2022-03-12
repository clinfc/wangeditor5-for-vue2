import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/u-begin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'begin',
    component: HomeView,
  },
  {
    path: '/defaultcontent',
    name: 'defaultContent',
    component: () => import(/* webpackChunkName: "dcontent" */ '../views/u-default-content.vue'),
  },
  {
    path: '/defaulthtml',
    name: 'defaultHtml',
    component: () => import(/* webpackChunkName: "dhtml" */ '../views/u-default-html.vue'),
  },
  {
    path: '/async',
    name: 'UseWithAsync',
    component: () => import(/* webpackChunkName: "async" */ '../views/u-async.vue'),
  },
  {
    path: '/bindjson',
    name: 'v-bind:json.sync',
    component: () => import(/* webpackChunkName: "bjson" */ '../views/u-bind-json.vue'),
  },
  {
    path: '/bindhtml',
    name: 'v-bind:html.sync',
    component: () => import(/* webpackChunkName: "bhtml" */ '../views/u-bind-html.vue'),
  },
  {
    path: '/reloadbefore',
    name: 'reloadbefore',
    component: () => import(/* webpackChunkName: "reloadbefore" */ '../views/u-reloadbefore.vue'),
  },
  {
    path: '/dynamic-update',
    name: 'DynamicUpdate',
    component: () => import(/* webpackChunkName: "dynamic" */ '../views/u-dynamic-update.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export const menus = routes.map(({ path, name }) => ({ path, name }))

export default router
