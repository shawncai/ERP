<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <!-- 搜索条件栏目 -->
          <el-col :span="5">
            <el-form-item :label="$t('Customer.customername')" label-width="100px">
              <el-input v-model="getemplist.customername" :placeholder="$t('Customer.customername')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('Customer.phone')" label-width="100px">
              <el-input v-model="getemplist.customerphone" :placeholder="$t('Customer.phone')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('Customer.customertype')" label-width="100px">
              <el-select v-model="getemplist.type" :value="getemplist.type" :placeholder="$t('Customer.customertype')" clearable>
                <el-option
                  v-for="(item, index) in customertypes"
                  :key="index"
                  :value="item.id"
                  :label="item.categoryName"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 更多搜索条件下拉栏 -->
          <el-col :span="3">
            <el-popover
              placement="bottom"
              width="500"
              trigger="click">
              <el-select v-model="getemplist.source" :value="getemplist.source" :placeholder="$t('Customer.source')" clearable style="width: 40%;float: left;margin-left: 20px">
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
              <el-select v-model="getemplist.level" :value="getemplist.level" :placeholder="$t('Customer.level')" style="width: 40%;float: left;margin-left: 20px;margin-top: 20px" clearable>
                <el-option
                  v-for="(item, index) in levels"
                  :key="index"
                  :value="item.id"
                  :label="item.categoryName"/>
              </el-select>
              <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
                <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
              </div>
              <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
            </el-popover>
          </el-col>
          <el-col :span="3" style="margin-left: 20px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
          <!-- 批量操作 -->
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" style="margin-left: 0" type="primary">
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
      <el-button v-permission="['1-14-16-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
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
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('Customer.id')" :resizable="false" prop="id" fixed="left" align="center" width="60">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.id }}</span>
            <detail-list :detailcontrol.sync="detailvisible" :detailid.sync="detailid"/>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.customername')" :resizable="false" prop="customerName" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.level')" :resizable="false" prop="customerLevel" align="center" min-width="150">
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
            <span>{{ scope.row.sourceName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.newold')" :resizable="false" prop="newOrOld" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.newOrOld | filterno }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.phone')" :resizable="false" prop="phoneNumber" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.gender')" :resizable="false" prop="gender" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.gender | genderFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Customer.address')" :resizable="true" prop="address" align="center" min-width="150">
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
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <el-button v-permission2="['1-14-16-3', scope.row.createPersonId]" title="修改" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <el-button v-permission2="['1-14-16-2', scope.row.createPersonId]" title="删除" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
    </el-card>
    <!--修改开始=================================================-->
    <my-dialog2 :editcontrol.sync="editVisible" :editdata.sync="customerForm" @rest="refreshlist"/>
    <!--修改结束=================================================-->
  </div>
</template>

<script>
import { getcountrylist, getprovincelist, getcitylist, searchRepository } from '@/api/public'
import { searchCusCategory, customerlist, deletecustomer } from '@/api/Customer'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission'
import MyDialog2 from './components/MyDialog2'
import DetailList from './components/DetailList2' // 权限判断函数

export default {
  name: 'CustomerList',
  directives: { waves, permission, permission2 },
  components: { DetailList, MyDialog2, Pagination },
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
      // 控制详情
      detailvisible: false,
      // 详情id
      detailid: null,
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
    // 详情操作
    handleDetail(row) {
      this.detailid = row.id
      this.detailvisible = true
    },
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
      if (row.newOrOld !== null) {
        this.customerForm.newOrOld = String(row.newOrOld)
      }
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
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
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    height: 1015px;
  }
  .el-col-12{
    width: 49%;
  }
</style>
