<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">

      <el-input v-model="moveInRepository" :placeholder="$t('Storagemove.repostiryName')" size="small" class="filter-item" clearable @clear="restFilter" @keyup.enter.native="handleFilter" @focus="handlechooseDep"/>

      <my-depot :depotcontrol.sync="depotcontrol" @depotname="depotname"/>

      <el-select v-model="getemplist.typeId" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter">
        <el-option
          v-for="(item, index) in types"
          :key="index"
          :label="item.categoryName"
          :value="item.id"
        />
      </el-select>

      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">

      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" size="small" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 新建操作 -->
      <el-button v-permission="['200-250-251-1']" v-waves size="small" class="filter-item2" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <el-dialog :visible.sync="categoryVisible" title="首付设置" class="normal" width="600px" center>
        <el-form ref="addCategoryForm" :rules="addCategoryFormRules" :model="addCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">

          <el-form-item :label="$t('Product.typeid')" label-width="100px" prop="typeId">
            <el-select v-model="addCategoryForm.typeId" placeholder="请选择型号" style="width: 100%">
              <el-option
                v-for="(item, index) in types"
                :key="index"
                :label="item.categoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('update4.zuidishoufu')" label-width="100px" prop="lowerMoney">
            <el-input v-model="addCategoryForm.lowerMoney" />
          </el-form-item>
        </el-form>
        <el-card class="box-card" style="margin-top: 15px" shadow="never">
          <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
            <el-button @click="handlerepository">{{ $t('updates.tj') }}</el-button>
            <my-repository2 :repositorycontrol.sync="repositorycontrol2" @repositoryname="repositoryname2"/>
            <el-button type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          </div>
          <div >
            <el-editable
              ref="editable2"
              :data.sync="list3"
              :edit-config="{ showIcon: true, showStatus: true}"
              class="click-table1"
              stripe
              border
              height="400"
              size="small"
              style="width: 100%">
              <el-editable-column type="selection" width="55" align="center" fixed="left"/>
              <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
              <el-editable-column :label="$t('updates.mdmc')" prop="repositoryName" align="center" min-width="150px"/>
            </el-editable>
          </div>
        </el-card>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
          <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>
    </el-card>

    <el-card :body-style="	{ padding: '10px' }" class="box-card" shadow="never">

      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :height="tableHeight"
        :key="tableKey"
        :data="list"
        size="small"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @row-click="clickRow"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          align="center"/>
        <el-table-column :label="$t('InstallmentrateList.id')" :resizable="false" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.repostiryName')" :resizable="false" align="center" min-width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.repositoryNames }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('update4.zuidishoufu')" :resizable="false" align="center" min-width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.lowerMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Product.typeid')" :resizable="false" align="center" min-width="350">
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('InstallmentrateList.createPersonName')" :resizable="false" align="center" min-width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.createName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['200-250-251-3']" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)" />
            <el-button v-permission="['200-250-251-2']" :title="$t('updates.sc')" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editcategoryVisible" :title="$t('updates.xgfqlx')" class="normal" width="600px" center>
        <el-form ref="editCategoryForm" :rules="editCategoryFormRules" :model="editCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('Product.typeid')" label-width="100px" prop="typeId">
            <el-select v-model="editCategoryForm.typeId" placeholder="请选择型号" style="width: 100%">
              <el-option
                v-for="(item, index) in types"
                :key="index"
                :label="item.categoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('update4.zuidishoufu')" label-width="100px" prop="lowerMoney">
            <el-input v-model="editCategoryForm.lowerMoney" />
          </el-form-item>
        </el-form>
        <el-card class="box-card" style="margin-top: 15px" shadow="never">
          <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
            <el-button @click="handlerepository4">{{ $t('updates.tj') }}</el-button>
            <my-repository4 :repositorycontrol.sync="repositorycontrol4" @repositoryname4="repositoryname4"/>
            <el-button type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          </div>
          <div >
            <el-editable
              ref="editable4"
              :data.sync="list4"
              :edit-config="{ showIcon: true, showStatus: true}"
              class="click-table1"
              stripe
              border
              height="400"
              size="small"
              style="width: 100%">
              <el-editable-column type="selection" width="55" align="center" fixed="left"/>
              <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
              <el-editable-column :label="$t('updates.mdmc')" prop="repositoryName" align="center" min-width="150px"/>
            </el-editable>
          </div>
        </el-card>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleOk()">{{ $t('public.edit') }}</el-button>
          <el-button type="danger" @click="handleNo()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import { installmentFirstList, addInstallmentFirst, updateInstallmentFirst, deleteInstallmentFirst } from '@/api/Installmentrate'
import { searchEmpCategory2 } from '@/api/Product'

import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyRepository2 from './components/MyRepository3'
import MyRepository4 from './components/MyRepository4'
import MyDepot from './components/MyDepot'

var _that
export default {
  name: 'FirstMoneySetting',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyRepository2, MyRepository4, MyDepot },
  filters: {
    isEffectiveFilter(status) {
      const statusMap = {
        1: '启用',
        2: '停用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      moveInRepository: '',
      depotcontrol: false,
      list4: [],
      repositorycontrol4: false,
      // 规格型号数据
      types: [],
      list3: [],
      repositorycontrol2: false,
      tableHeight: 200,

      // 批量删除参数
      moreaction: [],
      // 新增窗口
      categoryVisible: false,
      // 新增数据
      addCategoryForm: {
        createId: this.$store.getters.userId,
        countryId: 1,
        lowerMoney: '',
        typeId: ''
      },
      // 校验新增数据
      addCategoryFormRules: {
        lowerMoney: [
          { required: true, message: '请输入最低首付', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择车辆型号', trigger: 'change' }
        ]
      },
      // 修改窗口
      editcategoryVisible: false,
      // 修改数据
      editCategoryForm: {
        createPersonId: this.$store.getters.userId,
        countryId: 1
      },
      // 校验修改数据
      editCategoryFormRules: {
        lowerMoney: [
          { required: true, message: '请输入最低首付', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择车辆型号', trigger: 'change' }
        ]
      },
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
      // 分类列表查询加展示参数
      getemplist: {
        repositoryId: '',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  activated() {
    this.getlist()
    this.getTypes()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 清空搜索条件
    restFilter() {
      this.moveInRepository = ''
      this.getemplist.repositoryId = ''
    },
    // 调入仓库focus事件触发
    handlechooseDep() {
      this.depotcontrol = true
    },
    depotname(val) {
      this.moveInRepository = val.repositoryName
      this.getemplist.repositoryId = val.id
    },
    handlerepository4() {
      this.repositorycontrol4 = true
    },

    repositoryname4(val) {
      const nowlistdata = this.$refs.editable4.getRecords()
      console.log('nowlistdata', nowlistdata)
      const alldata = [...val, ...nowlistdata]
      const filterdata = this.uniqueArray(alldata, 'id')
      this.list4 = filterdata
      console.log('this.list4 ======> ', this.list4)
      this.editCategoryForm.repositoryIds = this.list4.map(item => {
        return item.id
      }).join(',')
      this.editCategoryForm.repositoryNames = this.list4.map(item => {
        return item.repositoryName
      }).join(',')
    },

    uniqueArray(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    repositoryname2(val) {
      const nowlistdata = this.$refs.editable2.getRecords()
      const alldata = [...val, ...nowlistdata]
      const filterdata = this.uniqueArray(alldata, 'id')
      this.list3 = filterdata
      console.log('this.list3 ======> ', this.list3)
      this.addCategoryForm.repositoryIds = this.list3.map(item => {
        return item.id
      }).join(',')
      this.addCategoryForm.repositoryNames = this.list3.map(item => {
        return item.repositoryName
      }).join(',')
    },
    getTypes() {
      // 规格型号数据
      searchEmpCategory2(2).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
    },
    handlerepository() {
      this.repositorycontrol2 = true
    },
    clickRow(val) {
      if (val.judgeStat === 0) {
        this.$refs.table.toggleRowSelection(val)
      }
    },
    checkPermission,
    getlist() {
      // 员工列表数据
      this.listLoading = true
      installmentFirstList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      installmentFirstList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        }
      })
    },
    // 多选数据
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 批量删除
    handleCommand(command) {
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          deleteInstallmentFirst(ids, this.$store.getters.userId).then(res => {
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
      this.$confirm('此操作将永久删除该记录, 是否继续?', this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      }).then(() => {
        deleteInstallmentFirst(row.id, this.$store.getters.userId).then(res => {
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

    // 修改数据
    handleEdit(row) {
      console.log(row)
      this.editcategoryVisible = true
      this.editCategoryForm = Object.assign({}, row)
      const repoNames = row.repositoryNames.split(',')
      const repoIds = row.repositoryIds.split(',')
      const settingArr = []
      for (const i in repoNames) {
        for (const j in repoIds) {
          if (i === j) {
            const obj = {}
            obj.repositoryName = repoNames[i]
            obj.id = Number(repoIds[j])
            settingArr.push(obj)
          }
        }
      }
      this.list4 = settingArr
      console.log('settingArr', settingArr)
    },
    // 取消修改
    handleNo() {
      this.editcategoryVisible = false
    },
    // 确认修改
    handleOk() {
      this.$refs.editCategoryForm.validate((valid) => {
        if (valid) {
          updateInstallmentFirst(this.editCategoryForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.getlist()

              this.$refs.editCategoryForm.clearValidate()
              this.$refs.editCategoryForm.resetFields()
              this.editcategoryVisible = false
            } else {
              console.log('列表出错')
            }
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
            offset: 100
          })
          return false
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.categoryVisible = true
    },
    // 取消操作
    handlecancel() {
      this.categoryVisible = false
    },
    restAddCategoryForm() {
      this.addCategoryForm = {
        categoryname: '',
        type: '',
        iseffective: ''
      }
    },
    // 保存操作
    handlesave() {
      console.log(this.addCategoryForm)
      this.$refs.addCategoryForm.validate((valid) => {
        if (valid) {
          addInstallmentFirst(this.addCategoryForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: '新建成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
              this.$refs.editable2.clear()
              this.$refs.addCategoryForm.clearValidate()
              this.$refs.addCategoryForm.resetFields()
              this.restAddCategoryForm()
              this.categoryVisible = false
            } else {
              this.$notify.error({
                title: 'wrong',
                message: 'wrong',
                offset: 100
              })
            }
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
            offset: 100
          })
          return false
        }
      })
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
            filename: '员工资料表'
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
</style>
