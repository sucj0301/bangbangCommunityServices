import { get, post } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    pd_visible: false,
    orders: [],
    waiters: []
  },
  getters: {
    // 未派单过滤器
    ordersfilter(state) {
      return function(status) {
        return state.orders.filter((response) => {
          return response.status === status
        })
      }
    }
  },
  mutations: {
    // 待派单模态框
    pd_showModal(state) {
      state.pd_visible = true
    },
    pd_closeModal(state) {
      state.pd_visible = false
    },
    // 传订单数据
    refreshOrders(state, orders) {
      state.orders = orders
    },
    // 传员工数据
    refreshWaiters(state, waiters) {
      state.waiters = waiters
    }

  },
  actions: {
    // 订单加载数据
    async findAllOrders(context) {
      const response = await get('/order/findAll')
      context.commit('refreshOrders', response.data)
    },
    // 员工加载数据
    async findAllWaiters(context) {
      const response = await get('/waiter/findAll')
      context.commit('refreshWaiters', response.data)
    },
    // 派单数据
    async sendOrders(context, pd_params) {
      const response = await get('/order/sendOrder', pd_params)
      return response
    },
    // 取消订单
    async canselsendOrders(context, jd_params) {
      const response = await get('/order/cancelSendOrder', jd_params)
      return response
    }
  }
}
