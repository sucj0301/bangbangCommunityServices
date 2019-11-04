<template>
  <div class="product_details">
    <h2>产品详情</h2>
    <el-button type="primary" size="small" plain @click="backHandler">返回</el-button>
    <p><strong>产品名称:</strong>{{ product.name }}</p>
    <p><strong>产品价格:</strong>{{ product.price }}</p>
    <p><strong>产品描述:</strong>{{ product.description }}</p>
    <p><strong>产品预览:</strong>
      <img :src="product.photo" alt="">
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  created() {
    const id = this.$route.query.id
    // 通过id查询商品的详细信息
    this.findProductById(id)
  },
  computed: {
    ...mapState('product', ['product'])
  },
  methods: {
    ...mapActions('product', ['findProductById']),

    // 返回
    backHandler() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
