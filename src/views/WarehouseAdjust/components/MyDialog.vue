<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="$t('updates.xgqckcd')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" placeholder="请输入入库单主题" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.enterPersonId')" prop="sourceType" style="width: 100%;">
                <el-input v-model="enterPersonId" placeholder="请选择入库人" clearable @focus="handlechoose"/>
              </el-form-item>
              <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.enterDeptId')" prop="enterDeptId" style="width: 100%;">
                <el-select v-model="personalForm.enterDeptId" placeholder="请选择入库部门" clearable style="margin-left: 18px;width: 150px">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.enterRepositoryId')" prop="countRepositoryId" style="width: 100%;">
                <el-input v-model="enterRepositoryId" placeholder="请选择仓库" clearable @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('WarehouseAdjust.summary')" style="width: 100%">
                <el-input v-model="personalForm.summary" placeholder="请输入摘要" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--入库单明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">{{ $t('updates.rkdmx') }}</h2>
      <div class="buttons" style="margin-top: 28px;margin-bottom: 20px">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <my-detail :control.sync="control" :checklist.sync="checklist" @product="productdetail"/>
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
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column label="编号" width="55" align="center" type="index"/>
          <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                <el-option
                  v-for="(item, index) in locationlist"
                  :key="index"
                  :value="item.id"
                  :label="item.locationCode"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <!-- <el-editable-column prop="basicQuantity" align="center" :label="$t('updates.jbel')" width="150px"/> -->
          <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" :label="$t('updates.rksl')" prop="enterQuantity" align="center" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" :label="$t('Hmodule.dj')" prop="price" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.rkje')" prop="totalMoney" align="center" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize(scope.row.enterQuantity, scope.row.price) }}</p>
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
import { getlocation, locationlist } from '@/api/public'
import { updateenter } from '@/api/WarehouseAdjust'
import { getdeptlist } from '@/api/BasicSettings'
import MyCreate from './MyCreate'
import MyRepository from './MyRepository'
import MyDetail from './MyDetail2'
var _that
export default {
  components: { MyRepository, MyCreate, MyDetail },
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
      checklist: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 供应商信息数据
      personalForm: this.editdata,
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 货位数据
      locationlist: [],
      // 明细表控制框
      control: false,
      // 部门数据
      depts: [],
      // 入库仓库回显
      enterRepositoryId: '',
      // 入库人回显
      enterPersonId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制经办人选择窗口
      createcontrol: false,
      // 报损单明细数据
      list2: [],
      // 入库单明细列表规则
      validRules: {
        step: [
          { required: true, message: '请输入流程步骤', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入流转条件', trigger: 'blue' }
        ],
        handlerName: [
          { required: true, message: '请选择步骤处理人', trigger: 'blue' }
        ]
      },
      // 库存入库单规则数据
      personalrules: {
        enterPersonId: [
          { required: true, message: '请选择入库人', trigger: 'blue' }
        ],
        enterDeptId: [
          { required: true, message: '请选择入库部门', trigger: 'blue' }
        ]
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.enterPersonId = this.personalForm.enterPersonName
      this.enterRepositoryId = this.personalForm.enterRepositoryName
      this.list2 = this.personalForm.initialEnterDetailVos
      this.getlocation()
    }
  },
  beforeCreate() {
    _that = this
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 入库人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 员工列表返回经办人数据
    createname(val) {
      console.log(val)
      this.enterPersonId = val.personName
      this.personalForm.enterPersonId = val.id
    },
    getlocation() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.enterRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list
        }
      })
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
          this.locationlist = res.data.data.content.list
        }
      })
    },
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.enterRepositoryId)
        if (this.personalForm.enterRepositoryId === undefined || this.personalForm.countRepositoryId === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择仓库',
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
      this.checklist = this.$refs.editable.getRecords()
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()

      console.log(nowlistdata)
      var ret4 = val.findIndex((value, index, arr) => {
        return value.productCode === this.personalForm.productCode
      })

      console.log(ret4)
      this.list2 = val.filter(item => {
        return item.productCode !== this.personalForm.productCode
      })
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
      console.log(this.personalForm)
      const rest = this.$refs.editable.getRecords()
      if (rest.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }
      rest.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
          delete elem.unit
        }
        if (elem.basicQuantity === null || elem.basicQuantity === '' || elem.basicQuantity === undefined) {
          delete elem.basicQuantity
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.enterQuantity === null || elem.enterQuantity === '' || elem.enterQuantity === undefined) {
          delete elem.enterQuantity
        }
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
          delete elem.productCode
        }
        if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
          delete elem.productName
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        return elem
      })
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      const parms2 = JSON.stringify(rest)
      updateenter(parms, parms2).then(res => {
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
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
</style>
