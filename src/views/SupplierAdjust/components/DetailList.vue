<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.tjdxx')" append-to-body width="1010px" class="edit" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button style="font-size: 10px;" @click="printdata">{{ $t('updates.print') }}</button>
        <button style="font-size: 10px;margin-left: 10px" @click="handleMyReceipt2()">{{ $t('updates.fzdj') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('updates.djdbh')" class="print2" style="width: 100%;display: none">
                  {{ personalForm.number }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SupplierAdjust.title')" style="width: 100%;">
                  <span>{{ personalForm.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SupplierAdjust.applyPersonId')" prop="sourceType" style="width: 100%;">
                  <span>{{ personalForm.applyPersonName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SupplierAdjust.deptId')" prop="supplierId" style="width: 100%;">
                  <span>{{ personalForm.deptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SupplierAdjust.supplierId')" prop="inquiryPersonId" style="width: 100%;">
                  <span>{{ personalForm.supplierName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('SupplierAdjust.applyDate')" prop="stockTypeId" style="width: 100%;">
                  <span>{{ personalForm.applyDate }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.tzdmx') }}</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="showlist"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            border
            height="600px"
            size="small"
            style="width: 100%"
          >
            <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" />
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" />
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" />
            <el-editable-column :label="$t('updates.cgdyj')" prop="oldPrice" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.cgdxj')" prop="newPrice" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.oldIncludeTaxPrice')" prop="oldIncludeTaxPrice" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.newIncludeTaxPrice')" prop="newIncludeTaxPrice" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.oldTaxRate')" prop="oldTaxRate" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.newTaxRate')" prop="newTaxRate" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.oldSalePrice')" prop="oldSalePrice" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.newSalePrice')" prop="newSalePrice" align="center" min-width="150px"/>
          </el-editable>
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="getemplist.pageNum"
            :page-sizes.sync="pageArr"
            :limit.sync="getemplist.pageSize"
            @pagination="getlist"
          />
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
    </div>
  </el-dialog>
</template>

<script>
import { searchstockArrival } from '@/api/StockArrival'
import { getPrintCount, addPrint } from '@/api/public'
import Pagination from '@/components/Pagination'
import printJS from 'print-js'
var _that
export default {
  components: {

    Pagination

  },
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
        1: _that.$t('updates.cgsq'),
        2: _that.$t('updates.cgjhd'),
        3: _that.$t('updates.cgxjd'),
        4: _that.$t('updates.cght'),
        5: _that.$t('Hmodule.Nosource')
      }
      return statusMap[status]
    },
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
      showlist: [],
      getemplist: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      // 质检信息
      Checkreportdata: [],
      // 到货信息
      arravldata: [],
      stockArrivaldata: {
        pageNum: 1,
        pageSize: 9999,
        repositoryId: 0,
        sourceNumber: this.detaildata.orderNumber
      },
      // 审核数据
      reviewList: [],
      // 详细表数据
      list2: [],
      list3: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 供应商信息数据
      personalForm: this.detaildata,
      pageArr: [10]
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
      if (this.editVisible) {
        window.addEventListener('afterprint', () => {
          console.log('打印完成==========')
        }, true)
        this.getemplist.pageSize = 10
      }
      const parms = {
        page: 1,
        limit: 50
      }
      this.getlist(parms)
    },
    detaildata() {
      this.personalForm = this.detaildata
      this.list2 = this.personalForm.supplierAdjustDetailVos
      this.showlist = this.list2.slice(0, 10)
      this.total = this.personalForm.supplierAdjustDetailVos.length
      this.reviewList = this.personalForm.approvalUseVos
      this.stockArrivaldata.sourceNumber = this.personalForm.orderNumber
      this.getstockArrivalList()
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getlist(val) {
      console.log('val', val)
      console.log('this.list2', this.list2)
      const previndex = (val.page - 1) * val.limit
      const nextindex = val.page * val.limit
      const quanlity = val.limit
      console.log('previndex', previndex)
      console.log('nextindex', nextindex)
      this.showlist = this.list2.slice(previndex, nextindex)
      console.log('showlist', this.showlist)
    },
    test(val) {
      console.log('val', val)
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
      // console.log('this.$ref.editable', this.$refs.editable)

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
      param.receiptTypeId = 80
      // 有权限跳过管理
      const value = ['1-386-82']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      console.log('hasPermission=======', hasPermission)
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
            { field: 'stockQuantity', displayName: '数量', columnSize: `100px` },
            { field: 'includeTaxPrice', displayName: '单价', columnSize: `100px` },
            { field: 'includeTaxMoney', displayName: '金额', columnSize: `100px` },
            { field: 'deliveryDate', displayName: '交货日期', columnSize: `100px` },
            { field: 'remarks', displayName: '备注', columnSize: `100px` }
          ],
          header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏嗯哇科技有限公司 </div>
                      <br>
                      <div class="ordername">采购订单</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">供应商：</div>
                        <div class="itemcontent">${this.personalForm.supplierName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">日期：</div>
                        <div class="itemcontent">${this.personalForm.orderDate}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">编号：</div>
                        <div class="itemcontent">${this.personalForm.orderNumber}</div>
                          </div>
                          </div>
                        </div>`,
          bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 99%;height: 40px;align-items: center;border:1px solid;border-top: none;padding-right: 1%">
                  <div class="allmoneyname" style="margin-right: 10%">合计</div>
                  <div class="allmoneynum" style="width: 10%;border-left: 1px solid; border-right: 1px solid;height: 40px;display: flex;align-items: center;justify-content: center;">${this.personalForm.allIncludeTaxMoney}</div>
                  </div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 20px">
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">审核：</div>
                        <div class="bottomname" >${handleperson}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">部门：</div>
                        <div class="bottomname">${this.personalForm.deptName}</div>
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
                { field: 'stockQuantity', displayName: '数量', columnSize: `100px` },
                { field: 'includeTaxPrice', displayName: '单价', columnSize: `100px` },
                { field: 'includeTaxMoney', displayName: '金额', columnSize: `100px` },
                { field: 'deliveryDate', displayName: '交货日期', columnSize: `100px` },
                { field: 'remarks', displayName: '备注', columnSize: `100px` }
              ],
              header: `<div class="pringtitle">
                    <div class="custom-p"> 江苏嗯哇科技有限公司 </div>
                      <br>
                      <div class="ordername">采购订单</div>
                        <br>
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">供应商：</div>
                        <div class="itemcontent">${this.personalForm.supplierName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">日期：</div>
                        <div class="itemcontent">${this.personalForm.orderDate}</div>
                          </div>
                        <div class="item">
                         <div class="itemname">编号：</div>
                        <div class="itemcontent">${this.personalForm.orderNumber}</div>
                          </div>
                          </div>
                        </div>`,
              bottom: `<div>
                  <div class="allmoney" style="display: flex;justify-content: space-around;width: 99%;height: 40px;align-items: center;border:1px solid;border-top: none;padding-right: 1%">
                  <div class="allmoneyname" style="margin-right: 10%">合计</div>
                  <div class="allmoneynum" style="width: 10%;border-left: 1px solid; border-right: 1px solid;height: 40px;display: flex;align-items: center;justify-content: center;">${this.personalForm.allIncludeTaxMoney}</div>
                  </div>
                  <div class="printbottom" style="display: flex;align-items: center;justify-content: center;width: 100%;margin-top: 20px">
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">审核：</div>
                        <div class="bottomname" >${handleperson}</div>
                    </div>
                    <div class="bottomitem" style="width: 25%;display: flex;align-items: center;justify-content: center;flex-wrap: nowrap">
                        <div class="ceshi">部门：</div>
                        <div class="bottomname">${this.personalForm.deptName}</div>
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
    },
    handleMyReceipt2() {
      console.log(this.detaildata)
      this.$store.dispatch('getempcontract', this.detaildata)
      this.$router.push('/SupplierAdjust/AddSupplierAdjust')
    },
    getstockArrivalList() {
      searchstockArrival(this.stockArrivaldata).then(res => {
        if (res.data.ret === 200) {
          this.arravldata = res.data.data.content.list.map(function(item) {
            const needata = item.stockArrivalDetailVos.map(function(elem) {
              return {
                number: item.number,
                productCode: elem.productCode,
                arrivalQuantity: elem.arrivalQuantity,
                arrivalDate: item.arrivalDate,
                acceptPersonName: item.acceptPersonName
              }
            })
            return needata
          }).flat()
        }
      })
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
