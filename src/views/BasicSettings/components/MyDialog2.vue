<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.visitNumber +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('updates.roleid')" prop="roleId" style="width: 100%;">
                <el-select v-model="personalForm.roleId" disabled style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in roles"
                    :key="index"
                    :label="item.roleName"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('inventoryAlarm.categoryName')" style="width: 100%;">
                <el-select v-model="personalForm.category" disabled style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="整车"/>
                  <el-option value="2" label="配件"/>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('searchSaleOrderDetailReport.productTypeName')" style="width: 100%;">
                <el-select v-model="personalForm.typeId" disabled style="margin-left: 18px;width: 200px" >
                  <el-option
                    v-for="(item, index) in types"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('tongyo.zdzke')" style="width: 100%;">
                <el-input v-model="personalForm.discountMoney" :disabled="notcar" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('tongyo.zdzkl')" style="width: 100%;">
                <el-input-number :controls ="false" v-model="personalForm.discountRate" :disabled="notcar === false" :min="0" :max="1" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
import { updateSaleCategory } from '@/api/BasicSettings'
import { searchEmpCategory2 } from '@/api/Product'
import { getrolelist } from '@/api/employee'
var _that
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
    const validatePass2 = (rule, value, callback) => {
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('请选择回访人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('请选择客户'))
      } else {
        callback()
      }
    }
    return {
      types: [],
      roles: [],
      notcar: false,
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 回显客户
      customerId: '',
      // 控制客户
      customercontrol: false,
      // 回显我方联络人
      handlePersonId: '',
      // 控制我方联络人
      stockControl: false,
      // 控制分期订单
      installmentcontrol: false,
      // 编辑表格数据
      list2: [],
      // 商品信息
      productForm: {},
      // 销售订单规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入洽谈主题', trigger: 'blur' }
        ],
        customerId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        handlePersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        visitDate: [
          { required: true, message: '请选择洽谈日期', trigger: 'change' }
        ],
        visitReson: [
          { required: true, message: '请选择回访事由', trigger: 'change' }
        ],
        visitMode: [
          { required: true, message: '请选择回访方式', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.getinformation()
    }
  },
  created() {
  },
  beforeCreate() {
    _that = this
  },
  methods: {
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

      }
      this.handlePersonId = ''
      this.customerId = ''
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      if (this.personalForm.discountRate === '0' || this.personalForm.discountRate === 0) {
        this.personalForm.discountRate = ''
      }
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null || Data[key] === 0) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          updateSaleCategory(Data).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: 'save successful',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$emit('rest', true)
              this.editVisible = false
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
    handlecancel() {
      this.restAllForm()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
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
    height: 920px;
  }
  .el-col-12{
    width: 49%;
  }
</style>
