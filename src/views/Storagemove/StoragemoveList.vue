<template>
  <div class="ERP-container">
    <!-- 搜索条件栏目 -->
    <el-card class="box-card" style="margin-top: 15px">

      <el-input v-model="getemplist.title" :placeholder="$t('Storagemove.title')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.moveNumber" :placeholder="$t('Storagemove.moveNumber')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="moveInRepository" :placeholder="$t('Storagemove.moveInRepository')" class="filter-item" clearable @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechooseDep"/>

      <my-depot :depotcontrol.sync="depotcontrol" @depotname="depotname"/>

      <el-popover
        v-model="visible2"
        placement="bottom"
        width="500"
        trigger="click">
        <el-select v-model="getemplist.departmentId" placeholder="请选择调货部门" style="width: 40%;float: left;margin-left: 20px" clearable >
          <el-option
            v-for="(item, index) in depts"
            :key="index"
            :value="item.id"
            :label="item.deptName"/>
        </el-select>
        <el-input v-model="moveOutRepository" :placeholder="$t('Storagemove.moveOutRepository')" class="filter-item" clearable style="width: 40%;float: right;margin-right: 20px" @clear="restFilter2" @keyup.enter.native="handleFilter" @focus="handlechooseRep"/>
        <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
        <el-select v-model="getemplist.requestDeptId" placeholder="请选择要货部门" style="width: 40%;float: left;margin-left: 20px;margin-top: 20px" clearable >
          <el-option
            v-for="(item, index) in depts"
            :key="index"
            :value="item.id"
            :label="item.deptName"/>
        </el-select>
        <!-- <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="-"
          unlink-panels
          start-placeholder="要求到货开始日期"
          end-placeholder="要求到货结束日期"
          value-format="yyyy-MM-dd"
          style="margin-top: 20px;margin-left: 20px;width: 434px"/> -->
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
          <el-dropdown-item v-permission="['131-141-142-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['131-141-142-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['131-141-142-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>

      <el-button v-permission="['266-373-1']" v-waves :loading="downloadLoading2" icon="el-icon-tickets" class="filter-item" style="width: 86px" @click="handlevoucherparms">{{ $t('otherlanguage.newvoucher') }}</el-button>

      <el-dialog :visible.sync="categoryVisible" :title="$t('otherlanguage.newvoucher')" class="normal" width="600px" center>
        <el-form ref="addCategoryForm" :model="voucherparms" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('otherlanguage.md')" label-width="100px" prop="type">
            <el-select v-model="voucherparms.repositoryId" :disabled="isvoucherrep" style="width: 100%" filterable clearable @change="choosevoucherrep">
              <el-option
                v-for="(item, index) in respositoryarr"
                :key="index"
                :label="item.repositoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!--          <el-form-item :label="$t('otherlanguage.qy')" label-width="100px" prop="type">-->
          <!--            <el-cascader-->
          <!--              :disabled="isvoucherregion"-->
          <!--              :options="regions"-->
          <!--              :props="props"-->
          <!--              v-model="sendregionIds"-->
          <!--              :show-all-levels="false"-->
          <!--              :placeholder="$t('otherlanguage.qy')"-->
          <!--              change-on-select-->
          <!--              filterable-->
          <!--              clearable-->
          <!--              style="width: 100%"-->
          <!--              @change="handlechange4"-->
          <!--            />-->
          <!--          </el-form-item>-->
          <el-form-item :label="$t('otherlanguage.rq')" label-width="100px" prop="categoryname">
            <el-date-picker
              v-model="voucherparms.date"
              :picker-options="pickerOptions1"
              type="month"
              value-format="yyyy-MM"
              style="width: 100%"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handlevoucher()">{{ $t('Hmodule.sure') }}</el-button>
          <el-button type="danger" @click="closetag()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>

      <!-- 新建操作 -->
      <el-button v-permission="['131-141-142-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
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
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.moveNumber }}</span>
          </template>
          <detail-list :detailcontrol.sync="detailvisible" :detaildata.sync="personalForm"/>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.moveInRepository')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.moveInRepositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.moveOutRepository')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.moveOutRepositoryName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('Storagemove.moveNumber')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.moveNumber }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('Storagemove.applicationName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.applicationName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.requestDeptId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.requestDeptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.requestArrivalDate')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.requestArrivalDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.title')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.judgeStat')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.judgeStat | judgeStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Stockenter.receiptStat')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.receiptStat | receiptStatFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="330">
          <template slot-scope="scope">
            <!-- 调出确认 -->
            <el-button v-show="isshow9(scope.row)" size="mini" type="success" @click="handleDispatch3(scope.row)">{{ $t('Storagemove.moveoutconfirm') }}</el-button>
            <!-- <el-button v-show="scope.row.judgeStat === 2&&scope.row.confirmPersonId === null" size="mini" type="success" @click="handleDispatch2(scope.row)">调入确认</el-button> -->
            <el-button v-permission="['131-141-142-3']" v-show="scope.row.judgeStat === 0" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-show="isReview(scope.row)" type="warning" size="mini" @click="handleReview(scope.row)">{{ $t('public.review') }}</el-button>
            <el-button v-show="isReview11(scope.row)" style="margin-left: 18px;" title="confirm" type="primary" size="mini" icon="el-icon-check" circle @click="confirm2(scope.row)"/>
            <el-button v-permission="['131-141-142-76']" v-show="isReview4(scope.row)" :title="$t('updates.fsp')" type="warning" size="mini" circle @click="handleReview4(scope.row)"><svg-icon icon-class="fanhui"/></el-button>
            <el-button v-permission="['131-141-142-16']" v-show="isReview2(scope.row)" :title="$t('updates.jd')" type="success" size="mini" icon="el-icon-check" circle @click="handleReview2(scope.row)"/>
            <el-button v-permission="['131-141-142-17']" v-show="isReview3(scope.row)" :title="$t('updates.fjd')" type="success" size="mini" icon="el-icon-back" circle @click="handleReview3(scope.row)"/>
            <el-button v-permission="['131-141-142-2']" v-show="scope.row.judgeStat === 0" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
            <el-button v-permission="['131-141-142-50']" v-show="isReview5(scope.row)" type="primary" size="mini" @click="handlemove(scope.row)">{{ $t('public.move') }}</el-button>
            <!-- <el-button v-show="scope.row.judgeStat === 2" type="primary" size="mini" @click="handlemoveconfirm(scope.row)">{{ $t('Storagemove.moveoutconfirm') }}</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <my-edit :editcontrol.sync="editVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
      <my-edit3 :editcontrol.sync="editVisible3" :editdata.sync="personalForm" @rest="refreshlist"/>
      <!--修改结束=================================================-->
      <!--调入-->
      <my-edit2 :editcontrol.sync="moveVisible" :editdata.sync="personalForm" @rest="refreshlist"/>
    </el-card>
  </div>
</template>

<script>
import { getRepositoryList, detailList } from '@/api/Expenses'
import { regionlist } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import { searchlist, deletestoragemove, updateStoragemove2 } from '@/api/Storagemove'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyEdit from './components/MyEdit'
import MyEdit2 from './components/MyEdit2'
import MyEdit3 from './components/MyEdit3'
import MyRepository from './components/MyRepository2'
import MyAccept from './components/MyAccept'
import MyCreate from './components/MyCreate'
import MyDepot from './components/MyDepot'
import DetailList from './components/DetailList'

var _that
export default {
  name: 'StoragemoveList',
  directives: { waves, permission, permission2 },
  components: { DetailList, MyDepot, Pagination, MyEdit, MyRepository, MyAccept, MyCreate, MyEdit2, MyEdit3 },
  filters: {
    judgeStatFilter(status) {
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
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() - 8.64e7
        }
      },
      downloadLoading2: false,
      categoryVisible: false,
      isvoucherrep: false,
      respositoryarr: [],
      isvoucherregion: false,
      sendregionIds: [],
      regions: [],
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      voucherparms: {
        repositoryId: '',
        regionId: '',
        date: '',
        type: 6
      },
      // 调入控制
      moveVisible: false,
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
      // 调出仓库回显
      moveOutRepository: '',
      // 调入仓库回显
      moveInRepository: '',
      // 控制调出仓库选择窗口
      repositorycontrol: false,
      // 控制调入仓库选择窗口
      depotcontrol: false,
      // 开始时间到结束时间
      date: [],
      // 生产调拨列表传参数据
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
      personalForm2: {},
      // 修改控制修改组件数据
      editVisible: false,
      editVisible3: false
      // 列表结束 -------------------------
    }
  },
  activated() {
    this.getlist()
  },
  mounted() {
    this.getdeptlist()
    this.getlist()
    this.getallrepositorys()
    this.getallregionlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    confirm2(row) {
      console.log('row', row)
      this.personalForm2.id = row.id
      this.personalForm2.modifyStat = 1
      const parms = JSON.stringify(this.personalForm2)
      updateStoragemove2(parms).then(res => {
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
    closetag() {
      this.categoryVisible = false
      this.restvoucherparms()
    },
    restvoucherparms() {
      this.voucherparms = {
        repositoryId: '',
        regionId: '',
        date: '',
        type: 6
      }
      this.respositoryarr = []
      this.isvoucherregion = false
      this.isvoucherrep = false
    },
    handlevoucher() {
      console.log(this.voucherparms)
      if (this.voucherparms.date === '' || this.voucherparms.date === null || this.voucherparms.date === undefined) {
        this.$notify.error({
          title: this.$t('prompt.qxxzrq'),
          message: this.$t('prompt.qxxzrq'),
          offset: 100
        })
        return false
      }
      if (this.voucherparms.repositoryId === '' && this.voucherparms.regionId === '') {
        this.$notify.error({
          title: this.$t('prompt.qxxzmdhqy'),
          message: this.$t('prompt.qxxzmdhqy'),
          offset: 100
        })
        return false
      }

      detailList(this.voucherparms).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          if (res.data.data.content.length === 0) {
            this.$notify.error({
              title: '该门店或区域暂无凭证',
              message: '该门店或区域暂无凭证',
              offset: 100
            })
            return false
          } else {
            const senddata = {}
            senddata.voucherlist = res.data.data.content
            senddata.date = this.voucherparms.date
            senddata.regionId = this.voucherparms.regionId
            senddata.repositoryId = this.voucherparms.repositoryId
            senddata.type = this.voucherparms.type
            senddata.sourceType = 6

            this.$store.dispatch('getvoucherdata', senddata)
            this.$router.push({ path: '/Voucher/Newvoucher' })
          }
        }
      })
    },
    // 获取所有门店
    getallrepositorys() {
      getRepositoryList().then(res => {
        if (res.data.ret === 200) {
          this.respositoryarr = res.data.data.content.list
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
    // 获取所有区域
    getallregionlist() {
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
        }
      })
    },
    handlevoucherparms() {
      this.categoryVisible = true
    },
    choosevoucherrep(val) {
      console.log('val', val)
      if (val === '') {
        this.isvoucherregion = false
      } else {
        this.isvoucherregion = true
      }
    },
    // 根据区域选择门店
    handlechange4(val) {
      console.log(val)
      if (val.length === 0) {
        this.isvoucherrep = false
      } else {
        this.isvoucherrep = true
        this.voucherparms.regionId = val[val.length - 1]
      }
    },
    isshow9(row) {
      // console.log('调入确认', row.judgeStat === 2 && row.storageMoveDetailConfirmVos.length !== row.storageMoveDetailVos.length)
      // console.log('本人登录所在门店或者仓库', this.$store.getters.repositoryId)
      // console.log('本人登录所在区域', this.$store.getters.regionId)
      // console.log('本条数据上的调拨出库', row)
      let z = 2
      const moveconfirmbutton = row.storageMoveDetailVos
      for (const i in moveconfirmbutton) {
        if (moveconfirmbutton[i].stat === 1) {
          z = 1
          break
        }
      }
      if (row.judgeStat === 2 && row.storageMoveDetailConfirmVos.length !== row.storageMoveDetailVos.length && (this.$store.getters.repositoryId === row.moveOutRepository || (this.$store.getters.regionId === row.moveOutRepositoryRegion && this.$store.getters.repositoryId === 0))) {
        return true
      } else {
        return false
      }
    },
    isReview11(row) {
      if (row.modifyStat === 2 && (this.$store.getters.repositoryId === row.moveInRepository || (this.$store.getters.regionId === row.moveInRepositoryRegion && this.$store.getters.repositoryId === 0))) {
        return true
      } else {
        return false
      }
    },
    // 判断调入按钮
    isReview5(row) {
      let jungle1 = false
      let jungle2 = false
      if (row.businessStat === 4) {
        jungle1 = false
      } else {
        jungle1 = true
      }
      if (row.storageMoveDetailConfirmVos.length === row.storageMoveDetailVos.length) {
        jungle2 = true
      } else {
        jungle2 = false
      }
      if (row.judgeStat === 2 && jungle2 === true && jungle1 === true && (this.$store.getters.repositoryId === row.moveInRepository || (this.$store.getters.regionId === row.moveInRepositoryRegion && this.$store.getters.repositoryId === 0))) {
        return true
      }
    },
    handleDispatch3(row) {
      // console.log('row==============================>', row)
      this.editVisible3 = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.businessStat = String(row.businessStat)
      // console.log('personalForm==============================>', this.personalForm)
    },
    handleDispatch2(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.confirmPersonId = this.$store.getters.userId
      const parms = JSON.stringify(this.reviewParms)
      updateStoragemove2(parms).then(res => {
        if (res.data.ret === 200) {
          this.$message({
            type: 'success',
            message: 'success'
          })
          this.getlist()
        }
      })
    },
    // 判断反审批按钮
    isReview4(row) {
      // console.log(row.moveNumber, row.judgeStat === 2 && row.confirmOutPersonId === null && row.storageMoveDetailConfirmVos.length !== row.storageMoveDetailVos.length, row.judgeStat === 2, row.confirmOutPersonId === null, row.storageMoveDetailConfirmVos.length !== row.storageMoveDetailVos.length)
      let jungle = false
      if (row.storageMoveDetailConfirmVos.length === row.storageMoveDetailVos.length) {
        jungle = true
      } else {
        jungle = false
      }
      if (row.judgeStat === 2 && jungle === false) {
        return true
      }
    },
    // 反结单操作
    handleReview4(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.reviewParms.businessStat = 1
      this.$confirm(this.$t('prompt.qfsp'), this.$t('prompt.fsp'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.fsp'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 0
        const parms = JSON.stringify(this.reviewParms)
        updateStoragemove2(parms).then(res => {
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
      // console.log(row)
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
        updateStoragemove2(parms).then(res => {
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
    // 判断结单按钮(稍后修改)
    isReview2(row) {
      // console.log(row)
      if (row.businessStat === 4 && row.receiptStat !== 3) {
        return true // true
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
        updateStoragemove2(parms).then(res => {
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
    // 调入操作
    handlemove(row) {
      // console.log('rowmove==============================>', row)
      this.moveVisible = true
      // console.log('personalFormmove==============================>', this.personalForm)
      this.personalForm = Object.assign({}, row)
    },
    // 部门列表数据
    getdeptlist() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 调入仓库focus事件触发
    handlechooseDep() {
      this.depotcontrol = true
    },
    depotname(val) {
      this.moveInRepository = val.repositoryName
      this.getemplist.moveInRepository = val.id
    },
    // 调出仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      // console.log(val)
      this.moveOutRepository = val.repositoryName
      this.getemplist.moveOutRepository = val.id
    },
    getlist() {
    // 生产调拨列表数据
      this.listLoading = true
      searchlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          // console.log('this.list', this.list)
          this.total = res.data.data.content.totalCount
          this.listLoading = false
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
      })
    },
    // 清空搜索条件
    restFilter() {
      this.moveInRepository = ''
      this.getemplist.moveInRepository = ''
    },
    restFilter2() {
      this.moveOutRepository = ''
      this.getemplist.moveOutRepository = ''
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
      searchlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
          // this.restFilter()
        }
      })
    },
    // 修改操作
    handleEdit(row) {
      // console.log(row)
      this.editVisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.businessStat = String(row.businessStat)
      this.personalForm.moveType = String(row.moveType)
    },
    // 修改组件修改成功后返回
    refreshlist(val) {
      if (val === true) {
        this.getlist()
      }
    },
    // 详情操作
    handleDetail(row) {
      // console.log(row)
      this.detailvisible = true
      this.personalForm = Object.assign({}, row)
      this.personalForm.businessStat = String(row.businessStat)
    },
    // 判断审核按钮
    isReview(row) {
      const userepository = this.$store.getters.repositoryId
      console.log(this.$store.getters.userId)
      if (row.moveType === 1) {
        console.log('row', row)
        console.log('row.modifyStat', row.modifyStat)
        if (row.modifyStat === 1 && row.approvalUseVos !== '' && row.approvalUseVos !== null && row.approvalUseVos !== undefined && row.approvalUseVos.length !== 0 && (userepository === row.moveOutRepository || (this.$store.getters.regionId === row.moveOutRepositoryRegion && this.$store.getters.repositoryId === 0))) {
          console.log(1233444444)
          const approvalUse = row.approvalUseVos
          const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
          // console.log(approvalUse[approvalUse.length - 1].stepHandler)
          console.log(index)
          if (index > -1 && (row.judgeStat === 1 || row.judgeStat === 0)) {
            return true
          }
        } else {
          return false
        }
      } else if (row.moveType === 2) {
        if (row.approvalUseVos !== '' && row.approvalUseVos !== null && row.approvalUseVos !== undefined && row.approvalUseVos.length !== 0 && (userepository === row.moveInRepository || (this.$store.getters.regionId === row.moveInRepositoryRegion && this.$store.getters.repositoryId === 0))) {
          const approvalUse = row.approvalUseVos
          const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
          console.log(approvalUse[approvalUse.length - 1].stepHandler)
          console.log(index)
          if (index > -1 && (row.judgeStat === 1 || row.judgeStat === 0)) {
            return true
          }
        } else {
          return false
        }
      }
    },
    // 审批操作
    handleReview(row) {
      this.reviewParms = {}
      this.reviewParms.id = row.id
      this.reviewParms.judgePersonId = this.$store.getters.userId
      this.reviewParms.businessStat = 2
      this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.tg'),
        cancelButtonText: this.$t('prompt.btg'),
        type: 'warning'
      }).then(() => {
        this.reviewParms.judgeStat = 2
        const parms = JSON.stringify(this.reviewParms)
        updateStoragemove2(parms).then(res => {
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
          updateStoragemove2(parms).then(res => {
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
          deletestoragemove(ids, this.$store.getters.userId).then(res => {
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
        deletestoragemove(row.id, this.$store.getters.userId).then(res => {
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
      this.$router.push('/Storagemove/AddStoragemove')
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'StoragemoveName', 'StoragemoveShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
</style>
