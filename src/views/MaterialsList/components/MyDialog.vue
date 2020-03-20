<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="$t('updates.xgwlqd')" class="edit" width="1010px" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: 63px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('MaterialsList.bomNumber')" prop="bomNumber" style="width: 100%;">
                <el-input v-model="personalForm.bomNumber" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('MaterialsList.bomTypeId')" prop="bomTypeId" style="width: 100%;">
                <el-select v-model="personalForm.bomTypeId" style="margin-left: 18px;width: 200px" clearable >
                  <el-option value="1" label="工艺BOM"/>
                  <el-option value="2" label="设计BOM"/>
                  <el-option value="3" label="制造BOM"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('MaterialsList.isActive')" prop="isActive" style="width: 100%;">
                <el-radio-group v-model="personalForm.isActive" style="width: 200px;margin-left: 19px">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="2">未启用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('MaterialsList.version')" style="width: 100%;">
                <el-select v-model="personalForm.version" style="margin-left: 18px;width: 200px" clearable >
                  <el-option value="1" label="版本1"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('MaterialsList.summary')" style="width: 100%;">
                <el-input v-model="personalForm.summary" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--父件信息-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="geren" class="form-name">{{ $t('updates.fjxx') }}</h2>
      <div class="container">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('MaterialsList.productName')" prop="productName" style="width: 100%;">
                <el-input v-model="personalForm.productName" style="margin-left: 18px;width: 200px" @focus="handlemater"/>
              </el-form-item>
            </el-col>
            <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
            <el-col :span="12">
              <el-form-item :label="$t('MaterialsList.unit')" prop="unit" style="width: 100%;">
                <el-input v-model="personalForm.unit" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('MaterialsList.productTypeId')" prop="productTypeId" style="width: 100%;">
                <el-input v-model="productTypeId" style="margin-left: 18px;width: 200px" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--物料单明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">{{ $t('updates.zjxx') }}</h2>
      <div class="buttons" style="margin-top: 30px;margin-bottom: 20px">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <my-detail :control.sync="control" :checklist.sync="checklist" @product="productdetail"/>
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
          <el-editable-column type="selection" fixed="left" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="55" align="center" type="index"/>
          <el-editable-column :label="$t('updates.zj')" prop="productCode" fixed="left" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.zjmc')" prop="productName" fixed="left" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.zjlx')" prop="productCategory" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.de')" prop="quantity" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.shl')" prop="lossRate" align="center" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElSelect', options: isKeyList, type: 'visible'}" :label="$t('updates.sfgjj')" prop="isKey" align="center" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updatematerials, isExist } from '@/api/MaterialsList'
import MyDetail from './MyDetail2'
import MyMater from './MyMater'
var _that
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
      checklist: [],
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
  beforeCreate() {
    _that = this
  },
  methods: {
    uniqueArray(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    // 父件focus事件
    handlemater() {
      this.matercontrol = true
    },
    mater(val) {
      isExist(val.code).then(res => {
        if (res.data.data.content === false) {
          this.personalForm.productName = val.productName
          this.personalForm.unit = val.purMeasu
          this.personalForm.productTypeId = val.typeId
          this.productTypeId = val.productType
          this.personalForm.productCode = val.code
          this.personalForm.color = val.color
        } else if (res.data.data.content === true) {
          this.$notify.error({
            title: 'wrong',
            message: '物料已添加',
            offset: 100
          })
          return false
        }
      })
    },
    // 新增物料单明细
    handleAddproduct() {
      this.control = true
      this.checklist = this.$refs.editable.getRecords()
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      const alldata = [...val, ...nowlistdata]
      const filterdata = this.uniqueArray(alldata, 'productCode')
      this.list2 = filterdata

      // console.log(nowlistdata)
      // var ret4 = val.findIndex((value, index, arr) => {
      //   return value.productCode === this.personalForm.productCode
      // })

      // console.log(ret4)
      // this.list2 = val.filter(item => {
      //   return item.productCode !== this.personalForm.productCode
      // })
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
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
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
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
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
            title: 'wrong',
            message: 'wrong',
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
</style>
