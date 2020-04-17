<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.returnNumber +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item class="print2" label="预售退款单编号" style="width: 100%;display: none">
                    {{ personalForm.number }}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.title2')" style="width: 100%;">
                    <span>{{ personalForm.title }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.sourceType')" prop="sourceType" style="width: 100%;">
                    <span>{{ personalForm.sourceType | sourceTypeFilter }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.sourceNumber')" style="width: 100%;">
                    <span>{{ personalForm.sourceNumber }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.customerName')" prop="customerName" style="width: 100%;">
                    <span>{{ personalForm.customerName }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.phone')" style="width: 100%;">
                    <span>{{ personalForm.phone }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.address')" style="width: 100%;">
                    <span>{{ personalForm.address }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.settleMode')" style="width: 100%;">
                    <span>{{ personalForm.settleModeName }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.settleMoney')" style="width: 100%;">
                    <span>{{ personalForm.settleMoney }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.payMode')" style="width: 100%;">
                    <span>{{ personalForm.payMode | payModeFilter }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.salePersonId')" style="width: 100%;">
                    <span>{{ personalForm.salePersonName }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.postId')" style="width: 100%;">
                    <span>{{ personalForm.postName }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.saleRepositoryId')" style="width: 100%;">
                    <span>{{ personalForm.saleRepositoryName }} </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('Advancemanage.returnMoney')" style="width: 100%;">
                    <span>{{ personalForm.returnMoney }} </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.ddmx') }}</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="small"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('updates.spbh')" prop="productCode" fixed="left" align="center" />
            <el-editable-column :label="$t('updates.spmc')" prop="productName" fixed="left" align="center" />
            <el-editable-column :label="$t('updates.spfl')" prop="category" align="center" />
            <el-editable-column :label="$t('updates.jbdw')" prop="unit" align="center" />
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" />
            <el-editable-column :label="$t('updates.ggxh')" prop="unit" align="center" />
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" />
            <el-editable-column :label="$t('updates.jxf')" prop="kpiGrade" align="center" />
            <el-editable-column :label="$t('updates.spjf')" prop="point" align="center" />
            <el-editable-column :label="$t('updates.shuli')" prop="quantity" align="center" />
            <el-editable-column :label="$t('updates.lsj')" prop="salePrice" align="center" />
            <el-editable-column :label="$t('updates.cbj')" prop="costPrice" align="center" />
            <el-editable-column :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" />
            <el-editable-column :label="$t('updates.slv')" prop="taxRate" align="center" />
            <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" />
            <el-editable-column :label="$t('Hmodule.je')" prop="money" align="center" />
            <el-editable-column :label="$t('updates.hscbje')" prop="includeTaxCostMoney" align="center" />
            <el-editable-column :label="$t('updates.cjbm')" prop="carCode" align="center" />
            <el-editable-column :label="$t('updates.dcbm')" prop="batteryCode" align="center" />
            <el-editable-column :label="$t('updates.djbm')" prop="motorCode" align="center" />
            <el-editable-column :label="$t('updates.cklv')" prop="discount" align="center" />
            <el-editable-column :label="$t('updates.cke')" prop="discountMoney" align="center" />
          </el-editable>
        </div>
      </el-card>
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
    statfilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('Hmodule.shbtg')
      }
      return statusMap[status]
    },
    receiveModeFilter(status) {
      const statusMap = {
        1: '接收1',
        2: '接收2'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.ysdd')
      }
      return statusMap[status]
    },
    currencyFliter(status) {
      const statusMap = {
        1: 'PHP',
        2: 'USD',
        3: 'RMB'
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
    },
    payModeFilter(status) {
      const statusMap = {
        1: '现金'
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
      // 详细表数据
      list2: [],
      list3: [],
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
      this.list2 = this.personalForm.advanceReturnDetailVos
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = row.price * row.taxRate
      return row.taxMoney
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = row.plannedQuantity * row.includeTaxPrice
      return row.includeTaxMoney
    },
    // 计算金额
    getMoney(row) {
      row.money = row.plannedQuantity * row.price
      return row.money
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
