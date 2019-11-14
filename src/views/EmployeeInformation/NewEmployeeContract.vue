<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="contractForm" :model="contractForm" :rules="contractFormRules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('NewEmployeeInformation.employeeid')" prop="employeeid" style="width: 40%;margin-top:1%">
            <el-input v-model="employeeName" :disabled="isclick" clearable @focus="handlechoose"/>
          </el-form-item>
          <!--弹出员工列表开始-->
          <el-dialog :visible.sync="employeeVisible" :title="$t('Hmodule.xzyg')" top="10px">
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
                  :options="regions"
                  :props="props"
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
            <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" style="padding: 0" @pagination="getnationlist" />
            <span slot="footer" class="dialog-footer" style="text-align: left">
              <el-button v-waves type="success" style="text-align: center;" @click="handleConfirm">{{ $t('Hmodule.sure') }}</el-button>
            </span>
          </el-dialog>
          <!--弹窗员工列表结束-->
          <el-form-item :label="$t('NewEmployeeInformation.typeid')" prop="typeid" style="width: 40%;margin-top:1%">
            <el-select ref="clear" v-model="contractForm.typeid" style="width: 100%;" @focus="updatetypes">
              <el-option v-show="false" label="" value=""/>
              <el-option
                v-for="(item, index) in alltypes"
                :key="index"
                :label="item.categoryName"
                :value="item.id"/>
              <template>
                <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat">{{ $t('updates.create') }}</el-button>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.contractname')" prop="contractname" style="width: 40%">
            <el-input v-model="contractForm.contractname" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.signtime')" style="width: 40%" prop="signtime">
            <el-date-picker
              v-model="contractForm.signtime"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              @change="test"/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.expiredtime')" style="width: 40%" prop="expiredtime">
            <el-date-picker
              v-model="contractForm.expiredtime"
              :picker-options="pickerOptions1"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.effectivetime')" style="width: 40%" prop="effectivetime">
            <el-date-picker
              v-model="contractForm.effectivetime"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.period')" style="width: 40%;margin-top:1%">
            <el-select v-model="contractForm.period" style="width: 100%;">
              <el-option v-show="false" label="" value=""/>
              <el-option label="固定期限" value="1"/>
              <el-option label="不固定期限" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.attribute')" style="width: 40%;margin-top:1%">
            <el-select ref="clear2" v-model="contractForm.attribute" style="width: 100%;" @focus="updatetypes">
              <el-option v-show="false" label="" value=""/>
              <el-option
                v-for="(item, index) in allattribute"
                :key="index"
                :label="item.categoryName"
                :value="item.id"/>
              <template>
                <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat2">{{ $t('updates.create') }}</el-button>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.iscorrection')" style="width: 40%;margin-top:1%">
            <el-radio-group v-model="contractForm.iscorrection" style="width: 80%">
              <el-radio :label="1" style="width: 50%">{{ $t('updates.yes') }}</el-radio>
              <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.contractstat')" style="width: 40%;margin-top:1%">
            <el-radio-group v-model="contractForm.stat" style="width: 80%">
              <el-radio :label="1" style="width: 50%">{{ $t('updates.sx') }}</el-radio>
              <el-radio :label="2">{{ $t('updates.wsx') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.trialsalary')" style="width: 40%">
            <el-input v-model="contractForm.trialsalary" placeholder="请输入试用工资" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.correctionsalary')" style="width: 40%">
            <el-input v-model="contractForm.correctionsalary" placeholder="请输入转正工资" clearable/>
          </el-form-item>
          <el-form-item :label="$t('NewEmployeeInformation.remindpersonid')" style="width: 40%">
            <el-input v-model="remindpersonid" placeholder="请选择提醒人" clearable @focus="controlremin"/>
            <div class="showtag">
              <el-tag
                v-for="tag in remindpersonname"
                :key="tag.id"
                :disable-transitions="false"
                closable
                @close="handleClose(tag)">
                {{ tag.personName }}
              </el-tag>
            </div>
          </el-form-item>
          <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
          <el-form-item :label="$t('NewEmployeeInformation.advanceday')" style="width: 40%">
            <el-input v-model="contractForm.advanceday" placeholder="请输入提前时间" clearable>
              <template slot="append">{{ $t('updates.day') }}</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 上传附件 -->
      <h2 ref="fujian" class="form-name">{{ $t('updates.scfj') }}</h2>
      <div class="container">
        <el-form :model="contractForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-form-item :label="$t('NewEmployeeInformation.Enclosure')" style="width: 100%;margin-top: 1%">
            <el-button style="margin-bottom: 10px" size="small" type="success" @click="submitUpload">{{ $t('public.uploadimage') }}</el-button>
            <el-upload
              ref="upload"
              :on-preview="handlepicPreview"
              :on-remove="handlepicRemove"
              :on-success="handlepicsuccess"
              :data="picidsData"
              :auto-upload="false"
              action="http://192.168.1.26:9090/erp/upload/uploadpic"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <el-dialog :visible.sync="picidsVisible">
              <img :src="picidsImageUrl" width="100%" alt="">
            </el-dialog>
          </el-form-item >
        </el-form>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click v-permission="['1-2-6-1']" type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button v-permission="['1-2-6-1']" type="success" @click="handleentry()">{{ $t('updates.jxxj') }}</el-button>
        <el-button v-permission="['1-2-6-1']" type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { searchRepository, regionlist } from '@/api/public'
import { getemplist, addcontract, getdeptlist, searchEmpCategory } from '@/api/EmployeeInformation'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyCreate from './components/MyCreate'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'NewEmployeeContract',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyCreate },
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
      // 控制员工选择
      isclick: false,
      // 多选小标签
      remindpersonname: [],
      // 商品图片数据+++++++++++++++++++++++++开始
      // 商品图片控制器
      picidsVisible: false,
      // 商品图片地址
      picidsImageUrl: '',
      // 发送后端type
      picidsData: {
        type: 2
      },
      // 商品图片数据+++++++++++++++++++++++++结束
      // 判断是否显示增加按钮
      isshow: false,
      // 所有合同属性类别
      allattribute: [],
      // 合同属性参数
      attributeCat: {
        type: 1,
        pagenum: 1,
        pagesize: 9999
      },
      // 提醒人回显
      remindpersonid: '',
      // 控制提醒人窗口
      createcontrol: false,
      // 所有合同类别数据
      alltypes: [],
      // 合同类别参数
      typeids: {
        type: 3,
        pagenum: 1,
        pagesize: 9999
      },
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
      employeeVisible: false,
      // 基本信息数据
      employeeName: '',
      contractForm: {
        employeeid: '',
        contractname: '',
        signtime: '',
        expiredtime: '',
        effectivetime: '',
        typeid: '',
        attribute: '',
        period: '',
        iscorrection: '',
        stat: '',
        advanceday: '',
        trialsalary: '',
        correctionsalary: '',
        remindpersonid: '',
        picids: ''
      },
      // 基本信息规则数据
      contractFormRules: {
        employeeid: [
          { required: true, message: '请选择员工', trigger: 'focus' }
        ],
        typeid: [
          { required: true, message: '请选择合同类别', trigger: 'change' }
        ],
        contractname: [
          { required: true, message: '请输入合同名称', trigger: 'blur' }
        ],
        signtime: [
          { required: true, message: '请选择签约时间', trigger: 'blur' }
        ],
        expiredtime: [
          { required: true, message: '请选择签约时间', trigger: 'blur' }
        ],
        effectivetime: [
          { required: true, message: '请选择签约时间', trigger: 'blur' }
        ]
      },
      pickerOptions1: {
      }
    }
  },
  watch: {
    employeeVisible() {
      console.log(this.employeeVisible)
      this.isclick = this.employeeVisible
    }
  },
  created() {
    this.getnationlist()
  },
  mounted() {
    this.getempinformation()
    this.jungleshow()
    this.getdatatime()
  },
  methods: {
    // 默认显示今天
    getdatatime() {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      this.contractForm.effectivetime = currentdate
    },
    // 上传图片----------------------------------------------------------------------
    submitUpload() {
      this.$refs.upload.submit()
    },
    handlepicRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlepicPreview(file) {
      this.picidsImageUrl = file.url
      this.picidsVisible = true
    },
    handlepicsuccess(response) {
      this.contractForm.picids.push(response.data.content.picId)
      console.log(response.data.content.picId)
    },
    // 上传图片结束----------------------------------------------------------------------
    test() {
      this.contractForm.expiredtime = ''
      this.pickerOptions1.disabledDate = (time) => {
        return time.getTime() < new Date(this.contractForm.signtime).getTime()
        // return time.getTime() > Date.now()
      }
      console.log(this.pickerOptions1)
    },
    jungleshow() {
      const roles = this.$store.getters.roles
      this.isshow = roles.includes('1-2-8-1')
    },
    checkPermission,
    getempinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.contractForm.employeeid = this.$store.getters.empcontract.id
        this.employeeName = this.$store.getters.empcontract.personName
        this.$store.dispatch('getempcontract', '')
      }
    },
    getnationlist() {
      // 员工列表数据
      this.listLoading = true
      console.log(this.getemplist)
      getemplist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          console.log('员工列表数据出错了')
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
          console.log('部门列表数据出错了')
        }
      })
      // 区域数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        } else {
          console.log('部门列表数据出错了')
        }
      })
      // 合同类别数据
      searchEmpCategory(this.typeids).then(res => {
        if (res.data.ret === 200) {
          this.alltypes = res.data.data.content.list
        } else {
          console.log('合同类别数据出错了')
        }
      })
      // 合同属性数据
      searchEmpCategory(this.attributeCat).then(res => {
        if (res.data.ret === 200) {
          this.allattribute = res.data.data.content.list
        } else {
          console.log('合同属性数据出错了')
        }
      })
    },
    // 查询
    handleFilter() {
      this.getemplist.regionid = this.getemplistregions[this.getemplistregions.length - 1]
      console.log(this.getemplist)
      if (this.getemplist.deptid === '' && this.getemplist.employeename === '' && this.getemplist.jobnumber === '' && this.getemplist.postid === '' && this.getemplist.regionid === '' && this.getemplist.repositoryid === '' && this.getemplist.stat === '' && this.getemplist.time === '' || this.getemplist.time === null) {
        this.getnationlist()
      } else {
        getemplist(this.getemplist).then(res => {
          if (res.data.ret === 200) {
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
          } else {
            console.log('查询出错了')
          }
        })
      }
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/EmployeeInformation/NewEmployeeInformation')
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
        stat: 1, loginRepositoryId: this.$store.getters.repositoryId, regionIds: this.$store.getters.regionIds,
        time: '',
        jobnumber: ''
      }
      this.getemplistregions = []
    },
    // 员工输入框focus事件触发
    handlechoose() {
      this.restemplist()
      console.log(this.getemplist)
      this.getnationlist()
      this.employeeVisible = true
    },
    // 选择员工数据时的操作
    handleCurrentChange(val) {
      this.currentRow = val
      this.contractForm.employeeid = val.id
      this.employeeName = val.personName
    },
    // 确认添加数据
    handleConfirm() {
      this.employeeVisible = false
    },
    // 保存操作
    handlesave() {
      this.$refs.contractForm.validate((valid) => {
        if (valid) {
          const stringid = []
          for (const i in this.remindpersonname) {
            // remindpersonid
            stringid.push(this.remindpersonname[i].personId)
          }
          console.log(stringid)
          this.contractForm.remindpersonid = stringid.join(',')
          addcontract(this.contractForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$router.go(-1)
              this.$refs.contractForm.clearValidate()
              this.$refs.contractForm.resetFields()
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
    // 清空记录
    restAllForm() {
      this.contractForm = {
        employeeid: '',
        contractname: '',
        signtime: '',
        expiredtime: '',
        effectivetime: '',
        typeid: '',
        attribute: '',
        period: '',
        iscorrection: '',
        stat: '',
        advanceday: '',
        trialsalary: '',
        correctionsalary: '',
        remindpersonid: ''
      }
      this.employeeName = ''
      this.remindpersonname = []
    },
    // 继续录入
    handleentry() {
      console.log(this.contractForm)
      this.$refs.contractForm.validate((valid) => {
        if (valid) {
          const stringid = []
          for (const i in this.remindpersonname) {
            // remindpersonid
            stringid.push(this.remindpersonname[i].personId)
          }
          console.log(stringid)
          this.contractForm.remindpersonid = stringid.join(',')
          addcontract(this.contractForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.restAllForm()
              this.$refs.contractForm.clearValidate()
              this.$refs.contractForm.resetFields()
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
      const view = { path: '/EmployeeInformation/NewEmployeeContract', name: 'NewEmployeeContract', fullPath: '/EmployeeInformation/NewEmployeeContract', title: 'NewEmployeeContract' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // focus更新数据
    updatetypes() {
      this.getnationlist()
    },
    // 控制合同到期提醒人选择窗口
    controlremin() {
      this.createcontrol = true
    },
    // 合同到期提醒人回显
    createname(val) {
      console.log('到期提醒', val)
      // const remindid = []
      this.remindpersonname = []
      for (const i in val) {
        const remindpersonname = {}
        remindpersonname.personName = val[i].personName
        remindpersonname.personId = val[i].id
        this.remindpersonname.push(remindpersonname)
      }
      // this.contractForm.remindpersonid = remindid.join(',')
      console.log('数据', this.remindpersonname, this.contractForm.remindpersonid)
      // this.remindpersonid = val.personName
      // this.contractForm.remindpersonid = val.id
    },
    handleClose(tag) {
      this.remindpersonname.splice(this.remindpersonname.indexOf(tag), 1)
      console.log('传输id', this.remindpersonname)
    },
    go_creat() {
      this.$router.push('/EmployeeInformation/EmpCategory')
      this.$refs.clear.blur()
    },
    go_creat2() {
      this.$router.push('/EmployeeInformation/EmpCategory')
      this.$refs.clear2.blur()
    }
  }
}
</script>

<style rel="stylesheet/css"  scoped>
  .ERP-container >>> .el-dialog__body {
    padding: 0 20px;
  }
  .ERP-container{
    margin:0px 30px;
  }
  .ERP-container >>> .el-dialog {
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
  }
  .ERP-container >>> .el-dialog__header {
    position: inherit;
    width: 753px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
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
