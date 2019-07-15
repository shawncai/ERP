<template>
  <el-dialog :visible.sync="editVisible" :detailcontrol="detailcontrol" :detaildata="detaildata" :close-on-press-escape="false" append-to-body class="edit" top="10px" title="修改采购入库单" @close="$emit('update:detailcontrol', false)">
    <div id="printTest" >
      <!--基本信息-->
      <el-card class="box-card">
        <h2 ref="geren" class="form-name">基本信息</h2>
        <button v-print="'#printTest'" class="print" style="font-size: 13px;background: white;">打印</button>
        <div class="container">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="12">
                <el-form-item class="print2" label="组装单编号" style="width: 100%;display: none">
                  {{ personalForm.buildupNumber }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('BuildUp.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" placeholder="请输入组装单主题" style="margin-left: 18px;width: 150px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('BuildUp.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                  <el-input v-model="handlePersonId" placeholder="请选择经办人" style="margin-left: 18px;width: 150px" disabled @focus="handlechoose"/>
                </el-form-item>
                <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item label="批次" style="width: 100%;">
                  <el-input v-model="personalForm.batch" style="margin-left: 18px;width: 150px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="国家" style="width: 100%;">
                  <el-input v-model="personalForm.countryName" style="margin-left: 18px;width: 150px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="制单人" style="width: 100%;">
                  <el-input v-model="personalForm.createPersonName" style="margin-left: 18px;width: 150px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('BuildUp.buildupDeptId')" style="width: 100%;">
                  <el-select v-model="personalForm.buildupDeptId" placeholder="请选择组装部门" style="margin-left: 18px;width: 150px" disabled >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('BuildUp.buildupRepositoryId')" prop="buildupRepositoryId" style="width: 100%;">
                  <el-input v-model="buildupRepositoryId" placeholder="请选择仓库" style="margin-left: 18px;width: 150px" disabled @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('BuildUp.summary')" prop="summary" style="width: 100%;">
                  <el-input v-model="personalForm.summary" placeholder="请输入摘要" style="margin-left: 18px;width: 150px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--入库单明细-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">待组装的商品</h2>
        <div class="container">
          <el-editable
            ref="editable"
            :data.sync="list2"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            border
            size="medium"
            style="width: 100%">
            <el-editable-column label="编号" fixed="left" width="55" align="center" type="index"/>
            <el-editable-column prop="productCode" fixed="left" align="center" label="物品编号" />
            <el-editable-column prop="productName" fixed="left" align="center" label="物品名称" />
            <el-editable-column prop="locationCode" align="center" label="货位" />
            <el-editable-column prop="color" align="center" label="颜色" />
            <el-editable-column prop="typeIdname" align="center" label="规格" />
            <el-editable-column prop="unit" align="center" label="单位" />
            <el-editable-column prop="quantity" align="center" label="数量" />
            <el-editable-column prop="price" align="center" label="单价" />
            <el-editable-column prop="totalMoney" align="center" label="金额" >
              <template slot-scope="scope">
                <p>{{ getSize2(scope.row.quantity, scope.row.price) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="remarks" align="center" label="备注" />
          </el-editable>
        </div>
      </el-card>
      <!--组装后的商品      -->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">组装后的商品</h2>
        <div class="container">
          <el-editable
            ref="editable2"
            :data.sync="list3"
            :edit-config="{ showIcon: true, showStatus: true}"
            :edit-rules="validRules"
            class="click-table1"
            stripe
            border
            size="medium"
            style="width: 100%">
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column prop="locationCode" align="center" label="货位" />
            <el-editable-column prop="productCode" align="center" label="物品编号" />
            <el-editable-column prop="productName" align="center" label="物品名称" />
            <el-editable-column prop="color" align="center" label="颜色" />
            <el-editable-column prop="typeIdname" align="center" label="规格" />
            <el-editable-column prop="unit" align="center" label="单位" />
            <el-editable-column prop="quantity" align="center" label="数量" />
            <el-editable-column prop="price" align="center" label="单价" />
            <el-editable-column prop="totalMoney" align="center" label="金额" >
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.quantity, scope.row.price) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column prop="remarks" align="center" label="备注" />
          </el-editable>
        </div>
      </el-card>
      <!--审核状态-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">审批记录</h2>
        <div class="container" style="margin-top: 37px">
          <el-table
            :data="reviewList"
            border
            style="width: 100%">
            <el-table-column
              prop="step"
              align="center"
              label="当前步骤"
              min-width="150"/>
            <el-table-column
              prop="stepHandlerName"
              align="center"
              label="当前审批人"
              min-width="150"/>
            <el-table-column
              prop="handleTime"
              align="center"
              label="审批时间"
              min-width="150"/>
            <el-table-column
              prop="stat"
              align="center"
              label="审批意见"
              min-width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.stat | statfilter }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <div class="buttons" style="margin-top: 20px;margin-left: 30px">
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { locationlist } from '@/api/WarehouseAdjust'
import { updatebuildup } from '@/api/BuildUp'
import { getdeptlist } from '@/api/BasicSettings'
import MyRepository from './MyRepository'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
import MyCreate from './MyCreate'
import MyBulid from './MyBulid'
export default {
  components: { MyBulid, MyRepository, MyDetail, MyCreate, MyAccept },
  filters: {
    statfilter(status) {
      const statusMap = {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
      return statusMap[status]
    }
  },
  props: {
    detailcontrol: {
      type: Boolean,
      default: false
    },
    detaildata: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 审核步骤数据
      reviewList: [],
      // 弹窗组件的控制
      editVisible: this.detailcontrol,
      // 修改row数据
      personalForm: this.detaildata,
      // 部门数据
      depts: [],
      // 经办人回显
      handlePersonId: '',
      // 仓库回显
      buildupRepositoryId: '',
      // 经办人控制窗口
      createcontrol: false,
      // 仓库控制窗口
      repositorycontrol: false,
      // 控制待组装商品列表窗口
      control: false,
      // 控制组装后商品列表窗口
      buildcontrol: false,
      // 组装单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, message: '请选择组装人', trigger: 'focus' }
        ],
        buildupRepositoryId: [
          { required: true, message: '请选择组装仓库', trigger: 'focus' }
        ]
      },
      // 组装单明细数据
      list2: [],
      // 组装后明细数据
      list3: [],
      // 组装明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 组装明细中货位数据
      locationlist: [],
      // 组装单明细列表规则
      validRules: {
      }
    }
  },
  watch: {
    detailcontrol() {
      this.editVisible = this.detailcontrol
    },
    detaildata() {
      this.personalForm = this.detaildata
      this.handlePersonId = this.personalForm.handlePersonName
      this.buildupRepositoryId = this.personalForm.buildupRepositoryName
      this.list2 = this.personalForm.buildBeforeDetailVos
      this.list3 = this.personalForm.buildAfterDetailVos
      this.reviewList = this.personalForm.approvalUseVos
      this.getlocation()
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
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
      locationlist(this.personalForm.buildupRepositoryId).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list.map(function(item) {
            return {
              'value': item.id,
              'label': item.locationName
            }
          })
        }
      })
    },
    // 经办人输入框focus事件触发
    handlechoose() {
      this.createcontrol = true
    },
    // 经办人返回数据
    createname(val) {
      console.log(val)
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.buildupRepositoryId = val.repositoryName
      this.personalForm.buildupRepositoryId = val.id
      this.locationlistparms.repositoryId = val.id
      locationlist(this.locationlistparms).then(res => {
        if (res.data.ret === 200) {
          this.locationlist = res.data.data.content.list.map(function(item) {
            return {
              'value': item.id,
              'label': item.locationName
            }
          })
        }
      })
    },
    // 组装单事件
    // 新增组装单明细
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
    handleAddproduct2() {
      this.buildcontrol = true
    },
    productdetail2(val) {
      console.log(val)
      const nowlistdata = this.$refs.editable2.getRecords()
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
        this.$refs.editable2.insert(val[i])
      }
    },
    // 组装金额计算
    getSize(quan, pric) {
      return quan * pric
    },
    // 组装后金额计算
    getSize2(quan, pric) {
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
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
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
        if (elem.typeIdname === null || elem.typeIdname === '' || elem.typeIdname === undefined) {
          delete elem.typeIdname
        }
        if (elem.productType === null || elem.productType === '' || elem.productType === undefined) {
          delete elem.productType
        }
        return elem
      })
      const EnterDetail2 = this.$refs.editable2.getRecords()
      if (EnterDetail2.length === 0) {
        this.$notify.error({
          title: '错误',
          message: '明细表不能为空',
          offset: 100
        })
        return false
      }
      EnterDetail2.map(function(elem) {
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
        if (elem.quantity === null || elem.quantity === '' || elem.quantity === undefined) {
          delete elem.quantity
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
        if (elem.typeIdname === null || elem.typeIdname === '' || elem.typeIdname === undefined) {
          delete elem.typeIdname
        }
        if (elem.productType === null || elem.productType === '' || elem.productType === undefined) {
          delete elem.productType
        }
        return elem
      })
      const parms = JSON.stringify(this.personalForm)
      const parms2 = JSON.stringify(EnterDetail)
      const parms3 = JSON.stringify(EnterDetail2)
      updatebuildup(parms, parms2, parms3).then(res => {
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
          this.$refs.editable2.clear()
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
  @media print {
    .print {
      display: none;
    }
    .print2 {
      display: block !important;
    }
  }
</style>
