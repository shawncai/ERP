<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('updates.ysgz') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.depositBegintime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.depositBegintime"
                    :picker-options="pickerOptions0"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"
                    @change="cleardeposit"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.depositEndtime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.depositEndtime"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.startend')" prop="startend" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.startend"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    align="right"
                    unlink-panels
                    range-separator="到"
                    style="margin-left: 18px;width:400px"
                  />
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.finalBegintime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.finalBegintime"
                    :picker-options="pickerOptions2"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"
                    @change="clearfinal"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.finalEndtime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.finalEndtime"
                    :picker-options="pickerOptions3"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.advanceEndtime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.advanceEndtime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.advanceMode')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.advanceMode" style="margin-left: 18px;width:200px">
                    <el-radio :label="1" style="width: 100px">一口价</el-radio>
                    <el-radio :label="2">阶梯价</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Advancemanage.advanceStat')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.advanceStat" style="margin-left: 18px;width:200px">
                    <el-radio :label="1" style="width: 100px">开启</el-radio>
                    <el-radio :label="2">暂不开启</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.yssp') }}</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" @product="productdetail"/>
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
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dj')" prop="salePrice" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="deposit" align="center" label="预售定金" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  v-model="scope.row.deposit"
                  @input="jungle(scope.row)"/>
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
import { addadvanceproduct } from '@/api/Advancemanage'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
import MyDelivery from './components/MyDelivery'
import MyLnquiry from './components/MyLnquiry'
import MyArrival from './components/MyArrival'
var _that
export default {
  name: 'AddAdvanceProduct',
  components: { MyArrival, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(value)
      console.log(this.personalForm.startend)
      if (this.personalForm.startend === '' || this.personalForm.startend === undefined || this.personalForm.startend === null) {
        callback(new Error('请选择预售时间'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.personalForm.depositEndtime !== null) {
            return time.getTime() > new Date(this.personalForm.depositEndtime).getTime() - 8.64e7
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.personalForm.depositBegintime).getTime() - 8.64e7
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          return time.getTime() > new Date(this.personalForm.startend).getTime() - 8.64e7
        }
      },
      pickerOptions3: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.personalForm.finalBegintime).getTime() - 8.64e7
        }
      },
      // 预售定金字段
      depositTime: [],
      // 预售尾款时间段
      finalTime: [],
      // 控制到货单窗口
      arrivalcontrol: false,
      // 交货方式
      giveIds: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      paymentIds: [],
      // 我方签约人回显
      ourContractorId: '',
      // 控制我方签约人
      deliverycontrol: false,
      // 控制源单为询价单时
      inquirycontrol: false,
      // 控制源单为采购计划时
      plancontrol: false,
      // 控制源单为采购申请时
      applycontrol: false,
      // 控制添加商品按钮
      addpro: true,
      // 控制从源单中选择按钮
      addsouce: true,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 经办人回显
      handlePersonId: '',
      // 控制经办人
      stockControl: false,
      // 类别数据
      types: [],
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 控制商品列表窗口
      control: false,
      // 采购申请单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        depositBegintime: null,
        depositEndtime: null,
        finalBegintime: null,
        finalEndtime: null
      },
      // 采购申请单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        sourceType: [
          { required: true, message: '请选择业务单类型', trigger: 'change' }
        ],
        AdvancemanageType: [
          { required: true, message: '请选择发票类型', trigger: 'change' }
        ],
        currency: [
          { required: true, message: '请选择币种', trigger: 'change' }
        ],
        AdvancemanageNumber: [
          { required: true, message: '请输入发票号', trigger: 'blur' }
        ],
        startend: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
      validRules: {
      }
    }
  },
  created() {
    this.getTypes()
    this.getways()
  },
  methods: {
    // 判断销售定金
    jungle(row) {
      console.log(row)
      if (row.deposit > row.salePrice) {
        this.$notify.error({
          title: '错误',
          message: '预售定金不能大于销售价格',
          offset: 100
        })
        console.log(this.$refs.editable)
        this.$refs.editable.reloadRow()
      }
    },
    // 清空结束时间
    cleardeposit() {
      this.personalForm.depositEndtime = null
    },
    clearfinal() {
      this.personalForm.finalEndtime = null
    },
    getways() {
      // 交货方式
      searchCategory(2).then(res => {
        if (res.data.ret === 200) {
          this.giveIds = res.data.data.content.list
        }
      })
      // 运送方式
      searchCategory(3).then(res => {
        if (res.data.ret === 200) {
          this.transportIds = res.data.data.content.list
        }
      })
      // 结算方式
      searchCategory(5).then(res => {
        if (res.data.ret === 200) {
          this.paymentIds = res.data.data.content.list
        }
      })
    },
    // 业务单据编号控制
    handleAddSouce() {
      this.arrivalcontrol = true
    },
    allarrivalinfo(val) {
      this.personalForm.sourceNumber = val.number
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    getTypes() {
      // 采购类别数据
      searchStockCategory(this.typeparms).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 供应商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供应商列表返回数据
    supplierName(val) {
      console.log(val)
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
    },
    // 经办人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 经办人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 我方签约人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.ourContractorId = val.personName
      this.personalForm.ourContractorId = val.id
    },
    // 采购申请明细来源
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        console.log(val[i].price)
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
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1
      }
      this.depositTime = null
      this.finalTime = null
    },
    extend(jsonbject1, jsonbject2) {
      var resultJsonObject = {}
      for (const attr in jsonbject1) {
        resultJsonObject[attr] = jsonbject1[attr]
      }
      for (const attr in jsonbject2) {
        resultJsonObject[attr] = jsonbject2[attr]
      }
      return resultJsonObject
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '预售商品不能为空',
          offset: 100
        })
        return false
      }
      if (EnterDetail.length > 1) {
        this.$notify.error({
          title: '错误',
          message: '预售商品只能为一条',
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
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.salePrice === null || elem.salePrice === '' || elem.salePrice === undefined) {
          delete elem.salePrice
        }
        if (elem.deposit === null || elem.deposit === '' || elem.deposit === undefined) {
          delete elem.deposit
        }
        return elem
      })
      this.personalForm.depositBegintime = this.personalForm.startend[0]
      this.personalForm.depositEndtime = this.personalForm.startend[1]
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const alldata = this.extend(EnterDetail[0], this.personalForm)
      const parms = JSON.stringify(alldata)
      console.log(alldata)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addadvanceproduct(parms).then(res => {
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
      const view = { path: '/Advancemanage/AddAdvancemanage', name: 'AddAdvancemanage', fullPath: '/Advancemanage/AddAdvancemanage', title: 'AddAdvancemanage' }
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
