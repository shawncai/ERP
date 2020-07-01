<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">
      <el-input v-model="getemplist.employeename" :placeholder="$t('NewEmployeeInformation.employeename')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.phonenumber" :placeholder="$t('Customer.phone2')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-date-picker
        v-model="getemplist.time"
        :placeholder="$t('NewEmployeeInformation.time')"
        type="date"
        size="small"
        value-format="yyyy-MM-dd"
        class="filter-item"/>
      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        size="small"
        trigger="click">
        <el-select v-model="getemplist.stat" :value="getemplist.stat" :placeholder="$t('NewEmployeeInformation.status')" size="small" style="width: 40%;float: left;margin-left: 20px" clearable>
          <el-option :label="$t('prompt.zz')" value="1"/>
          <el-option :label="$t('prompt.lz')" value="2"/>
        </el-select>
        <el-select v-model="getemplist.regionid" :value="getemplist.regionid" :placeholder="$t('NewEmployeeInformation.regionid')" size="small" style="width: 40%;float: right;margin-right: 20px" clearable>
          <el-option
            v-for="(item, index) in regions"
            :key="index"
            :label="item.regionName"
            :value="item.id"/>
        </el-select>
        <el-select v-model="getemplist.repositoryid" :placeholder="$t('Hmodule.xzmd')" size="small" clearable filterable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
          <el-option
            v-for="(item, index) in repositories"
            :key="index"
            :label="item.repositoryName"
            :value="item.id"/>
        </el-select>
        <!-- <el-select v-model="getemplist.postid" :value="getemplist.postid" :placeholder="$t('NewEmployeeInformation.postid2')" clearable style="width: 40%;float: right;margin-top: 20px;margin-right: 20px">
                <el-option
                  v-for="(item, index) in jobs"
                  :key="index"
                  :label="item.categoryName"
                  :value="item.id"/>
              </el-select> -->
        <el-select v-model="getemplist.roleid" :value="getemplist.roleid" :placeholder="$t('updates.roleid')" size="small" clearable style="width: 40%;float: right;margin-top: 20px;margin-right: 20px">
          <el-option
            v-for="(item, index) in roles"
            :key="index"
            :label="item.roleName"
            :value="item.id"/>
        </el-select>
        <el-select v-model="getemplist.deptid" :placeholder="$t('NewEmployeeInformation.deptid2')" size="small" clearable style="width: 40%;float: left;margin-top: 20px;margin-left: 20px">
          <el-option
            v-for="(item, index) in depts"
            :key="index"
            :label="item.deptName"
            :value="item.id"/>
        </el-select>
        <div class="seachbutton" style="width: 100%;float: right">
          <el-button v-waves size="small" class="filter-item" type="primary" style="float: right" round @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" size="small" type="primary" class="filter-item" style="width: 130px" @click="visible2 = !visible2">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <!-- 搜索按钮 -->
      <el-button v-waves size="small" class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
    </el-card>
    <el-card :body-style="	{ padding: '6px'}" class="box-card" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves size="small" class="filter-item2" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-permission="['1-2-4-9']" :disabled="selected" style="text-align: left" command="disable"><svg-icon icon-class="tingyong" style="width: 40px"/>{{ $t('public.disable') }}</el-dropdown-item>
          <el-dropdown-item v-permission="['1-2-4-2']" :disabled="selected" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-permission="['1-2-4-10']" v-waves size="small" class="filter-item2" type="primary" style="width: 110px" @click="handleContract">{{ $t('public.contract') }}</el-button>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-2-4-6']" v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 60px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-2-4-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 60px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <el-button v-permission="['1-39-46-1']" v-waves size="small" class="filter-item2" icon="el-icon-printer" @click="handleSend">{{ $t('update4.fpshb') }}</el-button>
      <el-dialog :visible.sync="categoryVisible" :title="$t('update4.fpshb')" class="normal" width="300px" center @close="closetag">
        <div style="margin: 0 auto;width: 200px; padding: 0 10px">
          <el-select v-model="packageparms" style="width: 100%">
            <el-option
              v-for="(item, index) in packageLists"
              :key="index"
              :label="item.remark"
              :value="item.id"
            />
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button :loading="sureloding" type="primary" @click="handlesendok()">{{ $t('Hmodule.sure') }}</el-button>
          <el-button :loading="sureloding" type="danger" @click="closetag()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>

      <!-- 新建操作 -->
      <el-button v-permission="['1-2-4-1']" v-waves size="small" class="filter-item2" icon="el-icon-plus" type="success" style="width: 60px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>
    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        border
        fit
        size="small"
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          min-width="30"
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('NewEmployeeInformation.id')" :resizable="false" fixed="left" align="center" min-width="50">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.id }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="edtiForm" :detailid.sync="detailid"/>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.jobNumber')" :resizable="false" align="center" min-width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.jobNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.account')" :resizable="false" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.name')" :resizable="false" align="center" min-width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.firstName }} {{ scope.row.middleName }} {{ scope.row.lastName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.gender')" :resizable="false" align="center" min-width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.gender | genderFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.postName')" :resizable="false" align="center" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.regionName')" :resizable="false" align="center" min-width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.regionName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.repositoryName')" :resizable="false" align="center" min-width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.deptName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.email')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.birthday')" :resizable="false" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.createTime')" :resizable="false" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.dimissionTime')" :resizable="false" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.dimissionTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.stat')" :resizable="false" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | statFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" fixed="right" align="center" min-width="180">
          <template slot-scope="scope">
            <el-button v-permission="['1-2-4-3']" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-permission="['1-2-4-9']" v-show="scope.row.stat === 1" title="停用" size="mini" type="warning" icon="el-icon-close" circle @click="handleDisable(scope.row)"/>
            <el-button v-permission="['1-2-4-8']" v-show="scope.row.stat === 2" title="启用" size="mini" type="success" icon="el-icon-check" circle @click="handleEnable(scope.row)"/>
            <el-button v-permission="['1-2-4-2']" :title="$t('updates.sc')" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />

      <my-dialog :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
    </el-card>
  </div>
</template>

<script>
import { searchRepository, getcountrylist, getprovincelist, getcitylist, getregionlistbyreid } from '@/api/public'
import { getdeptlist, getemplist, startorendemp, deleteemp, getempinfo, searchEmpCategory } from '@/api/EmployeeInformation'
import { getrolelist } from '@/api/employee'
import { approvalPackageList, packageToEmp } from '@/api/BasicSettings'

import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyDialog from './components/MyDialog'
import DetailList from './components/DetailList'

var _that
export default {
  name: 'EmployeeInformationList',
  directives: { waves, permission, permission2 },
  components: { DetailList, Pagination, MyDialog },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: _that.$t('prompt.nan'),
        2: _that.$t('prompt.nv')
      }
      return statusMap[status]
    },
    statFilter(status) {
      const statusMap = {
        1: _that.$t('prompt.zz'),
        2: _that.$t('prompt.lz')
      }
      return statusMap[status]
    }
  },
  data() {
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(_that.$t('prompt.sjhbnwk')))
      } else {
        callback()
      }
    }
    return {
      sureloding: false,
      packageLists: [],
      packageparms: '',
      categoryVisible: false,
      tableHeight: 200,
      // 判断是否能点击
      selected: true,
      // 详情传递id
      detailid: null,
      // 详情组件数据
      detailvisible: false,
      // 更多搜索条件问题
      visible2: false,
      // 职位搜索时参数
      jobCat: {
        type: 2,
        pagenum: 1,
        pagesize: 9999
      },
      // 职位列表
      jobs: [],
      roles: [],
      // 控制修改页面
      editVisible: false,
      // 批量操作
      moreaction: [],
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
      // 员工列表查询加展示参数
      getemplist: {
        repositoryid: '',
        regionid: '',
        postid: '',
        deptid: '',
        employeename: '',
        pagenum: 1,
        pagesize: 10,
        loginRepositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
        stat: '',
        time: '',
        jobnumber: '',
        phonenumber: ''
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
      // 修改数据
      // 国家列表
      nations: [],
      // 省列表
      provinces: [],
      // 城市列表
      cities: [],
      // 区域列表
      regions2: [],
      // 门店列表
      repositories2: [],
      // 部门列表
      depts2: [],
      // 区域列表字段更改
      props2: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 区域特殊字段
      FormRegionId: [],
      // 修改全部信息
      editAllData: {
        // 个人信息
        account: '',
        password: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthday: '',
        email: '',
        gender: '',
        certificateType: '',
        certificateNumber: '',
        countryid: '',
        // 联系信息
        address: '',
        phone: '',
        provinceId: '',
        cityid: '',
        provinceName: '',
        cityName: '',
        // 公司信息
        jobNumber: '',
        postId: '',
        deptId: '',
        regionName: '',
        repositoryName: ''
      },
      regionId: [],
      repositoryid2: '',
      provinceid: '',
      cityid: '',
      editAllDataRules: {
        // 个人信息规则数据
        password: [
          { message: '请正确输入密码长度', trigger: 'blur' },
          { min: 6, max: 100, message: '密码长度要大于6个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入员工端登陆账号', trigger: 'blur' }
        ],
        firstName: [
          { required: true, message: '请输入姓氏', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: '请输入名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        countryId: [
          { required: true, message: '请选择工作地区', trigger: 'change' }
        ],
        email: [
          { type: 'email', message: '请输入正确邮箱号', trigger: 'blur' },
          { min: 1, message: '请输入正确邮箱号', trigger: 'blur' }
        ],
        // 联系信息规则数据
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        Provinces: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        City: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        phone: [
          { required: true, validator: checkphone, trigger: 'change' }
        ],
        // 公司信息规则数据
        deptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        regionId: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ],
        Repository: [
          { required: true, message: '请选择门店', trigger: 'change' }
        ]
      },
      // 传给组件的数据
      personalForm: {},
      edtiForm: {}
    }
  },
  activated() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.getlist()
    this.handlechange4()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  created() {
    // setTimeout(() => {
    //   this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    // }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    async  handlesendok() {
      console.log('packageparms', this.packageparms)
      if (!this.packageparms) {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择审核包',
          offset: 100
        })
        return false
      }
      const filterarr = this.moreaction.filter(item => {
        return item.stat === 1
      })
      if (filterarr.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择在职员工',
          offset: 100
        })
        return false
      }
      this.sureloding = true
      const parms = this.packageparms
      const list = await Promise.all(filterarr.map(function(item) {
        return packageToEmp(item.id, parms)
      }))
      console.log('list', list)
      let j = 0
      for (const i in list) {
        if (list[i].data.ret !== 200) {
          j = 1
        }
      }

      if (j === 0) {
        this.$notify({
          title: 'successful',
          message: '分配成功',
          type: 'success',
          offset: 100
        })
        this.sureloding = false
        this.categoryVisible = false
      } else if (j === 1) {
        this.$notify.error({
          title: 'wrong',
          message: '分配失败，请再次分配',
          offset: 100
        })
        this.sureloding = false

        return false
      }

      // for (const i in filterarr) {
      //   packageToEmp(filterarr[i].id, this.packageparms).then(res => {
      //     if (res.data.ret === 200) {
      //       this.$notify({
      //         title: 'successful',
      //         message: '分配成功',
      //         type: 'success',
      //         offset: 100
      //       })
      //     }
      //     this.categoryVisible = false
      //   })
      // }
    },
    getpackagelist() {
      approvalPackageList().then(res => {
        if (res.data.ret === 200) {
          this.packageLists = res.data.data.content
        }
      })
    },
    closetag() {
      this.packageparms = ''
      this.sureloding = false
      this.categoryVisible = false
    },
    handleSend() {
      if (this.moreaction.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择员工',
          offset: 100
        })
        return false
      }
      this.getpackagelist()
      this.packageparms = ''
      this.categoryVisible = true
    },
    checkPermission,
    // 详情操作
    handleDetail(row) {
      this.detailid = row.id
      getempinfo(row.id).then(res => {
        console.log(res)
        const emData = res.data.data
        let regionsName = ''
        const regions = emData.content.regions
        console.log('regions', regions)
        if (regions != null) {
          for (let j = 0; j < regions.length; j++) {
            regionsName = regionsName + regions[j].regionName + ', '
          }
          if (regionsName.length > 0) {
            regionsName = regionsName.substr(0, regionsName.length - 2)
          }
        }
        emData.content.regionsName = regionsName

        this.detailvisible = true
        this.edtiForm = Object.assign({}, emData)
      })
    },
    getlist() {
      getrolelist().then(res => {
        if (res.data.ret === 200) {
          this.roles = res.data.data.content
        } else {
          console.log('角色列表出错')
        }
      })
      // 员工列表数据
      this.listLoading = true
      getemplist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          for (let i = 0; i < this.list.length; i++) {
            let regionsName = ''
            const regions = this.list[i].regions
            console.log('regions', regions)
            if (regions !== null) {
              for (let j = 0; j < regions.length; j++) {
                if (regions[j] !== null) {
                  regionsName = regionsName + regions[j].regionName
                } else {
                  regionsName = ''
                }
              }
            }
            this.list[i].regionsName = regionsName
          }
          console.log('this.list', this.list)
          this.total = res.data.data.content.totalCount
        } else {
          console.log('列表出错')
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 国籍列表
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        } else {
          console.log('国家列表出错')
        }
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
          this.depts2 = res.data.data.content
        } else {
          console.log('部门出错')
        }
      })
      // // 区域数据
      // regionlist().then(res => {
      //   if (res.data.ret === 200) {
      //     this.regions = this.tranKTree(res.data.data.content)
      //     this.regions2 = this.tranKTree(res.data.data.content)
      //   } else {
      //     console.log('区域出错')
      //   }
      // })
      // 职位列表数据
      searchEmpCategory(this.jobCat).then(res => {
        if (res.data.ret === 200) {
          this.jobs = res.data.data.content.list
        } else {
          console.log('职位列表出错')
        }
      })
      getregionlistbyreid(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.regions = res.data.data.content
        } else {
          console.log('区域出错')
        }
      })
    },
    // 根据国家选择省
    handlechange(val) {
      console.log(val)
      val = this.editAllData.countryId
      getprovincelist(val).then(res => {
        if (res.data.ret === 200) {
          this.provinces = res.data.data.content
        } else {
          console.log('根据国家选择省出错')
        }
      })
    },
    // 根据省选择市
    handlechange2(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities = res.data.data.content
        } else {
          console.log('根据省选择市出错')
        }
      })
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
    },
    // 修改操作
    handleEdit(row) {
      getempinfo(row.id).then(res => {
        const emData = res.data.data.content
        this.editVisible = true
        console.log('emData', emData)
        let regionsName = ''
        const regions = emData.regions
        console.log('regions', regions)
        if (regions != null) {
          for (let j = 0; j < regions.length; j++) {
            regionsName = regionsName + regions[j].regionName + ', '
          }
          if (regionsName.length > 0) {
            regionsName = regionsName.substr(0, regionsName.length - 2)
          }
        }
        emData.chargeRegions = emData.chargeRegions
        emData.chargeRegions2 = regionsName

        this.personalForm = Object.assign({}, emData)
        if (emData.certificateType !== null && emData.certificateType !== undefined && emData.certificateType !== '') {
          this.personalForm.certificateType = String(emData.certificateType)
        }
        if (emData.roleId !== null && emData.roleId !== undefined && emData.roleId !== '') {
          this.personalForm.roleId = String(emData.roleId)
        }
      })
    },
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
      // console.log(this.moreaction.length)
      if (this.moreaction.length === 0) {
        this.selected = true
      } else {
        this.selected = false
      }
    },
    // 批量停用和删除
    handleCommand(command) {
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'disable') {
        startorendemp(ids, 2).then(res => {
          if (res.data.ret === 200) {
            this.$notify({
              title: this.$t('prompt.czcg'),
              message: this.$t('prompt.czcg'),
              type: 'success',
              duration: 1000,
              offset: 100
            })
            this.getlist()
          } else {
            this.$message.error('出错了')
          }
        })
      } else if (command === 'delete') {
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deleteemp(ids, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: this.$t('prompt.sccg'),
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: 'wrong',
                message: 'wrong',
                offset: 100
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('prompt.yqxsc')
          })
        })
      }
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      }).then(() => {
        deleteemp(row.id, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: this.$t('prompt.sccg'),
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: 'wrong',
              message: 'wrong',
              offset: 100
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('prompt.yqxsc')
        })
      })
    },
    // 单条停用
    handleDisable(row) {
      startorendemp(row.id, 2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.getlist()
        } else {
          this.$message.error('出错了')
        }
      })
    },
    // 单条启用
    handleEnable(row) {
      startorendemp(row.id, 1).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
            duration: 1000,
            type: 'success',
            offset: 100
          })
          this.getlist()
        } else {
          this.$message.error('出错了')
        }
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      if (this.getemplist.deptid === '' && this.getemplist.employeename === '' && this.getemplist.jobnumber === '' && this.getemplist.postid === '' && this.getemplist.regionid === '' && this.getemplist.repositoryid === '' && this.getemplist.stat === '' && this.getemplist.time === '' || this.getemplist.time === null) {
        this.getlist()
      } else {
        getemplist(this.getemplist).then(res => {
          if (res.data.ret === 200) {
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
          } else {
            console.log('搜索出错')
          }
        })
      }
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/EmployeeInformation/NewEmployeeInformation')
    },
    // 生成合同
    handleContract() {
      if (this.moreaction.length > 1) {
        this.$message.error('只能选择单个员工')
      } else {
        this.$store.dispatch('getempcontract', this.moreaction[0])
        this.$router.push('/EmployeeInformation/NewEmployeeContract')
      }
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['编号', '工号', '员工登陆账号', '姓名', '性别', '生日', '邮箱', '职位', '所属部门', '所属区域', '所属门店', '入职时间', '离职时间', '状态']
          const filterVal = ['id', 'jobNumber', 'account', 'firstName', 'gender', 'birthday', 'email', 'postName', 'deptName', 'regionName', 'repositoryName', 'createTime', 'dimissionTime', 'stat']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '员工资料表'
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    // 打印
    handlePrint() {
      console.log(456)
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
    // 根据区域选择门店
    handlechange4() {
      console.log('this.$store.getters.repositoryId', this.$store.getters.repositoryId)
      if (this.$store.getters.repositoryId !== '' && this.$store.getters.repositoryId !== null && this.$store.getters.repositoryId !== undefined) {
        searchRepository(null, this.$store.getters.repositoryId, this.$store.getters.regionIds).then(res => {
          if (res.data.ret === 200) {
            this.repositories = res.data.data.content.list
            this.repositories2 = res.data.data.content.list
          } else {
            this.$message.error('出错了')
          }
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
.normal >>> .el-dialog__header {
    padding: 20px 20px 10px;
    background: #fff;
    position: static;
    top: auto;
    z-index: auto;
    width: auto;
    border-bottom: none;
  }
  .normal >>> .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    height: auto;
  }
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 24px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .ERP-container {
    margin-left:10px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 180px;
    margin-left: 10px;
    padding: 10px 0;
  }
  .filter-item2{
    width: 180px;
    margin-left: 5px;
    padding: 10px 0;
  }
  .box-card {
    /* border : 1px solid #f1f1ff !important; */
    border-bottom : 1px solid #f1f1ff00 !important
  }
</style>
