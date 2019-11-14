<template>
  <el-dialog :visible.sync="employeeVisible" :control="control" :close-on-press-escape="false" top="10px" title="选择供应商" append-to-body @close="$emit('update:control', false)">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.id" :placeholder="$t('Supplier.id')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.supplierName" :placeholder="$t('Supplier.supplierName')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.typeId" :value="getemplist.typeId" placeholder="请选择供应商" class="filter-item" clearable>
        <el-option
          v-for="(item, index) in typeIds"
          :key="index"
          :label="item.categoryName"
          :value="item.id"
        />
      </el-select>
      <!-- 更多搜索条件下拉栏 -->
      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        trigger="click">
        <el-cascader
          :options="regions"
          :props="props"
          v-model="getemplistregions"
          :show-all-levels="false"
          placeholder="所在区域"
          change-on-select
          filterable
          clearable
          style="width: 40%;float: left;margin-left: 20px"
          @change="handlechange4"
        />
        <el-select v-model="getemplist.levelId" placeholder="请选择优质级别" clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option
            v-for="(item, index) in levelIds"
            :key="index"
            :label="item.categoryName"
            :value="item.id"
          />
        </el-select>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </div>
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
      <el-table-column :label="$t('Supplier.id')" :resizable="false" prop="id" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Supplier.supplierName')" :resizable="false" prop="supplierName" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.supplierName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Supplier.supplierShortName')" :resizable="false" prop="supplierShortName" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.supplierShortName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Supplier.typeId')" :resizable="false" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Supplier.regionId')" :resizable="false" prop="regionName" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.regionName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Supplier.buyerId')" :resizable="false" prop="buyerName" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.buyerName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Supplier.levelId')" :resizable="false" prop="levelName" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.levelName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Supplier.createId')" :resizable="false" prop="createId" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Supplier.createTime')" :resizable="false" prop="createTime" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
    <el-button v-waves class="filter-item" type="success" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
  </el-dialog>
</template>

<script>
import { searchRepository, regionlist } from '@/api/public'
import { searchCategory, search } from '@/api/Supplier'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  directives: { waves },
  components: { Pagination },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
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
      // 更多搜索条件问题
      visible2: false,
      // 转化数据
      choosedata: '',
      // 批量操作
      moreaction: '',
      // 优质级别
      levelIds: [],
      // 供应商类别
      typeIds: [],
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
      // 供应商列表查询加展示参数
      getemplist: {
        id: '',
        supplierName: '',
        typeId: '',
        regionId: '',
        levelId: '',
        pagenum: 1,
        pagesize: 10
      },
      // 部门列表
      depts: [],
      // 区域级联数据转化
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 区域数据
      regions: [],
      getemplistregions: [],
      // 门店数据
      repositories: [],
      // 员工选择框控制
      employeeVisible: this.control,
      // 小区经理选择框控制
      regionManagerVisible: false
    }
  },
  watch: {
    control() {
      this.employeeVisible = this.control
      this.getlist()
    }
  },
  methods: {
    getlist() {
      // 供应商列表数据
      this.listLoading = true
      search(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 供应商类别
      searchCategory(1).then(res => {
        if (res.data.ret === 200) {
          this.typeIds = res.data.data.content.list
        }
      })
      // 优质级别
      searchCategory(4).then(res => {
        if (res.data.ret === 200) {
          this.levelIds = res.data.data.content.list
        }
      })
      // 区域数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        }
      })
    },
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      this.getemplist.regionId = this.getemplistregions[this.getemplistregions.length - 1]
      search(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/Supplier/NewSupplier')
    },
    // 根据区域选择门店
    handlechange4(val) {
      console.log(val)
      const finalid = val[val.length - 1]
      searchRepository(finalid).then(res => {
        if (res.data.ret === 200) {
          console.log(res)
          this.repositories = res.data.data.content.list
        }
      })
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
      this.$emit('supplierName', this.choosedata)
    },
    // 选择员工数据时的操作
    handleCurrentChange(val) {
      this.choosedata = val
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
