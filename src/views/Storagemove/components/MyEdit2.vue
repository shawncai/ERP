<template>
  <el-dialog
    :visible.sync="editVisible"
    :editcontrol="editcontrol"
    :editdata="editdata"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closemove"
    class="edit"
    width="1010px"
    top="10px"
    @close="$emit('update:editcontrol', false)" >
    <!-- 基本信息 -->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('Storagemove.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" disabled placeholder="请输入调拨单主题" style="margin-left: 18px;width:180px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('Storagemove.applicationName')" prop="applyPersonId" style="width: 100%;">
                <el-input v-model="applyPersonId" disabled placeholder="请选择调拨申请人" style="margin-left: 18px;width:180px" clearable @focus="handlechooseAccept"/>
              </el-form-item>
            </el-col>
            <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
            <el-col :span="8">
              <el-form-item :label="$t('Storagemove.moveInRepository')" prop="moveInRepository" style="width: 100%;">
                <el-input v-model="moveInRepository" disabled placeholder="请选择调入仓库" style="margin-left: 18px;width:180px" clearable @focus="handlechooseDep"/>
              </el-form-item>
              <my-depot :depotcontrol.sync="depotcontrol" @depotname="depotname"/>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('Storagemove.moveOutRepository')" prop="moveOutRepository" style="width: 100%;">
                <el-input v-model="moveOutRepository" disabled placeholder="请选择调出仓库" style="margin-left: 18px;width: 180px" clearable @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('Storagemove.requestArrivalDate')" label-width="110px" prop="requestArrivalDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.requestArrivalDate"
                  disabled
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
                  disabled
                  placeholder="选择要求出货日期"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 8px;width: 180px"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('Storagemove.moveReason')" style="width: 100%;">
                <el-input v-model="personalForm.moveReason" disabled placeholder="请输入调拨原因" style="margin-left: 18px;width:180px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('Storagemove.businessStat')" prop="businessStat" style="width: 100%;">
                <el-select v-model="personalForm.businessStat" disabled placeholder="请选择业务" style="margin-left: 18px;width: 180px" >
                  <el-option value="1" label="调拨申请"/>
                  <el-option value="2" label="调拨出库"/>
                  <el-option value="3" label="调拨入库"/>
                  <el-option value="4" label="调拨完成"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--调拨申请明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">{{ $t('updates.dbsqdmx') }}</h2>
      <!-- <div class="buttons" style="margin-top: 58px">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div> -->
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
          <el-editable-column label="编号" width="55" align="center" type="index"/>
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
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.sqsl')" prop="applyQuantity" align="center" min-width="150"/>
          <el-editable-column :label="$t('updates.dbdj')" prop="movePrice" align="center" width="150px"/>
          <!-- <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" prop="movePrice" align="center" label="调拨成本价" width="150px"/> -->
          <el-editable-column :label="$t('updates.spje')" prop="moveMoney" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!-- 调拨出库明细 -->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">{{ $t('prompt.dbckmx') }}</h2>
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
          <el-editable-column label="编号" width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.hw')" prop="locationName" align="center" min-width="150"/>
          <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="250"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="typeName" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.cksli')" prop="moveQuantity" align="center" min-width="150"/>
          <el-editable-column :label="$t('updates.cjbm')" prop="carCode" align="center" min-width="150" />
          <el-editable-column :label="$t('updates.djbm')" prop="motorCode" align="center" min-width="150" />
          <el-editable-column :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150" />
          <el-editable-column :label="$t('updates.dbdj')" prop="movePrice" align="center" width="150px"/>
          <el-editable-column :label="$t('prompt.dbcbj')" prop="price" align="center" width="150px"/>
          <el-editable-column :label="$t('prompt.dbje')" prop="totalMoney" align="center" width="150px" />
          <el-editable-column prop="stat" align="center" label="出库状态" width="150px">
            <template slot-scope="scope">
              <p>{{ scope.row.stat | statFilter }}</p>
            </template>
          </el-editable-column>
        </el-editable>
      </div>
    </el-card>
    <!-- 调拨入库明细 -->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">{{ $t('prompt.dbrkmx') }}</h2>
      <div class="container">
        <el-editable
          ref="editable3"
          :data.sync="list4"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="small"
          style="width: 100%">
          <el-editable-column label="编号" width="55" align="center" type="index"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElSelect', type: 'default'}" :label="$t('Hmodule.hw')" prop="locationName" align="center" min-width="150">
            <template slot-scope="scope">
              <el-select v-if="isEdit(scope.row)" v-model="scope.row.locationId" :value="scope.row.locationId" :disabled="scope.row.stat === 2" :placeholder="$t('Hmodule.xzhw')" filterable style="width: 100%;" @visible-change="updatelocaltion($event,scope)" @change="test($event,scope.row)">
                <el-option
                  v-for="item in locationlist"
                  :key="item.id"
                  :value="item.id"
                  :label="item.locationCode"/>
              </el-select>
              <span v-else>{{ scope.row.locationName }}</span>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150" />
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="typeName" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.cksli')" prop="moveQuantity" align="center" min-width="150"/>
          <el-editable-column :label="$t('updates.cjbm')" prop="carCode" align="center" min-width="150" />
          <el-editable-column :label="$t('updates.djbm')" prop="motorCode" align="center" min-width="150" />
          <el-editable-column :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150" />
          <el-editable-column :label="$t('tongyo.controlCode')" prop="controlCode" align="center" />
          <el-editable-column :label="$t('tongyo.chargeCode')" prop="chargeCode" align="center" />
          <el-editable-column :label="$t('updates.dbdj')" prop="price" align="center" width="150px"/>
          <el-editable-column :label="$t('prompt.dbcbj')" prop="movePrice" align="center" width="150px"/>
          <el-editable-column :label="$t('prompt.dbje')" prop="totalMoney" align="center" width="150px"/>
          <el-editable-column prop="stat" align="center" label="入库状态" width="150px">
            <template slot-scope="scope">
              <p>{{ scope.row.stat | inFilter }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" prop="actualQuantity" align="center" label="实际入库" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-input-number
                v-if="isEdit2(scope.row)"
                v-model="scope.row.actualQuantity"
                :controls="true"
                :value="scope.row.actualQuantity"
                @blur="handleEdit(scope.row)"
              />
              <span v-else>{{ scope.row.actualQuantity }}</span>
            </template>
          </el-editable-column>
          <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="100">
            <template slot-scope="scope">
              <el-button v-show="scope.row.data.stat === 1" :loading="ischeck" title="确认" type="primary" size="mini" icon="el-icon-check" circle @click="handleEdit2(scope.row)"/>
            </template>
          </el-table-column>
        </el-editable>
      </div>
    </el-card>
    <!-- <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">确定</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div> -->
  </el-dialog>
</template>

<script>
import { updateStoragemove, editStoragein, confirmStoragein, updateStoragemove2 } from '@/api/Storagemove'
import { createstoragemovediff } from '@/api/Storagemovediff'
import { getdeptlist } from '@/api/BasicSettings'
import { locationlist } from '@/api/public'
import MyRepository from './MyRepository'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
import MyCreate from './MyCreate'
import MyDepot from './MyDepot'
var _that
export default {
  components: { MyRepository, MyCreate, MyAccept, MyDetail, MyDepot },
  filters: {
    statFilter(status) {
      const statusMap = {
        1: 'unconfirm',
        2: 'confirm'
      }
      return statusMap[status]
    },
    inFilter(status) {
      const statusMap = {
        1: 'unconfirm',
        2: 'confirm'
      }
      return statusMap[status]
    }
  },
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
      diffDetailArr: [],
      ischeck: false,
      // 单据id
      id: '',
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
      // 调拨申请明细数据
      list2: [],
      // 调拨出库明细
      list3: [],
      // 调拨入库明细
      list4: [],
      // 调拨明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 调拨入库中货位数据
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
      this.id = this.personalForm.id
      this.moveOutRepository = this.personalForm.moveOutRepositoryName
      this.moveInRepository = this.personalForm.moveInRepositoryName
      this.applyPersonId = this.personalForm.applicationName
      this.list2 = this.personalForm.storageMoveDetailApplyVos
      this.list3 = this.personalForm.storageMoveDetailVos
      console.log('原始数据===================================>', this.personalForm.storageMoveDetailConfirmVos)
      for (const i in this.personalForm.storageMoveDetailConfirmVos) {
        this.personalForm.storageMoveDetailConfirmVos[i].actualQuantity = this.personalForm.storageMoveDetailConfirmVos[i].moveQuantity
      }
      // for (const i of this.personalForm.storageMoveDetailConfirmVos) {
      //   this.personalForm.storageMoveDetailConfirmVos[i].actualQuantity = this.personalForm.storageMoveDetailConfirmVos[i].moveQuantity
      // }
      this.list4 = this.personalForm.storageMoveDetailConfirmVos
      for (const i in this.list4) {
        if (!this.list4[i].editdata) {
          if (this.list4[i].locationName !== null) {
            this.list4[i].editdata = 0
          } else {
            this.list4[i].editdata = 1
          }
        } else {
          this.list4[i].editdata = 1
        }
      }
      console.log('this.list4', this.list4)
    },
    list4: {
      handler() {
        console.log(123123123123)
        console.log(this.personalForm.businessStat)
        if (this.personalForm.businessStat === 3 || this.personalForm.businessStat === '3') {
          console.log('监听开始')
          const reviewParms = {}
          reviewParms.id = this.id
          reviewParms.confirmPersonId = this.$store.getters.userId
          reviewParms.confirmDate = this.getdatatime()
          reviewParms.businessStat = 4
          let count = 0
          for (const i in this.list4) {
            if (this.list4[i].stat === 2) {
              count++
            }
          }
          if (count === this.list4.length) {
            console.log('监听变化')
            const parms = JSON.stringify(reviewParms)
            updateStoragemove2(parms).then(res => {
              console.log(res)
              if (res.data.ret === 200) {
                this.$emit('rest', true)
                this.editVisible = false
              }
            })
          }
        }
      },
      deep: true,
      immediate: true
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    closemove() {
      this.$emit('rest', true)
      this.editVisible = false
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
      return currentdate
    },
    // 判断能否修改
    isEdit2(row) {
      if (row.stat === 2) {
        return false
      } else {
        return true
      }
    },
    test(event, row) {
      console.log(event, row)
      for (const i in this.list4) {
        if (this.list4[i].productCode === row.productCode) {
          this.list4[i].locationId = event
        }
      }
      // for (let i = 0; i < this.list4.length; i++) {
      //   for (let j = 0; j < this.list4.length; j++) {
      //     if (this.list4[j].productCode === this.list4[i].productCode) {
      //       console.log(111)
      //       this.list4[j].locationId = val
      //       console.log(j, this.list4[i].locationId)
      //     }
      //   }
      // }
    },
    // 确认入库数量
    handleEdit2(row) {
      console.log('row', row)
      this.ischeck = true
      if (row.data.locationId === null) {
        this.$notify.error({
          title: 'wrong',
          message: 'Information is incomplete',
          offset: 100
        })
        this.ischeck = false
        return false
      }
      console.log(row.data.id)
      // console.log(row.id)
      const confirmPersonId = this.$store.getters.userId
      const query = JSON.stringify(row.data)
      const that = this
      editStoragein(query).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          confirmStoragein(row.data.id, confirmPersonId).then(res => {
            console.log(res)
            if (res.data.ret === 200) {
              row.data.stat = 2
              that.ischeck = false

              const rest = this.$refs.editable3.getRecords()

              if (Number(row.data.actualQuantity) !== Number(row.data.moveQuantity)) {
                that.diffDetailArr.push(row.data)
              }

              console.log('diffDetailArr', that.diffDetailArr)
              const diffData = {
                title: 'auto diff ' + that.personalForm.moveNumber,
                moveNumber: that.personalForm.moveNumber,
                inRepositoryId: that.personalForm.moveInRepository,
                outRepositoryId: that.personalForm.moveOutRepository,
                arrivalDate: that.personalForm.requestArrivalDate,
                moveDate: that.personalForm.createDate,
                createPersonId: that.$store.getters.userId,
                countryId: that.$store.getters.countryId,
                repositoryId: that.$store.getters.repositoryId,
                regionId: that.$store.getters.regionId,
                requestDeptId: that.$store.getters.deptId
              }

              const actualDiffDetail = that.diffDetailArr.map(item => {
                return {
                  productCode: item.productCode,
                  productName: item.productName,
                  color: item.color,
                  sendQuantity: item.moveQuantity,
                  actualQuantity: item.actualQuantity,
                  diffQuantity: Math.abs(Number(item.moveQuantity) - Number(item.actualQuantity)),
                  diffMoney: 0,
                  result: null
                }
              })

              console.log('diffData', diffData)
              console.log('actualDiffDetail', actualDiffDetail)
              console.log('this.list4', this.list4)
              console.log('rest', rest)
              const isEveryArr = rest.map(item => {
                return item.stat
              }).every(item => {
                return item === 2
              })

              console.log('isEveryArr', isEveryArr)

              if (isEveryArr) {
                console.log('监听变化')

                const diffDataParms = JSON.stringify(diffData)
                const diffDetailDataParms = JSON.stringify(actualDiffDetail)

                createstoragemovediff(diffDataParms, diffDetailDataParms, diffData).then(res => {
                  console.log('res2', res)
                  if (res.data.ret === 200) {
                    this.$emit('rest', true)
                    this.editVisible = false
                  }
                })
              }
            }
          })
        } else {
          that.ischeck = false
        }
      })
    },
    // 判断能否修改
    isEdit(row) {
      // console.log('显示', row)
      if (row.editdata === 1) {
        return true
      }
    },
    // 修改调拨入库
    handleEdit(row) {
      // console.log(row.id)
      // const query = JSON.stringify(row)
      // editStoragein(query).then(res => {
      //   console.log(res)
      // })
      console.log('修改', row)
    },
    // 部门列表数据
    getlist() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
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
    // 调出仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
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
    updatelocaltion(event, scope) {
      console.log(this.personalForm)
      if (event === true) {
        locationlist(this.personalForm.moveInRepository).then(res => {
          this.locationlist = res.data.data.content.list
          console.log(this.locationlist)
        })
      }
      // if (event === false) {
      //   console.log(scope.row.id)
      //   const query = JSON.stringify(scope.row)
      //   editStoragein(query).then(res => {
      //     console.log(res)
      //   })
      //   console.log('修改', scope.row)
      // }
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      console.log(this.personalForm)
      const rest = this.$refs.editable.getRecords()
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
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
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
