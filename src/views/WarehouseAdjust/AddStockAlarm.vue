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
                <el-form-item :label="$t('WarehouseAdjust.enterRepositoryId')" prop="repositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="repositoryId" placeholder="请选择仓库" style="width:200px" clearable @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('WarehouseAdjust.upStock')" prop="upStock" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
              <!--                  <el-input v-model="personalForm.upStock" placeholder="请输入最高库存" style="margin-left: 18px;width:200px" clearable/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('WarehouseAdjust.downStock')" prop="downStock" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
              <!--                  <el-input v-model="personalForm.downStock" placeholder="请输入最低库存" style="margin-left: 18px;width:200px" clearable/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('WarehouseAdjust.safeStock')" prop="safeStock" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
              <!--                  <el-input v-model="personalForm.safeStock" placeholder="请输入安全库存" style="margin-left: 18px;width:200px" clearable/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <!-- <el-col :span="6">
                <el-form-item :label="$t('WarehouseAdjust.productId')" prop="productId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="productId" placeholder="请选择商品" style="margin-left: 18px;width:200px" clearable @focus="handleAddproduct"/>

                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">

        <div ref="fuzhu" class="form-name" >{{ $t('otherlanguage.spmx') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail3 :control.sync="control" :personalform="personalForm" @product="productdetail"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
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
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('WarehouseAdjust.upStock')" prop="upStock" align="center" min-width="170">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  :min="0"
                  v-model="scope.row.upStock"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('WarehouseAdjust.downStock')" prop="downStock" align="center" min-width="170">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  :min="0"
                  v-model="scope.row.downStock"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('WarehouseAdjust.safeStock')" prop="safeStock" align="center" min-width="170">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  :min="0"
                  v-model="scope.row.safeStock"/>
              </template>
            </el-editable-column>
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
import { createstockalarm } from '@/api/WarehouseAdjust'
import MyRepository from './components/MyRepository'
import MyAccept from './components/MyAccept'
import MyDetail3 from './components/MyDetail3'
import MyCreate from './components/MyCreate'
import MyProduct from './components/MyProduct'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'AddStockAlarm',
  components: { MyProduct, MyRepository, MyDetail3, MyCreate, MyAccept },
  data() {
    return {
      repoId: '',
      list2: [],
      // 商品回显
      productId: '',
      // 仓库回显
      repositoryId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制商品列表窗口
      control: false,
      // 库存预警数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        createId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      },
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
      this.repoId = val.id
    },
    // 选择商品
    handleAddproduct() {
      if (this.repoId === null || this.repoId === '' || this.repoId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.sqslcg'),
          offset: 100
        })
        return false
      }
      this.control = true
    },
    async productdetail(val) {
      console.log('val', val)
      for (let i = 0; i < val.length; i++) {
        val[i].quantity = 1
        this.$refs.editable.insert(val[i])
      }
      console.log('123', 123)
      const that = this
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.repositoryId = ''
      this.productId = ''
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      console.log('this.personalForm', this.personalForm)
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }

      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          for (const i in EnterDetail) {
            this.personalForm.productId = EnterDetail[i].productId
            this.personalForm.safeStock = EnterDetail[i].safeStock
            this.personalForm.upStock = EnterDetail[i].upStock
            this.personalForm.downStock = EnterDetail[i].downStock
            const parms = JSON.stringify(this.personalForm)
            createstockalarm(parms).then(res => {
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
      const view = { path: '/WarehouseAdjust/AddStockAlarm', name: 'AddStockAlarm', fullPath: '/WarehouseAdjust/AddStockAlarm', title: 'AddStockAlarm' }
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
