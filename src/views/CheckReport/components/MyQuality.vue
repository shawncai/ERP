<template>
  <el-dialog :visible.sync="employeeVisible" :qualitycontrol="qualitycontrol" :close-on-press-escape="false" top="10px" title="选择质检申请单" append-to-body width="1100px" @close="$emit('update:qualitycontrol', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px;padding-left:0 " shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.title" :placeholder="$t('QualityCheck.title')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 5px">
            <el-form-item>
              <el-input v-model="getemplist.checkNumber" placeholder="质检编号" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <el-form-item>
              <el-input v-model="reportPersonId" :placeholder="$t('QualityCheck.reportPersonId')" clearable @keyup.enter.native="handleFilter" @focus="handlechooseStock" @clear="restFilter2"/>
            </el-form-item>
            <my-emp :control.sync="stockControl" @stockName="stockName"/>
          </el-col>
          <!--更多搜索条件-->
          <el-col :span="3" style="margin-left: 30px">
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="click">
              <el-select v-model="getemplist.reportDeptId" placeholder="报检部门" clearable style="width: 40%;float: left;margin-left: 20px">
                <el-option
                  v-for="(item, index) in depts"
                  :key="index"
                  :value="item.id"
                  :label="item.deptName"/>
              </el-select>
              <el-select v-model="personalForm.checkType" placeholder="质检类型" style="width: 40%;float: right;margin-right: 20px">
                <el-option value="1" label="来料质检"/>
                <el-option value="2" label="送样质检"/>
                <el-option value="3" label="生产质检"/>
              </el-select>
              <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
                <el-option value="1" :label="$t('updates.zd')"/>
                <el-option value="2" :label="$t('updates.zx')"/>
                <el-option value="3" :label="$t('updates.jd')"/>
              </el-select>
              <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 20px">
                <el-option value="0" :label="$t('updates.wsh')"/>
                <el-option value="1" :label="$t('updates.shz')"/>
                <el-option value="2" :label="$t('updates.shtg')"/>
                <el-option value="3" :label="$t('updates.shptg')"/>
              </el-select>
              <el-select v-model="getemplist.checkMode" :value="getemplist.checkMode" placeholder="检验方式" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
                <el-option value="1" label="抽样"/>
              </el-select>
              <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
                <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
              </div>
              <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
            </el-popover>
          </el-col>
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
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @current-change="handleCurrentChange">
        <el-table-column :label="$t('public.id')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.checkNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('QualityCheck.title')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('QualityCheck.sourceType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceType | sourceTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('QualityCheck.supplierId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('QualityCheck.reportPersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.reportPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('QualityCheck.reportDeptId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.reportDeptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('QualityCheck.workCenterId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.workCenter }}</span>
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
import { qualitychecklist } from '@/api/QualityCheck'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import MyEmp from './MyEmp'
import MySupplier from './MySupplier'

var _that
export default {
  directives: { waves },
  components: { MyEmp, Pagination, MySupplier },
  filters: {
    judgeStatFilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('updates.shbtg')
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
        2: _that.$t('updates.zscrw'),
        3: _that.$t('Hmodule.Nosource')
      }
      return statusMap[status]
    }
  },
  props: {
    qualitycontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 选择框控制
      employeeVisible: this.qualitycontrol,
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
      // 报检员回显
      reportPersonId: '',
      // 报检员控制框
      stockControl: false,
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
        judgeStat: 2, receiptStat: 2,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
        isActive: 1
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: []
    }
  },
  watch: {
    qualitycontrol() {
      this.employeeVisible = this.qualitycontrol
      this.getlist()
    }
  },
  methods: {
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      qualitychecklist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          // 处理源单过来的数据，筛选已经质检过的内容
          console.log('处理前', res.data.data.content.list)
          const processArr = res.data.data.content.list
          for (let i = 0; i < processArr.length; i++) {
            for (let j = 0; j < processArr[i].qualityCheckDetailVos.length; j++) {
              if (processArr[i].qualityCheckDetailVos[j].basicQuantity - processArr[i].qualityCheckDetailVos[j].checkedQuantity === 0) {
                processArr[i].qualityCheckDetailVos.splice(j, 1)
                j--
              }
            }
          }
          for (let i = 0; i < processArr.length; i++) {
            if (processArr[i].qualityCheckDetailVos.length === 0) {
              processArr.splice(i, 1)
              i--
            }
          }
          console.log('处理后', processArr)
          this.list = processArr
          this.total = res.data.data.content.totalCount
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
      // 采购类别数据
      searchStockCategory(this.typeparms).then(res => {
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
      this.reportPersonId = ''
      this.getemplist.reportPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      qualitychecklist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 报检员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 报检员回显
    stockName(val) {
      this.reportPersonId = val.personName
      this.getemplist.reportPersonId = val.id
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
    // 新增数据
    handleAdd() {
      this.$router.push('/QualityCheck/AddQualityCheck')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      console.log(123, this.choosedata)
      this.employeeVisible = false
      this.$emit('allqualityinfo', this.choosedata)
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
    width: 150px;
    margin-left: 20px;
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
