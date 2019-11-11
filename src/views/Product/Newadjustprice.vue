<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Product.title')" prop="title" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.title" placeholder="请输入变更单主题" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.productname2')" prop="productname" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.productname" placeholder="请输入物品名称" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.productcode')" prop="productcode" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.productcode" placeholder="请输入物品编码" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.saleprice2')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.saleprice" placeholder="请输入当前零售价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.tradeprice2')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.tradeprice" placeholder="请输入当前批发价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.costprice2')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.costprice" placeholder="请输入当前成本价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.memberprice2')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.memberprice" placeholder="请输入当前会员价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.lowerprice2')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.lowerprice" placeholder="请输入当前最低价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.adjustsaleprice')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.adjustsaleprice" placeholder="请输入调整零售价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.adjusttradeprice')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.adjusttradeprice" placeholder="请输入调整批发价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.adjustcostprice')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.adjustcostprice" placeholder="请输入调整成本价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.adjustmemberprice')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.adjustmemberprice" placeholder="请输入调整会员价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.adjustlowerprice')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.adjustlowerprice" placeholder="请输入调整最低价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.adjustpersonid')" style="width: 40%;margin-top:1%">
            <el-input v-model="adjustpersonid" clearable @focus="handlechoose"/>
          </el-form-item><br>
          <my-emp :control.sync="empcontrol" @personName="personName"/>
          <el-form-item :label="$t('Product.adjustreason')" style="width: 82%;margin-top:1%">
            <el-input v-model="personalForm.adjustreason" type="textarea" clearable/>
          </el-form-item>
        </el-form>
      </div>

      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-permission="['1-31-34-1']" type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button v-permission="['1-31-34-1']" type="success" @click="handleentry()">继续录入</el-button>
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
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$router.go(-1)
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
                offset: 100
              })
            }
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
                title: '成功',
                message: '保存成功',
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
                title: '错误',
                message: res.data.msg,
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
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
    margin:0px 30px;
    .form-name{
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 30px;
    }
    .container{
      margin-top: 2%;
      border: 1px solid #eceff6;
    }
  }
</style>
