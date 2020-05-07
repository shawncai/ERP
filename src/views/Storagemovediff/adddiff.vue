<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card">
        <h2 ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</h2>
        <div class="container">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('Storagemovediff.title')" style="width: 100%;">
                  <el-input v-model="personalForm.title" placeholder="请输入调拨差异单主题" style="margin-left: 18px;width:180px" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('Storagemovediff.sourceNumber')" prop="moveNumber" style="width: 100%;">
                  <el-input v-model="personalForm.moveNumber" placeholder="请选择源单" style="margin-left: 18px;width:180px" clearable @focus="handlechooseAccept"/>
                </el-form-item>
              </el-col>
              <my-move :movecontrol.sync="accetpcontrol" @move="move" @allmoveinfo="moveinfo"/>
              <el-col :span="8">
                <el-form-item :label="$t('Storagemovediff.moveInRepository')" prop="inRepository" style="width: 100%;">
                  <el-input v-model="inRepository" placeholder="请选择调入仓库" disabled style="margin-left: 18px;width:180px" clearable/>
                </el-form-item>
                <!-- <my-depot :depotcontrol.sync="depotcontrol" @depotname="depotname"/> -->
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('Storagemovediff.moveOutRepository')" prop="outRepository" style="width: 100%;">
                  <el-input v-model="outRepository" placeholder="请选择调出仓库" disabled style="margin-left: 18px;width: 180px" clearable/>
                </el-form-item>
                <!-- <my-repository :repositorycontrol.sync="repositorycontrol" :personform="personalForm" @repositoryname="repositoryname"/> -->
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('Storagemovediff.requestArrivalDate')" prop="arrivalDate" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.arrivalDate"
                    type="date"
                    disabled
                    placeholder="选择到货日期"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 180px"/>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item :label="$t('Storagemovediff.moveReason')" style="width: 100%;">
                  <el-input v-model="personalForm.moveReason" placeholder="请输入调拨原因" style="margin-left: 18px;width:180px" clearable/>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="8">
                <el-form-item :label="$t('Storagemove.businessStat')" prop="businessStat" style="width: 100%;">
                  <el-select v-model="personalForm.businessStat" placeholder="请选择业务" style="margin-left: 18px;width: 180px" disabled >
                    <el-option value="1" label="调拨申请"/>
                    <el-option value="2" label="调拨出库"/>
                    <el-option value="3" label="调拨入库"/>
                    <el-option value="4" label="调拨完成"/>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="6">
                <el-form-item :label="$t('Storagemove.storageMovePerson')" prop="storageMovePerson" style="width: 100%;">
                  <el-input v-model="storageMovePerson" placeholder="请选择调拨出库人" style="margin-left: 18px;width:200px" clearable @focus="handlechooseAccept2"/>
                </el-form-item>
              </el-col>
              <my-out :outcontrol.sync="outcontrol" @outName="outName"/> -->
              <el-col :span="8">
                <el-form-item :label="$t('Storagemovediff.storageMoveDate')" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.moveDate"
                    disabled
                    type="date"
                    placeholder="选择调拨出库日期"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 18px;width: 180px"/>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item :label="$t('Storagemove.storageMovediffDate')" label-width="110px" style="width: 100%;">
                  <el-date-picker
                    v-model="personalForm.storageMoveDate"
                    type="date"
                    placeholder="选择报告日期"
                    value-format="yyyy-MM-dd"
                    style="margin-left: 8px"/>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--调拨申请明细-->
      <el-card class="box-card" style="margin-top: 15px">
        <h2 ref="fuzhu" class="form-name">调拨差异明细</h2>
        <div class="buttons" style="margin-top: 58px">
          <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <my-detail :control.sync="control" :personalform="personalForm" @product="productdetail"/>
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
            <el-editable-column :label="$t('Hmodule.wpbh')" prop="productCode" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.wpmc')" prop="productName" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.ys')" prop="color" align="center" width="150px"/>
            <!-- <el-editable-column prop="productType" align="center" :label="$t('Hmodule.gg')" width="150px"/> -->
            <!-- <el-editable-column prop="unit" align="center" :label="$t('Hmodule.dw')" width="150px"/> -->
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0.00, precision: 6}, type: 'visible'}" :label="$t('updates.fhsl')" prop="sendQuantity" align="center" min-width="150">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  v-if="scope.row.isnew === 3"
                  :precision="6"
                  :controls="true"
                  :min="0.00"
                  v-model="scope.row.sendQuantity"
                />
                <span v-else>{{ scope.row.sendQuantity }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 0.00, precision: 6}, type: 'visible'}" prop="actualQuantity" align="center" label="实际数量" min-width="150">
              <template slot="edit" slot-scope="scope">
                <el-input-number
                  v-if="scope.row.isnew !== 0"
                  :precision="6"
                  :controls="true"
                  :min="0.00"
                  v-model="scope.row.actualQuantity"
                  @change="changdiff(scope.row)"
                />
                <span v-else>{{ scope.row.actualQuantity }}</span>
              </template>
            </el-editable-column>
            <el-editable-column :label="$t('updates.cysl')" prop="diffQuantity" align="center" min-width="150">
              <template slot="edit" slot-scope="scope">
                {{ scope.row.diffQuantity }}
              </template>
            </el-editable-column>
            <el-editable-column prop="diffMoney" align="center" label="差异金额" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="result" align="center" label="处理结果" width="300px"/>
          </el-editable>
        </div>
      </el-card>
      <!-- 操作 -->
      <div class="buttons" style="margin-top: 20px">
        <el-button v-no-more-click type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
      <!-- 备注 -->
      <!-- <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="remarks" align="center" :label="$t('updates.bz')" width="150px"/> -->
    </div>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
// import { getAllBatch } from '@/api/public'
import { getdeptlist } from '@/api/BasicSettings'
import { createstoragemovediff } from '@/api/Storagemovediff'
// import { batchlist, getlocation, productlist } from '@/api/public'
// import { searchlist } from '@/api/Storagemove'
import MyRepository from './components/MyRepository'
import MyAccept from './components/MyAccept'
import MyOut from './components/MyOut'
import MyDetail from './components/MyDetail'
import MyCreate from './components/MyCreate'
import MyDepot from './components/MyDepot'
import MyMove from './components/MyMove'
var _that
export default {
  name: 'AddStoragemove',
  components: { MyDepot, MyRepository, MyDetail, MyCreate, MyAccept, MyOut, MyMove },
  data() {
    return {
      // 申请人回显
      applyPersonId: this.$store.getters.name,
      // 申请人控制
      accetpcontrol: false,
      // 调拨出库人回显
      storageMovePerson: '',
      // 出库人控制
      outcontrol: false,
      // 批次列表
      batchlist: [],
      // 部门数据
      depts: [],
      // 调出仓库回显
      outRepository: '',
      // 调入仓库回显
      inRepository: '',
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
        requestDeptId: this.$store.getters.deptId
        // storageMoveDate: ''
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
    this.getdatatime()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    move(val) {
      console.log('所有', val)
      this.list2 = val
    },
    moveinfo(val) {
      console.log('明细', val)
      this.personalForm.moveNumber = val.moveNumber
      this.inRepository = val.moveInRepositoryName
      this.outRepository = val.moveOutRepositoryName
      this.personalForm.inRepositoryId = val.moveInRepository
      this.personalForm.outRepositoryId = val.moveOutRepository
      this.personalForm.arrivalDate = val.requestArrivalDate
      this.personalForm.moveDate = val.createDate
    },
    changdiff(row) {
      console.log('操作成功', row)
      row.diffQuantity = row.sendQuantity - row.actualQuantity
      row.diffMoney = Number(row.costPrice) * row.diffQuantity
    },
    getdatatime() { // 默认显示今天
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      this.personalForm.storageMoveDate = currentdate
    },
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
      const EnterDetail = this.$refs.editable.getRecords()
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        elem.moveQuantity = 1
      })
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
    queryStock(row) {
      console.log(this.$refs.editable.getRecords())
      if (row.applyQuantity > row.existStock) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.sqslcg'),
          offset: 100
        })
        row.applyQuantity = 1
      }
    },
    // getLocationData(row) {
    //   // 默认批次
    //   if (row.batch === null || row.batch === '' || row.batch === undefined) {
    //     const parms3 = row.productCode
    //     batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
    //       console.log(res)
    //       if (res.data.data.content.length > 0) {
    //         row.batch = res.data.data.content[0]
    //       }
    //     })
    //   } else {
    //     const parms3 = row.productCode
    //     batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
    //       if (res.data.data.content.length === 0) {
    //         if (row.batch !== '不使用') {
    //           row.batch = null
    //         }
    //       }
    //     })
    //   }
    //   // 默认货位
    //   getlocation(this.personalForm.moveOutRepository, row).then(res => {
    //     if (res.data.ret === 200) {
    //       console.log('res', res)
    //       if (res.data.data.content.length !== 0) {
    //         row.location = res.data.data.content[0].locationCode
    //         row.locationId = res.data.data.content[0].id
    //         console.log('row.locationId', row.locationId)
    //       } else {
    //         row.location = null
    //         row.locationId = null
    //       }
    //     }
    //   })
    //   return row.location
    // },
    // 批次
    // updatebatch(event, scope) {
    //   if (event === true) {
    //     console.log(this.personalForm.moveOutRepository)
    //     if (this.personalForm.moveOutRepository === undefined || this.personalForm.moveOutRepository === '') {
    //       this.$notify.error({
    //         title: 'wrong',
    //         message: this.$t('prompt.sqslcg'),
    //         offset: 100
    //       })
    //       return false
    //     }
    //     getlocation(this.personalForm.moveOutRepository, scope.row).then(res => {
    //       if (res.data.ret === 200) {
    //         if (res.data.data.content.length !== 0) {
    //           this.locationlist = res.data.data.content
    //           this.updatebatch3(scope)
    //         } else if (res.data.data.content.length === 0) {
    //           this.$notify.error({
    //             title: 'wrong',
    //             message: this.$t('prompt.gckmygsp'),
    //             offset: 100
    //           })
    //           this.locationlist = []
    //           return false
    //         }
    //       }
    //     })
    //   }
    // },
    // updatebatch3(scope) {
    //   const parms3 = scope.row.productCode
    //   batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
    //     this.batchlist = res.data.data.content
    //   })
    // },
    // updatebatch2(event, scope) {
    //   if (event === true) {
    //     const parms3 = scope.row.productCode
    //     batchlist(this.personalForm.moveOutRepository, parms3).then(res => {
    //       this.batchlist = res.data.data.content
    //     })
    //   }
    // },
    // 申请人focus事件触发
    handlechooseAccept() {
      this.accetpcontrol = true
      console.log('点击操作', this.accetpcontrol)
    },
    acceptName(val) {
      this.applyPersonId = val.personName
      this.personalForm.applyPersonId = val.id
    },
    // 调拨出库人触发
    handlechooseAccept2() {
      this.outcontrol = true
      console.log(this.outcontrol)
    },
    outName(val) {
      this.storageMovePerson = val.personName
      this.personalForm.storageMovePerson = val.id
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
    // 调拨金额计算
    getSize(row) {
      row.moveMoney = row.movePrice * row.applyQuantity
      return row.moveMoney
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        sourceType: '1',
        applyPersonId: this.$store.getters.userId,
        requestDeptId: this.$store.getters.deptId,
        moveInRepository: this.$store.getters.repositoryId,
        businessStat: '1'
      }
      this.moveOutRepository = this.$store.getters.repositoryName
      this.moveInRepository = ''
      this.applyPersonId = this.$store.getters.name
    },
    // 保存操作
    handlesave() {
      const EnterDetail = this.$refs.editable.getRecords()
      // 保存时同样商品不能有同一个批次
      // let i = 0
      // EnterDetail.map(function(elem) {
      //   return elem
      // }).forEach(function(elem) {
      //   EnterDetail.map(function(elem2) {
      //     return elem2
      //   }).forEach(function(elem2) {
      //     if (elem2.productCode === elem.productCode && elem2.batch === elem.batch) {
      //       i++
      //     }
      //   })
      // })
      // console.log(i)
      // if (i > EnterDetail.length) {
      //   this.$notify.error({
      //     title: 'wrong',
      //     message: '同样商品不能有同一个批次',
      //     offset: 100
      //   })
      //   return false
      // }
      // // 批次货位不能为空
      // let j = 1
      // EnterDetail.map(function(elem) {
      //   return elem
      // }).forEach(function(elem) {
      //   if (elem.batch === null || elem.batch === undefined || elem.batch === '' || elem.location === null || elem.location === undefined || elem.location === '') {
      //     j = 2
      //   }
      // })
      // console.log(j)
      // if (j === 2) {
      //   this.$notify.error({
      //     title: 'wrong',
      //     message: this.$t('prompt.pchwbnwk'),
      //     offset: 100
      //   })
      //   return false
      // }
      // console.log(this.personalForm)
      // console.log(EnterDetail)
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
        if (elem.locationId === null || elem.locationId === '' || elem.locationId === undefined) {
          delete elem.locationId
        }
        // if (elem.productCode === null || elem.productCode === '' || elem.productCode === undefined) {
        //   delete elem.productCode
        // }
        // if (elem.productName === null || elem.productName === '' || elem.productName === undefined) {
        //   delete elem.productName
        // }
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          delete elem.batch
        }
        if (elem.color === null || elem.color === '' || elem.color === undefined) {
          delete elem.color
        }
        if (elem.typeId === null || elem.typeId === '' || elem.typeId === undefined) {
          delete elem.typeId
        }
        // if (elem.unit === null || elem.unit === '' || elem.unit === undefined) {
        //   delete elem.unit
        // }
        // if (elem.price === null || elem.price === '' || elem.price === undefined) {
        //   delete elem.price
        // }
        // if (elem.movePrice === null || elem.movePrice === '' || elem.movePrice === undefined) {
        //   delete elem.movePrice
        // }
        // if (elem.moveQuantity === null || elem.moveQuantity === '' || elem.moveQuantity === undefined) {
        //   delete elem.moveQuantity
        // }
        // if (elem.totalMoney === null || elem.totalMoney === '' || elem.totalMoney === undefined) {
        //   delete elem.totalMoney
        // }
        // if (elem.remarks === null || elem.remarks === '' || elem.remarks === undefined) {
        //   delete elem.remarks
        // }
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
              createstoragemovediff(parms, parms2, parm3).then(res => {
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
