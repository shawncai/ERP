<template>
  <el-dialog :visible.sync="editVisible" :control="control" :editdata="editdata" :close-on-press-escape="false" :title="$t('updates.tjdxx')" top="10px" @close="$emit('update:control', false)">
    <!--基本信息-->
    <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
    <div class="container">
      <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
        <el-form-item :label="$t('Product.title')" prop="title" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.title" placeholder="请输入变更单主题" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Product.productname2')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.productName" placeholder="请输入物品名称" disabled/>
        </el-form-item>
        <el-form-item :label="$t('Product.productcode')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.productCode" disabled/>
        </el-form-item>
        <el-form-item :label="$t('Product.saleprice2')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.salePrice" disabled/>
        </el-form-item>
        <el-form-item :label="$t('Product.tradeprice2')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.tradePrice" disabled/>
        </el-form-item>
        <el-form-item :label="$t('Product.costprice2')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.costPrice" disabled/>
        </el-form-item>
        <el-form-item :label="$t('Product.memberprice2')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.memberPrice" disabled/>
        </el-form-item>
        <el-form-item :label="$t('Product.lowerprice2')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.lowerPrice" disabled/>
        </el-form-item>
        <el-form-item :label="$t('Product.adjustsaleprice')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.adjustSalePrice" placeholder="请输入调整零售价" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Product.adjusttradeprice')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.adjustTradePrice" placeholder="请输入调整批发价" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Product.adjustcostprice')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.adjustCostPrice" placeholder="请输入调整成本价" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Product.adjustmemberprice')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.adjustMemberPrice" placeholder="请输入调整会员价" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Product.adjustlowerprice')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.adjustLowerPrice" placeholder="请输入调整最低价" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Product.adjustpersonid')" style="width: 40%;margin-top:1%">
          <el-input v-model="adjustpersonid" clearable @focus="handlechoose"/>
        </el-form-item><br>
        <my-emp :control.sync="empcontrol" @personName="personName"/>
        <el-form-item :label="$t('Product.adjustreason')" style="width: 82%;margin-top:1%">
          <el-input v-model="personalForm.adjustReason" type="textarea" clearable/>
        </el-form-item>
      </el-form>
    </div>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateadjustprice } from '@/api/Product'
import MyEmp from './MyEmp'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyEmp },
  props: {
    control: {
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
      editVisible: this.control,
      // 价格变更单信息数据
      personalForm: this.editdata,
      // 采购员弹窗控制
      empcontrol: false,
      // 申请人回显
      adjustpersonid: '',
      // 个人信息规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入变更单主题', trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '请输入物品名称', trigger: 'blur' }
        ],
        productCode: [
          { required: true, message: '请输入物品编码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    control() {
      this.editVisible = this.control
    },
    editdata() {
      this.personalForm = this.editdata
      this.adjustpersonid = this.editdata.adjustPersonName
      console.log(this.editdata)
    }
  },
  methods: {
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
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      console.log(this.personalForm)
      updateadjustprice(this.personalForm).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
          this.restAllForm()
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
    },
    handlecancel() {
      this.restAllForm()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
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
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>

</style>
