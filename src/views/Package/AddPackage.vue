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
                <el-form-item :label="$t('Package.packageName')" prop="packageName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.packageName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Package.isEffective')" prop="isEffective" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.isEffective" style="width: 200px">
                    <el-radio :label="1" style="width: 100px">应用</el-radio>
                    <el-radio :label="2">禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('update4.isManila')" prop="isManila" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.isManila" style="width: 200px">
                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="fuzhu" class="form-name" >{{ $t('updates.symd') }}</div>
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
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('updates.mdmc')" prop="repositoryName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.mdlx')" prop="categoryName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.fzr')" prop="managerName" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="fuzhu" class="form-name">{{ $t('updates.zsp') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <el-button type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
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
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <!--            <el-editable-column :label="$t('updates.lsj')" prop="salePrice" align="center" min-width="150px"/>-->
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1}, type: 'visible'}" :label="$t('updates.lsj')" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :controls="false"
                  v-model="scope.row.salePrice"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.ccj')" prop="costPrice" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">

        <div ref="fuzhu" class="form-name">{{ $t('updates.zssp') }}</div>
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
            size="small"
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
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">

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
        repositoryFlag: 2,
        isManila: 2
      },
      // 配送单规则数据
      personalrules: {
        packageName: [
          { required: true, message: '请输入组合名称', trigger: 'blur' }
        ],
        isEffective: [
          { required: true, message: '请选择应用状态', trigger: 'change' }
        ],
        isManila: [
          { required: true, message: '请选择是否是特殊套餐', trigger: 'change' }

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
  beforeCreate() {
    _that = this
  },
  methods: {
    // 选择赠送商品
    handleAddgift() {
      this.detailcontrol = true
    },
    giftProduct(val) {
      console.log('val====', val)
      const nowlistdata = this.$refs.editable3.getRecords()
      console.log('nowlistdata=====', nowlistdata)
      if (nowlistdata.length === 0) {
        this.list3 = val
      } else {
        const newarr = Object.assign([], val, nowlistdata)
        console.log('newarr===', newarr)
        this.list3 = newarr
      }
    },
    // 选择主商品
    handleAddproduct() {
      this.control = true
    },
    product(val) {
      console.log('val====', val)
      const nowlistdata = this.$refs.editable2.getRecords()
      console.log('nowlistdata=====', nowlistdata)
      if (nowlistdata.length === 0) {
        this.list2 = val
      } else {
        const newarr = Object.assign([], val, nowlistdata)
        console.log('newarr===', newarr)
        this.list2 = newarr
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
              title: 'wrong',
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
      console.log('this.personalForm', this.personalForm)
      const repordstors = this.$refs.editable.getRecords()
      if (repordstors.length === 0 && this.personalForm.repositoryFlag === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择适用门店',
          offset: 100
        })
        return false
      }
      console.log('repordstors', repordstors)
      const needrotys = repordstors.map(item => {
        return item.id
      })
      this.personalForm.suitRepositorys = ',' + needrotys.join(',') + ','
      console.log('this.personalForm.suitRepositorys', this.personalForm.suitRepositorys)
      const EnterDetail = this.$refs.editable2.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      let m = 1
      for (let i = 0; i < EnterDetail.length; i++) {
        if (EnterDetail[i].salePrice === '' || EnterDetail[i].salePrice === undefined || EnterDetail[i].salePrice === null || EnterDetail[i].salePrice === 0) {
          m = 2
        }
      }
      if (m === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '正确填写零售价',
          offset: 100
        })
        return false
      }
      console.log(EnterDetail)
      console.log(this.personalForm)

      // console.log(obj)
      // for (const key in obj) {
      //   if (obj[key] === '' || obj[key] === undefined || obj[key] === null) {
      //     delete obj[key]
      //   }
      // }

      const EnterDetail2 = this.$refs.editable3.getRecords()
      // if (EnterDetail2.length === 0) {
      //   this.$notify.error({
      //     title: 'wrong',
      //     message: this.$t('prompt.mxbbnwk'),
      //     offset: 100
      //   })
      //   return false
      // }
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
          for (const i in EnterDetail) {
            const obj = Object.assign(EnterDetail[i], this.personalForm)
            const parms = JSON.stringify(obj)
            console.log(obj)
            addPackage(parms, parms2).then(res => {
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
                this.$refs.editable2.clear()
                this.$refs.editable3.clear()
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
              } else {
                this.$notify.error({
                  title: 'wrong',
                  message: res.data.msg,
                  offset: 100
                })
              }
            })
          }
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
