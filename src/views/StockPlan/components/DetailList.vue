<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.planNumber +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-if="personalForm.judgeStat !== 0 || personalForm.judgeStat !== 3" class="print" style="font-size: 13px;background: white;" @click="printdata">{{ $t('updates.print') }}</button>
        <button v-if="personalForm.sourceType === 3 || personalForm.sourceType === '3'" style="font-size: 10px;margin-left: 10px" @click="handleMyReceipt2()">{{ $t('updates.fzdj') }}</button>

        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="采购计划单编号" style="width: 100%;display: none">
                  {{ personalForm.planNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.title')" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.stockType')" prop="stockType" style="width: 100%;">
                  <span>{{ personalForm.stockTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.planPersonId')" prop="planPersonId" style="width: 100%;">
                  <span>{{ personalForm.planPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.stockPersonId')" prop="stockPersonId" style="width: 100%;">
                  <span>{{ personalForm.stockPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.stockDeptId')" prop="stockDeptId" style="width: 100%;">
                  <span>{{ personalForm.stockDeptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.sourceType')" style="width: 100%;">
                  <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('StockPlan.planDate')" prop="planDate" style="width: 100%;">
                  <span>{{ somedate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('collectAndPayDetail.cgck')" style="width: 100%;">
                  <span>{{ personalForm.planRepositoryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('update4.hjsl')" style="width: 100%;">
                  <span>{{ personalForm.totalQuantity }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.cgjhmx') }}</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="small"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.xh')" class="print" fixed="left" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" />
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" />
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" />
            <!-- <el-editable-column :label="$t('Hmodule.dj')" prop="basicPrice" align="center" /> -->
            <el-editable-column :label="$t('updates.jhsl')" prop="planQuantity" align="center" />
            <!-- <el-editable-column :label="$t('updates.jhje')" prop="planMoney" align="center" /> -->
            <el-editable-column :label="$t('searchSaleReport.taxMoney')" prop="taxMoney" align="center" />
            <el-editable-column :label="$t('Stockenter.taxRate')" prop="taxRate" align="center" />
            <el-editable-column :label="$t('StockQuery.includeTaxPrice')" prop="includeTaxPrice" align="center" />
            <el-editable-column :label="$t('update4.includeTaxMoney')" prop="includeTaxMoney" align="center" />
            <el-editable-column :label="$t('Hmodule.dj')" prop="basicPrice" align="center" />
            <el-editable-column :label="$t('Hmodule.je')" prop="planMoney" align="center" />
            <el-editable-column :label="$t('updates.jhjhrq')" prop="planDeliveryDate" align="center" />
            <el-editable-column :label="$t('updates.sqyy')" prop="applyReason" align="center" />
            <el-editable-column :label="$t('updates.ydbh')" prop="sourceNumber" align="center" />
            <el-editable-column :label="$t('updates.gys')" prop="supplierName" align="center" />
            <el-editable-column :label="$t('updates.ydgsl')" prop="orderQuantity" align="center" />
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" />

          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('update4.allIncludeTaxMoney')" style="width: 100%;">
                  <span>{{ personalForm.allIncludeTaxMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('update4.allPlanMoney')" style="width: 100%;">
                  <span>{{ personalForm.allPlanMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('update4.allTaxMoney')" style="width: 100%;">
                  <span>{{ personalForm.allTaxMoney }}</span>
                </el-form-item>
              </el-col>
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
        <div>
          <el-button v-show="isReview()&&(personalForm.receiptStat === 1||personalForm.receiptStat === 2||personalForm.receiptStat === 3)" type="warning" size="mini" @click="handleReview()">
            {{ $t('updates.spi') }}
          </el-button>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
import { getPrintCount, addPrint } from '@/api/public'
import { updatestockplan2 } from '@/api/StockPlan'
import { addstockorder } from '@/api/StockOrder'

import printJS from 'print-js'
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
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.cgsq'),
        2: _that.$t('updates.cgxq'),
        3: _that.$t('Hmodule.Nosource')
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
      // 中转data
      somedate: '',
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
      for (const i in this.personalForm.stockPlanDetailVos) {
        delete this.personalForm.stockPlanDetailVos[i].stockPlanDetailVos
      }
      this.list2 = this.personalForm.stockPlanDetailVos
      this.list3 = this.personalForm.stockPlanDetailVos
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
      this.somedate = this.personalForm.planDate
      console.log('this.personalForm', this.detaildata)
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 判断审核按钮
    isReview() {
      if (this.personalForm.approvalUseVos && this.personalForm.approvalUseVos.length !== 0) {
        const approvalUse = this.personalForm.approvalUseVos
        const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
        // console.log(approvalUse[approvalUse.length - 1].stepHandler)
        if (index > -1 && (this.personalForm.judgeStat === 1 || this.personalForm.judgeStat === 0)) {
          return true
        }
      }
    },
    // 审批操作123
    handleReview() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.reviewParms = {}
      console.log('this.personalForm ======> ', _that.personalForm)
      this.reviewParms.id = this.personalForm.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.tg'),
        cancelButtonText: this.$t('prompt.btg'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 2
        console.log('reviewParms', this.reviewParms)
        const parms = JSON.stringify(this.reviewParms)
        // console.log('row', row)

        updatestockplan2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.shcg')
            })
            this.editVisible = false
            this.$emit('rest', true)
            console.log('row.stockPlanDetailVos', this.personalForm.stockPlanDetailVos)
            const arr = this.personalForm.stockPlanDetailVos
            // var b = {}
            // var c = []
            // row.stockPlanDetailVos.forEach(v => {
            //   !b[v.supplierId] ? (b[v.supplierId] = [v]) : b[v.supplierId].push(v)
            // })
            // console.log('b', b)
            // var i = 0
            // for (var o in b) {
            //   c[i] = {
            //     'supplierId': o,
            //     'oarr': b[o]
            //   }
            //   i++
            // }
            // console.log('c', c)
            var jmap = {}
            var c = []

            arr.forEach(function(al) {
              var key = al.supplierId + '_' + al.planDeliveryDate
              if (typeof jmap[key] === 'undefined') {
                jmap[key] = []
              }
              jmap[key].push(al)
            })

            var keys = Object.keys(jmap)
            for (var i = 0; i < keys.length; i++) {
              var rs = keys[i].split('_')
              c.push({ supplierId: rs[0], planDeliveryDate: rs[1], oarr: jmap[keys[i]] })
            }
            console.log('c', c)
            for (const z in c) {
              console.log('c[z]', c[z])
              const arr = []
              for (const k in c[z].oarr) {
                let orderQuantity = 0
                if (c[z].oarr[k].orderQuantity === null) {
                  orderQuantity = 0
                } else {
                  orderQuantity = c[z].oarr[k].orderQuantity
                }
                const stockorderparms2 = {
                  productCode: c[z].oarr[k].productCode,
                  productName: c[z].oarr[k].productName,
                  productType: c[z].oarr[k].productType,
                  typeName: c[z].oarr[k].productType,
                  type: c[z].oarr[k].typeId,
                  color: c[z].oarr[k].color,
                  unit: c[z].oarr[k].unit,
                  planQuantity: c[z].oarr[k].planQuantity,
                  orderQuantity: orderQuantity,
                  deliveryDate: c[z].oarr[k].planDeliveryDate,
                  applicationReason: c[z].oarr[k].applyReason,
                  sourceNumber: this.personalForm.planNumber,
                  sourceSerialNumber: c[z].oarr[k].id,
                  remark: 0,
                  discountRate: 0,
                  discountMoney: 0,
                  arrivalQuantity: 0,
                  price: c[z].oarr[k].basicPrice,
                  includeTaxPrice: c[z].oarr[k].includeTaxPrice,
                  supplierId: c[z].oarr[k].supplierId,
                  returnQuantity: 0,
                  tax: Number(c[z].oarr[k].planQuantity) * Number(c[z].oarr[k].includeTaxPrice) - Number(c[z].oarr[k].planQuantity) * Number(c[z].oarr[k].basicPrice),
                  actualArrivalQuantity: 0,
                  stockQuantity: c[z].oarr[k].planQuantity,
                  taxRate: Number(c[z].oarr[k].taxRate) / 100,
                  money: Number(c[z].oarr[k].planQuantity) * Number(c[z].oarr[k].basicPrice),
                  includeTaxMoney: Number(c[z].oarr[k].planQuantity) * Number(c[z].oarr[k].includeTaxPrice),
                  typeId: c[z].oarr[k].typeId
                }
                arr.push(stockorderparms2)
              }
              const stockorderparms1 = {
                title: '自动生成采购订单',
                stockRepositoryId: this.personalForm.planRepositoryId,
                stockPersonId: this.personalForm.planPersonId,
                createPersonId: this.personalForm.planPersonId,
                countryId: this.$store.getters.countryId,
                repositoryId: this.$store.getters.repositoryId,
                regionId: this.$store.getters.regionId,
                isVat: 1,
                settleMode: 4,
                sourceType: '2',
                currency: '3',
                orderDate: this.todaytime,
                deptId: this.$store.getters.deptId,
                exchangeRate: '1.0000',
                supplierId: c[z].supplierId,
                stockTypeId: this.personalForm.stockType
              }
              const orderparms = JSON.stringify(stockorderparms1)

              const parms2 = JSON.stringify(arr)
              console.log('arr', arr)
              console.log('stockorderparms1', stockorderparms1)
              setTimeout(function() {
                addstockorder(orderparms, parms2, stockorderparms1).then(res => {
                  if (res.data.ret === 200) {
                    loading.close()
                    _that.$notify({
                      title: 'successful',
                      message: 'save successful',
                      type: 'success',
                      offset: 100
                    })
                  }
                })
              }, z * 500)
            }
            loading.close()
          } else {
            loading.close()
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }).catch(action => {
        if (action === 'cancel') {
          // 取消弹框
          this.$confirm('是否确认审核不通过？', 'Warning', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          })
            .then(() => {
              this.reviewParms.judgeStat = 3
              const parms = JSON.stringify(this.reviewParms)
              updatestockplan2(parms).then(res => {
                if (res.data.ret === 200) {
                  this.$message({
                    type: 'success',
                    message: this.$t('prompt.shcg')
                  })
                  this.editVisible = false
                  this.$emit('rest', true)
                } else {
                  this.$notify.error({
                    title: 'wrong',
                    message: res.data.msg,
                    offset: 100
                  })
                }
              })
            })
            .catch(action => {
              this.$message({
                type: 'info',
                message: action === 'cancel'
                  ? '确认取消'
                  : '停留在当前页面'
              })
            })
          // ================取消弹框结束
        }
      })
    },
    handleMyReceipt2() {
      console.log(this.detaildata)
      this.$store.dispatch('getsaleoutcopy', this.detaildata)
      this.$router.push('/StockPlan/AddStockPlan')
      this.editVisible = false
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
    async printdata() {
      const arr = this.cutnull(this.list2)
      for (const i in arr) {
        arr[i].step = Number(i) + 1
      }
      const handleperson = this.reviewList.map(item => {
        if (item.actualStepHandler) {
          return item.actualStepHandler
        }
      }).join(',')
      console.log(handleperson)
      // 先根据权限判断
      // 权限没有再判断次数是否可以打印
      const param = {}
      param.receiptId = this.personalForm.id
      param.receiptTypeId = 6
      // 有权限跳过管理
      const value = ['1-386-82']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      if (hasPermission) {
        printJS({
          printable: arr,
          type: 'json',
          properties: [
            { field: 'step', displayName: '行号', columnSize: `100px` },
            { field: 'productCode', displayName: '物料代码', columnSize: `100px` },
            { field: 'productName', displayName: '物料名称', columnSize: `100px` },
            { field: 'productType', displayName: '规格型号', columnSize: `100px` },
            { field: 'unit', displayName: '单位', columnSize: `100px` },
            { field: 'planQuantity', displayName: '计划数量', columnSize: `100px` },
            { field: 'orderQuantity', displayName: '已购数量', columnSize: `100px` },
            { field: 'basicPrice', displayName: '单价', columnSize: `100px` },
            { field: 'planMoney', displayName: '计划金额', columnSize: `100px` },
            { field: 'planDeliveryDate', displayName: '计划交货日期', columnSize: `100px` },
            { field: 'remarks', displayName: '备注', columnSize: `100px` }
          ],
          header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏嗯哇科技有限公司 </div>
                      <br>
                      <div class="ordername">采购计划</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">采购类别：</div>
                        <div class="itemcontent">${this.personalForm.stockTypeName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">计划日期：</div>
                        <div class="itemcontent">${this.personalForm.planDate}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">编号：</div>
                        <div class="itemcontent">${this.personalForm.planNumber}</div>
                          </div>
                          </div>
                        </div>`,
          bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 99%;height: 40px;align-items: center;border:1px solid;border-top: none;padding-right: 1%">
                  <div class="allmoneyname" style="margin-right: 10%">合计</div>
                  <div class="allmoneynum" style="width: 10%;border-left: 1px solid; border-right: 1px solid;height: 40px;display: flex;align-items: center;justify-content: center;">${this.personalForm.allMoney}</div>
                  </div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 20px">
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">审核：</div>
                        <div class="bottomname" >${handleperson}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">部门：</div>
                        <div class="bottomname">${this.personalForm.stockDeptName}</div>
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
      } else {
        const printres = await getPrintCount(param)
        if (printres.data.ret === 200) {
          const res2 = printres.data.data.content
          if (res2 !== null && res2.printCount > 0) {
            this.$message.error('打印次数已经消耗完')
            return false
          }
        }
        this.$confirm('该单据只能打印一次，是否确认打印？（此操作为不可逆操作）', 'Warning', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            param.opreaterId = this.$store.getters.userId
            // 加await
            addPrint(param).then(res => {
              if (res.data.ret === 200) {
                const res = res.data.data.content
                console.log('res', res)
              }
            })
            printJS({
              printable: arr,
              type: 'json',
              properties: [
                { field: 'step', displayName: '行号', columnSize: `100px` },
                { field: 'productCode', displayName: '物料代码', columnSize: `100px` },
                { field: 'productName', displayName: '物料名称', columnSize: `100px` },
                { field: 'productType', displayName: '规格型号', columnSize: `100px` },
                { field: 'unit', displayName: '单位', columnSize: `100px` },
                { field: 'planQuantity', displayName: '计划数量', columnSize: `100px` },
                { field: 'orderQuantity', displayName: '已购数量', columnSize: `100px` },
                { field: 'basicPrice', displayName: '单价', columnSize: `100px` },
                { field: 'planMoney', displayName: '计划金额', columnSize: `100px` },
                { field: 'planDeliveryDate', displayName: '计划交货日期', columnSize: `100px` },
                { field: 'sourceNumber', displayName: '源单编号', columnSize: `100px` },
                { field: 'remarks', displayName: '备注', columnSize: `100px` }
              ],
              header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏嗯哇科技有限公司 </div>
                      <br>
                      <div class="ordername">采购计划</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">采购类别：</div>
                        <div class="itemcontent">${this.personalForm.stockTypeName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">计划日期：</div>
                        <div class="itemcontent">${this.personalForm.planDate}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">编号：</div>
                        <div class="itemcontent">${this.personalForm.planNumber}</div>
                          </div>
                          </div>
                        </div>`,
              bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 99%;height: 40px;align-items: center;border:1px solid;border-top: none;padding-right: 1%">
                  <div class="allmoneyname" style="margin-right: 10%">合计</div>
                  <div class="allmoneynum" style="width: 10%;border-left: 1px solid; border-right: 1px solid;height: 40px;display: flex;align-items: center;justify-content: center;">${this.personalForm.allMoney}</div>
                  </div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 20px">
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">审核：</div>
                        <div class="bottomname" >${handleperson}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">部门：</div>
                        <div class="bottomname">${this.personalForm.stockDeptName}</div>
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
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '确认取消'
                : '停留在当前页面'
            })
          })
      }
      // 点击取消后执行的操作
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
  .print3 {
    width:50px;
  }
  @media print {
    .print {
      display: none;
    }
    .print2 {
      display: block !important;
    }
    /*.print3 {*/
    /*  width:50px !important;*/
    /*}*/
  }
</style>
