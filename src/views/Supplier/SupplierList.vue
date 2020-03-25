<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <el-input v-model="getemplist.id" :placeholder="$t('Supplier.id')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.supplierName" :placeholder="$t('Supplier.supplierName')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.typeId" :value="getemplist.typeId" :placeholder="$t('Supplier.typeId')" class="filter-item" clearable>
        <el-option
          v-for="(item, index) in typeIds"
          :key="index"
          :label="item.categoryName"
          :value="item.id"
        />
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
          placeholder="所在区域"
          change-on-select
          filterable
          clearable
          style="width: 40%;float: left;margin-left: 20px"
          @change="handlechange4"
        />
        <el-select v-model="getemplist.levelId" placeholder="请选择优质级别" clearable style="width: 40%;float: right;margin-right: 20px">
          <el-option
            v-for="(item, index) in levelIds"
            :key="index"
            :label="item.categoryName"
            :value="item.id"
          />
        </el-select>
        <el-select v-model="getemplist.groupId" multiple placeholder="请选择供应商分组" style="width: 40%;float: left;margin-left: 20px;margin-top: 20px">
          <el-option
            v-for="(item, index) in groupIds"
            :key="index"
            :label="item.groupName"
            :value="item.id"/>
        </el-select>
        <el-input v-model="getemplist.productName" :placeholder="$t('saleBillList.productName')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
        <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
          <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
        </div>
        <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
      </el-popover>

      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-22-24-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 新建分组 -->
      <el-button v-permission="['1-22-24-64']" v-waves class="filter-item" type="primary" style="width: 100px" @click="handleGroup">{{ $t('Supplier.supplierGroup') }}</el-button>
      <el-button v-waves class="filter-item" type="primary" style="width: 100px" @click="handlePunish">{{ $t('updates.gyskh') }}</el-button>
      <el-button v-waves class="filter-item" type="primary" style="width: 100px" @click="handleModify">{{ $t('updates.sctjd') }}</el-button>
      <my-punishment :punishcontrol.sync="punishcontrol" :punishdata="punishdata" @rest="refreshlist"/>
      <el-dialog :visible.sync="GroupVisible" title="新建分组" class="normal" width="600px" center>
        <el-input v-model="groupName" :placeholder="$t('Supplier.groupName')" class="filter-item" style="width: 200px;float: left" clearable @keyup.enter.native="handleAddGroup"/>
        <el-button v-waves class="filter-item" type="success" style="width: 86px;float: left" @click="handleAddGroup">{{ $t('public.add') }}</el-button>
        <el-table :data="groupData" border>
          <el-table-column property="id" label="编号" align="center" width="150"/>
          <el-table-column property="groupName" label="组名称" align="center" min-width="200"/>
          <el-table-column :label="$t('public.actions')" :resizable="false" align="center" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDeleteGroup(scope.row)">{{ $t('public.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-22-24-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-22-24-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-22-24-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
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
        <el-table-column :label="$t('Supplier.id')" :resizable="false" fixed="left" prop="id" align="center" width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.id }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="edtiForm" :detailid.sync="detailid"/>
        </el-table-column>
        <el-table-column :label="$t('Supplier.supplierName')" :resizable="false" fixed="left" prop="supplierName" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.supplierShortName')" :resizable="false" prop="supplierShortName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierShortName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.typeId')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.regionId')" :resizable="false" prop="regionName" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.regionName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.buyerId')" :resizable="false" prop="buyerName" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.buyerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.levelId')" :resizable="false" prop="levelName" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.levelName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.createId')" :resizable="false" prop="createId" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Supplier.createTime')" :resizable="false" prop="createTime" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <el-button v-show="scope.row.isEffective === 2" title="启用" type="primary" size="mini" icon="el-icon-check" circle @click="top(scope.row)"/>
            <el-button v-show="scope.row.isEffective === 1" title="停用" type="primary" size="mini" icon="el-icon-close" circle @click="bottom(scope.row)"/>
            <el-button v-permission2="['1-22-24-3', scope.row.createPersonId]" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            <!-- <el-button v-permission2="['1-22-24-2', scope.row.createPersonId]" :title="$t('updates.sc')" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-dialog :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import { searchRepository, regionlist } from '@/api/public'
import { searchCategory, search, delete2, searchGroup, createGroup, deleteGroup, update } from '@/api/Supplier'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyDialog from './components/MyDialog'
import MyPunishment from './components/MyPunishment'
import DetailList from './components/DetailList'

var _that
export default {
  name: 'SupplierList',
  directives: { waves, permission, permission2 },
  components: { DetailList, MyPunishment, Pagination, MyDialog },
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
      // 供应商ids
      punishdata: '',
      // 控制供应商惩罚
      punishcontrol: false,
      // 供应商选择框控制
      employeeVisible: this.control,
      // 搜索分组数据
      groupIds: [],
      personalForm2: {},
      // 新增分组参数
      groupName: '',
      // 分组表格数据
      groupData: [],
      // 新建分组控制器
      GroupVisible: false,
      // 批量操作
      moreaction: '',
      // 优质级别
      levelIds: [],
      // 供应商类别
      typeIds: [],
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
      // 供应商列表查询加展示参数
      getemplist: {
        id: '',
        supplierName: '',
        typeId: '',
        regionId: '',
        levelId: '',
        pagenum: 1,
        pagesize: 10
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
      // 传给组件的数据
      personalForm: {},
      // 控制组件数据
      editVisible: false,
      // 修改数据
      edtiForm: {},
      // 详情传递id
      detailid: null,
      // 控制详情组件
      detailvisible: false
    }
  },
  activated() {
    this.getlist()
  },
  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    top(row) {
      console.log('row', row)
      this.personalForm2.id = row.id
      this.personalForm2.isEffective = 1
      update(this.personalForm2).then(res => {
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
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
    },
    bottom(row) {
      console.log('row', row)
      this.personalForm2.id = row.id
      this.personalForm2.isEffective = 2
      update(this.personalForm2).then(res => {
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
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
    },
    checkPermission,
    // 详情操作
    async handleDetail(row) {
      this.detailid = row.id
      this.edtiForm = Object.assign({}, row)
      this.detailvisible = true
    },
    // 供应商惩罚
    handlePunish() {
      console.log('this.moreaction', this.moreaction)
      if (this.moreaction !== '' && this.moreaction !== null && this.moreaction !== undefined && this.moreaction.length !== 0) {
        if (this.moreaction.length > 1) {
          this.$notify.error({
            title: 'wrong',
            message: '请选择一个供应商',
            offset: 100
          })
        } else {
          console.log('this.moreaction', this.moreaction)
          const ids = this.moreaction.map(item => item.id).join()
          this.punishdata = ids
          this.punishcontrol = true
        }
      } else {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择要考核的供应商',
          offset: 100
        })
      }
    },
    // 新建调价单
    handleModify() {
      console.log('this.moreaction', this.moreaction)
      if (this.moreaction !== '' && this.moreaction !== null && this.moreaction !== undefined && this.moreaction.length !== 0) {
        if (this.moreaction.length > 1) {
          this.$notify.error({
            title: 'wrong',
            message: '请选择一个供应商',
            offset: 100
          })
        } else {
          console.log('this.moreaction', this.moreaction)
          this.$store.dispatch('getempcontract4', this.moreaction)
          this.$router.push('/Supplier/AddSupplierAdjust')
        }
      } else {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择要考核的供应商',
          offset: 100
        })
      }
    },
    getlist() {
      // 供应商列表数据
      this.listLoading = true
      const roles = this.$store.getters.roles
      const isshow = roles.includes('1-22-24-115')
      if (isshow) {
        this.getemplist.isRole = 1
      } else {
        this.getemplist.isRole = 2
      }
      console.log(this.getemplist.isRole)
      search(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
        // 分组数据
        searchGroup().then(res => {
          if (res.data.ret === 200) {
            this.groupIds = res.data.data.content
          }
        })
      })
      // 供应商类别
      searchCategory(1).then(res => {
        if (res.data.ret === 200) {
          this.typeIds = res.data.data.content.list
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
      // 优质级别
      searchCategory(4).then(res => {
        if (res.data.ret === 200) {
          this.levelIds = res.data.data.content.list
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
      // 区域数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        }
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      this.getemplist.regionId = this.getemplistregions[this.getemplistregions.length - 1]
      console.log(this.getemplist)
      search(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.isHot = String(row.isHot)
      this.personalForm.isEffective = String(row.isEffective)
      this.personalForm.moneyId = String(row.moneyId)
      this.personalForm.companyTypeId = String(row.companyTypeId)
      this.personalForm.groupId = row.groupId.split(',').map(function(item) {
        return Number(item)
      })
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      console.log(val)
      if (val === true) {
        this.getlist()
      }
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 多条删除
    // 批量删除
    handleCommand(command) {
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          delete2(ids, this.$store.getters.userId).then(res => {
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
        delete2(row.id, this.$store.getters.userId).then(res => {
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
    // 分组数据列表
    groupList() {
      // 分组数据
      searchGroup().then(res => {
        if (res.data.ret === 200) {
          this.groupData = res.data.data.content
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.$router.push('/Supplier/NewSupplier')
    },
    // 新建分组
    handleGroup() {
      this.groupList()
      this.GroupVisible = true
    },
    // 重置input
    restGroup() {
      this.groupName = ''
    },
    // 新增分组
    handleAddGroup() {
      createGroup(this.groupName).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '添加成功',
            type: 'success',
            offset: 100
          })
          this.restGroup()
          this.groupList()
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
      })
    },
    // 删除分组
    handleDeleteGroup(row) {
      this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      }).then(() => {
        deleteGroup(row.id, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: this.$t('prompt.sccg'),
              type: 'success',
              offset: 100
            })
            this.groupList()
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
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'supplierName', 'supplierShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '经销商资料表'
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
    margin: 0px 30px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
   width: 180px;
    margin-left: 20px;
    padding: 10px 0;
  }
</style>
