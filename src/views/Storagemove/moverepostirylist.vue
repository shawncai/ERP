<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="6">
            <el-form-item :label="$t('updates.ygmc')">
              <el-input v-model="emoloyeeName" style="width: 190px" clearable @keyup.enter.native="handleFilter" @focus="handlesearchName"/>
              <my-accept2 :accetpcontrol.sync="personcontrol" @acceptName="acceptName2"/>
            </el-form-item>
          </el-col>
          <!--更多搜索条件-->
          <el-col :span="3" style="margin-left: 20px">
            <!-- 搜索按钮 -->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['227-260-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['131-141-359-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <el-dialog :visible.sync="categoryVisible" title="新建仓库配置" class="normal" width="600px" center>
        <el-form ref="addCategoryForm" :rules="addCategoryFormRules" :model="addCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('Storagemove.moveperson')" label-width="100px" prop="personName">
            <el-input v-model="personName" autosize style="min-width:300px" clearable @focus="handleaccept"/>
            <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
          </el-form-item>
        </el-form>
        <div
          style="display: flex; align-items: center; justify-content: flex-start;padding-left: 35px;padding-bottom: 20px;">
          <!-- <el-button @click="insertEvent(-1)">{{ $t('updates.tj') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button> -->
        </div>

        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 90%;margin:0 auto"
          @selection-change="handleSelectionChange2">
          <!-- <el-editable-column type="selection" min-width="55" align="center" /> -->
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Storagemove.repostiryName')" prop="itemName" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input v-model="scope.row.itemName" :value="scope.row.itemName" placeholder="请选择仓库" filterable clearable style="width: 100%;" @focus="handlerepository"/>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname(scope, $event)"/>
            </template>
          </el-editable-column>
          <!-- <el-editable-column :label="$t('CheckSet.checkTools')" prop="checkTools" align="center" min-width="150"/> -->
          <!-- <el-editable-column :label="$t('CheckSet.checkContent')" :edit-render="{name: 'ElInput',type: 'visible', attrs: {type: 'textarea', autosize: {minRows: 1, maxRows: 4}}}" prop="checkContent" align="center" min-width="150"/> -->
        </el-editable>
        <span slot="footer" class="dialog-footer">
          <el-button v-no-more-click type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
          <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
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
        <el-table-column :label="$t('NewEmployeeInformation.id')" :resizable="false" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('Storagemove.repostiryId')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.productCode }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('Storagemove.repostiryName')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <el-popover v-if="scope.row.repositories.length !== 1" trigger="hover" placement="right">
              <p v-for="(item, index) in scope.row.repositories" :key="index">仓库名称: {{ item.repositoryName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">...</el-tag>
              </div>
            </el-popover>
            <span v-else>{{ scope.row.repositories[0].repositoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Storagemove.moveperson')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.employeeName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('CheckSet.checkTools')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.checkTools }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column :label="$t('CheckSet.checkContent')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.checkContent }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('CheckSet.createName')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <el-button v-permission2="['131-141-359-2', scope.row.createPersonId]" type="primary" size="mini" @click="handleEdit(scope.row)" >{{ $t('public.edit') }}</el-button>
            <el-button v-permission2="['131-141-359-3', scope.row.createPersonId]" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pageNum" :limit.sync="getemplist.pageSize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editcategoryVisible" title="修改人员仓库配置" class="normal" width="600px" center>
        <el-form ref="editCategoryForm" :rules="editCategoryFormRules" :model="editCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('Storagemove.repostiryName')" label-width="100px" prop="repostiryName">
            <el-input v-model="editCategoryForm.name" type="textarea" style="width:300px" @focus="handlerep"/>
          </el-form-item>
          <my-repository2 :repositorycontrol.sync="repositorycontrol2" @repositoryname="repositoryname2"/>
        </el-form>
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
import MyRepository from './components/MyRepository2'
import MyRepository2 from './components/MyRepository3'
import '@/directive/noMoreClick/index.js'
import { searchmoverepository, addmoverepository, editmoverepository, deletemoverepository } from '@/api/Storagemove'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyAccept from './components/MyAccept'
import MyAccept2 from './components/MyAccept2'

var _that
export default {
  name: 'Moverepostirylist',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyRepository, MyAccept, MyRepository2, MyAccept2 },
  filters: {
    typeFilter(status) {
      const statusMap = {
        1: '不合格处理方式',
        2: '不合格原因',
        3: '检验项目'
      }
      return statusMap[status]
    },
    iseffectiveFilter(status) {
      const statusMap = {
        1: '启用',
        2: '停用'
      }
      return statusMap[status]
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      // console.log(value)
      if (this.personName === undefined || this.personName === null || this.personName === '') {
        callback(new Error('请输入人名'))
      } else {
        callback()
      }
    }
    return {
      emoloyeeName: '',
      // 查询人员
      personcontrol: false,
      // 修改仓库
      repositorycontrol2: false,
      // 人员回显
      personName: '',
      // 人员开关
      accetpcontrol: false,
      // 仓库开关
      repositorycontrol: false,
      list2: [],
      // 控制物品信息
      matercontrol: false,
      itemIds: [],
      // 批量删除参数
      moreaction: [],
      // 新增窗口
      categoryVisible: false,
      // 新增数据
      addCategoryForm: {
        createId: this.$store.getters.userId
      },
      control: false,
      // 校验新增数据
      addCategoryFormRules: {
        personName: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        itemId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      // 修改窗口
      editcategoryVisible: false,
      // 修改数据
      editCategoryForm: {
        operatorId: this.$store.getters.userId
      },
      // 校验修改数据
      editCategoryFormRules: {
        categoryName: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        isEffective: [
          { required: true, message: '请选择', trigger: 'change' }
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
      // 加载表格(修改为true)
      listLoading: true,
      // 分类列表查询加展示参数
      getemplist: {
        pageNum: 1,
        pageSize: 10
      },
      product: [],
      validRules: {
        itemName: [
          { required: true, message: '请选择仓库', trigger: 'change' }
        ]
      }
    }
  },
  beforeCreate() {
    _that = this
  },
  mounted() {
    // this.getlist2()
    this.getlist()
  },
  methods: {
    acceptName2(val) {
      this.emoloyeeName = val.personName
      this.getemplist.emoloyeeId = val.id
    },
    handlesearchName() {
      this.personcontrol = true
    },
    handlerep() {
      this.repositorycontrol2 = true
    },
    repositoryname2(val) {
      console.log(val)
      const name = []
      const id = []
      for (const i in val) {
        name.push(val[i].repositoryName)
        id.push(val[i].id)
      }
      console.log(name, id)
      this.editCategoryForm.name = name.join(',')
      this.editCategoryForm.repositoryIds = id.join(',')
      console.log(this.addCategoryForm)
    },
    handleaccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      console.log('val', val)
      this.personName = val.personName
      this.addCategoryForm.employeeId = val.id
    },
    handlerepository() {
      console.log('仓库开启')
      this.repositorycontrol = true
      console.log(this.repositorycontrol)
    },
    repositoryname(scope, val) {
      console.log(val)
      const name = []
      const id = []
      for (const i in val) {
        name.push(val[i].repositoryName)
        id.push(val[i].id)
      }
      console.log(name, id)
      scope.row.itemName = name.join(',')
      this.addCategoryForm.repositoryIds = id.join(',')
      console.log(this.addCategoryForm)
    },
    productdetail(val) {
      console.log('val', val)
      this.product = val
      console.log('this.product', this.product)
      let name = ''
      for (let i = 0; i < this.product.length; i++) {
        name = name + this.product[i].productName + ','
      }
      console.log('name', name)
      name = name.substring(0, name.length - 1)
      this.addCategoryForm.productName = name
      console.log('name', name)
    },
    getlist() {
      this.listLoading = true
      searchmoverepository(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          console.log('列表出错')
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    checkPermission,
    getlist2() {
      this.listLoading = true
    //   searchCheckCategory(this.getemplist2).then(res => {
    //     if (res.data.ret === 200) {
    //       this.itemIds = res.data.data.content.list
    //     } else {
    //       console.log('列表出错')
    //     }
    //     setTimeout(() => {
    //       this.listLoading = false
    //     }, 0.5 * 100)
    //   })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pageNum = 1
      searchmoverepository(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          console.log('搜索出错')
        }
      })
    },
    // 编辑表格批量操作
    handleSelectionChange2(val) {
      console.log('val', val)
    },

    // 新增表格
    insertEvent(index) {
      this.$refs.editable.insertAt(-1)
    },

    updatebatch2(event, scope) {
      // if (event === true) {
      //   const parms3 = scope.row.productCode
      //   batchlist(this.personalForm.saleRepositoryId, parms3).then(res => {
      //     console.log(res)
      //     this.batchlist = res.data.data.content
      //   })
      // }
    },
    // 多选数据
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 批量删除
    handleCommand(command) {
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletemoverepository(ids).then(res => {
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
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletemoverepository(row.id).then(res => {
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
    // 修改数据
    handleEdit(row) {
      console.log(row)
      console.log('修改', row)
      this.editcategoryVisible = true
      const name = []
      for (const i in row.repositories) {
        name.push(row.repositories[i].repositoryName)
      }
      this.editCategoryForm = Object.assign({}, row)
      this.editCategoryForm.name = name.join(',')
    },
    // 取消修改
    handleNo() {
      this.editcategoryVisible = false
    },
    // 确认修改
    handleOk() {
      this.$refs.editCategoryForm.validate((valid) => {
        if (valid) {
          editmoverepository(this.editCategoryForm).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: '成功',
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
            title: '错误',
            message: '信息未填完整',
            offset: 100
          })
          return false
        }
      })
    },
    // 新增数据
    handleAdd() {
      this.categoryVisible = true
      setTimeout(() => {
        if (this.list2.length === 0) {
          this.$refs.editable.insertAt(-1)
        }
      }, 0)
    },
    // 取消操作
    handlecancel() {
      this.categoryVisible = false
    },
    restAddCategoryForm() {
      this.addCategoryForm = {
        createId: this.$store.getters.userId,
        repositoryIds: '',
        employeeId: ''
      }
      this.personName = ''
      this.list2.itemName = ''
    },
    // 保存操作
    handlesave() {
      console.log(this.addCategoryForm)
      this.$refs.addCategoryForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate((valid) => {
            if (valid) {
              addmoverepository(this.addCategoryForm).then(res => {
                if (res.data.ret === 200) {
                  this.$notify({
                    title: '成功',
                    message: '新建成功',
                    type: 'success',
                    offset: 100
                  })
                  this.getlist()
                  this.$refs.addCategoryForm.clearValidate()
                  this.$refs.addCategoryForm.resetFields()
                  this.$refs.editable.revert()
                  this.restAddCategoryForm()
                  this.categoryVisible = false
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
