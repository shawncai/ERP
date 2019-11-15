<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.applyNumber +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.title')" style="width: 100%;">
                <span>{{ personalForm.title }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.firstName')" prop="firstName" style="width: 100%;">
                <span>{{ personalForm.firstName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.middleName')" style="width: 100%;">
                <span>{{ personalForm.middleName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.lastName')" prop="lastName" style="width: 100%;">
                <span>{{ personalForm.lastName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.applyPhone')" prop="applyPhone" style="width: 100%;">
                <span>{{ personalForm.applyPhone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.provinceId')" prop="provinceId" style="width: 100%;">
                <span>{{ personalForm.provinceName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.cityId')" prop="cityId" style="width: 100%;">
                <span>{{ personalForm.cityName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.address')" prop="address" style="width: 100%;">
                <span>{{ personalForm.address }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.gender')" style="width: 100%;">
                <span>{{ personalForm.gender | genderFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.birthday')" style="width: 100%;">
                <span>{{ personalForm.birthday }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.marriageStat')" style="width: 100%;">
                <span>{{ personalForm.marriageStat | marriageStatFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.certificateType')" style="width: 100%;">
                <span>{{ personalForm.certificateType | certificateTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.certificateNumber')" style="width: 100%;">
                <span>{{ personalForm.certificateNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.workStat')" style="width: 100%;">
                <span>{{ personalForm.workStat | workStatFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.salePersonId')" prop="salePersonId" style="width: 100%;">
                <span>{{ personalForm.salePersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.saleRepositoryId')" style="width: 100%;">
                <span>{{ personalForm.saleRepositoryName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.applyDate')" prop="applyDate" style="width: 100%;">
                <span>{{ personalForm.applyDate }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">商品信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm2" :model="productForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.productCode')" prop="productCode" style="width: 100%;">
                <span>{{ productForm.productCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.productName')" style="width: 100%;">
                <span>{{ productForm.productName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.color')" style="width: 100%;">
                <span>{{ productForm.color }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.typeId')" style="width: 100%;">
                <span>{{ productForm.productType }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.unit')" style="width: 100%;">
                <span>{{ productForm.unit }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.categoryId')" style="width: 100%;">
                <span>{{ productForm.productCategory }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.kpiGrade')" style="width: 100%;">
                <span>{{ productForm.kpiGrade }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.point')" style="width: 100%;">
                <span>{{ productForm.point }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.carCode')" style="width: 100%;">
                <span>{{ productForm.carCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.motorCode')" style="width: 100%;">
                <span>{{ productForm.motorCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.batteryCode')" style="width: 100%;">
                <span>{{ productForm.batteryCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.installmentCount')" prop="installmentCount" style="width: 100%;">
                <span>{{ personalForm.installmentCount }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.installmentDays')" prop="installmentDays" style="width: 100%;">
                <span>{{ personalForm.installmentDays }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.totalMoney')" prop="totalMoney" style="width: 100%;">
                <span>{{ personalForm.totalMoney }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">配偶信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm3" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.mateName')" style="width: 100%;">
                <span>{{ personalForm.mateName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.mateCertificateType')" style="width: 100%;">
                <span>{{ personalForm.mateCertificateType | mateCertificateTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.mateCertificateNumber')" style="width: 100%;">
                <span>{{ personalForm.mateCertificateNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.matePhone')" style="width: 100%;">
                <span>{{ personalForm.matePhone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.mateWorkStat')" style="width: 100%;">
                <span>{{ personalForm.mateWorkStat | mateWorkStatFilter }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="geren" class="form-name">工作信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm4" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.workProvinceId')" style="width: 100%;">
                <span>{{ personalForm.workProvinceName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.workCityId')" style="width: 100%;">
                <span>{{ personalForm.workCityName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.workAddress')" style="width: 100%;">
                <span>{{ personalForm.workAddress }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.enterpriseName')" style="width: 100%;">
                <span>{{ personalForm.enterpriseName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.enterpriseNature')" style="width: 100%;">
                <span>{{ personalForm.enterpriseNature | enterpriseNatureFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.enterprisePeoples')" style="width: 100%;">
                <span>{{ personalForm.enterprisePeoples }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.salary')" style="width: 100%;">
                <span>{{ personalForm.salary }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.enterpriseContact')" style="width: 100%;">
                <span>{{ personalForm.enterpriseContact }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.enterprisePhone')" style="width: 100%;">
                <span>{{ personalForm.enterprisePhone }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px;margin-bottom: 30px">
      <h2 ref="geren" class="form-name">担保人信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm5" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyName')" prop="suretyName" style="width: 100%;">
                <span>{{ personalForm.suretyName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyPhone')" prop="suretyPhone" style="width: 100%;">
                <span>{{ personalForm.suretyPhone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.relationship')" prop="relationship" style="width: 100%;">
                <span>{{ personalForm.relationship }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyProvinceId')" prop="suretyProvinceId" style="width: 100%;">
                <span>{{ personalForm.suretyProvinceName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyCityId')" prop="suretyCityId" style="width: 100%;">
                <span>{{ personalForm.suretyCityName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyAddress')" style="width: 100%;">
                <span>{{ personalForm.suretyAddress }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyCertificateType')" style="width: 100%;">
                <span>{{ personalForm.suretyCertificateType | suretyCertificateTypeFilter }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('InstallmentApply.suretyCertificateNumber')" style="width: 100%;">
                <span>{{ personalForm.suretyCertificateNumber }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
            prop="step"
            align="center"
            :label="$t('updates.dqbz')"
            min-width="150"/>
          <el-table-column
            prop="stepHandlerName"
            align="center"
            :label="$t('updates.dqspr')"
            min-width="150"/>
          <el-table-column
            prop="handleTime"
            align="center"
            :label="$t('updates.spsj')"
            min-width="150"/>
          <el-table-column
            prop="stat"
            align="center"
            :label="$t('updates.spyj')"
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
  </el-dialog>
</template>

<script>
var _that
export default {
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    },
    payTypeFilter(status) {
      const statusMap = {
        1: '方式1',
        2: '方式2'
      }
      return statusMap[status]
    },
    marriageStatFilter(status) {
      const statusMap = {
        1: '未婚',
        2: '已婚'
      }
      return statusMap[status]
    },
    certificateTypeFilter(status) {
      const statusMap = {
        1: '身份证',
        2: '其他'
      }
      return statusMap[status]
    },
    workStatFilter(status) {
      const statusMap = {
        1: '无业',
        2: '在职'
      }
      return statusMap[status]
    },
    statfilter(status) {
      const statusMap = {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
      return statusMap[status]
    },
    mateCertificateTypeFilter(status) {
      const statusMap = {
        1: '身份证',
        2: '其他'
      }
      return statusMap[status]
    },
    mateWorkStatFilter(status) {
      const statusMap = {
        1: '在职',
        2: '无业'
      }
      return statusMap[status]
    },
    enterpriseNatureFilter(status) {
      const statusMap = {
        1: '国企',
        2: '民营'
      }
      return statusMap[status]
    },
    suretyCertificateTypeFilter(status) {
      const statusMap = {
        1: '身份证',
        2: '其他'
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
      console.log('this.detaildata', this.detaildata)
      this.personalForm = this.detaildata
      // this.productForm = this.detaildata.installmentApplyDetailVos[0]
      // this.reviewList = []
      // const review = this.personalForm.approvalUseVos
      // for (const i in review) {
      //   if (review[i].actualStepHandler !== null) {
      //     this.reviewList.push(review[i])
      //   }
      // }
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
