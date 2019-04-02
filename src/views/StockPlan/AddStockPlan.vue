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
                <el-form-item :label="$t('StockPlan.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.stockType')" prop="stockType" style="width: 100%;">
                  <el-select v-model="personalForm.stockType" style="margin-left: 18px;width: 218px" @focus="updatecountry">
                    <el-option
                      v-for="(item, index) in types"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.planPersonId')" prop="planPersonId" style="width: 100%;">
                  <el-input v-model="planPersonId" style="margin-left: 18px" clearable @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.stockPersonId')" prop="stockPersonId" style="width: 100%;">
                  <el-input v-model="stockPersonId" style="margin-left: 18px" clearable @focus="handlechooseDelivery"/>
                  <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.stockDeptId')" prop="stockDeptId" style="width: 100%;">
                  <el-select v-model="personalForm.stockDeptId" clearable style="margin-left: 18px;width: 218px">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.sourceType')" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 218px" @change="chooseType">
                    <el-option value="1" label="采购申请" />
                    <el-option value="2" label="采购需求" />
                    <el-option value="3" label="无来源" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.planDate')" prop="planDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.planDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >采购计划来源明细</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button :disabled="addpro" @click="handleAddproduct">添加商品</el-button>
          <my-detail :control.sync="control" @product="productdetail" @product2="productdetail2"/>
          <el-button :disabled="addsouce" style="width: 130px" @click="handleAddSouce">从源单中选择</el-button>
          <my-apply :applycontrol.sync="applycontrol" @apply="apply" @apply2="apply2"/>
          <my-require :requirecontrol.sync="requirecontrol" @require="requiredata" @require2="requiredata2"/>
          <el-button type="danger" @click="deleteEdit">删除</el-button>
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
            style="width: 100%"
            @selection-change="deleteChange">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column label="序号" min-width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
            <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
            <el-editable-column prop="productType" align="center" label="规格" min-width="150px"/>
            <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
            <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
            <el-editable-column prop="basicPrice" align="center" label="单价" min-width="150px">
              <template slot-scope="scope">
                <p>{{ basicPrice(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible' ,events: {change: changeDate}}" prop="planQuantity" align="center" label="计划数量" min-width="150px"/>
            <el-editable-column prop="planMoney" align="center" label="计划金额" min-width="150px">
              <template slot-scope="scope">
                <p>{{ planMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible', events: {change: changeDate}}" prop="planDeliveryDate" align="center" label="计划交货日期" min-width="170px"/>
            <el-editable-column prop="applyReason" align="center" label="申请原因" min-width="150px"/>
            <el-editable-column prop="sourceNumber" align="center" label="源单编号" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="supplierName" align="center" label="供应商" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input v-model="scope.row.supplierName" :value="scope.row.supplierName" @focus="handlechoose"/>
                <my-supplier :control.sync="empcontrol" @supplierName="personName(scope, $event)"/>
              </template>
            </el-editable-column>
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >采购计划明细</h2>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list3"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            :summary-method="getSummaries"
            show-summary
            class="click-table1"
            stripe
            border
            size="medium"
            style="width: 100%">
            <el-editable-column label="序号" width="60" align="center" type="index"/>
            <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
            <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
            <el-editable-column prop="productType" align="center" label="规格" min-width="150px"/>
            <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
            <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
            <el-editable-column prop="basicPrice" align="center" label="单价" min-width="150px">
              <template slot-scope="scope">
                <p>{{ basicPrice(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="planQuantity" align="center" label="计划数量" min-width="150px"/>
            <el-editable-column prop="planMoney" align="center" label="计划金额" min-width="150px">
              <template slot-scope="scope">
                <p>{{ planMoney(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'default'}" prop="planDeliveryDate" align="center" label="计划交货日期" min-width="170px"/>
            <el-editable-column prop="applyReason" align="center" label="申请原因" min-width="150px"/>
            <el-editable-column prop="sourceNumber" align="center" label="源单编号" min-width="150px"/>
            <el-editable-column prop="supplierName" align="center" label="供应商" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">合计信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.heji1')" style="width: 100%;">
                  <el-input v-model="heji1" style="margin-left: 18px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockPlan.heji2')" style="width: 100%;">
                  <el-input v-model="heji2" style="margin-left: 18px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">保存</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addstockplan } from '@/api/StockPlan'
import { getdeptlist } from '@/api/BasicSettings'
import { productlist } from '@/api/public'
import { searchStockCategory } from '@/api/StockCategory'
import MyEmp from './components/MyEmp'
import MyDelivery from '../DailyAdjust/components/MyDelivery'
import MyDetail from './components/MyDetail'
import MyApply from './components/MyApply'
import MySupplier from '../Product/components/MySupplier'
import MyRequire from './components/MyRequire'
export default {
  name: 'AddStockPlan',
  components: { MyRequire, MySupplier, MyApply, MyDetail, MyDelivery, MyEmp },
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
      // 合计数据
      heji1: '',
      heji2: '',
      // 供应商控制
      empcontrol: false,
      // 控制从采购需求中选择
      requirecontrol: false,
      // 控制从采购申请中选择
      applycontrol: false,
      // 控制添加商品按钮
      addpro: true,
      // 控制从源单中选择按钮
      addsouce: true,
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 计划人回显
      planPersonId: '',
      // 控制计划人
      stockControl: false,
      // 采购员回显
      stockPersonId: '',
      // 控制采购员
      deliverycontrol: false,
      // 类别数据
      types: [],
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 控制商品列表窗口
      control: false,
      // 采购计划单信息数据
      personalForm: {
        createPersonId: 3,
        countryId: 1,
        repositoryId: 438,
        regionId: 2
      },
      // 采购计划单规则数据
      personalrules: {
        stockType: [
          { required: true, message: '请选择采购类别', trigger: 'change' }
        ],
        planDate: [
          { required: true, message: '请选择计划日期', trigger: 'change' }
        ],
        stockDeptId: [
          { required: true, message: '请选择采购部门', trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        planPersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        stockPersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ]
      },
      // 采购计划单明细数据
      list2: [],
      // 采购计划明细
      list3: [],
      // 采购计划单明细列表规则
      validRules: {
      }
    }
  },
  created() {
    this.getTypes()
  },
  methods: {
    // 计划金额
    planMoney(row) {
      row.planMoney = row.basicPrice * row.planQuantity
      return row.planMoney
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
              return prev
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      this.heji1 = sums[8]
      this.heji2 = sums[7]
      sums[1] = ''
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[6] = ''
      sums[9] = ''
      sums[10] = ''
      sums[11] = ''
      sums[12] = ''
      return sums
    },
    // 计算单价和供应商
    basicPrice(row) {
      productlist(row.productCode).then(res => {
        if (res.data.ret === 200) {
          row.basicPrice = res.data.data.content.list[0].purchasePrice
        }
      })
      return row.basicPrice
    },
    // 两表联动
    changeDate(scope, value) {
      this.$refs.editable2.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < nowlistdata.length; i++) {
        this.$refs.editable2.insert(nowlistdata[i])
      }
    },
    // 供货商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供货商列表返回数据
    personName(scope, val) {
      scope.row.supplierName = val.supplierName
      scope.row.supplierId = val.id
      this.$refs.editable2.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      console.log(nowlistdata)
      for (let i = 0; i < nowlistdata.length; i++) {
        this.$refs.editable2.insert(nowlistdata[i])
      }
    },

    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1' || this.personalForm.sourceType === '2') {
        this.addsouce = false
        this.addpro = true
        this.$refs.editable.clear()
        this.$refs.editable2.clear()
      } else if (this.personalForm.sourceType === '3') {
        this.addpro = false
        this.addsouce = true
        this.$refs.editable.clear()
        this.$refs.editable2.clear()
      }
    },
    // 无来源添加商品
    handleAddproduct() {
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
    productdetail2(val) {
      console.log(val)
      const nowlistdata2 = this.$refs.editable2.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata2.length; j++) {
          if (val[i].productCode === nowlistdata2[j].productCode) {
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
    // 从源单中添加商品
    handleAddSouce() {
      if (this.personalForm.sourceType === '1') {
        this.applycontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.requirecontrol = true
      }
    },
    apply(val) {
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
    apply2(val) {
      const nowlistdata2 = this.$refs.editable2.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata2.length; j++) {
          if (val[i].productCode === nowlistdata2[j].productCode) {
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
    // 采购需求数据
    requiredata(val) {
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
    requiredata2(val) {
      const nowlistdata2 = this.$refs.editable2.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata2.length; j++) {
          if (val[i].productCode === nowlistdata2[j].productCode) {
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
    // 删除数据
    deleteEdit() {
      this.$refs.editable.removeSelecteds()
      console.log(this.$refs.editable)
      const nowlistdata2 = this.$refs.editable2.getRecords()
      for (let i = 0; i < nowlistdata2.length; i++) {
        for (let j = 0; j < this.choosedata.length; j++) {
          if (nowlistdata2[i].productCode === this.choosedata[j].productCode) {
            this.$refs.editable2.remove(nowlistdata2[i])
          }
        }
      }
      console.log(nowlistdata2)
    },
    deleteChange(val) {
      this.choosedata = val
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
    // 计划人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 计划人回显
    stockName(val) {
      this.planPersonId = val.personName
      this.personalForm.planPersonId = val.id
    },
    // 采购人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    // 采购员回显
    deliveryName(val) {
      this.stockPersonId = val.personName
      this.personalForm.stockPersonId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: 3,
        countryId: 1,
        repositoryId: 438,
        regionId: 2
      }
      this.planPersonId = null
      this.stockPersonId = null
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      const EnterDetail2 = this.$refs.editable2.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }
      EnterDetail2.map(function(elem) {
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
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.basicPrice === null || elem.basicPrice === '' || elem.basicPrice === undefined) {
          delete elem.basicPrice
        }
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.planQuantity === null || elem.planQuantity === '' || elem.planQuantity === undefined) {
          delete elem.planQuantity
        }
        if (elem.planMoney === null || elem.planMoney === '' || elem.planMoney === undefined) {
          delete elem.planMoney
        }
        if (elem.applyReason === null || elem.applyReason === '' || elem.applyReason === undefined) {
          delete elem.applyReason
        }
        if (elem.sourceNumber === null || elem.sourceNumber === '' || elem.sourceNumber === undefined) {
          delete elem.sourceNumber
        }
        if (elem.planDeliveryDate === null || elem.planDeliveryDate === '' || elem.planDeliveryDate === undefined) {
          delete elem.planDeliveryDate
        }
        if (elem.supplierId === null || elem.supplierId === '' || elem.supplierId === undefined) {
          delete elem.supplierId
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
          addstockplan(parms, parms2, this.personalForm).then(res => {
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
      const view = { path: '/StockPlan/AddStockPlan', name: 'AddStockPlan', fullPath: '/StockPlan/AddStockPlan', title: 'AddStockPlan' }
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
