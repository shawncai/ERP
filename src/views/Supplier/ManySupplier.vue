<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{ $t('updates.xzmb') }}  </span>
      </div>
      <a href="/static/file/经销商资料表.xlsx"><el-button type="primary">{{ $t('updates.xzmb') }}</el-button></a>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{ $t('updates.scbg') }}</span>
      </div>
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{ $t('updates.bgsj') }}</span>
        <el-button style="float: right; padding: 3px 0" type="primary" @click="uploads">{{ $t('updates.drsj') }}</el-button>
      </div>
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { manyinsert } from '@/api/Supplier'

// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'ManySupplier',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      dizhi: '/static/file/ceshi.xlsx',
      uploadHead: []
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = ['供应商编号', '供应商名称', '供应商简称', '供应商类别', '所在区域', '采购员', '供应商优质级别', '建档人', '建档日期']
      this.uploadHead = results.map(function(item) {
        return {
          id: item.供应商编号,
          supplierName: item.供应商名称,
          supplierShortName: item.供应商简称,
          typeName: item.供应商类别,
          regionName: item.所在区域,
          buyerName: item.采购员,
          levelName: item.供应商优质级别,
          createName: item.建档人,
          createTime: item.建档日期
        }
      })
      console.log(header)
    },
    uploads() {
      manyinsert(JSON.stringify(this.uploadHead)).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: 'successful',
            message: '修改成功',
            type: 'success',
            offset: 100
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  .app-container {
    margin-top: 20px;
  }
</style>
