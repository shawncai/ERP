<template>
  <el-dialog :visible.sync="editVisible" :control="control" :editdata="editdata" :close-on-press-escape="false" top="10px" title="修改供应商" @close="$emit('update:control', false)">
    <!--基本信息-->
    <h2 ref="geren" class="form-name">基本信息</h2>
    <div class="container">
      <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-position="top" label-width="300px" style="margin-left: 30px;">
        <el-form-item :label="$t('Product.code')" prop="code" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.code" placeholder="请输入物料编码" disabled/>
        </el-form-item>
        <el-form-item :label="$t('Product.productname')" prop="productname" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.productName" placeholder="请输入产品名称" disabled/>
        </el-form-item>
        <el-form-item :label="$t('Product.barcode')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.barCode" placeholder="请输入条码" disabled/>
        </el-form-item>
        <el-form-item :label="$t('Product.categoryid')" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.categoryId" placeholder="请选择物品分类" style="width: 100%;" disabled>
            <el-option
              v-for="(item, index) in categorys"
              :key="index"
              :label="item.categoryName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Product.typeid')" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.typeId" placeholder="请选择规格型号" style="width: 100%;" disabled>
            <el-option
              v-for="(item, index) in types"
              :key="index"
              :label="item.categoryName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Product.purchasemeasurement')" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.purchaseMeasurement" placeholder="请选择采购计量单位" style="width: 100%;">
            <el-option value="1" label="类1"/>
            <el-option value="2" label="类2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Product.salemeasurement')" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.saleMeasurement" placeholder="请选择销售计量单位" style="width: 100%;">
            <el-option value="1" label="类1"/>
            <el-option value="2" label="类2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Product.stockmeasurement')" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.stockMeasurement" placeholder="请选择库存计量单位" style="width: 100%;">
            <el-option value="1" label="类1"/>
            <el-option value="2" label="类2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Product.producemeasurement')" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.produceMeasurement" placeholder="请选择生产计量单位" style="width: 100%;">
            <el-option value="1" label="类1"/>
            <el-option value="2" label="类2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Product.color')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.color" placeholder="请输入颜色" disabled/>
        </el-form-item>
        <el-form-item :label="$t('Product.brand')" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.brand" placeholder="请选择品牌" style="width: 100%;" disabled>
            <el-option value="1" label="类1"/>
            <el-option value="2" label="类2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Product.level')" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.level" placeholder="请选择档次级别" style="width: 100%;">
            <el-option
              v-for="(item, index) in levels"
              :key="index"
              :label="item.categoryName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Product.supplierid')" style="width: 40%;margin-top:1%">
          <el-input v-model="supplierid" placeholder="请选择供应商" @focus="handlechoose"/>
        </el-form-item>
        <my-emp :control.sync="empcontrol" @personName="personName"/>
        <el-form-item :label="$t('Product.source')" style="width: 40%;margin-top:1%">
          <el-select v-model="personalForm.source" placeholder="请选择来源" style="width: 100%;">
            <el-option value="1" label="类1"/>
            <el-option value="2" label="类2"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Product.kpigrade')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.kpiGrade" placeholder="请输入绩效分" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Product.point')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.point" placeholder="请输入商品积分" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Product.zhibaoqi')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.zhiBaoQi" placeholder="请输入质保期" clearable>
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
          <el-radio-group v-model="personalForm.isActive" style="width: 80%">
            <el-radio :label="1" style="width: 50%">YES</el-radio>
            <el-radio :label="2">NO</el-radio>
          </el-radio-group>
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
          <el-input v-model="personalForm.costPrice" placeholder="请输入成本价" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Product.tradeprice')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.tradePrice" placeholder="请输入批发价" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Product.saleprice')" prop="saleprice" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.salePrice" placeholder="请输入零售价" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Product.purchaseprice')" prop="purchaseprice" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.purchasePrice" placeholder="请输入采购价" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Product.lowerprice')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.lowerPrice" placeholder="请输入最低价" clearable/>
        </el-form-item>
        <el-form-item :label="$t('Product.memberprice')" style="width: 40%;margin-top:1%">
          <el-input v-model="personalForm.memberPrice" placeholder="请输入会员价" clearable/>
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
        <el-form-item style="width: 100%;margin-top: 1%">
          <el-col v-for="(item, index) in personalForm.picPaths" :span="8" :key="index" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px', height: '184px' }">
              <img :src="item" class="image" style="width: 100%">
            </el-card>
          </el-col>
        </el-form-item>
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
        <el-form-item style="width: 100%;margin-top: 1%">
          <el-col v-for="(item, index) in personalForm.detailPicPaths" :span="8" :key="index" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px', height: '184px' }">
              <img :src="item" class="image" style="width: 100%">
            </el-card>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="buttons" style="margin-top: 20px;margin-left: 30px">
      <el-button type="primary" @click="handleEditok()">修改</el-button>
      <el-button type="danger" @click="handlecancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { searchEmpCategory2, editproduct } from '@/api/Product'
import MyEmp from './MyEmp'
export default {
  components: { MyEmp },
  props: {
    control: {
      type: Boolean,
      default: false
    },
    editdata: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 弹窗组件的控制
      editVisible: this.control,
      // 物品信息数据
      personalForm: this.editdata,
      // 修改商品图片存放
      picids: [],
      // 修改商品详情存放
      detailpicid: [],
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
      // 物品信息规则数据
      personalrules: {
        code: [
          { required: true, message: '请输入物料编码', trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        valuation: [
          { required: true, message: '请选择计价方式', trigger: 'change' }
        ],
        costPrice: [
          { required: true, message: '请输入成本价', trigger: 'blur' }
        ],
        salePrice: [
          { required: true, message: '请输入零售价', trigger: 'blur' }
        ],
        purchasePrice: [
          { required: true, message: '请输入采购价', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    control() {
      this.editVisible = this.control
    },
    editdata() {
      this.personalForm = this.editdata
      this.buyerId = this.editdata.buyerName
      console.log(this.editdata)
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
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 规格型号数据
      searchEmpCategory2(2).then(res => {
        if (res.data.ret === 200) {
          this.types = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
      // 档次级别
      searchEmpCategory2(3).then(res => {
        if (res.data.ret === 200) {
          this.levels = res.data.data.content.list
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
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
      this.picids.push(response.data.content.picId)
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
      this.detailpicid.push(response.data.content.picId)
      console.log(response.data.content.picId)
    },
    // 详情图上传图片结束++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++结束
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
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      this.personalForm.picids = this.picids
      this.personalForm.detailpicid = this.detailpicid
      console.log(this.personalForm)
      editproduct(this.personalForm).then(res => {
        if (res.data.ret === 200) {
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 1000,
            offset: 100
          })
          this.$emit('rest', true)
          this.restAllForm()
          this.$refs.personalForm.clearValidate()
          this.$refs.personalForm.resetFields()
          this.$refs.personalForm2.clearValidate()
          this.$refs.personalForm2.resetFields()
          this.$refs.detailpicupload.clearFiles()
          this.$refs.upload.clearFiles()
          this.editVisible = false
        } else {
          this.$notify.error({
            title: '错误',
            message: '出错了',
            offset: 100
          })
        }
      })
    },
    handlecancel() {
      this.restAllForm()
      this.$refs.personalForm.clearValidate()
      this.$refs.personalForm.resetFields()
      this.$refs.personalForm2.clearValidate()
      this.$refs.personalForm2.resetFields()
      this.$refs.detailpicupload.clearFiles()
      this.$refs.upload.clearFiles()
      this.editVisible = false
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
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>

</style>
