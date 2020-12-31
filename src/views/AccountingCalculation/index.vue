<template>
  <div class="content">
    <el-button type="primary" @click="startpunch(1)">采购核算</el-button>
    <el-button type="primary" @click="startpunch(2)">生产核算</el-button>
    <el-button type="primary" @click="startpunch(3)">外包核算</el-button>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="600px"
      class="normal"
      title="选择日期段"
      center>
      <div class="timepicker">
        <el-date-picker
          v-model="value6"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { purchaseAccounting, outSourceAccounting } from '@/api/AccountingCalculation'
export default {
  name: 'AccountingCalculation',
  data() {
    return {
      centerDialogVisible: false,
      value6: [],
      visibleType: null,
      fullscreenLoading: false
    }
  },
  methods: {
    startpunch(val) {
      switch (val) {
        case 1:
          this.centerDialogVisible = true
          this.visibleType = val
          break
        case 2:
          this.centerDialogVisible = true
          this.visibleType = val
          break
        case 3:
          this.centerDialogVisible = true
          this.visibleType = val
          break
      }
    },
    confirmBtn() {
      console.log(this.value6)
      if (this.value6.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '请选择时间段'
        })
        return false
      }
      this.fullscreenLoading = true

      switch (this.visibleType) {
        case 1:
          purchaseAccounting(this.value6[0], this.value6[1]).then(res => {
            if (res.data.ret === 200) {
              this.$message({
                message: '核算成功',
                type: 'success'
              })
            } else {
              this.$message.error(res.msg)
            }
            this.fullscreenLoading = false
            this.centerDialogVisible = false
          })
          break
        case 2:
          break
        case 3:
          outSourceAccounting(this.value6[0], this.value6[1]).then(res => {
            if (res.data.ret === 200) {
              this.$message({
                message: '核算成功',
                type: 'success'
              })
            } else {
              this.$message.error(res.msg)
            }
            this.fullscreenLoading = false
            this.centerDialogVisible = false
          })
      }
    }
  }
}
</script>

<style scoped>
.content{
    height:100vh;
    width: 100%;
    background: #fff;
    display:flex;
    align-items: center;
   justify-content: center;
}

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
    height: 200px;
  }
  .timepicker {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
  }
</style>
