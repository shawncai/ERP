<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="5">
            <el-form-item :label="$t('NewEmployeeInformation.employeename')">
              <el-input v-model="getemplist.employeename" :placeholder="$t('NewEmployeeInformation.employeename')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('NewEmployeeInformation.jobnumber2')">
              <el-input v-model="getemplist.jobnumber" :placeholder="$t('NewEmployeeInformation.jobnumber2')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('NewEmployeeInformation.time')">
              <el-date-picker
                v-model="getemplist.time"
                :placeholder="$t('Hmodule.xzrq')"
                type="date"
                value-format="yyyy-MM-dd"
                style="width:100%"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="click">
              <el-select v-model="getemplist.stat" :value="getemplist.stat" :placeholder="$t('NewEmployeeInformation.status')" style="width: 40%;float: left;margin-left: 20px" clearable>
                <el-option label="在职" value="1"/>
                <el-option label="离职" value="2"/>
              </el-select>
              <el-select v-model="getemplist.regionid" :value="getemplist.regionid" :placeholder="$t('NewEmployeeInformation.regionid')" style="width: 40%;float: right;margin-right: 20px" clearable>
                <el-option
                  v-for="(item, index) in regions"
                  :key="index"
                  :label="item.regionName"
                  :value="item.id"/>
              </el-select>
              <el-select v-model="getemplist.repositoryid" :placeholder="$t('Hmodule.xzmd')" clearable filterable style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
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
              <el-select v-model="getemplist.roleid" :value="getemplist.roleid" :placeholder="$t('updates.roleid')" clearable style="width: 40%;float: right;margin-top: 20px;margin-right: 20px">
                <el-option
                  v-for="(item, index) in roles"
                  :key="index"
                  :label="item.roleName"
                  :value="item.id"/>
              </el-select>
              <el-select v-model="getemplist.deptid" :placeholder="$t('NewEmployeeInformation.deptid2')" clearable style="width: 40%;float: left;margin-top: 20px;margin-left: 20px">
                <el-option
                  v-for="(item, index) in depts"
                  :key="index"
                  :label="item.deptName"
                  :value="item.id"/>
              </el-select>
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
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-2-4-9']" :disabled="selected" style="text-align: left" command="disable"><svg-icon icon-class="tingyong" style="width: 40px"/>{{ $t('public.disable') }}</el-dropdown-item>
          <el-dropdown-item v-permission="['1-2-4-2']" :disabled="selected" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-permission="['1-2-4-10']" v-waves class="filter-item" type="primary" style="width: 86px" @click="handleContract">{{ $t('public.contract') }}</el-button>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-2-4-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-2-4-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-2-4-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
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
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('NewEmployeeInformation.id')" :resizable="false" fixed="left" align="center" width="60">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.id }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="edtiForm" :detailid.sync="detailid"/>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.jobNumber')" :resizable="false" fixed="left" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.jobNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.account')" :resizable="false" fixed="left" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.name')" :resizable="false" fixed="left" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.firstName }} {{ scope.row.middleName }} {{ scope.row.lastName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.gender')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.gender | genderFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.birthday')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.email')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.postName')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.deptName')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.regionName')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.regionName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.repositoryName')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.createTime')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.dimissionTime')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.dimissionTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.stat')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | statFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission2="['1-2-4-3', scope.row.createPersonId]" title="修改" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-permission="['1-2-4-9']" v-show="scope.row.stat === 1" title="停用" size="mini" type="warning" icon="el-icon-close" circle @click="handleDisable(scope.row)"/>
            <el-button v-permission="['1-2-4-8']" v-show="scope.row.stat === 2" title="启用" size="mini" type="success" icon="el-icon-check" circle @click="handleEnable(scope.row)"/>
            <el-button v-permission="['1-2-4-2']" title="删除" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
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
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyDialog from './components/MyDialog'
import DetailList from './components/DetailList'

export default {
  name: 'EmployeeInformationList',
  directives: { waves, permission, permission2 },
  components: { DetailList, Pagination, MyDialog },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    },
    statFilter(status) {
      const statusMap = {
        1: '在职',
        2: '离职'
      }
      return statusMap[status]
    }
  },
  data() {
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        callback()
      }
    }
    return {
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
        jobnumber: ''
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
  mounted() {
    this.getlist()
    this.handlechange4()
  },
  methods: {
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
            if (regions != null) {
              for (let j = 0; j < regions.length; j++) {
                regionsName = regionsName + regions[j].regionName
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
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
      console.log(this.moreaction.length)
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
              title: '操作成功',
              message: '操作成功',
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
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteemp(ids, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: '删除成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: '错误',
                message: '出错了',
                offset: 100
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 单条删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteemp(row.id, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: '删除成功',
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: '错误',
              message: '出错了',
              offset: 100
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 单条停用
    handleDisable(row) {
      startorendemp(row.id, 2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
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
            title: '操作成功',
            message: '操作成功',
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
        searchRepository(null, this.$store.getters.repositoryId, this.$store.getters.regionId).then(res => {
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
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 24px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .ERP-container {
    margin: 0px 30px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 140px;
    margin-left: 20px;
  }
</style>
