import { get, post, post_array, post_json } from '@/http/axios'
// import request from '@/utils/request'

export default {
  namespaced: true,
  state: {
    visible: false,
    title: '添加产品信息',
    products: [],
    categories: [],
    product: {} // 当前产品信息
  },
  mutations: { // 同步操作
    // 设置模态框头部信息
    setTitle(state, title) {
      state.title = title
    },
    // 显示模态框
    showModal(state) {
      state.visible = true
    },
    // 隐藏模态框
    closeModal(state) {
      state.visible = false
    },
    // 刷新产品信息
    refreshProducts(state, products) {
      state.products = products
    },
    // 刷新栏目信息
    refreshCategories(state, categories) {
      state.categories = categories
    },
    // 当前产品信息
    refreshProduct(state, product) {
      state.product = product
    }
  },
  actions: { // 可以写异步
    // 通过id查询产品信息
    async findProductById(context, id) {
      const response = await get('/product/findById', { id })
      context.commit('refreshProduct', response.data)
      console.log(response.data)
    },
    // 保存或更新
    async saveOrUpdateProducts({ dispatch, commit }, product) {
      const response = await post('/product/saveOrUpdate', product)
      commit('closeModal')
      dispatch('findAllProducts')
      return response
    },
    // 查询所有产品
    async findAllProducts(context, params) {
      const response = await post('/product/query', params)
      // console.log(response.data);
      context.commit('refreshProducts', response.data)
    },
    // 查询所有栏目
    async findAllCategories(context) {
      const response = await get('/category/findAll')
      context.commit('refreshCategories', response.data)
    },
    // 根据id删除产品信息
    async deleteByCategoryId({ dispatch }, id) {
      // 1.发送请求
      const response = await get('/product/deleteById', { id })
      // 2.刷新
      dispatch('findAllProducts')
      // 3.提示
      return response
    },
    // 批量删除产品信息
    async batchDeleteProducts({ dispatch }, ids) {
      const response = await post('/product/batchDelete?ids=' + ids)
      dispatch('findAllProducts')
      return response
    }
  }
}
