<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" placeholder="请输入入库单主题" clearable style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" placeholder="请选择源单类型" style="margin-left: 18px;width: 200px">
                    <el-option value="1" label="采购到货单" />
                    <el-option value="2" label="采购订单" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterRepositoryId')" prop="enterRepositoryId" style="width: 100%;">
                  <el-input v-model="enterRepositoryId" placeholder="请选择入库仓库" style="margin-left: 18px;width: 200px" @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item label="源单编号" prop="sourceNumber" style="width: 100%;">
                  <el-input v-model="personalForm.sourceNumber" placeholder="请选择源单编号" style="margin-left: 18px;width: 200px" @focus="handleAddSouce"/>
                </el-form-item>
                <my-arrival :arrivalcontrol.sync="arrivalcontrol" @arrival="arrival" @allarrivalinfo="allarrivalinfo"/>
                <my-order :ordercontrol.sync="ordercontrol" :supp.sync="supp" @order="order" @allOrderinfo="allOrderinfo"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.supplierId')" style="width: 100%;">
                  <el-input v-model="supplierId" :disabled="IssupplierId" placeholder="请选择供应商" style="margin-left: 18px;width: 200px" @focus="handlechoose"/>
                </el-form-item>
                <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.stockPersonId')" style="width: 100%;">
                  <el-input v-model="stockPersonId" placeholder="请选择采购员" clearable style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                </el-form-item>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.stockDeptId')" style="width: 100%;">
                  <el-select v-model="personalForm.stockDeptId" placeholder="请选择采购部门" style="margin-left: 18px;width: 200px" @focus="updatedept" @change="change()">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.deliveryPersonId')" style="width: 100%;">
                  <el-input v-model="deliveryPersonId" placeholder="请选择交货人" style="margin-left: 18px;width: 200px" @focus="handlechooseDelivery"/>
                </el-form-item>
                <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.acceptPersonId')" style="width: 100%;">
                  <el-input v-model="acceptPersonId" placeholder="请选择验收人" style="margin-left: 18px;width: 200px" @focus="handlechooseAccept"/>
                </el-form-item>
                <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterDeptId')" style="width: 100%;">
                  <el-select v-model="personalForm.enterDeptId" placeholder="请选择入库部门" clearable style="margin-left: 18px;width: 200px" @focus="updatedept">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterPersonId')" prop="enterPersonId" style="width: 100%;">
                  <el-input v-model="enterPersonId" placeholder="请选择入库人" style="margin-left: 18px;width: 200px" @focus="handlechooseEnter"/>
                </el-form-item>
                <my-emp2 :entercontrol.sync="entercontrol" @enterName="enterName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterDate')" prop="enterDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.enterDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--入库单明细-->
      <el-card class="box-card" shadow="never" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">{{ $t('updates.rkdmx') }}</h2>
        <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <el-button type="primary" @click="checkStock()">{{ $t('updates.kckz') }}</el-button>
        </div>
        <my-detail :control.sync="control" @product="productdetail"/>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            stripe
            border
            size="medium"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" width="55" fixed align="center"/>
            <el-editable-column type="index" align="center" fixed label="编号" width="150px" />
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed align="center" width="150px"/>
            <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px">
              <!--              <template slot="edit" slot-scope="scope">-->
              <!--                <el-select v-model="scope.row.locationCode" :value="scope.row.locationCode" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">-->
              <!--                  <el-option-->
              <!--                    v-for="item in locationlist"-->
              <!--                    :key="item.id"-->
              <!--                    :value="item.locationCode"-->
              <!--                    :label="item.locationCode"/>-->
              <!--                </el-select>-->
              <!--              </template>-->
              <template slot-scope="scope">
                <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                  <el-option
                    v-for="item in locationlist"
                    :key="item.id"
                    :value="item.id"
                    :label="item.locationCode"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.yssli')" prop="basicQuantity" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible', attrs: {min: 0.00, precision: 2, controls:false}}" :label="$t('updates.rksl')" prop="actualEnterQuantity" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.rkdj')" prop="enterPrice" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.sl')" prop="taxRate" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.rkje')" prop="enterMoney" align="center" width="150px">
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.actualEnterQuantity, scope.row.enterPrice) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isEdit4(scope.row)" v-model="scope.row.batteryCode" clearable @blur="getInfo2(scope.row)"/>
                <span v-else>{{ scope.row.batteryCode }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!-- 合计信息 -->
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.heji')" style="width: 100%;">
                  <el-input v-model="heji1" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
      <el-dialog :visible.sync="receiptVisible2" title="库存快照" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
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
import { addstockenter } from '@/api/Stockenter'
import { getdeptlist } from '@/api/BasicSettings'
import { getlocation, locationlist, countlist } from '@/api/public'
import MyRepository from './components/MyRepository'
import MySupplier from './components/MySupplier'
import MyEmp from './components/MyEmp'
import MyDelivery from './components/MyDelivery'
import MyAccept from './components/MyAccept'
import MyDetail from './components/MyDetail'
import MyArrival from './components/MyArrival'
import MyOrder from './components/MyOrder'
import MyEmp2 from './components/MyEmp2'
import MyLnquiry from '../StockArrival/components/MyLnquiry'
var _that
export default {
  name: 'Addstockenter',
  components: { MyOrder, MyEmp2, MyArrival, MyRepository, MySupplier, MyEmp, MyDelivery, MyAccept, MyDetail },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(this.sourceNumber)
      if (this.personalForm.sourceNumber === undefined || this.personalForm.sourceNumber === null || this.personalForm.sourceNumber === '') {
        callback(new Error('请选择源单编号'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(this.enterRepositoryId)
      if (this.personalForm.enterRepositoryId === undefined || this.personalForm.enterRepositoryId === null || this.personalForm.enterRepositoryId === '') {
        callback(new Error('请选择入库仓库'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(this.enterPersonId)
      if (this.personalForm.enterPersonId === undefined || this.personalForm.enterPersonId === null || this.personalForm.enterPersonId === '') {
        callback(new Error('请选择采购类别'))
      } else {
        callback()
      }
    }
    // const validatePass4 = (rule, value, callback) => {
    //   console.log(value)
    //   if (value > this.mid || value === 0 || value === null || value === undefined) {
    //     callback(new Error('计划数量不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      ordercontrol: false,
      // 合计
      heji1: '',
      // 中转
      mid: null,
      // 控制供应商不可以编辑
      IssupplierId: false,
      // 控制采购到货单
      arrivalcontrol: false,
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 货位数据
      locationlist: [],
      // 明细表控制框
      control: false,
      // 验收人回显
      acceptPersonId: this.$store.getters.name,
      // 验收人控制框
      accetpcontrol: false,
      // 交货人回显
      deliveryPersonId: '',
      // 交货人控制框
      deliverycontrol: false,
      // 部门数据
      depts: [],
      // 采购员控制框
      stockControl: false,
      // 入库员控制框
      entercontrol: false,
      // 采购员回显
      stockPersonId: '',
      // 入库员回显
      enterPersonId: this.$store.getters.name,
      // 供货商回显
      supplierId: '',
      // 供货商控制
      empcontrol: false,
      // 入库仓库回显
      enterRepositoryId: this.$store.getters.repositoryName,
      // 仓库选择控制期
      repositorycontrol: false,
      // 入库单明细数据
      list2: [],
      // 入库单明细列表规则
      validRules: {
        // actualEnterQuantity: [
        //   { required: true, validator: validatePass4, trigger: 'blur' }
        // ],
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
      // 采购入库信息数据
      personalForm: {
        enterDate: null,
        repositoryId: this.$store.getters.repositoryId,
        enterRepositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        createPersonId: this.$store.getters.userId,
        enterPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        acceptPersonId: this.$store.getters.userId,
        sourceType: '1'
      },
      // 个人信息规则数据
      personalrules: {
        sourceNumber: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        enterRepositoryId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        isHot: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        countryId: [
          { required: true, message: '请选择国家', trigger: 'change' }
        ],
        inquiryDate: [
          { required: true, message: '请选择询价日期', trigger: 'change' }
        ],
        enterDate: [
          { required: true, message: '请选择入库日期', trigger: 'change' }
        ],
        enterPersonId: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ]
      },
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: []
    }
  },
  watch: {
    list2: {
      handler(oldval, newval) {
        let num = 0
        for (const i in this.list2) {
          console.log(this.list2[i].actualEnterQuantity)
          num += this.list2[i].actualEnterQuantity
        }
        this.heji1 = num
        // console.log(num)
      },
      deep: true
    }
  },

  mounted() {
    this.getlist()
    this.getdatatime()
    this.getinformation()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    order(val) {
      console.log('ssssss', val)
      for (let i = 0; i < val.length; i++) {
        // val[i].arrivalQuantity = (val[i].stockQuantity - val[i].allarrivalQuantity + val[i].returnQuantity).toFixed(2)
        val[i].actualEnterQuantity = (val[i].basicQuantity - val[i].actualArrivalQuantity).toFixed(2)
        this.$refs.editable.insert(val[i])
      }
    },
    allOrderinfo(val) {
      this.personalForm.enterRepositoryId = val.stockRepositoryId
      this.enterRepositoryId = val.stockRepositoryName
      this.personalForm.sourceNumber = val.orderNumber
      this.personalForm.supplierId = val.supplierId
      this.supplierId = val.supplierName
      this.personalForm.stockPersonId = val.stockPersonId
      this.stockPersonId = val.stockPersonName
      this.personalForm.stockTypeId = val.stockTypeId
    },
    // 判断整车或者电池
    isEdit4(row) {
      console.log('222', row)
      const re = row.productCode.slice(0, 2)
      if (re === '01' || re === '05') { return true } else { return false }
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
    // 批量操作
    handleSelectionChange(val) {
      this.moreaction = val
    },
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.allarrivalinfo(this.$store.getters.empcontract)
        for (let i = 0; i < this.$store.getters.empcontract.stockArrivalDetailVos.length; i++) {
          this.$store.getters.empcontract.stockArrivalDetailVos[i].productType = this.$store.getters.empcontract.stockArrivalDetailVos[i].typeName
          this.$store.getters.empcontract.stockArrivalDetailVos[i].typeName = this.$store.getters.empcontract.stockArrivalDetailVos[i].productType
          this.$store.getters.empcontract.stockArrivalDetailVos[i].basicQuantity = (Number(this.$store.getters.empcontract.stockArrivalDetailVos[i].arrivalQuantity) - Number(this.$store.getters.empcontract.stockArrivalDetailVos[i].hadStorageQuantity)).toFixed(2)
          this.$store.getters.empcontract.stockArrivalDetailVos[i].actualEnterQuantity = (Number(this.$store.getters.empcontract.stockArrivalDetailVos[i].arrivalQuantity) - Number(this.$store.getters.empcontract.stockArrivalDetailVos[i].hadStorageQuantity)).toFixed(2)
          this.$store.getters.empcontract.stockArrivalDetailVos[i].enterPrice = (this.$store.getters.empcontract.stockArrivalDetailVos[i].includeTaxPrice)
          this.$store.getters.empcontract.stockArrivalDetailVos[i].taxRate = (this.$store.getters.empcontract.stockArrivalDetailVos[i].taxRate).toFixed(2)
          this.$store.getters.empcontract.stockArrivalDetailVos[i].enterMoney = '0.00'
          this.$store.getters.empcontract.stockArrivalDetailVos[i].remarks = ''
          this.$store.getters.empcontract.stockArrivalDetailVos[i].sourceSerialNumber = this.$store.getters.empcontract.stockArrivalDetailVos[i].id
          this.$store.getters.empcontract.stockArrivalDetailVos[i].passQuantity = this.$store.getters.empcontract.stockArrivalDetailVos[i].qualifyQuantity
        }
        this.arrival(this.$store.getters.empcontract.stockArrivalDetailVos)
        this.$store.dispatch('getempcontract', '')
      }
    },
    beyond(scope, value) {
      this.mid = scope.row.basicQuantity
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
      this.personalForm.enterDate = currentdate
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
    },
    // 从源单中添加商品
    handleAddSouce() {
      if (this.personalForm.sourceType === '1') {
        this.arrivalcontrol = true
      } else {
        this.ordercontrol = true
      }
    },
    arrival(val) {
      console.log(val)
      this.$refs.editable.clear()
      let qq = 1
      for (let i = 0; i < val.length; i++) {
        console.log(val[i].passQuantity)
        if (val[i].actualEnterQuantity > 0) {
          val[i].actualEnterQuantity = (val[i].arrivalQuantity - val[i].hadStorageQuantity).toFixed(2)
          this.$refs.editable.insert(val[i])
          qq = 2
        }
      }
      if (qq === 1) {
        this.$notify.error({
          title: 'wrong',
          message: '质检过的商品都已入库',
          offset: 100
        })
      }
    },
    allarrivalinfo(val) {
      console.log(val)
      this.personalForm.supplierId = val.supplierId
      this.supplierId = val.supplierName
      if (val.supplierId !== null && val.supplierId !== undefined && val.supplierId !== '') {
        this.IssupplierId = true
      }
      this.personalForm.sourceNumber = val.number
      this.personalForm.stockPersonId = val.stockPersonId
      this.stockPersonId = val.stockPersonName
      this.personalForm.stockDeptId = val.deptId
    },
    getlist() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 保存操作
    async handlesave() {
      const rest = this.deepClone(this.$refs.editable.getRecords())
      let b = 1
      rest.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        const re = elem.productCode.slice(0, 2)
        if (re === '05') {
          if (elem.batteryCode === null || elem.batteryCode === undefined || elem.batteryCode === '') {
            b = 2
          }
        }
      })

      if (b === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '电池出库时电池编码必填',
          offset: 100
        })
        return false
      }
      console.log(rest)
      if (rest.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      let i = 1
      rest.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        locationlist(null, elem.locationCode).then(res => {
          if (res.data.ret === 200) {
            elem.locationId = res.data.data.content.list[0].id
            console.log('res.data.data.content.list[0].id', res.data.data.content.list[0].id)
            console.log('elem.locationId', elem.locationId)
          }
        })
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
          i = 4
        }
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          delete elem.batch
          i = 4
        }
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.typeIdname === null || elem.typeIdname === '' || elem.typeIdname === undefined) {
          delete elem.typeIdname
        }
        if (elem.productType === null || elem.productType === '' || elem.productType === undefined) {
          delete elem.productType
        }
        return elem
      })
      if (i === 4) {
        this.$notify.error({
          title: 'wrong',
          message: '商品货位和批次不能为空',
          offset: 100
        })
        return false
      }
      console.log(rest)
      const parms2 = JSON.stringify(rest)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addstockenter(this.personalForm, parms2).then(res => {
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        enterDate: null,
        repositoryId: this.$store.getters.repositoryId,
        enterRepositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        createPersonId: this.$store.getters.userId,
        enterPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        acceptPersonId: this.$store.getters.userId,
        sourceType: '1'
      }
      this.acceptPersonId = this.$store.getters.name
      this.deliveryPersonId = ''
      this.stockPersonId = ''
      this.supplierId = ''
      this.enterRepositoryId = ''
      this.enterPersonId = this.$store.getters.name
      this.getdatatime()
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Stockenter/addstockenter', name: 'addstockenter', fullPath: '/Stockenter/addstockenter', title: 'addstockenter' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 采购员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 入库员focus事件
    handlechooseEnter() {
      this.entercontrol = true
    },
    // 采购员回显
    stockName(val) {
      this.stockPersonId = val.personName
      this.personalForm.stockPersonId = val.id
      this.personalForm.stockDeptId = val.deptId
    },
    // 采购员回显
    enterName(val) {
      this.enterPersonId = val.personName
      this.personalForm.enterPersonId = val.id
      this.personalForm.enterDeptId = val.deptId
    },
    // 供应商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供应商列表返回数据
    supplierName(val) {
      console.log(val)
      this.supplierId = val.supplierName
      this.personalForm.supplierId = val.id
    },
    // 详细表事件
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.enterRepositoryId = val.repositoryName
      this.personalForm.enterRepositoryId = val.id
    },
    updatebatch(event, scope) {
      if (event === true) {
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
          // if (res.data.ret === 200) {
          //   if (res.data.data.content.length !== 0) {
          //     this.locationlist = res.data.data.content
          //     scope.row.locationId = res.data.data.content[0].id
          //   } else if (res.data.data.content.length === 0) {
          //     locationlist(this.personalForm.enterRepositoryId).then(res => {
          //       if (res.data.ret === 200) {
          //         this.locationlist = res.data.data.content.list
          //       }
          //     })
          //   }
          // }
        })
        console.log('this.location', this.locationlist)
      }
    },
    // 部门列表focus刷新
    updatedept() {
      this.getlist()
    },
    // 交货人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.deliveryPersonId = val.personName
      this.personalForm.deliveryPersonId = val.id
    },
    // 验收人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      this.acceptPersonId = val.personName
      this.personalForm.acceptPersonId = val.id
    },
    // 新增入库单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      // console.log(val)
      // console.log(val[0])
      console.log(this.$refs.editable.getRecords())
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
    // 入库金额计算
    getSize(quan, pric) {
      return (quan * pric).toFixed(2)
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
      margin-top: 20px;
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
