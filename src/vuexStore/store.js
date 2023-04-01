import { createStore } from 'vuex'
import axios from 'axios'

let store = createStore({
    state: {
        isModal: false,
        drinks: [],
        foods: [],
        cart: [],
        status: '',
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || {},
        shops: [],
        order: {},
        baristaOrders: [],
        userOrders: [],
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
        ADD_ORDER_FOR_BARISTA: (state, baristaOrders) => {
            state.baristaOrders = baristaOrders
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
            product.quantity++;
            if (state.cart.length) {
                let isProductExists = false;
                state.cart.forEach(function(item) {
                    if (item.article === product.article) {
                        isProductExists = true;
                        item.quantity++
                    }
                })
                if (!isProductExists) {
                    state.cart.push(product);
                }
            } else {
                state.cart.push(product);
            }
        },
        REMOVE_FROM_CART: (state, index) => {
            state.cart.forEach(function(item) {
                if (state.cart.indexOf(item) === index) {
                    item.quantity = 0;
                }
            })
            state.cart.splice(index, 1)
        },
        ADD_QUANTITY_CART_ITEM: (state, article) => {
            state.cart.forEach(function(item) {
                if (item.article === article) {
                    item.quantity++
                }
            })
        },
        SUBTRACT_QUANTITY_CART_ITEM: (state, article) => {
            state.cart.forEach(function(item) {
                if (item.article === article) {
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
        SET_ADDRESS_ORDER_TO_STATE(state, address) {
            state.order.address = address
        },
        SET_ORDER_TO_STATE(state, order) {
            state.order = order
            console.log(order)
            console.log(state.order)
        },
        CLEAR_CART(state) {
            state.cart = []
        },
        CLEAR_ORDER(state) {
            state.order = {}
        },
        COMPLETE_ORDER(state, order) {
            state.baristaOrders.forEach(function(item) {
                if (item.id === order.id) {
                    item.status = order.status
                }
            })
        },
        OPEN_MODAL(state) {
            state.isModal = true
        },
        CLOSE_MODAL(state) {
            state.isModal = false
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
                    resolve()
                } catch (err) {
                    commit('auth_error', err)
                    localStorage.removeItem('token')
                    reject(err)
                }
            })
        },
        GET_BARISTA_ORDERS_FROM_DB({ commit, getters }) {
            return axios('http://localhost:3000/orders', {
                    method: "GET"
                })
                .then((orders) => {
                    var baristaOrders = []
                    orders.data.forEach(function(item) {
                        if (item.address == getters.USER.depart) {
                            baristaOrders.push(item)
                        }
                    })
                    commit('ADD_ORDER_FOR_BARISTA', baristaOrders)
                })
                .catch((error) => {
                    console.log(error)
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
        ADD_QUANTITY({ commit }, article) {
            commit('ADD_QUANTITY_CART_ITEM', article)
        },
        SUBTRACT_QUANTITY({ commit }, article) {
            commit('SUBTRACT_QUANTITY_CART_ITEM', article)
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
                items.push(orderItem)
            })

            let client = {}
            client.name = getters.USER.name
            client.tel = getters.USER.tel

            order.total = getters.CART_TOTAL
            order.status = "prepare"
            order.time = feature.time
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
        CHANGE_BARISTA_ORDER_STATUS({ commit }, order) {
            console.log(order.status)
            console.log(order.id)
            return new Promise((resolve, reject) => {
                axios('http://localhost:3000/orders/' + order.id, {
                        data: {
                            "status": order.status
                        },
                        method: 'PATCH'
                    })
                    .then(() => {
                        commit('COMPLETE_ORDER', order)
                        resolve()
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        OPEN_MODAL({ commit }) {
            commit('OPEN_MODAL')
        },
        CLOSE_MODAL({ commit }) {
            commit('CLOSE_MODAL')
        }
    },
    getters: {
        ORDER(state) {
            return state.order
        },
        BARISTA_ORDERS(state) {
            return state.baristaOrders
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
        FIND_CART_ITEM_QUANTITY_BY_ARTICLE: state => article => {
            let quantity = 0;
            state.cart.forEach(function(item) {
                if (item.article === article) {
                    quantity = item.quantity
                }
            })
            return quantity;
        },
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        isBarista: state => {
            if (state.user.role == "barista") {
                return true
            }
        },
        //isModal: state => state.isModal
    },
})

export default store;