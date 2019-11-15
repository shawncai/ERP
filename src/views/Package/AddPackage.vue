<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Package.packageName')" prop="packageName" style="width: 100%;">
                  <el-input v-model="personalForm.packageName" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
          <el-checkbox v-model="checkAll" style="margin-left: 20px" @change="handleCheckAllChange">全部门店</el-checkbox>
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
            <el-editable-column prop="color" align="center" :label="$t('updates.ys')" min-width="150px"/>
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
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addPackage } from '@/api/Package'
import MyDetail from './components/MyDetail'
import MyRepository from './components/MyRepository'
import MyDetail2 from './components/MyDetail2'
var _that
export default {
  name: 'AddPackage',
  components: { MyDetail2, MyRepository, MyDetail },
  data() {
    return {
      // 控制赠送商品
      detailcontrol: false,
      // 控制主商品
      control: false,
      // 是否全选
      checkAll: false,
      // 控制门店
      repositorycontrol: false,
      // 配送单信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryFlag: 2
      },
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
      this.personalForm.suitRepositorys = ',' + val.join(',') + ','
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        suitRepositorys: null,
        repositoryFlag: 2
      }
    },
    // 保存操作
    handlesave() {
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
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addPackage(parms, parms2).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.editable.clear()
              this.$refs.editable2.clear()
              this.$refs.editable3.clear()
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
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Package/AddPackage', name: 'AddPackage', fullPath: '/Package/AddPackage', title: 'AddPackage' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin-right: 0;
    .form-name{
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 20px;
    }
    .container{
      margin-top: 40px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
