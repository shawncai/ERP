(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-477b"],{QYte:function(e,t,i){"use strict";var n=i("bWde");i.n(n).a},Wduy:function(e,t,i){"use strict";i.r(t);var n=i("moiu"),a=i("ZySA"),o=i("Mz3J"),l={name:"Measurement",directives:{waves:a.a},components:{Pagination:o.a},filters:{genderFilter:function(e){return{1:"已启用",2:"停用"}[e]},typeFilter:function(e){return{1:"数量",2:"体积",3:"重量"}[e]}},data:function(){return{editNumberingform:"",Numberingform:{category:"",categoryname:"",type:"",iseffective:null},editNumberingVisible:!1,addNumberingVisible:!1,editVisible:!1,moreaction:"",downloadLoading:!1,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{categoryname:"",type:"",iseffective:"",pagenum:1,pagesize:10}}},mounted:function(){this.getlist()},methods:{getlist:function(){var e=this;this.listLoading=!0,Object(n.r)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content,e.total=t.data.data.content.length),setTimeout(function(){e.listLoading=!1},50)})},handleFilter:function(){var e=this;Object(n.r)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content,e.total=t.data.data.content.length)})},handleEdit:function(e){console.log(e),this.editNumberingform=e,this.editNumberingform.isEffective=String(e.isEffective),this.editNumberingform.type=String(e.type),this.editNumberingVisible=!0},handleEditOk:function(){var e=this;console.log(this.editNumberingform),Object(n.x)(this.editNumberingform).then(function(t){200===t.data.ret?(e.$notify({title:"修改成功",type:"success",offset:100}),e.getlist(),e.editNumberingVisible=!1):e.$notify.error({title:"错误",message:t.data.msg,offset:100})})},handleSelectionChange:function(e){this.moreaction=e},handleCommand:function(e){var t=this,i=this.moreaction.map(function(e){return e.id}).join();"delete"===e&&this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.j)(i).then(function(e){200===e.data.ret?(t.$notify({title:"删除成功",type:"success",offset:100}),t.getlist()):t.$notify.error({title:"错误",message:"出错了",offset:100})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.j)(e.id).then(function(e){200===e.data.ret?(t.$notify({title:"删除成功",type:"success",offset:100}),t.getlist()):t.$notify.error({title:"错误",message:"出错了",offset:100})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},restNumberingform:function(){this.Numberingform={category:"",type:"",iseffective:null}},handleAdd:function(){this.addNumberingVisible=!0},handleOk:function(){var e=this;Object(n.f)(this.Numberingform).then(function(t){200===t.data.ret?(e.$notify({title:"新增成功",type:"success",offset:100}),e.getlist(),e.restNumberingform(),e.addNumberingVisible=!1):e.$notify.error({title:"错误",message:t.data.msg,offset:100})})},handleExport:function(){var e=this;this.downloadLoading=!0,Promise.all([i.e("chunk-ef4a"),i.e("chunk-73bb")]).then(i.bind(null,"S/jZ")).then(function(t){var i=e.formatJson(["id","ruleName","type","prefix","dateType","length","isEffective","createTime"],e.list);t.export_json_to_excel({header:["序号","编号规则名称","单据类型","编号前缀","日期类型","流水号长度","状态","创建日期"],data:i,filename:"编号规则资料表"}),e.downloadLoading=!1})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return t[e]})})},handlePrint:function(){console.log(456)}}},r=(i("QYte"),i("KHd+")),s=Object(r.a)(l,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"ERP-container"},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("BasicSettings.categoryname"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.categoryname,callback:function(t){e.$set(e.getemplist,"categoryname",t)},expression:"getemplist.categoryname"}}),e._v(" "),i("el-select",{staticClass:"filter-item",attrs:{placeholder:e.$t("BasicSettings.type2"),clearable:""},model:{value:e.getemplist.type,callback:function(t){e.$set(e.getemplist,"type",t)},expression:"getemplist.type"}},[i("el-option",{attrs:{value:"1",label:"数量"}}),e._v(" "),i("el-option",{attrs:{value:"2",label:"体积"}}),e._v(" "),i("el-option",{attrs:{value:"3",label:"重量"}})],1),e._v(" "),i("el-select",{staticClass:"filter-item",attrs:{placeholder:e.$t("BasicSettings.iseffective3"),clearable:""},model:{value:e.getemplist.iseffective,callback:function(t){e.$set(e.getemplist,"iseffective",t)},expression:"getemplist.iseffective"}},[i("el-option",{attrs:{value:"1",label:"启用"}}),e._v(" "),i("el-option",{attrs:{value:"2",label:"禁用"}})],1),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),i("el-dropdown",{on:{command:e.handleCommand}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary"}},[e._v("\n        "+e._s(e.$t("public.batchoperation"))+" "),i("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),i("el-dropdown-menu",{staticStyle:{width:"140px"},attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{staticStyle:{"text-align":"left"},attrs:{command:"delete"}},[i("svg-icon",{staticStyle:{width:"40px"},attrs:{"icon-class":"shanchu"}}),e._v(e._s(e.$t("public.delete")))],1)],1)],1),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{loading:e.downloadLoading},on:{click:e.handleExport}},[i("svg-icon",{attrs:{"icon-class":"daochu"}}),e._v(e._s(e.$t("public.export")))],1),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-printer"},on:{click:e.handlePrint}},[e._v(e._s(e.$t("public.print")))]),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px",float:"right"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))]),e._v(" "),i("el-dialog",{attrs:{visible:e.addNumberingVisible,title:"新建计量单位",width:"500px"},on:{"update:visible":function(t){e.addNumberingVisible=t}}},[i("el-form",{staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:e.Numberingform,"label-position":"left","label-width":"120px"}},[i("el-form-item",{attrs:{"label-width":"120px",label:"计量单位名称"}},[i("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入计量单位名称",autocomplete:"off"},model:{value:e.Numberingform.categoryname,callback:function(t){e.$set(e.Numberingform,"categoryname",t)},expression:"Numberingform.categoryname"}})],1),e._v(" "),i("el-form-item",{attrs:{"label-width":"120px",label:"计量单位类别"}},[i("el-select",{attrs:{placeholder:"请选择计量单位类别"},model:{value:e.Numberingform.type,callback:function(t){e.$set(e.Numberingform,"type",t)},expression:"Numberingform.type"}},[i("el-option",{attrs:{label:"数量",value:"1"}}),e._v(" "),i("el-option",{attrs:{label:"体积",value:"2"}}),e._v(" "),i("el-option",{attrs:{label:"重量",value:"3"}})],1)],1),e._v(" "),i("el-form-item",{attrs:{"label-width":"120px",label:"启用状态"}},[i("el-select",{attrs:{placeholder:"请选择启用状态"},model:{value:e.Numberingform.iseffective,callback:function(t){e.$set(e.Numberingform,"iseffective",t)},expression:"Numberingform.iseffective"}},[i("el-option",{attrs:{label:"启用",value:"1"}}),e._v(" "),i("el-option",{attrs:{label:"禁用",value:"2"}})],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.addNumberingVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.handleOk}},[e._v("确 定")])],1)],1)],1),e._v(" "),i("div",{staticClass:"app-container"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("BasicSettings.categoryname"),resizable:!1,prop:"categoryName",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.categoryName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("BasicSettings.type2"),resizable:!1,prop:"type",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(e._f("typeFilter")(t.row.type)))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("BasicSettings.iseffective"),resizable:!1,prop:"isEffective",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(e._f("genderFilter")(t.row.isEffective)))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("BasicSettings.createTime"),resizable:!1,prop:"createTime",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.createTime))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:e.$t("public.actions"),resizable:!1,align:"center","min-width":"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){e.handleEdit(t.row)}}},[e._v(e._s(e.$t("public.edit")))]),e._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){e.handleDelete(t.row)}}},[e._v(e._s(e.$t("public.delete")))])]}}])})],1),e._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.getlist}}),e._v(" "),i("el-dialog",{attrs:{visible:e.editNumberingVisible,title:"修改计量单位",width:"500px"},on:{"update:visible":function(t){e.editNumberingVisible=t}}},[i("el-form",{staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:e.editNumberingform,"label-position":"left","label-width":"120px"}},[i("el-form-item",{attrs:{"label-width":"120px",label:"计量单位名称"}},[i("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入计量单位名称",autocomplete:"off"},model:{value:e.editNumberingform.categoryName,callback:function(t){e.$set(e.editNumberingform,"categoryName",t)},expression:"editNumberingform.categoryName"}})],1),e._v(" "),i("el-form-item",{attrs:{"label-width":"120px",label:"计量单位类别"}},[i("el-select",{attrs:{placeholder:"请选择计量单位类别",disabled:""},model:{value:e.editNumberingform.type,callback:function(t){e.$set(e.editNumberingform,"type",t)},expression:"editNumberingform.type"}},[i("el-option",{attrs:{label:"数量",value:"1"}}),e._v(" "),i("el-option",{attrs:{label:"体积",value:"2"}}),e._v(" "),i("el-option",{attrs:{label:"重量",value:"3"}})],1)],1),e._v(" "),i("el-form-item",{attrs:{"label-width":"120px",label:"启用状态"}},[i("el-select",{attrs:{placeholder:"请选择启用状态"},model:{value:e.editNumberingform.isEffective,callback:function(t){e.$set(e.editNumberingform,"isEffective",t)},expression:"editNumberingform.isEffective"}},[i("el-option",{attrs:{label:"启用",value:"1"}}),e._v(" "),i("el-option",{attrs:{label:"禁用",value:"2"}})],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.editNumberingVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.handleEditOk}},[e._v("修改")])],1)],1)],1)])},[],!1,null,"51328c14",null);s.options.__file="Measurement.vue";t.default=s.exports},Y5bG:function(e,t,i){"use strict";i.d(t,"a",function(){return a}),Math.easeInOutQuad=function(e,t,i,n){return(e/=n/2)<1?i/2*e*e+t:-i/2*(--e*(e-2)-1)+t};var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function a(e,t,i){var a=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,o=e-a,l=0;t=void 0===t?500:t;!function e(){l+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(l,a,o,t)),l<t?n(e):i&&"function"==typeof i&&i()}()}},ZySA:function(e,t,i){"use strict";var n=i("P2sY"),a=i.n(n),o=(i("jUE0"),{bind:function(e,t){e.addEventListener("click",function(i){var n=a()({},t.value),o=a()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),l=o.ele;if(l){l.style.position="relative",l.style.overflow="hidden";var r=l.getBoundingClientRect(),s=l.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":((s=document.createElement("span")).className="waves-ripple",s.style.height=s.style.width=Math.max(r.width,r.height)+"px",l.appendChild(s)),o.type){case"center":s.style.top=r.height/2-s.offsetHeight/2+"px",s.style.left=r.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(i.pageY-r.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(i.pageX-r.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=o.color,s.className="waves-ripple z-active",!1}},!1)}}),l=function(e){e.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(l)),o.install=l;t.a=o},bWde:function(e,t,i){},jUE0:function(e,t,i){},moiu:function(e,t,i){"use strict";i.d(t,"t",function(){return a}),i.d(t,"p",function(){return o}),i.d(t,"h",function(){return l}),i.d(t,"c",function(){return r}),i.d(t,"u",function(){return s}),i.d(t,"n",function(){return c}),i.d(t,"b",function(){return d}),i.d(t,"y",function(){return p}),i.d(t,"k",function(){return u}),i.d(t,"r",function(){return f}),i.d(t,"f",function(){return m}),i.d(t,"x",function(){return v}),i.d(t,"j",function(){return g}),i.d(t,"o",function(){return y}),i.d(t,"l",function(){return h}),i.d(t,"e",function(){return b}),i.d(t,"d",function(){return _}),i.d(t,"q",function(){return w}),i.d(t,"s",function(){return N}),i.d(t,"g",function(){return x}),i.d(t,"w",function(){return S}),i.d(t,"m",function(){return E}),i.d(t,"a",function(){return k}),i.d(t,"v",function(){return j}),i.d(t,"i",function(){return $});var n=i("t3Un");function a(){return Object(n.a)({url:"/erp/NumberingRules/searchcategory",method:"post"})}function o(e){var t=new URLSearchParams;return""!==e.ruleName&&null!==e.ruleName&&void 0!==e.ruleName&&t.append("ruleName",e.ruleName),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(n.a)({url:"/erp/NumberingRules/search",method:"post",data:t})}function l(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("ids",e),Object(n.a)({url:"/erp/NumberingRules/delete",method:"post",data:t})}function r(e){var t=new URLSearchParams;return""!==e.ruleName&&null!==e.ruleName&&void 0!==e.ruleName&&t.append("ruleName",e.ruleName),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.prefix&&null!==e.prefix&&void 0!==e.prefix&&t.append("prefix",e.prefix),""!==e.dateType&&null!==e.dateType&&void 0!==e.dateType&&t.append("dateType",e.dateType),""!==e.length&&null!==e.length&&void 0!==e.length&&t.append("length",e.length),Object(n.a)({url:"/erp/NumberingRules/create",method:"post",data:t})}function s(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),""!==e.ruleName&&null!==e.ruleName&&void 0!==e.ruleName&&t.append("ruleName",e.ruleName),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.prefix&&null!==e.prefix&&void 0!==e.prefix&&t.append("prefix",e.prefix),""!==e.dateType&&null!==e.dateType&&void 0!==e.dateType&&t.append("dateType",e.dateType),""!==e.length&&null!==e.length&&void 0!==e.length&&t.append("length",e.length),Object(n.a)({url:"/erp/NumberingRules/update",method:"post",data:t})}function c(e){var t=new URLSearchParams;return""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.modelname&&null!==e.modelname&&void 0!==e.modelname&&t.append("modelname",e.modelname),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(n.a)({url:"/erp/messageModel/modellist",method:"post",data:t})}function d(e){var t=new URLSearchParams;return""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.modelname&&null!==e.modelname&&void 0!==e.modelname&&t.append("modelname",e.modelname),""!==e.content&&null!==e.content&&void 0!==e.content&&t.append("content",e.content),Object(n.a)({url:"/erp/messageModel/addmodel",method:"post",data:t})}function p(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("modelid",e.id),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.modelName&&null!==e.modelName&&void 0!==e.modelName&&t.append("modelname",e.modelName),""!==e.content&&null!==e.content&&void 0!==e.content&&t.append("content",e.content),Object(n.a)({url:"/erp/messageModel/updatemodel",method:"post",data:t})}function u(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("modelids",e),Object(n.a)({url:"/erp/messageModel/deletemodel",method:"post",data:t})}function f(e){var t=new URLSearchParams;return""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.categoryname&&null!==e.categoryname&&void 0!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(n.a)({url:"/erp/measurement/search",method:"post",data:t})}function m(e){var t=new URLSearchParams;return""!==e.category&&null!==e.category&&void 0!==e.category&&t.append("category",e.category),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.categoryname&&null!==e.categoryname&&void 0!==e.categoryname&&t.append("categoryname",e.categoryname),Object(n.a)({url:"/erp/measurement/create",method:"post",data:t})}function v(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.categoryName&&null!==e.categoryName&&void 0!==e.categoryName&&t.append("categoryname",e.categoryName),Object(n.a)({url:"/erp/measurement/update",method:"post",data:t})}function g(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("modelids",e),Object(n.a)({url:"/erp/measurement/delete",method:"post",data:t})}function y(){return Object(n.a)({url:"/erp/parameter/search",method:"post"})}function h(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&t.append("isEffective",e.isEffective),Object(n.a)({url:"/erp/parameter/effective",method:"post",data:t})}function b(e,t){var i=new URLSearchParams;return""!==e.process_name&&null!==e.process_name&&void 0!==e.process_name&&i.append("process_name",e.process_name),""!==e.type&&null!==e.type&&void 0!==e.type&&i.append("type",e.type),""!==e.is_message&&null!==e.is_message&&void 0!==e.is_message&&i.append("is_message",e.is_message),""!==e.is_effective&&null!==e.is_effective&&void 0!==e.is_effective&&i.append("is_effective",e.is_effective),""!==e.effect_region&&null!==e.effect_region&&void 0!==e.effect_region&&i.append("effect_region",e.effect_region),""!==e.effect_repository&&null!==e.effect_repository&&void 0!==e.effect_repository&&i.append("effect_repository",e.effect_repository),""!==e.country_id&&null!==e.country_id&&void 0!==e.country_id&&i.append("country_id",e.country_id),""!==t&&null!==t&&void 0!==t&&i.append("detailJson",t),Object(n.a)({url:"/erp/approvalProcess/create",method:"post",data:i})}function _(e){var t=new URLSearchParams;return""!==e.ruleName&&null!==e.ruleName&&void 0!==e.ruleName&&t.append("ruleName",e.ruleName),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.prefix&&null!==e.prefix&&void 0!==e.prefix&&t.append("prefix",e.prefix),""!==e.dateType&&null!==e.dateType&&void 0!==e.dateType&&t.append("dateType",e.dateType),""!==e.length&&null!==e.length&&void 0!==e.length&&t.append("length",e.length),Object(n.a)({url:"/erp/NumberingRules/create",method:"post",data:t})}function w(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("id",e),Object(n.a)({url:"/erp/approvalProcess/searchDetail",method:"post",data:t})}function N(e){var t=new URLSearchParams;return""!==e.process_name&&null!==e.process_name&&void 0!==e.process_name&&t.append("process_name",e.process_name),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.is_effective&&null!==e.is_effective&&void 0!==e.is_effective&&t.append("is_effective",e.is_effective),t.append("pagesize",e.pagesize),t.append("pagenum",e.pagenum),Object(n.a)({url:"/erp/approvalProcess/search",method:"post",data:t})}function x(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("modelids",e),Object(n.a)({url:"/erp/approvalProcess/delete",method:"post",data:t})}function S(e,t){var i=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&i.append("id",e.id),""!==e.processName&&null!==e.processName&&void 0!==e.processName&&i.append("process_name",e.processName),""!==e.type&&null!==e.type&&void 0!==e.type&&i.append("type",e.type),""!==e.isMessage&&null!==e.isMessage&&void 0!==e.isMessage&&i.append("is_message",e.isMessage),""!==e.isEffective&&null!==e.isEffective&&void 0!==e.isEffective&&i.append("is_effective",e.isEffective),""!==e.effect_region&&null!==e.effect_region&&void 0!==e.effect_region&&i.append("effect_region",e.effect_region),""!==e.effect_repository&&null!==e.effect_repository&&void 0!==e.effect_repository&&i.append("effect_repository",e.effect_repository),""!==e.countryId&&null!==e.countryId&&void 0!==e.countryId&&i.append("country_id",e.countryId),""!==t&&null!==t&&void 0!==t&&i.append("detailJson",t),Object(n.a)({url:"/erp/approvalProcess/update",method:"post",data:i})}function E(){return Object(n.a)({url:"/erp/country/getdeptlist",method:"post"})}function k(e){var t=new URLSearchParams;return""!==e.deptno&&null!==e.deptno&&void 0!==e.deptno&&t.append("deptno",e.deptno),""!==e.deptname&&null!==e.deptname&&void 0!==e.deptname&&t.append("deptname",e.deptname),Object(n.a)({url:"/erp/country/adddept",method:"post",data:t})}function j(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("deptid",e.id),""!==e.deptNo&&null!==e.deptNo&&void 0!==e.deptNo&&t.append("deptno",e.deptNo),""!==e.deptName&&null!==e.deptName&&void 0!==e.deptName&&t.append("deptname",e.deptName),Object(n.a)({url:"/erp/country/updatedept",method:"post",data:t})}function $(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("ids",e),Object(n.a)({url:"/erp/country/deletedept",method:"post",data:t})}}}]);