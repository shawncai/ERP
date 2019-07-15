<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" top="10px" title="修改库位调整单" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="120px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.title2')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" style="margin-left: 18px;width: 150px" clearable @focus="handlechoose"/>
              </el-form-item>
              <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.adjustDeptId')" style="width: 100%;">
                <el-select v-model="personalForm.adjustDeptId" style="margin-left: 18px;width: 150px" clearable >
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.adjustRepositoryId')" prop="adjustRepositoryId" style="width: 100%;">
                <el-input v-model="adjustRepositoryId" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseRep"/>
              </el-form-item>
            </el-col>
            <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/><br>
          </el-row>
          <el-row style="margin-top: 23px">
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.adjustReason')" style="width: 100%;">
                <el-input v-model="personalForm.adjustReason" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.adjustDate')" prop="adjustDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.adjustDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 150px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--日常调整单明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">日常调整单明细</h2>
      <div class="buttons" style="margin-top: 58px">
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
          <el-editable-column label="编号" width="55" align="center" type="index"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" width="150px"/>
          <el-editable-column prop="productType" align="center" label="规格" width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" width="150px"/>
          <el-editable-column prop="outLocationCode" align="center" label="调出库位" width="150px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.outLocationCode" :value="scope.row.outLocationCode" placeholder="请选择货位" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                <el-option
                  v-for="(item, index) in locationlist"
                  :key="index"
                  :label="item.locationCode"
                  :value="item.locationCode"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{type: 'default'}" prop="batch" align="center" label="批次" width="200px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.batch" :value="scope.row.batch" placeholder="请选择批次" filterable clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
                <el-option
                  v-for="(item, index) in batchlist"
                  :key="index"
                  :value="item"
                  :label="item"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column prop="enterLocationId" align="center" label="调入库位" width="150px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.enterLocationId" :value="scope.row.enterLocationId" placeholder="请选择货位" filterable clearable style="width: 100%;" @visible-change="alllocations($event,scope)">
                <el-option
                  v-for="(item, index) in locationlist2"
                  :key="index"
                  :label="item.locationCode"
                  :value="item.id"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column prop="inventoryQuantity" align="center" label="库存数量" width="150px">
            <template slot-scope="scope">
              <p>{{ getquantity(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" prop="quantity" align="center" label="调动数量" width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">修改</el-button>
      <el-button type="danger" @click="handlecancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getlocation, locationlist, batchlist, getQuantity } from '@/api/public'
import { updateadjust } from '@/api/WarehouseAdjust'
import { getdeptlist } from '@/api/BasicSettings'
import MyCreate from './MyCreate'
import MyRepository from './MyRepository'
import MyDetail from './MyDetail'
export default {
  components: { MyRepository, MyCreate, MyDetail },
  props: {
    editcontrol: {
      type: Boolean,
      default: false
    },
    editdata: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 供应商信息数据
      personalForm: this.editdata,
      // 调整仓库回显
      adjustRepositoryId: '',
      // 批次数据
      batchlist: [],
      // 经办人回显
      handlePersonId: '',
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 货位数据
      locationlist: [],
      // 调入货位
      locationlist2: [],
      // 部门数据
      depts: [],
      // 入库仓库回显
      enterRepositoryId: '',
      // 入库人回显
      enterPersonId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制经办人选择窗口
      createcontrol: false,
      // 控制商品列表窗口
      control: false,
      // 入库单明细数据
      list2: [],
      // 入库单明细列表规则
      validRules: {
      },
      // 库存入库单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, message: '请选择经办人', trigger: 'blue' }
        ],
        adjustRepositoryId: [
          { required: true, message: '请选择调整仓库', trigger: 'blue' }
        ],
        adjustDate: [
          { required: true, message: '请选择调整日期', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.handlePersonId = this.personalForm.handlePersonName
      this.adjustRepositoryId = this.personalForm.adjustRepositoryName
      this.list2 = this.personalForm.locationAdjustDetailVos
      this.getlocation()
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
    getlocation() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.adjustRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list
          this.locationlist2 = res.data.data.content.list
        }
      })
    },
    // 入库人输入框focus事件触发
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
      this.adjustRepositoryId = val.repositoryName
      this.personalForm.adjustRepositoryId = val.id
    },
    // 调出库位
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.adjustRepositoryId)
        if (this.personalForm.adjustRepositoryId === undefined || this.personalForm.adjustRepositoryId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择仓库',
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.adjustRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              scope.row.outLocationId = res.data.data.content[0].id
              this.updatebatch3(scope)
            } else if (res.data.data.content.length === 0) {
              this.$notify.error({
                title: '错误',
                message: '该仓库没有该商品',
                offset: 100
              })
              this.locationlist = []
              return false
            }
          }
        })
        return this.locationlist
      }
    },
    updatebatch3(scope) {
      const parms3 = scope.row.productCode
      batchlist(this.personalForm.adjustRepositoryId, parms3).then(res => {
        this.batchlist = res.data.data.content
      })
    },
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.adjustRepositoryId, parms3).then(res => {
          this.batchlist = res.data.data.content
        })
      }
    },
    getquantity(sco) {
      const parms2 = sco.outLocationId
      const parms3 = sco.productCode
      const parms4 = sco.batch
      if (parms4 !== '' && parms4 !== null && parms4 !== undefined) {
        getQuantity(this.personalForm.adjustRepositoryId, parms2, parms3, parms4).then(res => {
          this.out = res.data.data.content
          sco.inventoryQuantity = this.out
        })
        return sco.inventoryQuantity
      }
    },
    alllocations(event, scope) {
      if (event === true) {
        if (this.personalForm.adjustRepositoryId === undefined || this.personalForm.adjustRepositoryId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择仓库',
            offset: 100
          })
          return false
        }
        locationlist(this.personalForm.adjustRepositoryId).then(res => {
          if (res.data.ret === 200) {
            this.locationlist2 = res.data.data.content.list
          }
        })
      }
    },
    // 入库单事件
    // 新增入库单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
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
        // this.$nextTick(() => this.$refs.editable.setActiveRow())
      }
      // console.log(val)
      // const row = this.$refs.editable.insert(val)
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      const EnterDetail = this.$refs.editable.getRecords()
      console.log(EnterDetail)
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          delete elem.batch
        }
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.enterQuantity === null || elem.enterQuantity === '' || elem.enterQuantity === undefined) {
          delete elem.enterQuantity
        }
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.inventoryQuantity === null || elem.inventoryQuantity === '' || elem.inventoryQuantity === undefined) {
          delete elem.inventoryQuantity
        }
        if (elem.outLocationId === null || elem.outLocationId === '' || elem.outLocationId === undefined) {
          delete elem.outLocationId
        }
        if (elem.enterLocationId === null || elem.enterLocationId === '' || elem.enterLocationId === undefined) {
          delete elem.enterLocationId
        }
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      const parms = JSON.stringify(this.personalForm)
      updateadjust(parms, parms2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
          this.$refs.editable.clear()
          this.$refs.personalForm.clearValidate()
          this.$refs.personalForm.resetFields()
          this.editVisible = false
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    handlecancel() {
      this.$refs.editable.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
</style>
