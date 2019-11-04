import { get, post } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    waiters: [],
    orders: []
  },
  getters: {
    waiterfilter(state) {
      return function(id) {
        console.log('/////////////////', id)
        return this.orders.filter(item => item.waiterId === id)
      }
    }
  },
  mutations: {
    refreshWaiters(state, waiters) {
      state.waiters = waiters
    },
    refreshOrders(state, orders) {
      state.orders = orders
    }
  },
  actions: {
    // 查询
    async findAllWaiters(context) {
      const response = await get('/waiter/findAll')
      context.commit('refreshWaiters', response.data)
    },
    async findAllOreders(context, params) {
      const response = await get('/order/query', params)
      context.commit('refreshOrders', response.data)
    }
  }
}
