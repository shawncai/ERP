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
                <el-form-item :label="$t('AccessMaterials.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AccessMaterials.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.sourceType" style="width: 200px" @change="chooseType">
                    <el-option :label="$t('Hmodule.Productiontasks')" value="1" />
                    <el-option :label="$t('Hmodule.Nosource')" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AccessMaterials.produceTaskNumber')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.produceTaskNumber" :disabled="addsouce" style="width: 200px" clearable @focus="handleAddSouce"/>
                </el-form-item>
                <produce-task :procontrol.sync="producecontrol" @moredata="moredata"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AccessMaterials.deptId')" prop="produceDeptId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.produceDeptId" clearable style="width: 200px" @change="choosedept">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AccessMaterials.processType')" prop="processType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.processType" style="width: 200px">
                    <el-option :label="$t('Hmodule.jiagong1')" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AccessMaterials.accessPersonId')" prop="handlePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="accessPersonId" style="width: 200px" clearable @focus="handlechooseStock"/>
                  <my-delivery :deliverycontrol.sync="stockControl" @deliveryName="stockName"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AccessMaterials.accessDate')" prop="accessDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.accessDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('AccessMaterials.accessRepositoryId')" prop="produceRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="accessRepositoryId" style="width: 200px" clearable @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('updates.lx')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.accessType" style="width: 200px">
                    <el-option :label="$t('update4.shenghcang')" value="1" />
                    <el-option :label="$t('update4.feishengchanleixing')" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--子件信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">
        <div ref="fuzhu" class="form-name">{{ $t('Hmodule.lldmx') }}</div>
        <div class="buttons" style="margin-top: 58px">
          <el-button :disabled="addpro" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <my-detail2 :control.sync="control" :personalform="personalForm" @product="productdetail"/>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
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
            style="width: 100%">
            <el-editable-column type="selection" min-width="55" align="center"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.hw')" prop="locationCode" align="center" width="200px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.locationCode" :value="scope.row.locationCode" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="margin-left: 18px;width: 100%;margin-bottom: 0" @visible-change="updatebatch($event,scope)">
                  <el-option
                    v-for="item in locationlist"
                    :key="item.id"
                    :value="item.id"
                    :label="item.locationCode"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.pc')" prop="batch" align="center" width="200px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="margin-left: 18px;width: 100%;margin-bottom: 0" @visible-change="updatebatch2($event,scope)">
                  <el-option
                    v-for="(item, index) in batchlist"
                    :key="index"
                    :value="item"
                    :label="item"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getmylocation(scope) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getTypeName(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElSelect', options: workCenterIds, type: 'visible'}" :label="$t('Hmodule.ggzx')" prop="workCenterId" align="center" min-width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('Hmodule.xqsl')" prop="requireQuantity" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getPlanQuantity(scope.row) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1.00, precision: 2}, type: 'visible'}" :label="$t('Hmodule.llsl')" prop="accessQuantity" align="center" min-width="150">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :precision="2"
                  :controls="true"
                  :min="1.00"
                  v-model="scope.row.accessQuantity"
                  @change="queryStock(scope.row)"
                />
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('Hmodule.ytlsl')" prop="retreatQuantity" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.dj')" prop="price" align="center" min-width="150px"/>
            <el-editable-column :label="$t('Hmodule.je')" prop="totalMoney" align="center" min-width="150px">
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.accessQuantity, scope.row.price, scope.row) }}</p>
              </template>
            </el-editable-column>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { getDetailByTaskNumber, addaccessmaterials } from '@/api/AccessMaterials'
import { materialslist, searchprocessFile, searchworkCenter, batchlist, getlocation, searchMea, countlist } from '@/api/public'
import { searchEmpCategory3 } from '@/api/Product'
import { getdeptlist } from '@/api/BasicSettings'
import MyDetail from './components/MyDetail'
import MyRepository from './components/MyRepository'
import ProduceTask from './components/ProduceTask'
import MyDetail2 from './components/MyDetail2'
import MyDelivery from './components/MyDelivery'
import { getAllBatch } from '@/api/public'
var _that
export default {
  name: 'AddAccessMaterials',
  components: { MyDelivery, MyDetail2, ProduceTask, MyRepository, MyDetail },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    return {
      // 货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 货位数据
      locationlist: [],
      loc: [],
      // 批次列表
      batchlist: [],
      // 领料仓库回显
      accessRepositoryId: '',
      // 控制领料仓库
      repositorycontrol: false,
      // 需求列表过来数据
      needsdata: [],
      // 控制添加商品按钮
      addpro: true,
      // 控制从源单中选择按钮
      addsouce: true,
      // 生产任务单回显
      producePlanNumber: '',
      // 领料人回显
      accessPersonId: '',
      // 部门数据
      depts: [],
      // 领料人控制
      stockControl: false,
      // 生产任务单控制
      producecontrol: false,
      // 控制工作中心
      centercontrol: false,
      // 控制无来源商品列表窗口
      control: false,
      // 生产任务信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        accessType: '1'
      },
      // 生产任务规则数据
      personalrules: {
        produceDeptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        processType: [
          { required: true, message: '请选择加工类型', trigger: 'change' }
        ],
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ]
      },
      // 生产任务明细数据
      list2: [],
      // bom编码数据
      bomNumbers: [],
      // 工艺路线
      processes: [],
      // 工作中心数据
      workCenterIds: [],
      // 生产任务明细列表规则
      validRules: {
      }
    }
  },
  created() {
    this.getList()
    this.chooseType()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    queryStock(row) {
      if (row.locationCode === null || row.locationCode === '' || row.locationCode === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: '仓库不存在此商品!',
          offset: 100
        })
        row.accessQuantity = 1
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
        countlist(this.personalForm.accessRepositoryId, 0, row.productCode).then(res => {
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content)
            if (res.data.data.content.list.length === 0) {
              this.$notify.error({
                title: 'wrong',
                message: '仓库内无该物品',
                offset: 100
              })
              row.accessQuantity = 1
              return false
            }
            if (row.accessQuantity > res.data.data.content.list[0].existStock) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.sqslcg'),
                offset: 100
              })
              row.accessQuantity = res.data.data.content.list[0].existStock
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
            if (row.accessQuantity > res.data.data.content[0].accessQuantity) {
              this.$notify.error({
                title: 'wrong',
                message: this.$t('prompt.ckslcgpcsl'),
                offset: 100
              })
              row.accessQuantity = 1
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
    },
    getmylocation(scope) {
      if (scope.row.flag === undefined) {
        scope.row.flag = true
      } else {
        return scope.row.productCode
      }
      if (scope.row.flag) {
        if (scope.row.batch === null || scope.row.batch === '' || scope.row.batch === undefined) {
          const parms3 = scope.row.productCode
          batchlist(this.personalForm.accessRepositoryId, parms3).then(res => {
            if (res.data.data.content.length > 0) {
              scope.row.batch = res.data.data.content[0]
            }
          })
        } else {
          const parms3 = scope.row.productCode
          batchlist(this.personalForm.accessRepositoryId, parms3).then(res => {
            if (res.data.data.content.length === 0) {
              if (scope.row.batch !== '不使用') {
                scope.row.batch = null
              }
            }
          })
        }
        getlocation(this.personalForm.accessRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              scope.row.locationCode = res.data.data.content[0].id
            }
          }
        })
      }
      scope.row.flag = false
      return scope.row.productCode
    },
    // 需求数量取整
    getPlanQuantity(row) {
      console.log(row)
      searchMea(row.unit).then(res => {
        if (res.data.data.content[0].type === 1) {
          row.requireQuantity = Math.ceil(row.requireQuantity)
        }
      })
      return row.requireQuantity
    },
    // 总金额计算
    getSize(quan, pric, row) {
      row.totalMoney = quan * pric
      return row.totalMoney
    },
    // 获取货位和批次
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.accessRepositoryId)
        if (this.personalForm.accessRepositoryId === undefined || this.personalForm.accessRepositoryId === '') {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.sqslcg'),
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.accessRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              scope.row.locationId = res.data.data.content[0].id
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
      batchlist(this.personalForm.accessRepositoryId, parms3).then(res => {
        this.batchlist = res.data.data.content
      })
    },
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.accessRepositoryId, parms3).then(res => {
          this.batchlist = res.data.data.content
        })
      }
    },
    // 获取规格
    getTypeName(row) {
      console.log('查询数据', row)
      searchEmpCategory3(row.typeId || 0).then(res => {
        console.log('原始', row)
        if (res.data.ret === 200) {
          row.productType = res.data.data.content.list[0].categoryName
          console.log('2222222', row, row.productType)
        }
      })
      return row.productType
    },
    // 生产任务单选择focus控制
    handleAddSouce() {
      if (this.personalForm.accessRepositoryId === '' || this.personalForm.accessRepositoryId === null || this.personalForm.accessRepositoryId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.qxxzck'),
          offset: 100
        })
        return false
      }
      if (this.personalForm.produceDeptId === '' || this.personalForm.produceDeptId === null || this.personalForm.produceDeptId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择部门',
          offset: 100
        })
        return false
      }
      this.producecontrol = true
    },
    moredata(val) {
      console.log(val)
      this.personalForm.produceTaskNumber = val.taskNumber
      getDetailByTaskNumber(this.personalForm.produceTaskNumber, this.personalForm.accessRepositoryId).then(res => {
        console.log(res)
        if (res.data.ret === 100) {
          this.$notify.error({
            title: 'wrong',
            message: res.data.msg,
            offset: 100
          })
        }
        if (res.data.ret === 200) {
          if (res.data.data.wrong !== '' && res.data.data.wrong !== null && res.data.data.wrong !== undefined) {
            this.$notify.error({
              title: '错误提示',
              message: res.data.data.wrong,
              offset: 100
            })
          }
          const nowlistdata = this.$refs.editable.getRecords()
          const detaildata = res.data.data.content
          for (let i = 0; i < detaildata.length; i++) {
            for (let j = 0; j < nowlistdata.length; j++) {
              if (detaildata[i].productCode === nowlistdata[j].productCode) {
                this.$notify.error({
                  title: 'wrong',
                  message: this.$t('prompt.wpytj'),
                  offset: 100
                })
                return false
              }
            }
            detaildata[i].totalMoney = 0
            detaildata[i].price = 0
            this.$refs.editable.insert(detaildata[i])
          }
        }
      })
    },
    // 加载bom编码数据和工艺路线
    getList() {
      materialslist().then(res => {
        if (res.data.ret === 200) {
          this.bomNumbers = res.data.data.content.list.map(function(item) {
            return {
              label: item.bomNumber,
              value: item.bomNumber
            }
          })
        }
      })
      // 工艺路线数据
      searchprocessFile().then(res => {
        if (res.data.ret === 200) {
          this.processes = res.data.data.content.list.map(function(item) {
            return {
              label: item.processName,
              value: item.processName
            }
          })
        }
      })
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    // 仓库回显
    repositoryname(val) {
      console.log(val)
      this.accessRepositoryId = val.repositoryName
      this.personalForm.accessRepositoryId = val.id
    },
    // 选择部门focus事件
    choosedept() {
      console.log(this.personalForm.produceDeptId)
      if (this.personalForm.produceDeptId !== '' && this.personalForm.produceDeptId !== null && this.personalForm.produceDeptId !== undefined) {
        // 工作中心数据
        searchworkCenter(this.personalForm.produceDeptId).then(res => {
          if (res.data.ret === 200) {
            this.workCenterIds = res.data.data.content.list.map(function(item) {
              return {
                label: item.workCenterName,
                value: item.id
              }
            })
          }
        })
      }
    },
    // 选择源单类型事件
    chooseType() {
      console.log(this.personalForm.sourceType)
      if (this.personalForm.sourceType === '1') {
        this.addsouce = false
        this.addpro = true
        this.$refs.editable.clear()
      } else if (this.personalForm.sourceType === '2') {
        this.addpro = false
        this.addsouce = true
        this.personalForm.produceTaskNumber = ''
        this.produceTaskNumber = ''
        this.$refs.editable.clear()
      }
    },
    // 无来源添加商品
    handleAddproduct() {
      if (this.personalForm.produceDeptId === '' || this.personalForm.produceDeptId === null || this.personalForm.produceDeptId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择部门',
          offset: 100
        })
        return false
      }
      this.control = true
    },
    // 无来源数据添加
    productdetail(val) {
      this.$refs.editable.clear()
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
    // 领料人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 领料人回显
    stockName(val) {
      this.accessPersonId = val.personName
      this.personalForm.accessPersonId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        accessType: '1'
      }
      this.produceTaskNumber = null
      this.accessPersonId = null
      this.accessRepositoryId = null
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      EnterDetail.map(function(elem) {
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
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          delete elem.batch
        }
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        if (elem.bomNumber === null || elem.bomNumber === '' || elem.bomNumber === undefined) {
          delete elem.bomNumber
        }
        if (elem.requireQuantity === null || elem.requireQuantity === '' || elem.requireQuantity === undefined) {
          delete elem.requireQuantity
        }
        if (elem.accessQuantity === null || elem.accessQuantity === '' || elem.accessQuantity === undefined) {
          delete elem.accessQuantity
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      console.log(parms, parms2)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addaccessmaterials(parms, parms2, this.personalForm).then(res => {
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
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/AccessMaterials/AddAccessMaterials', name: 'AddAccessMaterials', fullPath: '/AccessMaterials/AddAccessMaterials', title: 'AddAccessMaterials' }
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
