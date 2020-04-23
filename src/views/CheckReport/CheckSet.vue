<template>
  <div class="ERP-container">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" style="margin-top: 5px" shadow="never">
      <el-input v-model="getemplist.productCode" :placeholder="$t('updates.wpbm')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input v-model="getemplist.productName" :placeholder="$t('Hmodule.wpmc')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.itemId" :placeholder="$t('updates.jyxm')" clearable size="small" class="filter-item" @keyup.enter.native="handleFilter">
        <el-option
          v-for="(item, index) in itemIds"
          :key="index"
          :label="item.categoryName"
          :value="item.id"
        />
        <el-input v-model="getemplist.typeid" :placeholder="$t('updates.clxh')" size="small" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
        <el-button v-waves size="small" class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" round @click="handleFilter">{{ $t('public.search') }}</el-button>

    </el-select></el-card>
    <el-card :body-style=" { padding: '6px'}" class="box-card" shadow="never">
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" size="small" style="margin-left: 0" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['227-260-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-waves :loading="downloadLoading" class="filter-item2" size="small" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-waves class="filter-item2" size="small" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['227-260-1']" v-waves class="filter-item2" size="small" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <el-dialog :visible.sync="categoryVisible" title="新建质检明细" class="normal" width="600px" center>
        <el-form ref="addCategoryForm" :rules="addCategoryFormRules" :model="addCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('CheckSet.productName')" label-width="100px" prop="productName">
            <el-input v-model="addCategoryForm.productName" type="textarea" autosize style="min-width:300px" @focus="handlemater"/>
            <my-detail :control.sync="control" @product="productdetail"/>
            <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>
          </el-form-item>
          <!-- <el-form-item :label="$t('CheckSet.itemId')" label-width="100px" prop="itemId">
            <el-select v-model="addCategoryForm.itemId" placeholder="请选择检验项目" style="width: 100%">
              <el-option
                v-for="(item, index) in itemIds"
                :key="index"
                :label="item.categoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('CheckSet.checkTools')" label-width="100px" >
            <el-input v-model="addCategoryForm.checkTools" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label="$t('CheckSet.checkContent')" label-width="100px" >
            <el-input v-model="addCategoryForm.checkContent" :autosize="{minRows:1}" type="textarea" autocomplete="off"/>
          </el-form-item> -->
        </el-form>
        <div
          style="display: flex; align-items: center; justify-content: flex-start;padding-left: 35px;padding-bottom: 20px;">
          <el-button @click="insertEvent(-1)">{{ $t('updates.tj') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>

        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="small"
          style="width: 90%;margin:0 auto"
          @selection-change="handleSelectionChange2">
          <el-editable-column type="selection" min-width="55" align="center" />
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('CheckSet.itemId')" prop="itemId" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-select v-model="scope.row.itemId" :value="scope.row.itemId" placeholder="请选择检验项目" filterable clearable style="width: 100%;">
                <el-option
                  v-for="(item, index) in itemIds"
                  :key="index"
                  :value="item.id"
                  :label="item.categoryName"/>
              </el-select>
              <span>{{ scope.row.itemIds }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('CheckSet.checkTools')" :edit-render="{name: 'ElInput', type: 'visible'}" prop="checkTools" align="center" min-width="150"/>
          <el-editable-column :label="$t('CheckSet.checkContent')" :edit-render="{name: 'ElInput',type: 'visible', attrs: {type: 'textarea', autosize: {minRows: 1, maxRows: 4}}}" prop="checkContent" align="center" min-width="150"/>
        </el-editable>
        <span slot="footer" class="dialog-footer">
          <el-button v-no-more-click type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
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
        <el-table-column :label="$t('NewEmployeeInformation.id')" :resizable="false" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckSet.productCode')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.productCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckSet.productName')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckSet.itemId')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.itemName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckSet.checkTools')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.checkTools }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckSet.checkContent')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.checkContent }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CheckSet.createName')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <el-button v-permission2="['227-260-3', scope.row.createPersonId]" type="primary" size="mini" @click="handleEdit(scope.row)" >{{ $t('public.edit') }}</el-button>
            <el-button v-permission2="['227-260-2', scope.row.createPersonId]" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editcategoryVisible" :title="$t('updates.xgzjmx')" class="normal" width="600px" center>
        <el-form ref="editCategoryForm" :rules="editCategoryFormRules" :model="editCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('CheckSet.productName')" label-width="100px" prop="productName">
            <el-input v-model="editCategoryForm.productName" disabled style="width:300px" @focus="handlemater"/>
            <!--            <my-mater :matercontrol.sync="matercontrol" @mater="mater"/>-->
          </el-form-item>
          <el-form-item :label="$t('CheckSet.itemId')" label-width="100px" prop="itemId">
            <el-select v-model="editCategoryForm.itemId" placeholder="请选择检验项目" style="width: 100%">
              <el-option
                v-for="(item, index) in itemIds"
                :key="index"
                :label="item.categoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('CheckSet.checkTools')" label-width="100px" >
            <el-input v-model="editCategoryForm.checkTools" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label="$t('CheckSet.checkContent')" label-width="100px" >
            <el-input v-model="editCategoryForm.checkContent" :autosize="{minRows:1}" type="textarea" resize="none" autocomplete="off"/>
          </el-form-item>
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
import MyDetail from './components/MyDetail'
import '@/directive/noMoreClick/index.js'
import { searchCheckCategory } from '@/api/CheckCategory'
import { searchCheckSet, delateCheckSet, updateCheckSet, addCheckSetMany } from '@/api/CheckSet'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import MyMater from './components/MyMater'

var _that
export default {
  name: 'CheckSet',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyMater, MyDetail },
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
      if (this.addCategoryForm.productName === undefined || this.addCategoryForm.productName === null || this.addCategoryForm.productName === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    return {
      tableHeight: 200,

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
        createId: this.$store.getters.userId,
        categoryname: '',
        type: '',
        iseffective: '1'
      },
      control: false,
      // 校验新增数据
      addCategoryFormRules: {
        category: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        itemId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        productName: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        iseffective: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      // 修改窗口
      editcategoryVisible: false,
      // 修改数据
      editCategoryForm: {
        categoryName: '',
        type: '',
        isEffective: ''
      },
      // 校验修改数据
      editCategoryFormRules: {
        categoryName: [
          { required: true, message: '请输入', trigger: 'blur' }
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
      // 加载表格
      listLoading: true,
      // 分类列表查询加展示参数
      getemplist: {
        pagenum: 1,
        pagesize: 10
      },
      getemplist2: {
        type: '3',
        pagenum: 1,
        pagesize: 9999
      },
      product: [],
      validRules: {
        itemId: [
          { required: true, message: '请选择检验项目', trigger: 'change' }
        ]
      }
    }
  },
  activated() {
    this.getlist2()
    this.getlist()
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    this.getlist2()
    this.getlist()
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
      searchCheckSet(this.getemplist).then(res => {
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
    mater(val) {
      this.addCategoryForm.productCode = val.code
      this.addCategoryForm.productName = val.productName
    },
    handlemater() {
      this.control = true
    },
    checkPermission,
    getlist2() {
      this.listLoading = true
      searchCheckCategory(this.getemplist2).then(res => {
        if (res.data.ret === 200) {
          this.itemIds = res.data.data.content.list
        } else {
          console.log('列表出错')
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      searchCheckSet(this.getemplist).then(res => {
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
        this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
          confirmButtonText: this.$t('prompt.qd'),
          cancelButtonText: this.$t('prompt.qx'),
          type: 'warning'
        }).then(() => {
          delateCheckSet(ids, this.$store.getters.userId).then(res => {
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
        delateCheckSet(row.id, this.$store.getters.userId).then(res => {
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
      this.editCategoryForm.type = String(row.type)
      this.editCategoryForm.isEffective = String(row.isEffective)
    },
    // 取消修改
    handleNo() {
      this.editcategoryVisible = false
    },
    // 确认修改
    handleOk() {
      this.$refs.editCategoryForm.validate((valid) => {
        if (valid) {
          updateCheckSet(this.editCategoryForm).then(res => {
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
        createId: this.$store.getters.userId,
        categoryname: '',
        type: '',
        iseffective: '1'
      }
    },
    // 保存操作
    handlesave() {
      console.log(this.addCategoryForm)
      const products = this.product
      const tabledata = this.$refs.editable.getRecords()
      console.log(tabledata)
      const jsonarr = []
      for (const i in products) {
        for (const j in tabledata) {
          const jsondata = {}
          jsondata.productCode = products[i].productCode
          jsondata.productName = products[i].productName
          jsondata.itemId = tabledata[j].itemId
          jsondata.checkContent = tabledata[j].checkContent
          jsondata.checkTools = tabledata[j].checkTools
          jsonarr.push(jsondata)
        }
      }
      console.log(jsonarr)
      const parms = JSON.stringify(jsonarr)
      this.$refs.addCategoryForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate((valid) => {
            if (valid) {
              addCheckSetMany(parms).then(res => {
                if (res.data.ret === 200) {
                  this.$notify({
                    title: 'successful',
                    message: '新建成功',
                    type: 'success',
                    offset: 100
                  })
                  this.getlist()
                  this.$refs.addCategoryForm.clearValidate()
                  this.$refs.addCategoryForm.resetFields()
                  this.$refs.editable.clear()
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
