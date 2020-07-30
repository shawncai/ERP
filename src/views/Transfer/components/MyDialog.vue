<template>
  <el-dialog :visible.sync="editVisible" :editcontrol="editcontrol" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.number +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:editcontrol', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('collectAndPayDetail.fx')" style="width: 100%;">
                <el-select v-model="personalForm.direction" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="门店"/>
                  <el-option value="2" label="公司"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Transfer.title')" style="width: 100%;">
                <el-input v-model="personalForm.title" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Transfer.transferTicket')" prop="transferTicket" style="width: 100%;">
                <el-input v-model="personalForm.transferTicket" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Transfer.transferDate')" prop="transferDate" style="width: 100%;">
                <el-date-picker
                  v-model="personalForm.transferDate"
                  :picker-options="pickerOptions1"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('otherlanguage.zzlx')" style="width: 100%;">
                <el-select v-model="personalForm.transferType" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="现金"/>
                  <el-option value="2" label="支票"/>
                  <el-option value="3" label="银行转账"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="personalForm.direction === '2'" :span="12">
              <el-form-item v-if="personalForm.direction === '2'" :label="$t('Transfer.transferInAccount')" prop="transferInAccount" style="width: 100%;">
                <el-select v-model="personalForm.transferInAccount" style="margin-left: 18px;width: 200px" @focus="getaccounts" @change="setbank">
                  <el-option
                    v-for="(item, index) in accounts"
                    :key="index"
                    :label="item.accountNumber"
                    :value="item.accountNumber"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-show="personalForm.direction === '2'" :span="12">
              <el-form-item :label="$t('Transfer.transferInBank')" prop="transferTicket" style="width: 100%;">
                <el-input v-model="personalForm.transferInBank" style="margin-left: 18px;width:200px" clearable disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Transfer.handlePersonId')" prop="handlePersonId" style="width: 100%;">
                <el-input v-model="handlePersonId" style="margin-left: 18px;width: 200px" @focus="handlechooseStock"/>
                <my-emp :control.sync="stockControl" @stockName="stockName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Transfer.currency')" style="width: 100%;">
                <el-select v-model="personalForm.currency" style="margin-left: 18px;width: 200px">
                  <el-option value="1" label="PHP"/>
                  <el-option value="2" label="USD"/>
                  <el-option value="3" label="RMB"/>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--子件信息-->
    <el-card class="box-card" style="margin-top: 15px" shadow="never">
      <h2 ref="fuzhu" class="form-name" >{{ $t('updates.srmx') }}</h2>
      <div class="buttons" style="margin-top: 35px;margin-bottom: 10px;">
        <el-button @click="insertEvent(-1)">{{ $t('updates.tjsrx') }}</el-button>
        <el-button type="danger" @click="$refs.editable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
      </div>
      <div class="container" style="margin-bottom: 51px;">
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
          <el-editable-column type="selection" min-width="55" align="center"/>
          <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
          <el-editable-column :edit-render="{name: 'ElCascader ', type: 'visible', options: 'options'}" :label="$t('Voucher.qy')" prop="regionIds" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-cascader
                :options="regions"
                :props="props"
                v-model="scope.row.regionIds"
                :show-all-levels="false"
                :placeholder="$t('Hmodule.xzqy')"
                change-on-select
                filterable
                clearable
                @change="handlechange4(scope.row,$event)"
              />
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElCascader ', type: 'visible', options: 'options'}" :label="$t('Voucher.md')" prop="setcarst" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-select v-model="scope.row.repositoryId" :placeholder="$t('Hmodule.xzmd')" clearable filterable>
                <el-option
                  v-for="(item, index) in repositories"
                  :key="index"
                  :label="item.repositoryName"
                  :value="item.id"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.zya')" prop="summary" align="center" min-width="150px"/>
          <!-- <el-editable-column :label="$t('updates.kmmc')" prop="subjectName" align="center" min-width="150px"/> -->
          <!-- <el-editable-column :edit-render="{name: 'ElCascader', type: 'visible'}" :label="$t('updates.kmmc')" prop="subjectFinance" align="center" min-width="150px">
            <template slot="edit" slot-scope="scope">
              <el-cascader
                v-model="scope.row.setcarst"
                :options="suboptions"
                :props="props2"
                :show-all-levels="false"
                filterable
                @change="test(scope.row,$event)"/>
            </template>
          </el-editable-column> -->
          <el-editable-column :edit-render="{name: 'ElInput', type: 'visible'}" :label="$t('updates.kmmc')" prop="subjectCode" align="center" min-width="150" >
            <template slot="edit" slot-scope="scope">
              <el-select v-model="scope.row.subjectCode" :value="scope.row.subjectCode" :placeholder="$t('updates.kmmc')" filterable style="width: 100%;" @change="test2(scope.row,$event)">
                <el-option
                  v-for="(item, index) in accountcodes"
                  :key="index"
                  :value="item.itemCode"
                  :label="item.itemName"/>
              </el-select>
            </template>
          </el-editable-column>
          <el-editable-column :edit-render="{name: 'ElInputNumber', attrs: {precision: 6}, type: 'visible'}" :label="$t('Hmodule.je')" prop="money" align="center" min-width="150px"/>
        </el-editable>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { searchAccount } from '@/api/AccountManagement'
import { updatetransfer } from '@/api/Transfer'
import { subjectList, itemList } from '@/api/SubjectFinance'
import { searchSaleCategory } from '@/api/SaleCategory'
import { getdeptlist } from '@/api/BasicSettings'
import { regionlist, searchRepository2 } from '@/api/public'
import { getSubjectDetail } from '@/api/voucher'
import MyEmp from './MyEmp'
import MyRepository from './MyRepository'
// eslint-disable-next-line no-unused-vars
var _that
export default {
  components: { MyRepository, MyEmp },
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
    const validatePass3 = (rule, value, callback) => {
      if (this.personalForm.transferRegionId === undefined || this.personalForm.transferRegionId === null || this.personalForm.transferRegionId === '') {
        callback(new Error('请选择区域'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (this.handlePersonId === undefined || this.handlePersonId === null || this.handlePersonId === '') {
        callback(new Error('请选择经办人'))
      } else {
        callback()
      }
    }
    return {
      accountcodes: [],
      accounts: [],
      accountsparm: {
        pageNum: 1,
        pageSize: 1000000,
        isEffective: '1'

      },
      repositories: [],
      suboptions: [],
      props2: {
        value: 'id',
        label: 'subjectName',
        children: 'subjectFinanceVos'
      },
      region: null,
      pickerOptions1: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 8.64e7
        }
      },
      props: {
        value: 'id',
        label: 'regionName',
        children: 'regionListVos'
      },
      // 门店回显
      transferRepositoryId: '',
      // 区域列表
      regions: [],
      // 选择的数据
      choosedata: [],
      // 弹窗组件的控制
      editVisible: this.editcontrol,
      // 修改信息数据
      personalForm: this.editdata,
      // 结算方式数据
      colseTypes: [],
      // 结算方式获取参数
      colseTypeparms: {
        type: 3,
        pagenum: 1,
        pagesize: 99999
      },
      // 门店回显
      TransferRepositoryId: '',
      // 控制门店
      repositorycontrol: false,
      // 部门数据
      depts: [],
      // 经办人回显
      handlePersonId: '',
      // 控制经办人
      stockControl: false,
      // 收入单规则数据
      personalrules: {
        handlePersonId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        transferDate: [
          { required: true, message: '请选择收款日期', trigger: 'change' }
        ],
        transferRegion: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        transferInAccount: [
          { required: true, message: '请选择账户', trigger: 'change' }
        ]
      },
      // 收入单明细数据
      list2: [],
      // 收入单明细列表规则
      validRules: {
      }
    }
  },
  watch: {
    editcontrol() {
      this.editVisible = this.editcontrol
      this.judgedirction()
      this.getaccounts2()
    },
    editdata() {
      this.personalForm = this.editdata
      this.personalForm.direction = this.personalForm.direction.toString()
      this.handlePersonId = this.personalForm.handlePersonName
      this.incomeRepositoryId = this.personalForm.incomeRepositoryName
      this.list2 = this.personalForm.transferDetailVos
      // this.setregionIds()
      this.getTypes()
      this.gettree()
    }
  },
  created() {
    this.getdatatime()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    test2(row, val) {
      console.log(row, val)
      const accountsname = this.accountcodes.find(item => {
        return item.itemCode === val
      })
      console.log('accountsname', accountsname)
      row.subjectName = accountsname.itemName
      // row.subjectCode = needata.subjectNumber
    },
    async getaccounts2() {
      if (this.$store.getters.repositoryId === 0) {
        const parms = {
          subjectId: 102
        }
        const account1 = await itemList(parms).then(res => {
          return res.data.data.content
        })

        const parms2 = {
          subjectId: 44
        }
        const account2 = await itemList(parms2).then(res => {
          return res.data.data.content
        })

        const parms3 = {
          subjectId: 43
        }
        const account3 = await itemList(parms3).then(res => {
          return res.data.data.content
        })
        const allaccounts = [...account1, ...account2, ...account3]
        this.accountcodes = allaccounts.map(item => {
          return {
            itemName: item.itemCode + ' ' + item.itemName,
            itemCode: item.itemCode
          }
        })
      } else {
        const parms = {
          subjectId: 44
        }
        itemList(parms).then(res => {
          if (res.data.ret === 200) {
            this.accountcodes = res.data.data.content.map(item => {
              return {
                itemName: item.itemCode + ' ' + item.itemName,
                itemCode: item.itemCode
              }
            })
          }
        })
      }
    },
    judgedirction() {
      if (this.$store.getters.repositoryId === 0) {
        this.personalForm.direction = '1'
        this.showaccounts = true
      } else {
        this.personalForm.direction = '2'
        this.showaccounts = false
      }
    },
    switchtreedata(val) {
      for (const i in val) {
        if (val[i].subjectNumber === '' || val[i].subjectNumber === null) {
          this.switchtreedata(val[i].subjectFinanceVos)
        } else {
          if (val[i].level > 3) {
            this.switchtreedata(val[i].subjectFinanceVos)
          }
          val[i].subjectName = val[i].subjectNumber + val[i].subjectName
        }
      }
    },
    setbank(val) {
      const bankdata = this.accounts.filter(item => {
        return item.accountNumber === val
      })
      console.log('bankdata', bankdata)
      this.personalForm.transferInBank = bankdata[0].bank
    },
    getaccounts() {
      searchAccount(this.accountsparm).then(res => {
        if (res.data.ret === 200) {
          this.accounts = res.data.data.content.list
        }
      })
    },
    // async setvoucherdata() {
    //   console.log('this.editdata222222', this.editdata)
    //   const voucherdata = this.personalForm
    //   this.selectid = this.personalForm.transferDetailVos.map(item => {
    //     return {
    //       id: item.id
    //     }
    //   })
    //   if (voucherdata) {
    //     const voucherdetaildata = await Promise.all(voucherdata.transferDetailVos.map(item => {
    //       return getSubjectDetail(item.subjectCode).then(res => {
    //         return res.data.data.content
    //       })
    //     }))

    //     for (const i in voucherdetaildata) {
    //       const carstdata = this.findPathByLeafId2(voucherdetaildata[i].subjectId, this.treedata)
    //       voucherdetaildata[i].setcarst = carstdata
    //     }
    //     const testarr = this.list2
    //     console.log('voucherdetaildata222222222', voucherdetaildata)
    //     for (const i in testarr) {
    //       for (const j in voucherdetaildata) {
    //         if (testarr[i].subjectCode === voucherdetaildata[j].itemCode) {
    //           testarr[i].setcarst = voucherdetaildata[j].setcarst
    //         }
    //       }
    //     }

    //     // for (const i in testarr) {
    //     //   this.$refs.editable.insert(testarr[i])
    //     // }

    //     // console.log('list222222222222', this.list2)
    //   }
    // },
    findPathByLeafId2(leafId, nodes, path) {
      if (path === undefined) {
        path = []
      }
      for (var i = 0; i < nodes.length; i++) {
        var tmpPath = path.concat()
        tmpPath.push(nodes[i].id)
        if (leafId === nodes[i].id) {
          return tmpPath
        }
        if (nodes[i].subjectFinanceVos) {
          var findResult = this.findPathByLeafId2(leafId, nodes[i].subjectFinanceVos, tmpPath)
          if (findResult) {
            return findResult
          }
        }
      }
    },
    // setregionIds() {
    //   for (const i in this.list2) {
    //     if (this.list2[i].regionId) {
    //       this.list2[i].regionIds = this.findPathByLeafId(this.list2[i].regionId, this.regions)
    //     }
    //   }
    //   console.log('this.list2', this.list2)
    // },
    findPathByLeafId(leafId, nodes, path) {
      if (path === undefined) {
        path = []
      }
      for (var i = 0; i < nodes.length; i++) {
        var tmpPath = path.concat()
        tmpPath.push(nodes[i].id)
        if (leafId === nodes[i].id) {
          return tmpPath
        }
        if (nodes[i].regionListVos) {
          var findResult = this.findPathByLeafId(leafId, nodes[i].regionListVos, tmpPath)
          if (findResult) {
            return findResult
          }
        }
      }
    },
    getarrs() {
      console.log('222', 222)
      console.log('this.personalForm.transferRegionId', this.personalForm.transferRegionId)
      const needata = this.findPathByLeafId(this.personalForm.transferRegionId, this.regions)
      console.log('needata', needata)
      this.personalForm.transferRegion = needata
      const finalid = needata[needata.length - 1]
      console.log(finalid)
      this.region = finalid
    },
    findtreedata(val, val2) {
      let data;
      (val || []).map(i => {
        if (i.id === val2) {
          data = i
        } else {
          const child = this.findtreedata(i.subjectFinanceVos, val2)
          if (child) {
            data = child
          }
        }
      })
      return data
    },
    gettree() {
      console.log(123)
      subjectList().then(res => {
        if (res.data.ret === 200) {
          const newarr = res.data.data.content
          const testarr = this.switchtreedata(newarr)
          this.suboptions = this.processchildren(newarr)
          this.treedata = res.data.data.content
          // this.setvoucherdata()
        }
      })
      console.log(321)
    },
    processchildren(val) {
      for (const i in val) {
        if (val[i].subjectFinanceVos.length === 0) {
          delete val[i].subjectFinanceVos
        } else {
          this.processchildren(val[i].subjectFinanceVos)
        }
        // if (val[i].) {
        // }
      }
      return val
    },
    test(row, val) {
      console.log(row, val)
      const finid = val[val.length - 1]
      const needata = this.findtreedata(this.treedata, finid)
      console.log('needata', needata)
      row.subjectName = needata.subjectName
      row.subjectCode = needata.subjectNumber
    },
    handlechange4(row, val) {
      console.log(val)
      const finalid = val[val.length - 1]
      row.regionId = finalid
    },
    // 转化数据方法
    tranKTree(arr) {
      if (!arr || !arr.length) return
      return arr.map(item => ({
        id: item.id,
        regionName: item.regionName,
        regionListVos: this.tranKTree(item.regionListVos)
      }))
    },
    // 新增收入
    insertEvent(index) {
      if (this.$store.getters.repositoryId !== 0 && this.$store.getters.repositoryId !== null && this.$store.getters.repositoryId !== undefined && this.$store.getters.repositoryId !== '') {
        console.log('this.$store.getters.regionId', this.$store.getters.regionId)

        const needata = this.findPathByLeafId(this.$store.getters.regionId, this.regions)
        console.log('needata', needata)
        if (needata.includes(28)) {
          const subjectdata = [1, 2, 9, 43, 283]
          this.$refs.editable.insertAt({ repositoryId: this.$store.getters.repositoryId, subjectFinance: subjectdata }, index)
        } else if (needata.includes(29)) {
          const subjectdata = [1, 2, 9, 43, 279]
          this.$refs.editable.insertAt({ repositoryId: this.$store.getters.repositoryId, subjectFinance: subjectdata }, index)
        } else if (needata.includes(47)) {
          const subjectdata = [1, 2, 9, 43, 231]
          this.$refs.editable.insertAt({ repositoryId: this.$store.getters.repositoryId, subjectFinance: subjectdata }, index)
        } else if (needata.includes(65)) {
          const subjectdata = [1, 2, 9, 43, 280]
          this.$refs.editable.insertAt({ repositoryId: this.$store.getters.repositoryId, subjectFinance: subjectdata }, index)
        } else if (needata.includes(66)) {
          const subjectdata = [1, 2, 9, 43, 282]
          this.$refs.editable.insertAt({ repositoryId: this.$store.getters.repositoryId, subjectFinance: subjectdata }, index)
        } else if (needata.includes(67)) {
          const subjectdata = [1, 2, 9, 43, 285]
          this.$refs.editable.insertAt({ repositoryId: this.$store.getters.repositoryId, subjectFinance: subjectdata }, index)
        } else if (needata.includes(68)) {
          const subjectdata = [1, 2, 9, 43, 286]
          this.$refs.editable.insertAt({ repositoryId: this.$store.getters.repositoryId, subjectFinance: subjectdata }, index)
        } else if (needata.includes(79)) {
          const subjectdata = [1, 2, 9, 43, 284]
          this.$refs.editable.insertAt({ repositoryId: this.$store.getters.repositoryId, subjectFinance: subjectdata }, index)
        } else if (needata.includes(80)) {
          const subjectdata = [1, 2, 9, 43, 281]
          this.$refs.editable.insertAt({ repositoryId: this.$store.getters.repositoryId, subjectFinance: subjectdata }, index)
        } else if (needata.includes(81)) {
          const subjectdata = [1, 2, 9, 43, 287]
          this.$refs.editable.insertAt({ repositoryId: this.$store.getters.repositoryId, subjectFinance: subjectdata }, index)
        } else if (needata.includes(90)) {
          const subjectdata = [1, 2, 9, 43, 236]
          this.$refs.editable.insertAt({ repositoryId: this.$store.getters.repositoryId, subjectFinance: subjectdata }, index)
        }
      } else {
        const needata = this.findPathByLeafId(this.$store.getters.regionId, this.regions)
        console.log('needata', needata)
        if (needata.includes(28)) {
          const subjectdata = [1, 2, 9, 43, 283]
          this.$refs.editable.insertAt({ subjectFinance: subjectdata }, index)
        } else if (needata.includes(29)) {
          const subjectdata = [1, 2, 9, 43, 279]
          this.$refs.editable.insertAt({ subjectFinance: subjectdata }, index)
        } else if (needata.includes(47)) {
          const subjectdata = [1, 2, 9, 43, 231]
          this.$refs.editable.insertAt({ subjectFinance: subjectdata }, index)
        } else if (needata.includes(65)) {
          const subjectdata = [1, 2, 9, 43, 280]
          this.$refs.editable.insertAt({ subjectFinance: subjectdata }, index)
        } else if (needata.includes(66)) {
          const subjectdata = [1, 2, 9, 43, 282]
          this.$refs.editable.insertAt({ subjectFinance: subjectdata }, index)
        } else if (needata.includes(67)) {
          const subjectdata = [1, 2, 9, 43, 285]
          this.$refs.editable.insertAt({ subjectFinance: subjectdata }, index)
        } else if (needata.includes(68)) {
          const subjectdata = [1, 2, 9, 43, 286]
          this.$refs.editable.insertAt({ subjectFinance: subjectdata }, index)
        } else if (needata.includes(79)) {
          const subjectdata = [1, 2, 9, 43, 284]
          this.$refs.editable.insertAt({ subjectFinance: subjectdata }, index)
        } else if (needata.includes(80)) {
          const subjectdata = [1, 2, 9, 43, 281]
          this.$refs.editable.insertAt({ subjectFinance: subjectdata }, index)
        } else if (needata.includes(81)) {
          const subjectdata = [1, 2, 9, 43, 287]
          this.$refs.editable.insertAt({ subjectFinance: subjectdata }, index)
        } else if (needata.includes(90)) {
          const subjectdata = [1, 2, 9, 43, 236]
          this.$refs.editable.insertAt({ subjectFinance: subjectdata }, index)
        } else {
          this.$refs.editable.insertAt({}, index)
        }
      }
    },
    getTypes() {
      // 部门列表数据
      getdeptlist().then(res => {
        if (res.data.ret === 200) {
          this.depts = res.data.data.content
        }
      })
      // 结算方式数据
      searchSaleCategory(this.colseTypeparms).then(res => {
        if (res.data.ret === 200) {
          this.colseTypes = res.data.data.content.list
        }
      })
      // 门店列表
      searchRepository2().then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.repositories = res.data.data.content.list
        } else {
          console.log('区域选择门店')
        }
      })
      // 区域列表数据
      regionlist().then(res => {
        if (res.data.ret === 200) {
          this.regions = this.tranKTree(res.data.data.content)
          // this.getarrs()
        } else {
          console.log('区域列表出错')
        }
      })
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
      this.personalForm.transferDate = currentdate
    },
    // 门店focus事件触发
    handlechooseRep() {
      this.repositorycontrol = true
    },
    repositoryname(val) {
      this.transferRepositoryId = val.repositoryName
      this.personalForm.transferRepositoryId = val.id
    },
    // 重置一下下拉
    change() {
      this.$forceUpdate()
    },
    // 经办人focus事件
    handlechooseStock() {
      this.stockControl = true
    },
    // 经办人回显
    stockName(val) {
      console.log(val)
      this.personalForm.deptId = val.deptId
      this.transferRepositoryId = val.repositoryName
      this.personalForm.transferRepositoryId = val.repositoryId
      this.handlePersonId = val.personName
      this.personalForm.handlePersonId = val.id
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createPersonId: this.$store.getters.userId,
        countryId: this.$store.getters.countryId,
        repositoryId: this.$store.getters.repositoryId,
        regionId: this.$store.getters.regionId,
        currency: '1'
      }
      this.handlePersonId = null
      this.personalForm.handlePersonId = null
      this.incomeRepositoryId = null
      this.personalForm.incomeRepositoryId = null
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.repositoryId = this.$store.getters.repositoryId
      this.personalForm.regionId = this.$store.getters.regionId
      this.personalForm.createPersonId = this.$store.getters.userId
      this.personalForm.countryId = this.$store.getters.countryId
      this.personalForm.modifyPersonId = this.$store.getters.userId
      const Data = this.personalForm
      for (const key in Data) {
        if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
          delete Data[key]
        }
      }
      const parms = JSON.stringify(Data)
      const EnterDetail = this.$refs.editable.getRecords()
      if (EnterDetail.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: this.$t('prompt.mxbbnwk'),
          offset: 100
        })
        return false
      }
      let i = 1
      EnterDetail.map(function(elem) {
        return elem
      }).forEach(function(elem) {
        if (elem.subjectCode === null || elem.subjectCode === undefined || elem.subjectCode === '') {
          i = 4
        }
        if (elem.regionId === null || elem.regionId === undefined || elem.regionId === '') {
          if (elem.repositoryId === null || elem.repositoryId === undefined || elem.repositoryId === '') {
            i = 2
          }
        }
        if (elem.regionId !== null && elem.regionId !== undefined && elem.regionId !== '' && elem.regionId.length !== 0) {
          if (elem.repositoryId !== null && elem.repositoryId !== undefined && elem.repositoryId !== '') {
            i = 3
          }
        }
        if (elem.repositoryId === null || elem.repositoryId === '' || elem.repositoryId === undefined) {
          delete elem.repositoryId
        }
        if (elem.summary === null || elem.summary === '' || elem.summary === undefined) {
          delete elem.summary
        }
        if (elem.subjectFinanceId === null || elem.subjectFinanceId === '' || elem.subjectFinanceId === undefined) {
          delete elem.subjectFinanceId
        }
        if (elem.money === null || elem.money === '' || elem.money === undefined) {
          delete elem.money
        }
        return elem
      })
      if (i === 4) {
        this.$notify.error({
          title: 'wrong',
          message: '会计科目必须选择一个',
          offset: 100
        })
        return false
      }
      if (i === 2) {
        this.$notify.error({
          title: 'wrong',
          message: '区域，门店必须选择一个',
          offset: 100
        })
        return false
      }
      if (i === 3) {
        this.$notify.error({
          title: 'wrong',
          message: '区域，门店不能同时选择',
          offset: 100
        })
        return false
      }
      const parms2 = JSON.stringify(EnterDetail)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          updatetransfer(parms, parms2).then(res => {
            if (res.data.ret === 200) {
              this.$notify({
                title: this.$t('prompt.czcg'),
                message: this.$t('prompt.czcg'),
                type: 'success',
                duration: 1000,
                offset: 100
              })
              this.$emit('rest', true)
              this.restAllForm()
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
    handlecancel() {
      this.restAllForm()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.editVisible = false
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    height: 900px;
  }
  .el-col-12{
    width: 49%;
  }
</style>
