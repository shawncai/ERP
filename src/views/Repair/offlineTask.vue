<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-select v-model="storesid" :placeholder="$t('employee.store')" clearable class="filter-item" style="width: 200px" filterable @keyup.enter.native="handleFilter">
        <el-option v-for="(item, index) in storelist" :key="index" :label="item.name" :value="item.id"/>
      </el-select>
      <div class="filter-item">
        <el-date-picker
          v-model="twotime"
          type="daterange"
          range-separator="-"
          unlink-panels
          start-placeholder="start"
          end-placeholder="end"
          value-format="yyyy-MM-dd"/>
      </div>
      <el-select v-model="listQuery.employeeid" :placeholder="$t('repair.staffName')" clearable class="filter-item" style="width: 160px" filterable>
        <el-option v-for="item in staffnamelist" :key="item.id" :label="item.personName" :value="item.id"/>
      </el-select>
      <el-select v-model="listQuery.result" :placeholder="$t('repair.stat')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>
    <div class="app-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('repair.all')" name="first">
          <el-table
            :key="tableKey"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('repair.ddbh')" :resizable="false" prop="code" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>cnpm install node-sass@latest
            <el-table-column :label="$t('repair.ygxm')" :resizable="false" prop="personName" width="90px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.ygdh')" :resizable="false" align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.rwmc')" :resizable="false" align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.invoiceNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.rwdz')" prop="address" min-width="130px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjnr')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjsj')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjr')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.jg')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.khxm')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.lx')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.ydbh')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.stat')" :resizable="false" prop="stat" min-width="85px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuang }}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" :label="$t('table.actions')" align="center" min-width="335px">
              <template slot-scope="scope">
                <el-button v-permission="['54-67-68-5']" type="primary" size="mini" @click="handleDetail(scope.row)">{{ $t('table2.view') }}</el-button>
                <el-button v-permission="['54-67-68-2']" v-show="scope.row.stat == 1" type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('Complaint.delete') }}</el-button>
                <el-button v-permission="['54-67-68-3']" v-show="scope.row.stat == 1" size="mini" type="warning" @click="handleedit(scope.row)">{{ $t('repair.edit2') }}</el-button>
                <el-button v-permission="['54-67-68-29']" v-show="scope.row.stat == 2" size="mini" type="info" @click="handlecancel(scope.row)">{{ $t('repair.cancel') }}</el-button>
                <el-button v-show="scope.row.stat == 5" size="mini" type="info" @click="handlefinish(scope.row)">{{ $t('repair.terminate') }}</el-button>
                <el-button v-permission="['54-67-68-29']" v-show="scope.row.stat == 1" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('repair.Dispatch') }}</el-button>
                <el-button v-show="scope.row.stat !== 1" size="mini" style="width: 90px;" plain disabled>{{ $t('repair.Dispatched') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="installList.pagenum" :limit.sync="installList.pagesize" @pagination="getList" />
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">{{ $t('repair.yfpug') }}<el-badge :value="total2" class="item"/></span>
          <el-table
            :key="tableKey2"
            :data="list2"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('repair.ddbh')" :resizable="false" prop="code" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>cnpm install node-sass@latest
            <el-table-column :label="$t('repair.ygxm')" :resizable="false" prop="personName" width="90px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.ygdh')" :resizable="false" align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.rwmc')" :resizable="false" align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.invoiceNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.rwdz')" prop="address" min-width="130px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjnr')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjsj')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjr')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.jg')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.khxm')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.lx')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.ydbh')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.stat')" :resizable="false" prop="stat" min-width="85px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuang }}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" :label="$t('table.actions')" align="center" min-width="335px">
              <template slot-scope="scope">
                <el-button v-permission="['54-67-68-5']" type="primary" size="mini" @click="handleDetail(scope.row)">{{ $t('table2.view') }}</el-button>
                <el-button v-permission="['54-67-68-2']" v-show="scope.row.stat == 1" type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('Complaint.delete') }}</el-button>
                <el-button v-permission="['54-67-68-3']" v-show="scope.row.stat == 1" size="mini" type="warning" @click="handleedit(scope.row)">{{ $t('repair.edit2') }}</el-button>
                <el-button v-permission="['54-67-68-29']" v-show="scope.row.stat == 2" size="mini" type="info" @click="handlecancel(scope.row)">{{ $t('repair.cancel') }}</el-button>
                <el-button v-show="scope.row.stat == 5" size="mini" type="info" @click="handlefinish(scope.row)">{{ $t('repair.terminate') }}</el-button>
                <el-button v-permission="['54-67-68-29']" v-show="scope.row.stat == 1" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('repair.Dispatch') }}</el-button>
                <el-button v-show="scope.row.stat !== 1" size="mini" style="width: 90px;" plain disabled>{{ $t('repair.Dispatched') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total2>0" :total="total2" :page.sync="installList2.pagenum" :limit.sync="installList2.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
        <el-tab-pane :label="$t('repair.ygyjs')" name="third">
          <el-table
            :key="tableKey3"
            :data="list3"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('repair.ddbh')" :resizable="false" prop="code" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>cnpm install node-sass@latest
            <el-table-column :label="$t('repair.ygxm')" :resizable="false" prop="personName" width="90px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.ygdh')" :resizable="false" align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.rwmc')" :resizable="false" align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.invoiceNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.rwdz')" prop="address" min-width="130px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjnr')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjsj')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjr')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.jg')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.khxm')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.lx')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.ydbh')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.stat')" :resizable="false" prop="stat" min-width="85px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuang }}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" :label="$t('table.actions')" align="center" min-width="335px">
              <template slot-scope="scope">
                <el-button v-permission="['54-67-68-5']" type="primary" size="mini" @click="handleDetail(scope.row)">{{ $t('table2.view') }}</el-button>
                <el-button v-permission="['54-67-68-2']" v-show="scope.row.stat == 1" type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('Complaint.delete') }}</el-button>
                <el-button v-permission="['54-67-68-3']" v-show="scope.row.stat == 1" size="mini" type="warning" @click="handleedit(scope.row)">{{ $t('repair.edit2') }}</el-button>
                <el-button v-permission="['54-67-68-29']" v-show="scope.row.stat == 2" size="mini" type="info" @click="handlecancel(scope.row)">{{ $t('repair.cancel') }}</el-button>
                <el-button v-show="scope.row.stat == 5" size="mini" type="info" @click="handlefinish(scope.row)">{{ $t('repair.terminate') }}</el-button>
                <el-button v-permission="['54-67-68-29']" v-show="scope.row.stat == 1" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('repair.Dispatch') }}</el-button>
                <el-button v-show="scope.row.stat !== 1" size="mini" style="width: 90px;" plain disabled>{{ $t('repair.Dispatched') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total3>0" :total="total3" :page.sync="installList3.pagenum" :limit.sync="installList3.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
        <el-tab-pane :label="$t('repair.cf')" name="four">
          <el-table
            :key="tableKey4"
            :data="list4"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('repair.ddbh')" :resizable="false" prop="code" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>cnpm install node-sass@latest
            <el-table-column :label="$t('repair.ygxm')" :resizable="false" prop="personName" width="90px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.ygdh')" :resizable="false" align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.rwmc')" :resizable="false" align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.invoiceNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.rwdz')" prop="address" min-width="130px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjnr')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjsj')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjr')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.jg')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.khxm')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.lx')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.ydbh')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.stat')" :resizable="false" prop="stat" min-width="85px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuang }}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" :label="$t('table.actions')" align="center" min-width="335px">
              <template slot-scope="scope">
                <el-button v-permission="['54-67-68-5']" type="primary" size="mini" @click="handleDetail(scope.row)">{{ $t('table2.view') }}</el-button>
                <el-button v-permission="['54-67-68-2']" v-show="scope.row.stat == 1" type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('Complaint.delete') }}</el-button>
                <el-button v-permission="['54-67-68-3']" v-show="scope.row.stat == 1" size="mini" type="warning" @click="handleedit(scope.row)">{{ $t('repair.edit2') }}</el-button>
                <el-button v-permission="['54-67-68-29']" v-show="scope.row.stat == 2" size="mini" type="info" @click="handlecancel(scope.row)">{{ $t('repair.cancel') }}</el-button>
                <el-button v-show="scope.row.stat == 5" size="mini" type="info" @click="handlefinish(scope.row)">{{ $t('repair.terminate') }}</el-button>
                <el-button v-permission="['54-67-68-29']" v-show="scope.row.stat == 1" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('repair.Dispatch') }}</el-button>
                <el-button v-show="scope.row.stat !== 1" size="mini" style="width: 90px;" plain disabled>{{ $t('repair.Dispatched') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total4>0" :total="total4" :page.sync="installList4.pagenum" :limit.sync="installList4.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
        <el-tab-pane :label="$t('repair.wxjs')" name="five">
          <el-table
            :key="tableKey5"
            :data="list5"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('repair.ddbh')" :resizable="false" prop="code" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>cnpm install node-sass@latest
            <el-table-column :label="$t('repair.ygxm')" :resizable="false" prop="personName" width="90px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.ygdh')" :resizable="false" align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.rwmc')" :resizable="false" align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.invoiceNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.rwdz')" prop="address" min-width="130px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjnr')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjsj')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.cjr')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.jg')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.khxm')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.lx')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.ydbh')" :resizable="false" prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.stat')" :resizable="false" prop="stat" min-width="85px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuang }}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable="false" :label="$t('table.actions')" align="center" min-width="335px">
              <template slot-scope="scope">
                <el-button v-permission="['54-67-68-5']" type="primary" size="mini" @click="handleDetail(scope.row)">{{ $t('table2.view') }}</el-button>
                <el-button v-permission="['54-67-68-2']" v-show="scope.row.stat == 1" type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('Complaint.delete') }}</el-button>
                <el-button v-permission="['54-67-68-3']" v-show="scope.row.stat == 1" size="mini" type="warning" @click="handleedit(scope.row)">{{ $t('repair.edit2') }}</el-button>
                <el-button v-permission="['54-67-68-29']" v-show="scope.row.stat == 2" size="mini" type="info" @click="handlecancel(scope.row)">{{ $t('repair.cancel') }}</el-button>
                <el-button v-show="scope.row.stat == 5" size="mini" type="info" @click="handlefinish(scope.row)">{{ $t('repair.terminate') }}</el-button>
                <el-button v-permission="['54-67-68-29']" v-show="scope.row.stat == 1" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('repair.Dispatch') }}</el-button>
                <el-button v-show="scope.row.stat !== 1" size="mini" style="width: 90px;" plain disabled>{{ $t('repair.Dispatched') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total5>0" :total="total5" :page.sync="installList5.pagenum" :limit.sync="installList5.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
      </el-tabs>
      <!-- <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        height="535"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column :label="$t('repair.Ordernumber')" :resizable='false' prop="code" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.staffName')" :resizable='false' prop="employeeName" min-width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.employeeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.staffphone')" :resizable='false' align="center" prop="employeePhone" min-width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.employeePhone }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.taskname')" :resizable='false' prop="taskName" min-width="110px" align="center">
          <template slot-scope="scope">
            <span style="word-break: keep-all;word-wrap: break-word;white-space: pre-wrap;">{{ scope.row.taskName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.taskaddress')"  prop="taskAddress" min-width="200px" align="center">
          <template slot-scope="scope">
            <span style="word-break: keep-all;word-wrap: break-word;white-space: pre-wrap;">{{ scope.row.taskAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.taskcontent')" :resizable='false' prop="taskContent" width="150px" align="center">
          <template slot-scope="scope">
            <span style="word-break: keep-all;word-wrap: break-word;white-space: pre-wrap;">{{ scope.row.taskContent }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.createTime')" :resizable='false' prop="createTime" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.createName')" :resizable='false' prop="createName" min-width="110px" align="center">
          <template slot-scope="scope">
            <span style="word-break: keep-all;word-wrap: break-word;white-space: pre-wrap;">{{ scope.row.createName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('repair.result')" :resizable='false' prop="result" width="70px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.result | result }}</span>
          </template>
        </el-table-column>
        <el-table-column :resizable='false' :label="$t('table.actions')" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button v-permission="['54-67-272-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('repair.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table> -->
      <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" /> -->
    </div>
    <el-dialog :visible.sync="addproject" :title="$t('repair.new')" width="50%" center lock-scroll >
      <el-form :model="form" style="width: 400px; margin-left:50px;">
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.taskname')">
          <el-input v-model="form.taskname"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.taskaddress')">
          <el-input v-model="form.taskaddress"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.assignstaff')">
          <el-select v-model="form.employeeid" placeholder="please choose" @change="huoqu">
            <el-option v-for="item in staffnamelist" :key="item.id" :label="item.personName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.taskcontent')">
          <el-input v-model="form.taskcontent"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addproject = false">{{ $t('repair.cancel') }}</el-button>
        <el-button type="primary" @click="createData">{{ $t('repair.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { editrepairproject, stafflist, gettaskofflinelist, deletetaskoffline, addtaskoffline, getofflinelist } from '../../api/repair'
  import { allstore } from '@/api/employee'
  import waves from '@/directive/waves' // Waves directive
  import permission from '@/directive/permission/index.js' // 权限判断指令
  import permission2 from '@/directive/permission2/index.js' // 权限判断指令
  import checkPermission from '@/utils/permission' // 权限判断函数
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  const calendarTypeOptions = [
    { key: '1', display_name: 'finished' },
    { key: '2', display_name: 'unfinished' }
  ]
  var _that
export default {
    name: 'Sample',
    components: { Pagination },
    directives: { waves, permission, permission2 },
    filters: {
      result: function(val) {
        if (val === 1) {
          return 'finished'
        } else if (val === 2) {
          return 'unfinished'
        }
      }
    },
    data() {
      return {
        // tab栏变量
        activeName: 'first',
        list: null,
        list2: null,
        list3: null,
        list4: null,
        list5: null,
        tableKey: 0,
        tableKey2: 0,
        tableKey3: 0,
        tableKey4: 0,
        tableKey5: 0,
        total: 0,
        total2: 0,
        total3: 0,
        total4: 0,
        total5: 0,
        installList: {
          pagenum: 1,
          pagesize: 10,
          stat: 0,
          username: '',
          endtime: '',
          begintime: '',
          regionIds: this.$store.getters.regionId,
          repositoryId: this.$store.getters.repositoryId,
          expectrepositoryid: this.$store.getters.repositoryId
        },
        installList2: {
          pagenum: 1,
          pagesize: 10,
          stat: 1,
          username: '',
          endtime: '',
          begintime: '',
          regionIds: this.$store.getters.regionId,
          repositoryId: this.$store.getters.repositoryId,
          expectrepositoryid: this.$store.getters.repositoryId
        },
        installList3: {
          pagenum: 1,
          pagesize: 10,
          stat: 2,
          username: '',
          endtime: '',
          begintime: '',
          regionIds: this.$store.getters.regionId,
          repositoryId: this.$store.getters.repositoryId,
          expectrepositoryid: this.$store.getters.repositoryId
        },
        installList4: {
          pagenum: 1,
          pagesize: 10,
          stat: 3,
          username: '',
          endtime: '',
          begintime: '',
          regionIds: this.$store.getters.regionId,
          repositoryId: this.$store.getters.repositoryId,
          expectrepositoryid: this.$store.getters.repositoryId
        },
        installList5: {
          pagenum: 1,
          pagesize: 10,
          stat: 4,
          username: '',
          endtime: '',
          begintime: '',
          regionIds: this.$store.getters.regionId,
          repositoryId: this.$store.getters.repositoryId,
          expectrepositoryid: this.$store.getters.repositoryId
        },
        //----------
        linshi: '',
        storelist: [],
        twotime: [],
        storesid: '',
        categoriesform: {
          price: '',
          itemid: ''
        },
        staffnamelist: [],
        calendarTypeOptions,
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: false,
        listQuery: {
          pagenum: 1,
          pagesize: 10,
          begintime: '',
          endtime: '',
          code: '',
          repositoryid: this.$store.getters.repositoryId,
          regionid: this.$store.getters.regionId
        },
        dialogFormVisible: false,
        dialogStatus: '',
        options: [],
        form: {
          taskname: '',
          taskaddress: '',
          taskcontent: '',
          createid: '',
          employeeid: '',
          repositoryid: this.$store.getters.repositoryId,
        },
        formLabelWidth: '120px',
        dialogVisible: false,
        addproject: false,
        centerDialogVisible: false
      }
    },
    created() {
      this.getinstalllist()
      // this.getAllStaff()
      // this.getAllStores()
    },
  
  mounted() {
      const repositoryid = this.$store.getters.repositoryId
      const regionid = this.$store.getters.regionId
      stafflist(repositoryid, regionid).then(res => {
        this.staffnamelist = res.data.data.content.list
        return this.restaurants
      })
    },
    beforeCreate() {
    _that = this
  },
  methods: {
    // tab栏切换
    handleClick(tab) {
      console.log(tab.name)
      if (tab.name === 'first') {
        getofflinelist(this.installList).then(res => {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        })
      } else if (tab.name === 'second') {
        getofflinelist(this.installList2).then(res => {
          this.list2 = res.data.data.content.list
          this.total2 = res.data.data.content.totalCount
        })
      } else if (tab.name === 'third') {
        getofflinelist(this.installList3).then(res => {
          this.list3 = res.data.data.content.list
          this.total3 = res.data.data.content.totalCount
        })
      } else if (tab.name === 'four') {
        getofflinelist(this.installList4).then(res => {
          this.list4 = res.data.data.content.list
          this.total4 = res.data.data.content.totalCount
        })
      } else if (tab.name === 'five') {
        getofflinelist(this.installList5).then(res => {
          this.list5 = res.data.data.content.list
          this.total5 = res.data.data.content.totalCount
        })
      }
    },
    getinstalllist() {
      getofflinelist(this.installList).then(res => {
        this.list = res.data.data.content.list
        this.total = res.data.data.content.totalCount
      })
      getofflinelist(this.installList2).then(res => {
        this.list2 = res.data.data.content.list
        this.total2 = res.data.data.content.totalCount
      })
      getofflinelist(this.installList3).then(res => {
        this.list3 = res.data.data.content.list
        this.total3 = res.data.data.content.totalCount
      })
      getofflinelist(this.installList4).then(res => {
        this.list4 = res.data.data.content.list
        this.total4 = res.data.data.content.totalCount
      })
      getofflinelist(this.installList5).then(res => {
        this.list5 = res.data.data.content.list
        this.total5 = res.data.data.content.totalCount
      })
    },
    //==================================
      checkPermission,
      // 列表渲染
      getList() {
        this.listLoading = true
        gettaskofflinelist(this.listQuery).then(response => {
          this.list = response.data.data.content.list
          this.total = response.data.data.content.totalCount
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 100)
        })
      },
      getAllStores() {
        const repositoryid = this.$store.getters.repositoryId
        const regionid = this.$store.getters.regionId
        allstore(repositoryid, regionid).then(res => {
          this.storelist = res.data.data.content
        })
      },
      getAllStaff() {
        const repositoryid = this.$store.getters.repositoryId
        const regionid = this.$store.getters.regionId
        stafflist(repositoryid, regionid).then(res => {
          this.staffnamelist = res.data.data.content.list
        })
      },
      // 列表搜索
      handleFilter() {
        this.listLoading = true
        this.listQuery.pagenum = 1
        console.log(this.twotime)
        if (this.twotime == null) {
          this.listQuery.begintime = ''
          this.listQuery.endtime = ''
        } else {
          this.listQuery.begintime = this.twotime[0],
            this.listQuery.endtime = this.twotime[1]
        }
        if(this.storesid === '') {
          this.listQuery.repositoryid = this.$store.getters.repositoryId
        } else {
          this.listQuery.repositoryid = this.storesid
        }

        gettaskofflinelist(this.listQuery).then(res => {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
        })
      },
      // 维修项目删除
      handleDelete(row) {
        this.$confirm('This will permanently delete the record. Continue?', 'Warning', {
          confirmButtonText: 'ok',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          console.log(row)
          deletetaskoffline(row).then(res => {
            if (res.data.ret === 200) {
              this.getList()
            }
          })
          this.$message({
            type: 'success',
            message: 'Delete completed!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          })
        })
      },
      // 维修项目添加
      handleCreate() {
        this.addproject = true
      },
      createData() {
        this.form.createid = this.$store.getters.userId
        console.log(this.form.repositoryid)
        addtaskoffline(this.form).then(res => {
          this.getList()
          this.addproject = false
          this.$notify({
            title: 'successful',
            message: 'successful',
            type: 'success',
            duration: 2000
          })
        })
      },
      // 获取员工所在门店id
      huoqu(val) {
        this.linshi = this.staffnamelist.filter((item, index, arr) => item.id == val)
        console.log(this.linshi)
        this.form.repositoryid = this.linshi[0].repositoryId
        console.log(this.form.repositoryid)
      },
      // 维修项目修改
      handleUpdate(row) {
        this.categoriesform = Object.assign({}, row) // copy obj
        this.dialogFormVisible = true
      },
      updateData() {
        const tempData = Object.assign({}, this.categoriesform)
        const itemid = tempData.id
        editrepairproject(this.categoriesform.price, itemid).then(res => {
          if (res.data.ret === 200) {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'successful',
              message: 'successful',
              type: 'success',
              duration: 2000
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 23px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .tab-container{
    margin: 30px;
  }
  .app-container{
    padding: 0px;
  }
  .tap-container1{
    margin-left: 20px;
  }
  .filter-container{
    margin-left: 20px;
  }
  .el-tabs__header is-top{
    padding-left: 20px;
  }
</style>
