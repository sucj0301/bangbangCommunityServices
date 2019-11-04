<template>
  <div class="customer">
    <h2>顾客管理</h2>
    <!-- 表格 -->
    <el-table :data="customers" size="small" @selection-change="idsChangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="顾客编号" />
      <el-table-column prop="realname" label="姓名" />
      <el-table-column prop="telephone" label="手机号" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" width="100px" align="center">
        <template #default="record">
          <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- / 表格 -->

  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
    }
  },
  created() {
    this.findAllCustomers()
  },
  computed: {
    ...mapState('customer', ['customers'])
    // 普通属性

  },
  methods: {
    ...mapMutations('customer', ['refreshCustomers']),
    ...mapActions('customer', ['findAllCustomers']),
    // 普通方法
    idsChangeHandler(val) {
      this.ids = val.map(item => item.id)
    },
    toDetailsHandler(customer) {
      // console.log(row)
      // 跳转到顾客详情页面
      // this.$router.push("/customerDetails")
      this.$router.push({
        path: '/customer/Details',
        query:{ customer }
        // query: { id:row.id }
        // query: { id }
      })
    }
  }
}
</script>
<style scoped>

</style>
