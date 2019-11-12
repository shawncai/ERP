<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.deliverNumber +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.title')" prop="title" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" @change="clearnumber">
                  <el-option value="1" label="销售出库单"/>
                  <el-option value="2" label="调拨单"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 200px" @focus="opensaleout"/>
              </el-form-item>
              <my-saleout :saleoutcontrol.sync="saleoutcontrol" @saleOutDetail="saleOutDetail" @saleOutdata="saleOutdata"/>
              <my-move :storagemovecontrol.sync="storagemovecontrol" @StoragemoveDetail="StoragemoveDetail" @Storagemovedata="Storagemovedata"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.requireArriveDate')" prop="requireArriveDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.requireArriveDate"
                  :picker-options="pickerOptions1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.deliverPersonId')" prop="deliverPersonId" style="width: 100%;">
                <el-input v-model="deliverPersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
              </el-form-item>
              <my-emp :control.sync="stockControl" @stockName="stockName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.requireType')" prop="requireType" style="width: 100%;">
                <el-select v-model="personalForm.requireType" style="margin-left: 18px;width: 200px" @change="clearrequire">
                  <el-option value="1" :label="$t('updates.kh')"/>
                  <el-option value="2" label="经销商"/>
                  <el-option value="3" :label="$t('updates.repository')"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.requireId')" prop="requireId" style="width: 100%;">
                <el-input v-model="requireId" style="margin-left: 18px;width: 200px" @focus="chooseCustomer"/>
              </el-form-item>
              <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
              <my-agent :agentcontrol.sync="agentcontrol" @agentdata="agentdata"/>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('DeliverGoods.stat')" style="width: 100%;">
                <el-select v-model="personalForm.stat" style="margin-left: 18px;width: 200px" disabled>
                  <el-option value="1" label="配送申请"/>
                  <el-option value="2" label="配送出库"/>
                  <el-option value="3" label="配送完成"/>
                  <el-option value="4" label="回车"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column prop="basicQuantity" align="center" label="基本数量" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" min-width="150px"/>
          <el-editable-column prop="deliverQuantity" align="center" label="配送数量" min-width="150px"/>
          <el-editable-column prop="deliverMoney" align="center" label="配送金额" min-width="150px"/>
          <el-editable-column prop="outRepositoryName" align="center" label="出货仓库" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150px"/>
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
import { updateDeliverGoods } from '@/api/DeliverGoods'
import { getdeptlist } from '@/api/EmployeeInformation'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MyCustomer from './MyCustomer'
import MyAgent from './MyAgent'
import MySaleout from './MySaleout'
import MyRepository from './MyRepository'
import MyMove from './MyMove'
export default {
  components: { MyMove, MyRepository, MySaleout, MyAgent, MyCustomer, MyDetail, MyEmp },
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
    return {
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
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
      // 配送单规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入配送单主题', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
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
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.deliverPersonId = this.personalForm.deliverPersonName
      this.requireId = this.personalForm.name
      this.list2 = this.personalForm.deliverGoodsDetailVos
    }
  },
  created() {
    this.getnationlist()
  },
  methods: {
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
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    saleOutdata(val) {
      this.personalForm.sourceNumber = val.number
      this.personalForm.address = val.address
      this.personalForm.deliverPersonId = val.transferPersonId
      this.deliverPersonId = val.transferPersonName
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
      this.personalForm.requireArriveDate = currentdate
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
        customerType: '1',
        backType: '2',
        backMoney: '0.00',
        sendType: '2',
        currency: '1',
        transDate: null
      }
      this.deliverPersonId = null
      this.requireId = null
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
      updateDeliverGoods(parms, parms2).then(res => {
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
    height: 950px;
  }
  .el-col-12{
    width: 49%;
  }
</style>
