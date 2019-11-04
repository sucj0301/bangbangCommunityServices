<template>
  <div class="product">
    <h2>产品管理</h2>
    <!-- 按钮组 -->
    <div class="btns">
      <el-button type="primary" size="small" plain @click="addProductHandler">添加</el-button>
      <el-button type="danger" size="small" plain @click="batchDeleteHandler">批量删除</el-button>
    </div>
    <!-- / 按钮组 -->
    <!-- 表单 -->
    <el-dialog :title="title" :visible.sync="visible" :before-close="msgBoxCloseHandler" @close="clearValidateHandler">
      <el-form ref="productForm" :model="product" :rules="rules">
        <el-form-item label="产品名称" label-width="100px" prop="name">
          <el-input v-model="product.name" autocomplete="off" />
          <!-- autocomplete是input自带的原生属性,自动补全功能,on为开启,off为关闭 -->
        </el-form-item>
        <el-form-item label="产品价格" label-width="100px" prop="price">
          <el-input v-model="product.price" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所属分类" label-width="100px" prop="categoryId">
          <el-select v-model="product.categoryId" placeholder="请选择所属分类">
            <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品描述" label-width="100px" prop="description">
          <el-input v-model="product.description" type="textarea" autocomplete="off" />
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="产品预览" label-width="100px">
          <el-upload
            class="upload-demo"
            action="http://134.175.154.93:6677/file/upload"
            :file-list="fileList"
            :on-success="uploadSuccessHandler"
            :limit="1"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <!-- / 上传图片 -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModal">取消</el-button>
        <el-button type="primary" size="small" @click="submitHandler">保存</el-button>
      </div>
    </el-dialog>
    <!-- / 表单 -->
    <!-- 表格 -->
    <el-table :data="products.list" size="small" @selection-change="idsChangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="产品编号" />
      <el-table-column prop="categoryId" label="所属分类" />
      <el-table-column prop="name" label="产品名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="price" label="价格" />
      <el-table-column label="操作" width="200px" align="center">
        <template #default="record">
          <a href="" class="el-icon-delete" @click.prevent="deleteHandler(record.row.id)" />&nbsp;
          <a href="" class="el-icon-edit-outline" @click.prevent="editHandler(record.row)" />&nbsp;
          <a href="" @click.prevent="toDetailsHandler(record.row.id)">详情</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- / 表格 -->
    <!-- 分页 -->
    <!-- page-size表示每页显示条目个数 -->
    <el-pagination
      layout="prev,pager,next"
      :current-page="products.page+1"
      :page-size="products.pageSize"
      :total="products.total"
      @current-change="pageChangeHandler"
    />
    <!-- / 分页 -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      ids: [],
      fileList: [],
      product: {},
      params: {
        page: 0,
        pageSize: 5 // 每页的数据条数
      },
      rules: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }, // 'blur'是鼠标失去焦点的时候会触发验证
          { min: 2, max: 6, message: '长度在 2 到 6 个字符' }
        ],
        price: [
          { required: true, message: '请输入产品价格', trigger: 'blur' }
          //  { type: 'number', message: '价格必须为数字'}  //行不通！！
        ],
        categoryId: [
          { required: true, message: '请选择所属分类', trigger: 'change' } // 'change'是表单的值改变的时候会触发验证
        ],
        description: [
          { required: true, message: '请添加产品描述', trigger: 'blur' },
          { min: 2, message: '请输入至少2个字' }
        ]
      }
    }
  },
  created() {
    this.findAllProducts(this.params)
    this.findAllCategories()
  },
  computed: {
    ...mapState('product', ['products', 'categories', 'visible', 'title', 'refreshProduct'])
  },
  methods: {
    ...mapActions('product', ['findAllProducts', 'deleteByCategoryId', 'findAllCategories', 'saveOrUpdateProducts', 'batchDeleteProducts']),
    ...mapMutations('product', ['showModal', 'closeModal', 'setTitle']),

    // 普通方法
    // 多选。拿ids
    idsChangeHandler(val) {
      this.ids = val.map(item => item.id)
      // console.log(this.ids);
    },
    // 批量删除
    batchDeleteHandler() {
      this.$confirm('确认删除吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.batchDeleteProducts(this.ids)
          .then((response) => {
            this.$message({ type: 'success', message: response.statusText })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 页数改变时
    pageChangeHandler(page) {
      this.params.page = page - 1
      this.findAllProducts(this.params)
    },
    // 上传成功
    uploadSuccessHandler(response) {
      // console.log(response);
      // 获取返回值中的id，然后将id设置到表单中product
      if (response.status === 200) {
        const id = response.data.id
        const photo = 'http://134.175.154.93:8888/group1/' + id
        this.product.photo = photo
        // 克隆，双向数据渲染（可无）
        this.product = Object.assign({}, this.product)
      } else {
        this.$message.error('上传异常！')
      }
    },
    // 清空表单验证
    clearValidateHandler() {
      this.$refs.productForm.clearValidate()
    },
    // 通过点击 X 关闭模态框
    msgBoxCloseHandler(done) {
      this.$confirm('确认关闭吗？')
        .then(_ => {
          this.closeModal()
          this.product = {}
        })
        .catch(_ => {})
    },
    // 添加产品信息
    addProductHandler() {
      // 1.清空表单
      this.product = {}
      // 2.修改提示信息
      this.setTitle('添加产品信息')
      // 3.显示模态框
      this.showModal()
    },
    // 根据id删除
    deleteHandler(id) {
      this.$confirm('确认删除吗', '提示', {
        type: 'warning'
      }).then(() => {
        console.log(id)
        this.deleteByCategoryId(id)
          .then((response) => {
            this.$message({ type: 'success', message: response.statusText })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改产品信息
    editHandler(row) {
      // 将当前行信息绑定到product
      this.product = row
      this.fileList.push({ name: 'old', url: row.photo })
      this.setTitle('修改产品信息')
      this.showModal()
    },
    // 提交表单
    submitHandler() {
      // console.log(this.product);
      this.$refs.productForm.validate((valid) => {
        if (valid) {
          this.saveOrUpdateProducts(this.product)
            .then((response) => {
              this.$message({ type: 'success', message: response.statusText })
            })
        } else {
          return false
        }
      })
    },
    // 跳转到详情页
    toDetailsHandler(id) {
      this.$router.push({
        path: '/product/Details',
        query: { id }
      })
    }
  }
}
</script>
<style scoped>

</style>
