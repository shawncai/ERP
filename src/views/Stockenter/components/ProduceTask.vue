<template>
  <el-dialog :visible.sync="employeeVisible" :procontrol="procontrol" :close-on-press-escape="false" top="10px" title="选择生产任务1" append-to-body width="1000px" @close="$emit('update:procontrol', false)">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="5">
            <el-form-item :label="$t('updates.sczt')" label-width="100px">
              <el-input v-model="getemplist.title" :placeholder="$t('ProduceTask.title')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('updates.djbh')">
              <el-input v-model="getemplist.taskNumber" :placeholder="$t('updates.djbh')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('updates.fzr')">
              <el-input v-model="handlePersonId" :placeholder="$t('ProduceTask.handlePersonId')" clearable @keyup.enter.native="handleFilter" @focus="handlechooseStock" @clear="restFilter"/>
            </el-form-item>
            <my-delivery :deliverycontrol.sync="stockControl" @deliveryName="stockName"/>
          </el-col>
          <!--更多搜索条件-->
          <el-col :span="3">
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="click">
              <el-input v-model="workCenterId" style="width: 40%;float: left;margin-left: 20px" placeholder="工作中心" clearable @focus="workcenterchoose" @clear="restFilter2"/>
              <my-center :control.sync="centercontrol" @center="center"/>
              <el-select v-model="getemplist.judgeStat" :value="getemplist.judgeStat" :placeholder="$t('updates.spzt')" clearable style="width: 40%;float: right;margin-right: 20px">
                <el-option :label="$t('updates.wsh')" value="0"/>
                <el-option :label="$t('updates.shz')" value="1"/>
                <el-option :label="$t('updates.shtg')" value="2"/>
                <el-option :label="$t('updates.shptg')" value="3"/>
              </el-select>
              <el-select v-model="getemplist.receiptStat" :value="getemplist.receiptStat" :placeholder="$t('updates.djzt')" clearable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
                <el-option :label="$t('updates.zd')" value="1"/>
                <el-option :label="$t('updates.zx')" value="2"/>
                <el-option :label="$t('updates.jd')" value="3"/>
              </el-select>
              <el-select v-model="getemplist.produceDeptId" placeholder="生产部门" clearable style="width: 40%;float: right;margin-right: 20px;margin-top: 20px">
                <el-option
                  v-for="(item, index) in depts"
                  :key="index"
                  :value="item.id"
                  :label="item.deptName"/>
              </el-select>
              <el-select v-model="getemplist.processType" placeholder="加工类型" style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
                <el-option :label="$t('Hmodule.jiagong1')" value="1" />
              </el-select>
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="-"
                unlink-panels
                start-placeholder="Start"
                end-placeholder="End"
                value-format="yyyy-MM-dd"
                style="margin-top: 20px;margin-left: 20px"/>
              <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
                <el-button v-waves class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
              </div>
              <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
            </el-popover>
          </el-col>
          <el-col :span="3" style="margin-left: 17px">
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
        ref="table"
        :key="tableKey"
        :data="list"
        :height="tableHeight"
        size="small"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @current-change="handleCurrentChange">
        <el-table-column :label="$t('ProduceTask.taskNumber')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.taskNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceTask.title')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceTask.sourceType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sourceType | sourceTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceTask.handlePersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.handlePersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProduceTask.processType')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.processType | processTypeFilter }}</span>
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
      <!--修改结束=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-bottom: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { producetasklist } from '@/api/ProduceTask'
import { productlist } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import MyCenter from './MyCenter'
import MyEmp from './MyEmp'
import MyDelivery from './MyDelivery'
var _that
export default {
  directives: { waves },
  components: { MyDelivery, Pagination, MyCenter, MyEmp },
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
    sourceTypeFilter(status) {
      const statusMap = {
        1: _that.$t('updates.zscjg'),
        2: _that.$t('Hmodule.Nosource')
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
    procontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableHeight: 200,

      // 选择框控制
      employeeVisible: this.procontrol,
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
      // 工作中心回显
      workCenterId: '',
      // 工作中心控制器
      centercontrol: false,
      // 负责人回显
      handlePersonId: '',
      // 负责人控制框
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
      // 主生产任务列表查询加展示参数
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
    procontrol() {
      this.employeeVisible = this.procontrol
      this.getlist()

      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 180
      }, 100)
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      producetasklist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // 判断是否有过检数量
          for (let i = 0; i < this.list.length; i++) {
            for (let j = 0; j < this.list[i].produceTaskDetailVos.length; j++) {
              if (this.list[i].produceTaskDetailVos[j].passQuantity === 0) {
                this.list[i].produceTaskDetailVos.splice(j, 1)
                j--
              }
            }
          }
          // for (let i = 0; i < this.list.length; i++) {
          //   if (this.list[i].produceTaskDetailVos.length === 0) {
          //     this.list.splice(i, 1)
          //     i--
          //   }
          // }
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
      this.handlePersonId = ''
      this.getemplist.handlePersonId = ''
    },
    restFilter2() {
      this.workCenterId = ''
      this.getemplist.workCenterId = ''
    },
    restFilter3() {
      this.producePlanNumber = ''
      this.getemplist.producePlanNumber = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      producetasklist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 工作中心focus事件
    workcenterchoose() {
      this.centercontrol = true
    },
    center(val) {
      console.log(val)
      this.workCenterId = val.workCenterName
      this.getemplist.workCenterId = val.id
    },
    // 负责人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 负责人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.getemplist.handlePersonId = val.id
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/ProduceTask/AddProduceTask')
    },
    // 选择主生产计划数据时的操作
    handleCurrentChange(val) {
      console.log('val', val)
      this.choosedata = val
    },
    // 确认添加数据
    async handleConfirm() {
      console.log('choosedata', this.choosedata)
      const producedata = this.choosedata.produceTaskDetailVos
      console.log('producedata', producedata)

      const num = this.choosedata
      const productDetail = producedata.map(function(item) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          alreadyProduceQuantity: item.alreadyProduceQuantity,
          produceQuantity: item.produceQuantity,
          alreadyEnterQuantity: item.alreadyEnterQuantity,
          color: item.color,
          workHours: 0,
          finishQuantity: 0,
          enterPrice: 0,
          passQuantity: item.passQuantity,
          actualEnterQuantity: item.passQuantity,
          passRate: 0,
          workCenterId: item.workCenterId,
          unit: item.unit,
          sourceSerialNumber: item.id
        }
      })
      // const list = await Promise.all(producedata.map(function(item) {
      //   return productlist(item.productCode)
      // }))
      // console.log('list', list[0].data.data.content.list)
      // console.log('productDetail', productDetail)
      // 在外部把数据加到数组里面去
      // for (let i = 0; i < productDetail.length; i++) {
      //   for (let j = 0; j < list.length; j++) {
      //     if (list[j].data.data.content.length) {
      //       if (productDetail[i].productCode === list[j].data.data.content.list[0].code) {
      //         productDetail[i].price = list[j].data.data.content.list[0].memberPrice
      //         productDetail[i].enterPrice = list[j].data.data.content.list[0].memberPrice
      //         productDetail[i].color = list[j].data.data.content.list[0].color
      //         productDetail[i].typeId = list[j].data.data.content.list[0].typeId
      //         productDetail[i].typeIdname = list[j].data.data.content.list[0].productType
      //       }
      //     }
      //   }
      // }
      console.log('productDetail', productDetail)
      this.$emit('productDetail', productDetail)
      this.$emit('moredata', num)
      this.employeeVisible = false
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
