<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('CustomerSurveyReport.title')" prop="title" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CustomerSurveyReport.sourceType')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CustomerSurveyReport.sourceNumber')" prop="sourceNumber" style="width: 100%;">
                  <span>{{ personalForm.sourceNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CustomerSurveyReport.customerName')" style="width: 100%;">
                  <span>{{ personalForm.customerName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CustomerSurveyReport.surveyDate')" style="width: 100%;">
                  <span>{{ personalForm.surveyDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('CustomerSurveyReport.surveyPersonId')" style="width: 100%;">
                  <span>{{ personalForm.surveyPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('otherlanguage.djylfj')" style="width: 100%;">
                  <a :href="personalForm.picPaths[0]">
                    <el-button type="success">{{ $t('otherlanguage.djylfj') }}</el-button>
                  </a>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('updates.khdcbgmx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('CustomerSurveyReport.liveStatus')" prop="title" style="width: 100%;">
                  <span>{{ personalForm.liveStatus | liveStatusFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('CustomerSurveyReport.liveType')" prop="title" style="width: 100%;">
                  <span>{{ personalForm.liveType | liveTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('CustomerSurveyReport.personalProperty')" prop="title" style="width: 100%;">
                  <span>{{ personalForm.personalProperty2 }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('updates.zhjg') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm3" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('CustomerSurveyReport.result')" prop="title" style="width: 100%;">
                  <span>{{ personalForm.result | resultFilter }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('updates.yyfx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm4" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('CustomerSurveyReport.reason')" prop="title" style="width: 100%;">
                  <el-input
                    v-model="personalForm.reason"
                    :autosize="{ minRows: 5 }"
                    type="textarea"
                    style="width:300px"
                    readonly/>
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
    </div>
  </el-dialog>
</template>

<script>
var _that
export default {
  filters: {
    resultFilter(status) {
      const statusMap = {
        1: '通过',
        2: '不通过'
      }
      return statusMap[status]
    },
    liveStatusFilter(status) {
      const statusMap = {
        1: '自有住房',
        2: '租房',
        3: '和亲戚住'
      }
      return statusMap[status]
    },
    liveTypeFilter(status) {
      const statusMap = {
        1: '旧的',
        2: '新建筑',
        3: '高档公寓',
        4: '小隔间',
        5: '普通公寓',
        6: '双层楼建筑',
        7: '低成本住房'
      }
      return statusMap[status]
    },
    customerTypeFilter(status) {
      const statusMap = {
        1: '经销商',
        2: '客户'
      }
      return statusMap[status]
    },
    contractStatFilter(status) {
      const statusMap = {
        1: '状态1'
      }
      return statusMap[status]
    },
    deliveryModeFilter(status) {
      const statusMap = {
        1: '交货1'
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
    saleTypeFilter(status) {
      const statusMap = {
        1: '零售',
        2: '批发'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        2: _that.$t('updates.fqsq')
      }
      return statusMap[status]
    },
    currencyFilter(status) {
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
    payTypeFilter(status) {
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
      console.log('this.personalForm', this.personalForm)
      this.list2 = this.personalForm.saleContractDetailVos
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
      let pro = ''
      if (this.personalForm.personalProperty.indexOf('1') !== -1) {
        pro = pro + '电视'
      }
      if (this.personalForm.personalProperty.indexOf('2') !== -1) {
        pro = pro + ' ' + '   家庭影院'
      }
      if (this.personalForm.personalProperty.indexOf('3') !== -1) {
        pro = pro + ' ' + '   冰箱'
      }
      if (this.personalForm.personalProperty.indexOf('4') !== -1) {
        pro = pro + ' ' + '  洗衣机'
      }
      if (this.personalForm.personalProperty.indexOf('5') !== -1) {
        pro = pro + ' ' + '   空调'
      }
      if (this.personalForm.personalProperty.indexOf('6') !== -1) {
        pro = pro + ' ' + '   电脑'
      }
      this.personalForm.personalProperty2 = pro
      // this.personalForm.personalProperty = ''
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
