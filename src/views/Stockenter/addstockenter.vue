<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Stockenter.title')" prop="title" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.title" placeholder="请输入入库单主题" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Stockenter.sourceType')" prop="sourceType" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.sourceType" placeholder="请选择源单类型" style="width: 100%;">
              <el-option value="1" label="采购到货单"/>
            </el-select>
          </el-form-item>
          <el-form-item label="源单编号" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.sourceNumber" placeholder="请选择源单编号" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Stockenter.supplierId')" style="width: 40%;margin-top:1%">
            <el-input v-model="supplierId" placeholder="请选择供应商" clearable @focus="handlechoose"/>
          </el-form-item>
          <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
          <el-form-item :label="$t('Stockenter.stockPersonId')" style="width: 40%;margin-top:1%">
            <el-input v-model="stockPersonId" placeholder="请选择采购员" clearable @focus="handlechooseStock"/>
          </el-form-item>
          <my-emp :control.sync="stockControl" @stockName="stockName"/>
          <el-form-item :label="$t('Stockenter.stockDeptId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.stockDeptId" placeholder="请选择采购部门" clearable style="width: 100%;" @focus="updatedept">
              <el-option
                v-for="(item, index) in depts"
                :key="index"
                :value="item.id"
                :label="item.deptName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Stockenter.deliveryPersonId')" style="width: 40%;margin-top:1%">
            <el-input v-model="deliveryPersonId" placeholder="请选择交货人" clearable @focus="handlechooseDelivery"/>
          </el-form-item>
          <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
          <el-form-item :label="$t('Stockenter.acceptPersonId')" style="width: 40%;margin-top:1%">
            <el-input v-model="acceptPersonId" placeholder="请选择验收人" clearable @focus="handlechooseAccept"/>
          </el-form-item>
          <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
          <el-form-item :label="$t('Stockenter.enterDeptId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.enterDeptId" placeholder="请选择入库部门" clearable style="width: 100%;" @focus="updatedept">
              <el-option
                v-for="(item, index) in depts"
                :key="index"
                :value="item.id"
                :label="item.deptName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Stockenter.enterRepositoryId')" prop="enterRepositoryId" style="width: 40%;margin-top:1%">
            <el-input v-model="enterRepositoryId" placeholder="请选择入库仓库" clearable @focus="handlechooseRep"/>
          </el-form-item>
          <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
        </el-form>
      </div>
      <!--入库单明细-->
      <h2 ref="fuzhu" class="form-name">入库单明细</h2>
      <div class="buttons" style="margin-top: 50px">
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
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column type="index" align="center" label="编号" width="150px" />
          <el-editable-column :edit-render="{name: 'ElSelect', options: locationlist}" prop="locationId" align="center" label="货位" width="150px"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" width="150px"/>
          <el-editable-column prop="productType" align="center" label="规格" width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" width="150px"/>
          <el-editable-column prop="basicQuantity" align="center" label="基本数量" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}}" prop="actualEnterQuantity" align="center" label="实收数量" width="150px"/>
          <el-editable-column prop="enterPrice" align="center" label="入库单价" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}}" prop="taxRate" align="center" label="税率" width="150px"/>
          <el-editable-column prop="enterMoney" align="center" label="入库金额" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize(scope.row.actualEnterQuantity, scope.row.enterPrice) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="remarks" align="center" label="备注" width="150px"/>
        </el-editable>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" @click="handlesave()">保存</el-button>
        <el-button type="success" @click="handleentry()">继续录入</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { locationlist } from '@/api/WarehouseAdjust'
import { addstockenter } from '@/api/Stockenter'
import { getdeptlist } from '@/api/BasicSettings'
import MyRepository from './components/MyRepository'
import MySupplier from './components/MySupplier'
import MyEmp from './components/MyEmp'
import MyDelivery from './components/MyDelivery'
import MyAccept from './components/MyAccept'
import MyDetail from './components/MyDetail'
export default {
  name: 'Addstockenter',
  components: { MyRepository, MySupplier, MyEmp, MyDelivery, MyAccept, MyDetail },
  data() {
    return {
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 货位数据
      locationlist: [],
      // 明细表控制框
      control: false,
      // 验收人回显
      acceptPersonId: '',
      // 验收人控制框
      accetpcontrol: false,
      // 交货人回显
      deliveryPersonId: '',
      // 交货人控制框
      deliverycontrol: false,
      // 部门数据
      depts: [],
      // 采购员控制框
      stockControl: false,
      // 采购员回显
      stockPersonId: '',
      // 供货商回显
      supplierId: '',
      // 供货商控制
      empcontrol: false,
      // 入库仓库回显
      enterRepositoryId: '',
      // 仓库选择控制期
      repositorycontrol: false,
      // 入库单明细数据
      list2: [],
      // 入库单明细列表规则
      validRules: {
        step: [
          { required: true, message: '请输入流程步骤', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入流转条件', trigger: 'blue' }
        ],
        handlerName: [
          { required: true, message: '请选择步骤处理人', trigger: 'blue' }
        ]
      },
      // 采购入库信息数据
      personalForm: {
        repositoryId: 438,
        regionId: 2,
        createPersonId: 3,
        countryId: 1
      },
      // 个人信息规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入入库单主题', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        enterRepositoryId: [
          { required: true, message: '请选择入库仓库', trigger: 'blue' }
        ],
        isHot: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        countryId: [
          { required: true, message: '请选择国家', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 保存操作
    handlesave() {
      const rest = this.$refs.editable.getRecords()
      rest.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
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
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.actualEnterQuantity === null || elem.actualEnterQuantity === '' || elem.actualEnterQuantity === undefined) {
          delete elem.actualEnterQuantity
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.enterPrice === null || elem.enterPrice === '' || elem.enterPrice === undefined) {
          delete elem.enterPrice
        }
        if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
          delete elem.taxRate
        }
        if (elem.enterMoney === null || elem.enterMoney === '' || elem.enterMoney === undefined) {
          delete elem.enterMoney
        }
        return elem
      })
      console.log(rest)
      const parms2 = JSON.stringify(rest)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addstockenter(this.personalForm, parms2).then(res => {
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        repositoryId: 438,
        regionId: 2,
        createPersonId: 3,
        countryId: 1
      }
      this.acceptPersonId = ''
      this.deliveryPersonId = ''
      this.stockPersonId = ''
      this.supplierId = ''
      this.enterRepositoryId = ''
    },
    // 继续录入
    handleentry() {
      const rest = this.$refs.editable.getRecords()
      rest.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
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
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.actualEnterQuantity === null || elem.actualEnterQuantity === '' || elem.actualEnterQuantity === undefined) {
          delete elem.actualEnterQuantity
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.enterPrice === null || elem.enterPrice === '' || elem.enterPrice === undefined) {
          delete elem.enterPrice
        }
        if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
          delete elem.taxRate
        }
        if (elem.enterMoney === null || elem.enterMoney === '' || elem.enterMoney === undefined) {
          delete elem.enterMoney
        }
        if (elem.productType === null || elem.productType === '' || elem.productType === undefined) {
          delete elem.productType
        }
        return elem
      })
      console.log(rest)
      const parms2 = JSON.stringify(rest)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addstockenter(this.personalForm, parms2).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.personalForm.clearValidate()
              this.$refs.personalForm.resetFields()
              this.$refs.editable.clear()
              const anchor = this.$refs.geren.offsetTop
              console.log(anchor)
              document.documentElement.scrollTop = anchor - 100
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
          const anchor2 = this.$refs.geren.offsetTop
          console.log(anchor2)
          document.documentElement.scrollTop = anchor2 - 100
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Stockenter/NewStockenter', name: 'NewStockenter', fullPath: '/Stockenter/NewStockenter', title: 'NewStockenter' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 采购员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购员回显
    stockName(val) {
      this.stockPersonId = val.personName
      this.personalForm.stockPersonId = val.id
    },
    // 供应商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供应商列表返回数据
    supplierName(val) {
      console.log(val)
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
    },
    // 详细表事件
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.enterRepositoryId = val.repositoryName
      this.personalForm.enterRepositoryId = val.id
      this.locationlistparms.repositoryId = val.id
      locationlist(this.locationlistparms).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list.map(function(item) {
            return {
              'value': item.id,
              'label': item.locationName
            }
          })
        }
      })
    },
    // 部门列表focus刷新
    updatedept() {
      this.getlist()
    },
    // 交货人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.deliveryPersonId = val.personName
      this.personalForm.deliveryPersonId = val.id
    },
    // 验收人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      this.acceptPersonId = val.personName
      this.personalForm.acceptPersonId = val.id
    },
    // 新增入库单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      // console.log(val)
      // console.log(val[0])
      console.log(this.$refs.editable.getRecords())
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
        this.$nextTick(() => this.$refs.editable.setActiveRow())
      }
      // console.log(val)
      // const row = this.$refs.editable.insert(val)
      this.$nextTick(() => this.$refs.editable.setActiveCell(nowlistdata[0]))
    },
    // 入库金额计算
    getSize(quan, pric) {
      return quan * pric
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin:0px 30px;
    .form-name{
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 30px;
    }
    .container{
      margin-top: 2%;
      border: 1px solid #eceff6;
    }
  }
</style>
