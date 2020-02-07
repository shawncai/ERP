<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px;height: 60px" shadow="never">
      <el-row>
        <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: -9px">
          <el-col :span="5">
            <el-form-item :label="$t('updates.jldwzbh')" label-width="100px">
              <el-input v-model="getemplist.number" clearable @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="$t('updates.jlzmc')" label-width="100px">
              <el-input v-model="getemplist.groupName" clearable @keyup.enter.native="handleFilter"/>
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
          <el-dropdown-item style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-39-48-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-39-48-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-39-48-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <el-dialog :visible.sync="categoryVisible" title="新建计量单位组" class="normal" width="600px" center>
        <el-form ref="addCategoryForm" :rules="addCategoryFormRules" :model="addCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <!-- <el-form-item :label="$t('UnitGroup.number')" label-width="140px" prop="number">
            <el-input v-model="addCategoryForm.number" autocomplete="off"/>
          </el-form-item> -->
          <el-form-item :label="$t('UnitGroup.groupName')" label-width="140px" prop="groupName">
            <el-input v-model="addCategoryForm.groupName" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label="$t('UnitGroup.basicUnitId')" label-width="140px" prop="basicUnitId">
            <el-select v-model="addCategoryForm.basicUnitId" clearable style="width: 260px">
              <el-option
                v-for="(item, index) in basicUnitIds"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
            </el-select>
          </el-form-item>
          <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
            <el-button @click="handleAdd2">{{ $t('updates.tj') }}</el-button>
            <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          </div>
          <div class="container">
            <el-editable
              ref="editable"
              :data.sync="list2"
              :edit-config="{ showIcon: true, showStatus: true}"
              :edit-rules="addCategoryFormRules"
              class="click-table1"
              stripe
              border
              size="medium"
              style="width: 100%">
              <el-editable-column type="selection" min-width="55" align="center"/>
              <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
              <el-editable-column :edit-render="{name: 'ElSelect', options: basicUnitIds2, type: 'visible'}" :label="$t('updates.jldwmc')" prop="unitId" align="center" min-width="150px"/>
              <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,precision: 0,controls:false}, type: 'visible'}" :label="$t('updates.hsbl')" prop="proportion" align="center" min-width="150px"/>
              <!--              <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="proportion" align="center" :label="$t('updates.hsbl')" min-width="150px"/>-->
            </el-editable>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
          <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
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
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('UnitGroup.number')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('UnitGroup.groupName')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.groupName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('UnitGroup.basicUnitId')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.basicUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('UnitGroup.createPersonName')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createPersonName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('UnitGroup.createDate')" :resizable="false" fixed="left" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['1-39-48-3']" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)" />
            <el-button v-permission="['1-39-48-2']" :title="$t('updates.sc')" size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editcategoryVisible" :title="$t('updates.xgjldwz')" class="normal" width="600px" center>
        <el-form ref="editCategoryForm" :rules="editCategoryFormRules" :model="editCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('UnitGroup.number')" label-width="140px" prop="number">
            <el-input v-model="editCategoryForm.number" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label="$t('UnitGroup.groupName')" label-width="140px" prop="groupName">
            <el-input v-model="editCategoryForm.groupName" autocomplete="off"/>
          </el-form-item>
          <el-form-item :label="$t('UnitGroup.basicUnitId')" label-width="140px" prop="basicUnitId">
            <el-select v-model="editCategoryForm.basicUnitId" clearable style="width: 260px">
              <el-option
                v-for="(item, index) in basicUnitIds"
                :key="index"
                :value="item.id"
                :label="item.categoryName"/>
            </el-select>
          </el-form-item>
          <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
            <el-button @click="handleAdd3">{{ $t('updates.tj') }}</el-button>
            <el-button type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          </div>
          <el-editable
            ref="editable2"
            :data.sync="list4"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="addCategoryFormRules"
            class="click-table1"
            stripe
            borderinsert
            size="medium"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :edit-render="{name: 'ElSelect', options: basicUnitIds2, type: 'visible'}" :label="$t('updates.jldwmc')" prop="unitId" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0,precision: 0,controls:false}, type: 'visible'}" :label="$t('updates.hsbl')" prop="proportion" align="center" min-width="150px"/>
          </el-editable>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleOk()">{{ $t('public.edit') }}</el-button>
          <el-button type="danger" @click="handleNo()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="detailvisible" :title="$t('updates.ckjldwz')" class="normal" width="600px" center>
        <el-form ref="addCategoryForm" :rules="addCategoryFormRules" :model="addCategoryForm" class="demo-ruleForm" style="margin: 0 auto; width: 400px">
          <el-form-item :label="$t('UnitGroup.number')" label-width="140px" prop="number">
            <span style="margin-left: 80px">{{ personalForm.number }}</span>
            <!--            <el-input v-model="addCategoryForm.number" autocomplete="off"/>-->
          </el-form-item>
          <el-form-item :label="$t('UnitGroup.groupName')" label-width="140px" prop="groupName">
            <span style="margin-left: 80px">{{ personalForm.groupName }}</span>
          </el-form-item>
          <el-form-item :label="$t('UnitGroup.basicUnitId')" label-width="140px" prop="basicUnitId">
            <span style="margin-left: 80px">{{ personalForm.basicUnit }}</span>
          </el-form-item>
          <div class="container">
            <el-editable
              ref="editable"
              :data.sync="list3"
              :edit-config="{ showIcon: true, showStatus: true}"
              :edit-rules="addCategoryFormRules"
              class="click-table1"
              stripe
              border
              size="medium"
              style="width: 100%">
              <el-editable-column type="selection" min-width="55" align="center"/>
              <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
              <el-editable-column :label="$t('updates.jldwmc')" prop="unit" align="center" min-width="150px"/>
              <el-editable-column :label="$t('updates.hsbl')" prop="proportion" align="center" min-width="150px"/>
            </el-editable>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
          <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { creatUnitGroup, searchUnitGroup, updateUnitGroup, deleteUnitGroup } from '@/api/UnitGroup'
import { searchMea } from '@/api/BasicSettings'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

var _that
export default {
  name: 'UnitGroup',
  directives: { waves },
  components: { Pagination },
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
      personalForm: {},
      // 批量删除参数
      moreaction: [],
      // 新增窗口
      categoryVisible: false,
      // 新增数据
      addCategoryForm: {
        createPersonId: this.$store.getters.userId,
        countryId: 1
      },
      // 校验新增数据
      addCategoryFormRules: {
        number: [
          { required: true, message: '请输入计量单位组编号', trigger: 'blur' }
        ],
        groupName: [
          { required: true, message: '请输入计量单位组名称', trigger: 'blur' }
        ],
        basicUnitId: [
          { required: true, message: '请选择基本计量单位', trigger: 'change' }
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
        installmentCount: [
          { required: true, message: '请输入分期期数', trigger: 'blur' }
        ],
        rate: [
          { required: true, message: '请输入客户利率', trigger: 'blur' }
        ],
        isEffective: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      // 加载操作控制
      downloadLoading: false,
      // 表格数据
      list: [],
      basicUnitIds: [],
      basicUnitIds2: [],
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      list3: [],
      list2: [],
      list4: [],
      // 加载表格
      listLoading: true,
      // 分类列表查询加展示参数
      getemplist: {
        categoryname: '',
        type: '',
        iseffective: '',
        pagenum: 1,
        pagesize: 10
      },
      getemplist2: {
        pagenum: 1,
        pagesize: 999
      },
      detailvisible: false
    }
  },

  mounted() {
    this.getlist()
    this.getMea()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 修改数据
    handleEdit(row) {
      console.log(row)
      this.editcategoryVisible = true
      this.editCategoryForm = Object.assign({}, row)
      this.list4 = this.editCategoryForm.unitGroupDetailVos
      // for (let j = 0; j < this.list4.length; j++) {
      //   this.list4[j].proportion = this.list4[j].proportion * 100
      // }
    },
    // 详情操作
    handleDetail(row) {
      console.log(row)
      this.detailvisible = true
      this.personalForm = Object.assign({}, row)
      this.list3 = this.personalForm.unitGroupDetailVos
    },
    getMea() {
      console.log(this.getemplist2)
      console.log(123)
      searchMea(this.getemplist2).then(res => {
        if (res.data.ret === 200) {
          console.log(res)
          this.basicUnitIds = res.data.data.content
          this.basicUnitIds2 = res.data.data.content.map(function(item) {
            return {
              'value': item.id,
              'label': item.categoryName
            }
          })
        } else {
          console.log('列表出错')
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    getlist() {
      // 员工列表数据
      this.listLoading = true
      searchUnitGroup(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          console.log('res', res)
          this.list = res.data.data.content.list
          console.log('list', this.list)
          this.total = res.data.data.content.totalCount
        } else {
          console.log('列表出错')
        }
        for (let i = 0; i < this.list.length; i++) {
          for (let j = 0; j < this.list[i].unitGroupDetailVos.length; j++) {
            this.list[i].unitGroupDetailVos[j].proportion = (this.list[i].unitGroupDetailVos[j].proportion * 100).toFixed(0)
          }
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
    },
    handleAdd2() {
      this.$refs.editable.insert()
    },
    handleAdd3() {
      this.$refs.editable2.insert()
    },
    // 搜索
    handleFilter() {
      this.getemplist.pagenum = 1
      searchUnitGroup(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
        } else {
          console.log('搜索出错')
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
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUnitGroup(ids, this.$store.getters.userId).then(res => {
            if (res.data.ret === 200 || res.data.ret === 100) {
              this.$notify({
                title: '删除成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
            } else {
              this.$notify.error({
                title: 'wrong',
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
        deleteUnitGroup(row.id, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: '删除成功',
              type: 'success',
              offset: 100
            })
            this.getlist()
          } else {
            this.$notify.error({
              title: 'wrong',
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
    // 取消修改
    handleNo() {
      this.editcategoryVisible = false
    },
    // 确认修改
    handleOk() {
      this.$refs.editCategoryForm.validate((valid) => {
        if (valid) {
          const nowlistdata = this.$refs.editable2.getRecords()
          console.log('nowlistdata', nowlistdata)
          if (nowlistdata.length < 1) {
            this.$notify.error({
              title: 'wrong',
              message: '请添加明细',
              offset: 100
            })
            return false
          }
          for (let j = 0; j < nowlistdata.length; j++) {
            if (nowlistdata[j].unitId === null || nowlistdata[j].unitId === '' || nowlistdata[j].unitId === undefined || nowlistdata[j].proportion === null || nowlistdata[j].proportion === '' || nowlistdata[j].proportion === undefined) {
              this.$notify.error({
                title: 'wrong',
                message: '请输入完整',
                offset: 100
              })
              return false
            }
          }
          const parms = JSON.stringify(this.editCategoryForm)
          for (let j = 0; j < nowlistdata.length; j++) {
            nowlistdata[j].proportion = (nowlistdata[j].proportion / 100).toFixed(2)
          }
          const parms2 = JSON.stringify(nowlistdata)
          updateUnitGroup(parms, parms2).then(res => {
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
      const nowlistdata = this.$refs.editable.getRecords()
      console.log('nowlistdata', nowlistdata)
      if (nowlistdata.length < 1) {
        this.$notify.error({
          title: 'wrong',
          message: '请添加明细',
          offset: 100
        })
        return false
      }
      for (let j = 0; j < nowlistdata.length; j++) {
        if (nowlistdata[j].unitId === null || nowlistdata[j].unitId === '' || nowlistdata[j].unitId === undefined || nowlistdata[j].proportion === null || nowlistdata[j].proportion === '' || nowlistdata[j].proportion === undefined) {
          this.$notify.error({
            title: 'wrong',
            message: '请输入完整',
            offset: 100
          })
          return false
        }
      }
      console.log(this.addCategoryForm)
      this.$refs.addCategoryForm.validate((valid) => {
        if (valid) {
          for (let j = 0; j < nowlistdata.length; j++) {
            nowlistdata[j].proportion = (nowlistdata[j].proportion / 100).toFixed(2)
          }
          const parms2 = JSON.stringify(nowlistdata)
          const parms = JSON.stringify(this.addCategoryForm)
          creatUnitGroup(parms, parms2).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: 'successful',
                message: '新建成功',
                type: 'success',
                offset: 100
              })
              this.getlist()
              this.$refs.editable.clear()
              this.$refs.addCategoryForm.clearValidate()
              this.$refs.addCategoryForm.resetFields()
              this.restAddCategoryForm()
              this.categoryVisible = false
            } else {
              this.$notify.error({
                title: 'wrong',
                message: '出错了',
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
