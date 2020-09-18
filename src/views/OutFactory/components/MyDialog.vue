<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.factoryName +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.factoryName')" prop="factoryName" style="width: 100%;">
                <el-input v-model="personalForm.factoryName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.factoryNumber')" style="width: 100%;">
                <el-input v-model="personalForm.factoryNumber" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.factoryFax')" style="width: 100%;">
                <el-input v-model="personalForm.factoryFax" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.factoryContactName')" style="width: 100%;">
                <el-input v-model="personalForm.factoryContactName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.factoryContactPhone')" style="width: 100%;">
                <el-input v-model="personalForm.factoryContactPhone" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.taxNumber')" style="width: 100%;">
                <el-input v-model="personalForm.taxNumber" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.accountName')" style="width: 100%;">
                <el-input v-model="personalForm.accountName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.bankName')" style="width: 100%;">
                <el-input v-model="personalForm.bankName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.account')" style="width: 100%;">
                <el-input v-model="personalForm.account" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.businessRegisterNumber')" style="width: 100%;">
                <el-input v-model="personalForm.businessRegisterNumber" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.productionLicense')" style="width: 100%;">
                <el-input v-model="personalForm.productionLicense" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.unitAddress')" style="width: 100%;">
                <el-input v-model="personalForm.unitAddress" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.unitEmail')" style="width: 100%;">
                <el-input v-model="personalForm.unitEmail" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.stat')" style="width: 100%;">
                <el-radio-group v-model="personalForm.stat" style="width:200px;margin-left: 18px">
                  <el-radio :label="1" style="width: 100px">启用</el-radio>
                  <el-radio :label="2">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">{{ $t('updates.wlxq') }}</h2>
      <div class="container">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.receiverId')" style="width: 100%;">
                <el-input v-model="receiverId" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseStock"/>
                <my-delivery :deliverycontrol.sync="stockControl" @deliveryName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.receivePlaceCode')" style="width: 100%;">
                <el-input v-model="personalForm.receivePlaceCode" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.countryId')" style="width: 100%;">
                <el-select v-model="personalForm.countryId" style="margin-left: 18px;width: 200px" @change ="handlechange" @focus="updatecountry">
                  <el-option
                    v-for="(item, index) in nations"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.provinceId')" style="width: 100%;">
                <el-select v-model="personalForm.provinceId" filterable style="margin-left: 18px;width: 200px" @change="handlechange2">
                  <el-option
                    v-for="(item, index) in provinces"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.cityId')" style="width: 100%;">
                <el-select v-model="personalForm.cityId" filterable style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in cities"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.regionId')" style="width: 100%;">
                <el-cascader
                  :options="regions"
                  :props="props"
                  v-model="regionId"
                  :show-all-levels="false"
                  change-on-select
                  filterable
                  clearable
                  style="margin-left: 18px;width: 200px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.receiverPhone')" style="width: 100%;">
                <el-input v-model="personalForm.receiverPhone" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutFactory.receiverAddress')" style="width: 100%;">
                <el-input v-model="personalForm.receiverAddress" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!-- 可选择商品 -->
    <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom:30px;">

      <div ref="fuzhu" class="form-name" >{{ $t('updates.ktgspmx') }}</div>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <my-detail :control.sync="control" :selected="list2" @product="productdetail"/>
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
          size="small"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,max: 100,precision: 6,controls:false}, type: 'visible'}" :label="$t('Hmodule.dj')" prop="price" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                v-model="scope.row.price"
                disabled
                @input="getprice(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,max: 100,precision: 6,controls:false}, type: 'visible'}" :label="$t('updates.zk')" prop="discountRate" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                v-model="scope.row.includeTaxPrice"
                disabled
                @input="getincludeTaxPrice(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0, precision: 6}, type: 'visible'}" :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                v-model="scope.row.taxRate"
                disabled
                @input="gettaxRate(scope.row)"/>
            </template>
          </el-editable-column>
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
import { updateoutFactory } from '@/api/OutFactory'
import { getcountrylist, getprovincelist, getcitylist, regionlist, getRegion, saveRegion } from '@/api/public'
import MyDelivery from './MyDelivery'
import MyDetail from './MyDetail'
var _that
export default {
  components: { MyDelivery, MyDetail },
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
    return {
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 区域列表字段更改
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 区域回显
      regionId: [],
      // 区域数据
      regions: [],
      // 城市数据
      cities: [],
      // 省数据
      provinces: [],
      // 国家数据
      nations: [],
      // 收货人回显
      receiverId: '',
      // 控制收货人
      stockControl: false,
      // 外包工厂规则数据
      personalrules: {
        factoryName: [
          { required: true, message: '请输入工厂名称', trigger: 'blur' }
        ]
      },
      control: false,
      list2: [],
      // 商品明细列表规则
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
      this.receiverId = this.personalForm.receiveName
      this.list2 = this.personalForm.outFactoryDetailVos
      this.handlechange(this.personalForm.countryId)
      this.handlechange2(this.personalForm.provinceId)
      getRegion(this.personalForm.regionId).then(res => {
        if (res.data.ret === 200) {
          if (res.data.data.content) {
            const zhuz = res.data.data.content.zcc.split(',')
            this.regionId = zhuz.map(function(item) {
              return parseInt(item)
            })
          }
        }
      })
    }
  },
  created() {
    this.getnationlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 计算单价
    getprice(row) {
      row.includeTaxPrice = (row.price * (1 + row.taxRate / 100)).toFixed(6)
    },
    // 通过税率计算含税价
    gettaxRate(row) {
      if (row.includeTaxPrice !== 0) {
        row.includeTaxPrice = (row.price * (1 + row.taxRate / 100)).toFixed(6)
      }
    },
    // 通过含税价计算税率
    getincludeTaxPrice(row) {
      if (row.price !== 0) {
        row.taxRate = ((row.includeTaxPrice / row.price - 1) * 100).toFixed(6)
        console.log(row.taxRate)
      }
    },
    getnationlist() {
      // 国籍列表
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        } else {
          console.log('国家列表出错')
        }
      })
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        } else {
          console.log('区域列表出错')
        }
      })
    },
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 更新国家下拉
    updatecountry() {
      this.getnationlist()
    },
    // 根据国家选择省
    handlechange(val) {
      getprovincelist(val).then(res => {
        if (res.data.ret === 200) {
          this.provinces = res.data.data.content
        } else {
          console.log('国家选择省出错')
        }
      })
    },
    // 根据省选择市
    handlechange2(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities = res.data.data.content
        } else {
          console.log('省选择市出错')
        }
      })
    },
    // 收货人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 收货人回显
    stockName(val) {
      this.receiverId = val.personName
      this.personalForm.receiverId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createId: 3
      }
      this.receiverId = null
      this.handlePersonId = null
      this.workCenterId = null
      this.producePlanNumber = null
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.createId = 3
      if (this.regionId !== '' && this.regionId !== null && this.regionId !== undefined) {
        this.personalForm.regionId = this.regionId[this.regionId.length - 1]
      }
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null || [key] === 'outFactoryDetailVos') {
          delete Data[key]
        }
      }
      const EnterDetail = this.$refs.editable.getRecords()
      let mk = 0
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          mk = 1
        }
        if (elem.discountRate === null || elem.discountRate === '' || elem.discountRate === undefined) {
          mk = 2
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
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
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
      const parms = JSON.stringify(Data)
      updateoutFactory(parms, parms2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
            type: 'success',
            duration: 1000,
            offset: 100
          })
          saveRegion(this.regionId, this.personalForm.regionId).then(res => {
            console.log(res)
          })
          this.$emit('rest', true)
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
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.$refs.personalForm2.clearValidate()
      this.$refs.personalForm2.resetFields()
      this.editVisible = false
    },
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
    productdetail(val) {
      const nowlistdata = this.$refs.editable.getRecords()
      const alldata = [...val, ...nowlistdata]
      const filterdata = this.uniqueArray(alldata, 'productCode')
      console.log('filterdata=========', filterdata)
      for (let i = 0; i < filterdata.length; i++) {
        console.log(filterdata[i].price)
        let m = 1
        for (let j = 0; j < nowlistdata.length; j++) {
          if (filterdata[i].productCode === nowlistdata[j].productCode) {
            m = 2
          }
        }
        if (filterdata[i].price === undefined) {
          filterdata[i].price = 0
        }
        // filterdata[i].price = filterdata[i].purchasePrice
        if (m === 1) {
          this.$refs.editable.insert(filterdata[i])
        }
      }
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
