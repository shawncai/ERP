<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-button v-permission="[69]" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleadd">{{ $t('table.add') }}</el-button>
    </div>
    <div class="app-container">
      <div class="left-container" style="width: 35%;float:left;">
        <div class="title" style="margin-left:35%;margin-bottom: 20px;">{{ $t('repair.Manual') }}</div>
        <el-input
          v-model="filterText"
          placeholder="please search"/>
        <el-tree
          ref="tree2"
          :data="data2"
          :props="defaultProps"
          :filter-node-method="filterNode"
          class="filter-tree"
          @node-click="handleNodeClick">
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span style="margin-left: 50px">
              <i v-permission="['54-67-75-1']" v-if="data.level === 1" class="el-icon-plus" @click="add(data)"/>
              <i v-permission="['54-67-74-2']" class="el-icon-delete" @click="nodedelete(data)"/>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="right-containe" style="width:65%;float:right;">
        <div class="title" style="text-align: center;margin-bottom: 20px">{{ $t('repair.solution2') }}</div>
        <div class="container_left" style="float: left;width:40%;margin-left: 65px">
          <el-input
            v-model="textarea3"
            :autosize="{ minRows: 20, maxRows: 40}"
            :placeholder="$t('repair.solution')"
            type="textarea"
            readonly/>
        </div>
        <div class="container_right" style="float:right;width:40%;margin-right: 65px">
          <el-input
            v-model="textarea4"
            :autosize="{ minRows: 20, maxRows: 40}"
            :placeholder="$t('repair.EmployeeGuidance')"
            type="textarea"
            readonly/>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :title="$t('repair.Addlevel1')" width="45%" center lock-scroll>
      <el-form :model="categoriesform" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.NameofParts2')">
          <el-input v-model="categoriesform.name"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.solution')">
          <el-input v-model="categoriesform.content"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.EmployeeGuidance')">
          <el-input v-model="categoriesform.employeeguide"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('repair.cancel') }}</el-button>
        <el-button type="primary" @click="createData">{{ $t('repair.ok') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible2" :title="$t('repair.Addlevel2')" width="45%" center lock-scroll>
      <el-form :model="categoriesform2" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.NameofParts2')">
          <el-input v-model="categoriesform2.name"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.solution')">
          <el-input v-model="categoriesform2.content"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('repair.EmployeeGuidance')">
          <el-input v-model="categoriesform2.employeeguide"/>
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
import { selfChecklist, addselfchecking, deleteselfchecking } from '../../api/repair'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
export default {
  name: 'SelfCheck',
  directives: { permission },
  data() {
    return {
      filterText: '',
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      textarea3: '',
      textarea4: '',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      categoriesform: {
        name: '',
        level: 1,
        parentid: 0,
        content: '',
        employeeguide: ''
      },
      categoriesform2: {
        name: '',
        level: 2,
        parentid: 1,
        content: '',
        employeeguide: ''
      },
      tempData: '',
      formLabelWidth: '120px'
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    getList() {
      selfChecklist().then(res => {
        this.data2 = res.data.data.content
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      this.textarea3 = data.result
      this.textarea4 = data.employeeGuide
    },
    nodedelete(data) {
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        deleteselfchecking(data).then(res => {
          if (res.data.ret === 200) {
            this.getList()
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
    },
    add(data) {
      this.tempData = Object.assign({}, data) // copy obj
      this.dialogFormVisible2 = true
    },
    createData2() {
      this.categoriesform2.parentid = this.tempData.id
      addselfchecking(this.categoriesform2).then(res => {
        this.getList()
        this.dialogFormVisible2 = false
        this.$notify({
          title: 'successful',
          message: 'successful',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleadd() {
      this.dialogFormVisible = true
    },
    createData() {
      addselfchecking(this.categoriesform).then(res => {
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: 'successful',
          message: 'successful',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
  .app-container{
    padding: 0px;
  }
  .tap-container1{
    margin-left: 20px;
  }
  .el-tabs__header is-top{
    padding-left: 20px;
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
