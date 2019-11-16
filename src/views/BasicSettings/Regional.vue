<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('public.add') }}</el-button>
    </div>
    <tree-table :data="data" :eval-func="func" :eval-args="args" :expand-all="expandAll" border>
      <el-table-column :label="$t('area.SerialNumber')" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('area.AreaName')" align="center">
        <template slot-scope="scope">
          {{ scope.row.regionName }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('area.level')" align="center">
        <template slot-scope="scope">
          {{ scope.row.level }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('area.Manager')" align="center">
        <template slot-scope="scope">
          {{ scope.row.regionManagerName }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('area.CreationTime')" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('area.Founder')" align="center">
        <template slot-scope="scope">
          {{ scope.row.createName }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('area.Operation')" width="240" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('updates.xjzqy') }}</el-button>
          <el-button v-if="scope.row.isNext === 2" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('area.delete') }}</el-button>
          <el-button type="warning" size="mini" @click="handleEdit(scope.row)">{{ $t('public.edit') }}</el-button>
        </template>
      </el-table-column>
    </tree-table>
    <el-dialog :visible.sync="dialogFormVisible" :title="$t('area.addAreas')" width="45%" center lock-scroll>
      <el-form :model="categoriesform" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('area.AreaName')">
          <el-input v-model="categoriesform.name"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('area.Inclusivearea')">
          <el-select v-model="value5" multiple placeholder="plearse choose">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.regionName"
              :value="item.firstLevelId"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('area.cancel') }}</el-button>
        <el-button type="primary" @click="createData">{{ $t('area.ok') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible2" :title="$t('area.addAreas')" width="45%" center lock-scroll>
      <el-form :model="categoriesform2" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('area.AreaName')">
          <el-input v-model="categoriesform2.name"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('area.Manager')">
          <el-select v-model="categoriesform2.regionmanagerid" placeholder="plearse choose" clearable class="filter-item" style="width: 130px" filterable>
            <el-option v-for="item in storelist" :key="item.id" :label="item.firstName + item.middleName + item.lastName" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">{{ $t('area.cancel') }}</el-button>
        <el-button type="primary" @click="createData2">{{ $t('area.ok') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible3" :title="$t('area.editarea')" width="45%" center lock-scroll>
      <el-form :model="categoriesform3" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('area.AreaName')">
          <el-input v-model="categoriesform3.name"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('area.Manager')">
          <el-select v-model="categoriesform3.regionmanagerid" placeholder="plearse choose" clearable class="filter-item" style="width: 130px" filterable>
            <el-option v-for="item in storelist" :key="item.id" :label="item.firstName + item.middleName + item.lastName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('area.Inclusivearea')">
          <el-select v-model="value5" multiple placeholder="plearse choose">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.regionName"
              :value="item.firstLevelId"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">{{ $t('area.cancel') }}</el-button>
        <el-button type="primary" @click="createData3">{{ $t('area.ok') }}</el-button>
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
import { newdetailList, createarea, listbyparentid, regionmanagercandidate, createarea2, deleteregion, getregionbylevel, updateregion } from '@/api/area'
import permission from '@/directive/permission/index.js' // 权限判断指令
import permission2 from '@/directive/permission2/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import treeToArray from './customEval'

var _that
export default {
  name: 'Regional',
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
        name: '',
        levle: 1,
        parentid: 0,
        zhuanfirstlevelid: '',
        firstlevelid: 0,
        createid: ''
      },
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      categoriesform2: {
        name: '',
        levle: '',
        parentid: '',
        firstlevelid: 0,
        createid: '',
        regionmanagerid: ''
      },
      categoriesform3: {
        regionid: '',
        name: '',
        regionmanagerid: null,
        parentid: ''
      },
      tempData: '',
      tempData2: '',
      formLabelWidth: '120px',
      options: [],
      value5: [],
      storelist: []
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    checkPermission,
    getlist() {
      newdetailList().then(res => {
        this.data = res.data.data.content
      })
    },
    message(row) {
      this.$message.info(row.name)
    },
    restcategoriesform() {
      this.categoriesform = {
        name: '',
        levle: 1,
        parentid: 0,
        zhuanfirstlevelid: '',
        firstlevelid: 0,
        createid: ''
      }
    },
    handleCreate() {
      this.restcategoriesform()
      this.dialogFormVisible = true
      listbyparentid().then(res => {
        this.options = res.data.data.content
      })
    },
    createData() {
      this.categoriesform.createid = this.$store.getters.userId
      if (this.value5[this.value5.length - 1] === undefined) {
        this.categoriesform.firstlevelid === 0
        createarea(this.categoriesform).then(res => {
          this.getlist()
          this.dialogFormVisible = false
          this.$notify({
            title: 'successful',
            message: 'successful',
            type: 'success',
            duration: 2000
          })
          this.categoriesform.name = ''
        })
      } else if (this.value5 !== []) {
        this.categoriesform.firstlevelid = this.value5.join()
        createarea(this.categoriesform).then(res => {
          this.getlist()
          this.dialogFormVisible = false
          this.$notify({
            title: 'successful',
            message: 'successful',
            type: 'success',
            duration: 2000
          })
        })
      }
    },
    handleUpdate(row) {
      this.tempData = Object.assign({}, row) // copy obj
      this.dialogFormVisible2 = true
      console.log(row)
      regionmanagercandidate(row.id).then(res => {
        this.storelist = res.data.data.content
      })
    },
    createData2() {
      const name = this.categoriesform2.name
      const levle = this.tempData.level + 1
      const parentid = this.tempData.id
      const createid = this.$store.getters.userId
      const regionmanagerid = this.categoriesform2.regionmanagerid
      createarea2(name, levle, parentid, createid, regionmanagerid).then(res => {
        this.getlist()
        this.dialogFormVisible2 = false
        this.$notify({
          title: 'successful',
          message: 'successful',
          type: 'success',
          duration: 2000
        })
        this.categoriesform2.name = ''
      })
    },
    // 列表删除
    handleDelete(row) {
      console.log(row)
      this.$confirm('This will permanently delete the record. Continue?', 'Warning', {
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        deleteregion(row.id).then(res => {
          console.log(res)
          this.getlist()
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
    handleEdit(row) {
      console.log(row)
      this.tempData2 = Object.assign({}, row) // copy obj
      this.categoriesform3.name = row.regionName
      this.dialogFormVisible3 = true
      getregionbylevel(row.level).then(res => {
        this.options = res.data.data.content
      })
      regionmanagercandidate(row.id).then(res => {
        this.storelist = res.data.data.content
      })
    },
    createData3() {
      console.log(123)
      console.log(this.tempData2)
      const regionid = this.tempData2.id
      const name = this.categoriesform3.name
      const regionmanagerid = this.categoriesform3.regionmanagerid
      if (this.value5[this.value5.length - 1] === undefined) {
        const parentid = 0
        updateregion(regionid, name, regionmanagerid, parentid).then(res => {
          this.getlist()
          this.dialogFormVisible3 = false
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        })
      } else if (this.value5 !== []) {
        const parentid = this.value5[this.value5.length - 1]
        updateregion(regionid, name, regionmanagerid, parentid).then(res => {
          this.getlist()
          this.dialogFormVisible3 = false
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    }
  }
}
</script>
