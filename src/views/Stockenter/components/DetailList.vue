<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" append-to-body class="edit" top="10px" title="修改采购入库单" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" placeholder="请输入入库单主题" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" placeholder="请选择源单类型" style="margin-left: 18px;width: 150px" disabled>
                  <el-option value="1" label="采购到货单"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="源单编号" style="width: 100%;">
                <el-input v-model="personalForm.sourceNumber" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="批次" style="width: 100%;">
                <el-input v-model="personalForm.batch" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="国家" style="width: 100%;">
                <el-input v-model="personalForm.countryName" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="制单人" style="width: 100%;">
                <el-input v-model="personalForm.createPersonName" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.supplierId')" style="width: 100%">
                <el-input v-model="supplierId" placeholder="请选择供应商" disabled style="margin-left: 18px;width: 150px" @focus="handlechoose"/>
              </el-form-item>
              <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.stockPersonId')" style="width: 100%">
                <el-input v-model="stockPersonId" placeholder="请选择采购员" style="margin-left: 18px;width: 150px" disabled @focus="handlechooseStock"/>
              </el-form-item>
              <my-emp :control.sync="stockControl" @stockName="stockName"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.stockDeptId')" style="width: 100%">
                <el-select v-model="personalForm.stockDeptId" placeholder="请选择采购部门" disabled style="margin-left: 18px;width: 150px" @focus="updatedept">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.deliveryPersonId')" style="width: 100%">
                <el-input v-model="deliveryPersonId" placeholder="请选择交货人" disabled style="margin-left: 18px;width: 150px" @focus="handlechooseDelivery"/>
              </el-form-item>
              <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.acceptPersonId')" style="width: 100%">
                <el-input v-model="acceptPersonId" placeholder="请选择验收人" style="margin-left: 18px;width: 150px" disabled @focus="handlechooseAccept"/>
              </el-form-item>
              <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.enterDeptId')" style="width: 100%">
                <el-select v-model="personalForm.enterDeptId" placeholder="请选择入库部门" disabled style="margin-left: 18px;width: 150px" @focus="updatedept">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.enterRepositoryId')" prop="enterRepositoryId" style="width: 100%">
                <el-input v-model="enterRepositoryId" placeholder="请选择入库仓库" disabled style="margin-left: 18px;width: 150px" @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--入库单明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">入库单明细</h2>
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
          <el-editable-column type="index" align="center" label="编号" width="150px" />
          <el-editable-column prop="locationCode" align="center" label="货位" width="150px"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" width="150px"/>
          <el-editable-column prop="productType" align="center" label="规格" width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" width="150px"/>
          <el-editable-column prop="basicQuantity" align="center" label="基本数量" width="150px"/>
          <el-editable-column prop="actualEnterQuantity" align="center" label="实收数量" width="150px"/>
          <el-editable-column prop="enterPrice" align="center" label="入库单价" width="150px"/>
          <el-editable-column prop="taxRate" align="center" label="税率" width="150px"/>
          <el-editable-column prop="enterMoney" align="center" label="入库金额" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize(scope.row.actualEnterQuantity, scope.row.enterPrice) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput'}" prop="remarks" align="center" label="备注" width="150px"/>
          <el-editable-column prop="sourceSerialNumber" align="center" label="源单序号" width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!--审核状态-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">审批记录</h2>
      <div class="container" style="margin-top: 37px">
        <el-table
          :data="reviewList"
          border
          style="width: 100%">
          <el-table-column
            prop="step"
            align="center"
            label="当前步骤"
            min-width="150"/>
          <el-table-column
            prop="stepHandlerName"
            align="center"
            label="当前审批人"
            min-width="150"/>
          <el-table-column
            prop="handleTime"
            align="center"
            label="审批时间"
            min-width="150"/>
          <el-table-column
            prop="stat"
            align="center"
            label="审批意见"
            min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.stat | statfilter }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="danger" @click="handlecancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { locationlist } from '@/api/WarehouseAdjust'
import { updatestockenter } from '@/api/Stockenter'
import { getdeptlist } from '@/api/BasicSettings'
import MyRepository from './MyRepository'
import MySupplier from './MySupplier'
import MyEmp from './MyEmp'
import MyDelivery from './MyDelivery'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
export default {
  components: { MyRepository, MySupplier, MyEmp, MyDelivery, MyAccept, MyDetail },
  filters: {
    statfilter(status) {
      const statusMap = {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
      return statusMap[status]
    }
  },
  props: {
    detailcontrol: {
      type: Boolean,
      default: false
    },
    detaildata: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 审核步骤数据
      reviewList: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 供应商信息数据
      personalForm: this.detaildata,
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
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      this.supplierId = this.personalForm.supplierName
      this.stockPersonId = this.personalForm.stockPersonName
      this.deliveryPersonId = this.personalForm.deliveryPersonName
      this.acceptPersonId = this.personalForm.acceptPersonName
      this.enterRepositoryId = this.personalForm.enterRepositoryName
      this.list2 = this.personalForm.stockEnterDetailVos
      this.reviewList = this.personalForm.approvalUseVos
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
      locationlist(this.personalForm.enterRepositoryId).then(res => {
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
      console.log(rest)
      if (rest.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '采购入库明细表不能为空',
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
      const parms2 = JSON.stringify(rest)
      updatestockenter(this.personalForm, parms2).then(res => {
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
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
  }
</style>
