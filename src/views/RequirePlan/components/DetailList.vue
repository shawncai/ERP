<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.planNumber +'    详情'" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('RequirePlan.title')" style="width: 100%;color: #909399">
                <span>{{ personalForm.title }}</span>
                <!--<el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('RequirePlan.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                <!--<el-input v-model="personalForm.handlePersonName" style="margin-left: 18px;width: 200px" clearable/>-->
                <span>{{ personalForm.handlePersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('RequirePlan.deptId')" style="width: 100%;">
                <!--<el-input v-model="personalForm.workCenter" style="margin-left: 18px;width: 200px" clearable/>-->
                <span>{{ personalForm.workCenter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('RequirePlan.producePlanNumber')" prop="producePlanNumber" style="width: 100%;">
                <!--<el-input v-model="personalForm.producePlanNumber" style="margin-left: 18px;width: 200px" clearable />-->
                <span>{{ personalForm.producePlanNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('RequirePlan.planSupplyDate')" prop="planSupplyDate" style="width: 100%;">
                <!--<el-date-picker-->
                <!--v-model="personalForm.planSupplyDate"-->
                <!--type="date"-->
                <!--placeholder="计划供料日期"-->
                <!--value-format="yyyy-MM-dd"-->
                <!--style="margin-left: 18px;width: 200px"/>-->
                <span>{{ personalForm.planSupplyDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('RequirePlan.produceRepositoryId')" prop="produceRepositoryId" style="width: 100%;">
                <!--<el-input v-model="personalForm.produceRepositoryName" style="margin-left: 18px;width: 200px" clearable />-->
                <span>{{ personalForm.produceRepositoryName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('RequirePlan.summary')" style="width: 100%;">
                <!--<el-input v-model="personalForm.summary" style="margin-left: 18px;width: 200px" clearable/>-->
                <span>{{ personalForm.summary }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">主生产计划明细</h2>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: false, showStatus: true}"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
          <el-editable-column prop="productType" align="center" label="规格" min-width="150px">
            <template slot-scope="scope">
              <p>{{ getTypeName(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
          <el-editable-column prop="requireQuantity" align="center" label="毛需求数量" min-width="150px"/>
          <el-editable-column prop="planQuantity" align="center" label="应计划数量" min-width="150px"/>
          <el-editable-column :edit-render="{name: 'ElSelect', options: materialsSource, type: 'visible'}" prop="materialsSource" align="center" label="物料来源" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!--审核状态-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
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
  </el-dialog>
</template>

<script>
import { searchEmpCategory2 } from '@/api/Product'
export default {
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
      // 审核数据
      reviewList: [],
      // 物料来源
      materialsSource: [{ value: 1, label: '库存' }, { value: 2, label: '生产' }, { value: 3, label: '采购' }],
      // 详细表数据
      list2: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 供应商信息数据
      personalForm: this.detaildata
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      this.list2 = this.personalForm.materialsRequirePlanDetailVos
      this.reviewList = this.personalForm.approvalUseVos
    }
  },
  methods: {
    // 获取规格
    getTypeName(row) {
      searchEmpCategory2(row.typeId).then(res => {
        if (res.data.ret === 200) {
          row.productType = res.data.data.content.list[0].categoryName
        }
      })
      return row.productType
    },
    handlecancel() {
      this.editVisible = false
    }
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
    height: 1000px;
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
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
  }
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .el-col-12{
    width: 49%;
  }
</style>
