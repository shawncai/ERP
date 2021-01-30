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
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" fixed="left" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" fixed="left" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" fixed="left" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.jbel')" prop="basicQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.pssl')" prop="deliverQuantity" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.psje')" prop="deliverMoney" align="center" min-width="150px"/>
          <el-editable-column :label="$t('updates.chck')" prop="outRepositoryName" align="center" min-width="150px"/>
          <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150px"/>
          <el-table-column v-show="isdeliverperson()" :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
            <template slot-scope="scope">
              <el-button v-if="isok(scope.row)" title="确认" size="mini" type="success" icon="el-icon-check" circle @click="handleconfirm(scope.row)"/>
              <span v-else>已确认</span>
            </template>
          </el-table-column>

        </el-editable>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { confirmOff } from '@/api/DeliverGoods'
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
      tableKey: 0,
      personalForm: this.confirmData
    }
  },
  watch: {
    confirmControl() {
      this.confirmVisible = this.confirmControl
    },
    confirmData() {
      console.log('this.confirmData', this.confirmData)
      this.list = this.confirmData.deliverGoodsDetailVos
      this.personalForm = this.confirmData
      this.tableKey = Math.random()
    }
  },
  methods: {
    isok(row) {
      console.log(row)
      if (row.data.stat !== 3) {
        return true
      } else {
        return false
      }
    },
    isdeliverperson() {
      console.log('判断条件', this.personalForm)
      if (this.$store.getters.userId === this.personalForm.deliverPersonId && this.personalForm.judgeStat === 2) {
        return true
      } else {
        return false
      }
    },
    handleconfirm(row) {
      console.log(row.data)
      confirmOff(row.data.id).then(res => {
        if (res.data.ret === 200) {
          console.log(res)
          row.data.stat = 3
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
