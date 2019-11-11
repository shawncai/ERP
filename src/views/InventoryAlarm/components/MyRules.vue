<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="normal" width="1010px" title="修改库存预警" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('inventoryAlarm.repositoryId')" prop="repositoryId" style="width: 100%;">
                <el-input v-model="repositoryId" placeholder="请选择仓库" style="margin-left: 18px;width:200px" clearable @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('inventoryAlarm.handlePerson')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" placeholder="经办人" style="margin-left: 18px;width:200px" clearable @focus="handlechooseAccept"/>
              </el-form-item>
              <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('inventoryAlarm.createDate')" prop="creatDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.createDate"
                  placeholder="创建时间"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!-- 货物流转规则明细 -->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">货物流转规则明细</h2>
      <div class="buttons" style="margin-top: 58px">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        <!-- <el-button type="primary" @click="checkStock()">库存快照</el-button> -->
      </div>
      <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column label="编号" width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1, precision: 0}, type: 'visible'}" :label="$t('inventoryAlarm.alarmDays')" prop="alarmDays" align="center" min-width="200">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="0"
                :controls="true"
                :min="1"
                v-model="scope.row.alarmDays"
              />
            </template>
          </el-editable-column>
        </el-editable>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">修改</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { update } from '@/api/InventoryAlarm'
import MyRepository from './MyRepository'
import MyProduct from './MyProduct'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
export default {
  components: { MyRepository, MyProduct, MyAccept, MyDetail },
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
      // 明细
      list2: [],
      handlePersonId: '',
      // 出库人控制框
      accetpcontrol: false,
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
      },
      validRules: {}
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.repositoryId = this.personalForm.repositoryName
      this.handlePersonId = this.personalForm.createName
      console.log(this.personalForm)
      console.log(this.personalForm.createDate)
      this.list2 = this.personalForm.inventoryAlarmRulesDetailVos
    }
  },
  methods: {
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 出库人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    // 出库人列表返回数据
    acceptName(val) {
      this.handlePersonId = val.personName
      this.personalForm.createId = val.id
    },
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
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: '错误',
              message: '物品已添加',
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      // this.personalForm.repositoryId = this.$store.getters.repositoryId
      // this.personalForm.regionId = this.$store.getters.regionId
      // this.personalForm.createId = 3
      // this.personalForm.createId = this.$store.getters.userId
      // this.personalForm.countryId = this.$store.getters.countryId
      // this.personalForm.modifyPersonId = this.$store.getters.userId
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const EnterDetail = this.$refs.editable.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }
      const parms2 = JSON.stringify(EnterDetail)
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate((valid) => {
            if (valid) {
              update(parms, parms2).then(res => {
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
                  this.$refs.editable.clear()
                  this.editVisible = false
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: '出错了',
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
