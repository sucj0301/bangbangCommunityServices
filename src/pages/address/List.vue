<template>
  <div class="address">
    <h2>地址信息</h2>
    <!-- 表格 -->
    <el-table :data="address" size="small">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="customerId" label="顾客编号" />
      <el-table-column prop="id" label="地址编号" />
      <el-table-column prop="province" label="省份" />
      <el-table-column prop="city" label="城市" />
      <el-table-column prop="area" label="地区" />
      <el-table-column prop="address" label="详细地址" />
      <el-table-column prop="telephone" label="手机号" />
      <!-- <el-table-column label="操作" width="100px" align="center">
          <template #default="record">
            <a href="" ></a>
          </template>
        </el-table-column> -->
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
    this.findAllAddressWithCustomer()
  },
  computed: {
    ...mapState('address', ['address'])
  },
  methods: {
    ...mapMutations('address', ['refreshAddress']),
    ...mapActions('address', ['findAllAddressWithCustomer'])
  }
}
</script>
<style scoped>

</style>
