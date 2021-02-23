<template>
  <div class="ERP-container">
    <div class="app-container">
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">
        <!--基本信息-->
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>

              <el-col :span="6">
                <el-form-item :label="$t('Product.title')" prop="title" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" placeholder="请输入变更单主题" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Product.productname2')" prop="productname" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.productname" placeholder="请输入物品名称" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Product.productcode')" prop="productcode" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.productcode" placeholder="请输入物品编码" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockAlarm.salePrice2')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.saleprice" placeholder="请输入当前零售价" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Product.tradeprice2')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.tradeprice" placeholder="请输入当前批发价" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Product.costprice2')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.costprice" placeholder="请输入当前成本价" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Product.memberprice2')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.memberprice" placeholder="请输入当前会员价" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Product.lowerprice2')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.lowerprice" placeholder="请输入当前最低价" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Product.adjustsaleprice')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.adjustsaleprice" placeholder="请输入调整零售价" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Product.adjusttradeprice')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.adjusttradeprice" placeholder="请输入调整批发价" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Product.adjustcostprice')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.adjustcostprice" placeholder="请输入调整成本价" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Product.adjustmemberprice')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.adjustmemberprice" placeholder="请输入调整会员价" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Product.adjustlowerprice')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.adjustlowerprice" placeholder="请输入调整最低价" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Product.adjustpersonid')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="adjustpersonid" clearable style="width: 200px" @focus="handlechoose"/>
                </el-form-item>

                <my-emp :control.sync="empcontrol" @personName="personName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Product.adjustreason')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.adjustreason" clearable style="width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-permission="['1-31-34-1']" type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button v-permission="['1-31-34-1']" type="success" @click="handleentry()">{{ $t('updates.jxlr') }}</el-button>
        <el-button v-permission="['1-31-34-1']" type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addadjustprice } from '@/api/Product'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEmp from './components/MyEmp'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'Newadjustprice',
  directives: { permission, permission2 },
  components: { MyEmp },
  data() {
    return {
      // 采购员弹窗控制
      empcontrol: false,
      // 申请人回显
      adjustpersonid: '',
      // 价格变更单信息数据
      personalForm: {
        title: '',
        productname: '',
        productcode: '',
        costprice: '',
        tradeprice: '',
        saleprice: '',
        memberprice: '',
        lowerprice: '',
        adjustcostprice: '',
        adjusttradeprice: '',
        adjustsaleprice: '',
        adjustmemberprice: '',
        adjustlowerprice: '',
        adjustpersonid: '',
        adjustreason: ''
      },
      // 个人信息规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入变更单主题', trigger: 'blur' }
        ],
        productname: [
          { required: true, message: '请输入物品名称', trigger: 'blur' }
        ],
        productcode: [
          { required: true, message: '请输入物品编码', trigger: 'blur' }
        ]
      }
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    checkPermission,
    // 员工输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 员工列表返回数据
    personName(val) {
      console.log(val)
      this.adjustpersonid = val.personName
      this.personalForm.adjustpersonid = val.id
    },
    // 保存操作
    handlesave() {
      console.log(this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addadjustprice(this.personalForm).then(res => {
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
              this.$router.go(-1)
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        title: '',
        productname: '',
        productcode: '',
        costprice: '',
        tradeprice: '',
        saleprice: '',
        memberprice: '',
        lowerprice: '',
        adjustcostprice: '',
        adjusttradeprice: '',
        adjustsaleprice: '',
        adjustmemberprice: '',
        adjustlowerprice: '',
        adjustpersonid: '',
        adjustreason: ''
      }
      this.adjustpersonid = ''
    },
    // 继续录入
    handleentry() {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addadjustprice(this.personalForm).then(res => {
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
              const anchor = this.$refs.geren.offsetTop
              console.log(anchor)
              document.documentElement.scrollTop = anchor - 100
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
          const anchor2 = this.$refs.geren.offsetTop
          console.log(anchor2)
          document.documentElement.scrollTop = anchor2 - 100
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Product/Newadjustprice', name: 'Newadjustprice', fullPath: '/Product/Newadjustprice', title: 'Newadjustprice' }
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
      margin-top: 5px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
