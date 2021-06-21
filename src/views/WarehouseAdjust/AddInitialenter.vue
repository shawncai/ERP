<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">

        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px" >
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('WarehouseAdjust.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" placeholder="请输入入库单主题" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('WarehouseAdjust.enterPersonId')" prop="enterPersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="enterPersonId" placeholder="请选择入库人" style="width: 200px" clearable @focus="handlechoose"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
                <el-form-item :label="$t('WarehouseAdjust.enterDeptId')" prop="enterDeptId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.enterDeptId" placeholder="请选择入库部门" style="width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>

              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('WarehouseAdjust.enterRepositoryId')" prop="enterRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="enterRepositoryId" placeholder="请选择仓库" style="width: 200px" clearable @focus="handlechooseRep"/>
                </el-form-item>
              </el-col>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/><br>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('WarehouseAdjust.summary')" prop="summary" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.summary" :placeholder="$t('update4.qsrzy')" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--入库单明细-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px; margin-bottom: 20px">

        <div ref="fuzhu" class="form-name">{{ $t('updates.rkdmx') }}</div>
        <div class="buttons" style="margin-top: 58px">
          <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <el-button type="warning" @click="exportExcel">{{ $t('updates.drsj') }}</el-button>
          <input v-show="false" ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">

        </div>
        <my-detail :control.sync="control" :checklist.sync="checklist" @product="productdetail"/>
        <div class="container">
          <el-editable
            ref="editable"
            :key="tableKey"
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
            <el-editable-column :edit-render="{name: 'ElSelect', type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable style="margin-left: 18px;width: 100%;margin-bottom: 0" @visible-change="updatebatch($event,scope)">
                  <el-option
                    v-for="(item, index) in locationlist"
                    :key="index"
                    :value="item.id"
                    :label="item.locationCode"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <!-- <el-editable-column prop="basicQuantity" align="center" :label="$t('updates.jbel')" width="150px"/> -->
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.rksl')" prop="enterQuantity" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input
                  :ref="scope.row.productCode"
                  v-model.number="scope.row.enterQuantity"
                  style="text-align:center;"
                  @keyup.native.prevent ="mykeyevent(scope.row,scope.$index, $event)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" :label="$t('Hmodule.dj')" prop="price" align="center" width="150px"/>

            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.rkje')" prop="totalMoney" align="center" min-width="170">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  :min="0"
                  v-model="scope.row.totalMoney"/>
              </template>
            </el-editable-column>
            <!-- <el-editable-column :label="$t('updates.rkje')" prop="totalMoney" align="center" width="150px">
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.enterQuantity, scope.row.price) }}</p>
              </template>
            </el-editable-column> -->
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">

        <el-button :loading="saveloding" type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave2()">{{ $t('collectAndPay.lsbc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { getlocation, locationlist } from '@/api/public'
import { addinitialenter } from '@/api/WarehouseAdjust'
import { getdeptlist } from '@/api/BasicSettings'
import MyCreate from './components/MyCreate'
import MyRepository from './components/MyRepository'
import MyDetail from './components/MyDetail'
import XLSX from 'xlsx'

var _that
export default {
  name: 'AddInitialenter',
  components: { MyCreate, MyRepository, MyDetail },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.supplierId)
      if (this.enterRepositoryId === undefined || this.enterRepositoryId === null || this.enterRepositoryId === '') {
        callback(new Error('请选择仓库'))
      } else {
        callback()
      }
    }
    return {
      tableKey: 0,
      loading: false,
      excelData: {
        header: null,
        results: null
      },
      saveloding: false,
      checklist: [],
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 货位数据
      locationlist: [],
      // 部门数据
      depts: [],
      // 入库仓库回显
      enterRepositoryId: this.$store.getters.repositoryName,
      // 入库人回显
      enterPersonId: this.$store.getters.name,
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制经办人选择窗口
      createcontrol: false,
      // 控制商品列表窗口
      control: false,
      // 入库单明细数据
      list2: [],
      // 入库单明细列表规则
      validRules: {
        step: [
          { required: true, message: '请输入流程步骤', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入流转条件', trigger: 'blue' }
        ],
        handlerName: [
          { required: true, message: '请选择步骤处理人', trigger: 'blue' }
        ]
      },
      // 库存入库单信息数据
      personalForm: {
        enterPersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        enterRepositoryId: this.$store.getters.repositoryId,
        enterDeptId: this.$store.getters.deptId,
        countryId: this.$store.getters.useCountry
      },
      repositoryId: this.$store.getters.repositoryId,
      regionId: this.$store.getters.regionId,
      // 库存入库单规则数据
      personalrules: {
        enterRepositoryId: [
          { required: true, validator: validatePass, trigger: 'blue' }
        ],
        enterPersonId: [
          { required: true, message: '请选择入库人', trigger: 'blue' }
        ],
        enterDeptId: [
          { required: true, message: '请选择入库部门', trigger: 'blue' }
        ]
      }
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
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
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
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
      // const loading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })

      console.log('results', results)
      const uploaddata = results.map(item => {
        return {
          productCode: item.物品编号,
          productName: item.物品名称,
          color: item.颜色,
          productType: item.规格型号,
          unit: item.单位,
          enterQuantity: item.入库数量,
          price: item.单价,
          totalMoney: item.入库金额,
          remarks: item.备注,
          typeId: item.规格id,
          basicQuantity: item.基本数量
        }
      })
      console.log('uploaddata', uploaddata)
      this.list2 = uploaddata
      this.tableKey = Math.random()
      // const jsonupload = JSON.stringify(uploaddata)
      // setTimeout(() => {
      //   loading.close()
      // }, 180000)
    },
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    exportExcel() {
      this.$refs['excel-upload-input'].click()
    },
    mykeyevent(row, index, e) {
      const keyCode = e.keyCode || e.which || e.charCode
      const oldvalue = row.enterQuantity
      // arrowdown
      if (keyCode === 40) {
        // 表格ref属性从第四开始
        // this.$refs[row.productCode].blur()
        if (Object.keys(this.$refs).length - 1 === index) {
          index = -1
        }
        this.$refs[Object.keys(this.$refs)[index + 5]].focus()
        // row.enterQuantity = oldvalue + 1
      }
      // arrowup
      if (keyCode === 38) {
        if (Object.keys(this.$refs).length - 1 === index) {
          index = -1
        }
        this.$refs[Object.keys(this.$refs)[index + 3]].focus()
        // row.enterQuantity = oldvalue - 1
      }
    },
    getlist() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    handlesave2() {
      const EnterDetail = this.$refs.editable.getRecords()
      let ll = 1
      console.log('nowlistdata', EnterDetail)
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          ll = 2
        }
      })
      console.log('ll', ll)
      if (ll === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '货位不能为空',
          offset: 100
        })
        return false
      }
      if (EnterDetail.length === 0) {
        // this.$notify.error({
        //   title: 'wrong',
        //   message: this.$t('prompt.mxbbnwk'),
        //   offset: 100
        // })
        // return false
      }
      let l = 1
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.enterQuantity === 0) {
          l = 2
        }
      })
      console.log('l', l)
      if (l === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '入库数量不能为0',
          offset: 100
        })
        return false
      }
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.enterQuantity === null || elem.enterQuantity === '' || elem.enterQuantity === undefined) {
          delete elem.enterQuantity
        }
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        return elem
      })
      const parms = JSON.stringify(EnterDetail)
      this.personalForm.judgeStat = 4
      const parms2 = JSON.stringify(this.personalForm)
      // this.$refs.personalForm.validate((valid) => {
      //   if (valid) {
      addinitialenter(parms2, parms, this.repositoryId, this.regionId).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.$notify({
            title: 'successful',
            message: 'save successful',
            type: 'success',
            offset: 100
          })
          this.restAllForm()
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
      })
      //   } else {
      //     this.$notify.error({
      //       title: 'wrong',
      //       message: 'Information is incomplete',
      //       offset: 100
      //     })
      //     return false
      //   }
      // })
    },
    // 保存操作
    handlesave() {
      this.saveloding = true
      setTimeout(() => {
        const EnterDetail = this.$refs.editable.getRecords()
        let ll = 1
        console.log('nowlistdata', EnterDetail)
        EnterDetail.map(function(elem) {
          return elem
        }).forEach(function(elem) {
          if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined || !elem.locationId) {
            ll = 2
          }
        })
        console.log('ll', ll)
        if (ll === 2) {
          this.$notify.error({
            title: 'wrong',
            message: '货位不能为空',
            offset: 100
          })
          this.saveloding = false
          return false
        }
        if (EnterDetail.length === 0) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.mxbbnwk'),
            offset: 100
          })
          this.saveloding = false
          return false
        }
        let l = 1
        EnterDetail.map(function(elem) {
          return elem
        }).forEach(function(elem) {
          if (elem.enterQuantity === 0) {
            l = 2
          }
        })
        console.log('l', l)
        if (l === 2) {
          this.$notify.error({
            title: 'wrong',
            message: '入库数量不能为0',
            offset: 100
          })
          this.saveloding = false
          return false
        }
        EnterDetail.map(function(elem) {
          return elem
        }).forEach(function(elem) {
          if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
            delete elem.unit
          }
          if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
            elem.basicQuantity = 1
          }
          if (elem.color === null || elem.color === '' || elem.color === undefined) {
            delete elem.color
          }
          if (elem.enterQuantity === null || elem.enterQuantity === '' || elem.enterQuantity === undefined) {
            elem.enterQuantity = 1
          }
          if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
            delete elem.locationId
          }
          if (elem.price === null || elem.price === '' || elem.price === undefined) {
            delete elem.price
          }
          if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
            delete elem.productCode
          }
          if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
            delete elem.productName
          }
          if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
            delete elem.remarks
          }
          if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
            delete elem.totalMoney
          }
          if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
            delete elem.typeId
          }
          if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
            delete elem.typeId
          }
          return elem
        })
        const parms = JSON.stringify(EnterDetail)
        const parms2 = JSON.stringify(this.personalForm)

        this.$refs.personalForm.validate((valid) => {
          if (valid) {
            addinitialenter(parms2, parms, this.repositoryId, this.regionId).then(res => {
              console.log(res)
              if (res.data.ret === 200) {
                this.$notify({
                  title: 'successful',
                  message: 'save successful',
                  type: 'success',
                  offset: 100
                })
                this.restAllForm()
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
            return false
          }
          this.saveloding = false
        })
      }, 0.5 * 1000)
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        enterPersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        enterRepositoryId: this.$store.getters.repositoryId,
        enterDeptId: this.$store.getters.deptId,
        countryId: this.$store.getters.useCountry
      }
      this.enterRepositoryId = this.$store.getters.repositoryName
      this.enterPersonId = this.$store.getters.name
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/WarehouseAdjust/NewWarehouseAdjust', name: 'NewWarehouseAdjust', fullPath: '/WarehouseAdjust/NewWarehouseAdjust', title: 'NewWarehouseAdjust' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 入库人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 员工列表返回经办人数据
    createname(val) {
      console.log(val)
      this.enterPersonId = val.personName
      this.personalForm.enterPersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.enterRepositoryId = val.repositoryName
      this.personalForm.enterRepositoryId = val.id
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
        this.locationlist = []
        console.log(this.personalForm.enterRepositoryId)
        if (this.personalForm.enterRepositoryId === undefined || this.personalForm.countRepositoryId === '') {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.sqslcg'),
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.enterRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
            } else if (res.data.data.content.length === 0) {
              locationlist(this.personalForm.enterRepositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content.list
                }
              })
            }
          }
        })
      }
    },
    // 入库单事件
    // 新增入库单明细
    handleAddproduct() {
      console.log('this.personalForm.enterRepositoryId', this.personalForm.enterRepositoryId)
      if (this.enterRepositoryId === null || this.enterRepositoryId === '' || this.enterRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzck'),
          offset: 100
        })
        return false
      } else {
        this.control = true
        this.checklist = this.$refs.editable.getRecords()
      }
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()

      console.log(nowlistdata)
      var ret4 = val.findIndex((value, index, arr) => {
        return value.productCode === this.personalForm.productCode
      })

      console.log(ret4)
      this.list2 = val.filter(item => {
        return item.productCode !== this.personalForm.productCode
      })
    },
    // 入库金额计算
    getSize(quan, pric) {
      return quan * pric
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
