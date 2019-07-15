<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" top="10px" title="修改标准工序" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="135px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.code3')" prop="code" style="width: 100%;">
                <el-input v-model="personalForm.code" style="margin-left: 18px; width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.processName2')" prop="processName" style="width: 100%;">
                <el-input v-model="personalForm.processName" style="margin-left: 18px; width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.shortName')" style="width: 100%;">
                <el-input v-model="personalForm.shortName" style="margin-left: 18px; width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.workCenterId')" prop="workCenterId" style="width: 100%;">
                <el-input v-model="workCenterId" style="margin-left: 18px; width: 150px" clearable @focus="workcenterchoose"/>
              </el-form-item>
              <my-center :control.sync="centercontrol" @center="center"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.testMethod')" prop="testMethod" style="width: 100%;">
                <el-select v-model="personalForm.testMethod" style="margin-left: 18px; width: 150px" clearable >
                  <el-option value="1" label="自检"/>
                  <el-option value="2" label="别人检"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.timeUnit')" prop="timeUnit" style="width: 100%;">
                <el-select v-model="personalForm.timeUnit" style="margin-left: 18px; width: 150px" clearable >
                  <el-option value="1" label="天"/>
                  <el-option value="2" label="月"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.preTime')" style="width: 100%;">
                <el-input v-model="personalForm.preTime" style="margin-left: 18px; width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.runTime')" style="width: 100%;">
                <el-input v-model="personalForm.runTime" style="margin-left: 18px; width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.isCost')" prop="isCost" style="width: 100%;">
                <el-radio-group v-model="personalForm.isCost" style="margin-left: 19px; width: 150px">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.isHelp')" label-width="120px" prop="isHelp" style="width: 100%;">
                <el-radio-group v-model="personalForm.isHelp" style="margin-left: 19px; width: 150px">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.timeWage')" style="width: 100%;">
                <el-input v-model="personalForm.timeWage" style="margin-left: 18px; width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.numberWage')" style="width: 100%;">
                <el-input v-model="personalForm.numberWage" style="margin-left: 18px; width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('ProcessFile.stat')" prop="stat" style="width: 100%;">
                <el-radio-group v-model="personalForm.stat" style="margin-left: 19px; width: 150px">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="2">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--工序明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">工序明细</h2>
      <div class="buttons" style="margin-top: 58px">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd;width: 98px " @click="handleAddproduct">添加</el-button>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">删除</el-button>
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
          size="medium"
          style="width: 100%">
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column label="序号" min-width="55" align="center" type="index"/>
          <el-editable-column prop="processFileName" align="center" label="工艺名称" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">修改</el-button>
      <el-button type="danger" @click="handlecancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updatestandardProcess } from '@/api/ProcessFile'
import MyCenter from './MyCenter'
import MyDetail from './MyDetail'
export default {
  components: { MyDetail, MyCenter },
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
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 工序明细控制
      control: false,
      // 工作中心回显
      workCenterId: '',
      // 控制工作中心列表窗口
      centercontrol: false,
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
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.workCenterId = this.personalForm.workCenterName
      this.list2 = this.personalForm.standardProcessDetailVos
    }
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
              title: '错误',
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
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      const EnterDetail = this.$refs.editable.getRecords()
      if (EnterDetail.length === 0) {
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
      updatestandardProcess(parms, parms2).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
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
