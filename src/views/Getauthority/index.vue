<template>
  <div class="ERP-container">
    <div class="app-container" style="padding-right: 0">
      <!--基本信息-->
      <el-card class="box-card" shadow="never" style="height: 800px">
        <el-row :gutter="20">
          <el-form ref="getemplist" :model="getemplist" label-width="100px" style="margin-top: 10px">
            <el-col :span="5">
              <el-form-item label="角色名称" label-width="100px">
                <el-input v-model="getemplist.rolename" :placeholder="$t('Getauthority.rolename')" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-button class="filter-item" type="primary" style="width: 86px" @click="newRole">{{ $t('public.save') }}</el-button>
            </el-col>
          </el-form>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" >
            <div class="container" style="margin-top: 20px">
              <div style="width: 100%;border: 1px solid #ebeef5;border-bottom:none;height: 30px;padding-top: 5px;padding-left: 28px;color: #606266;">角色列表</div>
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                border
                fit
                height="730px"
                highlight-current-row
                style="width: 100%;">
                <el-table-column :label="$t('Getauthority.rolename')" :resizable="false" align="center" min-width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.roleName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Getauthority.createTime')" :resizable="false" align="center" min-width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Getauthority.createPersonName')" :resizable="false" align="center" min-width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.createPersonName }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="container5" style="margin-top: 20px">
              <div style="width: 100%;border: 1px solid #ebeef5;border-bottom:none;height: 30px;padding-top: 5px;padding-left: 28px;color: #606266;">模块列表</div>
              <el-card class="box-card" shadow="never" style="height: 800px">
                <div slot="header" class="clearfix">
                  <span>名称</span>
                </div>
                <el-scrollbar class="tree">
                  <el-tree :data="treeData" :props="defaultProps" accordion highlight-current @node-click="handleNodeClick"/>
                </el-scrollbar>
              </el-card>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="container3" style="margin-top: 20px">
              <div style="width: 100%;border: 1px solid #ebeef5;border-bottom:none;height: 30px;padding-top: 5px;padding-left: 28px;color: #606266;">操作权限</div>
              <el-card class="box-card" shadow="never" style="height: 730px">
                <div slot="header" class="clearfix">
                  <span>名称</span>
                  <el-checkbox v-model="checkAll" style="float: right;margin-bottom: -5px" @change="handleCheckAllChange">全选</el-checkbox>
                </div>
                <div class="upsides">
                  <el-checkbox-group v-model="operations" @change="handleCheckedCitiesChange">
                    <div v-for="(item,index) in operates" :key="index" class="text item">
                      <el-checkbox :label="item.id">{{ item.name }}</el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </el-card>
            </div>
          </el-col>
          <!--<el-col :span="6">-->
          <!--<div class="container" style="margin-top: 37px">-->
          <!--<span>1234</span>-->
          <!--</div>-->
          <!--</el-col>-->
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { repairList, getauthoritydetaillist, addrole } from '@/api/Getauthority'
export default {
  name: 'Getauthority',
  data() {
    return {
      checkAll: false,
      // 获取的数据
      operations: [],
      // 操作权限
      operates: [],
      // 所有权限数据
      details: [],
      // 树形数据
      treeData: [],
      defaultProps: {
        children: 'authorityVos',
        label: 'name'
      },
      // 表格数据
      list: [],
      // 表格数据条数
      total: 0,
      // 表格识别
      tableKey: 0,
      // 加载表格
      listLoading: true,
      getemplist: {
        createPersonId: 3
      }
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    restAllForm() {
      this.getemplist.rolename = null
    },
    // 新建角色
    newRole() {
      addrole(this.getemplist).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            offset: 100
          })
          this.restAllForm()
          this.getlist()
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg,
            offset: 100
          })
        }
      })
    },
    handleCheckAllChange(val) {
      console.log(val)
      console.log(this.details)
      console.log(this.operations)
      if (val === true) {
        this.operations = this.details
      } else {
        this.operations = []
      }
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
      const checkedCount = value.length
      this.checkAll = checkedCount === this.operates.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.operates.length
    },
    // 树列表选择数据
    handleNodeClick(data) {
      console.log(data)
      if (data.authorityDetails !== null) {
        this.operates = data.authorityDetails
        this.details = data.detail.split(',').map(function(item) {
          return Number(item)
        })
      } else {
        this.operates = []
        this.details = []
      }
    },
    // 角色列表
    getlist() {
      // 物料需求计划列表数据
      this.listLoading = true
      repairList().then(res => {
        if (res.data.ret === 200) {
          this.list = res.data.data.content
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })

      getauthoritydetaillist().then(res => {
        if (res.data.ret === 200) {
          this.treeData = res.data.data.content
        }
      })
    },
    // 保存操作
    // handlesave() {
    //   const Data = this.personalForm
    //   for (const key in Data) {
    //     if (Data[key] === '' || Data[key] === undefined || Data[key] === null) {
    //       delete Data[key]
    //     }
    //   }
    //   const parms = JSON.stringify(Data)
    //   this.$refs.personalForm.validate((valid) => {
    //     if (valid) {
    //       addCustomerChat(parms).then(res => {
    //         console.log(res)
    //         if (res.data.ret === 200) {
    //           this.$notify({
    //             title: '成功',
    //             message: '保存成功',
    //             type: 'success',
    //             offset: 100
    //           })
    //           this.restAllForm()
    //           this.$refs.personalForm.clearValidate()
    //           this.$refs.personalForm.resetFields()
    //         } else {
    //           this.$notify.error({
    //             title: '错误',
    //             message: res.data.msg,
    //             offset: 100
    //           })
    //         }
    //       })
    //     } else {
    //       this.$notify.error({
    //         title: '错误',
    //         message: '信息未填完整',
    //         offset: 100
    //       })
    //       return false
    //     }
    //   })
    // },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/GroupBuyRules/AddGroupBuyRules', name: 'AddGroupBuyRules', fullPath: '/GroupBuyRules/AddGroupBuyRules', title: 'AddGroupBuyRules' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    }
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .ERP-container {
    margin-right: 0;
    font-size: 14px;
  }
  .ERP-container >>> .el-card__header{
    padding:13px 28px;
    color: #909399;
    font-weight: bold;
  }
  .ERP-container >>> .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .tree{
    height: 500px;
  }
  .tree >>> .el-tree {
    min-width: 100%;
  }
  .upsides >>> .el-checkbox{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 46px;
    flex-flow: row-reverse;
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
  .container3 .text {
    font-size: 14px;
  }

  .container3 .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
