<template>
  <div class="waiter_details">
    <h2 class="title">员工详情</h2>
    <div class="btns">
      <el-row :gutter="20">
        <el-col :span="24" align="right"><el-button type="primary" size="small" @click="backHandler"><i class="el-icon-arrow-left" />返回</el-button></el-col>
      </el-row>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <div class="content">
          <el-row class="row">
            <el-col :span="12"><div class="grid-content bg-purple">员工名字：{{ waiter.realname }}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">员工id：{{ waiter.id }}</div></el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="12"><div class="grid-content bg-purple">电话号：{{ waiter.telephone }}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">密码：{{ waiter.password }}</div></el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="12"><div class="grid-content bg-purple">注册时间：{{ waiter.registerTime }}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">照片：{{ waiter.photo }}</div></el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="12"><div class="grid-content bg-purple">评分：{{ waiter.score }}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">订货量：{{ waiter.orderQuantity }}</div></el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="12"><div class="grid-content bg-purple">身份证照片正片：{{ waiter.orderQuantity }}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">身份证照片底片：{{ waiter.orderQuantity }}</div></el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="12"><div class="grid-content bg-purple">身份证：{{ waiter.idCard }}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">银行卡：{{ waiter.bankCard }}</div></el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="12"><div class="grid-content bg-purple">银行卡照片：{{ waiter.bankCard }}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">地址id：{{ waiter.addressId }}</div></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="订单信息">
        <div class="content">
          <!-- 表格 -->
          <el-table :data="waiterfilter(waiter.id)" class="table">
            <el-table-column label="订单id" prop="id" />
            <el-table-column label="下单时间" prop="orderTime" />
            <el-table-column label="总价" prop="total" />
            <el-table-column label="订单状态" prop="status" />
            <el-table-column label="顾客id" prop="customerId" />
            <el-table-column label="员工id" prop="waiterId" />
            <el-table-column label="地址id" prop="addressId" />
            <el-table-column label="顾客地址" align="center">
              <el-table-column label="省份" prop="address.province" />
              <el-table-column label="市" prop="address.city" />
              <el-table-column label="所在区域" prop="address.area" />
              <el-table-column label="具体位置" prop="address.address" />
            </el-table-column>
            <el-table-column label="订货量" prop="orderLines" />
          </el-table>
          <!-- /表格 -->
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      waiter: {},
      params: {
        customerId: '',
        waiterId: ''
      }
    }
  },
  created() {
    console.log('当前路由', this.$route)
    this.waiter = this.$route.query.waiter
    this.findAllWaiters()
    this.findAllOreders(this.params)
  },
  computed: {
    ...mapState('waiter', ['waiters', 'orders']),
    ...mapGetters('waiter', ['waiterfilter'])
  },
  methods: {
    ...mapActions('waiter', ['findAllWaiters', 'findAllOreders']),
    backHandler() {
      // this.$router.push("/waiter")
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.title{
  margin: 0;
  padding: 20px;
  height: 80px;
  box-shadow:0px 0px 10px #ededed;
}
.btns{
  margin: 20px;
}
/* .content{
  margin: 0 20px;
} */
.content > .row{
  margin: 30px;
}
</style>
