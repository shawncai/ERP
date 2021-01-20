<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="$t('updates.xgkcbsd')" class="edit" width="1010px" top="10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('Inventorydamaged.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" placeholder="请输入报损单主题" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Inventorydamaged.handlePersonId')" prop="sourceType" style="width: 100%;">
                <el-input v-model="handlePersonId" placeholder="请选择经办人" clearable @focus="handlechoose"/>
              </el-form-item>
              <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Inventorydamaged.damagedDeptId')" style="width: 100%;">
                <el-select v-model="personalForm.damagedDeptId" placeholder="请选择报损部门" clearable style="margin-left: 18px;width: 150px">
                  <el-option
                    v-for="(item, index) in depts"
                    :key="index"
                    :value="item.id"
                    :label="item.deptName"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Inventorydamaged.damagedRepositoryId')" prop="countRepositoryId" style="width: 100%;">
                <el-input v-model="damagedRepositoryId" placeholder="请选择报损仓库" clearable @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Inventorydamaged.damagedDate')" prop="damagedDate" style="width: 100%">
                <el-date-picker
                  v-model="personalForm.damagedDate"
                  type="date"
                  placeholder="报损日期"
                  value-format="yyyy-MM-dd"
                  clearable
                  style="margin-left: 18px;width: 150px"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Inventorydamaged.damagedReason')" style="width: 100%">
                <el-input v-model="personalForm.damagedReason" placeholder="请输入报损原因" style="margin-left: 18px;width: 150px" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!-- 报损入库明细 -->
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="fuzhu" class="form-name">{{ $t('otherlanguage.bsrkmx') }}</h2>
      <div class="buttons" style="margin-top: 50px">
        <el-button type="success" @click="handleAddstockinproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <el-button type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        <!-- <el-button type="primary" @click="checkStock()">{{ $t('updates.kckz') }}</el-button> -->
      </div>
      <my-detail2 :control.sync="control2" @product="productdetail2"/>
      <div class="container">
        <el-editable
          ref="editable2"
          :data.sync="list3"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules2"
          class="click-table1"
          stripe
          border
          size="small"
          style="width: 100%"
          @selection-change="handleSelectionChange2">
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column label="编号" width="55" align="center" type="index" />
          <el-editable-column :edit-render="{name: 'ElSelect',type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
                <el-option
                  v-for="item in locationlist2"
                  :key="item.id"
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
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('otherlanguage.rksl')" prop="enterQuantity" align="center" width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!--报损单出库明细-->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">{{ $t('otherlanguage.bsckmx') }}</h2>
      <div class="buttons" style="margin-top: 28px;margin-bottom: 20px">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
      <div class="container">
        <el-editable
          ref="editable"
          :data.sync="list2"
          :edit-config="{ showIcon: false, showStatus: true}"
          :edit-rules="validRules"
          class="click-table1"
          stripe
          border
          size="small"
          style="width: 100%">
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column label="编号" width="55" align="center" type="index" />
          <el-editable-column :edit-render="{name: 'ElSelect',type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px">
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
          <el-editable-column :edit-render="{name: 'ElSelect',type: 'default'}" :label="$t('Hmodule.pc')" prop="batch" align="center" width="200px">
            <template slot-scope="scope">
              <el-select v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
                <el-option
                  v-for="(item, index) in batchlist"
                  :key="index"
                  :value="item"
                  :label="item"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.gg')" prop="productType" align="center" width="150px"/>
          <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0}, type: 'visible'}" :label="$t('updates.bssl')" prop="damagedQuantity" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.cbdj')" prop="costPrice" align="center" width="150px"/>
          <el-editable-column :label="$t('updates.bsje')" prop="damagedMoney" align="center" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize(scope.row.damagedQuantity, scope.row.costPrice) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!-- 合计信息 -->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">{{ $t('updates.hjxx') }}</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('Inventorydamaged.heji')" style="width: 100%;">
                <el-input v-model="heji1" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Inventorydamaged.heji2')" style="width: 100%;">
                <el-input v-model="heji2" style="margin-left: 18px;width: 150px" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">{{ $t('public.edit') }}</el-button>
      <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getlocation, locationlist, batchlist } from '@/api/public'
import { updatedamaged } from '@/api/Inventorydamaged'
import { getdeptlist } from '@/api/BasicSettings'
import MyCreate from './MyCreate'
import MyRepository from './MyRepository'
import MyDetail from './MyDetail'
import MyDetail2 from './MyDetail2'
var _that
export default {
  components: { MyRepository, MyCreate, MyDetail, MyDetail2 },
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
    var validatePass4 = (rule, value, callback) => {
      console.log(value)
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请选择货位'))
      } else {
        callback()
      }
    }
    return {
      locationlist2: [],
      moreaction2: [],
      control2: false,
      // 合计消息
      heji1: 0,
      heji2: 0,
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 供应商信息数据
      personalForm: this.editdata,
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 批次列表
      batchlist: [],
      // 货位数据
      locationlist: [],
      // 明细表控制框
      control: false,
      // 部门数据
      depts: [],
      // 仓库回显
      damagedRepositoryId: '',
      // 经办人回显
      handlePersonId: '',
      // 控制仓库选择窗口
      repositorycontrol: false,
      // 控制经办人选择窗口
      createcontrol: false,
      // 报损单明细数据
      list2: [],
      list3: [],
      // 报损单明细列表规则
      validRules2: {
        damagedQuantity: [
          { required: true, message: '请输入报损数量', trigger: 'change' }
        ],
        locationId: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ]
      },
      // 报损单明细列表规则
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
      // 库存报损单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, message: '请选择经办人', trigger: 'blue' }
        ],
        damagedRepositoryId: [
          { required: true, message: '请选择报损仓库', trigger: 'blue' }
        ],
        damagedDate: [
          { required: true, message: '请选择报损日期', trigger: 'change' }
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
      this.handlePersonId = this.personalForm.handlePersonName
      this.damagedRepositoryId = this.personalForm.damagedRepositoryName
      this.list2 = this.personalForm.inventoryDamagedDetailVos
      this.list3 = this.personalForm.inventoryDamagedInVos
      this.getlocation()
    },
    list2: {
      handler() {
        let num = 0
        let num1 = 0
        for (const i in this.list2) {
          console.log(this.list2[i])
          num += Number(this.list2[i].damagedQuantity)
          num1 += Number(this.list2[i].damagedQuantity * this.list2[i].costPrice)
        }
        this.heji1 = num
        this.heji2 = num1
      },
      deep: true
    }
  },

  mounted() {
    this.getlist()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 批量操作
    handleSelectionChange2(val) {
      this.moreaction2 = val
    },
    productdetail2(val) {
      console.log('val====', val)
      const nowlistdata = this.$refs.editable2.getRecords()
      console.log('nowlistdata=====', nowlistdata)
      if (nowlistdata.length === 0) {
        this.list3 = val
      } else {
        const newarr = Object.assign([], val, nowlistdata)
        console.log('newarr===', newarr)
        this.list3 = newarr
      }
    },
    handleAddstockinproduct() {
      this.control2 = true
    },
    // checkStock2() {
    //   console.log('this.moreaction.length', this.moreaction2.length)
    //   if (this.moreaction2.length > 1 || this.moreaction2.length === 0) {
    //     this.$message.error('请选择单个商品')
    //   } else {
    //     countlist(this.$store.getters.repositoryId, this.$store.getters.regionId, this.moreaction2[0].productCode).then(res => {
    //       console.log(res)
    //       if (res.data.ret === 200) {
    //         console.log('res.data.data.content', res.data.data.content.list)
    //         this.list111 = res.data.data.content.list
    //         this.receiptVisible2 = true
    //       } else {
    //         this.$notify.error({
    //           title: 'wrong',
    //           message: res.data.msg,
    //           offset: 100
    //         })
    //       }
    //     })
    //   }
    // },
    getlist() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    getlocation() {
      // 货位根据仓库id展现
      locationlist(this.personalForm.damagedRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list
          this.locationlist2 = res.data.data.content.list
        }
      })
    },
    // 详细表事件
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.damagedRepositoryId = val.repositoryName
      this.personalForm.damagedRepositoryId = val.id
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
        console.log(this.personalForm.damagedRepositoryId)
        if (this.personalForm.damagedRepositoryId === undefined || this.personalForm.damagedRepositoryId === '') {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.sqslcg'),
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.damagedRepositoryId, scope.row).then(res => {
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
            }
          }
        })
      }
    },
    updatebatch3(scope) {
      const parms3 = scope.row.productCode
      batchlist(this.personalForm.damagedRepositoryId, parms3).then(res => {
        this.batchlist = res.data.data.content
      })
    },
    updatebatch2(event, scope) {
      if (event === true) {
        console.log(this.personalForm.damagedRepositoryId)
        if (this.personalForm.damagedRepositoryId === undefined || this.personalForm.damagedRepositoryId === '') {
          this.$notify.error({
            title: 'wrong',
            message: this.$t('prompt.sqslcg'),
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.damagedRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist2 = res.data.data.content
            } else if (res.data.data.content.length === 0) {
              locationlist(this.personalForm.damagedRepositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist2 = res.data.data.content.list
                }
              })
            }
          }
        })
      }
    },
    // 部门列表focus刷新
    updatedept() {
      this.getlist()
    },
    // 经办人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 员工列表返回经办人数据
    createname(val) {
      console.log(val)
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 新增报损单明细
    handleAddproduct() {
      this.control = true
    },
    productdetail(val) {
      console.log(this.$refs.editable.getRecords())
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
    // 报损金额计算
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
      delete this.personalForm.approvalUseVos
      delete this.personalForm.inventoryDamagedDetailVos
      delete this.personalForm.judgeStat
      delete this.personalForm.receiptStat
      delete this.personalForm.inventoryDamagedInVos

      console.log(this.personalForm)
      const rest = this.$refs.editable.getRecords()
      const rest2 = this.$refs.editable2.getRecords()
      if (rest.length === 0) {
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
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          delete elem.batch
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
        if (elem.damagedQuantity === null || elem.damagedQuantity === '' || elem.damagedQuantity === undefined) {
          delete elem.damagedQuantity
        }
        if (elem.costPrice === null || elem.costPrice === '' || elem.costPrice === undefined) {
          delete elem.costPrice
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
        }
        if (elem.damagedMoney === null || elem.damagedMoney === '' || elem.damagedMoney === undefined) {
          delete elem.damagedMoney
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
      const parms3 = JSON.stringify(rest2)
      updatedamaged(parms, parms2, parms3).then(res => {
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
          this.$refs.editable2.clear()
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
      this.$refs.editable2.clear()
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
