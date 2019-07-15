<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" top="10px" title="修改物料单" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.bomNumber')" prop="bomNumber" style="width: 100%;">
                <el-input v-model="personalForm.bomNumber" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.bomTypeId')" prop="bomTypeId" style="width: 100%;">
                <el-select v-model="personalForm.bomTypeId" style="margin-left: 18px;width: 150px" clearable >
                  <el-option value="1" label="工艺BOM"/>
                  <el-option value="2" label="设计BOM"/>
                  <el-option value="3" label="制造BOM"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.isActive')" prop="isActive" style="width: 100%;">
                <el-radio-group v-model="personalForm.isActive" style="width: 150px;margin-left: 19px">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="2">未启用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.version')" style="width: 100%;">
                <el-select v-model="personalForm.version" style="margin-left: 18px;width: 150px" clearable >
                  <el-option value="1" label="版本1"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.summary')" style="width: 100%;">
                <el-input v-model="personalForm.summary" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--父件信息-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="geren" class="form-name">父件信息</h2>
      <div class="container">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.productName')" prop="productName" style="width: 100%;">
                <el-input v-model="personalForm.productName" style="margin-left: 18px;width: 150px" @focus="handlemater"/>
              </el-form-item>
            </el-col>
            <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.unit')" prop="unit" style="width: 100%;">
                <el-input v-model="personalForm.unit" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.productTypeId')" prop="productTypeId" style="width: 100%;">
                <el-input v-model="productTypeId" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--物料单明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">子件信息</h2>
      <div class="buttons" style="margin-top: 30px;margin-bottom: 20px">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">添加商品</el-button>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">删除</el-button>
      </div>
      <my-detail :control.sync="control" @product="productdetail"/>
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
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column prop="productCode" align="center" label="子件" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="子件名称" min-width="150px"/>
          <el-editable-column prop="productType" align="center" label="规格" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column prop="productCategory" align="center" label="子件类型" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="quantity" align="center" label="定额" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="lossRate" align="center" label="损耗率" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElSelect', options: isKeyList, type: 'visible'}" prop="isKey" align="center" label="是否关键件" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">修改</el-button>
      <el-button type="danger" @click="handlecancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updatematerials } from '@/api/MaterialsList'
import MyDetail from './MyDetail'
import MyMater from './MyMater'
export default {
  components: { MyDetail, MyMater },
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
      // 修改信息数据
      personalForm: this.editdata,
      // 父件型号回显
      productTypeId: '',
      // 控制父件窗口
      matercontrol: false,
      // 是否为关键数据
      isKeyList: [{ value: 1, label: '是' }, { value: 2, label: '否' }],
      // 控制商品列表窗口
      control: false,
      // 物料单规则数据
      personalrules: {
        bomNumber: [
          { required: true, message: '请输入BOM编码', trigger: 'blur' }
        ],
        bomTypeId: [
          { required: true, message: '请选择BOM类型', trigger: 'change' }
        ],
        isActive: [
          { required: true, message: '请选择启用状态', trigger: 'change' }
        ],
        productName: [
          { required: true, message: '请选择父件', trigger: 'blue' }
        ]
      },
      // 物料单明细数据
      list2: [],
      // 物料单明细列表规则
      validRules: {
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.list2 = this.personalForm.materialsListDetailVos
    }
  },
  methods: {
    // 父件focus事件
    handlemater() {
      this.matercontrol = true
    },
    mater(val) {
      this.personalForm.productName = val.productName
      this.personalForm.unit = val.purMeasu
      this.personalForm.productTypeId = val.typeId
      this.productTypeId = val.productType
    },
    // 新增物料单明细
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.productTypeId = null
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      console.log(this.personalForm)
      const rest = this.$refs.editable.getRecords()
      console.log(rest)
      if (rest.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '采购入库明细表不能为空',
          offset: 100
        })
        return false
      }
      rest.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.categoryId === null || elem.categoryId === '' || elem.categoryId === undefined) {
          delete elem.categoryId
        }
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
        }
        if (elem.lossRate === null || elem.lossRate === '' || elem.lossRate === undefined) {
          delete elem.lossRate
        }
        if (elem.isKey === null || elem.isKey === '' || elem.isKey === undefined) {
          delete elem.isKey
        }
        return elem
      })
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      const parms2 = JSON.stringify(rest)
      updatematerials(parms, parms2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
          this.$refs.editable.clear()
          this.$refs.personalForm.clearValidate()
          this.$refs.personalForm.resetFields()
          this.$refs.personalForm2.clearValidate()
          this.$refs.personalForm2.resetFields()
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
      this.$refs.editable.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.$refs.personalForm2.clearValidate()
      this.$refs.personalForm2.resetFields()
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
