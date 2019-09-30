<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="normal" width="850px" title="修改库存预警" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('inventoryAlarm.repositoryId')" prop="repositoryId" style="width: 100%;">
                <el-input v-model="repositoryId" placeholder="请选择仓库" style="margin-left: 50px;width:200px" clearable @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.productId')" prop="productCode" style="width: 100%;margin-left: 20px;">
                <el-input v-model="productCode" placeholder="请选择商品" style="margin-left: 57px;width:200px" clearable @focus="handleAddproduct"/>
                <my-product :control.sync="control" @product="productdetail"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('inventoryAlarm.alarmDays')" prop="alarmDays" style="width: 100%;margin-left: 38px;">
                <el-input-number v-model="personalForm.alarmDays" :precision="0" :controls="false" :step="1" :min="0" style="margin-left: 66px;width:200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">修改</el-button>
      <el-button type="danger" @click="handlecancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { update } from '@/api/InventoryAlarm'
import MyRepository from './MyRepository'
import MyProduct from './MyProduct'
export default {
  components: { MyRepository, MyProduct },
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
    const validatePass = (rule, value, callback) => {
      console.log(this.repositoryId)
      if (this.repositoryId === undefined || this.repositoryId === null || this.repositoryId === '') {
        callback(new Error('请选择仓库'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(this.productCode)
      if (this.productCode === undefined || this.productCode === null || this.productCode === '') {
        callback(new Error('请选择商品'))
      } else {
        callback()
      }
    }
    return {
      // 商品编码
      productCode: '',
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改row数据
      personalForm: this.editdata,
      // 商品回显
      productId: '',
      // 仓库回显
      repositoryId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制商品列表窗口
      control: false,
      // 库存预警规则数据
      personalrules: {
        repositoryId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        productCode: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        downStock: [
          { required: true, message: '请输入库存下限', trigger: 'blur' }
        ],
        alarmDays: [
          { required: true, message: '请输入报警天数', trigger: 'blur' }
        ],
        safeStock: [
          { required: true, message: '请输入安全库存', trigger: 'blur' }
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
      this.repositoryId = this.personalForm.repositoryName
      this.productCode = this.personalForm.productName
    }
  },
  methods: {
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.repositoryId = val.repositoryName
      this.personalForm.repositoryId = val.id
    },
    // 选择商品
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      this.personalForm.productCode = val.code
      this.productCode = val.productName
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createId = 3
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      update(parms).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
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
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .normal >>> .el-dialog__header {
    padding: 20px 20px 10px;
    background: #fff;
    position: static;
    top: auto;
    z-index: auto;
    width: auto;
    border-bottom: none;
  }
  .normal >>> .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    height: auto;
  }
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 24px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .ERP-container {
    margin: 0px 30px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 140px;
    margin-left: 20px;
  }
</style>
