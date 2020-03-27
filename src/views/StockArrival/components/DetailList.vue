<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.cgdhdxq')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button class="print" style="font-size: 13px;background: white;" @click="printdata">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="采购到货单编号" style="width: 100%;display: none">
                  {{ personalForm.number }}
                </el-form-item>
              </el-col>
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
                  <span>{{ personalForm.settleModeName }}</span>
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
                <el-form-item :label="$t('Supplier.payMode')" style="width: 100%;">
                  <span>{{ personalForm.payModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockArrival.isVat')" style="width: 100%;">
                  <span>{{ personalForm.isVat | isVatFilter }}</span>
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
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">采购到货单明细</h2>
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
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" />
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" />
            <el-editable-column :label="$t('updates.cgsl')" prop="stockQuantity" align="center" />
            <el-editable-column :label="$t('updates.dhsl')" prop="arrivalQuantity" align="center" />
            <el-editable-column :label="$t('updates.jhrq')" prop="giveDate" align="center" >
              <template slot-scope="scope">
                <span >{{ timestampToTime(scope.row.giveDate) }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" />
            <el-editable-column :label="$t('updates.hsj')" prop="includeTaxPrice" align="center" />
            <el-editable-column :label="$t('updates.sl')" prop="taxRate" align="center" />
            <el-editable-column :label="$t('Hmodule.je')" prop="money" align="center" />
            <el-editable-column :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" />
            <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" />
            <el-editable-column :label="$t('updates.zk')" prop="discountRate" align="center" />
            <el-editable-column :label="$t('updates.cke')" prop="discountMoney" align="center" />
            <el-editable-column :label="$t('updates.bz')" prop="remark" align="center" />
            <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" />
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" />
            <el-editable-column :label="$t('updates.yrksl')" prop="hadStorageQuantity" align="center" />
            <el-editable-column :label="$t('updates.bjsl')" prop="reportCheckingQuantity" align="center" />
            <el-editable-column :label="$t('updates.sjsl')" prop="actualCheckingQuantity" align="center" />
            <el-editable-column :label="$t('updates.hgsl')" prop="qualifyQuantity" align="center" />
            <el-editable-column :label="$t('updates.bhgsl')" prop="unqualifyQuantity" align="center" />
            <el-editable-column :label="$t('updates.thsl')" prop="returnQuantity" align="center" />
          </el-editable>
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
              <!-- <el-col :span="12">
                <el-form-item :label="$t('updates.cqtfyzchjgjhj')" style="width: 100%;">
                  <span> {{ personalForm.otherMoney }} </span>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
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
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">质检信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="Checkreportdata"
            border
            style="width: 100%">
            <el-table-column
              prop="reportNumber"
              align="center"
              label="质检单号"
              min-width="150"/>
            <el-table-column
              :label="$t('Hmodule.wpbh')"
              prop="productCode"
              align="center"
              min-width="150"/>
            <el-table-column
              prop="arrivalQuantity"
              align="center"
              label="关联单据"
              min-width="150"/>
            <el-table-column
              prop="checkQuantity"
              align="center"
              label="质检数量"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.hgsl')"
              prop="passQuantity"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.bhgsl')"
              prop="failedQuantity"
              align="center"
              min-width="150"/>
            <el-table-column
              prop="checkDate"
              align="center"
              label="质检日期"
              min-width="150"/>
            <el-table-column
              prop="checkPersonName"
              align="center"
              label="质检人"
              min-width="150"/>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">退货信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="stockRetreatData"
            border
            style="width: 100%">
            <el-table-column
              prop="number"
              align="center"
              label="退货单编号"
              min-width="150"/>
            <el-table-column
              :label="$t('Hmodule.wpbh')"
              prop="productCode"
              align="center"
              min-width="150"/>
            <el-table-column
              prop="arrivalQuantity"
              align="center"
              label="关联单据"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.thsl')"
              prop="retreatQuantity"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.thyy')"
              prop="retreatReason"
              align="center"
              min-width="150"/>
            <el-table-column
              prop="retreatDate"
              align="center"
              label="退货日期"
              min-width="150"/>
            <el-table-column
              prop="stockPersonName"
              align="center"
              label="退货人"
              min-width="150"/>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">入库信息</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="stockenterData"
            border
            style="width: 100%">
            <el-table-column
              :label="$t('updates.rkdbh')"
              prop="enterNumber"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('Hmodule.wpbh')"
              prop="productCode"
              align="center"
              min-width="150"/>
            <el-table-column
              prop="arrivalQuantity"
              align="center"
              label="关联单据"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.rksl')"
              prop="basicQuantity"
              align="center"
              min-width="150"/>
            <el-table-column
              prop="enterPersonName"
              align="center"
              label="入库人"
              min-width="150"/>
            <el-table-column
              prop="enterDate"
              align="center"
              label="入库时间"
              min-width="150"/>
          </el-table>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
import { checkreportlist } from '@/api/CheckReport'
import { searchstockRetreat } from '@/api/StockRetreat'
import { stockenterlist } from '@/api/Stockenter'
import printJS from 'print-js'
var _that
export default {
  filters: {
    isVatFilter(status) {
      const statusMap = {
        1: _that.$t('updates.yes'),
        2: _that.$t('updates.no')
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
    stockTypeIdFilter(status) {
      const statusMap = {
        1: '采购1'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.cgdd'),
        2: _that.$t('Hmodule.Nosource')
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
      // 转换时间格式
      timestampToTime(timestamp) {
        var date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        // var h = date.getHours() + ':'
        // var m = date.getMinutes() + ':'
        // var s = date.getSeconds()
        return Y + M + D
      },
      // 入库信息
      stockenterData: [],
      stockenterlistdata: {
        sourceNumber: this.detaildata.number,
        pagenum: 1,
        pagesize: 999,
        repositoryId: 0
      },
      // 退货信息
      stockRetreatData: [],
      stockRetreatlistdata: {
        sourceNumber: this.detaildata.number,
        pageNum: 1,
        pageSize: 999,
        repositoryId: 0
      },
      // 质检信息
      Checkreportdata: [],
      checkreportData: {
        sourceNumber: this.detaildata.number,
        pageNum: 1,
        pageSize: 999,
        repositoryId: 0
      },
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
      this.checkreportData.sourceNumber = this.detaildata.number
      this.getcheckreportlist()
      this.stockRetreatlistdata.sourceNumber = this.detaildata.number
      this.getstockRetreat()
      this.stockenterlistdata.sourceNumber = this.detaildata.number
      this.getstockenterlist()
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getstockenterlist() {
      stockenterlist(this.stockenterlistdata).then(res => {
        if (res.data.ret === 200) {
          this.stockenterData = res.data.data.content.list.map(function(item) {
            const needata = item.stockEnterDetailVos.map(function(elem) {
              return {
                enterNumber: item.enterNumber,
                productCode: elem.productCode,
                arrivalQuantity: _that.$t('updates.cgdhd'),
                basicQuantity: elem.basicQuantity,
                enterPersonName: item.enterPersonName,
                enterDate: item.enterDate
              }
            })
            return needata
          }).flat()
        }
      })
    },
    // 退货信息
    getstockRetreat() {
      searchstockRetreat(this.stockRetreatlistdata).then(res => {
        if (res.data.ret === 200) {
          this.stockRetreatData = res.data.data.content.list.map(function(item) {
            const needata = item.stockRetreatDetailVos.map(function(elem) {
              return {
                number: item.number,
                productCode: elem.productCode,
                arrivalQuantity: _that.$t('updates.cgdhd'),
                retreatQuantity: elem.retreatQuantity,
                retreatReason: elem.retreatReason,
                retreatDate: item.retreatDate,
                stockPersonName: item.stockPersonName
              }
            })
            return needata
          }).flat()
        }
      })
    },
    // 质检信息
    getcheckreportlist() {
      checkreportlist(this.checkreportData).then(res => {
        if (res.data.ret === 200) {
          this.Checkreportdata = res.data.data.content.list.map(function(item) {
            const needata = item.checkReportDetailVos.map(function(elem) {
              return {
                reportNumber: item.reportNumber,
                productCode: item.productCode,
                arrivalQuantity: _that.$t('updates.cgdhd'),
                checkQuantity: elem.checkQuantity,
                passQuantity: elem.passQuantity,
                failedQuantity: elem.failedQuantity,
                checkDate: item.checkDate,
                checkPersonName: item.checkPersonName
              }
            })
            return needata
          }).flat()
        }
      })
    },
    handlecancel() {
      this.editVisible = false
    },
    cutnull(data) {
      for (const x in data) {
        if (data[x] === null) { // 如果是null 把直接内容转为 ''
          data[x] = ''
        } else {
          if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
            data[x] = data[x].map(z => {
              return this.cutnull(z)
            })
          }
          if (typeof (data[x]) === 'object') { // 是json 递归继续处理
            data[x] = this.cutnull(data[x])
          }
        }
      }
      return data
    },
    printdata() {
      const arr = this.cutnull(this.list2)
      for (const i in arr) {
        arr[i].step = Number(i) + 1
      }
      for (const i in arr) {
        const temp = arr[i].productCode
        arr[i].productCode = temp.split('-').join('')
      }
      const handleperson = this.reviewList.map(item => {
        if (item.actualStepHandler) {
          return item.stepHandlerName
        }
      }).join(',')
      console.log(123, handleperson)
      printJS({
        printable: arr,
        type: 'json',
        properties: [
          { field: 'step', displayName: '行号', columnSize: `50px` },
          { field: 'productCode', displayName: '物料代码', columnSize: `200px` },
          { field: 'productName', displayName: '物料名称', columnSize: `50px` },
          { field: 'typeName', displayName: '规格型号', columnSize: `100px` },
          { field: 'unit', displayName: '单位', columnSize: `100px` },
          { field: 'arrivalQuantity', displayName: '到货数量', columnSize: `100px` },
          { field: 'qualifyQuantity', displayName: '合格数量', columnSize: `100px` },
          { field: 'remark', displayName: '备注', columnSize: `100px` }
        ],
        header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏新世窗国际贸易有限公司 </div>
                      <br>
                      <div class="ordername">采购到货订单</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">供应商：</div>
                        <div class="itemcontent">${this.personalForm.supplierName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">到货日期：</div>
                        <div class="itemcontent">${this.personalForm.arrivalDate}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">编号：</div>
                        <div class="itemcontent">${this.personalForm.number}</div>
                          </div>
                          </div>
                        </div>`,
        bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 99%;height: 40px;align-items: center;border:1px solid;border-top: none;padding-right: 1%">
                  <div class="allmoneyname" style="margin-right: 10%">合计</div>
                  <div class="allmoneynum" style="width: 10%;border-left: 1px solid; border-right: 1px solid;height: 40px;display: flex;align-items: center;justify-content: center;">${this.personalForm.allQuantity}</div>
                  </div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 20px">
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">审核：</div>
                        <div class="bottomname" >${handleperson}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">部门：</div>
                        <div class="bottomname">${this.personalForm.deptName || ''}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">业务员：</div>
                        <div class="bottomname">${this.personalForm.stockPersonName}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">制单：</div>
                        <div class="bottomname">${this.personalForm.createPersonName}</div>
                    </div>
                   </div>
                  </div>`,
        bottomStyle: '.printbottom: { display: flex;margin-top: 20px}',
        style: '.custom-p {font-size:20px;text-align: center; }' +
          ' .ordername {text-align: center; font-size:25px;letter-spacing:15px}' +
          '.pringtitle { line-height: 20px; margin-bottom: 10px }' +
          '.line1 { width: 200px; border: 1px solid #000; margin: 0 auto }' +
          '.line2 {width: 200px; border: 2px dashed #000; margin: 3px auto }' +
          '.supplier {display: flex;justify-content: center; align-items: center;margin-top: 10px}' +
          '.item { width: 33%; justify-content: center; align-items: center; display: flex}' +
          '.item2 { width: 50%; justify-content: center; align-items: center; display: flex}' +
          '.itemname2 { width: 20% }' +
          '.itemcontent2 {width: 80%}' +
          '.itemname { width: 40% }' +
          '.itemcontent {width: 80%}',
        gridHeaderStyle: 'font-size:12px; padding:3px; border:1px solid; color: #000; text-align:center;',
        gridStyle: 'font-size:12px; padding:3px; border:1px solid; text-align:center; text-overflow:ellipsis; white-space:nowrap;',
        repeatTableHeader: true
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
