import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:"/Comment0",
    component: () => import("../views/first-page.vue"),
    children:[
      {
        path:"Comment0",
        name:"Restaurant5",
        component:()=>import("../views/text-page-5.vue")
      },
      {
        path:"Comment1",
        name:"Restaurant6",
        component:()=>import("../views/text-page-6.vue")
      },
      {
        path:"Comment2",
        name:"Restaurant8",
        component:()=>import("../views/text-page-8.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
