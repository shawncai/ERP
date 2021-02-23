<template>
  <el-dialog
    :visible.sync="editVisible"
    :detailcontrol="detailcontrol"
    :detaildata="detaildata"
    :detailid="detailid"
    :close-on-press-escape="false"
    :title="personalForm.code + $t('updates.xqxx') + '     ' + personalForm.productName"
    append-to-body
    width="1010px"
    class="edit"
    top="-10px"
    @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card" style="margin-top: 63px" shadow="never">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
        <div class="container" style="margin-top: 37px">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('Product.productname')" style="width: 100%;">
                  {{ personalForm.productName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.categoryid')" style="width: 100%;">
                  {{ personalForm.category }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.barcode')" style="width: 100%;">
                  {{ personalForm.barCode }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.numberId')" style="width: 100%;">
                  {{ personalForm.numberId }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.typeid')" style="width: 100%;">
                  {{ personalForm.productType }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.disposeId')" style="width: 100%;">
                  {{ personalForm.dispose }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.versionId')" style="width: 100%;">
                  {{ personalForm.version }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.color')" style="width: 100%;">
                  {{ personalForm.color }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.diameterId')" style="width: 100%;">
                  {{ personalForm.diameter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.brand')" style="width: 100%;">
                  {{ personalForm.brand }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.level')" style="width: 100%;">
                  {{ personalForm.productLevel }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.lengthLevelId')" style="width: 100%;">
                  {{ personalForm.lengthLevel }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.faceId')" style="width: 100%;">
                  {{ personalForm.face }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.performanceLevelId')" style="width: 100%;">
                  {{ personalForm.performanceLevel }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.purchasemeasurement')" prop="purchasemeasurement" style="width: 100%;">
                  {{ personalForm.purMeasu }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.unitGroupId')" prop="purchasemeasurement" style="width: 100%;">
                  {{ personalForm.unitGroupName }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.caigoumeasurement')" style="width: 100%;">
                  {{ personalForm.caigouMeasu }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.salemeasurement')" style="width: 100%;">
                  {{ personalForm.saleMeasu }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.stockmeasurement')" style="width: 100%;">
                  {{ personalForm.stockMeasu }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.producemeasurement')" style="width: 100%;">
                  {{ personalForm.produceMeasu }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.source')" style="width: 100%;">
                  {{ personalForm.source | sourceFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.kpigrade')" prop="kpigrade" style="width: 100%;">
                  {{ personalForm.kpigrade }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.point')" style="width: 100%;">
                  {{ personalForm.point }}
                </el-form-item>
              </el-col>
              <el-col :span="12" style="height: 58px;">
                <el-form-item :label="$t('Product.zhibaoqi')" style="width: 100%">
                  {{ personalForm.zhiBaoQi }}天
                </el-form-item>
              </el-col>
              <el-col :span="12" style="height: 58px;">
                <el-form-item :label="$t('Product.weight')" style="width: 100%">
                  {{ personalForm.weight }}KG
                </el-form-item>
              </el-col>
              <el-col :span="12" style="height: 58px;">
                <el-form-item :label="$t('Product.volume')" style="width: 100%">
                  {{ personalForm.volume }}m³
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.stockCircle')" style="width: 100%;">
                  {{ personalForm.stockCircle }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.produceAbility')" style="width: 100%;">
                  {{ personalForm.produceAbility }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.careCircle')" style="width: 100%;">
                  {{ personalForm.careCircle }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.workCenterId')" style="width: 100%;">
                  {{ personalForm.workCenter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.effectiveDay')" prop="effectiveDay" style="width: 100%;">
                  {{ personalForm.effectiveDay }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.isBatch')" prop="isBatch" style="width: 100%;">
                  {{ personalForm.isBatch | isBatchFilter }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Product.isactive')" style="width: 100%;">
                  {{ personalForm.isActive | isactiveFilter }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="lianxi" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">价格信息</h2>
        <div class="container">
          <el-form ref="personalForm2" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-col :span="12">
              <el-form-item :label="$t('Product.valuation')" prop="valuation" style="width: 100%;">
                {{ personalForm.valuation | valuationFilter }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.costprice')" prop="costprice" style="width: 100%;">
                {{ personalForm.costPrice }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.tradeprice')" style="width: 100%;">
                {{ personalForm.tradePrice }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockAlarm.salePrice')" prop="saleprice" style="width: 100%;">
                {{ personalForm.salePrice }}
              </el-form-item>
            </el-col>
            <!--<el-form-item :label="$t('Product.purchaseprice')" prop="purchaseprice" style="width: 40%;margin-top:1%">-->
            <!--<el-input v-model="personalForm.purchaseprice" placeholder="请输入采购价" clearable/>-->
            <!--</el-form-item>-->
            <el-col :span="12">
              <el-form-item :label="$t('Product.lowerprice')" style="width: 100%;">
                {{ personalForm.lowerPrice }}
              </el-form-item>
            </el-col>
            <el-col v-permission="['1-31-33-115']" :span="12">
              <el-form-item :label="$t('collectAndPayDetail.cbj')" style="width: 100%;">
                {{ personalForm.memberPrice }}
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="lianxi" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">图片信息</h2>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px" shadow="never">
        <div class="container" style="margin-top: 10px">
          <el-tabs type="card">
            <el-tab-pane label="库存信息">
              <el-row :gutter="20">
                <el-form ref="getVisitlistdata" :model="getVisitlistdata">
                  <el-col :span="5">
                    <el-form-item>
                      <el-input v-model="repositoryId" placeholder="仓库名称" @focus="handlechooseRep"/>
                    </el-form-item>
                    <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" style="margin-left: 200px" @click="handleFilter">{{ $t('public.search') }}</el-button>
                  </el-col>
                </el-form>
              </el-row>
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  :label="$t('updates.ckmc')"
                  prop="repositoryName"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  prop="downStock"
                  align="center"
                  label="最低库存量"
                  min-width="150"/>
                <el-table-column
                  prop="upStock"
                  align="center"
                  label="最高库存量"
                  min-width="150"/>
                <el-table-column
                  prop="safeStock"
                  align="center"
                  label="安全库存量"
                  min-width="150"/>
                <el-table-column
                  prop="exsitStock"
                  align="center"
                  label="现有库存量"
                  min-width="150"/>
                <el-table-column
                  prop="onStock"
                  align="center"
                  label="在途量"
                  min-width="150"/>
              </el-table>
              <pagination v-show="total>0" :total="total" :page.sync="getVisitlistdata.pagenum" :limit.sync="getVisitlistdata.pagesize" @pagination="getVisitlist" />
            </el-tab-pane>
            <el-tab-pane label="采购退货信息">
              <el-row :gutter="20">
                <el-form ref="getstocklist" :model="getstocklist">
                  <el-col :span="5">
                    <el-form-item>
                      <el-input v-model="repositoryId2" placeholder="仓库" @focus="handlechooseRep2"/>
                    </el-form-item>
                    <my-repository :repositorycontrol.sync="repositorycontrol2" @repositoryname="repositoryname2"/>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item>
                      <el-input v-model="supplierId" placeholder="供应商姓名" @focus="handlechoose"/>
                      <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-date-picker
                      v-model="date"
                      type="daterange"
                      range-separator="-"
                      unlink-panels
                      start-placeholder="采购退货开始日期"
                      end-placeholder="采购退货结束日期"
                      value-format="yyyy-MM-dd"/>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" style="margin-left: 200px" @click="handleFilter2">{{ $t('public.search') }}</el-button>
                  </el-col>
                </el-form>
              </el-row>
              <el-table
                :data="tableData2"
                border
                style="width: 100%">
                <el-table-column
                  :label="$t('updates.gysmc')"
                  prop="supplierName"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.thsl')"
                  prop="retreatQuantity"
                  align="center"
                  min-width="150"/>
              </el-table>
              <pagination v-show="total2>0" :total="total2" :page.sync="getstocklist.pagenum" :limit.sync="getstocklist.pagesize" @pagination="getstoctlist" />
            </el-tab-pane>
            <el-tab-pane label="销售退货信息">
              <el-row :gutter="20">
                <el-form ref="getsalereturn" :model="getsalereturn">
                  <el-col :span="5">
                    <el-form-item>
                      <el-input v-model="repositoryId3" placeholder="仓库" @focus="handlechooseRep3"/>
                    </el-form-item>
                    <my-repository :repositorycontrol.sync="repositorycontrol3" @repositoryname="repositoryname3"/>
                  </el-col>
                  <el-col :span="5">
                    <el-date-picker
                      v-model="date2"
                      type="daterange"
                      range-separator="-"
                      unlink-panels
                      start-placeholder="回访开始日期"
                      end-placeholder="回访结束日期"
                      value-format="yyyy-MM-dd"/>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="primary" style="margin-left: 200px" @click="handleFilter3">{{ $t('public.search') }}</el-button>
                  </el-col>
                </el-form>
              </el-row>
              <el-table
                :data="tableData3"
                border
                style="width: 100%">
                <el-table-column
                  :label="$t('updates.khxmi')"
                  prop="customerName"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.wpbm')"
                  prop="productCode"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('Hmodule.wpmc')"
                  prop="productName"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('Hmodule.dw')"
                  prop="unit"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.shuli')"
                  prop="quantity"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.thyy')"
                  prop="returnReason"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  prop="repositoryName"
                  align="center"
                  label="退货仓库"
                  min-width="150"/>
                <el-table-column
                  :label="$t('updates.stat')"
                  prop="stat"
                  align="center"
                  min-width="150"/>
              </el-table>
              <pagination v-show="total3>0" :total="total3" :page.sync="getsalereturn.pagenum" :limit.sync="getsalereturn.pagesize" @pagination="getsalereturnList" />
            </el-tab-pane>
            <el-tab-pane :label="$t('updates.cgxx')">
              <el-table
                :data="tableData4"
                border
                style="width: 100%">
                <el-table-column
                  :label="$t('updates.gysmc')"
                  prop="supplierName"
                  align="center"
                  min-width="150"/>
                <el-table-column
                  prop="maxPrice"
                  align="center"
                  label="最高单价"
                  min-width="150"/>
                <el-table-column
                  prop="minPrice"
                  align="center"
                  label="最低单价"
                  min-width="150"/>
                <el-table-column
                  prop="stockTimes"
                  align="center"
                  label="采购次数"
                  min-width="150"/>
                <el-table-column
                  prop="retreatTimes"
                  align="center"
                  label="退货次数"
                  min-width="150"/>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
import { productInventory, productStockRetreat, productSaleReturn, productStockInfo } from '@/api/Product'
import checkPermission from '@/utils/permission' // 权限判断函数
import permission from '@/directive/permission/index.js' // 权限判断指令
import Pagination from '@/components/Pagination'
import MyRepository from './MyRepository'
import MySupplier from '../../StockPlan/components/MySupplier' // Secondary package based on el-pagination
var _that
export default {
  directives: { permission },
  components: { MySupplier, MyRepository, Pagination },
  filters: {
    sourceFilter(status) {
      const statusMap = {
        2: '生产',
        3: '采购',
        4: '外加工'
      }
      return statusMap[status]
    },
    isBatchFilter(status) {
      const statusMap = {
        1: '使用',
        2: '不使用'
      }
      return statusMap[status]
    },
    isactiveFilter(status) {
      const statusMap = {
        1: 'YES',
        2: 'NO'
      }
      return statusMap[status]
    },
    valuationFilter(status) {
      const statusMap = {
        1: '约当产量法',
        2: '定额成本法',
        3: '定额比例法'
      }
      return statusMap[status]
    },
    statFilter(status) {
      const statusMap = {
        1: '配送申请',
        2: '配送出库',
        3: '配送完成',
        4: '回车'
      }
      return statusMap[status]
    },
    requireTypeFilter(status) {
      const statusMap = {
        1: '客户',
        2: '经销商',
        3: '门店'
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
    },
    detailid: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      // 采购信息
      tableData4: [],
      // 采购发送数据
      getstockinfodata: {
        productId: this.detailid
      },
      // 销售退货时间段
      date2: [],
      // 销售退货仓库回显
      repositoryId3: '',
      // 控制销售退货仓库
      repositorycontrol3: false,
      // 供应商回显
      supplierId: '',
      // 控制供应商
      empcontrol: false,
      // 采购退货仓库回显
      repositoryId2: '',
      // 控制采购退货仓库
      repositorycontrol2: false,
      // 控制仓库
      repositorycontrol: false,
      // 回显仓库
      repositoryId: '',
      // 回访日期段
      date: [],
      // 销售退货分页和数据
      tableData3: [],
      total3: 0,
      // 采购退货分页和数据
      tableData2: [],
      total2: 0,
      // 库存分页和数据
      total: 0,
      tableData: [],
      // 维修信息
      repearData: {},
      // 合同信息
      contracts: {},
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
      // 采购退货信息
      getstocklist: {
        pagenum: 1,
        pagesize: 10,
        productId: this.detailid
      },
      // 销售退货信息
      getsalereturn: {
        pagenum: 1,
        pagesize: 10,
        productId: this.detailid
      },
      // 库存信息
      getVisitlistdata: {
        pagenum: 1,
        pagesize: 10,
        productId: this.detailid
      }
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      console.log('this.personalForm', this.personalForm)
    },
    detailid() {
      this.getVisitlistdata.productId = this.detailid
      this.getstocklist.productId = this.detailid
      this.getsalereturn.productId = this.detailid
      this.getstockinfodata.productId = this.detailid
      this.getVisitlist()
      this.getstoctlist()
      this.getsalereturnList()
      this.getstockinfo()
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    checkPermission,
    // 采购信息详情
    getstockinfo() {
      productStockInfo(this.getstockinfodata).then(res => {
        if (res.data.ret === 200) {
          this.tableData4 = res.data.data.content
        }
      })
    },
    restfom3() {
      this.getsalereturn.repositoryId = ''
      this.repositoryId3 = ''
    },
    //  销售退货搜索
    handleFilter3() {
      if (this.date2 === '' || this.date2 === null || this.date2 === undefined) {
        this.getsalereturn.beginTime = ''
        this.getsalereturn.endTime = ''
      } else {
        this.getsalereturn.beginTime = this.date2[0]
        this.getsalereturn.endTime = this.date2[1]
      }
      this.getsalereturn.pagenum = 1
      productSaleReturn(this.getsalereturn).then(res => {
        if (res.data.ret === 200) {
          this.tableData3 = res.data.data.content.list
          this.total3 = res.data.data.content.totalCount
          this.restfom3()
        }
      })
    },
    // 销售退货仓库列表focus事件触发
    handlechooseRep3() {
      this.repositorycontrol3 = true
    },
    repositoryname3(val) {
      this.repositoryId3 = val.repositoryName
      this.getsalereturn.repositoryId = val.id
    },
    // 销售退货分页
    getsalereturnList() {
      productSaleReturn(this.getsalereturn).then(res => {
        if (res.data.ret === 200) {
          this.tableData3 = res.data.data.content.list
          this.total3 = res.data.data.content.totalCount
        }
      })
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      this.repositoryId = val.repositoryName
      this.getVisitlistdata.repositoryId = val.id
    },
    restfom() {
      this.getVisitlistdata.repositoryId = ''
      this.repositoryId = ''
    },
    // 库存搜索
    handleFilter() {
      this.getVisitlistdata.pagenum = 1
      productInventory(this.getVisitlistdata).then(res => {
        if (res.data.ret === 200) {
          this.tableData = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.restfom()
        }
      })
    },
    // 库存分页
    getVisitlist() {
      productInventory(this.getVisitlistdata).then(res => {
        if (res.data.ret === 200) {
          this.tableData = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
      })
    },
    //  采购退货搜索
    handleFilter2() {
      if (this.date === '' || this.date === null || this.date === undefined) {
        this.getstocklist.beginTime = ''
        this.getstocklist.endTime = ''
      } else {
        this.getstocklist.beginTime = this.date[0]
        this.getstocklist.endTime = this.date[1]
      }
      this.getstocklist.pagenum = 1
      productStockRetreat(this.getstocklist).then(res => {
        if (res.data.ret === 200) {
          this.tableData2 = res.data.data.content.list
          this.total2 = res.data.data.content.totalCount
          this.restfom2()
        }
      })
    },
    restfom2() {
      this.getstocklist.repositoryId = ''
      this.repositoryId2 = ''
      this.supplierId = ''
      this.getstocklist.supplierId = ''
    },
    // 采购退货仓库列表focus事件触发
    handlechooseRep2() {
      this.repositorycontrol2 = true
    },
    repositoryname2(val) {
      this.repositoryId2 = val.repositoryName
      this.getstocklist.repositoryId = val.id
    },
    // 供应商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供应商列表返回数据
    supplierName(val) {
      console.log(val)
      this.supplierId = val.supplierName
      this.getstocklist.supplierId = val.id
    },
    // 采购退货分页
    getstoctlist() {
      productStockRetreat(this.getstocklist).then(res => {
        if (res.data.ret === 200) {
          this.tableData2 = res.data.data.content.list
          this.total2 = res.data.data.content.totalCount
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
  .edit >>> .el-tabs--card>.el-tabs__header{
    border: none;
  }
  .edit >>> .el-tabs--card>.el-tabs__header .el-tabs__item{
    border: 1px solid #e4e7ed;
  }
  .edit >>> .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: none;
  }
  .edit >>> .el-tabs--card>.el-tabs__header .el-tabs__item:first-child{
    margin-right: 10px;
  }
  .edit>>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2){
    margin-right: 10px;
  }
  .edit>>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(3){
    margin-right: 10px;
  }
  .edit>>> .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(4){
    margin-right: 10px;
  }
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
