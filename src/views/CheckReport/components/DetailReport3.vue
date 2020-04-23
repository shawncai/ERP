<template>
  <el-dialog :visible.sync="editVisible" :reportcontrol3="reportcontrol3" :reportdata3="reportdata3" :close-on-press-escape="false" top="10px" title="生产任务单明细" append-to-body @close="$emit('update:reportcontrol3', false)">
    <!-- 列表开始 -->
    <el-table
      ref="table"
      :key="tableKey"
      :data.sync="list"
      :height="tableHeight"
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
      <el-table-column :resizable="false" :label="$t('updates.scsl')" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.produceQuantity }}</span>
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
    reportcontrol3: {
      type: Boolean,
      default: false
    },
    reportdata3: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      tableHeight: 200,
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.reportcontrol3,
      // 控制检验人员
      staffcontrol: false,
      // 检验人员回显
      checkPersonname: '',
      // 表格数据
      list: this.reportdata3,
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0
    }
  },
  watch: {
    reportcontrol3() {
      this.editVisible = this.reportcontrol3
      if (this.reportcontrol3) {
        setTimeout(() => {
          this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 180
        }, 100)
      }
    },
    reportdata3() {
      this.list = this.reportdata3
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
      this.$emit('report3', this.choosedata)
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
