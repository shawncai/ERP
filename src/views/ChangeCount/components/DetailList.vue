<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.changeNumber +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="改期单编号" style="width: 100%;display: none">
                  {{ personalForm.changeNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ChangeCount.title')" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ChangeCount.sourceType')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ChangeCount.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                  <span>{{ personalForm.sourceNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ChangeCount.customerId')" prop="customerId" style="width: 100%;">
                  <span>{{ personalForm.customerName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ChangeCount.customerPhone')" style="width: 100%;">
                  <span>{{ personalForm.customerPhone }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ChangeCount.totalMoney')" prop="totalMoney" style="width: 100%;">
                  <span>{{ personalForm.totalMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ChangeCount.beforeCount')" prop="beforeCount" style="width: 100%;">
                  <span>{{ personalForm.beforeCount }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ChangeCount.paidCount')" style="width: 100%;">
                  <span>{{ personalForm.paidCount }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ChangeCount.paidMoney')" style="width: 100%;">
                  <span>{{ personalForm.paidMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ChangeCount.paidCapital')" style="width: 100%;">
                  <span>{{ personalForm.paidCapital }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ChangeCount.remainCapital')" style="width: 100%;">
                  <span>{{ personalForm.remainCapital }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ChangeCount.afterCount')" prop="afterCount" style="width: 100%;">
                  <span>{{ personalForm.afterCount }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ChangeCount.saleRepositoryId')" style="width: 100%;">
                  <span>{{ personalForm.saleRepositoryName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!-- <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >分期明细</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="medium"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" fixed="left" align="center" type="index"/>
            <el-editable-column prop="productCode" align="center" fixed="left" :label="$t('Hmodule.wpbh')" />
            <el-editable-column prop="productName" align="center" fixed="left" :label="$t('Hmodule.wpmc')" />
            <el-editable-column prop="productCategory" align="center" :label="$t('updates.wpfl')" />
            <el-editable-column prop="unit" align="center" :label="$t('updates.jbdw')" />
            <el-editable-column prop="typeId" align="center" :label="$t('updates.ggxh')" />
            <el-editable-column prop="color" align="center" :label="$t('updates.ys')" />
            <el-editable-column prop="kpiGrade" align="center" :label="$t('updates.jxf')" />
            <el-editable-column prop="point" align="center" :label="$t('updates.spjf')" />
            <el-editable-column prop="price" align="center" :label="$t('Hmodule.dj')" />
            <el-editable-column prop="carCode" align="center" :label="$t('updates.cjbm')" />
            <el-editable-column prop="batteryCode" align="center" :label="$t('updates.dcbm')" />
            <el-editable-column prop="motorCode" align="center" :label="$t('updates.djbm')" />
          </el-editable>
        </div>
      </el-card> -->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.spjl') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="reviewList"
            border
            style="width: 100%">
            <el-table-column
              :label="$t('updates.dqbz')"
              prop="step"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.dqspr')"
              prop="stepHandlerName"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.spsj')"
              prop="handleTime"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.spyj')"
              prop="stat"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | statfilter }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.bzxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('public.createPersonName2')" prop="stockType" style="width: 100%;">
                  {{ personalForm.createPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.createDate2')" style="width: 100%;">
                  {{ personalForm.createDate }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.endPersonName')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.endPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.endDate')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.endDate }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.modifyPersonName')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.modifyPersonName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('public.modifyDate')" prop="applyDate" style="width: 100%;">
                  {{ personalForm.modifyDate }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
var _that
export default {
  filters: {
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.fqsqd')
      }
      return statusMap[status]
    },
    statfilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('Hmodule.shbtg')
      }
      return statusMap[status]
    },
    receiptStatFilter(status) {
      const statusMap = {
        1: _that.$t('updates.zd'),
        2: _that.$t('updates.zx'),
        3: _that.$t('updates.jd')
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
      list2: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 供应商信息数据
      personalForm: this.detaildata,
      productForm: {}
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
      this.list2 = this.personalForm.changeCountDetailvos
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
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
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
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
  @media print {
    .print {
      display: none;
    }
    .print2 {
      display: block !important;
    }
  }
</style>
