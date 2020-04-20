<template>
  <el-dialog :visible.sync="editVisible" :reportcontrol="reportcontrol" :reportdata="reportdata" :close-on-press-escape="false" top="10px" title="质检申请单明细" append-to-body @close="$emit('update:reportcontrol', false)">
    <!-- 列表开始 -->
    <el-table
      :key="tableKey"
      :data.sync="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 50px"
      @current-change="handleCurrentChange">
      <el-table-column :resizable="false" :label="$t('Hmodule.wpbh')" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.productCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :resizable="false" :label="$t('Hmodule.wpmc')" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column :resizable="false" :label="$t('Hmodule.dw')" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column :resizable="false" :label="$t('updates.ys')" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.color }}</span>
        </template>
      </el-table-column>
      <el-table-column :resizable="false" :label="$t('updates.jbel')" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.basicQuantity }}</span>
        </template>
      </el-table-column>
      <el-table-column :resizable="false" :label="$t('updates.bjsl')" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.checkQuantity }}</span>
        </template>
      </el-table-column>
      <el-table-column :resizable="false" label="已捡数量" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.checkedQuantity }}</span>
        </template>
      </el-table-column>
      <el-table-column :resizable="false" label="已报捡数量" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.checkedQuantity }}</span>
        </template>
      </el-table-column>
      <el-table-column :resizable="false" :label="$t('updates.dhsl')" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.arrivalQuantity }}</span>
        </template>
      </el-table-column>
      <el-table-column :resizable="false" :label="$t('updates.ydbh')" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.sourceNumber }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表结束 -->
    <span slot="footer" class="dialog-footer">
      <el-button type="success" style="text-align: center;" @click="handleAddTo">{{ $t('Hmodule.sure') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
var _that
export default {
  props: {
    reportcontrol: {
      type: Boolean,
      default: false
    },
    reportdata: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.reportcontrol,
      // 控制检验人员
      staffcontrol: false,
      // 检验人员回显
      checkPersonname: '',
      // 表格数据
      list: this.reportdata,
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0
    }
  },
  watch: {
    reportcontrol() {
      this.editVisible = this.reportcontrol
    },
    reportdata() {
      console.log(this.reportdata)
      this.list = this.reportdata
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val)
      this.choosedata = val
    },
    // 物品选择添加
    handleAddTo() {
      this.editVisible = false
      console.log(this.choosedata)
      this.$emit('report', this.choosedata)
    }
  }
}
</script>

<style scoped>
  .ERP-container {
    margin: 50px 30px;
  }
  .filter-item{
    width: 150px;
    margin-left: 20px;
  }
  .form-name{
    font-size: 18px;
    color: #373e4f;
    margin-bottom: -20px;
    margin-top: 30px;
  }
  .container{
    margin-top: 2%;
    border: 1px solid #eceff6;
  }
</style>
