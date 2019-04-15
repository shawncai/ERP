<template>
  <el-dialog :visible.sync="editVisible" :treecontrol="treecontrol" :close-on-press-escape="false" append-to-body top="10px" @close="$emit('update:treecontrol', false)">
    <!--基本信息-->
    <h2 ref="geren" class="form-name">物品分类</h2>
    <el-card class="box-card">
      <el-input
        v-model="filterText"
        placeholder="输入关键字进行过滤"
        style="margin-bottom: 30px"/>
      <el-tree
        ref="tree2"
        :data="detalist"
        :props="detaillistProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all
        @node-click="handleNodeClick"/>
    </el-card>
    <el-button class="filter-item" type="success" style="margin-top: 10px" @click="handleConfirm">确认添加</el-button>
  </el-dialog>
</template>

<script>
import { detaillist } from '@/api/Product'
export default {
  props: {
    treecontrol: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
      this.gettree()
    },
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.gettree()
  },
  methods: {
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
      const isPass = node.data && node.data.categoryName && node.data.categoryName.indexOf(value) !== -1
      isPass ? _array.push(isPass) : ''
      this.index++
      if (!isPass && node.level !== 1 && node.parent) {
        this.getReturnNode(node.parent, _array, value)
      }
    },
    // 树状图数据
    gettree() {
      detaillist().then(res => {
        if (res.data.ret === 200) {
          this.detalist = res.data.data.content
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
      this.gettree()
    },
    handleConfirm() {
      console.log(this.choosedata)
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
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>

</style>
