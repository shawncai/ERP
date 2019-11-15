<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('inventoryAlarm.repositoryId')" prop="repositoryId" style="width: 100%;">
                  <el-input v-model="repositoryId" placeholder="请选择仓库" style="margin-left: 18px;width:200px" clearable @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('inventoryAlarm.handlePerson')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="handlePersonId" placeholder="经办人" style="margin-left: 18px;width:200px" clearable @focus="handlechooseAccept"/>
                </el-form-item>
                <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('inventoryAlarm.createDate')" prop="creatDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.creatDate"
                    placeholder="创建时间"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"
                  />
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('WarehouseAdjust.productId')" prop="productCode" style="width: 100%;">
                  <el-input v-model="productCode" placeholder="请选择商品" style="margin-left: 18px;width:200px" clearable @focus="handleAddproduct"/>
                  <my-product :control.sync="control" @product="productdetail"/>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="6">
                <el-form-item :label="$t('inventoryAlarm.alarmDays')" prop="alarmDays" style="width: 100%;">
                  <el-input-number v-model="personalForm.alarmDays" :precision="0" :controls="false" :step="1" :min="0" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!-- 货物流转规则明细 -->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">货物流转规则明细</h2>
        <div class="buttons" style="margin-top: 58px">
          <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <!-- <el-button type="primary" @click="checkStock()">{{ $t('updates.kckz') }}</el-button> -->
        </div>
        <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
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
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
            <el-editable-column prop="color" align="center" :label="$t('updates.ys')" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1, precision: 0}, type: 'visible'}" :label="$t('inventoryAlarm.alarmDays')" prop="alarmDays" align="center" min-width="100">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="0"
                  :controls="true"
                  :min="1"
                  v-model="scope.row.alarmDays"
                />
              </template>
            </el-editable-column>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { create } from '@/api/InventoryAlarm'
import MyRepository from './components/MyRepository'
import MyAccept from './components/MyAccept'
import MyDetail from './components/MyDetail'
import MyCreate from './components/MyCreate'
import MyProduct from './components/MyProduct'
var _that
export default {
  name: 'AddInventoryAlarm',
  components: { MyProduct, MyRepository, MyDetail, MyCreate, MyAccept },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.repositoryId)
      if (this.repositoryId === undefined || this.repositoryId === null || this.repositoryId === '') {
        callback(new Error('请选择仓库'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('请选择经办人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(value)
      if (this.personalForm.creatDate === undefined || this.personalForm.creatDate === null || this.personalForm.creatDate === '') {
        callback(new Error('请选择时间'))
      } else {
        callback()
      }
    }
    return {
      // 经办人回显
      handlePersonId: this.$store.getters.name,
      // 出库人控制框
      accetpcontrol: false,
      // 商品回显
      productCode: '',
      // 仓库回显
      repositoryId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制商品列表窗口
      control: false,
      // 库存预警数据
      personalForm: {
        create: this.$store.getters.userId,
        // createId: 3,
        countryId: this.$store.getters.countryId,
        handlePersonId: this.$store.getters.userId,
        creatDate: ''
      },
      // 库存预警规则数据
      personalrules: {
        repositoryId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        handlePersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        creatDate: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ]
      },
      // 表格数据
      list2: [],
      // 表格验证
      validRules: {
        alarmDays: [
          { required: true, message: '请输入流转天数', trigger: 'change' }
        ]
      }
    }
  },
  beforeCreate() {
    _that = this
  },
  mounted() {
    this.getdatatime()
  },
  methods: {
    getdatatime() { // 默认显示今天
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      this.personalForm.creatDate = currentdate
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 出库人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    // 出库人列表返回数据
    acceptName(val) {
      this.handlePersonId = val.personName
      this.personalForm.createId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.repositoryId = val.repositoryName
      this.personalForm.repositoryId = val.id
    },
    // 选择商品
    handleAddproduct() {
      if (this.repositoryId === null || this.repositoryId === '' || this.repositoryId === undefined) {
        this.$notify.error({
          title: '错误',
          message: '请先选择出库仓库',
          offset: 100
        })
        return false
      }
      this.control = true
    },
    productdetail(val) {
      console.log(val)
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        create: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.repositoryId = ''
    },
    // 保存操作
    handlesave() {
      console.log(this.personalForm)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const EnterDetail = this.$refs.editable.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }
      const parms = JSON.stringify(Data)
      const parms2 = JSON.stringify(EnterDetail)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate((valid) => {
            if (valid) {
              create(parms, parms2).then(res => {
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
      const view = { path: '/WarehouseAdjust/AddStockAlarm', name: 'AddStockAlarm', fullPath: '/WarehouseAdjust/AddStockAlarm', title: 'AddStockAlarm' }
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
  }
</style>
