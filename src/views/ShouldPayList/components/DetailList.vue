<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('StockArrival.title')" style="width: 100%;">
                <span>{{ personalForm.title }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockArrival.sourceType')" prop="sourceType" style="width: 100%;">
                <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockArrival.supplierId')" prop="supplierId" style="width: 100%;">
                <span>{{ personalForm.supplierName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockArrival.stockPersonId')" prop="stockPersonId" style="width: 100%;">
                <span>{{ personalForm.stockPersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockArrival.stockTypeId')" prop="stockType" style="width: 100%;">
                <span>{{ personalForm.stockTypeName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockArrival.deptId')" prop="deptId" style="width: 100%;">
                <span>{{ personalForm.deptName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockArrival.payId')" style="width: 100%;">
                <span>{{ personalForm.payName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockArrival.acceptDate')" prop="signDate" style="width: 100%;">
                <span>{{ personalForm.acceptDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockArrival.arrivalDate')" prop="signDate" style="width: 100%;">
                <span>{{ personalForm.arrivalDate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockArrival.acceptPersonId')" style="width: 100%;">
                <span>{{ personalForm.acceptPersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockArrival.deliveryModeId')" style="width: 100%;">
                <span>{{ personalForm.deliveryModeName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockArrival.isVat')" style="width: 100%;">
                <el-radio-group v-model="personalForm.isVat" style="margin-left: 18px;width: 200px" disabled>
                  <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                  <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockArrival.currencyId')" prop="currency" style="width: 100%;">
                <span>{{ personalForm.currencyId | currencyIdFilter }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">采购合同明细</h2>
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
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.cgsl')" prop="stockQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.dhsl')" prop="arrivalQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.jhrq')" prop="giveDate" align="center" min-width="170px"/>
          <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" min-width="170px"/>
          <el-editable-column :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" min-width="170px"/>
          <el-editable-column :label="$t('updates.sl')" prop="taxRate" align="center" min-width="170px"/>
          <el-editable-column :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.zk')" prop="discountRate" align="center" min-width="170px"/>
          <el-editable-column :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="170px"/>
          <el-editable-column :label="$t('updates.bz')" prop="remark" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.yrksl')" prop="hadStorageQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.bjsl')" prop="reportCheckingQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.sjsl')" prop="actualCheckingQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.hgsl')" prop="qualifyQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.bhgsl')" prop="unqualifyQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.thsl')" prop="returnQuantity" align="center" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!--审核状态-->
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
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('updates.dhslzj')" style="width: 100%;">
                <span> {{ personalForm.allQuantity }} </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('updates.hehj')" style="width: 100%;">
                <span> {{ personalForm.allMoney }} </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('updates.sehj')" style="width: 100%;">
                <span> {{ personalForm.allTaxMoney }} </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('updates.hsjehj')" style="width: 100%;">
                <span> {{ personalForm.allIncludeTaxMoney }} </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('updates.zdzkjehj')" style="width: 100%;">
                <span> {{ personalForm.allDiscountMoney }} </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('updates.zhhsjehj')" style="width: 100%;">
                <span> {{ personalForm.allIncludeTaxDiscountMoney }} </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('updates.cqtfyzchjgjhj')" style="width: 100%;">
                <span> {{ personalForm.otherMoney }} </span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
        3: _that.$t('updates.shbtg')
      }
      return statusMap[status]
    },
    stockTypeIdFilter(status) {
      const statusMap = {
        1: '采购1'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.cgsq'),
        2: _that.$t('updates.cgjhd'),
        3: _that.$t('updates.cgxjd'),
        4: _that.$t('Hmodule.Nosource')
      }
      return statusMap[status]
    },
    currencyIdFilter(status) {
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
    payIdFilter(status) {
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
      this.list2 = this.personalForm.stockArrivalDetailVos
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
</style>
