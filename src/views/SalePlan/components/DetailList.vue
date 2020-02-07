<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.planNumber +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('SalePlan.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" style="margin-left: 18px;width:200px" clearable disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SalePlan.planCategory')" prop="" style="width: 100%;">
                  <el-select
                    v-model="personalForm.planCategory"
                    style="margin-left: 18px;width: 200px"
                    disabled>
                    <el-option value="1" label="门店计划" />
                    <el-option value="2" label="区域计划" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SalePlan.planType')" prop="" style="width: 100%;">
                  <el-select
                    v-model="personalForm.planType"
                    style="margin-left: 18px;width: 200px"
                    disabled>
                    <el-option value="1" label="年计划" />
                    <el-option value="2" label="季计划" />
                    <el-option value="3" label="月计划" />
                    <el-option value="4" label="周计划" />
                    <el-option value="5" label="日计划" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SalePlan.beginTime')" style="width: 100%;">
                  <el-input v-model="personalForm.beginTime" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SalePlan.endTime')" style="width: 100%;">
                  <el-input v-model="personalForm.endTime" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="personalForm.planCategory === '2'" :span="12">
                <el-form-item :label="$t('SalePlan.regionId')" style="width: 100%;">
                  <el-input v-model="personalForm.planRegionName" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col v-if="personalForm.planCategory === '1'" :span="12">
                <el-form-item :label="$t('SalePlan.repositoryid')" style="width: 100%;">
                  <el-input v-model="personalForm.planRepositoryName" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.jhmx') }}</h2>
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
            <el-editable-column :label="$t('SalePlan.progress')" prop="" align="center" min-width="150px">
              <template slot-scope="scope">
                <el-progress ref="myprogress" :text-inside="true" :stroke-width="18" :percentage="clacProgress(scope.row)" :status="mystatus" :format="_format(scope.row)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElCascader ', type: 'visible', options: 'options'}" :label="$t('SalePlan.planTarget')" prop="" align="center" min-width="250px">
              <template slot="edit" slot-scope="scope">
                <el-select v-model="scope.row.planTarget" :placeholder="$t('SalePlan.xzmd')" disabled clearable filterable style="margin-left: 18px;width: 180px">
                  <el-option value="1" label="销售任务" />
                  <el-option value="2" label="分期付款收款任务" />
                  <el-option value="3" label="准时交款任务" />
                  <el-option value="4" label="一个月未交任务" />
                  <el-option value="5" label="连续三个月未交任务" />
                  <el-option value="6" label="连续三个月以上未交任务" />
                  <el-option value="7" label="地点任务" />
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('SalePlan.address')" prop="address" align="center" min-width="150px"/>
            <el-editable-column :label="$t('SalePlan.typeId')" prop="productType" align="center" min-width="250px"/>
            <el-editable-column :label="$t('SalePlan.quantity')" prop="quantity" align="center" min-width="150" />
            <el-editable-column :label="$t('SalePlan.money')" prop="money" align="center" min-width="150" />
            <el-editable-column :label="$t('SalePlan.actualQuantity')" prop="actualQuantity" align="center" min-width="150" />
            <el-editable-column :label="$t('SalePlan.actualMoney')" prop="actualMoney" align="center" min-width="150" />
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
import { saleplanlistDetail } from '@/api/SalePlan'
var _that
export default {
  filters: {
    planTypeFilter(status) {
      const statusMap = {
        1: '年',
        2: '月',
        3: '周',
        4: '日'
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
    payTypeFilter(status) {
      const statusMap = {
        1: '货到付款',
        2: '当场支付'
      }
      return statusMap[status]
    },
    closeStatusIdFilter(status) {
      const statusMap = {
        1: '已结算',
        2: '未结算'
      }
      return statusMap[status]
    },
    enterStatusIdFilter(status) {
      const statusMap = {
        1: '已入库',
        2: '未入库'
      }
      return statusMap[status]
    },
    customerTypeFilter(status) {
      const statusMap = {
        1: '经销商',
        2: '零售商'
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
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.xsckd'),
        2: _that.$t('Hmodule.Nosource')
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
      mystatus: '',
      // 树结构数据
      data2: [],
      defaultProps: {
        children: 'salePlanDetailVos',
        label: 'label'
      },
      // 合计数据
      heji1: '',
      heji2: '',
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
      this.data2 = this.personalForm.salePlanDetailVos
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      saleplanlistDetail(this.personalForm.id).then(res => {
        console.log('详情数据============>', res.data.data.content.salePlanDetailVos)
        for (let i = 0; i < res.data.data.content.salePlanDetailVos.length; i++) {
          res.data.data.content.salePlanDetailVos[i].planTarget = String(res.data.data.content.salePlanDetailVos[i].planTarget)
        }
        this.list2 = res.data.data.content.salePlanDetailVos
      })
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
    handlecancel() {
      this.editVisible = false
    },
    // 进度条
    clacProgress(row) {
      console.log('row==================>', row)
      const res = Number(((row.actualQuantity / row.quantity) * 100).toFixed(0))
      if (res < 50) {
        this.mystatus = 'exception'
      } else if (res >= 50 && res < 100) {
        this.mystatus = 'text'
      } else {
        this.mystatus = 'success'
      }
      console.log(typeof res)
      return res > 100 ? 100 : res
    },
    _format(row) {
      this.$nextTick(function() {
        var dom = this.$refs.myprogress.$el.children[0].children[0].children[0].children[0].innerText = ((row.actualQuantity / row.quantity) * 100).toFixed(0) + '%'
        console.log('dom=================>', dom)
      })
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
