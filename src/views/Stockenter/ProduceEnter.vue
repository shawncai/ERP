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
                <el-form-item :label="$t('Stockenter.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.sourceType')" prop="sourceType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.sourceType" style="margin-left: 18px;width: 200px" clearable >
                    <el-option :label="$t('updates.zscrw')" value="1"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.sourceNumber')" prop="sourceNumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.produceTaskNumber" style="width: 200px" clearable @focus="handleAddSouce"/>
                </el-form-item>
                <produce-task :procontrol.sync="producecontrol" @moredata="moredata" @productDetail="productDetail"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.processType')" prop="processType" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.processType" style="width: 200px" clearable >
                    <el-option value="1" label="加工1"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.produceManagerId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="produceManagerId" style="width: 200px" clearable @focus="handlechoose"/>
                </el-form-item>
                <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterPersonId')" prop="enterPersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="enterPersonId" style="width: 200px" clearable @focus="handlechooseAccept"/>
                </el-form-item>
                <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterDeptId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.enterDeptId" style="width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterRepositoryId')" prop="enterRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="enterRepositoryId" style="width: 200px" clearable @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.summary')" prop="summary" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.summary" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--入库单明细-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">

        <div ref="fuzhu" class="form-name">{{ $t('updates.rkdmx') }}</div>
        <div class="buttons" style="margin-top: 58px">
          <!-- <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button> -->
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
            size="small"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column :edit-render="{name: 'ElSelect', type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px">
              <template slot-scope="scope" edit="scope">
                <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="margin-left: 18px;width: 100%;margin-bottom: 0" @visible-change="updatebatch($event,scope)" @change="changelocation(scope.row)">
                  <el-option
                    v-for="(item, index) in locationlist"
                    :key="index"
                    :value="item.id"
                    :label="item.locationCode"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible', events: {change: changebatch}}" :label="$t('Hmodule.pc')" prop="batch" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.jbel')" prop="basicQuantity" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" :label="$t('updates.rksl')" prop="actualEnterQuantity" align="center" width="150px">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  :controls="false"
                  :min="0"
                  v-model="scope.row.actualEnterQuantity"
                  @change="changequantity(scope)"/>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" width="150px"/>
          </el-editable>
        </div>
      </el-card>

      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">
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
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.jbel')" prop="basicQuantity" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.rksl')" prop="actualEnterQuantity" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ydxh')" prop="sourceSerialNumber" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.cjbm')" prop="carCode" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isEdit2(scope.row)" v-model="scope.row.carCode" clearable/>
                <span v-else>{{ scope.row.carCode }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.djbm')" prop="motorCode" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isEdit2(scope.row)" v-model="scope.row.motorCode" clearable/>
                <span v-else>{{ scope.row.motorCode }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.dcbm')" prop="batteryCode" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isEdit2(scope.row)" v-model="scope.row.batteryCode" clearable/>
                <span v-else>{{ scope.row.batteryCode }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.sncode')" prop="snCode" align="center" min-width="150" >
              <template slot="edit" slot-scope="scope">
                <el-input v-if="isEdit2(scope.row)" v-model="scope.row.snCode" clearable/>
                <span v-else>{{ scope.row.snCode }}</span>
              </template>
            </el-editable-column>
          </el-editable>
        </div>

      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">
        <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
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
import { getlocation, locationlist, countlist } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import { addproduceenter } from '@/api/Stockenter'
import MyRepository from './components/MyRepository'
import ProduceTask from './components/ProduceTask'
import MyAccept from './components/MyAccept'
import MyDetail from './components/MyDetail'
import MyCreate from './components/MyCreate'
var _that
export default {
  name: 'ProduceEnter',
  components: { MyRepository, MyDetail, MyCreate, MyAccept, ProduceTask },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (this.personalForm.produceTaskNumber === undefined || this.personalForm.produceTaskNumber === null || this.personalForm.produceTaskNumber === '') {
        callback(new Error('请选择源单'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (this.enterPersonId === undefined || this.enterPersonId === null || this.enterPersonId === '') {
        callback(new Error('请选择入库人'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(value)
      if (this.enterRepositoryId === undefined || this.enterRepositoryId === null || this.enterRepositoryId === '') {
        callback(new Error('请选择仓库'))
      } else {
        callback()
      }
    }
    return {
      // 生产任务单控制
      producecontrol: false,
      // 部门数据
      depts: [],
      // 生产负责人回显
      produceManagerId: '',
      // 生产入库仓库回显
      enterRepositoryId: this.$store.getters.repositoryName,
      // 生产入库人回显
      enterPersonId: this.$store.getters.name,
      // 生产入库人控制框
      accetpcontrol: false,
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制生产负责人选择窗口
      createcontrol: false,
      // 控制商品列表窗口
      control: false,
      // 生产入库信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        enterPersonId: this.$store.getters.userId,
        enterRepositoryId: this.$store.getters.repositoryId,
        enterDeptId: this.$store.getters.deptId
      },
      // 生产入库单规则数据
      personalrules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '请选择源单类型', trigger: 'change' }
        ],
        sourceNumber: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        enterPersonId: [
          { required: true, validator: validatePass2, trigger: 'focus' }
        ],
        enterRepositoryId: [
          { required: true, validator: validatePass3, trigger: 'focus' }
        ]
      },
      // 生产入库单明细数据
      list2: [],
      list3: [],
      // 生产入库明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 生产入库明细中货位数据
      locationlist: [],
      // 生产入库单明细列表规则
      validRules: {
        locationId: [
          { required: true, message: '请选择货位', trigger: 'change' }
        ],
        actualEnterQuantity: [
          { required: true, message: '请输入入库数量', trigger: 'blur' }
        ]
      },
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: []
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    changebatch(row) {
      console.log('row1', row)
      const val = this.$refs.editable.getRecords()
      const val2 = this.$refs.editable2.getRecords()
      for (const i in val) {
        for (const j in val2) {
          if (val[i].productCode === val2[j].productCode) {
            val2[j].batch = val[i].batch
          }
        }
      }
    },
    changelocation(row) {
      console.log('row1', row)
      const val = this.$refs.editable.getRecords()
      const val2 = this.$refs.editable2.getRecords()
      for (const i in val) {
        for (const j in val2) {
          if (val[i].productCode === val2[j].productCode) {
            val2[j].locationId = val[i].locationId
          }
        }
      }
    },
    changequantity(scope) {
      const newarr = []
      const that = this
      const val = this.$refs.editable.getRecords()
      console.log('val2', val)
      this.$refs.editable2.clear()
      for (let i = 0; i < val.length; i++) {
        // val[i].actualEnterQuantity = val[i].produceQuantity - val[i].alreadyEnterQuantity
        const re = val[i].productCode.slice(0, 2)
        if (re === '01' && that.$store.getters.countryId === 2) {
          const arrlength = Number(val[i].actualEnterQuantity)
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
        this.$refs.editable2.insert(newarr[j])
      }
    },
    isEdit2(row) {
      const re = row.productCode.slice(0, 2)
      // if (re === '01') {
      //   row.quantity = 1
      //   return row.quantity
      // }
      if (re === '01') { return true } else { return false }
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
    // 从销售订单过来数据
    productDetail(val) {
      console.log('val', val)
      const newarr = []
      const that = this
      this.$refs.editable.clear()
      this.$refs.editable2.clear()
      const nowlistdata = this.$refs.editable.getRecords()
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable.insert(val[i])
        // val[i].actualEnterQuantity = val[i].produceQuantity - val[i].alreadyEnterQuantity
        const re = val[i].productCode.slice(0, 2)
        if (re === '01' && that.$store.getters.countryId === 2) {
          const arrlength = Number(val[i].passQuantity)
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
        this.$refs.editable2.insert(newarr[j])
      }
    },
    moredata(val) {
      console.log(val)
      this.personalForm.produceTaskNumber = val.taskNumber
      this.personalForm.sourceNumber = val.taskNumber
      this.personalForm.processType = String(val.processType)
      this.produceManagerId = val.handlePersonName
      this.personalForm.produceManagerId = val.handlePersonId
    },
    // 生产任务单选择focus控制
    handleAddSouce() {
      this.producecontrol = true
    },
    // 部门列表数据
    getlist() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 生产负责人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 生产负责人返回数据
    createname(val) {
      console.log(val)
      this.produceManagerId = val.personName
      this.personalForm.produceManagerId = val.id
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
    // getSize(quan, pric) {
    //   return quan * pric
    // },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1'
      }
      this.produceManagerId = ''
      this.enterRepositoryId = ''
      this.enterPersonId = ''
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable2.getRecords()
      // 整车入库时相关编码必填
      let m = 1
      // 整车入库时数量为1
      let n = 1
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        const re = elem.productCode.slice(0, 2)
        if (re === '01') {
          if (elem.carCode === null || elem.carCode === undefined || elem.carCode === '' || elem.motorCode === null || elem.motorCode === undefined || elem.motorCode === '' || elem.batteryCode === null || elem.batteryCode === undefined || elem.batteryCode === '') {
            m = 2
          }
          if (elem.actualEnterQuantity !== 1) {
            n = 2
          }
        }
      })
      if (m === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '整车入库时相关编码必填',
          offset: 100
        })
        return false
      }
      if (n === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '整车入库时数量必须为1',
          offset: 100
        })
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
        return false
      }
      EnterDetail.map(function(elem) {
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
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.actualEnterQuantity === null || elem.actualEnterQuantity === '' || elem.actualEnterQuantity === undefined) {
          delete elem.actualEnterQuantity
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
        return elem
      })
      const parms = JSON.stringify(EnterDetail)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            if (valid) {
              addproduceenter(this.personalForm, parms).then(res => {
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
            }
          }).catch(valid => {
            this.$notify.error({
              title: 'wrong',
              message: 'Information is incomplete',
              offset: 100
            })
            return false
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
      const view = { path: '/Stockenter/NewStockenter', name: 'NewStockenter', fullPath: '/Stockenter/NewStockenter', title: 'NewStockenter' }
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

