<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ $t('updates.xzmb') }}  </span>
      </div>
      <a href="/static/file/客户资料表.xlsx"><el-button type="primary">{{ $t('updates.xzmb') }}</el-button></a>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>{{ $t('updates.scbg') }}</span>
      </div>
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
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
import { manyinsert } from '@/api/Customer'

var _that
export default {
  name: 'ManyCustomer',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      uploadHead: []
    }
  },
  methods: {
    beforeUpload(file) {
      // const isLt1M = file.size / 1024 / 1024 < 1
      const isLt1M = true

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
      this.tableHeader = ['id', '账号', '名 （必填）', '中间名', '姓氏（必填）', '客户电话（必填）', '性别 (1男2女)', '客户优质级别id', '客户来源id', '新老客户 (1老2新)', '国家id（必填）', '省id', '市id', '详细地址', '生日', '所属门店id', '邮箱', '密码', '创建时间']
      this.uploadHead = results.map(function(item) {
        return {
          id: item['id'],
          account: item['账号'],
          lastName: item['名 （必填）'],
          middleName: item['中间名'],
          firstName: item['姓氏（必填）'],
          phoneNumber: item['客户电话（必填）'],
          gender: item['性别 (1男2女)'],
          level: item['客户优质级别id'],
          source: item['客户来源id'],
          newOrOld: item['新老客户 (1老2新)'],
          countryId: item['国家id（必填）'],
          provinceId: item['省id'],
          cityId: item['市id'],
          address: item['详细地址'],
          birthday: item['生日'],
          repositoryId: item['所属门店id'],
          email: item['邮箱'],
          password: item['密码'],
          createTime: item['创建时间']
        }
      })
      console.log(header)
    },
    uploads() {
      manyinsert(JSON.stringify(this.uploadHead)).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            offset: 100
          })
        } else {
          this.$notify.error({
            title: '错误',
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
