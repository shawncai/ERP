<template>
  <el-dialog :visible.sync="confirmVisible" :close-on-press-escape="false" append-to-body top="-10px" @close="$emit('update:confirmControl', false)">
    <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
      <div ref="fuzhu" class="form-name" >{{ $t('update4.querenmingxi') }}</div>
      <div class="container">
        <el-editable
          ref="editable"
          :key="tableKey"
          :data.sync="list"
          :edit-config="{ showIcon: true, showStatus: true}"
          class="click-table1"
          stripe
          border
          size="small"
          style="width: 100%">
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :label="$t('update4.shouldMoney')" prop="shouldMoney" align="center" min-width="150px"/>
          <el-editable-column :label="$t('update4.uncollectMoney')" prop="uncollectMoney" align="center" min-width="150px"/>
          <el-editable-column :label="$t('update4.collectedMoney')" prop="collectedMoney" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Advancemanage.advanceMoney')" :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="receiptMoney" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :min="0"
                :controls="false"
                v-model="scope.row.receiptMoney"
                @change="getCollectedMoney(scope.row)"/>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('update4.empId')" prop="empName" align="center" min-width="200px"/>
          <el-editable-column :label="$t('public.actions')" :resizable="false" align="center">
            <template slot-scope="scope">
              <el-button v-show="scope.row.stat === 1" type="success" size="mini" @click="handleConfirm(scope.row)">
                {{ $t('update4.shoukandanquerenshouk') }}
              </el-button>
            </template>
          </el-editable-column>

        </el-editable>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { confirmReceipt, inventoryReceiptlist } from '@/api/Inventorydamaged'
export default {
  props: {
    confirmControl: {
      type: Boolean,
      default: false
    },
    confirmData: {
      type: [Object, String],
      default: null
    }
  },
  data() {
    return {
      confirmVisible: this.confirmControl,
      list: [],
      tableKey: 0
    }
  },
  watch: {
    confirmControl() {
      this.confirmVisible = this.confirmControl
    },
    confirmData() {
      console.log('this.confirmData', this.confirmData)
      this.list = this.confirmData.inventoryReceiptDetailVos
      this.tableKey = Math.random()
    }
  },
  methods: {
    getTableData() {
      const parms = {
        pageNum: 1,
        pageSize: 10,
        repositoryId: this.$store.getters.repositoryId,
        regionIds: this.$store.getters.regionIds,
        receiptNumber: this.confirmData.receiptNumber
      }
      inventoryReceiptlist(parms).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content.list[0].inventoryReceiptDetailVos
          this.tableKey = Math.random()
        }
      })
    },
    handleConfirm(row) {
      console.log('row', row)
      if (!row.receiptMoney) {
        this.$message({
          type: 'error',
          message: 'receipt money can not be empty'
        })
        return false
      }
      confirmReceipt(row.id, row.receiptMoney).then(res => {
        if (res.data.ret === 200) {
          this.$message({
            type: 'success',
            message: 'successful'
          })
          this.getTableData()
        }
      })
    },
    getCollectedMoney(row) {
      if (Number(row.receiptMoney) > Number(row.uncollectMoney)) {
        this.$message({
          type: 'error',
          message: 'receipt money is wrong'
        })
        row.receiptMoney = 0
      } else {
        row.uncollectMoney = Number(row.shouldMoney) - Number(row.receiptMoney)
      }
    }
  }
}
</script>

<style scoped>

</style>
