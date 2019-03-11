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
          <el-form-item label="采购到货单" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.supplierId" placeholder="请选择采购到货单" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Stockenter.supplierId')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.supplierId" placeholder="请选择供应商" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Stockenter.stockPersonId')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.stockPersonId" placeholder="请选择采购员" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Stockenter.stockDeptId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.stockDeptId" placeholder="请选择采购部门" clearable style="width: 100%;">
              <el-option value="1" label="超级部门"/>
              <el-option value="2" label="财务部门"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Stockenter.deliveryPersonId')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.deliveryPersonId" placeholder="请选择交货人" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Stockenter.acceptPersonId')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.acceptPersonId" placeholder="请选择验收人" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Stockenter.enterDeptId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.enterDeptId" placeholder="请选择入库部门" clearable style="width: 100%;">
              <el-option value="1" label="超级部门"/>
              <el-option value="2" label="财务部门"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Stockenter.enterRepositoryId')" prop="enterRepositoryId" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.enterRepositoryId" placeholder="请选择入库仓库" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!--入库单明细-->
      <h2 ref="fuzhu" class="form-name">入库单明细</h2>
      <div class="buttons" style="margin-top: 50px">
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">删除</el-button>
      </div>
      <div class="container">
        <el-editable
          ref="editable"
          :data="list2"
          :edit-config="{ showIcon: false, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column prop="id" align="center" label="编号" width="150px" />
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="locationId" align="center" label="货位" width="150px"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" width="150px"/>
          <el-editable-column prop="typeId" align="center" label="规格" width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="basicQuantity" align="center" label="基本数量" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="actualEnterQuantity" align="center" label="实收数量" width="150px"/>
          <el-editable-column prop="enterPrice" align="center" label="入库单价" width="150px"/>
          <el-editable-column prop="taxRate" align="center" label="税率" width="150px"/>
          <el-editable-column prop="enterMoney" align="center" label="入库金额" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="remarks" align="center" label="备注" width="150px"/>
          <!--<el-editable-column :edit-render="{type: 'default'}" prop="handlerName" align="center" label="步骤处理人" min-width="500px">-->
          <!--<template slot="edit" slot-scope="scope">-->
          <!--<input class="editable-custom_input" @focus="handlechoose">-->
          <!--<my-emp :control.sync="empcontrol" @personName="personName" @chuli="chuli(scope)"/>-->
          <!--</template>-->
          <!--</el-editable-column>-->
          <!--<el-editable-column align="center" label="操作" min-width="300px">-->
          <!--<template slot-scope="scope">-->
          <!--&lt;!&ndash;<el-input v-model="scope.row.handlerName" style="float: left;width: 100px" @input="$refs.editable.updateStatus(scope)"/>&ndash;&gt;-->
          <!--<el-button icon="el-icon-more-outline" style="float: right" @click="handlechoose(scope)"/>-->
          <!--<my-emp :control.sync="empcontrol" @personName="personName" @chuli="chuli(scope)"/>-->
          <!--</template>-->
          <!--</el-editable-column>-->
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
import { create } from '@/api/Supplier'
export default {
  name: 'Addstockenter',
  data() {
    return {
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
      personalForm: {},
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
  methods: {
    // 保存操作
    handlesave() {
      const rest = JSON.stringify(this.$refs.editable.getRecords())
      console.log(rest)
      // this.$refs.personalForm.validate((valid) => {
      //   if (valid) {
      //     create(this.personalForm).then(res => {
      //       console.log(res)
      //       if (res.data.ret === 200) {
      //         this.$notify({
      //           title: '成功',
      //           message: '保存成功',
      //           type: 'success',
      //           offset: 100
      //         })
      //         this.restAllForm()
      //         this.$refs.personalForm.clearValidate()
      //         this.$refs.personalForm.resetFields()
      //         this.$refs.personalForm2.clearValidate()
      //         this.$refs.personalForm2.resetFields()
      //         this.$refs.personalForm3.clearValidate()
      //         this.$refs.personalForm3.resetFields()
      //         this.$refs.personalForm4.clearValidate()
      //         this.$refs.personalForm4.resetFields()
      //       } else {
      //         this.$notify.error({
      //           title: '错误',
      //           message: res.data.msg,
      //           offset: 100
      //         })
      //       }
      //     })
      //   } else {
      //     this.$notify.error({
      //       title: '错误',
      //       message: '信息未填完整',
      //       offset: 100
      //     })
      //     return false
      //   }
      // })
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {}
    },
    // 继续录入
    handleentry() {
      this.personalForm.regionId = this.perregions[this.perregions.length - 1]
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          create(this.personalForm).then(res => {
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
              this.$refs.personalForm2.clearValidate()
              this.$refs.personalForm2.resetFields()
              this.$refs.personalForm3.clearValidate()
              this.$refs.personalForm3.resetFields()
              this.$refs.personalForm4.clearValidate()
              this.$refs.personalForm4.resetFields()
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
    // 员工输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 员工列表返回数据
    personName(val) {
      console.log(val)
      this.buyerId = val.personName
      this.personalForm.buyerId = val.id
    }
    // 详细表事件
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
