<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('BasicSettings.process_name')" prop="process_name" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.process_name" placeholder="请输入流程名称" clearable/>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.is_effective')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.is_effective" placeholder="请选择启用状态" style="width: 100%;">
              <el-option label="active" value="1"/>
              <el-option label="dead" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.type3')" prop="type" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.type" placeholder="请选择单据类型" filterable style="width: 100%;">
              <el-option v-for="(item, index) in categorys" :key="index" :value="item.id" :label="item.categoryName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.is_message')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.is_message" placeholder="请选择" style="width: 100%;">
              <el-option label="发送" value="1"/>
              <el-option label="不发送" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.effect_region')" prop="region" style="width: 40%;margin-top: 1%">
            <el-cascader
              :options="regions"
              :props="props"
              v-model="personalForm.region"
              :show-all-levels="false"
              placeholder="请选择区域"
              change-on-select
              filterable
              clearable
              style="width: 100%;"
              @change="handlechange4"
            />
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.effect_repository')" style="width: 40%;margin-top: 1%">
            <el-select v-model="personalForm.effect_repository" placeholder="请选择门店" style="width: 100%;">
              <el-option
                v-for="(item, index) in repositories"
                :key="index"
                :label="item.repositoryName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!--辅助信息-->
      <h2 ref="fuzhu" class="form-name">审批流程步骤</h2>
      <div class="buttons" style="margin-top: 50px">
        <el-button type="success" @click="insertEvent(-1)">添加</el-button>
        <el-button type="danger" @click="handleCommand()">删除</el-button>
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data="list2"
          :edit-config="{ showIcon: false, showStatus: false}"
          :edit-rules="validRules"
          class="click-table1"
          border
          size="medium"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-editable-column type="selection" align="center" width="55"/>
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="step" align="center" label="流程步骤" width="100px"/>
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="description" align="center" label="步骤描述" width="500px"/>
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="money" align="center" label="流转条件" width="200px"/>
          <el-editable-column :edit-render="{type: 'default'}" prop="handlerName" align="center" label="步骤处理人" min-width="100px">
            <template slot="edit" slot-scope="scope">
              <input v-model="handlerName" class="editable-custom_input" @focus="handlechoose">
              <my-emp :control.sync="empcontrol" @personName="personName"/>
            </template>
          </el-editable-column>
        </el-editable>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" @click="handlesave()">保存</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { regionlist, searchRepository } from '@/api/public'
import { createapproval, searchDetail, deleteDetail, searchcategory } from '@/api/BasicSettings'
import MyEmp from './components/MyEmp'
export default {
  name: 'NewApprovalProcess',
  components: { MyEmp },
  data() {
    return {
      // 步骤处理人
      handlerName: '',
      // 采购员弹窗控制
      empcontrol: false,
      // 单据类型数据
      categorys: [],
      // 审批流程列表规则
      validRules: {
        step: [
          { required: true, type: 'number', message: '请输入流程步骤', trigger: 'blur' }
        ],
        money: [
          { required: true, type: 'number', message: '请输入有效的数字', trigger: 'blur' }
        ],
        handlerName: [
          { required: true, message: '请选择步骤处理人', trigger: 'blur' }
        ]
      },
      // 多选控制
      moreaction: '',
      // 可编辑表格数据
      loading: false,
      list2: [],
      // 区域列表
      regions: [],
      // 门店列表
      repositories: [],
      // 区域列表字段更改
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 审批流程信息数据
      personalForm: {
        region: []
      },
      // 个人信息规则数据
      personalrules: {
        process_name: [
          { required: true, message: '请输入流程名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择单据类型', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getnationlist()
  },
  methods: {
    getnationlist() {
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 审批流程步骤数据
      searchDetail().then(res => {
        if (res.data.ret === 200) {
          this.list2 = res.data.data.detail
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 单据编号类型数据
      searchcategory().then(res => {
        if (res.data.ret === 200) {
          this.categorys = res.data.data.content
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 根据区域选择门店
    handlechange4(val) {
      const finalid = val[val.length - 1]
      this.personalForm.effect_region = finalid
      searchRepository(finalid).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {}
    },
    // 保存操作
    handlesave() {
      console.log(this.personalForm)
      console.log(this.manyinsert)
      const rest = JSON.stringify(this.$refs.editable.getRecords())
      console.log(rest)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate((valid) => {
            if (valid) {
              createapproval(this.personalForm, rest).then(res => {
                console.log(res)
                if (res.data.ret === 200) {
                  this.$notify({
                    title: '成功',
                    message: '保存成功',
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
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/BasicSettings/NewApprovalProcess', name: 'NewApprovalProcess', fullPath: '/BasicSettings/NewApprovalProcess', title: 'NewApprovalProcess' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 新增审批流程
    insertEvent(index) {
      if (!this.$refs.editable.checkValid().error) {
        const row = this.$refs.editable.insertAt(null, index)
        this.$nextTick(() => this.$refs.editable.setActiveCell(row, 'step'))
      }
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 批量删除
    handleCommand() {
      const ids = this.moreaction.map(item => item.id).join()
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDetail(ids).then(res => {
          if (res.data.ret === 200) {
            this.$notify({
              title: '删除成功',
              type: 'success',
              offset: 100
            })
            this.getnationlist()
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
    // 审核人选择
    // 员工输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 员工列表返回数据
    personName(val) {
      console.log(val)
      this.handlerName = val.personName
      this.personalForm.buyerId = val.id
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .ERP-container {
    margin: 0px 30px;
  }
    .form-name{
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 30px;
    }
    .container{
      margin-top: 2%;
      border: 1px solid #eceff6;
    }
  .tb-edit .el-input {
    display: none
  }
  .tb-edit .current-row .el-input {
    display: block
  }
  .tb-edit .current-row .el-input+span {
    display: none
  }
</style>
