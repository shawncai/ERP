<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input :placeholder="$t('Complaint.Complainant')" v-model="searchQuery.username" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('Complaint.phone')" v-model="searchQuery.phone" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-permission="[15]" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>
    <el-tabs v-model="activeName" class="tap-container1" @tab-click="handleClick">
      <el-tab-pane :label="$t('Complaint.all')" name="first">
        <div class="app-container">
          <el-table
            v-loading="listLoading"
            :key="tableKey"
            :data="list"
            :cell-style="{'word-break':'normal!important'}"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('Complaint.id')" prop="id" min-width="80" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.userName')" prop="userName" min-width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.phone')" align="center" prop="phone" min-width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.subject')" prop="subject" min-width="150" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.subject }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.createTime')" prop="createTime" min-width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.handlerName')" align="center" prop="handlerName" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.handlerName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.stat')" align="center" prop="stat" min-width="90">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuan }}</span>
              </template>
            </el-table-column>
            <el-table-column v-permission="[16, 17, 18]" :label="$t('Complaint.actions')" align="center" min-width="280">
              <template slot-scope="scope">
                <el-button v-permission="[18]" v-if="scope.row.stat === 2" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('Complaint.dispatch') }}</el-button>
                <el-button v-permission="[18]" v-if="scope.row.stat !== 2 && scope.row.stat !== 7" size="mini" style="width: 90px;" plain disabled>{{ $t('Complaint.Dispatched') }}</el-button>
                <el-button v-if="scope.row.stat === 7" size="mini" plain >{{ $t('Complaint.finish') }}</el-button>
                <el-button v-permission="[17]" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('Complaint.seen') }}</el-button>
                <el-button v-permission="[16]" type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('Complaint.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('Complaint.toassign')" name="second">
        <div class="app-container">
          <el-table
            v-loading="listLoading"
            :key="tableKey2"
            :data="list2"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('Complaint.id')" prop="id" min-width="80" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.userName')" prop="userName" min-width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.phone')" align="center" prop="phone" min-width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.subject')" prop="subject" min-width="150" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.subject }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.createTime')" prop="createTime" min-width="100" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.handlerName')" align="center" prop="handlerName" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.handlerName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.stat')" align="center" prop="stat" min-width="90">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuan }}</span>
              </template>
            </el-table-column>
            <el-table-column v-permission="[16, 17, 18]" :label="$t('Complaint.actions')" align="center" min-width="270">
              <template slot-scope="scope">
                <el-button v-permission="[18]" v-if="scope.row.stat === 2" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('Complaint.dispatch') }}</el-button>
                <el-button v-permission="[18]" v-if="scope.row.stat !== 2 && scope.row.stat !== 7" size="mini" style="width: 90px;" plain disabled>{{ $t('Complaint.Dispatched') }}</el-button>
                <el-button v-if="scope.row.stat === 7" size="mini" plain >{{ $t('Complaint.finish') }}</el-button>
                <el-button v-permission="[17]" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('Complaint.seen') }}</el-button>
                <el-button v-permission="[16]" type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('Complaint.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total2>0" :total="total2" :page.sync="listQuery2.pagenum" :limit.sync="listQuery2.pagesize" @pagination="getList" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('Complaint.assigned')" name="five">
        <div class="app-container">
          <el-table
            v-loading="listLoading"
            :key="tableKey5"
            :data="list5"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('Complaint.id')" prop="id" min-width="80" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.userName')" prop="userName" min-width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.phone')" align="center" prop="phone" min-width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.subject')" prop="subject" min-width="150" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.subject }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.createTime')" prop="createTime" min-width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.handlerName')" align="center" prop="handlerName" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.handlerName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.stat')" align="center" prop="stat" min-width="90">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuan }}</span>
              </template>
            </el-table-column>
            <el-table-column v-permission="[16, 17, 18]" :label="$t('Complaint.actions')" align="center" min-width="280">
              <template slot-scope="scope">
                <el-button v-permission="[18]" v-if="scope.row.stat === 2" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('Complaint.dispatch') }}</el-button>
                <el-button v-permission="[18]" v-if="scope.row.stat !== 2 && scope.row.stat !== 7" size="mini" style="width: 90px;" plain disabled>{{ $t('Complaint.Dispatched') }}</el-button>
                <el-button v-if="scope.row.stat === 7" size="mini" plain >{{ $t('Complaint.finish') }}</el-button>
                <el-button v-permission="[17]" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('Complaint.seen') }}</el-button>
                <el-button v-permission="[16]" type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('Complaint.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total5>0" :total="total5" :page.sync="listQuery2.pagenum" :limit.sync="listQuery5.pagesize" @pagination="getList" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('Complaint.pending')" name="third">
        <div class="app-container">
          <el-table
            v-loading="listLoading"
            :key="tableKey3"
            :data="list3"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('Complaint.id')" prop="id" min-width="80" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.userName')" prop="userName" min-width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.phone')" align="center" prop="phone" min-width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.subject')" prop="subject" min-width="150" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.subject }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.createTime')" prop="createTime" min-width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.handlerName')" align="center" prop="handlerName" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.handlerName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.stat')" align="center" prop="stat" min-width="90">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuan }}</span>
              </template>
            </el-table-column>
            <el-table-column v-permission="[16, 17, 18]" :label="$t('Complaint.actions')" align="center" min-width="280">
              <template slot-scope="scope">
                <el-button v-permission="[18]" v-if="scope.row.stat === 2" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('Complaint.dispatch') }}</el-button>
                <el-button v-permission="[18]" v-if="scope.row.stat !== 2 && scope.row.stat !== 7" size="mini" style="width: 90px;" plain disabled>{{ $t('Complaint.Dispatched') }}</el-button>
                <el-button v-if="scope.row.stat === 7" size="mini" plain >{{ $t('Complaint.finish') }}</el-button>
                <el-button v-permission="[17]" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('Complaint.seen') }}</el-button>
                <el-button v-permission="[16]" type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('Complaint.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total3>0" :total="total3" :page.sync="listQuery3.pagenum" :limit.sync="listQuery3.pagesize" @pagination="getList" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('Complaint.evaluated')" name="six">
        <div class="app-container">
          <el-table
            v-loading="listLoading"
            :key="tableKey6"
            :data="list6"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('Complaint.id')" prop="id" min-width="80" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.userName')" prop="userName" min-width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.phone')" align="center" prop="phone" min-width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.subject')" prop="subject" min-width="150" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.subject }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.createTime')" prop="createTime" min-width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.handlerName')" align="center" prop="handlerName" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.handlerName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.stat')" align="center" prop="stat" min-width="90">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuan }}</span>
              </template>
            </el-table-column>
            <el-table-column v-permission="[16, 17, 18]" :label="$t('Complaint.actions')" align="center" min-width="280">
              <template slot-scope="scope">
                <el-button v-permission="[18]" v-if="scope.row.stat === 2" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('Complaint.dispatch') }}</el-button>
                <el-button v-permission="[18]" v-if="scope.row.stat !== 2 && scope.row.stat !== 7" size="mini" style="width: 90px;" plain disabled>{{ $t('Complaint.Dispatched') }}</el-button>
                <el-button v-if="scope.row.stat === 7" size="mini" plain >{{ $t('Complaint.finish') }}</el-button>
                <el-button v-permission="[17]" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('Complaint.seen') }}</el-button>
                <el-button v-permission="[16]" type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('Complaint.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total6>0" :total="total6" :page.sync="listQuery6.pagenum" :limit.sync="listQuery6.pagesize" @pagination="getList" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('Complaint.finish')" name="four">
        <div class="app-container">
          <el-table
            v-loading="listLoading"
            :key="tableKey4"
            :data="list4"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('Complaint.id')" prop="id" min-width="80" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.userName')" prop="userName" min-width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.phone')" align="center" prop="phone" min-width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.subject')" prop="subject" min-width="150" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.subject }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.createTime')" prop="createTime" min-width="110" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.handlerName')" align="center" prop="handlerName" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.handlerName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('Complaint.stat')" align="center" prop="stat" min-width="90">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | zhuan }}</span>
              </template>
            </el-table-column>
            <el-table-column v-permission="[16, 17, 18]" :label="$t('Complaint.actions')" align="center" min-width="280">
              <template slot-scope="scope">
                <el-button v-permission="[18]" v-if="scope.row.stat === 2" size="mini" type="success" @click="handleDispatch(scope.row)">{{ $t('Complaint.dispatch') }}</el-button>
                <el-button v-permission="[18]" v-if="scope.row.stat !== 2 && scope.row.stat !== 7" size="mini" style="width: 90px;" plain disabled>{{ $t('Complaint.Dispatched') }}</el-button>
                <el-button v-if="scope.row.stat === 7" size="mini" plain >{{ $t('Complaint.finish') }}</el-button>
                <el-button v-permission="[17]" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('Complaint.seen') }}</el-button>
                <el-button v-permission="[16]" type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('Complaint.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total4>0" :total="total4" :page.sync="listQuery4.pagenum" :limit.sync="listQuery4.pagesize" @pagination="getList" />
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="addformVisible" :title="$t('Complaint.addComplaint')" width="40%" center lock-scroll>
      <el-form :model="categoriesform" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('Complaint.subject')">
          <el-input v-model="categoriesform.subject"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Complaint.subject')">
          <el-input v-model="categoriesform.content"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Complaint.User')">
          <el-select v-model="categoriesform.userid" placeholder="please choose" filterable>
            <el-option
              v-for="(item, index) in useroptions"
              :key="index"
              :label="item.userName"
              :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addformVisible = false">{{ $t('Complaint.cancel') }}</el-button>
        <el-button type="primary" @click="createData()">{{ $t('Complaint.ok') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isvisible" :title="$t('Complaint.dispatching')" width="40%" center lock-scroll>
      <el-form :model="form" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('Complaint.SelectArea')">
          <el-cascader
            :options="options"
            :props="props"
            :show-all-levels="false"
            placeholder="please search"
            change-on-select
            filterable
            clearable
            @change="handlechange"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Complaint.SelectBranch')">
          <el-select v-model="form.repositoryId" clearable class="filter-item" style="width: 130px" filterable @change="handlechangesed">
            <el-option v-for="item in storelist2" ref="reflabel" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('Complaint.Employee')">
          <el-select v-model="form.id" placeholder="please choose">
            <el-option
              v-for="(item, index) in staffoptions"
              :key="index"
              :label="item.personName"
              :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isvisible = false">{{ $t('Complaint.cancel') }}</el-button>
        <el-button type="primary" @click="dispatch">{{ $t('Complaint.ok') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="centerDialogVisible"
      :model="details"
      :title="$t('Complaint.ComplaintDetails')"
      width="80%"
      center
      top="30px"
    >
      <el-row>
        <el-card class="box-card">
          <div style="margin-bottom:10px;">
            <el-col :span="6" >
              <div class="text">{{ $t('Complaint.OrderNumber') }}：{{ details.id }}</div>
            </el-col>
            <el-col :span="6" >
              <div class="text">{{ $t('Complaint.OrderStatus') }}：<span style="color: red">{{ details.stat | zhuan }}</span></div>
            </el-col>
          </div>
        </el-card>
      </el-row>
      <el-row style="margin-top: 15px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('Complaint.CustomerInfo') }}</span>
          </div>
          <div style="margin-bottom:10px;">
            <el-col :span="4" >
              <div class="text">{{ $t('Complaint.CustomerName') }}：{{ details.personName }}</div>
            </el-col>
            <el-col :span="4" >
              <div class="text">{{ $t('Complaint.phone') }}：{{ details.userPhoneumber }}</div>
            </el-col>
            <el-col :span="12" >
              <div class="text">{{ $t('Complaint.Account') }}：{{ details.userName }}</div>
            </el-col>
          </div>
        </el-card>
      </el-row>
      <el-row style="margin-top: 15px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('Complaint.ComplaintInfo') }}</span>
          </div>
          <div style="margin-bottom:10px;">
            <el-col :span="24" >
              <div class="text">{{ $t('Complaint.ComplaintTitle') }}：{{ details.subject }}</div>
            </el-col>
            <el-col :span="12" style="margin-top: 15px">
              <div class="text">{{ $t('Complaint.ComplaintDescription') }}：{{ details.content }}</div>
            </el-col>
          </div>
        </el-card>
      </el-row>
      <el-row style="margin-top: 15px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('Complaint.processInfo') }}</span>
          </div>
          <div style="margin-bottom:10px;">
            <el-col :span="4" >
              <div class="text">{{ $t('Complaint.EmployeeName') }}：{{ details.handlerName }}</div>
            </el-col>
            <el-col :span="4" >
              <div class="text">{{ $t('Complaint.phone') }}：{{ details.empPhonenumber }}</div>
            </el-col>
            <el-col :span="4" >
              <div class="text">{{ $t('Complaint.Role') }}：{{ details.roleName }}</div>
            </el-col>
            <el-col :span="4" >
              <div class="text">{{ $t('Complaint.ProcessTime') }}：{{ details.handleTime }}</div>
            </el-col>
          </div>
        </el-card>
      </el-row>
      <el-row style="margin-top: 15px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('Complaint.ProcessResult') }}</span>
          </div>
          <div style="margin-bottom:10px;">
            <el-rate
              v-model="details.grade"
              disabled
              text-color="#ff9900"
            />
          </div>
        </el-card>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { addcategories } from '@/api/goods'
import { listcomplaints, getremplist, complainttoemp, usersearch, createcomplaint, complaintdetailemp, deletecomplaint, getremplist2 } from '@/api/complaint'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import { editarea, getrepositorylist } from '@/api/employee'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination'

export default {
  name: 'Complaint',
  components: { Pagination },
  directives: { waves, permission },
  filters: {
    zhuan: function(val) {
      if (val === 1) {
        return 'Pending'
      } else if (val === 2) {
        return 'To assign'
      } else if (val === 3) {
        return 'assigned'
      } else if (val === 4) {
        return 'Pending'
      } else if (val === 5) {
        return 'Pending'
      } else if (val === 6) {
        return 'To be evaluated'
      } else if (val === 7) {
        return 'finished'
      }
    }
  },
  data() {
    return {
      activeName: 'first',
      tableKey: 0,
      tableKey2: 0,
      tableKey3: 0,
      tableKey4: 0,
      tableKey5: 0,
      tableKey6: 0,
      list: null,
      list2: null,
      list3: null,
      list4: null,
      list5: null,
      list6: null,
      total: 0,
      total2: 0,
      total3: 0,
      total4: 0,
      total5: 0,
      total6: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        username: '',
        phone: '',
        stat: 0
      },
      searchQuery: {
        pagenum: 1,
        pagesize: 10,
        username: '',
        phone: '',
        stat: ''
      },
      listQuery2: {
        pagenum: 1,
        pagesize: 10,
        username: '',
        phone: '',
        stat: 2
      },
      listQuery3: {
        pagenum: 1,
        pagesize: 10,
        username: '',
        phone: '',
        stat: 4
      },
      listQuery4: {
        pagenum: 1,
        pagesize: 10,
        username: '',
        phone: '',
        stat: 7
      },
      listQuery5: {
        pagenum: 1,
        pagesize: 10,
        username: '',
        phone: '',
        stat: 3
      },
      listQuery6: {
        pagenum: 1,
        pagesize: 10,
        username: '',
        phone: '',
        stat: 6
      },
      temp: '',
      dialogFormVisible: false,
      options: [],
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      storelist2: [],
      form: {
        regionId: '',
        repositoryId: '',
        id: ''
      },
      formLabelWidth: '120px',
      dialogVisible: false,
      centerDialogVisible: false,
      details: {},
      classifyVisible: false,
      categoriesform: {
        userid: '',
        subject: '',
        content: '',
        id: ''
      },
      isvisible: false,
      dispatchform: '',
      staffoptions: [],
      addformVisible: false,
      useroptions: [],
      stat: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true
      listcomplaints(this.listQuery.username, this.listQuery.phone, this.listQuery.stat, this.listQuery.pagenum, this.listQuery.pagesize).then(response => {
        this.list = response.data.data.content.list
        this.total = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      listcomplaints(this.listQuery2.username, this.listQuery2.phone, this.listQuery2.stat, this.listQuery2.pagenum, this.listQuery2.pagesize).then(response => {
        this.list2 = response.data.data.content.list
        this.total2 = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      listcomplaints(this.listQuery3.username, this.listQuery3.phone, this.listQuery3.stat, this.listQuery3.pagenum, this.listQuery3.pagesize).then(response => {
        this.list3 = response.data.data.content.list
        this.total3 = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      listcomplaints(this.listQuery4.username, this.listQuery4.phone, this.listQuery4.stat, this.listQuery4.pagenum, this.listQuery4.pagesize).then(response => {
        this.list4 = response.data.data.content.list
        this.total4 = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      listcomplaints(this.listQuery5.username, this.listQuery5.phone, this.listQuery5.stat, this.listQuery5.pagenum, this.listQuery5.pagesize).then(response => {
        this.list5 = response.data.data.content.list
        this.total5 = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      listcomplaints(this.listQuery6.username, this.listQuery6.phone, this.listQuery6.stat, this.listQuery6.pagenum, this.listQuery6.pagesize).then(response => {
        this.list6 = response.data.data.content.list
        this.total6 = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    handleFilter() {
      this.listLoading = true
      console.log(this.activeName)
      listcomplaints(this.searchQuery.username, this.searchQuery.phone, this.listQuery.stat, this.listQuery.pagenum, this.listQuery.pagesize).then(response => {
        this.list = response.data.data.content.list
        this.total = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      listcomplaints(this.searchQuery.username, this.searchQuery.phone, this.listQuery2.stat, this.listQuery2.pagenum, this.listQuery2.pagesize).then(res => {
        this.list2 = res.data.data.content.list
        this.total2 = res.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
      listcomplaints(this.searchQuery.username, this.searchQuery.phone, this.listQuery3.stat, this.listQuery3.pagenum, this.listQuery3.pagesize).then(res => {
        this.list3 = res.data.data.content.list
        this.total3 = res.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
      listcomplaints(this.searchQuery.username, this.searchQuery.phone, this.listQuery4.stat, this.listQuery4.pagenum, this.listQuery4.pagesize).then(res => {
        this.list4 = res.data.data.content.list
        this.total4 = res.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
      listcomplaints(this.searchQuery.username, this.searchQuery.phone, this.listQuery5.stat, this.listQuery4.pagenum, this.listQuery4.pagesize).then(res => {
        this.list5 = res.data.data.content.list
        this.total5 = res.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
      listcomplaints(this.searchQuery.username, this.searchQuery.phone, this.listQuery6.stat, this.listQuery4.pagenum, this.listQuery4.pagesize).then(res => {
        this.list6 = res.data.data.content.list
        this.total6 = res.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
    handleClick(tab) {
      if (tab.name === 'first') {
        listcomplaints(this.listQuery.username, this.listQuery.phone, this.listQuery.stat, this.listQuery.pagenum, this.listQuery.pagesize).then(res => {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        })
      } else if (tab.name === 'second') {
        listcomplaints(this.listQuery2.username, this.listQuery2.phone, this.listQuery2.stat, this.listQuery2.pagenum, this.listQuery2.pagesize).then(res => {
          this.list2 = res.data.data.content.list
          this.total2 = res.data.data.content.totalCount
        })
      } else if (tab.name === 'third') {
        listcomplaints(this.listQuery3.username, this.listQuery3.phone, this.listQuery3.stat, this.listQuery3.pagenum, this.listQuery3.pagesize).then(res => {
          this.list3 = res.data.data.content.list
          this.total3 = res.data.data.content.totalCount
        })
      } else if (tab.name === 'four') {
        listcomplaints(this.listQuery4.username, this.listQuery4.phone, this.listQuery4.stat, this.listQuery4.pagenum, this.listQuery4.pagesize).then(res => {
          this.list4 = res.data.data.content.list
          this.total4 = res.data.data.content.totalCount
        })
      } else if (tab.name === 'five') {
        listcomplaints(this.listQuery5.username, this.listQuery5.phone, this.listQuery5.stat, this.listQuery5.pagenum, this.listQuery5.pagesize).then(res => {
          this.list5 = res.data.data.content.list
          this.total5 = res.data.data.content.totalCount
        })
      } else if (tab.name === 'six') {
        listcomplaints(this.listQuery6.username, this.listQuery6.phone, this.listQuery6.stat, this.listQuery6.pagenum, this.listQuery6.pagesize).then(res => {
          this.list6 = res.data.data.content.list
          this.total6 = res.data.data.content.totalCount
        })
      }
    },
    handleUpdate(row) {
      console.log(row)
      complaintdetailemp(row).then(res => {
        this.details = res.data.data.content
      })
      this.centerDialogVisible = true
    },
    resetForm() {
      this.categoriesform = {
        userid: '',
        subject: '',
        content: '',
        id: ''
      }
    },
    handleCreate() {
      this.resetForm()
      this.addformVisible = true
      usersearch().then(res => {
        this.useroptions = res.data.data.content.list
      })
    },
    createData() {
      console.log(this.categoriesform)
      createcomplaint(this.categoriesform).then(res => {
        if (res.data.ret === 200) {
          this.getList()
          this.addformVisible = false
          this.$notify({
            title: 'Successful',
            message: 'Successful',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleAddClassify() {
      this.classifyVisible = true
    },
    createClassify() {
      this.categoriesform.createrId = this.$store.getters.userId
      addcategories(this.categoriesform).then(() => {
        this.$notify({
          title: 'Successful',
          message: 'Successful',
          type: 'success',
          duration: 2000
        })
        this.product()
        this.classifyVisible = false
      })
    },
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    restform() {
      this.form = {
        regionId: '',
        repositoryId: '',
        id: ''
      }
    },
    handleDispatch(row) {
      this.restform()
      this.isvisible = true
      editarea().then(res => {
        this.options = this.tranKTree(res.data.data.content)
      })
      this.temp = Object.assign({}, row)
    },
    handlechange(val) {
      this.form.regionId = val[val.length - 1]
      getrepositorylist(this.form.regionId).then(res => {
        this.storelist2 = res.data.data.content.list
      })
      getremplist2(this.form.regionId).then(res => {
        this.staffoptions = res.data.data.content.list
      })
    },
    handlechangesed(val) {
      getremplist(val).then(res => {
        this.staffoptions = res.data.data.content.list
      })
    },
    dispatch() {
      complainttoemp(this.temp.id, this.form.id).then(res => {
        if (res.data.ret === 200) {
          this.getList()
          this.isvisible = false
          this.$notify({
            title: 'Successful',
            message: 'Successful',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('This will permanently delete the record. Continue?', 'Warning', {
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        deletecomplaint(row).then(res => {
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
