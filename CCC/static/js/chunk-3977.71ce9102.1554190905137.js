(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3977"],{B70p:function(e,t,a){"use strict";var i=a("BqYo");a.n(i).a},BqYo:function(e,t,a){},F2hH:function(e,t,a){"use strict";var i=a("VG0r"),l=a("ZySA"),n=a("Mz3J"),o=a("yo+U"),r=a("fNFo"),s={directives:{waves:l.a},components:{MyTree:r.a,MySupplier:o.a,Pagination:n.a},filters:{genderFilter:function(e){return{1:"男",2:"女"}[e]}},props:{control:{type:Boolean,default:!1}},data:function(){return{supplierid:"",empcontrol:!1,types:[],treecontrol:!1,categoryid:"",productVisible:this.control,visible2:!1,moreaction:"",list:[],total:0,tableKey:0,listLoading:!0,getemplist:{productid:"",code:"",productname:"",categoryid:"",typeid:"",isactive:"",Productid:"",pagenum:1,pagesize:10}}},watch:{control:function(){this.productVisible=this.control,console.log(this.control),this.getlist()}},created:function(){this.getlist()},methods:{getlist:function(){var e=this;this.listLoading=!0,Object(i.m)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)}),Object(i.o)(2).then(function(t){200===t.data.ret&&(e.types=t.data.data.content.list)})},restFilter:function(){this.categoryid="",this.getemplist.categoryid="",this.supplierid="",this.getemplist.supplierid=""},handleFilter:function(){var e=this;this.getemplist.pagenum=1,Object(i.m)(this.getemplist).then(function(t){200===t.data.ret?(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount,e.restFilter()):e.restFilter()})},handleSelectionChange:function(e){this.moreaction=e},handlechoose:function(){this.empcontrol=!0},supplierName:function(e){console.log(e),this.supplierid=e.supplierName,this.getemplist.supplierid=e.id},treechoose:function(){this.treecontrol=!0},tree:function(e){this.categoryid=e.categoryName,this.getemplist.categoryid=e.id},handleAdd:function(){this.$router.push("/Product/NewProduct"),this.productVisible=!1},handleAddTo:function(){this.productVisible=!1,console.log(this.moreaction);var e=this.moreaction.map(function(e){return{productCode:e.code,productName:e.productName,todayAccess:0,yesterdayRemain:0,todayUseup:0,todayDamaged:0,todayRemain:0}});console.log(e),this.$emit("product",e)}}},c=(a("B70p"),a("KHd+")),p=Object(c.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.productVisible,control:e.control,"close-on-press-escape":!1,top:"10px",title:"选择商品","append-to-body":""},on:{"update:visible":function(t){e.productVisible=t},close:function(t){e.$emit("update:control",!1)}}},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.code"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.code,callback:function(t){e.$set(e.getemplist,"code",t)},expression:"getemplist.code"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.productname"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.productname,callback:function(t){e.$set(e.getemplist,"productname",t)},expression:"getemplist.productname"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.supplierid"),clearable:""},on:{focus:e.handlechoose},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.supplierid,callback:function(t){e.supplierid=t},expression:"supplierid"}}),e._v(" "),a("my-supplier",{attrs:{control:e.empcontrol},on:{"update:control":function(t){e.empcontrol=t},supplierName:e.supplierName}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:"物品分类",clearable:""},on:{focus:e.treechoose},model:{value:e.categoryid,callback:function(t){e.categoryid=t},expression:"categoryid"}}),e._v(" "),a("my-tree",{attrs:{treecontrol:e.treecontrol},on:{"update:treecontrol":function(t){e.treecontrol=t},tree:e.tree}}),e._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"500",trigger:"manual"},model:{value:e.visible2,callback:function(t){e.visible2=t},expression:"visible2"}},[a("el-select",{staticStyle:{width:"40%",float:"left","margin-left":"20px"},attrs:{placeholder:"请选择规格型号",clearable:""},model:{value:e.getemplist.typeid,callback:function(t){e.$set(e.getemplist,"typeid",t)},expression:"getemplist.typeid"}},e._l(e.types,function(e,t){return a("el-option",{key:t,attrs:{label:e.categoryName,value:e.id}})})),e._v(" "),a("el-select",{staticStyle:{width:"40%",float:"right","margin-right":"20px"},attrs:{placeholder:"请选择上下架",clearable:""},model:{value:e.getemplist.isactive,callback:function(t){e.$set(e.getemplist,"isactive",t)},expression:"getemplist.isactive"}},[a("el-option",{attrs:{value:"1",label:"上1"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"下2"}})],1),e._v(" "),a("div",{staticClass:"seachbutton",staticStyle:{width:"100%",float:"right","margin-top":"20px"}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{slot:"reference",type:"primary"},on:{click:function(t){e.visible2=!e.visible2}},slot:"reference"},[e._v(e._s(e.$t("public.filter"))),a("svg-icon",{staticStyle:{"margin-left":"4px"},attrs:{"icon-class":"shaixuan"}})],1)],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.code"),resizable:!1,prop:"code",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.code))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.productname"),resizable:!1,prop:"ProductName",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.productName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.categoryid"),resizable:!1,prop:"category",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.category))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.typeid"),resizable:!1,align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.productType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.color"),resizable:!1,prop:"color",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.color))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.kpigrade"),resizable:!1,prop:"kpiGrade",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.kpiGrade))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.point"),resizable:!1,prop:"point",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.point))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.costprice"),resizable:!1,prop:"costPrice",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.costPrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.purchaseprice"),resizable:!1,prop:"purchasePrice",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.purchasePrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.createid"),resizable:!1,prop:"createName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.createTime"),resizable:!1,prop:"createTime",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createTime))])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],staticStyle:{padding:"0"},attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.getlist}}),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"text-align":"center"},attrs:{type:"success"},on:{click:e.handleAddTo}},[e._v("确认添加")])],1)],1)},[],!1,null,"aadb370a",null);p.options.__file="MyDetail.vue";t.a=p.exports},KE2N:function(e,t,a){"use strict";var i=a("hKLV");a.n(i).a},QGDC:function(e,t,a){"use strict";var i=a("DhTb"),l=a("moiu"),n=a("Mz3J"),o={directives:{waves:a("ZySA").a},components:{Pagination:n.a},filters:{isKeyFliter:function(e){return{1:"是",2:"否"}[e]},statliter:function(e){return{1:"启用",2:"未启用"}[e]}},props:{control:{type:Boolean,default:!1}},data:function(){return{employeeVisible:this.control,depts:[],choosedata:"",currentRow:null,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{pageNum:1,pageSize:10,repositoryId:438,regionIds:2,createPersonId:3},personalForm:{},editVisible:!1,date:[]}},watch:{control:function(){this.employeeVisible=this.control}},created:function(){this.getlist()},methods:{getlist:function(){var e=this;this.listLoading=!0,Object(i.h)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)}),Object(l.m)().then(function(t){200===t.data.ret&&(e.depts=t.data.data.content)})},handleFilter:function(){var e=this;this.getemplist.pageNum=1,Object(i.h)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount)})},handleAdd:function(){this.employeeVisible=!1,this.$router.push("/ProcessFile/AddWorkCenter")},handleCurrentChange:function(e){this.choosedata=e},handleConfirm:function(){this.employeeVisible=!1,this.$emit("center",this.choosedata)}}},r=(a("tDb8"),a("KHd+")),s=Object(r.a)(o,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.employeeVisible,control:e.control,"close-on-press-escape":!1,top:"10px",title:"选择工作中心","append-to-body":"",width:"900px"},on:{"update:visible":function(t){e.employeeVisible=t},close:function(t){e.$emit("update:control",!1)}}},[a("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"15px",height:"60px"}},[a("el-row",[a("el-form",{ref:"getemplist",staticStyle:{"margin-top":"-9px"},attrs:{model:e.getemplist}},[a("el-col",{attrs:{span:4}},[a("el-form-item",[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("ProcessFile.code"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.code,callback:function(t){e.$set(e.getemplist,"code",t)},expression:"getemplist.code"}})],1)],1),e._v(" "),a("el-col",{staticStyle:{"margin-left":"16px"},attrs:{span:4}},[a("el-form-item",[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("ProcessFile.workCenterName"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.workCenterName,callback:function(t){e.$set(e.getemplist,"workCenterName",t)},expression:"getemplist.workCenterName"}})],1)],1),e._v(" "),a("el-col",{staticStyle:{"margin-left":"16px"},attrs:{span:4}},[a("el-form-item",[a("el-select",{staticClass:"filter-item",attrs:{clearable:""},model:{value:e.personalForm.deptId,callback:function(t){e.$set(e.personalForm,"deptId",t)},expression:"personalForm.deptId"}},e._l(e.depts,function(e,t){return a("el-option",{key:t,attrs:{value:e.id,label:e.deptName}})}))],1)],1),e._v(" "),a("el-col",{staticStyle:{"margin-left":"16px"},attrs:{span:4}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),a("el-col",{staticStyle:{"margin-left":"16px"},attrs:{span:4}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1)],1)],1)],1),e._v(" "),a("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"15px"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"current-change":e.handleCurrentChange}},[a("el-table-column",{attrs:{label:e.$t("ProcessFile.code"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.code))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("ProcessFile.workCenterName"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.workCenterName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("ProcessFile.isKey"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("isKeyFliter")(t.row.isKey)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("ProcessFile.deptId"),resizable:!1,prop:"ProcessFileDetails",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.deptName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("ProcessFile.stat"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("statliter")(t.row.stat)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("ProcessFile.createrName"),resizable:!1,prop:"ProcessFileDetails",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createrName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("ProcessFile.createTime"),resizable:!1,prop:"ProcessFileDetails",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createTime))])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.getemplist.pageNum,limit:e.getemplist.pageSize},on:{"update:page":function(t){e.$set(e.getemplist,"pageNum",t)},"update:limit":function(t){e.$set(e.getemplist,"pageSize",t)},pagination:e.getlist}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"100px",float:"left","margin-bottom":"10px"},attrs:{type:"success"},on:{click:e.handleConfirm}},[e._v("确认添加")])],1)],1)},[],!1,null,"92ebb216",null);s.options.__file="MyCenter.vue";t.a=s.exports},YK0C:function(e,t,a){"use strict";var i=a("rW1G"),l=a("Mz3J"),n=a("ZySA"),o=a("QGDC"),r=a("gGdf"),s={directives:{waves:n.a},components:{Pagination:l.a,MyCenter:o.a,MyEmp:r.a},filters:{judgeStatFilter:function(e){return{0:"未审核",1:"审核中",2:"审核通过",3:"审核不通过"}[e]},receiptStatFilter:function(e){return{1:"制单",2:"执行",3:"结单"}[e]}},props:{procontrol:{type:Boolean,default:!1}},data:function(){return{employeeVisible:this.procontrol,visible2:!1,workCenterId:"",centercontrol:!1,handlePersonId:"",stockControl:!1,moreaction:"",downloadLoading:!1,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{pagenum:1,pagesize:10,repositoryId:438,regionIds:2,createPersonId:3},date:[]}},watch:{procontrol:function(){this.employeeVisible=this.procontrol}},created:function(){this.getlist()},methods:{getlist:function(){var e=this;this.listLoading=!0,Object(i.c)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)})},restFilter:function(){this.handlePersonId="",this.getemplist.handlePersonId="",this.workCenterId="",this.getemplist.workCenterId=""},handleFilter:function(){var e=this;this.getemplist.pagenum=1,Object(i.c)(this.getemplist).then(function(t){200===t.data.ret?(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount,e.restFilter()):e.restFilter()})},workcenterchoose:function(){this.centercontrol=!0},center:function(e){console.log(e),this.workCenterId=e.workCenterName,this.getemplist.workCenterId=e.id},handlechooseStock:function(){this.stockControl=!0},stockName:function(e){this.handlePersonId=e.personName,this.getemplist.handlePersonId=e.id},handleAdd:function(){this.employeeVisible=!1,this.$router.push("/ProducePlan/AddProducePlan")},handleCurrentChange:function(e){this.choosedata=e},handleConfirm:function(){this.employeeVisible=!1;var e=this.choosedata.producePlanDetailVos,t=this.choosedata.planNumber,a=e.map(function(e){return{sourceType:"主生产计划",productCode:e.productCode,productName:e.productName,productType:e.productType,unit:e.unit,produceQuantity:e.planQuantity,sourceNumber:t,bomNumber:"",processName:"",planStartDate:"",alreadyProduceQuantity:0,alreadyEnterQuantity:0,reportedCheckQuantity:0,actualCheckQuantity:0,passQuantity:0,failQuantity:0}});this.$emit("produce",a),this.$emit("moredata",t)}}},c=(a("eItm"),a("KHd+")),p=Object(c.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.employeeVisible,procontrol:e.procontrol,"close-on-press-escape":!1,top:"10px",title:"选择主生产计划","append-to-body":"",width:"1000px"},on:{"update:visible":function(t){e.employeeVisible=t},close:function(t){e.$emit("update:procontrol",!1)}}},[a("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"15px",height:"60px","padding-left":"0"}},[a("el-row",[a("el-form",{ref:"getemplist",staticStyle:{"margin-top":"-9px"},attrs:{model:e.getemplist}},[a("el-col",{attrs:{span:4}},[a("el-form-item",[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("ProducePlan.title"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.title,callback:function(t){e.$set(e.getemplist,"title",t)},expression:"getemplist.title"}})],1)],1),e._v(" "),a("el-col",{staticStyle:{"margin-left":"15px"},attrs:{span:4}},[a("el-form-item",[a("el-input",{staticClass:"filter-item",attrs:{placeholder:"生产编号",clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.planNumber,callback:function(t){e.$set(e.getemplist,"planNumber",t)},expression:"getemplist.planNumber"}})],1)],1),e._v(" "),a("el-col",{staticStyle:{"margin-left":"15px"},attrs:{span:4}},[a("el-form-item",[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("ProducePlan.handlePersonId"),clearable:""},on:{focus:e.handlechooseStock},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.handlePersonId,callback:function(t){e.handlePersonId=t},expression:"handlePersonId"}})],1),e._v(" "),a("my-emp",{attrs:{control:e.stockControl},on:{"update:control":function(t){e.stockControl=t},stockName:e.stockName}})],1),e._v(" "),a("el-col",{attrs:{span:4}},[a("el-popover",{attrs:{placement:"bottom",width:"500",trigger:"manual"},model:{value:e.visible2,callback:function(t){e.visible2=t},expression:"visible2"}},[a("el-input",{staticStyle:{width:"40%",float:"left","margin-left":"20px"},attrs:{placeholder:"工作中心",clearable:""},on:{focus:e.workcenterchoose},model:{value:e.workCenterId,callback:function(t){e.workCenterId=t},expression:"workCenterId"}}),e._v(" "),a("my-center",{attrs:{control:e.centercontrol},on:{"update:control":function(t){e.centercontrol=t},center:e.center}}),e._v(" "),a("el-select",{staticStyle:{width:"40%",float:"right","margin-right":"20px"},attrs:{value:e.getemplist.judgeStat,placeholder:"审批状态",clearable:""},model:{value:e.getemplist.judgeStat,callback:function(t){e.$set(e.getemplist,"judgeStat",t)},expression:"getemplist.judgeStat"}},[a("el-option",{attrs:{value:"0",label:"未审核"}}),e._v(" "),a("el-option",{attrs:{value:"1",label:"审核中"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"审核通过"}}),e._v(" "),a("el-option",{attrs:{value:"3",label:"审核不通过"}})],1),e._v(" "),a("el-select",{staticStyle:{width:"40%",float:"left","margin-left":"20px","margin-top":"20px"},attrs:{value:e.getemplist.receiptStat,placeholder:"单据状态",clearable:""},model:{value:e.getemplist.receiptStat,callback:function(t){e.$set(e.getemplist,"receiptStat",t)},expression:"getemplist.receiptStat"}},[a("el-option",{attrs:{value:"1",label:"制单"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"执行"}}),e._v(" "),a("el-option",{attrs:{value:"3",label:"结单"}})],1),e._v(" "),a("el-date-picker",{staticStyle:{"margin-top":"20px","margin-left":"20px"},attrs:{type:"daterange","range-separator":"-","unlink-panels":"","start-placeholder":"Start","end-placeholder":"End","value-format":"yyyy-MM-dd"},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}}),e._v(" "),a("div",{staticClass:"seachbutton",staticStyle:{width:"100%",float:"right","margin-top":"20px"}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{slot:"reference",type:"primary"},on:{click:function(t){e.visible2=!e.visible2}},slot:"reference"},[e._v(e._s(e.$t("public.filter"))),a("svg-icon",{staticStyle:{"margin-left":"4px"},attrs:{"icon-class":"shaixuan"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:4}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),a("el-col",{attrs:{span:3}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1)],1)],1)],1),e._v(" "),a("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"15px"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"current-change":e.handleCurrentChange}},[a("el-table-column",{attrs:{label:e.$t("ProducePlan.planNumber"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.planNumber))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("ProducePlan.title"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.title))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("ProducePlan.handlePersonId"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.handlePersonName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("ProducePlan.deptName"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.workCenter))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("public.judgeStat"),resizable:!1,prop:"judgeStat",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("judgeStatFilter")(t.row.judgeStat)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("public.receiptStat"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("receiptStatFilter")(t.row.receiptStat)))])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.getlist}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"100px",float:"left","margin-bottom":"10px"},attrs:{type:"success"},on:{click:e.handleConfirm}},[e._v("确认添加")])],1)],1)},[],!1,null,"2b6892f4",null);p.options.__file="ProducePlan.vue";t.a=p.exports},eItm:function(e,t,a){"use strict";var i=a("j5IO");a.n(i).a},gGdf:function(e,t,a){"use strict";var i=a("6HaC"),l=a("0zGY"),n=a("ZySA"),o=a("Mz3J"),r={directives:{waves:n.a},components:{Pagination:o.a},filters:{genderFilter:function(e){return{1:"男",2:"女"}[e]}},props:{control:{type:Boolean,default:!1},bumen:{type:null,default:null}},data:function(){return{jiesou:this.bumen,jobCat:{type:2,pagenum:1,pagesize:9999},jobs:[],moreaction:"",managerPeople:"",regionManagerId:"",currentRow:null,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{repositoryid:"",regionid:"",postid:"",deptid:"",employeename:"",pagenum:1,pagesize:10,stat:1,time:"",jobnumber:""},depts:[],props2:{value:"id",label:"regionName",children:"regionListVos"},regions2:[],getemplistregions:[],repositories:[],employeeVisible:this.control,regionManagerVisible:!1}},watch:{control:function(){this.employeeVisible=this.control,console.log(this.control),this.gitemplist()},bumen:function(){this.jiesou=this.bumen,console.log(this.bumen)}},created:function(){this.gitemplist()},methods:{gitemplist:function(){var e=this;this.listLoading=!0,console.log(this.getemplist),this.getemplist.deptid=this.jiesou.deptId,Object(l.i)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)}),Object(l.g)().then(function(t){200===t.data.ret&&(e.depts=t.data.data.content)}),Object(i.k)().then(function(t){200===t.data.ret&&(e.regions2=e.tranKTree(t.data.data.content))}),Object(l.k)(this.jobCat).then(function(t){200===t.data.ret?e.jobs=t.data.data.content.list:console.log("职位列表出错")})},tranKTree:function(e){var t=this;if(e&&e.length)return e.map(function(e){return{id:e.id,regionName:e.regionName,regionListVos:t.tranKTree(e.regionListVos)}})},handleFilter:function(){var e=this;this.getemplist.regionid=this.getemplistregions[this.getemplistregions.length-1],Object(l.i)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount)})},handleAdd:function(){this.employeeVisible=!1,this.$router.push("/EmployeeInformation/NewEmployeeInformation")},handlechange4:function(e){var t=this;console.log(e);var a=e[e.length-1];Object(i.o)(a).then(function(e){200===e.data.ret?(console.log(e),t.repositories=e.data.data.content.list):t.$message.error("出错了")})},restemplist:function(){this.getemplist={repositoryid:"",regionid:"",postid:"",deptid:"",employeename:"",pagenum:1,pagesize:10,stat:1,time:"",jobnumber:""},this.getemplistregions=[]},handleCurrentChange:function(e){this.moreaction=e},handleAddTo:function(){this.employeeVisible=!1,console.log(this.moreaction);var e=this.moreaction.map(function(e){return{producePersonId:e.id,personName:e.personName,workHours:0,finishQuantity:0,passQuantity:0,passRate:0}});this.$emit("empDetail",e)}}},s=(a("KE2N"),a("KHd+")),c=Object(s.a)(r,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.employeeVisible,control:e.control,bumen:e.bumen,"close-on-press-escape":!1,top:"10px",title:"选择员工","append-to-body":""},on:{"update:visible":function(t){e.employeeVisible=t},close:function(t){e.$emit("update:control",!1)}}},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("NewEmployeeInformation.employeename"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.employeename,callback:function(t){e.$set(e.getemplist,"employeename",t)},expression:"getemplist.employeename"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("NewEmployeeInformation.jobnumber2"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.jobnumber,callback:function(t){e.$set(e.getemplist,"jobnumber",t)},expression:"getemplist.jobnumber"}}),e._v(" "),a("el-date-picker",{staticClass:"filter-item",attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.getemplist.time,callback:function(t){e.$set(e.getemplist,"time",t)},expression:"getemplist.time"}}),e._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"500",trigger:"click"}},[a("el-cascader",{staticStyle:{width:"40%",float:"left","margin-left":"20px"},attrs:{options:e.regions2,props:e.props2,"show-all-levels":!1,placeholder:"请选择区域","change-on-select":"",filterable:"",clearable:""},on:{change:e.handlechange4},model:{value:e.getemplistregions,callback:function(t){e.getemplistregions=t},expression:"getemplistregions"}}),e._v(" "),a("el-select",{staticStyle:{width:"40%",float:"right","margin-right":"20px"},attrs:{placeholder:"请选择门店",clearable:"",filterable:""},model:{value:e.getemplist.repositoryid,callback:function(t){e.$set(e.getemplist,"repositoryid",t)},expression:"getemplist.repositoryid"}},e._l(e.repositories,function(e,t){return a("el-option",{key:t,attrs:{label:e.repositoryName,value:e.id}})})),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"40%",float:"left","margin-top":"10px","margin-left":"20px"},attrs:{value:e.getemplist.postid,placeholder:e.$t("NewEmployeeInformation.postid2"),clearable:""},model:{value:e.getemplist.postid,callback:function(t){e.$set(e.getemplist,"postid",t)},expression:"getemplist.postid"}},e._l(e.jobs,function(e,t){return a("el-option",{key:t,attrs:{label:e.categoryName,value:e.id}})})),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"40%",float:"right","margin-top":"10px","margin-right":"20px"},attrs:{placeholder:e.$t("NewEmployeeInformation.deptid2"),clearable:""},model:{value:e.getemplist.deptid,callback:function(t){e.$set(e.getemplist,"deptid",t)},expression:"getemplist.deptid"}},e._l(e.depts,function(e,t){return a("el-option",{key:t,attrs:{label:e.deptName,value:e.id}})})),e._v(" "),a("div",{staticClass:"seachbutton",staticStyle:{width:"100%",float:"right","margin-top":"20px"}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{slot:"reference",type:"primary"},slot:"reference"},[e._v(e._s(e.$t("public.filter"))),a("svg-icon",{staticStyle:{"margin-left":"4px"},attrs:{"icon-class":"shaixuan"}})],1)],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleCurrentChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.id"),resizable:!1,property:"id",align:"center",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.jobNumber"),resizable:!1,property:"jobNumber",align:"center",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.account"),resizable:!1,property:"account",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.name"),resizable:!1,align:"center",width:"109"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.firstName)+" "+e._s(t.row.middleName)+" "+e._s(t.row.lastName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.gender"),resizable:!1,prop:"gender",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("genderFilter")(t.row.gender)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.deptName"),resizable:!1,prop:"deptName",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.deptName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.regionName"),resizable:!1,prop:"regionName",align:"center",width:"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.regionName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.repositoryName"),resizable:!1,prop:"repositoryName",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.repositoryName))])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],staticStyle:{padding:"0"},attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.gitemplist}}),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px","margin-top":"20px"},attrs:{type:"success"},on:{click:e.handleAddTo}},[e._v(e._s(e.$t("public.addTo")))])],1)],1)},[],!1,null,"1c578fee",null);c.options.__file="MyEmp.vue";t.a=c.exports},hKLV:function(e,t,a){},j5IO:function(e,t,a){},oi4P:function(e,t,a){},rW1G:function(e,t,a){"use strict";a.d(t,"a",function(){return l}),a.d(t,"c",function(){return n}),a.d(t,"b",function(){return o}),a.d(t,"d",function(){return r}),a.d(t,"e",function(){return s});var i=a("t3Un");function l(e,t,a){var l=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&l.append("producePlanJson",e),""!==t&&null!==t&&void 0!==t&&l.append("producePlanDetailJson",t),""!==a.repositoryId&&null!==a.repositoryId&&void 0!==a.repositoryId&&l.append("repositoryId",a.repositoryId),""!==a.regionId&&null!==a.regionId&&void 0!==a.regionId&&l.append("regionId",a.regionId),Object(i.a)({url:"/erp/produceplan/addproduceplan",method:"post",data:l})}function n(e){var t=new URLSearchParams;return""!==e.title&&null!==e.title&&void 0!==e.title&&t.append("title",e.title),""!==e.planNumber&&null!==e.planNumber&&void 0!==e.planNumber&&t.append("planNumber",e.planNumber),""!==e.handlePersonId&&null!==e.handlePersonId&&void 0!==e.handlePersonId&&t.append("handlePersonId",e.handlePersonId),""!==e.workCenterId&&null!==e.workCenterId&&void 0!==e.workCenterId&&t.append("workCenterId",e.workCenterId),""!==e.judgeStat&&null!==e.judgeStat&&void 0!==e.judgeStat&&t.append("judgeStat",e.judgeStat),""!==e.receiptStat&&null!==e.receiptStat&&void 0!==e.receiptStat&&t.append("receiptStat",e.receiptStat),""!==e.beginTime&&null!==e.beginTime&&void 0!==e.beginTime&&t.append("beginTime",e.beginTime),""!==e.endTime&&null!==e.endTime&&void 0!==e.endTime&&t.append("endTime",e.endTime),""!==e.repositoryId&&null!==e.repositoryId&&void 0!==e.repositoryId&&t.append("repositoryId",e.repositoryId),""!==e.createPersonId&&null!==e.createPersonId&&void 0!==e.createPersonId&&t.append("createPersonId",e.createPersonId),""!==e.regionIds&&null!==e.regionIds&&void 0!==e.regionIds&&t.append("regionIds",e.regionIds),t.append("pageNum",e.pageNum),t.append("pageSize",e.pageSize),Object(i.a)({url:"/erp/produceplan/produceplanlist",method:"post",data:t})}function o(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("planIds",e),Object(i.a)({url:"/erp/produceplan/deleteproduceplan",method:"post",data:t})}function r(e,t){var a=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&a.append("producePlanJson",e),""!==t&&null!==t&&void 0!==t&&a.append("producePlanDetailJson",t),Object(i.a)({url:"/erp/produceplan/updateproduceplan",method:"post",data:a})}function s(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("producePlanJson",e),Object(i.a)({url:"/erp/produceplan/updateproduceplan",method:"post",data:t})}},tDb8:function(e,t,a){"use strict";var i=a("oi4P");a.n(i).a}}]);