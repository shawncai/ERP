<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{ $t('updates.xzmb') }}  </span>
      </div>
      <a href="static/file/物品资料表.xlsx"><el-button type="primary">{{ $t('updates.xzmb') }}</el-button></a>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{ $t('updates.scbg') }}</span>
      </div>
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>{{ $t('updates.bgsj') }}</span>
        <el-button style="float: right; padding: 3px 0" type="primary" @click="uploads">{{ $t('updates.drsj') }}</el-button>
      </div>
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
      </el-table>
    </el-card>

    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="提示"
      width="1010px"
      top="-10px"
      class="edit">
      <div class="noties">{{ contentdata }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      contentdata: '',
      dialogVisible: false,
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
      this.tableHeader = ['开始编码（01整车，02零部件，03紧固件）（必填）',	'分类名称（必填）',	'车辆型号（01，02填）',	'配置（01填）',	'版本（01，02填）',
        '颜色（01，02填）',	'直径规格（03填）',	'长度规格（03填）',	'性能等级（03填）',	'表面处理（03填）',	'条形码',
        '商品名称(必填)',	'质保期(天数)',	'重量(保留两位小数)',	'体积(保留两位小数)',	'会员价',	'出厂价(必填)',	'批发价',
        '销售价(必填)',	'最低价',	'档次级别编号(id)',	'基本计量单位名称（必填）',	'来源(2生产3采购)',	'成本核算计价方式(1约当产量法，2定额成本法，3定额比例法)(必填)',
        '上下架(1上架，2下架)',	'是否适用批次(1使用2不使用)(必填)',	'有效天数',	'采购周期(天)',	'保养周期(天数)',	'1可以作为赠品，2不可以',
        '生产能力(日产量)', '生产中心',	'绩效分（分数）',	'积分（分数）']
      this.uploadHead = results.map(function(item) {
        return {
          beginCode: item['开始编码（01整车，02零部件，03紧固件）（必填）'],
          categoryName: item['分类名称（必填）'],
          productTypeName: item['车辆型号（01，02填）'],
          disposeName: item['配置（01填）'],
          versionName: item['版本（01，02填）'],
          color: item['颜色（01，02填）'],
          diameterName: item['直径规格（03填）'],
          lengthName: item['长度规格（03填）'],
          performanceLevelName: item['性能等级（03填）'],
          faceName: item['表面处理（03填）'],
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
          unitName: item['基本计量单位名称（必填）'],
          source: item['来源(2生产3采购)'],
          valuation: item['成本核算计价方式(1约当产量法，2定额成本法，3定额比例法)(必填)'],
          isActive: item['上下架(1上架，2下架)'],
          isBatch: item['是否适用批次(1使用2不使用)(必填)'],
          effectiveDay: item['有效天数'],
          stockCircle: item['采购周期(天)'],
          careCircle: item['保养周期(天数)'],
          isGift: item['1可以作为赠品，2不可以'],
          produceAbility: item['生产能力(日产量)'],
          workCenterName: item['生产中心'],
          kpiGrade: item['绩效分（分数）'],
          point: item['积分（分数）']
        }
      })
      console.log(header)
    },
    uploads() {
      console.log('json', this.uploadHead)
      manyinsert(JSON.stringify(this.uploadHead)).then(res => {
        if (res.data.ret === 200) {
          this.dialogVisible = true
          this.contentdata = res.data.msg
          // this.$notify({
          //   title: '成功',
          //   message: res.data.msg,
          //   type: 'success',
          //   duration: 0
          // })
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg,
            duration: 0
          })
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style scoped>
  .app-container {
    margin-top: 20px;
  }
  .noties {
   font-size: 15px;
    line-height: 30px;
    padding: 20px;
    margin-top: 63px
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
</style>
