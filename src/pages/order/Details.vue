<template>
  <div class="sy_order_details">
    <h2 class="title">员工详情</h2>
    <div class="btns">
      <el-row :gutter="20">
        <el-col :span="24" align="right"><el-button type="primary" size="small" @click="backHandler"><i class="el-icon-arrow-left" />返回</el-button></el-col>
      </el-row>
    </div>
    <div class="content">
      <el-row class="row">
        <el-col :span="12"><div class="grid-content bg-purple">订单id：{{ order.id }}</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">描述：{{ order.remark }}</div></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12"><div class="grid-content bg-purple">员工id：{{ order.waiterId }}</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">地址id：{{ order.addressId }}</div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {}
    }
  },
  created() {
    console.log('当前路由', this.$route)
    this.order = this.$route.query.order
  },
  methods: {
    backHandler() {
      // this.$router.push("/order")
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
