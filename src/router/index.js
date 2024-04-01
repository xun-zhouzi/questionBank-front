import { createRouter, createWebHistory } from 'vue-router'  

const routes = [  
    {  
      path: '/index',  
      name: 'index',  
      component: () => import("../view/index.vue"),
  },
  {  
    path: '/login',  
    name: 'login',  
    component: () => import("../view/login.vue"),
},

  ]  

const router = createRouter({  
  history: createWebHistory(),  
  routes,  
})
export default router