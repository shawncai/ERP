<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.bomNumber')" prop="bomNumber" style="width: 100%;">
                  <el-input v-model="personalForm.bomNumber" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.bomTypeId')" prop="bomTypeId" style="width: 100%;">
                  <el-select v-model="personalForm.bomTypeId" style="margin-left: 18px;width: 200px" clearable >
                    <el-option value="1" label="工艺BOM"/>
                    <el-option value="2" label="设计BOM"/>
                    <el-option value="3" label="制造BOM"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.isActive')" prop="isActive" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isActive" style="margin-left: 18px;width: 200px">
                    <el-radio :label="1" style="width: 100px">启用</el-radio>
                    <el-radio :label="2">未启用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.version')" style="width: 100%;">
                  <el-select v-model="personalForm.version" style="margin-left: 18px;width: 200px" clearable >
                    <el-option value="1" label="版本1"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.summary')" style="width: 100%;">
                  <el-input v-model="personalForm.summary" style="margin-left: 18px;width:200px" clearable/>
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
                  <el-input v-model="personalForm.productName" style="margin-left: 18px;width:200px" @focus="handlemater"/>
                </el-form-item>
              </el-col>
              <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.unit')" prop="unit" style="width: 100%;">
                  <el-input v-model="personalForm.unit" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.productTypeId')" prop="productTypeId" style="width: 100%;">
                  <el-input v-model="productTypeId" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.code')" style="width: 100%;">
                  <el-input v-model="personalForm.productCode" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.color')" prop="color" style="width: 100%;">
                  <el-input v-model="personalForm.color" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">子件信息</h2>
        <div class="buttons" style="margin-top: 58px">
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
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" align="center" label="子件" min-width="150px"/>
            <el-editable-column prop="productName" align="center" label="子件名称" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" min-width="150px"/>
            <el-editable-column prop="color" align="center" :label="$t('updates.ys')" min-width="150px"/>
            <el-editable-column prop="productCategory" align="center" label="子件类型" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="quantity" align="center" label="定额" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0.0, max: 1.0}, type: 'visible'}" prop="lossRate" align="center" label="损耗率" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElSelect', options: isKeyList, type: 'visible'}" prop="isKey" align="center" label="是否关键件" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { getbom } from '@/api/public'
import { addmaterials, isExist } from '@/api/MaterialsList'
import MyDetail from './components/MyDetail'
import MyMater from './components/MyMater'
export default {
  name: 'AddMaterialsList',
  components: { MyMater, MyDetail },
  data() {
    return {
      checklist: [],
      // 父件型号回显
      productTypeId: '',
      // 控制父件窗口
      matercontrol: false,
      // 是否为关键数据
      isKeyList: [{ value: '1', label: '是' }, { value: '2', label: '否' }],
      // 控制商品列表窗口
      control: false,
      // 物料信息数据
      personalForm: {
        isActive: 1,
        bomNumber: '',
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      },
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
  created() {
    this.getBom()
  },
  methods: {
    getBom() {
      getbom().then(res => {
        if (res.data.ret === 200) {
          console.log('res.data.ret ', res.data.data.content)
          this.personalForm.bomNumber = res.data.data.content
          console.log('this.personalForm.bomNumber', this.personalForm.bomNumber)
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
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
            title: '错误',
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

      console.log(nowlistdata)
      var ret4 = val.findIndex((value, index, arr) => {
        return value.productCode === this.personalForm.productCode
      })

      console.log(ret4)
      this.list2 = val.filter(item => {
        return item.productCode !== this.personalForm.productCode
      })

      // for (let i = 0; i < val.length; i++) {
      //   if (val[i].productCode === this.personalForm.productCode) {
      //     continue
      //   }
      //   let m = 1
      //   for (let j = 0; j < nowlistdata.length; j++) {
      //     if (val[i].productCode === nowlistdata[j].productCode) {
      //       m = 2
      //     }
      //   }
      //   if (m === 1) {
      //     this.$refs.editable.insert(val[i])
      //   }
      // }
      // if (nowlistdata.length === 0) {
      //   for (const s in val) {
      //     this.$refs.editable.insert(val[s])
      //   }
      // } else {
      //   for (const i in nowlistdata) {
      //     for (const j in val) {
      //       if (nowlistdata[i].productCode !== val[j].productCode) {
      //         this.$refs.editable.insert(val[i])
      //       } else {
      //         continue
      //       }
      //     }
      //   }
      // }
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        isActive: 1,
        bomNumber: '',
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.productTypeId = null
      this.getBom()
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
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
          this.$refs.editable.validate().then(valid => {
            if (valid) {
              addmaterials(parms, parms2, this.personalForm).then(res => {
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
                  this.$refs.personalForm.clearValidate()
                  this.$refs.personalForm.resetFields()
                  this.$refs.personalForm2.clearValidate()
                  this.$refs.personalForm2.resetFields()
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: res.data.msg,
                    offset: 100
                  })
                }
              })
            }
          }).catch(valid => {
            this.$notify.error({
              title: '错误',
              message: '信息未填完整',
              offset: 100
            })
            return false
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
      const view = { path: '/MaterialsList/AddMaterialsList', name: 'AddMaterialsList', fullPath: '/MaterialsList/AddMaterialsList', title: 'AddMaterialsList' }
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
