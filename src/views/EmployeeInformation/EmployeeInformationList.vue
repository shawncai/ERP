<template>
  <div class="ERP-container">
    <div class="filter-container">
      <el-input v-model="getemplist.employeename" :placeholder="$t('NewEmployeeInformation.employeename')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.jobnumber" :placeholder="$t('NewEmployeeInformation.jobnumber2')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-date-picker
        v-model="getemplist.time"
        type="date"
        class="filter-item"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"/>
      <el-select v-model="getemplist.stat" :value="getemplist.stat" :placeholder="$t('NewEmployeeInformation.status')" class="filter-item" clearable>
        <el-option label="在职" value="1"/>
        <el-option label="离职" value="2"/>
      </el-select>
      <el-popover
        placement="bottom"
        width="500"
        trigger="click">
        <el-cascader
          :options="regions"
          :props="props"
          v-model="getemplistregions"
          :show-all-levels="false"
          placeholder="请选择区域"
          change-on-select
          filterable
          clearable
          style="width: 40%;float: left;margin-left: 20px"
          @change="handlechange4"
        />
        <el-select v-model="getemplist.repositoryid" placeholder="请选择门店" clearable filterable style="width: 40%;float: right;margin-right: 20px">
          <el-option
            v-for="(item, index) in repositories"
            :key="index"
            :label="item.repositoryName"
            :value="item.id"/>
        </el-select>
        <el-select v-model="getemplist.postid" :value="getemplist.postid" :placeholder="$t('NewEmployeeInformation.postid2')" class="filter-item" clearable style="width: 40%;float: left;margin-top: 10px;margin-left: 20px">
          <el-option label="xxx" value="1"/>
          <el-option label="xxx" value="2"/>
        </el-select>
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
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item style="text-align: left" command="disable"><svg-icon icon-class="tingyong" style="width: 40px"/>{{ $t('public.disable') }}</el-dropdown-item>
          <el-dropdown-item style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-waves class="filter-item" type="primary" style="width: 100px" @click="handleContract">{{ $t('public.contract') }}</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <el-button v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </div>
    <div class="app-container">
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
        <el-table-column :label="$t('NewEmployeeInformation.id')" :resizable="false" prop="id" align="center" width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.jobNumber')" :resizable="false" prop="jobNumber" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.jobNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.account')" :resizable="false" prop="account" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.name')" :resizable="false" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.firstName }} {{ scope.row.middleName }} {{ scope.row.lastName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.gender')" :resizable="false" prop="gender" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.gender | genderFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.birthday')" :resizable="false" prop="birthday" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.email')" :resizable="false" prop="email" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.postName')" :resizable="false" prop="postName" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.postName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.deptName')" :resizable="false" prop="deptName" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.regionName')" :resizable="false" prop="regionName" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.regionName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.repositoryName')" :resizable="false" prop="repositoryName" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.createTime')" :resizable="false" prop="createTime" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.dimissionTime')" :resizable="false" prop="dimissionTime" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.dimissionTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('NewEmployeeInformation.stat')" :resizable="false" prop="stat" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | statFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-if="scope.row.stat === 1" size="mini" type="warning" @click="handleDisable(scope.row)">{{ $t('public.disable') }}</el-button>
            <el-button v-if="scope.row.stat === 2" size="mini" type="success" @click="handleEnable(scope.row)">{{ $t('public.enable') }}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <el-dialog :visible.sync="editVisible" top="10px" title="修改员工">
        <!--个人信息-->
        <h2 ref="geren" class="form-name">个人信息</h2>
        <div class="container">
          <el-form ref="editAllData" :model="editAllData" :rules="editAllDataRules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
            <el-form-item :label="$t('NewEmployeeInformation.account')" style="width: 40%;margin-top:1%">
              <el-input v-model="editAllData.account" :disabled="true" placeholder="请输入账号名"/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.password')" prop="password" style="width: 40%;margin-top:1%">
              <el-input v-model="editAllData.password" placeholder="请输入密码" autocomplete="new-password" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.lastname')" prop="firstName" style="width: 40%">
              <el-input v-model="editAllData.firstName" placeholder="请输入姓氏" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.middlename')" style="width: 40%">
              <el-input v-model="editAllData.middleName" placeholder="请输入中间名" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.firstname')" prop="lastName" style="width: 40%;">
              <el-input v-model="editAllData.lastName" placeholder="请输入名" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.birthday')" style="width: 40%">
              <el-date-picker
                v-model="editAllData.birthday"
                type="date"
                placeholder="选择生日"
                value-format="yyyy-MM-dd"
                clearable
                style="width: 100%"/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.email')" prop="email" style="width: 40%">
              <el-input v-model="editAllData.email" placeholder="请输入邮箱地址" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.gender')" prop="gender" style="width: 40%">
              <el-radio-group v-model="editAllData.gender" style="width: 80%">
                <el-radio :label="1" style="width: 50%">{{ $t('NewEmployeeInformation.male') }}</el-radio>
                <el-radio :label="2">{{ $t('NewEmployeeInformation.female') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.certificatetype')" style="width: 40%">
              <el-select v-model="editAllData.certificateType" placeholder="请选择证件类型" style="width: 100%;">
                <el-option label="类型1" value="1"/>
                <el-option label="类型2" value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.certificatenumber')" style="width: 40%">
              <el-input v-model="editAllData.certificateNumber" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.country')" style="width: 40%">
              <el-input v-model="editAllData.countryName" :disabled="true" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.editcountry')" style="width: 40%">
              <el-select v-model="editAllData.countryid" placeholder="请选择国籍" style="width: 100%;" @change ="handlechange">
                <el-option
                  v-for="(item, index) in nations"
                  :key="index"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <!--联系信息-->
        <h2 ref="lianxi" class="form-name">联系信息</h2>
        <div class="container">
          <el-form ref="editAllData2" :model="editAllData" :rules="editAllDataRules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
            <el-form-item :label="$t('NewEmployeeInformation.address')" prop="address" style="width: 40%;margin-top:1%">
              <el-input v-model="editAllData.address" placeholder="请输入地址" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.phone')" prop="phone" style="width: 40%;margin-top:1%">
              <el-input v-model.number="editAllData.phone" placeholder="请输入手机号" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.provinceid')" style="width: 40%;margin-top: 1%">
              <el-input v-model="editAllData.provinceName" :disabled="true" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.editprovinceid')" style="width: 40%;margin-top: 1%">
              <el-select v-model="provinceid" placeholder="请选择省" style="width: 100%;" @change="handlechange2">
                <el-option
                  v-for="(item, index) in provinces"
                  :key="index"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.cityid')" style="width: 40%;margin-top: 1%">
              <el-input v-model="editAllData.cityName" :disabled="true" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.editcityid')" style="width: 40%;margin-top: 1%">
              <el-select v-model="cityid" placeholder="请选择市" style="width: 100%;">
                <el-option
                  v-for="(item, index) in cities"
                  :key="index"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <!--公司信息-->
        <h2 class="form-name">公司信息</h2>
        <div class="container">
          <el-form ref="editAllData3" :model="editAllData" :rules="editAllDataRules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
            <el-form-item :label="$t('NewEmployeeInformation.jobnumber')" style="width: 40%;margin-top:1%">
              <el-input v-model.number="editAllData.jobNumber" :disabled="true" placeholder="请输入工号"/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.postid')" style="width: 40%;margin-top: 1%">
              <el-select v-model="editAllData.postId" :value="editAllData.postId" placeholder="请选择职位" style="width: 100%;">
                <el-option
                  v-for="(item, index) in jobs"
                  :key="index"
                  :label="item.categoryName"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.deptid')" prop="deptId" style="width: 40%;margin-top: 1%">
              <el-select v-model="editAllData.deptId" placeholder="请选择部门" style="width: 100%;">
                <el-option
                  v-for="(item, index) in depts2"
                  :key="index"
                  :label="item.deptName"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.regionid')" style="width: 40%;margin-top: 1%">
              <el-input v-model="editAllData.regionName" :disabled="true" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.editregionid')" style="width: 40%;margin-top: 1%">
              <el-cascader
                :options="regions2"
                :props="props2"
                v-model="regionId"
                :show-all-levels="false"
                change-on-select
                filterable
                clearable
                style="width: 100%;"
                @change="handlechange4"
              />
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.repositoryid')" style="width: 40%;margin-top: 1%">
              <el-input v-model="editAllData.repositoryName" :disabled="true" clearable/>
            </el-form-item>
            <el-form-item :label="$t('NewEmployeeInformation.editrepositoryid')" style="width: 40%;margin-top: 1%">
              <el-select v-model="repositoryid2" filterable style="width: 100%;">
                <el-option
                  v-for="(item, index) in repositories2"
                  :key="index"
                  :label="item.repositoryName"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="buttons" style="margin-top: 20px;margin-left: 30px">
          <el-button type="primary" @click="handleEditok()">修改</el-button>
          <el-button type="danger" @click="handlecancel()">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { searchRepository, regionlist, getcountrylist, getprovincelist, getcitylist } from '@/api/public'
import { getdeptlist, getemplist, startorendemp, deleteemp, getempinfo, updateemp, searchEmpCategory } from '@/api/EmployeeInformation'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'EmployeeInformationList',
  directives: { waves },
  components: { Pagination },
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
      // 职位搜索时参数
      jobCat: {
        type: 2,
        pagenum: 1,
        pagesize: 9999
      },
      // 职位列表
      jobs: [],
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
      }
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      // 员工列表数据
      this.listLoading = true
      getemplist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
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
      // 区域数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
          this.regions2 = this.tranKTree(res.data.data.content)
        } else {
          console.log('区域出错')
        }
      })
      // 职位列表数据
      searchEmpCategory(this.jobCat).then(res => {
        if (res.data.ret === 200) {
          this.jobs = res.data.data.content.list
        } else {
          console.log('职位列表出错')
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
    // 修改操作
    handleEdit(row) {
      console.log(row)
      getempinfo(row.id).then(res => {
        console.log(res)
        const emData = res.data.data.content
        this.editVisible = true
        this.editAllData = Object.assign({}, emData)
        this.editAllData.certificateType = String(emData.certificateType)
      })
    },
    // 提交修改
    handleEditok() {
      this.$refs.editAllData.validate((valid) => {
        if (valid) {
          this.$refs.editAllData2.validate((valid) => {
            if (valid) {
              this.$refs.editAllData3.validate((valid) => {
                if (valid) {
                  this.editAllData.regionId = this.regionId[this.regionId.length - 1]
                  console.log(this.repositoryid2)
                  if (this.repositoryid2 === '') {
                    console.log(123)
                    this.editAllData.repositoryid2 = 0
                    this.editAllData.provinceid = this.provinceid
                    this.editAllData.cityid = this.cityid
                    updateemp(this.editAllData).then(res => {
                      if (res.data.ret === 200) {
                        this.$notify({
                          title: '操作成功',
                          message: '操作成功',
                          type: 'success',
                          duration: 1000,
                          offset: 100
                        })
                        this.$refs.editAllData.clearValidate()
                        this.$refs.editAllData2.clearValidate()
                        this.$refs.editAllData3.clearValidate()
                        this.$refs.editAllData.resetFields()
                        this.$refs.editAllData2.resetFields()
                        this.$refs.editAllData3.resetFields()
                        this.getlist()
                        this.editVisible = false
                      } else {
                        this.$notify.error({
                          title: '错误',
                          message: '出错了',
                          offset: 100
                        })
                      }
                    })
                  } else {
                    this.editAllData.repositoryid2 = this.repositoryid2
                    this.editAllData.provinceid = this.provinceid
                    this.editAllData.cityid = this.cityid
                    updateemp(this.editAllData).then(res => {
                      if (res.data.ret === 200) {
                        this.$notify({
                          title: '操作成功',
                          message: '操作成功',
                          type: 'success',
                          duration: 1000,
                          offset: 100
                        })
                        this.$refs.editAllData.clearValidate()
                        this.$refs.editAllData2.clearValidate()
                        this.$refs.editAllData3.clearValidate()
                        this.$refs.editAllData.resetFields()
                        this.$refs.editAllData2.resetFields()
                        this.$refs.editAllData3.resetFields()
                        this.getlist()
                        this.editVisible = false
                      } else {
                        this.$notify.error({
                          title: '错误',
                          message: '出错了',
                          offset: 100
                        })
                      }
                    })
                  }
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: '信息未填完整',
                    offset: 100
                  })
                  return false
                }
              })
            } else {
              this.$notify.error({
                title: '错误',
                message: '信息未填完整',
                offset: 100
              })
              return false
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
            offset: 100
          })
          return false
        }
      })
    },
    // 取消按钮
    handlecancel() {
      this.$refs.editAllData.clearValidate()
      this.$refs.editAllData2.clearValidate()
      this.$refs.editAllData3.clearValidate()
      this.$refs.editAllData.resetFields()
      this.$refs.editAllData2.resetFields()
      this.$refs.editAllData3.resetFields()
      this.editVisible = false
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
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
          deleteemp(ids).then(res => {
            if (res.data.ret === 200) {
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
        deleteemp(row.id).then(res => {
          if (res.data.ret === 200) {
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
      this.getemplist.regionid = this.getemplistregions[this.getemplistregions.length - 1]
      console.log(this.getemplist)
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
      console.log(123)
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
    handlechange4(val) {
      const finalid = val[val.length - 1]
      searchRepository(finalid).then(res => {
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
