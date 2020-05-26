import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import Teacher from '@/components/Teacher'
import Course from '@/components/Course'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {path:'/teacher',name:'Teacher',component: Teacher},
        {path:'/course',name:'Course',component: Course}
      ]
    }
  ]
})
