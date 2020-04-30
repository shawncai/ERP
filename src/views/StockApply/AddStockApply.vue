<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card :body-style="{ padding: '5px' }" class="box-card" shadow="never">
        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('inventorydetaillist.repositoryName')" prop="applyRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="applyRepositoryId" size="mini" style="margin-left: 18px;width:200px" clearable @focus="handlechooseRep"/>
                  <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockApply.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="personalForm.title" size="mini" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockApply.stockType')" prop="stockType" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-select v-model="personalForm.stockType" size="mini" style="margin-left: 18px;width: 200px" @focus="updatecountry">
                    <el-option
                      v-for="(item, index) in types"
                      :key="index"
                      :label="item.categoryName"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockApply.applyPersonId')" prop="applyPersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-input v-model="applyPersonId" size="mini" style="margin-left: 18px;width:200px" @focus="handlechooseStock"/>
                  <my-emp :control.sync="stockControl" @stockName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockApply.applyDeptId')" prop="applyDeptId" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-select v-model="personalForm.applyDeptId" size="mini" style="margin-left: 18px;width:200px" @change="change()">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockApply.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-select v-model="personalForm.sourceType" size="mini" style="margin-left: 18px;width: 200px" @change="chooseSourceType">
                    <el-option value="1" label="无来源" />
                    <!-- <el-option value="2" label="销售计划" />
                    <el-option value="3" label="采购需求" /> -->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockApply.applyDate')" prop="applyDate" style="margin-left: 18px;width: 100%;margin-bottom: 0;">
                  <el-date-picker
                    v-model="personalForm.applyDate"
                    :picker-options="pickerOptions1"
                    type="date"
                    size="mini"
                    default-value
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width:200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息123-->
      <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 15px" shadow="never">
        <div ref="fuzhu" class="form-name" >{{ $t('updates.cgsqdmxly') }}</div>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button :disabled="Isproduct" size="mini" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail :control.sync="control" @product="productdetail" @product2="productdetail2"/>
          <el-button type="danger" size="mini" @click="deleteEdit">{{ $t('Hmodule.delete') }}</el-button>
          <el-button type="primary" size="mini" @click="checkStock()">{{ $t('updates.kckz') }}</el-button>
        </div>
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
            style="width: 100%"
            @selection-change="deleteChange">
            <el-editable-column type="selection" fixed="left" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" fixed="left" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" fixed="left" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" fixed="left" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" fixed="left" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" fixed="left" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0.00, precision: 2}, type: 'visible', events: {change: changeDate2}}" :label="$t('Hmodule.xqsl')" prop="requireQuantity" align="center" min-width="150px"/> -->
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.xqsl')" prop="requireQuantity" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="false"
                  :min="1.00"
                  v-model="scope.row.requireQuantity"
                  size="mini"
                  @change="queryStock(scope.row, scope)"
                />
              </template>
            </el-editable-column>

            <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd'}, type: 'visible'}" :label="$t('updates.xqrq')" prop="requireDate" align="center" min-width="160px">
              <template slot="edit" slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.requireDate"
                  :picker-options="pickerOptions1"
                  type="date"
                  size="mini"
                  value-format="yyyy-MM-dd"
                  @change="changeDate2(scope.row, scope)"/>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.sqyy')" prop="applyReason" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <el-card :body-style="{ padding: '5px' }" class="box-card" style="margin-top: 15px" shadow="never">
        <div ref="fuzhu" class="form-name" >{{ $t('updates.cgsqdmx') }}</div>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list3"
            :edit-config="{ showIcon: false, showStatus: true}"
            :edit-rules="validRules"
            :summary-method="getSummaries"
            show-summary
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElDatePicker', attrs: {type: 'date', format: 'yyyy-MM-dd', disable: 'true'},}" :label="$t('updates.xqrq')" prop="requireDate" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.requireDate"
                  disabled
                  type="date"
                  size="mini"
                  value-format="yyyy-MM-dd"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.sqsl')" prop="applyQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.xqsl')" prop="requireQuantity" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {precision: 2}}" :label="$t('updates.yxdsl')" prop="planQuantity" align="center" min-width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  v-model="scope.row.planQuantity"
                  size="mini"
                  disabled/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" min-width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index:2000;">
        <el-button v-no-more-click :loading="canClick" type="primary" size="mini" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" size="mini" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
      <el-dialog :visible.sync="receiptVisible2" title="库存快照" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                :data="list111"
                height="220"
                style="width: 100%;"
              >
                <el-table-column :resizable="false" :label="$t('updates.cangk')" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span >{{ scope.row.repositoryName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :resizable="false" :label="$t('updates.spmc')" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span >{{ scope.row.productName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :resizable="false" label="可用库存量" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span >{{ scope.row.ableStock }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { countlist } from '@/api/public'
import { addstockapply } from '@/api/StockApply'
import { getdeptlist } from '@/api/BasicSettings'
import { searchStockCategory } from '@/api/StockCategory'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import MyOrder from './components/MyOrder'
import MyRequire from './components/MyRequire'
import { getMaterialsByApply } from '@/api/MaterialsList'
import MyRepository from './components/MyRepository'
var _that
export default {
  name: 'AddStockApply',
  components: { MyRepository, MyOrder, MyDetail, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.applyPersonId)
      if (this.applyPersonId === undefined || this.applyPersonId === null || this.applyPersonId === '') {
        callback(new Error('请选择申请人'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(this.personalForm.applyDeptId)
      if (this.personalForm.applyDeptId === undefined || this.personalForm.applyDeptId === null || this.personalForm.applyDeptId === '') {
        callback(new Error('请选择申请部门'))
      } else {
        callback()
      }
    }
    const validatePass6 = (rule, value, callback) => {
      console.log(this.planRepositoryId)
      if (this.applyRepositoryId === undefined || this.applyRepositoryId === null || this.applyRepositoryId === '') {
        callback(new Error('请选择采购仓库'))
      } else {
        callback()
      }
    }
    return {
      requirecontrol: false,
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      applyRepositoryId: '',
      repositorycontrol: false,
      // 网络卡顿
      canClick: false,
      // 暂存数据
      changedata: [],
      // 控制源单数据
      ordercontrol: false,
      // 控制是否可以从商品选择
      Isproduct: false,
      // 控制是否可以从源单选择
      IsSourceNumber: true,
      // 选择的数据
      choosedata: [],
      // 部门数据
      depts: [],
      // 申请人回显
      applyPersonId: this.$store.getters.name,
      // 控制申请人
      stockControl: false,
      // 类别数据
      types: [],
      // 类别获取参数
      typeparms: {
        pagenum: 1,
        pagesize: 99999
      },
      // 控制商品列表窗口
      control: false,
      // 采购申请单信息数据
      personalForm: {
        applyPersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        applyDeptId: this.$store.getters.deptId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        applyDate: null
      },
      // 采购申请单规则数据
      personalrules: {
        applyRepositoryId: [
          { required: true, validator: validatePass6, trigger: 'change' }
        ],
        applyPersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        stockType: [
          { required: true, message: '请选择采购类别', trigger: 'change' }
        ],
        applyDate: [
          { required: true, message: '请选择申请日期', trigger: 'change' }
        ],
        applyDeptId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ]
      },
      // 采购申请单明细数据
      list2: [],
      // 采购申请明细
      list3: [],
      // 采购申请单明细列表规则
      validRules: {
        requireQuantity: [
          { required: true, message: '请输入需求数量', trigger: 'change' }
        ],
        requireDate: [
          { required: true, message: '请选择需求日期', trigger: 'change' }
        ]
      },
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: []
    }
  },
  created() {
    this.getTypes()
    this.getdatatime()
  },

  mounted() {
    this.getinformation()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 总计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return (prev).toFixed(2)
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = ''
        }
      })
      sums[2] = ''
      sums[3] = ''
      sums[4] = ''
      sums[5] = ''
      sums[6] = ''
      sums[10] = ''
      return sums
    },
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.applyRepositoryId = val.repositoryName
      this.personalForm.applyRepositoryId = val.id
    },
    copydate(row) {
      if (row.requireDate === '' || row.requireDate === null || row.requireDate === undefined) {
        return false
      }
      for (let i = 0; i < this.list2.length; i++) {
        this.list2[i].temp = i
      }
      for (let i = row.temp; i < this.list2.length; i++) {
        console.log(this.list2[i].requireDate)
        if (this.list2[i].requireDate !== null && this.list2[i].requireDate !== '' && this.list2[i].requireDate !== undefined) {
          console.log(111)
          continue
        } else {
          console.log(222)
          this.list2[i].requireDate = row.requireDate
        }
      }
      console.log(row)
    },
    checkStock(row) {
      console.log('this.moreaction.length', this.moreaction.length)
      if (this.moreaction.length > 1 || this.moreaction.length === 0) {
        this.$message.error('请选择单个商品')
      } else {
        countlist(this.$store.getters.repositoryId, this.$store.getters.regionId, this.moreaction[0].productCode).then(res => {
          console.log(res)
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content.list)
            this.list111 = res.data.data.content.list
            this.receiptVisible2 = true
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }
    },
    getinformation() {
      if (this.$store.getters.empcontract) {
        this.personalForm.sourceType = '2'
        this.Isproduct = false
        this.IsSourceNumber = false
        this.personalForm.applyPersonId = this.$store.getters.empcontract.salePersonId
        this.applyPersonId = this.$store.getters.empcontract.salePersonName
        console.log('getempcontract', this.$store.getters.empcontract)
        for (let i = 0; i < this.$store.getters.empcontract.saleOrderDetailVos.length; i++) {
          this.$store.getters.empcontract.saleOrderDetailVos[i].typeId = this.$store.getters.empcontract.saleOrderDetailVos[i].productType
          this.$store.getters.empcontract.saleOrderDetailVos[i].requireQuantity = this.$store.getters.empcontract.saleOrderDetailVos[i].quantity
          this.$store.getters.empcontract.saleOrderDetailVos[i].productType = this.$store.getters.empcontract.saleOrderDetailVos[i].productTypeName
          this.$store.getters.empcontract.saleOrderDetailVos[i].planQuantity = this.$store.getters.empcontract.saleOrderDetailVos[i].quantity
          this.$store.getters.empcontract.saleOrderDetailVos[i].sourceNumber = this.$store.getters.OrderNumber
          this.$store.getters.empcontract.saleOrderDetailVos[i].sourceSerialNumber = this.$store.getters.empcontract.saleOrderDetailVos[i].id
          this.$store.getters.empcontract.saleOrderDetailVos[i].applyQuantity = this.$store.getters.empcontract.saleOrderDetailVos[i].quantity
          this.$refs.editable.insert(this.$store.getters.empcontract.saleOrderDetailVos[i])
        }
        for (let i = 0; i < this.$store.getters.empcontract.saleOrderDetailVos.length; i++) {
          this.$store.getters.empcontract.saleOrderDetailVos[i].planQuantity = '0.00'
          this.$refs.editable2.insert(this.$store.getters.empcontract.saleOrderDetailVos[i])
        }
        this.$store.dispatch('getempcontract', '')
      }
    },
    // 控制不同源单类型
    chooseSourceType(val) {
      if (val === '1') {
        this.Isproduct = false
        this.IsSourceNumber = true
      } else if (val === '2') {
        this.Isproduct = false
        this.IsSourceNumber = false
        const ceshi2 = this.$refs.editable2.getRecords()
        console.log(ceshi2)
        for (let i = 0; i < ceshi2.length; i++) {
          if (ceshi2[i].sourceSerialNumber !== '' && ceshi2[i].sourceSerialNumber !== null && ceshi2[i].sourceSerialNumber !== undefined) {
            this.$refs.editable2.remove(ceshi2[i])
          }
        }
        const ceshi = this.$refs.editable.getRecords()
        console.log(ceshi)
        for (let i = 0; i < ceshi.length; i++) {
          if (ceshi[i].sourceSerialNumber !== '' && ceshi[i].sourceSerialNumber !== null && ceshi[i].sourceSerialNumber !== undefined) {
            this.$refs.editable.remove(ceshi[i])
          }
        }
      }
    },
    // 从源单添加商品
    handleAddSource() {
    },
    // 从销售订单过来数据
    saleOrderDetail(val) {
      console.log(val)
      this.$refs.editable.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
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
    saleOrderDetail2(val) {
      console.log(val)
      this.$refs.editable2.clear()
      const nowlistdata = this.$refs.editable2.getRecords()
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < nowlistdata.length; j++) {
          if (val[i].sourceNumber === nowlistdata[j].sourceNumber) {
            this.$notify.error({
              title: 'wrong',
              message: this.$t('prompt.wpytj'),
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable2.insert(val[i])
      }
    },
    saleOrder(val) {
      console.log(val)
      this.personalForm.applyPersonId = val.salePersonId
      this.applyPersonId = val.salePersonName
    },
    // 两表联动
    changeDate(scope, value) {
      console.log(scope)
      scope.row.applyQuantity = (scope.row.requireQuantity).toFixed(2)
      this.$refs.editable2.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < nowlistdata.length; i++) {
        this.$refs.editable2.insert(nowlistdata[i])
      }
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    queryStock(row, scope) {
      if (row !== '' && row !== null && row !== undefined && scope.$index === 0) {
        if (row.requireQuantity !== '' && row.requireQuantity !== null && row.requireQuantity !== undefined) {
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].temp = i
          }
          for (let i = row.temp; i < this.list2.length; i++) {
            console.log(this.list2[i].requireDate)
            if (this.list2[i].requireQuantity !== null && this.list2[i].requireQuantity !== 1 && this.list2[i].requireQuantity !== '' && this.list2[i].requireQuantity !== undefined) {
              // this.list2[i].requireDate = row.requireDate
              // this.list2[i].requireQuantity = row.requireQuantity
            } else {
              console.log(222)
              // this.list2[i].requireDate = row.requireDate
              this.list2[i].requireQuantity = row.requireQuantity
            }
          }
          console.log(row)
        }
      }
      this.changeDate2()
    },

    // 两表联动
    async changeDate2(row, scope) {
      if (row !== '' && row !== null && row !== undefined && scope.$index === 0) {
        if (row.requireDate !== '' && row.requireDate !== null && row.requireDate !== undefined) {
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].temp = i
          }
          for (let i = row.temp; i < this.list2.length; i++) {
            console.log(this.list2[i].requireDate)
            if (this.list2[i].requireDate !== null && this.list2[i].requireDate !== 1 && this.list2[i].requireDate !== '' && this.list2[i].requireDate !== undefined) {
              // this.list2[i].requireDate = row.requireDate
            } else {
              console.log(222)
              // this.list2[i].requireDate = row.requireDate
              this.list2[i].requireDate = row.requireDate
            }
          }
          console.log(row)
        }
      }
      const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
      for (let i = 0; i < this.list2.length; i++) {
        if (EnterDetail[i].requireQuantity === '' || EnterDetail[i].requireQuantity === null || EnterDetail[i].requireQuantity === undefined || EnterDetail[i].requireDate === '' || EnterDetail[i].requireDate === null || EnterDetail[i].requireDate === undefined) {
          return false
        }
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      console.log('row', row)
      console.log('scope', scope)
      // 新加
      if (row !== '' && row !== null && row !== undefined && scope.$index === 0) {
        if (row.requireDate !== '' && row.requireDate !== null && row.requireDate !== undefined) {
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].temp = i
          }
          for (let i = row.temp; i < this.list2.length; i++) {
            console.log(this.list2[i].requireDate)
            if (this.list2[i].requireDate !== null && this.list2[i].requireDate !== '' && this.list2[i].requireDate !== undefined) {
              this.list2[i].requireDate = row.requireDate
              // this.list2[i].requireQuantity = row.requireQuantity
            } else {
              console.log(222)
              this.list2[i].requireDate = row.requireDate
              // this.list2[i].requireQuantity = row.requireQuantity
            }
          }
          console.log(row)
        }
      }
      // 新加截止
      this.$refs.editable2.clear()
      const nowlistdata = this.deepClone(this.$refs.editable.getRecords())
      const newArr = []
      console.log('nowlistdata', nowlistdata)
      nowlistdata.forEach(el => {
        console.log('el', el)
        const result = newArr.findIndex(ol => { return el.requireDate === ol.requireDate && el.productCode === ol.productCode })
        console.log('result', result)
        if (result !== -1) {
          if (el.requireDate !== null && el.requireDate !== '' && el.requireDate !== undefined) {
            newArr[result].requireQuantity = newArr[result].requireQuantity + el.requireQuantity
          } else {
            newArr.push(el)
          }
        } else {
          newArr.push(el)
        }
      })
      console.log('newArr', newArr)
      const result2 = newArr.map(function(item, index) {
        return {
          productCode: item.productCode,
          productName: item.productName,
          typeId: item.typeId,
          color: item.color,
          unit: item.unit,
          productType: item.productType,
          planQuantity: item.planQuantity,
          sourceSerialNumber: item.sourceSerialNumber,
          requireDate: item.requireDate,
          applyQuantity: Number(item.requireQuantity).toFixed(2)
        }
      })
      console.log('result2', result2)
      const myeditable2 = []
      for (let i = 0; i < result2.length; i++) {
        // if (result2[i].productCode.substring(0, 2) === '01') {
        const list = await getMaterialsByApply(result2[i].productCode, this.personalForm.applyRepositoryId, (Number(result2[i].applyQuantity) - Number(result2[i].planQuantity)))
        console.log('list122', list.data.data.content)
        if (list.data.data.content.length > 0) {
          console.log('list', list.data.data.content)
          const list2 = list.data.data.content
          for (let j = 0; j < list2.length; j++) {
            list2[j].basicPrice = 0
            list2[j].applyQuantity = (Number(list2[j].requireQuantity)).toFixed(2)
            list2[j].requireQuantity = (Number(list2[j].planQuantity)).toFixed(2)
            list2[j].planQuantity = 0
            list2[j].requireDate = result2[i].requireDate
            list2[j].sourceSerialNumber = result2[i].sourceSerialNumber
            list2[j].requireDate = result2[i].requireDate
            // - val.alre
            const result = myeditable2.findIndex(ol => { return list2[j].requireDate === ol.requireDate && list2[j].productCode === ol.productCode })
            console.log('result', result)
            if (result !== -1) {
              console.log('(Number(myeditable2[result].applyQuantity)).toFixed(2)', (Number(myeditable2[result].applyQuantity)))
              console.log('list2[j].applyQuantity', (Number(list2[j].applyQuantity)))
              myeditable2[result].applyQuantity = (Number(myeditable2[result].applyQuantity)) + (Number(list2[j].applyQuantity))
            } else {
              myeditable2.push(list2[j])
            }
            // this.$refs.editable2.insert(list2[j])
          }
        } else {
          // result2[i].planQuantity = (Number(result2[i].applyQuantity) - Number(result2[i].planQuantity)).toFixed(2)
          result2[i].requireQuantity = result2[i].applyQuantity
          result2[i].planQuantity = 0
          const result = myeditable2.findIndex(ol => { return result2[i].requireDate === ol.requireDate && result2[i].productCode === ol.productCode })
          console.log('result', result)
          if (result !== -1) {
            console.log('(Number(myeditable2[result].applyQuantity)).toFixed(2)', (Number(myeditable2[result].applyQuantity)))
            console.log('list2[j].applyQuantity', (Number(result2[i].applyQuantity)))
            myeditable2[result].applyQuantity = (Number(myeditable2[result].applyQuantity)) + (Number(result2[i].applyQuantity))
          } else {
            myeditable2.push(result2[i])
          }
        }
        console.log('myeditable2', myeditable2)
        // } else {
        //   // result2[i].planQuantity = (Number(result2[i].applyQuantity) - Number(result2[i].planQuantity)).toFixed(2)
        //   this.$refs.editable2.insert(result2[i])
        // }
      }
      this.list3 = myeditable2
      loading.close()
    },
    getdatatime() { // 默认显示今天
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      this.personalForm.applyDate = currentdate
    },
    // 删除数据
    deleteEdit() {
      this.$refs.editable.removeSelecteds()
      this.changeDate2()
    },
    deleteChange(val) {
      this.moreaction = val
      this.choosedata = val
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
    },
    // 更新类型
    updatecountry() {
      this.getTypes()
    },
    getTypes() {
      // 采购类别数据
      searchStockCategory(this.typeparms).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 申请人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 申请人回显
    stockName(val) {
      console.log(val)
      this.applyPersonId = val.personName
      this.personalForm.applyPersonId = val.id
      this.personalForm.applyDeptId = val.deptId
    },
    // 采购申请明细来源
    handleAddproduct() {
      if (this.applyRepositoryId === null || this.applyRepositoryId === '' || this.applyRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzckck'),
          offset: 100
        })
        return false
      }
      this.control = true
    },
    productdetail(val) {
      console.log(val)
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    productdetail2(val) {
      console.log(val)
      // for (let i = 0; i < val.length; i++) {
      //   this.$refs.editable2.insert(val[i])
      // }
      this.changeDate2()
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        applyPersonId: this.$store.getters.userId,
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        applyDeptId: this.$store.getters.deptId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        applyDate: null
      }
      this.applyPersonId = this.$store.getters.name
      this.applyRepositoryId = ''
      this.getdatatime()
    },
    // 保存操作
    handlesave() {
      this.canClick = true
      const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
      const EnterDetail2 = this.deepClone(this.$refs.editable2.getRecords())
      for (let i = 0; i < EnterDetail.length; i++) {
        for (let j = 0; j < EnterDetail2.length; j++) {
          if (EnterDetail[i].productCode === EnterDetail2[j].productCode && EnterDetail[i].requireDate === EnterDetail2[j].requireDate) {
            EnterDetail[i].applyQuantity = EnterDetail2[j].applyQuantity
            EnterDetail[i].planQuantity = EnterDetail2[j].planQuantity
            break
          }
        }
      }
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      EnterDetail2.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          elem.basicQuantity = 0
        }
        if (elem.requireQuantity === null || elem.requireQuantity === '' || elem.requireQuantity === undefined) {
          elem.requireQuantity = 0
        }
        if (elem.applyQuantity === null || elem.applyQuantity === '' || elem.applyQuantity === undefined) {
          delete elem.applyQuantity
        }
        if (elem.requireDate === null || elem.requireDate === '' || elem.requireDate === undefined) {
          delete elem.requireDate
        }
        if (elem.applyReason === null || elem.applyReason === '' || elem.applyReason === undefined) {
          delete elem.applyReason
        }
        if (elem.planQuantity === null || elem.planQuantity === '' || elem.planQuantity === undefined) {
          elem.planQuantity = 0
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail2)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
        if (key === 'judgeStat') {
          delete Data[key]
        }
      }
      console.log('judgeStat', Data.judgeStat)
      for (const key in this.personalForm) {
        if (key === 'judgeStat') {
          delete this.personalForm[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            addstockapply(parms, parms2, this.personalForm).then(res => {
              console.log(res)
              if (res.data.ret === 200) {
                this.canClick = false
                this.$notify({
                  title: 'successful',
                  message: 'save successful',
                  type: 'success',
                  offset: 100
                })
                this.restAllForm()
                this.$refs.editable.clear()
                this.$refs.editable2.clear()
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
          }).catch(valid => {
            console.log('error submit!!')
          })
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
      const view = { path: '/StockApply/AddStockApply', name: 'AddStockApply', fullPath: '/StockApply/AddStockApply', title: 'AddStockApply' }
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
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
    }
    .container{
      margin-top: 40px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
<style rel="stylesheet/css" scoped>
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
