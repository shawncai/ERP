<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" width="1010px" top="-10px" title="修改采购入库单" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" placeholder="请输入入库单主题" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" placeholder="请选择源单类型" style="margin-left: 18px;width: 200px">
                  <!-- <el-option :label="$t('updates.cgdhd')" value="1" /> -->
                  <el-option :label="$t('updates.cgdd')" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('updates.ydbh')" style="width: 100%;">
                <el-input v-model="personalForm.sourceNumber" placeholder="请选择源单编号" style="margin-left: 18px;width: 150px" @focus="handleAddSouce"/>
              </el-form-item>
              <my-arrival :arrivalcontrol.sync="arrivalcontrol" :repositoryid="personalForm" @arrival="arrival" @allarrivalinfo="allarrivalinfo"/>
              <my-order :ordercontrol.sync="ordercontrol" :supp.sync="supp" @order="order" @allOrderinfo="allOrderinfo"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.supplierId')" style="width: 100%">
                <el-input v-model="supplierId" placeholder="请选择供应商" clearable style="margin-left: 18px;width: 150px" @focus="handlechoose"/>
              </el-form-item>
              <my-supplier :control.sync="empcontrol" @supplierName="supplierName"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.stockPersonId')" style="width: 100%">
                <el-input v-model="stockPersonId" placeholder="请选择采购员" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseStock"/>
              </el-form-item>
              <my-emp :control.sync="stockControl" @stockName="stockName"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.stockDeptId')" style="width: 100%">
                <el-select v-model="personalForm.stockDeptId" placeholder="请选择采购部门" clearable style="margin-left: 18px;width: 150px" @focus="updatedept">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.deliveryPersonId')" style="width: 100%">
                <el-input v-model="deliveryPersonId" placeholder="请选择交货人" clearable style="margin-left: 18px;width: 150px" @focus="handlechooseDelivery"/>
              </el-form-item>
              <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.acceptPersonId')" style="width: 100%">
                <el-input v-model="acceptPersonId" :placeholder="$t('update4.qxzyashour')" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseAccept"/>
              </el-form-item>
              <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.enterDeptId')" style="width: 100%">
                <el-select v-model="personalForm.enterDeptId" placeholder="请选择入库部门" clearable style="margin-left: 18px;width: 150px" @focus="updatedept">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.enterRepositoryId')" prop="enterRepositoryId" style="width: 100%">
                <el-input v-model="enterRepositoryId" placeholder="请选择入库仓库" clearable style="margin-left: 18px;width: 150px" @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.enterPersonId')" prop="enterPersonId" style="width: 100%;">
                <el-input v-model="enterPersonId" placeholder="请选择入库人" style="margin-left: 18px;width: 150px" @focus="handlechooseEnter"/>
              </el-form-item>
              <my-emp2 :entercontrol.sync="entercontrol" @enterName="enterName"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.enterDate')" prop="enterDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.enterDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 150px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--入库单明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">{{ $t('updates.rkdmx') }}</h2>
      <div class="buttons" style="margin-top: 28px;margin-bottom: 20px">
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
          <el-editable-column type="selection" fixed width="55" align="center"/>
          <el-editable-column type="index" fixed align="center" label="编号" width="150px" />
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed align="center" width="150px" />
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed align="center" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElSelect', type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px" >
            <template slot-scope="scope">
              <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                <el-option
                  v-for="item in locationlist"
                  :key="item.id"
                  :value="item.id"
                  :label="item.locationCode"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" />
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.jbel')" prop="basicQuantity" align="center" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1}, type: 'visible'}" prop="actualEnterQuantity" align="center" label="实收数量" width="150px"/>
          <el-editable-column :label="$t('updates.rkdj')" prop="enterPrice" align="center" width="150px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ scope.row.enterPrice }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.slv')" prop="taxRate" align="center" width="150px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ scope.row.taxRate }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ getMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.hsje')" prop="includeTaxMoney" align="center" min-width="150px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ getTaxMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.se')" prop="taxMoney" align="center" min-width="150px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ getTaxMoney2(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.ckl')" prop="discountRate" align="center" min-width="170px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ scope.row.discountRate }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.cke')" prop="discountMoney" align="center" min-width="170px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ getdiscountMoney(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" min-width="170px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ scope.row.price }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.rkje')" prop="enterMoney" align="center" width="150px">
            <template slot-scope="scope">
              <p v-show="jundgeprice()">{{ getSize(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-input v-if="isEdit4(scope.row)" v-model="scope.row.batteryCode" clearable />
              <span v-else>{{ scope.row.batteryCode }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { locationlist, getlocation } from '@/api/public'
import { updatestockenter } from '@/api/Stockenter'
import { getdeptlist } from '@/api/BasicSettings'
import MyRepository from './MyRepository'
import MySupplier from './MySupplier'
import MyEmp from './MyEmp'
import MyDelivery from './MyDelivery'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
import MyArrival from './MyArrival'
import MyEmp2 from './MyEmp2'
import MyOrder from './MyOrder'

var _that
export default {
  components: { MyOrder, MyEmp2, MyArrival, MyRepository, MySupplier, MyEmp, MyDelivery, MyAccept, MyDetail },
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
      // 供应商id
      supp: null,
      ordercontrol: false,
      // 入库员控制框
      entercontrol: false,
      enterPersonId: '',
      enterDate: '',
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 供应商信息数据
      personalForm: this.editdata,
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
      acceptPersonId: '',
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
      // 采购员回显
      stockPersonId: '',
      // 供货商回显
      supplierId: '',
      // 供货商控制
      empcontrol: false,
      // 入库仓库回显
      enterRepositoryId: '',
      // 仓库选择控制期
      repositorycontrol: false,
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
      // 个人信息规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入入库单主题', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        enterRepositoryId: [
          { required: true, message: '请选择入库仓库', trigger: 'blue' }
        ],
        isHot: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        countryId: [
          { required: true, message: '请选择国家', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      for (const i in this.personalForm.stockEnterDetailVos) {
        if (this.personalForm.stockEnterDetailVos[i].stockEnterDetailVos) {
          delete this.personalForm.stockEnterDetailVos[i].stockEnterDetailVos
        }
      }
      this.supplierId = this.personalForm.supplierName
      this.supp = this.personalForm.supplierId
      this.enterDate = this.personalForm.enterDate
      this.enterPersonId = this.personalForm.enterPersonName
      this.stockPersonId = this.personalForm.stockPersonName
      this.deliveryPersonId = this.personalForm.deliveryPersonName
      this.acceptPersonId = this.personalForm.acceptPersonName
      this.enterRepositoryId = this.personalForm.enterRepositoryName
      this.list2 = this.personalForm.stockEnterDetailVos
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
    jundgeprice() {
      const value = ['1-22-24-115']
      const roles = this.$store.getters && this.$store.getters.roles
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      return hasPermission
    },
    // 计算金额
    getMoney(row) {
      // row.money = (Number(row.actualEnterQuantity) * Number(row.includeTaxPrice)).toFixed(6)
      // return row.money
    },
    // 计算含税金额
    getTaxMoney(row) {
      row.includeTaxMoney = (Number(row.actualEnterQuantity) * Number(row.includeTaxPrice)).toFixed(6)
      return row.includeTaxMoney
    },
    getdiscountMoney(row) {
      if (row.discountRate === 0) {
        row.discountMoney = 0
      } else {
        row.discountMoney = (Number(row.includeTaxPrice) * Number(row.actualEnterQuantity) * (Number(row.discountRate) / 100)).toFixed(6)
      }
      return row.discountMoney
    },
    // 计算税额
    getTaxMoney2(row) {
      row.taxMoney = (Number(row.enterPrice) * Number(row.taxRate) / 100 * Number(row.actualEnterQuantity)).toFixed(6)
      return row.taxMoney
    },
    order(val) {
      const that = this
      console.log('ssssss', val)
      const newarr = []
      for (let i = 0; i < val.length; i++) {
        val[i].actualEnterQuantity = (val[i].basicQuantity - val[i].actualArrivalQuantity).toFixed(6)

        const re = val[i].productCode.slice(0, 2)
        if (re === '05' && that.$store.getters.countryId === 2) {
          const arrlength = Number(val[i].basicQuantity - val[i].actualArrivalQuantity)
          let newobj = {}
          for (let index = 0; index < arrlength; index++) {
            newobj = val[i]
            newobj.actualEnterQuantity = 1
            newarr.push(newobj)
          }
        } else {
          newarr.push(val[i])
        }
      }
      for (const j in newarr) {
        this.$refs.editable.insert(newarr[j])
      }
      console.log('newarr', newarr)
    },
    allOrderinfo(val) {
      this.personalForm.enterRepositoryId = val.stockRepositoryId
      this.enterRepositoryId = val.stockRepositoryName
      this.personalForm.sourceNumber = val.orderNumber
      this.personalForm.supplierId = val.supplierId
      this.supp = val.supplierId
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
    // 入库员focus事件
    handlechooseEnter() {
      this.entercontrol = true
    },
    // 采购员回显
    enterName(val) {
      this.enterPersonId = val.personName
      this.personalForm.enterPersonId = val.id
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
          val[i].actualEnterQuantity = (val[i].arrivalQuantity - val[i].hadStorageQuantity).toFixed(6)
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
    getlocation() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.enterRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list
        }
      })
    },
    // 采购员focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 采购员回显
    stockName(val) {
      this.stockPersonId = val.personName
      this.personalForm.stockPersonId = val.id
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
      console.log(val)
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
        this.$nextTick(() => this.$refs.editable.setActiveRow())
      }
    },
    // 入库金额计算
    getSize(row) {
      row.money = (row.actualEnterQuantity * (Number(row.includeTaxPrice) / (1 + (row.taxRate / 100)))).toFixed(2)
      return row.money
    },
    getmylocation(scope) {
      if (scope.row.flag === undefined) {
        scope.row.flag = true
      } else {
        return
      }
      if (scope.row.flag) {
        getlocation(this.personalForm.enterRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              scope.row.locationId = res.data.data.content[0].id
            }
          }
        })
      }
      scope.row.flag = false
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      console.log(this.personalForm)
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
          message: '采购入库明细表不能为空',
          offset: 100
        })
        return false
      }
      let i = 1
      rest.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
          i = 4
        }
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          delete elem.batch
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
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.actualEnterQuantity === null || elem.actualEnterQuantity === '' || elem.actualEnterQuantity === undefined) {
          delete elem.actualEnterQuantity
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.enterPrice === null || elem.enterPrice === '' || elem.enterPrice === undefined) {
          delete elem.enterPrice
        }
        if (elem.taxRate === null || elem.taxRate === '' || elem.taxRate === undefined) {
          delete elem.taxRate
        }
        if (elem.enterMoney === null || elem.enterMoney === '' || elem.enterMoney === undefined) {
          delete elem.enterMoney
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
      const parms2 = JSON.stringify(rest)
      this.personalForm.judgeStat = ''
      this.personalForm.receiptStat = ''
      updatestockenter(this.personalForm, parms2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: this.$t('prompt.czcg'),
            message: this.$t('prompt.czcg'),
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
          this.$refs.editable.clear()
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
      })
    },
    handlecancel() {
      this.$refs.editable.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
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
