<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--仓库信息-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="RepositoryForm" :model="RepositoryForm" :rules="Repositoryrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Repository.repositoryName')" prop="repositoryName" style="width: 40%;margin-top:1%">
            <el-input v-model="RepositoryForm.repositoryName" placeholder="请输入门店名称" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Repository.longitude')" style="width: 40%;margin-top:1%">
            <el-input v-model.number="RepositoryForm.longitude" placeholder="请输入经度" autocomplete="new-password" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Repository.latitude')" style="width: 40%">
            <el-input v-model.number="RepositoryForm.latitude" placeholder="请输入纬度" clearable/>
          </el-form-item>
          <el-form-item :label="$t('public.address')" prop="address" style="width: 40%">
            <el-input v-model="RepositoryForm.address" placeholder="请输入详细门店地址" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Repository.regionId')" prop="regionId" style="width: 40%;margin-top: 1%">
            <el-cascader
              :options="regions"
              :props="props"
              v-model="regionId"
              :show-all-levels="false"
              placeholder="请选择区域"
              filterable
              clearable
              style="width: 100%;"
            />
          </el-form-item>
          <el-form-item :label="$t('Repository.stat')" style="width: 40%;margin-top: 1%">
            <el-radio-group v-model="RepositoryForm.stat" style="width: 80%">
              <el-radio :label="1" style="width: 50%">active</el-radio>
              <el-radio :label="2">dead</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('Repository.type')" prop="type" style="width: 40%;margin-top: 1%">
            <el-select v-model="RepositoryForm.type" :value="RepositoryForm.type" placeholder="请选择" style="width: 100%;" @change="updateType2" @focus="updateType">
              <el-option
                v-for="(item, index) in types"
                :key="index"
                :value="item.id"
                :label="item.categoryName"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="类别" prop="categoryId" style="width: 40%;margin-top: 1%">
            <el-select v-model="RepositoryForm.categoryId" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="(item, index) in types2"
                :key="index"
                :value="item.id"
                :label="item.categoryName"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Repository.managerPeople')" style="width: 40%;margin-top: 1%">
            <el-input v-model="managerPeople" :value="managerPeople" placeholder="请选择" clearable @focus="handlechoose"/>
          </el-form-item>
          <!--弹出员工列表开始-->
          <el-dialog :visible.sync="employeeVisible" top="10px" title="选择员工">
            <div class="filter-container">
              <el-input v-model="getemplist.employeename" :placeholder="$t('NewEmployeeInformation.employeename')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
              <el-input v-model="getemplist.jobnumber" :placeholder="$t('NewEmployeeInformation.jobnumber2')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
              <el-date-picker
                v-model="getemplist.time"
                type="date"
                class="filter-item"
                placeholder="选择日期"
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
              <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;" @click="handleAdd">{{ $t('public.add') }}</el-button>
            </div>
            <el-table
              v-loading="listLoading"
              :data="list"
              :key="tableKey"
              border
              fit
              highlight-current-row
              style="width: 100%"
              @current-change="handleCurrentChange">
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
            <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" style="padding: 0" @pagination="gitemplist" />
            <span slot="footer" class="dialog-footer" style="text-align: left">
              <el-button v-waves type="success" style="text-align: center;" @click="handleConfirm">确认添加</el-button>
            </span>
          </el-dialog>
          <!--弹窗员工列表结束-->
          <el-form-item :label="$t('Repository.createTime')" style="width: 40%;margin-top: 1%">
            <el-date-picker
              v-model="RepositoryForm.createTime"
              type="date"
              placeholder="选择开业时间"
              value-format="yyyy-MM-dd"
              clearable
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('Repository.regionManager')" style="width: 40%;margin-top: 1%">
            <el-input v-model="regionManagerId" :value="regionManagerId" placeholder="请选择" clearable @focus="handlechoose2"/>
          </el-form-item>
          <!--弹出员工列表开始-->
          <!--小区经理选择弹窗开始-->
          <el-dialog :visible.sync="regionManagerVisible" top="10px" title="选择员工">
            <div class="filter-container">
              <el-input v-model="getemplist.employeename" :placeholder="$t('NewEmployeeInformation.employeename')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
              <el-input v-model="getemplist.jobnumber" :placeholder="$t('NewEmployeeInformation.jobnumber2')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
              <el-date-picker
                v-model="getemplist.time"
                type="date"
                class="filter-item"
                placeholder="选择日期"
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
                  placeholder="请选择区域"
                  change-on-select
                  filterable
                  clearable
                  style="width: 40%;float: left;margin-left: 20px"
                  @change="handlechange4"
                />
                <el-select v-model="getemplist.repositoryid" placeholder="请选择门店" filterable clearable style="width: 40%;float: right;margin-right: 20px">
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
              <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;" @click="handleAdd2">{{ $t('public.add') }}</el-button>
            </div>
            <el-table
              v-loading="listLoading"
              :data="list"
              :key="tableKey"
              border
              fit
              highlight-current-row
              style="width: 100%"
              @current-change="handleCurrentChange2">
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
            <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" style="padding: 0" @pagination="gitemplist" />
            <span slot="footer" class="dialog-footer" style="text-align: left">
              <el-button v-waves type="success" style="text-align: center;" @click="handleConfirm2">确认添加</el-button>
            </span>
          </el-dialog>
          <!--小区经理选择弹窗结束-->
          <!--弹窗员工列表结束-->
          <el-form-item :label="$t('Repository.attributes')" prop="attributes" style="width: 40%;margin-top: 1%">
            <el-select v-model="RepositoryForm.attributes" :value="RepositoryForm.attributes" placeholder="请选择" clearable style="width: 100%;">
              <el-option label="只卖" value="1"/>
              <el-option label="既卖又维修" value="2"/>
              <el-option label="只存储" value="3"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Repository.countryId')" prop="countryId" style="width: 40%;margin-top: 1%">
            <el-select v-model="RepositoryForm.countryId" placeholder="请选择国家" style="width: 100%;">
              <el-option
                v-for="(item, index) in nations"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Repository.description')" style="width: 40%;margin-top:1%">
            <el-input v-model="RepositoryForm.description" type="textarea" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-permission="['1-9-10-1']" type="primary" @click="handlesave()">保存</el-button>
        <el-button v-permission="['1-9-10-1']" type="success" @click="handleentry()">继续录入</el-button>
        <el-button v-permission="['1-9-10-1']" type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getcountrylist, regionlist, searchRepository, getRegion } from '@/api/public'
import { searchRepCategory, create } from '@/api/Repository'
import { getemplist, getdeptlist } from '@/api/EmployeeInformation'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  name: 'NewRepository',
  directives: { waves, permission, permission2 },
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
  data() {
    return {
      // 类型列表
      types: [],
      types2: [],
      // 国家列表
      nations: [],
      // 区域列表
      regions: [],
      // 区域列表字段更改
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 仓库管理员回显数据
      managerPeople: '',
      // 小区经理回显数据
      regionManagerId: '',
      // 仓库基本信息数据
      RepositoryForm: {
        repositoryName: '',
        address: '',
        longitude: '',
        latitude: '',
        managerPeopleId: '',
        createTime: '',
        stat: 1,
        description: '',
        regionId: '',
        type: '',
        categoryId: '',
        regionManagerId: '',
        attributes: '',
        countryId: this.$store.getters.countryId
      },
      // 区域id
      regionId: [],
      // 仓库信息规则数据
      Repositoryrules: {
        longitude: [
          { required: true, message: '请输入经度', trigger: 'blur' },
          { type: 'number', message: '经度必须为数字值' }
        ],
        repositoryName: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' }
        ],
        regionId: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '请输入维度', trigger: 'blur' },
          { type: 'number', message: '维度必须为数字值' }
        ],
        lastname: [
          { required: true, message: '请输入名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        countryId: [
          { required: true, message: '请选择国家', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        categoryId: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        attributes: [
          { required: true, message: '请选择属性', trigger: 'change' }
        ]
      },
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
        stat: 1, loginRepositoryId: this.$store.getters.repositoryId, regionIds: this.$store.getters.regionId,
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
      employeeVisible: false,
      // 小区经理选择框控制
      regionManagerVisible: false
    }
  },
  created() {
    this.getnationlist()
    this.getRegion()
  },
  methods: {
    updateType2() {
      this.RepositoryForm.categoryId = ''
      this.types2 = []
      searchRepCategory().then(res => {
        if (res.data.ret === 200) {
          const types = res.data.data.content.list
          for (const i in types) {
            if (types[i].parentId === this.RepositoryForm.type && types[i].parentId !== null) {
              this.types2.push(types[i])
            }
          }
        }
      })
      // }
    },
    checkPermission,
    getRegion() {
      getRegion(this.$store.getters.regionId).then(res => {
        if (res.data.ret === 200) {
          if (res.data.data.content.zcc !== null && res.data.data.content.zcc !== '' && res.data.data.content.zcc !== undefined) {
            const zhuz = res.data.data.content.zcc.split(',')
            this.regionId = zhuz.map(function(item) {
              return parseInt(item)
            })
          }
        }
      })
    },
    // 国籍列表
    getnationlist() {
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        } else {
          console.log('国籍列表出错')
        }
      })
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        } else {
          console.log('区域列表数据出错')
        }
      })
      // 仓库类型
      searchRepCategory().then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
          for (let i = 0; i < this.types.length; i++) {
            if (this.types[i].parentId !== null && this.types[i].parentId !== '') {
              this.types.splice(i, 1)
            }
          }
        } else {
          console.log('仓库类型数据出错')
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
    restAllForm() {
      this.RepositoryForm = {
        repositoryName: '',
        address: '',
        longitude: '',
        latitude: '',
        managerPeopleId: '',
        createTime: '',
        stat: 1,
        description: '',
        regionId: '',
        type: '',
        categoryId: '',
        regionManagerId: '',
        attributes: '',
        countryId: this.$store.getters.countryId
      }
      // 仓库管理员回显数据
      this.managerPeople = ''
      // 小区经理回显数据
      this.regionManagerId = ''
    },
    // 保存操作
    handlesave() {
      this.RepositoryForm.regionId = this.regionId[this.regionId.length - 1]
      this.$refs.RepositoryForm.validate((valid) => {
        if (valid) {
          create(this.RepositoryForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$router.go(-1)
              this.$refs.RepositoryForm.clearValidate()
              this.$refs.RepositoryForm.resetFields()
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
            offset: 100
          })
          const anchor4 = this.$refs.geren.offsetTop
          document.documentElement.scrollTop = anchor4 - 100
          return false
        }
      })
    },
    // 继续录入
    handleentry() {
      this.RepositoryForm.regionId = this.regionId[this.regionId.length - 1]
      this.$refs.RepositoryForm.validate((valid) => {
        if (valid) {
          create(this.RepositoryForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.RepositoryForm.clearValidate()
              this.$refs.RepositoryForm.resetFields()
              const anchor2 = this.$refs.geren.offsetTop
              document.documentElement.scrollTop = anchor2 - 100
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg,
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
            offset: 100
          })
          const anchor3 = this.$refs.geren.offsetTop
          document.documentElement.scrollTop = anchor3 - 100
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Repository/NewRepository', name: 'NewRepository', fullPath: '/Repository/NewRepository', title: 'NewRepository' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 仓库管理员选择开始
    gitemplist() {
      // 员工列表数据
      this.listLoading = true
      console.log(this.getemplist)
      getemplist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          console.log('员工列表数据出错')
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
          console.log('部门列表数据出错')
        }
      })
      // 区域数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions2 = this.tranKTree(res.data.data.content)
        }
      })
    },
    // 查询
    handleFilter() {
      this.getemplist.regionid = this.getemplistregions[this.getemplistregions.length - 1]
      getemplist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          console.log('查询出错')
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
          console.log('根据区域选择门店出错')
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
        stat: 1, loginRepositoryId: this.$store.getters.repositoryId, regionIds: this.$store.getters.regionId,
        time: '',
        jobnumber: ''
      }
      this.getemplistregions = []
    },
    // 员工输入框focus事件触发
    handlechoose() {
      this.restemplist()
      this.employeeVisible = true
      this.gitemplist()
    },
    // 选择员工数据时的操作
    handleCurrentChange(val) {
      this.managerPeople = val.personName
      this.RepositoryForm.managerPeopleId = val.id
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
    },
    // 仓库管理员选择结束
    // 小区经理选择开始
    // 小区经理输入框focus事件触发
    handlechoose2() {
      this.restemplist()
      this.regionManagerVisible = true
      this.gitemplist()
    },
    // 新增数据
    handleAdd2() {
      this.regionManagerVisible = false
      this.$router.push('/EmployeeInformation/NewEmployeeInformation')
    },
    // 小区经理选择员工数据时的操作
    handleCurrentChange2(val) {
      console.log(val)
      this.regionManagerId = val.personName
      this.RepositoryForm.regionManagerId = val.id
    },
    // 确认添加数据
    handleConfirm2() {
      this.regionManagerVisible = false
    },
    // 小区经理选择结束
    updateType() {
      this.getnationlist()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container {
    margin: 0px 30px;
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
