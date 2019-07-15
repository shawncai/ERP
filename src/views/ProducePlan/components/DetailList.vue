<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" append-to-body class="edit" top="10px" title="修改采购入库单" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card">
        <h2 ref="geren" class="form-name">基本信息</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">打印</button>
        <div class="container">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="主生产计划单编号" style="width: 100%;display: none">
                  {{ personalForm.planNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProducePlan.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px; width: 150px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('public.createPersonName')" style="width: 100%;">
                  <el-input v-model="personalForm.createPersonName" style="margin-left: 18px; width: 150px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('public.createDate')" style="width: 100%;">
                  <el-input v-model="personalForm.createDate" style="margin-left: 18px; width: 150px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProducePlan.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="personalForm.handlePersonName" style="margin-left: 18px; width: 150px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProducePlan.deptId')" style="width: 100%;">
                  <el-input v-model="personalForm.workCenter" style="margin-left: 18px; width: 150px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProducePlan.summary')" style="width: 100%;">
                  <el-input v-model="personalForm.summary" style="margin-left: 18px; width: 150px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">主生产计划明细</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="medium"
            style="width: 100%">
            <el-editable-column label="序号" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" fixed="left" align="center" label="物品编号" />
            <el-editable-column prop="productName" fixed="left" align="center" label="物品名称" />
            <el-editable-column prop="productType" align="center" label="规格" />
            <el-editable-column prop="unit" align="center" label="单位" />
            <el-editable-column prop="requireQuantity" align="center" label="需求数量" />
            <el-editable-column prop="planQuantity" align="center" label="计划生产数量" />
          </el-editable>
        </div>
      </el-card>
      <div class="buttons" style="margin-top: 20px;margin-left: 30px">
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
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
      this.list2 = this.personalForm.producePlanDetailVos
    }
  },
  methods: {
    handlecancel() {
      this.editVisible = false
    }
  }
}
</script>

<style scoped>
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
  }
  @media print {
    .print {
      display: none;
    }
    .print2 {
      display: block !important;
    }
  }
</style>
