<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.taskNumber +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="chooseType">
                  <el-option value="1" label="主生产计划" />
                  <el-option value="2" label="无来源" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.produceDeptId')" prop="produceDeptId" style="width: 100%;">
                <el-select v-model="personalForm.produceDeptId" clearable style="margin-left: 18px;width: 200px" @change="choosedept">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.processType')" prop="processType" style="width: 100%;">
                <el-select v-model="personalForm.processType" style="margin-left: 18px;width: 200px">
                  <el-option :label="$t('Hmodule.jiagong1')" value="1" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseStock"/>
              </el-form-item>
              <my-emp :control.sync="stockControl" @stockName="stockName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.summary')" style="width: 100%;">
                <el-input v-model="personalForm.summary" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.wlxqjhmx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button :disabled="addpro" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <my-detail2 :control.sync="control" @product="productdetail"/>
        <el-button :disabled="addsouce" style="width: 130px" @click="handleAddSouce">{{ $t('updates.cydzxz') }}</el-button>
        <produce-plan :procontrol.sync="producecontrol" @produce="produce"/>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElSelect', options: workCenterIds, type: 'visible'}" :label="$t('Hmodule.ggzx')" prop="workCenterId" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.scsl')" prop="produceQuantity" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElSelect', options: bomNumbers, type: 'visible'}" :label="$t('updates.bimbm')" prop="bomNumber" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElSelect', options: processes, type: 'visible'}" :label="$t('updates.gylx')" prop="processName" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'datetime', format: 'yyyy-MM-dd'}, type: 'visible'}" :label="$t('updates.jhkgsj')" prop="planStartDate" align="center" min-width="160px"/>
          <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'datetime', format: 'yyyy-MM-dd'}, type: 'visible'}" :label="$t('updates.jhwgsj')" prop="planFinishDate" align="center" min-width="160px"/>
          <el-editable-column :label="$t('updates.yscsl')" prop="alreadyProduceQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.yrksl')" prop="alreadyEnterQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ybjsl')" prop="reportedCheckQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.sjsl')" prop="actualCheckQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.hgsl')" prop="passQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.bhgsl')" prop="failQuantity" align="center" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updateproducetask } from '@/api/ProduceTask'
import { materialslist, searchprocessFile, searchworkCenter } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import ProducePlan from './ProducePlan'
import MyDetail2 from './MyDetail2'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyDetail2, ProducePlan, MyEmp, MyDetail },
  props: {
    editcontrol: {
      type: Boolean,
      default: false
    },
    editdata: {
      type: Object,
      default: null
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 控制添加商品按钮
      addpro: true,
      // 控制从源单中选择按钮
      addsouce: true,
      // 主生产计划回显
      producePlanNumber: '',
      // 负责人回显
      handlePersonId: '',
      // 部门数据
      depts: [],
      // 负责人控制
      stockControl: false,
      // 主生产计划控制
      producecontrol: false,
      // 控制工作中心
      centercontrol: false,
      // 控制无来源商品列表窗口
      control: false,
      // 生产任务规则数据
      personalrules: {
        produceDeptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        processType: [
          { required: true, message: '请选择加工类型', trigger: 'change' }
        ],
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ]
      },
      // 生产任务明细数据
      list2: [],
      // bom编码数据
      bomNumbers: [],
      // 工艺路线
      processes: [],
      // 工作中心数据
      workCenterIds: [],
      // 生产任务明细列表规则
      validRules: {
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.handlePersonId = this.personalForm.handlePersonName
      this.workCenterId = this.personalForm.workCenter
      this.producePlanNumber = this.personalForm.producePlanNumber
      this.produceRepositoryId = this.personalForm.produceRepositoryName
      this.list2 = this.personalForm.produceTaskDetailVos
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 加载bom编码数据和工艺路线
    getList() {
      materialslist().then(res => {
        if (res.data.ret === 200) {
          this.bomNumbers = res.data.data.content.list.map(function(item) {
            return {
              label: item.bomNumber,
              value: item.bomNumber
            }
          })
        }
      })
      // 工艺路线数据
      searchprocessFile().then(res => {
        if (res.data.ret === 200) {
          this.processes = res.data.data.content.list.map(function(item) {
            return {
              label: item.processName,
              value: item.processName
            }
          })
        }
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
      // 工作中心数据
      searchworkCenter(this.personalForm.produceDeptId).then(res => {
        if (res.data.ret === 200) {
          this.workCenterIds = res.data.data.content.list.map(function(item) {
            return {
              label: item.workCenterName,
              value: item.id
            }
          })
        }
      })
    },
    // 选择部门focus事件
    choosedept() {
      console.log(this.personalForm.produceDeptId)
      if (this.personalForm.produceDeptId !== '' && this.personalForm.produceDeptId !== null && this.personalForm.produceDeptId !== undefined) {
        // 工作中心数据
        searchworkCenter(this.personalForm.produceDeptId).then(res => {
          if (res.data.ret === 200) {
            this.workCenterIds = res.data.data.content.list.map(function(item) {
              return {
                label: item.workCenterName,
                value: item.id
              }
            })
          }
        })
      }
    },
    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1' || this.personalForm.sourceType === 1) {
        this.addsouce = false
        this.addpro = true
        this.$refs.editable.clear()
      } else if (this.personalForm.sourceType === '2' || this.personalForm.sourceType === 2) {
        this.addpro = false
        this.addsouce = true
        this.$refs.editable.clear()
      }
    },
    // 无来源添加商品
    handleAddproduct() {
      this.control = true
    },
    // 无来源数据添加
    productdetail(val) {
      this.$refs.editable.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: '错误',
              message: '物品已添加',
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    // 源单数据添加控制
    handleAddSouce() {
      this.producecontrol = true
    },
    produce(val) {
      this.$refs.editable.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: '错误',
              message: '物品已添加',
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    // 负责人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 负责人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.produceRepositoryId = null
      this.handlePersonId = null
      this.workCenterId = null
      this.producePlanNumber = null
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      const EnterDetail = this.$refs.editable.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.sourceNumber === null || elem.sourceNumber === '' || elem.sourceNumber === undefined) {
          delete elem.sourceNumber
        }
        if (elem.produceQuantity === null || elem.produceQuantity === '' || elem.produceQuantity === undefined) {
          delete elem.produceQuantity
        }
        if (elem.bomNumber === null || elem.bomNumber === '' || elem.bomNumber === undefined) {
          delete elem.bomNumber
        }
        if (elem.processName === null || elem.processName === '' || elem.processName === undefined) {
          delete elem.processName
        }
        if (elem.planStartDate === null || elem.planStartDate === '' || elem.planStartDate === undefined) {
          delete elem.planStartDate
        }
        if (elem.planFinishDate === null || elem.planFinishDate === '' || elem.planFinishDate === undefined) {
          delete elem.planFinishDate
        }
        if (elem.alreadyProduceQuantity === null || elem.alreadyProduceQuantity === '' || elem.alreadyProduceQuantity === undefined) {
          delete elem.alreadyProduceQuantity
        }
        if (elem.alreadyEnterQuantity === null || elem.alreadyEnterQuantity === '' || elem.alreadyEnterQuantity === undefined) {
          delete elem.alreadyEnterQuantity
        }
        if (elem.reportedCheckQuantity === null || elem.reportedCheckQuantity === '' || elem.reportedCheckQuantity === undefined) {
          delete elem.reportedCheckQuantity
        }
        if (elem.actualCheckQuantity === null || elem.actualCheckQuantity === '' || elem.actualCheckQuantity === undefined) {
          delete elem.actualCheckQuantity
        }
        if (elem.passQuantity === null || elem.passQuantity === '' || elem.passQuantity === undefined) {
          delete elem.passQuantity
        }
        if (elem.failQuantity === null || elem.failQuantity === '' || elem.failQuantity === undefined) {
          delete elem.failQuantity
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      updateproducetask(parms, parms2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
          this.$refs.editable.clear()
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
      this.$refs.editable.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
  .el-col-12{
    width: 49%;
  }
</style>
