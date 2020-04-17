<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <!--          <el-form-item :label="$t('LogisticsCar.drivers')" prop="drivers" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
            <!--            <el-input v-model="drivers" placeholder="请输入驾驶员" @focus="handlechoose2"/>-->
            <!--          </el-form-item>-->
            <el-row>

              <el-col :span="6">
                <el-form-item :label="$t('BasicSettings.process_name')" prop="process_name" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.process_name" placeholder="请输入流程名称" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('BasicSettings.is_effective')" prop="is_effective" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.is_effective" placeholder="请选择启用状态" style="width: 200px">
                    <el-option label="on duty" value="1"/>
                    <el-option label="closed" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('BasicSettings.type3')" prop="type" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.type" placeholder="请选择单据类型" filterable style="width: 200px">
                    <el-option v-for="(item, index) in categorys" :key="index" :value="item.id" :label="item.categoryName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('BasicSettings.is_message')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.is_message" :placeholder="$t('updates.qxz')" style="width: 200px">
                    <el-option label="发送" value="1"/>
                    <el-option label="不发送" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('BasicSettings.effect_region')" prop="region" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-cascader
                    :options="regions"
                    :props="props"
                    v-model="personalForm.region"
                    :placeholder="$t('Hmodule.xzqy')"
                    change-on-select
                    filterable
                    clearable
                    style="width: 200px"
                    @change="handlechange4"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('BasicSettings.effect_repository')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.effect_repository" :placeholder="$t('Hmodule.xzmd')" style="width: 200px">
                    <el-option
                      v-for="(item, index) in repositories"
                      :key="index"
                      :label="item.repositoryName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px;">

        <!--辅助信息-->
        <div ref="fuzhu" class="form-name">{{ $t('updates.splcbz') }}</div>
        <div class="buttons" style="margin-top: 50px">
          <el-button type="success" @click="insertEvent(-1)">{{ $t('updates.tj') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <div class="container" style="margin-top: 25px">
          <el-editable
            ref="editable"
            :data="list2"
            :edit-config="{ showIcon: false, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%"
            @select="selectEvent"
            @current-change="currentChangeEvent">
            <el-editable-column type="selection" width="55" align="center"/>
            <!--<el-editable-column label="流程步骤" prop="step" type="index" align="center" width="150px"/>-->
            <!--<template slot-scope="scope">-->
            <!--<span>{{ handleStep(scope.row, scope.$index) }}</span>-->
            <!--</template>-->
            <!--</el-editable-column>-->
            <el-editable-column label="流程步骤" type="index" align="center" min-width="60px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="description" align="center" label="步骤描述" min-width="100px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="money" align="center" label="流转条件" min-width="100px"/>
            <!--<el-editable-column :edit-render="{name: 'ElInput'}" prop="handlerName" align="center" label="步骤处理人" width="200px"/>-->
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="handlerName" align="center" label="步骤处理人" min-width="300px">
              <template slot="edit" slot-scope="scope">
                <el-input v-model="scope.row.handlerName" @focus="handlechoose(scope)" @input="$refs.editable.updateStatus(scope)" @change="$refs.editable.updateStatus(scope)"/>
                <my-emp2 :control.sync="empcontrol2" :checklist.sync="checklist" @personName="personName(scope, $event)" @personIds="personIds(scope, $event)"/>
              </template>
            </el-editable-column>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">
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
    const validatePass4 = (rule, value, callback) => {
      const numvalue = Number(value)
      const num = Number.isFinite(numvalue)
      console.log('value1222222222222222', num)
      // if (this.personalForm.totalMoney === undefined || this.personalForm.totalMoney === null || this.personalForm.totalMoney === '') {
      //   callback(new Error('请输入基本信息'))
      // } else {
      //   callback()
      // }
      if (!num) {
        callback(new Error('请输入数字类型'))
      } else {
        callback()
      }
    }
    return {
      checklist: [],
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
        ],
        money: [
          { validator: validatePass4, trigger: 'blur' }
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
  beforeCreate() {
    _that = this
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
      this.checklist = this.$refs.editable.getRecords()
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
            title: 'wrong',
            message: 'wrong',
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
      //       title: 'wrong',
      //       message: 'wrong',
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
            title: 'wrong',
            message: 'wrong',
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
      const rest2 = this.$refs.editable.getRecords()
      if (this.$refs.editable.getRecords().length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '请填写细则',
          offset: 100
        })
        return false
      }
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate((valid) => {
            if (valid) {
              if (rest2.length === 1) {
                rest2[0].money = ''
              } else {
                rest2[rest2.length - 1].money = ''
              }
              console.log(rest2)
              const rest = JSON.stringify(rest2)
              const finalid = this.personalForm.region[this.personalForm.region.length - 1]
              this.personalForm.effect_region = finalid
              createapproval(this.personalForm, rest).then(res => {
                console.log(res)
                if (res.data.ret === 200) {
                  this.$notify({
                    title: 'successful',
                    message: 'save successful',
                    type: 'success',
                    offset: 100
                  })
                  this.restAllForm()
                  this.$refs.personalForm.clearValidate()
                  this.$refs.personalForm.resetFields()
                  this.$refs.editable.clear()
                } else {
                  this.$notify.error({
                    title: 'wrong',
                    message: res.data.msg,
                    offset: 100
                  })
                  return false
                }
              })
            } else {
              this.$notify.error({
                title: 'wrong',
                message: '信息未填写完整',
                offset: 100
              })
              return false
            }
          })
        } else {
          this.$notify.error({
            title: 'wrong',
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
      if (scope.row.stepHandler) {
        var a = scope.row.stepHandler
        a = a.replace(/,/g, ' ')
        var aa = a.split(' ')
        var bb = scope.row.stepHandlerName.split(',')
        for (let i = 0; i < aa.length; i++) {
          if (aa[i] === '') {
            aa.splice(i, 1)
            i--
          }
        }
        console.log('aaa', aa)
        const newarr = []
        for (let i = 0; i < aa.length; i++) {
          const name = {
            personName: bb[i],
            id: aa[i]
          }
          newarr.push(name)
        }
        this.checklist = newarr
        console.log(this.checklist)
      }
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
          resolve('save successful')
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

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin-right: 0;
    .form-name{
      font-weight: bold;
      font-size: 18px;
      color: #373e4f;
      padding: 5px;
      margin-bottom: -20px;
    }
    .container{
      margin-top: 5px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
