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
                <el-form-item :label="$t('AdjustPrice.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" placeholder="请输入调价单主题" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.handlePersonId')" prop="handlePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="handlePersonId" placeholder="请选择经办人" style="width: 200px" clearable @focus="handlechoose"/>
                </el-form-item>
                <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.adjustDeptId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.adjustDeptId" placeholder="请选择调价部门" style="width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.adjustRepositoryId')" prop="adjustRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="adjustRepositoryId" placeholder="请选择调价仓库" style="width: 200px" clearable @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col> -->
              <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.adjustDate')" prop="adjustDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.adjustDate"
                    type="date"
                    placeholder="选择调价日期"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"
                    @change="test"/>
                </el-form-item>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('AdjustPrice.effectiveDate')" prop="effectiveDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
              <!--                  <el-date-picker-->
              <!--                    v-model="personalForm.effectiveDate"-->
              <!--                    :picker-options="pickerOptions1"-->
              <!--                    type="date"-->
              <!--                    placeholder="选择生效日期"-->
              <!--                    value-format="yyyy-MM-dd"-->
              <!--                    style="width: 200px"/>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.summary')" prop="summary" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.summary" :placeholder="$t('update4.qsrzy')" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AdjustPrice.reason')" prop="reason" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.adjustReason" placeholder="请选择调价部门" style="width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in reasonlist"
                      :key="index"
                      :value="item.adjustReason"
                      :label="item.reasonName"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="fuzhu" class="form-name" >{{ $t('AdjustPrice.adjustRepositoryId') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button @click="handleAddRep">选择门店</el-button>
          <my-repository :repositorycontrol.sync="repositorycontrol" @repossitoryData="repossitoryData" @repossitoryIds="repossitoryIds"/>
          <el-button type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <!-- <el-checkbox v-model="checkAll" style="margin-left: 20px" @change="handleCheckAllChange">全部门店</el-checkbox> -->
        </div>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list3"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('updates.mdmc')" prop="repositoryName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.mdlx')" prop="categoryName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.fzr')" prop="managerName" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">
        <div ref="fuzhu" class="form-name">{{ $t('updates.tjdmx') }}</div>
        <div class="buttons" style="margin-top: 58px">
          <el-button :loading="downloadLoading" size="small" class="filter-item2" type="primary" @click="handleExport">{{ $t('update4.xiazaimoban') }}</el-button>
          <el-button size="small" class="filter-item2" type="success" @click="handleUpload">{{ $t('update4.gengxinmoban') }}</el-button>
          <input v-show="false" ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
        </div>
      </el-card>

      <!--调价单明细-->
      <!-- <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">

        <div ref="fuzhu" class="form-name">{{ $t('updates.tjdmx') }}</div>
        <div class="buttons" style="margin-top: 58px">
          <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.lsyj')" prop="salePrice" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible', attrs: {min: 0}}" :label="$t('updates.lstzj')" prop="newSalePrice" align="center" width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="false"
                  v-model="scope.row.newSalePrice"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.pfyj')" prop="tradePrice" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible', attrs: {min: 0}}" :label="$t('updates.pftzj')" prop="newTradePrice" align="center" width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="false"
                  v-model="scope.row.newTradePrice"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.yyyj')" prop="memberPrice" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible', attrs: {min: 0}}" :label="$t('updates.yytzj')" prop="newMemberPrice" align="center" width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="false"
                  v-model="scope.row.newMemberPrice"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
          </el-editable>
        </div>
      </el-card> -->

      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">

        <el-button :loading="issave" type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { productlist } from '@/api/Product'

import '@/directive/noMoreClick/index.js'
import { getlocation, locationlist } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import { addadjustprice } from '@/api/AdjustPrice'
import { searchInventoryCategory } from '@/api/InventoryCategory'
import MyRepository from './components/MyRepository'
import MyAccept from './components/MyAccept'
import MyDetail from './components/MyDetail'
import MyCreate from './components/MyCreate'
import XLSX from 'xlsx'

var _that
export default {
  name: 'AddAdjustPrice',
  components: { MyRepository, MyDetail, MyCreate, MyAccept },
  data() {
    const validatepass = (rule, value, callback) => {
      if (this.adjustRepositoryId === '' || this.adjustRepositoryId === undefined || this.adjustRepositoryId === null) {
        callback(new Error('请选择仓库'))
      } else {
        callback()
      }
    }
    const validatepass2 = (rule, value, callback) => {
      if (this.personalForm.adjustDate === '' || this.personalForm.adjustDate === undefined || this.personalForm.adjustDate === null) {
        callback(new Error('请选择调价日期'))
      } else {
        callback()
      }
    }
    const validatepass3 = (rule, value, callback) => {
      if (this.personalForm.effectiveDate === '' || this.personalForm.effectiveDate === undefined || this.personalForm.effectiveDate === null) {
        callback(new Error('请选择生效日期'))
      } else {
        callback()
      }
    }
    return {
      detailData: null,
      loading: false,
      excelData: {
        header: null,
        results: null
      },
      downloadLoading: false,
      exportparms: {},
      issave: false,
      allrepos: [],
      list3: [],
      // 调价原因
      reasonlist: [],
      // 调价参数
      gettemplist: {
        pagenum: 1,
        pagesize: 9999,
        type: 2,
        iseffective: 1
      },
      // 部门数据
      depts: [],
      // 经办人回显
      handlePersonId: this.$store.getters.name,
      // 调价仓库回显
      adjustRepositoryId: this.$store.getters.repositoryName,
      // 经办人控制框
      createcontrol: false,
      // 控制调价仓库选择窗口
      repositorycontrol: false,
      // 控制商品列表窗口
      control: false,
      // 调价信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        handlePersonId: this.$store.getters.userId,
        adjustDeptId: this.$store.getters.deptId,
        adjustRepositoryId: this.$store.getters.repositoryId,
        adjustDate: new Date()
      },
      // 调价单规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        handlePersonId: [
          { required: true, message: '请选择经办人', trigger: 'focus' }
        ],
        adjustRepositoryId: [
          { required: true, validator: validatepass, trigger: 'change' }
        ],
        adjustDate: [
          { required: true, validator: validatepass2, trigger: 'change' }
        ],
        effectiveDate: [
          { required: true, validator: validatepass3, trigger: 'change' }
        ]
      },
      // 调价单明细数据
      list2: [],
      // 调价明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 调价明细中货位数据
      locationlist: [],
      // 调价单明细列表规则
      validRules: {
      },
      pickerOptions1: {}
    }
  },

  mounted() {
    this.getlist()
    this.test()
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
          unit: item.单位id,
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
      this.exportparms.pagenum = 1
      this.exportparms.pagesize = 99999999
      productlist(this.exportparms).then(res => {
        if (res.data.ret === 200) {
          const list = res.data.data.content.list
          this.downloadLoading = false
          if (list.length === 0) {
            this.$notify({
              title: '没有数据',
              type: 'success',
              offset: 100
            })
          } else {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '物料编码', '产品名称', '物品分类', '型号id', '规格型号', '单位id', '颜色', '成本价', '备注']
        const filterVal = ['id', 'code', 'productName', 'category', 'typeId', 'productType', 'purMeasu', 'color', 'costPrice', 'remarks']
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '调价单明细表'
        })
        this.downloadLoading = false
      })
          }
        } else {
          // this.restFilter()
        }
      })
    },
    // 选择门店
    handleAddRep() {
      this.repositorycontrol = true
    },
    repossitoryIds(val) {
      console.log(val)
      this.allrepos = val
      // this.personalForm.suitRepositorys = ',' + val.join(',') + ','
    },
    uniqueArray(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    // 加载门店
    repossitoryData(val) {
      // const nowlistdata = this.$refs.editable2.getRecords()
      // for (let i = 0; i < val.length; i++) {
      //   for (let j = 0; j < nowlistdata.length; j++) {
      //     if (val[i].id === nowlistdata[j].id) {
      //       this.$notify.error({
      //         title: 'wrong',
      //         message: '门店已添加',
      //         offset: 100
      //       })
      //       return false
      //     }
      //   }
      //   this.$refs.editable2.insert(val[i])
      // }

      console.log('val====', val)
      const nowlistdata = this.$refs.editable2.getRecords()
      const newarr = Object.assign([], val, nowlistdata)
      const needarr = this.uniqueArray(newarr, 'id')
      console.log('needarr', needarr)
      this.list3 = needarr
    },
    // 限制生效日期
    test() {
      this.pickerOptions1.disabledDate = (time) => {
        return time.getTime() < new Date(this.personalForm.adjustDate).getTime()
        // return time.getTime() > Date.now()
      }
      console.log(new Date(this.personalForm.adjustDate).getTime())
    },
    // 部门列表数据
    getlist() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
      searchInventoryCategory(this.gettemplist).then(res => {
        if (res.data.ret === 200) {
          this.reasonlist = res.data.data.content.list
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
      //     this.locationlist = res.data.data.content.list
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        handlePersonId: this.$store.getters.userId,
        adjustDeptId: this.$store.getters.deptId,
        adjustRepositoryId: this.$store.getters.repositoryId,
        adjustDate: new Date()
      }
      // 经办人回显
      this.handlePersonId = this.$store.getters.name
      // 调价仓库回显
      this.adjustRepositoryId = this.$store.getters.repositoryName
    },
    // 保存操作
    handlesave() {
      if (!this.detailData) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }

      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.issave = true
          for (const i in this.allrepos) {
            Data.adjustRepositoryId = this.allrepos[i]
            const parms = JSON.stringify(Data)
            const parms2 = this.detailData
            const parm3 = this.personalForm
            addadjustprice(parms, parms2, parm3).then(res => {
              console.log(res)
              if (res.data.ret === 200) {
                this.$notify({
                  title: 'successful',
                  message: 'save successful',
                  type: 'success',
                  offset: 100
                })
                this.restAllForm()

                this.$refs.personalForm.clearValidate()
                this.$refs.personalForm.resetFields()
              } else {
                this.$notify.error({
                  title: 'wrong',
                  message: res.data.msg,
                  offset: 100
                })
              }
              this.issave = false
            })
          }
        } else {
          this.$notify.error({
            title: 'wrong',
            message: 'Information is incomplete',
            offset: 100
          })
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/AdjustPrice/AddAdjustPrice', name: 'AddAdjustPrice', fullPath: '/AdjustPrice/AddAdjustPrice', title: 'AddAdjustPrice' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .ERP-container{
    margin-right: 0;
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
  }
</style>
