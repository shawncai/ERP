<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input :placeholder="$t('employee.name')" v-model="listQuery.personname" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.repositoryid2" :placeholder="$t('employee.store')" clearable class="filter-item" style="width: 130px" filterable>
        <el-option v-for="(item, index) in storelist" :key="index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-select v-model="listQuery.stat" :placeholder="$t('employee.stat')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.name" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.regionid2" :placeholder="$t('employee.area')" clearable class="filter-item" style="width: 130px" filterable>
        <el-option v-for="(item, index) in arealist" :key="index" :label="item.regionName" :value="item.id"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-permission="[45]" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
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
        <el-table-column :label="$t('employee.Jobnumber')" prop="id" align="center" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.personName')" prop="personName" min-width="150px" align="center">
          <template slot-scope="scope">
            <span style="word-break: keep-all;word-wrap: break-word;white-space: pre-wrap;">{{ scope.row.personName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.repositoryName')" align="center" prop="repositoryName" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.userName')" prop="userName" min-width="120px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.birthday')" prop="birthday" min-width="70px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.gender')" prop="gender" min-width="80px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gender | sex }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.createTime')" prop="createTime" min-width="90px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('employee.roleName')" prop="roleName" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column> <el-table-column :label="$t('employee.stat')" prop="stat" min-width="80px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | stat }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="[46, 47]" :label="$t('table.actions')" align="center" min-width="150">
          <template slot-scope="scope">
            <el-button v-permission="[47]" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table2.edit') }}</el-button>
            <el-button v-permission="[46]" size="mini" type="warning" @click="handledetail(scope.row)">{{ $t('client.seen') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="$t('employee.editemployee')" width="90%" center lock-scroll top="20px">
      <el-form :model="form" style="width: 400px; margin-left:50px;">
        <el-form-item :label-width="formLabelWidth" :label="$t('employee.loginaccount')">
          <el-input v-model="form.userName" :disabled="true"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('employee.ChangePassword')">
          <el-input v-model="form.password"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('employee.personName')">
          <el-input v-model="form.personName"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('employee.birthday')">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            value-format="yyyy-MM-dd"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('employee.email')">
          <el-input v-model="form.email"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('employee.cellphone')">
          <el-input v-model="form.phoneNumber"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('employee.affiliatedarea')">
          <el-input v-model="form.regionName" :disabled="true"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('employee.changearea')">
          <el-cascader
            :options="options"
            :props="props"
            :show-all-levels="false"
            placeholder="please search"
            change-on-select
            filterable
            clearable
            @change="handlechange"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('employee.changebranch')">
          <el-select v-model="form.repositoryId" :placeholder="$t('employee.store')" clearable class="filter-item" style="width: 130px" filterable>
            <el-option v-for="item in storelist2" ref="reflabel" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('employee.changeposition')">
          <el-select v-model="form.roleId" :placeholder="$t('employee.stat')" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in roleslist" :key="item.id" :label="item.roleName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('employee.changestatus')">
          <el-select v-model="form.stat" :placeholder="$t('employee.stat')" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.name" :value="item.key"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('employee.cancel') }}</el-button>
        <el-button type="primary" @click="updateData()">{{ $t('employee.ok') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible2" :title="$t('employee.addemployees')" width="90%" center lock-scroll top="20px">
      <el-row style="margin-top: 15px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('employee.Employeeinformation') }}</span>
          </div>
          <el-form :model="addform" style="width: 400px; ">
            <el-form-item :label-width="formLabelWidth" :label="$t('employee.loginaccount')">
              <el-input v-model="addform.username"/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" :label="$t('employee.password')">
              <el-input v-model="addform.passwd"/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" :label="$t('employee.personName')">
              <el-input v-model="addform.personname"/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" :label="$t('employee.birthday')">
              <el-date-picker
                v-model="addform.birthday"
                type="date"
                value-format="yyyy-MM-dd"/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" :label="$t('employee.gender')">
              <el-radio v-model="addform.gender" label="1">{{ $t('employee.male') }}</el-radio>
              <el-radio v-model="addform.gender" label="2">{{ $t('employee.female') }}</el-radio>
            </el-form-item >
            <el-form-item :label-width="formLabelWidth" :label="$t('employee.email')">
              <el-input v-model="addform.email"/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" :label="$t('employee.cellphone')">
              <el-input v-model="addform.phone"/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" :label="$t('employee.area')">
              <el-cascader
                :options="options"
                :props="props"
                :show-all-levels="false"
                placeholder="please search"
                change-on-select
                filterable
                clearable
                @change="handlechange2"
              />
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" :label="$t('employee.Selectbranch')">
              <el-select v-model="addform.repositoryid" :placeholder="$t('employee.store')" clearable class="filter-item" style="width: 130px" filterable>
                <el-option v-for="item in storelist2" ref="reflabel" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </el-row>
      <el-row style="margin-top: 15px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('employee.Scopeofauthority') }}</span>
          </div>
          <div style="margin-bottom:10px;">
            <el-col :span="6" >
              <el-radio v-model="addform.roleid" label="1">ADMIN</el-radio>
            </el-col>
            <el-col :span="6" >
              <el-radio v-model="addform.roleid" label="2">AREA MANAGER</el-radio>
            </el-col>
            <el-col :span="6" >
              <el-radio v-model="addform.roleid" label="3">BRANCH MANAGER</el-radio>
            </el-col>
            <el-col :span="6" >
              <el-radio v-model="addform.roleid" label="4">DEPARTMENT MANAGER</el-radio>
            </el-col>
            <el-col :span="6" >
              <el-radio v-model="addform.roleid" label="5">TEAM LEADER</el-radio>
            </el-col>
            <el-col :span="6" >
              <el-radio v-model="addform.roleid" label="6">SECRETARY</el-radio>
            </el-col>
            <el-col :span="6" >
              <el-radio v-model="addform.roleid" label="7">CASHIER</el-radio>
            </el-col>
            <el-col :span="6" >
              <el-radio v-model="addform.roleid" label="8">M.O</el-radio>
            </el-col>
            <el-col :span="6" >
              <el-radio v-model="addform.roleid" label="9">SALES REP</el-radio>
            </el-col>
            <el-col :span="6" >
              <el-radio v-model="addform.roleid" label="10">TECHICIAN</el-radio>
            </el-col>
            <el-col :span="6" >
              <el-radio v-model="addform.roleid" label="11">TRAINER</el-radio>
            </el-col>
            <el-col :span="6" >
              <el-radio v-model="addform.roleid" label="12">DEPATMENT STAFF</el-radio>
            </el-col>
          </div>
        </el-card>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">{{ $t('employee.cancel') }}</el-button>
        <el-button type="primary" @click="addemploy">{{ $t('employee.ok') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormVisible3"
      :model="details"
      :title="$t('employee.employeedetail')"
      width="90%"
      center
      top="60px"
      lock-scroll>
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('employee.employeeinfo') }}</span>
            <el-button style="float: right; padding: 3px 0;color: #f56c6c" type="text" @click="trajectory(details.id)">{{ $t('employee.employeetracks') }}</el-button>
          </div>
          <div style="margin-bottom:10px;">
            <el-row>
              <el-col :span="6" >
                <div class="text">{{ $t('employee.employeenumber') }}：{{ details.id }}</div>
              </el-col>
              <el-col :span="6" >
                <div class="text">{{ $t('employee.personName') }}：{{ details.personName }}</div>
              </el-col>
              <el-col :span="6" >
                <div class="text">{{ $t('employee.contactnumber') }}：{{ details.phoneNumber }}</div>
              </el-col>
              <el-col :span="6" >
                <div class="text">{{ $t('employee.dateemployed') }}：{{ details.createTime }}</div>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
              <el-col :span="6" >
                <div class="text">{{ $t('employee.roleName') }}：{{ details.roleName }}</div>
              </el-col>
              <el-col :span="6" >
                <div class="text">{{ $t('employee.stat') }}：{{ details.stat | stat }}</div>
              </el-col>
              <el-col :span="6" >
                <div class="text">{{ $t('employee.affiliatedarea') }}：{{ details.regionName }}</div>
              </el-col>
              <el-col :span="6" >
                <div class="text">{{ $t('employee.account') }}：{{ details.userName }}</div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-row>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormVisible4"
      :model="guji"
      :title="$t('repair.Employeetracks')"
      width="90%"
      center
      top="20px"
      lock-scroll
      append-to-body>
      <div class="filter-container">
        <el-date-picker
          v-model="guijidate"
          :placeholder="$t('client.dayseach')"
          class="filter-item"
          value-format="yyyy-MM-dd"
          type="date"/>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilterguiji">{{ $t('table.search') }}</el-button>
      </div>
      <div >
        <div id="map_canvas2" style="height: 850px; width: 100%"/>
      </div>
      <el-row>
        <code>{{ $t('repair.dingdan') }}</code>
        <el-table
          :data="moredata"
          border
          style="width: 100%">
          <el-table-column
            :label="$t('Complaint.OrderNumber')"
            prop="code"
            min-width="150px"
            align="center"/>
          <el-table-column
            :label="$t('Store.address')"
            prop="address"
            min-width="150px"
            align="center"/>
          <el-table-column
            :label="$t('repair.Warrantytime')"
            prop="createTime"
            min-width="150px"
            align="center"/>
          <el-table-column :label="$t('repair.OrderStatus')" prop="stat" min-width="150px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.stat }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="margin-top: 20px;">
        <code>{{ $t('route.Offline-task') }}</code>
        <el-table
          :data="moredata2"
          border
          style="width: 100%">
          <el-table-column
            :label="$t('Complaint.OrderNumber')"
            prop="code"
            min-width="150px"
            align="center"/>
          <el-table-column
            :label="$t('repair.taskname')"
            prop="taskName"
            min-width="150px"
            align="center"/>
          <el-table-column
            :label="$t('repair.taskaddress')"
            prop="taskAddress"
            min-width="150px"
            align="center"/>
          <el-table-column :label="$t('repair.taskcontent')" prop="taskContent" min-width="150px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.taskContent }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { allstore, allarea, editemployee, editarea, getrepositorylist, getrolelist, updateemprepository, addemp, searchemployeelist, gettasklistbyday, employeelist } from '@/api/employee'
import { getpositionbydate } from '@/api/map'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 1, name: 'in service' },
  { key: 2, name: 'separated' }
]

export default {
  name: 'EmployeeList',
  components: { Pagination },
  directives: { waves, permission },
  filters: {
    sex: function(val) {
      if (val === 1) {
        return 'male'
      } else if (val === 2) {
        return 'female'
      }
    },
    stat: function(val) {
      if (val === 1) {
        return 'in service'
      } else if (val === 2) {
        return 'separated'
      }
    }
  },
  data() {
    return {
      categoriesform: {
        categoryCode: '',
        categoryName: '',
        createrId: 1,
        id: ''
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        repositoryid: this.$store.getters.repositoryid,
        repositoryid2: '',
        roleid: '',
        personname: '',
        stat: '',
        regionid: this.$store.getters.regionid,
        regionid2: ''
      },
      listQuery2: {
        pagenum: 1,
        pagesize: 10,
        repositoryid: '',
        roleid: '',
        personname: '',
        stat: '',
        regionid: '',
      },
      dialogFormVisible: false,
      dialogStatus: '',
      options: [],
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      formLabelWidth: '160px',
      dialogImageUrl: '',
      dialogVisible: false,
      dialogFormVisible2: false,
      centerDialogVisible: false,
      storelist: [],
      storelist2: [],
      arealist: [],
      calendarTypeOptions,
      form: {
        userName: '',
        password: '',
        personName: '',
        birthday: '',
        email: '',
        phoneNumber: '',
        regionName: '',
        regionId: '',
        repositoryName: '',
        repositoryId: '',
        roleName: '',
        stat: '',
        roleId: ''
      },
      addform: {
        username: '',
        passwd: '',
        email: '',
        phone: '',
        gender: '',
        repositoryid: '',
        roleid: '',
        birthday: '',
        personname: '',
        regionid: ''
      },
      regionIds: [],
      roleslist: '',
      dialogFormVisible3: false,
      details: {
        id: '',
        personName: '',
        phoneNumber: '',
        createTime: '',
        roleName: '',
        stat: '',
        regionName: '',
        userName: ''
      },
      dialogFormVisible4: false,
      guji: '',
      show: false,
      center: { lng: 122.3843288, lat: 11.4574355 },
      markers: [],
      road: [],
      position: {},
      websock: null,
      guijidate: '',
      fuzhi: null,
      moredata: [],
      moredata2: []
    }
  },
  created() {
    this.getList()
    this.getAllStores()
  },
  methods: {
    checkPermission,
    // 列表渲染
    getList() {
      this.listLoading = true
        employeelist(this.listQuery).then(response => {
          this.list = response.data.data.content.list
          this.total = response.data.data.content.totalCount
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 100)
        })
    },
    getAllStores() {
      const repositoryid2 = this.$store.getters.repositoryid
      const regionid2 = this.$store.getters.regionid
      allstore(repositoryid2, regionid2).then(res => {
        this.storelist = res.data.data.content
      })
      allarea(repositoryid2, regionid2).then(res => {
        this.arealist = res.data.data.content
      })
    },
    // 列表搜索
    handleFilter() {
      this.listLoading = true
      this.listQuery.pagenum = 1
      console.log(this.listQuery.regionid)
      if (this.listQuery.regionid2 === '' ) {
        if (this.listQuery.repositoryid2 === '') {
          this.listQuery.repositoryid = this.$store.getters.repositoryid
          employeelist(this.listQuery).then(res => {
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 100)
          })
        } else {
          this.listQuery.repositoryid = this.listQuery.repositoryid2
          employeelist(this.listQuery).then(res => {
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 100)
          })
        }
      } else {
        if (this.listQuery.repositoryid2 === '') {
          this.listQuery.repositoryid = this.$store.getters.repositoryid
          employeelist(this.listQuery).then(res => {
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 100)
          })
        } else {
          this.listQuery.repositoryid = this.listQuery.repositoryid2
          employeelist(this.listQuery).then(res => {
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 100)
          })
        }
      }

    },
    // 列表详情
    handledetail(row) {
      editemployee(row).then(res => {
        this.details = res.data.data.content
      })
      this.dialogFormVisible3 = true
    },
    // 商品分类添加
    handleCreate() {
      this.dialogFormVisible2 = true
      editarea().then(res => {
        this.options = this.tranKTree(res.data.data.content)
      })
    },
    addemploy() {
      addemp(this.addform).then(() => {
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
    handlechange2(val) {
      this.addform.regionid = val[val.length - 1]
      getrepositorylist(this.addform.regionid).then(res => {
        this.storelist2 = res.data.data.content.list
      })
    },
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 列表修改
    handleUpdate(row) {
      console.log(row)
      editemployee(row).then(res => {
        this.form = res.data.data.content
        this.form.repositoryId = ''
      })
      this.dialogFormVisible = true
      editarea().then(res => {
        this.options = this.tranKTree(res.data.data.content)
      })
      getrolelist().then(res => {
        this.roleslist = res.data.data.content
      })
    },
    handlechange(val) {
      this.form.regionId = val[val.length - 1]
      console.log(val)
      getrepositorylist(this.form.regionId).then(res => {
        this.storelist2 = res.data.data.content.list
      })
    },
    updateData() {
      const tempData = Object.assign({}, this.form)
      updateemprepository(tempData).then(() => {
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
    trajectory(val) {
      this.dialogFormVisible4 = true
      this.fuzhi = val
      this.getmapdata(val)
      gettasklistbyday(val, this.guijidate).then(res => {
        this.moredata = res.data.data.serviceOrder
        this.moredata2 = res.data.data.TaskOffline
      })
      this.mapBuild() // 初始化实例之后调用
    },
    handleFilterguiji() {
      console.log(this.fuzhi)
      this.getmapdata(this.fuzhi, this.guijidate)
      gettasklistbyday(this.fuzhi, this.guijidate).then(res => {
        this.moredata = res.data.data.serviceOrder
        this.moredata2 = res.data.data.TaskOffline
      })
    },
    getmapdata(val, date) {
      getpositionbydate(val, date).then(res => {
        if (res.data.data.content.length === 0) {
          this.markers = [{position:{lng: 120, lat: 11.4574355}}]
          this.mapBuild()
          this.$message('No Employee Tracks')
        } else {
          const arr = res.data.data.content
          const arrb = []
          const arrb2 = []
          arr.map(item => {
            const newobj = {}
            const position = {}
            const newobj2 = {}
            newobj2.lng = item.longitude
            newobj2.lat = item.latitude
            position.lng = item.longitude
            position.lat = item.latitude
            newobj.position = position
            newobj.createTime = item.createTime
            newobj.id = item.id
            newobj.serviceOrderId = item.serviceOrderId
            arrb.push(newobj)
            arrb2.push(newobj2)
          })
          this.markers = arrb
          this.road = arrb2
          console.log(this.markers)
          console.log(this.road)
          this.mapBuild()
        }
      })
    },
    mapBuild() {
      const zhongxin = this.markers[0].position
      // 创建地图实例，zoom是缩放比例
      const map = new google.maps.Map(document.getElementById('map_canvas2'), {
        zoom: 18,
        center: zhongxin,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      })
      console.log(this.road)
      const flightPath = new google.maps.Polyline({
        path: this.road,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      })
      flightPath.setMap(map)
      if (this.markers[0].position.lng === 120) {
        this.markers.map((item, index) => {
          // const marker = new MarkerWithLabel({
          //   position: item.position,
          //   icon: '../../../static/img/qishou.png', // 标记自定义图标
          //   draggable: false, // 不可拖动
          //   map: map, // 地图实例
          //   labelContent: item.name, // label的内容
          //   labelAnchor: new google.maps.Point(22, 0), // label的位置，可以调
          //   labelClass: 'labels', // the CSS class for the label
          //   labelStyle: { background: '#fff', padding: '5px' }
          // })
          // 自定义信息窗口
          console.log(index)
          var marker = new google.maps.Marker({
            map: map,
          })
        })
      } else {
        // 这里因为需要很多标记，所以遍历了this.markers（后端给的数据）来循环创建标记
        var labels = '123456789'
        this.markers.map((item, index) => {
          // const marker = new MarkerWithLabel({
          //   position: item.position,
          //   icon: '../../../static/img/qishou.png', // 标记自定义图标
          //   draggable: false, // 不可拖动
          //   map: map, // 地图实例
          //   labelContent: item.name, // label的内容
          //   labelAnchor: new google.maps.Point(22, 0), // label的位置，可以调
          //   labelClass: 'labels', // the CSS class for the label
          //   labelStyle: { background: '#fff', padding: '5px' }
          // })
          // 自定义信息窗口
          console.log(index)
          var marker = new google.maps.Marker({
            map: map,
            label: labels[index % labels.length],
            position: item.position
          })

          const iw = new google.maps.InfoWindow({
            content: `<div>
                          <p>门店地址： ${item.createTime}</p>
                          <p>门店名：${item.id}</p>
                        </div>` })
          // 点击信息窗口显示
          google.maps.event.addListener(marker, 'click', function(e) { iw.open(map, marker) })
        })
      }
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
