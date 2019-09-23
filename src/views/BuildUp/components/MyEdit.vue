<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" class="edit" width="1010px" top="-10px" title="修改组装单" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card">
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="100px" style="margin-left: 30px;">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('BuildUp.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" placeholder="请输入组装单主题" style="margin-left: 18px;width:200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('BuildUp.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" placeholder="请选择经办人" style="margin-left: 18px;width:200px" clearable @focus="handlechoose"/>
              </el-form-item>
              <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('BuildUp.buildupDeptId')" style="width: 100%;">
                <el-select v-model="personalForm.buildupDeptId" placeholder="请选择组装部门" style="margin-left: 18px;width: 200px" clearable >
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
                <el-input v-model="buildupRepositoryId" placeholder="请选择仓库" style="margin-left: 18px;width:200px" clearable @focus="handlechooseRep"/>
              </el-form-item>
              <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('BuildUp.summary')" prop="summary" style="width: 100%;">
                <el-input v-model="personalForm.summary" placeholder="请输入摘要" style="margin-left: 18px;width:200px" clearable/>
              </el-form-item>
            </el-col>
            <!--            <el-col :span="6">-->
            <!--              <el-form-item label="合为一个单据" style="width: 100%;">-->
            <!--                <el-select v-model="personalForm.type" placeholder="请选择" style="margin-left: 18px;width: 200px" clearable >-->
            <!--                  <el-option value="1" label="是"/>-->
            <!--                  <el-option value="2" label="否"/>-->
            <!--                </el-select>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
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
          stripe
          border
          size="medium"
          style="width: 100%">
          <el-editable-column label="编号" width="55" align="center" type="index"/>
          <el-editable-column :edit-render="{type: 'visible'}" prop="locationId" align="center" label="货位" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-select v-model="scope.row.locationCode" :value="scope.row.locationCode" placeholder="请选择货位" filterable clearable style="width: 100%;" @visible-change="updatebatch($event,scope)">
                <el-option
                  v-for="(item, index) in locationlist"
                  :key="index"
                  :value="item.locationCode"
                  :label="item.locationCode"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{type: 'visible'}" prop="batch" align="center" label="批次" width="200px">
            <template slot="edit" slot-scope="scope">
              <el-select v-model="scope.row.batch" :value="scope.row.batch" placeholder="请选择批次" clearable style="width: 100%;" @visible-change="updatebatch2($event,scope)">
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
          <el-editable-column prop="typeIdname" align="center" label="规格" width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" width="150px"/>
          <el-editable-column prop="quantity" align="center" label="数量" width="150px"/>
          <el-editable-column prop="price" align="center" label="单价" width="150px"/>
          <el-editable-column prop="totalMoney" align="center" label="金额" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize2(scope.row.quantity, scope.row.price) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="remarks" align="center" label="备注" width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <!--组装后的商品      -->
    <el-card class="box-card" style="margin-top: 15px">
      <h2 ref="fuzhu" class="form-name">组装后的商品</h2>
      <div class="buttons" style="margin-top: 58px">
        <el-button type="success" style="background:#3696fd;border-color:#3696fd " @click="handleAddproduct2">添加商品</el-button>
        <el-button type="danger" @click="beyond2">删除</el-button>
      </div>
      <my-bulid :buildcontrol.sync="buildcontrol" @product2="productdetail2" @product3="productdetail3"/>
      <my-materials :materialcontrol.sync="materialcontrol" @product4="productdetail4"/>
      <div class="container">
        <el-editable
          ref="editable2"
          :data.sync="list3"
          :edit-config="{ showIcon: true, showStatus: true}"
          :edit-rules="validRules2"
          class="click-table1"
          stripe
          border
          size="medium"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-editable-column type="selection" width="55" align="center"/>
          <el-editable-column label="编号" width="55" align="center" type="index"/>
          <el-editable-column :edit-render="{type: 'visible'}" prop="locationId" align="center" label="货位" min-width="170px">
            <template slot="edit" slot-scope="scope">
              <el-select v-model="scope.row.locationCode" :value="scope.row.locationCode" placeholder="请选择货位" filterable clearable style="width: 100%;" @visible-change="updatebatch4($event,scope)">
                <el-option
                  v-for="(item, index) in locationlist"
                  :key="index"
                  :value="item.locationCode"
                  :label="item.locationCode"/>
              </el-select>
            </template>
          </el-editable-column>
          <!--          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" align="center" label="批次" width="150px"/>-->
          <el-editable-column prop="productCode" align="center" label="物品编号" width="150px"/>
          <el-editable-column prop="productName" align="center" label="物品名称" width="150px"/>
          <el-editable-column prop="color" align="center" label="颜色" width="150px"/>
          <el-editable-column prop="typeIdname" align="center" label="规格" width="150px"/>
          <el-editable-column prop="unit" align="center" label="单位" width="150px"/>
          <el-editable-column :edit-render="{name: 'ElInputNumber', type: 'visible', events: {change: beyond}}" prop="quantity" align="center" label="数量" width="150px"/>
          <el-editable-column prop="price" align="center" label="单价" width="150px"/>
          <el-editable-column prop="totalMoney" align="center" label="金额" width="150px">
            <template slot-scope="scope">
              <p>{{ getSize(scope.row.quantity, scope.row.price) }}</p>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" prop="remarks" align="center" label="备注" width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" style="background:#3696fd;border-color:#3696fd;width: 98px" @click="handlesave()">修改</el-button>
      <el-button type="danger" @click="handlecancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getlocation, countlist, batchlist, locationlist } from '@/api/public'
import { materialslist2 } from '@/api/MaterialsList'
import { getdeptlist } from '@/api/BasicSettings'
import { updatebuildup } from '@/api/BuildUp'
import MyRepository from './MyRepository'
import MyMaterials from './MyMaterials'
import MyAccept from './MyAccept'
import MyDetail from './MyDetail'
import MyCreate from './MyCreate'
import MyBulid from './MyBulid'
export default {
  name: 'AddBuildUp',
  components: { MyBulid, MyRepository, MyDetail, MyCreate, MyAccept, MyMaterials },
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
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('请选择经办人'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (this.buildupRepositoryId === undefined || this.buildupRepositoryId === null || this.buildupRepositoryId === '') {
        callback(new Error('请选择仓库'))
      } else {
        callback()
      }
    }
    return {
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
      materialcontrol: false,
      // 组装单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        buildupRepositoryId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ]
      },
      // 组装单明细数据
      list2: [],
      // 组装后明细数据
      list3: [],
      // 批次列表
      batchlist: [],
      // 组装明细中货位发送参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 组装明细中货位数据
      locationlist: [],
      locationlist2: [],
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: [],
      length: ''
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
    },
    editdata() {
      this.personalForm = this.editdata
      this.handlePersonId = this.personalForm.handlePersonName
      this.buildupRepositoryId = this.personalForm.buildupRepositoryName
      this.list2 = this.personalForm.buildBeforeDetailVos
      this.list3 = this.personalForm.buildAfterDetailVos
      this.getlocation()
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    updatebatch2(event, scope) {
      if (event === true) {
        const parms3 = scope.row.productCode
        batchlist(this.personalForm.buildupRepositoryId, parms3).then(res => {
          console.log(res)
          this.batchlist = res.data.data.content
        })
      }
    },
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
    productdetail3(val) {
      console.log(val)
      console.log('val', val)
      // for (let i = 0; i < val.length; i++) {
      //   console.log(val[i].materialsListDetailVos.length)
      //   for (let j = 0; j < val[i].materialsListDetailVos.length; j++) {
      //     // console.log()
      //     this.$refs.editable.insert(val[i].materialsListDetailVos[j])
      //   }
      // }
    },
    // 深拷贝
    deepClone(obj) {
      const _obj = JSON.stringify(obj)
      const objClone = JSON.parse(_obj)
      return objClone
    },
    beyond() {
      this.$refs.editable.clear()
      this.setbeforeproduct()
    },
    beyond2() {
      this.$refs.editable2.removeSelecteds()
      this.$refs.editable.clear()
      this.setbeforeproduct()
    },
    // 设置待组装商品
    async setbeforeproduct() {
      console.log('error1')
      this.$refs.editable.clear()
      const edittabledata = this.$refs.editable2.getRecords()
      if (edittabledata.length !== 0) {
        const list = await Promise.all(edittabledata.map(item => {
          return materialslist2(item.productCode)
        }))
        const newarr3 = list.map(item => {
          return item.data.data.content.list
        })
        const bomproduct1 = [].concat.apply([], newarr3)

        console.log('list', list)
        console.log('bomproduct1-1', bomproduct1)
        for (const i in edittabledata) {
          for (const j in bomproduct1) {
            if (edittabledata[i].productCode === bomproduct1[j].productCode) {
              bomproduct1[j].quantity = edittabledata[i].quantity
            }
          }
        }
        console.log('bomproduct1', bomproduct1)

        const newarr4 = bomproduct1.map(item => {
          return item.materialsListDetailVos
        })
        const materialsListDetailVos = [].concat.apply([], newarr4)

        for (const a in materialsListDetailVos) {
          for (const b in bomproduct1) {
            if (materialsListDetailVos[a].materialsId === bomproduct1[b].id) {
              materialsListDetailVos[a].quantity = Number(materialsListDetailVos[a].quantity) * Number(bomproduct1[b].quantity)
            }
          }
        }
        for (const c in materialsListDetailVos) {
          getlocation(this.personalForm.buildupRepositoryId, materialsListDetailVos[c].productCode).then(res => {
            if (res.data.ret === 200) {
              materialsListDetailVos[c].locationCode = res.data.data.content[0].locationCode
              materialsListDetailVos[c].locationId = res.data.data.content[0].id
              // materialsListDetailVos[c].price = 0
              materialsListDetailVos[c].totalMoney = 0
            }
          })
        }
        console.log('materialsListDetailVos', materialsListDetailVos)
        const materialsListDetailVos2 = this.deepClone(materialsListDetailVos)
        for (const c in materialsListDetailVos2) {
          getlocation(this.personalForm.buildupRepositoryId, materialsListDetailVos2[c].productCode).then(res => {
            if (res.data.ret === 200) {
              materialsListDetailVos2[c].locationCode = res.data.data.content[0].locationCode
              materialsListDetailVos2[c].locationId = res.data.data.content[0].id
              // materialsListDetailVos2[c].price = 0
              materialsListDetailVos2[c].totalMoney = 0
            }
          })
        }
        const newArr = []
        materialsListDetailVos2.forEach(el => {
          const result = newArr.findIndex(ol => {
            return el.productCode === ol.productCode
          })
          console.log('result', result)
          if (result !== -1) {
            newArr[result].quantity = newArr[result].quantity + el.quantity
          } else {
            newArr.push(el)
          }
        })
        console.log('newArr', newArr)
        // this.$refs.editable = newArr
        console.log('error2')
        for (let i = 0; i < newArr.length; i++) {
          this.$refs.editable.insert(newArr[i])
        }
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
    updatebatch4(event, scope) {
      console.log('我执行了')
      this.locationlist = []
      if (event === true) {
        getlocation(this.personalForm.buildupRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            console.log(res.data.data.content)
            console.log(res.data.data.content.length)
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
            } else if (res.data.data.content.length === 0) {
              getlocation(this.personalForm.buildupRepositoryId).then(res => {
                if (res.data.ret === 200) {
                  this.locationlist = res.data.data.content
                }
              })
            }
          }
        })
      }
    },
    updatebatch(event, scope) {
      if (event === true) {
        getlocation(this.personalForm.buildupRepositoryId, scope.row).then(res => {
          if (res.data.ret === 200) {
            if (res.data.data.content.length !== 0) {
              this.locationlist = res.data.data.content
              scope.row.locationId = res.data.data.content[0].id
            }
          }
        })
      }
    },
    updatebatch3(scope) {
      const parms3 = scope.row.productCode
      batchlist(this.personalForm.countRepositoryId, parms3).then(res => {
        this.batchlist = res.data.data.content
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
      // this.buildcontrol = true
      if (this.personalForm.buildupRepositoryId === null || this.personalForm.buildupRepositoryId === undefined || this.personalForm.buildupRepositoryId === '') {
        this.$notify.error({
          title: '错误',
          message: '请先选择仓库',
          offset: 100
        })
        return false
      } else {
        this.materialcontrol = true
      }
    },
    productdetail4(val) {
      console.log('33333333333', val)
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
      this.setbeforeproduct()
    },
    productdetail2(val) {
      console.log('cccc', val)
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
      this.setbeforeproduct()
    },
    // 组装金额计算
    getSize(quan, pric) {
      return quan * pric
    },
    // 组装后金额计算
    getSize2(quan, pric) {
      return quan * pric
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId
      }
      this.buildupRepositoryId = ''
      this.handlePersonId = ''
    },
    // 保存操作
    async handlesave() {
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
      let i = 1
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.locationCode === null || elem.locationCode === '' || elem.locationCode === undefined) {
          i = 2
        }
        if (elem.batch === null || elem.batch === '' || elem.batch === undefined) {
          i = 3
        }
      })
      // EnterDetail2.map(function(elem) {
      //   return elem
      // }).forEach(function(elem) {
      //   if (elem.locationCode === null || elem.locationCode === '' || elem.locationCode === undefined) {
      //     i = 4
      //   }
      // })
      console.log(i)
      if (i === 2) {
        this.$notify.error({
          title: '错误',
          message: '组装前的商品货位不能为空',
          offset: 100
        })
        return false
      }
      if (i === 3) {
        this.$notify.error({
          title: '错误',
          message: '组装前的商品批次不能为空',
          offset: 100
        })
        return false
      }
      EnterDetail2.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        locationlist(null, elem.locationCode).then(res => {
          if (res.data.ret === 200) {
            elem.locationId = res.data.data.content.list[0].id
            console.log('res.data.data.content.list[0].id', res.data.data.content.list[0].id)
            console.log('elem.locationId', elem.locationId)
          }
        })
        if (elem.locationCode === null || elem.locationCode === '' || elem.locationCode === undefined) {
          i = 4
        }
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
      if (i === 4) {
        this.$notify.error({
          title: '错误',
          message: '组装后的商品货位不能为空',
          offset: 100
        })
        return false
      }

      const list = await Promise.all(EnterDetail2.map(function(item) {
        return locationlist(null, item.locationCode)
      }))

      console.log('list', list)

      const list2 = list.map(item => {
        return item.data.data.content.list[0]
      })
      console.log('list2', list2)

      for (const a in list2) {
        for (const b in EnterDetail2) {
          if (list2[a].locationCode === EnterDetail2[b].locationCode) {
            EnterDetail2[b].locationId = list2[a].id
          }
        }
      }
      console.log('EnterDetail2', EnterDetail2)
      const parms = JSON.stringify(this.personalForm)
      const parms2 = JSON.stringify(EnterDetail)
      const parms3 = JSON.stringify(EnterDetail2)
      console.log(parms)
      console.log(parms2)
      console.log(parms3)
      console.log(this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.editable.validate().then(valid => {
            if (valid) {
              this.$refs.editable2.validate().then(valid => {
                if (valid) {
                  updatebuildup(parms, parms2, parms3, this.personalForm).then(res => {
                    console.log(res)
                    if (res.data.ret === 200) {
                      this.$notify({
                        title: '成功',
                        message: '保存成功',
                        type: 'success',
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
                        message: res.data.msg,
                        offset: 100
                      })
                    }
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
            } else {
              this.$notify.error({
                title: '错误',
                message: '信息未填完整',
                offset: 100
              })
              return false
            }
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
      this.$refs.editable.clear()
      this.$refs.editable2.clear()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
    }
  }
}
</script>

<style scoped>
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
</style>
