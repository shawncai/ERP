<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="customerForm.id +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="customerForm" :model="customerForm" :rules="customerFormrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.firstname')" prop="firstName" style="width: 100%;">
                <el-input v-model="customerForm.firstName" placeholder="请输入名" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.middlename')" style="width: 100%;">
                <el-input v-model="customerForm.middleName" placeholder="请输入中间名" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.lastname')" prop="lastName" sstyle="width: 100%;">
                <el-input v-model="customerForm.lastName" placeholder="请输入姓氏" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.phone')" prop="phoneNumber" style="width: 100%">
                <el-input v-model="customerForm.phoneNumber" placeholder="请输入客户电话" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.gender')" prop="gender" style="width: 100%">
                <el-radio-group v-model="customerForm.gender" style="margin-left: 18px;width: 200px">
                  <el-radio :label="1" style="width: 100px">{{ $t('public.male') }}</el-radio>
                  <el-radio :label="2">{{ $t('public.female') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.level')" style="width: 100%">
                <el-select v-model="customerForm.level" :value="customerForm.level" placeholder="请选择客户优质级别" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in levels"
                    :key="index"
                    :value="item.id"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item :label="$t('Customer.source')" style="width: 100%">
                <el-select v-model="customerForm.source" :value="customerForm.source" placeholder="请选择客户来源" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in sources"
                    :key="index"
                    :value="item.id"
                    :label="item.categoryName"/>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item :label="$t('Customer.newold')" style="width: 100%">
                <el-select v-model="customerForm.newOrOld" :value="customerForm.newOrOld" placeholder="请选择" style="margin-left: 18px;width: 200px">
                  <el-option label="老" value="1"/>
                  <el-option label="新" value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.address')" prop="address" style="width: 100%">
                <el-input v-model="customerForm.address" placeholder="请输入地址" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('public.countyrId')" style="width: 100%">
                <el-select v-model="customerForm.countryId" placeholder="请选择国家" style="margin-left: 18px;width: 200px" @change ="handlechange">
                  <el-option
                    v-for="(item, index) in nations"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.provinceid')" style="width: 100%">
                <el-select v-model="customerForm.provinceId" placeholder="请选择省" style="margin-left: 18px;width: 200px" @change="handlechange2">
                  <el-option
                    v-for="(item, index) in provinces"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.cityid')" style="width: 100%">
                <el-select v-model="customerForm.cityId" placeholder="请选择市" style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in cities"
                    :key="index"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="修改门店" prop="repositoryid" style="width: 100%">
                <el-select v-model="customerForm.repositoryId" placeholder="请选择门店" filterable style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in repositories"
                    :key="index"
                    :label="item.repositoryName"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Customer.birthday')" style="width: 100%">
                <el-date-picker
                  v-model="customerForm.birthday"
                  type="date"
                  placeholder="选择生日"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">取消</el-button>
        <el-button type="primary" @click="handleEditok()">保存</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { getcountrylist, getprovincelist, getcitylist, searchRepository } from '@/api/public'
import { searchCusCategory, updateCustomer } from '@/api/Customer'
export default {
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
      // 选择的区域数据
      regionId: [],
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      customerForm: this.editdata,
      // 国家列表
      nations: [],
      // 省列表
      provinces: [],
      // 城市列表
      cities: [],
      // 门店列表
      repositories: [],
      // 客户信息数据
      // 客户信息规则数据
      customerFormrules: {
        phoneNumber: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: '请输入姓氏', trigger: 'blur' }
        ],
        firstName: [
          { required: true, message: '请输入名', trigger: 'blur' }
        ]
      },
      // 所有客户类型数据
      // 发送参数
      customertypes: [],
      customertyp: 1,
      // 优质级别类型所有数据
      // 发送参数
      levels: [],
      levelstype: 2,
      // 客户来源所有数据
      // 发送参数
      sources: [],
      sourcestype: 3
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.customerForm = this.editdata
      this.getnationlist()
      this.getCategory()
      this.handlechange(this.customerForm.countryId)
      this.handlechange2(this.customerForm.provinceId)
    }
  },
  methods: {
    getCategory() {
      // 获取客户类型
      searchCusCategory(this.customertyp).then(res => {
        if (res.data.ret === 200) {
          this.customertypes = res.data.data.content.list
        } else {
          console.log('客户类型错误')
        }
      })
      // 获取客户优质级别
      searchCusCategory(this.levelstype).then(res => {
        if (res.data.ret === 200) {
          this.levels = res.data.data.content.list
        } else {
          console.log('客户优质级别错误')
        }
      })
      // 获取客户来源
      searchCusCategory(this.sourcestype).then(res => {
        if (res.data.ret === 200) {
          this.sources = res.data.data.content.list
        } else {
          console.log('客户来源错误')
        }
      })
      // 获取所有门店
      searchRepository().then(res => {
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content.list
        } else {
          console.log('门店错误')
        }
      })
    },
    // 国籍列表
    getnationlist() {
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        } else {
          console.log('国家列表错误')
        }
      })
    },
    // 根据国家选择省
    handlechange(val) {
      getprovincelist(val).then(res => {
        if (res.data.ret === 200) {
          this.provinces = res.data.data.content
        } else {
          console.log('国家选择省错误')
        }
      })
      this.customerForm.provinceId = ''
      this.customerForm.cityId = ''
      this.cities = []
    },
    // 根据省选择市
    handlechange2(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities = res.data.data.content
        } else {
          console.log('省选择市错误')
        }
      })
      this.customerForm.cityId = ''
    },
    // 提交修改
    handleEditok() {
      console.log('修改数据', this.customerForm)
      this.$refs.customerForm.validate((valid) => {
        if (valid) {
          updateCustomer(this.customerForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '操作成功',
                message: '操作成功',
                type: 'success',
                duration: 1000,
                offset: 100
              })
              this.$refs.customerForm.resetFields()
              this.$refs.customerForm.clearValidate()
              this.$emit('rest', true)
              this.editVisible = false
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
    // 取消按钮
    handlecancel() {
      this.$refs.customerForm.resetFields()
      this.$refs.customerForm.clearValidate()
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
