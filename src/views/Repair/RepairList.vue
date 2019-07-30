<template>
  <div class="install-container">
    <div class="filter-container">
      <el-select v-model="install.expectrepositoryid" :placeholder="$t('employee.store')" clearable class="filter-item" style="width: 130px" filterable>
        <el-option v-for="(item, index) in storelist" :key="index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-input v-model="install.username" :placeholder="$t('repair.Name')" class="filter-item" style="width: 200px;" clearable @keyup.enter.native="handleFilter"/>
      <div class="filter-item">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="-"
          unlink-panels
          start-placeholder="Start"
          end-placeholder="End"
          value-format="yyyy-MM-dd"/>
      </div>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-permission="['54-67-69-1']" v-waves class="filter-item" style="margin-left: 10px" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('repair.add') }}</el-button>
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
            <el-table-column :label="$t('repair.coding')" :resizable='false' prop="code" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>cnpm install node-sass@latest
            <el-table-column :label="$t('repair.customername')" :resizable='false' prop="personName" width="90px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.phone')" :resizable='false' align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Repairaddress')" prop="address" min-width="130px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Warrantytime')" :resizable='false' prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.stat')" :resizable='false' prop="stat" min-width="85px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuang }}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable='false' :label="$t('table.actions')" align="center" min-width="335px">
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
          <pagination v-show="total>0" :total="total" :page.sync="installList.pagenum" :limit.sync="installList.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">{{ $t('repair.NotAssigned') }}<el-badge :value="total2" class="item"/></span>
          <el-table
            :key="tableKey2"
            :data="list2"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('repair.coding')" :resizable='false' prop="code" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>cnpm install node-sass@latest
            <el-table-column :label="$t('repair.customername')" :resizable='false' prop="personName" width="90px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.phone')" :resizable='false' align="center" prop="phoneNumber" width="120px">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Repairaddress')" prop="address" min-width="130px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Warrantytime')" :resizable='false' prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.stat')" :resizable='false' prop="stat" min-width="85px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuang }}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable='false' :label="$t('table.actions')" align="center" min-width="335px">
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
        <el-tab-pane :label="$t('repair.Assigned')" name="third">
          <el-table
            :key="tableKey3"
            :data="list3"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('repair.coding')" :resizable='false' prop="code" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>cnpm install node-sass@latest
            <el-table-column :label="$t('repair.customername')" :resizable='false' prop="personName" width="90px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.phone')" :resizable='false' align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Repairaddress')" prop="address" min-width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Warrantytime')" :resizable='false' prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.stat')" :resizable='false' prop="stat" min-width="85px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuang }}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable='false' :label="$t('table.actions')" align="center" min-width="280px">
              <template slot-scope="scope">
                <el-button v-permission="['54-67-68-5']" type="primary" size="mini" @click="handleDetail(scope.row)">{{ $t('table2.view') }}</el-button>
                <el-button v-show="scope.row.stat == 1" type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('Complaint.delete') }}</el-button>
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
        <el-tab-pane :label="$t('repair.TobeRepaired')" name="four">
          <el-table
            :key="tableKey4"
            :data="list4"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('repair.coding')" :resizable='false' prop="code" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>cnpm install node-sass@latest
            <el-table-column :label="$t('repair.customername')" :resizable='false' prop="personName" width="90px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.phone')" :resizable='false' align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Repairaddress')" prop="address" min-width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Warrantytime')" :resizable='false' prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.stat')" :resizable='false' prop="stat" min-width="85px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuang }}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable='false' :label="$t('table.actions')" align="center" min-width="170px">
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
        <el-tab-pane :label="$t('repair.Repairing')" name="five">
          <el-table
            :key="tableKey5"
            :data="list5"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('repair.coding')" :resizable='false' prop="code" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>cnpm install node-sass@latest
            <el-table-column :label="$t('repair.customername')" :resizable='false' prop="personName" width="90px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.phone')" :resizable='false' align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Repairaddress')" prop="address" min-width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Warrantytime')" :resizable='false' prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.stat')" :resizable='false' prop="stat" min-width="85px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuang }}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable='false' :label="$t('table.actions')" align="center" min-width="170px">
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
        <el-tab-pane :label="$t('repair.Finished')" name="six">
          <el-table
            :key="tableKey6"
            :data="list6"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('repair.coding')" :resizable='false' prop="code" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>cnpm install node-sass@latest
            <el-table-column :label="$t('repair.customername')" :resizable='false' prop="personName" width="90px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.phone')" :resizable='false' align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Repairaddress')" prop="address" min-width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Warrantytime')" :resizable='false' prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.stat')" :resizable='false' prop="stat" min-width="85px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuang }}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable='false' :label="$t('table.actions')" align="center" min-width="170px">
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
          <pagination v-show="total6>0" :total="total6" :page.sync="installList6.pagenum" :limit.sync="installList6.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
        <el-tab-pane :label="$t('repair.evaluated')" name="seven">
          <el-table
            :key="tableKey7"
            :data="list7"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('repair.coding')" :resizable='false' prop="code" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>cnpm install node-sass@latest
            <el-table-column :label="$t('repair.customername')" :resizable='false' prop="personName" width="90px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.phone')" :resizable='false' align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Repairaddress')" prop="address" min-width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Warrantytime')" :resizable='false' prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.stat')" :resizable='false' prop="stat" min-width="85px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuang }}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable='false' :label="$t('table.actions')" align="center" min-width="170px">
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
          <pagination v-show="total7>0" :total="total7" :page.sync="installList7.pagenum" :limit.sync="installList7.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
        <el-tab-pane :label="$t('repair.Cancelled')" name="eight">
          <el-table
            :key="tableKey8"
            :data="list8"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('repair.coding')" :resizable='false' prop="code" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>cnpm install node-sass@latest
            <el-table-column :label="$t('repair.customername')" :resizable='false' prop="personName" width="90px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.personName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.phone')" :resizable='false' align="center" prop="phoneNumber" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Repairaddress')" prop="address" min-width="160px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.Warrantytime')" :resizable='false' prop="serviceExpectTime" min-width="100px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serviceExpectTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('repair.stat')" :resizable='false' prop="stat" min-width="85px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuang }}</span>
              </template>
            </el-table-column>
            <el-table-column :resizable='false' :label="$t('table.actions')" align="center" min-width="170px">
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
          <pagination v-show="total8>0" :total="total8" :page.sync="installList8.pagenum" :limit.sync="installList8.pagesize" @pagination="getinstalllist" />
        </el-tab-pane>
      </el-tabs>
      <el-dialog
        :visible.sync="centerDialogVisible"
        :model="details"
        :title="$t('repair.ServiceDetails')"
        width="1010px"
        append-to-body
        class="edit"
        top="-10px"
      >
        <el-row>
          <el-card class="box-card">
            <div style="margin-bottom:10px;">
              <el-col :span="6" >
                <div class="text">{{ $t('repair.Ordernumber') }}：{{ details.code }}</div>
              </el-col>
              <el-col :span="6" >
                <div class="text">{{ $t('repair.OrderStatus') }}：{{ details.stat | zhuang }}</div>
              </el-col>
            </div>
          </el-card>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ $t('repair.CustomerInfo') }}</span>
            </div>
            <div style="margin-bottom:10px;">
              <el-col :span="4" >
                <div class="text">{{ $t('repair.customername') }}：{{ details.personName }}</div>
              </el-col>
              <el-col :span="4" >
                <div class="text">{{ $t('repair.CP') }}：{{ details.phoneNumber }}</div>
              </el-col>
              <el-col :span="12" >
                <div class="text">{{ $t('repair.address') }}：{{ details.address }}</div>
              </el-col>
            </div>
          </el-card>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ $t('repair.ServiceInfo') }}</span>
            </div>
            <div style="margin-bottom:10px;">
              <el-col :span="6" >
                <div class="text">{{ $t('repair.UnitModel') }}：{{ details.productType }}</div>
              </el-col>
              <el-col :span="6" >
                <div class="text">{{ $t('repair.DefectiveParts') }}：{{ details.components }}</div>
<!--                <div class="text">{{ $t('repair.DefectiveParts') }}：<span v-for="(item, index) in details.serviceItems" :key="index">{{ item.name }}；</span></div>-->
              </el-col>
              <el-col :span="6" >
                <div class="text">{{ $t('repair.ExpectedServiceBranch') }}：{{ details.repositoryName }}</div>
              </el-col>
              <el-col :span="6" >
                <div class="text">{{ $t('repair.ExpectedServiceTime') }}：{{ details.serviceExpectTime }}</div>
              </el-col>
              <el-col :span="24" style="margin: 10px 0">
                <div class="text">{{ $t('repair.Description') }}：{{ details.detail }}</div>
              </el-col>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-col v-for="(item, index) in details.picPaths" :span="4" :key="index" >
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <span>商品图</span>
              </div>
              <img :src="item" width="500px" class="image" style="width: 100%">
            </el-card>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ $t('repair.ProcessingInfo') }}</span>
            </div>
            <div style="margin-bottom:10px;">
              <el-col :span="8" >
                <div class="text">{{ $t('repair.EmployeeName') }}：{{ details.employeeName }}</div>
              </el-col>
              <el-col :span="8" >
                <div class="text" style="float: left">{{ $t('repair.ServiceQuality') }}：
                </div>
                <el-rate
                  v-model="details.qualityGrade"
                  disabled
                  show-score
                  text-color="#ff9900"
                />
              </el-col>
              <el-col :span="8" >
                <div class="text" style="float:left;">{{ $t('repair.ServiceAttitude') }}：</div>
                <el-rate
                  v-model="details.serviceGrade"
                  disabled
                  show-score
                  text-color="#ff9900"
                />
              </el-col>
            </div>
          </el-card>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ $t('repair.ServiceItemsPriceList') }}</span>
            </div>
            <el-table
              :data="details.serviceItems"
              border
              style="width: 100%">
              <el-table-column
                :label="$t('repair.ServiceItems')"
                prop="name"
                min-width="180"
                align="center"/>
              <el-table-column
                :label="$t('repair.Price')"
                prop="price"
                min-width="180"
                align="center">
                <template slot-scope="scope">
                  <span style="color: red">₱</span>{{ scope.row.price }}
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('repair.KPI')"
                prop="kpiGrade"
                min-width="180"
                align="center"/>
            </el-table>
          </el-card>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ $t('repair.ServicePartsPriceList') }}</span>
            </div>
            <el-table
              :data="details.serviceComponents"
              border
              style="width: 100%">
              <el-table-column
                :label="$t('repair.ServiceParts')"
                prop="productName"
                min-width="180"
                align="center"/>
              <el-table-column
                :label="$t('repair.Price')"
                prop="salePrice"
                min-width="180"
                align="center">
                <template slot-scope="scope">
                  <span style="color: red">₱</span>{{ scope.row.salePrice }}
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('repair.KPI')"
                prop="kpiGrade"
                min-width="180"
                align="center"/>
              <el-table-column
                :label="$t('repair.Qty')"
                prop="quantity"
                min-width="180"
                align="center"/>
            </el-table>
          </el-card>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ $t('repair.Totalcost') }}</span>
            </div>
            <div style="margin-bottom:10px;">
              <el-col :span="6" >
                <div class="text">{{ $t('repair.Totalcost') }}：{{ details.totalCost }}</div>
              </el-col>
              <el-col :span="6" >
                <div class="text">{{ $t('repair.Discountrate') }}：{{ details.discountRate }}</div>
              </el-col>
              <el-col :span="6" >
                <div class="text">{{ $t('repair.Discountamount') }}：{{ details.discountCost }}</div>
              </el-col>
              <el-col :span="6" >
                <div class="text">{{ $t('repair.Actualamount') }}：{{ details.actualCost }}</div>
              </el-col>
            </div>
          </el-card>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ $t('repair.ServiceTracking') }}</span>
              <el-button style="float: right; padding: 3px 0;color: #f56c6c" type="text" @click="trajectory(details.employeeId, details.serviceStartTime, details.id)">{{ $t('employee.employeetracks') }}</el-button>
            </div>
            <div style="margin-bottom:10px;height: 400px;">
              <el-steps :active="schedule.length" direction="vertical">
                <el-step v-for="(item, index) in schedule" :key="index" :title="item.content" :description="item.createTime"/>
              </el-steps>
            </div>
          </el-card>
        </el-row>
      </el-dialog>
      <el-dialog :visible.sync="isvisible" :title="$t('repair.Dispatch2')" width="40%" center lock-scroll>
        <el-form :model="dispatchform" style="width: 400px; margin:0 auto;">
          <el-form-item :label-width="formLabelWidth" :label="$t('repair.Employee')">
            <el-select v-model="dispatchform.id" placeholder="please choose">
              <el-option
                v-for="(item, index) in options2"
                :key="index"
                :label="item.personName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isvisible = false">{{ $t('repair.cancel') }}</el-button>
          <el-button type="primary" @click="dispatch">{{ $t('repair.ok') }}</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogFormVisible" :title="$t('repair.Add')" width="60%" center lock-scroll top="20px">
        <el-form ref="form" :model="form" :rules="personalrules" style="width: 400px; margin-left:50px;margin-top: 37px;">
          <el-form-item :label-width="formLabelWidth" prop="producttype" :label="$t('repair.Model')">
            <el-select v-model="form.producttype" placeholder="please choose">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.categoryName"
                :value="item.categoryName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" prop="components" :label="$t('repair.Parts')">
            <el-input v-model="form.components"/>
<!--            <el-cascader-->
<!--              :options="regions"-->
<!--              :props="props"-->
<!--              v-model="form.components"-->
<!--              placeholder="请选择区域"-->
<!--              filterable-->
<!--              clearable-->
<!--              style="width: 100%;"-->
<!--              @change="handlechange4"-->
<!--            />-->
          </el-form-item>
<!--          <el-form-item :label-width="formLabelWidth" prop="userid" :label="$t('repair.LoginAccount')">-->
<!--            <el-input v-model="userid" @focus="chooseCustomer"/>-->
<!--            <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>-->
<!--          </el-form-item>-->
          <el-form-item :label-width="formLabelWidth" prop="personname" :label="$t('repair.Name2')">
            <el-input v-model="form.personname" @focus="chooseCustomer"/>
            <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
          </el-form-item>
<!--          <el-form-item :label-width="formLabelWidth" prop="personname" :label="$t('repair.Name2')">-->
<!--            <el-input v-model="form.personname"/>-->
<!--          </el-form-item>-->
          <el-form-item :label-width="formLabelWidth" prop="phonenumber" :label="$t('repair.MobileNumber')">
            <el-input v-model="form.phonenumber"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" prop="provinceid" :label="$t('Customer.provinceid')">
            <el-select v-model="form.provinceid" placeholder="请选择省" @change="handlechange2">
              <el-option
                v-for="(item, index) in provinces"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" prop="cityid" :label="$t('Customer.cityid')">
            <el-select v-model="form.cityid" placeholder="请选择市">
              <el-option
                v-for="(item, index) in cities"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" prop="address" :label="$t('repair.Address2')">
            <el-input v-model="form.address"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" prop="servicexpecttime" :label="$t('repair.ExpectedTime')">
            <el-date-picker
              v-model="form.servicexpecttime"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 198px;"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" prop="repositoryid" :label="$t('repair.Servicebranch')">
            <el-select v-model="form.repositoryid" placeholder="please choose">
              <el-option
                v-for="item in shopoptions"
                :key="item.id"
                  :label="item.repositoryName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" :label="$t('repair.Description2')">
            <el-input v-model="form.detail"/>
          </el-form-item>
<!--          //1上门维修，2到店维修-->
          <el-form-item :label-width="formLabelWidth" prop="servicemode" :label="$t('repair.servicemode')">
            <el-select v-model="form.servicemode">
              <el-option value="1" label="上门维修" />
              <el-option value="2" label="到店维修" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{ $t('repair.cancel') }}</el-button>
          <el-button type="primary" @click="createData">{{ $t('repair.ok') }}</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="editisvisible" :title="$t('repair.edit')" width="40%" center lock-scroll>
        <el-form :model="edit" style="width: 400px; margin:0 auto;">
          <el-form-item :label-width="formLabelWidth" :label="$t('employee.store')">
            <el-select v-model="edit.repositoryid" :placeholder="$t('employee.store')" clearable style="width: 185px" filterable>
              <el-option v-for="item in storelist" :key="item.id" :label="item.repositoryName" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-permission="['54-67-68-29']" @click="editisvisible = false">{{ $t('repair.cancel') }}</el-button>
          <el-button v-permission="['54-67-68-3']" type="primary" @click="editdata">{{ $t('repair.ok') }}</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogFormVisible4"
        :model="guji"
        :title="$t('repair.Employeetracks')"
        width="80%"
        center
        top="20px"
        lock-scroll
        append-to-body>
        <div >
          <div id="map_canvas2" style="height: 800px; width: 100%"/>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { repairList, repairDetail, repairtoemp, searchproblemobject, repositorylist, newservice, getserviceschedule, deleteservice, retoreposervice, serviceretoemp, endservicebackground, getremplist, getremplist2 } from '@/api/repair'
  import { getcountrylist, getprovincelist, getcitylist, searchRepository } from '@/api/public'
  import { allstore } from '@/api/employee'
  import { getposition } from '@/api/map'
  import MyCustomer from './MyCustomer'
  import waves from '@/directive/waves' // Waves directive
  import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
  import checkPermission from '@/utils/permission' // 权限判断函数
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import { searchEmpCategory2 } from '@/api/Product'

  const xiala = [
    { key: '0', display_name: '全部' },
    { key: '1', display_name: '待还款' },
    { key: '2', display_name: '已还款' },
    { key: '3', display_name: '逾期' },
    { key: '4', display_name: '车已收缴' }
  ]
  export default {
    name: 'InstallOrder',
    directives: { waves, permission, permission2 },
    components: { Pagination, MyCustomer },
    filters: {
      fenpai: function(val) {
        if (val === null) {
          return 'NotAssigned'
        } else {
          return 'Assigned'
        }
      },
      zhuang: function(value) {
        if (value === 1) {
          return 'Not Assigned'
        } else if (value === 2) {
          return 'Assigned'
        } else if (value === 3) {
          return 'To be Repaired'
        } else if (value === 4) {
          return 'Repairing'
        } else if (value === 5) {
          return 'Finished'
        } else if (value === 6) {
          return 'evaluated'
        } else if (value === 7) {
          return 'Cancelled'
        }
      }
    },
    data() {
      const validatePass = (rule, value, callback) => {
        console.log(this.userid)
        if (this.userid === undefined || this.userid === null || this.userid === '') {
          callback(new Error('请选择客户'))
        } else {
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        console.log(this.form.phonenumber)
        if (this.form.phonenumber === undefined || this.form.phonenumber === null || this.form.phonenumber === '') {
          callback(new Error('请输入联系电话'))
        } else {
          callback()
        }
      }
      return {
        personalrules: {
          producttype: [
            { required: true, message: '请选择车辆型号', trigger: 'change' }
          ],
          components: [
            { required: true, message: '请选择维修部位', trigger: 'change' }
          ],
          personname: [
            { required: true, validator: validatePass, trigger: 'change' }
          ],
          phonenumber: [
            { required: true, validator: validatePass2, trigger: 'change' }
          ],
          provinceid: [
            { required: true, message: '请选择省', trigger: 'change' }
          ],
          cityid: [
            { required: true, message: '请选择市', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入客户地址', trigger: 'blur' }
          ],
          servicexpecttime: [
            { required: true, message: '请选择期望时间', trigger: 'change' }
          ],
          repositoryid: [
            { required: true, message: '请选择维修门店', trigger: 'change' }
          ],
          servicemode: [
            { required: true, message: '请选择维修方式', trigger: 'change' }
          ]
        },
        xiala,
        editisvisible: false,
        storelist: [],
        editform: {},
        dispatchformedit: '',
        date: '',
        edit: {
          serviceid: '',
          repositoryid: ''
        },
        install: {
          username: '',
          expectrepositoryid: '',
          begintime: '',
          endtime: ''
        },
        installList: {
          pagenum: 1,
          pagesize: 10,
          username: '',
          expectrepositoryid: '',
          stat: 0,
          endtime: '',
          begintime: '',
          regionid: this.$store.getters.regionId,
          repositoryid: this.$store.getters.repositoryId,
          expectrepositoryid: this.$store.getters.repositoryId
        },
        installList2: {
          pagenum: 1,
          pagesize: 10,
          stat: 1,
          username: '',
          endtime: '',
          begintime: '',
          regionid: this.$store.getters.regionId,
          repositoryid: this.$store.getters.repositoryId,
          expectrepositoryid: this.$store.getters.repositoryId
        },
        installList3: {
          pagenum: 1,
          pagesize: 10,
          stat: 2,
          username: '',
          endtime: '',
          begintime: '',
          regionid: this.$store.getters.regionId,
          repositoryid: this.$store.getters.repositoryId,
          expectrepositoryid: this.$store.getters.repositoryId
        },
        installList4: {
          pagenum: 1,
          pagesize: 10,
          stat: 3,
          username: '',
          endtime: '',
          begintime: '',
          regionid: this.$store.getters.regionId,
          repositoryid: this.$store.getters.repositoryId,
          expectrepositoryid: this.$store.getters.repositoryId
        },
        installList5: {
          pagenum: 1,
          pagesize: 10,
          stat: 4,
          username: '',
          endtime: '',
          begintime: '',
          regionid: this.$store.getters.regionId,
          repositoryid: this.$store.getters.repositoryId,
          expectrepositoryid: this.$store.getters.repositoryId
        },
        installList6: {
          pagenum: 1,
          pagesize: 10,
          stat: 5,
          username: '',
          endtime: '',
          begintime: '',
          regionid: this.$store.getters.regionId,
          repositoryid: this.$store.getters.repositoryId,
          expectrepositoryid: this.$store.getters.repositoryId
        },
        installList7: {
          pagenum: 1,
          pagesize: 10,
          stat: 6,
          username: '',
          endtime: '',
          begintime: '',
          regionid: this.$store.getters.regionId,
          repositoryid: this.$store.getters.repositoryId,
          expectrepositoryid: this.$store.getters.repositoryId
        },
        installList8: {
          pagenum: 1,
          pagesize: 10,
          stat: 7,
          username: '',
          endtime: '',
          begintime: '',
          regionid: this.$store.getters.regionId,
          repositoryid: this.$store.getters.repositoryId,
          expectrepositoryid: this.$store.getters.repositoryId
        },
        activeName: 'first',
        listLoading: true,
        list: null,
        list2: null,
        list3: null,
        list4: null,
        list5: null,
        list6: null,
        list7: null,
        list8: null,
        tableKey: 0,
        tableKey2: 0,
        tableKey3: 0,
        tableKey4: 0,
        tableKey5: 0,
        tableKey6: 0,
        tableKey7: 0,
        tableKey8: 0,
        centerDialogVisible: false,
        details: {
          id: '',
          stat: '',
          code: '',
          phone: '',
          personName: '',
          address: '',
          productType: '',
          serviceItems: [],
          repositoryName: '',
          serviceExpectTime: '',
          detail: '',
          picPaths: [],
          employeeName: '',
          employeePhone: '',
          serviceGrade: '',
          productName: '',
          salePrice: '',
          serviceComponents: [],
          discountRate: '',
          discountCost: '',
          actualCost: '',
          totalCost: ''
        },
        schedule: [],
        formdata: [],
        installment: [],
        isinstallment: false,
        orderDetaillist: [],
        total: 0,
        total2: 0,
        total3: 0,
        total4: 0,
        total5: 0,
        total6: 0,
        total7: 0,
        total8: 0,
        isvisible: false,
        dispatchform: {
          id: ''
        },
        options: [],
        shopoptions: [],
        formLabelWidth: '120px',
        dialogFormVisible: false,
        form: {
          producttype: '',
          components: '',
          username: '',
          person: '',
          phone: '',
          address: '',
          servicexpecttime: '',
          repositoryid: '',
          detail: '',
          cityid: ''
        },
        options2: [],
        customercontrol: false,
        dialogFormVisible4: false,
        guji: '',
        userid: '',
        show: false,
        center: { lng: 122.3843288, lat: 11.4574355 },
        markers: [],
        // 城市列表
        cities: [],
        // 省列表
        provinces: [],
        road: [],
        position: {},
        regions: [],
        websock: null,
        guijidate: '',
        personname: '',
        fuzhi: null,
        fuzhidate: null,
        // 区域列表字段更改
        props: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
      }
    },
    created() {
      this.getinstalllist()
      this.getAllStores()
      this.customerdata2(2)
      this.getlist()
    },
    methods: {
      getlist() {
        searchproblemobject().then(res => {
          this.regions =  this.tranKTree(res.data.data.content)
          console.log(this.data)
        })
      },
      customerdata2(val) {
        getprovincelist(val).then(res => {
          if (res.data.ret === 200) {
            this.provinces = res.data.data.content
          } else {
            console.log('国家选择省错误')
          }
        })
      },
      // 根据省选择市
      handlechange2(val) {
        getcitylist(val).then(res => {
          console.log(res)
          if (res.data.ret === 200) {
            this.cities = res.data.data.content
          } else {
            console.log('省选择市错误')
          }
        })
      },
      customerdata(val) {
        console.log('val', val)
        this.form.userid = val.id
        this.userid = val.customerName
        this.form.phonenumber = val.phoneNumber
        this.form.personname = val.customerName
      },
      // 选择客户focus
      chooseCustomer() {
        this.customercontrol = true
      },
      checkPermission,
      getinstalllist() {
        repairList(this.installList).then(res => {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        })
        repairList(this.installList2).then(res => {
          this.list2 = res.data.data.content.list
          this.total2 = res.data.data.content.totalCount
        })
        repairList(this.installList3).then(res => {
          this.list3 = res.data.data.content.list
          this.total3 = res.data.data.content.totalCount
        })
        repairList(this.installList4).then(res => {
          this.list4 = res.data.data.content.list
          this.total4 = res.data.data.content.totalCount
        })
        repairList(this.installList5).then(res => {
          this.list5 = res.data.data.content.list
          this.total5 = res.data.data.content.totalCount
        })
        repairList(this.installList6).then(res => {
          this.list6 = res.data.data.content.list
          this.total6 = res.data.data.content.totalCount
        })
        repairList(this.installList7).then(res => {
          this.list7 = res.data.data.content.list
          this.total7 = res.data.data.content.totalCount
        })
        repairList(this.installList8).then(res => {
          this.list8 = res.data.data.content.list
          this.total8 = res.data.data.content.totalCount
        })
      },
      getAllStores() {
        const repositoryid = this.$store.getters.repositoryId
        const regionid = this.$store.getters.regionId
        // allstore(repositoryid, regionid).then(res => {
        //   this.storelist = res.data.data.content
        // })
        repositorylist().then(res => {
          this.storelist = res.data.data.content.list
        })
      },
      getproducts() {
        // producttype().then(res => {
        //   this.options = res.data.data.content
        // })
        // 规格型号数据
        searchEmpCategory2(2).then(res => {
          if (res.data.ret === 200) {
            this.options = res.data.data.content.list
          }
        })
        repositorylist().then(res => {
          this.shopoptions = res.data.data.content.list
        })
      },
      handleFilter() {
        console.log(this.install)
        this.installList.pagenum = 1
        this.installList2.pagenum = 1
        this.installList3.pagenum = 1
        this.installList4.pagenum = 1
        this.installList5.pagenum = 1
        this.installList6.pagenum = 1
        this.installList7.pagenum = 1
        this.installList8.pagenum = 1
        if (this.date === '') {
          this.installList.begintime = ''
          this.installList.endtime = ''
        }
        if(this.install.expectrepositoryid == '') {
          this.installList.expectrepositoryid = this.$store.getters.repositoryId
          this.installList2.expectrepositoryid = this.$store.getters.repositoryId
          this.installList3.expectrepositoryid = this.$store.getters.repositoryId
          this.installList4.expectrepositoryid = this.$store.getters.repositoryId
          this.installList5.expectrepositoryid = this.$store.getters.repositoryId
          this.installList6.expectrepositoryid = this.$store.getters.repositoryId
          this.installList7.expectrepositoryid = this.$store.getters.repositoryId
          this.installList8.expectrepositoryid = this.$store.getters.repositoryId
        } else {
          this.installList.expectrepositoryid = this.install.expectrepositoryid
          this.installList2.expectrepositoryid = this.install.expectrepositoryid
          this.installList3.expectrepositoryid = this.install.expectrepositoryid
          this.installList4.expectrepositoryid = this.install.expectrepositoryid
          this.installList5.expectrepositoryid = this.install.expectrepositoryid
          this.installList6.expectrepositoryid = this.install.expectrepositoryid
          this.installList7.expectrepositoryid = this.install.expectrepositoryid
          this.installList8.expectrepositoryid = this.install.expectrepositoryid
        }
        this.installList.username = this.install.username
        this.installList2.username = this.install.username
        this.installList3.username = this.install.username
        this.installList4.username = this.install.username
        this.installList5.username = this.install.username
        this.installList6.username = this.install.username
        this.installList7.username = this.install.username
        this.installList8.username = this.install.username
        if (this.date === '') {
          this.installList.begintime = ''
          this.installList.endtime = ''
          this.installList2.begintime = ''
          this.installList2.endtime = ''
          this.installList3.begintime = ''
          this.installList3.endtime = ''
          this.installList4.begintime = ''
          this.installList4.endtime = ''
          this.installList5.begintime = ''
          this.installList5.endtime = ''
          this.installList6.begintime = ''
          this.installList6.endtime = ''
          this.installList7.begintime = ''
          this.installList7.endtime = ''
          this.installList8.begintime = ''
          this.installList8.endtime = ''
          console.log(this.installList)
          if(this.install.expectrepositoryid == '') {
            this.installList.expectrepositoryid = this.$store.getters.repositoryId
            this.installList2.expectrepositoryid = this.$store.getters.repositoryId
            this.installList3.expectrepositoryid = this.$store.getters.repositoryId
            this.installList4.expectrepositoryid = this.$store.getters.repositoryId
            this.installList5.expectrepositoryid = this.$store.getters.repositoryId
            this.installList6.expectrepositoryid = this.$store.getters.repositoryId
            this.installList7.expectrepositoryid = this.$store.getters.repositoryId
            this.installList8.expectrepositoryid = this.$store.getters.repositoryId
          } else {
            this.installList.expectrepositoryid = this.install.expectrepositoryid
            this.installList2.expectrepositoryid = this.install.expectrepositoryid
            this.installList3.expectrepositoryid = this.install.expectrepositoryid
            this.installList4.expectrepositoryid = this.install.expectrepositoryid
            this.installList5.expectrepositoryid = this.install.expectrepositoryid
            this.installList6.expectrepositoryid = this.install.expectrepositoryid
            this.installList7.expectrepositoryid = this.install.expectrepositoryid
            this.installList8.expectrepositoryid = this.install.expectrepositoryid
          }
          repairList(this.installList).then(res => {
            console.log(this.$store.getters)
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
          })
          repairList(this.installList2).then(res => {
            this.list2 = res.data.data.content.list
            this.total2 = res.data.data.content.totalCount
          })
          repairList(this.installList3).then(res => {
            this.list3 = res.data.data.content.list
            this.total3 = res.data.data.content.totalCount
          })
          repairList(this.installList4).then(res => {
            this.list4 = res.data.data.content.list
            this.total4 = res.data.data.content.totalCount
          })
          repairList(this.installList5).then(res => {
            this.list5 = res.data.data.content.list
            this.total5 = res.data.data.content.totalCount
          })
          repairList(this.installList6).then(res => {
            this.list6 = res.data.data.content.list
            this.total6 = res.data.data.content.totalCount
          })
          repairList(this.installList7).then(res => {
            this.list7 = res.data.data.content.list
            this.total7 = res.data.data.content.totalCount
          })
          repairList(this.installList8).then(res => {
            this.list8 = res.data.data.content.list
            this.total8 = res.data.data.content.totalCount
          })
        } else if (this.date === null) {
          this.installList.begintime = ''
          this.installList.endtime = ''
          this.installList2.begintime = ''
          this.installList2.endtime = ''
          this.installList3.begintime = ''
          this.installList3.endtime = ''
          this.installList4.begintime = ''
          this.installList4.endtime = ''
          this.installList5.begintime = ''
          this.installList5.endtime = ''
          this.installList6.begintime = ''
          this.installList6.endtime = ''
          this.installList7.begintime = ''
          this.installList7.endtime = ''
          this.installList8.begintime = ''
          this.installList8.endtime = ''
          if(this.install.expectrepositoryid == '') {
            this.installList.expectrepositoryid = this.$store.getters.repositoryId
            this.installList2.expectrepositoryid = this.$store.getters.repositoryId
            this.installList3.expectrepositoryid = this.$store.getters.repositoryId
            this.installList4.expectrepositoryid = this.$store.getters.repositoryId
            this.installList5.expectrepositoryid = this.$store.getters.repositoryId
            this.installList6.expectrepositoryid = this.$store.getters.repositoryId
            this.installList7.expectrepositoryid = this.$store.getters.repositoryId
            this.installList8.expectrepositoryid = this.$store.getters.repositoryId
          } else {
            this.installList.expectrepositoryid = this.install.expectrepositoryid
            this.installList2.expectrepositoryid = this.install.expectrepositoryid
            this.installList3.expectrepositoryid = this.install.expectrepositoryid
            this.installList4.expectrepositoryid = this.install.expectrepositoryid
            this.installList5.expectrepositoryid = this.install.expectrepositoryid
            this.installList6.expectrepositoryid = this.install.expectrepositoryid
            this.installList7.expectrepositoryid = this.install.expectrepositoryid
            this.installList8.expectrepositoryid = this.install.expectrepositoryid
          }
          repairList(this.installList).then(res => {
            console.log(res)
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
          })
          repairList(this.installList2).then(res => {
            this.list2 = res.data.data.content.list
            this.total2 = res.data.data.content.totalCount
          })
          repairList(this.installList3).then(res => {
            this.list3 = res.data.data.content.list
            this.total3 = res.data.data.content.totalCount
          })
          repairList(this.installList4).then(res => {
            this.list4 = res.data.data.content.list
            this.total4 = res.data.data.content.totalCount
          })
          repairList(this.installList5).then(res => {
            this.list5 = res.data.data.content.list
            this.total5 = res.data.data.content.totalCount
          })
          repairList(this.installList6).then(res => {
            this.list6 = res.data.data.content.list
            this.total6 = res.data.data.content.totalCount
          })
          repairList(this.installList7).then(res => {
            this.list7 = res.data.data.content.list
            this.total7 = res.data.data.content.totalCount
          })
          repairList(this.installList8).then(res => {
            this.list8 = res.data.data.content.list
            this.total8 = res.data.data.content.totalCount
          })
        } else {
          this.installList.begintime = this.date[0]
          this.installList.endtime = this.date[1]
          this.installList2.begintime = this.date[0]
          this.installList2.endtime = this.date[1]
          this.installList3.begintime = this.date[0]
          this.installList3.endtime = this.date[1]
          this.installList4.begintime = this.date[0]
          this.installList4.endtime = this.date[1]
          this.installList5.begintime = this.date[0]
          this.installList5.endtime = this.date[1]
          this.installList6.begintime = this.date[0]
          this.installList6.endtime = this.date[1]
          this.installList7.begintime = this.date[0]
          this.installList7.endtime = this.date[1]
          this.installList8.begintime = this.date[0]
          this.installList8.endtime = this.date[1]
          if(this.install.expectrepositoryid == '') {
            this.installList.expectrepositoryid = this.$store.getters.repositoryId
            this.installList2.expectrepositoryid = this.$store.getters.repositoryId
            this.installList3.expectrepositoryid = this.$store.getters.repositoryId
            this.installList4.expectrepositoryid = this.$store.getters.repositoryId
            this.installList5.expectrepositoryid = this.$store.getters.repositoryId
            this.installList6.expectrepositoryid = this.$store.getters.repositoryId
            this.installList7.expectrepositoryid = this.$store.getters.repositoryId
            this.installList8.expectrepositoryid = this.$store.getters.repositoryId
          } else {
            this.installList.expectrepositoryid = this.install.expectrepositoryid
            this.installList2.expectrepositoryid = this.install.expectrepositoryid
            this.installList3.expectrepositoryid = this.install.expectrepositoryid
            this.installList4.expectrepositoryid = this.install.expectrepositoryid
            this.installList5.expectrepositoryid = this.install.expectrepositoryid
            this.installList6.expectrepositoryid = this.install.expectrepositoryid
            this.installList7.expectrepositoryid = this.install.expectrepositoryid
            this.installList8.expectrepositoryid = this.install.expectrepositoryid
          }
          repairList(this.installList).then(res => {
            console.log(res)
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
          })
          repairList(this.installList2).then(res => {
            this.list2 = res.data.data.content.list
            this.total2 = res.data.data.content.totalCount
          })
          repairList(this.installList3).then(res => {
            this.list3 = res.data.data.content.list
            this.total3 = res.data.data.content.totalCount
          })
          repairList(this.installList4).then(res => {
            this.list4 = res.data.data.content.list
            this.total4 = res.data.data.content.totalCount
          })
          repairList(this.installList5).then(res => {
            this.list5 = res.data.data.content.list
            this.total5 = res.data.data.content.totalCount
          })
          repairList(this.installList6).then(res => {
            this.list6 = res.data.data.content.list
            this.total6 = res.data.data.content.totalCount
          })
          repairList(this.installList7).then(res => {
            this.list7 = res.data.data.content.list
            this.total7 = res.data.data.content.totalCount
          })
          repairList(this.installList8).then(res => {
            this.list8 = res.data.data.content.list
            this.total8 = res.data.data.content.totalCount
          })
        }

      },
      // 转化数据方法
      tranKTree(arr) {
        if (!arr || !arr.length) return
        return arr.map(item => ({
          id: item.id,
          name: item.name,
          children: this.tranKTree(item.children)
        }))
      },
      handleClick(tab) {
        console.log(tab.name);
        if (tab.name === 'first') {
          repairList(this.installList).then(res => {
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
          })
        } else if (tab.name === 'second') {
          repairList(this.installList2).then(res => {
            this.list2 = res.data.data.content.list
            this.total2 = res.data.data.content.totalCount
          })
        } else if (tab.name === 'third') {
          repairList(this.installList3).then(res => {
            this.list3 = res.data.data.content.list
            this.total3 = res.data.data.content.totalCount
          })
        }else if (tab.name === 'four') {
          repairList(this.installList4).then(res => {
            this.list4 = res.data.data.content.list
            this.total4 = res.data.data.content.totalCount
          })
        } else if (tab.name === 'five') {
          repairList(this.installList5).then(res => {
            this.list5 = res.data.data.content.list
            this.total5 = res.data.data.content.totalCount
          })
        }else if (tab.name === 'six') {
          repairList(this.installList6).then(res => {
            this.list6 = res.data.data.content.list
            this.total6 = res.data.data.content.totalCount
          })
        } else if (tab.name === 'seven') {
          repairList(this.installList7).then(res => {
            this.list7 = res.data.data.content.list
            this.total7 = res.data.data.content.totalCount
          })
        }else if (tab.name === 'eight') {
          repairList(this.installList8).then(res => {
            this.list8 = res.data.data.content.list
            this.total8 = res.data.data.content.totalCount
          })
        }
      },
      handleDetail(row) {
        repairDetail(row.id).then(res => {
          console.log(res)
          this.details = res.data.data.content
          this.centerDialogVisible = true
        })
        getserviceschedule(row.id).then(res => {
          console.log(res)
          this.schedule = res.data.data.content
        })
      },
      restdispatchform() {
        this.dispatchform = {
          id: ''
        }
      },
      handleDispatch(row) {
        this.restdispatchform()
        this.formdata = Object.assign({}, row)
        this.isvisible = true
        console.log(row)
        const regionid = this.$store.getters.regionId
        getremplist2(row.expectRepositoryId).then(res => {
          this.options2 = res.data.data.content.list
        })
      },
      dispatch() {
        const tempData = Object.assign({}, this.formdata)
        const serviceorderid = tempData.id
        const handlerid = this.dispatchform.id
        repairtoemp(serviceorderid, handlerid).then(res => {
          if (res.data.ret === 200) {
            this.getinstalllist()
            this.isvisible = false
            this.$notify({
              title: 'successful',
              message: 'successful',
              type: 'success',
              duration: 1000
            })
          }
        })
      },

      handleCreate() {
        this.dialogFormVisible = true
        this.getproducts()
      },
      createData() {
        this.$refs.form.validate((valid) => {
          if (valid) {
        newservice(this.form).then(res => {
          this.getinstalllist()
          this.dialogFormVisible = false
          this.$notify({
            title: 'successful',
            message: 'successful',
            type: 'success',
            duration: 1000
          })
        })
          } else {
            this.$notify.error({
              title: '错误',
              message: '信息未填完整',
              offset: 100
            })
            return false
          }
        })
      },
      handleDelete(row) {
        this.$confirm('This will permanently delete the record. Continue?', 'Warning', {
          confirmButtonText: 'ok',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          deleteservice(row).then(res => {
            if (res.data.ret === 200) {
              this.getinstalllist()
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
      handleedit(row) {
        console.log(row)
        this.editform = Object.assign({}, row)
        this.editisvisible = true
      },
      editdata() {
        const serviceid = this.editform.id
        const repositoryid = this.edit.repositoryid
        retoreposervice(serviceid, repositoryid).then(res => {
          if (res.data.ret === 200) {
            this.getinstalllist()
            this.editisvisible = false
            this.$notify({
              title: 'successful',
              message: 'successful',
              type: 'success',
              duration: 1000
            })
          }
        })
      },
      handlecancel(row) {
        this.$confirm('Cancellation of assignment', 'Warning', {
          confirmButtonText: 'ok',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          serviceretoemp(row.id).then(res => {
            if (res.data.ret === 200) {
              this.getinstalllist()
            }
          })
          this.$message({
            type: 'success',
            message: 'cancel completed!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'cancel canceled'
          })
        })
      },
      handlefinish(row) {
        this.$confirm('Is it over?', 'Warning', {
          confirmButtonText: 'ok',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          endservicebackground(row.id).then(res => {
            if (res.data.ret === 200) {
              this.getinstalllist()
            }
          })
          this.$message({
            type: 'success',
            message: 'finish completed!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'finish canceled'
          })
        })
      },
      restdate() {
        this.fuzhi = null
        this.fuzhidate = null
      },
      trajectory(val, date, id) {
        this.restdate()
        this.fuzhi = val
        this.fuzhidate = id
        this.getmapdata(val, this.fuzhidate)
        this.dialogFormVisible4 = true

      },
      getmapdata(val, date) {
        getposition(val, date).then(res => {
          if (res.data.data.content.length === 0) {
            this.markers = [{position:{lng: 120, lat: 11.4574355}}]
            this.mapBuild()
            this.$message('No Employee Tracks')
          } else {
            const arr = res.data.data.content
            const arrb = []
            const arrb2 = []
            arr.map(item => {
              const newobj = {}
              const position = {}
              const newobj2 = {}
              newobj2.lng = item.longitude
              newobj2.lat = item.latitude
              position.lng = item.longitude
              position.lat = item.latitude
              newobj.position = position
              newobj.createTime = item.createTime
              newobj.id = item.id
              newobj.serviceOrderId = item.serviceOrderId
              arrb.push(newobj)
              arrb2.push(newobj2)
            })
            this.markers = arrb
            this.road = arrb2
            console.log(this.markers)
            console.log(this.road)
            this.mapBuild()
          }
        })
      },
      mapBuild() {
        const zhongxin = this.markers[0].position
        // 创建地图实例，zoom是缩放比例
        const map = new google.maps.Map(document.getElementById('map_canvas2'), {
          zoom: 18,
          center: zhongxin,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        })
        console.log(this.road)
        const flightPath = new google.maps.Polyline({
          path: this.road,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        })
        flightPath.setMap(map)
        console.log(this.markers[0].position.lng)
        if (this.markers[0].position.lng === 120) {
          this.markers.map((item, index) => {
            // const marker = new MarkerWithLabel({
            //   position: item.position,
            //   icon: '../../../static/img/qishou.png', // 标记自定义图标
            //   draggable: false, // 不可拖动
            //   map: map, // 地图实例
            //   labelContent: item.name, // label的内容
            //   labelAnchor: new google.maps.Point(22, 0), // label的位置，可以调
            //   labelClass: 'labels', // the CSS class for the label
            //   labelStyle: { background: '#fff', padding: '5px' }
            // })
            // 自定义信息窗口
            console.log(index)
            var marker = new google.maps.Marker({
              map: map,
            })
          })
        } else {
          var labels = '123456789'
          this.markers.map((item, index) => {
            // const marker = new MarkerWithLabel({
            //   position: item.position,
            //   icon: '../../../static/img/qishou.png', // 标记自定义图标
            //   draggable: false, // 不可拖动
            //   map: map, // 地图实例
            //   labelContent: item.name, // label的内容
            //   labelAnchor: new google.maps.Point(22, 0), // label的位置，可以调
            //   labelClass: 'labels', // the CSS class for the label
            //   labelStyle: { background: '#fff', padding: '5px' }
            // })
            // 自定义信息窗口
            console.log(index)
            var marker = new google.maps.Marker({
              map: map,
              label: labels[index % labels.length],
              position: item.position
            })

            const iw = new google.maps.InfoWindow({
              content: `<div>
                          <p>time： ${item.createTime}</p>
                        </div>` })
            // 点击信息窗口显示
            google.maps.event.addListener(marker, 'click', function(e) { iw.open(map, marker) })
          })
        }
        // 这里因为需要很多标记，所以遍历了this.markers（后端给的数据）来循环创建标记

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
  .install-container{
    margin: 30px;
  }
  .filter-container{
    margin-left: 20px;
  }
  .edit >>> .el-dialog{
    -webkit-transform: none;
    transform: none;
    position: absolute;
    right: 0;
    left: auto;
    height: auto;
  }
  .edit >>> .el-dialog__header{
    background: #fff;
    position: fixed;
    top: 0;
    display: block;
    width: 1010px;
    z-index: 100;
    border-bottom: 1px solid #f1f1f1;
  }
  .edit >>> .el-dialog__body{
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
</style>
