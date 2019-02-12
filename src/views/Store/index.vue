<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input :placeholder="$t('Store.store')" v-model="listQuery.repositoryname" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('Store.phone')" v-model="listQuery.phone" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.stat" :placeholder="$t('Store.status')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-permission="[39]" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column :label="$t('Store.id')" prop="id" align="center" min-width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Store.name')" prop="name" min-width="120px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Store.address')" align="center" prop="address" min-width="200px">
          <template slot-scope="scope">
            <span style="word-break: keep-all;word-wrap: break-word;white-space: pre-wrap;">{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Store.managerName')" prop="managerName" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.managerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Store.employeeNum')" prop="employeeNum" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.employeeNum }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Store.phone')" prop="phone" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Store.regionName')" prop="regionName" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.regionName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Store.stat')" prop="stat" min-width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | zhuan }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="[40]" :label="$t('table.actions')" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button v-permission="[40]" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table2.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="$t('Store.addbranches')" width="40%" center lock-scroll>
      <el-form :model="categoriesform" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.longitude')">
          <el-input v-model="categoriesform.longitude"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.latitude')">
          <el-input v-model="categoriesform.latitude"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.address')">
          <el-input v-model="categoriesform.address"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.name')">
          <el-input v-model="categoriesform.name"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.phone')">
          <el-input v-model="categoriesform.phone"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.regionId')">
          <el-cascader
            :options="options"
            :props="props"
            :show-all-levels="false"
            placeholder="please search"
            filterable
            clearable
            @change="handlechange"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('Complaint.cancel') }}</el-button>
        <el-button type="primary" @click="createData">{{ $t('Complaint.ok') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible2" :title="$t('Store.editbranches')" width="40%" center lock-scroll>
      <el-form :model="categoriesform2" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.longitude')">
          <el-input v-model="categoriesform2.longitude"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.latitude')">
          <el-input v-model="categoriesform2.latitude"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.address')">
          <el-input v-model="categoriesform2.address"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.name')">
          <el-input v-model="categoriesform2.name"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.phone')">
          <el-input v-model="categoriesform2.phone"/>
        </el-form-item >
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.stat')">
          <el-select v-model="categoriesform2.stat" :placeholder="$t('table2.status')" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.manager')">
          <el-select v-model="categoriesform2.managerid" :placeholder="$t('Store.manager')" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in mangers" :key="item.id" :label="item.personName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.regionId')">
          <el-input v-model="categoriesform2.regionName" disabled/>
        </el-form-item >
        <el-form-item :label-width="formLabelWidth" :label="$t('Store.regionId')">
          <el-cascader
            :options="options2"
            :props="props"
            :show-all-levels="false"
            placeholder="please search"
            filterable
            clearable
            @change="handlechange2"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">{{ $t('Complaint.cancel') }}</el-button>
        <el-button type="primary" @click="updateData">{{ $t('Complaint.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getstatByToken } from '@/api/login'
import { getrepositorylist, addrepository, getremplist, updaterepository } from '@/api/store'
import { editarea } from '@/api/employee'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 1, display_name: 'open' },
  { key: 2, display_name: 'close' }
]

export default {
  name: 'Index',
  components: { Pagination },
  directives: { waves, permission },
  filters: {
    zhuan: function(val) {
      if (val === 1) {
        return 'open'
      } else if (val === 2) {
        return 'close'
      }
    }
  },
  data() {
    return {
      categoriesform: {
        longitude: '',
        latitude: '',
        address: '',
        phone: '',
        stat: '',
        managerid: '',
        regionId: '',
        name: ''
      },
      categoriesform2: {
        longitude: '',
        latitude: '',
        address: '',
        phone: '',
        stat: '',
        managerid: '',
        regionId: '',
        repositoryname: '',
        regionName: '',
        repositoryid: ''
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        phone: '',
        stat: '',
        managername: '',
        repositoryname: ''
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogStatus: '',
      options: [],
      options2: [],
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false,
      centerDialogVisible: false,
      calendarTypeOptions,
      mangers: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    // 列表渲染
    getList() {
      this.listLoading = true
      getrepositorylist(this.listQuery).then(response => {
        this.list = response.data.data.content.list
        this.total = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      getstatByToken(this.$store.getters.token).then(res => {
        console.log(res.data.data.content)
        if (res.data.data.content !== true) {
          this.$alert('该账号在其他设备登录', '登出', {
            confirmButtonText: '确定',
            callback: action => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            }
          })
        }
      })
    },
    // 列表搜索
    handleFilter() {
      this.listQuery.pagenum = 1
      this.getList()
    },
    // 列表删除
    restform() {
      this.categoriesform = {
        longitude: '',
        latitude: '',
        address: '',
        phone: '',
        stat: '',
        managerid: '',
        regionId: '',
        name: ''
      }
    },
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 商品分类添加
    handleCreate() {
      this.restform()
      this.dialogFormVisible = true
      editarea().then(res => {
        this.options = this.tranKTree(res.data.data.content)
      })
    },
    handlechange(val) {
      this.categoriesform.regionId = val[val.length - 1]
    },
    createData() {
      console.log(this.categoriesform)
      addrepository(this.categoriesform).then(res => {
        if (res.data.ret) {
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: 'successful',
            message: 'successful',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 列表修改
    handleUpdate(row) {
      console.log(row)
      this.categoriesform2 = Object.assign({}, row) // copy obj
      this.dialogFormVisible2 = true
      editarea().then(res => {
        this.options2 = this.tranKTree(res.data.data.content)
      })
      getremplist(row).then(res => {
        this.mangers = res.data.data.content.list
      })
    },
    handlechange2(val) {
      this.categoriesform2.regionId = val[val.length - 1]
    },
    updateData() {
      console.log(this.categoriesform2)
      const tempData = Object.assign({}, this.categoriesform2)
      updaterepository(tempData).then(res => {
        if (res.data.ret === 200) {
          this.getList()
          this.dialogFormVisible2 = false
          this.$notify({
            title: 'successful',
            message: 'successful',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 23px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .tab-container{
    margin: 30px;
  }
  .app-container{
    padding: 0px;
  }
  .tap-container1{
    margin-left: 20px;
  }
  .filter-container{
    margin-left: 20px;
  }
  .el-tabs__header is-top{
    padding-left: 20px;
  }
</style>
