<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" width="1010px" top="10px" title="修改采购入库单" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" placeholder="请输入入库单主题" style="margin-left: 18px;width: 180px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="源单编号" style="width: 100%;">
                <el-input v-model="personalForm.number" placeholder="请选择源单编号" style="margin-left: 18px;width: 180px" clearable/>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item :label="$t('Storagemovediff.supplierId')" style="width: 100%">
                <el-input v-model="supplierId" placeholder="请选择供应商" clearable style="margin-left: 18px;width: 150px" @focus="handlechoose"/>
              </el-form-item>
              <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
            </el-col> -->
            <el-col :span="6">
              <el-form-item :label="$t('Storagemovediff.moveInRepository')" style="width: 100%">
                <el-input v-model="personalForm.inRepositoryName" placeholder="请选择调入仓库" style="margin-left: 18px;width: 180px" clearable disabled @focus="handlechooseStock"/>
              </el-form-item>
              <!-- <my-emp :control.sync="stockControl" @stockName="stockName"/> -->
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Storagemovediff.moveOutRepository')" style="width: 100%">
                <el-input v-model="personalForm.outRepositoryName" placeholder="请选择调出仓库" clearable disabled style="margin-left: 18px;width: 180px"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Storagemovediff.requestArrivalDate')" prop="arrivalDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.arrivalDate"
                  type="date"
                  disabled
                  placeholder="选择到货日期"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 180px"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Storagemovediff.storageMoveDate')" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.moveDate"
                  disabled
                  type="date"
                  placeholder="选择调拨出库日期"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 180px"/>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item :label="$t('Storagemovediff.requestArrivalDate')" style="width: 100%">
                <el-input v-model="deliveryPersonId" placeholder="请选择交货人" clearable style="margin-left: 18px;width: 150px" @focus="handlechooseDelivery"/>
              </el-form-item>
              <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
            </el-col> -->
            <!-- <el-col :span="6">
              <el-form-item :label="$t('Storagemovediff.acceptPersonId')" style="width: 100%">
                <el-input v-model="acceptPersonId" placeholder="请选择验收人" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseAccept"/>
              </el-form-item>
              <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
            </el-col> -->
            <!-- <el-col :span="6">
              <el-form-item :label="$t('Stockenter.enterDeptId')" style="width: 100%">
                <el-select v-model="personalForm.enterDeptId" placeholder="请选择入库部门" clearable style="margin-left: 18px;width: 150px" @focus="updatedept">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--入库单明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">入库单明细</h2>
      <div class="buttons" style="margin-top: 28px;margin-bottom: 20px">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
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
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column prop="color" align="center" :label="$t('updates.ys')" width="150px"/>
          <!-- <el-editable-column prop="productType" align="center" :label="$t('Hmodule.gg')" width="150px"/> -->
          <!-- <el-editable-column prop="unit" align="center" :label="$t('Hmodule.dw')" width="150px"/> -->
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0.00, precision: 2}, type: 'visible'}" prop="sendQuantity" align="center" label="发货数量" min-width="150">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                v-if="scope.row.isnew === 3"
                :precision="2"
                :controls="true"
                :min="0.00"
                v-model="scope.row.sendQuantity"
              />
              <span v-else>{{ scope.row.sendQuantity }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0.00, precision: 2}, type: 'visible'}" prop="actualQuantity" align="center" label="实际数量" min-width="150">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                v-if="scope.row.isnew !== 0"
                :precision="2"
                :controls="true"
                :min="0.00"
                v-model="scope.row.actualQuantity"
                @change="changdiff(scope.row)"
              />
              <span v-else>{{ scope.row.actualQuantity }}</span>
            </template>
          </el-editable-column>
          <el-editable-column prop="diffQuantity" align="center" label="差异数量" min-width="150">
            <template slot="edit" slot-scope="scope">
              {{ scope.row.diffQuantity }}
            </template>
          </el-editable-column>
          <el-editable-column prop="diffMoney" align="center" label="差异金额" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="result" align="center" label="处理结果" width="300px"/>
        </el-editable>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editestoragemovediff } from '@/api/Storagemovediff'
import { getdeptlist } from '@/api/BasicSettings'
import MyRepository from './MyRepository'
import MySupplier from './MySupplier'
import MyEmp from './MyEmp'
import MyDelivery from './MyDelivery'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
export default {
  components: { MyRepository, MySupplier, MyEmp, MyDelivery, MyAccept, MyDetail },
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
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.personalForm.arrivalDate = this.timestampToTime(this.personalForm.arrivalDate)
      this.personalForm.moveDate = this.timestampToTime(this.personalForm.moveDate)
      this.supplierId = this.personalForm.supplierName
      this.stockPersonId = this.personalForm.stockPersonName
      this.enterRepositoryId = this.personalForm.enterRepositoryName
      for (const i in this.personalForm.moveDiffReportDetails) {
        this.personalForm.moveDiffReportDetails[i].isnew = 0
      }
      this.list2 = this.personalForm.moveDiffReportDetails
      // this.getlocation()
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    changdiff(row) {
      console.log('操作成功', row)
      row.diffQuantity = row.sendQuantity - row.actualQuantity
      row.diffMoney = Number(row.costPrice) * row.diffQuantity
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    getlist() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // getlocation() {
    //   // 货位根据仓库id展现
    //   locationlist(this.personalForm.enterRepositoryId).then(res => {
    //     if (res.data.ret === 200) {
    //       this.locationlist = res.data.data.content.list.map(function(item) {
    //         return {
    //           'value': item.id,
    //           'label': item.locationName
    //         }
    //       })
    //     }
    //   })
    // },
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
      console.log(val)
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
    },
    // 入库金额计算
    getSize(quan, pric) {
      return quan * pric
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      console.log(this.personalForm)
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
      for (const key in this.personalForm) {
        if (this.personalForm[key] === null) {
          delete this.personalForm[key]
        }
      }
      delete this.personalForm.sourceType
      delete this.personalForm.createDate
      delete this.personalForm.outReasonId
      delete this.personalForm.moveDiffReportDetails
      delete this.personalForm.approvalUseVos
      delete this.personalForm.judgeStat
      const params = JSON.stringify(this.personalForm)
      const parms2 = JSON.stringify(rest)
      editestoragemovediff(params, parms2).then(res => {
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
   .edit >>> .el-dialog{
    -webkit-transform: none;
    transform: none;
    position: absolute;
    right: 0;
    left: auto;
    height: auto;
  }
  .edit >>> .el-dialog__header{
    background: #fff;
    position: fixed;
    top: 0;
    display: block;
    width: 1010px;
    z-index: 100;
    border-bottom: 1px solid #f1f1f1;
  }
  .edit >>> .el-dialog__body{
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;
  }
</style>
