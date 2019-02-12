<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input :placeholder="$t('roles.department')" v-model="listQuery.keyword" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-permission="[60]" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        height="535"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column :label="$t('roles.SerialNumber')" prop="id" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('roles.name')" prop="roleName" min-width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('roles.Department')" align="center" prop="deptName" min-width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('roles.CreationDate')" prop="createTime" min-width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="[61, 62]" :label="$t('table.actions')" align="center" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-permission="[61]" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table2.edit') }}</el-button>
            <el-button v-permission="[62]" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('roles.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="dialogFormVisible"
      :title="$t('roles.addrolepermission')"
      width="100%"
      center
      top="-10px"
      lock-scroll>
      <el-form :model="categoriesform" style="width: 100%;">
        <el-form-item :label-width="formLabelWidth" :label="$t('roles.Rolename')">
          <el-input v-model="categoriesform.rolename" style="width: 200px"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('roles.rolesdetail')">
          <el-input v-model="categoriesform.description" style="width: 200px"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('roles.rolesmanagement')">
          <el-row>
            <el-col v-for="item in dalist" :span="6" :key="item.id" >
              <el-card class="box-card" style="height: 214px">
                <div slot="header" class="clearfix">
                  <el-checkbox v-model="checkList" :label="item.id" @change="singlehandle(item.id)">{{ item.name }}</el-checkbox>
                </div>
                <el-checkbox-group v-model="checkList">
                  <el-row>
                    <el-col v-for="zi in item.authoritys" :span="12" :key="zi.id">
                      <el-checkbox :label="zi.id" @change="handleCheckedCitiesChange(item)">{{ zi.name }}</el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('roles.cancel') }}</el-button>
        <el-button type="primary" @click="createData">{{ $t('roles.ok') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormVisible2"
      :title="$t('roles.editrolepermission')"
      width="100%"
      center
      top="-10px"
      lock-scroll>
      <el-form :model="categoriesform2" style="width: 100%;">
        <el-form-item :label-width="formLabelWidth" :label="$t('roles.name')">
          <el-input v-model="categoriesform2.roleName" :disabled="true" style="width: 200px"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('roles.rolesdetail')">
          <el-input v-model="categoriesform2.description" :disabled="true" style="width: 200px"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('roles.rolesmanagement')">
          <el-row>
            <el-col v-for="item in dalist2" :span="6" :key="item.id" >
              <el-card class="box-card" style="height: 214px">
                <div slot="header" class="clearfix">
                  <el-checkbox v-model="checkList2" :label="item.id" @change="singlehandle2(item.id)">{{ item.name }}</el-checkbox>
                </div>
                <el-checkbox-group v-model="checkList2">
                  <el-row>
                    <el-col v-for="zi in item.authoritys" :span="12" :key="zi.id">
                      <el-checkbox :label="zi.id" @change="handleCheckedCitiesChange2(item)">{{ zi.name }}</el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">{{ $t('roles.cancel') }}</el-button>
        <el-button type="primary" @click="updateData">{{ $t('roles.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getstatByToken } from '@/api/login'
import { repairList, getauthoritydetaillist, addrole, updaterole, deleterole } from '@/api/roles'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'RolesManagement',
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      categoriesform: {
        rolename: '',
        authority: '',
        description: ''
      },
      categoriesform2: {
        roleName: '',
        authority: '',
        description: ''
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        deptid: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      options: [],
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false,
      textMap: {
        update: '修改分类',
        create: '新增分类'
      },
      centerDialogVisible: false,
      checkList: [],
      checkList2: [],
      checked: false,
      checked2: false,
      dalist: [],
      dalist2: [],
      fuji: '',
      temp: [],
      temp2: [],
      zhuan: [],
      dialogFormVisible2: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    // 列表渲染
    getList() {
      this.listLoading = true
      repairList(this.listQuery).then(response => {
        this.list = response.data.data.content
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      getstatByToken(this.$store.getters.token).then(res => {
        if (res.data.data.content !== true) {
          this.$alert('该账号在其他设备登录', '登出', {
            confirmButtonText: '确定',
            callback: action => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            }
          })
        }
      })
    },
    // 列表搜索
    handleFilter() {
      this.listLoading = true
      repairList(this.listQuery).then(res => {
        this.list = res.data.data.content.list
        this.total = res.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
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
        deleterole(row.id).then(res => {
          console.log(res)
          this.getList()
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
    restform() {
      this.checkList = []
      this.categoriesform = {
        rolename: '',
        authority: '',
        description: ''
      }
    },
    // 商品分类添加
    handleCreate() {
      this.restform()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      getauthoritydetaillist().then(res => {
        this.dalist = res.data.data.content
      })
    },
    createData() {
      const rolename = this.categoriesform.rolename
      const authority = this.checkList.join()
      const description = this.categoriesform.description
      addrole(rolename, authority, description).then(() => {
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleCheckedCitiesChange(val) {
      this.checkList.push(val.id)
      this.temp.push(val.id)
      this.checkList = Array.from(new Set(this.checkList))
    },
    singlehandle(val) {
      if (this.temp.includes(val) === true) {
        console.log(111)
        this.temp = this.temp.filter(function(value, index, array) {
          return value !== val
        })
        this.checkList = this.checkList.filter(function(value, index, array) {
          return value !== val
        })
      } else if (this.temp.includes(val) === false) {
        console.log(222)
        this.temp = this.temp.filter(function(value, index, array) {
          return value !== val
        })
        this.checkList.push(val)
        this.temp.push(val)
      }
      this.temp = this.temp.filter(function(value, index, array) {
        return value !== val
      })
    },
    // 列表修改
    handleUpdate(row) {
      this.zhuan = row.authority.split(',')
      const ceshi = []
      this.zhuan.forEach(function(i) {
        ceshi.push(parseInt(i))
      })
      this.checkList2 = ceshi
      this.categoriesform2 = Object.assign({}, row) // copy obj

      this.dialogFormVisible2 = true
      getauthoritydetaillist().then(res => {
        this.dalist2 = res.data.data.content
      })
    },
    updateData() {
      const tempData = Object.assign({}, this.categoriesform2)
      const roleid = tempData.id
      const authority = this.checkList2.join()
      updaterole(roleid, authority).then(() => {
        this.getList()
        this.dialogFormVisible2 = false
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleCheckedCitiesChange2(val) {
      this.checkList2.push(val.id)
      this.temp2.push(val.id)
      this.checkList2 = Array.from(new Set(this.checkList2))
    },
    singlehandle2(val) {
      if (this.temp2.includes(val) === true) {
        console.log(111)
        this.temp2 = this.temp2.filter(function(value, index, array) {
          return value !== val
        })
        this.checkList2 = this.checkList2.filter(function(value, index, array) {
          return value !== val
        })
      } else if (this.temp2.includes(val) === false) {
        console.log(222)
        this.temp2 = this.temp2.filter(function(value, index, array) {
          return value !== val
        })
        this.checkList2.push(val)
        this.temp2.push(val)
      }
      this.temp2 = this.temp2.filter(function(value, index, array) {
        return value !== val
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
  .filter-container{
    margin-left: 20px;
  }
  .el-tabs__header is-top{
    padding-left: 20px;
  }
</style>
