<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="number" style="width: 100%;display: none">
                  {{ personalForm.number }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOrder.title')" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOrder.customerName')" prop="customerId" style="width: 100%;">
                  <span>{{ personalForm.customerName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOut.closeType')" style="width: 100%;">
                  <span>{{ personalForm.closeTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('update4.receiptMoney')" style="width: 100%;">
                  <span>{{ personalForm.receiptMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('update4.returnMoney')" style="width: 100%;">
                  <span>{{ personalForm.returnMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('update4.summary')" style="width: 100%;">
                  <span>{{ personalForm.summary }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleOrder.saleRepositoryId')" style="width: 100%;">
                  <span>{{ personalForm.repositoryName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
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
import { getPrintCount, addPrint } from '@/api/public'
import printJS from 'print-js'
import { productlist } from '@/api/public'
import { searchprepReceipt } from '@/api/PrepReceipt'
import { searchsaleOut } from '@/api/SaleOut'
var _that
export default {
  filters: {
    currencyFilter(status) {
      const statusMap = {
        1: 'PHP',
        2: 'USD',
        3: 'RMB',
        4: 'LKR',
        5: 'THB'
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
    payModeFilter(status) {
      const statusMap = {
        1: '货到付款',
        2: '当场支付'
      }
      return statusMap[status]
    },
    invoiceTypeFilter(status) {
      const statusMap = {
        1: '无',
        2: '增值税'
      }
      return statusMap[status]
    },
    customerTypeFliter(status) {
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
      // 出库明细数据
      tableData3: [],
      saleOutparms: {
        pageNum: 1,
        pageSize: 9999,
        sourceNumber: this.detaildata.number,
        repositoryId: 0
      },
      // 预收款记录数据
      tableData2: [],
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
      personalForm: this.detaildata,
      // 预收款记录
      prepReceiptData: {
        pageNum: 1,
        pageSize: 9999,
        sourceNumber: this.detaildata.number,
        repositoryId: 0
      }
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
      this.prepReceiptData.sourceNumber = this.personalForm.number
      // this.getprepReceipt()
      this.saleOutparms.sourceNumber = this.personalForm.number
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleMyReceipt2() {
      console.log(this.detaildata)
      this.$store.dispatch('getempcontract', this.detaildata)
      this.$router.push('/SaleOrder/AddSaleOrder')
      this.editVisible = false
    },
    jundgeprice() {
      if (this.$store.getters.countryId === 2) {
        return true
      }
      const value = ['1-22-24-115']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      return hasPermission
    },
    getsaleOutLis() {
      searchsaleOut(this.saleOutparms).then(res => {
        if (res.data.ret === 200) {
          this.tableData3 = res.data.data.content.list.map(function(item) {
            const needata = item.saleOutDetailVos.map(function(elem) {
              return {
                outDate: item.outDate,
                saleRepositoryName: item.saleRepositoryName,
                quantity: elem.quantity,
                outPersonName: item.outPersonName
              }
            })
            return needata
          }).flat()
        }
      })
    },
    // 预收款记录
    getprepReceipt() {
      searchprepReceipt(this.prepReceiptData).then(res => {
        if (res.data.ret === 200) {
          this.tableData2 = res.data.data.content.list
          console.log('预收款', res)
        }
      })
    },
    // 计划金额
    planMoney(row) {
      row.planMoney = row.basicPrice * row.planQuantity
      return row.planMoney
    },
    // 计算单价和供应商
    basicPrice(row) {
      productlist(row.productCode).then(res => {
        if (res.data.ret === 200) {
          row.basicPrice = res.data.data.content.list[0].purchasePrice
        }
      })
      return row.basicPrice
    },
    // 总计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      this.heji1 = sums[8]
      this.heji2 = sums[7]
      sums[1] = ''
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[6] = ''
      sums[9] = ''
      sums[10] = ''
      sums[11] = ''
      sums[12] = ''
      return sums
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
          return item.stepHandlerName
        }
      }).join(',')
      console.log(handleperson)
      // 先根据权限判断
      // 权限没有再判断次数是否可以打印
      const param = {}
      param.receiptId = this.personalForm.id
      param.receiptTypeId = 29
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
            { field: 'productTypeName', displayName: '规格型号', columnSize: `100px` },
            { field: 'unit', displayName: '单位', columnSize: `100px` },
            { field: 'quantity', displayName: '订单数量', columnSize: `100px` },
            { field: 'deliveryDate', displayName: '需求日期', columnSize: `100px` }
          ],
          header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏嗯哇科技有限公司 </div>
                      <br>
                      <div class="ordername">销售订单列表</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">客户名称：</div>
                        <div class="itemcontent">${this.personalForm.customerName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">送货日期：</div>
                        <div class="itemcontent">${this.personalForm.transDate}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">订单编号：</div>
                        <div class="itemcontent">${this.personalForm.number}</div>
                          </div>
                          </div>
                        </div>`,
          bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 99%;height: 40px;align-items: center;border:1px solid;border-top: none;padding-right: 1%">
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
                        <div class="bottomname">${this.personalForm.salePersonName}</div>
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
                { field: 'productTypeName', displayName: '规格型号', columnSize: `100px` },
                { field: 'unit', displayName: '单位', columnSize: `100px` },
                { field: 'quantity', displayName: '订单数量', columnSize: `100px` },
                { field: 'deliveryDate', displayName: '需求日期', columnSize: `100px` }
              ],
              header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏嗯哇科技有限公司 </div>
                      <br>
                      <div class="ordername">销售订单列表</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">客户名称：</div>
                        <div class="itemcontent">${this.personalForm.customerName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">送货日期：</div>
                        <div class="itemcontent">${this.personalForm.transDate}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">订单编号：</div>
                        <div class="itemcontent">${this.personalForm.number}</div>
                          </div>
                          </div>
                        </div>`,
              bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 99%;height: 40px;align-items: center;border:1px solid;border-top: none;padding-right: 1%">
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
                        <div class="bottomname">${this.personalForm.salePersonName}</div>
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
  @media print {
    .print {
      display: none;
    }
    .print2 {
      display: block !important;
    }
  }
</style>
