<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">

        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('update4.groupName')" prop="groupName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.groupName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('update4.khm')" prop="customerId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="customerId" style="width: 200px" @focus="chooseCustomer"/>
                  <my-customer :customercontrol.sync="customercontrol" @customerdata="customerdata"/>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item :label="$t('Customer.level')" prop="levelId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select ref="clear" v-model="personalForm.levelId" :value="personalForm.levelId" style="width: 200px" @focus="handleFocus">
                    <el-option v-show="false" label="" value=""/>
                    <el-option
                      v-for="(item, index) in levels"
                      :key="index"
                      :value="item.id"
                      :label="item.categoryName"/>
                    <template>
                      <el-button v-if="isshow" icon="el-icon-circle-plus-outline" style="width:100%" @click="go_creat">{{ $t('updates.create') }}</el-button>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('update4.stat')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.stat" style="width: 200px">
                    <el-option label="启用" value="1"/>
                    <el-option label="停用" value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('update4.summary')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.summary" style="width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <div ref="fuzhu" class="form-name" >{{ $t('updates.ddmx') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="chooseProduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" @product="productdetail"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <el-button @click="uploadData()">导入</el-button>
          <input v-show="false" ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
        </div>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list"
            :key="tableKey"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.wpfl')" prop="productCategoryName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.jbdw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ggxh')" prop="productTypeName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('StockOrder.currency')" :edit-render="{name: 'ElSelect', options: currencyList, type: 'visible'}" prop="currency" align="center" min-width="200px"/>
            <el-editable-column :label="$t('update4.customerPrice')" :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="price" align="center" min-width="150px"/>

          </el-editable>
        </div>
      </el-card>

      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index:99">
        <el-button :loading="saveloding" type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyCustomer from '../SaleOrder/components/MyCustomer'
import MyDetail from './components/MyDetail'
import { addCustomerProduct } from '@/api/Customer'
import { searchCusCategory } from '@/api/Customer'
import XLSX from 'xlsx'

export default {
  name: 'NewCustomerGroup',
  components: { MyCustomer, MyDetail },
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.customerId === undefined || this.customerId === null || this.customerId === '') {
        callback(new Error('please select customer'))
      } else {
        callback()
      }
    }
    return {
      excelData: {
        header: null,
        results: null
      },

      personalForm: {
        stat: '1',
        createId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId
      },
      personalrules: {
        levelId: [
          { required: true, message: '选择客户级别', trigger: 'change' }
        ],
        groupName: [
          { required: true, message: '填写主题', trigger: 'blur' }
        ]
      },
      customercontrol: false,
      customerId: '',
      saveloding: false,
      list: [],
      control: false,
      moreaction: '',
      tableKey: 0,
      // 发送参数
      // 判断增加按钮
      isshow: false,
      levels: [],
      levelstype: 2,
      currencyList: [{ value: 1, label: 'PHP' }, { value: 2, label: 'USD' }, { value: 3, label: 'RMB' }, { value: 4, label: 'LKR' }]
    }
  },
  methods: {
    clearuplod() {
      this.exportparms = {
        typeid: '',
        categoryid: ''
      }
    },
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
    onSuccess({ results, header }) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      console.log('results', results)
      const uploaddata = results.map(item => {
        return {
          productCode: item.物品编号,
          productName: item.物品名称,
          productCategoryName: item.物品分类,
          productCategory: item.物品分类id,
          productTypeName: item.规格,
          productType: item.规格id,
          typeId: item.规格id,
          type: item.规格id,
          color: item.颜色,
          unit: item.单位,
          price: item.销售单价,
          currency: 3
        }
      })
      console.log('uploaddata', uploaddata)
      this.list = uploaddata
      this.tableKey = Math.random()
      loading.close()
      setTimeout(() => {
        loading.close()
      }, 180000)
    },
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    // 批量更新操作
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const fixedData = this.fixData(data)
          const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    fixData(data) {
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },
    uploadData() {
      this.$refs['excel-upload-input'].click()
    },
    // 触发下拉框brlu
    go_creat() {
      this.$router.push('/Customer/CustomerCategory')
      this.$refs.clear.blur()
    },
    jungleshow() {
      const roles = this.$store.getters.roles
      this.isshow = roles.includes('1-14-21-1')
      console.log(this.isshow)
    },
    handleFocus() {
      this.getCategory()
      this.jungleshow()
    },
    getCategory() {
      // 获取客户优质级别
      searchCusCategory(this.levelstype).then(res => {
        if (res.data.ret === 200) {
          this.levels = res.data.data.content.list
        } else {
          console.log('客户优质级别错误')
        }
      })
    },
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    productdetail(val) {
      this.list = val
      this.tableKey = Math.random()
    },
    chooseProduct() {
      this.control = true
    },
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Customer/NewCustomerGroup', name: 'NewCustomerGroup', fullPath: '/Customer/NewCustomerGroup', title: 'NewCustomerGroup' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    clearForm() {
      this.personalForm = {
        stat: '1',
        createId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId
      }
      this.customerId = ''
    },
    handlesave() {
      if (this.list.length === 0) {
        console.log(12333)
      }
      this.saveloding = true
      setTimeout(() => {
        const parms = JSON.stringify(this.personalForm)
        const detailParms = JSON.stringify(this.$refs.editable.getRecords())
        this.$refs.personalForm.validate((valid) => {
          if (valid) {
            addCustomerProduct(parms, detailParms).then(res => {
              console.log(res)
              if (res.data.ret === 200) {
                this.$notify({
                  title: 'successful',
                  message: 'save successful',
                  type: 'success',
                  offset: 100
                })
                this.clearForm()
                this.$refs.editable.clear()
                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
              } else {
                this.$notify.error({
                  title: 'wrong',
                  message: res.data.msg,
                  offset: 100
                })
              }
              this.saveloding = false
            })
          } else {
            this.$notify.error({
              title: 'wrong',
              message: 'Information is incomplete',
              offset: 100
            })
            this.saveloding = false

            return false
          }
        })
      }, 1000)
    },
    customerdata(val) {
      console.log(val)
      this.customerId = val.customerName
      this.personalForm.customerId = val.id
    },
    chooseCustomer() {
      this.customercontrol = true
    }
  }
}
</script>

<style scoped>
.ERP-container{
    margin-right: 0;
}
    .form-name{
      font-weight: bold;
      font-size: 18px;
      color: #373e4f;
      padding: 5px;
      margin-bottom: -20px;
    }
    .container{
      margin-top: 5px;
    }
    .el-button+.el-button{
      width: 98px;
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
    height: auto;
  }
</style>
