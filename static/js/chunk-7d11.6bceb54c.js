(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7d11"],{"8U+6":function(e,t,a){"use strict";var r=a("IoXm");a.n(r).a},IoXm:function(e,t,a){},QekO:function(e,t,a){"use strict";var r=a("lQl5");a.n(r).a},lQl5:function(e,t,a){},"zlt+":function(e,t,a){"use strict";a.r(t);var r=a("P2sY"),o=a.n(r),i=a("VG0r"),l=a("ZySA"),s=a("Mz3J"),n={components:{MyEmp:a("777i").a},props:{control:{type:Boolean,default:!1},editdata:{type:Object,default:null}},data:function(){return{editVisible:this.control,personalForm:this.editdata,empcontrol:!1,adjustpersonid:"",personalrules:{title:[{required:!0,message:"请输入变更单主题",trigger:"blur"}],productName:[{required:!0,message:"请输入物品名称",trigger:"blur"}],productCode:[{required:!0,message:"请输入物品编码",trigger:"blur"}]}}},watch:{control:function(){this.editVisible=this.control},editdata:function(){this.personalForm=this.editdata,this.adjustpersonid=this.editdata.adjustPersonName,console.log(this.editdata)}},methods:{handlechoose:function(){this.empcontrol=!0},personName:function(e){console.log(e),this.adjustpersonid=e.personName,this.personalForm.adjustpersonid=e.id},handleEditok:function(){var e=this;console.log(this.personalForm),Object(i.n)(this.personalForm).then(function(t){200===t.data.ret?(e.$notify({title:"操作成功",message:"操作成功",type:"success",duration:1e3,offset:100}),e.$emit("rest",!0),e.restAllForm(),e.$refs.personalForm.clearValidate(),e.$refs.personalForm.resetFields(),e.editVisible=!1):e.$notify.error({title:"错误",message:"出错了",offset:100})})},handlecancel:function(){this.restAllForm(),this.$refs.personalForm.clearValidate(),this.$refs.personalForm.resetFields(),this.editVisible=!1},restAllForm:function(){this.personalForm={title:"",productname:"",productcode:"",costprice:"",tradeprice:"",saleprice:"",memberprice:"",lowerprice:"",adjustcostprice:"",adjusttradeprice:"",adjustsaleprice:"",adjustmemberprice:"",adjustlowerprice:"",adjustpersonid:"",adjustreason:""},this.adjustpersonid=""}}},c=(a("QekO"),a("KHd+")),d=Object(c.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.editVisible,control:e.control,editdata:e.editdata,"close-on-press-escape":!1,top:"10px",title:"修改价格变更单"},on:{"update:visible":function(t){e.editVisible=t},close:function(t){e.$emit("update:control",!1)}}},[a("h2",{ref:"geren",staticClass:"form-name"},[e._v("基本信息")]),e._v(" "),a("div",{staticClass:"container"},[a("el-form",{ref:"personalForm",staticClass:"demo-ruleForm",staticStyle:{"margin-left":"30px"},attrs:{model:e.personalForm,rules:e.personalrules,inline:!0,"status-icon":"","label-position":"top","label-width":"300px"}},[a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Product.title"),prop:"title"}},[a("el-input",{attrs:{placeholder:"请输入变更单主题",clearable:""},model:{value:e.personalForm.title,callback:function(t){e.$set(e.personalForm,"title",t)},expression:"personalForm.title"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Product.productname2")}},[a("el-input",{attrs:{placeholder:"请输入物品名称",disabled:""},model:{value:e.personalForm.productName,callback:function(t){e.$set(e.personalForm,"productName",t)},expression:"personalForm.productName"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Product.productcode")}},[a("el-input",{attrs:{disabled:""},model:{value:e.personalForm.productCode,callback:function(t){e.$set(e.personalForm,"productCode",t)},expression:"personalForm.productCode"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("StockAlarm.salePrice2")}},[a("el-input",{attrs:{disabled:""},model:{value:e.personalForm.salePrice,callback:function(t){e.$set(e.personalForm,"salePrice",t)},expression:"personalForm.salePrice"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Product.tradeprice2")}},[a("el-input",{attrs:{disabled:""},model:{value:e.personalForm.tradePrice,callback:function(t){e.$set(e.personalForm,"tradePrice",t)},expression:"personalForm.tradePrice"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Product.costprice2")}},[a("el-input",{attrs:{disabled:""},model:{value:e.personalForm.costPrice,callback:function(t){e.$set(e.personalForm,"costPrice",t)},expression:"personalForm.costPrice"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Product.memberprice2")}},[a("el-input",{attrs:{disabled:""},model:{value:e.personalForm.memberPrice,callback:function(t){e.$set(e.personalForm,"memberPrice",t)},expression:"personalForm.memberPrice"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Product.lowerprice2")}},[a("el-input",{attrs:{disabled:""},model:{value:e.personalForm.lowerPrice,callback:function(t){e.$set(e.personalForm,"lowerPrice",t)},expression:"personalForm.lowerPrice"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Product.adjustsaleprice")}},[a("el-input",{attrs:{placeholder:"请输入调整零售价",clearable:""},model:{value:e.personalForm.adjustSalePrice,callback:function(t){e.$set(e.personalForm,"adjustSalePrice",t)},expression:"personalForm.adjustSalePrice"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Product.adjusttradeprice")}},[a("el-input",{attrs:{placeholder:"请输入调整批发价",clearable:""},model:{value:e.personalForm.adjustTradePrice,callback:function(t){e.$set(e.personalForm,"adjustTradePrice",t)},expression:"personalForm.adjustTradePrice"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Product.adjustcostprice")}},[a("el-input",{attrs:{placeholder:"请输入调整成本价",clearable:""},model:{value:e.personalForm.adjustCostPrice,callback:function(t){e.$set(e.personalForm,"adjustCostPrice",t)},expression:"personalForm.adjustCostPrice"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Product.adjustmemberprice")}},[a("el-input",{attrs:{placeholder:"请输入调整会员价",clearable:""},model:{value:e.personalForm.adjustMemberPrice,callback:function(t){e.$set(e.personalForm,"adjustMemberPrice",t)},expression:"personalForm.adjustMemberPrice"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Product.adjustlowerprice")}},[a("el-input",{attrs:{placeholder:"请输入调整最低价",clearable:""},model:{value:e.personalForm.adjustLowerPrice,callback:function(t){e.$set(e.personalForm,"adjustLowerPrice",t)},expression:"personalForm.adjustLowerPrice"}})],1),e._v(" "),a("el-form-item",{staticStyle:{width:"40%","margin-top":"1%"},attrs:{label:e.$t("Product.adjustpersonid")}},[a("el-input",{attrs:{clearable:""},on:{focus:e.handlechoose},model:{value:e.adjustpersonid,callback:function(t){e.adjustpersonid=t},expression:"adjustpersonid"}})],1),a("br"),e._v(" "),a("my-emp",{attrs:{control:e.empcontrol},on:{"update:control":function(t){e.empcontrol=t},personName:e.personName}}),e._v(" "),a("el-form-item",{staticStyle:{width:"82%","margin-top":"1%"},attrs:{label:e.$t("Product.adjustreason")}},[a("el-input",{attrs:{type:"textarea",clearable:""},model:{value:e.personalForm.adjustReason,callback:function(t){e.$set(e.personalForm,"adjustReason",t)},expression:"personalForm.adjustReason"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"buttons",staticStyle:{"margin-top":"20px","margin-left":"30px"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handleEditok()}}},[e._v("修改")]),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:function(t){e.handlecancel()}}},[e._v("取消")])],1)])},[],!1,null,"175559fe",null);d.options.__file="MyAdjust.vue";var u=d.exports,p={name:"AdjustpriceList",directives:{waves:l.a},components:{Pagination:s.a,MyAdjust:u},filters:{genderFilter:function(e){return{1:"男",2:"女"}[e]}},data:function(){return{groupName:"",groupData:[],GroupVisible:!1,moreaction:"",levelIds:[],typeIds:[],downloadLoading:!1,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{adjustid:"",adjustnumber:"",productcode:"",productname:"",stat:"",pagenum:1,pagesize:10},depts:[],props:{value:"id",label:"regionName",children:"regionListVos"},regions:[],getemplistregions:[],repositories:[],personalForm:{},editVisible:!1}},mounted:function(){this.getlist()},methods:{getlist:function(){var e=this;this.listLoading=!0,Object(i.c)(this.getemplist).then(function(t){200===t.data.ret?(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount):e.$notify.error({title:"错误",message:"出错了",offset:100}),setTimeout(function(){e.listLoading=!1},50)})},handleFilter:function(){var e=this;this.getemplist.pagenum=1,Object(i.c)(this.getemplist).then(function(t){200===t.data.ret?(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount):e.$notify.error({title:"错误",message:"出错了",offset:100})})},handleEdit:function(e){console.log(e),this.editVisible=!0,this.personalForm=o()({},e)},refreshlist:function(e){!0===e&&this.getlist()},handleSelectionChange:function(e){this.moreaction=e},handleCommand:function(e){var t=this,a=this.moreaction.map(function(e){return e.id}).join();"delete"===e&&this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.f)(a).then(function(e){200===e.data.ret?(t.$notify({title:"删除成功",type:"success",offset:100}),t.getlist()):t.$notify.error({title:"错误",message:"出错了",offset:100})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.f)(e.id).then(function(e){200===e.data.ret?(t.$notify({title:"删除成功",type:"success",offset:100}),t.getlist()):t.$notify.error({title:"错误",message:"出错了",offset:100})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},handleAdd:function(){this.$router.push("/Product/Newadjustprice")},handleExport:function(){var e=this;this.downloadLoading=!0,Promise.all([a.e("chunk-ef4a"),a.e("chunk-6b3a")]).then(a.bind(null,"S/jZ")).then(function(t){var a=e.formatJson(["id","ProductName","ProductShortName","typeName","regionName","buyerName","levelName","createName","createTime"],e.list);t.export_json_to_excel({header:["供应商编号","供应商名称","供应商简称","供应商类别","所在区域","采购员","供应商优质级别","建档人","建档日期"],data:a,filename:"经销商资料表"}),e.downloadLoading=!1})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return t[e]})})},handlePrint:function(){console.log(456)}}},m=(a("8U+6"),Object(c.a)(p,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ERP-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"9%"},attrs:{placeholder:e.$t("Product.adjustnumber"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.adjustnumber,callback:function(t){e.$set(e.getemplist,"adjustnumber",t)},expression:"getemplist.adjustnumber"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.productcode"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.productcode,callback:function(t){e.$set(e.getemplist,"productcode",t)},expression:"getemplist.productcode"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.productname2"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.productname,callback:function(t){e.$set(e.getemplist,"productname",t)},expression:"getemplist.productname"}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),a("el-dropdown",{on:{command:e.handleCommand}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary"}},[e._v("\n        "+e._s(e.$t("public.batchoperation"))+" "),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),a("el-dropdown-menu",{staticStyle:{width:"140px"},attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{staticStyle:{"text-align":"left"},attrs:{command:"delete"}},[a("svg-icon",{staticStyle:{width:"40px"},attrs:{"icon-class":"shanchu"}}),e._v(e._s(e.$t("public.delete")))],1)],1)],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{loading:e.downloadLoading},on:{click:e.handleExport}},[a("svg-icon",{attrs:{"icon-class":"daochu"}}),e._v(e._s(e.$t("public.export")))],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-printer"},on:{click:e.handlePrint}},[e._v(e._s(e.$t("public.print")))]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px",float:"right"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),a("div",{staticClass:"app-container"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.id"),resizable:!1,prop:"adjustNumber",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.adjustNumber))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.title"),resizable:!1,prop:"title",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.title))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.productCode"),resizable:!1,prop:"productCode",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.productCode))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.productname2"),resizable:!1,align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.productName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.adjustCostPrice"),resizable:!1,prop:"adjustCostPrice",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.adjustCostPrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.adjustTradePrice"),resizable:!1,prop:"adjustTradePrice",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.adjustTradePrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.adjustSalePrice"),resizable:!1,prop:"adjustSalePrice",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.adjustSalePrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.adjustMemberPrice"),resizable:!1,prop:"adjustMemberPrice",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.adjustMemberPrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Product.adjustLowerPrice"),resizable:!1,prop:"adjustLowerPrice",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.adjustLowerPrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("public.actions"),resizable:!1,align:"center","min-width":"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.handleEdit(t.row)}}},[e._v(e._s(e.$t("public.edit")))]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v(e._s(e.$t("public.delete")))])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.getlist}}),e._v(" "),a("my-adjust",{attrs:{control:e.editVisible,editdata:e.personalForm},on:{"update:control":function(t){e.editVisible=t},"update:editdata":function(t){e.personalForm=t},rest:e.refreshlist}})],1)])},[],!1,null,"396f9e98",null));m.options.__file="AdjustpriceList.vue";t.default=m.exports}}]);