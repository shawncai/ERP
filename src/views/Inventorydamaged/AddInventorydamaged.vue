<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Inventorydamaged.title')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.title" placeholder="请输入报损单主题" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Inventorydamaged.handlePersonId')" prop="handlePersonId" style="width: 40%;margin-top:1%">
            <el-input v-model="handlePersonId" placeholder="请选择经办人" clearable @focus="handlechoose"/>
          </el-form-item>
          <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
          <el-form-item :label="$t('Inventorydamaged.damagedDeptId')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.damagedDeptId" placeholder="请选择报损部门" clearable style="width: 100%;">
              <el-option
                v-for="(item, index) in depts"
                :key="index"
                :value="item.id"
                :label="item.deptName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Inventorydamaged.damagedRepositoryId')" prop="countRepositoryId" style="width: 40%;margin-top:1%">
            <el-input v-model="damagedRepositoryId" placeholder="请选择报损仓库" clearable @focus="handlechooseRep"/>
          </el-form-item>
          <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
          <el-form-item :label="$t('Inventorydamaged.damagedDate')" prop="damagedDate" style="width: 40%;margin-top:1%">
            <el-date-picker
              v-model="personalForm.damagedDate"
              type="date"
              placeholder="报损日期"
              value-format="yyyy-MM-dd"
              clearable
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('Inventorydamaged.damagedReason')" style="width: 80%;margin-top:1%">
            <el-input v-model="personalForm.damagedReason" placeholder="请输入报损原因" type="textarea" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!--报损单明细-->
      <h2 ref="fuzhu" class="form-name">报损单明细</h2>
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
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="damagedQuantity" align="center" label="报损数量" width="150px"/>
          <el-editable-column prop="costPrice" align="center" label="成本单价" width="150px"/>
          <el-editable-column prop="damagedMoney" align="center" label="报损金额" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="remarks" align="center" label="备注" width="150px"/>
          <el-editable-column prop="sourceNumber" align="center" label="源单编号" width="150px"/>
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
import { getdeptlist } from '@/api/BasicSettings'
import MyCreate from './components/MyCreate'
import MyRepository from './components/MyRepository'
export default {
  name: 'AddInventorydamaged',
  components: { MyCreate, MyRepository },
  data() {
    return {
      // 部门数据
      depts: [],
      // 仓库回显
      damagedRepositoryId: '',
      // 经办人回显
      handlePersonId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制经办人选择窗口
      createcontrol: false,
      // 报损单明细数据
      list2: [],
      // 报损单明细列表规则
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
      // 库存报损单信息数据
      personalForm: {},
      // 库存报损单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, message: '请选择经办人', trigger: 'blue' }
        ],
        damagedRepositoryId: [
          { required: true, message: '请选择报损仓库', trigger: 'blue' }
        ],
        damagedDate: [
          { required: true, message: '请选择报损日期', trigger: 'change' }
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
      console.log(this.personalForm)
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
      const view = { path: '/Inventorydamaged/NewInventorydamaged', name: 'NewInventorydamaged', fullPath: '/Inventorydamaged/NewInventorydamaged', title: 'NewInventorydamaged' }
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
      this.damagedRepositoryId = val.repositoryName
      this.personalForm.damagedRepositoryId = val.id
    },
    // 报损单事件
    // 新增报损单明细
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
