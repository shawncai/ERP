<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" width="1010px" top="10px" title="修改调拨单" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('Storagemove.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" placeholder="请输入调拨单主题" style="margin-left: 18px;width:180px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('Storagemove.applicationName')" prop="applyPersonId" style="width: 100%;">
                <el-input v-model="applyPersonId" placeholder="请选择调拨申请人" style="margin-left: 18px;width:180px" clearable @focus="handlechooseAccept"/>
              </el-form-item>
            </el-col>
            <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
            <el-col :span="8">
              <el-form-item :label="$t('otherlanguage.dblx')" prop="moveType" style="width: 100%;">
                <el-select v-model="personalForm.moveType" :placeholder="$t('otherlanguage.dblx')" style="margin-left: 18px;width:180px" clearable @change="choosemovetype" @clear="clearmovetype">
                  <el-option
                    :label="$t('otherlanguage.ptdb')"
                    value="1"/>
                  <el-option
                    :label="$t('otherlanguage.thdb')"
                    value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 普通调拨时仓库逻辑 开始-->
            <el-col v-show="ismovetype" :span="8">
              <el-form-item :label="$t('Storagemove.moveInRepository')" prop="moveInRepository" style="width: 100%;">
                <el-input v-model="moveInRepository" placeholder="请选择调入仓库" style="margin-left: 18px;width:180px" clearable @focus="handlechooseDep"/>
              </el-form-item>
              <my-depot :depotcontrol.sync="depotcontrol" @depotname="depotname"/>
            </el-col>
            <el-col v-show="ismovetype" :span="8">
              <el-form-item :label="$t('Storagemove.moveOutRepository')" prop="moveOutRepository" style="width: 100%;">
                <el-input v-model="moveOutRepository" placeholder="请选择调出仓库" style="margin-left: 18px;width: 180px" clearable @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" :personform="personalForm" @repositoryname="repositoryname"/>
            </el-col>
            <!-- 普通调拨时仓库逻辑 结束-->
            <!-- 退货调拨时仓库逻辑 开始-->
            <el-col v-show="isreturntype" :span="8">
              <el-form-item :label="$t('Storagemove.moveInRepository')" prop="moveInRepository" style="width: 100%;">
                <el-input v-model="moveInRepository" placeholder="请选择调入仓库" style="margin-left: 18px;width:180px" clearable @focus="handlechooseDep2"/>
              </el-form-item>
              <my-depot :depotcontrol.sync="depotcontrol2" @depotname="depotname2"/>
            </el-col>
            <el-col v-show="isreturntype" :span="8">
              <el-form-item :label="$t('Storagemove.moveOutRepository')" prop="moveOutRepository" style="width: 100%;">
                <el-input v-model="moveOutRepository" placeholder="请选择调出仓库" style="margin-left: 18px;width: 180px" clearable @focus="handlechooseRep2"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol2" :personform="personalForm" @repositoryname="repositoryname2"/>
            </el-col>
            <!-- 退货调拨时仓库逻辑 结束-->
            <el-col :span="8">
              <el-form-item :label="$t('Storagemove.requestArrivalDate')" label-width="110px" prop="requestArrivalDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.requestArrivalDate"
                  type="date"
                  placeholder="选择要求到货日期"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 8px;width: 180px"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('updates.yqchrq')" label-width="110px" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.moveOutDate"
                  type="date"
                  placeholder="选择要求出货日期"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 8px;width: 180px"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('Storagemove.moveReason')" style="width: 100%;">
                <el-input v-model="personalForm.moveReason" placeholder="请输入调拨原因" style="margin-left: 18px;width:180px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('update4.applyPhone')" prop="applyPhone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <el-input v-model="personalForm.applyPhone" :controls="false" style="width: 200px" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('update4.acceptPhone')" prop="acceptPhone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <el-input v-model="personalForm.acceptPhone" :controls="false" style="width: 200px" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('update4.emergencyPhone')" prop="emergencyPhone" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <el-input v-model="personalForm.emergencyPhone" :controls="false" style="width: 200px" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
                <el-form-item :label="$t('Storagemove.departmentId')" prop="departmentId" style="width: 100%;">
                  <el-select v-model="personalForm.departmentId" placeholder="请选择调货部门" style="margin-left: 18px;width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>               -->
            <el-col :span="8">
              <el-form-item :label="$t('Storagemove.businessStat')" prop="businessStat" style="width: 100%;">
                <el-select v-model="personalForm.businessStat" placeholder="请选择业务" style="margin-left: 18px;width: 180px" disabled >
                  <el-option value="1" label="调拨申请"/>
                  <el-option value="2" label="调拨出库"/>
                  <el-option value="3" label="调拨入库"/>
                  <el-option value="4" label="调拨完成"/>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
                <el-form-item :label="$t('Storagemove.storageMovePerson')" prop="storageMovePerson" style="width: 100%;">
                  <el-input v-model="storageMovePerson" placeholder="请选择调拨出库人" style="margin-left: 18px;width:200px" clearable @focus="handlechooseAccept2"/>
                </el-form-item>
              </el-col>
              <my-out :outcontrol.sync="outcontrol" @outName="outName"/> -->
            <!-- <el-col :span="6">
                <el-form-item :label="$t('Storagemove.storageMoveDate')" label-width="110px" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.storageMoveDate"
                    type="date"
                    placeholder="选择调拨出库日期"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 8px"/>
                </el-form-item>
              </el-col> -->
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--调拨单明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">{{ $t('updates.dbsqdmx') }}</h2>
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
          <el-editable-column label="编号" width="55" fixed="left" align="center" type="index"/>
          <!-- <el-editable-column prop="location" align="center" :label="$t('Hmodule.hw')" min-width="150">
              <template slot-scope="scope">
                <p>{{ getLocationData(scope.row) }}</p>
              </template>
            </el-editable-column> -->
          <!-- <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="batch" align="center" :label="$t('Hmodule.pc')" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-select v-if="scope.row.batch !== '不使用'" v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
                  <el-option
                    v-for="(item, index) in batchlist"
                    :key="index"
                    :value="item"
                    :label="item"/>
                </el-select>
                <span v-else>{{ scope.row.batch }}</span>
              </template>
            </el-editable-column> -->
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" fixed="left" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" fixed="left" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1.00, precision: 6}, type: 'visible'}" :label="$t('updates.sqsl')" prop="applyQuantity" align="center" min-width="150">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                :precision="6"
                :controls="true"
                :min="1.00"
                v-model="scope.row.applyQuantity"
                @change="queryStock(scope.row)"
              />
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('updates.dbdj')" prop="movePrice" align="center" width="150px"/>
          <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" prop="movePrice" align="center" :label="$t('update4.dbcbenj')" width="150px"/> -->
          <el-editable-column :label="$t('updates.spje')" prop="moveMoney" align="center" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize(scope.row) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
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
import { locationlist } from '@/api/WarehouseAdjust'
import { updateStoragemove } from '@/api/Storagemove'
import { getdeptlist } from '@/api/BasicSettings'
import { batchlist, getlocation } from '@/api/public'
import { chooseProduct } from '@/api/Product'
import MyRepository from './MyRepository'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
import MyCreate from './MyCreate'
import MyDepot from './MyDepot'
var _that
export default {
  components: { MyRepository, MyCreate, MyAccept, MyDetail, MyDepot },
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
    // 判断是否为数字(非必填)
    const validisnumber2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('comaker phone can not be blank'))
      }
      setTimeout(() => {
        console.log(String(value).length)
        if (String(value).length !== 11 && (this.$store.getters.useCountry === 1 || this.$store.getters.useCountry === 2)) {
          callback(new Error(_that.$t('prompt.qsrzqdsjh')))
        } else if (String(value).length !== 10 && (this.$store.getters.useCountry === 3 || this.$store.getters.useCountry === 4)) {
          callback(new Error(_that.$t('prompt.qsrzqdsjh')))
        } else if (String(value).length !== 9 && (this.$store.getters.useCountry === 5)) {
          callback(new Error(_that.$t('prompt.qsrzqdsjh')))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      depotcontrol2: false,
      repositorycontrol2: false,
      isreturntype: false,
      ismovetype: false,
      // 申请人回显
      applyPersonId: '',
      // 申请人控制
      accetpcontrol: false,
      // 批次列表
      batchlist: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改row数据
      personalForm: this.editdata,
      // 部门数据
      depts: [],
      // 调出仓库回显
      moveOutRepository: '',
      // 调入仓库回显
      moveInRepository: '',
      // 控制调出仓库选择窗口
      repositorycontrol: false,
      // 控制调入仓库选择窗口
      depotcontrol: false,
      // 控制商品列表窗口
      control: false,
      // 调拨单规则数据
      personalrules: {
        emergencyPhone: [
          { required: true, validator: validisnumber2, trigger: 'blur' }
        ],
        acceptPhone: [
          { required: true, validator: validisnumber2, trigger: 'blur' }
        ],
        applyPhone: [
          { required: true, validator: validisnumber2, trigger: 'blur' }
        ],
        moveType: [
          { required: true, message: '请选择调拨类型', trigger: 'change' }
        ],
        requestDeptId: [
          { required: true, message: '请选择要货部门', trigger: 'change' }
        ],
        moveInRepository: [
          { required: true, message: '请选择调入仓库', trigger: 'focus' }
        ],
        requestArrivalDate: [
          { required: true, message: '请选择要求到货日期', trigger: 'change' }
        ],
        departmentId: [
          { required: true, message: '请选择调货部门', trigger: 'change' }
        ],
        moveOutRepository: [
          { required: true, message: '请选择调出仓库', trigger: 'focus' }
        ],
        businessStat: [
          { required: true, message: '请选择业务状态', trigger: 'change' }
        ]
      },
      // 调拨单明细数据
      list2: [],
      // 调拨明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 调拨明细中货位数据
      locationlist: [],
      // 调拨单明细列表规则
      validRules: {}
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      if (this.editdata.moveType === 1 || this.editdata.moveType === '1') {
        this.ismovetype = true
        this.isreturntype = false
      } else if (this.editdata.moveType === 2 || this.editdata.moveType === '2') {
        this.ismovetype = false
        this.isreturntype = true
      }
      this.moveOutRepository = this.personalForm.moveOutRepositoryName
      this.moveInRepository = this.personalForm.moveInRepositoryName
      this.applyPersonId = this.personalForm.applicationName
      this.list2 = this.personalForm.storageMoveDetailApplyVos
      for (const i in this.list2) {
        this.list2[i].location = this.list2[i].locationName
        if (this.list2[i].taxRate < 1) {
          this.list2[i].taxRate = (this.list2[i].taxRate) * 100
        }
      }
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
    choosemovetype(val) {
      console.log(val)
      if (val === '1') {
        this.isreturntype = false
        this.ismovetype = true
        this.moveOutRepository = ''
        this.personalForm.moveOutRepository = ''
        this.moveInRepository = ''
        this.personalForm.moveInRepository = ''
      } else if (val === '2') {
        this.isreturntype = true
        this.ismovetype = false
        this.moveOutRepository = ''
        this.personalForm.moveOutRepository = ''
        this.moveInRepository = ''
        this.personalForm.moveInRepository = ''
      }
    },
    clearmovetype() {
      console.log('clearsuccess')
      this.moveOutRepository = ''
      this.personalForm.moveOutRepository = ''
      this.moveInRepository = ''
      this.personalForm.moveInRepository = ''
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
      locationlist(this.personalForm.moveOutRepository).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list
        }
      })
    },
    // 申请人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      this.applyPersonId = val.personName
      this.personalForm.applyPersonId = val.id
    },
    // 调入仓库focus事件触发
    handlechooseDep() {
      this.depotcontrol = true
    },
    depotname(val) {
      this.moveInRepository = val.repositoryName
      this.personalForm.moveInRepository = val.id
    },
    handlechooseDep2() {
      this.repositorycontrol2 = true
    },
    depotname2(val) {
      this.moveOutRepository = val.repositoryName
      this.personalForm.moveOutRepository = val.id
    },
    // 调出仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        elem.moveQuantity = 1
      })
      this.moveOutRepository = val.repositoryName
      this.personalForm.moveOutRepository = val.id
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
    handlechooseRep2() {
      this.depotcontrol2 = true
    },
    repositoryname2(val) {
      // const EnterDetail = this.$refs.editable.getRecords()
      // EnterDetail.map(function(elem) {
      //   return elem
      // }).forEach(function(elem) {
      //   elem.moveQuantity = 1
      // })
      // console.log(val)
      this.moveInRepository = val.repositoryName
      this.personalForm.moveInRepository = val.id
    },
    queryStock(row) {
      if (!row.existStock) {
        const getemplist = {
          productid: '',
          code: row.productCode,
          productname: '',
          categoryid: '',
          typeid: '',
          isactive: '',
          Productid: '',
          pagenum: 1,
          pagesize: 10,
          searchRepositoryId: this.personalForm.moveOutRepository
        }
        chooseProduct(getemplist).then(res => {
          console.log(res)
          row.existStock = res.data.data.content.list[0].existStock
        })
      }
      console.log(this.$refs.editable.getRecords())
      if (row.applyQuantity > row.existStock) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.sqslcg'),
          offset: 100
        })
        row.applyQuantity = 1
      }
      // if (row.location === null || row.location === '' || row.location === undefined) {
      //   this.$notify.error({
      //     title: 'wrong',
      //     message: '仓库不存在此商品!',
      //     offset: 100
      //   })
      //   row.moveQuantity = 1
      //   return false
      // }
      // 1.批次只有一个 不能超过总库存
      // 2.批次有多个 不能超过单个批次数量
      // let i = 0
      // const EnterDetail = this.$refs.editable.getRecords()
      // EnterDetail.map(function(elem) {
      //   return elem
      // }).forEach(function(elem) {
      //   if (elem.productCode === row.productCode) {
      //     i++
      //   }
      // })
      // if (i === 1) {
      //   // 1.批次只有一个 不能超过总库存
      //   countlist(this.personalForm.moveOutRepository, 0, row.productCode).then(res => {
      //     if (res.data.ret === 200) {
      //       console.log('res.data.data.content', res.data.data.content)
      //       if (res.data.data.content.list.length === 0) {
      //         this.$notify.error({
      //           title: 'wrong',
      //           message: '仓库内无该物品',
      //           offset: 100
      //         })
      //         row.moveQuantity = 1
      //         return false
      //       }
      //       if (row.moveQuantity > res.data.data.content.list[0].existStock) {
      //         this.$notify.error({
      //           title: 'wrong',
      //           message: this.$t('prompt.qsrzqdsjh'),
      //           offset: 100
      //         })
      //         row.moveQuantity = 1
      //         return false
      //       }
      //     } else {
      //       this.$notify.error({
      //         title: 'wrong',
      //         message: res.data.msg,
      //         offset: 100
      //       })
      //     }
      //   })
      // } else {
      //   // 2.批次有多个 不能超过单个批次数量
      //   const param = {}
      //   param.productCode = row.productCode
      //   param.batch = row.batch
      //   param.repositoryId = row.repositoryId
      //   getAllBatch(param).then(res => {
      //     if (res.data.ret === 200) {
      //       console.log('res.data.data.content', res.data.data.content)
      //       if (row.moveQuantity > res.data.data.content[0].moveQuantity) {
      //         this.$notify.error({
      //           title: 'wrong',
      //           message: this.$t('prompt.ckslcgpcsl'),
      //           offset: 100
      //         })
      //         row.moveQuantity = 1
      //         return false
      //       }
      //     } else {
      //       this.$notify.error({
      //         title: 'wrong',
      //         message: res.data.msg,
      //         offset: 100
      //       })
      //     }
      //   })
      // }
    },
    getLocationData(row) {
      // 默认批次
      if (row.batch === null || row.batch === '' || row.batch === undefined) {
        const parms3 = row.productCode
        batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
          console.log(res)
          if (res.data.data.content.length > 0) {
            row.batch = res.data.data.content[0]
          }
        })
      } else {
        const parms3 = row.productCode
        batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
          if (res.data.data.content.length === 0) {
            if (row.batch !== '不使用') {
              row.batch = null
            }
          }
        })
      }
      // 默认货位
      getlocation(this.personalForm.moveOutRepository, row).then(res => {
        if (res.data.ret === 200) {
          console.log('res', res)
          if (res.data.data.content.length !== 0) {
            row.location = res.data.data.content[0].locationCode
            row.locationId = res.data.data.content[0].id
            console.log('row.locationId', row.locationId)
          } else {
            row.location = null
            row.locationId = null
          }
        }
      })
      return row.location
    },
    // 批次
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.moveOutRepository)
        if (this.personalForm.moveOutRepository === undefined || this.personalForm.moveOutRepository === '') {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.sqslcg'),
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.moveOutRepository, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              this.updatebatch3(scope)
            } else if (res.data.data.content.length === 0) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.gckmygsp'),
                offset: 100
              })
              this.locationlist = []
              return false
            }
          }
        })
      }
    },
    updatebatch3(scope) {
      const parms3 = scope.row.productCode
      batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
        this.batchlist = res.data.data.content
      })
    },
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
          this.batchlist = res.data.data.content
        })
      }
    },
    // 调拨单事件
    // 新增调拨单明细
    handleAddproduct() {
      if (this.moveOutRepository === null || this.moveOutRepository === '' || this.moveOutRepository === undefined) {
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
    // 调拨金额计算
    getSize(row) {
      row.moveMoney = row.movePrice * row.applyQuantity
      return row.moveMoney
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      delete this.personalForm.judgeStat
      delete this.personalForm.receiptStat
      delete this.personalForm.approvalUseVos
      delete this.personalForm.storageMoveDetailApplyVos
      console.log('this.personalForm', this.personalForm)
      // const EnterDetail = this.$refs.editable.getRecords()
      // // 保存时同样商品不能有同一个批次
      // let i = 0
      // EnterDetail.map(function(elem) {
      //   return elem
      // }).forEach(function(elem) {
      //   EnterDetail.map(function(elem2) {
      //     return elem2
      //   }).forEach(function(elem2) {
      //     if (elem2.productCode === elem.productCode && elem2.batch === elem.batch) {
      //       i++
      //     }
      //   })
      // })
      // console.log(i)
      // if (i > EnterDetail.length) {
      //   this.$notify.error({
      //     title: 'wrong',
      //     message: '同样商品不能有同一个批次',
      //     offset: 100
      //   })
      //   return false
      // }
      // // 批次货位不能为空
      // let j = 1
      // EnterDetail.map(function(elem) {
      //   return elem
      // }).forEach(function(elem) {
      //   if (elem.batch === null || elem.batch === undefined || elem.batch === '' || elem.location === null || elem.location === undefined || elem.location === '') {
      //     j = 2
      //   }
      // })
      // console.log(j)
      // if (j === 2) {
      //   this.$notify.error({
      //     title: 'wrong',
      //     message: this.$t('prompt.pchwbnwk'),
      //     offset: 100
      //   })
      //   return false
      // }
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      console.log(this.personalForm)
      const rest = this.$refs.editable.getRecords()
      const repositoryId = this.$store.getters.repositoryId
      const regionId = this.$store.getters.regionId
      if (rest.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      rest.map(function(elem) {
        return elem
      }).forEach(function(elem) {
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
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.movePrice === null || elem.movePrice === '' || elem.movePrice === undefined) {
          delete elem.movePrice
        }
        if (elem.moveQuantity === null || elem.moveQuantity === '' || elem.moveQuantity === undefined) {
          delete elem.moveQuantity
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        return elem
      })
      console.log('this.personalForm.moveType', this.personalForm.moveType)
      if (this.personalForm.moveType === '1') {
        console.log('this.personalForm.moveOutRepositoryRegion', this.personalForm.moveOutRepositoryRegion)
        console.log('this.$store.getters.regionId', this.$store.getters.regionId)
        if (repositoryId === this.personalForm.moveOutRepository || (regionId === this.personalForm.moveOutRepositoryRegion && repositoryId === 0)) {
          this.personalForm.modifyStat = 2
        }
      }
      const parm = JSON.stringify(this.personalForm)
      const parms2 = JSON.stringify(rest)
      updateStoragemove(parm, parms2).then(res => {
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
