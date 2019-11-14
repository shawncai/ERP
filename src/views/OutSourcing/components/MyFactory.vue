<template>
  <el-dialog :visible.sync="employeeVisible" :factorycontrol="factorycontrol" :close-on-press-escape="false" top="10px" title="选择外包工厂" append-to-body @close="$emit('update:factorycontrol', false)">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="5">
            <el-form-item label="工厂编号" label-width="100px">
              <el-input v-model="getemplist.code" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item label="工厂名称">
              <el-input v-model="getemplist.factoryName" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item label="工厂联系人">
              <el-input v-model="getemplist.factoryContactName" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <!-- 新建 -->
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
        <el-table-column :label="$t('OutFactory.factoryNumber')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.factoryNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('OutFactory.factoryName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.factoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('OutFactory.factoryContactPhone')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.factoryContactPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('OutFactory.factoryFax')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.factoryFax }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('OutFactory.factoryContactName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.factoryContactName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('OutFactory.factoryContactPhone')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.factoryContactPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('OutFactory.unitAddress')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.unitAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.createDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.createPersonName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createName }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-button v-waves class="filter-item" type="success" style="width: 100px;float: left;margin-top: 10px" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
      <!--修改结束=================================================-->
    </el-card>
  </el-dialog>
</template>

<script>
import { searchoutFactory } from '@/api/OutFactory'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
export default {
  directives: { waves },
  components: { Pagination },
  props: {
    factorycontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 选择框控制
      employeeVisible: this.factorycontrol,
      // 单选数据
      choosedata: '',
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
      // 外包工厂列表查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10
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
    factorycontrol() {
      this.employeeVisible = this.factorycontrol
      this.getlist()
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    getlist() {
      // 外包工厂列表数据
      this.listLoading = true
      searchoutFactory(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      searchoutFactory(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          // this.restFilter()
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.employeeVisible = false
      this.$router.push('/OutFactory/AddOutFactory')
    },
    // 清空历史搜索数据
    restemplist() {
      this.getemplist = {
        pageNum: 1,
        pageSize: 10
      }
    },
    // 选择数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      this.$emit('factoryName', this.choosedata)
    }
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
