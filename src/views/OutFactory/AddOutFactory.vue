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
                <el-form-item :label="$t('OutFactory.factoryName')" prop="factoryName" style="width: 100%;">
                  <el-input v-model="personalForm.factoryName" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.factoryNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.factoryNumber" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.factoryFax')" style="width: 100%;">
                  <el-input v-model="personalForm.factoryFax" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.factoryContactName')" style="width: 100%;">
                  <el-input v-model="personalForm.factoryContactName" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.factoryContactPhone')" style="width: 100%;">
                  <el-input v-model="personalForm.factoryContactPhone" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.taxNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.taxNumber" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.accountName')" style="width: 100%;">
                  <el-input v-model="personalForm.accountName" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.bankName')" style="width: 100%;">
                  <el-input v-model="personalForm.bankName" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.account')" style="width: 100%;">
                  <el-input v-model="personalForm.account" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.businessRegisterNumber')" style="width: 100%;">
                  <el-input v-model="personalForm.businessRegisterNumber" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.productionLicense')" style="width: 100%;">
                  <el-input v-model="personalForm.productionLicense" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.unitAddress')" style="width: 100%;">
                  <el-input v-model="personalForm.unitAddress" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.unitEmail')" style="width: 100%;">
                  <el-input v-model="personalForm.unitEmail" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
      <el-card class="box-card" shadow="never" style="margin-top: 15px">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.receiverId')" style="width: 100%;">
                  <el-input v-model="receiverId" style="margin-left: 18px;width:200px" clearable @focus="handlechooseStock"/>
                  <my-delivery :deliverycontrol.sync="stockControl" @deliveryName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.receivePlaceCode')" style="width: 100%;">
                  <el-input v-model="personalForm.receivePlaceCode" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
              <el-col :span="6">
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
              <el-col :span="6">
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
              <el-col :span="6">
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
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.receiverPhone')" style="width: 100%;">
                  <el-input v-model="personalForm.receiverPhone" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutFactory.receiverAddress')" style="width: 100%;">
                  <el-input v-model="personalForm.receiverAddress" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
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
import { createoutFactory } from '@/api/OutFactory'
import { getcountrylist, getprovincelist, getcitylist, regionlist, saveRegion } from '@/api/public'
import MyDelivery from './components/MyDelivery'
var _that
export default {
  name: 'AddOutFactory',
  components: { MyDelivery },
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
      }
    }
  },
  created() {
    this.getnationlist()
  },
  beforeCreate() {
    _that = this
  },
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
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          createoutFactory(parms).then(res => {
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
