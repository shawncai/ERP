(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-8ed3"],{"4pCK":function(e,t,i){},"6nOx":function(e,t,i){"use strict";var a=i("fxUU");i.n(a).a},J4oj:function(e,t,i){"use strict";i.d(t,"a",function(){return l}),i.d(t,"c",function(){return n}),i.d(t,"d",function(){return r}),i.d(t,"e",function(){return o}),i.d(t,"b",function(){return s});var a=i("t3Un");function l(e,t,i){var l=new URLSearchParams;return l.append("materialsListJson",e),l.append("materialsListDetailJson",t),""!==i.repositoryId&&null!==i.repositoryId&&void 0!==i.repositoryId&&l.append("repositoryId",i.repositoryId),""!==i.regionId&&null!==i.regionId&&void 0!==i.regionId&&l.append("regionId",i.regionId),Object(a.a)({url:"/erp/materialslist/addmaterials",method:"post",data:l})}function n(e){var t=new URLSearchParams;return""!==e.materialsId&&null!==e.materialsId&&void 0!==e.materialsId&&t.append("materialsId",e.materialsId),""!==e.bomNumber&&null!==e.bomNumber&&void 0!==e.bomNumber&&t.append("bomNumber",e.bomNumber),""!==e.bomTypeId&&null!==e.bomTypeId&&void 0!==e.bomTypeId&&t.append("bomTypeId",e.bomTypeId),t.append("pageNum",e.pageNum),t.append("pageSize",e.pageSize),Object(a.a)({url:"/erp/materialslist/materialslist",method:"post",data:t})}function r(e,t){var i=new URLSearchParams;return i.append("materialsListJson",e),i.append("materialsListDetailJson",t),Object(a.a)({url:"/erp/materialslist/updatematerials",method:"post",data:i})}function o(e,t,i){var l=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&l.append("id",e.id),""!==i&&null!==i&&void 0!==i&&l.append("judgePersonId",i),""!==t&&null!==t&&void 0!==t&&l.append("judgeStat",t),Object(a.a)({url:"/erp/materialslist/updatematerials",method:"post",data:l})}function s(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("materialsIds",e),Object(a.a)({url:"/erp/materialslist/deletematerials",method:"post",data:t})}},Se7q:function(e,t,i){"use strict";var a=i("4pCK");i.n(a).a},fxUU:function(e,t,i){},"gDS+":function(e,t,i){e.exports={default:i("oh+g"),__esModule:!0}},j2Jj:function(e,t,i){},"oh+g":function(e,t,i){var a=i("WEpk"),l=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return l.stringify.apply(l,arguments)}},sNbl:function(e,t,i){"use strict";var a=i("j2Jj");i.n(a).a},ufRi:function(e,t,i){"use strict";var a=i("VG0r"),l=i("ZySA"),n=i("Mz3J"),r=i("yo+U"),o=i("fNFo"),s={directives:{waves:l.a},components:{MyTree:o.a,MySupplier:r.a,Pagination:n.a},filters:{genderFilter:function(e){return{1:"男",2:"女"}[e]}},props:{control:{type:Boolean,default:!1}},data:function(){return{supplierid:"",empcontrol:!1,types:[],treecontrol:!1,categoryid:"",productVisible:this.control,visible2:!1,moreaction:"",list:[],total:0,tableKey:0,listLoading:!0,getemplist:{productid:"",code:"",productname:"",categoryid:"",typeid:"",isactive:"",Productid:"",pagenum:1,pagesize:10}}},watch:{control:function(){this.productVisible=this.control,console.log(this.control),this.getlist()}},created:function(){this.getlist()},methods:{getlist:function(){var e=this;this.listLoading=!0,Object(a.m)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)}),Object(a.o)(2).then(function(t){200===t.data.ret&&(e.types=t.data.data.content.list)})},restFilter:function(){this.categoryid="",this.getemplist.categoryid="",this.supplierid="",this.getemplist.supplierid=""},handleFilter:function(){var e=this;this.getemplist.pagenum=1,Object(a.m)(this.getemplist).then(function(t){200===t.data.ret?(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount,e.restFilter()):e.restFilter()})},handleSelectionChange:function(e){this.moreaction=e},handlechoose:function(){this.empcontrol=!0},supplierName:function(e){console.log(e),this.supplierid=e.supplierName,this.getemplist.supplierid=e.id},treechoose:function(){this.treecontrol=!0},tree:function(e){this.categoryid=e.categoryName,this.getemplist.categoryid=e.id},handleAdd:function(){this.$router.push("/Product/NewProduct"),this.productVisible=!1},handleAddTo:function(){this.productVisible=!1,console.log(this.moreaction);var e=this.moreaction.map(function(e){return{productCode:e.code,productName:e.productName,color:e.color,typeId:e.typeId,lossRate:0,quantity:0,isKey:"1",categoryId:e.categoryId,category:e.category,unit:e.purMeasu,productType:e.productType,typeIdname:e.productType}});console.log(e),this.$emit("product",e)}}},c=(i("6nOx"),i("KHd+")),p=Object(c.a)(s,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{attrs:{visible:e.productVisible,control:e.control,"close-on-press-escape":!1,top:"10px",title:"选择商品","append-to-body":""},on:{"update:visible":function(t){e.productVisible=t},close:function(t){e.$emit("update:control",!1)}}},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.code"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.code,callback:function(t){e.$set(e.getemplist,"code",t)},expression:"getemplist.code"}}),e._v(" "),i("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.productname"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.productname,callback:function(t){e.$set(e.getemplist,"productname",t)},expression:"getemplist.productname"}}),e._v(" "),i("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.supplierid"),clearable:""},on:{focus:e.handlechoose},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.supplierid,callback:function(t){e.supplierid=t},expression:"supplierid"}}),e._v(" "),i("my-supplier",{attrs:{control:e.empcontrol},on:{"update:control":function(t){e.empcontrol=t},supplierName:e.supplierName}}),e._v(" "),i("el-input",{staticClass:"filter-item",attrs:{placeholder:"物品分类",clearable:""},on:{focus:e.treechoose},model:{value:e.categoryid,callback:function(t){e.categoryid=t},expression:"categoryid"}}),e._v(" "),i("my-tree",{attrs:{treecontrol:e.treecontrol},on:{"update:treecontrol":function(t){e.treecontrol=t},tree:e.tree}}),e._v(" "),i("el-popover",{attrs:{placement:"bottom",width:"500",trigger:"manual"},model:{value:e.visible2,callback:function(t){e.visible2=t},expression:"visible2"}},[i("el-select",{staticStyle:{width:"40%",float:"left","margin-left":"20px"},attrs:{placeholder:"请选择规格型号",clearable:""},model:{value:e.getemplist.typeid,callback:function(t){e.$set(e.getemplist,"typeid",t)},expression:"getemplist.typeid"}},e._l(e.types,function(e,t){return i("el-option",{key:t,attrs:{label:e.categoryName,value:e.id}})})),e._v(" "),i("el-select",{staticStyle:{width:"40%",float:"right","margin-right":"20px"},attrs:{placeholder:"请选择上下架",clearable:""},model:{value:e.getemplist.isactive,callback:function(t){e.$set(e.getemplist,"isactive",t)},expression:"getemplist.isactive"}},[i("el-option",{attrs:{value:"1",label:"上1"}}),e._v(" "),i("el-option",{attrs:{value:"2",label:"下2"}})],1),e._v(" "),i("div",{staticClass:"seachbutton",staticStyle:{width:"100%",float:"right","margin-top":"20px"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{slot:"reference",type:"primary"},on:{click:function(t){e.visible2=!e.visible2}},slot:"reference"},[e._v(e._s(e.$t("public.filter"))),i("svg-icon",{staticStyle:{"margin-left":"4px"},attrs:{"icon-class":"shaixuan"}})],1)],1),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.code"),resizable:!1,prop:"code",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.code))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.productname"),resizable:!1,prop:"ProductName",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.productName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.categoryid"),resizable:!1,prop:"category",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.category))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.typeid"),resizable:!1,align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.productType))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.color"),resizable:!1,prop:"color",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.color))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.kpigrade"),resizable:!1,prop:"kpiGrade",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.kpiGrade))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.point"),resizable:!1,prop:"point",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.point))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.costprice"),resizable:!1,prop:"costPrice",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.costPrice))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.purchaseprice"),resizable:!1,prop:"purchasePrice",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.purchasePrice))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.createid"),resizable:!1,prop:"createName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.createName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.createTime"),resizable:!1,prop:"createTime",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.createTime))])]}}])})],1),e._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],staticStyle:{padding:"0"},attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.getlist}}),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"text-align":"center"},attrs:{type:"success"},on:{click:e.handleAddTo}},[e._v("确认添加")])],1)],1)},[],!1,null,"2f08d3cd",null);p.options.__file="MyDetail.vue";t.a=p.exports},"yo+U":function(e,t,i){"use strict";var a=i("6HaC"),l=i("/PQ/"),n=i("ZySA"),r=i("Mz3J"),o={directives:{waves:n.a},components:{Pagination:r.a},filters:{genderFilter:function(e){return{1:"男",2:"女"}[e]}},props:{control:{type:Boolean,default:!1}},data:function(){return{visible2:!1,choosedata:"",moreaction:"",levelIds:[],typeIds:[],downloadLoading:!1,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{id:"",supplierName:"",typeId:"",regionId:"",levelId:"",pagenum:1,pagesize:10},depts:[],props:{value:"id",label:"regionName",children:"regionListVos"},regions:[],getemplistregions:[],repositories:[],employeeVisible:this.control,regionManagerVisible:!1}},watch:{control:function(){this.employeeVisible=this.control}},created:function(){this.getlist()},methods:{getlist:function(){var e=this;this.listLoading=!0,Object(l.h)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)}),Object(l.i)(1).then(function(t){200===t.data.ret&&(e.typeIds=t.data.data.content.list)}),Object(l.i)(4).then(function(t){200===t.data.ret&&(e.levelIds=t.data.data.content.list)}),Object(a.h)().then(function(t){200===t.data.ret&&(e.regions=e.tranKTree(t.data.data.content))})},tranKTree:function(e){var t=this;if(e&&e.length)return e.map(function(e){return{id:e.id,regionName:e.regionName,regionListVos:t.tranKTree(e.regionListVos)}})},handleFilter:function(){var e=this;this.getemplist.pagenum=1,this.getemplist.regionId=this.getemplistregions[this.getemplistregions.length-1],Object(l.h)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount)})},handleAdd:function(){this.$router.push("/Supplier/NewSupplier")},handlechange4:function(e){var t=this;console.log(e);var i=e[e.length-1];Object(a.i)(i).then(function(e){200===e.data.ret&&(console.log(e),t.repositories=e.data.data.content.list)})},handleConfirm:function(){this.employeeVisible=!1,this.$emit("supplierName",this.choosedata)},handleCurrentChange:function(e){this.choosedata=e}}},s=(i("Se7q"),i("KHd+")),c=Object(s.a)(o,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{attrs:{visible:e.employeeVisible,control:e.control,"close-on-press-escape":!1,top:"10px",title:"选择供应商","append-to-body":""},on:{"update:visible":function(t){e.employeeVisible=t},close:function(t){e.$emit("update:control",!1)}}},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Supplier.id"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.id,callback:function(t){e.$set(e.getemplist,"id",t)},expression:"getemplist.id"}}),e._v(" "),i("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Supplier.supplierName"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.supplierName,callback:function(t){e.$set(e.getemplist,"supplierName",t)},expression:"getemplist.supplierName"}}),e._v(" "),i("el-select",{staticClass:"filter-item",attrs:{value:e.getemplist.typeId,placeholder:"请选择供应商",clearable:""},model:{value:e.getemplist.typeId,callback:function(t){e.$set(e.getemplist,"typeId",t)},expression:"getemplist.typeId"}},e._l(e.typeIds,function(e,t){return i("el-option",{key:t,attrs:{label:e.categoryName,value:e.id}})})),e._v(" "),i("el-popover",{attrs:{placement:"bottom",width:"500",trigger:"manual"},model:{value:e.visible2,callback:function(t){e.visible2=t},expression:"visible2"}},[i("el-cascader",{staticStyle:{width:"40%",float:"left","margin-left":"20px"},attrs:{options:e.regions,props:e.props,"show-all-levels":!1,placeholder:"所在区域","change-on-select":"",filterable:"",clearable:""},on:{change:e.handlechange4},model:{value:e.getemplistregions,callback:function(t){e.getemplistregions=t},expression:"getemplistregions"}}),e._v(" "),i("el-select",{staticStyle:{width:"40%",float:"right","margin-right":"20px"},attrs:{placeholder:"请选择优质级别",clearable:""},model:{value:e.getemplist.levelId,callback:function(t){e.$set(e.getemplist,"levelId",t)},expression:"getemplist.levelId"}},e._l(e.levelIds,function(e,t){return i("el-option",{key:t,attrs:{label:e.categoryName,value:e.id}})})),e._v(" "),i("div",{staticClass:"seachbutton",staticStyle:{width:"100%",float:"right","margin-top":"20px"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{slot:"reference",type:"primary"},on:{click:function(t){e.visible2=!e.visible2}},slot:"reference"},[e._v(e._s(e.$t("public.filter"))),i("svg-icon",{staticStyle:{"margin-left":"4px"},attrs:{"icon-class":"shaixuan"}})],1)],1),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px",float:"right"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"current-change":e.handleCurrentChange}},[i("el-table-column",{attrs:{label:e.$t("Supplier.id"),resizable:!1,prop:"id",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Supplier.supplierName"),resizable:!1,prop:"supplierName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.supplierName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Supplier.supplierShortName"),resizable:!1,prop:"supplierShortName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.supplierShortName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Supplier.typeId"),resizable:!1,align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.typeName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Supplier.regionId"),resizable:!1,prop:"regionName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.regionName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Supplier.buyerId"),resizable:!1,prop:"buyerName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.buyerName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Supplier.levelId"),resizable:!1,prop:"levelName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.levelName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Supplier.createId"),resizable:!1,prop:"createId",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.createName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Supplier.createTime"),resizable:!1,prop:"createTime",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.createTime))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("public.actions"),resizable:!1,align:"center","min-width":"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){e.handleEdit(t.row)}}},[e._v(e._s(e.$t("public.edit")))]),e._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){e.handleDelete(t.row)}}},[e._v(e._s(e.$t("public.delete")))])]}}])})],1),e._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.getlist}}),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"success"},on:{click:e.handleConfirm}},[e._v("确认添加")])],1)},[],!1,null,"308c523a",null);c.options.__file="MySupplier.vue";t.a=c.exports},z1Ei:function(e,t,i){"use strict";var a=i("VG0r"),l=i("ZySA"),n=i("Mz3J"),r=i("yo+U"),o=i("fNFo"),s={directives:{waves:l.a},components:{MyTree:o.a,MySupplier:r.a,Pagination:n.a},filters:{genderFilter:function(e){return{1:"男",2:"女"}[e]}},props:{matercontrol:{type:Boolean,default:!1}},data:function(){return{supplierid:"",empcontrol:!1,types:[],treecontrol:!1,categoryid:"",productVisible:this.matercontrol,visible2:!1,moreaction:"",list:[],total:0,tableKey:0,listLoading:!0,getemplist:{productid:"",code:"",productname:"",categoryid:"",typeid:"",isactive:"",Productid:"",pagenum:1,pagesize:10}}},watch:{matercontrol:function(){this.productVisible=this.matercontrol,this.getlist()}},created:function(){this.getlist()},methods:{getlist:function(){var e=this;this.listLoading=!0,Object(a.m)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)}),Object(a.o)(2).then(function(t){200===t.data.ret&&(e.types=t.data.data.content.list)})},restFilter:function(){this.categoryid="",this.getemplist.categoryid="",this.supplierid="",this.getemplist.supplierid=""},handleFilter:function(){var e=this;this.getemplist.pagenum=1,Object(a.m)(this.getemplist).then(function(t){200===t.data.ret?(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount,e.restFilter()):e.restFilter()})},handlechoose:function(){this.empcontrol=!0},supplierName:function(e){console.log(e),this.supplierid=e.supplierName,this.getemplist.supplierid=e.id},treechoose:function(){this.treecontrol=!0},tree:function(e){this.categoryid=e.categoryName,this.getemplist.categoryid=e.id},handleAdd:function(){this.$router.push("/Product/NewProduct"),this.productVisible=!1},handleCurrentChange:function(e){this.moreaction=e},handleAddTo:function(){this.productVisible=!1,this.$emit("mater",this.moreaction)}}},c=(i("sNbl"),i("KHd+")),p=Object(c.a)(s,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{attrs:{visible:e.productVisible,matercontrol:e.matercontrol,"close-on-press-escape":!1,top:"10px",title:"选择商品","append-to-body":""},on:{"update:visible":function(t){e.productVisible=t},close:function(t){e.$emit("update:matercontrol",!1)}}},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.code"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.code,callback:function(t){e.$set(e.getemplist,"code",t)},expression:"getemplist.code"}}),e._v(" "),i("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.productname"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.productname,callback:function(t){e.$set(e.getemplist,"productname",t)},expression:"getemplist.productname"}}),e._v(" "),i("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Product.supplierid"),clearable:""},on:{focus:e.handlechoose},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.supplierid,callback:function(t){e.supplierid=t},expression:"supplierid"}}),e._v(" "),i("my-supplier",{attrs:{control:e.empcontrol},on:{"update:control":function(t){e.empcontrol=t},supplierName:e.supplierName}}),e._v(" "),i("el-input",{staticClass:"filter-item",attrs:{placeholder:"物品分类",clearable:""},on:{focus:e.treechoose},model:{value:e.categoryid,callback:function(t){e.categoryid=t},expression:"categoryid"}}),e._v(" "),i("my-tree",{attrs:{treecontrol:e.treecontrol},on:{"update:treecontrol":function(t){e.treecontrol=t},tree:e.tree}}),e._v(" "),i("el-popover",{attrs:{placement:"bottom",width:"500",trigger:"manual"},model:{value:e.visible2,callback:function(t){e.visible2=t},expression:"visible2"}},[i("el-select",{staticStyle:{width:"40%",float:"left","margin-left":"20px"},attrs:{placeholder:"请选择规格型号",clearable:""},model:{value:e.getemplist.typeid,callback:function(t){e.$set(e.getemplist,"typeid",t)},expression:"getemplist.typeid"}},e._l(e.types,function(e,t){return i("el-option",{key:t,attrs:{label:e.categoryName,value:e.id}})})),e._v(" "),i("el-select",{staticStyle:{width:"40%",float:"right","margin-right":"20px"},attrs:{placeholder:"请选择上下架",clearable:""},model:{value:e.getemplist.isactive,callback:function(t){e.$set(e.getemplist,"isactive",t)},expression:"getemplist.isactive"}},[i("el-option",{attrs:{value:"1",label:"上1"}}),e._v(" "),i("el-option",{attrs:{value:"2",label:"下2"}})],1),e._v(" "),i("div",{staticClass:"seachbutton",staticStyle:{width:"100%",float:"right","margin-top":"20px"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{slot:"reference",type:"primary"},on:{click:function(t){e.visible2=!e.visible2}},slot:"reference"},[e._v(e._s(e.$t("public.filter"))),i("svg-icon",{staticStyle:{"margin-left":"4px"},attrs:{"icon-class":"shaixuan"}})],1)],1),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"current-change":e.handleCurrentChange}},[i("el-table-column",{attrs:{label:e.$t("Product.code"),resizable:!1,prop:"code",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.code))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.productname"),resizable:!1,prop:"ProductName",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.productName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.categoryid"),resizable:!1,prop:"category",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.category))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.typeid"),resizable:!1,align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.productType))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.color"),resizable:!1,prop:"color",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.color))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.kpigrade"),resizable:!1,prop:"kpiGrade",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.kpiGrade))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.point"),resizable:!1,prop:"point",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.point))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.costprice"),resizable:!1,prop:"costPrice",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.costPrice))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.purchaseprice"),resizable:!1,prop:"purchasePrice",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.purchasePrice))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.createid"),resizable:!1,prop:"createName",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.createName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("Product.createTime"),resizable:!1,prop:"createTime",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.createTime))])]}}])})],1),e._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],staticStyle:{padding:"0"},attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.getlist}}),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"text-align":"center"},attrs:{type:"success"},on:{click:e.handleAddTo}},[e._v("确认添加")])],1)],1)},[],!1,null,"169e1ef4",null);p.options.__file="MyMater.vue";t.a=p.exports}}]);