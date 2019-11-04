<template>
  <div class="order">
    <h2>订单管理</h2>
    <el-tabs type="border-card">
      <el-tab-pane label="所有订单">
        <div id="one" class="table">
          <!-- 表格 -->
          <el-table :data="orders">
            <el-table-column label="订单编号" prop="id" />
            <el-table-column label="下单时间" prop="orderTime" />
            <el-table-column label="总价" prop="total" />
            <el-table-column label="状态" prop="status" />
            <el-table-column label="顾客id" prop="customerId" />
            <el-table-column label="操作">
              <template #default="record">
                <el-button type="success" icon="el-icon-document" circle @click="sytodetail(record.row)" />
              </template>
            </el-table-column>
          </el-table>
          <!-- /表格 -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="待支付">
        <div id="two" class="table">
          <!-- 表格 -->
          <el-table :data="ordersfilter('待支付')">
            <el-table-column label="订单编号" prop="id" />
            <el-table-column label="下单时间" prop="orderTime" />
            <el-table-column label="总价" prop="total" />
            <el-table-column label="状态" prop="status" />
            <el-table-column label="顾客id" prop="customerId" />
          </el-table>
          <!-- /表格 -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="待派单">
        <div id="three" class="table">
          <!-- 表格 -->
          <el-table :data="ordersfilter('待派单')">
            <el-table-column label="订单编号" prop="id" />
            <el-table-column label="下单时间" prop="orderTime" />
            <el-table-column label="总价" prop="total" />
            <el-table-column label="状态" prop="status" />
            <el-table-column label="顾客id" prop="customerId" />
            <el-table-column label="派单">
              <template #default="record">
                <el-button type="success" icon="el-icon-document" circle @click="pdedit(record.row)" />
              </template>
            </el-table-column>
          </el-table>
          <!-- /表格 -->
          <!-- 表单 -->
          <el-dialog title="派单" :visible.sync="pd_visible" @close="dialogCloseHandler">
            <el-form ref="pd_orderForm" :model="pd_params">
              <el-form-item label="员工id" label-width="100px" prop="waiterId">
                <el-radio v-for="c in waiters" v-model="pd_params.waiterId" :label="c.id" border>{{ c.realname }}</el-radio>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="pd_closeModal">取 消</el-button>
              <el-button type="primary" @click="pdsubmitHandler">确 定</el-button>
            </div>
          </el-dialog>
          <!-- /表单 -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="待接单">
        <div id="four" class="table">
          <!-- 表格 -->
          <el-table :data="ordersfilter('待接单')">
            <el-table-column label="订单编号" prop="id" />
            <el-table-column label="下单时间" prop="orderTime" />
            <el-table-column label="总价" prop="total" />
            <el-table-column label="状态" prop="status" />
            <el-table-column label="顾客id" prop="customerId" />
            <el-table-column label="取消">
              <template #default="record">
                <el-button type="success" icon="el-icon-document" circle @click="jdcancel(record.row)" />
              </template>
            </el-table-column>
          </el-table>
          <!-- /表格 -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="待服务">
        <div id="five" class="table">
          <!-- 表格 -->
          <el-table :data="ordersfilter('待服务')">
            <el-table-column label="订单编号" prop="id" />
            <el-table-column label="下单时间" prop="orderTime" />
            <el-table-column label="总价" prop="total" />
            <el-table-column label="状态" prop="status" />
            <el-table-column label="顾客id" prop="customerId" />
            <el-table-column label="员工id" prop="waiterId" />
          </el-table>
          <!-- /表格 -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="待确认">
        <div id="six" class="table">
          <!-- 表格 -->
          <el-table :data="ordersfilter('待确认')">
            <el-table-column label="订单编号" prop="id" />
            <el-table-column label="下单时间" prop="orderTime" />
            <el-table-column label="总价" prop="total" />
            <el-table-column label="状态" prop="status" />
            <el-table-column label="顾客id" prop="customerId" />
            <el-table-column label="员工id" prop="waiterId" />
          </el-table>
          <!-- /表格 -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="已完成">
        <div id="seven" class="table">
          <!-- 表格 -->
          <el-table :data="ordersfilter('已完成')">
            <el-table-column label="订单编号" prop="id" />
            <el-table-column label="下单时间" prop="orderTime" />
            <el-table-column label="总价" prop="total" />
            <el-table-column label="状态" prop="status" />
            <el-table-column label="顾客id" prop="customerId" />
            <el-table-column label="员工id" prop="waiterId" />
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
      pd_form: {},
      pd_params: {
        waiterId: '',
        orderId: ''
      },
      jd_params: {
        orderId: ''
      }
    }
  },
  created() {
    // 初始化数据
    this.findAllOrders()
    this.findAllWaiters()
  },
  computed: {
    ...mapState('order', ['orders', 'waiters', 'pd_visible']),
    ...mapGetters('order', ['ordersfilter'])
  },
  methods: {
    ...mapActions('order', ['findAllOrders', 'findAllWaiters', 'sendOrders', 'canselsendOrders']),
    ...mapMutations('order', ['pd_showModal', 'pd_closeModal']),

    // 跳转所有订单详情
    sytodetail(order) {
      this.$router.push({
        path: '/order/Details',
        query: { order }
      })
    },
    // 未派单中派单按钮
    pdedit(row) {
      this.pd_params.orderId = row.id
      this.pd_showModal()
    },
    // 未派单监听模态框
    dialogCloseHandler() {
      this.pd_closeModal()
      this.$refs.pd_orderForm.clearValidate()
    },
    // 未派单提交按钮
    pdsubmitHandler() {
      this.sendOrders(this.pd_params)
        .then((response) => {
          this.$message({
            type: 'success',
            message: response.statusText
          })
          this.findAllOrders()
        })
      this.pd_closeModal()
    },
    // 待接单中的取消按钮
    jdcancel(row) {
      this.jd_params.orderId = row.id
      this.canselsendOrders(this.jd_params)
        .then((response) => {
          this.$message({
            type: 'success',
            message: response.statusText
          })
          this.findAllOrders()
        })
    }
  }
}
</script>
<style scoped>

</style>
