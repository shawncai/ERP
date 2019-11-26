<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.id +$t('updates.xqing')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button class="print" style="font-size: 13px;background: white;" @click="printdata">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.starttime')" style="width: 100%;">
                  <span>{{ personalForm.depositBegintime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.endtime')" style="width: 100%;">
                  <span>{{ personalForm.depositEndtime }}</span>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.isSale')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.isSale" style="margin-left: 18px;width: 200px" disabled>
                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.finalBegintime')" style="width: 100%;">
                  <span>{{ personalForm.finalBegintime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.finalEndtime')" style="width: 100%;">
                  <span>{{ personalForm.finalEndtime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.advanceEndtime')" style="width: 100%;">
                  <span>{{ personalForm.advanceEndtime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.advanceMode')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.advanceMode" style="margin-left: 18px;width: 200px" disabled>
                    <el-radio :label="1" style="width: 100px">一口价</el-radio>
                    <el-radio :label="2">阶梯价</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Advancemanage.advanceStat')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.advanceStat" style="margin-left: 18px;width: 200px" disabled>
                    <el-radio :label="1" style="width: 90px">开启</el-radio>
                    <el-radio :label="2">暂不开启</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" >{{ $t('updates.yssp') }}</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            size="medium"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" />
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" />
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" />
            <el-editable-column :label="$t('Hmodule.dj')" prop="salePrice" align="center" />
            <el-editable-column prop="deposit" align="center" label="预售定金" />
          </el-editable>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>
<script>
import printJS from 'print-js'
var _that
export default {
  filters: {
    statfilter(status) {
      const statusMap = {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
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
        1: _that.$t('updates.cgsq'),
        2: _that.$t('updates.cgjhd'),
        3: _that.$t('updates.cgxjd'),
        4: _that.$t('Hmodule.Nosource')
      }
      return statusMap[status]
    },
    currencyFliter(status) {
      const statusMap = {
        1: 'RMB',
        2: 'USD'
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
    invoiceTypeFilter(status) {
      const statusMap = {
        1: '增值税',
        2: '普通'
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
      this.list2 = new Array(this.personalForm)
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
        }
      }
    }
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
      const handleperson = this.reviewList.map(item => {
        if (item.actualStepHandler) {
          return item.stepHandlerName
        }
      }).join(',')
      console.log(handleperson)
      printJS({
        printable: arr,
        type: 'json',
        properties: [
          { field: 'step', displayName: '行号', columnSize: `100px` },
          { field: 'productCode', displayName: '物料代码', columnSize: `100px` },
          { field: 'productName', displayName: '物料名称', columnSize: `100px` },
          { field: 'productType', displayName: '规格型号', columnSize: `100px` },
          { field: 'unit', displayName: '单位', columnSize: `100px` },
          { field: 'salePrice', displayName: '单价', columnSize: `100px` },
          { field: 'deposit', displayName: '预售定金', columnSize: `100px` }
        ],
        header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏新世窗国际贸易有限公司 </div>
                      <br>
                      <div class="ordername">预售商品列表</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">编号：</div>
                        <div class="itemcontent">${this.personalForm.id}</div>
                        </div>
                        </div>
                        </div>`,
        bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 99%;height: 40px;align-items: center;border:1px solid;border-top: none;padding-right: 1%">
                  </div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 20px">
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
