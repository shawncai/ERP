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
                <el-form-item :label="$t('StockOut.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" placeholder="请输入出库单主题" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOut.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.sourceType" placeholder="请选择源单类型" style="width: 200px" @change="chooseSource" >
                    <el-option :label="$t('update4.wulaiyuan')" value="1"/>
                    <el-option value="2" label="外包单"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('SaleReturn.sourceNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.sourceNumber" :disabled="IsNumber" style="width: 200px" @focus="openoppo"/>
                  <out-source :outsourcecontrol.sync="outsourcecontrol" @outSourceDetail="outSourceDetail" @outSource="outSource"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('OutSource.outFactoryName')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.outFactoryName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOut.sendAddress')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.sendAddress" placeholder="请输入发货地址" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOut.receiverAddress')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.receiverAddress" placeholder="请输入收货地址" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOut.outDeptId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.outDeptId" placeholder="请选择出库部门" style="width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOut.outPersonId')" prop="outPersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="outPersonId" placeholder="请选择出库人" style="width: 200px" clearable disabled @focus="handlechooseAccept"/>
                </el-form-item>
                <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
              </el-col>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item :label="$t('StockOut.outReasonId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">-->
              <!--                  <el-select v-model="personalForm.outReasonId" placeholder="请选择出库原因" style="width: 200px" clearable >-->
              <!--                    <el-option value="1" label="原因1"/>-->
              <!--                    <el-option value="2" label="原因2"/>-->
              <!--                  </el-select>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->
              <el-col :span="6">
                <el-form-item :label="$t('StockOut.outRepositoryId')" prop="outRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="outRepositoryId" placeholder="请选择出库仓库" style="width: 200px" clearable @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOut.time')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.outDate"
                    :picker-options="pickerOptions2"

                    placeholder="出库时间"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOut.summary')" prop="summary" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.summary" :placeholder="$t('update4.qsrzy')" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--出库单明细-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="fuzhu" class="form-name">{{ $t('updates.ckdmx') }}</div>
        <div class="buttons" style="margin-top: 25px">
          <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <el-button type="primary" @click="checkStock()">{{ $t('updates.kckz') }}</el-button>
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
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.hw')" prop="location" align="center" min-width="150">
              <template slot-scope="scope">
                <p>{{ getLocationData(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-select v-if="scope.row.batch !== '不使用'" v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="margin-left: 18px;width: 100%;margin-bottom: 0" @visible-change="updatebatch2($event,scope)">
                  <el-option
                    v-for="(item, index) in batchlist"
                    :key="index"
                    :value="item"
                    :label="item"/>
                </el-select>
                <span v-else>{{ scope.row.batch }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <!--            <el-editable-column :label="$t('updates.jbel')" prop="basicQuantity" align="center" width="150px"/>-->
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1.00, precision: 6}, type: 'visible'}" :label="$t('updates.cksli')" prop="outQuantity" align="center" min-width="150">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="6"
                  :controls="true"
                  :min="1.00"
                  v-model="scope.row.outQuantity"
                  @change="queryStock(scope.row)"
                />
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.dj')" prop="outPrice" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ckje')" prop="totalMoney" align="center" width="150px">
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.outQuantity, scope.row.outPrice) }}</p>
              </template>
            </el-editable-column>
          <!--            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>-->
          </el-editable>
        </div>
      </el-card>

      <!-- 合计信息 -->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px; margin-bottom: 20px">

        <div ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</div>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('StockOut.heji')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="heji1" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('StockOut.heji2')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="heji2" style="width: 200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">

        <el-button :loading="saveloading" type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
      <el-dialog :visible.sync="receiptVisible2" title="库存快照" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                :data="list111"
                height="220"
                style="margin-left: 18px;width: 100%;margin-bottom: 0"
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
import { getAllBatch } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import { addOutsourceOut } from '@/api/OutSourceOut'
import { batchlist, getlocation, countlist } from '@/api/public'
import MyRepository from './components/MyRepository'
import MyAccept from './components/MyAccept'
import MyDetail from './components/MyDetail'
import MyCreate from './components/MyCreate'
import OutSource from './components/OutSource'
var _that
export default {
  name: 'AddOutSourceOut',
  components: { MyRepository, MyDetail, MyCreate, MyAccept, OutSource },
  data() {
    const validatePass2 = (rule, value, callback) => {
      console.log(this.saleRepositoryId)
      if (this.outRepositoryId === undefined || this.outRepositoryId === null || this.outRepositoryId === '') {
        callback(new Error('请选择出库仓库'))
      } else {
        callback()
      }
    }
    return {
      saveloading: false,
      pickerOptions2: {
        disabledDate: (time) => {
          const _now = Date.now()
          const seven = 60 * 24 * 60 * 60 * 1000
          const sevenDays = _now - seven
          return time.getTime() > _now || time.getTime() < sevenDays
        }
      },
      // 合计信息
      heji1: 0,
      heji2: 0,
      // 批次列表
      batchlist: [],
      // 部门数据
      depts: [],
      // 出库仓库回显
      outRepositoryId: '',
      // 出库人回显
      outPersonId: this.$store.getters.name,
      // 出库人控制框
      accetpcontrol: false,
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制经办人选择窗口
      createcontrol: false,
      // 控制商品列表窗口
      control: false,
      // 出库信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        outPersonId: this.$store.getters.userId
      },
      // 出库单规则数据
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
        sendAddress: [
          { required: true, message: '请输入发货地址', trigger: 'blur' }
        ],
        outPersonId: [
          { required: true, message: '请选择出库人', trigger: 'focus' }
        ],
        outRepositoryId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ]
      },
      IsNumber: true,
      // 出库单明细数据
      list2: [],
      // 出库明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 出库明细中货位数据
      locationlist: [],
      // 出库单明细列表规则
      validRules: {
        // outQuantity: [
        //   { required: true, message: '请填写出库数量', trigger: 'change' }
        // ]
      },
      outsourcecontrol: false,
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: []
    }
  },
  watch: {
    list2: {
      handler() {
        let num = 0
        let num1 = 0
        for (const i in this.list2) {
          console.log(this.list2[i])
          num += Number(this.list2[i].outQuantity)
          num1 += Number(this.list2[i].outQuantity * this.list2[i].outPrice)
        }
        this.heji1 = num
        this.heji2 = num1
      },
      deep: true
    }
  },

  mounted() {
    this.getlist()
    this.getdatatime()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    outSourceDetail(val) {
      console.log(val)
      this.$refs.editable.clear()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
      }
    },
    outSource(val) {
      console.log(val)
      this.personalForm.outFactoryName = val.outFactoryName
      this.personalForm.sourceNumber = val.number
    },
    // 控制源单类型
    chooseSource(val) {
      if (val === '2') {
        this.Isproduct = true
        this.IsNumber = false
        this.$refs.editable.clear()
        this.personalForm.sourceNumber = ''
      } else if (val === '1') {
        this.Isproduct = false
        this.IsNumber = true
        this.$refs.editable.clear()
        this.personalForm.sourceNumber = ''
      }
    },
    openoppo() {
      if (this.outRepositoryId === null || this.outRepositoryId === '' || this.outRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzckck'),
          offset: 100
        })
        return false
      }
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '2') {
        this.outsourcecontrol = true
      }
    },
    // 默认显示今天
    getdatatime() { // 默认显示今天
      this.personalForm.outDate = new Date()
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
    // 部门列表数据
    getlist() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 出库人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    // 出库人列表返回数据
    acceptName(val) {
      this.outPersonId = val.personName
      this.personalForm.outPersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        elem.outQuantity = 1
      })
      console.log(val)
      this.outRepositoryId = val.repositoryName
      this.personalForm.outRepositoryId = val.id
    },
    // 批次
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.outRepositoryId)
        if (this.personalForm.outRepositoryId === undefined || this.personalForm.outRepositoryId === '') {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.sqslcg'),
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.outRepositoryId, scope.row).then(res => {
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
      batchlist(this.personalForm.outRepositoryId, parms3).then(res => {
        this.batchlist = res.data.data.content
      })
    },
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.outRepositoryId, parms3).then(res => {
          console.log(res)
          this.batchlist = res.data.data.content
        })
      }
    },
    queryStock(row) {
      if (row.location === null || row.location === '' || row.location === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: '仓库不存在此商品!',
          offset: 100
        })
        row.outQuantity = 1
        return false
      }
      // 1.批次只有一个 不能超过总库存
      // 2.批次有多个 不能超过单个批次数量
      let i = 0
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === row.productCode) {
          i++
        }
      })
      if (i === 1) {
        // 1.批次只有一个 不能超过总库存
        countlist(this.personalForm.outRepositoryId, 0, row.productCode).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (res.data.data.content.list.length === 0) {
              this.$notify.error({
                title: 'wrong',
                message: '仓库内无该物品',
                offset: 100
              })
              row.outQuantity = 1
              return false
            }
            if (row.outQuantity > res.data.data.content.list[0].existStock) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.sqslcg'),
                offset: 100
              })
              row.outQuantity = 1
              return false
            }
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      } else {
        // 2.批次有多个 不能超过单个批次数量
        const param = {}
        param.productCode = row.productCode
        param.batch = row.batch
        param.repositoryId = row.repositoryId
        getAllBatch(param).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (row.outQuantity > res.data.data.content[0].outQuantity) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.ckslcgpcsl'),
                offset: 100
              })
              row.outQuantity = 1
              return false
            }
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }

      if (row.discountRate === 0) {
        row.discountMoney = row.taxprice * row.outQuantity
      } else {
        row.discountMoney = (row.taxprice * row.outQuantity * (1 - row.discountRate / 100)).toFixed(6)
      }
    },
    getLocationData(row) {
      // 默认批次
      if (row.batch === null || row.batch === '' || row.batch === undefined) {
        const parms3 = row.productCode
        batchlist(this.personalForm.outRepositoryId, parms3).then(res => {
          console.log(res)
          if (res.data.data.content.length > 0) {
            row.batch = res.data.data.content[0]
          }
        })
      } else {
        const parms3 = row.productCode
        batchlist(this.personalForm.outRepositoryId, parms3).then(res => {
          if (res.data.data.content.length === 0) {
            if (row.batch !== '不使用') {
              row.batch = null
            }
          }
        })
      }
      // 默认货位
      getlocation(this.personalForm.outRepositoryId, row).then(res => {
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
    // 出库单事件
    // 新增出库单明细
    handleAddproduct() {
      if (this.outRepositoryId === null || this.outRepositoryId === '' || this.outRepositoryId === undefined) {
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
      // const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        // for (let j = 0; j < nowlistdata.length; j++) {
        //   if (val[i].productCode === nowlistdata[j].productCode) {
        //     this.$notify.error({
        //       title: 'wrong',
        //       message: this.$t('prompt.wpytj'),
        //       offset: 100
        //     })
        //     return false
        //   }
        // }
        this.$refs.editable.insert(val[i])
      }
    },
    // 出库金额计算
    getSize(quan, pric) {
      return (Number(quan) * Number(pric)).toFixed(2)
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        outDate: new Date(),
        outPersonId: this.$store.getters.userId
      }
      this.produceManagerId = ''
      this.outRepositoryId = ''
      this.outPersonId = ''
      this.outPersonId = this.$store.getters.name
    },
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    // 保存操作
    handlesave() {
      this.saveloading = true
      setTimeout(() => {
        const EnterDetail = this.deepClone(this.$refs.editable.getRecords())
        // 保存时同样商品不能有同一个批次
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
        // 批次货位不能为空
        let j = 1
        EnterDetail.map(function(elem) {
          return elem
        }).forEach(function(elem) {
          if (elem.batch === null || elem.batch === undefined || elem.batch === '' || elem.location === null || elem.location === undefined || elem.location === '') {
            j = 2
          }
        })
        console.log(j)
        if (j === 2) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.pchwbnwk'),
            offset: 100
          })
          this.saveloading = false
          return false
        }
        console.log(this.personalForm)
        console.log(EnterDetail)
        if (EnterDetail.length === 0) {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.mxbbnwk'),
            offset: 100
          })
          this.saveloading = false
          return false
        }
        EnterDetail.map(function(elem) {
          return elem
        }).forEach(function(elem) {
          elem.totalMoney = elem.outQuantity * elem.outPrice
          if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
            delete elem.locationId
          }
          if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
            delete elem.productCode
          }
          if (elem.batch === null || elem.batch === '' || elem.batch === undefined || elem.batch === '不使用') {
            delete elem.batch
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
          if (elem.outQuantity === null || elem.outQuantity === '' || elem.outQuantity === undefined) {
            delete elem.outQuantity
          }
          if (elem.enterQuantity === null || elem.enterQuantity === '' || elem.enterQuantity === undefined) {
            delete elem.enterQuantity
          }
          if (elem.outPrice === null || elem.outPrice === '' || elem.outPrice === undefined) {
            delete elem.outPrice
          }
          if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
            delete elem.totalMoney
          }
          if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
            delete elem.remarks
          }
          return elem
        })
        console.log('123', 123)
        const parms = JSON.stringify(EnterDetail)
        this.$refs.personalForm.validate((valid) => {
          if (valid) {
            console.log('223', 223)
            this.$refs.editable.validate().then(valid => {
              if (valid) {
                console.log('223', 323)
                console.log(this.personalForm, parms)
                const Data = this.personalForm
                for (const key in Data) {
                  if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
                    delete Data[key]
                  }
                // if (key === 'judgeStat') {
                //   delete Data[key]
                // }
                }
                const parmss = JSON.stringify(Data)
                addOutsourceOut(parmss, parms, this.personalForm).then(res => {
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
                  this.saveloading = false
                })
              }
            }).catch(valid => {
              this.$notify.error({
                title: 'wrong',
                message: 'Information is incomplete1',
                offset: 100
              })
              this.saveloading = false
              return false
            })
          } else {
            this.$notify.error({
              title: 'wrong',
              message: 'Information is incomplete2',
              offset: 100
            })
            this.saveloading = false
            return false
          }
        })
      }, 1000 * 0.5)
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/StockOut/NewStockOut', name: 'NewStockOut', fullPath: '/StockOut/NewStockOut', title: 'NewStockOut' }
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
