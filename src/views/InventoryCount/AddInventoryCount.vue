<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('InventoryCount.title')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.title" placeholder="请输入入盘点单主题" clearable/>
          </el-form-item>
          <el-form-item :label="$t('InventoryCount.handlePersonId')" prop="handlePersonId" style="width: 40%;margin-top:1%">
            <el-input v-model="handlePersonId" placeholder="请选择经办人" clearable @focus="handlechoose"/>
          </el-form-item>
          <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
          <el-form-item :label="$t('InventoryCount.countDeptId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.countDeptId" placeholder="请选择盘点部门" clearable style="width: 100%;">
              <el-option value="1" label="超级部门"/>
              <el-option value="2" label="财务部门"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('InventoryCount.countRepositoryId')" prop="countRepositoryId" style="width: 40%;margin-top:1%">
            <el-input v-model="countRepositoryId" placeholder="请选择盘点仓库" clearable @focus="handlechooseRep"/>
          </el-form-item>
          <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
          <el-form-item :label="$t('InventoryCount.countType')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.countType" placeholder="请选择盘点类型" clearable style="width: 100%;">
              <el-option value="1" label="zzz"/>
              <el-option value="2" label="xxx"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('InventoryCount.beginTime')" prop="beginTime" style="width: 40%;margin-top:1%">
            <el-date-picker
              v-model="personalForm.beginTime"
              type="date"
              placeholder="盘点开始日期"
              value-format="yyyy-MM-dd"
              clearable
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('InventoryCount.endTime')" prop="endTime" style="width: 40%;margin-top:1%">
            <el-date-picker
              v-model="personalForm.endTime"
              type="date"
              placeholder="盘点结束日期"
              value-format="yyyy-MM-dd"
              clearable
              style="width: 100%"/>
          </el-form-item><br>
          <el-form-item :label="$t('InventoryCount.summary')" prop="summary" style="width: 80%;margin-top:1%">
            <el-input v-model="personalForm.summary" placeholder="请输入摘要" type="textarea" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!--入库单明细-->
      <h2 ref="fuzhu" class="form-name">入库单明细</h2>
      <div class="buttons" style="margin-top: 50px">
        <el-button type="success" @click="handleAddproduct">添加商品</el-button>
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
          <el-editable-column label="编号" width="55" align="center" prop="id" />
          <el-editable-column prop="locationId" align="center" label="货位" width="150px"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" width="150px"/>
          <el-editable-column prop="typeId" align="center" label="规格" width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" width="150px"/>
          <el-editable-column prop="price" align="center" label="价格" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="inventoryQuantity" align="center" label="库存数量" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="actualQuantity" align="center" label="实盘数量" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="overflowQuantity" align="center" label="报溢数量" width="150px"/>
          <el-editable-column prop="totalMoney" align="center" label="总金额" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="remarks" align="center" label="备注" width="150px"/>
          <el-editable-column prop="sourceNumber" align="center" label="源单编号" width="150px"/>
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
import MyCreate from './components/MyCreate'
import MyRepository from './components/MyRepository'
export default {
  name: 'AddInventoryCount',
  components: { MyCreate, MyRepository },
  data() {
    return {
      // 仓库回显
      countRepositoryId: '',
      // 经办人回显
      handlePersonId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制经办人选择窗口
      createcontrol: false,
      // 盘点单明细数据
      list2: [],
      // 盘点单明细列表规则
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
      // 库存盘点单信息数据
      personalForm: {},
      // 库存盘点单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, message: '请选择经办人', trigger: 'blue' }
        ],
        countRepositoryId: [
          { required: true, message: '请选择盘点仓库', trigger: 'blue' }
        ],
        beginTime: [
          { required: true, message: '请选择盘点开始日期', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择盘点结束', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 保存操作
    handlesave() {
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
      const view = { path: '/InventoryCount/NewInventoryCount', name: 'NewInventoryCount', fullPath: '/InventoryCount/NewInventoryCount', title: 'NewInventoryCount' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 经办人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 员工列表返回经办人数据
    createname(val) {
      console.log(val)
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.countRepositoryId = val.id
      this.personalForm.countRepositoryId = val.repositoryName
    },
    // 盘点单事件
    // 新增盘点单明细
    handleAddproduct() {
      console.log(123)
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
