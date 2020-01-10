<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <!-- <button v-print="'#salecontract'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button> -->
        <!-- <router-link target="_blank" to="/SaleContract/download"> -->
        <el-button type="primary" @click="setdata">
          {{ $t('updates.print') }}
        </el-button>
        <el-dialog :visible.sync="categoryVisible" :title="$t('otherlanguage.xzgs')" append-to-body class="normal" width="600px" center>
          <el-form class="demo-ruleForm" style="margin: 0 auto; width: 400px">
            <el-form-item :label="$t('otherlanguage.xzgs')" label-width="100px" prop="type">
              <el-select v-model="selectcompany" style="width: 100%" filterable clearable >
                <el-option value="1" label="NWOW MARKETING"/>
                <el-option value="2" label="TAILG MARKETING"/>
                <el-option value="3" label="YADEA MARKETING"/>
                <el-option value="4" label="RH MARKETING"/>
                <el-option value="5" label="MARKETINGERVP MARKETING"/>
                <el-option value="6" label="EHERO MARKETING"/>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleprint()">{{ $t('Hmodule.sure') }}</el-button>
            <el-button type="danger" @click="closetag()">{{ $t('Hmodule.cancel') }}</el-button>
          </span>
        </el-dialog>
        <!-- </router-link> -->
        <!-- <div v-if="false" id="salecontract" v-html="conetentdatazz"/> -->
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="销售合同编号" style="width: 100%;display: none">
                  {{ personalForm.number }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.title')" prop="title" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.sourceType')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.sourceType | sourceTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.sourceNumber')" style="width: 100%;">
                  <span>{{ personalForm.sourceNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.customerType')" style="width: 100%;">
                  <span>{{ personalForm.customerType | customerTypeFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.customerName')" style="width: 100%;">
                  <span>{{ personalForm.customerName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.customerPhone')" style="width: 100%;">
                  <span>{{ personalForm.customerPhone }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.saleType')" style="width: 100%;">
                  <span>{{ personalForm.saleTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.closeType')" style="width: 100%;">
                  <span>{{ personalForm.closeTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.payType')" style="width: 100%;">
                  <span>{{ personalForm.payTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.deliveryMode')" style="width: 100%;">
                  <span>{{ personalForm.deliveryModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.currency')" prop="currency" style="width: 100%;">
                  <span>{{ personalForm.currency | currencyFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.salePersonId')" style="width: 100%;">
                  <span>{{ personalForm.salePersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.deptId')" style="width: 100%;">
                  <span>{{ personalForm.deptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.saleRepositoryId')" style="width: 100%;">
                  <span>{{ personalForm.saleRepositoryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.signDate')" style="width: 100%;">
                  <span>{{ personalForm.signDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.signAddress')" style="width: 100%;">
                  <span>{{ personalForm.signAddress }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.contractStat')" style="width: 100%;">
                  <span>{{ personalForm.contractStat | contractStatFilter }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.invoiceType')" style="width: 100%;">
                  <span>{{ personalForm.invoiceType }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.installmentCount')" style="width: 100%;">
                  <span>{{ personalForm.installmentCount }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.dayOfMonth')" style="width: 100%;">
                  <span>{{ personalForm.dayOfMonth }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.installmentBegintime')" style="width: 100%;">
                  <span>{{ personalForm.installmentBegintime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.installmentEndtime')" style="width: 100%;">
                  <span>{{ personalForm.installmentEndtime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.notaryPerson')" style="width: 100%;">
                  <span>{{ personalForm.notaryPerson }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.notaryDate')" style="width: 100%;">
                  <span>{{ formatTime(personalForm.notaryDate, 'Y-M-D') }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.firstMoney')" style="width: 100%;">
                  <span>{{ personalForm.firstMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.installmentAllMoney')" style="width: 100%;">
                  <span>{{ personalForm.installmentAllMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SaleContract.eachMoney')" style="width: 100%;">
                  <span>{{ personalForm.eachMoney }}</span>
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
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">销售合同明细</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="medium"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" />
            <el-editable-column :label="$t('updates.wpfl')" prop="productCategoryName" align="center" />
            <el-editable-column :label="$t('updates.ggxh')" prop="productTypeName" align="center" />
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" />
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" />
            <el-editable-column :label="$t('updates.jxf')" prop="performanceScore" align="center" />
            <el-editable-column :label="$t('updates.spjf')" prop="productScore" align="center" />
            <el-editable-column :label="$t('updates.ddsl')" prop="quantity" align="center" />
            <el-editable-column :label="$t('updates.lsj')" prop="salePrice" align="center" />
            <!--          <el-editable-column prop="costPrice" align="center" :label="$t('updates.cbj')" />-->
            <el-editable-column :label="$t('updates.hsj')" prop="taxprice" align="center" />
            <!--          <el-editable-column prop="costMoney" align="center" label="成本金额" />-->
            <el-editable-column :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" />
            <el-editable-column :label="$t('updates.sl')" prop="taxRate" align="center" />
            <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" />
            <el-editable-column :label="$t('Hmodule.je')" prop="money" align="center" />
            <!--          <el-editable-column prop="includeTaxCostMoney" align="center" :label="$t('updates.hscbje')" />-->
            <el-editable-column :label="$t('updates.ckl')" prop="discount" align="center" />
            <el-editable-column :label="$t('updates.cke')" prop="discountMoney" align="center" />
            <el-editable-column :label="$t('updates.cjbm')" prop="carCode" align="center" />
            <el-editable-column :label="$t('updates.djbm')" prop="motorCode" align="center" />
            <el-editable-column :label="$t('updates.dcbm')" prop="batteryCode" align="center" />
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
              align="center"/>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="销售数量合计" style="width: 100%;">
                  <span>{{ personalForm.allQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('updates.hehj')" style="width: 100%;">
                  <span>{{ personalForm.allMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('updates.sehj')" style="width: 100%;">
                  <span>{{ personalForm.allTaxMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('updates.hsjehj')" style="width: 100%;">
                  <span>{{ personalForm.allIncludeTaxMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('updates.zdzkjehj')" style="width: 100%;">
                  <span>{{ personalForm.allDiscountMoney }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('updates.zhhsjehj')" style="width: 100%;">
                  <span>{{ personalForm.allIncludeTaxDiscountMoney }}</span>
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
import printJS from 'print-js'
// import datazzz from '@/utils/salecontract'
var _that
export default {
  filters: {
    customerTypeFilter(status) {
      const statusMap = {
        1: '经销商',
        2: '客户'
      }
      return statusMap[status]
    },
    contractStatFilter(status) {
      const statusMap = {
        1: '制单中',
        2: '执行中',
        3: '完成'
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
        1: '现金',
        2: '分期'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.xsjh'),
        2: _that.$t('updates.fqsq'),
        3: _that.$t('updates.wly')
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
      selectcompany: '',
      respositoryarr: [],
      categoryVisible: false,
      contractparms: {

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
      this.list2 = this.personalForm.saleContractDetailVos
      for (const i in this.list2) {
        if (this.list2[i].discount <= 1) {
          this.list2[i].discount = this.list2[i].discount * 100
        }
        if (this.list2[i].taxRate <= 1) {
          this.list2[i].taxRate = this.list2[i].taxRate * 100
        }
      }
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
    handleprint() {
      this.categoryVisible = false
      localStorage.setItem('selectcompany', this.selectcompany)
      // console.log('this.selectcompany', this.selectcompany)
      const routeUrl = this.$router.resolve({
        path: '/SaleContract/download'
      })
      window.open(routeUrl.href, '_blank')
    },
    closetag() {
      this.categoryVisible = false
    },
    setdata() {
      this.categoryVisible = true
      // console.log(this.$store.getters.printdata)
      // const routeUrl = this.$router.resolve({
      //   path: '/SaleContract/download'
      // })
      // window.open(routeUrl.href, '_blank')
    },
    // 格式化日期，如月、日、时、分、秒保证为2位数
    formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    // 参数number为毫秒时间戳，format为需要转换成的日期格式
    formatTime(number, format) {
      const time = new Date(number)
      const newArr = []
      const formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
      newArr.push(time.getFullYear())
      newArr.push(this.formatNumber(time.getMonth() + 1))
      newArr.push(this.formatNumber(time.getDate()))
      newArr.push(this.formatNumber(time.getHours()))
      newArr.push(this.formatNumber(time.getMinutes()))
      newArr.push(this.formatNumber(time.getSeconds()))

      for (const i in newArr) {
        format = format.replace(formatArr[i], newArr[i])
      }
      return format
    },
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
      // const arr = this.cutnull(this.list2)
      // for (const i in arr) {
      //   arr[i].step = Number(i) + 1
      // }
      // const handleperson = this.reviewList.map(item => {
      //   if (item.actualStepHandler) {
      //     return item.stepHandlerName
      //   }
      // }).join(',')
      // console.log(handleperson)
      // printJS({
      //   printable: 'salecontract',
      //   type: 'html',
      //   header: datazzz.content,
      //   bottomStyle: '.printbottom: { display: flex;margin-top: 20px}',
      //   style: '.custom-p {font-size:20px;text-align: center; }' +
      //     ' .ordername {text-align: center; font-size:25px;letter-spacing:15px}' +
      //     '.pringtitle { line-height: 20px; margin-bottom: 10px }' +
      //     '.line1 { width: 200px; border: 1px solid #000; margin: 0 auto }' +
      //     '.line2 {width: 200px; border: 2px dashed #000; margin: 3px auto }' +
      //     '.supplier {display: flex;justify-content: center; align-items: center;margin-top: 10px}' +
      //     '.item { width: 33%; justify-content: center; align-items: center; display: flex}' +
      //     '.item2 { width: 50%; justify-content: center; align-items: center; display: flex}' +
      //     '.itemname2 { width: 20% }' +
      //     '.itemcontent2 {width: 80%}' +
      //     '.itemname { width: 40% }' +
      //     '.itemcontent {width: 80%}',
      //   gridHeaderStyle: 'font-size:12px; padding:3px; border:1px solid; color: #000; text-align:center;',
      //   gridStyle: 'font-size:12px; padding:3px; border:1px solid; text-align:center; text-overflow:ellipsis; white-space:nowrap;',
      //   repeatTableHeader: true
      // })
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
