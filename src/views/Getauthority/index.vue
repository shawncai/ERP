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
            <el-col v-if="IsEait === false" :span="2">
              <el-button class="filter-item" type="primary" style="width: 86px" @click="newRole">{{ $t('public.add') }}</el-button>
            </el-col>
            <el-col v-if="IsEait === true" :span="2">
              <el-button class="filter-item" type="success" style="width: 86px" @click="newauthority">{{ $t('public.edit') }}</el-button>
            </el-col>
            <el-col v-if="IsEait === true" :span="2">
              <el-button class="filter-item" type="warning" style="width: 86px" @click="setCurrent()">{{ $t('public.cancel') }}</el-button>
            </el-col>
          </el-form>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" >
            <div class="container" style="margin-top: 20px">
              <div style="width: 100%;border: 1px solid #ebeef5;border-bottom:none;height: 30px;padding-top: 5px;padding-left: 28px;color: #606266;">角色列表</div>
              <el-table
                v-loading="listLoading"
                ref="singleTable"
                :key="tableKey"
                :data="list"
                border
                fit
                max-height="650"
                highlight-current-row
                style="width: 100%;"
                @current-change="handleCurrentChange">
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
              <el-card class="box-card" shadow="never" style="height: 655px;overflow-y: auto">
                <div slot="header" class="clearfix">
                  <span>名称</span>
                  <el-checkbox v-model="checkAll" style="float: right;margin-bottom: -5px" @change="handleCheckAllChange">全选</el-checkbox>
                </div>
                <div v-if="isShow" class="upsides">
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
import { repairList, getauthoritydetaillist, addrole, updaterole } from '@/api/Getauthority'
export default {
  name: 'Getauthority',
  data() {
    return {
      IsEait: false,
      isShow: false,
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
        createPersonId: this.$store.getters.userId,
        rolename: null
      },
      checkroleId: null
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    setCurrent() {
      this.$refs.singleTable.setCurrentRow()
      this.IsEait = false
      this.isShow = false
      this.getemplist.rolename = null
    },
    newauthority() {
      console.log('this.operations', this.operations)
      this.$confirm('所修改的角色需重新登录才能生效, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updaterole(this.checkroleId, this.operations, this.getemplist.rolename).then(res => {
          if (res.data.ret === 200) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              offset: 100
            })
            this.getlist()
            this.isShow = false
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.msg,
              offset: 100
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange(val) {
      this.operations = []
      this.IsEait = true
      console.log('val.roleName', val.roleName)
      this.getemplist.rolename = val.roleName
      this.isShow = false
      this.checkAll = false
      if (val.id !== null && val.id !== undefined && val.id !== '') {
        this.checkroleId = val.id
      }
      if (val.authority !== null && val.authority !== undefined && val.authority !== '') {
        this.operations = val.authority.split(',')
      }
      if (val.authority === null) {
        this.operations = []
      }
      console.log(this.operations)
      console.log(this.getemplist.rolename)
    },
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
      if (val === true) {
        const checkAllData = [...new Set([...this.operations, ...this.details])]
        this.operations = checkAllData
      } else {
        const otherData = this.details
        this.operations = this.operations.filter(function(item) {
          return otherData.indexOf(item) < 0
        })
      }
    },
    handleCheckedCitiesChange(value) {
      console.log(this.operations)
      console.log(value)
      const checkedCount = value.length
      this.checkAll = checkedCount === this.details.length
    },
    // 递归函数取level 1 的id
    recursionLevel1(val) {
      if (val.level === 1) {
        return val.data.id
      } else {
        return this.recursionLevel1(val.parent)
      }
    },
    // 递归函数取level 2 的id
    recursionLevel2(val) {
      if (val.level === 2) {
        return val.data.id
      } else {
        return this.recursionLevel2(val.parent)
      }
    },
    // 递归函数取level 3 的id
    recursionLevel3(val) {
      if (val.level === 3) {
        return val.data.id
      } else {
        return this.recursionLevel3(val.parent)
      }
    },
    // 树列表选择数据
    handleNodeClick(data, node) {
      console.log(node)
      console.log(data)
      const leve1Data = this.recursionLevel1(node)
      const leve2Data = this.recursionLevel2(node)
      if (data.authorityDetails !== null) {
        this.isShow = true
        if (node.level === 3) {
          this.operates = data.authorityDetails.map(function(item) {
            return {
              id: leve1Data + '-' + leve2Data + '-' + data.id + '-' + item.id,
              name: item.name
            }
          })
          this.details = data.detail.split(',').map(function(item) {
            return leve1Data + '-' + leve2Data + '-' + data.id + '-' + Number(item)
          })
        } else if (node.level === 2) {
          this.operates = data.authorityDetails.map(function(item) {
            return {
              id: leve1Data + '-' + data.id + '-' + item.id,
              name: item.name
            }
          })
          this.details = data.detail.split(',').map(function(item) {
            return leve1Data + '-' + data.id + '-' + Number(item)
          })
        } else if (node.level === 4) {
          const leve3Data = this.recursionLevel3(node)
          this.operates = data.authorityDetails.map(function(item) {
            return {
              id: leve1Data + '-' + leve2Data + '-' + leve3Data + '-' + data.id + '-' + item.id,
              name: item.name
            }
          })
          this.details = data.detail.split(',').map(function(item) {
            return leve1Data + '-' + leve2Data + '-' + leve3Data + '-' + data.id + '-' + Number(item)
          })
        }
        console.log(this.operations)
        const ceshi = this.isContain(this.operations, this.details)
        console.log(ceshi)
        if (ceshi === true) {
          this.checkAll = true
        } else if (ceshi === false) {
          this.checkAll = false
        }
      } else {
        this.operates = []
        this.details = []
      }
    },
    isContain(arr1, arr2) {
      for (let i = arr2.length - 1; i >= 0; i--) {
        if (!arr1.includes(arr2[i])) {
          return false
        }
      }
      return true
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
