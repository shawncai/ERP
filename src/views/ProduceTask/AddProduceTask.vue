<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('ProduceTask.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProduceTask.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="chooseType">
                    <el-option value="1" label="主生产计划" />
                    <el-option value="2" label="无来源" />
                    <el-option value="3" label="生产需求" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProduceTask.produceDeptId')" prop="produceDeptId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.produceDeptId" clearable style="width: 200px" @change="choosedept">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProduceTask.processType')" prop="processType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.processType" style="width: 200px">
                    <el-option :label="$t('Hmodule.jiagong1')" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProduceTask.handlePersonId')" prop="handlePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="handlePersonId" style="width: 200px" clearable @focus="handlechooseStock"/>
                </el-form-item>
                <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProduceTask.summary')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.summary" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">
        <div ref="fuzhu" class="form-name">{{ $t('updates.scrwdmx') }}</div>
        <div class="buttons" style="margin-top: 58px">
          <el-button :disabled="addpro" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail2 :control.sync="control" @product="productdetail"/>
          <el-button :disabled="addsouce" style="width: 130px" @click="handleAddSouce">{{ $t('updates.cydzxz') }}</el-button>
          <produce-plan :procontrol.sync="producecontrol" @produce="produce" @moredata="moredata"/>
          <my-producerequire :prorequirecontrol.sync="prorequirecontrol" @prorequireDetail="prorequireDetail"/>
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
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" min-width="150px"/>
            <el-editable-column v-if="personalForm.sourceType==='3'" :label="$t('Hmodule.ggzx')" prop="workCenterName" align="center" min-width="150px"/>
            <el-editable-column v-if="personalForm.sourceType!=='3'" :edit-render="{name: 'ElSelect', options: workCenterIds, type: 'visible'}" :label="$t('Hmodule.ggzx')" prop="workCenterId" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1}, type: 'visible'}" :label="$t('updates.scsl')" prop="produceQuantity" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElSelect', options: bomNumbers, type: 'visible'}" :label="$t('updates.bimbm')" prop="bomNumber" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElSelect', options: processes, type: 'visible'}" :label="$t('updates.gylx')" prop="processName" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible'}" :label="$t('updates.jhkgsj')" prop="planStartDate" align="center" min-width="160px"/>
            <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible'}" :label="$t('updates.jhwgsj')" prop="planFinishDate" align="center" min-width="160px"/>
            <el-editable-column :label="$t('updates.yscsl')" prop="alreadyProduceQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.yrksl')" prop="alreadyEnterQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ybjsl')" prop="reportedCheckQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.sjsl')" prop="actualCheckQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.hgsl')" prop="passQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.bhgsl')" prop="failQuantity" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { addproducetask } from '@/api/ProduceTask'
import { materialslist, searchprocessFile, searchworkCenter, requireplanlist } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import ProducePlan from './components/ProducePlan'
import MyDetail2 from './components/MyDetail2'
import MyDelivery from '../DailyAdjust/components/MyDelivery'
import MyProducerequire from './components/MyProducerequire'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'AddProduceTask',
  components: { MyProducerequire, MyDelivery, MyDetail2, ProducePlan, MyEmp, MyDetail },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    return {
      // 控制生产需求
      prorequirecontrol: false,
      // 需求列表过来数据
      needsdata: [],
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
      deliverycontrol: false,
      // 主生产计划控制
      producecontrol: false,
      // 控制工作中心
      centercontrol: false,
      // 控制无来源商品列表窗口
      control: false,
      // 生产任务信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      },
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
  created() {
    this.getList()
  },
  beforeCreate() {
    _that = this
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
      if (this.personalForm.sourceType === '1') {
        this.addsouce = false
        this.addpro = true
        this.$refs.editable.clear()
      } else if (this.personalForm.sourceType === '2') {
        this.addpro = false
        this.addsouce = true
        this.$refs.editable.clear()
      } else if (this.personalForm.sourceType === '3') {
        this.addsouce = false
        this.addpro = true
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
              title: 'wrong',
              message: this.$t('prompt.wpytj'),
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
      if (this.personalForm.sourceType === '1') {
        this.producecontrol = true
      } else if (this.personalForm.sourceType === '3') {
        this.prorequirecontrol = true
      }
    },
    produce(val) {
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    prorequireDetail(val) {
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    // 需求数量加载
    moredata(val) {
      requireplanlist(val).then(res => {
        const requiredata = res.data.data.content.list[0].materialsRequirePlanDetailVos
        for (let i = 0; i < requiredata.length; i++) {
          if (requiredata[i].materialsSource === 2) {
            this.needsdata = requiredata[i]
            this.needsdata.produceQuantity = (requiredata[i].planQuantity - requiredata[i].issueQuantity).toFixed(6)
            this.needsdata.alreadyProduceQuantity = 0
            this.needsdata.alreadyEnterQuantity = 0
            this.needsdata.reportedCheckQuantity = 0
            this.needsdata.actualCheckQuantity = 0
            this.needsdata.passQuantity = 0
            this.needsdata.failQuantity = 0
            console.log(this.needsdata)
            this.$refs.editable.insert(this.needsdata)
          }
        }
      })
    },
    // 负责人focus事件
    handlechooseStock() {
      this.deliverycontrol = true
    },
    // 负责人回显
    deliveryName(val) {
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
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
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
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addproducetask(parms, parms2, this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.editable.clear()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
            } else {
              this.$notify.error({
                title: 'wrong',
                message: res.data.msg,
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
            offset: 100
          })
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/ProduceTask/AddProduceTask', name: 'AddProduceTask', fullPath: '/ProduceTask/AddProduceTask', title: 'AddProduceTask' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
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
