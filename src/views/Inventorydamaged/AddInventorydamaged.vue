<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never">

        <div ref="geren" class="form-name">{{ $t('Hmodule.basicinfo') }}</div>
        <div class="container" style="margin-top: 25px">
          <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" size="mini" status-icon class="demo-ruleForm" label-position="left" label-width="130px">
            <el-row>

              <el-col :span="6">
                <el-form-item :label="$t('Inventorydamaged.title')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.title" placeholder="请输入报损单主题" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Inventorydamaged.handlePersonId')" prop="handlePersonId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="handlePersonId" placeholder="请选择经办人" style="width: 200px" clearable @focus="handlechoose"/>
                </el-form-item>

                <my-create :createcontrol.sync="createcontrol" @createname="createname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Inventorydamaged.damagedDeptId')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-select v-model="personalForm.damagedDeptId" placeholder="请选择报损部门" clearable style="width: 200px" @focus="updatedept">
                    <el-option
                      v-for="(item, index) in depts"
                      :key="index"
                      :value="item.id"
                      :label="item.deptName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Inventorydamaged.damagedRepositoryId')" prop="damagedRepositoryId" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="damagedRepositoryId" placeholder="请选择报损仓库" style="width: 200px" clearable @focus="handlechooseRep"/>
                </el-form-item>
                <my-repository :repositorycontrol.sync="repositorycontrol" @repositoryname="repositoryname"/>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Inventorydamaged.damagedDate')" prop="damagedDate" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-date-picker
                    v-model="personalForm.damagedDate"
                    type="date"
                    placeholder="报损日期"
                    value-format="yyyy-MM-dd"
                    clearable
                    style="width: 200px"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Inventorydamaged.damagedReason')" style="margin-left: 18px;width: 100%;margin-bottom: 0">
                  <el-input v-model="personalForm.damagedReason" placeholder="请输入报损原因" style="width: 200px" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!-- 报损入库明细 -->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">
        <div ref="fuzhu" class="form-name">{{ $t('otherlanguage.bsrkmx') }}</div>
        <div class="buttons" style="margin-top: 50px">
          <el-button type="success" @click="handleAddstockinproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <el-button type="danger" @click="$refs.editable2.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <el-button type="primary" @click="checkStock2()">{{ $t('updates.kckz') }}</el-button>
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
            size="medium"
            style="width: 100%"
            @selection-change="handleSelectionChange2">
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index" />
            <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 200px" @visible-change="updatebatch2($event,scope)">
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
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1}, type: 'visible'}" :label="$t('otherlanguage.rksl')" prop="enterQuantity" align="center" width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!--报损单出库明细-->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px">

        <div ref="fuzhu" class="form-name">{{ $t('otherlanguage.bsckmx') }}</div>
        <div class="buttons" style="margin-top: 50px">
          <el-button type="success" @click="handleAddproduct">{{ $t('Hmodule.tjsp') }}</el-button>
          <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
          <el-button type="primary" @click="checkStock()">{{ $t('updates.kckz') }}</el-button>
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
            size="medium"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-editable-column type="selection" width="55" align="center"/>
            <el-editable-column label="编号" width="55" align="center" type="index" />
            <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.hw')" prop="locationId" align="center" width="200px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.locationId" :value="scope.row.locationId" :placeholder="$t('Hmodule.xzhw')" filterable clearable style="width: 200px" @visible-change="updatebatch($event,scope)">
                  <el-option
                    v-for="item in locationlist"
                    :key="item.id"
                    :value="item.id"
                    :label="item.locationCode"/>
                </el-select>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{type: 'default'}" :label="$t('Hmodule.pc')" prop="batch" align="center" width="200px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.batch" :value="scope.row.batch" :placeholder="$t('Hmodule.xcpc')" filterable clearable style="width: 200px" @visible-change="updatebatch2($event,scope)">
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
            <el-editable-column :label="$t('Hmodule.gg')" prop="typeIdname" align="center" width="150px"/>
            <el-editable-column :label="$t('Hmodule.dw')" prop="unit" align="center" width="150px"/>
            <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {min: 1}, type: 'visible'}" :label="$t('updates.bssl')" prop="damagedQuantity" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.cbdj')" prop="costPrice" align="center" width="150px"/>
            <el-editable-column :label="$t('updates.bsje')" prop="damagedMoney" align="center" width="150px">
              <template slot-scope="scope">
                <p>{{ getSize(scope.row.damagedQuantity, scope.row.costPrice) }}</p>
              </template>
            </el-editable-column>
            <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.bz')" prop="remarks" align="center" width="150px"/>
          </el-editable>
        </div>
      </el-card>
      <!-- 合计信息 -->
      <el-card :body-style="	{ padding: '5px' }" class="box-card" shadow="never" style="margin-top: 5px;margin-bottom: 20px">

        <div ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('updates.hjxx') }}</div>
        <div class="container" style="margin-top: 37px">
          <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$t('Inventorydamaged.heji')" style="width: 200px">
                  <el-input v-model="heji1" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('Inventorydamaged.heji2')" style="width: 200px">
                  <el-input v-model="heji2" style="margin-left: 18px;width: 200px" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <!--操作-->
      <div class="buttons" style="position:fixed;bottom: 0;width: 100%;height: 40px; background: #fff;z-index: 99">

        <el-button v-no-more-click type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
        <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
      </div>
      <el-dialog :visible.sync="receiptVisible2" title="库存快照" class="normal" width="600px" center>
        <el-form class="demo-ruleForm" style="margin: 0px 6%; width: 400px">
          <el-form-item label-width="100px;" style="    width: 500px;">
            <div style="width: 100%; height: 220px;overflow: hidden;background: white;" >
              <el-table
                :data="list111"
                height="220"
                style="width: 200px"
              >
                <el-table-column :resizable="false" :label="$t('updates.cangk')" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span >{{ scope.row.repositoryName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :resizable="false" :label="$t('updates.spmc')" align="center" min-width="150">
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
import { getlocation, batchlist, countlist, locationlist } from '@/api/public'
import { addinventorydamaged } from '@/api/Inventorydamaged'
import { getdeptlist } from '@/api/BasicSettings'
import MyCreate from './components/MyCreate'
import MyRepository from './components/MyRepository'
import MyDetail from './components/MyDetail'
import MyDetail2 from './components/MyDetail2'
var _that
export default {
  name: 'AddInventorydamaged',
  components: { MyCreate, MyRepository, MyDetail, MyDetail2 },
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.handlePersonId === '' || this.handlePersonId === undefined || this.handlePersonId === null) {
        callback(new Error('请选择经办人'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (this.damagedRepositoryId === '' || this.damagedRepositoryId === undefined || this.damagedRepositoryId === null) {
        callback(new Error('请选择报损仓库'))
      } else {
        callback()
      }
    }
    var validatePass3 = (rule, value, callback) => {
      if (this.personalForm.damagedDate === '' || this.personalForm.damagedDate === undefined || this.personalForm.damagedDate === null) {
        callback(new Error('请选择报损仓库'))
      } else {
        callback()
      }
    }
    var validatePass4 = (rule, value, callback) => {
      console.log(value)
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请选择货位'))
      } else {
        callback()
      }
    }
    var validatePass5 = (rule, value, callback) => {
      console.log(value)
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请选择批次'))
      } else {
        callback()
      }
    }
    return {
      locationlist2: [],
      moreaction2: [],
      control2: false,
      // 合计信息
      heji1: 0,
      heji2: 0,
      // 获取货位参数
      locationlistparms: {
        pageNum: 1,
        pageSize: 1999,
        repositoryId: ''
      },
      // 批次列表
      batchlist: [],
      // 明细表控制框
      control: false,
      // 部门数据
      depts: [],
      // 货位数据
      locationlist: [],
      // 仓库回显
      damagedRepositoryId: this.$store.getters.repositoryName,
      // 经办人回显
      handlePersonId: this.$store.getters.name,
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
          { required: true, message: '请输入流程步骤', trigger: 'change' }
        ],
        money: [
          { required: true, message: '请输入流转条件', trigger: 'change' }
        ],
        handlerName: [
          { required: true, message: '请选择步骤处理人', trigger: 'change' }
        ],
        damagedQuantity: [
          { required: true, message: '请输入报损数量', trigger: 'change' }
        ],
        locationId: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        batch: [
          { required: true, validator: validatePass5, trigger: 'change' }
        ]
      },
      // 库存报损单信息数据
      personalForm: {
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        createPersonId: this.$store.getters.userId,
        countryId: 1,
        handlePersonId: this.$store.getters.userId,
        damagedDeptId: this.$store.getters.deptId,
        damagedRepositoryId: this.$store.getters.repositoryId,
        damagedDate: new Date()
      },
      // 库存报损单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        damagedRepositoryId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        damagedDate: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ]
      },
      receiptVisible2: false,
      list111: [],
      // 批量操作
      moreaction: []
    }
  },
  watch: {
    list2: {
      handler() {
        console.log('list2', this.list2)
        let num1 = 0
        let num2 = 0
        for (const i in this.list2) {
          num1 = this.list2[i].damagedQuantity
          num2 = this.list2[i].damagedQuantity * this.list2[i].costPrice
        }
        this.heji1 = num1
        this.heji2 = num2
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
    checkStock2() {
      console.log('this.moreaction.length', this.moreaction2.length)
      if (this.moreaction2.length > 1 || this.moreaction2.length === 0) {
        this.$message.error('请选择单个商品')
      } else {
        countlist(this.$store.getters.repositoryId, this.$store.getters.regionId, this.moreaction2[0].productCode).then(res => {
          console.log(res)
          if (res.data.ret === 200) {
            console.log('res.data.data.content', res.data.data.content.list)
            this.list111 = res.data.data.content.list
            this.receiptVisible2 = true
          } else {
            this.$notify.error({
              title: 'wrong',
              message: res.data.msg,
              offset: 100
            })
          }
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
              title: 'wrong',
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
    getlist() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
    },
    // 保存操作
    handlesave() {
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
      for (let i = 0; i < rest.length; i++) {
        if (rest[i].locationId === '' || rest[i].locationId === null || rest[i].locationId === undefined) {
          this.$notify.error({
            title: 'wrong',
            message: `第${i + 1}行请选择货位`,
            offset: 100
          })
          return false
        }
        if (rest[i].batch === '' || rest[i].batch === null || rest[i].batch === undefined) {
          this.$notify.error({
            title: 'wrong',
            message: `第${i + 1}行请选择货位`,
            offset: 100
          })
          return false
        }
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
      let parms3 = null
      if (rest2.length > 0) {
        parms3 = JSON.stringify(rest2)
      }
      const parms2 = JSON.stringify(rest)
      const parms = JSON.stringify(this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          addinventorydamaged(parms, parms2, parms3, this.personalForm.repositoryId, this.personalForm.regionId).then(res => {
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
              this.$refs.editable2.clear()
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
    // 清空记录
    restAllForm() {
      this.personalForm = {
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        createPersonId: this.$store.getters.userId,
        countryId: 1,
        handlePersonId: this.$store.getters.userId,
        damagedDeptId: this.$store.getters.deptId,
        damagedRepositoryId: this.$store.getters.repositoryId
      }
      this.handlePersonId = this.$store.getters.name
      this.damagedRepositoryId = this.$store.getters.repositoryName
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Inventorydamaged/NewInventorydamaged', name: 'NewInventorydamaged', fullPath: '/Inventorydamaged/NewInventorydamaged', title: 'NewInventorydamaged' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
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
              return false
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
    // 报损单事件
    // 新增报损单明细
    handleAddproduct() {
      if (this.damagedRepositoryId === '' || this.damagedRepositoryId === undefined || this.damagedRepositoryId === null) {
        this.$notify.error({
          title: 'wrong',
          message: '请先选择报损仓库',
          offset: 100
        })
        return false
      }
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

