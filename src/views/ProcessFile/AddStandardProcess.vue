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
                <el-form-item :label="$t('ProcessFile.code3')" prop="code" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.code" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.processName2')" prop="processName" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.processName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.shortName')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.shortName" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.workCenterId')" prop="workCenterId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="workCenterId" style="width: 200px" clearable @focus="workcenterchoose"/>
                </el-form-item>
                <my-center :control.sync="centercontrol" @center="center"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.testMethod')" prop="testMethod" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.testMethod" style="width: 200px" clearable >
                    <el-option value="1" label="自检"/>
                    <el-option value="2" label="别人检"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.timeUnit')" prop="timeUnit" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.timeUnit" style="width: 200px" clearable >
                    <el-option value="1" label="天"/>
                    <el-option value="2" label="月"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.preTime')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.preTime" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.runTime')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.runTime" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.isCost')" prop="isCost" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.isCost" style="width: 200px">
                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.isHelp')" label-width="120px" prop="isHelp" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.isHelp" style="width: 200px">
                    <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                    <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.timeWage')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.timeWage" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.numberWage')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.numberWage" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('ProcessFile.stat')" prop="stat" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-radio-group v-model="personalForm.stat" style="width: 200px">
                    <el-radio :label="1" style="width: 100px">启用</el-radio>
                    <el-radio :label="2">停用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--工序明细-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">
        <div ref="fuzhu" class="form-name">{{ $t('updates.gxmx') }}</div>
        <div class="buttons" style="margin-top: 58px">
          <el-button type="success" style="background:#3696fd;border-color:#3696fd;width: 98px " @click="handleAddproduct">{{ $t('updates.tj') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <my-detail :control.sync="control" @produt="productdetail"/>
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
            <el-editable-column :label="$t('updates.gymc')" prop="processFileName" align="center" min-width="150px"/>
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
import { createstandardProcess } from '@/api/ProcessFile'
import MyCenter from './components/MyCenter'
import MyDetail from './components/MyDetail'
var _that
export default {
  name: 'AddStandardProcess',
  components: { MyDetail, MyCenter },
  data() {
    return {
      // 工序明细控制
      control: false,
      // 工作中心回显
      workCenterId: '',
      // 控制工作中心列表窗口
      centercontrol: false,
      // 标准工序数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      },
      // 标准工序规则数据
      personalrules: {
        code: [
          { required: true, message: '请输入工序编号', trigger: 'blur' }
        ],
        processName: [
          { required: true, message: '请输入工序名称', trigger: 'blur' }
        ],
        workCenterId: [
          { required: true, message: '请选择所属工作中心', trigger: 'focus' }
        ],
        testMethod: [
          { required: true, message: '请选择校验方式', trigger: 'change' }
        ],
        timeUnit: [
          { required: true, message: '请选择时间单位', trigger: 'change' }
        ],
        isCost: [
          { required: true, message: '请选择是否计费', trigger: 'change' }
        ],
        isHelp: [
          { required: true, message: '请选择是否外部协助', trigger: 'change' }
        ],
        stat: [
          { required: true, message: '请选择启用状态', trigger: 'change' }
        ]
      },
      // 物料单明细数据
      list2: [],
      // 物料单明细列表规则
      validRules: {
      }
    }
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 工作中心focus事件
    workcenterchoose() {
      this.centercontrol = true
    },
    center(val) {
      console.log(val)
      this.workCenterId = val.workCenterName
      this.personalForm.workCenterId = val.id
    },
    // 新增物料单明细
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
              message: '工序已添加',
              offset: 100
            })
            return false
          }
        }
        this.$refs.editable.insert(val[i])
      }
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.productTypeId = null
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
        if (elem.processName === null || elem.processName === '' || elem.processName === undefined) {
          delete elem.processName
        }
        if (elem.shortName === null || elem.shortName === '' || elem.shortName === undefined) {
          delete elem.shortName
        }
        if (elem.description === null || elem.description === '' || elem.description === undefined) {
          delete elem.description
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
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            if (valid) {
              createstandardProcess(parms, parms2).then(res => {
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
      const view = { path: '/ProcessFile/AddProcessFile', name: 'AddProcessFile', fullPath: '/ProcessFile/AddProcessFile', title: 'AddProcessFile' }
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
