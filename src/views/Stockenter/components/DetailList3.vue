<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" :title="$t('updates.xgqtrkd')" append-to-body class="edit" width="1010px" top="-10px" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">{{ $t('updates.print') }}</button>
        <div class="container">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="其他入库单编号" style="width: 100%;display: none">
                  {{ personalForm.enterNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" placeholder="请输入入库单主题" style="margin-left: 18px;width: 150px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" placeholder="请选择源单类型" style="margin-left: 18px;width: 150px" disabled>
                    <el-option :label="$t('update4.wulaiyuan')" value="1"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('update4.goujia')" style="width: 100%;">
                  <el-input v-model="personalForm.countryName" style="margin-left: 18px;width: 150px" disabled/>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.deliveryPersonId')" style="width: 100%;">
                  <el-input v-model="deliveryPersonId" placeholder="请选择交货人" style="margin-left: 18px;width: 150px" disabled @focus="handlechooseDelivery"/>
                </el-form-item>
                <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.acceptPersonId')" style="width: 100%;">
                  <el-input v-model="acceptPersonId" :placeholder="$t('update4.qxzyashour')" style="margin-left: 18px;width: 150px" disabled @focus="handlechoose"/>
                </el-form-item>
                <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterPersonId')" prop="enterPersonId" style="width: 100%;">
                  <el-input v-model="enterPersonId" placeholder="请选择入库人" style="margin-left: 18px;width: 150px" disabled @focus="handlechooseAccept"/>
                </el-form-item>
                <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterDeptId')" style="width: 100%;">
                  <el-select v-model="personalForm.enterDeptId" placeholder="请选择入库部门" style="margin-left: 18px;width: 150px" disabled >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterRepositoryId')" prop="enterRepositoryId" style="width: 100%;">
                  <el-input v-model="enterRepositoryId" placeholder="请选择仓库" style="margin-left: 18px;width: 150px" disabled @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterReason')" prop="summary" style="width: 100%;">
                  <el-input v-model="personalForm.enterReason" :placeholder="$t('update4.qshruyuany')" style="margin-left: 18px;width: 150px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.newOrOld')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.newOrOld" style="width: 200px;margin-left: 19px" disabled>
                    <el-radio :label="1" >{{ $t('update4.qx') }}</el-radio>
                    <el-radio :label="2">{{ $t('update4.esc') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.summary')" prop="summary" style="width: 100%;;width: 150px">
                  <el-input v-model="personalForm.summary" :placeholder="$t('update4.qsrzy')" style="margin-left: 18px;width:200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--入库单明细-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">{{ $t('updates.rkdmx') }}</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            border
            size="small"
            style="width: 100%">
            <el-editable-column label="编号" fixed="left" width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" fixed="left" align="center" />
            <el-editable-column :label="$t('Hmodule.hw')" prop="locationCode" align="center" />
            <el-editable-column :label="$t('Hmodule.pc')" prop="batch" align="center" />
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" />
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" />
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" />
            <!--            <el-editable-column prop="basicQuantity" align="center" :label="$t('updates.jbel')" />-->
            <el-editable-column :edit-render="{name: 'ElInputNumber'}" :label="$t('updates.rksl')" prop="actualEnterQuantity" align="center" />
            <el-editable-column :label="$t('Hmodule.dj')" prop="enterPrice" align="center" />
            <el-editable-column :label="$t('updates.rkje')" prop="enterMoney" align="center" >
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.actualEnterQuantity, scope.row.enterPrice) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput'}" :label="$t('updates.bz')" prop="remarks" align="center" />
          </el-editable>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top: 10px">
        <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-form :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('updates.dhslzj')" style="width: 100%;">
                  <span> {{ personalForm.allQuantity }} </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('Stockenter.heji2')" style="width: 100%;">
                  <span> {{ personalForm.allPrice }} </span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.spjl') }}</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="reviewList"
            border
            style="width: 100%">
            <el-table-column
              :label="$t('updates.dqbz')"
              prop="step"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.dqspr')"
              prop="stepHandlerName"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.spsj')"
              prop="handleTime"
              align="center"
              min-width="150"/>
            <el-table-column
              :label="$t('updates.spyj')"
              prop="stat"
              align="center"
              min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | statfilter }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-button v-show="isReview()" :loading="reviewStat" type="warning" size="mini" @click="handleReview( )">{{ $t('public.review') }}</el-button>

        </div>
      </el-card>
      <div class="buttons" style="margin-top: 20px;margin-left: 30px">
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { locationlist } from '@/api/WarehouseAdjust'
import { getdeptlist } from '@/api/BasicSettings'
import { updateotherenter, updateotherenter5 } from '@/api/Stockenter'
import MyRepository from './MyRepository'
import MyDelivery from './MyDelivery'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
import MyCreate from './MyCreate'
var _that
export default {
  components: { MyRepository, MyDetail, MyCreate, MyAccept, MyDelivery },
  filters: {
    statfilter(status) {
      const statusMap = {
        0: _that.$t('updates.wsh'),
        1: _that.$t('updates.shz'),
        2: _that.$t('Hmodule.shtg'),
        3: _that.$t('Hmodule.shbtg')
      }
      return statusMap[status]
    }
  },
  props: {
    detailcontrol: {
      type: Boolean,
      default: false
    },
    detaildata: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 审核步骤数据
      reviewList: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 修改row数据
      personalForm: this.detaildata,
      // 部门数据
      depts: [],
      // 交货人回显
      deliveryPersonId: '',
      // 验收人回显
      acceptPersonId: '',
      // 入库仓库回显
      enterRepositoryId: '',
      // 入库人回显
      enterPersonId: '',
      // 交货人控制框
      deliverycontrol: false,
      // 入库人控制框
      accetpcontrol: false,
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制验收人选择窗口
      createcontrol: false,
      // 控制商品列表窗口
      control: false,
      // 入库单规则数据
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
          { required: true, message: '请选择入库人', trigger: 'focus' }
        ],
        enterRepositoryId: [
          { required: true, message: '请选择入库仓库', trigger: 'focus' }
        ]
      },
      // 入库单明细数据
      list2: [],
      // 入库明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 入库明细中货位数据
      locationlist: [],
      // 入库单明细列表规则
      validRules: {
        locationId: [
        ]
      },
      reviewStat: false
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      this.deliveryPersonId = this.personalForm.deliveryPersonName
      this.acceptPersonId = this.personalForm.acceptPersonName
      this.enterRepositoryId = this.personalForm.enterRepositoryName
      this.enterPersonId = this.personalForm.enterPersonName
      this.list2 = this.personalForm.otherEnterDetailVos
      let count = 0
      let count2 = 0
      for (let i = 0; i < this.list2.length; i++) {
        // this.personalForm.allQuantity =
        count += this.list2[i].actualEnterQuantity
        count2 += this.list2[i].enterMoney
      }
      this.personalForm.allQuantity = count
      this.personalForm.allPrice = count2
      this.reviewList = []
      const review = this.personalForm.approvalUseVos
      for (const i in review) {
        if (review[i].actualStepHandler !== null) {
          this.reviewList.push(review[i])
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
    // 判断审核按钮
    isReview() {
      if (this.personalForm.approvalUseVos && this.personalForm.approvalUseVos.length !== 0) {
        const approvalUse = this.personalForm.approvalUseVos
        const index = approvalUse[approvalUse.length - 1].stepHandler.indexOf(',' + this.$store.getters.userId + ',')
        console.log(approvalUse[approvalUse.length - 1].stepHandler)
        console.log(index)
        if (index > -1 && (this.personalForm.judgeStat === 1 || this.personalForm.judgeStat === 0)) {
          return true
        }
      }
    },
    // 审批操作
    handleReview() {
      this.reviewStat = true
      this.$confirm(this.$t('prompt.qsh'), this.$t('prompt.sh'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('prompt.tg'),
        cancelButtonText: this.$t('prompt.btg'),
        type: 'warning'
      }).then(() => {
        updateotherenter5(this.personalForm, 2, this.$store.getters.userId).then(res => {
          if (res.data.ret === 200) {
            this.$message({
              type: 'success',
              message: this.$t('prompt.shcg')
            })
            this.editVisible = false

            this.$emit('rest', true)
          }
          this.reviewStat = false
        })
      }).catch(action => {
        if (action === 'cancel') {
          // 取消弹框
          this.$confirm('是否确认审核不通过？', 'Warning', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          })
            .then(() => {
              updateotherenter5(this.personalForm, 1, this.$store.getters.userId).then(res => {
                if (res.data.ret === 200) {
                  this.$message({
                    type: 'success',
                    message: this.$t('prompt.shcg')
                  })
                  this.editVisible = false

                  this.$emit('rest', true)
                }
                this.reviewStat = false
              })
            })
            .catch(action => {
              this.$message({
                type: 'info',
                message: action === 'cancel'
                  ? '确认取消'
                  : '停留在当前页面'
              })
            })
          // ================取消弹框结束
        }
        this.reviewStat = false
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
      locationlist(this.personalForm.enterRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list.map(function(item) {
            return {
              'value': item.id,
              'label': item.locationName
            }
          })
        }
      })
    },
    // 交货人foucs事件触发
    handlechooseDelivery() {
      this.deliverycontrol = true
    },
    deliveryName(val) {
      this.deliveryPersonId = val.personName
      this.personalForm.deliveryPersonId = val.id
    },
    // 验收人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 验收人返回数据
    createname(val) {
      console.log(val)
      this.acceptPersonId = val.personName
      this.personalForm.acceptPersonId = val.id
    },
    // 入库人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    // 入库人列表返回数据
    acceptName(val) {
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
      this.locationlistparms.repositoryId = val.id
      locationlist(this.locationlistparms).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list.map(function(item) {
            return {
              'value': item.id,
              'label': item.locationName
            }
          })
        }
      })
    },
    // 入库单事件
    // 新增入库单明细
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
    // 入库金额计算
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
      console.log(this.personalForm)
      const rest = this.$refs.editable.getRecords()
      if (rest !== true) {
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
        if (elem.actualEnterQuantity === null || elem.actualEnterQuantity === '' || elem.actualEnterQuantity === undefined) {
          delete elem.actualEnterQuantity
        }
        if (elem.enterQuantity === null || elem.enterQuantity === '' || elem.enterQuantity === undefined) {
          delete elem.enterQuantity
        }
        if (elem.enterPrice === null || elem.enterPrice === '' || elem.enterPrice === undefined) {
          delete elem.enterPrice
        }
        if (elem.enterMoney === null || elem.enterMoney === '' || elem.enterMoney === undefined) {
          delete elem.enterMoney
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        return elem
      })
      const parms2 = JSON.stringify(rest)
      updateotherenter(this.personalForm, parms2).then(res => {
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
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .edit >>> .el-dialog{
    -webkit-transform: none;
    transform: none;
    position: absolute;
    right: 0;
    left: auto;
    height: auto;
  }
  .edit >>> .el-dialog__header{
    background: #fff;
    position: fixed;
    top: 0;
    display: block;
    width: 1010px;
    z-index: 100;
    border-bottom: 1px solid #f1f1f1;
  }
  .edit >>> .el-dialog__body{
    padding-left: 0;
    padding-right: 0;
    padding-top: 10px;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
  @media print {
    .print {
      display: none;
    }
    .print2 {
      display: block !important;
    }
  }
</style>
