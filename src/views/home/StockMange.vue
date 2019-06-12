<template>
  <div class="ERP-container">
    <div class="filter-container">
      <div id="app">
        <p>{{ $t('route.StockMange') }}</p>
      </div>

      <!--      <el- v-model="getemplist.id" :placeholder="$t('route.WorkDesk')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>-->
    </div>
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.id" :placeholder="$t('Repository.id')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.repositoryName" :placeholder="$t('Repository.repositoryname')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.type" :value="getemplist.type" :placeholder="$t('Repository.type2')" class="filter-item" clearable>
        <el-option
          v-for="(item, index) in types"
          :key="index"
          :value="item.id"
          :label="item.categoryName"
        />
      </el-select>
      <el-select v-model="getemplist.iseffective" :value="getemplist.iseffective" :placeholder="$t('Repository.iseffective')" class="filter-item" clearable>
        <el-option label="启用" value="1"/>
        <el-option label="停用" value="2"/>
      </el-select>
      <el-cascader
        :options="regions"
        :props="props"
        v-model="getemplistregions"
        :show-all-levels="false"
        placeholder="请选择区域"
        change-on-select
        filterable
        clearable
        class="filter-item"
        @change="handlechange4"
      />
      <el-select v-model="getemplist.countyrId" placeholder="请选择国家" class="filter-item" clearable>
        <el-option
          v-for="(item, index) in nations"
          :key="index"
          :label="item.name"
          :value="item.id"/>
      </el-select>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-9-11-9']" style="text-align: left" command="disable"><svg-icon icon-class="tingyong" style="width: 40px"/>{{ $t('public.disable') }}</el-dropdown-item>
          <el-dropdown-item v-permission="['1-9-11-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-9-11-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-9-11-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-9-11-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
    </div>
    <div class="app-container">
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
          align="center"/>
        <el-table-column :label="$t('Repository.id')" :resizable="false" prop="id" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Repository.repositoryname')" :resizable="false" prop="repositoryName" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Repository.type2')" :resizable="false" prop="categoryName" align="center" width="230">
          <template slot-scope="scope">
            <span>{{ scope.row.categoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Repository.iseffective')" :resizable="false" prop="stat" align="center" width="230">
          <template slot-scope="scope">
            <span>{{ scope.row.stat | iseffectiveFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Repository.managerPeople')" :resizable="false" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.managerName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Repository.regionId')" :resizable="false" prop="regionName" align="center" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.regionName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['1-9-11-3']" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-permission="['1-9-11-9']" v-show="scope.row.stat === 1" size="mini" type="warning" @click="handleDisable(scope.row)">{{ $t('public.disable') }}</el-button>
            <el-button v-permission="['1-9-11-8']" v-show="scope.row.stat === 2" size="mini" type="success" @click="handleEnable(scope.row)">{{ $t('public.enable') }}</el-button>
            <el-button v-permission="['1-9-11-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改操作-->
      <!--===========================-->
      <!--开始-->
      <el-dialog :visible.sync="editVisible" top="10px" title="修改仓库">
        <!--仓库信息-->
        <h2 ref="geren" class="form-name">基本信息</h2>
        <div class="container">
          <el-form ref="RepositoryForm" :model="RepositoryForm" :rules="Repositoryrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
            <el-form-item :label="$t('Repository.repositoryName')" prop="repositoryName" style="width: 40%;margin-top:1%">
              <el-input v-model="RepositoryForm.repositoryName" placeholder="请输入门店名称" clearable/>
            </el-form-item>
            <el-form-item :label="$t('Repository.longitude')" prop="longitude" style="width: 40%;margin-top:1%">
              <el-input v-model.number="RepositoryForm.longitude" placeholder="请输入经度" autocomplete="new-password" clearable/>
            </el-form-item>
            <el-form-item :label="$t('Repository.latitude')" prop="latitude" style="width: 40%">
              <el-input v-model.number="RepositoryForm.latitude" placeholder="请输入纬度" clearable/>
            </el-form-item>
            <el-form-item :label="$t('public.address')" prop="address" style="width: 40%">
              <el-input v-model="RepositoryForm.address" placeholder="请输入详细门店地址" clearable/>
            </el-form-item>
            <el-form-item :label="$t('Repository.regionId')" style="width: 40%;margin-top:1%">
              <el-input v-model="regionname" autocomplete="new-password" disabled clearable/>
            </el-form-item>
            <el-form-item :label="$t('Repository.editregionId')" style="width: 40%;margin-top: 1%">
              <el-cascader
                :options="regions"
                :props="props"
                v-model="regionId"
                :show-all-levels="false"
                placeholder="请选择区域"
                change-on-select
                filterable
                clearable
                style="width: 100%;"
              />
            </el-form-item>
            <el-form-item :label="$t('Repository.stat')" style="width: 40%;margin-top: 1%">
              <el-radio-group v-model="RepositoryForm.stat" style="width: 80%">
                <el-radio :label="1" style="width: 50%">active</el-radio>
                <el-radio :label="2">dead</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('Repository.type')" style="width: 40%;margin-top: 1%">
              <el-select v-model="RepositoryForm.type" :value="RepositoryForm.type" placeholder="请选择" style="width: 100%;">
                <el-option
                  v-for="(item, index) in types"
                  :key="index"
                  :value="item.id"
                  :label="item.categoryName"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('Repository.managerPeople')" style="width: 40%;margin-top: 1%">
              <el-input v-model="managerPeople" :value="managerPeople" placeholder="请选择" @focus="handlechoose"/>
            </el-form-item>
            <!--=========================================-->
            <!--店长弹出员工列表开始-->
            <el-dialog :visible.sync="employeeVisible" append-to-body top="10px" title="选择店长">
              <div class="filter-container">
                <el-input v-model="getemplist.employeename" :placeholder="$t('NewEmployeeInformation.employeename')" class="filter-item" clearable @keyup.enter.native="handleFilter2"/>
                <el-input v-model="getemplist.jobnumber" :placeholder="$t('NewEmployeeInformation.jobnumber2')" class="filter-item" clearable @keyup.enter.native="handleFilter2"/>
                <el-date-picker
                  v-model="getemplist.time"
                  type="date"
                  class="filter-item"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"/>
                <el-popover
                  placement="bottom"
                  width="500"
                  trigger="click">
                  <el-cascader
                    :options="regions2"
                    :props="props2"
                    v-model="getemplistregions"
                    :show-all-levels="false"
                    placeholder="请选择区域"
                    change-on-select
                    filterable
                    clearable
                    style="width: 40%;float: left;margin-left: 20px"
                    @change="handlechange4"
                  />
                  <el-select v-model="getemplist.repositoryid" placeholder="请选择门店" filterable clearable style="width: 40%;float: right;margin-right: 20px">
                    <el-option
                      v-for="(item, index) in repositories"
                      :key="index"
                      :label="item.repositoryName"
                      :value="item.id"/>
                  </el-select>
                  <el-select v-model="getemplist.postid" :value="getemplist.postid" :placeholder="$t('NewEmployeeInformation.postid2')" class="filter-item" clearable style="width: 40%;float: left;margin-top: 10px;margin-left: 20px">
                    <el-option label="xxx" value="1"/>
                    <el-option label="xxx" value="2"/>
                  </el-select>
                  <el-select v-model="getemplist.deptid" :placeholder="$t('NewEmployeeInformation.deptid2')" class="filter-item" clearable style="width: 40%;float: right;margin-top: 10px;margin-right: 20px">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :label="item.deptName"
                      :value="item.id"/>
                  </el-select>
                  <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
                    <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter2">{{ $t('public.search') }}</el-button>
                  </div>
                  <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
                </el-popover>
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter2">{{ $t('public.search') }}</el-button>
                <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;" @click="handleAdd2">{{ $t('public.add') }}</el-button>
              </div>
              <el-table
                v-loading="listLoading"
                :data="list"
                :key="tableKey"
                border
                fit
                highlight-current-row
                style="width: 100%"
                @current-change="handleCurrentChange">
                <el-table-column
                  :label="$t('NewEmployeeInformation.id')"
                  :resizable="false"
                  property="id"
                  align="center"
                  width="50"/>
                <el-table-column
                  :label="$t('NewEmployeeInformation.jobNumber')"
                  :resizable="false"
                  property="jobNumber"
                  align="center"
                  width="100"/>
                <el-table-column
                  :label="$t('NewEmployeeInformation.account')"
                  :resizable="false"
                  property="account"
                  width="150"
                  align="center"/>
                <el-table-column :label="$t('NewEmployeeInformation.name')" :resizable="false" align="center" width="109">
                  <template slot-scope="scope">
                    <span>{{ scope.row.firstName }} {{ scope.row.middleName }} {{ scope.row.lastName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('NewEmployeeInformation.gender')" :resizable="false" prop="gender" align="center" width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.gender | genderFilter }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('NewEmployeeInformation.deptName')" :resizable="false" prop="deptName" align="center" width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.deptName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('NewEmployeeInformation.regionName')" :resizable="false" prop="regionName" align="center" width="230">
                  <template slot-scope="scope">
                    <span>{{ scope.row.regionName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('NewEmployeeInformation.repositoryName')" :resizable="false" prop="repositoryName" align="center" width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.repositoryName }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="gitemplist" />
              <span slot="footer" class="dialog-footer" style="text-align: left">
                <el-button v-waves type="success" style="text-align: center;" @click="handleConfirm">确认添加</el-button>
              </span>
            </el-dialog>
            <!--弹窗员工列表结束-->
            <el-form-item :label="$t('Repository.createTime')" style="width: 40%;margin-top: 1%">
              <el-date-picker
                v-model="RepositoryForm.createTime"
                type="date"
                placeholder="选择开业时间"
                value-format="yyyy-MM-dd"
                clearable
                disabled
                style="width: 100%"/>
            </el-form-item>
            <el-form-item :label="$t('Repository.regionManager')" style="width: 40%;margin-top: 1%">
              <el-input v-model="regionManagerId" :value="regionManagerId" placeholder="请选择" clearable @focus="handlechoose2"/>
            </el-form-item>
            <!--店长弹出员工列表开始-->
            <!--==============================================-->
            <!--==================================================-->
            <!--小区经理选择弹窗开始-->
            <el-dialog :visible.sync="regionManagerVisible" append-to-body top="10px" title="选择小区经理">
              <div class="filter-container">
                <el-input v-model="getemplist.employeename" :placeholder="$t('NewEmployeeInformation.employeename')" class="filter-item" clearable @keyup.enter.native="handleFilter2"/>
                <el-input v-model="getemplist.jobnumber" :placeholder="$t('NewEmployeeInformation.jobnumber2')" class="filter-item" clearable @keyup.enter.native="handleFilter2"/>
                <el-date-picker
                  v-model="getemplist.time"
                  type="date"
                  class="filter-item"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"/>
                <el-popover
                  placement="bottom"
                  width="500"
                  trigger="click">
                  <el-cascader
                    :options="regions2"
                    :props="props2"
                    v-model="getemplistregions"
                    :show-all-levels="false"
                    placeholder="请选择区域"
                    change-on-select
                    filterable
                    clearable
                    style="width: 40%;float: left;margin-left: 20px"
                    @change="handlechange4"
                  />
                  <el-select v-model="getemplist.repositoryid" placeholder="请选择门店" filterable clearable style="width: 40%;float: right;margin-right: 20px">
                    <el-option
                      v-for="(item, index) in repositories"
                      :key="index"
                      :label="item.repositoryName"
                      :value="item.id"/>
                  </el-select>
                  <el-select v-model="getemplist.postid" :value="getemplist.postid" :placeholder="$t('NewEmployeeInformation.postid2')" class="filter-item" clearable style="width: 40%;float: left;margin-top: 10px;margin-left: 20px">
                    <el-option label="xxx" value="1"/>
                    <el-option label="xxx" value="2"/>
                  </el-select>
                  <el-select v-model="getemplist.deptid" :placeholder="$t('NewEmployeeInformation.deptid2')" class="filter-item" clearable style="width: 40%;float: right;margin-top: 10px;margin-right: 20px">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :label="item.deptName"
                      :value="item.id"/>
                  </el-select>
                  <div class="seachbutton" style="width: 100%;float: right;margin-top: 20px">
                    <el-button v-waves class="filter-item" type="primary" style="float: right" @click="handleFilter2">{{ $t('public.search') }}</el-button>
                  </div>
                  <el-button v-waves slot="reference" type="primary" class="filter-item" style="width: 130px">{{ $t('public.filter') }}<svg-icon icon-class="shaixuan" style="margin-left: 4px"/></el-button>
                </el-popover>
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter2">{{ $t('public.search') }}</el-button>
                <el-button v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;" @click="handleAdd3">{{ $t('public.add') }}</el-button>
              </div>
              <el-table
                v-loading="listLoading"
                :data="list"
                :key="tableKey"
                border
                fit
                highlight-current-row
                style="width: 100%"
                @current-change="handleCurrentChange2">
                <el-table-column
                  :label="$t('NewEmployeeInformation.id')"
                  :resizable="false"
                  property="id"
                  align="center"
                  width="50"/>
                <el-table-column
                  :label="$t('NewEmployeeInformation.jobNumber')"
                  :resizable="false"
                  property="jobNumber"
                  align="center"
                  width="100"/>
                <el-table-column
                  :label="$t('NewEmployeeInformation.account')"
                  :resizable="false"
                  property="account"
                  width="150"
                  align="center"/>
                <el-table-column :label="$t('NewEmployeeInformation.name')" :resizable="false" align="center" width="109">
                  <template slot-scope="scope">
                    <span>{{ scope.row.firstName }} {{ scope.row.middleName }} {{ scope.row.lastName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('NewEmployeeInformation.gender')" :resizable="false" prop="gender" align="center" width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.gender | genderFilter }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('NewEmployeeInformation.deptName')" :resizable="false" prop="deptName" align="center" width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.deptName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('NewEmployeeInformation.regionName')" :resizable="false" prop="regionName" align="center" width="230">
                  <template slot-scope="scope">
                    <span>{{ scope.row.regionName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('NewEmployeeInformation.repositoryName')" :resizable="false" prop="repositoryName" align="center" width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.repositoryName }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" style="padding: 0" @pagination="gitemplist" />
              <span slot="footer" class="dialog-footer" style="text-align: left">
                <el-button v-waves type="success" style="text-align: center;" @click="handleConfirm2">确认添加</el-button>
              </span>
            </el-dialog>
            <!--小区经理选择弹窗结束-->
            <!--弹窗员工列表结束-->
            <el-form-item :label="$t('Repository.attributes')" style="width: 40%;margin-top: 1%">
              <el-select v-model="RepositoryForm.attributes" :value="RepositoryForm.attributes" placeholder="请选择" clearable style="width: 100%;">
                <el-option label="只卖" value="1"/>
                <el-option label="既卖又维修" value="2"/>
                <el-option label="只存储" value="3"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('Repository.countryId')" style="width: 40%;margin-top: 1%">
              <el-select v-model="RepositoryForm.countryId" placeholder="请选择国家" style="width: 100%;" disabled>
                <el-option
                  v-for="(item, index) in nations"
                  :key="index"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('Repository.description')" style="width: 40%;margin-top:1%">
              <el-input v-model="RepositoryForm.description" type="textarea" clearable/>
            </el-form-item>
          </el-form>
        </div>
        <div class="buttons" style="margin-top: 20px;margin-left: 30px">
          <el-button type="primary" @click="handleEditok()">修改</el-button>
          <el-button type="danger" @click="handlecancel()">取消</el-button>
        </div>
      </el-dialog>
      <!--修改操作-->
      <!--结束-->
    </div>
  </div>
</template>

<script>
  import { regionlist, getcountrylist, searchRepository } from '@/api/public'
  import { searchRepCategory, searchRepository2, update, deleteRepository, startorend } from '@/api/Repository'
  import { getemplist, getdeptlist } from '@/api/EmployeeInformation'
  import permission from '@/directive/permission/index.js' // 权限判断指令
  import checkPermission from '@/utils/permission' // 权限判断函数
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'StockMange',
    directives: { waves, permission },
    components: { Pagination },
    filters: {
      iseffectiveFilter(status) {
        const statusMap = {
          1: '启用',
          2: '停用'
        }
        return statusMap[status]
      },
      genderFilter(status) {
        const statusMap = {
          1: '男',
          2: '女'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        // 批量操作
        moreaction: '',
        // 修改列表控制
        editVisible: false,
        // 类型列表
        types: [],
        // 国家列表
        nations: [],
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
        // 仓库列表查询加展示参数
        getemplist: {
          repositoryName: '',
          type: '',
          iseffective: '',
          regionId: '',
          countyrId: '',
          loginRepositoryId: this.$store.getters.repositoryId,
          regionIds: this.$store.getters.regionId,
          id: '',
          pagenum: 1,
          pagesize: 10
        },
        // 部门列表
        depts: [],
        // 区域级联数据转化
        props: {
          value: 'id',
          label: 'regionName',
          children: 'regionListVos'
        },
        // 区域数据
        regions: [],
        getemplistregions: [],
        getemplistregions0: [],
        // =====================================
        // 修改弹窗中的数据开始
        // 区域回显数据
        regionname: '',
        // 仓库管理员回显数据
        managerPeople: '',
        // 小区经理回显数据
        regionManagerId: '',
        // 仓库基本信息数据
        RepositoryForm: {},
        // 区域id
        regionId: [],
        // 仓库信息规则数据
        Repositoryrules: {
          longitude: [
            { required: true, message: '请输入经度', trigger: 'blur' },
            { type: 'number', message: '经度必须为数字值' }
          ],
          repositoryName: [
            { required: true, message: '请输入仓库名称', trigger: 'blur' }
          ],
          latitude: [
            { required: true, message: '请输入维度', trigger: 'blur' },
            { type: 'number', message: '维度必须为数字值' }
          ],
          lastname: [
            { required: true, message: '请输入名', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          countryId: [
            { required: true, message: '请选择国家', trigger: 'change' }
          ]
        },
        // / 弹窗选择
        // 单选表格样式
        currentRow: null,
        // 员工表格数据
        list2: [],
        // 员工表格数据条数
        total2: 0,
        // 员工表格识别
        tableKey2: 0,
        // 加载员工表格
        listLoading2: true,
        // 员工查询列表数据
        getemplist2: {
          repositoryid: '',
          regionid: '',
          postid: '',
          deptid: '',
          employeename: '',
          pagenum: 1,
          pagesize: 10,
          stat: 1,
          loginRepositoryId: this.$store.getters.repositoryId,
          regionIds: this.$store.getters.regionId,
          time: '',
          jobnumber: ''
        },
        // 部门列表
        depts2: [],
        // 区域级联数据转化
        props2: {
          value: 'id',
          label: 'regionName',
          children: 'regionListVos'
        },
        // 区域数据
        regions2: [],
        getemplistregions2: [],
        // 门店数据
        repositories: [],
        // 员工选择框控制
        employeeVisible: false,
        // 小区经理选择框控制
        regionManagerVisible: false
        // 修改弹窗中的数据结束
      }
    },
    mounted() {
      this.getlist()
    },
    methods: {
      checkPermission,
      getlist() {
        // 国家列表
        getcountrylist().then(res => {
          if (res.data.ret === 200) {
            this.nations = res.data.data.content
          } else {
            console.log('国家列表错误')
          }
        })
        // 员工列表数据
        this.listLoading = true
        searchRepository2(this.getemplist).then(res => {
          if (res.data.ret === 200) {
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
          } else {
            console.log('员工列表错误')
          }
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 100)
        })
        // 仓库类型
        searchRepCategory().then(res => {
          if (res.data.ret === 200) {
            console.log(res)
            this.types = res.data.data.content.list
          } else {
            console.log('仓库类型错误')
          }
        })
        // 区域数据
        regionlist().then(res => {
          if (res.data.ret === 200) {
            this.regions = this.tranKTree(res.data.data.content)
          }
        })
      },
      // 搜索
      handleFilter() {
        this.getemplist.pagenum = 1
        this.getemplist.regionId = this.getemplistregions[this.getemplistregions.length - 1]
        console.log(this.getemplist)
        searchRepository2(this.getemplist).then(res => {
          if (res.data.ret === 200) {
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
          } else {
            console.log('搜索错误')
          }
        })
      },
      // 批量操作
      handleSelectionChange(val) {
        this.moreaction = val
      },
      // 批量停用和删除
      handleCommand(command) {
        const ids = this.moreaction.map(item => item.id).join()
        if (command === 'disable') {
          startorend(ids, 2).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '操作成功',
                message: '操作成功',
                type: 'success',
                duration: 1000,
                offset: 100
              })
              this.getlist()
            } else {
              this.$message.error('出错了')
            }
          })
        } else if (command === 'delete') {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteRepository(ids, this.$store.getters.userId).then(res => {
              if (res.data.ret === 200 || res.data.ret === 100) {
                this.$notify({
                  title: '删除成功',
                  type: 'success',
                  offset: 100
                })
                this.getlist()
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '出错了',
                  offset: 100
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      },
      // 单条删除
      handleDelete(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRepository(row.id, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: '删除成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: '错误',
                message: '出错了',
                offset: 100
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 单条停用
      handleDisable(row) {
        startorend(row.id, 2).then(res => {
          if (res.data.ret === 200) {
            this.$notify({
              title: '操作成功',
              message: '操作成功',
              type: 'success',
              duration: 1000,
              offset: 100
            })
            this.getlist()
          } else {
            this.$message.error('出错了')
          }
        })
      },
      // 单条启用
      handleEnable(row) {
        startorend(row.id, 1).then(res => {
          if (res.data.ret === 200) {
            this.$notify({
              title: '操作成功',
              message: '操作成功',
              duration: 1000,
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$message.error('出错了')
          }
        })
      },
      // 新增数据
      handleAdd() {
        this.$router.push('/Repository/NewRepository')
      },
      // 生成合同
      handleContract() {
        console.log(123)
      },
      // 导出
      handleExport() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['编号', '工号', '员工登陆账号', '姓名', '性别', '生日', '邮箱', '职位', '所属部门', '所属区域', '所属门店', '入职时间', '离职时间', '状态']
          const filterVal = ['id', 'jobNumber', 'account', 'firstName', 'gender', 'birthday', 'email', 'postName', 'deptName', 'regionName', 'repositoryName', 'createTime', 'dimissionTime', 'stat']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '仓库资料表'
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
      // 修改操作
      handleEdit(row) {
        console.log(row)
        this.RepositoryForm = Object.assign({}, row)
        this.regionname = row.regionName
        this.managerPeople = row.managerName
        this.regionManagerId = row.regionPersonName
        this.RepositoryForm.attributes = String(row.attributes)
        this.editVisible = true
      },
      // 确认修改
      handleEditok() {
        this.RepositoryForm.regionId = this.regionId[this.regionId.length - 1]
        this.$refs.RepositoryForm.validate((valid) => {
          if (valid) {
            update(this.RepositoryForm).then(res => {
              if (res.data.ret === 200) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  offset: 100
                })
                this.getlist()
                this.$refs.RepositoryForm.clearValidate()
                this.$refs.RepositoryForm.resetFields()
                this.editVisible = false
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '出错了',
                  offset: 100
                })
              }
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
      //  取消修改
      handlecancel() {
        this.$refs.RepositoryForm.clearValidate()
        this.$refs.RepositoryForm.resetFields()
        this.editVisible = false
      },
      // 修改弹窗里的操作开始
      // --------------------------------------------------
      // 仓库管理员选择开始
      gitemplist() {
        // 员工列表数据
        this.listLoading = true
        console.log(this.getemplist)
        getemplist(this.getemplist).then(res => {
          if (res.data.ret === 200) {
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
          } else {
            this.$notify.error({
              title: '错误',
              message: '出错了',
              offset: 100
            })
          }
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 100)
        })
        // 部门列表数据
        getdeptlist().then(res => {
          if (res.data.ret === 200) {
            this.depts = res.data.data.content
          } else {
            this.$notify.error({
              title: '错误',
              message: '出错了',
              offset: 100
            })
          }
        })
        // 区域数据
        regionlist().then(res => {
          if (res.data.ret === 200) {
            this.regions2 = this.tranKTree(res.data.data.content)
          }
        })
      },
      // 查询
      handleFilter2() {
        this.getemplist.regionid = this.getemplistregions[this.getemplistregions.length - 1]
        getemplist(this.getemplist).then(res => {
          if (res.data.ret === 200) {
            this.list = res.data.data.content.list
            this.total = res.data.data.content.totalCount
          } else {
            this.$notify.error({
              title: '错误',
              message: '出错了',
              offset: 100
            })
          }
        })
      },
      // 新增数据
      handleAdd2() {
        this.employeeVisible = false
        this.$router.push('/EmployeeInformation/NewEmployeeInformation')
      },
      // 根据区域选择门店
      handlechange4(val) {
        console.log(val)
        const finalid = val[val.length - 1]
        searchRepository(finalid).then(res => {
          if (res.data.ret === 200) {
            console.log(res)
            this.repositories = res.data.data.content.list
          } else {
            this.$message.error('出错了')
          }
        })
      },
      // 清空历史搜索数据
      restemplist() {
        this.getemplist = {
          repositoryid: '',
          regionid: '',
          postid: '',
          deptid: '',
          employeename: '',
          pagenum: 1,
          pagesize: 10,
          stat: 1,
          loginRepositoryId: this.$store.getters.repositoryId,
          regionIds: this.$store.getters.regionId,
          time: '',
          jobnumber: ''
        }
        this.getemplistregions = []
      },
      // 员工输入框focus事件触发
      handlechoose() {
        this.restemplist()
        this.employeeVisible = true
        this.gitemplist()
      },
      // 选择员工数据时的操作
      handleCurrentChange(val) {
        this.managerPeople = val.personName
        this.RepositoryForm.managerPeopleId = val.id
      },
      handleConfirm() {
        this.employeeVisible = false
      },
      // 仓库管理员选择结束
      // ---------------------------------------------------------------
      // 小区经理选择开始
      // 小区经理输入框focus事件触发
      handlechoose2() {
        this.restemplist()
        this.regionManagerVisible = true
        this.gitemplist()
      },
      // 新增数据
      handleAdd3() {
        this.regionManagerVisible = false
        this.$router.push('/EmployeeInformation/NewEmployeeInformation')
      },
      // 小区经理选择员工数据时的操作
      handleCurrentChange2(val) {
        console.log(val)
        this.regionManagerId = val.personName
        this.RepositoryForm.regionManagerId = val.id
      },
      handleConfirm2() {
        this.regionManagerVisible = false
      }
      // 小区经理选择结束
      // 修改弹窗里的操作结束
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
  .ERP-container {
    margin: 0px 30px;
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
