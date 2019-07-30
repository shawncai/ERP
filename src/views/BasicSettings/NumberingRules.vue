<template>
  <div class="ERP-container">
    <div class="filter-container">
      <!-- 搜索条件栏目 -->
      <el-input v-model="getemplist.ruleName" :placeholder="$t('BasicSettings.ruleName')" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="getemplist.type" :value="getemplist.type" placeholder="请选择单据类型" class="filter-item" style="width: 10%" filterable clearable>
        <el-option v-for="(item, index) in categorys" :key="index" :value="item.id" :label="item.categoryName"/>
      </el-select>
      <el-select v-model="getemplist.iseffective" placeholder="请选择状态" class="filter-item" clearable >
        <el-option value="1" label="active" />
        <el-option value="2" label="dead" />
      </el-select>
      <!-- 搜索按钮 -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px" @click="handleFilter">{{ $t('public.search') }}</el-button>
      <!-- 批量操作 -->
      <el-dropdown @command="handleCommand">
        <el-button v-waves class="filter-item" type="primary">
          {{ $t('public.batchoperation') }} <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" style="width: 140px">
          <el-dropdown-item v-permission="['1-39-41-2']" style="text-align: left" command="delete"><svg-icon icon-class="shanchu" style="width: 40px"/>{{ $t('public.delete') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 表格导出操作 -->
      <el-button v-permission="['1-39-41-6']" v-waves :loading="downloadLoading" class="filter-item" style="width: 86px" @click="handleExport"> <svg-icon icon-class="daochu"/>{{ $t('public.export') }}</el-button>
      <!-- 打印操作 -->
      <el-button v-permission="['1-39-41-7']" v-waves class="filter-item" icon="el-icon-printer" style="width: 86px" @click="handlePrint">{{ $t('public.print') }}</el-button>
      <!-- 新建操作 -->
      <el-button v-permission="['1-39-41-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;float: right" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <!--新建列表开始-->
      <el-dialog :visible.sync="addNumberingVisible" title="新建编号规则" width="500px">
        <el-form :model="Numberingform" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
          <el-form-item label-width="120px" label="单据类型">
            <el-select v-model="Numberingform.type" :value="Numberingform.type" placeholder="请选择单据类型" filterable clearable>
              <el-option v-for="(item, index) in categorys" :key="index" :value="item.id" :label="item.categoryName"/>
            </el-select>
          </el-form-item>
          <el-form-item label-width="120px" label="编号规则名称">
            <el-input v-model="Numberingform.ruleName" placeholder="请输入编号规则名称" autocomplete="off" style="width: 200px"/>
          </el-form-item>
          <el-form-item label-width="120px" label="编号前缀">
            <el-input v-model="Numberingform.prefix" placeholder="请输入编号前缀" autocomplete="off" style="width: 200px"/>
          </el-form-item>
          <el-form-item label-width="120px" label="日期类型">
            <el-radio-group v-model="Numberingform.dateType">
              <el-radio :label="1">年</el-radio>
              <el-radio :label="2">年月</el-radio>
              <el-radio :label="3">年月日</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-width="120px" label="流水号长度">
            <el-input v-model="Numberingform.length" placeholder="请输入流水号长度" autocomplete="off" style="width: 200px"/>
          </el-form-item>
          <el-form-item label-width="120px" label="启用状态">
            <el-select v-model="Numberingform.iseffective" placeholder="请选择启用状态">
              <el-option label="active" value="1"/>
              <el-option label="dead" value="2"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="addNumberingVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleOk">确 定</el-button>
        </div>
      </el-dialog>
      <!--新建结束-->
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
          fixed="left"
          align="center"/>
        <el-table-column :label="$t('BasicSettings.id')" :resizable="false" fixed="left" prop="id" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.ruleName')" :resizable="false" fixed="left" prop="ruleName" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.ruleName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.type')" :resizable="false" prop="type" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.type | TypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.prefix')" :resizable="false" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.prefix }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.dateType')" :resizable="false" prop="dateType" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.dateType | DateFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.length')" :resizable="false" prop="length" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.length }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.iseffective')" :resizable="false" prop="isEffective" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.isEffective | genderFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.createTime')" :resizable="false" prop="createTime" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
          <template slot-scope="scope">
            <el-button v-permission="['1-39-41-8']" v-show="scope.row.isEffective === 2" title="启用" style="margin-left: 18px;" type="primary" size="mini" icon="el-icon-check" circle @click="open(scope.row)"/>
            <el-button v-permission="['1-39-41-9']" v-show="scope.row.isEffective === 1" title="停用" type="primary" size="mini" icon="el-icon-close" circle @click="close(scope.row)"/>
            <el-button v-permission="['1-39-41-3']" type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
            <el-button v-permission="['1-39-41-2']" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表结束 -->
      <pagination v-show="total>0" :total="total" :page.sync="getemplist.pagenum" :limit.sync="getemplist.pagesize" @pagination="getlist" />
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editNumberingVisible" title="修改编号规则" width="500px">
        <el-form :model="editNumberingform" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
          <el-form-item label-width="120px" label="编号规则名称">
            <el-input v-model="editNumberingform.ruleName" placeholder="请输入编号规则名称" autocomplete="off" style="width: 200px"/>
          </el-form-item>
          <el-form-item label-width="120px" label="编号前缀">
            <el-input v-model="editNumberingform.prefix" placeholder="请输入编号前缀" autocomplete="off" style="width: 200px"/>
          </el-form-item>
          <el-form-item label-width="120px" label="日期类型">
            <el-radio-group v-model="editNumberingform.dateType">
              <el-radio :label="1">年</el-radio>
              <el-radio :label="2">年月</el-radio>
              <el-radio :label="3">年月日</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-width="120px" label="流水号长度">
            <el-input v-model="editNumberingform.length" placeholder="请输入流水号长度" autocomplete="off" style="width: 200px"/>
          </el-form-item>
          <el-form-item label-width="120px" label="启用状态">
            <el-select v-model="editNumberingform.isEffective" placeholder="请选择启用状态">
              <el-option label="active" value="1"/>
              <el-option label="dead" value="2"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="editNumberingVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditOk">修改</el-button>
        </div>
      </el-dialog>
      <!--修改结束=================================================-->
    </div>
  </div>
</template>

<script>
import { search, deleteRules, createRules, updateRules, searchcategory } from '@/api/BasicSettings'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'NumberingRules',
  directives: { waves, permission, permission2 },
  components: { Pagination },
  filters: {
    genderFilter(status) {
      const statusMap = {
        1: '已启用',
        2: '停用'
      }
      return statusMap[status]
    },
    DateFilter(status) {
      const statusMap = {
        1: '年',
        2: '年月',
        3: '年月日'
      }
      return statusMap[status]
    },
    TypeFilter(status) {
      const statusMap = {
        1: '劳动合同',
        2: '派车单',
        3: '回车等级单',
        4: '商品售价变更单',
        5: '采购申请单',
        6: '采购计划单',
        7: '采购询价单',
        8: '采购合同',
        9: '采购订货单',
        10: '质检申请单',
        11: '质检报告单',
        12: '不合格品处置单',
        13: '采购到货单',
        14: '采购退货单',
        26: '付款单',
        27: '采购发票单',
        28: '销售出库单',
        29: '销售单',
        30: '销售退货单',
        31: '销售计划单',
        32: '销售机会划单',
        33: '销售合同',
        34: '维修出库单',
        35: '售后维修单',
        36: '预售单',
        37: '预售退款单',
        38: '收入单',
        39: '支出单',
        40: '转账单',
        41: '二手回车单',
        42: '预收款单',
        43: '预收退款单',
        44: '智能补货单',
        45: '采购入库单',
        46: '生产完成入库单',
        47: '其他入库单',
        48: '其他出库单',
        49: '库存调拨单',
        50: '调拨申请单',
        51: '库存报损单',
        52: '库存盘点单',
        53: '库存报溢单',
        54: '调价单',
        55: '组装单',
        56: '拆装单',
        57: '日常调整单',
        58: '期初库存录入单',
        59: '期初库存批量导入单',
        60: '库位调整单',
        61: '收车单',
        62: '客户调查报告单',
        63: '收款单',
        64: '物料清单',
        65: '主生产计划单',
        66: '物料需求计划单',
        67: '生产任务单',
        68: '生产任务汇报单',
        69: '领料单',
        70: '退料单',
        71: '外包单'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 单据类型
      categorys: [],
      // 修改数据集合
      editNumberingform: '',
      // 新建数据集合
      Numberingform: {
        ruleName: '',
        type: '',
        iseffective: null,
        prefix: '',
        dateType: '',
        length: ''
      },
      // 修改窗口控制器
      editNumberingVisible: false,
      // 新建窗口控制器
      addNumberingVisible: false,
      // 控制组件数据
      editVisible: false,
      // 批量操作
      moreaction: '',
      // 加载操作控制
      downloadLoading: false,
      // 表格数据
      list: [],
      // 表格数据条数
      total: 0,
      personalForm2: {},
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true,
      // 编号列表查询加展示参数
      getemplist: {
        ruleName: '',
        type: '',
        iseffective: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    // 启用停用操作
    open(row) {
      console.log('row', row)
      this.personalForm2.id = row.id
      this.personalForm2.isEffective = 1
      updateRules(this.personalForm2).then(res => {
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
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    close(row) {
      console.log('row', row)
      this.personalForm2.id = row.id
      this.personalForm2.isEffective = 2
      updateRules(this.personalForm2).then(res => {
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
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    checkPermission,
    getlist() {
      // 单据编号列表数据
      this.listLoading = true
      search(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
          this.total = res.data.data.content.length
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      // 单据编号类型数据
      searchcategory().then(res => {
        if (res.data.ret === 200) {
          this.categorys = res.data.data.content
        }
      })
    },
    // 搜索
    handleFilter() {
      search(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
          this.total = res.data.data.content.length
        }
      })
    },
    // 修改操作
    handleEdit(row) {
      console.log(row)
      this.editNumberingform = row
      this.editNumberingform.isEffective = String(row.isEffective)
      this.editNumberingVisible = true
    },
    // 确认修改
    handleEditOk() {
      console.log(this.editNumberingform)
      updateRules(this.editNumberingform).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '修改成功',
            type: 'success',
            offset: 100
          })
          this.getlist()
          this.editNumberingVisible = false
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    // 多条删除
    // 批量删除
    handleCommand(command) {
      const ids = this.moreaction.map(item => item.id).join()
      if (command === 'delete') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRules(ids, this.$store.getters.userId).then(res => {
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
        deleteRules(row.id, this.$store.getters.userId).then(res => {
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
    // 清除数据
    restNumberingform() {
      this.Numberingform = {
        ruleName: '',
        type: '',
        iseffective: null,
        prefix: '',
        dateType: '',
        length: ''
      }
    },
    // 新增数据
    handleAdd() {
      this.addNumberingVisible = true
    },
    // 确认新增
    handleOk() {
      console.log(this.Numberingform)
      createRules(this.Numberingform).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '新增成功',
            type: 'success',
            offset: 100
          })
          this.getlist()
          this.restNumberingform()
          this.addNumberingVisible = false
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    },
    // 导出
    handleExport() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['序号', '编号规则名称', '单据类型', '编号前缀', '日期类型', '流水号长度', '状态', '创建日期']
          const filterVal = ['id', 'ruleName', 'type', 'prefix', 'dateType', 'length', 'isEffective', 'createTime']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '编号规则资料表'
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
