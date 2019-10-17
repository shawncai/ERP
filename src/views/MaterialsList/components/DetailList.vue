<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" append-to-body width="1010px" class="edit" top="-10px" title="查看物料清单" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: 63px;">基本信息</h2>
        <button class="print" style="font-size: 13px;background: white;" @click="printdata">打印</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="物料清单编号" style="width: 100%;display: none">
                  {{ personalForm.bomNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('MaterialsList.bomNumber')" prop="bomNumber" style="width: 100%;">
                  {{ personalForm.bomNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('MaterialsList.bomTypeId')" prop="bomTypeId" style="width: 100%;">
                  {{ personalForm.bomType | bomTypeFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('MaterialsList.isActive')" prop="isActive" style="width: 100%;">
                  {{ personalForm.bomType | isActiveFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('MaterialsList.version')" style="width: 100%;">
                  {{ personalForm.version | versionFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('MaterialsList.summary')" style="width: 100%;">
                  {{ personalForm.summary }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--父件信息-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="geren" class="form-name">父件信息</h2>
        <div class="container">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('MaterialsList.code')" prop="productCode" style="width: 100%;">
                  {{ personalForm.productCode }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('MaterialsList.productName')" prop="productName" style="width: 100%;">
                  {{ personalForm.productName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('MaterialsList.unit')" prop="unit" style="width: 100%;">
                  {{ personalForm.unit }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('MaterialsList.productTypeId')" prop="productTypeId" style="width: 100%;">
                  {{ personalForm.productType }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('MaterialsList.color')" prop="productTypeId" style="width: 100%;">
                  {{ personalForm.color }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--入库单明细-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">子件信息</h2>
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
            <el-editable-column label="序号" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" fixed="left" align="center" label="子件" min-width="150px"/>
            <el-editable-column prop="productName" fixed="left" align="center" label="子件名称" min-width="150px"/>
            <el-editable-column prop="productType" align="center" label="规格" min-width="150px"/>
            <el-editable-column prop="color" align="center" label="颜色" min-width="150px"/>
            <el-editable-column prop="productCategory" align="center" label="子件类型" min-width="150px"/>
            <el-editable-column prop="unit" align="center" label="单位" min-width="150px"/>
            <el-editable-column prop="quantity" align="center" label="定额" min-width="150px"/>
            <el-editable-column prop="lossRate" align="center" label="损耗率" min-width="150px"/>
            <el-editable-column prop="isKey" align="center" label="是否关键件" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--审核状态-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">审批记录</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="reviewList"
            border
            style="width: 100%">
            <el-table-column
              prop="step"
              align="center"
              label="当前步骤"
              min-width="150"/>
            <el-table-column
              prop="stepHandlerName"
              align="center"
              label="当前审批人"
              min-width="150"/>
            <el-table-column
              prop="handleTime"
              align="center"
              label="审批时间"
              min-width="150"/>
            <el-table-column
              prop="stat"
              align="center"
              label="审批意见"
              min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | statfilter }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
import printJS from 'print-js'
export default {
  filters: {
    versionFilter(status) {
      const statusMap = {
        1: '版本1'
      }
      return statusMap[status]
    },
    isActiveFilter(status) {
      const statusMap = {
        1: '启用',
        2: '未启用'
      }
      return statusMap[status]
    },
    bomTypeFilter(status) {
      const statusMap = {
        1: '工艺BOM',
        2: '设计BOM',
        3: '制造BOM'
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
      list2: [],
      // 审核步骤数据
      reviewList: [],
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
      this.list2 = this.personalForm.materialsListDetailVos
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
      // const handleperson = this.reviewList[this.reviewList.length - 1].stepHandlerName
      // console.log(handleperson)
      printJS({
        printable: arr,
        type: 'json',
        properties: [
          { field: 'step', displayName: '行号', columnSize: `100px` },
          { field: 'productCode', displayName: '子件', columnSize: `100px` },
          { field: 'productName', displayName: '子件名称', columnSize: `100px` },
          { field: 'productType', displayName: '规格', columnSize: `100px` },
          { field: 'unit', displayName: '单位', columnSize: `100px` },
          { field: 'productCategory', displayName: '子件类型', columnSize: `100px` }
        ],
        header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏新世窗国际贸易有限公司 </div>
                      <br>
                      <div class="ordername">查看物料清单</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">bom编码：</div>
                        <div class="itemcontent">${this.personalForm.bomNumber}</div>
                        </div>
                        <div class="item">
                        <div class="itemname">父件：</div>
                        <div class="itemcontent">${this.personalForm.productName}</div>
                        </div>
                        </div>
                        </div>`,
        bottom: `<div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 20px">
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">审核：</div>
                        <div class="bottomname" >${''}</div>
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
    // 修改操作结束 -------------------------------------------------
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
  @media print {
    .print {
      display: none;
    }
    .print2 {
      display: block !important;
    }
  }
</style>
