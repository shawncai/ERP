<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('BasicSettings.process_name')" prop="process_name" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.process_name" placeholder="请输入流程名称" clearable/>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.is_effective')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.is_effective" placeholder="请选择启用状态" style="width: 100%;">
              <el-option label="active" value="1"/>
              <el-option label="dead" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.type3')" prop="type" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.type" placeholder="请选择单据类型" style="width: 100%;">
              <el-option label="active" value="1"/>
              <el-option label="dead" value="2"/>
              <!--<el-option-->
              <!--v-for="(item, index) in typeIds"-->
              <!--:key="index"-->
              <!--:label="item.categoryName"-->
              <!--:value="item.id"-->
              <!--/>-->
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.is_message')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.is_message" placeholder="请选择" style="width: 100%;">
              <el-option label="发送" value="1"/>
              <el-option label="不发送" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.effect_region')" prop="effect_region" style="width: 40%;margin-top: 1%">
            <el-cascader
              :options="regions"
              :props="props"
              v-model="personalForm.region"
              :show-all-levels="false"
              placeholder="请选择区域"
              change-on-select
              filterable
              clearable
              style="width: 100%;"
              @change="handlechange4"
            />
          </el-form-item>
          <el-form-item :label="$t('BasicSettings.effect_repository')" style="width: 40%;margin-top: 1%">
            <el-select v-model="personalForm.effect_repository" placeholder="请选择门店" style="width: 100%;">
              <el-option
                v-for="(item, index) in repositories"
                :key="index"
                :label="item.repositoryName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" @click="handlerelease()">发布</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
      <!--辅助信息-->
      <h2 ref="fuzhu" class="form-name">辅助信息</h2>
      <div class="container">
        <el-table :data="tableData" class="tb-edit" style="width: 100%" highlight-current-row @row-click="handleCurrentChange">
          <el-table-column label="日期" width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.date" size="small" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"/> <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" size="small" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"/> <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="地址">
            <template slot-scope="scope">
              <el-input v-model="scope.row.address" size="small" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"/> <span>{{ scope.row.address }}</span>
            </template>
          </el-table-column>
        </el-table>
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
import { regionlist, searchRepository } from '@/api/public'
import { create } from '@/api/Supplier'
import { createapproval } from '@/api/BasicSettings'
import MyEmp from './components/MyEmp'
export default {
  name: 'NewApprovalProcess',
  components: { MyEmp },
  data() {
    return {
      // 可编辑表格数据
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      // 区域列表
      regions: [],
      // 门店列表
      repositories: [],
      // 区域列表字段更改
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 审批流程信息数据
      personalForm: {
        region: []
      },
      // 个人信息规则数据
      personalrules: {
        process_name: [
          { required: true, message: '请输入流程名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择单据类型', trigger: 'change' }
        ],
        effect_region: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getnationlist()
  },
  methods: {
    getnationlist() {
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 根据区域选择门店
    handlechange4(val) {
      const finalid = val[val.length - 1]
      this.personalForm.effect_region = finalid
      searchRepository(finalid).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {}
    },
    // 发布操作
    handlerelease() {
      console.log(this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          createapproval(this.personalForm).then(res => {
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
    // 保存操作
    handlesave() {
      this.personalForm.regionId = this.perregions[this.perregions.length - 1]
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
      const view = { path: '/BasicSettings/NewBasicSettings', name: 'NewBasicSettings', fullPath: '/BasicSettings/NewBasicSettings', title: 'NewBasicSettings' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 动态添加
    handleCurrentChange(row, event, column) {
      console.log(row, event, column, event.currentTarget)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .ERP-container {
    margin: 0px 30px;
  }
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
  .tb-edit .el-input {
    display: none
  }
  .tb-edit .current-row .el-input {
    display: block
  }
  .tb-edit .current-row .el-input+span {
    display: none
  }
</style>
