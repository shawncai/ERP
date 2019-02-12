<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input :placeholder="$t('products.productID')" v-model="listQuery.code" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('products.productname')" v-model="listQuery.mainTitle" style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.isActive" :placeholder="$t('products.state')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-permission="[35]" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>
    <el-tabs v-model="activeName" class="tap-container1">
      <el-tab-pane :label="$t('table2.all')" name="first">
        <div class="app-container">
          <el-table
            v-loading="listLoading"
            :key="tableKey"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('products.productID')" prop="code" align="center" min-width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('products.productname')" prop="mainTitle" min-width="150px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.mainTitle }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('products.price')" align="center" prop="salePrice" min-width="80px">
              <template slot-scope="scope">
                <span>{{ scope.row.salePrice }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('products.addedTime')" prop="createTime" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('products.inStock')" prop="quantity" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.quantity }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('products.dismountedTime')" align="center" prop="pulloffTime" min-width="100px">
              <template slot-scope="scope">
                <span>{{ scope.row.pulloffTime }}</span>
              </template>
            </el-table-column>
            <el-table-column v-permission="[36, 37]" :label="$t('table.actions')" align="center" min-width="300" class-name="small-padding fixed-width" fixed="right">
              <template slot-scope="scope">
                <el-button v-permission="[36]" v-if="scope.row.isActive!='1'" size="mini" style="width: 70px" type="success" @click="handleModifyStatus(scope.row,'2')">{{ $t('products.shelf') }}
                </el-button>
                <el-button v-permission="[36]" v-if="scope.row.isActive!='2'" size="mini" style="width: 70px" type="info" @click="handleModifyStatus(scope.row,'1')">{{ $t('products.Obtained') }}
                </el-button>
                <el-button v-permission="[36]" type="primary" size="mini" style="width: 70px" @click="handleUpdate(scope.row)">{{ $t('products.edit') }}</el-button>
                <el-button v-permission="[37]" v-if="scope.row.status!='view'" size="mini" style="width: 70px" type="warning" @click="handleView(scope.row)">{{ $t('products.view') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.pagenum" :limit.sync="listQuery.pagesize" @pagination="getList" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('products.outofstock')" name="second">
        <div class="app-container">
          <el-table
            v-loading="listLoading"
            :key="tableKey"
            :data="list2"
            height="547"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column :label="$t('products.productID')" prop="code" align="center" min-width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('products.productname')" prop="mainTitle" min-width="150px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.mainTitle }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('products.price')" align="center" prop="salePrice" min-width="80px">
              <template slot-scope="scope">
                <span>{{ scope.row.salePrice }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('products.addedTime')" prop="createTime" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('products.inStock')" prop="quantity" min-width="110px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.quantity }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('products.dismountedTime')" align="center" prop="pulloffTime" min-width="100px">
              <template slot-scope="scope">
                <span>{{ scope.row.pulloffTime }}</span>
              </template>
            </el-table-column>
            <el-table-column v-permission="[36, 37]" :label="$t('table.actions')" align="center" min-width="300" class-name="small-padding fixed-width" fixed="right">
              <template slot-scope="scope">
                <el-button v-permission="[36]" v-if="scope.row.isActive!='1'" size="mini" style="width: 74px" type="success" @click="handleModifyStatus(scope.row,'2')">{{ $t('products.shelf') }}
                </el-button>
                <el-button v-permission="[36]" v-if="scope.row.isActive!='2'" size="mini" style="width: 74px" type="info" @click="handleModifyStatus(scope.row,'1')">{{ $t('products.Obtained') }}
                </el-button>
                <el-button v-permission="[36]" type="primary" size="mini" style="width: 74px" @click="handleUpdate(scope.row)">{{ $t('products.edit') }}</el-button>
                <el-button v-permission="[37]" v-if="scope.row.status!='view'" size="mini" style="width: 74px" type="warning" @click="handleView(scope.row)">{{ $t('products.view') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total2>0" :total="total2" :page.sync="listQuery2.pagenum" :limit.sync="listQuery2.pagesize" @pagination="getList" />
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--添加表格开始-->
    <el-dialog :visible.sync="dialogFormVisible" title="add product" width="60%" center lock-scroll top="20px">
      <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm" style="width: 480px; margin-left:50px;">
        <el-form-item :label-width="formLabelWidth" :label="$t('table2.product-name')" prop="mainTitle">
          <el-input v-model="form.mainTitle"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table2.Vehicle-model')" prop="type">
          <el-input v-model="form.type"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.productcategories')" prop="productCategoryId">
          <el-select v-model="form.productCategoryId" placeholder="please choose" style="width:61%">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.categoryName"
              :value="item.id"/>
          </el-select>
          <el-button class="filter-item" type="primary" style="width:37%" @click="handleAddClassify">{{ $t('products.addcategories') }}</el-button>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.retailprice')" prop="salePrice">
          <el-input v-model="form.salePrice"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.batchprice')" prop="costPrice">
          <el-input v-model="form.costPrice"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.productcode')" prop="code">
          <el-input v-model="form.code"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.productbrand')" prop="brand">
          <el-input v-model="form.brand"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.productcolor')" prop="color">
          <el-input v-model="form.color"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.stockQty')" prop="quantity">
          <el-input v-model="form.quantity"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.barcode')" prop="barcode">
          <el-input v-model="form.barcode"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.performancescore')" prop="kpiGrade">
          <el-input v-model="form.kpiGrade"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.onlineor')">
          <el-radio v-model="form.isActive" label="1">{{ $t('products.online') }}</el-radio>
          <el-radio v-model="form.isActive" label="2">{{ $t('products.notonline') }}</el-radio>
        </el-form-item >
        <el-form-item :label-width="formLabelWidth" :label="$t('products.detailimage')" style="width: 750px">
          <el-button style="margin-left: 19px;margin-bottom: 10px" size="small" type="success" @click="submitUpload">{{ $t('products.uploadimage') }}</el-button>
          <el-upload
            ref="upload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handlesuccess"
            :data="upLoadData"
            :auto-upload="false"
            action="http://www.nwowapp.com:9090/pss/upload/uploadpic"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" width="100%" alt="">
          </el-dialog>
        </el-form-item >
        <el-form-item :label-width="formLabelWidth" :label="$t('products.productimage')" style="width: 750px">
          <el-button style="margin-left: 19px;margin-bottom: 10px" size="small" type="success" @click="submitUpload2">{{ $t('products.uploadproduct') }}</el-button>
          <el-upload
            ref="upload2"
            :on-preview="handlePictureCardPreview2"
            :on-remove="handleRemove2"
            :on-success="handlesuccess2"
            :data="productpic"
            :auto-upload="false"
            action="http://www.nwowapp.com:9090/pss/upload/uploadpic"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" width="100%" alt="">
          </el-dialog>
        </el-form-item >
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCreate('form')">{{ $t('products.cancel') }}</el-button>
        <el-button type="primary" @click="createData('form')">{{ $t('products.ok') }}</el-button>
      </div>
    </el-dialog>
    <!--添加表格结束-->
    <!--编辑表格-->
    <el-dialog :visible.sync="dialogFormVisible2" title="edit product" width="60%" center lock-scroll top="20px">
      <el-form ref="edit" :model="edit" :rules="rules" class="demo-ruleForm" style="width: 480px; margin-left:50px;">
        <el-form-item :label-width="formLabelWidth" :label="$t('table2.product-name')" prop="mainTitle">
          <el-input v-model="edit.mainTitle"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table2.Vehicle-model')" prop="type">
          <el-input v-model="edit.type"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.productcategories')" prop="productCategoryId">
          <el-select v-model="edit.productCategoryId" placeholder="please choose" style="width:61%">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.categoryName"
              :value="item.id"/>
          </el-select>
          <el-button class="filter-item" type="primary" style="width:37%" @click="handleAddClassify">{{ $t('products.addcategories') }}</el-button>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.retailprice')" prop="salePrice">
          <el-input v-model="edit.salePrice"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.batchprice')" prop="costPrice">
          <el-input v-model="edit.costPrice"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.productcode')" prop="code">
          <el-input v-model="edit.code"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.productbrand')" prop="brand">
          <el-input v-model="edit.brand"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.productcolor')" prop="color">
          <el-input v-model="edit.color"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.stockQty')" prop="quantity">
          <el-input v-model="edit.quantity"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.barcode')" prop="barcode">
          <el-input v-model="edit.barcode"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.performancescore')" prop="kpiGrade">
          <el-input v-model="edit.kpiGrade"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.onlineor')" prop="isActive">
          <el-radio-group v-model="edit.isActive">
            <el-radio :label="1">{{ $t('products.online') }}</el-radio>
            <el-radio :label="2">{{ $t('products.notonline') }}</el-radio>
          </el-radio-group>
        </el-form-item >
        <el-form-item :label-width="formLabelWidth" :label="$t('products.detailimage')" style="width: 750px">
          <el-button style="margin-left: 19px;margin-bottom: 10px" size="small" type="success" @click="submitUpload">{{ $t('products.uploadimage') }}</el-button>
          <el-upload
            ref="upload3"
            :on-preview="handlePictureCardPreview3"
            :on-remove="handleRemove3"
            :on-success="handlesuccess3"
            :data="upLoadData"
            :auto-upload="false"
            action="http://www.nwowapp.com:9090/pss/upload/uploadpic"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" width="100%" alt="">
          </el-dialog>
        </el-form-item >
        <el-form-item style="width: 100%">
          <el-col v-for="(item, index) in detail.detailPicPaths" :span="4" :key="index" style="margin: 9px;width: 110px;height: 170px">
            <el-card :body-style="{ padding: '0px' }">
              <el-popover
                placement="top"
                trigger="hover">
                <img :src="'http://'+item " width="800px" height="800px">
                <img slot="reference" :src="'http://' +item " width="500px" class="image" style="width: 100%">
              </el-popover>
            </el-card>
          </el-col>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.productimage')" style="width: 750px">
          <el-button style="margin-left: 19px;margin-bottom: 10px" size="small" type="success" @click="submitUpload2">{{ $t('products.uploadproduct') }}</el-button>
          <el-upload
            ref="upload4"
            :on-preview="handlePictureCardPreview4"
            :on-remove="handleRemove4"
            :on-success="handlesuccess4"
            :data="productpic"
            :auto-upload="false"
            action="http://www.nwowapp.com:9090/pss/upload/uploadpic"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" width="100%" alt="">
          </el-dialog>
        </el-form-item >
        <el-form-item style="width: 100%">
          <el-col v-for="(item, index) in detail.picPaths" :span="4" :key="index" style="margin: 9px;width: 110px;height: 170px">
            <el-card :body-style="{ padding: '0px' }">
              <el-popover
                placement="top"
                trigger="hover">
                <img :src="'http://'+ item" width="800px" height="800px">
                <img slot="reference" :src="'http://'+ item " width="500px" class="image" style="width: 100%">
              </el-popover>
            </el-card>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">{{ $t('products.cancel') }}</el-button>
        <el-button type="primary" @click="updateData('edit')">{{ $t('products.ok') }}</el-button>
      </div>
    </el-dialog>
    <!--编辑表格结束-->
    <el-dialog
      :visible.sync="centerDialogVisible"
      :model="detail"
      :title="$t('products.productdetail')"
      width="95%"
      center
      top="20px"
    >
      <panel-group :sale-t="detail.saleNum" :maintain-t="detail.maintainNum"/>
      <code>{{ $t('products.productinfo') }}</code>
      <el-row>
        <el-col :span="8"><el-card class="box-card"><div class="text item" style="float:left;padding-bottom: 20px">{{ $t('products.product-name') }}:</div><span class="lef" style="float:left;margin-left: 10px">{{ detail.mainTitle }}</span></el-card></el-col>
        <el-col :span="8"><el-card class="box-card"><div class="text item" style="float:left;padding-bottom: 20px">{{ $t('products.vehicle-model') }}:</div><span class="lef" style="float:left;margin-left: 10px">{{ detail.productType }}</span></el-card></el-col>
        <el-col :span="8"><el-card class="box-card"><div class="text item" style="float:left;padding-bottom: 20px">{{ $t('products.productcolor') }}:</div><span class="lef" style="float:left;margin-left: 10px">{{ detail.color }}</span></el-card></el-col>
        <el-col :span="8"><el-card class="box-card"><div class="text item" style="float:left;padding-bottom: 20px">{{ $t('products.price2') }}:</div><span class="lef" style="float:left;margin-left: 10px">{{ detail.salePrice }}</span></el-card></el-col>
        <el-col :span="8"><el-card class="box-card"><div class="text item" style="float:left;padding-bottom: 20px">{{ $t('products.stock2') }}:</div><span class="lef" style="float:left;margin-left: 10px">{{ detail.quantitys }}</span></el-card></el-col>
        <el-col :span="8"><el-card class="box-card"><div class="text item" style="float:left;padding-bottom: 20px">{{ $t('products.status2') }}:</div><span class="lef" style="float:left;margin-left: 10px">{{ detail.isActive }}</span></el-card></el-col>
        <el-col :span="8"><el-card class="box-card"><div class="text item" style="float:left;padding-bottom: 20px">{{ $t('products.addedTime') }}:</div><span class="lef" style="float:left;margin-left: 10px">{{ detail.pullofTime }}</span></el-card></el-col>
        <el-col :span="8"><el-card class="box-card"><div class="text item" style="float:left;padding-bottom: 20px">{{ $t('products.handler') }}:</div><span class="lef" style="float:left;margin-left: 10px">{{ detail.createrName }}</span></el-card></el-col>
      </el-row>
      <el-row>
        <el-col v-for="(item, index) in detail.picPaths" :span="6" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <span>{{ $t('products.productimage') }}</span>
            </div>
            <el-popover
              placement="top"
              trigger="hover">
              <img :src="item " width="800px" height="800px">
              <img slot="reference" :src="item " width="500px" class="image" style="width: 100%">
            </el-popover>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-for="(item, index) in detail.detailPicPaths" :span="4" :key="index" >
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <span>{{ $t('products.detailimage') }}</span>
            </div>
            <el-popover
              placement="top"
              trigger="hover">
              <img :src="item" width="800px" height="800px">
              <img slot="reference" :src="item " width="500px" class="image" style="width: 100%">
            </el-popover>
          </el-card>
        </el-col>
      </el-row>
      <code>{{ $t('products.servicelastmouth') }} </code>
      <el-row>
        <el-col :span="24">
          <div :key="detail.id" class="chart-wrapper">
            <bar-chart :date-list="dateList" :times-list="timesList"/>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="classifyVisible" :title="$t('products.addcategories2')" width="45%" center lock-scroll>
      <el-form :model="categoriesform" style="width: 400px; margin:0 auto;">
        <el-form-item :label-width="formLabelWidth" :label="$t('products.categorycode')">
          <el-input v-model="categoriesform.categoryCode"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('products.categoryname')">
          <el-input v-model="categoriesform.categoryName"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="classifyVisible = false">{{ $t('products.cancel') }}</el-button>
        <el-button type="primary" @click="createClassify">{{ $t('products.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList2, productisactivechange, editproduct, addproduct, detail, tu, addcategories, categories2 } from '@/api/goods'
import PanelGroup from './components/PanelGroup'
import BarChart from './components/BarChart'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const calendarTypeOptions = [
  { key: '1', display_name: 'in sale' },
  { key: '2', display_name: 'sold out' }
]

export default {
  name: 'Sample',
  components: { Pagination, PanelGroup, BarChart },
  directives: { waves, permission },
  data() {
    return {
      activeName: 'first',
      tableKey: 0,
      list: null,
      list2: null,
      total: 0,
      total2: 0,
      listLoading: true,
      listQuery: {
        pagenum: 1,
        pagesize: 10,
        isActive: '',
        mainTitle: '',
        code: '',
        type: 0
      },
      searchQuery: {
        isActive: '',
        mainTitle: '',
        code: ''
      },
      listQuery2: {
        pagenum: 1,
        pagesize: 10,
        type: 1,
        isActive: '',
        mainTitle: '',
        code: ''
      },
      calendarTypeOptions,
      statusOptions: ['in sale', 'sold out'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogStatus: '',
      options: [],
      form: {
        id: '',
        type: '',
        mainTitle: '',
        salePrice: '',
        costPrice: '',
        code: '',
        brand: '',
        color: '',
        quantity: '',
        isActive: '1',
        detailpicid: '',
        picids: '',
        kpiGrade: '',
        barcode: '',
        productCategoryId: '',
        createrId: this.$store.getters.userId
      },
      rules: {
        mainTitle: [
          { required: true, message: 'Please input', trigger: 'blur' }
        ],
        type: [
          { required: true, message: 'Please input', trigger: 'blur' }
        ],
        productCategoryId: [
          { required: true, message: 'Please input', trigger: 'change' }
        ],
        salePrice: [
          { required: true, message: 'Please input', trigger: 'blur' }
        ],
        costPrice: [
          { required: true, message: 'Please input', trigger: 'blur' }
        ],
        code: [
          { required: true, message: 'Please input', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: 'Please input', trigger: 'blur' }
        ],
        color: [
          { required: true, message: 'Please input', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: 'Please input', trigger: 'blur' }
        ],
        barcode: [
          { required: true, message: 'Please input', trigger: 'blur' }
        ],
        kpiGrade: [
          { required: true, message: 'Please input', trigger: 'blur' }
        ]
      },
      edit: {
        id: '',
        type: '',
        mainTitle: '',
        salePrice: '',
        costPrice: '',
        code: '',
        brand: '',
        color: '',
        quantity: '',
        isActive: '',
        detailpicid: '',
        picids: '',
        kpiGrade: '',
        barcode: '',
        productCategoryId: '',
        createrId: this.$store.getters.userId
      },
      formLabelWidth: '150px',
      dialogImageUrl: '',
      dialogVisible: false,
      upLoadData: {
        type: 7
      },
      textMap: {
        update: 'edit product',
        create: 'add product'
      },
      productpic: {
        type: 2
      },
      centerDialogVisible: false,
      detail: {
        mainTitle: '',
        productType: '',
        color: '',
        salePrice: '',
        quantity: '',
        isActive: '',
        pulloffTime: '',
        createrId: '',
        picPaths: [],
        detailPicPaths: '',
        saleNum: '',
        maintainNum: ''
      },
      picPaths: [],
      dateList: [],
      timesList: [],
      classifyVisible: false,
      categoriesform: {
        categoryCode: '',
        categoryName: '',
        createrId: '',
        id: ''
      },
      detailpicid: [],
      picids: []
    }
  },
  created() {
    this.getList()
    this.product()
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true
      console.log(this.listQuery)
      fetchList2(this.listQuery).then(response => {
        this.list = response.data.data.content.list
        this.total = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      })
      fetchList2(this.listQuery2).then(response => {
        this.list2 = response.data.data.content.list
        this.total2 = response.data.data.content.totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 100)
      },
      )
    },
    product() {
      categories2().then(res => {
        this.options = res.data.data.content.list
        console.log(this.options)
      })
    },
    handleFilter() {
      this.listLoading = true
      this.listQuery.pagenum = 1
      if (this.activeName === 'first') {
        fetchList2(this.listQuery).then(res => {
          this.list = res.data.data.content.list
          this.total = res.data.data.content.totalCount
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
        })
      } else if (this.activeName === 'second') {
        fetchList2(this.listQuery2).then(res => {
          this.list2 = res.data.data.content.list
          this.total2 = res.data.data.content.totalCount
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 100)
        })
      }
    },
    handleModifyStatus(row, status) {
      row.isActive = status
      const productid = row.id
      const isactive = status
      productisactivechange(productid, isactive).then(res => {
        this.getList()
        this.$notify({
          title: 'successful',
          message: 'successful',
          type: 'success',
          duration: 2000
        })
      })
    },
    restdialogImageUrl() {
      this.$refs.upload.clearFiles()
      this.$refs.upload2.clearFiles()
      this.$refs.upload3.clearFiles()
      this.$refs.upload4.clearFiles()
    },
    restdialogImageUrl2() {
      this.$refs.upload3.clearFiles()
      this.$refs.upload4.clearFiles()
    },
    handleUpdate(row) {
      this.edit = Object.assign({}, row) // copy obj
      console.log(this.edit)
      detail(row.id).then((res) => {
        console.log(res)
        this.detail = Object.assign({}, res.data.data.content) // copy obj
        this.picPaths = res.data.data.content.picPaths
        this.dialogFormVisible2 = true
        this.$nextTick(() => {
          this.$refs['edit'].clearValidate()
        })
      })
    },
    updateData(formName) {
      const tempData = Object.assign({}, this.edit)
      tempData.detailpicid = this.detailpicid
      tempData.picids = this.picids
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editproduct(tempData).then(() => {
            this.getList()
            this.dialogFormVisible2 = false
            this.$notify({
              title: 'successful',
              message: 'successful',
              type: 'success',
              duration: 2000
            })
            this.restdialogImageUrl2()
            this.$refs[formName].resetFields()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.form = {
        id: '',
        type: '',
        mainTitle: '',
        salePrice: '',
        costPrice: '',
        code: '',
        brand: '',
        color: '',
        quantity: '',
        isActive: '1',
        detailpicid: '',
        picids: '',
        kpiGrade: '',
        barcode: '',
        productCategoryId: '',
        createrId: ''
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    cancelCreate(formName) {
      this.resetForm()
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    },
    createData(formName) {
      this.form.createrId = this.$store.getters.userId
      this.form.detailpicid = this.detailpicid
      this.form.picids = this.picids
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addproduct(this.form).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'successful',
              message: 'successful',
              type: 'success',
              duration: 2000
            })
            this.restdialogImageUrl()
            this.$refs[formName].resetFields()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlesuccess(response) {
      this.detailpicid.push(response.data.content.picId)
      console.log(response.data.content.picId)
    },
    submitUpload2() {
      this.$refs.upload2.submit()
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlesuccess2(response) {
      this.picids.push(response.data.content.picId)
      console.log(this.picids)
    },
    submitUpload3() {
      this.$refs.upload3.submit()
    },
    handleRemove3(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview3(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlesuccess3(response) {
      this.picids.push(response.data.content.picId)
      console.log(this.picids)
    },
    submitUpload4() {
      this.$refs.upload4.submit()
    },
    handleRemove4(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview4(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlesuccess4(response) {
      this.picids.push(response.data.content.picId)
      console.log(this.picids)
    },
    handleView(row) {
      detail(row.id).then((res) => {
        this.detail = Object.assign({}, res.data.data.content) // copy obj
        this.picPaths = res.data.data.content.picPaths
        this.centerDialogVisible = true
      })
      tu(row.id).then((res) => {
        this.dateList = res.data.data.dateList
        this.timesList = res.data.data.timesList
      })
    },
    restclassify() {
      this.categoriesform = {
        categoryCode: '',
        categoryName: '',
        createrId: '',
        id: ''
      }
    },
    handleAddClassify() {
      this.classifyVisible = true
      this.restclassify()
    },
    createClassify() {
      this.categoriesform.createrId = this.$store.getters.userId
      addcategories(this.categoriesform).then(() => {
        this.$notify({
          title: 'successful',
          message: 'successful',
          type: 'success',
          duration: 2000
        })
        this.product()
        this.classifyVisible = false
      })
    }
  }
}
</script>

<style scoped>
  .app-container >>> .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 23px;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
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
