<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.bomNumber')" prop="bomNumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.bomNumber" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.bomTypeId')" prop="bomTypeId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.bomTypeId" style="width: 200px" clearable >
                    <el-option value="1" label="工艺BOM"/>
                    <el-option value="2" label="设计BOM"/>
                    <el-option value="3" label="制造BOM"/>
                    <el-option value="4" label="采购BOM"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.isActive')" prop="isActive" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.isActive" style="width: 200px">
                    <el-radio :label="1" style="width: 100px">启用</el-radio>
                    <el-radio :label="2">未启用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.version')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.version" clearable style="width: 200px">
                    <el-option
                      v-for="(item, index) in versions"
                      :key="index"
                      :value="item.id"
                      :label="item.categoryName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.summary')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.summary" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--父件信息-->
      <el-card :body-style=" { padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="geren" class="form-name">{{ $t('updates.fjxx') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.productName')" prop="productName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.productName" style="width: 200px" @focus="handlemater"/>
                </el-form-item>
              </el-col>
              <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.unit')" prop="unit" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.unit" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.productTypeId')" prop="productTypeId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="productTypeId" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.code')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.productCode" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('MaterialsList.color')" prop="color" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.color" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">

        <div ref="fuzhu" class="form-name">{{ $t('updates.zjxx') }}</div>
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
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('updates.zj')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.zjmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.zjlx')" prop="productCategory" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.de')" prop="quantity" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0.0, max: 1.0}, type: 'visible'}" :label="$t('updates.shl')" prop="lossRate" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElSelect', options: isKeyList, type: 'visible'}" :label="$t('updates.sfgjj')" prop="isKey" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { getbom } from '@/api/public'
import { searchEmpCategory2 } from '@/api/Product'
import { addmaterials, isExist } from '@/api/MaterialsList'
import MyDetail from './components/MyDetail'
import MyMater from './components/MyMater'
var _that
export default {
  name: 'AddMaterialsList',
  components: { MyMater, MyDetail },
  data() {
    return {
      versions: [],
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
  beforeCreate() {
    _that = this
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
      searchEmpCategory2(12).then(res => {
        if (res.data.ret === 200) {
          this.versions = res.data.data.content.list
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
      isExist(val.code, this.personalForm.bomTypeId).then(res => {
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
    productdetail(val) {
      console.log(val)
      // const nowlistdata = this.$refs.editable.getRecords()

      // console.log(nowlistdata)
      // var ret4 = val.findIndex((value, index, arr) => {
      //   return value.productCode === this.personalForm.productCode
      // })

      // console.log(ret4)
      const nowlistdata = this.$refs.editable.getRecords()
      const alldata = [...val, ...nowlistdata]
      const filterdata = this.uniqueArray(alldata, 'productCode')

      this.list2 = filterdata.filter(item => {
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
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
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
                    title: 'successful',
                    message: 'save successful',
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
                    title: 'wrong',
                    message: res.data.msg,
                    offset: 100
                  })
                }
              })
            }
          }).catch(valid => {
            this.$notify.error({
              title: 'wrong',
              message: 'Information is incomplete',
              offset: 100
            })
            return false
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
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
      font-weight: bold;
      font-size: 18px;
      color: #373e4f;
      padding: 5px;
      margin-bottom: -20px;
    }
    .container{
      margin-top: 5px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
