import CoffeeCart from '@/components/cart/CoffeeCart.vue'
import CoffeeCatalog from '@/components/catalog/CoffeeCatalog.vue'
import UserProfile from '@/components/UserProfile/UserProfile.vue'
import HistoryOrders from '@/components/UserProfile/HistoryOrders.vue'
import ShopsInfo from '@/components/UserProfile/ShopsInfo.vue'
import ProfileSettings from '@/components/UserProfile/ProfileSettings.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from '../vuexStore/store'

const router = createRouter({
    scrollBehavior: function(to) {
        if (to.hash) {
            return {
                el: to.hash,
                top: 115,
                behavior: 'smooth'
            }
        }
    },
    routes: [{
            path: '/',
            name: 'catalog',
            component: CoffeeCatalog,
            props: true
        },
        {
            path: '/cart',
            name: 'cart',
            component: CoffeeCart,
            props: true,
        },
        {
            path: '/profile',
            name: 'profile',
            component: UserProfile,
            props: true,
            meta: {
                requiresAuth: true
            },
            children: [{
                    path: 'settings',
                    name: 'settings',
                    component: ProfileSettings
                },
                {
                    path: 'shops',
                    name: 'shops',
                    component: ShopsInfo
                },
                {
                    path: 'orders',
                    name: 'orders',
                    component: HistoryOrders
                },
            ]
        }
    ],
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            if (to.name == 'profile') {
                next('/profile/orders')
                return
            }
            next()
            return
        } else {
            next('/')
            store.dispatch('OPEN_MODAL_LOGIN')
        }
    } else {
        next()
    }
})
router.afterEach(() => {
    setTimeout(() => store.dispatch('CLOSE_LOADING'), 2500)
})

export default router