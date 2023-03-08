import { createRouter, createWebHistory } from "vue-router"
import OrdersView from "../views/OrdersView.vue"
import OrderAdd from "../views/OrderAdd.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: OrdersView
    },
    {
      path: "/add",
      name: "add",
      component: OrderAdd
    }
  ]
})

export default router
