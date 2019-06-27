<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>下载模板  </span>
      </div>
      <a href="static/file/物品资料表.xlsx"><el-button type="primary">下载模板</el-button></a>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px" shadow="never">
      <div slot="header" class="clearfix">
        <span>上传Excel表格</span>
      </div>
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>表格数据</span>
        <el-button style="float: right; padding: 3px 0" type="primary" @click="uploads">导入数据</el-button>
      </div>
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { manyinsert } from '@/api/Product'

export default {
  name: 'Manyinsert',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      dizhi: 'static/file/ceshi.xlsx',
      uploadHead: []
    }
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
      this.tableHeader = ['物料编码(必填)',	'条形码',	'商品名称(必填)',	'质保期(天数)',	'重量(保留两位小数)',	'体积(保留两位小数)',	'会员价',	'出厂价(必填)',	'批发价',	'销售价(必填)',	'最低价',	'档次级别编号(id)',	'基本计量单位编号(id)(必填)',	'销售计量单位编号(id)',	'库存计量单位编号(id)',	'生产计量单位编号(id)',	'来源(2生产3采购)',	'成本核算计价方式(1约当产量法，2定额成本法，3定额比例法)(必填)',	'上下架(1上架，2下架)',	'是否适用批次(1使用2不使用)(必填)',	'有效天数(必填)',	'采购周期(天)',	'保养周期(天数)',	'1可以作为赠品，2不可以',	'生产能力(日产量)',	'生产中心序号(id)',	'绩效分',	'积分', '种类id(必填)']
      this.uploadHead = results.map(function(item) {
        return {
          code: item['物料编码(必填)'],
          barCode: item['条形码'],
          productName: item['商品名称(必填)'],
          zhiBaoQi: item['质保期(天数)'],
          weight: item['重量(保留两位小数)'],
          volume: item['体积(保留两位小数)'],
          memberPrice: item['会员价'],
          costPrice: item['出厂价(必填)'],
          tradePrice: item['批发价'],
          salePrice: item['销售价(必填)'],
          lowerPrice: item['最低价'],
          level: item['档次级别编号(id)'],
          purchaseMeasurement: item['基本计量单位编号(id)(必填)'],
          saleMeasurement: item['销售计量单位编号(id)'],
          stockMeasurement: item['库存计量单位编号(id)'],
          produceMeasurement: item['生产计量单位编号(id)'],
          source: item['来源(2生产3采购)'],
          valuation: item['成本核算计价方式(1约当产量法，2定额成本法，3定额比例法)(必填)'],
          isActive: item['上下架(1上架，2下架)'],
          isBatch: item['是否适用批次(1使用2不使用)(必填)'],
          effectiveDay: item['有效天数(必填)'],
          stockCircle: item['采购周期(天)'],
          careCircle: item['保养周期(天数)'],
          isGift: item['1可以作为赠品，2不可以'],
          produceAbility: item['生产能力(日产量)'],
          workCenterId: item['生产中心序号(id)'],
          kpiGrade: item['绩效分'],
          point: item['积分'],
          categoryId: item['种类id(必填)']
        }
      })
      console.log(header)
    },
    uploads() {
      console.log('json', this.uploadHead)
      manyinsert(JSON.stringify(this.uploadHead)).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '成功',
            message: '上传成功',
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
