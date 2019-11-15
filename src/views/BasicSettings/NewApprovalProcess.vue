<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <!--          <el-form-item :label="$t('LogisticsCar.drivers')" prop="drivers" style="width: 40%;margin-top:1%">-->
          <!--            <el-input v-model="drivers" placeholder="请输入驾驶员" @focus="handlechoose2"/>-->
          <!--          </el-form-item>-->
          <el-form-item :label="$t('BasicSettings.process_name')" prop="process_name" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.process_name" placeholder="请输入流程名称" clearable/>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.is_effective')" prop="is_effective" style="width: 40%;margin-top:1%">
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
            <el-select v-model="personalForm.is_message" :placeholder="$t('updates.qxz')" style="width: 100%;">
              <el-option label="发送" value="1"/>
              <el-option label="不发送" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.effect_region')" prop="region" style="width: 40%;margin-top: 1%">
            <el-cascader
              :options="regions"
              :props="props"
              v-model="personalForm.region"
              :placeholder="$t('Hmodule.xzqy')"
              change-on-select
              filterable
              clearable
              style="width: 100%;"
              @change="handlechange4"
            />
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.effect_repository')" style="width: 40%;margin-top: 1%">
            <el-select v-model="personalForm.effect_repository" :placeholder="$t('Hmodule.xzmd')" style="width: 100%;">
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
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data="list2"
          :edit-config="{ showIcon: false, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%"
          @select="selectEvent"
          @current-change="currentChangeEvent">
          <el-editable-column type="selection" width="55" align="center"/>
          <!--<el-editable-column label="流程步骤" prop="step" type="index" align="center" width="150px"/>-->
          <!--<template slot-scope="scope">-->
          <!--<span>{{ handleStep(scope.row, scope.$index) }}</span>-->
          <!--</template>-->
          <!--</el-editable-column>-->
          <el-editable-column label="流程步骤" type="index" align="center" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="description" align="center" label="步骤描述" width="500px"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="money" align="center" label="流转条件" width="400px"/>
          <!--<el-editable-column :edit-render="{name: 'ElInput'}" prop="handlerName" align="center" label="步骤处理人" width="200px"/>-->
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="handlerName" align="center" label="步骤处理人" min-width="500px">
            <template slot="edit" slot-scope="scope">
              <el-input v-model="scope.row.handlerName" clearable @focus="handlechoose(scope)" @input="$refs.editable.updateStatus(scope)" @change="$refs.editable.updateStatus(scope)"/>
              <my-emp2 :control.sync="empcontrol2" @personName="personName(scope, $event)" @personIds="personIds(scope, $event)"/>
            </template>
          </el-editable-column>
        </el-editable>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click v-permission="['1-39-46-1']" type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button v-permission="['1-39-46-1']" type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { getRegion, regionlist, searchRepository } from '@/api/public'
import { createapproval, searchcategory } from '@/api/BasicSettings'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEmp from './components/MyEmp'
import MyEmp2 from './components/MyEmp2'
var _that
export default {
  name: 'NewApprovalProcess',
  directives: { permission, permission2 },
  components: { MyEmp, MyEmp2 },
  data() {
    // const validatePass = (rule, value, callback) => {
    //   console.log(value)
    //   if (value === '') {
    //     callback(new Error('请选择审批人'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      // 控制scope
      kongscope: '',
      // 步骤
      step: 1,
      // 步骤处理人id
      stepHandler: '',
      // 步骤处理人
      handlerName: '',
      // 采购员弹窗控制
      empcontrol: false,
      empcontrol2: false,
      // 单据类型数据
      categorys: [],
      // 审批流程列表规则
      validRules: {
        handlerName: [
          { required: true, message: '请选择审批人', trigger: 'change' }
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
        is_effective: '1',
        is_message: '1',
        createPersonId: this.$store.getters.userId,
        region: []
      },
      // 个人信息规则数据
      personalrules: {
        is_effective: [
          { required: true, message: '请选择启用状态', trigger: 'change' }
        ],
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
    this.getRegion()
  },
  methods: {
    getRegion() {
      getRegion(this.$store.getters.regionId).then(res => {
        if (res.data.ret === 200) {
          if (res.data.data.content.zcc !== null && res.data.data.content.zcc !== '' && res.data.data.content.zcc !== undefined) {
            const zhuz = res.data.data.content.zcc.split(',')
            this.personalForm.region = zhuz.map(function(item) {
              return parseInt(item)
            })
            console.log('this.personalForm.region', this.personalForm.region)
          }
        }
      })
    },
    chuli(scope, val) {
      console.log(val)
      console.log(scope)
      this.kongscope.row.handlerName = val.personName
      this.kongscope.row.stepHandler = val.id
      // scope.row.handlerName = val.personName
      // scope.row.stepHandler = val.id
      console.log(scope.row.step)
      if (this.kongscope.row.step === null) {
        this.kongscope.row.step = scope.$index + 1
      }
      return
    },
    handlechoose2() {
      this.empcontrol2 = true
    },
    // 驾驶员列表返回数据
    personName(scope, val) {
      // this.drivers = val
      // this.personalForm.driverNames = val
      this.kongscope.row.handlerName = val
      this.kongscope.row.stepHandlerName = val
      console.log(' this.kongscope.row.handlerName', this.kongscope.row.handlerName)
    },
    personIds(scope, val) {
      // this.personalForm.drivers = val
      this.kongscope.row.stepHandler = ',' + val + ','
      console.log('this.kongscope.row.stepHandler', this.kongscope.row.stepHandler)
      // if (this.kongscope.row.step === null) {
      //   this.kongscope.row.step = scope.$index + 1
      // }
      return
    },
    checkPermission,
    getnationlist() {
      searchRepository(this.$store.getters.regionId).then(res => {
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
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        }
      })
      // // 审批流程步骤数据
      // searchDetail().then(res => {
      //   if (res.data.ret === 200) {
      //     this.list2 = res.data.data.detail
      //   } else {
      //     this.$notify.error({
      //       title: '错误',
      //       message: '出错了',
      //       offset: 100
      //     })
      //   }
      // })
      // 单据编号类型数据
      searchcategory().then(res => {
        if (res.data.ret === 200) {
          this.categorys = res.data.data.content
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
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        is_effective: '1',
        is_message: '1'
      }
      this.getRegion()
    },
    // 保存操作
    handlesave() {
      console.log(this.personalForm)
      const rest = JSON.stringify(this.$refs.editable.getRecords())
      if (this.$refs.editable.getRecords().length === 0) {
        this.$notify.error({
          title: '错误',
          message: '请填写细则',
          offset: 100
        })
        return false
      }
      console.log('rest', rest)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate((valid) => {
            if (valid) {
              const finalid = this.personalForm.region[this.personalForm.region.length - 1]
              this.personalForm.effect_region = finalid
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
                  this.$refs.editable.clear()
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: res.data.msg,
                    offset: 100
                  })
                  return false
                }
              })
            } else {
              this.$notify.error({
                title: '错误',
                message: '信息未填写完整',
                offset: 100
              })
              return false
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填写完整',
            offset: 100
          })
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
    // 审核人选择
    // 员工输入框focus事件触发
    handlechoose(scope) {
      this.empcontrol2 = true
      console.log(scope)
      this.kongscope = scope
      this.kongscope.row.step = scope.$index + 1
    },
    // 处理人change事件
    fuzhi(scope) {
      scope.row.handlerName = this.handlerName
    },
    handleStep(row) {
      console.log(row)
    },
    postJSON(data) {
      // 提交请求
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('保存成功')
        }, 300)
      })
    },
    // edit table 操作
    selectEvent(selection, row) {
      console.log(selection)
      console.log(row)
    },
    // 新增审批流程
    insertEvent(index) {
      this.$refs.editable.insertAt({ step: null }, index)
    },
    // 选择操作
    currentChangeEvent(currentRow, oldCurrentRow) {
      console.log(currentRow)
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
