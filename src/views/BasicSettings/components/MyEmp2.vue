<template>
  <el-dialog :visible.sync="employeeVisible" :control="control" :close-on-press-escape="false" :title="$t('Hmodule.xzyg')" top="10px" append-to-body @close="$emit('update:control', false)">
    <div class="filter-container">
      <el-input v-model="getemplist.employeename" :placeholder="$t('NewEmployeeInformation.employeename')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.jobnumber" :placeholder="$t('NewEmployeeInformation.jobnumber2')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-date-picker
        v-model="getemplist.time"
        :placeholder="$t('Hmodule.xzrq')"
        type="date"
        class="filter-item"
        value-format="yyyy-MM-dd"/>
      <el-popover
        placement="bottom"
        width="500"
        trigger="click">
        <el-cascader
          :options="regions2"
          :props="props2"
          v-model="getemplistregions"
          :show-all-levels="false"
          :placeholder="$t('Hmodule.xzqy')"
          change-on-select
          filterable
          clearable
          style="width: 40%;float: left;margin-left: 20px"
          @change="handlechange4"
        />
        <el-select v-model="getemplist.repositoryid" :placeholder="$t('Hmodule.xzmd')" clearable filterable style="width: 40%;float: right;margin-right: 20px">
          <el-option
            v-for="(item, index) in repositories"
            :key="index"
            :label="item.repositoryName"
            :value="item.id"/>
        </el-select>
        <el-select v-model="getemplist.roleid" :value="getemplist.roleid" :placeholder="$t('updates.roleid')" clearable style="width: 40%;float: left;margin-top: 10px;margin-left: 20px">
          <el-option
            v-for="(item, index) in roles"
            :key="index"
            :label="item.roleName"
            :value="item.id"/>
        </el-select>
        <!-- <el-select v-model="getemplist.postid" :value="getemplist.postid" :placeholder="$t('NewEmployeeInformation.postid2')" class="filter-item" clearable style="width: 40%;float: left;margin-top: 10px;margin-left: 20px">
          <el-option label="xxx" value="1"/>
          <el-option label="xxx" value="2"/>
        </el-select> -->
        <el-select v-model="getemplist.deptid" :placeholder="$t('NewEmployeeInformation.deptid2')" class="filter-item" clearable style="width: 40%;float: right;margin-top: 10px;margin-right: 20px">
          <el-option
            v-for="(item, index) in depts"
            :key="index"
            :label="item.deptName"
            :value="item.id"/>
        </el-select>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      :data="list"
      :key="tableKey"
      :row-key="getRowKeys"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        :reserve-selection="true"
        type="selection"
        width="55"
        align="center"/>
      <el-table-column
        :label="$t('NewEmployeeInformation.id')"
        :resizable="false"
        property="id"
        align="center"
        width="50"/>
      <el-table-column
        :label="$t('NewEmployeeInformation.jobNumber')"
        :resizable="false"
        property="jobNumber"
        align="center"
        width="100"/>
      <el-table-column
        :label="$t('NewEmployeeInformation.account')"
        :resizable="false"
        property="account"
        width="150"
        align="center"/>
      <el-table-column :label="$t('NewEmployeeInformation.name')" :resizable="false" align="center" width="109">
        <template slot-scope="scope">
          <span>{{ scope.row.firstName }} {{ scope.row.middleName }} {{ scope.row.lastName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('NewEmployeeInformation.gender')" :resizable="false" prop="gender" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.gender | genderFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('NewEmployeeInformation.deptName')" :resizable="false" prop="deptName" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.deptName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('NewEmployeeInformation.regionName')" :resizable="false" prop="regionName" align="center" width="230">
        <template slot-scope="scope">
          <span>{{ scope.row.regionName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('NewEmployeeInformation.repositoryName')" :resizable="false" prop="repositoryName" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.repositoryName }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-button v-waves class="filter-item" type="success" style="width: 86px;margin-top: 20px" @click="handleAddTo">{{ $t('public.addTo') }}</el-button>
    <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="gitemplist" />
  </el-dialog>
</template>

<script>
import { regionlist, searchRepository } from '@/api/public'
import { getemplist, getdeptlist } from '@/api/EmployeeInformation'
import { getrolelist } from '@/api/employee'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
var _that
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
      isselect: 1,
      selectarr: [],
      select_orderId: [],
      select_order_number: [],
      // 获取row的key值
      // 获取row的key值
      getRowKeys(row) {
        return row.id
      },
      checklistprop: this.checklist,
      roles: [],
      // 批量操作
      moreaction: [],
      // 仓库管理员回显数据
      managerPeople: '',
      // 小区经理回显数据
      regionManagerId: '',
      // / 弹窗选择
      // 单选表格样式
      currentRow: null,
      // 员工表格数据
      list: [],
      // 员工表格数据条数
      total: 0,
      // 员工表格识别
      tableKey: 0,
      // 加载员工表格
      listLoading: true,
      // 员工查询列表数据
      getemplist: {
        repositoryid: '',
        regionid: '',
        postid: '',
        deptid: '',
        employeename: '',
        pagenum: 1,
        pagesize: 10,
        stat: 1, loginRepositoryId: this.$store.getters.repositoryId, regionIds: this.$store.getters.regionIds,
        time: '',
        jobnumber: ''
      },
      // 部门列表
      depts: [],
      // 区域级联数据转化
      props2: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 区域数据
      regions2: [],
      getemplistregions: [],
      // 门店数据
      repositories: [],
      // 员工选择框控制
      employeeVisible: this.control,
      // 小区经理选择框控制
      regionManagerVisible: false,
      flagarr: [],
      myarr: []
    }
  },
  watch: {
    control() {
      this.employeeVisible = this.control
      console.log(this.control)
      // this.gitemplist()
      setTimeout(() => {
        this.$refs.multipleTable.clearSelection()
      }, 0)
      this.flagarr = []
      this.moreaction = []
    },
    checklist() {
      this.checklistprop = this.checklist.map(item => {
        return Number(item.id)
      })
      console.log(this.checklistprop)
      this.gitemplist()
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
  created() {

  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleselectRow(selection, row) {
      console.log('selection', selection)
      console.log('row', row)
      this.selectarr = selection
      if (this.checklistprop.includes(row.id)) {
        this.checklistprop.splice(this.checklistprop.findIndex(item => item === row.id), 1)
      } else {
        this.checklistprop[row.id] = row.id
      }
      console.log('this.checklistprop', this.checklistprop)
    },
    memoryChecked() {
      console.log('我执行啦')
      this.list.forEach((row, index) => {
        if (this.checklistprop.includes(row.id)) {
          this.$refs.multipleTable.toggleRowSelection(row, true)
          // myarr = []
          this.myarr.push(row.id)
          this.flagarr = Array.from(new Set(this.myarr))
          console.log('this.flagarr=====================>', this.flagarr)
        } else {
          this.$refs.multipleTable.toggleRowSelection(row, false)
        }
      })
    },
    // 仓库管理员选择开始
    gitemplist() {
      getrolelist().then(res => {
        if (res.data.ret === 200) {
          this.roles = res.data.data.content
        } else {
          console.log('角色列表出错')
        }
      })
      // 员工列表数据
      this.listLoading = true
      console.log(this.getemplist)
      getemplist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.memoryChecked()
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 区域数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions2 = this.tranKTree(res.data.data.content)
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
    // 查询
    handleFilter() {
      this.getemplist.regionid = this.getemplistregions[this.getemplistregions.length - 1]
      getemplist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.memoryChecked()
          if (this.isselect === 1) {
            this.isselect = 2
            this.memoryChecked()
          }
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
      this.employeeVisible = false
      this.$router.push('/EmployeeInformation/NewEmployeeInformation')
    },
    // 根据区域选择门店
    handlechange4(val) {
      console.log(val)
      const finalid = val[val.length - 1]
      searchRepository(finalid).then(res => {
        if (res.data.ret === 200) {
          console.log(res)
          this.repositories = res.data.data.content.list
        } else {
          this.$message.error('出错了')
        }
      })
    },
    // 清空历史搜索数据
    restemplist() {
      this.getemplist = {
        repositoryid: '',
        regionid: '',
        postid: '',
        deptid: '',
        employeename: '',
        pagenum: 1,
        pagesize: 10,
        stat: 1,
        time: '',
        jobnumber: ''
      }
      this.getemplistregions = []
    },
    handleSelectionChange(rows) {
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
    // 员工id和name选择
    handleAddTo() {
      console.log('this.checklistprop', this.checklistprop)
      console.log('this.moreaction', this.moreaction)
      console.log('this.select_orderId', this.select_orderId)
      const obj = {}
      const processaction = this.moreaction.reduce((cur, next) => {
        obj[next.id] ? '' : obj[next.id] = true && cur.push(next)
        return cur
      }, [])
      console.log('processaction', processaction)

      this.employeeVisible = false
      const cancelid = []
      console.log('添加标志=====================>', this.flagarr)
      // checklistprop在flagarr有在moreaction没有说明取消，否则未取消
      this.checklistprop.forEach(item => {
        if (this.flagarr.includes(item) && !this.moreaction.includes(item)) {
          cancelid.push(item)
        }
      })
      console.log('取消的id', cancelid)
      const ids = processaction.map(item => item.id).join()
      const names = processaction.map(item => item.personName).join()
      console.log(ids, names)
      this.$store.dispatch('getmyflagApproval', cancelid)
      this.$emit('personName', names)
      this.$emit('personIds', ids)
      this.$emit('cancelId', cancelid)
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
