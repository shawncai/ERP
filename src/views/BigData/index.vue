<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8" >
        <div class="chart-wrapper2">
          <div class="imformation" style="height: 33px">
            <div class="text" style="color: #57b2de;float: left">
              {{ $t('database.repairpercent') }}
            </div>
          <el-button style="float: right; padding: 3px 0" type="text" @click="seemore">{{ $t('database.moredata') }}</el-button></div>
          <pie-chart :pie-data="pieData" :pie-xdata="pieData2"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper2">
          <div class="imformation" style="height: 33px">
            <div v-if="zhuantype === 1" class="text" style="color: #57b2de;float:left;">
              {{ $t('database.repairfinish') }}
            </div>
            <div v-if="zhuantype === 2" class="text" style="color: #57b2de;float:left;">
              {{ $t('database.repairfinish2') }}
            </div>
            <el-button style="float: right; padding: 3px 0" type="text" @click="seemore2">{{ $t('database.moredata') }}</el-button>
          </div>
          <bar-chart :region-name="regionName" :per-cent="perCent"/>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="chart-wrapper">
        <div v-if="zhuantype === 1" class="text" style="color: #57b2de;float:left;">
          {{ $t('database.repairorder') }}
        </div>
        <div v-if="zhuantype === 2" class="text" style="color: #57b2de;float:left;">
          {{ $t('database.repairorder2') }}
        </div>
        <el-button v-waves class="filter-item" type="danger" style="float:left;margin-left: 22%" @click="resstart">{{ $t('database.sevendays') }}</el-button>
        <el-date-picker
          v-model="searchQuery.date2"
          :placeholder="$t('database.mounth')"
          type="month"
          value-format="yyyy-MM"
          class="filter-item"/>
        <el-date-picker
          v-model="searchQuery.date3"
          :placeholder="$t('database.year')"
          type="year"
          value-format="yyyy"
          class="filter-item"/>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <el-button style="float: right; padding: 3px 0" type="text" @click="seemore2">{{ $t('database.moredata') }}</el-button>
        <line-chart :region-name="regionName" :service-number="serviceNumber"/>
      </div>
    </el-row>
    <el-row>
      <div class="chart-wrapper">
        <el-button v-waves class="filter-item" type="danger" @click="resstart2">{{ $t('database.sevendays') }}</el-button>
        <el-date-picker
          v-model="searchQuery2.date2"
          :placeholder="$t('database.mounth')"
          type="month"
          value-format="yyyy-MM"
          class="filter-item"/>
        <el-date-picker
          v-model="searchQuery2.date3"
          :placeholder="$t('database.year')"
          type="year"
          value-format="yyyy"
          class="filter-item"/>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter2">{{ $t('table.search') }}</el-button>
        <el-button style="float: right; padding: 3px 0" type="text" @click="seemore3">{{ $t('database.moredata') }}</el-button>
        <el-tabs v-if="zhuantype === 1" v-model="activeName">
          <el-tab-pane :label="$t('database.quyufenpai')" name="first"><div class="text" style="color: #57b2de;text-align: center">{{ $t('database.quyufenpai') }}（h）</div><bar-chart2 v-if="activeName === 'first'" :region-name="regionName2" :asign-time="asignTime"/></el-tab-pane>
          <el-tab-pane :label="$t('database.quyurepair')" name="second"><div class="text" style="color: #57b2de;text-align: center">{{ $t('database.quyurepair') }}（day）</div><bar-chart3 v-if="activeName === 'second'" :region-name="regionName2" :delay-day="delayDay"/></el-tab-pane>
        </el-tabs>
        <el-tabs v-if="zhuantype === 2" v-model="activeName">
          <el-tab-pane :label="$t('database.quyufenpai2')" name="first"><div class="text" style="color: #57b2de;text-align: center">{{ $t('database.quyufenpai2') }}（h）</div><bar-chart2 v-if="activeName === 'first'" :region-name="regionName2" :asign-time="asignTime"/></el-tab-pane>
          <el-tab-pane :label="$t('database.quyurepair2')" name="second"><div class="text" style="color: #57b2de;text-align: center">{{ $t('database.quyurepair2') }}（day）</div><bar-chart3 v-if="activeName === 'second'" :region-name="regionName2" :delay-day="delayDay"/></el-tab-pane>
        </el-tabs>
      </div>
    </el-row>
    <el-dialog :visible.sync="tablevisible" :title="$t('database.repairpercent')" width="80%" top="20px" center>
      <el-table
        :data="list"
        border
        fit
        highlight-current-row
        height="800">
        <el-table-column :label="$t('database.Partname')" prop="item" align="center" top="-10px" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.item }}</span>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" :label="$t('database.repairpercent2')" prop="itemNum" align="center" min-width="150"/>
      </el-table>
    </el-dialog>
    <el-dialog v-if="zhuantype === 1" :visible.sync="tablevisible2" :title="$t('database.repairfinish')" width="80%" top="20px" center>
      <el-button v-waves class="filter-item" type="danger" style="float:left;margin-left: 22%;margin-bottom: 20px" @click="resstart">{{ $t('database.sevendays') }}</el-button>
      <el-date-picker
        v-model="searchQuery.date2"
        :placeholder="$t('database.mounth')"
        type="month"
        value-format="yyyy-MM"
        style="width: 200px;float:left;margin-left: 2%"
        class="filter-item"/>
      <el-date-picker
        v-model="searchQuery.date3"
        :placeholder="$t('database.year')"
        type="year"
        value-format="yyyy"
        style="width: 200px;float:left;margin-left: 2%"
        class="filter-item"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="float:left;margin-left: 2%" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-table
        :data="list2"
        border
        fit
        highlight-current-row
        height="525">
        <el-table-column v-if="type === 1" :label="$t('database.quyuname')" prop="value" align="center" top="-10px" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type === 2" :label="$t('database.branchname')" prop="value" align="center" top="-10px" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type === 3" :label="$t('database.employeename')" prop="value" align="center" top="-10px" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('database.Completionrate')" prop="percent" align="center" top="-10px" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.percent }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type !== 3" :label="$t('table.actions')" align="center" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('Complaint.seen') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog v-if="zhuantype === 2" :visible.sync="tablevisible2" :title="$t('database.repairfinish2')" width="80%" top="20px" center>
      <el-button v-waves class="filter-item" type="danger" style="float:left;margin-left: 22%;margin-bottom: 20px" @click="resstart">{{ $t('database.sevendays') }}</el-button>
      <el-date-picker
        v-model="searchQuery.date2"
        :placeholder="$t('database.mounth')"
        type="month"
        value-format="yyyy-MM"
        style="width: 200px;float:left;margin-left: 2%"
        class="filter-item"/>
      <el-date-picker
        v-model="searchQuery.date3"
        :placeholder="$t('database.year')"
        type="year"
        value-format="yyyy"
        style="width: 200px;float:left;margin-left: 2%"
        class="filter-item"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="float:left;margin-left: 2%" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-table
        :data="list2"
        border
        fit
        highlight-current-row
        height="525">
        <el-table-column v-if="type === 1" :label="$t('database.quyuname')" prop="value" align="center" top="-10px" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type === 2" :label="$t('database.branchname')" prop="value" align="center" top="-10px" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type === 3" :label="$t('database.employeename')" prop="value" align="center" top="-10px" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('database.Completionrate')" prop="percent" align="center" top="-10px" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.percent }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type !== 3" :label="$t('table.actions')" align="center" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('Complaint.seen') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="tablevisible3" :title="$t('database.Dispatching')" width="80%" top="20px" center>
      <el-button v-waves class="filter-item" type="danger" style="float:left;margin-left: 22%;margin-bottom: 20px" @click="resstart3">{{ $t('database.sevendays') }}</el-button>
      <el-date-picker
        v-model="searchQuery2.date2"
        :placeholder="$t('database.mounth')"
        type="month"
        value-format="yyyy-MM"
        style="width: 200px;float:left;margin-left: 2%"
        class="filter-item"/>
      <el-date-picker
        v-model="searchQuery2.date3"
        :placeholder="$t('database.year')"
        type="year"
        value-format="yyyy"
        style="width: 200px;float:left;margin-left: 2%"
        class="filter-item"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="float:left;margin-left: 2%" @click="handleFilter2">{{ $t('table.search') }}</el-button>
      <el-table
        :data="list3"
        :key="type"
        border
        fit
        highlight-current-row
        height="525">
        <el-table-column v-if="type2 === 1" :label="$t('database.quyuname')" prop="regionNameList" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.regionNameList }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type2 === 2" :label="$t('database.branchname')" prop="regionNameList" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.regionNameList }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type2 === 3" :label="$t('database.Ordernumber')" prop="code" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type2 === 3" :label="$t('database.Customername')" prop="personName" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.personName }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type2 === 3" :label="$t('database.Customerphone')" prop="phoneNumber" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type2 === 3" :label="$t('database.Submissiontime')" prop="createTime" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('database.dispatchdelay')" prop="asignTime" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.asignTime }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type2 !== 3" key="1" :label="$t('table.actions')" align="center" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate2(scope.row)">{{ $t('Complaint.seen') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="tablevisible4" :title="$t('database.Dispatching')" width="80%" top="20px" center>
      <el-button v-waves class="filter-item" type="danger" style="float:left;margin-left: 22%;margin-bottom: 20px" @click="resstart3">{{ $t('database.sevendays') }}</el-button>
      <el-date-picker
        v-model="searchQuery2.date2"
        :placeholder="$t('database.mounth')"
        type="month"
        value-format="yyyy-MM"
        style="width: 200px;float:left;margin-left: 2%"
        class="filter-item"/>
      <el-date-picker
        v-model="searchQuery2.date3"
        :placeholder="$t('database.year')"
        type="year"
        value-format="yyyy"
        style="width: 200px;float:left;margin-left: 2%"
        class="filter-item"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="float:left;margin-left: 2%" @click="handleFilter2">{{ $t('table.search') }}</el-button>
      <el-table
        :data="list3"
        :key="type"
        border
        fit
        highlight-current-row
        height="525">
        <el-table-column v-if="type2 === 1" :label="$t('database.quyuname')" prop="regionNameList" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.regionNameList }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type2 === 2" :label="$t('database.branchname')" prop="regionNameList" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.regionNameList }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type2 === 3" :label="$t('database.Ordernumber')" prop="code" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type2 === 3" :label="$t('database.Customername')" prop="personName" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.personName }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type2 === 3" :label="$t('database.Customerphone')" prop="phoneNumber" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type2 === 3" :label="$t('database.Submissiontime')" prop="createTime" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('database.dispatchdelay2')" prop="delayDay" align="center" center min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.delayDay }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type2 !== 3" key="1" :label="$t('table.actions')" align="center" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate2(scope.row)">{{ $t('Complaint.seen') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import PieChart from './components/PieChart'
import { sericecomponentcount, serviceitemscount2, delaycount, sericecomponentcount1, serviceitemscount3, serviceitemscountmen, delaycount2, delaycount2more } from '@/api/bigdata'
import waves from '@/directive/waves' // Waves directive
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import BarChart2 from './components/BarChart2'
import BarChart3 from './components/BarChart3'

export default {
  name: 'Index',
  components: { PieChart, BarChart, LineChart, BarChart2, BarChart3 },
  directives: { waves },
  data() {
    return {
      zhuantype: null,
      pieData: [],
      pieData2: [],
      regionName: [],
      regionName2: [],
      perCent: [],
      serviceNumber: [],
      activeName: 'first',
      asignTime: [],
      delayDay: [],
      listQuery: {
        regionid: this.$store.getters.regionid,
        date: null
      },
      listQuery2: {
        regionid: this.$store.getters.regionid,
        date: null
      },
      searchQuery: {
        date2: null,
        date3: null
      },
      searchQuery4: {
        date2: null,
        date3: null
      },
      date: null,
      searchQuery2: {
        date2: null,
        date3: null
      },
      searchQuery3: {
        date2: null,
        date3: null
      },
      date2: null,
      tablevisible: false,
      tablevisible2: false,
      tablevisible3: false,
      tablevisible4: false,
      list: null,
      allNum: null,
      list2: null,
      list3: null,
      list3a: [],
      list3b: [],
      list3c: [],
      percent: null,
      list2a: [],
      list2b: [],
      list2c: [],
      regionid: null,
      type: 1,
      type2: 1
    }
  },
  created() {
    this.getdatalist()
  },
  methods: {
    getdatalist() {
      sericecomponentcount().then(res => {
        this.pieData = res.data.data.content.map(function(obj, index) {
          const rObj = {}
          rObj.value = obj.itemNum// 添加id属性
          rObj.name = obj.item// 修改属性
          return rObj
        })
        this.pieData2 = res.data.data.content.map(function(obj, index) {
          return obj.itemNum
        })
      })
      serviceitemscount2(this.listQuery).then(res => {
        if (res.data.data.type === 2) {
          this.zhuantype = 2
          this.regionName = res.data.data.repositoryName
          this.perCent = res.data.data.percent.map(function(obj, index) {
            return parseFloat(obj)
          })
          this.serviceNumber = res.data.data.allServiceNumber
        } else if (res.data.data.type === 1) {
          this.zhuantype = 1
          console.log(res)
          this.regionName = res.data.data.regionName
          this.perCent = res.data.data.percent.map(function(obj, index) {
            return parseFloat(obj)
          })
          this.serviceNumber = res.data.data.allServiceNumber
        }
      })
      delaycount(this.listQuery2).then(res => {
        if (res.data.data.type === 1) {
          this.regionName2 = res.data.data.regionNameList
          this.asignTime = res.data.data.asignTime
          this.delayDay = res.data.data.delayDay
        } else if (res.data.data.type === 2) {
          this.regionName2 = res.data.data.repositoryNameList
          this.asignTime = res.data.data.asignTime
          this.delayDay = res.data.data.delayDay
        }
      })
    },
    handleFilter() {
      console.log(this.searchQuery)
      if (this.searchQuery.date2 == null) {
        console.log(111)
        this.listQuery.date = this.searchQuery.date3
        serviceitemscount2(this.listQuery).then(res => {
          if (res.data.data.type === 2) {
            this.regionName = res.data.data.repositoryName
            this.perCent = res.data.data.percent.map(function(obj, index) {
              return parseFloat(obj)
            })
            this.serviceNumber = res.data.data.allServiceNumber
          } else if (res.data.data.type === 1) {
            this.zhuantype = 1
            console.log(res)
            this.regionName = res.data.data.regionName
            this.perCent = res.data.data.percent.map(function(obj, index) {
              return parseFloat(obj)
            })
            this.serviceNumber = res.data.data.allServiceNumber
          }
        })
        serviceitemscount3(this.listQuery).then(res => {
          if (res.data.data.type === 1) {
            this.list2a = res.data.data.regionIdList
            this.list2b = res.data.data.regionName
            this.list2c = res.data.data.percent
            var arr = []
            var arr2 = []
            for (var i = 0; i < this.list2a.length; i++) {
              var obj = {}
              for (var j = 0; j < this.list2b.length; j++) {
                if (i === j) {
                  obj.name = this.list2a[i]
                  obj.value = this.list2b[j]
                  arr.push(obj)
                }
              }
            }
            for (var i2 = 0; i2 < arr.length; i2++) {
              var obj2 = {}
              for (var j2 = 0; j2 < this.list2c.length; j2++) {
                if (i2 === j2) {
                  obj2.name = arr[i2].name
                  obj2.value = arr[i2].value
                  obj2.percent = this.list2c[j2]
                  arr2.push(obj2)
                }
              }
            }
            this.list2 = arr2
          } else if (res.data.data.type === 2) {
            this.list2a = res.data.data.employeeIdList
            this.list2b = res.data.data.employeeName
            this.list2c = res.data.data.percent
            const arr = []
            const arr2 = []
            for (let i = 0; i < this.list2a.length; i++) {
              const obj = {}
              for (let j = 0; j < this.list2b.length; j++) {
                if (i === j) {
                  obj.name = this.list2a[i]
                  obj.value = this.list2b[j]
                  arr.push(obj)
                }
              }
            }
            for (let i2 = 0; i2 < arr.length; i2++) {
              const obj2 = {}
              for (let j2 = 0; j2 < this.list2c.length; j2++) {
                if (i2 === j2) {
                  obj2.name = arr[i2].name
                  obj2.value = arr[i2].value
                  obj2.percent = this.list2c[j2]
                  arr2.push(obj2)
                }
              }
            }
            this.list2 = arr2
          }
        })
      } else {
        this.listQuery.date = this.searchQuery.date2
        serviceitemscount2(this.listQuery).then(res => {
          if (res.data.data.type === 1) {
            this.regionName = res.data.data.regionName
            this.perCent = res.data.data.percent.map(function(obj, index) {
              return parseFloat(obj)
            })
            this.serviceNumber = res.data.data.allServiceNumber
          } else if (res.data.data.type === 2) {
            this.regionName = res.data.data.repositoryName
            this.perCent = res.data.data.percent.map(function(obj, index) {
              return parseFloat(obj)
            })
            this.serviceNumber = res.data.data.allServiceNumber
          }
        })
        serviceitemscount3(this.listQuery).then(res => {
          if (res.data.data.type === 1) {
            this.list2a = res.data.data.regionIdList
            this.list2b = res.data.data.regionName
            this.list2c = res.data.data.percent
            const arr = []
            const arr2 = []
            for (let i = 0; i < this.list2a.length; i++) {
              const obj = {}
              for (let j = 0; j < this.list2b.length; j++) {
                if (i === j) {
                  obj.name = this.list2a[i]
                  obj.value = this.list2b[j]
                  arr.push(obj)
                }
              }
            }
            for (let i2 = 0; i2 < arr.length; i2++) {
              const obj2 = {}
              for (let j2 = 0; j2 < this.list2c.length; j2++) {
                if (i2 === j2) {
                  obj2.name = arr[i2].name
                  obj2.value = arr[i2].value
                  obj2.percent = this.list2c[j2]
                  arr2.push(obj2)
                }
              }
            }
            this.list2 = arr2
          } else if (res.data.data.type === 2) {
            this.list2a = res.data.data.regionIdList
            this.list2b = res.data.data.regionName
            this.list2c = res.data.data.percent
            const arr = []
            const arr2 = []
            for (let i = 0; i < this.list2a.length; i++) {
              const obj = {}
              for (let j = 0; j < this.list2b.length; j++) {
                if (i === j) {
                  obj.name = this.list2a[i]
                  obj.value = this.list2b[j]
                  arr.push(obj)
                }
              }
            }
            for (let i2 = 0; i2 < arr.length; i2++) {
              const obj2 = {}
              for (let j2 = 0; j2 < this.list2c.length; j2++) {
                if (i2 === j2) {
                  obj2.name = arr[i2].name
                  obj2.value = arr[i2].value
                  obj2.percent = this.list2c[j2]
                  arr2.push(obj2)
                }
              }
            }
            this.list2 = arr2
          }
        })
      }
    },
    resstart() {
      sericecomponentcount().then(res => {
        this.pieData = res.data.data.content.map(function(obj, index) {
          const rObj = {}
          rObj.value = obj.itemNum// 添加id属性
          rObj.name = obj.item// 修改属性
          return rObj
        })
        this.pieData2 = res.data.data.content.map(function(obj, index) {
          return obj.itemNum
        })
      })
      serviceitemscount2(this.listQuery).then(res => {
        if (res.data.data.type === 2) {
          this.zhuantype = 2
          this.regionName = res.data.data.repositoryName
          this.perCent = res.data.data.percent.map(function(obj, index) {
            return parseFloat(obj)
          })
          this.serviceNumber = res.data.data.allServiceNumber
        } else if (res.data.data.type === 1) {
          this.zhuantype = 1
          console.log(res)
          this.regionName = res.data.data.regionName
          this.perCent = res.data.data.percent.map(function(obj, index) {
            return parseFloat(obj)
          })
          this.serviceNumber = res.data.data.allServiceNumber
        }
      })
    },
    handleFilter2() {
      if (this.activeName === 'first') {
        if (this.searchQuery2.date2 == null) {
          this.listQuery2.date = this.searchQuery2.date3
          delaycount(this.listQuery2).then(res => {
            if (res.data.data.type === 1) {
              this.regionName2 = res.data.data.regionNameList
              this.asignTime = res.data.data.asignTime
              this.delayDay = res.data.data.delayDay
            } else if (res.data.data.type === 2) {
              this.regionName2 = res.data.data.repositoryNameList
              this.asignTime = res.data.data.asignTime
              this.delayDay = res.data.data.delayDay
            }
          })
          delaycount2(this.listQuery2).then(res => {
            if (res.data.data.type === 1) {
              this.list3a = res.data.data.regionIdList
              this.list3b = res.data.data.regionNameList
              this.list3c = res.data.data.asignTime
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.asignTime = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            } else if (res.data.data.type === 2) {
              this.list3a = res.data.data.repositoryIdList
              this.list3b = res.data.data.repositoryNameList
              this.list3c = res.data.data.asignTime
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.asignTime = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            }
          })
        } else {
          this.listQuery2.date = this.searchQuery2.date2
          delaycount(this.listQuery2).then(res => {
            if (res.data.data.type === 1) {
              this.regionName2 = res.data.data.regionNameList
              this.asignTime = res.data.data.asignTime
              this.delayDay = res.data.data.delayDay
            } else if (res.data.data.type === 2) {
              this.regionName2 = res.data.data.repositoryNameList
              this.asignTime = res.data.data.asignTime
              this.delayDay = res.data.data.delayDay
            }
          })
          delaycount2(this.listQuery2).then(res => {
            if (res.data.data.type === 1) {
              this.list3a = res.data.data.regionIdList
              this.list3b = res.data.data.regionNameList
              this.list3c = res.data.data.asignTime
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.asignTime = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            } else if (res.data.data.type === 2) {
              this.list3a = res.data.data.repositoryIdList
              this.list3b = res.data.data.repositoryNameList
              this.list3c = res.data.data.asignTime
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.asignTime = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            }
          })
        }
      } else {
        if (this.searchQuery2.date2 == null) {
          this.listQuery2.date = this.searchQuery2.date3
          delaycount(this.listQuery2).then(res => {
            if (res.data.data.type === 1) {
              this.regionName2 = res.data.data.regionNameList
              this.asignTime = res.data.data.asignTime
              this.delayDay = res.data.data.delayDay
            } else if (res.data.data.type === 2) {
              this.regionName2 = res.data.data.repositoryNameList
              this.asignTime = res.data.data.asignTime
              this.delayDay = res.data.data.delayDay
            }
          })
          delaycount2(this.listQuery2).then(res => {
            if (res.data.data.type === 1) {
              this.list3a = res.data.data.regionIdList
              this.list3b = res.data.data.regionNameList
              this.list3c = res.data.data.asignTime
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.asignTime = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            } else if (res.data.data.type === 2) {
              this.list3a = res.data.data.repositoryIdList
              this.list3b = res.data.data.repositoryNameList
              this.list3c = res.data.data.asignTime
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.asignTime = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            }
          })
        } else {
          this.listQuery2.date = this.searchQuery2.date2
          delaycount(this.listQuery2).then(res => {
            if (res.data.data.type === 1) {
              this.regionName2 = res.data.data.regionNameList
              this.asignTime = res.data.data.asignTime
              this.delayDay = res.data.data.delayDay
            } else if (res.data.data.type === 2) {
              this.regionName2 = res.data.data.repositoryNameList
              this.asignTime = res.data.data.asignTime
              this.delayDay = res.data.data.delayDay
            }
          })
          delaycount2(this.listQuery2).then(res => {
            if (res.data.data.type === 1) {
              this.list3a = res.data.data.regionIdList
              this.list3b = res.data.data.regionNameList
              this.list3c = res.data.data.delayDay
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.delayDay = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            } else if (res.data.data.type === 2) {
              this.list3a = res.data.data.repositoryIdList
              this.list3b = res.data.data.repositoryNameList
              this.list3c = res.data.data.delayDay
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.delayDay = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            }
          })
        }
      }
    },
    resstart2() {
      delaycount(this.listQuery2).then(res => {
        if (res.data.data.type === 1) {
          this.regionName2 = res.data.data.regionNameList
          this.asignTime = res.data.data.asignTime
          this.delayDay = res.data.data.delayDay
        } else if (res.data.data.type === 2) {
          this.regionName2 = res.data.data.repositoryNameList
          this.asignTime = res.data.data.asignTime
          this.delayDay = res.data.data.delayDay
        }
      })
    },
    seemore() {
      this.tablevisible = true
      sericecomponentcount1().then(res => {
        this.list = res.data.data.content
        this.allNum = res.data.data.allNum
      })
    },
    formatter(row, column) {
      return row.itemNum / this.allNum * 100
    },
    restartform() {
      this.list2 = null
      this.percent = null
      this.list2a = []
      this.list2b = []
      this.list2c = []
      this.type = 1
      this.date = null
      this.searchQuery2 = {
        date2: null,
        date3: null
      }
      this.listQuery = {
        regionid: this.$store.getters.regionid,
        date: ''
      }
    },
    seemore2() {
      this.tablevisible2 = true
      this.restartform()
      serviceitemscount3(this.listQuery).then(res => {
        if (res.data.data.type === 1) {
          this.list2a = res.data.data.regionIdList
          this.list2b = res.data.data.regionName
          this.list2c = res.data.data.percent
          const arr = []
          const arr2 = []
          for (let i = 0; i < this.list2a.length; i++) {
            const obj = {}
            for (let j = 0; j < this.list2b.length; j++) {
              if (i === j) {
                obj.name = this.list2a[i]
                obj.value = this.list2b[j]
                arr.push(obj)
              }
            }
          }
          for (let i2 = 0; i2 < arr.length; i2++) {
            const obj2 = {}
            for (let j2 = 0; j2 < this.list2c.length; j2++) {
              if (i2 === j2) {
                obj2.name = arr[i2].name
                obj2.value = arr[i2].value
                obj2.percent = this.list2c[j2]
                arr2.push(obj2)
              }
            }
          }
          this.list2 = arr2
        } else if (res.data.data.type === 2) {
          this.type = 2
          this.list2a = res.data.data.repositoryIdList
          this.list2b = res.data.data.repositoryName
          this.list2c = res.data.data.percent
          const arr = []
          const arr2 = []
          for (let i = 0; i < this.list2a.length; i++) {
            const obj = {}
            for (let j = 0; j < this.list2b.length; j++) {
              if (i === j) {
                obj.name = this.list2a[i]
                obj.value = this.list2b[j]
                arr.push(obj)
              }
            }
          }
          for (let i2 = 0; i2 < arr.length; i2++) {
            const obj2 = {}
            for (let j2 = 0; j2 < this.list2c.length; j2++) {
              if (i2 === j2) {
                obj2.name = arr[i2].name
                obj2.value = arr[i2].value
                obj2.percent = this.list2c[j2]
                arr2.push(obj2)
              }
            }
          }
          this.list2 = arr2
        }
      })
    },
    handleUpdate(row) {
      if (this.searchQuery.date2 == null) {
        this.listQuery.date = this.searchQuery.date3
        this.listQuery.regionid = row.name
        serviceitemscount3(this.listQuery).then(res => {
          if (res.data.data.type === 1) {
            if (this.type === 1) {
              if (Array.isArray(res.data.data.regionIdList) === true) {
                this.type = res.data.data.type
                this.list2a = res.data.data.regionIdList
                this.list2b = res.data.data.regionName
                this.list2c = res.data.data.percent
                const arr = []
                const arr2 = []
                for (let i = 0; i < this.list2a.length; i++) {
                  const obj = {}
                  for (let j = 0; j < this.list2b.length; j++) {
                    if (i === j) {
                      obj.name = this.list2a[i]
                      obj.value = this.list2b[j]
                      arr.push(obj)
                    }
                  }
                }
                for (let i2 = 0; i2 < arr.length; i2++) {
                  const obj2 = {}
                  for (let j2 = 0; j2 < this.list2c.length; j2++) {
                    if (i2 === j2) {
                      obj2.name = arr[i2].name
                      obj2.value = arr[i2].value
                      obj2.percent = this.list2c[j2]
                      arr2.push(obj2)
                    }
                  }
                }
                this.list2 = arr2
              } else {
                this.type = res.data.data.type
                this.list2a = res.data.data.repositoryIdList
                this.list2b = res.data.data.repositoryName
                this.list2c = res.data.data.percent
                const arr = []
                const arr2 = []
                for (let i = 0; i < this.list2a.length; i++) {
                  const obj = {}
                  for (let j = 0; j < this.list2b.length; j++) {
                    if (i === j) {
                      obj.name = this.list2a[i]
                      obj.value = this.list2b[j]
                      arr.push(obj)
                    }
                  }
                }
                for (let i2 = 0; i2 < arr.length; i2++) {
                  const obj2 = {}
                  for (let j2 = 0; j2 < this.list2c.length; j2++) {
                    if (i2 === j2) {
                      obj2.name = arr[i2].name
                      obj2.value = arr[i2].value
                      obj2.percent = this.list2c[j2]
                      arr2.push(obj2)
                    }
                  }
                }
                this.list2 = arr2
              }
            } else if (this.type === 2) {
              serviceitemscountmen(row.name, this.date).then(restult => {
                this.type = restult.data.data.type
                this.list2a = restult.data.data.employeeIdList
                this.list2b = restult.data.data.employeeName
                this.list2c = restult.data.data.percent
                const arr = []
                const arr2 = []
                for (let i = 0; i < this.list2a.length; i++) {
                  const obj = {}
                  for (let j = 0; j < this.list2b.length; j++) {
                    if (i === j) {
                      obj.name = this.list2a[i]
                      obj.value = this.list2b[j]
                      arr.push(obj)
                    }
                  }
                }
                for (let i2 = 0; i2 < arr.length; i2++) {
                  const obj2 = {}
                  for (let j2 = 0; j2 < this.list2c.length; j2++) {
                    if (i2 === j2) {
                      obj2.name = arr[i2].name
                      obj2.value = arr[i2].value
                      obj2.percent = this.list2c[j2]
                      arr2.push(obj2)
                    }
                  }
                }
                this.list2 = arr2
              })
            }
          } else if (res.data.data.type === 2) {
            console.log(123)
            serviceitemscountmen(row.name, this.date).then(restult => {
              this.type = restult.data.data.type
              this.list2a = restult.data.data.employeeIdList
              this.list2b = restult.data.data.employeeName
              this.list2c = restult.data.data.percent
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list2a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list2b.length; j++) {
                  if (i === j) {
                    obj.name = this.list2a[i]
                    obj.value = this.list2b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list2c.length; j2++) {
                  if (i2 === j2) {
                    obj2.name = arr[i2].name
                    obj2.value = arr[i2].value
                    obj2.percent = this.list2c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list2 = arr2
            })
          }
        })
      } else {
        this.date = this.searchQuery.date2
        serviceitemscount3(row.name, this.date).then(res => {
          if (this.type === 1) {
            if (Array.isArray(res.data.data.regionIdList) === true) {
              this.type = res.data.data.type
              this.list2a = res.data.data.regionIdList
              this.list2b = res.data.data.regionName
              this.list2c = res.data.data.percent
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list2a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list2b.length; j++) {
                  if (i === j) {
                    obj.name = this.list2a[i]
                    obj.value = this.list2b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list2c.length; j2++) {
                  if (i2 === j2) {
                    obj2.name = arr[i2].name
                    obj2.value = arr[i2].value
                    obj2.percent = this.list2c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list2 = arr2
            } else {
              this.type = res.data.data.type
              this.list2a = res.data.data.repositoryIdList
              this.list2b = res.data.data.repositoryName
              this.list2c = res.data.data.percent
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list2a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list2b.length; j++) {
                  if (i === j) {
                    obj.name = this.list2a[i]
                    obj.value = this.list2b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list2c.length; j2++) {
                  if (i2 === j2) {
                    obj2.name = arr[i2].name
                    obj2.value = arr[i2].value
                    obj2.percent = this.list2c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list2 = arr2
            }
          } else if (this.type === 2) {
            serviceitemscountmen(row.name, this.date).then(restult => {
              this.type = restult.data.data.type
              this.list2a = restult.data.data.employeeIdList
              this.list2b = restult.data.data.employeeName
              this.list2c = restult.data.data.percent
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list2a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list2b.length; j++) {
                  if (i === j) {
                    obj.name = this.list2a[i]
                    obj.value = this.list2b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list2c.length; j2++) {
                  if (i2 === j2) {
                    obj2.name = arr[i2].name
                    obj2.value = arr[i2].value
                    obj2.percent = this.list2c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list2 = arr2
            })
          }
        })
      }
    },
    restartform2() {
      this.list3 = null
      this.list3a = []
      this.list3b = []
      this.list3c = []
      this.type2 = 1
      this.date2 = null
      this.searchQuery2 = {
        date2: null,
        date3: null
      }
      this.listQuery2 = {
        regionid: this.$store.getters.regionid,
        date: ''
      }
    },
    seemore3() {
      this.restartform2()
      if (this.activeName === 'first') {
        this.tablevisible3 = true
        if (this.searchQuery2.date2 == null) {
          this.listQuery2.date = this.searchQuery2.date3
          delaycount2(this.listQuery2).then(res => {
            this.type2 = res.data.data.type
            if (res.data.data.type === 1) {
              this.list3a = res.data.data.regionIdList
              this.list3b = res.data.data.regionNameList
              this.list3c = res.data.data.asignTime
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.asignTime = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            } else if (res.data.data.type === 2) {
              console.log(res)
              this.list3a = res.data.data.repositoryIdList
              this.list3b = res.data.data.repositoryNameList
              this.list3c = res.data.data.asignTime
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.asignTime = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            }
          })
        } else {
          this.listQuery2.date = this.searchQuery2.date2
          console.log(this.date2)
          delaycount2(this.listQuery2).then(res => {
            this.type2 = res.data.data.type
            if (res.data.data.type === 1) {
              this.list3a = res.data.data.regionIdList
              this.list3b = res.data.data.regionNameList
              this.list3c = res.data.data.asignTime
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.asignTime = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            } else if (res.data.data.type === 2) {
              console.log(res)
              this.list3a = res.data.data.repositoryIdList
              this.list3b = res.data.data.repositoryNameList
              this.list3c = res.data.data.asignTime
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.asignTime = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            }
          })
        }
      } else {
        this.restartform2()
        this.tablevisible4 = true
        if (this.searchQuery2.date2 == null) {
          this.listQuery2.date2 = this.searchQuery2.date3
          delaycount2(this.listQuery2).then(res => {
            this.type2 = res.data.data.type
            if (res.data.data.type === 1) {
              this.list3a = res.data.data.regionIdList
              this.list3b = res.data.data.regionNameList
              this.list3c = res.data.data.delayDay
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.delayDay = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            } else if (res.data.data.type === 2) {
              console.log(res)
              this.list3a = res.data.data.repositoryIdList
              this.list3b = res.data.data.repositoryNameList
              this.list3c = res.data.data.delayDay
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.delayDay = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            }
          })
        } else {
          this.listQuery2.date = this.searchQuery2.date2
          console.log(this.date2)
          delaycount2(this.listQuery2).then(res => {
            if (res.data.data.type === 1) {
              this.list3a = res.data.data.regionIdList
              this.list3b = res.data.data.regionNameList
              this.list3c = res.data.data.asignTime
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.asignTime = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            } else if (res.data.data.type === 2) {
              console.log(res)
              this.list3a = res.data.data.repositoryIdList
              this.list3b = res.data.data.repositoryNameList
              this.list3c = res.data.data.asignTime
              const arr = []
              const arr2 = []
              for (let i = 0; i < this.list3a.length; i++) {
                const obj = {}
                for (let j = 0; j < this.list3b.length; j++) {
                  if (i === j) {
                    obj.regionIdList = this.list3a[i]
                    obj.regionNameList = this.list3b[j]
                    arr.push(obj)
                  }
                }
              }
              for (let i2 = 0; i2 < arr.length; i2++) {
                const obj2 = {}
                for (let j2 = 0; j2 < this.list3c.length; j2++) {
                  if (i2 === j2) {
                    obj2.regionIdList = arr[i2].regionIdList
                    obj2.regionNameList = arr[i2].regionNameList
                    obj2.asignTime = this.list3c[j2]
                    arr2.push(obj2)
                  }
                }
              }
              this.list3 = arr2
            }
          })
        }
      }
    },
    resstart3() {
      sericecomponentcount().then(res => {
        this.pieData = res.data.data.content.map(function(obj, index) {
          const rObj = {}
          rObj.value = obj.itemNum// 添加id属性
          rObj.name = obj.item// 修改属性
          return rObj
        })
        this.pieData2 = res.data.data.content.map(function(obj, index) {
          return obj.itemNum
        })
      })
      serviceitemscount2(this.listQuery).then(res => {
        if (res.data.data.type === 2) {
          this.zhuantype = 2
          this.regionName = res.data.data.repositoryName
          this.perCent = res.data.data.percent.map(function(obj, index) {
            return parseFloat(obj)
          })
          this.serviceNumber = res.data.data.allServiceNumber
        } else if (res.data.data.type === 1) {
          this.zhuantype = 1
          console.log(res)
          this.regionName = res.data.data.regionName
          this.perCent = res.data.data.percent.map(function(obj, index) {
            return parseFloat(obj)
          })
          this.serviceNumber = res.data.data.allServiceNumber
        }
      })
    },
    handleUpdate2(row) {
      if (this.activeName === 'first') {
        if (this.searchQuery2.date2 == null) {
          this.listQuery2.date = this.searchQuery2.date3
          this.listQuery2.regionid = row.regionIdList
          delaycount2(this.listQuery2).then(res => {
            if (res.data.data.type === 1) {
              if (this.type2 === 1) {
                if (Array.isArray(res.data.data.regionIdList) === true) {
                  this.type2 = res.data.data.type
                  this.list3a = res.data.data.regionIdList
                  this.list3b = res.data.data.regionNameList
                  this.list3c = res.data.data.asignTime
                  const arr = []
                  const arr2 = []
                  for (let i = 0; i < this.list3a.length; i++) {
                    const obj = {}
                    for (let j = 0; j < this.list3b.length; j++) {
                      if (i === j) {
                        obj.regionIdList = this.list3a[i]
                        obj.regionNameList = this.list3b[j]
                        arr.push(obj)
                      }
                    }
                  }
                  for (let i2 = 0; i2 < arr.length; i2++) {
                    const obj2 = {}
                    for (let j2 = 0; j2 < this.list3c.length; j2++) {
                      if (i2 === j2) {
                        obj2.regionNameList = arr[i2].regionNameList
                        obj2.regionIdList = arr[i2].regionIdList
                        obj2.asignTime = this.list3c[j2]
                        arr2.push(obj2)
                      }
                    }
                  }
                  this.list3 = arr2
                } else {
                  this.type2 = res.data.data.type
                  this.list3a = res.data.data.repositoryIdList
                  this.list3b = res.data.data.repositoryNameList
                  this.list3c = res.data.data.asignTime
                  const arr = []
                  const arr2 = []
                  for (let i = 0; i < this.list3a.length; i++) {
                    const obj = {}
                    for (let j = 0; j < this.list3b.length; j++) {
                      if (i === j) {
                        obj.regionIdList = this.list3a[i]
                        obj.regionNameList = this.list3b[j]
                        arr.push(obj)
                      }
                    }
                  }
                  for (let i2 = 0; i2 < arr.length; i2++) {
                    const obj2 = {}
                    for (let j2 = 0; j2 < this.list3c.length; j2++) {
                      if (i2 === j2) {
                        obj2.regionNameList = arr[i2].regionNameList
                        obj2.regionIdList = arr[i2].regionIdList
                        obj2.asignTime = this.list3c[j2]
                        arr2.push(obj2)
                      }
                    }
                  }
                  this.list3 = arr2
                }
              } else if (this.type2 === 2) {
                delaycount2more(this.date2, row.regionIdList).then(res => {
                  this.type2 = 3
                  this.list3 = res.data.data.content
                })
              }
            } else if (res.data.data.type === 2) {
              this.type2 === 2
              delaycount2more(this.date2, row.regionIdList).then(res => {
                this.type2 = 3
                this.list3 = res.data.data.content
              })
            }
          })
        } else {
          this.listQuery2.date = this.searchQuery2.date2
          this.listQuery2.regionid = row.regionIdList
          delaycount2(this.listQuery2).then(res => {
            if (res.data.data.type === 1) {
              if (this.type2 === 1) {
                if (Array.isArray(res.data.data.regionIdList) === true) {
                  this.type2 = res.data.data.type
                  this.list3a = res.data.data.regionIdList
                  this.list3b = res.data.data.regionNameList
                  this.list3c = res.data.data.asignTime
                  const arr = []
                  const arr2 = []
                  for (let i = 0; i < this.list3a.length; i++) {
                    const obj = {}
                    for (let j = 0; j < this.list3b.length; j++) {
                      if (i === j) {
                        obj.regionIdList = this.list3a[i]
                        obj.regionNameList = this.list3b[j]
                        arr.push(obj)
                      }
                    }
                  }
                  for (let i2 = 0; i2 < arr.length; i2++) {
                    const obj2 = {}
                    for (let j2 = 0; j2 < this.list3c.length; j2++) {
                      if (i2 === j2) {
                        obj2.regionNameList = arr[i2].regionNameList
                        obj2.regionIdList = arr[i2].regionIdList
                        obj2.asignTime = this.list3c[j2]
                        arr2.push(obj2)
                      }
                    }
                  }
                  this.list3 = arr2
                } else {
                  this.type2 = res.data.data.type
                  this.list3a = res.data.data.repositoryIdList
                  this.list3b = res.data.data.repositoryNameList
                  this.list3c = res.data.data.asignTime
                  const arr = []
                  const arr2 = []
                  for (let i = 0; i < this.list3a.length; i++) {
                    const obj = {}
                    for (let j = 0; j < this.list3b.length; j++) {
                      if (i === j) {
                        obj.regionIdList = this.list3a[i]
                        obj.regionNameList = this.list3b[j]
                        arr.push(obj)
                      }
                    }
                  }
                  for (let i2 = 0; i2 < arr.length; i2++) {
                    const obj2 = {}
                    for (let j2 = 0; j2 < this.list3c.length; j2++) {
                      if (i2 === j2) {
                        obj2.regionNameList = arr[i2].regionNameList
                        obj2.regionIdList = arr[i2].regionIdList
                        obj2.asignTime = this.list3c[j2]
                        arr2.push(obj2)
                      }
                    }
                  }
                  this.list3 = arr2
                }
              } else if (this.type2 === 2) {
                delaycount2more(this.date2, row.regionIdList).then(res => {
                  this.type2 = 3
                  this.list3 = res.data.data.content
                })
              }
            } else if (res.data.data.type === 2) {
              this.type2 === 2
              delaycount2more(this.date2, row.regionIdList).then(res => {
                this.type2 = 3
                this.list3 = res.data.data.content
              })
            }
          })
        }
      } else {
        if (this.searchQuery2.date2 == null) {
          this.listQuery2.date = this.searchQuery2.date3
          this.listQuery2.regionid = row.regionIdList
          delaycount2(this.listQuery2).then(res => {
            if (this.type2 === 1) {
              if (Array.isArray(res.data.data.regionIdList) === true) {
                this.type2 = res.data.data.type
                this.list3a = res.data.data.regionIdList
                this.list3b = res.data.data.regionNameList
                this.list3c = res.data.data.delayDay
                const arr = []
                const arr2 = []
                for (let i = 0; i < this.list3a.length; i++) {
                  const obj = {}
                  for (let j = 0; j < this.list3b.length; j++) {
                    if (i === j) {
                      obj.regionIdList = this.list3a[i]
                      obj.regionNameList = this.list3b[j]
                      arr.push(obj)
                    }
                  }
                }
                for (let i2 = 0; i2 < arr.length; i2++) {
                  const obj2 = {}
                  for (let j2 = 0; j2 < this.list3c.length; j2++) {
                    if (i2 === j2) {
                      obj2.regionNameList = arr[i2].regionNameList
                      obj2.regionIdList = arr[i2].regionIdList
                      obj2.delayDay = this.list3c[j2]
                      arr2.push(obj2)
                    }
                  }
                }
                this.list3 = arr2
              } else {
                this.type2 = res.data.data.type
                this.list3a = res.data.data.repositoryIdList
                this.list3b = res.data.data.repositoryNameList
                this.list3c = res.data.data.delayDay
                const arr = []
                const arr2 = []
                for (let i = 0; i < this.list3a.length; i++) {
                  const obj = {}
                  for (let j = 0; j < this.list3b.length; j++) {
                    if (i === j) {
                      obj.regionIdList = this.list3a[i]
                      obj.regionNameList = this.list3b[j]
                      arr.push(obj)
                    }
                  }
                }
                for (let i2 = 0; i2 < arr.length; i2++) {
                  const obj2 = {}
                  for (let j2 = 0; j2 < this.list3c.length; j2++) {
                    if (i2 === j2) {
                      obj2.regionNameList = arr[i2].regionNameList
                      obj2.regionIdList = arr[i2].regionIdList
                      obj2.delayDay = this.list3c[j2]
                      arr2.push(obj2)
                    }
                  }
                }
                this.list3 = arr2
              }
            } else if (this.type2 === 2) {
              delaycount2more(this.date2, row.regionIdList).then(res => {
                this.type2 = 3
                this.list3 = res.data.data.content
              })
            }
          })
        } else {
          this.date2 = this.searchQuery2.date2
          this.listQuery2.regionid = row.regionIdList
          delaycount2(this.listQuery2).then(res => {
            if (res.data.data.type === 1) {
              if (this.type2 === 1) {
                if (Array.isArray(res.data.data.regionIdList) === true) {
                  this.type2 = res.data.data.type
                  this.list3a = res.data.data.regionIdList
                  this.list3b = res.data.data.regionNameList
                  this.list3c = res.data.data.delayDay
                  const arr = []
                  const arr2 = []
                  for (let i = 0; i < this.list3a.length; i++) {
                    const obj = {}
                    for (let j = 0; j < this.list3b.length; j++) {
                      if (i === j) {
                        obj.regionIdList = this.list3a[i]
                        obj.regionNameList = this.list3b[j]
                        arr.push(obj)
                      }
                    }
                  }
                  for (let i2 = 0; i2 < arr.length; i2++) {
                    const obj2 = {}
                    for (let j2 = 0; j2 < this.list3c.length; j2++) {
                      if (i2 === j2) {
                        obj2.regionNameList = arr[i2].regionNameList
                        obj2.regionIdList = arr[i2].regionIdList
                        obj2.delayDay = this.list3c[j2]
                        arr2.push(obj2)
                      }
                    }
                  }
                  this.list3 = arr2
                } else {
                  this.type2 = res.data.data.type
                  this.list3a = res.data.data.repositoryIdList
                  this.list3b = res.data.data.repositoryNameList
                  this.list3c = res.data.data.delayDay
                  const arr = []
                  const arr2 = []
                  for (let i = 0; i < this.list3a.length; i++) {
                    const obj = {}
                    for (let j = 0; j < this.list3b.length; j++) {
                      if (i === j) {
                        obj.regionIdList = this.list3a[i]
                        obj.regionNameList = this.list3b[j]
                        arr.push(obj)
                      }
                    }
                  }
                  for (let i2 = 0; i2 < arr.length; i2++) {
                    const obj2 = {}
                    for (let j2 = 0; j2 < this.list3c.length; j2++) {
                      if (i2 === j2) {
                        obj2.regionNameList = arr[i2].regionNameList
                        obj2.regionIdList = arr[i2].regionIdList
                        obj2.delayDay = this.list3c[j2]
                        arr2.push(obj2)
                      }
                    }
                  }
                  this.list3 = arr2
                }
              } else if (this.type2 === 2) {
                delaycount2more(this.date2, row.regionIdList).then(res => {
                  this.type2 = 3
                  this.list3 = res.data.data.content
                })
              }
            } else if (res.data.data.type === 2) {
              this.type2 = 2
              delaycount2more(this.date2, row.regionIdList).then(res => {
                this.type2 = 3
                this.list3 = res.data.data.content
              })
            }
          })
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
    .chart-wrapper2 {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
      height: 337px;
    }
  }
</style>
