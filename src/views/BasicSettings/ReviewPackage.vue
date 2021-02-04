<template>
  <div class="ERP-container">
    <el-card class="box-card" style="margin-top: 10px" shadow="never">

      <el-input v-model="condition" :placeholder="$t('update4.gjz')" class="filter-item" clearable @keyup.enter.native="getlist"/>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 86px;margin-top: 10px" round @click="getlist">{{ $t('public.search') }}</el-button>

    </el-card>
    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 新建操作 -->
      <el-button v-permission="['1-39-46-1']" v-waves class="filter-item" icon="el-icon-plus" type="success" style="width: 86px" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <el-dialog :visible.sync="packageVisible" title="新建审核权限包" class="normal" width="600px" center>
        <div style="padding: 10px 10px">
          <el-input v-model="newApprovalParms.remark" style="width: 300px" autosize placeholder="请输入权限包主题" clearable/>
        </div>
        <div class="buttons" style="padding: 10px 10px">
          <el-button @click="handleApproval">{{ $t('updates.tj') }}</el-button>
          <my-approval :repositorycontrol.sync="approvalControl" @repositoryname="approvalData" />
          <el-button type="danger" @click="$refs.newApprovalTable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <div class="container" style="padding: 0 10px">
          <el-editable
            ref="newApprovalTable"
            :data.sync="newApprovalList"
            :edit-config="{ showIcon: true, showStatus: true}"
            :height="tableHeight"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" width="55" align="center" fixed="left"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('BasicSettings.process_name')" prop="processName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('BasicSettings.type3')" prop="typeName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('UnitGroup.createPersonName')" prop="createPersonName" align="center" min-width="150px"/>
          </el-editable>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button :loading="saveloding" type="primary" @click="handlesave()">{{ $t('Hmodule.baoc') }}</el-button>
          <el-button type="danger" @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>
    </el-card>

    <el-card class="box-card" style="margin-top: 10px" shadow="never">
      <!-- 列表开始 -->
      <el-table
        v-loading="listLoading"
        ref="table"
        :key="tableKey"
        :data="list"
        :height="listtableHeight"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column :label="$t('NewEmployeeInformation.id')" :resizable="false" type="index" align="center" width="60"/>
        <el-table-column :label="$t('update4.remarks')" :resizable="false" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('BasicSettings.process_name')" :resizable="false" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.processNames }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('CheckSet.createName')" :resizable="false" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createName }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('public.actions')" :resizable="false" align="center">
          <template slot-scope="scope">
            <el-button v-permission2="['1-39-45-2', scope.row.createPersonId]" type="primary" size="mini" @click="handleEdit(scope.row)" >{{ $t('public.edit') }}</el-button>
            <el-button v-permission2="['1-39-45-3', scope.row.createPersonId]" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('public.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--修改开始=================================================-->
      <el-dialog :visible.sync="editPackageVisible" title="修改审核权限包" class="normal" width="600px" center>
        <div style="padding: 10px 10px">
          <el-input v-model="editApprovalparms.remark" style="width: 300px" autosize placeholder="请输入权限包主题" clearable/>
        </div>
        <div class="buttons" style="padding: 10px 10px">
          <el-button @click="handleeditApproval">{{ $t('updates.tj') }}</el-button>
          <my-approval2 :repositorycontrol.sync="approvalControl2" @repositoryname="editapprovalData" />
          <el-button type="danger" @click="$refs.editApprovalTable.removeSelecteds()">{{ $t('Hmodule.delete') }}</el-button>
        </div>
        <div class="container">
          <el-editable
            ref="editApprovalTable"
            :data.sync="editApprovalList"
            :edit-config="{ showIcon: true, showStatus: true}"
            class="click-table1"
            stripe
            border
            size="small"
            style="width: 100%">
            <el-editable-column type="selection" width="55" align="center" fixed="left"/>
            <el-editable-column :label="$t('Hmodule.xh')" min-width="55" align="center" type="index"/>
            <el-editable-column :label="$t('BasicSettings.process_name')" prop="processName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('BasicSettings.type3')" prop="typeName" align="center" min-width="150px"/>
            <el-editable-column :label="$t('UnitGroup.createPersonName')" prop="createPersonName" align="center" min-width="150px"/>
          </el-editable>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleOk()">{{ $t('public.edit') }}</el-button>
          <el-button type="danger" @click="handleNo()">{{ $t('Hmodule.cancel') }}</el-button>
        </span>
      </el-dialog>
      <!--修改结束=================================================-->
    </el-card>
  </div>
</template>

<script>
import '@/directive/noMoreClick/index.js'
import { addApprovalPackage, updateApprovalPackage, deleteApprovalPackage, approvalPackageList } from '@/api/BasicSettings'

import MyApproval from './components/MyApproval'
import MyApproval2 from './components/MyApproval2'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数

var _that
export default {
  name: 'ReviewPackage',
  directives: { waves, permission, permission2 },
  components: { Pagination, MyApproval, MyApproval2 },
  data() {
    return {
      listtableHeight: 200,
      saveloding: false, // 防止多次点击
      list: [],
      tableKey: 0,
      listLoading: false,
      condition: '', // 关键字
      packageVisible: false, // 新建弹窗控制
      approvalControl: false,
      approvalControl2: false,
      newApprovalList: [], // 新建列表数据
      editPackageVisible: false, // 修改弹窗控制
      editApprovalparms: {
        processIds: '',
        processNames: '',
        remark: '',
        createId: this.$store.getters.userId
      },
      editApprovalList: [], // 修改列表数据
      newApprovalParms: {
        processIds: '',
        processNames: '',
        remark: '',
        packageId: ''
      },
      tableHeight: 100

    }
  },
  activated() {
    this.getlist()
    setTimeout(() => {
      this.listtableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  mounted() {
    // this.getlist2()
    this.getlist()
    setTimeout(() => {
      this.listtableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140
    }, 100)
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    // 删除操作
    handleDelete(row) {
      this.$confirm(this.$t('prompt.scts'), this.$t('prompt.ts'), {
        confirmButtonText: this.$t('prompt.qd'),
        cancelButtonText: this.$t('prompt.qx'),
        type: 'warning'
      }).then(() => {
        deleteApprovalPackage(row.id).then(res => {
          if (res.data.ret === 200 || res.data.ret === 100) {
            this.$notify({
              title: this.$t('prompt.sccg'),
              type: 'success',
              offset: 100
            })
            this.getlist()
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
    handleeditApproval() {
      this.approvalControl2 = true
    },
    // 取消修改
    handleNo() {
      this.editPackageVisible = false
    },
    // 确认修改
    handleOk() {
      if (!this.editApprovalparms.remark) {
        this.$notify.error({
          title: 'wrong',
          message: '请输入权限包主题',
          offset: 100
        })
        return false
      }
      if (this.editApprovalList.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择审核流程',
          offset: 100
        })
        return false
      }
      const name = []
      const id = []
      for (const i in this.editApprovalList) {
        name.push(this.editApprovalList[i].processName)
        id.push(this.editApprovalList[i].id)
      }
      this.editApprovalparms.processNames = name.join(',')
      this.editApprovalparms.processIds = id.join(',')
      updateApprovalPackage(this.editApprovalparms).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: 'successful',
            message: 'edit successful',
            type: 'success',
            offset: 100
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: res.data.msg,
            offset: 100
          })
        }
        this.editPackageVisible = false
        this.getlist()
      })
    },

    uniqueArray(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    editapprovalData(data) {
      const nowlistdata = this.$refs.editApprovalTable.getRecords()
      const alldata = [...data, ...nowlistdata]
      const filterdata = this.uniqueArray(alldata, 'id')
      console.log('filterdata', filterdata)
      this.editApprovalList = filterdata
    },
    // 修改操作
    handleEdit(row) {
      this.editPackageVisible = true
      this.editApprovalparms.packageId = row.id
      this.editApprovalparms.processNames = row.processNames
      this.editApprovalparms.processIds = row.processIds
      this.editApprovalparms.remark = row.remark

      const name = row.processNames.split(',')
      const ids = row.processIds.split(',')
      const newarr = []
      for (const i in name) {
        for (const j in ids) {
          if (i === j) {
            newarr.push({ processName: name[i], id: Number(ids[j]) })
          }
        }
      }
      this.editApprovalList = newarr
    },
    // 新建取消
    handlecancel() {
      this.clearNewParms()
      this.packageVisible = false
    },
    // 清空新建数据
    clearNewParms() {
      this.newApprovalParms = {
        processIds: '',
        processNames: '',
        remark: '',
        createId: this.$store.getters.userId
      }
    },
    // 新建保存
    handlesave() {
      const name = []
      const id = []
      for (const i in this.newApprovalList) {
        name.push(this.newApprovalList[i].processName)
        id.push(this.newApprovalList[i].id)
      }

      this.newApprovalParms.processNames = name.join(',')
      this.newApprovalParms.processIds = id.join(',')
      this.newApprovalParms.createId = this.$store.getters.userId
      console.log('this.newApprovalParms', this.newApprovalParms)
      if (!this.newApprovalParms.remark) {
        this.$notify.error({
          title: 'wrong',
          message: '请输入权限包主题',
          offset: 100
        })
        return false
      }
      if (this.newApprovalList.length === 0) {
        this.$notify.error({
          title: 'wrong',
          message: '请选择审核流程',
          offset: 100
        })
        return false
      }
      this.saveloding = true
      addApprovalPackage(this.newApprovalParms).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: 'successful',
            message: 'save successful',
            type: 'success',
            offset: 100
          })
        } else {
          this.$notify.error({
            title: 'wrong',
            message: res.data.msg,
            offset: 100
          })
        }
        this.$refs.newApprovalTable.clear()
        this.saveloding = false
        this.clearNewParms()
        this.getlist()
        this.packageVisible = false
      })
    },
    // 审核权限列表选中数据
    approvalData(data) {
      console.log('data', data)
      this.newApprovalList = data
    },
    // 弹出审核权限列表
    handleApproval() {
      this.approvalControl = true
    },
    // 新建操作
    handleAdd() {
      this.packageVisible = true
      setTimeout(() => {
        this.tableHeight = window.innerHeight - this.$refs.newApprovalTable.$el.offsetTop - 300
      }, 100)
    },
    // 获取列表
    getlist() {
      this.listLoading = true
      approvalPackageList(this.condition).then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        }
        this.listLoading = false
      })
    }

  }
}
</script>

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
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 24px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .ERP-container {
    margin: 0px 30px;
  }
  .filter-container{
    padding: 20px;
    padding-left: 0px;
  }
  .filter-item{
   width: 180px;
    margin-left: 20px;
    padding: 10px 0;
  }
</style>

