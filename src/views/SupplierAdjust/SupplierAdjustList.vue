/* eslint-disable vue/html-indent */
<template>
  <div class="ERP-container">
    <el-card
      :body-style="{ padding: '5px' }"
      class="box-card"
      style="margin-top: 5px"
      shadow="never"
    >
      <el-input
        v-model="getemplist.title"
        :placeholder="$t('SupplierAdjust.title')"
        size="small"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="getemplist.number"
        :placeholder="$t('updates.bgdbh')"
        size="small"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="applyPersonId"
        :placeholder="$t('SupplierAdjust.applyPersonId')"
        size="small"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @focus="handlechooseStock"
        @clear="restFilter2"
      />
      <my-emp :control.sync="stockControl" @stockName="stockName" />
      <el-input
        v-model="supplierId"
        size="small"
        placeholder="供应商"
        class="filter-item"
        clearable
        @focus="handlechoose"
        @clear="restFilter"
      />
      <my-supplier :control.sync="empcontrol" @supplierName="supplierName" />
      <el-select
        v-model="getemplist.judgeStat"
        :value="getemplist.judgeStat"
        :placeholder="$t('updates.spzt')"
        size="small"
        clearable
        class="filter-item"
      >
        <el-option :label="$t('updates.wsh')" value="0" />
        <el-option :label="$t('updates.shz')" value="1" />
        <el-option :label="$t('updates.shtg')" value="2" />
        <el-option :label="$t('updates.shptg')" value="3" />
      </el-select>
      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        size="small"
        type="primary"
        icon="el-icon-search"
        style="width: 86px; margin-top: 10px"
        round
        @click="handleFilter"
      >{{ $t("public.search") }}</el-button
      >
    </el-card>
    <el-card :body-style="{ padding: '6px' }" class="box-card" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button
          v-waves
          class="filter-item"
          size="small"
          style="margin-left: 0"
          type="primary"
        >
          {{ $t("public.batchoperation") }}
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item
            v-permission="['104-114-2']"
            style="text-align: left"
            command="delete"
          ><svg-icon icon-class="shanchu" style="width: 40px" />{{
            $t("public.delete")
          }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button
        v-permission="['104-114-6']"
        v-waves
        :loading="downloadLoading"
        size="small"
        class="filter-item2"
        style="width: 86px"
        @click="handleExport"
      ><svg-icon icon-class="daochu" />{{ $t("public.export") }}</el-button
      >
      <!-- 打印操作 -->
      <el-button
        v-permission="['104-114-7']"
        v-waves
        size="small"
        class="filter-item2"
        style="width: 86px"
        @click="handleImport"
      ><svg-icon icon-class="daochu" />{{ $t("updates.drsj") }}</el-button
      >
      <!-- <el-button v-permission="['104-114-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button> -->
      <el-dialog
        :visible.sync="dialogVisible"
        title="导入数据"
        class="normal"
        width="600px"
      >
        <upload-excel-component
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!-- 新建操作 -->
      <el-button
        v-permission="['1-22-255-1']"
        v-waves
        size="small"
        class="filter-item2"
        icon="el-icon-plus"
        type="success"
        style="width: 86px"
        @click="handleAdd"
      >{{ $t("public.add") }}</el-button
      >
    </el-card>

    <el-card :body-style="{ padding: '10px' }" class="box-card" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        border
        fit
        size="small"
        highlight-current-row
        style="width: 100%"
        @row-click="clickRow"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          :selectable="selectInit"
          type="selection"
          width="55"
          fixed="left"
          align="center"
        />
        <el-table-column
          :label="$t('public.id')"
          :resizable="false"
          fixed="left"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{
              scope.row.number
            }}</span>
          </template>
          <detail-list
            :detailcontrol.sync="detailvisible"
            :detaildata.sync="personalForm2"
            @rest="refreshlist"
          />
        </el-table-column>
        <el-table-column
          :label="$t('SupplierAdjust.title')"
          :resizable="false"
          fixed="left"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('SupplierAdjust.applyPersonId')"
          :resizable="false"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.applyPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('SupplierAdjust.supplierId')"
          :resizable="false"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('SupplierAdjust.applyDate')"
          :resizable="false"
          align="center"
          min-width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.applyDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('public.actions')"
          :resizable="false"
          align="center"
          min-width="270"
        >
          <template slot-scope="scope">
            <el-button
              v-permission="['1-22-255-3']"
              v-show="scope.row.judgeStat === 0 && scope.row.receiptStat === 1"
              :key="scope.row.id + Math.random()"
              :title="$t('updates.xg')"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row)"
            />

            <el-button
              v-permission="['1-22-255-2']"
              v-show="
                scope.row.judgeStat === 0 &&
                  (scope.row.receiptStat === 1 ||
                  scope.row.receiptStat === 2 ||
                  scope.row.receiptStat === 3)
              "
              :key="scope.row.id + Math.random()"
              :title="$t('updates.sc')"
              scope-row-create-person-id-
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.row)"
            />
            <el-button
              v-permission="['1-22-255-76']"
              v-show="
                isReview4(scope.row) &&
                  (scope.row.receiptStat === 1 || scope.row.receiptStat === 2)
              "
              :title="$t('updates.fsp')"
              type="warning"
              size="mini"
              circle
              @click="handleReview4(scope.row)"
            ><svg-icon
              icon-class="fanhui"
            /></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="getemplist.pageNum"
        :limit.sync="getemplist.pageSize"
        @pagination="getlist"
      />
      <!--修改开始=================================================-->
      <my-dialog
        :editcontrol.sync="editVisible"
        :editdata.sync="personalForm"
        @rest="refreshlist"
      />
      <!--修改结束=================================================-->
      <el-dialog
        :visible.sync="receiptVisible"
        title="采购进程"
        class="normal"
        width="600px"
        center
      >
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;">
            <el-steps :space="200" style="width: 150%" finish-status="success">
              <el-step :status="step4" title="采购订单" />
              <el-step :status="step5" title="采购到货" />
              <el-step :status="step6" title="质检" />
              <el-step :status="step7" title="采购入库" />
              <el-step :status="step8" title="完成" />
            </el-steps>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  SupplierAdjustlist,
  deleteSupplierAdjust,
  updateSupplierAdjust2,
  addSupplierAdjust,
  SupplierAdjustlistGetList
} from '@/api/SupplierAdjust'
import { getdeptlist } from '@/api/BasicSettings'
import { checkReceiptOrder } from '@/api/public'
import { searchStockCategory } from '@/api/StockCategory'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import Pagination from '@/components/Pagination'
import MyEmp from './components/MyEmp'
import DetailList from './components/DetailList'
import MyDialog from './components/MyDialog'
import MySupplier from './components/MySupplier'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

var _that
export default {
  name: 'SupplierAdjustList',
  directives: { waves, permission, permission2 },
  components: {
    MyDialog,
    DetailList,
    MyEmp,
    Pagination,
    MySupplier,
    UploadExcelComponent
  },
  filters: {
    judgeStatFilter(status) {
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
    },
    stockTypeFilter(status) {
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
    }
  },
  data() {
    return {
      dialogVisible: false,
      tableHeight: 200,
      step1: '',
      step2: '',
      step3: '',
      step4: '',
      step5: '',
      step6: '',
      step7: '',
      step8: '',
      receiptVisible: false,
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 采购类别数据
      types: [],
      // 申请部门数据
      depts: [],
      // 审核传参
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      // 详情组件数据
      detailvisible: false,
      // 更多搜索条件问题
      visible2: false,
      // 供应商回显
      supplierId: '',
      // 供应商控制框
      empcontrol: false,
      // 采购人回显
      applyPersonId: '',
      // 采购人控制框
      stockControl: false,
      // 批量操作
      moreaction: [],
      // 加载操作控制
      downloadLoading: false,
      // 表格数据
      list: [],
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true,
      // 采购申请查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
      },
      // 传给组件的数据
      personalForm: {},
      personalForm2: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: [],
      tableData: [],
      tableHeader: [],
      uploadHead: []
    }
  },
  activated() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleReview4(row) {
      this.fsploading = true
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qfsp'), this.$t('prompt.fsp'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.fsp'),
        type: 'warning'
      })
        .then(() => {
          this.reviewParms.judgeStat = 0
          const parms = JSON.stringify(this.reviewParms)
          updateSupplierAdjust2(parms).then((res) => {
            if (res.data.ret === 200) {
              if (res.data.data.result === false) {
                this.$message({
                  type: 'error',
                  message: this.$t('prompt.fspsb')
                })
              } else {
                this.$message({
                  type: 'success',
                  message: this.$t('prompt.fspcg')
                })
              }
              this.getlist()
            } else {
              this.$message({
                type: 'success',
                message: this.$t('prompt.fspcg')
              })
            }
            // this.fsploading = false
          })
        })
        .catch((action) => {
          // this.fsploading = false
        })
    },
    isReview4(row) {
      // 测试阶段临时
      if (row.judgeStat === 2) {
        return true
      }
      // 正式时放开
      // if (row.judgeStat === 2 && row.confirmPersonId === null) {
      //   return true
      // }
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      var _that = this
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.tableData = results
      this.tableHeader = [
        '主题',
        '申请人',
        '申请人id',
        '部门',
        '部门id',
        '供应商',
        '供应商id',
        '申请日期',
        '物品编号',
        '物品名称',
        '规格',
        '颜色',
        '单位',
        '采购单原价',
        '采购单现价',
        '原含税价',
        '新含税价',
        '原税率',
        '新税率',
        '比例',
        '原销售价',
        '新销售价'
      ]
      this.uploadHead = results.map(function(item) {
        return {
          title: item.主题,
          applyPersonName: item.申请人,
          applyPersonId: item.申请人id,
          deptName: item.部门,
          deptId: item.部门id,
          supplierName: item.供应商,
          supplierId: item.供应商id,
          applyDate: item.申请日期,
          productCode: item.物品编号,
          productName: item.物品名称,
          productType: item.规格,
          color: item.颜色,
          unit: item.单位,
          oldPrice: item.采购单原价,
          newPrice: item.采购单现价,
          oldIncludeTaxPrice: item.原含税价,
          newIncludeTaxPrice: item.新含税价,
          oldTaxRate: item.原税率,
          newTaxRate: item.新税率,
          calcitem: item.比例,
          oldSalePrice: item.原销售价,
          newSalePrice: item.新销售价
        }
      })
      console.log('this.uploadHead', this.uploadHead)
      const detaildata = this.uploadHead.map((item) => {
        return {
          mainid: item.supplierId,
          productCode: item.productCode,
          productName: item.productName,
          productType: item.productType,
          color: item.color,
          unit: item.unit,
          oldPrice: item.oldPrice,
          newPrice: item.newPrice,
          oldIncludeTaxPrice: item.oldIncludeTaxPrice,
          newIncludeTaxPrice: item.newIncludeTaxPrice,
          oldTaxRate: item.oldTaxRate,
          newTaxRate: item.newTaxRate,
          calcitem: item.calcitem,
          oldSalePrice: item.oldSalePrice,
          newSalePrice: item.newSalePrice
        }
      })

      const maindata = this.uploadHead.map((item) => {
        return {
          mainid: item.supplierId,
          title: item.title,
          applyPersonId: item.applyPersonId,
          deptId: item.deptId,
          supplierId: item.supplierId,
          applyDate: item.applyDate
        }
      })

      var jmap = {}
      var result = []

      this.uploadHead.forEach(function(al) {
        var key = al.supplierId + '_' + al.supplierName
        if (typeof jmap[key] === 'undefined') {
          jmap[key] = []
        }
        jmap[key].push(al)
      })

      var keys = Object.keys(jmap)
      for (var i = 0; i < keys.length; i++) {
        var rs = keys[i].split('_')
        result.push({
          supplierId: rs[0],
          title: jmap[keys[i]][0].title,
          applyPersonId: jmap[keys[i]][0].applyPersonId,
          deptId: jmap[keys[i]][0].deptId,
          value: jmap[keys[i]]
        })
      }

      console.log('result', result)
      const needparms = {
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionIds
      }
      for (const i in result) {
        const parms = {
          mainid: result[i].supplierId,
          title: result[i].title,
          applyPersonId: result[i].applyPersonId,
          deptId: result[i].deptId,
          supplierId: result[i].supplierId,
          applyDate: result[i].applyDate
        }
        const parms2 = result[i].value
        const sendparms = JSON.stringify(parms)
        const sendparms2 = JSON.stringify(parms2)
        addSupplierAdjust(sendparms, sendparms2, needparms).then((res) => {
          if (res.data.ret === 200) {
            _that.$notify({
              title: 'successful',
              message: '导入成功',
              type: 'success',
              offset: 100
            })
          } else {
            _that.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
          _that.getlist()
          loading.close()
        })
      }
    },
    handleImport() {
      this.dialogVisible = true
    },
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    handleMyReceipt1(val) {
      console.log(val)
      this.$store.dispatch('getempcontract', val)
      this.$router.push('/AdvancePay/AddAdvancePay')
    },
    // // 判断反审批按钮
    // isReview4(row) {
    //   console.log(row)
    //   if (row.judgeStat === 2 && row.receiptStat === 2) {
    //     return true
    //   }
    // },
    // // 反结单操作
    // handleReview4(row) {
    //   this.reviewParms = {}
    //   this.reviewParms.id = row.id
    //   this.reviewParms.judgePersonId = this.$store.getters.userId
    //   this.$confirm(this.$t('prompt.qfsp'), this.$t('prompt.fsp'), {
    //     distinguishCancelAndClose: true,
    //     confirmButtonText: this.$t('prompt.fsp'),
    //     type: 'warning'
    //   }).then(() => {
    //     this.reviewParms.judgeStat = 0
    //     const parms = JSON.stringify(this.reviewParms)
    //     updateSupplierAdjust2(parms).then(res => {
    //       if (res.data.ret === 200) {
    //         if (res.data.data.result === false) {
    //           this.$message({
    //             type: 'error',
    //             message: this.$t('prompt.fspsb')
    //           })
    //         } else {
    //           this.$message({
    //             type: 'success',
    //             message: this.$t('prompt.fspcg')
    //           })
    //         }
    //         this.getlist()
    //       } else {
    //         this.$message({
    //           type: 'success',
    //           message: this.$t('prompt.fspcg')
    //         })
    //       }
    //     })
    //   })
    // },
    // 判断反结单按钮
    isReview3(row) {
      console.log(row)
      if (row.receiptStat === 3) {
        return true
      }
    },
    // 反结单操作
    handleReview3(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.endPersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qfjd'), this.$t('prompt.fjd'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.fjd'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.receiptStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updateSupplierAdjust2(parms).then((res) => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.fjdcg')
            })
            this.getlist()
          }
        })
      })
    },
    // 判断结单按钮
    isReview2(row) {
      console.log(row)
      if (
        row.receiptStat !== 3 &&
        (row.judgeStat === 2 || row.judgeStat === 3)
      ) {
        return true
      }
    },
    // 结单操作
    handleReview2(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.endPersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qjd'), this.$t('prompt.jd'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.jd'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.receiptStat = 3
        const parms = JSON.stringify(this.reviewParms)
        updateSupplierAdjust2(parms).then((res) => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.jdcg')
            })
            this.getlist()
          }
        })
      })
    },
    contorlstep4(val) {
      if (val === 0) {
        this.step4 = 'wait'
      }
      if (val === 1) {
        this.step4 = 'finish'
      }
      if (val === 2) {
        this.step4 = 'success'
      }
    },
    contorlstep5(val) {
      if (val === 0) {
        this.step5 = 'wait'
      }
      if (val === 1) {
        this.step5 = 'finish'
      }
      if (val === 2) {
        this.step5 = 'success'
      }
    },
    contorlstep6(val) {
      if (val === 0) {
        this.step6 = 'wait'
      }
      if (val === 1) {
        this.step6 = 'finish'
      }
      if (val === 2) {
        this.step6 = 'success'
      }
    },
    contorlstep7(val) {
      if (val === 0) {
        this.step7 = 'wait'
      }
      if (val === 1) {
        this.step7 = 'finish'
      }
      if (val === 2) {
        this.step7 = 'success'
      }
    },
    contorlstep8(val) {
      if (val === 0) {
        this.step8 = 'wait'
      }
      if (val === 1) {
        this.step8 = 'finish'
      }
      if (val === 2) {
        this.step8 = 'success'
      }
    },
    // 进程操作
    handleReceipt(row) {
      this.receiptVisible = true
      console.log('row', row)
      checkReceiptOrder(row.orderNumber).then((res) => {
        if (res.data.ret === 200) {
          console.log('res.data.data', res.data.data)
          this.contorlstep4(res.data.data.orderStat)
          this.contorlstep5(res.data.data.arrivalStat)
          this.contorlstep6(res.data.data.checkStat)
          this.contorlstep7(res.data.data.enterStat)
          this.contorlstep8(res.data.data.finishStat)
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    checkPermission,
    // 不让勾选
    selectInit(row, index) {
      if (row.judgeStat !== 0) {
        return true
      } else {
        return true
      }
    },
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      SupplierAdjustlistGetList(this.getemplist).then((res) => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 部门列表数据
      getdeptlist().then((res) => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
      // 采购类别数据
      searchStockCategory(this.typeparms).then((res) => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
    },
    // 清空搜索条件
    restFilter() {
      this.supplierId = ''
      this.getemplist.supplierId = ''
    },
    restFilter2() {
      this.applyPersonId = ''
      this.getemplist.applyPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      SupplierAdjustlistGetList(this.getemplist).then((res) => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 采购人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购人回显
    stockName(val) {
      this.applyPersonId = val.personName
      this.getemplist.applyPersonId = val.id
    },
    // 供应商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供应商列表返回数据
    supplierName(val) {
      console.log(val)
      this.supplierId = val.supplierName
      this.getemplist.supplierId = val.id
    },
    // 修改操作
    handleEdit(row) {
      const parms = {
        adjustId: row.id,
        repositoryId: 0,
        pageNum: 1,
        pageSize: 10
      }
      SupplierAdjustlist(parms).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data.content.list[0])
          this.editVisible = true
          this.personalForm = Object.assign({}, res.data.data.content.list[0])
        }
      })
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
    },
    // 详情操作
    handleDetail(row) {
      const parms = {
        adjustId: row.id,
        repositoryId: 0,
        pageNum: 1,
        pageSize: 10
      }
      SupplierAdjustlist(parms).then(res => {
        if (res.data.ret === 200) {
          console.log(res.data.data.content.list[0])
          this.detailvisible = true
          this.personalForm2 = Object.assign({}, res.data.data.content.list[0])
        }
      })
    },
    // 判断审核按钮
    isReview(row) {
      if (
        row.approvalUseVos !== '' &&
        row.approvalUseVos !== null &&
        row.approvalUseVos !== undefined &&
        row.approvalUseVos.length !== 0
      ) {
        const approvalUse = row.approvalUseVos
        const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(
          ',' + this.$store.getters.userId + ','
        )
        console.log(approvalUse[approvalUse.length - 1].stepHandler)
        console.log(index)
        if (index > -1 && (row.judgeStat === 1 || row.judgeStat === 0)) {
          return true
        }
      }
    },
    // 审批操作
    handleReview(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.tg'),
        cancelButtonText: this.$t('prompt.btg'),
        type: 'warning'
      })
        .then(() => {
          this.reviewParms.judgeStat = 2
          const parms = JSON.stringify(this.reviewParms)
          updateSupplierAdjust2(parms).then((res) => {
            if (res.data.ret === 200) {
              this.$message({
                type: 'success',
                message: this.$t('prompt.shcg')
              })
              this.getlist()
            }
          })
        })
        .catch((action) => {
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
                updateSupplierAdjust2(parms).then((res) => {
                  if (res.data.ret === 200) {
                    this.$message({
                      type: 'success',
                      message: this.$t('prompt.shcg')
                    })
                    this.getlist()
                  } else {
                    this.$notify.error({
                      title: 'wrong',
                      message: res.data.msg,
                      offset: 100
                    })
                  }
                })
              })
              .catch((action) => {
                this.$message({
                  type: 'info',
                  message: action === 'cancel' ? '确认取消' : '停留在当前页面'
                })
              })
            // ================取消弹框结束
          }
        })
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 多条删除
    // 批量删除
    handleCommand(command) {
      const needdeletedata = this.moreaction.filter((item) => {
        return item.judgeStat === 0
      })
      const ids = needdeletedata.map((item) => item.id).join()
      if (command === 'delete') {
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        })
          .then(() => {
            deleteSupplierAdjust(ids, this.$store.getters.userId).then(
              (res) => {
                if (res.data.ret === 200 || res.data.ret === 100) {
                  this.$notify({
                    title: this.$t('prompt.sccg'),
                    type: 'success',
                    offset: 100
                  })
                  this.getlist()
                } else {
                  this.$notify.error({
                    title: 'wrong',
                    message: 'wrong',
                    offset: 100
                  })
                }
              }
            )
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('prompt.yqxsc')
            })
          })
      }
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      })
        .then(() => {
          deleteSupplierAdjust(row.id, this.$store.getters.userId).then(
            (res) => {
              if (res.data.ret === 200 || res.data.ret === 100) {
                this.$notify({
                  title: this.$t('prompt.sccg'),
                  type: 'success',
                  offset: 100
                })
                this.getlist()
              } else {
                this.$notify.error({
                  title: 'wrong',
                  message: 'wrong',
                  offset: 100
                })
              }
            }
          )
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('prompt.yqxsc')
          })
        })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/Supplier/AddSupplierAdjust')
    },
    // 导出
    handleExport() {
      if (this.moreaction.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择要导出数据',
          offset: 100
        })
        return false
      }
      this.downloadLoading = true
      const maindata = this.moreaction
      const detaildata = this.moreaction.map((item) => {
        return item.supplierAdjustDetailVos
      })
      const needdetaildata = [].concat.apply([], detaildata)
      for (const i in maindata) {
        for (const j in needdetaildata) {
          if (maindata[i].id === needdetaildata[j].adjustId) {
            needdetaildata[j].title = maindata[i].title
            needdetaildata[j].applyPersonName = maindata[i].applyPersonName
            needdetaildata[j].deptName = maindata[i].deptName
            needdetaildata[j].supplierName = maindata[i].supplierName
            needdetaildata[j].applyDate = maindata[i].applyDate
            needdetaildata[j].applyPersonId = maindata[i].applyPersonId
            needdetaildata[j].deptId = maindata[i].deptId
            needdetaildata[j].supplierId = maindata[i].supplierId
          }
        }
      }

      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = [
          '主题',
          '申请人',
          '申请人id',
          '部门',
          '部门id',
          '供应商',
          '供应商id',
          '申请日期',
          '物品编号',
          '物品名称',
          '规格',
          '颜色',
          '单位',
          '采购单原价',
          '采购单现价',
          '原含税价',
          '新含税价',
          '原税率',
          '新税率',
          '比例',
          '原销售价',
          '新销售价'
        ]
        const filterVal = [
          'title',
          'applyPersonName',
          'applyPersonId',
          'deptName',
          'deptId',
          'supplierName',
          'supplierId',
          'applyDate',
          'productCode',
          'productName',
          'productType',
          'color',
          'unit',
          'oldPrice',
          'newPrice',
          'oldIncludeTaxPrice',
          'newIncludeTaxPrice',
          'oldTaxRate',
          'newTaxRate',
          'calcitem',
          'oldSalePrice',
          'newSalePrice'
        ]
        const data = this.formatJson(filterVal, needdetaildata)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '供应商调价单资料表'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j]
        })
      )
    },
    // 打印
    handlePrint() {
      console.log(456)
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.enterRepositoryId = val.repositoryName
      this.getemplist.enterRepositoryId = val.id
    },
    // 部门列表focus刷新
    updatedept() {
      this.getlist()
    },
    // 交货人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.deliveryPersonId = val.personName
      this.getemplist.deliveryPersonId = val.id
    },
    // 验收人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      this.acceptPersonId = val.personName
      this.getemplist.acceptPersonId = val.id
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
.normal >>> .el-dialog__header {
  padding: 20px 20px 10px;
  background: #fff;
  position: static;
  top: auto;
  z-index: auto;
  width: auto;
  border-bottom: none;
}
.normal >>> .el-dialog {
  -webkit-transform: none;
  transform: none;
  left: 0;
  position: relative;
  margin: 0 auto;
  height: auto;
}
.app-container >>> .el-table .cell {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 24px;
  word-break: keep-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.ERP-container {
  margin-left: 10px;
}
.filter-container {
  padding: 20px;
  padding-left: 0px;
}
.filter-item {
  width: 180px;
  margin-left: 10px;
  padding: 10px 0;
}
.filter-item2 {
  width: 180px;
  margin-left: 5px;
  padding: 10px 0;
}
.box-card {
  /* border : 1px solid #f1f1ff !important; */
  border-bottom: 1px solid #f1f1ff00 !important;
}
</style>
