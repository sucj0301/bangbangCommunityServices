import { get } from '@/http/axios'
// import request from '@/utils/request'
export default {
  namespaced: true,
  state: {
    address: []
  },
  mutations: {
    refreshAddress(state, address) {
      state.address = address
    }
  },
  actions: {
    async findAllAddressWithCustomer(context) {
      const response = await get('/address/findAllAddressWithCustomer')
      context.commit('refreshAddress', response.data)
    },
    async findAddressByCustomerId(context, id) {
      const response = await get('/address/findByCustomerId', { id })
      //   const response = await request.get('http://39.96.21.48:6677/customer/address/findByCustomerId?id='+id)
      context.commit('refreshAddress', response.data)
    }
  }
}
