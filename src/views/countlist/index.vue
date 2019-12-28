<template>
  <div class="ERP-container">
    <!-- 搜索条件栏目 -->
    <el-card class="box-card" style="margin-top: 15px;height: 60px">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="4">
            <el-form-item :label="$t('updates.cangk')">
              <el-input v-model="searchRepositoryId" :placeholder="$t('StockAlarm.searchRepositoryId')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep" @clear="clearFilter"/>
            </el-form-item>
            <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('updates.spbm')">
              <el-input v-model="getemplist.code" :placeholder="$t('StockAlarm.code')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('updates.spmc')">
              <el-input v-model="getemplist.productName" :placeholder="$t('StockAlarm.productName')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: 154px;">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 15px">
      <!-- 表格导出操作 -->
      <el-button v-permission="['131-153-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['131-153-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <my-repository2 :repositorycontrol.sync="repositorycontrol2" @repositoryname="repositoryname2"/>
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
          type="selection"
          width="55"
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.searchRepositoryId')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.code')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.productName')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.typeName')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('inventoryCollect.color')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.stockMeasurement')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockMeasurement }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.salePrice')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.salePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('countlist.existStock')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.existStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('countlist.onStock')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.onStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('countlist.ableStock')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.ableStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('countlist.safeStock')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.safeStock }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
    </el-card>
  </div>
</template>

<script>
import { countlist } from '@/api/StockAlarm'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyRepository from './components/MyRepository'
import MyRepository2 from './components/MyRepository2'
import MyAccept from './components/MyAccept'
import MyCreate from './components/MyCreate'
import printJS from 'print-js'

var _that
export default {
  name: 'StockAlarmList',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyRepository, MyAccept, MyCreate, MyRepository2 },
  filters: {
    flagStatFileter(status) {
      const statusMap = {
        1: '下限预警',
        2: '上线预警'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      todaydate: null,
      repositorycontrol2: false,
      // 搜索数据----------------------
      // 部门数据
      depts: [],
      // 仓库回显
      searchRepositoryId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 开始时间到结束时间
      date: [],
      // 预警列表传参数据
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
      listLoading: true
    }
  },

  mounted() {
    this.getlist()
    this.getdatatime()
  },
  beforeCreate() {
    _that = this
  },
  methods: {

    // 清空搜索仓库选择
    clearFilter() {
      console.log(123)
      this.getemplist.searchRepositoryId = ''
    },
    checkPermission,
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.searchRepositoryId = val.repositoryName
      this.getemplist.searchRepositoryId = val.id
    },
    getlist() {
      // 预警列表数据
      this.listLoading = true
      countlist(this.getemplist).then(res => {
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
      this.searchRepositoryId = ''
      this.getemplist.searchRepositoryId = ''
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      countlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          // this.restFilter()
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
          // this.restFilter()
        }
      })
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
          const filterVal = ['id', 'StockAlarmName', 'StockAlarmShortName', 'typeName', 'regionName', 'buyerName', 'levelName', 'createName', 'createTime']
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
    getdatatime() { // 默认显示今天
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
      this.todaydate = currentdate
    },
    cutnull(data) {
      for (const x in data) {
        if (data[x] === null || data[x] === undefined) { // 如果是null 把直接内容转为 ''
          data[x] = ''
        } else {
          if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
            data[x] = data[x].map(z => {
              return this.cutnull(z)
            })
          }
          if (typeof (data[x]) === 'object') { // 是json 递归继续处理
            data[x] = this.cutnull(data[x])
          }
        }
      }
      return data
    },
    // 打印
    handlePrint() {
      this.repositorycontrol2 = true
    },
    repositoryname2(val) {
      console.log('val======', val)
      this.getemplist.searchRepositoryId = val.id
      this.getemplist.pageNum = 1
      this.getemplist.pageSize = 999999
      countlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          // this.list = res.data.data.content.list
          // this.total = res.data.data.content.totalCount
          // this.restFilter()
          const tabeldata = this.cutnull(res.data.data.content.list)
          if (res.data.data.content.list.length === 0) {
            this.$notify.error({
              title: '错误',
              message: '该门店没有数据',
              offset: 100
            })
          } else {
            printJS({
              printable: tabeldata,
              type: 'json',
              properties: [
                { field: 'code', displayName: 'product coding', columnSize: `100px` },
                { field: 'productName', displayName: 'product name', columnSize: `100px` },
                { field: 'typeName', displayName: 'spec.', columnSize: `100px` },
                { field: 'color', displayName: 'Color', columnSize: `100px` },
                { field: 'stockMeasurement', displayName: 'unit', columnSize: `100px` },
                { field: 'salePrice', displayName: 'salePrice', columnSize: `100px` },
                { field: 'existStock', displayName: 'current stocks', columnSize: `100px` },
                { field: 'onStock', displayName: 'stocks intransit', columnSize: `100px` },
                { field: 'ableStock', displayName: 'available stocks', columnSize: `100px` },
                { field: 'safeStock', displayName: 'safe stocks', columnSize: `100px` }
              ],
              header: `<div class="pringtitle">
                    <div class="custom-p"></div>
                      <br>
                      <div class="ordername">Stocks search / 库存查询</div>
                        <br>
                        <div class="line1"></div>
                        <div class="supplier">
                        <div class="item">
                        <div class="itemname">repositoryName / 仓库：</div>
                        <div class="itemcontent">${val.repositoryName}</div>
                        </div>
                        <div class="item">
                         <div class="itemname">Date / 日期：</div>
                        <div class="itemcontent">${this.todaydate}</div>
                          </div>
                          </div>
                        </div>`,
              style: '.custom-p {font-size:20px;text-align: center; }' +
          ' .ordername {text-align: center; font-size:25px;}' +
          '.pringtitle { line-height: 10px; }' +
          '.line1 { width: 400px; border: 1px solid #000; margin: 0 auto }' +
          '.line2 {width: 200px; border: 2px dashed #000; margin: 3px auto }' +
          '.supplier {display: flex;justify-content: space-around; align-items: center;margin-top: 10px}' +
          '.item { width: 40%; justify-content: center; align-items: center; display: flex;line-height: 40px;}' +
          '.item2 { width: 50%; justify-content: center; align-items: center; display: flex}' +
          '.itemname2 { width: 20% }' +
          '.itemcontent2 {width: 80%}' +
          '.itemname { width: 90%; text-align: right }' +
          '.itemcontent {width: 85%}',
              gridHeaderStyle: 'font-size:12px; padding:3px; border:1px solid; color: #000; text-align:center;',
              gridStyle: 'font-size:12px; padding:3px; border:1px solid; text-align:center; text-overflow:ellipsis; white-space:nowrap;',
              repeatTableHeader: true
            })
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
          // this.restFilter()
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
