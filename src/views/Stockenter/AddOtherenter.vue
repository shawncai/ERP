<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" placeholder="请输入入库单主题" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.sourceType')" prop="sourceType" style="width: 100%;">
                  <el-select v-model="personalForm.sourceType" placeholder="请选择源单类型" style="margin-left: 18px;width: 200px" clearable >
                    <el-option value="1" label="无来源"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.deliveryPersonId')" style="width: 100%;">
                  <el-input v-model="deliveryPersonId" placeholder="请选择交货人" style="margin-left: 18px;width:200px" clearable @focus="handlechooseDelivery"/>
                </el-form-item>
                <my-delivery :deliverycontrol.sync="deliverycontrol" @deliveryName="deliveryName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.acceptPersonId')" style="width: 100%;">
                  <el-input v-model="acceptPersonId" placeholder="请选择验收人" style="margin-left: 18px;width:200px" clearable @focus="handlechoose"/>
                </el-form-item>
                <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterPersonId')" prop="enterPersonId" style="width: 100%;">
                  <el-input v-model="enterPersonId" placeholder="请选择入库人" style="margin-left: 18px;width:200px" clearable @focus="handlechooseAccept"/>
                </el-form-item>
                <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterDeptId')" style="width: 100%;">
                  <el-select v-model="personalForm.enterDeptId" placeholder="请选择入库部门" style="margin-left: 18px;width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterRepositoryId')" prop="enterRepositoryId" style="width: 100%;">
                  <el-input v-model="enterRepositoryId" placeholder="请选择仓库" style="margin-left: 18px;width:200px" clearable @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.enterReason')" prop="summary" style="width: 100%;">
                  <el-input v-model="personalForm.enterReason" placeholder="请输入原因" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.newOrOld')" style="width: 100%;">
                  <el-radio-group v-model="personalForm.newOrOld" style="margin-left: 18px;width: 200px">
                    <el-radio :label="1" style="width: 100px">全新</el-radio>
                    <el-radio :label="2">二手车</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Stockenter.summary')" prop="summary" style="width: 100%;">
                  <el-input v-model="personalForm.summary" placeholder="请输入摘要" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--入库单明细-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">入库单明细</h2>
        <div class="buttons" style="margin-top: 58px">
          <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <el-button type="primary" @click="checkStock()">库存快照</el-button>
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
            size="medium"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                  <el-option
                    v-for="item in locationlist"
                    :key="item.id"
                    :value="item.id"
                    :label="item.locationCode"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.pc')" prop="batch" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
            <el-editable-column prop="color" align="center" label="颜色" width="150px"/>
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <!--            <el-editable-column prop="basicQuantity" align="center" label="基本数量" width="150px"/>-->
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible', attrs: {min: 0.00, precision: 2, controls:false}}" :label="$t('updates.rksl')" prop="actualEnterQuantity" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('Hmodule.dj')" prop="enterPrice" align="center" width="150px"/>
            <el-editable-column prop="enterMoney" align="center" label="入库金额" width="150px">
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.actualEnterQuantity, scope.row.enterPrice) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="remarks" align="center" label="备注" width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
      <el-dialog :visible.sync="receiptVisible2" title="库存快照" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                :data="list111"
                height="220"
                style="width: 100%;"
              >
                <el-table-column :resizable="false" :label="$t('updates.cangk')" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span >{{ scope.row.repositoryName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :resizable="false" label="商品名称" align="center" min-width="150">
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
import { getlocation, locationlist, countlist } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import { addotherenter } from '@/api/Stockenter'
import MyRepository from './components/MyRepository'
import MyDelivery from './components/MyDelivery'
import MyAccept from './components/MyAccept'
import MyDetail from './components/MyDetail'
import MyCreate from './components/MyCreate'
export default {
  name: 'AddOtherenter',
  components: { MyRepository, MyDetail, MyCreate, MyAccept, MyDelivery },
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
    const validatePass4 = (rule, value, callback) => {
      console.log(value)
      if (value === '' || value === null || value === undefined) {
        callback(new Error('入库数量不能为空'))
      } else if (value < 0) {
        callback(new Error('入库数量需大于0'))
      } else {
        callback()
      }
      // if (value > this.mid || value === 0 || value === null || value === undefined) {
      //   callback(new Error('计划数量不能为空'))
      // } else {
      //   callback()
      // }
    }
    return {
      // 部门数据
      depts: [],
      // 交货人回显
      deliveryPersonId: '',
      // 验收人回显
      acceptPersonId: this.$store.getters.name,
      // 入库仓库回显
      enterRepositoryId: this.$store.getters.repositoryName,
      // 入库人回显
      enterPersonId: this.$store.getters.name,
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
      // 入库信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        enterRepositoryId: this.$store.getters.repositoryId,
        enterPersonId: this.$store.getters.userId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        newOrOld: 1,
        acceptPersonId: this.$store.getters.name,
        enterDeptId: this.$store.getters.deptId
      },
      validRules: {
        actualEnterQuantity: [
          { required: true, validator: validatePass4, trigger: 'blur' }
        ]
      },
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
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: []
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
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
              title: '错误',
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
    },
    productdetail(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable.getRecords()
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
        this.$refs.editable.insert(val[i])
      }
    },
    // 入库金额计算
    getSize(quan, pric) {
      return (quan * pric).toFixed(2)
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        enterRepositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        enterPersonId: this.$store.getters.userId,
        sourceType: '1',
        newOrOld: 1
      }
      this.enterRepositoryId = this.$store.getters.repositoryName
      this.enterPersonId = this.$store.getters.name
      this.acceptPersonId = null
      this.deliveryPersonId = null
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      console.log(EnterDetail)
      for (const i in EnterDetail) {
        if (EnterDetail[i].actualEnterQuantity === 0) {
          this.$notify.error({
            title: '错误',
            message: '商品数量不能为0',
            offset: 100
          })
          return false
        }
      }
      let i = 1
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          i = 2
        }
      })
      if (i === 2) {
        this.$notify.error({
          title: '错误',
          message: '商品货位不能为空',
          offset: 100
        })
        return false
      }
      console.log(this.personalForm)
      console.log(EnterDetail)
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
      const parms = JSON.stringify(EnterDetail)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            if (valid) {
              console.log('newOrOld', this.personalForm.newOrOld)
              addotherenter(this.personalForm, parms).then(res => {
                console.log(res)
                if (res.data.ret === 200) {
                  this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success',
                    offset: 100
                  })
                  this.restAllForm()
                  this.$refs.editable.clear()
                  this.$refs.personalForm.clearValidate()
                  this.$refs.personalForm.resetFields()
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: res.data.msg,
                    offset: 100
                  })
                }
              })
            }
          }).catch(valid => {
            this.$notify.error({
              title: '错误',
              message: '信息未填完整',
              offset: 100
            })
            return false
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
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
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 20px;
    }
    .container{
      margin-top: 40px;
    }
    .el-button+.el-button{
      width: 98px;
    }
  }
</style>
<style rel="stylesheet/css" scoped>
  .normal >>> .el-dialog__header {
    padding: 20px 20px 10px;
    background: #fff;
    position: static;
    top: auto;
    z-index: auto;
    width: auto;
    border-bottom: none;
  }
  .normal >>> .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    height: auto;
  }
</style>
