<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">

        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top:  25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('SupplierAdjust.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SupplierAdjust.applyPersonId')" prop="applyPersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="applyPersonId" :disabled="IsStockPersonId" style="width: 200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SupplierAdjust.deptId')" prop="deptId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.deptId" style="width: 200px" @change="change()">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SupplierAdjust.supplierId')" prop="supplierId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="supplierId" style="width: 200px" @focus="handlechoose"/>
                  <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SupplierAdjust.applyDate')" prop="applyDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.applyDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">

        <div ref="fuzhu" class="form-name" >{{ $t('updates.tzdmx') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" :datalist = "datalist" @product="productdetail"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            :summary-method="getSummaries"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="type" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cgdyj')" prop="oldPrice" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,max: 100,precision: 2,controls:false}, type: 'visible'}" :label="$t('updates.cgdxj')" prop="newPrice" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.newPrice"
                  @input="getprice(scope.row)"/>
              </template>
            </el-editable-column>
            <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" :label="$t('updates.cgdxj')" prop="newPrice" align="center" min-width="150px"/> -->
            <el-editable-column :label="$t('updates.oldIncludeTaxPrice')" prop="oldIncludeTaxPrice" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" :label="$t('updates.newIncludeTaxPrice')" prop="newIncludeTaxPrice" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.newIncludeTaxPrice"
                  @input="getincludeTaxPrice(scope.row, scope)"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.oldTaxRate')" prop="oldTaxRate" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" :label="$t('updates.newTaxRate')" prop="newTaxRate" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.newTaxRate"
                  @input="gettaxRate(scope.row, scope)"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.oldSalePrice')" prop="oldSalePrice" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 2}, type: 'visible'}" :label="$t('updates.newSalePrice')" prop="newSalePrice" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.newSalePrice"
                />
              </template>
            </el-editable-column>
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
import { addSupplierAdjust } from '@/api/SupplierAdjust'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import { countlist } from '@/api/public'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MySupplier from './components/MySupplier'
import MyApply from './components/MyApply'
import MyPlan from './components/MyPlan'
import MyDelivery from './components/MyDelivery'
import MyLnquiry from './components/MyLnquiry'
import MyContract from './components/MyContract'
var _that
export default {
  name: 'AddSupplierAdjust',
  components: { MyContract, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.supplierId === undefined || this.supplierId === null || this.supplierId === '') {
        callback(new Error('请选择供应商'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(this.signPersonId)
      if (this.signPersonId === undefined || this.signPersonId === null || this.signPersonId === '') {
        callback(new Error('请选择签约人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.applyPersonId)
      if (this.applyPersonId === undefined || this.applyPersonId === null || this.applyPersonId === '') {
        callback(new Error('请选择申请人'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      console.log(this.personalForm.deptId)
      if (this.personalForm.deptId === undefined || this.personalForm.deptId === null || this.personalForm.deptId === '') {
        callback(new Error('请选择部门'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      datalist: [],
      // 带入的供应商
      supp: null,
      // 控制币种是否可以编辑
      IsCurrency: false,
      // 控制我方签约人是否可以编辑
      IsSignPersonId: false,
      // 控制支付方式是否可以编辑
      IsPayMode: false,
      // 控制结算方式是否可以编辑
      IsSettleMode: false,
      // 控制交货方式是否可以编辑
      IsDeliveryMode: false,
      // 控制供应商是否可以编辑
      IsSupplierId: false,
      // 控制采购员是否可以编辑
      IsStockPersonId: false,
      // 控制采购类别是否可以编辑
      IsStockTypeId: false,
      // 控制部门是否可以编辑
      IsDeptId: false,
      // 合计数据
      allNumber: '',
      allMoney: '',
      allTaxMoney: '',
      allIncludeTaxMoney: '',
      allDiscountMoney: '',
      allMoneyMoveDiscount: '',
      allOhterMoney: '',
      // 交货方式
      giveIds: [],
      // 运送方式
      transportIds: [],
      // 结算方式
      paymentIds: [],
      // 我方签约人回显
      signPersonId: '',
      // 控制我方签约人
      deliverycontrol: false,
      // 控制源单为询价单时
      inquirycontrol: false,
      // 控制源单为采购合同时
      contractcontrol: false,
      // 控制源单为采购计划时
      plancontrol: false,
      // 控制源单为采购申请时
      applycontrol: false,
      // 控制添加商品按钮
      addpro: false,
      // 控制从源单中选择按钮
      addsouce: true,
      payModes: [],
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 采购员回显
      applyPersonId: this.$store.getters.name,
      // 控制采购员
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
      supplierIdDetail: [],
      // 采购申请单信息数据
      personalForm: {
        applyPersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1,
        deptId: this.$store.getters.deptId,
        sourceType: '5',
        currency: '1',
        applyDate: null
      },
      // 采购申请单规则数据
      personalrules: {
        signPersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        applyPersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        supplierId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        applyDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        deptId: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        stockTypeId: [
          { required: true, message: '请选择采购类别', trigger: 'change' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请单明细列表规则
      validRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'change' }
        ],
        stockQuantity: [
          { required: true, message: '请输入采购数量', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入单价', trigger: 'blur' }
        ],
        includeTaxPrice: [
          { required: true, message: '请输入含税价', trigger: 'blur' }
        ]
      },
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: []
    }
  },
  created() {
    this.getTypes()
    this.getdatatime()
  },

  mounted() {
    this.getinformation4()
  },
  activated() {
    this.getinformation4()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 计算单价
    getprice(row) {
      row.newIncludeTaxPrice = (row.newPrice * (1 + row.newTaxRate / 100)).toFixed(2)
    },
    // 通过税率计算含税价
    gettaxRate(row, scope) {
      if (row !== '' && row !== null && row !== undefined && scope.$index === 0) {
        if (row.newTaxRate !== '' && row.newTaxRate !== null && row.newTaxRate !== undefined) {
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].temp = i
          }
          for (let i = row.temp; i < this.list2.length; i++) {
            if (this.list2[i].newTaxRate !== null && this.list2[i].newTaxRate !== 0 && this.list2[i].newTaxRate !== '' && this.list2[i].newTaxRate !== undefined) {
              // this.list2[i].requireDate = row.requireDate
            } else {
              console.log(222)
              this.list2[i].newTaxRate = row.newTaxRate
            }
          }
          console.log(row)
        }
      }
      if (row.newIncludeTaxPrice !== 0) {
        row.newIncludeTaxPrice = (row.newPrice * (1 + row.newTaxRate / 100)).toFixed(2)
      }
    },
    // 通过含税价计算税率
    getincludeTaxPrice(row, scope) {
      if (row.newPrice !== 0) {
        row.newTaxRate = ((row.newIncludeTaxPrice / row.newPrice - 1) * 100).toFixed(2)
        console.log(row.newTaxRate)
      }
    },
    checkStock(row) {
      console.log('this.moreaction.length', this.moreaction.length)
      if (this.moreaction.length > 1 || this.moreaction.length === 0) {
        this.$message.error('请选择单个商品')
      } else {
        countlist(this.$store.getters.repositoryId, this.$store.getters.regionId, this.moreaction[0].productCode).then(res => {
          console.log(res)
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content.list)
            this.list111 = res.data.data.content.list
            this.receiptVisible2 = true
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
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
      this.personalForm.applyDate = currentdate
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
              return (Number(prev) + Number(curr)).toFixed(2)
            } else {
              return (Number(prev)).toFixed(2)
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
      sums[7] = ''
      sums[8] = ''
      sums[9] = ''
      sums[13] = ''
      sums[14] = ''
      sums[16] = ''
      sums[17] = ''
      sums[18] = ''
      sums[19] = ''
      this.allNumber = sums[6]
      this.allMoney = sums[10]
      this.allTaxMoney = sums[12]
      this.allIncludeTaxMoney = sums[11]
      this.allDiscountMoney = sums[15]
      this.allMoneyMoveDiscount = sums[11] - sums[15]
      return sums
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
      this.datalist = val.supplierDetailVos
      this.$refs.editable.clear()
      for (let i = 0; i < val.supplierDetailVos.length; i++) {
        val.supplierDetailVos[i].id = ''
        val.supplierDetailVos[i].typeId = val.supplierDetailVos[i].type
        val.supplierDetailVos[i].type = val.supplierDetailVos[i].productTypeName
        val.supplierDetailVos[i].oldPrice = val.supplierDetailVos[i].price
        val.supplierDetailVos[i].oldIncludeTaxPrice = val.supplierDetailVos[i].includeTaxPrice
        val.supplierDetailVos[i].oldTaxRate = val.supplierDetailVos[i].taxRate
        this.$refs.editable.insert(val.supplierDetailVos[i])
      }
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
      this.supp = val.id
      this.personalForm.deliveryMode = val.giveId
      this.personalForm.settleMode = val.paymentId
      if (val.moneyId !== null && val.moneyId !== undefined && val.moneyId !== '') {
        this.personalForm.currency = String(val.moneyId)
      }
      this.supplierIdDetail = val.supplierDetailVos
    },
    // 采购员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购员回显
    stockName(val) {
      this.applyPersonId = val.personName
      this.personalForm.applyPersonId = val.id
      this.personalForm.deptId = val.deptId
    },
    // 我方签约人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.signPersonId = val.personName
      this.personalForm.signPersonId = val.id
    },
    // 采购申请明细来源
    handleAddproduct() {
      if (this.personalForm.supplierId === null || this.personalForm.supplierId === undefined || this.personalForm.supplierId === '') {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择供应商',
          duration: 0
        })
        return false
      }
      // this.supp = this.personalForm.supplierId
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      const nowlistdata2 = this.supplierIdDetail
      for (let i = 0; i < val.length; i++) {
        console.log(val[i].price)
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
        console.log('nowlistdata2', nowlistdata2)
        console.log('val', val)
        for (let p = 0; p < nowlistdata2.length; p++) {
          if (val[i].productCode === nowlistdata2[p].productCode) {
            console.log('success')
            val[i].discountRate = nowlistdata2[p].discountRate
            val[i].price = nowlistdata2[p].price
            val[i].includeTaxPrice = nowlistdata2[p].includeTaxPrice
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        applyPersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        isVat: 1,
        deptId: this.$store.getters.deptId,
        sourceType: '5',
        currency: '1'
      }
      this.personalForm.applyDate = new Date()
      this.supplierId = null
      this.inquiryPersonId = null
      this.applyPersonId = this.$store.getters.name
      this.signPersonId = null
      // 控制币种是否可以编辑
      this.IsCurrency = false
      // 控制我方签约人是否可以编辑
      this.IsSignPersonId = false
      // 控制支付方式是否可以编辑
      this.IsPayMode = false
      // 控制结算方式是否可以编辑
      this.IsSettleMode = false
      // 控制交货方式是否可以编辑
      this.IsDeliveryMode = false
      // 控制供应商是否可以编辑
      this.IsSupplierId = false
      // 控制采购员是否可以编辑
      this.IsStockPersonId = false
      // 控制采购类别是否可以编辑
      this.IsStockTypeId = false
      // 控制部门是否可以编辑
      this.IsDeptId = false
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 保存操作
    handlesave() {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
            if (EnterDetail.length === 0) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.mxbbnwk'),
                offset: 100
              })
              return false
            }
            let mk = 0
            EnterDetail.map(function(elem) {
              return elem
            }).forEach(function(elem) {
              if (elem.newPrice === null || elem.newPrice === '' || elem.newPrice === undefined) {
                mk = 1
              }
              if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
                delete elem.productCode
              }
              if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
                delete elem.productName
              }
              if (elem.type === null || elem.type === '' || elem.type === undefined) {
                delete elem.type
              }
              if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
                delete elem.unit
              }
              if (elem.price === null || elem.price === '' || elem.price === undefined) {
                delete elem.price
              }
              if (elem.stockQuantity === null || elem.stockQuantity === '' || elem.stockQuantity === undefined) {
                delete elem.stockQuantity
              }
              if (elem.deliveryDate === null || elem.deliveryDate === '' || elem.deliveryDate === undefined) {
                delete elem.deliveryDate
              }
              if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
                delete elem.remarks
              }
              if (elem.sourceNumber === null || elem.sourceNumber === '' || elem.sourceNumber === undefined) {
                delete elem.sourceNumber
              }
              if (elem.sourceSerialNumber === null || elem.sourceSerialNumber === '' || elem.sourceSerialNumber === undefined) {
                delete elem.sourceSerialNumber
              }
              if (elem.includeTaxPrice === null || elem.includeTaxPrice === '' || elem.includeTaxPrice === undefined) {
                delete elem.includeTaxPrice
              }
              // if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
              //   delete elem.taxRate
              // }
              if (elem.taxRate !== null || elem.taxRate !== '' || elem.taxRate !== undefined) {
                elem.taxRate = elem.taxRate / 100
              }
              // if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
              //   delete elem.discountRate
              // }
              if (elem.discountRate !== null || elem.discountRate !== '' || elem.discountRate !== undefined) {
                elem.discountRate = elem.discountRate / 100
              }
              if (elem.money === null || elem.money === '' || elem.money === undefined) {
                delete elem.money
              }
              if (elem.includeTaxMoney === null || elem.includeTaxMoney === '' || elem.includeTaxMoney === undefined) {
                delete elem.includeTaxMoney
              }
              if (elem.tax === null || elem.tax === '' || elem.tax === undefined) {
                delete elem.tax
              }
              if (elem.discountMoney === null || elem.discountMoney === '' || elem.discountMoney === undefined) {
                delete elem.discountMoney
              }
              if (elem.newSalePrice === 0 || elem.newSalePrice === 0.00 || elem.newSalePrice === null || elem.newSalePrice === '' || elem.newSalePrice === undefined) {
                delete elem.newSalePrice
              }
              return elem
            })
            if (mk === 1) {
              this.$notify.error({
                title: 'wrong',
                message: '商品明细中价格必填',
                offset: 100
              })
              return false
            }
            const parms2 = JSON.stringify(EnterDetail)
            const Data = this.personalForm
            for (const key in Data) {
              if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
                delete Data[key]
              }
              if (key === 'judgeStat') {
                delete Data[key]
              }
            }
            const parms = JSON.stringify(Data)
            addSupplierAdjust(parms, parms2, this.personalForm).then(res => {
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
          }).catch(valid => {
            console.log('error submit!!')
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
      const view = { path: '/SupplierAdjust/AddSupplierAdjust', name: 'AddSupplierAdjust', fullPath: '/SupplierAdjust/AddSupplierAdjust', title: 'AddSupplierAdjust' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 获取信息
    getinformation4() {
      if (this.$store.getters.empcontract4) {
        console.log('getempcontract4', this.$store.getters.empcontract4)
        this.supplierId = this.$store.getters.empcontract4[0].supplierName
        this.personalForm.supplierId = this.$store.getters.empcontract4[0].id
        if (this.$refs.editable.getRecords().length !== 0 && this.$refs.editable.getRecords() !== undefined && this.$refs.editable.getRecords() !== null) {
          this.$refs.editable.clear()
        }
        for (let i = 0; i < this.$store.getters.empcontract4[0].supplierDetailVos.length; i++) {
          this.$store.getters.empcontract4[0].supplierDetailVos[i].type = this.$store.getters.empcontract4[0].supplierDetailVos[i].productTypeName
          this.$store.getters.empcontract4[0].supplierDetailVos[i].oldPrice = this.$store.getters.empcontract4[0].supplierDetailVos[i].price
          this.$refs.editable.insert(this.$store.getters.empcontract4[0].supplierDetailVos[i])
        }
        this.$store.dispatch('getempcontract4', '')
      }
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
