<template>
  <div class="ERP-container">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.customername" :placeholder="$t('Customer.customername')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.customerphone" :placeholder="$t('Customer.phone')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-date-picker
        v-model="getemplist.createtime"
        type="date"
        class="filter-item"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"/>
      <el-select v-model="getemplist.type" :value="getemplist.type" :placeholder="$t('Customer.customertype')" class="filter-item" clearable>
        <el-option
          v-for="(item, index) in customertypes"
          :key="index"
          :value="item.id"
          :label="item.categoryName"/>
      </el-select>
      <el-select v-model="getemplist.level" :value="getemplist.level" :placeholder="$t('Customer.level')" class="filter-item" clearable>
        <el-option
          v-for="(item, index) in levels"
          :key="index"
          :value="item.id"
          :label="item.categoryName"/>
      </el-select>
      <!-- 更多搜索条件下拉栏 -->
      <el-popover
        placement="bottom"
        width="500"
        trigger="click">
        <el-select v-model="getemplist.source" :value="getemplist.source" :placeholder="$t('Customer.source')" class="filter-item" clearable style="width: 40%;float: left">
          <el-option
            v-for="(item, index) in sources"
            :key="index"
            :value="item.id"
            :label="item.categoryName"/>
        </el-select>
        <el-select v-model="getemplist.repositoryid" placeholder="请选择门店" filterable clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option
            v-for="(item, index) in repositories"
            :key="index"
            :label="item.repositoryName"
            :value="item.id"/>
        </el-select>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-14-16-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-14-16-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-14-16-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-14-16-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </div>
    <div class="app-container">
      <!-- 列表开始 -->
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
        <el-table-column :label="$t('Customer.id')" :resizable="false" prop="id" align="center" width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.customername')" :resizable="false" prop="customerName" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.customertype')" :resizable="false" prop="customerTypeWZ" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.customerTypeWZ }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.level')" :resizable="false" prop="customerLevel" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.customerLevel }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.birthday')" :resizable="false" prop="birthday" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.source')" :resizable="false" prop="source" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.source }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.newold')" :resizable="false" prop="newOrOld" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.newOrOld | filterno }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.phone')" :resizable="false" prop="phoneNumber" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.gender')" :resizable="false" prop="gender" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.gender | genderFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.address')" :resizable="true" prop="address" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.point')" :resizable="false" prop="point" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.point }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.createTime')" :resizable="false" prop="createTime" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['1-14-16-3']" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-permission="['1-14-16-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editVisible" top="10px" title="修改客户">
        <!--零售客户-->
        <h2 ref="geren" class="form-name">基本信息</h2>
        <div class="container">
          <el-form ref="customerForm" :model="customerForm" :rules="customerFormrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
            <el-form-item :label="$t('Customer.firstname')" prop="firstName" style="width: 40%;margin-top:1%">
              <el-input v-model="customerForm.firstName" placeholder="请输入名" clearable/>
            </el-form-item>
            <el-form-item :label="$t('Customer.middlename')" style="width: 40%;margin-top:1%">
              <el-input v-model="customerForm.middleName" placeholder="请输入中间名" clearable/>
            </el-form-item>
            <el-form-item :label="$t('Customer.lastname')" prop="lastName" style="width: 40%">
              <el-input v-model="customerForm.lastName" placeholder="请输入姓氏" clearable/>
            </el-form-item>
            <el-form-item :label="$t('Customer.phone')" prop="phoneNumber" style="width: 40%">
              <el-input v-model="customerForm.phoneNumber" placeholder="请输入客户电话" clearable/>
            </el-form-item>
            <el-form-item :label="$t('Customer.gender')" prop="gender" style="width: 40%">
              <el-radio-group v-model="customerForm.gender" style="width: 80%">
                <el-radio :label="1" style="width: 50%">{{ $t('public.male') }}</el-radio>
                <el-radio :label="2">{{ $t('public.female') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('Customer.customertype')" style="width: 40%;margin-top: 1%">
              <el-select v-model="customerForm.customerType" :value="customerForm.customerType" placeholder="请选择客户类型" style="width: 100%;">
                <el-option
                  v-for="(item, index) in customertypes"
                  :key="index"
                  :value="item.id"
                  :label="item.categoryName"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('Customer.level')" style="width: 40%;margin-top: 1%">
              <el-select v-model="customerForm.level" :value="customerForm.level" placeholder="请选择客户优质级别" style="width: 100%;">
                <el-option
                  v-for="(item, index) in levels"
                  :key="index"
                  :value="item.id"
                  :label="item.categoryName"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('Customer.source')" style="width: 40%;margin-top: 1%">
              <el-select v-model="customerForm.source" :value="customerForm.source" placeholder="请选择客户来源" style="width: 100%;">
                <el-option
                  v-for="(item, index) in sources"
                  :key="index"
                  :value="item.id"
                  :label="item.categoryName"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('Customer.newold')" style="width: 40%;margin-top: 1%">
              <el-select v-model="customerForm.newOrOld" :value="customerForm.newOrOld" placeholder="请选择" style="width: 100%;">
                <el-option label="老" value="1"/>
                <el-option label="新" value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('Customer.address')" prop="address" style="width: 40%;margin-top:1%">
              <el-input v-model="customerForm.address" placeholder="请输入地址" clearable/>
            </el-form-item>
            <el-form-item label="所属国家" style="width: 40%;margin-top:1%">
              <el-input v-model="customerForm.countryName" disabled/>
            </el-form-item>
            <el-form-item :label="$t('public.countyrId')" style="width: 40%;margin-top: 1%">
              <el-select v-model="countryid" placeholder="请选择国家" style="width: 100%;" @change ="handlechange">
                <el-option
                  v-for="(item, index) in nations"
                  :key="index"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="所属省" style="width: 40%;margin-top:1%">
              <el-input v-model="customerForm.provinceName" disabled/>
            </el-form-item>
            <el-form-item :label="$t('Customer.provinceid')" style="width: 40%;margin-top: 1%">
              <el-select v-model="provinceid" placeholder="请选择省" style="width: 100%;" @change="handlechange2">
                <el-option
                  v-for="(item, index) in provinces"
                  :key="index"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="所属城市" style="width: 40%;margin-top:1%">
              <el-input v-model="customerForm.cityName" disabled/>
            </el-form-item>
            <el-form-item :label="$t('Customer.cityid')" style="width: 40%;margin-top: 1%">
              <el-select v-model="cityid" placeholder="请选择市" style="width: 100%;">
                <el-option
                  v-for="(item, index) in cities"
                  :key="index"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('Customer.repositoryid')" style="width: 40%;margin-top:1%">
              <el-input v-model="customerForm.repositoryName" disabled/>
            </el-form-item>
            <el-form-item label="修改门店" prop="repositoryid" style="width: 40%;margin-top:1%">
              <el-select v-model="repositoryid" placeholder="请选择门店" filterable style="width: 100%;">
                <el-option
                  v-for="(item, index) in repositories"
                  :key="index"
                  :label="item.repositoryName"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('Customer.birthday')" style="width: 40%;margin-top:1%">
              <el-date-picker
                v-model="customerForm.birthday"
                type="date"
                placeholder="选择生日"
                value-format="yyyy-MM-dd"
                style="width: 100%"/>
            </el-form-item>
          </el-form>
        </div>
        <!--操作-->
        <div class="buttons" style="margin-top: 20px;margin-left: 30px">
          <el-button type="primary" @click="handleEditok()">修改</el-button>
          <el-button type="danger" @click="handlecancel()">取消</el-button>
        </div>
      </el-dialog>
      <!--修改结束=================================================-->
    </div>
  </div>
</template>

<script>
import { getcountrylist, getprovincelist, getcitylist, searchRepository } from '@/api/public'
import { searchCusCategory, customerlist, updateCustomer, deletecustomer } from '@/api/Customer'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  name: 'CustomerList',
  directives: { waves, permission },
  components: { Pagination },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '男',
        2: '女'
      }
      return statusMap[status]
    },
    filterno(status) {
      const statusMap = {
        1: '老客户',
        2: '新客户'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 批量操作
      moreaction: [],
      // 控制修改数据
      editVisible: false,
      // 修改弹窗中的数据开始=========================================================
      // 国家列表
      nations: [],
      // 省列表
      provinces: [],
      // 城市列表
      cities: [],
      // 客户信息数据
      countryid: '',
      provinceid: '',
      cityid: '',
      repositoryid: '',
      customerForm: {
        firstName: '',
        middleName: '',
        lastName: '',
        customerName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        countryName: '',
        provinceName: '',
        cityName: '',
        level: '',
        address: '',
        repositoryName: '',
        birthday: '',
        source: '',
        newOrOld: '',
        customerType: ''
      },
      // 客户信息规则数据
      customerFormrules: {
        phoneNumber: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: '请输入姓氏', trigger: 'blur' }
        ],
        firstName: [
          { required: true, message: '请输入名', trigger: 'blur' }
        ]
      },
      // 修改弹窗中的数据结束=========================================================
      // 所有客户类型数据
      // 发送参数
      customertypes: [],
      customertyp: 1,
      // 优质级别类型所有数据
      // 发送参数
      levels: [],
      levelstype: 2,
      // 客户来源所有数据
      // 发送参数
      sources: [],
      sourcestype: 3,
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
      // 客户列表查询加展示参数
      getemplist: {
        customername: '',
        customerphone: '',
        level: '',
        createtime: '',
        type: '',
        pagenum: 1,
        pagesize: 10,
        repositoryid: '',
        source: ''
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
      repositories: []
    }
  },
  mounted() {
    this.getlist()
    this.getCategory()
  },
  methods: {
    checkPermission,
    // 获取类型
    getCategory() {
      // 获取客户类型
      searchCusCategory(this.customertyp).then(res => {
        if (res.data.ret === 200) {
          this.customertypes = res.data.data.content.list
        } else {
          console.log('客户类型出错')
        }
      })
      // 获取客户优质级别
      searchCusCategory(this.levelstype).then(res => {
        if (res.data.ret === 200) {
          this.levels = res.data.data.content.list
        } else {
          console.log('客户优质级别出错')
        }
      })
      // 获取客户来源
      searchCusCategory(this.sourcestype).then(res => {
        if (res.data.ret === 200) {
          this.sources = res.data.data.content.list
        } else {
          console.log('客户来源出错')
        }
      })
      // 获取所有门店
      searchRepository().then(res => {
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content.list
        } else {
          console.log('门店出错')
        }
      })
    },
    getlist() {
      // 员工列表数据
      this.listLoading = true
      customerlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          console.log('员工列表出错')
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      customerlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          console.log('搜索出错')
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/Customer/NewCustomer')
    },
    // 生成合同
    handleContract() {
      console.log(123)
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['编号', '客户姓名', '客户类型', '客户优质级别', '生日', '客户来源', '新老客户', '客户电话', '性别', '详细地址', '积分']
          const filterVal = ['id', 'customerName', 'customerTypeWZ', 'customerLevel', 'birthday', 'source', 'newOrOld', 'phoneNumber', 'gender', 'address', 'point']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '客户资料表'
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
          this.repositories = res.data.data.content
        } else {
          this.$message.error('出错了')
        }
      })
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 批量删除
    handleCommand(command) {
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletecustomer(ids, this.$store.getters.userId).then(res => {
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
        deletecustomer(row.id, this.$store.getters.userId).then(res => {
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
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.getnationlist()
      this.editVisible = true
      this.customerForm = Object.assign({}, row)
      this.customerForm.newOrOld = String(row.newOrOld)
    },
    handleEditok() {
      this.customerForm.countryid = this.countryid
      this.customerForm.provinceid = this.provinceid
      this.customerForm.cityid = this.cityid
      this.customerForm.repositoryid = this.repositoryid
      console.log(this.customerForm)
      updateCustomer(this.customerForm).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
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
    },
    handlecancel() {
      this.editVisible = false
    },
    // 修改操作开始 -------------------------------------------------
    // 国籍列表
    getnationlist() {
      getcountrylist().then(res => {
        if (res.data.ret === 200) {
          this.nations = res.data.data.content
        }
      })
    },
    // 根据国家选择省
    handlechange(val) {
      getprovincelist(val).then(res => {
        if (res.data.ret === 200) {
          this.provinces = res.data.data.content
        }
      })
    },
    // 根据省选择市
    handlechange2(val) {
      getcitylist(val).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.cities = res.data.data.content
        }
      })
    }
    // 修改操作结束 -------------------------------------------------
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
