<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="物品二维码"
    width="30%"
    append-to-body
    @close="handleClose">
    <div
      style="display: flex;
    align-content: center;
    justify-content: center;">
      <vue-qr :text="boxData" :callback="test" qid="testid"/>
    </div>
    <div
      style="display: flex;
    align-content: center;
    justify-content: center;">
      <el-button @click="printQrimage">打印</el-button>

    </div>

  </el-dialog>
</template>

<script>
import VueQr from 'vue-qr'
import printJS from 'print-js'

export default {
  name: 'QrPic',
  components: { VueQr },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    qrData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialogVisible: false,
      boxData: '',
      qrImage: ''
    }
  },
  computed: {

  },
  watch: {
    visible() {
      this.dialogVisible = this.visible
      console.log('this.qrData', this.qrData)
      this.boxData = `物品编码:  ${this.qrData.code}\n 
      物品名称: ${this.qrData.productName} \n 
      物品分类: ${this.qrData.category} \n
      车辆型号:  ${this.qrData.productType} \n
      配置:  ${this.qrData.dispose} \n
      版本:  ${this.qrData.version}\n
      颜色:  ${this.qrData.color}
                    `
    },
    qrData() {
      console.log('boxData', this.qrData)
      this.boxData = `物品编码:  ${this.qrData.code}\n 
      物品名称:  ${this.qrData.productName} \n 
      物品分类:  ${this.qrData.category} \n
      车辆型号:  ${this.qrData.productType} \n
      配置:  ${this.qrData.dispose} \n
      版本:  ${this.qrData.version}\n
      颜色:  ${this.qrData.color}
                    `
    }
  },
  methods: {
    test(dataUrl, id) {
    //   console.log(url, id)
      this.qrImage = dataUrl
    },
    printQrimage() {
      printJS(this.qrImage, 'image')
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

