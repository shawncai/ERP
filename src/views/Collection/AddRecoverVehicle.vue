<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">基本信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Collection.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Collection.customerId')" prop="customerName" style="width: 100%;">
                  <el-input v-model="personalForm.customerName" style="margin-left: 18px;width: 200px" @focus="handleAddsourceNum"/>
                </el-form-item>
                <my-installment :installmentcontrol.sync="installmentcontrol" @InstallmentDetail="InstallmentDetail" @Installment="Installment"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Collection.customerPhone')" style="width: 100%;">
                  <el-input v-model="personalForm.customerPhone" :disabled="IscustomerPhone" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Collection.address')" style="width: 100%;">
                  <el-input v-model="personalForm.address" :disabled="Isaddress" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Collection.receivePersonId')" prop="receivePersonId" style="width: 100%;">
                  <el-input v-model="receivePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                </el-form-item>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Collection.retreatRepositoryId')" style="width: 100%;">
                  <el-input v-model="retreatRepositoryId" style="margin-left: 18px;width: 200px" @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Collection.receiveDate')" prop="receiveDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.receiveDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Collection.receiveReason')" style="width: 100%;">
                  <el-input v-model="personalForm.receiveReason" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >车辆信息</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            stripe
            border
            size="medium"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column label="序号" min-width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
            <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
            <el-editable-column prop="categoryName" align="center" label="物品分类" min-width="150px"/>
            <el-editable-column prop="unit" align="center" label="基本单位" min-width="150px"/>
            <el-editable-column prop="typeId" align="center" label="规格型号" min-width="150px"/>
            <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
            <el-editable-column prop="kpiGrade" align="center" label="绩效分" min-width="150px"/>
            <el-editable-column prop="point" align="center" label="商品积分" min-width="150px"/>
            <el-editable-column prop="price" align="center" label="单价" min-width="150px"/>
            <el-editable-column prop="carCode" align="center" label="车架编码" min-width="150px"/>
            <el-editable-column prop="batteryCode" align="center" label="电池编码" min-width="150px"/>
            <el-editable-column prop="motorCode" align="center" label="电机编码" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >缺失明细</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAddproduct">添加商品</el-button>
          <my-detail :control.sync="control" @product="productdetail"/>
          <el-button type="danger" @click="$refs.editable2.removeSelecteds()">删除</el-button>
        </div>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list3"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            stripe
            border
            size="medium"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column label="序号" min-width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
            <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
            <el-editable-column prop="categoryName" align="center" label="物品分类" min-width="150px"/>
            <el-editable-column prop="unit" align="center" label="基本单位" min-width="150px"/>
            <el-editable-column prop="typeId" align="center" label="规格型号" min-width="150px"/>
            <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
            <el-editable-column prop="kpiGrade" align="center" label="绩效分" min-width="150px"/>
            <el-editable-column prop="point" align="center" label="商品积分" min-width="150px"/>
            <el-editable-column prop="price" align="center" label="单价" min-width="150px"/>
            <el-editable-column prop="carCode" align="center" label="车架编码" min-width="150px"/>
            <el-editable-column prop="batteryCode" align="center" label="电池编码" min-width="150px"/>
            <el-editable-column prop="motorCode" align="center" label="电机编码" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">保存</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { createrecoverVehicle } from '@/api/Collection'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MyMater from './components/MyMater'
import MyInstallment from './components/MyInstallment'
import MyRepository from './components/MyRepository'
export default {
  name: 'AddRecoverVehicle',
  components: { MyRepository, MyInstallment, MyMater, MyDetail, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.receivePersonId === undefined || this.receivePersonId === null || this.receivePersonId === '') {
        callback(new Error('请选择收车人'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (this.personalForm.customerName === undefined || this.personalForm.customerName === null || this.personalForm.customerName === '') {
        callback(new Error('请选择客户姓名'))
      } else {
        callback()
      }
    }
    return {
      // 收车仓库回显
      retreatRepositoryId: '',
      // 收车仓库选择控制期
      repositorycontrol: false,
      // 控制源单
      control: false,
      // 收车人回显
      receivePersonId: '',
      // 控制收车人
      stockControl: false,
      // 控制表单是否可以编辑
      IscustomerName: false,
      IscustomerPhone: false,
      Isaddress: false,
      // 回显销售门店
      saleRepositoryId: '',
      // 控制分期订单
      installmentcontrol: false,
      // 编辑表格数据
      list2: [],
      list3: [],
      // 销售订单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        receiveDate: null
      },
      // 商品信息
      productForm: {},
      // 销售订单规则数据
      personalrules: {
        receivePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        customerName: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        receiveDate: [
          { required: true, message: '请选择收车日期', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getdatatime()
  },
  mounted() {
    this.getinformation()
  },
  methods: {
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.Installment(this.$store.getters.empcontract)
        this.$store.getters.empcontract.categoryName = this.$store.getters.empcontract.productCategory
        this.InstallmentDetail(new Array(this.$store.getters.empcontract))
        this.$store.dispatch('getempcontract', '')
      }
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      this.retreatRepositoryId = val.repositoryName
      this.personalForm.retreatRepositoryId = val.id
    },
    // 采购申请明细来源
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      this.$refs.editable2.clear()
      const nowlistdata = this.$refs.editable2.getRecords()
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
        this.$refs.editable2.insert(val[i])
      }
    },
    // 收车人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 收车人回显
    stockName(val) {
      this.receivePersonId = val.personName
      this.personalForm.receivePersonId = val.id
    },
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
      this.personalForm.receiveDate = currentdate
    },
    // 源单控制
    handleAddsourceNum() {
      this.installmentcontrol = true
    },
    InstallmentDetail(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    Installment(val) {
      this.personalForm.sourceNumber = val.applyNumber
      this.personalForm.customerId = val.customerId
      this.personalForm.customerName = val.customerName
      this.personalForm.customerPhone = val.customerPhone
      this.personalForm.address = val.address
      this.personalForm.retreatRepositoryId = val.repositoryId
      this.retreatRepositoryId = val.repositoryName
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1'
      }
      this.getdatatime()
      this.receivePersonId = null
      this.IscustomerName = false
      this.IscustomerPhone = false
      this.Isaddress = false
    },
    // 保存操作
    handlesave() {
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
        if (elem.categoryId === null || elem.categoryId === '' || elem.categoryId === undefined) {
          delete elem.categoryId
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.kpiGrade === null || elem.kpiGrade === '' || elem.kpiGrade === undefined) {
          delete elem.kpiGrade
        }
        if (elem.point === null || elem.point === '' || elem.point === undefined) {
          delete elem.point
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.carCode === null || elem.carCode === '' || elem.carCode === undefined) {
          delete elem.carCode
        }
        if (elem.batteryCode === null || elem.batteryCode === '' || elem.batteryCode === undefined) {
          delete elem.batteryCode
        }
        if (elem.motorCode === null || elem.motorCode === '' || elem.motorCode === undefined) {
          delete elem.motorCode
        }
        return elem
      })
      const EnterDetail2 = this.$refs.editable2.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.categoryId === null || elem.categoryId === '' || elem.categoryId === undefined) {
          delete elem.categoryId
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.kpiGrade === null || elem.kpiGrade === '' || elem.kpiGrade === undefined) {
          delete elem.kpiGrade
        }
        if (elem.point === null || elem.point === '' || elem.point === undefined) {
          delete elem.point
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.carCode === null || elem.carCode === '' || elem.carCode === undefined) {
          delete elem.carCode
        }
        if (elem.batteryCode === null || elem.batteryCode === '' || elem.batteryCode === undefined) {
          delete elem.batteryCode
        }
        if (elem.motorCode === null || elem.motorCode === '' || elem.motorCode === undefined) {
          delete elem.motorCode
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      const parms3 = JSON.stringify(EnterDetail2)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          createrecoverVehicle(parms, parms2, parms3, this.personalForm).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.editable.clear()
              this.$refs.editable2.clear()
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
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Collection/AddCollection', name: 'AddCollection', fullPath: '/Collection/AddCollection', title: 'AddCollection' }
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
