<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.paymentNumber +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('payment.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="12">-->
              <!--                <el-form-item :label="$t('payment.sourceType')" prop="sourceType" style="width: 100%;">-->
              <!--                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px">-->
              <!--                    <el-option value="1" label="采购订单" />-->
              <!--                    <el-option value="2" label="无来源" />-->
              <!--                  </el-select>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="12">
                <el-form-item :label="$t('payment.supplierId')" prop="supplierId" style="width: 100%;">
                  <el-input v-model="supplierId" style="margin-left: 18px;width: 200px" clearable @focus="handlechoose"/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.payMode')" style="width: 100%;">
                  <el-select v-model="personalForm.payMode" clearable style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in payModes"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="12">-->
              <!--                <el-form-item :label="$t('payment.applyDate')" prop="applyDate" style="width: 100%;">-->
              <!--                  <el-date-picker-->
              <!--                    v-model="personalForm.applyDate"-->
              <!--                    type="date"-->
              <!--                    value-format="yyyy-MM-dd"-->
              <!--                    style="margin-left: 18px;width: 200px"/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="12">
                <el-form-item :label="$t('payment.currency')" style="width: 100%;">
                  <el-select v-model="personalForm.currency" clearable style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="RMB"/>
                    <el-option value="2" label="USD"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.payAccount')" style="width: 100%;">
                  <el-input v-model="personalForm.payAccount" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.payAccountNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.payAccountNumber" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.remarks')" style="width: 100%;">
                  <el-input v-model="personalForm.remarks" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.rate')" style="width: 100%;">
                  <el-input v-model="personalForm.rate" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.payDate')" prop="payDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.payDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.offsetAdvance')" style="width: 100%;">
                  <el-input v-model="personalForm.offsetAdvance" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
                <span style="color: red;margin-left: 52px">预付款金额：{{ yufu }}</span>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('payment.moneyThis')" style="width: 100%;">
                  <el-input v-model="personalForm.moneyThis" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 class="form-name">附件信息</h2>
      <div class="container">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-form-item :label="$t('payment.picids')" style="width: 100%;margin-top: 1%">
            <el-button style="margin-bottom: 10px" size="small" type="success" @click="submitUpload">{{ $t('public.uploadimage') }}</el-button>
            <el-upload
              ref="upload"
              :on-preview="handlepicPreview"
              :on-remove="handlepicRemove"
              :on-success="handlepicsuccess"
              :data="picidsData"
              :auto-upload="false"
              :action="path"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <el-dialog :visible.sync="picidsVisible">
              <img :src="picidsImageUrl" width="100%" alt="">
            </el-dialog>
          </el-form-item >
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px;margin-bottom: 35px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >付款明细</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true }"
          :edit-rules="validRules"
          :summary-method="getSummaries"
          class="click-table1"
          show-summary
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <!--          <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible'}" prop="payDate" align="center" label="付款日期" min-width="180px"/>-->
          <el-editable-column prop="shouldMoney" align="center" label="应付金额" min-width="150px"/>
          <el-editable-column prop="paidMoney" align="center" label="已付金额" min-width="150px"/>
          <el-editable-column prop="payingMoney" align="center" label="未付金额" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" prop="invoiceNumber" align="center" label="发票号" min-width="200px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                v-model="scope.row.invoiceNumber"
                :disabled="scope.row.invoiceNumber !== 0"/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElSelect', options: invoiceTypes, type: 'visible'}" prop="invoiceType" align="center" label="发票类型" min-width="170px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="payThis" align="center" label="本次支付金额" min-width="170px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="advanceMoney" align="center" label="抵扣预付款" min-width="170px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updatepayment } from '@/api/payment'
import { shouldPayList } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { searchCategory } from '@/api/Supplier'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MySupplier from './MySupplier'
import MyApply from './MyApply'
import MyPlan from './MyPlan'
import MyDelivery from './MyDelivery'
import MyLnquiry from './MyLnquiry'
import MyOrder from './MyOrder'
export default {
  components: { MyOrder, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
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
      if (value === null) {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    return {
      path: '',
      payDate: null,
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 商品图片数据+++++++++++++++++++++++++开始
      // 商品图片控制器
      picidsVisible: false,
      // 商品图片地址
      picidsImageUrl: '',
      // 发送后端type
      picidsData: {
        type: 8
      },
      // 商品图片数据+++++++++++++++++++++++++结束
      invoiceTypes: [{ value: 1, label: '增值税' }, { value: 2, label: '其他' }],
      // 预付款金额
      yufu: '0.00',
      // 合计数据
      allNumber: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      allOthermoney: '',
      // 交货方式
      giveIds: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      paymentIds: [],
      // 点收人回显
      acceptPersonId: '',
      payModes: '',
      // 控制点收人
      deliverycontrol: false,
      // 控制源单为采购到货单
      ordercontrol: false,
      // 控制添加商品按钮
      addpro: true,
      // 控制从源单中选择按钮
      addsouce: true,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 部门数据
      depts: [],
      // 执行人回显
      handlePersonId: '',
      // 控制执行人
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
      // 采购申请单规则数据
      personalrules: {
        supplierId: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        applyDate: [
          { required: true, message: '请选择申请日期', trigger: 'change' }
        ],
        moneyThis: [
          { required: true, message: '请输入本次付款金额', trigger: 'blur' }
        ],
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        payDate: [
          { required: true, message: '请选择付款日期', trigger: 'change' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
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
      this.supplierId = this.personalForm.supplierName
      this.handlePersonId = this.personalForm.handlePersonName
      this.list2 = this.personalForm.paymentDetailVos
    }
  },
  created() {
    this.getTypes()
    this.getways()
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handlepicRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlepicPreview(file) {
      this.picidsImageUrl = file.url
      this.picidsVisible = true
    },
    handlepicsuccess(response) {
      this.personalForm.picids.push(response.data.content.picId)
      console.log(response.data.content.picId)
    },
    activeMethod({ row, rowIndex }) {
      if (row.invoiceNumber === '' || row.invoiceNumber === null) {
        return true
      }
      return false
    },
    // 总计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return (prev).toFixed(2)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[5] = ''
      sums[6] = ''
      sums[10] = ''
      sums[15] = ''
      sums[18] = ''
      sums[7] = ''
      console.log()
      this.personalForm.offsetAdvance = sums[9]
      this.personalForm.moneyThis = sums[8]
      return sums
    },
    getways() {
      if (this.$store.getters.useCountry === 1) {
        this.path = 'http://192.168.1.45:8080/erp/upload/uploadpic'
      }
      if (this.$store.getters.useCountry === 2) {
        this.path = 'http://192.168.1.45:8080/philippines/upload/uploadpic'
      }
      searchCategory(7).then(res => {
        if (res.data.ret === 200) {
          this.payModes = res.data.data.content.list
        }
      })
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
      }
    },
    // 从源单中添加商品
    handleAddSouce() {
      this.ordercontrol = true
    },
    order(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    allOrderinfo(val) {
      this.personalForm.supplierId = val.supplierId
      this.supplierId = val.supplierName
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
      this.personalForm.currencyId = val.moneyId
      this.personalForm.payAccount = val.account
      this.personalForm.payAccountNumber = val.accountName
      this.yufu = val.advanceMoney
      shouldPayList(val.id).then(res => {
        if (res.data.ret === 200) {
          this.$refs.editable.clear()
          const detailList = res.data.data.content.list
          for (let i = 0; i < detailList.length; i++) {
            this.$refs.editable.insert(detailList[i])
          }
        }
      })
    },
    // 执行人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 执行人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 点收人人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.acceptPersonId = val.personName
      this.personalForm.acceptPersonId = val.id
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
      this.supplierId = null
      this.handlePersonId = null
      this.stockPersonId = null
      this.ourContractorId = null
      this.acceptPersonId = null
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
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.shouldPayId === null || elem.shouldPayId === '' || elem.shouldPayId === undefined) {
          delete elem.shouldPayId
        }
        if (elem.payDate === null || elem.payDate === '' || elem.payDate === undefined) {
          delete elem.payDate
        }
        if (elem.shouldMoney === null || elem.shouldMoney === '' || elem.shouldMoney === undefined) {
          delete elem.shouldMoney
        }
        if (elem.paidMoney === null || elem.paidMoney === '' || elem.paidMoney === undefined) {
          delete elem.paidMoney
        }
        if (elem.payingMoney === null || elem.payingMoney === '' || elem.payingMoney === undefined) {
          delete elem.payingMoney
        }
        if (elem.invoiceNumber === null || elem.invoiceNumber === '' || elem.invoiceNumber === undefined) {
          delete elem.invoiceNumber
        }
        if (elem.invoiceType === null || elem.invoiceType === '' || elem.invoiceType === undefined) {
          delete elem.invoiceType
        }
        if (elem.payThis === null || elem.payThis === '' || elem.payThis === undefined) {
          delete elem.payThis
        }
        if (elem.advanceMoney === null || elem.advanceMoney === '' || elem.advanceMoney === undefined) {
          delete elem.advanceMoney
        }
        if (elem.supplierId === null || elem.supplierId === '' || elem.supplierId === undefined) {
          delete elem.supplierId
        }
        if (elem.paymentId === null || elem.paymentId === '' || elem.paymentId === undefined) {
          delete elem.paymentId
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
      updatepayment(parms, parms2, this.personalForm).then(res => {
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
          this.$refs.upload.clearFiles()
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
      this.$refs.upload.clearFiles()
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
    height: auto;
  }
  .el-col-12{
    width: 49%;
  }
</style>
