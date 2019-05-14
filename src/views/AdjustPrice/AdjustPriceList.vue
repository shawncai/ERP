<template>
  <div class="ERP-container">
    <!-- 搜索条件栏目 -->
    <el-card class="box-card" style="margin-top: 15px;height: 60px">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item label="调价单主题">
              <el-input v-model="getemplist.title" :placeholder="$t('AdjustPrice.title')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="调价单编号">
              <el-input v-model="getemplist.adjustNumber" :placeholder="$t('AdjustPrice.adjustNumber')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="经办人">
              <el-input v-model="handlePersonId" :placeholder="$t('AdjustPrice.handlePersonId')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoose"/>
            </el-form-item>
            <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
          </el-col>
          <el-col :span="4" style="margin-left: 154px;">
            <!-- 更多搜索条件下拉栏 -->
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="manual">
              <el-select v-model="getemplist.adjustDeptId" placeholder="请选择调价部门" style="width: 40%;float: left;margin-left: 20px" clearable >
                <el-option
                  v-for="(item, index) in depts"
                  :key="index"
                  :value="item.id"
                  :label="item.deptName"/>
              </el-select>
              <el-input v-model="adjustRepositoryId" :placeholder="$t('AdjustPrice.adjustRepositoryId')" class="filter-item" clearable style="width: 40%;float: right;margin-right: 20px" @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="-"
                unlink-panels
                start-placeholder="Start"
                end-placeholder="End"
                value-format="yyyy-MM-dd"
                style="margin-top: 20px;margin-left: 20px;width: 434px"/>
              <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
                <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter">{{ $t('public.search') }}</el-button>
              </div>
              <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 140px" @click="visible2 = !visible2"><svg-icon icon-class="shaixuan" style="margin-right: 6px"/>{{ $t('public.filter') }}</el-button>
            </el-popover>
          </el-col>
          <el-col :span="4">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['131-152-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['131-152-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['131-152-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['131-152-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px">
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
          :selectable="selectInit"
          type="selection"
          width="55"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.id }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('AdjustPrice.title')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AdjustPrice.adjustNumber')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.adjustNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AdjustPrice.handlePersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.handlePersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AdjustPrice.adjustDeptId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.adjustDeptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AdjustPrice.adjustRepositoryId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.adjustRepositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AdjustPrice.adjustDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.adjustDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('AdjustPrice.effectiveDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.effectiveDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Inventorydamaged.judgeStat')" :resizable="false" prop="judgeStat" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.judgeStat | judgeStatFileter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.receiptStat')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptStat | receiptStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['131-152-3']" v-show="scope.row.judgeStat === 0" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-if="isReview(scope.row)" type="warning" size="mini" @click="handleReview(scope.row)">{{ $t('public.review') }}</el-button>
            <el-button v-permission="['131-152-2']" v-show="scope.row.judgeStat === 0" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-edit :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import { getdeptlist } from '@/api/BasicSettings'
import { adjustlist, deleteadjustprice, updatrepoadjustprice2 } from '@/api/AdjustPrice'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEdit from './components/MyEdit'
import MyRepository from './components/MyRepository'
import MyAccept from './components/MyAccept'
import MyCreate from './components/MyCreate'
import DetailList from './components/DetailList'

export default {
  name: 'AdjustPriceList',
  directives: { waves, permission },
  components: { DetailList, Pagination, MyEdit, MyRepository, MyAccept, MyCreate },
  filters: {
    judgeStatFileter(status) {
      const statusMap = {
        0: '未审核',
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
      return statusMap[status]
    },
    receiptStatFilter(status) {
      const statusMap = {
        1: '制单',
        2: '执行',
        3: '结单'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 搜索数据----------------------
      // 审核传参
      reviewParms: {
        id: '',
        judgePersonId: '',
        judgeStat: ''
      },
      // 详情组件数据
      detailvisible: false,
      // 更多搜索条件问题
      visible2: false,
      // 部门数据
      depts: [],
      // 经办人回显
      handlePersonId: '',
      // 调价仓库回显
      adjustRepositoryId: '',
      // 控制调价仓库选择窗口
      repositorycontrol: false,
      // 控制 经办人选择窗口
      createcontrol: false,
      // 开始时间到结束时间
      date: [],
      // 生产调价列表传参数据
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        createPersonId: 3,
        countryId: 1,
        repositoryId: 438,
        regionIds: 2
      },
      // 搜索结束 ----------------------
      // 列表操作 -------------------------
      // 批量操作
      moreaction: '',
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
      // 修改传给组件的数据
      personalForm: {},
      // 修改控制修改组件数据
      editVisible: false
      // 列表结束 -------------------------
    }
  },
  mounted() {
    this.getdeptlist()
    this.getlist()
  },
  methods: {
    checkPermission,
    // 不让勾选
    selectInit(row, index) {
      if (row.judgeStat !== 0) {
        return false
      } else {
        return true
      }
    },
    // 部门列表数据
    getdeptlist() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 经办人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 经办人返回数据
    createname(val) {
      console.log(val)
      this.handlePersonId = val.personName
      this.getemplist.handlePersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.adjustRepositoryId = val.repositoryName
      this.getemplist.adjustRepositoryId = val.id
    },
    getlist() {
      // 调价列表数据
      this.listLoading = true
      adjustlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.listLoading = false
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
      this.handlePersonId = ''
      this.getemplist.handlePersonId = ''
      this.deliveryPersonId = ''
      this.getemplist.adjustRepositoryId = ''
      this.acceptPersonId = ''
      this.getemplist.adjustRepositoryId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      if (this.date === null || this.date === '') {
        this.getemplist.beginTime = null
        this.getemplist.endTime = null
      } else {
        this.getemplist.beginTime = this.date[0]
        this.getemplist.endTime = this.date[1]
      }
      adjustlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.restFilter()
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
          this.restFilter()
        }
      })
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.sourceType = String(row.sourceType)
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
    },
    // 详情操作
    handleDetail(row) {
      console.log(row)
      this.detailvisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.sourceType = String(row.sourceType)
    },
    // 判断审核按钮
    isReview(row) {
      console.log(row)
      if (row.approvalUseVos !== '' && row.approvalUseVos !== null && row.approvalUseVos !== undefined && row.approvalUseVos.length !== 0) {
        const approvalUse = row.approvalUseVos
        if (this.getemplist.createPersonId === approvalUse[approvalUse.length - 1].stepHandler && (row.judgeStat === 1 || row.judgeStat === 0)) {
          return true
        }
      }
    },
    // 审批操作
    handleReview(row) {
      this.reviewParms.id = row.id
      this.reviewParms.judgePersonId = this.getemplist.createPersonId
      this.$confirm('请审核', '审核', {
        distinguishCancelAndClose: true,
        confirmButtonText: '通过',
        cancelButtonText: '不通过',
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updatrepoadjustprice2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: '审核成功!'
            })
            this.getlist()
          }
        })
      }).catch(action => {
        if (action === 'cancel') {
          this.reviewParms.judgeStat = 1
          const parms = JSON.stringify(this.reviewParms)
          updatrepoadjustprice2(parms).then(res => {
            if (res.data.ret === 200) {
              this.$message({
                type: 'success',
                message: '审核成功!'
              })
              this.getlist()
            }
          })
        }
      })
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
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteadjustprice(ids).then(res => {
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
        deleteadjustprice(row.id).then(res => {
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
    // 新增数据
    handleAdd() {
      this.$router.push('/AdjustPrice/AddAdjustPrice')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'AdjustPriceName', 'AdjustPriceShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
  .filter-container >>> .el-form-item__label{
    padding: 0;
  }
  .ERP-container {
    margin: 0px 15px;
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
