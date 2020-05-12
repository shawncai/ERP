<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="$t('OutSource.xgss')" class="edit" width="1010px" top="10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Stockenter.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" placeholder="请输入入库单主题" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('StockOut.sourceType')" prop="sourceType" style="width: 100%;">
                <el-select v-model="personalForm.sourceType" placeholder="请选择源单类型" style="margin-left: 18px;width: 150px" @change="chooseSource" >
                  <el-option value="1" label="无来源"/>
                  <el-option value="2" label="外包单"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SaleReturn.sourceNumber')" style="width: 100%;">
                <el-input v-model="personalForm.sourceNumber" :disabled="IsNumber" style="margin-left: 18px;width: 150px" @focus="openoppo"/>
                <out-source :outsourcecontrol.sync="outsourcecontrol" @outSourceDetail="outSourceDetail" @outSource="outSource"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('OutSource.outFactoryName')" style="width: 100%;">
                <el-input v-model="personalForm.outFactoryName" style="margin-left: 18px;width:150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Stockenter.deliveryPersonId')" style="width: 100%;">
                <el-input v-model="deliveryPersonId" placeholder="请选择交货人" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseDelivery"/>
              </el-form-item>
              <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Stockenter.acceptPersonId')" style="width: 100%;">
                <el-input v-model="acceptPersonId" placeholder="请选择验收人" style="margin-left: 18px;width: 150px" clearable @focus="handlechoose"/>
              </el-form-item>
              <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Stockenter.enterPersonId')" prop="enterPersonId" style="width: 100%;">
                <el-input v-model="enterPersonId" placeholder="请选择入库人" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseAccept"/>
              </el-form-item>
              <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Stockenter.enterDeptId')" style="width: 100%;">
                <el-select v-model="personalForm.enterDeptId" placeholder="请选择入库部门" style="margin-left: 18px;width: 150px" clearable >
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Stockenter.enterRepositoryId')" prop="enterRepositoryId" style="width: 100%;">
                <el-input v-model="enterRepositoryId" placeholder="请选择仓库" style="margin-left: 18px;width: 150px" clearable @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Stockenter.enterReason')" prop="summary" style="width: 100%;">
                <el-input v-model="personalForm.enterReason" placeholder="请输入原因" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Stockenter.enterDate')" prop="enterDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                <el-date-picker
                  v-model="personalForm.enterDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 200px"/>
              </el-form-item>
            </el-col>
            <!--            <el-col :span="12">-->
            <!--              <el-form-item :label="$t('Stockenter.newOrOld')" style="width: 100%;">-->
            <!--                <el-radio-group v-model="personalForm.newOrOld" style="width: 200px;margin-left: 19px">-->
            <!--                  <el-radio :label="1" >全新</el-radio>-->
            <!--                  <el-radio :label="2">二手车</el-radio>-->
            <!--                </el-radio-group>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <el-col :span="12">
              <el-form-item :label="$t('Stockenter.summary')" prop="summary" style="width: 100%;">
                <el-input v-model="personalForm.summary" placeholder="请输入摘要" style="margin-left: 18px;width:150px" clearable/>
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
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <!--          <el-editable-column prop="basicQuantity" align="center" :label="$t('updates.jbel')" width="150px"/>-->
          <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible', attrs: {min: 0.00, precision: 6, controls:false}}" :label="$t('updates.rksl')" prop="actualEnterQuantity" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dj')" prop="enterPrice" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.rkje')" prop="enterMoney" align="center" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize(scope.row.actualEnterQuantity, scope.row.enterPrice) }}</p>
            </template>
          </el-editable-column>
          <!--          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>-->
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
import { locationlist, getlocation } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import { updateOutsourceEnter } from '@/api/OutsourceEnter'
import MyRepository from './MyRepository'
import MyDelivery from './MyDelivery'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
import MyCreate from './MyCreate'
import OutSource from './OutSource'
var _that
export default {
  components: { MyRepository, MyDetail, MyCreate, MyAccept, MyDelivery, OutSource },
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
    const validatePass1 = (rule, value, callback) => {
      console.log('this.personalForm.enterPersonId', this.personalForm.enterPersonId)
      if (this.personalForm.enterPersonId === '' || this.personalForm.enterPersonId === null || this.personalForm.enterPersonId === undefined) {
        callback(new Error('入库人不能为空'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (this.enterRepositoryId === '' || this.enterRepositoryId === null || this.enterRepositoryId === undefined) {
        callback(new Error('入库仓库不能为空'))
      } else {
        callback()
      }
    }
    return {
      IsNumber: true,
      outsourcecontrol: false,
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改row数据
      personalForm: this.editdata,
      // 部门数据
      depts: [],
      // 交货人回显
      deliveryPersonId: '',
      // 验收人回显
      acceptPersonId: '',
      // 入库仓库回显
      enterRepositoryId: this.$store.getters.repositoryName,
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
          { required: true, validator: validatePass1, trigger: 'change' }
        ],
        enterRepositoryId: [
          { required: true, validator: validatePass2, trigger: 'change' }
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
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      if (this.personalForm.sourceType === '2') {
        this.Isproduct = true
        this.IsNumber = false
      } else if (this.personalForm.sourceType === '1') {
        this.Isproduct = false
        this.IsNumber = true
      }
      this.deliveryPersonId = this.personalForm.deliveryPersonName
      this.acceptPersonId = this.personalForm.acceptPersonName
      this.enterRepositoryId = this.personalForm.enterRepositoryName
      this.enterPersonId = this.personalForm.enterPersonName
      this.list2 = this.personalForm.outsourceEnterDetailVos
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
    outSourceDetail(val) {
      console.log(val)
      this.$refs.editable.clear()
      let flag = 0
      for (let i = 0; i < val.length; i++) {
        if (val[i].qualifyQuantity > 0 && val[i].actualEnterQuantity > 0) {
          flag++
          this.$refs.editable.insert(val[i])
        }
      }
      if (flag === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '请先质检再入库',
          offset: 100
        })
        return false
      }
    },
    outSource(val) {
      console.log(val)
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
      if (this.enterRepositoryId === null || this.enterRepositoryId === '' || this.enterRepositoryId === undefined) {
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
          this.locationlist = res.data.data.content.list
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
      if (rest.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      let i = 1
      rest.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          i = 2
        }
      })
      if (i === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '商品货位不能为空',
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
      updateOutsourceEnter(parmss, parms2).then(res => {
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
