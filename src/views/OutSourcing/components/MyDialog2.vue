<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('update4.zt')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.personId')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" style="width: 200px" clearable @focus="handlechooseStock"/>
              </el-form-item>
              <my-delivery :deliverycontrol.sync="stockControl" @deliveryName="stockName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSourcing.outFactoryId')" prop="factoryId" style="width: 100%;">
                <el-input v-model="factoryId" style="width: 200px" clearable @focus="chooseFactory"/>
              </el-form-item>
              <my-factory :factorycontrol.sync="factorycontrol" @factoryName="factoryName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('update4.adjustDate')" prop="adjustDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.adjustDate"
                  :placeholder="$t('update4.adjustDate')"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card :body-style=" { padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px; margin-bottom: 200px">
      <div ref="fuzhu" class="form-name">{{ $t('Hmodule.jghmx') }}</div>
      <div class="buttons" style="margin-top: 58px">
        <el-button type="danger" @click="deleteeditable()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          class="click-table1"
          stripe
          border
          size="small"
          style="width: 100%">
          <el-editable-column type="selection" width="85" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column :label="$t('update4.oldPrice')" prop="oldPrice" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('update4.newPrice')" prop="newPrice" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :controls="false"
                :min="0.00"
                v-model="scope.row.newPrice"
              />
            </template>
          </el-editable-column>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button :loading="saveloding" type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updateFactoryAdjust } from '@/api/OutSourcing'
import MyDelivery from './MyDelivery'
import MyFactory from './MyFactory'
import MyDetail from './MyDetail'
import MyMaterials from './MyMaterials'

var _that
export default {
  components: { MyDetail, MyFactory, MyDelivery, MyMaterials },
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
      console.log(value)
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      saveloding: false,
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 合计
      heji: 0,
      // 外包工厂回显
      factoryId: '',
      // 控制外包工厂
      factorycontrol: false,
      // 经办人回显
      handlePersonId: '',
      // 控制经办人
      stockControl: false,
      // 控制商品列表窗口
      control: false,
      // 主生产任务规则数据
      personalrules: {
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        factoryId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        productionDate: [
          { required: true, message: '请选择生产日期', trigger: 'change' }
        ],
        completeDate: [
          { required: true, message: '请选择完成日期', trigger: 'change' }
        ]
      },
      // 主生产任务明细数据
      list2: [],
      list3: [],
      deleteselectdata: [],
      // 主生产任务明细列表规则
      validRules: {
      },
      // 外包工厂代入选项
      selectList: []
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      console.log('this.personalForm=======', this.personalForm)
      this.handlePersonId = this.personalForm.handlePersonName
      this.factoryId = this.personalForm.factoryName
      this.list2 = this.personalForm.outsourceAdjustDetailVos
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    deleteeditable() {
      this.$refs.editable.removeSelecteds()
    },
    // 外包工厂focus事件
    chooseFactory() {
      this.factorycontrol = true
    },
    // 外包工厂回显
    factoryName(val) {
      console.log('val==================', val)

      this.factoryId = val.factoryName
      this.personalForm.factoryId = val.id
      const factoryarr = val.outFactoryDetailVos.map(item => {
        return {
          productCode: item.productCode,
          productName: item.productName,
          typeId: item.type,
          color: item.color,
          unit: item.unit,
          oldPrice: item.price,
          newPrice: 0,
          productType: item.productTypeName
        }
      })
      this.list2 = factoryarr
    },
    // 经办人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 经办人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      delete this.personalForm.judgeStat
      delete this.personalForm.receiptStat
      delete this.personalForm.approvalUseVos
      delete this.personalForm.outsourceAdjustDetailVos

      this.saveloding = true

      setTimeout(() => {
        const EnterDetail = this.$refs.editable.getRecords()
        if (EnterDetail.length === 0) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.nonedetail'),
            offset: 100
          })
          this.saveloding = false
          return false
        }
        const parms2 = JSON.stringify(EnterDetail)
        const Data = this.personalForm
        for (const key in Data) {
          if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
            delete Data[key]
          }
        }
        const parms = JSON.stringify(Data)
        this.$refs.personalForm.validate((valid) => {
          if (valid) {
            updateFactoryAdjust(parms, parms2).then(res => {
              console.log(res)
              if (res.data.ret === 200) {
                this.$notify({
                  title: 'successful',
                  message: 'save successful',
                  type: 'success',
                  offset: 100
                })
                this.$emit('rest', true)
                this.$refs.editable.clear()
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
                this.editVisible = false
              } else {
                this.$notify.error({
                  title: 'wrong',
                  message: res.data.msg,
                  offset: 100
                })
              }
              this.saveloding = false
            })
          } else {
            this.$notify.error({
              title: 'wrong',
              message: 'Information is incomplete',
              offset: 100
            })
            this.saveloding = false
            return false
          }
        })
      }, 0.5 * 1000)
    },
    handlecancel() {
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
    left: 0;
  }
  .el-col-12{
    width: 49%;
  }
</style>
