<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.chatNumber +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerMarketing.title')" prop="title" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerMarketing.customerId')" prop="customerName" style="width: 100%;">
                <el-input v-model="personalForm.customerName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerMarketing.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
              </el-form-item>
              <my-emp :control.sync="stockControl" @stockName="stockName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerMarketing.phase')" style="width: 100%;">
                <el-select v-model="personalForm.phase" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="阶段1"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerMarketing.chatMode')" style="width: 100%;">
                <el-select v-model="personalForm.chatMode" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="电话"/>
                  <el-option value="2" label="邮件"/>
                  <el-option value="3" label="远程视频"/>
                  <el-option value="4" label="会面拜访"/>
                  <el-option value="5" label="综合"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerMarketing.chatDate')" prop="chatDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.chatDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerMarketing.actionDesc')" style="width: 100%;">
                <el-input v-model="personalForm.actionDesc" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerMarketing.customerReturn')" style="width: 100%;">
                <el-input v-model="personalForm.customerReturn" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('CustomerMarketing.remarks')" style="width: 100%;">
                <el-input v-model="personalForm.remarks" style="margin-left: 18px;width: 200px" clearable/>
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
import { updateCustomerChat } from '@/api/CustomerMarketing'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import MyMater from './MyMater'
import MyInstallment from './MyInstallment'
import MyRepository from './MyRepository'
export default {
  components: { MyRepository, MyInstallment, MyMater, MyDetail, MyEmp },
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
        callback(new Error('请选择我方联络人'))
      } else {
        callback()
      }
    }
    return {
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
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
        customerName: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' }
        ],
        handlePersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        chatDate: [
          { required: true, message: '请选择洽谈日期', trigger: 'change' }
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
      this.handlePersonId = this.personalForm.handlePersonName
    }
  },
  created() {
  },
  methods: {
    // 我方联络人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 我方联络人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: 3,
        countryId: 1,
        repositoryId: 438,
        regionId: 2
      }
      this.handlePersonId = ''
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = 438
      this.personalForm.regionId = 2
      this.personalForm.createPersonId = 3
      this.personalForm.countryId = 1
      this.personalForm.modifyPersonId = 3
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          updateCustomerChat(parms).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
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
    handlecancel() {
      this.restAllForm()
      this.$refs.editable.clear()
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
