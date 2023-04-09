import CoffeeCart from '@/components/cart/CoffeeCart.vue'
import CoffeeCatalog from '@/components/catalog/CoffeeCatalog.vue'
import LoginForm from '@/components/loginModal/LoginForm.vue'
import RegisterForm from '@/components/loginModal/RegisterForm.vue'
import BaristaPage from '@/components/barista/CoffeeBaristaPage.vue'
import UserProfile from '@/components/UserProfile.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from '../vuexStore/store'

const router = createRouter({
    scrollBehavior: function(to) {
        if (to.hash) {
            return {
                el: to.hash,
                top: 100,
                behavior: 'smooth'
            }
        }
        // } else {
        //     return { x: 0, y: 0 }
        // }
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
            path: '/login',
            name: 'login',
            component: LoginForm
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterForm
        },
        {
            path: '/barista',
            name: 'barista',
            component: BaristaPage,
            props: true,
            meta: {
                requiresRole: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: UserProfile,
            props: true,
            meta: {
                requiresAuth: true
            }
        },
    ],
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresRole)) {
        if (store.getters.isBarista) {
            next()
            return
        }
        next('/')
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/')
        store.dispatch('OPEN_MODAL')
    } else {
        next()
    }
})

export default router