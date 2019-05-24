<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.applyNumber +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('StockApply.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockApply.stockType')" prop="stockType" style="width: 100%;">
                <el-select v-model="personalForm.stockType" style="margin-left: 18px;width: 218px" @focus="updatecountry">
                  <el-option
                    v-for="(item, index) in types"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockApply.applyPersonId')" prop="applyPersonId" style="width: 100%;">
                <el-input v-model="applyPersonId" style="margin-left: 18px" clearable @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockApply.applyDeptId')" prop="applyDeptId" style="width: 100%;">
                <el-select v-model="personalForm.applyDeptId" clearable style="margin-left: 18px;width: 218px" @change="change()">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockApply.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 218px" @change="chooseSourceType">
                  <el-option value="1" label="无来源" />
                  <el-option value="2" label="销售订单" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockApply.applyDate')" prop="applyDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.applyDate"
                  :picker-options="pickerOptions1"
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
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">采购申请明细来源</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button :disabled="Isproduct" @click="handleAddproduct">添加商品</el-button>
        <my-detail :control.sync="control" @product="productdetail" @product2="productdetail2"/>
        <el-button :disabled="IsSourceNumber" style="width: 120px" @click="handleAddSource">从源单中选择</el-button>
        <my-order :ordercontrol.sync="ordercontrol" @saleOrderDetail="saleOrderDetail" @saleOrderDetail2="saleOrderDetail2" @saleOrder="saleOrder"/>
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
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1, precision: 2}, type: 'visible', events: {change: changeDate}}" prop="requireQuantity" align="center" label="需求数量" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible', events: {change: changeDate}}" prop="requireDate" align="center" label="需求日期" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-date-picker
                v-model="scope.row.requireDate"
                :picker-options="pickerOptions1"
                type="date"
                value-format="yyyy-MM-dd"
                @change="changeDate"/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="applyReason" align="center" label="申请原因" min-width="150px"/>
          <el-editable-column prop="sourceSerialNumber" align="center" label="源单序号" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px;margin-bottom: 30px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">采购申请明细</h2>
      <div class="container">
        <el-editable
          ref="editable2"
          :data.sync="list3"
          :edit-config="{ showIcon: false, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
          <el-editable-column prop="productType" align="center" label="规格" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd', disable: 'true'},}" prop="requireDate" align="center" label="需求日期" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-date-picker
                v-model="scope.row.requireDate"
                disabled
                type="date"
                value-format="yyyy-MM-dd"/>
            </template>
          </el-editable-column>
          <el-editable-column prop="applyQuantity" align="center" label="申请数量" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {precision: 2}}" prop="planQuantity" align="center" label="已下达数量" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="2"
                v-model="scope.row.planQuantity"
                disabled/>
            </template>
          </el-editable-column>
          <el-editable-column prop="sourceSerialNumber" align="center" label="源单序号" min-width="150px"/>
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
import { updatestockapply } from '@/api/StockApply'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MyOrder from './MyOrder'
export default {
  components: { MyDetail, MyEmp, MyOrder },
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
      console.log(this.applyPersonId)
      if (this.applyPersonId === undefined || this.applyPersonId === null || this.applyPersonId === '') {
        callback(new Error('请选择申请人'))
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
      // 控制源单数据
      ordercontrol: false,
      // 控制是否可以从商品选择
      Isproduct: false,
      // 控制是否可以从源单选择
      IsSourceNumber: true,
      // 部门数据
      depts: [],
      // 申请人回显
      applyPersonId: '',
      // 控制申请人
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
        applyPersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        stockType: [
          { required: true, message: '请选择采购类别', trigger: 'change' }
        ],
        applyDate: [
          { required: true, message: '请选择申请日期', trigger: 'change' }
        ],
        applyDeptId: [
          { required: true, message: '请选择申请部门', trigger: 'none' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请明细
      list3: [],
      // 采购申请单明细列表规则
      validRules: {
        requireQuantity: [
          { required: true, message: '请输入需求数量', trigger: 'change' }
        ],
        requireDate: [
          { required: true, message: '请选择需求日期', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.applyPersonId = this.personalForm.applyPersonName
      this.list2 = this.personalForm.stockApplyDetailVos
      this.list3 = this.personalForm.stockApplyDetailVos
      this.getdatatime()
    }
  },
  created() {
    this.getTypes()
  },
  methods: {
    // 控制不同源单类型
    chooseSourceType(val) {
      if (val === '1') {
        this.Isproduct = false
        this.IsSourceNumber = true
      } else if (val === '2') {
        this.Isproduct = true
        this.IsSourceNumber = false
        const ceshi2 = this.$refs.editable2.getRecords()
        console.log(ceshi2)
        for (let i = 0; i < ceshi2.length; i++) {
          if (ceshi2[i].sourceSerialNumber !== '' && ceshi2[i].sourceSerialNumber !== null && ceshi2[i].sourceSerialNumber !== undefined) {
            this.$refs.editable2.remove(ceshi2[i])
          }
        }
        const ceshi = this.$refs.editable.getRecords()
        console.log(ceshi)
        for (let i = 0; i < ceshi.length; i++) {
          if (ceshi[i].sourceSerialNumber !== '' && ceshi[i].sourceSerialNumber !== null && ceshi[i].sourceSerialNumber !== undefined) {
            this.$refs.editable.remove(ceshi[i])
          }
        }
      }
    },
    // 从源单添加商品
    handleAddSource() {
      this.ordercontrol = true
    },
    // 从销售订单过来数据
    saleOrderDetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    saleOrderDetail2(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable2.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    saleOrder(val) {
      console.log(val)
      this.personalForm.applyPersonId = val.salePersonId
      this.applyPersonId = val.salePersonName
    },
    // 两表联动
    changeDate(scope, value) {
      console.log(scope)
      scope.row.applyQuantity = (scope.row.requireQuantity).toFixed(2)
      this.$refs.editable2.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < nowlistdata.length; i++) {
        this.$refs.editable2.insert(nowlistdata[i])
      }
    },
    getdatatime() { // 默认显示今天
      this.personalForm.applyDate = new Date()
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
    // 重置一下下拉
    change() {
      this.$forceUpdate()
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
    // 申请人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 申请人回显
    stockName(val) {
      this.applyPersonId = val.personName
      this.personalForm.applyPersonId = val.id
      this.personalForm.applyDeptId = val.deptId
    },
    // 采购申请明细来源
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    productdetail2(val) {
      console.log(val)
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable2.insert(val[i])
      }
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
      this.applyPersonId = null
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
      const EnterDetail2 = this.$refs.editable2.getRecords()
      for (let i = 0; i < EnterDetail.length; i++) {
        for (let j = 0; j < EnterDetail2.length; j++) {
          if (EnterDetail[i].productCode === EnterDetail2[j].productCode) {
            EnterDetail[i].applyQuantity = EnterDetail2[j].applyQuantity
            EnterDetail[i].planQuantity = EnterDetail2[j].planQuantity
            break
          }
        }
      }
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
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.requireQuantity === null || elem.requireQuantity === '' || elem.requireQuantity === undefined) {
          delete elem.requireQuantity
        }
        if (elem.applyQuantity === null || elem.applyQuantity === '' || elem.applyQuantity === undefined) {
          delete elem.applyQuantity
        }
        if (elem.requireDate === null || elem.requireDate === '' || elem.requireDate === undefined) {
          delete elem.requireDate
        }
        if (elem.applyReason === null || elem.applyReason === '' || elem.applyReason === undefined) {
          delete elem.applyReason
        }
        if (elem.planQuantity === null || elem.planQuantity === '' || elem.planQuantity === undefined) {
          delete elem.planQuantity
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
          this.$refs.editable.validate().then(valid => {
            updatestockapply(parms, parms2).then(res => {
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
                this.$refs.editable2.clear()
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
          }).catch(valid => {
            console.log('error submit!!')
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
    handlecancel() {
      this.$refs.editable.clear()
      this.$refs.editable2.clear()
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
    height: auto;
  }
  .el-col-12{
    width: 49%;
  }
</style>
