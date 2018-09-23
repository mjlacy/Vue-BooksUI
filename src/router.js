import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/views/BookList.vue'
import AddBook from '@/views/AddBook.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/addSuccess',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/addBook',
      name: 'AddBook',
      component: AddBook
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/AddBook.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
