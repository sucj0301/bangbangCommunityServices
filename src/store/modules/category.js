import { get, post, post_array } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    title: '添加栏目信息',
    visible: false,
    categories: []
  },
  getters: {

  },
  mutations: {
    seTtitle(state, title) {
      state.title = title
    },
    showModal(state) {
      state.visible = true
    },
    closeModal(state) {
      state.visible = false
    },
    // 栏目管理传categories数据
    refreshCategroies(state, categories) {
      state.categories = categories
    }
  },
  actions: {
    // 加载数据
    async findAllCategories(context, params) {
      const response = await post('/category/query', params)
      context.commit('refreshCategroies', response.data)
    },
    // 删除数据
    async deleteCategories(context, id) {
      const response = await get('/category/deleteById?id=' + id)
      return response
    },
    // 提交数据以及更新数据
    async saveCategories(context, form) {
      const response = await post('/category/saveOrUpdate', form)
      context.commit('closeModal')
      return response
    },
    // 批量删除数据
    async batchdeleteCategories(context, ids) {
      const response = await post_array('/category/batchDelete', { ids })
      return response
    }
  }
}
