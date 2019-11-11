<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.id +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Package.packageName')" prop="packageName" style="width: 100%;">
                <el-input v-model="personalForm.packageName" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Package.isEffective')" prop="isEffective" style="width: 100%;">
                <el-radio-group v-model="personalForm.isEffective" style="margin-left: 18px;width: 200px">
                  <el-radio :label="1" style="width: 100px">应用</el-radio>
                  <el-radio :label="2">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >适用门店</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button @click="handleAddRep">选择门店</el-button>
        <my-repository :repositorycontrol.sync="repositorycontrol" @repossitoryData="repossitoryData" @repossitoryIds="repossitoryIds"/>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        <el-checkbox v-model="checkAll" :label="personalForm.packageName" style="margin-left: 20px" @change="handleCheckAllChange">全部门店</el-checkbox>
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column prop="repositoryName" align="center" label="门店名称" min-width="150px"/>
          <el-editable-column prop="categoryName" align="center" label="门店类型" min-width="150px"/>
          <el-editable-column prop="managerName" align="center" label="负责人" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name">主商品</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
      </div>
      <my-detail :control.sync="control" @product="product"/>
      <div class="container">
        <el-editable
          ref="editable2"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules2"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column label="编号" width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column prop="salePrice" align="center" label="零售价" min-width="150px"/>
          <el-editable-column prop="costPrice" align="center" label="出厂价" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name">赠送商品</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button @click="handleAddgift">{{ $t('Hmodule.tjsp') }}</el-button>
        <el-button type="danger" @click="$refs.editable3.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <my-detail2 :detailcontrol.sync="detailcontrol" @giftProduct="giftProduct"/>
      <div class="container">
        <el-editable
          ref="editable3"
          :data.sync="list3"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules3"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column label="编号" width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
        </el-editable>
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
import { updatePackage } from '@/api/Package'
import MyDetail from './MyDetail'
import MyRepository from './MyRepository'
import MyDetail2 from './MyDetail2'
export default {
  components: { MyDetail2, MyRepository, MyDetail },
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
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 控制赠送商品
      detailcontrol: false,
      // 控制主商品
      control: false,
      // 是否全选
      checkAll: false,
      // 控制门店
      repositorycontrol: false,
      // 配送单规则数据
      personalrules: {
        packageName: [
          { required: true, message: '请输入组合名称', trigger: 'blur' }
        ],
        isEffective: [
          { required: true, message: '请选择应用状态', trigger: 'change' }
        ]
      },
      // 门店明细数据
      list: [],
      // 主商品明细数据
      list2: [],
      // 赠送商品明细数据
      list3: [],
      // 主商品明细列表规则
      validRules: {
      },
      validRules2: {
      },
      validRules3: {
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      const listarray = new Array(this.personalForm)
      this.list2 = listarray.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          productType: item.productType,
          typeId: item.typeId,
          color: item.color,
          unit: item.unit,
          salePrice: item.salePrice,
          costPrice: item.costPrice
        }
      })
      this.list3 = this.personalForm.packageSubVos
      if (this.personalForm.repositoryFlag === 1) {
        this.checkAll = true
      }
      this.list = this.personalForm.repositoryVos
    }
  },
  methods: {
    // 选择赠送商品
    handleAddgift() {
      this.detailcontrol = true
    },
    giftProduct(val) {
      const nowlistdata = this.$refs.editable3.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].id === nowlistdata[j].id) {
            this.$notify.error({
              title: '错误',
              message: '商品已添加',
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable3.insert(val[i])
      }
    },
    // 选择主商品
    handleAddproduct() {
      this.control = true
    },
    product(val) {
      this.$refs.editable2.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable2.insert(val[i])
      }
    },
    // 是否全选门店
    handleCheckAllChange(val) {
      if (val) {
        this.personalForm.repositoryFlag = 1
        this.personalForm.suitRepositorys = null
      } else {
        this.personalForm.repositoryFlag = 2
      }
    },
    // 选择门店
    handleAddRep() {
      this.repositorycontrol = true
    },
    // 加载门店
    repossitoryData(val) {
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].id === nowlistdata[j].id) {
            this.$notify.error({
              title: '错误',
              message: '门店已添加',
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    repossitoryIds(val) {
      this.personalForm.suitRepositorys = val.join(',')
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        suitRepositorys: null
      }
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      const EnterDetail = this.$refs.editable2.getRecords()
      console.log(EnterDetail)
      console.log(this.personalForm)
      const obj = Object.assign(EnterDetail[0], this.personalForm)
      console.log(obj)
      for (const key in obj) {
        if (obj[key] === '' || obj[key] === undefined || obj[key] === null) {
          delete obj[key]
        }
      }
      const parms = JSON.stringify(obj)
      const EnterDetail2 = this.$refs.editable3.getRecords()
      EnterDetail2.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail2)
      updatePackage(parms, parms2).then(res => {
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
          this.$refs.editable2.clear()
          this.$refs.editable3.clear()
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
      this.$refs.editable.clear()
      this.$refs.editable2.clear()
      this.$refs.editable3.clear()
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
    height: 950px;
  }
  .el-col-12{
    width: 49%;
  }
</style>
