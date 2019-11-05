<template>
  <el-dialog :visible.sync="editVisible" :treecontrol="treecontrol" :supp="supp" :close-on-press-escape="false" append-to-body top="10px" @close="$emit('update:treecontrol', false)">
    <!--基本信息-->
    <h2 ref="geren" class="form-name">选择区域权限</h2>
    <el-card class="box-card">
      <el-tree
        ref="tree"
        :data="data2"
        :props="defaultProps"
        show-checkbox
        check-strictly
        node-key="id"/>
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">取消</el-button>
        <el-button type="primary" @click="handleEditok()">保存</el-button>
      </div>
    </el-card>
    <!--<el-button class="filter-item" type="success" style="margin-top: 10px" @click="handleConfirm">确认添加</el-button>-->
  </el-dialog>
</template>

<script>
import { regionlist } from '@/api/public'
export default {
  props: {
    treecontrol: {
      type: Boolean,
      default: false
    },
    supp: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }],
      defaultProps: {
        children: 'regionListVos',
        label: 'regionName'
      },
      currentKeys: '',
      // 所有数据
      digui: '',
      // 转化数据
      choosedata: '',
      // 弹窗组件的控制
      editVisible: this.treecontrol,
      // 树状图搜索数据
      filterText: '',
      // 树状图数据
      detalist: [],
      // 树状图props
      detaillistProps: {
        children: 'productClassfyVos',
        label: 'categoryName'
      }
    }
  },
  watch: {
    treecontrol() {
      this.editVisible = this.treecontrol
      console.log('this.supp', this.supp)
      this.gettree()
      setTimeout(this.init, 10)
      // clearTimeout(iTime)
      // var iTime2 = setTimeout(this.init, 10)
      // clearTimeout(iTime2)
      // setTimeout(this.init, 10)
      // if (this.$refs.tree2) {
      //   console.log(this.filterText)
      //   this.$refs.tree2.filter(this.filterText)
      // }
    },
    filterText: {
      handler(o, n) {
        if (this.$refs.tree2) {
          console.log(o)
          this.$refs.tree2.filter(o)
        }
      },
      immediate: true

    }
  },
  created() {
    console.log('123')
    this.gettree()
  },
  mounted() {
    console.log('321')
  },
  activated() {
    console.log('333')
    this.gettree()
  },
  methods: {
    init() {
      console.log('wozhixingle')
      this.$refs.tree.setCheckedKeys(this.supp)
    },
    getMyNode(val) {
      console.log('nodes', val)
    },
    handleEditok() {
      let ids = ''
      let names = ''
      const ids2 = []
      const result = this.$refs.tree.getCheckedNodes()
      for (let i = 0; i < result.length; i++) {
        ids = ids + result[i].id + ','
        names = names + result[i].regionName + ','
        ids2.push(result[i].id)
      }
      if (ids.length > 0) {
        ids = ids.substr(0, ids.length - 1)
        names = names.substr(0, names.length - 1)
      }
      this.$emit('ids', ids)
      this.$emit('ids2', ids2)
      this.$emit('names', names)
      console.log('ids', ids)
      console.log('names', names)
      this.editVisible = false
    },
    handlecancel() {
      this.editVisible = false
    },
    // 搜索树状图数据方法
    filterNode(value, data, node) {
      console.log(value)
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
      const isPass = node.data && node.data.categoryName && node.data.categoryName.indexOf(value) !== -1
      isPass ? _array.push(isPass) : ''
      this.index++
      if (!isPass && node.level !== 1 && node.parent) {
        this.getReturnNode(node.parent, _array, value)
      }
    },
    // 树状图数据
    gettree() {
      console.log('test')
      regionlist().then(res => {
        console.log('res', res)
        if (res.data.ret === 200) {
          this.data2 = res.data.data.content
        } else {
          console.log('区域列表出错')
        }
      })
    },
    // 选择节点操作
    handleNodeClick(data, node) {
      console.log(node)
      if (node.level === 1) {
        this.$notify.error({
          title: '错误',
          message: '顶层不可选择',
          offset: 100
        })
        return false
      }
      this.digui = node
      this.choosedata = data
      if (this.choosedata.level === 1) {
        this.$notify.error({
          title: '错误',
          message: '顶层不可选择',
          offset: 100
        })
        this.editVisible = true
        return false
      } else {
        this.$emit('tree', this.choosedata)
        this.$emit('finder', this.digui)
        this.editVisible = false
      }
      this.gettree()
    },
    handleConfirm() {
      console.log(this.choosedata)
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style rel="stylesheet/css" scoped>
  .box-card .filter-tree{
    height: 200px;
    overflow-y: scroll;
  }
  .box-card >>> .el-tree-node__content:hover {
    background: #409EFF;
  }
</style>
