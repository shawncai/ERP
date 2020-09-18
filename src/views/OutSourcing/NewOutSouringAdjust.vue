<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('update4.zt')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutSourcing.personId')" prop="handlePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="handlePersonId" style="width: 200px" clearable @focus="handlechooseStock"/>
                </el-form-item>
                <my-delivery :deliverycontrol.sync="stockControl" @deliveryName="stockName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutSourcing.outFactoryId')" prop="factoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="factoryId" style="width: 200px" clearable @focus="chooseFactory"/>
                </el-form-item>
                <my-factory :factorycontrol.sync="factorycontrol" @factoryName="factoryName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('update4.adjustDate')" prop="adjustDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.adjustDate"
                    :placeholder="$t('update4.adjustDate')"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card :body-style=" { padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px; margin-bottom: 30px">
        <div ref="fuzhu" class="form-name">{{ $t('Hmodule.jghmx') }}</div>
        <div class="buttons" style="margin-top: 58px">
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
            style="width: 100%">
            <el-editable-column type="selection" width="85" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('update4.oldPrice')" prop="oldPrice" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('update4.newPrice')" prop="newPrice" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="false"
                  :min="0.00"
                  v-model="scope.row.newPrice"
                />
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.oldIncludeTaxPrice')" prop="oldIncludeTaxPrice" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('updates.newIncludeTaxPrice')" prop="newIncludeTaxPrice" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  v-model="scope.row.newIncludeTaxPrice"
                  @change="getnewprice(scope.row, scope)"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.oldTaxRate')" prop="oldTaxRate" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('updates.newTaxRate')" prop="newTaxRate" align="center" min-width="170px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  v-model="scope.row.newTaxRate"
                  @change="gettaxRate2(scope.row, scope)"/>
              </template>
            </el-editable-column>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">
        <el-button :loading="saveloding" type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { addFactoryAdjust } from '@/api/OutSourcing'
import MyMaterials from './components/MyMaterials'
import MyDelivery from './components/MyDelivery'
import MyFactory from './components/MyFactory'
import MyDetail from './components/MyDetail'
var _that
export default {
  name: 'NewOutSouringAdjust',
  components: { MyDetail, MyFactory, MyDelivery, MyMaterials },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入'))
      } else {
        callback()
      }
    }
    return {
      saveloding: false,
      // 外包工厂回显
      factoryId: '',
      // 控制外包工厂
      factorycontrol: false,
      // 经办人回显
      handlePersonId: this.$store.state.user.name,
      // 控制经办人
      stockControl: false,
      // 主生产任务信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        handlePersonId: this.$store.getters.userId,
        adjustDate: null,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      },
      // 主生产任务规则数据
      personalrules: {
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        factoryId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        adjustDate: [
          { required: true, message: '请选择调价日期', trigger: 'change' }
        ]
      },
      // 主生产任务明细数据
      list2: [],
      // 主生产任务明细列表规则
      validRules: {
      }
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    gettaxRate2(row, scope) {
      console.log('row========tax', row)
      row.taxRateFlag = 1
      if (row !== '' && row !== null && row !== undefined && scope.$index === 0) {
        if (row.newTaxRate !== '' && row.newTaxRate !== null && row.newTaxRate !== undefined) {
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].temp = i
          }
          for (let i = row.temp; i < this.list2.length; i++) {
            console.log('需求值=========', this.list2[i].newTaxRate)
            console.log(222)
            this.list2[i].newTaxRate = row.newTaxRate
            this.list2[i].newPrice = this.list2[i].newIncludeTaxPrice / (1 + this.list2[i].newTaxRate / 100)
            this.list2[i].taxRateFlag = 1
          }
          console.log(row)
        }
      }

      if (row.newTaxRate === 0) {
        row.newPrice = row.newIncludeTaxPrice
      } else {
        row.newPrice = row.newIncludeTaxPrice / (1 + row.newTaxRate / 100)
      }
      // if (row.taxPriceFlag  === 1) {
      //   row.newPrice = row.newIncludeTaxPrice / (1 + row.newTaxRate / 100)
      //   row.priceflag = 0
      //   row.taxPriceFlag = 0
      //   row.taxRateFlag = 0
      // } else if (row.priceflag === 1) {
      //   row.newIncludeTaxPrice = (row.newPrice * (1 + row.newTaxRate / 100))
      //   row.priceflag = 0
      //   row.taxPriceFlag = 0
      //   row.taxRateFlag = 0
      // }
    },
    getnewprice(row, scope) {
      // if (row !== '' && row !== null && row !== undefined && scope.$index === 0) {
      //   if (row.newIncludeTaxPrice !== '' && row.newIncludeTaxPrice !== null && row.newIncludeTaxPrice !== undefined) {
      //     for (let i = 0; i < this.list2.length; i++) {
      //       this.list2[i].temp = i
      //     }
      //     for (let i = row.temp; i < this.list2.length; i++) {
      //       this.list2[i].newIncludeTaxPrice = row.newIncludeTaxPrice
      //     }
      //   }
      // }
      if (row.newTaxRate && row.newIncludeTaxPrice) {
        row.newPrice = row.newIncludeTaxPrice / (1 + row.newTaxRate / 100)
      }
      if (row.proportion && row.newIncludeTaxPrice) {
        row.newSalePrice = row.proportion / 100 * row.newIncludeTaxPrice
      }
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    deleteeditable() {
      this.$refs.editable.removeSelecteds()
    },
    // 外包工厂focus事件
    chooseFactory() {
      this.factorycontrol = true
    },
    // 外包工厂回显
    factoryName(val) {
      console.log('val==================', val)

      this.factoryId = val.factoryName
      this.personalForm.factoryId = val.id
      const factoryarr = val.outFactoryDetailVos.map(item => {
        return {
          productCode: item.productCode,
          productName: item.productName,
          typeId: item.type,
          color: item.color,
          unit: item.unit,
          oldPrice: item.price,
          newPrice: 0,
          productType: item.productTypeName,
          oldTaxRate: item.taxRate,
          newTaxRate: item.taxRate,
          oldIncludeTaxPrice: item.includeTaxPrice,
          newIncludeTaxPrice: item.includeTaxPrice
        }
      })
      this.list2 = factoryarr
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        handlePersonId: this.$store.getters.userId,
        adjustDate: null,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.handlePersonId = null
      this.outFactoryId = null
    },
    // 保存操作
    handlesave() {
      this.saveloding = true
      setTimeout(() => {
        const EnterDetail = this.$refs.editable.getRecords()
        if (EnterDetail.length === 0) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.nonedetail'),
            offset: 100
          })
          this.saveloding = false
          return false
        }
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
            addFactoryAdjust(parms, parms2, this.personalForm).then(res => {
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
              this.saveloding = false
            })
          } else {
            this.$notify.error({
              title: 'wrong',
              message: 'Information is incomplete',
              offset: 100
            })
            this.saveloding = false
            return false
          }
        })
      }, 0.5 * 1000)
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
      font-weight: bold;
      font-size: 18px;
      color: #373e4f;
      padding: 5px;
      margin-bottom: -20px;
    }
    .container{
      margin-top: 20px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
