<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" style="float: left;width: 30%; height: 800px">
        <el-input
          v-model="filterText"
          placeholder="输入关键字进行过滤"
          style="margin-bottom: 30px"
          clearable/>
        <el-scrollbar class="tree">
          <el-tree
            ref="tree2"
            :data="detalist"
            :props="detaillistProps"
            :filter-node-method="filterNode"
            class="filter-tree"
            @node-click="handleNodeClick">
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ node.label }}  ({{ data.id }})</span>
              <span v-if="data.parentId !== 0" style="margin-left: 50px">
                <i class="el-icon-edit" @click="edittree(data,node)"/>
                <i v-if="isshow(data)" class="el-icon-delete" @click="nodedelete(data,node)"/>
              </span>
            </span>
          </el-tree>
        </el-scrollbar>
        <el-dialog :visible.sync="editVisible" title="修改分类" class="normal" width="600px">
          <el-form :model="edittreeform" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
            <el-form-item :label="$t('Product.name')" label-width="120px">
              <el-input v-model="edittreeform.categoryName" placeholder="" autocomplete="off" style="width: 200px"/>
            </el-form-item>
            <el-form-item :label="$t('Product.code')" label-width="120px">
              <el-input v-model="edittreeform.code" placeholder="" autocomplete="off" style="width: 200px" disabled/>
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
                  <el-input v-model="personalForm.name" :disabled="nodata" placeholder="请输入分类名称" style="margin-left: 18px;width: 600px" clearable/>
                </el-form-item>
              </el-col>
              <el-col v-show="tishi === true" :span="24" style="margin-top: 20px">
                <span v-if="tishi === true" style="float: left;color: red;margin-top: -23px;margin-left: 223px;">请输入{{ weishu }}编码</span>
                <el-form-item :label="$t('Product.code2')" prop="code">
                  <el-input v-model="personalForm.code" :disabled="nodata" placeholder="编码" style="margin-left: 18px;width: 600px" clearable @blur="zhengze"/>
                </el-form-item>
              </el-col>
              <el-col :span="24" style="margin-top: 20px">
                <el-form-item :label="$t('Product.parentId')">
                  <el-input v-model="parentId" :disabled="true" placeholder="所属父级" style="margin-left: 18px;width: 600px" clearable @focus="handlechoose"/>
                </el-form-item>
              </el-col>
              <el-col :span="24" style="margin-top: 20px">
                <el-form-item :label="$t('Product.isActive')" prop="isActive">
                  <el-radio-group v-model="personalForm.isActive" :disabled="nodata" style="width: 600px">
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
          <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
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
      nodata: false,
      newnode: '',
      // 新增data
      newdata2: '',
      // 新增data
      newdata: '',
      // 判断位数
      Iscode: '',
      // 位数提示
      weishu: '',
      // 提示位数
      tishi: false,
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
        parentId: 0,
        isActive: 1
      },
      // 库存入库单规则数据
      personalrules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' }
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
    // 判断是否显示
    isshow(val) {
      if (val.productClassfyVos) {
        if (val.productClassfyVos.length > 0) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    zhengze(val) {
      if (this.Iscode === '01') {
        const reg = /^[A-Z0-9]{1}$/
        if (reg.test(this.personalForm.code) === false) {
          this.personalForm.code = ''
        }
      } else {
        const reg = /^[A-Z0-9]{2}$/
        if (reg.test(this.personalForm.code) === false) {
          this.personalForm.code = ''
        }
      }
    },
    // 删除操作
    nodedelete(data, node) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteeclassfy(data.id).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: '删除成功',
              type: 'success',
              offset: 100
            })
            // this.gettree()
            console.log('node', node)
            console.log('data', data)
            const parent = node.parent
            const children = parent.data.productClassfyVos
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)
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
      console.log('this.edittreeform', this.edittreeform)
      updateeclassfy(this.edittreeform).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            offset: 100
          })
          this.editVisible = false
          // this.gettree()
          console.log('this.newnode', this.newnode)
          const parent = this.newnode.parent
          const children = parent.data.productClassfyVos
          const index = children.findIndex(d => d.id === this.newdata2.id)
          const myob = children[index]
          myob.categoryName = this.edittreeform.categoryName
          myob.isActive = this.edittreeform.isActive
        }
      })
    },
    // 修改节点
    edittree(data, node) {
      console.log(data)
      this.editVisible = true
      this.newnode = node
      this.newdata2 = data
      this.edittreeform = Object.assign({}, data)
    },
    // 递归函数
    recursion(val) {
      if (val.level === 1) {
        return val.data
      } else {
        return this.recursion(val.parent)
      }
    },
    // 选择节点操作
    handleNodeClick(data, node) {
      console.log('data', data)
      this.nodata = false
      const ceshidigui = this.recursion(node)
      if (node.parent.data.code === '01' || (data.level === 4 && ceshidigui.code === '02') || (data.level === 3 && ceshidigui.code === '03')) {
        this.tishi = false
        this.nodata = true
        return false
      }
      this.newdata = data
      this.personalForm.parentId = data.id
      this.parentId = data.categoryName
      this.personalForm.levle = data.level + 1
      this.Iscode = ceshidigui.code
      console.log('ceshidigui', ceshidigui)
      console.log('data', data)
      console.log('node', node)
      if (ceshidigui.code === '01') {
        this.tishi = true
        this.weishu = '1位'
      } else {
        this.tishi = true
        this.weishu = '2位'
      }
      // this.gettree()
    },
    // 搜索树状图数据方法
    filterNode(value, data, node) {
      if (!value) return true
      // return data.categoryName.indexOf(value) !== -1
      const _array = []// 这里使用数组存储 只是为了存储值。
      this.getReturnNode(node, _array, value)
      let result = false
      _array.forEach((item) => {
        result = result || item
      })
      return result
    },
    getReturnNode(node, _array, value) {
      const isPass = node.data && node.data.categoryName && node.data.categoryName.toUpperCase().indexOf(value.toUpperCase()) !== -1
      isPass ? _array.push(isPass) : ''
      this.index++
      if (!isPass && node.level !== 1 && node.parent) {
        this.getReturnNode(node.parent, _array, value)
      }
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
      if (this.personalForm.parentId === 0 || this.personalForm.parentId === '0' || this.personalForm.parentId === null || this.personalForm.parentId === undefined) {
        this.$notify.error({
          title: '错误',
          message: '请选择父级',
          offset: 100
        })
        return false
      }
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
              console.log(res.data.data.content)
              const newChild = res.data.data.content
              if (!this.newdata.productClassfyVos) {
                this.$set(this.newdata, 'productClassfyVos', [])
              }
              this.newdata.productClassfyVos.push(newChild)
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
      this.personalForm = {
        createId: 1,
        levle: 1,
        parentId: 0
      }
      this.parentId = ''
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Product/detaillist', name: 'detaillist', fullPath: '/Product/detaillist', title: 'detaillist' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    handlechoose() {
      this.createcontrol = true
    }
  }
}
</script>

<style  rel="stylesheet/css" scoped>
  .normal >>> .el-dialog__header {
    padding: 20px 20px 10px;
    background: #fff;
    position: static;
    top: auto;
    z-index: auto;
    width: auto;
    border-bottom: none;
  }
  .normal >>> .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    height: auto;
  }
  .ERP-container {
    margin: 0px 20px;
    margin-right: 0;
  }
  .ERP-container >>> .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .ERP-container >>> .el-scrollbar__view {
    white-space: nowrap;
    width: 100%;
  }

  .tree{
    height: 600px;
  }
  .tree >>> .el-tree {
    min-width: 100%;
  }

  .tree >>> .el-tree-node>.el-tree-node__children {
    overflow: unset!important;
  }

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
</style>
