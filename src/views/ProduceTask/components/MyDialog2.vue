<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.reportNumber +'    修改'" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">基本信息</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.deptId')" prop="deptId" style="width: 100%;">
                <el-select v-model="personalForm.deptId" clearable style="margin-left: 18px;width: 200px">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.workCenterId')" prop="workCenterId" style="width: 100%;">
                <el-input v-model="workCenterId" style="margin-left: 18px;width: 200px" clearable @focus="workcenterchoose"/>
              </el-form-item>
              <my-center :control.sync="centercontrol" @center="center"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.produceTaskNumber')" prop="produceTaskNumber" style="width: 100%;">
                <el-input v-model="personalForm.produceTaskNumber" style="margin-left: 18px;width: 200px" clearable @focus="chooseproduce"/>
              </el-form-item>
              <produce-task :procontrol.sync="producecontrol" @produce="produce" @moredata="moredata"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ProduceTask.produceDate')" prop="produceDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.produceDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="生产状况" name="first">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;margin-top: 10px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.countFinishQuantity')" style="width: 100%;">
                  <el-input v-model="personalForm.countFinishQuantity" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.countWorkHours')" style="width: 100%;">
                  <el-input v-model="personalForm.countWorkHours" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266">生产明细</h2>
          <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
            <el-button type="danger" @click="$refs.editable.removeSelecteds()">删除</el-button>
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
              size="medium"
              style="width: 100%">
              <el-editable-column type="selection" min-width="55" align="center"/>
              <el-editable-column label="序号" min-width="55" align="center" type="index"/>
              <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
              <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
              <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="workHours" align="center" label="工时" min-width="150px"/>
              <el-editable-column :edit-render="{ type: 'default'}" prop="finishQuantity" align="center" label="完成数" min-width="150px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.finishQuantity" :value="scope.row.finishQuantity" @focus="finish(scope.row)"/>
                </template>
              </el-editable-column>
              <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="passQuantity" align="center" label="合格数" min-width="150px"/>
              <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="passRate" align="center" label="合格率" min-width="150px"/>
            </el-editable>
          </div>
        </el-tab-pane>
        <el-tab-pane label="人员状况" name="second">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;margin-top: 10px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.shouldPeoples')" style="width: 100%;">
                  <el-input v-model="personalForm.shouldPeoples" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.actualPeoples')" style="width: 100%;">
                  <el-input v-model="personalForm.actualPeoples" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.shouldWorkHours')" style="width: 100%;">
                  <el-input v-model="personalForm.shouldWorkHours" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.overtimeHours')" style="width: 100%;">
                  <el-input v-model="personalForm.overtimeHours" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.stopHours')" style="width: 100%;">
                  <el-input v-model="personalForm.stopHours" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.effectiveHours')" style="width: 100%;">
                  <el-input v-model="personalForm.effectiveHours" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;">人员明细</h2>
          <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
            <el-button @click="handleAddEmp">添加人员</el-button>
            <my-emp :control.sync="empcontrol" :bumen="bumen" @empDetail="empDetail"/>
            <el-button type="danger" @click="$refs.editable2.removeSelecteds()">删除</el-button>
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
              size="medium"
              style="width: 100%">
              <el-editable-column type="selection" min-width="55" align="center"/>
              <el-editable-column label="序号" min-width="55" align="center" type="index"/>
              <el-editable-column prop="personName" align="center" label="人员" min-width="150px"/>
              <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="workHours" align="center" label="工时" min-width="150px"/>
              <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="finishQuantity" align="center" label="完成数" min-width="150px"/>
              <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="passQuantity" align="center" label="合格数" min-width="150px"/>
              <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="passRate" align="center" label="合格率" min-width="150px"/>
            </el-editable>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设备状况" name="third">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;margin-top: 10px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.equipmentQuantity')" style="width: 100%;">
                  <el-input v-model="personalForm.equipmentQuantity" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.actualEquipQuantity')" style="width: 100%;">
                  <el-input v-model="personalForm.actualEquipQuantity" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.allRunTime')" style="width: 100%;">
                  <el-input v-model="personalForm.allRunTime" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.runRate')" style="width: 100%;">
                  <el-input v-model="personalForm.runRate" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.loadRate')" style="width: 100%;">
                  <el-input v-model="personalForm.loadRate" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.useRate')" style="width: 100%;">
                  <el-input v-model="personalForm.useRate" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.stopQuantity')" style="width: 100%;">
                  <el-input v-model="personalForm.stopQuantity" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.stopTime')" style="width: 100%;">
                  <el-input v-model="personalForm.stopTime" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.stopReason')" style="width: 100%;">
                  <el-input v-model="personalForm.stopReason" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;">设备明细</h2>
          <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
            <el-button @click="$refs.editable3.insert()">添加设备</el-button>
            <el-button type="danger" @click="$refs.editable3.removeSelecteds()">删除</el-button>
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
              size="medium"
              style="width: 100%">
              <el-editable-column type="selection" min-width="55" align="center"/>
              <el-editable-column label="序号" min-width="55" align="center" type="index"/>
              <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="equipmentNumber" align="center" label="设备编号" min-width="150px"/>
              <el-editable-column :edit-render="{name: 'ElInput', attrs: {min: 0}, type: 'visible'}" prop="equipmentName" align="center" label="设备名称" min-width="150px"/>
              <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="runTime" align="center" label="开机时长" min-width="150px"/>
              <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="finishQuantity" align="center" label="完成数" min-width="150px"/>
              <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="passQuantity" align="center" label="合格数" min-width="150px"/>
              <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" prop="passRate" align="center" label="合格率" min-width="150px"/>
            </el-editable>
          </div>
        </el-tab-pane>
        <el-tab-pane label="物料使用情况" name="fourth">
          <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="110px" style="margin-left: 30px;margin-top: 10px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.countAccess')" style="width: 100%;">
                  <el-input v-model="personalForm.countAccess" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.countUseup')" style="width: 100%;">
                  <el-input v-model="personalForm.countUseup" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('ProduceTask.countRemain')" style="width: 100%;">
                  <el-input v-model="personalForm.countRemain" style="margin-left: 18px;width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;">物料明细</h2>
          <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
            <el-button @click="addproduct">添加物料</el-button>
            <el-button type="danger" @click="$refs.editable4.removeSelecteds()">删除</el-button>
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
              size="medium"
              style="width: 100%">
              <el-editable-column type="selection" min-width="55" align="center"/>
              <el-editable-column label="序号" min-width="55" align="center" type="index"/>
              <el-editable-column prop="productCode" align="center" label="物品编号" min-width="150px"/>
              <el-editable-column prop="productName" align="center" label="物品名称" min-width="150px"/>
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
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">取消</el-button>
        <el-button type="primary" @click="handleEditok()">保存</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { updateproducereport } from '@/api/ProduceTask'
import { getdeptlist } from '@/api/BasicSettings'
import MyCenter from './MyCenter'
import MyEmp from './MyEmp'
import MyDetail from './MyDetail'
import ProducePlan from './ProducePlan'
import ProduceTask from './ProduceTask'
export default {
  components: { ProduceTask, ProducePlan, MyCenter, MyDetail, MyEmp },
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
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
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
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.workCenterId = this.personalForm.workCenter
      this.list = this.personalForm.produceReportDetails
      this.list2 = this.personalForm.produceReportPeopleDetailVos
      this.list3 = this.personalForm.produceReportEquipmentDetails
      this.list4 = this.personalForm.produceReportMaterialsDetails
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
              title: '错误',
              message: '物品已添加',
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
          title: '错误',
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
          title: '错误',
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
        createPersonId: 3,
        countryId: 1,
        repositoryId: 438,
        regionId: 2
      }
      this.workCenterId = null
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = 438
      this.personalForm.regionId = 2
      this.personalForm.createPersonId = 3
      this.personalForm.countryId = 1
      this.personalForm.modifyPersonId = 3
      const EnterDetail = this.$refs.editable.getRecords()
      const EnterDetail2 = this.$refs.editable2.getRecords()
      const EnterDetail3 = this.$refs.editable3.getRecords()
      const EnterDetail4 = this.$refs.editable4.getRecords()
      if (EnterDetail.length === 0 || EnterDetail2.length === 0 || EnterDetail3.length === 0 || EnterDetail4.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '明细表不能为空',
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
      updateproducereport(parms, parms2, parms3, parms4, parms5).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
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
            title: '错误',
            message: '出错了',
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
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
  }
  .el-col-12{
    width: 49%;
  }
</style>
