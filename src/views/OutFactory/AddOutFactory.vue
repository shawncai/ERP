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
                <el-form-item :label="$t('OutFactory.factoryName')" prop="factoryName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.factoryName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.factoryNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.factoryNumber" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.factoryFax')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.factoryFax" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.factoryContactName')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.factoryContactName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.factoryContactPhone')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.factoryContactPhone" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.taxNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.taxNumber" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.accountName')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.accountName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.bankName')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.bankName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.account')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.account" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.businessRegisterNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.businessRegisterNumber" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.productionLicense')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.productionLicense" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.unitAddress')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.unitAddress" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.unitEmail')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.unitEmail" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.stat')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
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
      <el-card :body-style=" { padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">

          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.receiverId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="receiverId" style="width: 200px" clearable @focus="handlechooseStock"/>
                  <my-delivery :deliverycontrol.sync="stockControl" @deliveryName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.receivePlaceCode')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.receivePlaceCode" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.countryId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.countryId" style="width: 200px" @change ="handlechange" @focus="updatecountry">
                    <el-option
                      v-for="(item, index) in nations"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.provinceId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.provinceId" filterable style="width: 200px" @change="handlechange2">
                    <el-option
                      v-for="(item, index) in provinces"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.cityId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.cityId" filterable style="width: 200px">
                    <el-option
                      v-for="(item, index) in cities"
                      :key="index"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.regionId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-cascader
                    :options="regions"
                    :props="props"
                    v-model="regionId"
                    :show-all-levels="false"
                    change-on-select
                    filterable
                    clearable
                    style="width: 200px"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.receiverPhone')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.receiverPhone" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.receiverAddress')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.receiverAddress" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!-- 可提供商品 -->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">

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
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,precision: 6,controls:false}, type: 'visible'}" prop="price" align="center" label="价格" min-width="150px"/>
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
import { createoutFactory } from '@/api/OutFactory'
import { getcountrylist, getprovincelist, getcitylist, regionlist, saveRegion } from '@/api/public'
import MyDelivery from './components/MyDelivery'
import MyDetail from './components/MyDetail'
var _that
export default {
  name: 'AddOutFactory',
  components: { MyDelivery, MyDetail },
  data() {
    return {
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
      // 外包工厂信息数据
      personalForm: {
        createId: 3
      },
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
  created() {
    this.getnationlist()
  },
  beforeCreate() {
    _that = this
  },
  // beforeRouteLeave(to, from, next) {
  //   // 设置下一个路由的 meta
  //   if (to.name === 'OutFactoryList') {
  //     console.log('233333333')
  //     console.log('to', to)
  //     to.meta.noCache = false // B 跳转到 A 时，让 A 缓存，即不刷新
  //     next()
  //   } else {
  //     // to.meta.noCache = true // B 跳转到 A 时，让 A 缓存，即不刷新
  //     next()
  //   }
  // },
  methods: {
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
    // 保存操作
    handlesave() {
      this.personalForm.regionId = this.regionId[this.regionId.length - 1]
      const Data = this.personalForm
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
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          createoutFactory(parms, parms2).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              saveRegion(this.regionId, this.personalForm.regionId).then(res => {
                console.log(res)
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.$router.push('/OutFactory/OutFactoryList')
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
      const view = { path: '/OutFactory/AddOutFactory', name: 'AddOutFactory', fullPath: '/OutFactory/AddOutFactory', title: 'AddOutFactory' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 添加商品
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
      console.log(val)
      // const nowlistdata = this.$refs.editable.getRecords()
      const nowlistdata = this.$refs.editable.getRecords()
      const alldata = [...val, ...nowlistdata]
      const filterdata = this.uniqueArray(alldata, 'productCode')

      for (let i = 0; i < filterdata.length; i++) {
        console.log(filterdata[i].price)
        let m = 1
        for (let j = 0; j < nowlistdata.length; j++) {
          if (filterdata[i].productCode === nowlistdata[j].productCode) {
            m = 2
            // this.$notify.error({
            //   title: 'wrong',
            //   message: this.$t('prompt.wpytj'),
            //   offset: 100
            // })
            // return false
          }
        }
        filterdata[i].discountRate = 0
        filterdata[i].price = filterdata[i].purchasePrice
        if (m === 1) {
          this.$refs.editable.insert(filterdata[i])
        }
      }
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
      margin-top: 5px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
