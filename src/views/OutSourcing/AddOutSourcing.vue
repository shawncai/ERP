<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('OutSourcing.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutSourcing.personId')" prop="personId" style="width: 100%;">
                  <el-input v-model="personId" style="margin-left: 18px;width:200px" clearable @focus="handlechooseStock"/>
                </el-form-item>
                <my-delivery :deliverycontrol.sync="stockControl" @deliveryName="stockName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutSourcing.taxRate')" style="width: 100%;">
                  <el-input v-model="personalForm.taxRate" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutSourcing.outFactoryId')" prop="outFactoryId" style="width: 100%;">
                  <el-input v-model="outFactoryId" style="margin-left: 18px;width:200px" clearable @focus="chooseFactory"/>
                </el-form-item>
                <my-factory :factorycontrol.sync="factorycontrol" @factoryName="factoryName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutSourcing.paymentAgreementId')" style="width: 100%;">
                  <el-select v-model="personalForm.paymentAgreementId" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="付款1"/>
                    <el-option value="2" label="付款2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutSourcing.deadline')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.deadline"
                    type="date"
                    placeholder="期限"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutSourcing.productionDate')" prop="productionDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.productionDate"
                    type="date"
                    placeholder="生产日期"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutSourcing.completeDate')" prop="completeDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.completeDate"
                    type="date"
                    placeholder="完成日期"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutSourcing.billingTypeId')" style="width: 100%;">
                  <el-select v-model="personalForm.billingTypeId" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="普通发票"/>
                    <el-option value="2" label="付款2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutSourcing.giveAddress')" style="width: 100%;">
                  <el-input v-model="personalForm.giveAddress" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('updates.fyxx') }}</h2>
        <div class="container">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('OutSourcing.heji')" style="width: 100%;">
                  <el-input v-model="heji" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
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
            size="medium"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" width="85" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.shuli')" prop="quantity" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  :min="1.00"
                  v-model="scope.row.quantity"
                  @change="handelechangequantity()"
                />
              </template>
            </el-editable-column>
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
            size="medium"
            style="width: 100%">
            <el-editable-column type="selection" width="85" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.shuli')" prop="quantity" align="center" min-width="150px"/> -->
            <el-editable-column :label="$t('updates.shuli')" prop="quantity" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.jgf')" prop="money" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.je')" prop="totalMoney" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ gettotalMoney(scope.row.quantity, scope.row.money, scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.outQuantity')" prop="outQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.damageQuantity')" prop="damageQuantity" align="center" min-width="150px"/>
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
import { createoutFactory } from '@/api/OutSourcing'
import MyMaterials from './components/MyMaterials'
import MyDelivery from './components/MyDelivery'
import MyFactory from './components/MyFactory'
import MyDetail from './components/MyDetail'
var _that
export default {
  name: 'AddOutSourcing',
  components: { MyDetail, MyFactory, MyDelivery, MyMaterials },
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
      list3: [],
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
      // 主生产任务信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      },
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
      // 主生产任务明细列表规则
      validRules: {
      },
      deleteselectdata: [],
      // 外包工厂代入选项
      selectList: []
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
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
      console.log('val==================', val)
      this.outFactoryId = val.factoryName
      this.personalForm.outFactoryId = val.id
      this.personalForm.giveAddress = val.receiverAddress
      this.selectList = val.outFactoryDetailVos
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
      this.heji = sums[8]
      sums[2] = ''
      sums[4] = ''
      sums[6] = ''
      sums[7] = ''
      return sums
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
      // const alldata = [...val, ...nowlistdata]
      // console.log('alldata=============', val, alldata)
      // const filterdata = this.uniqueArray2(alldata, 'productCode', 'idx')
      // const newArr = []
      // console.log('nowlistdata', nowlistdata)
      // alldata.forEach(el => {
      //   console.log('el', el)
      //   const result = newArr.findIndex(ol => { return el.productCode === ol.productCode })
      //   console.log('result', result)
      //   if (result !== -1) {
      //     if (el.quantity !== null && el.quantity !== '' && el.quantity !== undefined) {
      //       newArr[result].quantity = newArr[result].quantity + el.quantity
      //     } else {
      //       newArr.push(el)
      //     }
      //   } else {
      //     newArr.push(el)
      //   }
      // })
      // console.log('newArr', alldata)
      this.list3 = val
    },
    // 两表联动
    changelistdata() {
      const nowlistdata = this.$refs.editable.getRecords()
      const nowlistdata2 = this.$refs.editable2.getRecords()
      console.log('nowlistdata===============111111111111111', nowlistdata)
      console.log('nowlistdata===============222222222222222', nowlistdata2)
      for (const j in nowlistdata) {
        for (const i in nowlistdata2) {
          if (nowlistdata[j].idx === nowlistdata2[i].idx) {
            nowlistdata2[i].quantity = Number(nowlistdata[j].quantity) * Number(nowlistdata2[i].baseQuantity)
          }
        }
      }
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
    // 保存操作
    handlesave() {
      // 加工后明细
      const EnterDetail = this.$refs.editable.getRecords()
      // 原材料明细
      const EnterDetail2 = this.$refs.editable2.getRecords()
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
          delete elem.money
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        return elem
      })
      // 加工后明细
      const parms2 = JSON.stringify(EnterDetail)
      // 原材料明细
      const parms3 = JSON.stringify(EnterDetail2)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          createoutFactory(parms, parms3, parms2, this.personalForm).then(res => {
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
              this.$refs.editable2.clear()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
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
      const view = { path: '/OutSourcing/AddOutSourcing', name: 'AddOutSourcing', fullPath: '/OutSourcing/AddOutSourcing', title: 'AddOutSourcing' }
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
