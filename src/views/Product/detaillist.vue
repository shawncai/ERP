<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" style="float: left;width: 30%; height: 800px">
        <el-input
          v-model="filterText"
          placeholder="输入关键字进行过滤"
          style="margin-bottom: 30px"/>
        <el-tree
          ref="tree2"
          :data="detalist"
          :props="detaillistProps"
          :filter-node-method="filterNode"
          class="filter-tree"
          default-expand-all
          @node-click="handleNodeClick">
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span style="margin-left: 50px">
              <i class="el-icon-edit" @click="edittree(data)"/>
              <i class="el-icon-delete" @click="nodedelete(data)"/>
            </span>
          </span>
        </el-tree>
        <el-dialog :visible.sync="editVisible" title="新建部门" width="500px">
          <el-form :model="edittreeform" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
            <el-form-item :label="$t('Product.name')" label-width="120px">
              <el-input v-model="edittreeform.categoryName" placeholder="请输入部门编号" autocomplete="off" style="width: 200px"/>
            </el-form-item>
            <el-form-item :label="$t('Product.isActive')" label-width="120px">
              <el-radio-group v-model="edittreeform.isActive" style="width:300px">
                <el-radio :label="1" style="margin-left: 25px">启用</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleOk">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
      <el-card class="box-card" style="float: left;width: 65%; height: 800px;margin-left: 15px">
        <div class="container">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" label-position="right" status-icon class="demo-ruleForm" label-width="200px" style="margin-left: 30px;width: 100%">
            <el-row>
              <el-col :span="24" style="margin-top: 20px">
                <el-form-item :label="$t('Product.name')" prop="name">
                  <el-input v-model="personalForm.name" placeholder="请输入分类名称" style="margin-left: 18px;width: 600px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="24" style="margin-top: 20px">
                <el-form-item :label="$t('Product.parentId')">
                  <el-input v-model="parentId" placeholder="所属父级" style="margin-left: 18px;width: 600px" clearable @focus="handlechoose"/>
                </el-form-item>
              </el-col>
              <el-col :span="24" style="margin-top: 20px">
                <el-form-item :label="$t('Product.isActive')" prop="isActive">
                  <el-radio-group v-model="personalForm.isActive" style="width: 600px">
                    <el-radio :label="1" style="width: 400px;margin-left: 25px">启用</el-radio>
                    <el-radio :label="2">禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="buttons" style="margin-top: 20px;text-align: center">
          <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">新增</el-button>
          <el-button type="danger" @click="handlecancel()">取消</el-button>
        </div>
      </el-card>
      <!--操作-->
    </div>
  </div>
</template>

<script>
import { createclassfy, detaillist, updateeclassfy, deleteeclassfy } from '@/api/Product'
export default {
  name: 'AddInitialenter',
  data() {
    return {
      // 修改数据
      edittreeform: {},
      // 修改控制器
      editVisible: false,
      // 树状图搜索数据
      filterText: '',
      // 树状图数据
      detalist: [],
      // 树状图props
      detaillistProps: {
        children: 'productClassfyVos',
        label: 'categoryName'
      },
      // 父级回显
      parentId: '',
      // 库存入库单信息数据
      personalForm: {
        createId: 1,
        levle: 1,
        parentId: 0
      },
      // 库存入库单规则数据
      personalrules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        isActive: [
          { required: true, message: '请选择应用状态', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.gettree()
  },
  methods: {
    // 删除操作
    nodedelete(data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteeclassfy(data.id).then(res => {
          if (res.data.ret === 200) {
            this.$notify({
              title: '删除成功',
              type: 'success',
              offset: 100
            })
            this.gettree()
          } else {
            this.$notify.error({
              title: '错误',
              message: '出错了',
              offset: 100
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 确认修改
    handleOk() {
      console.log(this.edittreeform)
      updateeclassfy(this.edittreeform).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            offset: 100
          })
          this.editVisible = false
          this.gettree()
        }
      })
    },
    // 修改节点
    edittree(data) {
      console.log(data)
      this.editVisible = true
      this.edittreeform = Object.assign({}, data)
    },
    // 选择节点操作
    handleNodeClick(data) {
      console.log(data)
      this.personalForm.parentId = data.id
      this.parentId = data.categoryName
      this.personalForm.levle = data.level + 1
      this.gettree()
    },
    // 搜索树状图数据方法
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 树状图数据
    gettree() {
      detaillist().then(res => {
        if (res.data.ret === 200) {
          this.detalist = res.data.data.content
        }
      })
    },
    // 保存操作
    handlesave() {
      console.log(this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          createclassfy(this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '新建成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
            offset: 100
          })
          return false
        }
      })
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {}
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Product/detaillist', name: 'detaillist', fullPath: '/Product/detaillist', title: 'detaillist' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 入库人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 员工列表返回经办人数据
    createname(val) {
      console.log(val)
      this.enterPersonId = val.personName
      this.personalForm.enterPersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.enterRepositoryId = val.repositoryName
      this.personalForm.enterRepositoryId = val.id
    },
    // 入库单事件
    // 新增入库单明细
    handleAddProduct() {
      this.control = true
    },
    Productdetail(val) {
      console.log(val)
      this.list2 = val
    },
    // 入库金额计算
    getSize(quan, pric) {
      return quan * pric
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin:0px 20px;
    margin-right: 0;
    .form-name{
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 20px;
    }
    .container{
      margin-top: 40px;
    }
    .el-button+.el-button{
      width: 98px;
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
</style>
