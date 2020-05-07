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
                <el-form-item :label="$t('ProduceTask.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProduceTask.deptId')" prop="deptId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.deptId" clearable style="width: 200px">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProduceTask.workCenterId')" prop="workCenterId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="workCenterId" style="width: 200px" clearable @focus="workcenterchoose"/>
                </el-form-item>
                <my-center :control.sync="centercontrol" @center="center"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProduceTask.produceTaskNumber')" prop="produceTaskNumber" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.produceTaskNumber" style="width: 200px" clearable @focus="chooseproduce"/>
                </el-form-item>
                <produce-task :procontrol.sync="producecontrol" @produce="produce" @moredata="moredata"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProduceTask.produceDate')" prop="produceDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.produceDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--生产明细-->
      <el-card :body-style=" { padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <el-tabs v-model="activeName2" type="card">
          <el-tab-pane :label="$t('updates.sczk')" name="first">
            <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;margin-top: 10px">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.countFinishQuantity')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.countFinishQuantity" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.countWorkHours')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.countWorkHours" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <h2 ref="fuzhu" class="form-name" style="margin-top: 10px;">{{ $t('updates.scmxi') }}</h2>
            <div class="buttons" style="margin-top: 58px">
              <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
            </div>
            <div class="container">
              <el-editable
                ref="editable"
                :data.sync="list"
                :edit-config="{ showIcon: true, showStatus: true}"
                :edit-rules="validRules"
                class="click-table1"
                stripe
                border
                size="small"
                style="width: 100%">
                <el-editable-column type="selection" min-width="55" align="center"/>
                <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
                <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
                <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.gs')" prop="workHours" align="center" min-width="150px"/>
                <el-editable-column :edit-render="{ type: 'default'}" :label="$t('updates.wcs')" prop="finishQuantity" align="center" min-width="150px">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.finishQuantity" :value="scope.row.finishQuantity" @focus="finish(scope.row)"/>
                  </template>
                </el-editable-column>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.hgs')" prop="passQuantity" align="center" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.hgl')" prop="passRate" align="center" min-width="150px"/>
              </el-editable>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('updates.ryzk')" name="second">
            <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;margin-top: 10px">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.shouldPeoples')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.shouldPeoples" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.actualPeoples')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.actualPeoples" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.shouldWorkHours')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.shouldWorkHours" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.overtimeHours')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.overtimeHours" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.stopHours')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.stopHours" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.effectiveHours')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.effectiveHours" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <h2 ref="fuzhu" class="form-name" style="margin-top: 10px;">人员明细</h2>
            <div class="buttons" style="margin-top: 58px">
              <el-button @click="handleAddEmp">添加人员</el-button>
              <my-emp :control.sync="empcontrol" :bumen="bumen" @empDetail="empDetail"/>
              <el-button type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
            </div>
            <div class="container">
              <el-editable
                ref="editable2"
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
                <el-editable-column prop="personName" align="center" label="人员" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.gs')" prop="workHours" align="center" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.wcs')" prop="finishQuantity" align="center" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.hgs')" prop="passQuantity" align="center" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.hgl')" prop="passRate" align="center" min-width="150px"/>
              </el-editable>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('updates.sbzk')" name="third">
            <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;margin-top: 10px">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.equipmentQuantity')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.equipmentQuantity" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.actualEquipQuantity')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.actualEquipQuantity" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.allRunTime')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.allRunTime" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.runRate')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.runRate" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.loadRate')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.loadRate" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.useRate')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.useRate" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.stopQuantity')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.stopQuantity" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.stopTime')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.stopTime" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.stopReason')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.stopReason" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <h2 ref="fuzhu" class="form-name" style="margin-top: 10px;">设备明细</h2>
            <div class="buttons" style="margin-top: 58px">
              <el-button @click="$refs.editable3.insert()">添加设备</el-button>
              <el-button type="danger" @click="$refs.editable3.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
            </div>
            <div class="container">
              <el-editable
                ref="editable3"
                :data.sync="list3"
                :edit-config="{ showIcon: true, showStatus: true}"
                :edit-rules="validRules"
                class="click-table1"
                stripe
                border
                size="small"
                style="width: 100%">
                <el-editable-column type="selection" min-width="55" align="center"/>
                <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="equipmentNumber" align="center" label="设备编号" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInput', attrs: {min: 0}, type: 'visible'}" prop="equipmentName" align="center" label="设备名称" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="runTime" align="center" label="开机时长" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.wcs')" prop="finishQuantity" align="center" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.hgs')" prop="passQuantity" align="center" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.hgl')" prop="passRate" align="center" min-width="150px"/>
              </el-editable>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('updates.wlsyqk')" name="fourth">
            <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;margin-top: 10px">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.countAccess')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.countAccess" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.countUseup')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.countUseup" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('ProduceTask.countRemain')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                    <el-input v-model="personalForm.countRemain" style="width: 200px" clearable/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <h2 ref="fuzhu" class="form-name" style="margin-top: 10px;">物料明细</h2>
            <div class="buttons" style="margin-top: 58px">
              <el-button @click="addproduct">添加物料</el-button>
              <el-button type="danger" @click="$refs.editable4.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
              <my-detail :control.sync="control" @product="productdetail"/>
            </div>
            <div class="container">
              <el-editable
                ref="editable4"
                :data.sync="list4"
                :edit-config="{ showIcon: true, showStatus: true}"
                :edit-rules="validRules"
                class="click-table1"
                stripe
                border
                size="small"
                style="width: 100%">
                <el-editable-column type="selection" min-width="55" align="center"/>
                <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
                <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" min-width="150px"/>
                <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="todayAccess" align="center" label="本日领入" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="yesterdayRemain" align="center" label="昨日结存" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="todayUseup" align="center" label="本日耗用" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="todayDamaged" align="center" label="本日损坏" min-width="150px"/>
                <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="todayRemain" align="center" label="本日结存" min-width="150px"/>
              </el-editable>
            </div>
          </el-tab-pane>
        </el-tabs>
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
import { addproducereport } from '@/api/ProduceTask'
import { getdeptlist } from '@/api/BasicSettings'
import MyCenter from './components/MyCenter'
import MyEmp from './components/MyEmp'
import MyDetail from './components/MyDetail'
import ProducePlan from './components/ProducePlan'
import ProduceTask from './components/ProduceTask'
var _that
export default {
  name: 'AddProduceReport',
  components: { ProduceTask, ProducePlan, MyCenter, MyDetail, MyEmp },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      // 控制人员明细
      empcontrol: false,
      // 发送给明细表的参数
      bumen: '',
      // 部门数据
      depts: [],
      // 生产任务回显
      produceTaskNumber: '',
      // 控制标签页
      activeName2: 'first',
      // 工作中心回显
      workCenterId: '',
      // 生产任务控制
      producecontrol: false,
      // 控制工作中心
      centercontrol: false,
      // 控制商品列表窗口
      control: false,
      // 主生产任务信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      },
      // 主生产任务规则数据
      personalrules: {
        produceTaskNumber: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        workCenterId: [
          { required: true, validator: validatePass, trigger: 'focus' }
        ],
        produceDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        deptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ]
      },
      // 生产状况明细数据
      list: [],
      // 人员状况明细数据
      list2: [],
      // 设备状况明细数据
      list3: [],
      // 物料使用情况状况明细数据
      list4: [],
      // 主生产任务明细列表规则
      validRules: {
      }
    }
  },
  created() {
    this.getList()
  },

  mounted() {
    this.getinformation()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    getinformation() {
      if (this.$store.getters.empcontract) {
        console.log('getempcontract', this.$store.getters.empcontract)
        this.moredata(this.$store.getters.empcontract)
        for (let i = 0; i < this.$store.getters.empcontract.produceTaskDetailVos.length; i++) {
          if (i === 0) {
            this.workCenterId = this.$store.getters.empcontract.produceTaskDetailVos[0].workCenter
            this.personalForm.workCenterId = this.$store.getters.empcontract.produceTaskDetailVos[0].workCenterId
          }
          this.$store.getters.empcontract.produceTaskDetailVos[i].workHours = 0
          this.$store.getters.empcontract.produceTaskDetailVos[i].finishQuantity = 0
          this.$store.getters.empcontract.produceTaskDetailVos[i].passQuantity = 0
          this.$store.getters.empcontract.produceTaskDetailVos[i].passRate = 0
          this.$refs.editable.insert(this.$store.getters.empcontract.produceTaskDetailVos[i])
        }
        // this.personalForm.work
        this.$store.dispatch('getempcontract', '')
      }
    },
    // 部门列表数据
    getList() {
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 添加物料控制
    addproduct() {
      this.control = true
    },
    productdetail(val) {
      const nowlistdata = this.$refs.editable4.getRecords()
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
        this.$refs.editable4.insert(val[i])
      }
    },
    // 人员状况明细添加控制
    handleAddEmp() {
      this.empcontrol = true
      this.bumen = this.personalForm
    },
    empDetail(val) {
      for (let i = 0; i < val.length; i++) {
        this.$refs.editable2.insert(val[i])
      }
    },
    // 生产任务单选择focus控制
    chooseproduce() {
      if (this.personalForm.workCenterId === '' || this.personalForm.workCenterId === null || this.personalForm.workCenterId === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择工作中心',
          offset: 100
        })
      } else {
        this.producecontrol = true
      }
    },
    produce(val) {
      for (let i = 0; i < val.length; i++) {
        if (val[i].workCenterId === this.personalForm.workCenterId) {
          val[i].finishQuantity = (val[i].produceQuantity - val[i].alreadyProduceQuantity).toFixed(6)
          this.$refs.editable.insert(val[i])
        }
      }
    },
    moredata(val) {
      this.personalForm.produceTaskNumber = val.taskNumber
    },
    // 表格input事件
    finish(val) {
      console.log(123)
      console.log(val)
      if (val.finishQuantity > val.produceQuantity - val.alreadyProduceQuantity) {
        this.$notify.error({
          title: 'wrong',
          message: '完成数已超出限制',
          offset: 100
        })
      }
    },
    // 工作中心focus事件
    workcenterchoose() {
      this.centercontrol = true
    },
    center(val) {
      console.log(val)
      this.workCenterId = val.workCenterName
      this.personalForm.workCenterId = val.id
    },
    // 负责人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 负责人回显
    stockName(val) {
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.workCenterId = null
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      const EnterDetail2 = this.$refs.editable2.getRecords()
      const EnterDetail3 = this.$refs.editable3.getRecords()
      const EnterDetail4 = this.$refs.editable4.getRecords()
      if (EnterDetail.length === 0 || EnterDetail4.length === 0) {
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
        if (elem.workHours === null || elem.workHours === '' || elem.workHours === undefined) {
          delete elem.workHours
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.finishQuantity === null || elem.finishQuantity === '' || elem.finishQuantity === undefined) {
          delete elem.finishQuantity
        }
        if (elem.passQuantity === null || elem.passQuantity === '' || elem.passQuantity === undefined) {
          delete elem.passQuantity
        }
        if (elem.passRate === null || elem.passRate === '' || elem.passRate === undefined) {
          delete elem.passRate
        }
        return elem
      })
      EnterDetail2.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.producePersonId === null || elem.producePersonId === '' || elem.producePersonId === undefined) {
          delete elem.producePersonId
        }
        if (elem.workHours === null || elem.workHours === '' || elem.workHours === undefined) {
          delete elem.workHours
        }
        if (elem.finishQuantity === null || elem.finishQuantity === '' || elem.finishQuantity === undefined) {
          delete elem.finishQuantity
        }
        if (elem.passQuantity === null || elem.passQuantity === '' || elem.passQuantity === undefined) {
          delete elem.passQuantity
        }
        if (elem.passRate === null || elem.passRate === '' || elem.passRate === undefined) {
          delete elem.passRate
        }
        return elem
      })
      EnterDetail3.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.equipmentNumber === null || elem.equipmentNumber === '' || elem.equipmentNumber === undefined) {
          delete elem.equipmentNumber
        }
        if (elem.equipmentName === null || elem.equipmentName === '' || elem.equipmentName === undefined) {
          delete elem.equipmentName
        }
        if (elem.runTime === null || elem.runTime === '' || elem.runTime === undefined) {
          delete elem.runTime
        }
        if (elem.finishQuantity === null || elem.finishQuantity === '' || elem.finishQuantity === undefined) {
          delete elem.finishQuantity
        }
        if (elem.passQuantity === null || elem.passQuantity === '' || elem.passQuantity === undefined) {
          delete elem.passQuantity
        }
        if (elem.passRate === null || elem.passRate === '' || elem.passRate === undefined) {
          delete elem.passRate
        }
        return elem
      })
      EnterDetail4.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.todayAccess === null || elem.todayAccess === '' || elem.todayAccess === undefined) {
          delete elem.todayAccess
        }
        if (elem.yesterdayRemain === null || elem.yesterdayRemain === '' || elem.yesterdayRemain === undefined) {
          delete elem.yesterdayRemain
        }
        if (elem.todayUseup === null || elem.todayUseup === '' || elem.todayUseup === undefined) {
          delete elem.todayUseup
        }
        if (elem.todayDamaged === null || elem.todayDamaged === '' || elem.todayDamaged === undefined) {
          delete elem.todayDamaged
        }
        if (elem.todayRemain === null || elem.todayRemain === '' || elem.todayRemain === undefined) {
          delete elem.todayRemain
        }
        return elem
      })
      const parms2 = JSON.stringify(EnterDetail)
      const parms3 = JSON.stringify(EnterDetail2)
      const parms4 = JSON.stringify(EnterDetail3)
      const parms5 = JSON.stringify(EnterDetail4)
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addproducereport(parms, parms2, parms3, parms4, parms5, this.personalForm).then(res => {
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
              this.$refs.editable2.clear()
              this.$refs.editable3.clear()
              this.$refs.editable4.clear()
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
      const view = { path: '/ProduceTask/AddProduceTask', name: 'AddProduceTask', fullPath: '/ProduceTask/AddProduceTask', title: 'AddProduceTask' }
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
