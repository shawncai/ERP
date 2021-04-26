<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="$t('updates.ckwlqd')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: 63px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <el-button v-if="personalForm.judgeStat !== 0 || personalForm.judgeStat !== 3" class="print" style="font-size: 13px;background: white;" @click="printdata">{{ $t('updates.print') }}</el-button>
        <el-button v-if="personalForm.judgeStat !== 0 || personalForm.judgeStat !== 3" class="print" style="font-size: 13px;background: white;" @click="handleExport">{{ $t('public.export') }}</el-button>
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
                  {{ personalForm.versionName }}
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
        <h2 ref="geren" class="form-name">{{ $t('updates.fjxx') }}</h2>
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
        <h2 ref="fuzhu" class="form-name">{{ $t('updates.zjxx') }}</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('updates.zj')" prop="productCode" fixed="left" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.zjmc')" prop="productName" fixed="left" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.zjlx')" prop="productCategory" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.de')" prop="quantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.shl')" prop="lossRate" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.sfgjj')" prop="isKey" align="center" min-width="150px">
              <template slot-scope="scope">
                <span>{{ scope.row.isKey | keyfilter }}</span>
              </template>
            </el-editable-column>
          </el-editable>
        </div>
      </el-card>
      <!--审核状态-->
      <el-card class="box-card" style="margin-top: 15px">
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
    </div>
  </el-dialog>
</template>

<script>
import printJS from 'print-js'

var _that
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
        3: '制造BOM',
        4: '采购BOM',
        5: '销售BOM'
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
    keyfilter(status) {
      const statusMap = {
        1: '是',
        2: '不是'
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
  beforeCreate() {
    _that = this
  },
  methods: {
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    handleExport() {
      const arr = this.cutnull(this.list2)
      console.log('arr', arr)
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['子件', '子件名称', '规格', '颜色', '单位', '数量']
        const filterVal = ['productCode', 'productName', 'productType', 'color', 'unit', 'quantity']
        const data = this.formatJson(filterVal, arr)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '父件为' + this.personalForm.color + this.personalForm.productName + '物料清单表'
        })
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
          { field: 'color', displayName: '颜色', columnSize: `100px` },
          { field: 'productCategory', displayName: '子件类型', columnSize: `100px` }
        ],
        header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏嗯哇科技有限公司 </div>
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
                        <div class="item">
                        <div class="itemname">父件颜色：</div>
                        <div class="itemcontent">${this.personalForm.color}</div>
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
