<template>
  <div class="ERP-container">
    <!-- 搜索条件栏目 -->
    <el-card class="box-card" style="margin-top: 15px;">

      <el-input v-model="getemplist.title" :placeholder="$t('TearDown.title')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.teardownNumber" :placeholder="$t('TearDown.teardownNumber')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="handlePersonId" :placeholder="$t('TearDown.handlePersonId')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechoose" @clear="restFilter2"/>

      <my-create :createcontrol.sync="createcontrol" @createname="createname"/>

      <!-- 更多搜索条件下拉栏 -->
      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        trigger="click">
        <el-select v-model="getemplist.teardownDeptId" placeholder="请选择拆装部门" style="width: 40%;float: left;margin-left: 20px" clearable >
          <el-option
            v-for="(item, index) in depts"
            :key="index"
            :value="item.id"
            :label="item.deptName"/>
        </el-select>
        <el-input v-model="TearDownRepositoryId" :placeholder="$t('TearDown.teardownRepositoryId')" class="filter-item" clearable style="width: 40%;float: left;margin-left: 20px" @keyup.enter.native="handleFilter" @focus="handlechooseRep" @clear="restFilter"/>
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

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card class="box-card" style="margin-top: 15px">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['131-159-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['131-159-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['131-159-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['131-159-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
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
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.teardownNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <!-- <el-table-column :label="$t('TearDown.teardownNumber')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.teardownNumber }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('TearDown.handlePersonId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.handlePersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('TearDown.teardownDeptId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.teardownupDeptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('TearDown.teardownRepositoryId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.teardownRepositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('TearDown.teardownDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.teardownDate }}</span>
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
            <el-button v-permission="['131-159-3']" v-show="scope.row.judgeStat === 0" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-show="isReview(scope.row)" type="warning" size="mini" @click="handleReview(scope.row)">{{ $t('public.review') }}</el-button>
            <el-button v-permission="['131-159-76']" v-show="isReview4(scope.row)" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>
            <el-button v-permission="['131-159-16']" v-show="isReview2(scope.row)" :title="$t('updates.jd')" type="success" size="mini" icon="el-icon-check" circle @click="handleReview2(scope.row)"/>
            <el-button v-permission="['131-159-17']" v-show="isReview3(scope.row)" :title="$t('updates.fjd')" type="success" size="mini" icon="el-icon-back" circle @click="handleReview3(scope.row)"/>
            <el-button v-permission="['131-159-2']" v-show="scope.row.judgeStat === 0" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
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
import { teardownlist, deleteteardown, updateteardown2 } from '@/api/TearDown'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEdit from './components/MyEdit'
import MyRepository from './components/MyRepository'
import MyAccept from './components/MyAccept'
import MyCreate from './components/MyCreate'
import DetailList from './components/DetailList'

var _that
export default {
  name: 'TearDownList',
  directives: { waves, permission, permission2 },
  components: { DetailList, Pagination, MyEdit, MyRepository, MyAccept, MyCreate },
  filters: {
    judgeStatFileter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('Hmodule.shbtg')
      }
      return statusMap[status]
    },
    receiptStatFilter(status) {
      const statusMap = {
        1: _that.$t('updates.zd'),
        2: _that.$t('updates.zx'),
        3: _that.$t('updates.jd')
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
      // 仓库回显
      TearDownRepositoryId: '',
      //  仓库选择窗口
      repositorycontrol: false,
      // 经办人选择窗口
      createcontrol: false,
      // 开始时间到结束时间
      date: [],
      // 拆装列表传参数据
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds
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
  beforeCreate() {
    _that = this
  },
  methods: {
    // 判断反审批按钮
    isReview4(row) {
      console.log(row)
      if (row.judgeStat === 2) {
        return true
      }
    },
    // 反结单操作
    handleReview4(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qfsp'), this.$t('prompt.fsp'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.fsp'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 0
        const parms = JSON.stringify(this.reviewParms)
        updateteardown2(parms).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.result === false) {
              this.$message({
                type: 'error',
                message: this.$t('prompt.fspsb')
              })
            } else {
              this.$message({
                type: 'success',
                message: this.$t('prompt.fspcg')
              })
            }
            this.getlist()
          }
        })
      })
    },
    // 判断反结单按钮
    isReview3(row) {
      console.log(row)
      if (row.receiptStat === 3) {
        return true
      }
    },
    // 反结单操作
    handleReview3(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.endPersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qfjd'), this.$t('prompt.fjd'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.fjd'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.receiptStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updateteardown2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.fjdcg')
            })
            this.getlist()
          }
        })
      })
    },
    // 判断结单按钮
    isReview2(row) {
      console.log(row)
      if (row.receiptStat !== 3 && (row.judgeStat === 2 || row.judgeStat === 3)) {
        return true
      }
    },
    // 结单操作
    handleReview2(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.endPersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qjd'), this.$t('prompt.jd'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.jd'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.receiptStat = 3
        const parms = JSON.stringify(this.reviewParms)
        updateteardown2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.jdcg')
            })
            this.getlist()
          }
        })
      })
    },
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
      this.TearDownRepositoryId = val.repositoryName
      this.getemplist.TearDownRepositoryId = val.id
    },
    getlist() {
      // 拆装列表数据
      this.listLoading = true
      teardownlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.listLoading = false
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
      this.TearDownRepositoryId = ''
      this.getemplist.TearDownRepositoryId = ''
    },
    restFilter2() {
      this.handlePersonId = ''
      this.getemplist.handlePersonId = ''
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
      teardownlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        }
        // this.restFilter()
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
      if (row.approvalUseVos !== '' && row.approvalUseVos !== null && row.approvalUseVos !== undefined && row.approvalUseVos.length !== 0) {
        const approvalUse = row.approvalUseVos
        if (this.$store.getters.userId === approvalUse[approvalUse.length - 1].stepHandler && (row.judgeStat === 1 || row.judgeStat === 0)) {
          return true
        }
      }
    },
    // 审批操作
    handleReview(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.tg'),
        cancelButtonText: this.$t('prompt.btg'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updateteardown2(parms).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.shcg')
            })
            this.getlist()
          }
        })
      }).catch(action => {
        if (action === 'cancel') {
          this.reviewParms.judgeStat = 3
          const parms = JSON.stringify(this.reviewParms)
          updateteardown2(parms).then(res => {
            if (res.data.ret === 200) {
              this.$message({
                type: 'success',
                message: this.$t('prompt.shcg')
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
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deleteteardown(ids, this.$store.getters.userId).then(res => {
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
        deleteteardown(row.id, this.$store.getters.userId).then(res => {
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
    // 新增数据
    handleAdd() {
      this.$router.push('/TearDown/AddTearDown')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'TearDownName', 'TearDownShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
     width: 180px;
    margin-left: 20px;
    padding: 10px 0;
  }
</style>
