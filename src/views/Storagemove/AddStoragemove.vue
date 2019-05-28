<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card">
        <h2 ref="geren" class="form-name">基本信息</h2>
        <div class="container">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" placeholder="请输入调拨单主题" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.applicationName')" prop="applyPersonId" style="width: 100%;">
                  <el-input v-model="applyPersonId" placeholder="请选择调拨申请人" style="margin-left: 18px;width:200px" clearable @focus="handlechooseAccept"/>
                </el-form-item>
              </el-col>
              <my-accept :accetpcontrol.sync="accetpcontrol" @acceptName="acceptName"/>
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.requestDeptId')" prop="requestDeptId" style="width: 100%;">
                  <el-select v-model="personalForm.requestDeptId" placeholder="请选择要货部门" style="margin-left: 18px;width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.moveInRepository')" prop="moveInRepository" style="width: 100%;">
                  <el-input v-model="moveInRepository" placeholder="请选择调入仓库" style="margin-left: 18px;width:200px" clearable @focus="handlechooseDep"/>
                </el-form-item>
                <my-depot :depotcontrol.sync="depotcontrol" @depotname="depotname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.requestArrivalDate')" label-width="110px" prop="requestArrivalDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.requestArrivalDate"
                    type="date"
                    placeholder="选择要求到货日期"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 8px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.moveReason')" style="width: 100%;">
                  <el-input v-model="personalForm.moveReason" placeholder="请输入调拨原因" style="margin-left: 18px;width:200px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.departmentId')" prop="departmentId" style="width: 100%;">
                  <el-select v-model="personalForm.departmentId" placeholder="请选择调货部门" style="margin-left: 18px;width: 200px" clearable >
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.moveOutRepository')" prop="moveOutRepository" style="width: 100%;">
                  <el-input v-model="moveOutRepository" placeholder="请选择调出仓库" style="margin-left: 18px;width: 200px" clearable @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Storagemove.businessStat')" prop="businessStat" style="width: 100%;">
                  <el-select v-model="personalForm.businessStat" placeholder="请选择业务" style="margin-left: 18px;width: 200px" clearable >
                    <el-option value="1" label="调拨申请"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--调拨单明细-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">调拨单明细</h2>
        <div class="buttons" style="margin-top: 58px">
          <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">添加商品</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">删除</el-button>
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
            style="width: 100%">
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index"/>
            <el-editable-column :edit-render="{type: 'default'}" prop="locationId" align="center" label="货位" width="200px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.locationId" :value="scope.row.locationId" placeholder="请选择货位" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                  <el-option
                    v-for="(item, index) in locationlist"
                    :key="index"
                    :value="item.id"
                    :label="item.locationCode"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{type: 'default'}" prop="batch" align="center" label="批次" width="200px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.batch" :value="scope.row.batch" placeholder="请选择批次" filterable clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
                  <el-option
                    v-for="(item, index) in batchlist"
                    :key="index"
                    :value="item"
                    :label="item"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column prop="productCode" align="center" label="物品编号" width="150px"/>
            <el-editable-column prop="productName" align="center" label="物品名称" width="150px"/>
            <el-editable-column prop="color" align="center" label="颜色" width="150px"/>
            <el-editable-column prop="typeName" align="center" label="规格" width="150px"/>
            <el-editable-column prop="unitName" align="center" label="单位" width="150px"/>
            <el-editable-column prop="price" align="center" label="调拨单价" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" prop="movePrice" align="center" label="调拨成本价" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible'}" prop="moveQuantity" align="center" label="调拨数量" width="150px"/>
            <el-editable-column prop="totalMoney" align="center" label="调拨金额" width="150px">
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.movePrice, scope.row.moveQuantity) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="remarks" align="center" label="备注" width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">保存</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getdeptlist } from '@/api/BasicSettings'
import { batchlist, getlocation } from '@/api/public'
import { createstoragemove } from '@/api/Storagemove'
import MyRepository from './components/MyRepository'
import MyAccept from './components/MyAccept'
import MyDetail from './components/MyDetail'
import MyCreate from './components/MyCreate'
import MyDepot from './components/MyDepot'
export default {
  name: 'AddStoragemove',
  components: { MyDepot, MyRepository, MyDetail, MyCreate, MyAccept },
  data() {
    return {
      // 申请人回显
      applyPersonId: '',
      // 申请人控制
      accetpcontrol: false,
      // 批次列表
      batchlist: [],
      // 部门数据
      depts: [],
      // 调出仓库回显
      moveOutRepository: '',
      // 调入仓库回显
      moveInRepository: '',
      // 控制调出仓库选择窗口
      repositorycontrol: false,
      // 控制调入仓库选择窗口
      depotcontrol: false,
      // 控制商品列表窗口
      control: false,
      // 调拨信息数据
      personalForm: {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1'
      },
      // 调拨单规则数据
      personalrules: {
        applyPersonId: [
          { required: true, message: '请选择调拨申请人', trigger: 'focus' }
        ],
        requestDeptId: [
          { required: true, message: '请选择要货部门', trigger: 'change' }
        ],
        moveInRepository: [
          { required: true, message: '请选择调入仓库', trigger: 'focus' }
        ],
        requestArrivalDate: [
          { required: true, message: '请选择要求到货日期', trigger: 'change' }
        ],
        departmentId: [
          { required: true, message: '请选择调货部门', trigger: 'change' }
        ],
        moveOutRepository: [
          { required: true, message: '请选择调出仓库', trigger: 'focus' }
        ],
        businessStat: [
          { required: true, message: '请选择业务状态', trigger: 'change' }
        ]
      },
      // 调拨单明细数据
      list2: [],
      // 调拨明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 调拨明细中货位数据
      locationlist: [],
      // 调拨单明细列表规则
      validRules: {
      }
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
    // 调入仓库focus事件触发
    handlechooseDep() {
      this.depotcontrol = true
    },
    depotname(val) {
      this.moveInRepository = val.repositoryName
      this.personalForm.moveInRepository = val.id
    },
    // 调出仓库列表focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      console.log(val)
      this.moveOutRepository = val.repositoryName
      this.personalForm.moveOutRepository = val.id
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
    // 批次
    updatebatch(event, scope) {
      if (event === true) {
        console.log(this.personalForm.moveOutRepository)
        if (this.personalForm.moveOutRepository === undefined || this.personalForm.moveOutRepository === '') {
          this.$notify.error({
            title: '错误',
            message: '请先选择仓库',
            offset: 100
          })
          return false
        }
        getlocation(this.personalForm.moveOutRepository, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              this.updatebatch3(scope)
            } else if (res.data.data.content.length === 0) {
              this.$notify.error({
                title: '错误',
                message: '该仓库没有该商品',
                offset: 100
              })
              this.locationlist = []
              return false
            }
          }
        })
      }
    },
    updatebatch3(scope) {
      const parms3 = scope.row.productCode
      batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
        this.batchlist = res.data.data.content
      })
    },
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
          this.batchlist = res.data.data.content
        })
      }
    },
    // 申请人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
    },
    acceptName(val) {
      this.applyPersonId = val.personName
      this.personalForm.applyPersonId = val.id
    },
    // 调拨单事件
    // 新增调拨单明细
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
    // 调拨金额计算
    getSize(quan, pric) {
      return quan * pric
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1'
      }
      this.moveOutRepository = ''
      this.moveInRepository = ''
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
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
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          delete elem.batch
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
        if (elem.price === null || elem.price === '' || elem.price === undefined) {
          delete elem.price
        }
        if (elem.movePrice === null || elem.movePrice === '' || elem.movePrice === undefined) {
          delete elem.movePrice
        }
        if (elem.moveQuantity === null || elem.moveQuantity === '' || elem.moveQuantity === undefined) {
          delete elem.moveQuantity
        }
        if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
          delete elem.totalMoney
        }
        if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
          delete elem.remarks
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
      const parms2 = JSON.stringify(EnterDetail)
      const parm3 = this.personalForm
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            if (valid) {
              createstoragemove(parms, parms2, parm3).then(res => {
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
      const view = { path: '/Storagemove/NewStoragemove', name: 'NewStoragemove', fullPath: '/Storagemove/NewStoragemove', title: 'NewStoragemove' }
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
