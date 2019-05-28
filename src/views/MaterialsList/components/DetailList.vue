<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" append-to-body class="edit" top="10px" title="修改采购入库单" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.bomNumber')" prop="bomNumber" style="width: 100%;">
                <el-input v-model="personalForm.bomNumber" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.bomTypeId')" prop="bomTypeId" style="width: 100%;">
                <el-select v-model="personalForm.bomTypeId" style="margin-left: 18px;width: 150px" disabled >
                  <el-option value="1" label="工艺BOM"/>
                  <el-option value="2" label="设计BOM"/>
                  <el-option value="3" label="制造BOM"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.isActive')" prop="isActive" style="width: 100%;">
                <el-radio-group v-model="personalForm.isActive" style="width: 150px;margin-left: 19px" disabled>
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="2">未启用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.version')" style="width: 100%;">
                <el-select v-model="personalForm.version" style="margin-left: 18px;width: 150px" disabled >
                  <el-option value="1" label="版本1"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.summary')" style="width: 100%;">
                <el-input v-model="personalForm.summary" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--父件信息-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="geren" class="form-name">父件信息</h2>
      <div class="container">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.productName')" prop="productName" style="width: 100%;">
                <el-input v-model="personalForm.productName" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.unit')" prop="unit" style="width: 100%;">
                <el-input v-model="personalForm.unit" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('MaterialsList.productTypeId')" prop="productTypeId" style="width: 100%;">
                <el-input v-model="personalForm.productType" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--入库单明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">子件信息</h2>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column prop="productCode" align="center" label="子件" min-width="150px"/>
          <el-editable-column prop="productName" align="center" label="子件名称" min-width="150px"/>
          <el-editable-column prop="productType" align="center" label="规格" min-width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
          <el-editable-column prop="productCategory" align="center" label="子件类型" min-width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
          <el-editable-column prop="quantity" align="center" label="定额" min-width="150px"/>
          <el-editable-column prop="lossRate" align="center" label="损耗率" min-width="150px"/>
          <el-editable-column prop="isKey" align="center" label="是否关键件" min-width="150px"/>
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
      list2: [],
      // 审核步骤数据
      reviewList: [],
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
      this.list2 = this.personalForm.materialsListDetailVos
      this.reviewList = this.personalForm.approvalUseVos
    }
  },
  methods: {
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
