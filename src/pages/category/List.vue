<template>
  <div class="category">
    <h2 class="title">栏目管理</h2>
    <!-- 按钮 -->
    <div class="btns">
      <el-col :span="20">
        <el-form :inline="true">
          <el-form-item id="searchname">
            <el-input v-model="params.name" placeholder="请输入栏目名称" />
          </el-form-item>
          <el-form-item id="searchname">
            <el-button @click="findAllname">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="small" @click="toAddHandler">添加</el-button>
        <el-button type="danger" size="small" @click="batchDeleteHandler">批量删除</el-button>
      </el-col>
    </div>
    <!-- /按钮 -->
    <!-- 表格 -->
    <el-table :data="categories.list" size="small" @selection-change="idschangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="栏目名称" />
      <el-table-column prop="num" label="序号" />
      <el-table-column prop="icon" label="图标">
        <template v-slot:default="socord">
          <img :src="socord.row.icon" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="parentId" label="父栏目id" />
      <el-table-column label="操作">
        <template #default="record">
          <el-button type="primary" icon="el-icon-edit" circle @click.prevent="editHandler(record.row)" />
          <el-button type="danger" icon="el-icon-delete" circle @click.prevent="deleteHandler(record.row.id)" />
          <el-button type="success" icon="el-icon-document" circle @click="todetail(record.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
    <!-- 表单 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form ref="categoryForm" :model="form">
        <el-form-item label="栏目名称" label-width="80px" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="序号" label-width="80px" prop="num">
          <el-input v-model="form.num" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /表单 -->
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :currnet-page="categories.page+1"
      :page-size="categories.pageSize"
      :total="categories.total"
      @current-change="pageChangeHandler"
    />
    <!-- /分页 -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      ids: [],
      form: {},
      params: {
        page: 0,
        pageSize: 5,
        name: ''
      }
    }
  },
  created() {
    this.findAllCategories(this.params)
  },
  computed: {
    ...mapState('category', ['categories', 'visible', 'title'])
  },
  methods: {
    ...mapActions('category', ['findAllCategories', 'deleteCategories', 'saveCategories', 'batchdeleteCategories']),
    ...mapMutations('category', ['showModal', 'closeModal', 'seTtitle']),
    // id勾选
    idschangeHandler(val) {
      this.ids = val.map(item => item.id)
    },
    // 分页查询
    pageChangeHandler(page) {
      this.params.page = page - 1
      this.findAllCategories(this.params)
    },
    // 删除按钮
    deleteHandler(id) {
      this.deleteCategories(id)
        .then((response) => {
          this.$message({
            type: 'success',
            message: response.statusText
          })
          this.findAllCategories(this.params)
        })
    },
    // 添加按钮
    toAddHandler() {
      this.form = {}
      this.seTtitle('添加栏目信息')
      this.showModal()
    },
    // 提交按钮
    submitHandler() {
      this.saveCategories(this.form)
        .then((response) => {
          this.$message({
            type: 'success',
            message: response.statusText
          })
          this.findAllCategories(this.params)
        })
    },
    // 修改按钮
    editHandler(row) {
      this.showModal()
      this.seTtitle('修改栏目信息')
      this.form = row
    },
    // 监听模态框
    dialogCloseHandler() {
      this.$refs.categoryForm.clearValidate()
      this.closeModal()
    },
    // 搜索栏目名称按钮
    findAllname() {
      this.findAllCategories(this.params)
    },
    // 批量删除
    batchDeleteHandler() {
      this.batchdeleteCategories(this.ids)
        .then((response) => {
          this.$message({
            type: 'success',
            message: response.statusText
          })
          this.findAllCategories(this.params)
        })
    },
    todetail(category) {
      // 跳转到栏目详情页面
      this.$router.push({
        path: '/category/Details',
        query: { category }
      })
    }
  }
}
</script>
<style scoped>
.title{
  margin: 0px;
  padding: 20px;
  height: 80px;
  box-shadow:0px 0px 10px #ededed;
}
.btns{
  margin: 20px;
}
</style>
