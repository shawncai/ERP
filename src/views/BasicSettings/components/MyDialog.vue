<template>
  <el-dialog :visible.sync="editVisible" :control="control" :editdata="editdata" :close-on-press-escape="false" width="1010px" top="10px" title="修改供应商" @close="$emit('update:control', false)">
    <!--基本信息-->
    <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
    <div class="container">
      <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
        <el-form-item :label="$t('BasicSettings.process_name')" prop="processName" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.processName" placeholder="请输入流程名称" clearable/>
        </el-form-item>
        <el-form-item :label="$t('BasicSettings.is_effective')" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.isEffective" placeholder="请选择启用状态" style="width: 100%;">
            <el-option label="active" value="1"/>
            <el-option label="dead" value="2"/>
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
    <h2 ref="fuzhu" class="form-name">审批流程步骤</h2>
    <div class="buttons" style="margin-top: 50px">
      <el-button type="success" @click="insertEvent(-1)">添加</el-button>
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
        <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="money" align="center" label="流转条件" width="200px"/>
        <!--<el-editable-column :edit-render="{name: 'ElInput'}" prop="handlerName" align="center" label="步骤处理人" width="200px"/>-->
        <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="handlerName" align="center" label="步骤处理人" min-width="500px">
          <template slot="edit" slot-scope="scope">
            <el-input v-model="scope.row.handlerName" @focus="handlechoose(scope)" @input="$refs.editable.updateStatus(scope)"/>
            <my-emp :control.sync="empcontrol" @chuli="chuli(scope, $event)"/>
            <my-emp2 :control.sync="empcontrol2" @personName="personName(scope, $event)" @personIds="personIds(scope, $event)"/>
          </template>
        </el-editable-column>
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
    return {
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
          { required: true, message: '请输入流转条件', trigger: 'blue' }
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
  methods: {
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
      if (scope.row.step === null) {
        scope.row.step = scope.$index + 1
      }
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
      this.empcontrol2 = true
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
      console.log(this.personalForm)
      const rest = JSON.stringify(this.$refs.editable.getRecords())
      console.log(rest)
      updateeapproval(this.personalForm, rest).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
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
            title: '错误',
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

</style>
