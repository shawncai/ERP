<template>
  <el-dialog :visible.sync="employeeVisible" :entercontrol="entercontrol" :supp="supp" :close-on-press-escape="false" top="10px" title="选择采购发票" append-to-body width="1100px" @close="$emit('update:entercontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.number" :placeholder="$t('updates.djbh')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 5px">
            <el-form-item>
              <el-input v-model="getemplist.sourceNumber" :placeholder="$t('LogisticsCar.sourcenumber')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="3" style="margin-left: 20px">
            <el-form-item>
              <el-input v-model="deliveryPersonId" :placeholder="$t('Stockenter.deliveryPersonId')" clearable @keyup.enter.native="handleFilter" @focus="handlechooseDelivery" @clear="restFilter2"/>
            </el-form-item>
            <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
          </el-col> -->
          <!--更多搜索条件-->
          <!--          <el-col :span="3" style="margin-left: 30px">-->
          <!--            <el-popover-->
          <!--              v-model="visible2"-->
          <!--              placement="bottom"-->
          <!--              width="500"-->
          <!--              trigger="click">-->
          <!--              <el-select v-model="getemplist.enterDeptId" placeholder="请选择入库部门" clearable style="width: 40%;float: left;margin-left: 20px">-->
          <!--                <el-option-->
          <!--                  v-for="(item, index) in depts"-->
          <!--                  :key="index"-->
          <!--                  :value="item.id"-->
          <!--                  :label="item.deptName"/>-->
          <!--              </el-select>-->
          <!--              <el-input v-model="enterRepositoryId" placeholder="请选择入库仓库" class="filter-item" clearable style="width: 40%;float: left;margin-left: 20px" @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>-->
          <!--              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>-->
          <!--              <el-input v-model="acceptPersonId" :placeholder="$t('Stockenter.acceptPersonId')" class="filter-item" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px" @keyup.enter.native="handleFilter" @focus="handlechooseAccept"/>-->
          <!--              <el-date-picker-->
          <!--                v-model="date"-->
          <!--                type="daterange"-->
          <!--                range-separator="-"-->
          <!--                unlink-panels-->
          <!--                start-placeholder="Start"-->
          <!--                end-placeholder="End"-->
          <!--                value-format="yyyy-MM-dd"-->
          <!--                style="margin-top: 20px;margin-left: 20px"/>-->
          <!--              <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">-->
          <!--                <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>-->
          <!--              </div>-->
          <!--              <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>-->
          <!--            </el-popover>-->
          <!--          </el-col>-->
          <el-col :span="3" style="margin-left: 20px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
          <el-col :span="3">
            <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <!-- 列表开始1.13 -->
      <el-table
        v-loading="listLoading"
        ref="multipleTable"
        :key="tableKey"
        :data="list"
        :row-key="getRowKeys"
        border
        fit
        highlight-current-row
        style="width: 100%;"

        @selection-change="handleSelectionChange">
        <el-table-column :reserve-selection="true" type="selection" min-width="55" align="center" />

        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span class="link-type">{{ scope.row.number }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('StockInvoice.invoiceNumber')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('recoveryCarDetail.createDate')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockInvoice.supplierId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockInvoice.isRed')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.isRed | isRedFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockInvoice.createDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockInvoice.sourceType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceType | sourceTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockInvoice.payDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.payDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.judgeStat')" :resizable="false" prop="judgeStat" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.judgeStat | judgeStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.receiptStat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptStat | receiptStatFilter }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-bottom: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { stockenterlist } from '@/api/Stockenter'
import { getdeptlist } from '@/api/BasicSettings'
import { stockInvoiceList } from '@/api/StockInvoice'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import MyRepository from './MyRepository'
import MySupplier from './MySupplier'
import MyEmp from './MyEmp'
import MyDelivery from './MyDelivery'
import MyDetail from './MyDetail'
import DetailList from './DetailList'
var _that
export default {
  directives: { waves },
  components: { DetailList, Pagination, MyRepository, MySupplier, MyEmp, MyDelivery, MyDetail },
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
        1: _that.$t('updates.cgdhd'),
        2: _that.$t('Hmodule.Nosource'),
        3: _that.$t('updates.cgrkd')
      }
      return statusMap[status]
    },
    isRedFilter(status) {
      const statusMap = {
        1: '否',
        2: '是'
      }
      return statusMap[status]
    }
  },
  props: {
    entercontrol: {
      type: Boolean,
      default: false
    },
    supp: {
      type: Number,
      default: null
    },
    checklist: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 获取row的key值
      getRowKeys(row) {
        return row.id
      },
      // 选择框控制
      employeeVisible: this.entercontrol,
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 入库仓库回显
      enterRepositoryId: '',
      // 仓库选择控制期
      repositorycontrol: false,
      // 验收人回显
      acceptPersonId: '',
      // 验收人控制框
      accetpcontrol: false,
      // 交货人回显
      deliveryPersonId: '',
      // 交货人控制框
      deliverycontrol: false,
      // 部门数据
      depts: [],
      // 采购员控制框
      stockControl: false,
      // 采购员回显
      stockPersonId: '',
      // 批量操作
      moreaction: '',
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
        regionIds: this.$store.getters.regionIds,
        supplierId: this.supp
      },
      visible2: {},
      // 传给组件的数据
      personalForm: {},
      personalForm2: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: [],
      checklistprop: this.checklist,
      flagarr: [],
      myarr: []
    }
  },
  watch: {
    entercontrol() {
      this.employeeVisible = this.entercontrol
      this.getlist()
      setTimeout(() => {
        this.$refs.multipleTable.clearSelection()
      }, 0)
      this.flagarr = []
      this.moreaction = []
    },
    supp() {
      this.getemplist.supplierId = this.supp
      this.getlist()
      console.log(this.supp)
    },
    checklist() {
      const mychecklistprop = this.checklist.map(item => {
        return item.sourceNumber
      })
      this.checklistprop = Array.from(new Set(mychecklistprop))
      console.log('this.checklistprop==============>', this.checklistprop)
      // const needarr = this.$refs.multipleTable.selection
      // const delearr = this.checklistprop
      // const add = needarr.filter(item => !delearr.some(ele => ele === item.id))
      // console.log('add', add)
      // for (const i in this.$refs.multipleTable.selection) {
      //   for (const j in add) {
      //     if (this.$refs.multipleTable.selection[i].code === add[j].code) {
      //       this.$refs.multipleTable.selection.splice(i, 1)
      //     }
      //   }
      // }
      // console.log('this.$refs.multipleTable.selection', this.$refs.multipleTable.selection)
      // if (this.checklistprop) {
      //   this.checklistprop.forEach(row => {
      //     if (row) {
      //       this.select_orderId.push(row.productCode)
      //     }
      //   })
      // }
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 默认选中
    memoryChecked() {
      console.log('我执行啦')
      this.list.forEach((row, index) => {
        if (this.checklistprop.includes(row.enterNumber)) {
          this.$refs.multipleTable.toggleRowSelection(row, true)
          // myarr = []
          this.myarr.push(row.enterNumber)
          this.flagarr = Array.from(new Set(this.myarr))
          console.log('this.flagarr=====================>', this.flagarr)
        } else {
          try {
            this.$refs.multipleTable.toggleRowSelection(row, false)
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    handleSelectionChange(rows) {
      // console.log(val)
      // this.moreaction = val
      console.log('myrows==========>', rows)
      const obj = {}
      const processaction = rows.reduce((cur, next) => {
        obj[next.id] ? '' : obj[next.id] = true && cur.push(next)
        return cur
      }, [])
      this.moreaction = processaction
      console.log('this.moreaction===>', this.moreaction)
      this.select_order_number = this.moreaction.length
      this.select_orderId = []
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.select_orderId.push(row.id)
          }
        })
      }
      console.log('this.select_orderId', this.select_orderId)
    },
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      // 采购入库单列表数据
      this.listLoading = true
      stockInvoiceList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          // for (let i = 0; i < this.list.length; i++) {
          //   for (let j = 0; j < this.list[i].stockEnterDetailVos.length; j++) {
          //     if (this.list[i].stockEnterDetailVos[j].invoiceQuantity === this.list[i].stockEnterDetailVos[j].actualEnterQuantity) {
          //       this.list[i].stockEnterDetailVos.splice(j, 1)
          //       j--
          //     }
          //   }
          // }
          // for (let i = 0; i < this.list.length; i++) {
          //   if (this.list[i].stockEnterDetailVos.length === 0) {
          //     this.list.splice(i, 1)
          //     i--
          //   }
          // }
          this.total = res.data.data.content.totalCount
          this.memoryChecked()
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 清空搜索条件
    restFilter() {
      this.enterRepositoryId = ''
      this.getemplist.enterRepositoryId = ''
    },
    restFilter2() {
      this.deliveryPersonId = ''
      this.getemplist.deliveryPersonId = ''
    },
    restFilter3() {
      this.acceptPersonId = ''
      this.getemplist.acceptPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      stockenterlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.memoryChecked()
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
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
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/Stockenter/addstockenter')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    async handleConfirm() {
      this.employeeVisible = false
      this.$emit('enterinfo', this.moreaction)
    }
    // 仓库管理员选择结束
  }
}
</script>

<style scoped>
  .ERP-container {
    margin: 50px 30px;
  }
  .filter-item{
    width: 140px;
  }
  .form-name{
    font-size: 18px;
    color: #373e4f;
    margin-bottom: -20px;
    margin-top: 30px;
  }
  .container{
    margin-top: 2%;
    border: 1px solid #eceff6;
  }
</style>
