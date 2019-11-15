<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('DeliverGoods.title')" prop="title" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('DeliverGoods.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="clearnumber">
                    <el-option value="1" label="销售出库单"/>
                    <el-option value="2" label="调拨单"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('DeliverGoods.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                  <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" @focus="opensaleout"/>
                </el-form-item>
                <my-saleout :saleoutcontrol.sync="saleoutcontrol" @saleOutDetail="saleOutDetail" @saleOutdata="saleOutdata"/>
                <my-move :storagemovecontrol.sync="storagemovecontrol" @StoragemoveDetail="StoragemoveDetail" @Storagemovedata="Storagemovedata"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('DeliverGoods.requireArriveDate')" prop="requireArriveDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.requireArriveDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('DeliverGoods.deliverDept')" prop="deliverDept" style="width: 100%;">
                  <el-select v-model="personalForm.deliverDept" style="margin-left: 18px;width: 200px">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :label="item.deptName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('DeliverGoods.deliverPersonId')" prop="deliverPersonId" style="width: 100%;">
                  <el-input v-model="deliverPersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                </el-form-item>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('DeliverGoods.requireType')" prop="requireType" style="width: 100%;">
                  <el-select v-model="personalForm.requireType" style="margin-left: 18px;width: 200px" @change="clearrequire">
                    <el-option :label="$t('updates.kh')" value="1"/>
                    <el-option value="2" label="经销商"/>
                    <el-option :label="$t('updates.repository')" value="3"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('DeliverGoods.requireId')" prop="requireId" style="width: 100%;">
                  <el-input v-model="requireId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
                </el-form-item>
                <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('DeliverGoods.stat')" style="width: 100%;">
                  <el-select v-model="personalForm.stat" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="配送申请"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('DeliverGoods.address')" style="width: 100%;">
                  <el-input v-model="personalForm.address" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >配送单明细</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
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
            <el-editable-column prop="color" align="center" :label="$t('updates.ys')" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <!-- <el-editable-column prop="basicQuantity" align="center" label="基本数量" min-width="150px"/> -->
            <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" min-width="150px"/>
            <el-editable-column prop="deliverQuantity" align="center" label="配送数量" min-width="150px"/>
            <el-editable-column prop="deliverMoney" align="center" label="配送金额" min-width="150px"/>
            <el-editable-column prop="outRepositoryName" align="center" label="出货仓库" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150px"/>
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
import { addDeliverGoods } from '@/api/DeliverGoods'
import { getdeptlist } from '@/api/EmployeeInformation'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MyCustomer from './components/MyCustomer'
import MyAgent from './components/MyAgent'
import MySaleout from './components/MySaleout'
import MyRepository from './components/MyRepository'
import MyMove from './components/MyMove'
var _that
export default {
  name: 'AddDeliverGoods',
  components: { MyMove, MyRepository, MySaleout, MyAgent, MyCustomer, MyDetail, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.deliverPersonId === undefined || this.deliverPersonId === null || this.deliverPersonId === '') {
        callback(new Error('请选择配送人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.requireId === undefined || this.requireId === null || this.requireId === '') {
        callback(new Error('请选择要货方'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('请选择源单编号'))
      } else {
        callback()
      }
    }
    const validatePass11 = (rule, value, callback) => {
      if (this.personalForm.sourceType === undefined || this.personalForm.sourceType === null || this.personalForm.sourceType === '') {
        callback(new Error('请选择源单类型'))
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
      // 控制调拨单
      storagemovecontrol: false,
      // 回显要货方
      requireId: '',
      // 控制仓库
      repositorycontrol: false,
      // 控制客户
      customercontrol: false,
      // 控制经销商
      agentcontrol: false,
      // 控制销售出库单
      saleoutcontrol: false,
      // 回显配送人
      deliverPersonId: '',
      // 控制配送人
      stockControl: false,
      // 部门列表
      depts: [],
      // 配送单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        requireArriveDate: null,
        stat: '1'
      },
      // 配送单规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入配送单主题', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, validator: validatePass11, trigger: 'change' }
        ],
        deliverPersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        requireArriveDate: [
          { required: true, message: '请选择要求到货日期', trigger: 'change' }
        ],
        deliverDept: [
          { required: true, message: '请选择配送部门', trigger: 'change' }
        ],
        requireType: [
          { required: true, message: '请选择要货类型', trigger: 'change' }
        ],
        requireId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ]
      },
      // 订单明细数据
      list2: [],
      // 明细列表规则
      validRules: {
      }
    }
  },
  created() {
    this.getdatatime()
    this.getnationlist()
  },
  beforeCreate() {
    _that = this
  },
  mounted() {
    this.getinformation()
  },
  methods: {
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.personalForm.sourceType = '1'
        this.personalForm.sourceNumber = this.$store.getters.empcontract.number
        this.personalForm.address = this.$store.getters.empcontract.address
        if (this.$store.getters.empcontract.transferPersonId !== null) {
          this.personalForm.deliverPersonId = this.$store.getters.empcontract.transferPersonId
          this.deliverPersonId = this.$store.getters.empcontract.transferPersonName
        }
        for (let i = 0; i < this.$store.getters.empcontract.saleOutDetailVos.length; i++) {
          this.$store.getters.empcontract.saleOutDetailVos[i].productType = this.$store.getters.empcontract.saleOutDetailVos[i].productTypeName
          this.$store.getters.empcontract.saleOutDetailVos[i].basicQuantity = this.$store.getters.empcontract.saleOutDetailVos[i].quantity
          this.$store.getters.empcontract.saleOutDetailVos[i].deliverQuantity = this.$store.getters.empcontract.saleOutDetailVos[i].quantity
          this.$store.getters.empcontract.saleOutDetailVos[i].deliverMoney = this.$store.getters.empcontract.saleOutDetailVos[i].money
          this.$store.getters.empcontract.saleOutDetailVos[i].price = this.$store.getters.empcontract.saleOutDetailVos[i].salePrice
          this.$store.getters.empcontract.saleOutDetailVos[i].outRepositoryId = this.$store.getters.empcontract.saleRepositoryId
          this.$store.getters.empcontract.saleOutDetailVos[i].outRepositoryName = this.$store.getters.empcontract.saleRepositoryName
          this.$store.getters.empcontract.saleOutDetailVos[i].outRepositoryName = this.$store.getters.empcontract.saleRepositoryName
          this.$refs.editable.insert(this.$store.getters.empcontract.saleOutDetailVos[i])
        }
        this.$store.dispatch('getempcontract', '')
      }
    },
    // 选择要货方时清理
    clearrequire() {
      this.requireId = ''
      this.personalForm.requireId = ''
    },
    // 选择源单时清理
    clearnumber() {
      this.personalForm.sourceNumber = ''
      this.deliverPersonId = ''
      this.personalForm.deliverPersonId = ''
      this.personalForm.address = ''
    },
    // 选择客户focus
    chooseCustomer() {
      if (this.personalForm.requireType === '2') {
        this.agentcontrol = true
      } else if (this.personalForm.requireType === '1') {
        this.customercontrol = true
      } else if (this.personalForm.requireType === '3') {
        this.repositorycontrol = true
      }
    },
    customerdata(val) {
      console.log(val)
      this.personalForm.requireId = val.id
      this.requireId = val.customerName
    },
    agentdata(val) {
      this.personalForm.requireId = val.id
      this.requireId = val.agentName
    },
    // 仓库列表focus事件触发
    repositoryname(val) {
      this.requireId = val.repositoryName
      this.personalForm.requireId = val.id
    },
    // 选择源单编号
    opensaleout() {
      if (this.personalForm.sourceType === '1') {
        this.saleoutcontrol = true
      } else if (this.personalForm.sourceType === '2') {
        this.storagemovecontrol = true
      }
    },
    // 源单类型为销售出库单时
    saleOutDetail(val) {
      console.log('abc', val)
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    saleOutdata(val) {
      this.personalForm.sourceNumber = val.number
      this.personalForm.address = val.address
      if (val.transferPersonId !== null) {
        this.personalForm.deliverPersonId = val.transferPersonId
        this.deliverPersonId = val.transferPersonName
      }
    },
    // 源单为调拨单
    StoragemoveDetail(val) {
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    Storagemovedata(val) {
      this.personalForm.sourceNumber = val.moveNumber
    },
    // 部门列表
    getnationlist() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        } else {
          console.log('部门列表出错')
        }
      })
    },
    // 补充月份和日子的0
    getzero(obj) {
      if (obj < 10) return '0' + '' + obj
      else return obj
    },
    getdatatime() { // 默认显示今天
      const date = new Date()
      date.setTime(date.getTime())
      this.personalForm.requireArriveDate = date.getFullYear() + '-' + this.getzero(date.getMonth() + 1) + '-' + this.getzero(date.getDate())
      console.log(this.personalForm.requireArriveDate)
    },
    // 配送员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 配送员回显
    stockName(val) {
      this.deliverPersonId = val.personName
      this.personalForm.deliverPersonId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        requireArriveDate: null,
        stat: '1'
      }
      this.deliverPersonId = null
      this.requireId = null
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
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
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.deliverQuantity === null || elem.deliverQuantity === '' || elem.deliverQuantity === undefined) {
          delete elem.deliverQuantity
        }
        if (elem.deliverMoney === null || elem.deliverMoney === '' || elem.deliverMoney === undefined) {
          delete elem.deliverMoney
        }
        if (elem.outRepositoryId === null || elem.outRepositoryId === '' || elem.outRepositoryId === undefined) {
          delete elem.outRepositoryId
        }
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          delete elem.batch
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
          addDeliverGoods(parms, parms2, this.personalForm).then(res => {
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
      const view = { path: '/DeliverGoods/AddDeliverGoods', name: 'AddDeliverGoods', fullPath: '/DeliverGoods/AddDeliverGoods', title: 'AddDeliverGoods' }
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
