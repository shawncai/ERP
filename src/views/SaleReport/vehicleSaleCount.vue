<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">
      <el-input v-model="accessrepository" :placeholder="$t('updates.repository')" class="filter-item" clearable @keyup.enter.native="handleFilter" @focus="handlechooseRep" @clear="restFilter2"/>
      <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
      <el-cascader
        v-show="ishidden"
        :options="regions"
        :props="props"
        :show-all-levels="false"
        :placeholder="$t('Hmodule.xzqy')"
        change-on-select
        filterable
        clearable
        @change="handlechange4"
      />
      <el-date-picker
        v-model="date"
        :default-time="['00:00:00', '23:59:59']"
        type="daterange"
        range-separator="-"
        unlink-panels
        value-format="yyyy-MM-dd"
        style="width: 250px"/>

      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>

    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :data="list"
        :height="tableHeight"
        :summary-method="getSummaries2"
        show-summary
        size="small"
        border
        style="width: 100%"
        @row-click="clickRow">
        <el-table-column
          :label="$t('update4.md')"
          prop="repositoryName"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.zxl')"
          prop="allQuantity"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.xjxs')"
          prop="cashQuantity"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.fqxssl')"
          prop="installmentQuantity"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.xcxssl')"
          prop="newVehicleQuantity"
          sortable
          align="center"/>
        <el-table-column
          :label="$t('update4.escxssl')"
          prop="secondVehicleQuantity"
          sortable
          align="center"/>
      </el-table>
      <!-- 列表结束 -->
    </el-card>
  </div>
</template>

<script>
import { getregionlistbyreid } from '@/api/public'
import { vehicleSaleCount } from '@/api/count'
import { searchStockCategory } from '@/api/StockCategory'
import MyRepository from './components/MyRepository'
import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyDetail from './components/MyDetail'

var _that
export default {
  name: 'VehicleSaleCount',
  directives: { waves, permission, permission2 },
  components: { MyRepository, MyDetail },
  data() {
    return {
      ishidden: false,
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      regions: [],
      tableHeight: 200,
      getemplist: {
        repositoryId: this.$store.getters.repositoryId,
        beginTime: '',
        endTime: '',
        regionIds: this.$store.getters.regionId
      },
      date: [],
      list: [],
      control: false,
      repositorycontrol: false,
      accessrepository: '',
      listLoading: false
    }
  },
  activated() {
    this.getregions()
    this.judgehidden()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.getregions()
    this.judgehidden()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    judgehidden() {
      if (this.$store.getters.repositoryId === 0) {
        this.ishidden = true
      } else {
        this.ishidden = false
      }
    },
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    getregions() {
      const param = {}
      param.regionIds = this.$store.getters.regionId
      getregionlistbyreid(param).then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
          // this.getarrs()
        } else {
          console.log('区域列表出错')
        }
      })
    },
    handlechange4(val) {
      console.log(val)
      const finalid = val[val.length - 1]
      console.log(finalid)
      if (!finalid) {
        this.getemplist.regionIds = this.$store.getters.regionId
      } else {
        this.getemplist.regionIds = finalid
      }
      // searchRepository(finalid).then(res => {
      //   console.log(res)
      //   if (res.data.ret === 200) {
      //     this.repositories = res.data.data.content.list
      //   } else {
      //     console.log('区域选择门店')
      //   }
      // })
    },
    // 总计
    getSummaries2(param) {
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
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return (Number(prev) + Number(curr)).toFixed(6)
            } else {
              return (Number(prev)).toFixed(6)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    handleFilter() {
      if (this.date.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择日期开始搜索',
          offset: 100
        })
        return false
      }
      this.getemplist.beginTime = this.date[0] + ' 00:00:00'
      this.getemplist.endTime = this.date[1] + ' 23:59:59'
      console.log(this.getemplist)
      this.listLoading = true
      vehicleSaleCount(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        }
        this.listLoading = false
      })
    },
    handlechoosepro() {
      this.control = true
    },
    handlechooseRep() {
      this.repositorycontrol = true
    },
    productdetail(val) {
      this.getemplist.productCode = val.productCode
    },
    repositoryname(val) {
      console.log('repval', val)
      this.getemplist.repositoryId = val.id
      this.accessrepository = val.repositoryName
    },
    restFilter() {
      this.getemplist.productCode = ''
    },
    restFilter2() {
      this.getemplist.repositoryId = this.$store.getters.repositoryId
      this.accessrepository = ''
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
