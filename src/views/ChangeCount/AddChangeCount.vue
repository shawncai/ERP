<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">

        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('ChangeCount.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ChangeCount.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.sourceType" style="width: 200px">
                    <el-option :label="$t('updates.fqsqd')" value="1"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ChangeCount.sourceNumber')" prop="sourceNumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.sourceNumber" style="width: 200px" @focus="handleAddsourceNum"/>
                </el-form-item>
                <my-installment :installmentcontrol.sync="installmentcontrol" @Installment="Installment"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ChangeCount.customerId')" prop="customerId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.customerName" :disabled="IscustomerName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ChangeCount.customerPhone')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.customerPhone" :disabled="IscustomerPhone" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ChangeCount.totalMoney')" prop="totalMoney" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.totalMoney" :disabled="IstotalMoney" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ChangeCount.beforeCount')" prop="beforeCount" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.beforeCount" :disabled="IsbeforeCount" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ChangeCount.paidCount')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.paidCount" :disabled="IspaidCount" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ChangeCount.paidMoney')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.paidMoney" :disabled="IspaidMoney" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ChangeCount.paidCapital')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.paidCapital" :disabled="IspaidCapital" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ChangeCount.remainCapital')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.remainCapital" :disabled="IsremainCapital" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ChangeCount.afterCount')" prop="afterCount" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.afterCount" clearable style="width: 200px">
                    <el-option
                      v-for="(item, index) in installmentCounts"
                      :key="index"
                      :value="item.installmentCount"
                      :label="item.installmentCount"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ChangeCount.saleRepositoryId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="saleRepositoryId" :disabled="IssaleRepositoryId" style="width: 200px" @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <!-- <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >商品明细</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" align="center" :label="$t('Hmodule.wpbh')" min-width="150px"/>
            <el-editable-column prop="productName" align="center" :label="$t('Hmodule.wpmc')" min-width="150px"/>
            <el-editable-column prop="categoryName" align="center" :label="$t('updates.wpfl')" min-width="150px"/>
            <el-editable-column prop="unit" align="center" :label="$t('updates.jbdw')" min-width="150px"/>
            <el-editable-column prop="typeId" align="center" :label="$t('updates.ggxh')" min-width="150px"/>
            <el-editable-column prop="color" align="center" :label="$t('updates.ys')" min-width="150px"/>
            <el-editable-column prop="kpiGrade" align="center" :label="$t('updates.jxf')" min-width="150px"/>
            <el-editable-column prop="point" align="center" :label="$t('updates.spjf')" min-width="150px"/>
            <el-editable-column prop="price" align="center" :label="$t('Hmodule.dj')" min-width="150px"/>
            <el-editable-column prop="carCode" align="center" :label="$t('updates.cjbm')" min-width="150px"/>
            <el-editable-column prop="batteryCode" align="center" :label="$t('updates.dcbm')" min-width="150px"/>
            <el-editable-column prop="motorCode" align="center" :label="$t('updates.djbm')" min-width="150px"/>
          </el-editable>
        </div>
      </el-card> -->
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
import { addchangecount } from '@/api/ChangeCount'
import { ratelist } from '@/api/Installmentrate'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MyMater from './components/MyMater'
import MyInstallment from './components/MyInstallment'
import MyRepository from './components/MyRepository'
var _that
export default {
  name: 'AddChangeCount',
  components: { MyRepository, MyInstallment, MyMater, MyDetail, MyEmp },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('please select sourceNumber'))
      } else {
        callback()
      }
    }
    return {
      // 控制表单是否可以编辑
      IscustomerName: false,
      IscustomerPhone: false,
      IstotalMoney: false,
      IsbeforeCount: false,
      IspaidCount: false,
      IspaidMoney: false,
      IspaidCapital: false,
      IsremainCapital: false,
      IssaleRepositoryId: false,
      // 回显销售门店
      saleRepositoryId: '',
      // 控制销售门店
      repositorycontrol: false,
      // 控制分期订单
      installmentcontrol: false,
      // 编辑表格数据
      list2: [],
      // 销售订单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1'
      },
      // 商品信息
      productForm: {},
      // 销售订单规则数据
      personalrules: {
        sourceType: [
          { required: true, message: 'please select sourceType', trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        afterCount: [
          { required: true, message: 'please input afterCount', trigger: 'blur' }
        ]
      },
      // 分期数据
      installmentCounts: [],
      // 分期参数
      ratelistData: {
        stat: 1,
        pagenum: 1,
        pagesize: 9999
      }
    }
  },
  created() {
    this.getratelist()
  },

  mounted() {
    this.getinformation()
  },
  activated() {
    this.getinformation()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 获取分款期数
    getratelist() {
      ratelist(this.ratelistData).then(res => {
        if (res.data.ret === 200) {
          this.installmentCounts = res.data.data.content.list
        }
      })
    },
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.Installment(this.$store.getters.empcontract)
        // for (let i = 0; i < this.$store.getters.empcontract.installmentOrderDetailVos.length; i++) {
        //   this.$store.getters.empcontract.installmentOrderDetailVos[i].categoryName = this.$store.getters.empcontract.installmentOrderDetailVos[i].productCategory
        // }
        // this.InstallmentDetail(this.$store.getters.empcontract.installmentOrderDetailVos)
        this.$store.dispatch('getempcontract', '')
      }
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      this.saleRepositoryId = val.repositoryName
      this.personalForm.saleRepositoryId = val.id
    },
    // 源单控制
    handleAddsourceNum() {
      this.installmentcontrol = true
    },
    // InstallmentDetail(val) {
    //   console.log(val)
    //   this.$refs.editable.clear()
    //   for (let i = 0; i < val.length; i++) {
    //     this.$refs.editable.insert(val[i])
    //   }
    // },
    Installment(val) {
      console.log(val)
      this.personalForm.sourceNumber = val.orderNumber
      this.personalForm.customerId = val.customerId
      this.personalForm.customerName = val.customerName
      this.personalForm.customerPhone = val.customerPhone
      this.personalForm.totalMoney = val.totalMoney
      this.personalForm.beforeCount = val.count
      this.personalForm.paidCount = val.paidCount
      this.personalForm.paidMoney = Number(val.totalMoney) - Number(val.leftAllmoney)
      this.personalForm.remainCapital = val.leftMoney
      this.personalForm.paidCapital = Number(val.installmentMoney) - Number(val.leftMoney)
      this.personalForm.saleRepositoryId = val.repositoryId
      this.saleRepositoryId = val.repositoryName
      this.IscustomerName = true
      this.IscustomerPhone = true
      this.IstotalMoney = true
      this.IsbeforeCount = true
      this.IspaidCount = true
      this.IspaidMoney = true
      this.IspaidCapital = true
      this.IsremainCapital = true
      this.IssaleRepositoryId = true
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
      this.saleRepositoryId = null
      this.IscustomerName = false
      this.IscustomerPhone = false
      this.IstotalMoney = false
      this.IsbeforeCount = false
      this.IspaidCount = false
      this.IspaidMoney = false
      this.IspaidCapital = false
      this.IsremainCapital = false
      this.IssaleRepositoryId = false
    },
    // 保存操作
    handlesave() {
      // const EnterDetail = this.$refs.editable.getRecords()
      // if (EnterDetail.length === 0) {
      //   this.$notify.error({
      //     title: 'wrong',
      //     message: this.$t('prompt.mxbbnwk'),
      //     offset: 100
      //   })
      //   return false
      // }
      // EnterDetail.map(function(elem) {
      //   return elem
      // }).forEach(function(elem) {
      //   if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
      //     delete elem.productCode
      //   }
      //   if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
      //     delete elem.productName
      //   }
      //   if (elem.categoryId === null || elem.categoryId === '' || elem.categoryId === undefined) {
      //     delete elem.categoryId
      //   }
      //   if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
      //     delete elem.typeId
      //   }
      //   if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
      //     delete elem.unit
      //   }
      //   if (elem.color === null || elem.color === '' || elem.color === undefined) {
      //     delete elem.color
      //   }
      //   if (elem.kpiGrade === null || elem.kpiGrade === '' || elem.kpiGrade === undefined) {
      //     delete elem.kpiGrade
      //   }
      //   if (elem.point === null || elem.point === '' || elem.point === undefined) {
      //     delete elem.point
      //   }
      //   if (elem.price === null || elem.price === '' || elem.price === undefined) {
      //     delete elem.price
      //   }
      //   if (elem.carCode === null || elem.carCode === '' || elem.carCode === undefined) {
      //     delete elem.carCode
      //   }
      //   if (elem.batteryCode === null || elem.batteryCode === '' || elem.batteryCode === undefined) {
      //     delete elem.batteryCode
      //   }
      //   if (elem.motorCode === null || elem.motorCode === '' || elem.motorCode === undefined) {
      //     delete elem.motorCode
      //   }
      //   return elem
      // })
      // const parms2 = JSON.stringify(EnterDetail)
      console.log(this.personalForm)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addchangecount(parms, this.personalForm).then(res => {
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
      const view = { path: '/ChangeCount/AddChangeCount', name: 'AddChangeCount', fullPath: '/ChangeCount/AddChangeCount', title: 'AddChangeCount' }
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
