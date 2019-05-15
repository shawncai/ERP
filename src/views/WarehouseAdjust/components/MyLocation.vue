<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" top="10px" title="修改货位单" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.locationCode')" prop="locationCode" style="width: 100%;">
                <el-input v-model="personalForm.locationCode" placeholder="请输入货位编号" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.locationName')" prop="locationName" style="width: 100%;">
                <el-input v-model="personalForm.locationName" placeholder="请输入货位名称" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.length')" prop="length" style="width: 100%;">
              <el-input v-model="personalForm.length" placeholder="请输入货位长" style="margin-left: 18px;width: 150px" clearable/></el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.width')" prop="width" style="width: 100%;">
              <el-input v-model="personalForm.width" placeholder="请输入货位宽" style="margin-left: 18px;width: 150px" clearable/></el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.height')" prop="height" style="width: 100%;">
              <el-input v-model="personalForm.height" placeholder="请输入货位高" style="margin-left: 18px;width: 150px" clearable/></el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.repositoryId')" prop="repositoryId" style="width: 100%;">
                <el-input v-model="repositoryId" placeholder="请选择仓库" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseRep"/>
              </el-form-item>
            </el-col>
            <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/><br>
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
import { updatelocation } from '@/api/WarehouseAdjust'
import MyCreate from './MyCreate'
import MyRepository from './MyRepository'
import MyDetail from './MyDetail'
export default {
  components: { MyRepository, MyCreate, MyDetail },
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
      // 供应商信息数据
      personalForm: this.editdata,
      // 控制仓库弹窗
      repositorycontrol: false,
      repositoryId: '',
      // 货位单规则数据
      personalrules: {
        locationCode: [
          { required: true, message: '请输入货位编号', trigger: 'blur' }
        ],
        locationName: [
          { required: true, message: '请输入货位名称', trigger: 'blur' }
        ],
        length: [
          { required: true, message: '请输入货位长', trigger: 'blur' }
        ],
        width: [
          { required: true, message: '请输入货位宽', trigger: 'blur' }
        ],
        height: [
          { required: true, message: '请输入货位高', trigger: 'blur' }
        ],
        repositoryId: [
          { required: true, message: '请选择仓库', trigger: 'blue' }
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
    }
  },
  methods: {
    // 入库人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 员工列表返回经办人数据
    createname(val) {
      console.log(val)
      this.enterPersonId = val.personName
      this.personalForm.enterPersonId = val.id
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
    // 入库单事件
    // 新增入库单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      this.list2 = val
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      console.log(this.personalForm)
      const parms = JSON.stringify(this.personalForm)
      updatelocation(parms).then(res => {
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

<style scoped>
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
  }
</style>
