<template>
  <el-dialog :visible.sync="employeeVisible" :matecontrol="matecontrol" :close-on-press-escape="false" top="10px" title="选择领料单" append-to-body width="1000px" @close="$emit('update:matecontrol', false)">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="5">
            <el-form-item label="单据主题" label-width="100px">
              <el-input v-model="getemplist.title" :placeholder="$t('AccessMaterials.title')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="单据编号">
              <el-input v-model="getemplist.planNumber" placeholder="单据编号" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="领料人">
              <el-input v-model="accessPersonId" :placeholder="$t('AccessMaterials.accessPersonId')" clearable @keyup.enter.native="handleFilter" @focus="handlechooseStock"/>
            </el-form-item>
            <my-delivery :deliverycontrol.sync="stockControl" @deliveryName="stockName"/>
          </el-col>
          <!--更多搜索条件-->
          <el-col :span="3">
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="manual">
              <el-select v-model="getemplist.processType" :value="getemplist.processType" placeholder="加工类型" clearable style="width: 40%;float: right;margin-right: 20px">
                <el-option value="1" label="加工1"/>
              </el-select>
              <el-select v-model="getemplist.sourceType" :value="getemplist.sourceType" placeholder="源单类型" clearable style="width: 40%;float: left;margin-left: 20px">
                <el-option value="1" label="生产任务单" />
                <el-option value="2" label="无来源" />
              </el-select>
              <el-input v-model="getemplist.taskNumber" placeholder="生产任务单" style="width: 40%;float: right;margin-right: 20px;margin-top: 20px" clearable @focus="handleAddSouce"/>
              <produce-task :procontrol.sync="producecontrol" @moredata="moredata"/>
              <el-select v-model="getemplist.produceDeptId" placeholder="生产部门" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
                <el-option
                  v-for="(item, index) in depts"
                  :key="index"
                  :value="item.id"
                  :label="item.deptName"/>
              </el-select>
              <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" placeholder="审批状态" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 20px">
                <el-option value="0" label="未审核"/>
                <el-option value="1" label="审核中"/>
                <el-option value="2" label="审核通过"/>
                <el-option value="3" label="审核不通过"/>
              </el-select>
              <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" placeholder="单据状态" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
                <el-option value="1" label="制单"/>
                <el-option value="2" label="执行"/>
                <el-option value="3" label="结单"/>
              </el-select>
              <el-input v-model="providePersonId" :placeholder="$t('AccessMaterials.providePersonId')" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px" @keyup.enter.native="handleFilter" @focus="handlechoose"/>
              <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
              <el-date-picker
                v-model="getemplist.accessTime"
                placeholder="领料时间"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 40%;float: right;margin-right: 20px;margin-top: 20px"/>
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
          <el-col :span="2">
            <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
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
            <span>{{ scope.row.accessNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AccessMaterials.title')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AccessMaterials.sourceType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceType | sourceTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AccessMaterials.produceTaskNumber')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.produceTaskNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AccessMaterials.produceDeptName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.produceDeptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AccessMaterials.processType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.processType | processTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AccessMaterials.accessPersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.accessPersonName }}</span>
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
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-bottom: 10px" @click="handleConfirm">确认添加</el-button>
      <!--修改结束=================================================-->
    </el-card>
  </el-dialog>
</template>

<script>
import { accesslist } from '@/api/AccessMaterials'
import { getdeptlist } from '@/api/BasicSettings'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import MyDelivery from './MyDelivery'
import ProduceTask from './ProduceTask'
import MyCreate from './MyCreate'
import DetailList from './DetailList'
import MyDialog from './MyDialog' // Secondary package based on el-pagination
export default {
  directives: { waves },
  components: { MyDialog, DetailList, MyCreate, ProduceTask, MyDelivery, Pagination },
  filters: {
    judgeStatFilter(status) {
      const statusMap = {
        0: '未审核',
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
      return statusMap[status]
    },
    receiptStatFilter(status) {
      const statusMap = {
        1: '制单',
        2: '执行',
        3: '结单'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: '生产任务单',
        2: '无来源'
      }
      return statusMap[status]
    },
    processTypeFilter(status) {
      const statusMap = {
        1: '加工1'
      }
      return statusMap[status]
    }
  },
  props: {
    matecontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 选择框控制
      employeeVisible: this.matecontrol,
      // 部门数据
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
      // 生产任务单回显
      taskNumber: '',
      // 生产任务单控制
      producecontrol: false,
      // 领料人回显
      accessPersonId: '',
      // 领料人控制
      stockControl: false,
      // 发料人回显
      providePersonId: '',
      // 发料人控制框
      createcontrol: false,
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
      // 领料列表查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId,
        createPersonId: this.$store.getters.userId
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
    matecontrol() {
      this.employeeVisible = this.matecontrol
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      accesslist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
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
    },
    // 清空搜索条件
    restFilter() {
      this.accessPersonId = ''
      this.getemplist.accessPersonId = ''
      this.providePersonId = ''
      this.getemplist.providePersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      accesslist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.restFilter()
        } else {
          this.restFilter()
        }
      })
    },
    // 领料人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 领料人回显
    stockName(val) {
      this.accessPersonId = val.personName
      this.getemplist.accessPersonId = val.id
    },
    // 发料人focus事件
    handlechoose() {
      this.createcontrol = true
    },
    // 发料人回显
    createname(val) {
      console.log(val)
      this.providePersonId = val.personName
      this.getemplist.providePersonId = val.id
    },
    // 生产任务单选择focus控制
    handleAddSouce() {
      this.producecontrol = true
    },
    moredata(val) {
      console.log(val)
      this.getemplist.taskNumber = val.taskNumber
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/AccessMaterials/AddAccessMaterials')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      const materialdata = this.choosedata.accessMaterialsDetailVos
      const alldata = this.choosedata
      const accessRepositoryId = this.choosedata.accessRepositoryId
      const accessRepositoryName = this.choosedata.accessRepositoryName
      const materialDetail = materialdata.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          unit: item.unit,
          typeId: item.typeId,
          productType: item.productType,
          quantity: item.accessQuantity,
          retreatRepositoryId: accessRepositoryId,
          retreatRepositoryName: accessRepositoryName,
          price: item.price,
          reason: '',
          money: 0
        }
      })
      this.$emit('material', materialDetail)
      this.$emit('alldata', alldata)
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
