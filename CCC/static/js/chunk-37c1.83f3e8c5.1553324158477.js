(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-37c1"],{"/8iF":function(e,t,a){"use strict";var l=a("6HaC"),i=a("0zGY"),o=a("ZySA"),r=a("Mz3J"),s={directives:{waves:o.a},components:{Pagination:r.a},filters:{genderFilter:function(e){return{1:"男",2:"女"}[e]}},props:{accetpcontrol:{type:Boolean,default:!1}},data:function(){return{managerPeople:"",regionManagerId:"",choosedata:"",currentRow:null,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{repositoryid:"",regionid:"",postid:"",deptid:"",employeename:"",pagenum:1,pagesize:10,stat:1,time:"",jobnumber:""},depts:[],props2:{value:"id",label:"regionName",children:"regionListVos"},regions2:[],getemplistregions:[],repositories:[],employeeVisible:this.accetpcontrol,regionManagerVisible:!1}},watch:{accetpcontrol:function(){this.employeeVisible=this.accetpcontrol}},created:function(){this.gitemplist()},methods:{gitemplist:function(){var e=this;this.listLoading=!0,console.log(this.getemplist),Object(i.i)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)}),Object(i.g)().then(function(t){200===t.data.ret&&(e.depts=t.data.data.content)}),Object(l.h)().then(function(t){200===t.data.ret&&(e.regions2=e.tranKTree(t.data.data.content))})},tranKTree:function(e){var t=this;if(e&&e.length)return e.map(function(e){return{id:e.id,regionName:e.regionName,regionListVos:t.tranKTree(e.regionListVos)}})},handleFilter:function(){var e=this;this.getemplist.regionid=this.getemplistregions[this.getemplistregions.length-1],Object(i.i)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount)})},handleAdd:function(){this.employeeVisible=!1,this.$router.push("/EmployeeInformation/NewEmployeeInformation")},handlechange4:function(e){var t=this;console.log(e);var a=e[e.length-1];Object(l.i)(a).then(function(e){200===e.data.ret?(console.log(e),t.repositories=e.data.data.content.list):t.$message.error("出错了")})},restemplist:function(){this.getemplist={repositoryid:"",regionid:"",postid:"",deptid:"",employeename:"",pagenum:1,pagesize:10,stat:1,time:"",jobnumber:""},this.getemplistregions=[]},handleCurrentChange:function(e){this.choosedata=e},handleConfirm:function(){this.employeeVisible=!1,this.$emit("acceptName",this.choosedata)}}},n=(a("gB1U"),a("KHd+")),c=Object(n.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.employeeVisible,accetpcontrol:e.accetpcontrol,"close-on-press-escape":!1,top:"10px",title:"选择员工","append-to-body":""},on:{"update:visible":function(t){e.employeeVisible=t},close:function(t){e.$emit("update:accetpcontrol",!1)}}},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("NewEmployeeInformation.employeename"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.employeename,callback:function(t){e.$set(e.getemplist,"employeename",t)},expression:"getemplist.employeename"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("NewEmployeeInformation.jobnumber2"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.jobnumber,callback:function(t){e.$set(e.getemplist,"jobnumber",t)},expression:"getemplist.jobnumber"}}),e._v(" "),a("el-date-picker",{staticClass:"filter-item",attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.getemplist.time,callback:function(t){e.$set(e.getemplist,"time",t)},expression:"getemplist.time"}}),e._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"500",trigger:"click"}},[a("el-cascader",{staticStyle:{width:"40%",float:"left","margin-left":"20px"},attrs:{options:e.regions2,props:e.props2,"show-all-levels":!1,placeholder:"请选择区域","change-on-select":"",filterable:"",clearable:""},on:{change:e.handlechange4},model:{value:e.getemplistregions,callback:function(t){e.getemplistregions=t},expression:"getemplistregions"}}),e._v(" "),a("el-select",{staticStyle:{width:"40%",float:"right","margin-right":"20px"},attrs:{placeholder:"请选择门店",clearable:"",filterable:""},model:{value:e.getemplist.repositoryid,callback:function(t){e.$set(e.getemplist,"repositoryid",t)},expression:"getemplist.repositoryid"}},e._l(e.repositories,function(e,t){return a("el-option",{key:t,attrs:{label:e.repositoryName,value:e.id}})})),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"40%",float:"left","margin-top":"10px","margin-left":"20px"},attrs:{value:e.getemplist.postid,placeholder:e.$t("NewEmployeeInformation.postid2"),clearable:""},model:{value:e.getemplist.postid,callback:function(t){e.$set(e.getemplist,"postid",t)},expression:"getemplist.postid"}},[a("el-option",{attrs:{label:"xxx",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"xxx",value:"2"}})],1),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"40%",float:"right","margin-top":"10px","margin-right":"20px"},attrs:{placeholder:e.$t("NewEmployeeInformation.deptid2"),clearable:""},model:{value:e.getemplist.deptid,callback:function(t){e.$set(e.getemplist,"deptid",t)},expression:"getemplist.deptid"}},e._l(e.depts,function(e,t){return a("el-option",{key:t,attrs:{label:e.deptName,value:e.id}})})),e._v(" "),a("div",{staticClass:"seachbutton",staticStyle:{width:"100%",float:"right","margin-top":"20px"}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{slot:"reference",type:"primary"},slot:"reference"},[e._v(e._s(e.$t("public.filter"))),a("svg-icon",{staticStyle:{"margin-left":"4px"},attrs:{"icon-class":"shaixuan"}})],1)],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"current-change":e.handleCurrentChange}},[a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.id"),resizable:!1,property:"id",align:"center",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.jobNumber"),resizable:!1,property:"jobNumber",align:"center",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.account"),resizable:!1,property:"account",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.name"),resizable:!1,align:"center",width:"109"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.firstName)+" "+e._s(t.row.middleName)+" "+e._s(t.row.lastName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.gender"),resizable:!1,prop:"gender",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("genderFilter")(t.row.gender)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.deptName"),resizable:!1,prop:"deptName",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.deptName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.regionName"),resizable:!1,prop:"regionName",align:"center",width:"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.regionName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.repositoryName"),resizable:!1,prop:"repositoryName",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.repositoryName))])]}}])})],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"100px",float:"left","margin-top":"10px"},attrs:{type:"success"},on:{click:e.handleConfirm}},[e._v("确认添加")]),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.gitemplist}})],1)},[],!1,null,"353f3bc8",null);c.options.__file="MyAccept.vue";t.a=c.exports},"0sLb":function(e,t,a){"use strict";var l=a("eQTJ");a.n(l).a},PgRz:function(e,t,a){},cNKK:function(e,t,a){"use strict";var l=a("PgRz");a.n(l).a},eQTJ:function(e,t,a){},gB1U:function(e,t,a){"use strict";var l=a("nRtH");a.n(l).a},iaEQ:function(e,t,a){"use strict";a.r(t);var l=a("gDS+"),i=a.n(l),o=a("LVwP"),r=a("MEjP"),s=a("/8iF"),n=a("EF6G"),c=a("FLCj"),p=a("VG0r"),d=a("ZySA"),u=a("Mz3J"),m={directives:{waves:d.a},components:{Pagination:u.a},filters:{genderFilter:function(e){return{1:"男",2:"女"}[e]}},props:{control:{type:Boolean,default:!1}},data:function(){return{productVisible:this.control,moreaction:"",list:[],total:0,tableKey:0,listLoading:!0,getemplist:{productid:"",code:"",productname:"",categoryid:"",typeid:"",isactive:"",Productid:"",pagenum:1,pagesize:10}}},watch:{control:function(){this.productVisible=this.control,console.log(this.control),this.getlist()}},created:function(){this.getlist()},methods:{getlist:function(){var e=this;this.listLoading=!0,Object(p.m)(this.getemplist).then(function(t){200===t.data.ret?(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount):e.$notify.error({title:"错误",message:"出错了",offset:100}),setTimeout(function(){e.listLoading=!1},50)})},handleFilter:function(){var e=this;this.getemplist.pagenum=1,Object(p.m)(this.getemplist).then(function(t){200===t.data.ret?(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount):e.$notify.error({title:"错误",message:"出错了",offset:100})})},handleSelectionChange:function(e){this.moreaction=e},handleAdd:function(){this.$router.push("/Product/NewProduct"),this.productVisible=!1},handleAddTo:function(){this.productVisible=!1,this.$emit("product",this.moreaction)}}},g=(a("0sLb"),a("KHd+")),f=Object(g.a)(m,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.productVisible,control:e.control,"close-on-press-escape":!1,top:"10px",title:"选择经办人","append-to-body":""},on:{"update:visible":function(t){e.productVisible=t},close:function(t){e.$emit("update:control",!1)}}},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.code"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.code,callback:function(t){e.$set(e.getemplist,"code",t)},expression:"getemplist.code"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.productname"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.productname,callback:function(t){e.$set(e.getemplist,"productname",t)},expression:"getemplist.productname"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.supplierid")},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.supplierid,callback:function(t){e.$set(e.getemplist,"supplierid",t)},expression:"getemplist.supplierid"}}),e._v(" "),a("el-select",{staticClass:"filter-item",attrs:{value:e.getemplist.categoryid,placeholder:"物品分类",clearable:""},model:{value:e.getemplist.categoryid,callback:function(t){e.$set(e.getemplist,"categoryid",t)},expression:"getemplist.categoryid"}},[a("el-option",{attrs:{value:"1",label:"类1"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"类2"}})],1),e._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"500",trigger:"click"}},[a("el-select",{staticStyle:{width:"40%",float:"left","margin-left":"20px"},attrs:{placeholder:"请选择规格型号",clearable:""},model:{value:e.getemplist.typeid,callback:function(t){e.$set(e.getemplist,"typeid",t)},expression:"getemplist.typeid"}},[a("el-option",{attrs:{value:"1",label:"类1"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"类2"}})],1),e._v(" "),a("el-select",{staticStyle:{width:"40%",float:"right","margin-right":"20px"},attrs:{placeholder:"请选择上下架",clearable:""},model:{value:e.getemplist.isactive,callback:function(t){e.$set(e.getemplist,"isactive",t)},expression:"getemplist.isactive"}},[a("el-option",{attrs:{value:"1",label:"上1"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"下2"}})],1),e._v(" "),a("div",{staticClass:"seachbutton",staticStyle:{width:"100%",float:"right","margin-top":"20px"}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{slot:"reference",type:"primary"},slot:"reference"},[e._v(e._s(e.$t("public.filter"))),a("svg-icon",{staticStyle:{"margin-left":"4px"},attrs:{"icon-class":"shaixuan"}})],1)],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"current-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{label:e.$t("Product.code"),resizable:!1,prop:"code",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.code))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.productname"),resizable:!1,prop:"ProductName",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.productName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.categoryid"),resizable:!1,prop:"category",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.category))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.typeid"),resizable:!1,align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.productType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.color"),resizable:!1,prop:"color",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.color))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.kpigrade"),resizable:!1,prop:"kpiGrade",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.kpiGrade))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.point"),resizable:!1,prop:"point",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.point))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.costprice"),resizable:!1,prop:"costPrice",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.costPrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.purchaseprice"),resizable:!1,prop:"purchasePrice",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.purchasePrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.createid"),resizable:!1,prop:"createName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.createTime"),resizable:!1,prop:"createTime",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createTime))])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],staticStyle:{padding:"0"},attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.getlist}}),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"text-align":"center"},attrs:{type:"success"},on:{click:e.handleAddTo}},[e._v("确认添加")])],1)],1)},[],!1,null,"70d56992",null);f.options.__file="MyProduct.vue";var h={name:"AddStockAlarm",components:{MyProduct:f.exports,MyRepository:r.a,MyDetail:n.a,MyCreate:c.a,MyAccept:s.a},data:function(){return{productId:"",repositoryId:"",repositorycontrol:!1,control:!1,personalForm:{createPersonId:3,createId:3,countryId:1,repositoryId:438,regionId:2},personalrules:{repositoryId:[{required:!0,message:"请选择仓库",trigger:"blue"}],productId:[{required:!0,message:"请选择商品",trigger:"change"}],downStock:[{required:!0,message:"请输入库存下限",trigger:"blur"}],upStock:[{required:!0,message:"请输入库存上限",trigger:"blur"}],safeStock:[{required:!0,message:"请输入安全库存",trigger:"blur"}]}}},methods:{handlechooseRep:function(){this.repositorycontrol=!0},repositoryname:function(e){console.log(e),this.repositoryId=e.repositoryName,this.personalForm.repositoryId=e.id},handleAddproduct:function(){this.control=!0},productdetail:function(e){console.log(e),this.personalForm.productId=e.id,this.productId=e.productName},restAllForm:function(){this.personalForm={createPersonId:3,countryId:1,repositoryId:438,regionId:2},this.repositoryId="",this.productId=""},handlesave:function(){var e=this;console.log(this.personalForm);var t=this.personalForm;for(var a in t)""!==t[a]&&void 0!==t[a]&&null!==t[a]||delete t[a];var l=i()(t);this.$refs.personalForm.validate(function(t){if(!t)return e.$notify.error({title:"错误",message:"信息未填完整",offset:100}),!1;Object(o.c)(l).then(function(t){200===t.data.ret?(e.$notify({title:"成功",message:"保存成功",type:"success",offset:100}),e.restAllForm(),e.$refs.personalForm.clearValidate(),e.$refs.personalForm.resetFields()):e.$notify.error({title:"错误",message:t.data.msg,offset:100})})})},handlecancel:function(){this.$router.go(-1);this.$store.dispatch("delView",{path:"/WarehouseAdjust/AddStockAlarm",name:"AddStockAlarm",fullPath:"/WarehouseAdjust/AddStockAlarm",title:"AddStockAlarm"}).then(function(e){e.visitedViews})}}},v=(a("cNKK"),Object(g.a)(h,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ERP-container"},[a("div",{staticClass:"app-container",staticStyle:{"padding-right":"0"}},[a("el-card",{staticClass:"box-card"},[a("h2",{ref:"geren",staticClass:"form-name"},[e._v("基本信息")]),e._v(" "),a("div",{staticClass:"container"},[a("el-form",{ref:"personalForm",staticClass:"demo-ruleForm",staticStyle:{"margin-left":"30px"},attrs:{model:e.personalForm,rules:e.personalrules,inline:!0,"status-icon":"","label-width":"100px"}},[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("WarehouseAdjust.enterRepositoryId"),prop:"repositoryId"}},[a("el-input",{staticStyle:{"margin-left":"18px"},attrs:{placeholder:"请选择仓库",clearable:""},on:{focus:e.handlechooseRep},model:{value:e.repositoryId,callback:function(t){e.repositoryId=t},expression:"repositoryId"}})],1),e._v(" "),a("my-repository",{attrs:{repositorycontrol:e.repositorycontrol},on:{"update:repositorycontrol":function(t){e.repositorycontrol=t},repositoryname:e.repositoryname}})],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("WarehouseAdjust.upStock"),prop:"upStock"}},[a("el-input",{staticStyle:{"margin-left":"18px"},attrs:{placeholder:"请输入最高库存",clearable:""},model:{value:e.personalForm.upStock,callback:function(t){e.$set(e.personalForm,"upStock",t)},expression:"personalForm.upStock"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("WarehouseAdjust.downStock"),prop:"downStock"}},[a("el-input",{staticStyle:{"margin-left":"18px"},attrs:{placeholder:"请输入最低库存",clearable:""},model:{value:e.personalForm.downStock,callback:function(t){e.$set(e.personalForm,"downStock",t)},expression:"personalForm.downStock"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("WarehouseAdjust.safeStock"),prop:"safeStock"}},[a("el-input",{staticStyle:{"margin-left":"18px"},attrs:{placeholder:"请输入安全库存",clearable:""},model:{value:e.personalForm.safeStock,callback:function(t){e.$set(e.personalForm,"safeStock",t)},expression:"personalForm.safeStock"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:e.$t("WarehouseAdjust.productId"),prop:"productId"}},[a("el-input",{staticStyle:{"margin-left":"18px"},attrs:{placeholder:"请选择商品",clearable:""},on:{focus:e.handleAddproduct},model:{value:e.productId,callback:function(t){e.productId=t},expression:"productId"}}),e._v(" "),a("my-product",{attrs:{control:e.control},on:{"update:control":function(t){e.control=t},product:e.productdetail}})],1)],1)],1)],1)],1)]),e._v(" "),a("div",{staticClass:"buttons",staticStyle:{"margin-top":"20px"}},[a("el-button",{staticStyle:{background:"#3696fd","border-color":"#3696fd",width:"98px"},attrs:{type:"primary"},on:{click:function(t){e.handlesave()}}},[e._v("保存")]),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.handlecancel()}}},[e._v("取消")])],1)],1)])},[],!1,null,"7a106fe5",null));v.options.__file="AddStockAlarm.vue";t.default=v.exports},nRtH:function(e,t,a){}}]);