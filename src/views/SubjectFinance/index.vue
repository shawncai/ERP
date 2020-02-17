<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" style="float: left;width: 30%; height: 800px">
        <el-input
          v-model="filterText"
          placeholder="输入关键字进行过滤"
          style="margin-bottom: 30px"
          clearable/>
        <el-scrollbar class="tree">
          <el-tree
            ref="tree2"
            :data="detalist"
            :props="detaillistProps"
            :filter-node-method="filterNode"
            class="filter-tree"
            @node-click="handleNodeClick">
            <span slot-scope="{ node, data }" class="custom-tree-node" @click="getlist(data,node)">
              <span>{{ node.label }}</span>
              <span v-if="data.level > 3">
                <!--                <i class="el-icon-plus" @click="addtree(data,node)"/>-->
                <!--                <i class="el-icon-edit" @click="edittree(data,node)"/>-->
                <!--                <i class="el-icon-delete" @click="nodedelete(data,node)"/>-->
              </span>
            </span>
          </el-tree>
        </el-scrollbar>
        <el-dialog :visible.sync="edititemVisible" title="修改科目明细" class="normal" width="600px">
          <el-form :model="edititem" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
            <el-form-item :label="$t('SubjectFinance.itemCode')" label-width="120px">
              <el-input v-model="edititem.itemCode" placeholder="" autocomplete="off" style="width: 200px"/>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.itemName')" label-width="120px">
              <el-input v-model="edititem.itemName" placeholder="" autocomplete="off" style="width: 200px"/>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.subjectType')" label-width="120px">
              <el-input v-model="subjectType" placeholder="" disabled autocomplete="off" style="width: 200px"/>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.balanceTrend')" label-width="120px">
              <el-radio-group v-model="edititem.balanceTrend" style="margin-left: 18px;width: 200px">
                <el-radio :label="1" style="width: 100px">借</el-radio>
                <el-radio :label="2">贷</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.foreignCurrencyAccount')" label-width="120px">
              <el-radio-group v-model="edititem.foreignCurrencyAccount" style="margin-left: 18px;width: 200px">
                <el-radio :label="1" style="width: 100px">核算</el-radio>
                <el-radio :label="2">不核算</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.businessAccount')" label-width="120px">
              <el-radio-group v-model="edititem.businessAccount" style="margin-left: 18px;width: 200px">
                <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.cashItem')" label-width="120px">
              <el-radio-group v-model="edititem.cashItem" style="margin-left: 18px;width: 200px">
                <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.bankItem')" label-width="120px">
              <el-radio-group v-model="edititem.bankItem" style="margin-left: 18px;width: 200px">
                <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleedit">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="additemVisible" title="新建科目明细" class="normal" width="600px">
          <el-form :model="additem" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
            <el-form-item :label="$t('SubjectFinance.itemCode')" label-width="120px">
              <el-input v-model="additem.itemCode" placeholder="" autocomplete="off" style="width: 200px"/>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.itemName')" label-width="120px">
              <el-input v-model="additem.itemName" placeholder="" autocomplete="off" style="width: 200px"/>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.subjectType')" label-width="120px">
              <el-input v-model="subjectType" placeholder="" disabled autocomplete="off" style="width: 200px"/>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.balanceTrend')" label-width="120px">
              <el-radio-group v-model="additem.balanceTrend" style="margin-left: 18px;width: 200px">
                <el-radio :label="1" style="width: 100px">借</el-radio>
                <el-radio :label="2">贷</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.foreignCurrencyAccount')" label-width="120px">
              <el-radio-group v-model="additem.foreignCurrencyAccount" style="margin-left: 18px;width: 200px">
                <el-radio :label="1" style="width: 100px">核算</el-radio>
                <el-radio :label="2">不核算</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.businessAccount')" label-width="120px">
              <el-radio-group v-model="additem.businessAccount" style="margin-left: 18px;width: 200px">
                <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.cashItem')" label-width="120px">
              <el-radio-group v-model="additem.cashItem" style="margin-left: 18px;width: 200px">
                <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.bankItem')" label-width="120px">
              <el-radio-group v-model="additem.bankItem" style="margin-left: 18px;width: 200px">
                <el-radio :label="1" style="width: 100px">{{ $t('updates.yes') }}</el-radio>
                <el-radio :label="2">{{ $t('updates.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="handlesave2">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="addVisible" title="新建科目" class="normal" width="600px">
          <el-form :model="addtreeform" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
            <el-form-item :label="$t('SubjectFinance.subjectNumber')" label-width="120px">
              <el-input v-model="addtreeform.subjectNumber" placeholder="" autocomplete="off" style="width: 200px"/>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.subjectName')" label-width="120px">
              <el-input v-model="addtreeform.subjectName" placeholder="" autocomplete="off" style="width: 200px"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="handlesave">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="editVisible" title="修改科目" class="normal" width="600px">
          <el-form :model="edittreeform" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
            <el-form-item :label="$t('SubjectFinance.subjectNumber')" label-width="120px">
              <el-input v-model="edittreeform.subjectNumber" placeholder="" autocomplete="off" style="width: 200px" disabled/>
            </el-form-item>
            <el-form-item :label="$t('SubjectFinance.subjectName')" label-width="120px">
              <el-input v-model="edittreeform.subjectName" placeholder="" autocomplete="off" style="width: 200px" />
            </el-form-item>
            <!--            <el-form-item :label="$t('SubjectFinance.isActive')" label-width="120px">-->
            <!--              <el-radio-group v-model="edittreeform.isActive" style="width:300px">-->
            <!--                <el-radio :label="1" style="margin-left: 25px">启用</el-radio>-->
            <!--                <el-radio :label="2">禁用</el-radio>-->
            <!--              </el-radio-group>-->
            <!--            </el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleOk">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
      <el-card class="box-card" style="float: left;width: 65%; max-height: 1000px;margin-left: 15px">
        <el-button v-permission="['266-267-1']" v-waves v-if="showLevel > 3" class="filter-item" icon="el-icon-plus" type="success" style="width: 86px;margin-bottom: 10px" @click="handleAdd">{{ $t('public.add') }}</el-button>
        <el-table
          :key="tableKey"
          :data="list"
          border
          fit
          max-height="750"
          style="width: 100%;">
          <el-table-column :label="$t('SubjectFinance.itemCode')" :resizable="false" fixed="left" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.itemCode }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('SubjectFinance.itemName')" :resizable="false" fixed="left" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.itemName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('SubjectFinance.subjectType')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.subjectTypeName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('SubjectFinance.balanceTrend')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.balanceTrend | balanceTrendFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('SubjectFinance.foreignCurrencyAccount')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.foreignCurrencyAccount | foreignCurrencyAccountFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('SubjectFinance.businessAccount')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.businessAccount | businessAccountFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('SubjectFinance.cashItem')" :resizable="false" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.cashItem | cashItemFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('SubjectFinance.bankItem')" :resizable="false" prop="judgeStat" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.bankItem | bankItemFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('public.actions')" :resizable="false" align="center" min-width="230">
            <template slot-scope="scope">
              <el-button v-permission="['266-267-3']" :title="$t('updates.xg')" type="primary" size="mini" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!--操作-->
    </div>
  </div>
</template>

<script>
import { addSubject, subjectList, deleteSubject, updateSubject, itemList, addSubjectDetail, updateSubjectDetail } from '@/api/SubjectFinance'
import waves from '@/directive/waves' // Waves directive
// eslint-disable-next-line no-unused-vars
var _that
export default {
  name: 'AddInitialenter',
  directives: { waves },
  filters: {
    balanceTrendFilter(status) {
      const statusMap = {
        1: '借',
        2: '贷'
      }
      return statusMap[status]
    },
    foreignCurrencyAccountFilter(status) {
      const statusMap = {
        1: '核算',
        2: '不核算'
      }
      return statusMap[status]
    },
    businessAccountFilter(status) {
      const statusMap = {
        1: _that.$t('updates.yes'),
        2: _that.$t('updates.no')
      }
      return statusMap[status]
    },
    cashItemFilter(status) {
      const statusMap = {
        1: _that.$t('updates.yes'),
        2: _that.$t('updates.no')
      }
      return statusMap[status]
    },
    bankItemFilter(status) {
      const statusMap = {
        1: _that.$t('updates.yes'),
        2: _that.$t('updates.no')
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      additem: {
        balanceTrend: 1,
        foreignCurrencyAccount: 1,
        businessAccount: 1,
        cashItem: 1,
        bankItem: 1,
        level: 1
      },
      list: [],
      edititem: {},
      // 表格识别
      tableKey: 0,
      nodata: false,
      newnode: '',
      showLevel: '',
      // 新增data
      newdata2: '',
      // 新增data
      newdata: '',
      // 判断位数
      Iscode: '',
      subjectType: '',
      // 位数提示
      weishu: '',
      // 提示位数
      tishi: false,
      // 修改数据
      edittreeform: {},
      addtreeform: {},
      // 修改控制器
      editVisible: false,
      addVisible: false,
      additemVisible: false,
      edititemVisible: false,
      // 树状图搜索数据
      filterText: '',
      // 树状图数据
      detalist: [],
      // 树状图props
      detaillistProps: {
        children: 'subjectFinanceVos',
        label: 'subjectName'
      },
      // 父级回显
      parentId: '',
      getemplist: {},
      // 库存入库单信息数据
      personalForm: {
        createId: 1,
        levle: 1,
        parentId: 0
      },
      // 库存入库单规则数据
      personalrules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        isActive: [
          { required: true, message: '请选择应用状态', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    filterText(val) {
      console.log(val)
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.gettree()
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    handleEdit(val) {
      console.log('val', val)
      // this.newnode = node
      this.edititemVisible = true
      this.edititem = val
      this.edititem.itemCode = val.itemCode
      const last = val.itemCode.lastIndexOf('.')
      this.edititem.itemCode2 = val.itemCode.substring(0, last + 1)
    },
    handleAdd() {
      this.additemVisible = true
      // this.additem.itemCode = ''
      this.additem.itemName = ''
    },
    getlist(data, node) {
      this.newdata = data
      console.log('node.data.level', node.data.level)
      if (node.data.level >= 3) {
        this.puttype(node)
      }
      console.log('data', data)
      console.log('node', node)
      console.log('this.additem.subjectType', this.additem.subjectType)
      console.log('this.subjectType', this.subjectType)
      this.additem.subjectId = data.id
      // this.additem.itemCode = data.subjectNumber
      // this.additem.itemName = data.subjectName
      this.additem.itemCode = data.subjectNumber + '.'
      this.additem.itemCode2 = data.subjectNumber + '.'
      this.showLevel = data.level
      this.addtreeform.level = data.level + 1
      this.addtreeform.parentId = data.id
      this.addtreeform.createId = this.$store.getters.userId
      console.log('this.showLevel', this.showLevel)
      // this.subjectType = data.subjectName
      // this.getemplist.subjectId = data.id
      this.getemplist = {}
      if (node.data.level === 2) {
        // this.getemplist.subjectId
        this.getemplist.subjectType = node.data.id
      }
      this.getemplist.subjectId = node.data.id
      itemList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        }
      })
    },
    refreshlist(data, node) {
      itemList(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        }
      })
    },
    // 增加节点
    addtree(data, node) {
      this.addVisible = true
      this.newnode = node
      this.newdata2 = data
      this.addtreeform.level = data.level + 1
      this.addtreeform.parentId = data.id
      this.addtreeform.createId = this.$store.getters.userId
    },
    puttype(node) {
      if (node.data.level === 3) {
        this.additem.subjectType = node.data.id
        this.subjectType = node.data.subjectName
        return true
      } else {
        const next = node.parent
        this.puttype(next)
      }
    },
    zhengze(val) {
      if (this.Iscode === '01') {
        const reg = /^[A-Z0-9]{1}$/
        if (reg.test(this.personalForm.code) === false) {
          this.personalForm.code = ''
        }
      } else {
        const reg = /^[A-Z0-9]{2}$/
        if (reg.test(this.personalForm.code) === false) {
          this.personalForm.code = ''
        }
      }
    },
    // 删除操作
    nodedelete(data, node) {
      this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      }).then(() => {
        deleteSubject(data.id).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: this.$t('prompt.sccg'),
              type: 'success',
              offset: 100
            })
            this.gettree()
            console.log('node', node)
            console.log('data', data)
            const parent = node.parent
            const children = parent.data.productClassfyVos
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)
          } else {
            this.$notify.error({
              title: 'wrong',
              message: 'wrong',
              offset: 100
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('prompt.yqxsc')
        })
      })
    },
    // 确认修改
    handleOk() {
      console.log('this.edittreeform', this.edittreeform)
      const parms = JSON.stringify(this.edittreeform)
      updateSubject(parms).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: 'successful',
            message: '修改成功',
            type: 'success',
            offset: 100
          })
          this.editVisible = false
          this.gettree()
        }
      })
    },
    // 修改节点
    edittree(data, node) {
      console.log(data)
      this.editVisible = true
      this.newnode = node
      this.newdata2 = data
      this.edittreeform = Object.assign({}, data)
    },
    // 递归函数
    recursion(val) {
      if (val.level === 1) {
        return val.data
      } else {
        return this.recursion(val.parent)
      }
    },
    // 选择节点操作
    handleNodeClick(data, node) {
      console.log('data', data)
      this.nodata = false
      const ceshidigui = this.recursion(node)
      if (node.parent.data.code === '01' || (data.level === 4 && ceshidigui.code === '02') || (data.level === 3 && ceshidigui.code === '03')) {
        this.tishi = false
        this.nodata = true
        return false
      }
      this.newdata = data
      this.personalForm.parentId = data.id
      this.parentId = data.categoryName
      this.personalForm.levle = data.level + 1
      this.Iscode = ceshidigui.code
      console.log('personalForm.levle', this.personalForm.levle)
      console.log('ceshidigui', ceshidigui)
      console.log('data', data)
      console.log('node', node)
      if (ceshidigui.code === '01') {
        this.tishi = true
        this.weishu = '1位'
      } else {
        this.tishi = true
        this.weishu = '2位'
      }
      // this.gettree()
    },
    // 搜索树状图数据方法
    filterNode(value, data, node) {
      if (!value) return true
      // return data.categoryName.indexOf(value) !== -1
      const _array = []// 这里使用数组存储 只是为了存储值。
      this.getReturnNode(node, _array, value)
      let result = false
      _array.forEach((item) => {
        result = result || item
      })
      return result
    },
    getReturnNode(node, _array, value) {
      const isPass = node.data && node.data.subjectName && node.data.subjectName.toUpperCase().indexOf(value.toUpperCase()) !== -1
      isPass ? _array.push(isPass) : ''
      this.index++
      if (!isPass && node.level !== 1 && node.parent) {
        this.getReturnNode(node.parent, _array, value)
      }
    },
    // 树状图数据
    gettree() {
      console.log(123)
      subjectList().then(res => {
        if (res.data.ret === 200) {
          this.detalist = res.data.data.content
        }
      })
      console.log(321)
    },
    // 保存操作
    handlesave() {
      console.log('addtreeform', this.addtreeform)
      if (this.addtreeform.subjectNumber === null || this.addtreeform.subjectNumber === '' || this.addtreeform.subjectNumber === undefined || this.addtreeform.subjectName === null || this.addtreeform.subjectName === '' || this.addtreeform.subjectName === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: '请填写完整',
          offset: 100
        })
        return false
      }
      const parms = JSON.stringify(this.addtreeform)
      addSubject(parms).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.$notify({
            title: 'successful',
            message: '新建成功',
            type: 'success',
            offset: 100
          })
          this.gettree()
          this.addVisible = false
          this.addtreeform = {}
          this.restAllForm()
          this.$refs.personalForm.clearValidate()
          this.$refs.personalForm.resetFields()
          console.log(res.data.data.content)
          const newChild = res.data.data.content
          if (!this.newdata.productClassfyVos) {
            this.$set(this.newdata, 'productClassfyVos', [])
          }
          this.newdata.productClassfyVos.push(newChild)
        } else {
          this.$notify.error({
            title: 'wrong',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    },
    handleedit() {
      if ((this.edititem.itemCode.substring(0, this.edititem.itemCode2.length) !== this.edititem.itemCode2) || (this.edititem.itemCode.substring(this.edititem.itemCode2.length, this.edititem.itemCode.length).length === 0)) {
        this.$notify.error({
          title: 'wrong',
          message: '请按照编码规则填写',
          offset: 100
        })
        return false
      }
      if (this.edititem.itemCode === null || this.edititem.itemCode === '' || this.edititem.itemCode === undefined || this.edititem.itemName === null || this.edititem.itemName === '' || this.edititem.itemName === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: '请填写完整',
          offset: 100
        })
        return false
      }
      console.log('edititem', this.edititem)
      const parms = JSON.stringify(this.edititem)
      updateSubjectDetail(parms).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.$notify({
            title: 'successful',
            message: '修改成功',
            type: 'success',
            offset: 100
          })
          this.refreshlist()
          this.changeSome(this.detalist)
          // this.gettree()
          this.edititemVisible = false
        } else {
          this.$notify.error({
            title: 'wrong',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    },
    changeSome(val) {
      console.log('val', val)
      for (let i = 0; i < val.length; i++) {
        if (val[i].id === this.edititem.subjectId) {
          val[i].subjectName = this.edititem.itemName
        } else if (val[i].subjectFinanceVos) {
          this.changeSome(val[i].subjectFinanceVos)
        }
      }
    },
    handlesave2() {
      console.log('this.additem.itemCode', this.additem.itemCode)
      if ((this.additem.itemCode.substring(0, this.additem.itemCode2.length) !== this.additem.itemCode2) || (this.additem.itemCode.substring(this.additem.itemCode2.length, this.additem.itemCode.length).length === 0)) {
        this.$notify.error({
          title: 'wrong',
          message: '请按照编码规则填写',
          offset: 100
        })
        return false
      }
      if (this.additem.itemCode === null || this.additem.itemCode === '' || this.additem.itemCode === undefined || this.additem.itemName === null || this.additem.itemName === '' || this.additem.itemName === undefined) {
        this.$notify.error({
          title: 'wrong',
          message: '请填写完整',
          offset: 100
        })
        return false
      }
      this.addtreeform.subjectNumber = this.additem.itemCode
      this.addtreeform.subjectName = this.additem.itemName
      console.log('parms', this.additem)
      console.log('parms2', this.additem)
      const parms = JSON.stringify(this.additem)
      const parms2 = JSON.stringify(this.addtreeform)
      addSubjectDetail(parms, parms2).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.$notify({
            title: 'successful',
            message: '新建成功',
            type: 'success',
            offset: 100
          })
          this.additem.balanceTrend = 1
          this.additem.foreignCurrencyAccount = 1
          this.additem.businessAccount = 1
          this.additem.cashItem = 1
          this.additem.bankItem = 1
          this.additem.level = 1
          this.refreshlist()
          // this.gettree()
          this.additemVisible = false
          console.log(res.data.data.content)
          const newChild = res.data.data.content
          if (!this.newdata.subjectFinanceVos) {
            this.$set(this.newdata, 'subjectFinanceVos', [])
          }
          this.newdata.subjectFinanceVos.push(newChild)
        } else {
          this.$notify.error({
            title: 'wrong',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        createId: 1,
        levle: 1,
        parentId: 0
      }
      this.parentId = ''
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Product/detaillist', name: 'detaillist', fullPath: '/Product/detaillist', title: 'detaillist' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    handlechoose() {
      this.createcontrol = true
    }
  }
}
</script>

<style  rel="stylesheet/css" scoped>
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
  .ERP-container {
    margin: 0px 20px;
    margin-right: 0;
  }
  .ERP-container >>> .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .ERP-container >>> .el-scrollbar__view {
    white-space: nowrap;
    width: 100%;
  }

  .tree{
    height: 600px;
  }
  .tree >>> .el-tree {
    min-width: 100%;
  }

  .tree >>> .el-tree-node>.el-tree-node__children {
    overflow: unset!important;
  }

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
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
</style>
