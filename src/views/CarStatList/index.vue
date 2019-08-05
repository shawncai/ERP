<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="5">
            <el-form-item label="车辆编号" label-width="100px">
              <el-input v-model="getemplist.carnumber" :placeholder="$t('CarStatList.carnumber')" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item label="车牌号">
              <el-input v-model="getemplist.licencenumber" placeholder="车牌号" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left: 10px">
            <el-form-item :label="$t('CarStatList.carStat')">
              <el-select v-model="getemplist.carStat" :value="getemplist.carStat" clearable @keyup.enter.native="handleFilter">
                <el-option value="1" label="正常"/>
                <el-option value="2" label="维修"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!--更多搜索条件-->
          <el-col :span="3">
            <el-popover
              v-model="visible2"
              placement="bottom"
              width="500"
              trigger="click">
              <el-select v-model="getemplist.carType" :value="getemplist.carType" placeholder="车辆型号" clearable style="width: 40%;float: left;margin-left: 20px">
                <el-option value="1" label="线下"/>
                <el-option value="2" label="线上"/>
              </el-select>
              <el-input v-model="outPersonId" :placeholder="$t('CarStatList.outPersonId')" style="width: 40%;float: right;margin-right: 20px" @focus="handlechooseStock"/>
              <my-emp :control.sync="stockControl" @stockName="stockName"/>
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
      <!--<el-dropdown @command="handleCommand">-->
      <!--<el-button v-waves class="filter-item" style="margin-left: 0" type="primary">-->
      <!--{{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon&#45;&#45;right"/>-->
      <!--</el-button>-->
      <!--<el-dropdown-menu slot="dropdown" style="width: 140px">-->
      <!--<el-dropdown-item v-permission="['54-57-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <!-- 表格导出操作 -->
      <el-button v-permission="['235-238-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['235-238-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="未使用车辆" name="first">
          <el-table
            v-loading="listLoading"
            :key="tableKey"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column
              type="selection"
              width="55"
              align="center"/>
            <el-table-column :label="$t('CarStatList.carnumber')" :resizable="false" fixed="left" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.carNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.licencenumber')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.licenceNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.carStat')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.carStat | carStatFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.carType')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.carType | carTypeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.driverNames')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.driverNames }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.outTime')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.outTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.returnTime')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.returnTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.outPersonId')" :resizable="false" prop="judgeStat" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.outPersonName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.stat')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | statFilter }}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 列表结束 -->
          <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
        </el-tab-pane>
        <el-tab-pane label="在途车辆" name="second">
          <el-table
            v-loading="listLoading2"
            :key="tableKey2"
            :data="list2"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column
              type="selection"
              width="55"
              align="center"/>
            <el-table-column :label="$t('CarStatList.carnumber')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.carNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.carName')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.carName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.licencenumber')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.licenceNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.carStat')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.carStat | carStatFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.carType')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.carType | carTypeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.orderType')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.orderType | sourceTypeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.orderNumber')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.orderNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.address')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.outTime2')" :resizable="false" prop="judgeStat" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.outTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.outPersonId')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.outPersonName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('CarStatList.outPersonPhone')" :resizable="false" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.outPersonPhone }}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 列表结束 -->
          <pagination v-show="total2>0" :total="total2" :page.sync="getemplist2.pageNum" :limit.sync="getemplist2.pageSize" @pagination="getlist2" />
        </el-tab-pane>
      </el-tabs>
      <!-- 列表开始 -->
      <!--修改开始=================================================-->
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import { carStatList } from '@/api/CarStatList'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission'
import MyEmp from '../AccessMaterials/components/MyEmp' // 权限判断函数

export default {
  name: 'Index',
  directives: { waves, permission, permission2 },
  components: { MyEmp, Pagination },
  filters: {
    judgeStatFilter(status) {
      const statusMap = {
        0: '未审核',
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
      return statusMap[status]
    },
    statFilter(status) {
      const statusMap = {
        1: '未出车',
        2: '出车'
      }
      return statusMap[status]
    },
    sourceTypeFilter(status) {
      const statusMap = {
        1: '销售出库单',
        2: '调拨单'
      }
      return statusMap[status]
    },
    carStatFilter(status) {
      const statusMap = {
        1: '正常',
        2: '维修'
      }
      return statusMap[status]
    },
    carTypeFilter(status) {
      const statusMap = {
        1: '线下',
        2: '线上'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      activeName2: 'first',
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
      // 出车人回显
      outPersonId: '',
      // 出车人控制框
      stockControl: false,
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
      // 采购申请查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10,
        stat: 1,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId
      },
      // 加载操作控制
      downloadLoading2: false,
      // 表格数据
      list2: [],
      // 表格数据条数
      total2: 0,
      // 表格识别
      tableKey2: 0,
      // 加载表格
      listLoading2: true,
      // 采购申请查询加展示参数
      getemplist2: {
        pageNum: 1,
        pageSize: 10,
        stat: 2,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionId
      },
      // 传给组件的数据
      personalForm: {},
      // 修改控制组件数据
      editVisible: false,
      // 开始时间到结束时间
      date: []
    }
  },
  mounted() {
    this.getlist()
    this.getlist2()
  },
  methods: {
    checkPermission,
    // 更新采购类型
    updatecountry() {
      this.getlist()
    },
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      carStatList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    getlist2() {
      // 物料需求计划列表数据
      this.listLoading2 = true
      carStatList(this.getemplist2).then(res => {
        if (res.data.ret === 200) {
          this.list2 = res.data.data.content.list
          this.total2 = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading2 = false
        }, 0.5 * 100)
      })
    },
    // 清空搜索条件
    restFilter() {
      this.outPersonId = ''
      this.getemplist.outPersonId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      carStatList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          this.restFilter()
        } else {
          this.restFilter()
        }
      })
      this.getemplist.pageNum = 2
      carStatList(this.getemplist2).then(res => {
        if (res.data.ret === 200) {
          this.list2 = res.data.data.content.list
          this.total2 = res.data.data.content.totalCount
          this.restFilter()
        } else {
          this.restFilter()
        }
      })
    },
    // 出车人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 出车人回显
    stockName(val) {
      this.outPersonId = val.personName
      this.getemplist.outPersonId = val.id
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'CarStatListName', 'CarStatListShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
  .ERP-container >>>  .el-form-item__label{
    color: #909399;
    text-align: left;
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
    margin: 0px 10px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 140px;
    margin-left: 30px;
  }
</style>
