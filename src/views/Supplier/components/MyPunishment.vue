<template>
  <el-dialog :visible.sync="editVisible" :punishcontrol="punishcontrol" :punishdata="punishdata" :close-on-press-escape="false" class="normal" width="600px" center title="供应商惩罚" append-to-body @close="$emit('update:punishcontrol', false)">
    <!-- 列表开始 -->
    <div class="container" style="margin-top: 37px">
      <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="惩罚内容" style="width: 100%;">
              <el-input v-model="personalForm.comment" placeholder="惩罚内容" style="margin-left: 18px;width:200px" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 列表结束 -->
    <span slot="footer" class="dialog-footer">
      <el-button type="success" style="text-align: center;" @click="handleAddTo">确认添加</el-button>
      <el-button type="danger" style="text-align: center;" @click="handlechancel">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createPunishment } from '@/api/Supplier'
export default {
  props: {
    punishcontrol: {
      type: Boolean,
      default: false
    },
    punishdata: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      // 弹窗组件的控制
      editVisible: this.punishcontrol,
      // 控制检验人员
      staffcontrol: false,
      // 惩罚内容
      personalForm: {
        // 供应商ids
        supplierIds: this.punishdata
      }
    }
  },
  watch: {
    punishcontrol() {
      this.editVisible = this.punishcontrol
    },
    punishdata() {
      this.personalForm.supplierIds = this.punishdata
      console.log(this.supplierIds)
    }
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val)
      this.choosedata = val
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {}
    },
    // 物品选择添加
    handleAddTo() {
      console.log(this.personalForm)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      createPunishment(parms).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            offset: 100
          })
          this.restAllForm()
          this.editVisible = false
        }
      })
    },
    handlechancel() {
      this.editVisible = false
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
  }
</style>
