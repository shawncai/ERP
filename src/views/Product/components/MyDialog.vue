<template>
  <el-dialog :visible.sync="editVisible" :control="control" :editdata="editdata" :close-on-press-escape="false" :title="personalForm.code +$t('updates.xg')" width="1010px" class="edit" top="-10px" @close="$emit('update:control', false)">
    <!--基本信息-->
    <el-card class="box-card" style="margin-top: 63px" shadow="never">
      <h2 ref="geren" class="form-name" style="font-size: 16px;color: #606266;margin-top: -5px;">{{ $t('Hmodule.basicinfo') }}</h2>
      <div class="container" style="margin-top: 37px">
        <el-form ref="personalForm" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('Product.productname')" style="width: 100%;">
                <el-input v-model="personalForm.productName" style="margin-left: 18px;width: 200px" placeholder="请输入产品名称" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.categoryid')" style="width: 100%;">
                <el-input v-model="personalForm.category" style="margin-left: 18px;width: 200px" placeholder="" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.barcode')" style="width: 100%;">
                <el-input v-model="personalForm.barCode" style="margin-left: 18px;width: 200px" placeholder="" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.typeid')" style="width: 100%;">
                <el-input v-model="personalForm.productType" style="margin-left: 18px;width: 200px" placeholder="" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.disposeId')" style="width: 100%;">
                <el-input v-model="personalForm.dispose" style="margin-left: 18px;width: 200px" placeholder="" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.versionId')" style="width: 100%;">
                <el-input v-model="personalForm.version" style="margin-left: 18px;width: 200px" placeholder="" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.color')" style="width: 100%;">
                <el-input v-model="personalForm.color" style="margin-left: 18px;width: 200px" placeholder="" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.diameterId')" style="width: 100%;">
                <el-input v-model="personalForm.diameter" style="margin-left: 18px;width: 200px" placeholder="" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.brand')" style="width: 100%;">
                <el-input v-model="personalForm.brand" style="margin-left: 18px;width: 200px" placeholder="" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.level')" style="width: 100%;">
                <el-select v-model="personalForm.level" placeholder="请选择档次级别" style="margin-left: 18px;width: 200px" @focus="updatecate">
                  <el-option
                    v-for="(item, index) in levels"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.lengthLevelId')" style="width: 100%;">
                <el-input v-model="personalForm.lengthLevel" style="margin-left: 18px;width: 200px" placeholder="" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.faceId')" style="width: 100%;">
                <el-input v-model="personalForm.face" style="margin-left: 18px;width: 200px" placeholder="" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.performanceLevelId')" style="width: 100%;">
                <el-input v-model="personalForm.performanceLevel" style="margin-left: 18px;width: 200px" placeholder="" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.purchasemeasurement')" prop="purchaseMeasurement" style="width: 100%;">
                <el-select v-model="personalForm.purchaseMeasurement" placeholder="请选择基本计量单位" style="margin-left: 18px;width: 200px" @change="clearunitGroupId">
                  <el-option
                    v-for="(item, index) in measurements"
                    :key="index"
                    :label="item.categoryName"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.unitGroupId')" style="width: 100%;">
                <el-select v-model="personalForm.unitGroupId" placeholder="请选择计量单位组" style="margin-left: 18px;width: 200px" @change="clearunit">
                  <el-option
                    v-for="(item, index) in unitGroupIds"
                    :key="index"
                    :label="item.groupName"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item ref="sure" :label="$t('Product.caigoumeasurement')" prop="caigoumeasurement" style="width: 100%;">
                <el-select v-model="personalForm.caigoumeasurement" :disabled="con" placeholder="请选择采购计量单位" style="margin-left: 18px;width: 200px" @change="$forceUpdate()">
                  <el-option
                    v-for="(item, index) in measurements2"
                    :key="index"
                    :label="item.unit"
                    :value="item.unitId"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.salemeasurement')" prop="salemeasurement" style="width: 100%;">
                <el-select v-model="personalForm.salemeasurement" :disabled="con" placeholder="请选择销售计量单位" style="margin-left: 18px;width: 200px" @change="$forceUpdate()">
                  <el-option
                    v-for="(item, index) in measurements2"
                    :key="index"
                    :label="item.unit"
                    :value="item.unitId"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.stockmeasurement')" prop="stockmeasurement" style="width: 100%;">
                <el-select v-model="personalForm.stockmeasurement" :disabled="con" placeholder="请选择库存计量单位" style="margin-left: 18px;width: 200px" @change="$forceUpdate()">
                  <el-option
                    v-for="(item, index) in measurements2"
                    :key="index"
                    :label="item.unit"
                    :value="item.unitId"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.producemeasurement')" prop="producemeasurement" style="width: 100%;">
                <el-select v-model="personalForm.producemeasurement" :disabled="con" placeholder="请选择生产计量单位" style="margin-left: 18px;width: 200px" @change="$forceUpdate()">
                  <el-option
                    v-for="(item, index) in measurements2"
                    :key="index"
                    :label="item.unit"
                    :value="item.unitId"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.source')" style="width: 100%;">
                <el-select v-model="personalForm.source" placeholder="请选择来源" style="margin-left: 18px;width: 200px" @change="choosesource">
                  <el-option value="2" label="生产"/>
                  <el-option value="3" label="采购"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.kpigrade')" prop="kpigrade" style="width: 100%;">
                <el-input v-model="personalForm.kpiGrade" placeholder="请输入绩效分" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.point')" style="width: 100%;">
                <el-input v-model="personalForm.point" placeholder="请输入商品积分" style="margin-left: 18px;width: 200px" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 58px;">
              <el-form-item :label="$t('Product.zhibaoqi')" style="width: 100%">
                <el-input v-model="personalForm.zhiBaoQi" placeholder="请输入质保期" style="margin-left: 18px;width: 200px" clearable>
                  <template slot="append">{{ $t('updates.day') }}</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 58px;">
              <el-form-item :label="$t('Product.weight')" style="width: 100%">
                <el-input v-model="personalForm.weight" placeholder="请输入重量" style="margin-left: 18px;width: 200px" clearable>
                  <template slot="append">KG</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height: 58px;">
              <el-form-item :label="$t('Product.volume')" style="width: 100%">
                <el-input v-model="personalForm.volume" placeholder="请输入体积" style="margin-left: 18px;width: 200px" clearable>
                  <template slot="append">m³</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.stockCircle')" style="width: 100%;">
                <el-input v-model="personalForm.stockCircle" placeholder="请输采购周期（天）" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.produceAbility')" style="width: 100%;">
                <el-input v-model="personalForm.produceAbility" placeholder="请输入生产能力" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.careCircle')" style="width: 100%;">
                <el-input v-model="personalForm.careCircle" placeholder="请输入保养周期" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.workCenterId')" style="width: 100%;">
                <el-input v-model="workCenterId" :disabled="Iscenter" placeholder="请选择工作中心" clearable style="margin-left: 18px;width: 200px" @focus="workcenterchoose"/>
                <my-center :control.sync="centercontrol" @center="center"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.effectiveDay')" style="width: 100%;">
                <el-input v-model="personalForm.effectiveDay" placeholder="请输入有效天数" clearable style="margin-left: 18px;width: 200px"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.isBatch')" prop="isBatch" style="width: 100%;">
                <el-radio-group v-model="personalForm.isBatch" style="margin-left: 18px;width: 200px">
                  <el-radio :label="1" style="width: 100px">启用</el-radio>
                  <el-radio :label="2">不启用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('Product.isactive')" style="width: 100%;">
                <el-radio-group v-model="personalForm.isActive" style="margin-left: 18px;width: 200px">
                  <el-radio :label="1" style="width: 100px">YES</el-radio>
                  <el-radio :label="2">NO</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <!--价格信息-->
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 ref="lianxi" class="form-name">价格信息</h2>
      <div class="container">
        <el-form ref="personalForm2" :model="personalForm" :rules="personalrules" :inline="true" status-icon class="demo-ruleForm" label-width="140px">
          <el-col :span="12">
            <el-form-item :label="$t('Product.valuation')" prop="valuation" style="width: 100%;">
              <el-select v-model="personalForm.valuation" :placeholder="$t('updates.qxz')" style="margin-left: 18px;width: 200px">
                <el-option value="1" label="约当产量法"/>
                <el-option value="2" label="定额成本法"/>
                <el-option value="3" label="定额比例法"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('Product.costprice')" style="width: 100%;">
              <el-input v-model="personalForm.costPrice" placeholder="请输入成本价" style="margin-left: 18px;width: 200px" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('Product.tradeprice')" style="width: 100%;">
              <el-input v-model="personalForm.tradePrice" placeholder="请输入批发价" style="margin-left: 18px;width: 200px" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('Product.saleprice')" prop="saleprice" style="width: 100%;">
              <el-input v-model="personalForm.salePrice" placeholder="请输入零售价" style="margin-left: 18px;width: 200px" clearable/>
            </el-form-item>
          </el-col>
          <!--<el-form-item :label="$t('Product.purchaseprice')" prop="purchaseprice" style="width: 40%;margin-top:1%">-->
          <!--<el-input v-model="personalForm.purchaseprice" placeholder="请输入采购价" clearable/>-->
          <!--</el-form-item>-->
          <el-col :span="12">
            <el-form-item :label="$t('Product.lowerprice')" style="width: 100%;">
              <el-input v-model="personalForm.lowerPrice" placeholder="请输入最低价" style="margin-left: 18px;width: 200px" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('Product.memberprice')" style="width: 100%;">
              <el-input v-model="personalForm.memberPrice" placeholder="请输入会员价" style="margin-left: 18px;width: 200px" clearable/>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
    <!--图片信息-->
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <h2 class="form-name">图片信息</h2>
      <div class="container">
        <el-form :model="personalForm" :inline="true" status-icon class="demo-ruleForm" label-width="130px">
          <el-form-item :label="$t('Product.picids')" style="width: 100%;margin-top: 1%">
            <el-button style="margin-bottom: 10px" size="small" type="success" @click="submitUpload">{{ $t('public.uploadimage') }}</el-button>
            <el-upload
              ref="upload"
              :on-preview="handlepicPreview"
              :on-remove="handlepicRemove"
              :on-success="handlepicsuccess"
              :data="picidsData"
              :auto-upload="false"
              :action="`${$upload}/erp/upload/uploadpic`"
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
              :action="`${$upload}/erp/upload/uploadpic`"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <el-dialog :visible.sync="detailpicVisible">
              <img :src="detailpicImageUrl" width="100%" alt="">
            </el-dialog>
          </el-form-item >
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="position: fixed;width: 1010px;z-index: 100;height: 74px;bottom: 0;" shadow="never">
      <div class="buttons" style="float: right;padding-bottom: 10px">
        <el-button @click="handlecancel()">{{ $t('Hmodule.cancel') }}</el-button>
        <el-button type="primary" @click="handleEditok()">{{ $t('Hmodule.baoc') }}</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { searchUnitGroup } from '@/api/UnitGroup'
import { searchEmpCategory2, editproduct, searchMea } from '@/api/Product'
import MyEmp from './MyEmp'
import MySupplier from './MySupplier'
import MyTree from './MyTree'
import MyCenter from './MyCenter'
var _that
export default {
  components: { MyCenter, MyTree, MySupplier, MyEmp },
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
    const validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === null) {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (this.personalForm.salemeasurement === null || this.personalForm.salemeasurement === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      console.log(value)
      if (this.personalForm.caigoumeasurement === null || this.personalForm.caigoumeasurement === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatePass4 = (rule, value, callback) => {
      console.log(value)
      if (this.personalForm.stockmeasurement === null || this.personalForm.stockmeasurement === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    const validatePass5 = (rule, value, callback) => {
      console.log(value)
      if (this.personalForm.producemeasurement === null || this.personalForm.producemeasurement === '') {
        callback(new Error('请选择'))
      } else {
        callback()
      }
    }
    return {
      unitGroupIds: [],
      // 计量单位数据
      measurements: [],
      // 弹窗组件的控制
      editVisible: this.control,
      // 物品信息数据
      personalForm: this.editdata,
      // 控制工作中心是否可输入
      Iscenter: true,
      // 工作中心回显
      workCenterId: '',
      // 控制工作中心
      centercontrol: false,
      // 车辆型号回显
      typeid: '',
      // 配置回显
      disposeId: '',
      // 版本回显
      versionId: '',
      measurements2: [],
      // 颜色回显
      colorId: '',
      // 直径回显
      diameterId: '',
      // 长度回显
      lengthLevelId: '',
      // 表面处理回显
      faceId: '',
      // 性能等级回显
      performanceLevelId: '',
      // 控制编码
      carOrOther: '',
      // 控制物品分类
      treecontrol: false,
      // 物品分类回显
      categoryid: '',
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
      // 配置数据
      disposes: [],
      // 版本数据
      versions: [],
      // 颜色数据
      colors: [],
      // 品牌数据
      brands: [],
      // 直径规格数据
      diameters: [],
      con: true,
      // 长度等级数据
      lengthLevels: [],
      // 表面处理数据
      faces: [],
      // 性能等级数据
      performanceLevels: [],
      // 规格型号数据
      types: [],
      // 档次级别
      levels: [],
      // 供应商回显
      supplierid: '',
      // 物品信息规则数据
      personalrules: {
        salemeasurement: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        caigoumeasurement: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        stockmeasurement: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        producemeasurement: [
          { required: true, validator: validatePass5, trigger: 'change' }
        ],
        productname: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        valuation: [
          { required: true, message: '请选择计价方式', trigger: 'change' }
        ],
        stockCircle: [
          { required: true, message: '请输入采购周期', trigger: 'blur' }
        ],
        disposeId: [
        ],
        categoryid: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        versionId: [
          { message: '请选择版本', trigger: 'change' }
        ],
        colorId: [
        ],
        diameterId: [
        ],
        lengthLevelId: [
        ],
        faceId: [
        ],
        performanceLevelId: [
        ],
        typeid: [
        ],
        costprice: [
          { required: true, message: '请输入成本价', trigger: 'blur' }
        ],
        saleprice: [
          { required: true, message: '请输入零售价', trigger: 'blur' }
        ],
        isBatch: [
          { required: true, message: '请选择批次设置', trigger: 'change' }
        ],
        effectiveDay: [
          { required: true, message: '请输入有效天数', trigger: 'blur' }
        ],
        purchaseMeasurement: [
          { required: true, message: '请选择基本计量单位', trigger: 'change' }
        ]
      },
      getemplist2: {
        pagenum: 1,
        pagesize: 999
      }
    }
  },
  watch: {
    control() {
      this.editVisible = this.control
    },
    editdata() {
      this.personalForm = this.editdata
      console.log(this.personalForm)
      this.buyerId = this.editdata.buyerName
      console.log(this.editdata)
      this.getcategorys()
      this.choosesource()
      this.checkunitGroupIds2()
      this.personalForm.producemeasurement = this.personalForm.produceMeasurement
      this.personalForm.caigoumeasurement = this.personalForm.caigouMeasurement
      this.personalForm.salemeasurement = this.personalForm.saleMeasurement
      this.personalForm.stockmeasurement = this.personalForm.stockMeasurement
      console.log('111', this.personalForm.stockmeasurement)
      console.log('222', this.personalForm.unitGroupId)
      if (this.personalForm.unitGroupId === null) {
        this.con = true
      } else {
        this.con = false
      }
    }
  },
  created() {
    this.getcategorys()
  },
  methods: {
    // updateunit() {
    //   this.getcategorys()
    //   if (this.personalForm.unitGroupId === null || this.personalForm.unitGroupId === '' || this.personalForm.unitGroupId === undefined) {
    //     this.$notify.error({
    //       title: '错误',
    //       message: '请先选择基本计量单位组',
    //       offset: 100
    //     })
    //   } else {
    //     const nowlistdata = this.unitGroupIds
    //     console.log('this.unitGroupIds', this.unitGroupIds)
    //     console.log('this.personalForm.unitGroupId', this.personalForm.unitGroupId)
    //     for (let j = 0; j < nowlistdata.length; j++) {
    //       if (nowlistdata[j].id === this.personalForm.unitGroupId) {
    //         this.measurements2 = nowlistdata[j].unitGroupDetailVos
    //       }
    //     }
    //   }
    // },
    clearunitGroupId() {
      this.con = true
      this.personalForm.unitGroupId = ''
      this.measurements2 = this.measurements
      for (let i = 0; i < this.measurements2.length; i++) {
        this.measurements2[i].unitId = this.measurements2[i].id
        this.measurements2[i].unit = this.measurements2[i].categoryName
      }
      console.log(this.measurements2)
      searchUnitGroup(this.getemplist2).then(res => {
        if (res.data.ret === 200) {
          console.log('res', res)
          this.unitGroupIds = res.data.data.content.list
        } else {
          console.log('列表出错')
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      this.personalForm.salemeasurement = this.personalForm.purchaseMeasurement
      this.personalForm.stockmeasurement = this.personalForm.purchaseMeasurement
      this.personalForm.producemeasurement = this.personalForm.purchaseMeasurement
      this.personalForm.caigoumeasurement = this.personalForm.purchaseMeasurement
      this.getemplist2.basicUnitId = this.personalForm.purchaseMeasurement
    },
    clearunit() {
      this.con = false
      this.personalForm.salemeasurement = ''
      this.personalForm.stockmeasurement = ''
      this.personalForm.producemeasurement = ''
      this.personalForm.caigoumeasurement = ''
      const nowlistdata = this.unitGroupIds
      console.log('this.unitGroupIds', this.unitGroupIds)
      console.log('this.personalForm.unitGroupId', this.personalForm.unitGroupId)
      for (let j = 0; j < nowlistdata.length; j++) {
        if (nowlistdata[j].id === this.personalForm.unitGroupId) {
          this.measurements2 = nowlistdata[j].unitGroupDetailVos
        }
      }
    },
    checkunitGroupIds2() {
      if (this.personalForm.purchaseMeasurement !== null || this.personalForm.purchaseMeasurement !== '' || this.personalForm.purchaseMeasurement !== undefined) {
        this.getemplist2.basicUnitId = this.personalForm.purchaseMeasurement
        searchUnitGroup(this.getemplist2).then(res => {
          if (res.data.ret === 200) {
            this.unitGroupIds = res.data.data.content.list
            console.log('this.personalForm.unitGroupId', this.personalForm.unitGroupId)
            console.log('222222222222')
            if (this.personalForm.unitGroupId !== null && this.personalForm.unitGroupId !== '' && this.personalForm.unitGroupId !== undefined) {
              console.log('33333334')
              const nowlistdata = this.unitGroupIds
              console.log('this.unitGroupIds', this.unitGroupIds)
              console.log('this.personalForm.unitGroupId', this.personalForm.unitGroupId)
              for (let j = 0; j < nowlistdata.length; j++) {
                if (nowlistdata[j].id === this.personalForm.unitGroupId) {
                  this.measurements2 = nowlistdata[j].unitGroupDetailVos
                  console.log('this.measurements2222', this.measurements2)
                }
              }
            } else {
              console.log('3333333')
              for (let i = 0; i < this.measurements.length; i++) {
                this.measurements[i].unitId = this.measurements[i].id
                this.measurements[i].unit = this.measurements[i].categoryName
              }
              this.measurements2 = this.measurements
              console.log('this.measurements2', this.measurements2)
            }
          } else {
            console.log('列表出错')
          }
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 100)
        })
      }
    },
    checkunitGroupIds() {
      if (this.personalForm.purchaseMeasurement === null || this.personalForm.purchaseMeasurement === '' || this.personalForm.purchaseMeasurement === undefined) {
        this.$notify.error({
          title: '错误',
          message: '请先选择基本计量单位',
          offset: 100
        })
      } else {
        this.getemplist2.basicUnitId = this.personalForm.purchaseMeasurement
        searchUnitGroup(this.getemplist2).then(res => {
          if (res.data.ret === 200) {
            console.log('res', res)
            this.unitGroupIds = res.data.data.content.list
          } else {
            console.log('列表出错')
          }
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 100)
        })
      }
    },
    choosesource(val) {
      if (val === '3' || val === '') {
        this.Iscenter = true
      } else if (val === '2') {
        this.Iscenter = false
      }
    },
    // 工作中心focus事件
    workcenterchoose() {
      this.centercontrol = true
    },
    center(val) {
      console.log(val)
      this.workCenterId = val.workCenterName
      this.personalForm.workCenterId = val.id
    },
    'personalForm.disposeId'(val) {
      this.$nextTick(() => {
        console.log(val)
        if (val !== 34) {
          this.$refs.personalForm.validateField('versionId')
          this.personalForm.versionId = ''// 政府机构级别,
        }
      })
    },
    // 'personalForm.categoryid'(val) {
    //   this.$nextTick(() => {
    //     console.log(val)
    //     if (val !== 1) {
    //       this.$refs.personalForm.validateField('typeid')
    //       this.personalForm.typeid = ''// 政府机构级别,
    //     }
    //   })
    // },
    // 表面处理change事件
    performanceLevel(val) {
      this.personalForm.performanceLevelId = val.id
      this.personalForm.performanceLevelCode = val.code
    },
    // 表面处理change事件
    face(val) {
      this.personalForm.faceId = val.id
      this.personalForm.faceCode = val.code
    },
    // 颜色change事件
    color(val) {
      this.personalForm.colorId = val.id
      this.personalForm.colorCode = val.code
    },
    // 长度等级change事件
    length(val) {
      this.personalForm.lengthLevelId = val.id
      this.personalForm.lengthCode = val.code
    },
    // 直径规格change事件
    diameter(val) {
      this.personalForm.diameterId = val.id
      this.personalForm.diameterCode = val.code
    },
    // 版本change事件
    version(val) {
      this.personalForm.versionId = val.id
      this.personalForm.versionCode = val.code
    },
    // 车辆型号change事件
    type(val) {
      this.personalForm.typeid = val.id
      this.personalForm.typeCode = val.code
      console.log(this.$refs.personalForm)
    },
    // 配置下拉框change事件
    dispose(val) {
      console.log(val)
      this.disposeId = val.categoryName
      this.personalForm.disposeId = val.id
      this.personalForm.disposeCode = val.code
      console.log(this.personalForm.disposeId)
    },
    getcategorys() {
      // 物品品牌数据
      searchEmpCategory2(1).then(res => {
        console.log(res)
        if (res.data.ret === 200) {
          this.brands = res.data.data.content.list
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
      // 物品颜色
      searchEmpCategory2(4).then(res => {
        if (res.data.ret === 200) {
          this.colors = res.data.data.content.list
        }
      })
      // 物品配置
      searchEmpCategory2(5).then(res => {
        if (res.data.ret === 200) {
          this.disposes = res.data.data.content.list
        }
      })
      // 物品版本
      searchEmpCategory2(6).then(res => {
        if (res.data.ret === 200) {
          this.versions = res.data.data.content.list
        }
      })
      // 直径规格
      searchEmpCategory2(7).then(res => {
        if (res.data.ret === 200) {
          this.diameters = res.data.data.content.list
        }
      })
      // 直径规格
      searchEmpCategory2(8).then(res => {
        if (res.data.ret === 200) {
          this.lengthLevels = res.data.data.content.list
        }
      })
      // 表面处理
      searchEmpCategory2(9).then(res => {
        if (res.data.ret === 200) {
          this.faces = res.data.data.content.list
        }
      })
      // 性能等级
      searchEmpCategory2(10).then(res => {
        if (res.data.ret === 200) {
          this.performanceLevels = res.data.data.content.list
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
      this.personalForm.categoryCode = val.code
    },
    finder(val) {
      const Id = this.recursion(val)
      console.log(val)
      if (Id.code === '01') {
        this.personalForm.categoryCode = '01' + val.data.code
      } else if (Id.code === '02') {
        if (val.level === 2) {
          this.personalForm.categoryCode = '02' + val.data.code + '00' + '00'
        } else if (val.level === 3) {
          console.log(val)
          this.personalForm.categoryCode = '02' + val.parent.data.code + val.data.code + '00'
        } else if (val.level === 4) {
          this.personalForm.categoryCode = '02' + val.parent.parent.data.code + val.parent.data.code + val.data.code
        }
      } else if (Id.code === '03') {
        if (val.level === 3) {
          this.personalForm.categoryCode = '03' + val.parent.data.code + val.data.code
        }
      }
      console.log(this.personalForm.categoryCode)
      this.personalForm.categoryid = Id.id
    },
    // 递归函数
    recursion(val) {
      if (val.level === 1) {
        return val.data
      } else {
        return this.recursion(val.parent)
      }
    },
    // 修改和取消按钮
    // 修改按钮
    handleEditok() {
      console.log('this', this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
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
        purchaseMeasurement: '',
        purchasemeasurement: '',
        caigoumeasurement: '',
        salemeasurement: '',
        stockmeasurement: '',
        producemeasurement: '',
        source: '',
        valuation: '',
        isActive: '',
        picids: [],
        detailpicid: [],
        memberprice: ''
      }
      this.supplierid = ''
      this.measurements2 = []
      this.measurements = []
    }
    // 修改操作结束 -------------------------------------------------
  }
}
</script>

<style scoped>
  .container >>> .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-left: -10px;
  }
  .container >>> .el-form-item__label{
    text-align: left;
  }
  .container >>> .el-form-item__label{
    color: #60626696;
  }
  .edit >>> .el-dialog {
    background:#f1f1f1 ;
    left: 0;
  }
  .el-col-12{
    width: 49%;
  }
</style>
