<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.id +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.depositBegintime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.depositBegintime"
                    :picker-options="pickerOptions0"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"
                    @change="cleardeposit"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.depositEndtime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.depositEndtime"
                    :picker-options="pickerOptions1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.isSale')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isSale" style="margin-left: 18px;width: 200px">
                    <el-radio :label="1" style="width: 100px">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.finalBegintime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.finalBegintime"
                    :picker-options="pickerOptions2"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"
                    @change="clearfinal"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.finalEndtime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.finalEndtime"
                    :picker-options="pickerOptions3"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.advanceEndtime')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.advanceEndtime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.advanceMode')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.advanceMode" style="margin-left: 18px;width: 200px">
                    <el-radio :label="1" style="width: 100px">一口价</el-radio>
                    <el-radio :label="2">阶梯价</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.advanceStat')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.advanceStat" style="margin-left: 18px;width: 200px">
                    <el-radio :label="1" style="width: 90px">开启</el-radio>
                    <el-radio :label="2">暂不开启</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >预售商品</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">添加商品</el-button>
        <my-detail :control.sync="control" @product="productdetail"/>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">删除</el-button>
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
          <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
          <el-editable-column prop="productType" align="center" label="规格" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
          <el-editable-column prop="salePrice" align="center" label="单价" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="deposit" align="center" label="预售定金" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">取消</el-button>
        <el-button type="primary" @click="handleEditok()">保存</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updateadvanceproduct } from '@/api/Advancemanage'
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
import MyArrival from './MyArrival'
export default {
  components: { MyArrival, MyLnquiry, MyDelivery, MyPlan, MyApply, MySupplier, MyDetail, MyEmp },
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
      if (value === '') {
        callback(new Error('请选择'))
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
          if (this.personalForm.depositEndtime !== null) {
            return time.getTime() > new Date(this.personalForm.finalEndtime).getTime() - 8.64e7
          }
        }
      },
      pickerOptions3: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.personalForm.finalBegintime).getTime() - 8.64e7
        }
      },
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
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
      this.list2 = new Array(this.personalForm)
    }
  },
  created() {
    this.getTypes()
    this.getways()
  },
  methods: {
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
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
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
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const alldata = this.extend(EnterDetail[0], this.personalForm)
      const parms = JSON.stringify(alldata)
      console.log(alldata)
      updateadvanceproduct(parms).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
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
    height: 900px;
  }
  .el-col-12{
    width: 49%;
  }
</style>
