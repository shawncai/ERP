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
            <el-select v-model="personalForm.damagedDeptId" placeholder="请选择报损部门" clearable style="width: 100%;" @focus="updatedept">
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
          <el-editable-column label="编号" width="55" align="center" type="index" />
          <el-editable-column :edit-render="{type: 'default'}" prop="locationId" align="center" label="货位" width="200px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.locationId" :value="scope.row.locationId" placeholder="请选择货位" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                <el-option
                  v-for="(item, index) in locationlist"
                  :key="index"
                  :value="item.id"
                  :label="item.locationCode"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column prop="productCode" align="center" label="物品编号" width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" width="150px"/>
          <el-editable-column prop="typeId" align="center" label="规格" width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="damagedQuantity" align="center" label="报损数量" width="150px"/>
          <el-editable-column prop="costPrice" align="center" label="成本单价" width="150px"/>
          <el-editable-column prop="damagedMoney" align="center" label="报损金额" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize(scope.row.damagedQuantity, scope.row.costPrice) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="remarks" align="center" label="备注" width="150px"/>
        </el-editable>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" @click="handlesave()">保存</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getlocation, locationlist } from '@/api/public'
import { addinventorydamaged } from '@/api/Inventorydamaged'
import { getdeptlist } from '@/api/BasicSettings'
import MyCreate from './components/MyCreate'
import MyRepository from './components/MyRepository'
import MyDetail from './components/MyDetail'
export default {
  name: 'AddInventorydamaged',
  components: { MyCreate, MyRepository, MyDetail },
  data() {
    return {
      // 获取货位参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 明细表控制框
      control: false,
      // 部门数据
      depts: [],
      // 货位数据
      locationlist: [],
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
      personalForm: {
        repositoryId: 438,
        regionId: 2,
        createPersonId: 3,
        countryId: 1
      },
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
      const rest = this.$refs.editable.getRecords()
      if (rest.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }
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
        if (elem.damagedQuantity === null || elem.damagedQuantity === '' || elem.damagedQuantity === undefined) {
          delete elem.damagedQuantity
        }
        if (elem.costPrice === null || elem.costPrice === '' || elem.costPrice === undefined) {
          delete elem.costPrice
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.damagedMoney === null || elem.damagedMoney === '' || elem.damagedMoney === undefined) {
          delete elem.damagedMoney
        }
        return elem
      })
      const parms2 = JSON.stringify(rest)
      const parms = JSON.stringify(this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addinventorydamaged(parms, parms2, this.personalForm.repositoryId, this.personalForm.regionId).then(res => {
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
      this.handlePersonId = ''
      this.damagedRepositoryId = ''
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
      // this.locationlistparms.repositoryId = val.id
      // locationlist(this.locationlistparms).then(res => {
      //   if (res.data.ret === 200) {
      //     this.locationlist = res.data.data.content.list.map(function(item) {
      //       return {
      //         'value': item.id,
      //         'label': item.locationName
      //       }
      //     })
      //   }
      // })
    },
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.damagedRepositoryId)
        if (this.personalForm.damagedRepositoryId === undefined || this.personalForm.damagedRepositoryId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择仓库',
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.damagedRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
            } else if (res.data.data.content.length === 0) {
              locationlist(this.personalForm.damagedRepositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content.list
                }
              })
            }
          }
        })
      }
    },
    // 部门列表focus刷新
    updatedept() {
      this.getlist()
    },
    // 报损单事件
    // 新增报损单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
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
      }
    },
    // 报损金额计算
    getSize(quan, pric) {
      return quan * pric
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
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
