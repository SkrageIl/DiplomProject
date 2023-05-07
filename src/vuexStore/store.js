import { createStore } from 'vuex'
import axios from 'axios'
import moment from 'moment'

let store = createStore({
    state: {
        isModalLogin: false,
        isModalAddress: false,
        isLoading: false,
        drinks: [],
        foods: [],
        cart: [],
        status: '',
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || {},
        shops: [],
        order: {},
        userOrders: [],
        address: localStorage.getItem('address') || ''
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, user) {
            state.status = 'success'
            state.token = user.token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
            state.user = {}
        },
        ADD_ORDER_FOR_USER: (state, userOrders) => {
            state.userOrders = userOrders
        },
        SET_SHOPS_TO_STATE: (state, shops) => {
            state.shops = shops
        },
        SET_DRINKS_TO_STATE: (state, drinks) => {
            state.drinks = drinks;
        },
        SET_FOODS_TO_STATE: (state, foods) => {
            state.foods = foods;
        },
        SET_TO_CART: (state, product) => {
            let itemProduct = Object.assign({}, product.product_data)
            itemProduct.size = product.size
            itemProduct.quantity = 1
            if (state.cart.length) {
                let isProductExists = false
                state.cart.forEach(function(item) {
                    if (item.article === product.product_data.article && item.size === product.size) {
                        isProductExists = true;
                        item.quantity++
                    }
                })
                if (!isProductExists) {
                    state.cart.push(itemProduct)
                }
            } else {
                state.cart.push(itemProduct)
            }
        },
        REMOVE_FROM_CART: (state, product) => {
            state.cart.forEach(function(item) {
                if (state.cart.indexOf(item) == product.article && item.size == product.size) {
                    item.quantity = 0;
                }
            })
            state.cart.splice(product.article, 1)
        },
        ADD_QUANTITY_CART_ITEM: (state, product) => {
            state.cart.forEach(function(item) {
                if (item.article == product.article && item.size == product.size) {
                    console.log(item.article + " артикль слева айтем справа продукт " + product.article + "  s  " + item.size + "  " + product.size)
                    item.quantity++
                }
            })
        },
        SUBTRACT_QUANTITY_CART_ITEM: (state, product) => {
            state.cart.forEach(function(item) {
                if (item.article === product.article && item.size == product.size) {
                    item.quantity--
                        if (item.quantity < 1) {
                            state.cart.splice(state.cart.indexOf(item), 1)
                        }
                }
            })
        },
        SET_TIME_ORDER_TO_STATE(state, time) {
            state.order.time = time
        },
        SET_ORDER_TO_STATE(state, order) {
            state.order = order
        },
        SET_ADDRESS_TO_STATE(state, address) {
            state.address = address
        },
        CLEAR_CART(state) {
            state.cart = []
        },
        CLEAR_ORDER(state) {
            state.order = {}
        },
        OPEN_MODAL_LOGIN(state) {
            state.isModalLogin = true
        },
        CLOSE_MODAL_LOGIN(state) {
            state.isModalLogin = false
        },
        OPEN_MODAL_ADDRESS(state) {
            state.isModalAddress = true
        },
        CLOSE_MODAL_ADDRESS(state) {
            state.isModalAddress = false
        },
        OPEN_LOADING(state) {
            state.isLoading = true
        },
        CLOSE_LOADING(state) {
            state.isLoading = false
        },
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios('http://localhost:3000/users', {
                        method: 'GET'
                    })
                    .then((resp) => {
                        resp.data.find((item) => {
                            if (item.tel == user.tel && item.password == user.password) {
                                axios.defaults.headers.common['Authorization'] = item.token
                                localStorage.setItem('token', item.token)
                                localStorage.setItem('user', JSON.stringify(item));
                                commit('auth_success', item)
                                resolve(resp)
                            }
                        })
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios('http://localhost:3000/users', {
                        data: user,
                        method: 'POST'
                    })
                    .then((resp) => {
                        localStorage.setItem('token', user.token)
                        localStorage.setItem('user', JSON.stringify(user));
                        axios.defaults.headers.common['Authorization'] = user.token
                        commit('auth_success', user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                try {
                    commit('logout')
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    delete axios.defaults.headers.common['Authorization']
                    this.$router.push('/')
                    resolve()
                } catch (err) {
                    commit('auth_error', err)
                    localStorage.removeItem('token')
                    reject(err)
                }
            })
        },
        GET_USER_ORDERS_FROM_DB({ commit, getters }) {
            return axios('http://localhost:3000/orders', {
                    method: "GET"
                })
                .then((orders) => {
                    var userOrders = []
                    orders.data.forEach(function(item) {
                        if (item.client.tel == getters.USER.tel) {
                            userOrders.push(item)
                        }
                    })
                    commit('ADD_ORDER_FOR_USER', userOrders)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        GET_SHOPS_FROM_DB({ commit }) {
            return axios('http://localhost:3000/shops', {
                    method: "GET"
                })
                .then((shops) => {
                    commit('SET_SHOPS_TO_STATE', shops.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        GET_DRINKS_FROM_DB({ commit }) {
            return axios('http://localhost:3000/drinks', {
                    method: "GET"
                })
                .then((drinks) => {
                    commit('SET_DRINKS_TO_STATE', drinks.data);
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        GET_FOODS_FROM_DB({ commit }) {
            return axios('http://localhost:3000/foods', {
                    method: "GET"
                })
                .then((foods) => {
                    commit('SET_FOODS_TO_STATE', foods.data);
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        ADD_TO_CART({ commit }, product) {
            commit('SET_TO_CART', product);
        },
        DELETE_FROM_CART({ commit }, product) {
            commit('REMOVE_FROM_CART', product)
        },
        ADD_QUANTITY({ commit }, product) {
            commit('ADD_QUANTITY_CART_ITEM', product)
        },
        SUBTRACT_QUANTITY({ commit }, product) {
            commit('SUBTRACT_QUANTITY_CART_ITEM', product)
        },
        SET_ORDER({ commit, getters }, feature) {
            let order = {}

            let items = []
            let cartOrder = getters.CART
            cartOrder.forEach(function(item) {
                let orderItem = {}
                orderItem.name = item.name
                orderItem.price = item.price
                orderItem.quantity = item.quantity
                orderItem.size = item.size
                orderItem.img = item.image
                orderItem.type = item.type
                items.push(orderItem)
            })

            let client = {}
            client.name = getters.USER.name
            client.tel = getters.USER.tel

            order.total = getters.CART_TOTAL
            order.status = "Готовим"
            order.time = moment().format('DD-MM-YYYY') + " " + feature.time
            order.address = feature.address
            order.item = items
            order.client = client
            commit('SET_ORDER_TO_STATE', order)

            //НЕ РАБОТАЕТ выводит null
            // var userOrders = JSON.parse(localStorage.getItem('usersOrders') || '[]');
            // userOrders.push(order.item);
            // localStorage.setItem('userOrders', JSON.stringify(userOrders));

            commit('CLEAR_ORDER')
            commit('CLEAR_CART')

            return axios('http://localhost:3000/orders', {
                data: order,
                method: 'POST'
            }).catch((error) => {
                console.log(error)
            })
        },
        SET_ADDRESS({ commit }, address) {
            localStorage.setItem('address', address)
            commit('SET_ADDRESS_TO_STATE', address)
        },
        OPEN_MODAL_LOGIN({ commit }) {
            commit('OPEN_MODAL_LOGIN')
        },
        CLOSE_MODAL_LOGIN({ commit }) {
            commit('CLOSE_MODAL_LOGIN')
        },
        OPEN_MODAL_ADDRESS({ commit }) {
            commit('OPEN_MODAL_ADDRESS')
        },
        CLOSE_MODAL_ADDRESS({ commit }) {
            commit('CLOSE_MODAL_ADDRESS')
        },
        OPEN_LOADING({ commit }) {
            commit('OPEN_LOADING')
        },
        CLOSE_LOADING({ commit }) {
            commit('CLOSE_LOADING')
        }
    },
    getters: {
        ORDER(state) {
            return state.order
        },
        USER_ORDERS(state) {
            return state.userOrders
        },
        SHOPS(state) {
            return state.shops;
        },
        USER(state) {
            return state.user;
        },
        DRINKS(state) {
            return state.drinks;
        },
        FOODS(state) {
            return state.foods;
        },
        CART(state) {
            return state.cart;
        },
        ADDRESS(state) {
            return state.address
        },
        CART_TOTAL_QUANTITY(state) {
            let totalQuantity = 0;
            state.cart.forEach(function(item) {
                totalQuantity += item.quantity;
            });
            return totalQuantity;
        },
        CART_TOTAL(state) {
            let total = 0;
            state.cart.forEach(function(item) {
                total += item.price * item.quantity;
            });
            return total;
        },
        FIND_CART_ITEM_BY_ARTICLE: state => article => {
            return state.cart.find(item => item.article === article)
        },
        FIND_CART_ITEM_QUANTITY_BY_ARTICLE: state => product => {
            let quantity = 0;
            state.cart.forEach(function(item) {
                if (item.article === product.article && item.size == product.size) {
                    quantity = item.quantity
                }
            })
            return quantity;
        },
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        isModalLogin: state => state.isModalLogin,
        isModalAddress: state => state.isModalAddress
    }
})

export default store;