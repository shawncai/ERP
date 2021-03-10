<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.personId')" prop="personId" style="width: 100%;">
                <el-input v-model="personId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseStock"/>
              </el-form-item>
              <my-delivery :deliverycontrol.sync="stockControl" @deliveryName="stockName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.taxRate')" style="width: 100%;">
                <el-input v-model="personalForm.taxRate" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.outFactoryId')" prop="outFactoryId" style="width: 100%;">
                <el-input v-model="outFactoryId" style="margin-left: 18px;width: 200px" clearable @focus="chooseFactory"/>
              </el-form-item>
              <my-factory :factorycontrol.sync="factorycontrol" @factoryName="factoryName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.paymentAgreementId')" style="width: 100%;">
                <el-select v-model="personalForm.paymentAgreementId" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="付款1"/>
                  <el-option value="2" label="付款2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.deadline')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.deadline"
                  type="date"
                  placeholder="期限"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.productionDate')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.productionDate"
                  type="date"
                  placeholder="生产日期"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.completeDate')" prop="completeDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.completeDate"
                  type="date"
                  placeholder="完成日期"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.billingTypeId')" style="width: 100%;">
                <el-select v-model="personalForm.billingTypeId" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="普通发票"/>
                  <el-option value="2" label="付款2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.giveAddress')" style="width: 100%;">
                <el-input v-model="personalForm.giveAddress" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.fyxx') }}</h2>
      <div class="container">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.heji')" style="width: 100%;">
                <el-input v-model="heji" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name">{{ $t('Hmodule.jghmx') }}</h2>
      <div class="buttons" style="margin-top: 58px">
        <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <!-- <my-detail :control.sync="control" @product="productdetail"/> -->
        <my-materials :materialcontrol.sync="control" :selectlist="selectList" :selected="list2" @product4="productdetail4" @detailproduct="detailproduct"/>
        <el-button type="danger" @click="deleteeditable()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          class="click-table1"
          stripe
          border
          size="small"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-editable-column type="selection" width="85" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.shuli')" prop="quantity" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :controls="false"
                :min="1.00"
                v-model="scope.row.quantity"
                @change="handelechangequantity()"
              />
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('update4.enterPrice')" prop="enterPrice" align="center" min-width="150px"/>
          <el-editable-column :label="$t('update4.enterMoney')" prop="enterMoney" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.enterQuantity')" prop="enterQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.damageQuantity')" prop="damageQuantity" align="center" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name">{{ $t('Hmodule.yclmx') }}</h2>
      <!-- <div class="buttons" style="margin-top: 58px">
          <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" @product="productdetail"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div> -->
      <div class="container">
        <el-editable
          ref="editable2"
          :data.sync="list3"
          :edit-config="{ showIcon: true, showStatus: true}"
          :summary-method="getSummaries"
          :edit-rules="validRules"
          class="click-table1"
          show-summary
          stripe
          border
          size="small"
          style="width: 100%">
          <el-editable-column type="selection" width="85" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.shuli')" prop="quantity" align="center" min-width="150px"/> -->
          <el-editable-column :label="$t('updates.shuli')" prop="quantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.jgf')" prop="price" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.je')" prop="totalMoney" align="center" min-width="150px">
            <template slot-scope="scope">
              <p>{{ gettotalMoney(scope.row.quantity, scope.row.price, scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('stockTrackList.price')" prop="includeTaxPrice" align="center" min-width="150px"/>
          <el-editable-column :label="$t('stockTrackList.money')" prop="includeTaxMoney" align="center" min-width="150px">
            <template slot-scope="scope">
              <p>{{ getincludeTaxMoney(scope.row.quantity, scope.row.includeTaxPrice, scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,max: 100,precision: 6,controls:false}, type: 'visible'}" :label="$t('updates.zk')" prop="discountRate" align="center" min-width="150px"/>
          <el-editable-column :label="$t('repair.Discountamount')" prop="discountMoney" align="center" min-width="150px">
            <template slot-scope="scope">
              <p>{{ getdiscountMoney(scope.row.includeTaxMoney, scope.row.discountRate, scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.outQuantity')" prop="outQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.damageQuantity')" prop="damageQuantity" align="center" min-width="150px"/>
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
import { updateoutsourcing } from '@/api/OutSourcing'
import { searchoutFactory } from '@/api/OutFactory'
import MyDelivery from './MyDelivery'
import MyFactory from './MyFactory'
import MyDetail from './MyDetail'
import MyMaterials from './MyMaterials'

var _that
export default {
  components: { MyDetail, MyFactory, MyDelivery, MyMaterials },
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
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 合计
      heji: 0,
      // 外包工厂回显
      outFactoryId: '',
      // 控制外包工厂
      factorycontrol: false,
      // 经办人回显
      personId: '',
      // 控制经办人
      stockControl: false,
      // 控制商品列表窗口
      control: false,
      // 主生产任务规则数据
      personalrules: {
        personId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        outFactoryId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        productionDate: [
          { required: true, message: '请选择生产日期', trigger: 'change' }
        ],
        completeDate: [
          { required: true, message: '请选择完成日期', trigger: 'change' }
        ]
      },
      // 主生产任务明细数据
      list2: [],
      list3: [],
      deleteselectdata: [],
      // 主生产任务明细列表规则
      validRules: {
      },
      // 外包工厂代入选项
      selectList: [],
      factoryId: null
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    async editdata() {
      this.personalForm = this.editdata
      console.log('this.personalForm=======', this.personalForm)
      this.personId = this.personalForm.personName
      this.outFactoryId = this.personalForm.outFactoryName
      this.factoryId = this.personalForm.outFactoryId
      const getemplist = {
        pageNum: 1,
        pageSize: 10,
        id: this.factoryId
      }
      await searchoutFactory(getemplist).then(res => {
        if (res.data.ret === 200) {
          this.selectList = res.data.data.content.list[0].outFactoryDetailVos
        }
      })
      this.list2 = this.personalForm.outsourcingEnterDetailVos
      this.list3 = this.personalForm.outsourcingDetailVos
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 两表联动
    changelistdata() {
      const nowlistdata = this.$refs.editable.getRecords()
      const nowlistdata2 = this.$refs.editable2.getRecords()
      for (const j in nowlistdata) {
        for (const i in nowlistdata2) {
          if (nowlistdata[j].idx === nowlistdata2[i].idx) {
            nowlistdata2[i].quantity = Number(nowlistdata[j].quantity) * Number(nowlistdata2[i].baseQuantity)
          }
        }
      }
    },
    // 新增外包单明细
    handleAddproduct() {
      this.control = true
    },
    uniqueArray(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    uniqueArray2(array, key, key2) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] === result[j][key] && item[key2] === result[j][key2]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    productdetail4(val) {
      console.log('val', val)
      const nowlistdata = this.$refs.editable.getRecords()
      nowlistdata.forEach(item => {
        const index = val.findIndex(items => items.productCode === item.productCode)
        if (index > -1) {
          val.splice(index, 1, item)
        }
      })
      // const alldata = [...val, ...nowlistdata]
      // const filterdata = this.uniqueArray(alldata, 'productCode')
      this.list2 = val
      console.log('this.list2=====================================', this.list2)
    },
    detailproduct(val) {
      const nowlistdata = this.$refs.editable2.getRecords()
      nowlistdata.forEach(item => {
        const index = val.findIndex(items => items.productCode === item.productCode)
        if (index > -1) {
          val.splice(index, 1, item)
        }
      })
      this.list3 = val
    },
    handleSelectionChange(val) {
      // console.log('val', val)
      this.deleteselectdata = val.map(item => {
        return item.idx
      })
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    deleteeditable() {
      this.$refs.editable.removeSelecteds()
      const nowlistdata2 = this.deepClone(this.$refs.editable2.getRecords())
      this.$refs.editable2.clear()
      for (const j in nowlistdata2) {
        for (const i in this.deleteselectdata) {
          if (this.deleteselectdata[i] === nowlistdata2[j].idx) {
            nowlistdata2.splice(j, 1)
          }
        }
      }
      for (const j in nowlistdata2) {
        this.$refs.editable2.insert(nowlistdata2[j])
      }
    },
    handelechangequantity() {
      this.changelistdata()
    },
    // 外包工厂focus事件
    chooseFactory() {
      this.factorycontrol = true
    },
    // 外包工厂回显
    factoryName(val) {
      this.outFactoryId = val.factoryName
      this.personalForm.outFactoryId = val.id
      this.personalForm.giveAddress = val.receiverAddress
    },
    // 经办人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 经办人回显
    stockName(val) {
      this.personId = val.personName
      this.personalForm.personId = val.id
    },
    // 明细表金额
    gettotalMoney(quantity, money, row) {
      row.totalMoney = quantity * money
      return row.totalMoney
    },
    getincludeTaxMoney(quantity, includeTaxPrice, row) {
      row.includeTaxMoney = quantity * includeTaxPrice
      return row.includeTaxMoney
    },
    getdiscountMoney(includeTaxMoney, discountRate, row) {
      row.discountMoney = includeTaxMoney * (discountRate / 100)
      return row.discountMoney
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
              return (Number(prev) + Number(curr)).toFixed(6)
            } else {
              return Number(prev).toFixed(6)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      this.heji = Number(sums[12]) - Number(sums[14])
      sums[2] = ''
      sums[4] = ''
      sums[6] = ''
      sums[7] = ''
      return sums
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.personId = null
      this.outFactoryId = null
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
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        elem.reportCheckingQuantity = 0
        elem.actualCheckingQuantity = 0
        elem.qualifyQuantity = 0
        elem.unqualifyQuantity = 0
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
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
        }
        if (elem.money === null || elem.money === '' || elem.money === undefined) {
          elem.money = 0
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        return elem
      })
      const EnterDetail2 = this.$refs.editable2.getRecords()
      if (EnterDetail2.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.nonedetail'),
          offset: 100
        })
        return false
      }
      for (const i in EnterDetail) {
        for (const j in EnterDetail2) {
          if (EnterDetail[i].productCode === EnterDetail2[j].productCode && Number(EnterDetail[i].quantity) !== Number(EnterDetail2[j].quantity)) {
            console.log('EnterDetail[i].quantity', EnterDetail[i].quantity)
            console.log('EnterDetail2[j].quantity', EnterDetail2[j].quantity)

            this.$notify.error({
              title: 'wrong',
              message: '加工后明细和原材料明细数量不一致',
              offset: 100
            })
            return false
          }
        }
      }
      const parms2 = JSON.stringify(EnterDetail)
      const parms3 = JSON.stringify(EnterDetail2)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
        if (key === 'judgeStat') {
          delete Data[key]
        }
        if (key === 'receiptStat') {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      updateoutsourcing(parms, parms3, parms2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
          this.$refs.editable.clear()
          this.$refs.personalForm.clearValidate()
          this.$refs.personalForm.resetFields()
          this.$refs.personalForm2.clearValidate()
          this.$refs.personalForm2.resetFields()
          this.editVisible = false
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
    },
    handlecancel() {
      this.$refs.editable.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.$refs.personalForm2.clearValidate()
      this.$refs.personalForm2.resetFields()
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
    left: 0;
  }
  .el-col-12{
    width: 49%;
  }
</style>
