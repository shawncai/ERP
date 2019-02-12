<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input :placeholder="$t('lostUnits.username')" v-model="listQuery.userName" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('client.phone')" v-model="listQuery.phone" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
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
        <el-table-column :label="$t('client.Serialnumber')" prop="id" align="center" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('client.ueserName')" prop="userName" min-width="120px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('client.phone')" align="center" prop="phoneNumber" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('client.birthday')" prop="birthday" min-width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('client.gender')" prop="gender" min-width="80px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gender | sex }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('client.email')" prop="email" min-width="180px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('client.createTime')" prop="createTime" min-width="120px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('client.ordernum')" prop="ordernum" min-width="80px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.ordernum }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('client.isInstallment')" prop="isInstallment" min-width="80px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.isInstallment }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="[56]" :label="$t('table.actions')" align="center" min-width="90" >
          <template slot-scope="scope">
            <el-button v-permission="[56]" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('client.seen') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    </div>
    <el-dialog
      :visible.sync="dialogFormVisible"
      :model="details"
      :title="$t('client.customerdetail')"
      width="80%"
      center
      top="60px"
      lock-scroll>
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('client.customerinfo') }}</span>
            <el-button style="float: right; padding: 3px 0;" type="danger" @click="addblacklist(details.userInfo)">{{ $t('client.Blacklist') }}</el-button>
          </div>
          <div style="margin-bottom:10px;">
            <el-row>
              <el-col :span="8" >
                <div class="text">{{ $t('client.customername') }}：{{ details.userInfo.personName }}</div>
              </el-col>
              <el-col :span="8" >
                <div class="text">{{ $t('client.phonenumber') }}：{{ details.userInfo.phoneNumber }}</div>
              </el-col>
              <el-col :span="8" >
                <div class="text">{{ $t('client.gender') }}：{{ details.userInfo.gender | sex }}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
              <el-col :span="8">
                <div class="text">{{ $t('client.registerdate') }}：{{ details.userInfo.createTime }}</div>
              </el-col>
              <el-col :span="8">
                <div class="text">{{ $t('client.email2') }}：{{ details.userInfo.email }}</div>
              </el-col>
              <el-col :span="8">
                <div class="text">{{ $t('client.dateofbirth') }}：{{ details.userInfo.birthday }}</div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('repair.ServiceInfo') }}</span>
          </div>
          <el-table
            :data="details.serviceOrders.list"
            border
            style="width: 100%">
            <el-table-column
              :label="$t('client.number')"
              prop="code"
              min-width="180"/>
            <el-table-column
              :label="$t('client.addres')"
              prop="address"
              min-width="180"/>
            <el-table-column
              :label="$t('client.servicetime')"
              prop="serviceStartTime"
              min-width="180"/>
          </el-table>
        </el-card>
      </el-row>
      <el-dialog :visible.sync="dialogFormVisible2" :title="$t('client.Blacklist2')" width="45%" center lock-scroll append-to-body>
        <el-form :model="categoriesform" style="width: 400px; margin:0 auto;">
          <el-form-item :label-width="formLabelWidth" :label="$t('client.reasonofbeblacklisted')">
            <el-input v-model="categoriesform.description"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">{{ $t('client.cancel') }}</el-button>
          <el-button type="primary" @click="updateData">{{ $t('client.ok') }}</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import { addcategories } from '@/api/goods'
import { userlist, userdetailbyid, addblacklist } from '@/api/client'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CustomerManagement',
  components: { Pagination },
  directives: { waves, permission },
  filters: {
    zhuan: function(val) {
      if (val === 1) {
        return '正常'
      } else if (val === 2) {
        return '解除'
      }
    },
    sex: function(val) {
      if (val === 1) {
        return 'Male'
      } else if (val === 2) {
        return 'Female'
      }
    }
  },
  data() {
    return {
      categoriesform: {
        description: '',
        id: ''
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        userName: '',
        phone: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      options: [],
      formLabelWidth: '183px',
      dialogImageUrl: '',
      dialogVisible: false,
      centerDialogVisible: false,
      details: {
        userInfo: '',
        serviceOrders: ''
      },
      dialogFormVisible2: false
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
      userlist(this.listQuery).then(response => {
        this.list = response.data.data.content.list
        this.total = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 列表搜索
    handleFilter() {
      this.listLoading = true
      userlist(this.listQuery).then(res => {
        this.list = res.data.data.content.list
        this.total = res.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
    restform() {
      this.categoriesform = {
        categoryCode: '',
        categoryName: '',
        createrId: '',
        id: ''
      }
    },
    // 商品分类添加
    handleCreate() {
      this.restform()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      this.categoriesform.createrId = this.$store.getters.userId
      addcategories(this.categoriesform).then(() => {
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: 'successful',
          message: 'successful',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 列表修改
    handleUpdate(row) {
      userdetailbyid(row).then(res => {
        this.details = res.data.data
      })
      this.dialogFormVisible = true
    },
    addblacklist(res) {
      this.categoriesform = Object.assign({}, res)
      this.dialogFormVisible2 = true
    },
    updateData() {
      const employeeid = this.$store.getters.userId
      const userid = this.categoriesform.id
      const description = this.categoriesform.description
      addblacklist(employeeid, userid, description).then(res => {
        this.dialogFormVisible2 = false
        this.$notify({
          title: 'successful',
          message: 'successful',
          type: 'success',
          duration: 2000
        })
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
