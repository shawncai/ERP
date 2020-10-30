<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="$t('updates.xgcgtj')" class="edit" width="1010px" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('AdjustPrice.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" placeholder="请输入调价单主题" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('AdjustPrice.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" placeholder="请选择经办人" style="margin-left: 18px;width: 150px" clearable @focus="handlechoose"/>
              </el-form-item>
              <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('AdjustPrice.adjustDeptId')" style="width: 100%;">
                <el-select v-model="personalForm.adjustDeptId" placeholder="请选择调价部门" style="margin-left: 18px;;width: 150px" clearable >
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('AdjustPrice.adjustRepositoryId')" prop="overflowRepositoryId" style="width: 100%;">
                <el-input v-model="adjustRepositoryId" placeholder="请选择调价仓库" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('AdjustPrice.adjustDate')" prop="adjustDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.adjustDate"
                  type="date"
                  placeholder="选择调价日期"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 150px"/>
              </el-form-item>
            </el-col>
            <!--            <el-col :span="6">-->
            <!--              <el-form-item :label="$t('AdjustPrice.effectiveDate')" prop="effectiveDate" style="width: 100%;">-->
            <!--                <el-date-picker-->
            <!--                  v-model="personalForm.effectiveDate"-->
            <!--                  type="date"-->
            <!--                  placeholder="选择生效日期"-->
            <!--                  value-format="yyyy-MM-dd"-->
            <!--                  style="margin-left: 18px;width: 150px"/>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <el-col :span="6">
              <el-form-item :label="$t('AdjustPrice.summary')" prop="summary" style="width: 100%;">
                <el-input v-model="personalForm.summary" placeholder="请输入摘要" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--调价单明细-->
    <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">
      <div ref="fuzhu" class="form-name">{{ $t('updates.tjdmx') }}</div>
      <div class="buttons" style="margin-top: 58px">
        <el-button :loading="downloadLoading" size="small" class="filter-item2" type="primary" @click="handleExport">{{ $t('update4.xiazaimoban') }}</el-button>
        <el-button size="small" class="filter-item2" type="success" @click="handleUpload">{{ $t('update4.gengxinmoban') }}</el-button>
        <input v-show="false" ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button :loading="issave" type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getlocation, locationlist } from '@/api/public'
import { updatrepoadjustprice } from '@/api/AdjustPrice'
import { getdeptlist } from '@/api/BasicSettings'
import MyRepository from './MyRepository'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
import MyCreate from './MyCreate'
import XLSX from 'xlsx'

var _that
export default {
  components: { MyRepository, MyCreate, MyAccept, MyDetail },
  props: {
    editcontrol: {
      type: Boolean,
      default: false
    },
    editdata: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      issave: false,
      detailData: null,
      loading: false,
      excelData: {
        header: null,
        results: null
      },
      downloadLoading: false,
      exportparms: {},
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改row数据
      personalForm: this.editdata,
      // 部门数据
      depts: [],
      // 经办人回显
      handlePersonId: '',
      // 生产调价仓库回显
      adjustRepositoryId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制生产负责人选择窗口
      createcontrol: false,
      // 控制商品列表窗口
      control: false,
      // 生产调价单规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, message: '请输入源单编号', trigger: 'blur' }
        ],
        enterPersonId: [
          { required: true, message: '请选择调价人', trigger: 'focus' }
        ],
        enterRepositoryId: [
          { required: true, message: '请选择调价仓库', trigger: 'focus' }
        ]
      },
      // 生产调价单明细数据
      list2: [],
      // 生产调价明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 生产调价明细中货位数据
      locationlist: [],
      // 生产调价单明细列表规则
      validRules: {}
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.produceManagerId = this.personalForm.produceManagerName
      this.handlePersonId = this.personalForm.handlePersonName
      this.adjustRepositoryId = this.personalForm.adjustRepositoryId
      this.list2 = this.personalForm.repoAdjustPriceDetailVos
      this.getlocation()
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleUpload() {
      this.$refs['excel-upload-input'].click()
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
      return true
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
          id: item.序号,
          productCode: item.物料编码,
          productName: item.产品名称,
          color: item.颜色,
          typeId: item.型号id,
          unit: item.单位,
          productType: item.规格型号,
          costPrice: item.成本价
        }
      })
      console.log('uploaddata', uploaddata)
      this.detailData = JSON.stringify(uploaddata)
      this.$notify({
        title: '更新成功',
        message: '更新成功',
        type: 'success',
        duration: 1000,
        offset: 100
      })
      loading.close()
      // updateProductPrice(jsonupload).then(res => {
      //   if (res.data.ret === 200) {
      //     console.log(res)
      //     this.$notify({
      //       title: '更新成功',
      //       message: '更新成功',
      //       type: 'success',
      //       duration: 1000,
      //       offset: 100
      //     })
      //     this.getlist()
      //   } else {
      //     this.$notify.error({
      //       title: '更新错误',
      //       message: '更新错误',
      //       offset: 100
      //     })
      //   }
      //   loading.close()
      // })
      //   .catch(e => {
      //     loading.close()
      //   })
      setTimeout(() => {
        loading.close()
      }, 180000)
    },
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
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
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    handleExport() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '物料编码', '产品名称', '型号id', '规格型号', '单位', '颜色', '成本价', '备注']
        const filterVal = ['id', 'productCode', 'productName', 'typeId', 'productType', 'unit', 'color', 'costPrice', 'remarks']
        const data = this.formatJson(filterVal, this.list2)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '修改调价单明细表'
        })
        this.downloadLoading = false
      })
    },
    // 部门列表数据
    getlist() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    getlocation() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.adjustRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list
        }
      })
    },
    // 经办人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 经办人返回数据
    createname(val) {
      console.log(val)
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.adjustRepositoryId = val.repositoryName
      this.personalForm.adjustRepositoryId = val.id
      // this.locationlistparms.repositoryId = val.id
      // locationlist(this.locationlistparms).then(res => {
      //   if (res.data.ret === 200) {
      //     this.locationlist = res.data.data.content.list.map(function(item) {
      //       return {
      //         'value': item.id,
      //         'label': item.locationName
      //       }
      //     })
      //   }
      // })
    },
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.adjustRepositoryId)
        if (this.personalForm.adjustRepositoryId === undefined || this.personalForm.adjustRepositoryId === '') {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.sqslcg'),
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.adjustRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
            } else if (res.data.data.content.length === 0) {
              locationlist(this.personalForm.adjustRepositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content.list
                }
              })
            }
          }
        })
      }
    },
    // 调价单事件
    // 新增调价单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].productCode === nowlistdata[j].productCode) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.wpytj'),
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    // 调价金额计算
    getSize(quan, pric) {
      return quan * pric
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      delete this.personalForm.judgeStat
      delete this.personalForm.receiptStat
      delete this.personalForm.repoAdjustPriceDetailVos
      delete this.personalForm.approvalUseVos
      this.issave = true

      console.log(this.personalForm)
      const parms2 = this.detailData
      const parm = JSON.stringify(this.personalForm)
      updatrepoadjustprice(parm, parms2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
          // this.$refs.editable.clear()
          this.$refs.personalForm.clearValidate()
          this.$refs.personalForm.resetFields()
          this.editVisible = false
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'wrong',
            offset: 100
          })
        }
        this.issave = false
      })
    },
    handlecancel() {
      // this.$refs.editable.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      // this.issave = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
</style>
