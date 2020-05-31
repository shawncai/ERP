<template>
  <div class="ERP-container">
    <!-- 搜索条件栏目 -->
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="searchRepositoryId" :placeholder="$t('StockAlarm.searchRepositoryId')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep" @clear="clearFilter"/>

      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>

      <el-input v-model="getemplist.code" :placeholder="$t('StockAlarm.code')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-input v-model="getemplist.productName" :placeholder="$t('StockAlarm.productName')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>

      <el-select v-model="getemplist.productType" :placeholder="$t('Hmodule.qxzggxh')" size="small" class="filter-item" clearable>
        <el-option
          v-for="(item, index) in types"
          :key="index"
          :label="item.categoryName"
          :value="item.id"
        />
      </el-select>

      <el-select v-model="getemplist.productCategory" :placeholder="$t('updates.fle')" size="small" class="filter-item">
        <el-option :label="$t('otherlanguage.zc')" value="1"/>
        <el-option :label="$t('otherlanguage.pj')" value="2"/>
        <el-option :label="$t('otherlanguage.jgj')" value="3"/>
        <el-option :label="$t('otherlanguage.xhp')" value="4"/>
        <el-option :label="$t('otherlanguage.dc')" value="5"/>
        <el-option :label="$t('otherlanguage.xss')" value="6"/>
        <el-option :label="$t('otherlanguage.pjj')" value="7"/>
        <el-option :label="$t('otherlanguage.hj')" value="8"/>
      </el-select>

      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">

      <!-- 表格导出操作 -->
      <el-button v-permission="['131-153-6']" v-waves :loading="downloadLoading" size="small" class="filter-item2" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <!-- <el-button v-permission="['131-153-7']" v-waves size="small" class="filter-item2" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button> -->
      <my-repository2 :repositorycontrol.sync="repositorycontrol2" @repositoryname="repositoryname2"/>
    </el-card>
    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">

      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :key="tableKey"
        :data="list"
        :summary-method="getSummaries2"
        :height="tableHeight"
        show-summary
        border
        fit
        size="small"
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          min-width="55"
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('public.id')" :resizable="false" fixed="left" align="center" min-width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.code')" :resizable="false" prop="code" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.productName')" :resizable="false" prop="productName" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.typeName')" :resizable="false" prop="typeName" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('inventoryCollect.color')" :resizable="false" prop="color" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.color }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.stockMeasurement')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.stockMeasurement }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.salePrice')" :resizable="false" prop="salePrice" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.salePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('countlist.ableStock')" :resizable="false" prop="ableStock" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.ableStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('inventoryFluid.locationCode')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.locationCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('countlist.existStock')" :resizable="false" prop="existStock" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.existStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('countlist.onStock')" :resizable="false" prop="onStock" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.onStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('countlist.safeStock')" :resizable="false" prop="safeStock" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.safeStock }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('StockAlarm.searchRepositoryId')" :resizable="false" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
    </el-card>
  </div>
</template>

<script>
import { searchEmpCategory2 } from '@/api/Product'
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
  name: 'Countlist',
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
      tableHeight: 200,
      types: [],
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
      listLoading: false,
      totalExist: 0,
      totalOnStock: 0
    }
  },
  activated() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.getlist()
    this.getdatatime()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    // 总计
    getSummaries2(param) {
      console.log(param)
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 1) {
          sums[index] = ''
          return
        }
        if (index === 2) {
          sums[index] = ''
          return
        }
        if (index === 3) {
          sums[index] = ''
          return
        }
        if (index === 5) {
          sums[index] = ''
          return
        }
        if (index === 10) {
          sums[index] = this.totalExist
          return
        }
        if (index === 11) {
          sums[index] = this.totalOnStock
          return
        }
        const values = data.map(item => Number(item[column.property]))
        // if (!values.every(value => isNaN(value))) {
        //   sums[index] = values.reduce((prev, curr) => {
        //     const value = Number(curr)
        //     if (!isNaN(value)) {
        //       return (Number(prev) + Number(curr)).toFixed(6)
        //     } else {
        //       return (Number(prev)).toFixed(6)
        //     }
        //   }, 0)
        //   sums[index] += ''
        // } else {
        //   sums[index] = ''
        // }
      })
      return sums
    },
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
      searchEmpCategory2(2).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
      // 预警列表数据
      this.listLoading = true
      countlist(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list.filter(item => {
            return item.existStock !== 0
          })
          this.total = res.data.data.content.totalCount
          this.totalExist = res.data.data.total.totalExist
          this.totalOnStock = res.data.data.total.totalOnStock
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
          this.list = res.data.data.content.list.filter(item => {
            return item.existStock !== 0
          })
          this.total = res.data.data.content.totalCount
          this.totalExist = res.data.data.total.totalExist
          this.totalOnStock = res.data.data.total.totalOnStock
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
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['仓库', '商品编码', '物品名称', '现有库存', '型号', '种类', '颜色', '货位名称', '货位编号', '可用库存']
          const filterVal = ['repositoryName', 'code', 'productName', 'existStock', 'typeName', 'categoryName', 'color', 'locationName', 'locationCode', 'ableStock']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '库存信息表'
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
      var seperator2 = ':'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
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
          const nozerodata = res.data.data.content.list.filter(item => {
            return item.existStock !== 0
          })
          const tabeldata = this.cutnull(nozerodata)
          if (res.data.data.content.list.length === 0) {
            this.$notify.error({
              title: 'wrong',
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
                { field: 'safeStock', displayName: 'safe stocks', columnSize: `100px` },
                { field: 'locationCode', displayName: 'location', columnSize: `100px` }
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
          '.item { width: 50%; justify-content: center; align-items: center; display: flex;line-height: 40px;}' +
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
            title: 'wrong',
            message: 'wrong',
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
    margin-left:10px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
    width: 180px;
    margin-left: 10px;
    padding: 10px 0;
  }
  .filter-item2{
    width: 180px;
    margin-left: 5px;
    padding: 10px 0;
  }
  .box-card {
    /* border : 1px solid #f1f1ff !important; */
    border-bottom : 1px solid #f1f1ff00 !important
  }
</style>
