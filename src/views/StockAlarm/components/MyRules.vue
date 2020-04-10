<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="$t('updates.xgkcyj')" class="edit" width="1010px" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.enterRepositoryId')" prop="repositoryId" style="width: 100%;">
                <el-input v-model="repositoryId" placeholder="请选择仓库" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.upStock')" prop="upStock" style="width: 100%;">
                <el-input v-model="personalForm.upStock" placeholder="请输入最高库存" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.downStock')" prop="downStock" style="width: 100%;">
                <el-input v-model="personalForm.downStock" placeholder="请输入最低库存" style="margin-left: 18px;width:200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.safeStock')" prop="safeStock" style="width: 100%;">
                <el-input v-model="personalForm.safeStock" placeholder="请输入安全库存" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.productId')" prop="productId" style="width: 100%;">
                <el-input v-model="productId" placeholder="请选择商品" style="margin-left: 18px;width: 150px" clearable @focus="handleAddproduct"/>
                <my-product :control.sync="control" @product="productdetail"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updatealarmrules } from '@/api/StockAlarm'
import MyRepository from './MyRepository'
import MyProduct from './MyProduct'
// eslint-disable-next-line no-unused-vars
var _that
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
    return {
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
          { required: true, message: '请选择仓库', trigger: 'blue' }
        ],
        productId: [
          { required: true, message: '请选择商品', trigger: 'change' }
        ],
        downStock: [
          { required: true, message: '请输入库存下限', trigger: 'blur' }
        ],
        upStock: [
          { required: true, message: '请输入库存上限', trigger: 'blur' }
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
      this.productId = this.personalForm.productName
    }
  },
  beforeCreate() {
    _that = this
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
      this.personalForm.productId = val.id
      this.productId = val.productName
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
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
      updatealarmrules(parms).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
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
            title: 'wrong',
            message: 'wrong',
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

<style scoped>
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
</style>
