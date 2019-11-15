<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-permission="[8]" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>
    <tree-table :data="data" :eval-func="func" :eval-args="args" :expand-all="expandAll" border>
      <el-table-column :label="$t('repair.NameofParts')" :resizable='false' align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('repair.CreationDate')" :resizable='false' align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column v-permission="[8, 9]" :label="$t('repair.action')" :resizable='false' width="200" align="center">
        <template slot-scope="scope">
          <el-button v-permission="[8]" v-if="scope.row.level != 3" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.add') }}</el-button>
          <el-button v-permission="[9]" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('repair.delete') }}</el-button>
        </template>
      </el-table-column>
    </tree-table>
    <el-dialog :visible.sync="dialogFormVisible" :title="$t('repair.Addafirstlevel')" width="40%" center lock-scroll>
      <el-form :model="categoriesform" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.NameofParts')">
          <el-input v-model="categoriesform.faultname"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('repair.cancel') }}</el-button>
        <el-button type="primary" @click="createData">{{ $t('repair.ok') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible2" :title="$t('repair.Addasecondarypart')" width="40%" center lock-scroll>
      <el-form :model="categoriesform2" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.NameofParts')">
          <el-input v-model="categoriesform2.faultname"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">{{ $t('repair.cancel') }}</el-button>
        <el-button type="primary" @click="createData2">{{ $t('repair.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
   Auth: Lei.j1ang
   Created: 2018/1/19-14:54
   */
import treeTable from '@/components/TreeTable'
import { searchproblemobject, addfaultcomponent, deletefaultcomponent } from '@/api/repair'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import treeToArray from './customEval'

var _that
export default {
  name: 'ProblemPart',
  components: { treeTable },
  directives: { permission, permission2 },
  data() {
    return {
      func: treeToArray,
      expandAll: false,
      data: [],
      args: [null, null],
      dialogFormVisible: false,
      categoriesform: {
        faultname: '',
        level: 1,
        parentid: ''
      },
      dialogFormVisible2: false,
      categoriesform2: {
        faultname: '',
        level: 2,
        parentid: ''
      },
      tempData: '',
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    checkPermission,
    getlist() {
      searchproblemobject().then(res => {
        this.data = res.data.data.content
        console.log(this.data)
      })
    },
    message(row) {
      this.$message.info(row.name)
    },
    handleCreate() {
      this.dialogFormVisible = true
    },
    createData() {
      addfaultcomponent(this.categoriesform).then(res => {
        this.getlist()
        this.dialogFormVisible = false
        this.$notify({
          title: 'successful',
          message: 'successful',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleUpdate(row) {
      this.tempData = Object.assign({}, row) // copy obj
      this.dialogFormVisible2 = true
    },
    createData2() {
      this.categoriesform2.parentid = this.tempData.id
      addfaultcomponent(this.categoriesform2).then(res => {
        this.getlist()
        this.dialogFormVisible2 = false
        this.$notify({
          title: 'successful',
          message: 'successful',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleDelete(row) {
      this.$confirm('This will permanently delete the record. Continue?', 'Warning', {
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        deletefaultcomponent(row).then(res => {
          if (res.data.ret === 200) {
            this.getlist()
          }
        })
        this.$message({
          type: 'success',
          message: 'Delete completed!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    }
  }
}
</script>
