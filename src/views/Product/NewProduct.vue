<template>
  <div class="ERP-container">
    <div class="app-container">
      <!--基本信息-->
      <h2 ref="geren" class="form-name">基本信息</h2>
      <div class="container">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Product.code')" prop="code" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.code" placeholder="请输入物料编码" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.productname')" prop="productname" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.productname" placeholder="请输入产品名称" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.barcode')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.barcode" placeholder="请输入条码" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.categoryid')" style="width: 40%;margin-top:1%">
            <el-input v-model="categoryid" placeholder="请选择物品分类" @focus="treechoose"/>
            <my-tree :treecontrol.sync="treecontrol" @tree="tree"/>
          </el-form-item>
          <el-form-item :label="$t('Product.typeid')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.typeid" placeholder="请选择规格型号" style="width: 100%;" @focus="updatecate">
              <el-option
                v-for="(item, index) in types"
                :key="index"
                :label="item.categoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Product.purchasemeasurement')" prop="purchasemeasurement" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.purchasemeasurement" placeholder="请选择基本计量单位" style="width: 100%;" @focus="updatecate">
              <el-option
                v-for="(item, index) in measurements"
                :key="index"
                :label="item.categoryName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Product.salemeasurement')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.salemeasurement" placeholder="请选择销售计量单位" style="width: 100%;" @focus="updatecate">
              <el-option
                v-for="(item, index) in measurements"
                :key="index"
                :label="item.categoryName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Product.stockmeasurement')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.stockmeasurement" placeholder="请选择库存计量单位" style="width: 100%;" @focus="updatecate">
              <el-option
                v-for="(item, index) in measurements"
                :key="index"
                :label="item.categoryName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Product.producemeasurement')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.producemeasurement" placeholder="请选择生产计量单位" style="width: 100%;" @focus="updatecate">
              <el-option
                v-for="(item, index) in measurements"
                :key="index"
                :label="item.categoryName"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Product.color')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.color" placeholder="请输入颜色" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.brand')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.brand" placeholder="请选择品牌" style="width: 100%;">
              <el-option value="1" label="类1"/>
              <el-option value="2" label="类2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Product.level')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.level" placeholder="请选择档次级别" style="width: 100%;" @focus="updatecate">
              <el-option
                v-for="(item, index) in levels"
                :key="index"
                :label="item.categoryName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Product.supplierid')" style="width: 40%;margin-top:1%">
            <el-input v-model="supplierid" placeholder="请选择供应商" clearable @focus="handlechoose"/>
          </el-form-item>
          <my-supplier :control.sync="empcontrol" @supplierName="personName"/>
          <el-form-item :label="$t('Product.source')" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.source" placeholder="请选择来源" style="width: 100%;">
              <el-option value="2" label="生产"/>
              <el-option value="3" label="采购"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Product.kpigrade')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.kpigrade" placeholder="请输入绩效分" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.point')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.point" placeholder="请输入商品积分" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.zhibaoqi')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.zhibaoqi" placeholder="请输入质保期" clearable>
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('Product.weight')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.weight" placeholder="请输入重量" clearable>
              <template slot="append">KG</template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('Product.volume')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.volume" placeholder="请输入体积" clearable>
              <template slot="append">m³</template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('Product.isactive')" style="width: 40%;margin-top:1%">
            <el-radio-group v-model="personalForm.isactive" style="width: 80%">
              <el-radio :label="1" style="width: 50%">YES</el-radio>
              <el-radio :label="2">NO</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('Product.isBatch')" prop="isBatch" style="width: 40%;margin-top:1%">
            <el-radio-group v-model="personalForm.isBatch" style="width: 80%">
              <el-radio :label="1" style="width: 50%">使用</el-radio>
              <el-radio :label="2">不使用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('Product.effectiveDay')" prop="effectiveDay" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.effectiveDay" placeholder="请输入有效天数" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!--价格信息-->
      <h2 ref="lianxi" class="form-name">价格信息</h2>
      <div class="container">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Product.valuation')" prop="valuation" style="width: 40%;margin-top:1%">
            <el-select v-model="personalForm.valuation" placeholder="请选择" style="width: 100%;">
              <el-option value="1" label="类1"/>
              <el-option value="2" label="类2"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Product.costprice')" prop="costprice" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.costprice" placeholder="请输入成本价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.tradeprice')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.tradeprice" placeholder="请输入批发价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.saleprice')" prop="saleprice" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.saleprice" placeholder="请输入零售价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.purchaseprice')" prop="purchaseprice" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.purchaseprice" placeholder="请输入采购价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.lowerprice')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.lowerprice" placeholder="请输入最低价" clearable/>
          </el-form-item>
          <el-form-item :label="$t('Product.memberprice')" style="width: 40%;margin-top:1%">
            <el-input v-model="personalForm.memberprice" placeholder="请输入会员价" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <!--图片信息-->
      <h2 class="form-name">图片信息</h2>
      <div class="container">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
          <el-form-item :label="$t('Product.picids')" style="width: 100%;margin-top: 1%">
            <el-button style="margin-bottom: 10px" size="small" type="success" @click="submitUpload">{{ $t('public.uploadimage') }}</el-button>
            <el-upload
              ref="upload"
              :on-preview="handlepicPreview"
              :on-remove="handlepicRemove"
              :on-success="handlepicsuccess"
              :data="picidsData"
              :auto-upload="false"
              action="http://192.168.1.26:9090/erp/upload/uploadpic"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <el-dialog :visible.sync="picidsVisible">
              <img :src="picidsImageUrl" width="100%" alt="">
            </el-dialog>
          </el-form-item >
          <el-form-item :label="$t('Product.detailpicid')" style="width: 100%;margin-top: 1%">
            <el-button style="margin-bottom: 10px" size="small" type="success" @click="detailpicsubmitUpload">{{ $t('public.uploadimage') }}</el-button>
            <el-upload
              ref="detailpicupload"
              :on-preview="handledetailpicPreview"
              :on-remove="handledetailpicRemove"
              :on-success="handledetailpicsuccess"
              :data="detailpicData"
              :auto-upload="false"
              action="http://192.168.1.26:9090/erp/upload/uploadpic"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <el-dialog :visible.sync="detailpicVisible">
              <img :src="detailpicImageUrl" width="100%" alt="">
            </el-dialog>
          </el-form-item >
        </el-form>
      </div>
      <!--操作-->
      <div class="buttons" style="margin-top: 20px">
        <el-button type="primary" @click="handlesave()">保存</el-button>
        <el-button type="success" @click="handleentry()">继续录入</el-button>
        <el-button type="danger" @click="handlecancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createnewproduct, searchEmpCategory2, searchMea } from '@/api/Product'
import MyEmp from './components/MyEmp'
import MySupplier from './components/MySupplier'
import MyTree from './components/MyTree'
export default {
  name: 'NewProduct',
  components: { MyTree, MySupplier, MyEmp },
  data() {
    return {
      // 控制物品分类
      treecontrol: false,
      // 物品分类回显
      categoryid: '',
      // 计量单位数据
      measurements: [],
      // 供货商弹窗控制
      empcontrol: false,
      // 商品图片数据+++++++++++++++++++++++++开始
      // 商品图片控制器
      picidsVisible: false,
      // 商品图片地址
      picidsImageUrl: '',
      // 发送后端type
      picidsData: {
        type: 2
      },
      // 商品图片数据+++++++++++++++++++++++++结束
      // 详情图片数据++++++++++++++++++++++++++++++++开始
      detailpicVisible: false,
      // 详情图片地址
      detailpicImageUrl: '',
      // 发送后端type
      detailpicData: {
        type: 7
      },
      // 详情图片数据++++++++++++++++++++++++++++++++结束
      // 物品分类数据
      categorys: [],
      // 规格型号数据
      types: [],
      // 档次级别
      levels: [],
      // 供应商回显
      supplierid: '',
      // 物品信息数据
      personalForm: {
        code: '',
        barcode: '',
        productname: '',
        typeid: '',
        categoryid: '',
        color: '',
        brand: '',
        kpigrade: '',
        point: '',
        zhibaoqi: '',
        weight: '',
        volume: '',
        costprice: '',
        tradeprice: '',
        saleprice: '',
        purchaseprice: '',
        lowerprice: '',
        createid: '',
        level: '',
        purchasemeasurement: '',
        salemeasurement: '',
        stockmeasurement: '',
        producemeasurement: '',
        source: '',
        valuation: '',
        isactive: '',
        picids: [],
        detailpicid: [],
        memberprice: ''
      },
      // 物品信息规则数据
      personalrules: {
        code: [
          { required: true, message: '请输入物料编码', trigger: 'blur' }
        ],
        productname: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        valuation: [
          { required: true, message: '请选择计价方式', trigger: 'change' }
        ],
        costprice: [
          { required: true, message: '请输入成本价', trigger: 'blur' }
        ],
        saleprice: [
          { required: true, message: '请输入零售价', trigger: 'blur' }
        ],
        purchaseprice: [
          { required: true, message: '请输入采购价', trigger: 'blur' }
        ],
        isBatch: [
          { required: true, message: '请选择批次设置', trigger: 'change' }
        ],
        effectiveDay: [
          { required: true, message: '请输入有效天数', trigger: 'blur' }
        ],
        purchasemeasurement: [
          { required: true, message: '请选择批次设置', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getcategorys()
  },
  methods: {
    getcategorys() {
      // 物品分类数据
      searchEmpCategory2(1).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.categorys = res.data.data.content.list
        }
      })
      // 规格型号数据
      searchEmpCategory2(2).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        }
      })
      // 档次级别
      searchEmpCategory2(3).then(res => {
        if (res.data.ret === 200) {
          this.levels = res.data.data.content.list
        }
      })
      // 计量单位
      searchMea().then(res => {
        if (res.data.ret === 200) {
          this.measurements = res.data.data.content
        }
      })
    },
    // 商品图上传图片开始++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++开始
    submitUpload() {
      this.$refs.upload.submit()
    },
    handlepicRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlepicPreview(file) {
      this.picidsImageUrl = file.url
      this.picidsVisible = true
    },
    handlepicsuccess(response) {
      this.personalForm.picids.push(response.data.content.picId)
      console.log(response.data.content.picId)
    },
    // 商品图上传图片结束++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++结束
    // 详情图上传图片开始++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++开始
    detailpicsubmitUpload() {
      this.$refs.detailpicupload.submit()
    },
    handledetailpicRemove(file, fileList) {
      console.log(file, fileList)
    },
    handledetailpicPreview(file) {
      this.picidsImageUrl = file.url
      this.picidsVisible = true
    },
    handledetailpicsuccess(response) {
      this.personalForm.detailpicid.push(response.data.content.picId)
      console.log(response.data.content.picId)
    },
    // 详情图上传图片结束++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++结束
    // 保存操作
    handlesave() {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.personalForm2.validate((valid) => {
            if (valid) {
              createnewproduct(this.personalForm).then(res => {
                console.log(res)
                if (res.data.ret === 200) {
                  this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success',
                    offset: 100
                  })
                  this.restAllForm()
                  this.$refs.personalForm.clearValidate()
                  this.$refs.personalForm.resetFields()
                  this.$refs.personalForm2.clearValidate()
                  this.$refs.personalForm2.resetFields()
                  this.$refs.detailpicupload.clearFiles()
                  this.$refs.upload.clearFiles()
                  this.$router.go(-1)
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: res.data.msg,
                    offset: 100
                  })
                }
              })
            } else {
              this.$notify.error({
                title: '错误',
                message: '信息未填完整',
                offset: 100
              })
              return false
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
            offset: 100
          })
          return false
        }
      })
    },
    // 清空记录
    restAllForm() {
      this.personalForm = {
        code: '',
        barcode: '',
        productname: '',
        typeid: '',
        categoryid: '',
        color: '',
        brand: '',
        kpigrade: '',
        point: '',
        zhibaoqi: '',
        weight: '',
        volume: '',
        costprice: '',
        tradeprice: '',
        saleprice: '',
        purchaseprice: '',
        lowerprice: '',
        supplierid: '',
        createid: '',
        level: '',
        purchasemeasurement: '',
        salemeasurement: '',
        stockmeasurement: '',
        producemeasurement: '',
        source: '',
        valuation: '',
        isactive: '',
        picids: [],
        detailpicid: [],
        memberprice: ''
      }
      this.supplierid = ''
    },
    // 继续录入
    handleentry() {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.$refs.personalForm2.validate((valid) => {
            if (valid) {
              createnewproduct(this.personalForm).then(res => {
                console.log(res)
                if (res.data.ret === 200) {
                  this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success',
                    offset: 100
                  })
                  const anchor = this.$refs.geren.offsetTop
                  console.log(anchor)
                  document.documentElement.scrollTop = anchor - 100
                  this.restAllForm()
                  this.$refs.personalForm.clearValidate()
                  this.$refs.personalForm.resetFields()
                  this.$refs.personalForm2.clearValidate()
                  this.$refs.personalForm2.resetFields()
                  this.$refs.detailpicupload.clearFiles()
                  this.$refs.upload.clearFiles()
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: res.data.msg,
                    offset: 100
                  })
                }
              })
            } else {
              this.$notify.error({
                title: '错误',
                message: '信息未填完整',
                offset: 100
              })
              const anchor2 = this.$refs.lianxi.offsetTop
              console.log(anchor2)
              document.documentElement.scrollTop = anchor2 - 100
              return false
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '信息未填完整',
            offset: 100
          })
          const anchor3 = this.$refs.lianxi.offsetTop
          console.log(anchor3)
          document.documentElement.scrollTop = anchor3 - 100
          return false
        }
      })
    },
    // 取消操作
    handlecancel() {
      this.$router.go(-1)
      const view = { path: '/Product/NewProduct', name: 'NewProduct', fullPath: '/Product/NewProduct', title: 'NewProduct' }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      })
    },
    // 供货商输入框focus事件触发
    handlechoose() {
      this.empcontrol = true
    },
    // 供货商列表返回数据
    personName(val) {
      console.log(val)
      this.supplierid = val.supplierName
      this.personalForm.supplierid = val.id
    },
    // focus更新
    updatecate() {
      this.getcategorys()
    },
    // 物品分类focus
    treechoose() {
      this.treecontrol = true
    },
    // 物品分类数据
    tree(val) {
      this.categoryid = val.categoryName
      this.personalForm.categoryid = val.id
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ERP-container{
    margin:0px 30px;
    .form-name{
      font-size: 18px;
      color: #373e4f;
      margin-bottom: -20px;
      margin-top: 30px;
    }
    .container{
      margin-top: 2%;
      border: 1px solid #eceff6;
    }
  }
</style>
