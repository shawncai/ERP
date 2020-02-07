<template>
  <el-dialog :visible.sync="editVisible" :control="control" :editdata="editdata" :close-on-press-escape="false" :title="$t('updates.xgspgz')" width="1010px" top="-10px" class="edit" @close="$emit('update:control', false)">
    <!--基本信息-->
    <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
    <div class="container">
      <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
        <el-form-item :label="$t('BasicSettings.process_name')" prop="processName" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.processName" placeholder="请输入流程名称" clearable/>
        </el-form-item>
        <el-form-item :label="$t('BasicSettings.is_effective')" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.isEffective" placeholder="请选择启用状态" style="width: 100%;">
            <el-option label="on duty" value="1"/>
            <el-option label="closed" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('BasicSettings.type3')" prop="type" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.type" placeholder="请选择单据类型" filterable style="width: 100%;" disabled>
            <el-option v-for="(item, index) in categorys" :key="index" :value="item.id" :label="item.categoryName"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('BasicSettings.is_message')" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.isMessage" :placeholder="$t('updates.qxz')" style="width: 100%;">
            <el-option label="发送" value="1"/>
            <el-option label="不发送" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('BasicSettings.effect_region')" prop="process_name" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.regionName" disabled/>
        </el-form-item>
        <el-form-item :label="$t('BasicSettings.effect_repository')" prop="process_name" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.repositoryName" disabled/>
        </el-form-item>
      </el-form>
    </div>
    <!--辅助信息-->
    <h2 ref="fuzhu" class="form-name">{{ $t('updates.splcbz') }}</h2>
    <div class="buttons" style="margin-top: 50px">
      <el-button type="success" @click="insertEvent(-1)">{{ $t('updates.tj') }}</el-button>
      <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
    </div>
    <div class="container" style="margin-top: 20px">
      <el-editable
        ref="editable"
        :data.sync="list2"
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
        <el-editable-column label="流程步骤" prop="step" type="index" align="center" width="150px"/>
        <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="description" align="center" label="步骤描述" width="200px"/>
        <el-editable-column :edit-render="{name: 'ElInput',type: 'visible'}" prop="money" align="center" label="流转条件" width="200px"/>
        <!--<el-editable-column :edit-render="{name: 'ElInput'}" prop="handlerName" align="center" label="步骤处理人" width="200px"/>-->
        <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="handlerName" align="center" label="步骤处理人" min-width="500px">
          <template slot="edit" slot-scope="scope">
            <el-input v-model="scope.row.handlerName" style="margin-top: 8px;" @focus="handlechoose(scope)" @input="$refs.editable.updateStatus(scope)"/>
          </template>
        </el-editable-column>
        <my-emp :control.sync="empcontrol" @chuli="chuli(scope, $event)"/>
        <my-emp2 :control.sync="empcontrol2" :checklist.sync="checklist" @personName="personName($event)" @personIds="personIds($event)" @cancelId="cancelId($event)"/>
        <!--<el-editable-column align="center" label="操作" min-width="300px">-->
        <!--<template slot-scope="scope">-->
        <!--&lt;!&ndash;<el-input v-model="scope.row.handlerName" style="float: left;width: 100px" @input="$refs.editable.updateStatus(scope)"/>&ndash;&gt;-->
        <!--<el-button icon="el-icon-more-outline" style="float: right" @click="handlechoose(scope)"/>-->
        <!--<my-emp :control.sync="empcontrol" @personName="personName" @chuli="chuli(scope)"/>-->
        <!--</template>-->
        <!--</el-editable-column>-->
      </el-editable>
    </div>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { regionlist, searchRepository } from '@/api/public'
import { searchcategory, searchDetail, updateeapproval } from '@/api/BasicSettings'
import MyEmp from './MyEmp'
import MyEmp2 from './MyEmp2'
var _that
export default {
  components: { MyEmp, MyEmp2 },
  props: {
    control: {
      type: Boolean,
      default: false
    },
    editdata: {
      type: Object,
      default: null
    }
  },
  data() {
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
      // 区域数据
      region: [],
      // 弹窗组件的控制
      editVisible: this.control,
      // 审批流程信息数据
      personalForm: this.editdata,
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
        step: [
          { required: true, message: '请输入流程步骤', trigger: 'blur' }
        ],
        money: [
          { validator: validatePass4, trigger: 'blur' }
        ],
        handlerName: [
          { required: true, message: '请选择步骤处理人', trigger: 'blue' }
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
      // 处理过删除的数据
      // processval: [],
      // 个人信息规则数据
      personalrules: {
        processName: [
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
  watch: {
    control() {
      this.editVisible = this.control
    },
    editdata() {
      this.personalForm = this.editdata
      console.log(this.list2)
      this.getnationlist()
    }
  },
  created() {
    this.getnationlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    cancelId(val) {
      console.log('执行===================================》', val)
      console.log('执行2222222===================================》', this.checklist)
      for (let i = 0; i < this.checklist.length; i++) {
        for (let j = 0; j < val.length; j++) {
          if (Number(this.checklist[i].id) === Number(val[j])) {
            console.log('删除了数据')
            this.checklist.splice(i, 1)
          }
        }
      }
      // this.processval = this.checklist
      console.log('处理过的数据', this.processval)
    },
    // 驾驶员列表返回数据
    personName(val) {
      console.log('store=========================>', this.$store.getters.myflagApproval)
      const myval = this.$store.getters.myflagApproval
      for (let i = 0; i < this.checklist.length; i++) {
        for (let j = 0; j < myval.length; j++) {
          if (Number(this.checklist[i].id) === Number(myval[j])) {
            this.checklist.splice(i, 1)
            // i--
          }
        }
      }
      const processval = this.checklist
      console.log('人员名称', val)
      console.log('原来的人员', processval)
      if (processval.length === 1) {
        if (val === '') {
          val = processval[0].personName
        } else {
          val = val + ',' + processval[0].personName
        }
      } else {
        for (let i = 0; i < processval.length; i++) {
          if (val === '') {
            val = processval[i].personName + ',' + val
          } else {
            val = val + ',' + processval[i].personName
          }
        }
      }
      val.split(',')
      const myarr = Array.from(new Set(val.split(','))).join(',')
      this.kongscope.row.handlerName = myarr
      this.kongscope.row.stepHandlerName = myarr
      console.log(' this.kongscope.row.handlerName', this.kongscope.row.handlerName)
      this.$store.dispatch('getmyflagApproval', '')
    },
    personIds(val) {
      console.log(this.$store.getters.myflagApproval)
      const myval = this.$store.getters.myflagApproval
      for (let i = 0; i < this.checklist.length; i++) {
        for (let j = 0; j < myval.length; j++) {
          if (Number(this.checklist[i].id) === Number(myval[j])) {
            this.checklist.splice(i, 1)
            // i--
          }
        }
      }
      const processval = this.checklist
      if (processval.length === 1) {
        if (val === '') {
          val = processval[0].id
        } else {
          val = val + ',' + processval[0].id
        }
      } else {
        for (let i = 0; i < processval.length; i++) {
          if (val === '') {
            val = processval[i].id + ',' + val
          } else {
            val = val + ',' + processval[i].id
          }
        // const element = array[i];
        }
      }
      val.split(',')
      const myarr = Array.from(new Set(val.split(','))).join(',')
      this.kongscope.row.stepHandler = ',' + myarr + ','
      console.log('this.kongscope.row.stepHandler', this.kongscope.row.stepHandler)
      // if (scope.row.step === null) {
      //   scope.row.step = scope.$index + 1
      // }
      this.$store.dispatch('getmyflagApproval', '')
      return
    },
    // 国籍列表
    getnationlist() {
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        }
      })
      // 审批流程步骤数据
      searchDetail(this.personalForm.id).then(res => {
        if (res.data.ret === 200) {
          this.list2 = res.data.data.detail
        }
      })
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
        }
      })
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {}
    },
    // 审核人选择
    // 员工输入框focus事件触发
    handlechoose(scope) {
      console.log('scope=================>', scope)
      this.empcontrol2 = true
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
      // const name = {
      //   personName: scope.row.handlerName,
      //   id: a
      // }
      // const newarr = []
      // newarr.push(name)
      // this.$store.dispatch('getsetchoosedata', Number(a))
      // this.checklist = newarr
      this.kongscope = scope
      this.kongscope.row.step = scope.$index + 1
    },
    // 处理人change事件
    fuzhi(scope) {
      scope.row.handlerName = this.handlerName
    },
    chuli(scope, val) {
      this.kongscope.row.handlerName = val.personName
      this.kongscope.row.stepHandler = val.id
      // scope.row.handlerName = val.personName
      // scope.row.stepHandler = val.id
      console.log(scope.row.step)
      if (scope.row.step === null) {
        scope.row.step = scope.$index + 1
      }
    },
    // edit table 操作
    selectEvent(selection, row) {
      console.log(selection)
      console.log(row)
    },
    handleStep(row) {
      console.log(row)
    },
    // 新增审批流程
    insertEvent(index) {
      this.$refs.editable.insertAt({ step: 1 }, index)
    },
    // 选择操作
    currentChangeEvent(currentRow, oldCurrentRow) {
      console.log(currentRow)
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      // console.log(this.personalForm)

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
      if (rest2.length === 1) {
        rest2[0].money = ''
      } else {
        rest2[rest2.length - 1].money = ''
      }
      const rest = JSON.stringify(rest2)
      console.log(rest)
      updateeapproval(this.personalForm, rest).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '修改成功',
            message: '修改成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
          this.$refs.personalForm.clearValidate()
          this.$refs.personalForm.resetFields()
          this.editVisible = false
        } else {
          this.$notify.error({
            title: 'wrong',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    handlecancel() {
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .edit >>> .el-dialog{
    -webkit-transform: none;
    transform: none;
    position: absolute;
    right: 0;
    left: auto;
    height: auto;
  }
  .edit >>> .el-dialog__header{
    background: #fff;
    position: fixed;
    top: 0;
    display: block;
    width: 1010px;
    z-index: 100;
    border-bottom: 1px solid #f1f1f1;
  }
  .edit >>> .el-dialog__body{
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
</style>
