(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-f20c"],{"+Khs":function(e,t,n){"use strict";var a=n("Q2AE"),r={inserted:function(e,t,n){var r=t.value,i=a.a.getters&&a.a.getters.roles;if(!r[0])throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var o=r[0];i.some(function(e){return o.includes(e)})||r[1]===a.a.getters.userId||e.parentNode&&e.parentNode.removeChild(e)}},i=function(e){e.directive("permission2",r)};window.Vue&&(window.permission2=r,Vue.use(i)),r.install=i;t.a=r},"/b9A":function(e,t,n){},"41Be":function(e,t,n){"use strict";n.d(t,"a",function(){return r});var a=n("Q2AE");function r(e){if(e&&e instanceof Array&&e.length>0){var t=e;return!!(a.a.getters&&a.a.getters.roles).some(function(e){return t.includes(e)})}return console.error("need roles!"),!1}},"4N2a":function(e,t,n){"use strict";n.d(t,"c",function(){return r}),n.d(t,"h",function(){return i}),n.d(t,"f",function(){return o}),n.d(t,"d",function(){return s}),n.d(t,"e",function(){return d}),n.d(t,"a",function(){return l}),n.d(t,"g",function(){return p}),n.d(t,"i",function(){return c}),n.d(t,"b",function(){return u}),n.d(t,"j",function(){return m});var a=n("t3Un");function r(e){var t=new URLSearchParams;return""!==e.installmentId&&null!==e.installmentId&&void 0!==e.installmentId&&t.append("installmentId",e.installmentId),""!==e.stat&&null!==e.stat&&void 0!==e.stat&&t.append("stat",e.stat),""!==e.orderNumber&&null!==e.orderNumber&&void 0!==e.orderNumber&&t.append("orderNumber",e.orderNumber),""!==e.applyNumber&&null!==e.applyNumber&&void 0!==e.applyNumber&&t.append("applyNumber",e.applyNumber),""!==e.customerId&&null!==e.customerId&&void 0!==e.customerId&&t.append("customerId",e.customerId),""!==e.customerName&&null!==e.customerName&&void 0!==e.customerName&&t.append("customerName",e.customerName),""!==e.customerPhone&&null!==e.customerPhone&&void 0!==e.customerPhone&&t.append("customerPhone",e.customerPhone),""!==e.saleRepositoryId&&null!==e.saleRepositoryId&&void 0!==e.saleRepositoryId&&t.append("saleRepositoryId",e.saleRepositoryId),""!==e.judgeStat&&null!==e.judgeStat&&void 0!==e.judgeStat&&t.append("judgeStat",e.judgeStat),""!==e.receiptStat&&null!==e.receiptStat&&void 0!==e.receiptStat&&t.append("receiptStat",e.receiptStat),""!==e.beginTime&&null!==e.beginTime&&void 0!==e.beginTime&&t.append("beginTime",e.beginTime),""!==e.endTime&&null!==e.endTime&&void 0!==e.endTime&&t.append("endTime",e.endTime),""!==e.repositoryId&&null!==e.repositoryId&&void 0!==e.repositoryId&&t.append("repositoryId",e.repositoryId),""!==e.createPersonId&&null!==e.createPersonId&&void 0!==e.createPersonId&&t.append("createPersonId",e.createPersonId),""!==e.regionIds&&null!==e.regionIds&&void 0!==e.regionIds&&t.append("regionIds",e.regionIds),""!==e.address&&null!==e.address&&void 0!==e.address&&t.append("address",e.address),t.append("pageNum",e.pageNum),t.append("pageSize",e.pageSize),Object(a.a)({url:"/installmentorder/installmentlist",method:"post",data:t})}function i(e){var t=new URLSearchParams;return t.append("installmentOrderDetailJson",e),Object(a.a)({url:"/installmentorder/updateEach",method:"post",data:t})}function o(e,t){var n=new URLSearchParams;return n.append("installmentId",e),n.append("collectPersonId",t),Object(a.a)({url:"/installmentorder/reToEmp",method:"post",data:n})}function s(e){var t=new URLSearchParams;return t.append("eachids",e),Object(a.a)({url:"/installmentorder/postphone",method:"post",data:t})}function d(e){var t=new URLSearchParams;return console.log(e),console.log(e.installmentId),t.append("installmentId",e.installmentId),Object(a.a)({url:"/installmentorder/pushPay",method:"post",data:t})}function l(e,t,n,r){var i=new URLSearchParams;return i.append("Json",e),i.append("detailJson",t),i.append("recoverVehicleSourceOutJson",n),""!==r.repositoryId&&null!==r.repositoryId&&void 0!==r.repositoryId&&i.append("repositoryId",r.repositoryId),""!==r.regionId&&null!==r.regionId&&void 0!==r.regionId&&i.append("regionId",r.regionId),Object(a.a)({url:"/recoverVehicle/create",method:"post",data:i})}function p(e){var t=new URLSearchParams;return""!==e.title&&null!==e.title&&void 0!==e.title&&t.append("title",e.title),""!==e.number&&null!==e.number&&void 0!==e.number&&t.append("number",e.number),""!==e.receivePersonId&&null!==e.receivePersonId&&void 0!==e.receivePersonId&&t.append("receivePersonId",e.receivePersonId),""!==e.customerName&&null!==e.customerName&&void 0!==e.customerName&&t.append("customerName",e.customerName),""!==e.receiptStat&&null!==e.receiptStat&&void 0!==e.receiptStat&&t.append("receiptStat",e.receiptStat),""!==e.judgeStat&&null!==e.judgeStat&&void 0!==e.judgeStat&&t.append("judgeStat",e.judgeStat),""!==e.beginTime&&null!==e.beginTime&&void 0!==e.beginTime&&t.append("beginTime",e.beginTime),""!==e.endTime&&null!==e.endTime&&void 0!==e.endTime&&t.append("endTime",e.endTime),""!==e.repositoryId&&null!==e.repositoryId&&void 0!==e.repositoryId&&t.append("repositoryId",e.repositoryId),""!==e.createPersonId&&null!==e.createPersonId&&void 0!==e.createPersonId&&t.append("createPersonId",e.createPersonId),""!==e.regionIds&&null!==e.regionIds&&void 0!==e.regionIds&&t.append("regionIds",e.regionIds),t.append("pageNum",e.pageNum),t.append("pageSize",e.pageSize),Object(a.a)({url:"/recoverVehicle/search",method:"post",data:t})}function c(e,t,n){var r=new URLSearchParams;return r.append("Json",e),r.append("detailJson",t),r.append("recoverVehicleSourceOutJson",n),Object(a.a)({url:"/recoverVehicle/update",method:"post",data:r})}function u(e,t){var n=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&n.append("modelids",e),""!==t&&null!==t&&void 0!==t&&n.append("operatorId",t),Object(a.a)({url:"/recoverVehicle/delete",method:"post",data:n})}function m(e){var t=new URLSearchParams;return t.append("Json",e),Object(a.a)({url:"/recoverVehicle/update",method:"post",data:t})}},NBqH:function(e,t,n){"use strict";n.d(t,"c",function(){return r}),n.d(t,"a",function(){return i}),n.d(t,"d",function(){return o}),n.d(t,"b",function(){return s});var a=n("t3Un");function r(e){var t=new URLSearchParams;return""!==e.categoryname&&null!==e.categoryname&&void 0!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(a.a)({url:"/stockcategory/searchStockCategory",method:"post",data:t})}function i(e){var t=new URLSearchParams;return""!==e.categoryname&&null!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.category&&null!==e.category&&t.append("category",e.category),""!==e.iseffective&&null!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.type&&null!==e.type&&t.append("type",e.type),Object(a.a)({url:"/stockcategory/addStockCategory",method:"post",data:t})}function o(e){var t=new URLSearchParams;return""!==e.categoryName&&null!==e.categoryName&&t.append("categoryname",e.categoryName),""!==e.isEffective&&null!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.id&&null!==e.id&&t.append("id",e.id),Object(a.a)({url:"/stockcategory/updateStockCategory",method:"post",data:t})}function s(e,t){var n=new URLSearchParams;return""!==e&&null!==e&&n.append("ids",e),""!==t&&null!==t&&void 0!==t&&n.append("operatorId",t),Object(a.a)({url:"/stockcategory/delateStockCategory",method:"post",data:n})}},Q4Eu:function(e,t,n){"use strict";var a=n("Q2AE"),r={inserted:function(e,t,n){var r=t.value,i=a.a.getters&&a.a.getters.roles;if(!(r&&r instanceof Array&&r.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var o=r;i.some(function(e){return o.includes(e)})||e.parentNode&&e.parentNode.removeChild(e)}},i=function(e){e.directive("permission",r)};window.Vue&&(window.permission=r,Vue.use(i)),r.install=i;t.a=r},XU83:function(e,t,n){"use strict";var a=n("/b9A");n.n(a).a},Y5bG:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),Math.easeInOutQuad=function(e,t,n,a){return(e/=a/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t};var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function r(e,t,n){var r=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,i=e-r,o=0;t=void 0===t?500:t;!function e(){o+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(o,r,i,t)),o<t?a(e):n&&"function"==typeof n&&n()}()}},ZySA:function(e,t,n){"use strict";var a=n("P2sY"),r=n.n(a),i=(n("jUE0"),{bind:function(e,t){e.addEventListener("click",function(n){var a=r()({},t.value),i=r()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),o=i.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var s=o.getBoundingClientRect(),d=o.querySelector(".waves-ripple");switch(d?d.className="waves-ripple":((d=document.createElement("span")).className="waves-ripple",d.style.height=d.style.width=Math.max(s.width,s.height)+"px",o.appendChild(d)),i.type){case"center":d.style.top=s.height/2-d.offsetHeight/2+"px",d.style.left=s.width/2-d.offsetWidth/2+"px";break;default:d.style.top=(n.pageY-s.top-d.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",d.style.left=(n.pageX-s.left-d.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return d.style.backgroundColor=i.color,d.className="waves-ripple z-active",!1}},!1)}}),o=function(e){e.directive("waves",i)};window.Vue&&(window.waves=i,Vue.use(o)),i.install=o;t.a=i},aF2M:function(e,t,n){"use strict";n.r(t);var a,r=n("P2sY"),i=n.n(r),o=n("w77N"),s=n("4N2a"),d=n("moiu"),l=n("NBqH"),p=n("ZySA"),c=n("Mz3J"),u=n("Q4Eu"),m=n("+Khs"),v=n("41Be"),f={name:"CollectionList",directives:{waves:p.a,permission:u.a,permission2:m.a},components:{Pagination:c.a},filters:{judgeStatFilter:function(e){return{0:a.$t("updates.wsh"),1:a.$t("updates.shz"),2:a.$t("Hmodule.shtg"),3:a.$t("Hmodule.shbtg")}[e]},receiptStatFilter:function(e){return{1:a.$t("updates.zd"),2:a.$t("updates.zx"),3:a.$t("updates.jd")}[e]},stockTypeFilter:function(e){return{1:"采购1"}[e]},sendTypeFilter:function(e){return{1:"已发货",2:"未发货"}[e]}},data:function(){return{salePersonId:"",stockControl:!1,customerName:"",customercontrol:!1,agentcontrol:!1,typeparms:{pagenum:1,pagesize:99999},isvisible:!1,types:[],options2:[],depts:[],reviewParms:{id:"",judgePersonId:"",judgeStat:""},detailvisible:!1,visible2:!1,supplierId:"",empcontrol:!1,moreaction:"",downloadLoading:!1,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{pageNum:1,pageSize:10,repositoryId:this.$store.getters.repositoryId,regionIds:this.$store.getters.regionIds,stat:4},personalForm:{},formdata:[],editVisible:!1,dispatchform:{id:""},date:[]}},activated:function(){this.getlist()},mounted:function(){this.getlist()},beforeCreate:function(){a=this},methods:{dispatch:function(){var e=this,t=i()({},this.formdata);Object(s.f)(t.id,this.dispatchform.id).then(function(t){200===t.data.ret&&(e.isvisible=!1,e.$notify({title:"successful",message:"successful",type:"success",duration:1e3}),e.getlist())})},handleDispatch:function(e){var t=this;this.restdispatchform(),this.formdata=i()({},e),this.isvisible=!0,console.log(e),Object(o.n)(this.$store.getters.repositoryId,this.$store.getters.regionId).then(function(e){t.options2=e.data.data.content.list,console.log("options2",t.options2)})},restdispatchform:function(){this.dispatchform={id:""}},handleMyReceipt1:function(e){console.log(e),this.$store.dispatch("getempcontract",e),this.$router.push("/Collection/AddRecoverVehicle")},checkPermission:v.a,handlechooseStock:function(){this.stockControl=!0},stockName:function(e){this.salePersonId=e.personName,this.personalForm.salePersonId=e.id},selectInit:function(e,t){return 0===e.judgeStat},clearCustomer:function(){this.getemplist.customerId="",this.customerName=""},chooseCustomer:function(){"1"===this.getemplist.customerType?this.agentcontrol=!0:"2"===this.getemplist.customerType&&(this.customercontrol=!0)},customerdata:function(e){this.getemplist.customerId=e.id,this.customerName=e.customerName},agentdata:function(e){this.getemplist.customerId=e.id,this.customerName=e.agentName},updatecountry:function(){this.getlist()},getlist:function(){var e=this;this.listLoading=!0,Object(s.c)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)}),Object(d.p)().then(function(t){200===t.data.ret&&(e.depts=t.data.data.content)}),Object(l.c)(this.typeparms).then(function(t){200===t.data.ret&&(e.types=t.data.data.content.list)})},restFilter:function(){this.salePersonId="",this.getemplist.salePersonId=""},handleFilter:function(){var e=this;this.getemplist.pageNum=1,Object(s.c)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount)})},handlechoose:function(){this.empcontrol=!0},supplierName:function(e){console.log(e),this.supplierId=e.supplierName,this.getemplist.supplierId=e.id},handleEdit:function(e){console.log(e),this.editVisible=!0,this.personalForm=i()({},e),this.personalForm.sourceType=String(e.sourceType),null!==e.certificateType&&(this.personalForm.certificateType=String(e.certificateType)),null!==e.workStat&&(this.personalForm.workStat=String(e.workStat)),null!==e.mateCertificateType&&(this.personalForm.mateCertificateType=String(e.mateCertificateType)),null!==e.mateWorkStat&&(this.personalForm.mateWorkStat=String(e.mateWorkStat)),null!==e.enterpriseNature&&(this.personalForm.enterpriseNature=String(e.enterpriseNature)),null!==e.suretyCertificateType&&(this.personalForm.suretyCertificateType=String(e.suretyCertificateType))},refreshlist:function(e){!0===e&&this.getlist()},handleDetail:function(e){console.log(e),this.detailvisible=!0,this.personalForm=i()({},e)},isReview:function(e){if(""!==e.approvalUseVos&&null!==e.approvalUseVos&&void 0!==e.approvalUseVos&&0!==e.approvalUseVos.length){var t=e.approvalUseVos,n=t[t.length-1].stepHandler.indexOf(","+this.$store.getters.userId+",");if(console.log(t[t.length-1].stepHandler),console.log(n),n>-1&&(1===e.judgeStat||0===e.judgeStat))return!0}},handleAdd:function(){this.$router.push("/InstallmentList/AddInstallmentList")},handleExport:function(){var e=this;this.downloadLoading=!0,Promise.all([n.e("chunk-ef4a"),n.e("chunk-069c")]).then(n.bind(null,"S/jZ")).then(function(t){var n=e.formatJson(["id","InstallmentListName","InstallmentListShortName","typeName","regionName","buyerName","levelName","createName","createTime"],e.list);t.export_json_to_excel({header:["供应商编号","供应商名称","供应商简称","供应商类别","所在区域","采购员","供应商优质级别","建档人","建档日期"],data:n,filename:"经销商资料表"}),e.downloadLoading=!1})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return t[e]})})},handlePrint:function(){console.log(456)},handlechooseRep:function(){this.repositorycontrol=!0},repositoryname:function(e){console.log(e),this.enterRepositoryId=e.repositoryName,this.getemplist.enterRepositoryId=e.id},updatedept:function(){this.getlist()},handlechooseDelivery:function(){this.deliverycontrol=!0},deliveryName:function(e){this.deliveryPersonId=e.personName,this.getemplist.deliveryPersonId=e.id},handlechooseAccept:function(){this.accetpcontrol=!0},acceptName:function(e){this.acceptPersonId=e.personName,this.getemplist.acceptPersonId=e.id}}},h=(n("XU83"),n("KHd+")),g=Object(h.a)(f,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"ERP-container"},[n("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"10px"},attrs:{shadow:"never"}},[n("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("InstallmentList.customerName"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.customerName,callback:function(t){e.$set(e.getemplist,"customerName",t)},expression:"getemplist.customerName"}}),e._v(" "),n("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("updates.dh"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.customerPhone,callback:function(t){e.$set(e.getemplist,"customerPhone",t)},expression:"getemplist.customerPhone"}}),e._v(" "),n("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("InstallmentList.applyNumber"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.customerName,callback:function(t){e.$set(e.getemplist,"customerName",t)},expression:"getemplist.customerName"}}),e._v(" "),n("el-popover",{attrs:{placement:"bottom",width:"500",trigger:"click"},model:{value:e.visible2,callback:function(t){e.visible2=t},expression:"visible2"}},[n("el-select",{staticStyle:{width:"40%",float:"left","margin-left":"20px"},attrs:{value:e.getemplist.receiptStat,placeholder:e.$t("updates.djzt"),clearable:""},model:{value:e.getemplist.receiptStat,callback:function(t){e.$set(e.getemplist,"receiptStat",t)},expression:"getemplist.receiptStat"}},[n("el-option",{attrs:{label:e.$t("updates.zd"),value:"1"}}),e._v(" "),n("el-option",{attrs:{label:e.$t("updates.zx"),value:"2"}}),e._v(" "),n("el-option",{attrs:{label:e.$t("updates.jd"),value:"3"}})],1),e._v(" "),n("el-select",{staticStyle:{width:"40%",float:"right","margin-right":"20px"},attrs:{value:e.getemplist.judgeStat,placeholder:e.$t("updates.spzt"),clearable:""},model:{value:e.getemplist.judgeStat,callback:function(t){e.$set(e.getemplist,"judgeStat",t)},expression:"getemplist.judgeStat"}},[n("el-option",{attrs:{label:e.$t("updates.wsh"),value:"0"}}),e._v(" "),n("el-option",{attrs:{label:e.$t("updates.shz"),value:"1"}}),e._v(" "),n("el-option",{attrs:{label:e.$t("updates.shtg"),value:"2"}}),e._v(" "),n("el-option",{attrs:{label:e.$t("updates.shptg"),value:"3"}})],1),e._v(" "),n("div",{staticClass:"seachbutton",staticStyle:{width:"100%",float:"right","margin-top":"20px"}},[n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary",round:""},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{slot:"reference",type:"primary"},on:{click:function(t){e.visible2=!e.visible2}},slot:"reference"},[e._v(e._s(e.$t("public.filter"))),n("svg-icon",{staticStyle:{"margin-left":"4px"},attrs:{"icon-class":"shaixuan"}})],1)],1),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px","margin-top":"10px"},attrs:{type:"primary",icon:"el-icon-search",round:""},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),n("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"10px"},attrs:{shadow:"never"}},[n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["200-208-6"],expression:"['200-208-6']"},{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{loading:e.downloadLoading},on:{click:e.handleExport}},[n("svg-icon",{attrs:{"icon-class":"daochu"}}),e._v(e._s(e.$t("public.export")))],1),e._v(" "),n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["200-208-7"],expression:"['200-208-7']"},{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-printer"},on:{click:e.handlePrint}},[e._v(e._s(e.$t("public.print")))])],1),e._v(" "),n("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"10px"},attrs:{shadow:"never"}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{type:"selection",width:"55",fixed:"left",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("public.id"),resizable:!1,fixed:"left",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.orderNumber))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("InstallmentList.customerName"),resizable:!1,fixed:"left",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.customerName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("InstallmentList.customerPhone"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.customerPhone))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("InstallmentList.address"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.address))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("InstallmentList.totalMoney"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.totalMoney))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("InstallmentList.leftMoney"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.leftMoney))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("InstallmentList.Interest"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.totalMoney-t.row.installmentMoney))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("public.judgeStat"),resizable:!1,prop:"judgeStat",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("judgeStatFilter")(t.row.judgeStat)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("public.receiptStat"),resizable:!1,align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("receiptStatFilter")(t.row.receiptStat)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("public.actions"),resizable:!1,align:"center","min-width":"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(n){e.handleDispatch(t.row)}}},[e._v("重分派")]),e._v(" "),n("el-button",{directives:[{name:"permission2",rawName:"v-permission2",value:["200-208-3",t.row.createPersonId],expression:"['200-208-3', scope.row.createPersonId]"},{name:"show",rawName:"v-show",value:0===t.row.judgeStat,expression:"scope.row.judgeStat === 0"}],attrs:{title:e.$t("updates.xg"),type:"primary",size:"mini",icon:"el-icon-edit",circle:""},on:{click:function(n){e.handleEdit(t.row)}}}),e._v(" "),n("el-button",{directives:[{name:"show",rawName:"v-show",value:e.isReview(t.row),expression:"isReview(scope.row)"}],attrs:{title:e.$t("updates.spi"),type:"warning",size:"mini",icon:"el-icon-view",circle:""},on:{click:function(n){e.handleReview(t.row)}}}),e._v(" "),n("el-button",{directives:[{name:"permission2",rawName:"v-permission2",value:["200-208-2",t.row.createPersonId],expression:"['200-208-2', scope.row.createPersonId]"},{name:"show",rawName:"v-show",value:0===t.row.judgeStat,expression:"scope.row.judgeStat === 0"}],attrs:{title:e.$t("updates.sc"),size:"mini",type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(n){e.handleDelete(t.row)}}}),e._v(" "),n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["200-208-75"],expression:"['200-208-75']"}],staticStyle:{width:"84px"},attrs:{type:"primary"},on:{click:function(n){e.handleMyReceipt1(t.row)}}},[n("span",{staticStyle:{"margin-left":"-15px"}},[e._v("生成收车单")])])]}}])})],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.getemplist.pageNum,limit:e.getemplist.pageSize},on:{"update:page":function(t){e.$set(e.getemplist,"pageNum",t)},"update:limit":function(t){e.$set(e.getemplist,"pageSize",t)},pagination:e.getlist}})],1),e._v(" "),n("el-dialog",{attrs:{visible:e.isvisible,title:e.$t("repair.Dispatch2"),width:"40%",center:"","lock-scroll":""},on:{"update:visible":function(t){e.isvisible=t}}},[n("el-form",{staticStyle:{width:"400px",margin:"0 auto"},attrs:{model:e.dispatchform}},[n("el-form-item",{attrs:{"label-width":e.formLabelWidth,label:e.$t("repair.Employee")}},[n("el-select",{attrs:{placeholder:"please choose"},model:{value:e.dispatchform.id,callback:function(t){e.$set(e.dispatchform,"id",t)},expression:"dispatchform.id"}},e._l(e.options2,function(e,t){return n("el-option",{key:t,attrs:{label:e.personName,value:e.id}})}))],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.isvisible=!1}}},[e._v(e._s(e.$t("repair.cancel")))]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.dispatch}},[e._v(e._s(e.$t("repair.ok")))])],1)],1)],1)},[],!1,null,"6320f740",null);g.options.__file="CollectionList.vue";t.default=g.exports},jUE0:function(e,t,n){},w77N:function(e,t,n){"use strict";n.d(t,"l",function(){return r}),n.d(t,"s",function(){return i}),n.d(t,"r",function(){return o}),n.d(t,"z",function(){return s}),n.d(t,"j",function(){return d}),n.d(t,"w",function(){return l}),n.d(t,"o",function(){return p}),n.d(t,"u",function(){return c}),n.d(t,"v",function(){return u}),n.d(t,"q",function(){return m}),n.d(t,"t",function(){return v}),n.d(t,"i",function(){return f}),n.d(t,"e",function(){return h}),n.d(t,"a",function(){return g}),n.d(t,"n",function(){return y}),n.d(t,"A",function(){return b}),n.d(t,"p",function(){return w}),n.d(t,"h",function(){return I}),n.d(t,"c",function(){return S}),n.d(t,"x",function(){return k}),n.d(t,"y",function(){return N}),n.d(t,"b",function(){return P}),n.d(t,"f",function(){return _}),n.d(t,"g",function(){return j}),n.d(t,"k",function(){return L}),n.d(t,"m",function(){return x}),n.d(t,"B",function(){return R}),n.d(t,"d",function(){return $});var a=n("t3Un");function r(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("repositoryId",e),Object(a.a)({url:"/repository/getServiceEmp",method:"post",data:t})}function i(e){var t=new URLSearchParams;return t.append("pagenum",e.pagenum),t.append("stat",e.stat),t.append("username",e.username),t.append("begintime",e.begintime),t.append("endtime",e.endtime),t.append("pagesize",e.pagesize),t.append("regionid",e.regionid),t.append("expectrepositoryid",e.expectrepositoryid),Object(a.a)({url:"/admin/service/getservicelistbycondition",method:"post",data:t})}function o(e){var t=new URLSearchParams;return t.append("serviceid",e),Object(a.a)({url:"/admin/service/getservicedetail",method:"post",data:t})}function s(e){var t=new URLSearchParams;return t.append("serviceid",e),Object(a.a)({url:"/admin/service/serviceretoemp",method:"post",data:t})}function d(e){var t=new URLSearchParams;return t.append("serviceid",e),Object(a.a)({url:"/admin/service/endservicebackground",method:"post",data:t})}function l(e,t){var n=new URLSearchParams;return n.append("serviceid",e),n.append("repositoryid",t),Object(a.a)({url:"/admin/service/retoreposervice",method:"post",data:n})}function p(e){var t=new URLSearchParams;return t.append("serviceid",e),Object(a.a)({url:"/admin/serviceposition/getserviceschedule",method:"post",data:t})}function c(e,t){var n=new URLSearchParams;return n.append("serviceorderid",e),n.append("handlerid",t),Object(a.a)({url:"/admin/service/serviceordertoemp",method:"post",data:n})}function u(e){var t=new URLSearchParams;return t.append("pageNum",1),t.append("pageSize",9999),Object(a.a)({url:"/repository/getRepositoryList",method:"post",params:t})}function m(e){var t=new URLSearchParams;return""!==e.employeeId&&null!==e.employeeId&&void 0!==e.employeeId&&t.append("employeeId",e.employeeId),""!==e.detail&&null!==e.detail&&void 0!==e.detail&&t.append("detail",e.detail),""!==e.producttype&&null!==e.producttype&&void 0!==e.producttype&&t.append("producttype",e.producttype),""!==e.userid&&null!==e.userid&&void 0!==e.userid&&t.append("userid",e.userid),""!==e.address&&null!==e.address&&void 0!==e.address&&t.append("address",e.address),""!==e.personname&&null!==e.personname&&void 0!==e.personname&&t.append("personname",e.personname),""!==e.phonenumber&&null!==e.phonenumber&&void 0!==e.phonenumber&&t.append("phonenumber",e.phonenumber),""!==e.servicexpecttime&&null!==e.servicexpecttime&&void 0!==e.servicexpecttime&&t.append("servicexpecttime",e.servicexpecttime),""!==e.repositoryid&&null!==e.repositoryid&&void 0!==e.repositoryid&&t.append("repositoryid",e.repositoryid),""!==e.cityid&&null!==e.cityid&&void 0!==e.cityid&&t.append("cityid",e.cityid),""!==e.provinceid&&null!==e.provinceid&&void 0!==e.provinceid&&t.append("provinceid",e.provinceid),""!==e.components&&null!==e.components&&void 0!==e.components&&t.append("components",e.components),""!==e.servicemode&&null!==e.servicemode&&void 0!==e.servicemode&&t.append("servicemode",e.servicemode),Object(a.a)({url:"/admin/service/newservice",method:"post",data:t})}function v(e){var t=new URLSearchParams;return t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),t.append("producttype",e.productType),Object(a.a)({url:"/admin/service/listserviceitem",method:"post",data:t})}function f(e,t,n){var r=new URLSearchParams;return r.append("price",e),r.append("otherPrice",n),r.append("itemid",t),Object(a.a)({url:"/admin/service/updateserviceitem",method:"post",data:r})}function h(e){var t=new URLSearchParams;return t.append("itemid",e),Object(a.a)({url:"/admin/service/deleteserviceitem",method:"post",data:t})}function g(e){var t=new URLSearchParams;return t.append("producttype",e.producttype),t.append("name",e.name),t.append("price",e.price),t.append("otherPrice",e.otherPrice),t.append("desc",e.desc),t.append("mark",e.mark),Object(a.a)({url:"/admin/service/addserviceitem",method:"post",data:t})}function y(e,t){var n=new URLSearchParams;return n.append("loginRepositoryId",e),""!==t&&null!==t&&void 0!==t&&n.append("regionIds",t),n.append("stat",1),n.append("pagenum",1),n.append("pagesize",999),Object(a.a)({url:"/employee/getemplist",method:"post",data:n})}function b(e,t){var n=new URLSearchParams;return n.append("loginRepositoryId",e),n.append("regionIds",t),n.append("pagesize",1e3),n.append("pagenum",1),Object(a.a)({url:"/employee/getemplist",method:"post",data:n})}function w(e){var t=new URLSearchParams;return""!==e.result&&null!==e.result&&void 0!==e.result&&t.append("result",e.result),""!==e.code&&null!==e.code&&void 0!==e.code&&t.append("code",e.code),""!==e.employeeid&&null!==e.employeeid&&void 0!==e.employeeid&&t.append("employeeId",e.employeeid),t.append("pageNum",e.pagenum),t.append("pageSize",e.pagesize),t.append("regionIds",e.regionid),t.append("repositoryId",e.repositoryid),""!==e.begintime&&null!==e.begintime&&void 0!==e.begintime&&t.append("beginTime",e.begintime),""!==e.endtime&&null!==e.endtime&&void 0!==e.endtime&&t.append("endTime",e.endtime),Object(a.a)({url:"/taskoffline/gettaskofflinelist",method:"post",data:t})}function I(e){var t=new URLSearchParams;return t.append("taskid",e.id),Object(a.a)({url:"/taskoffline/deletetaskoffline",method:"post",data:t})}function S(e){var t=new URLSearchParams;return t.append("taskName",e.taskname),t.append("taskAddress",e.taskaddress),t.append("taskContent",e.taskcontent),t.append("createId",e.createId),t.append("employeeId",e.employeeId),t.append("taskType",e.taskType),t.append("repositoryId",e.repositoryId),t.append("remarks",e.remarks),""!==e.customerId&&null!==e.customerId&&void 0!==e.customerId&&t.append("customerId",e.customerId),t.append("customerName",e.customerName),Object(a.a)({url:"/taskoffline/addtaskoffline",method:"post",data:t})}function k(e){return Object(a.a)({url:"/admin/fault/search",method:"post",params:e})}function N(e){return Object(a.a)({url:"/admin/selfchecking/search",method:"post",params:e})}function P(e){var t=new URLSearchParams;return t.append("name",e.name),t.append("level",e.level),t.append("parentid",e.parentid),t.append("content",e.content),t.append("employeeguide",e.employeeguide),Object(a.a)({url:"/admin/selfchecking/addselfchecking",method:"post",data:t})}function _(e){var t=new URLSearchParams;return t.append("id",e.id),Object(a.a)({url:"/admin/selfchecking/deleteselfchecking",method:"post",data:t})}function j(e){var t=new URLSearchParams;return t.append("serviceid",e.id),Object(a.a)({url:"/admin/service/deleteservice",method:"post",data:t})}function L(){return Object(a.a)({url:"/admin/fault/search",method:"post"})}function x(e){var t=new URLSearchParams;return""!==e.employeeId&&null!==e.employeeId&&void 0!==e.employeeId&&t.append("employeeId",e.employeeId),""!==e.result&&null!==e.result&&void 0!==e.result&&t.append("result",e.result),""!==e.code&&null!==e.code&&void 0!==e.code&&t.append("code",e.code),""!==e.stat&&null!==e.stat&&void 0!==e.stat&&t.append("stat",e.stat),""!==e.customerName&&null!==e.customerName&&void 0!==e.customerName&&t.append("customerName",e.customerName),""!==e.begintime&&null!==e.begintime&&void 0!==e.begintime&&t.append("begintime",e.begintime),""!==e.endTime&&null!==e.endTime&&void 0!==e.endTime&&t.append("endTime",e.endTime),""!==e.repositoryId&&null!==e.repositoryId&&void 0!==e.repositoryId&&t.append("repositoryId",e.repositoryId),""!==e.regionIds&&null!==e.regionIds&&void 0!==e.regionIds&&t.append("regionIds",e.regionIds),t.append("pageNum",e.pagenum),t.append("pageSize",e.pagesize),Object(a.a)({url:"/taskoffline/gettaskofflinelist",data:t,method:"post"})}function R(e){var t=new URLSearchParams;return""!==e.taskId&&null!==e.taskId&&void 0!==e.taskId&&t.append("taskId",e.taskId),""!==e.taskName&&null!==e.taskName&&void 0!==e.taskName&&t.append("taskName",e.taskName),""!==e.taskAddress&&null!==e.taskAddress&&void 0!==e.taskAddress&&t.append("taskAddress",e.taskAddress),""!==e.taskContent&&null!==e.taskContent&&void 0!==e.taskContent&&t.append("taskContent",e.taskContent),""!==e.employeeId&&null!==e.employeeId&&void 0!==e.employeeId&&t.append("employeeId",e.employeeId),""!==e.remarks&&null!==e.remarks&&void 0!==e.remarks&&t.append("remarks",e.remarks),""!==e.customerId&&null!==e.customerId&&void 0!==e.customerId&&t.append("customerId",e.customerId),Object(a.a)({url:"taskoffline/updatetaskoffline",data:t,method:"post"})}function $(e){var t=new URLSearchParams;return t.append("taskId",e),Object(a.a)({url:"taskoffline/cancelTask",data:t,method:"post"})}}}]);