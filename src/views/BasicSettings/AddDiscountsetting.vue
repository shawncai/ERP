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
                <el-form-item :label="$t('updates.roleid')" prop="roleId" style="width: 100%;">
                  <el-select v-model="personalForm.roleId" style="margin-left: 18px;width: 200px" @focus="getinformation">
                    <el-option
                      v-for="(item, index) in roles"
                      :key="index"
                      :label="item.roleName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('inventoryAlarm.categoryName')" style="width: 100%;">
                  <el-select v-model="personalForm.category" style="margin-left: 18px;width: 200px" @change="iscar">
                    <el-option value="1" label="整车"/>
                    <el-option value="2" label="配件"/>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('searchSaleOrderDetailReport.productTypeName')" style="width: 100%;">
                  <el-select v-model="personalForm.typeId" :disabled="notcar" style="margin-left: 18px;width: 200px" @focus="getinformation">
                    <el-option
                      v-for="(item, index) in types"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('tongyo.zdzke')" style="width: 100%;">
                  <el-input v-model="personalForm.discountMoney" :disabled="notcar" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('tongyo.zdzkl')" style="width: 100%;">
                  <el-input-number :controls ="false" v-model="personalForm.discountRate" :disabled="notcar === false" :min="0" :max="1" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
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
import { addRoleDiscount } from '@/api/BasicSettings'
import { searchEmpCategory2 } from '@/api/Product'
import { getrolelist } from '@/api/employee'
// import MyEmp from './components/MyEmp'
// import MyDetail from './components/MyDetail'
// import MyMater from './components/MyMater'
// import MyInstallment from './components/MyInstallment'
// import MyRepository from './components/MyRepository'
var _that
export default {
  name: 'AddDiscountsetting',
  // components: { MyRepository, MyInstallment, MyMater, MyDetail, MyEmp },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('请选择我方联络人'))
      } else {
        callback()
      }
    }
    return {
      notcar: false,
      types: [],
      roles: [],
      // 销售订单信息数据
      personalForm: {
        createId: this.$store.getters.userId,
        category: '1'
      },
      // 商品信息
      productForm: {},
      // 销售订单规则数据
      personalrules: {
        roleId: [{
          required: true, message: '请选择角色', trigger: 'change'
        }]
      }
    }
  },
  created() {
  },

  mounted() {
    this.getinformation()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    iscar(val) {
      if (val === '1') {
        this.notcar = false
      } else {
        this.notcar = true
      }
    },
    getinformation() {
      getrolelist().then(res => {
        if (res.data.ret === 200) {
          this.roles = res.data.data.content
        } else {
          console.log('角色列表出错')
        }
      })
      searchEmpCategory2(2).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createId: this.$store.getters.userId,
        category: '1'
      }
    },
    // 保存操作
    handlesave() {
      if (this.personalForm.category === '1' && (this.personalForm.typeId === '' || this.personalForm.typeId === null || this.personalForm.typeId === undefined)) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择车型',
          offset: 100
        })
        return false
      }

      if (this.personalForm.category === '1' && (this.personalForm.discountMoney === '' || this.personalForm.discountMoney === null || this.personalForm.discountMoney === undefined)) {
        this.$notify.error({
          title: 'wrong',
          message: '请输入最大折扣额',
          offset: 100
        })
        return false
      }

      if (this.personalForm.category === '2' && (this.personalForm.discountRate === '' || this.personalForm.discountRate === null || this.personalForm.discountRate === undefined)) {
        this.$notify.error({
          title: 'wrong',
          message: '请输入最大折扣率',
          offset: 100
        })
        return false
      }
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      // const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addRoleDiscount(Data).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
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
      const view = { path: '/CustomerMarketing/AddCustomerMarketing', name: 'AddCustomerMarketing', fullPath: '/CustomerMarketing/AddCustomerMarketing', title: 'AddCustomerMarketing' }
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
