<template>
  <el-dialog :visible.sync="productVisible" :control="control" :close-on-press-escape="false" top="10px" title="选择工序" width="1000px" append-to-body @close="$emit('update:control', false)">
    <el-card class="box-card" style="margin-top: 15px;height: 60px">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.code" :placeholder="$t('ProcessFile.code2')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.processName" :placeholder="$t('ProcessFile.processName')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-input v-model="getemplist.shortName" :placeholder="$t('ProcessFile.shortName')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 154px;">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
        </el-form>
        <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
      </el-row>
    </el-card>
    <!-- 列表开始 -->
    <el-card class="box-card" style="margin-top: 15px">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          align="center"/>
        <el-table-column :label="$t('ProcessFile.code2')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.processName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.processName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.shortName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.shortName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.description')" :resizable="false" prop="ProcessFileDetails" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.stat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | statliter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.createrName')" :resizable="false" prop="ProcessFileDetails" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createrName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ProcessFile.createTime')" :resizable="false" prop="ProcessFileDetails" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-button v-waves type="success" style="text-align: center;" @click="handleAddTo">确认添加</el-button>
      <!--修改结束=================================================-->
    </el-card>
    <!-- 列表结束 -->
  </el-dialog>
</template>

<script>
import { searchprocessFile } from '@/api/ProcessFile'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves'
export default {
  directives: { waves },
  components: { Pagination },
  filters: {
    isKeyFliter(status) {
      const statusMap = {
        1: '是',
        2: '否'
      }
      return statusMap[status]
    },
    statliter(status) {
      const statusMap = {
        1: '启用',
        2: '未启用'
      }
      return statusMap[status]
    }
  },
  props: {
    control: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 工艺选择框控制
      productVisible: this.control,
      // 批量操作
      moreaction: '',
      // 表格数据
      list: [],
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true,
      // 工艺档案列表查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId,
        createPersonId: this.$store.getters.userId
      },
      // 传给组件的数据
      personalForm: {},
      // 控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: []
    }
  },
  watch: {
    control() {
      this.productVisible = this.control
      this.getlist()
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    // 工艺档案列表数据
    getlist() {
      this.listLoading = true
      searchprocessFile(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      searchprocessFile(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/ProcessFile/AddProductionFile')
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 物品选择添加
    handleAddTo() {
      this.productVisible = false
      console.log(this.moreaction)
      const productDetail = this.moreaction.map(function(item) {
        return {
          processFileId: item.id,
          processFileName: item.processName
        }
      })
      console.log(productDetail)
      this.$emit('produt', productDetail)
    }
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
