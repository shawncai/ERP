(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1473"],{"2H35":function(e,t,a){"use strict";a.d(t,"f",function(){return r}),a.d(t,"b",function(){return o}),a.d(t,"h",function(){return i}),a.d(t,"j",function(){return p}),a.d(t,"g",function(){return s}),a.d(t,"a",function(){return d}),a.d(t,"k",function(){return l}),a.d(t,"c",function(){return c}),a.d(t,"d",function(){return u}),a.d(t,"i",function(){return m}),a.d(t,"e",function(){return g});var n=a("t3Un");function r(){var e=new URLSearchParams;return e.append("pagenum",1),e.append("pagesize",99999),Object(n.a)({url:"/erp/repository/searchRepCategory",method:"post",data:e})}function o(e){var t=new URLSearchParams;return""!==e.repositoryName&&null!==e.repositoryName&&t.append("repositoryName",e.repositoryName),""!==e.address&&null!==e.address&&t.append("address",e.address),""!==e.longitude&&null!==e.longitude&&t.append("longitude",e.longitude),""!==e.latitude&&null!==e.latitude&&t.append("latitude",e.latitude),""!==e.managerPeopleId&&null!==e.managerPeopleId&&t.append("managerPeopleId",e.managerPeopleId),""!==e.createTime&&null!==e.createTime&&t.append("createTime",e.createTime),""!==e.stat&&null!==e.stat&&t.append("stat",e.stat),""!==e.description&&null!==e.description&&t.append("description",e.description),""!==e.regionId&&null!==e.regionId&&t.append("regionId",e.regionId),""!==e.type&&null!==e.type&&t.append("type",e.type),""!==e.regionManagerId&&null!==e.regionManagerId&&t.append("regionManagerId",e.regionManagerId),""!==e.attributes&&null!==e.attributes&&t.append("attributes",e.attributes),""!==e.countryId&&null!==e.countryId&&t.append("countryId",e.countryId),Object(n.a)({url:"/erp/repository/create",method:"post",data:t})}function i(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),""!==e.repositoryName&&null!==e.repositoryName&&void 0!==e.repositoryName&&t.append("repositoryName",e.repositoryName),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.regionId&&null!==e.regionId&&void 0!==e.regionId&&t.append("regionId",e.regionId),""!==e.countyrId&&null!==e.countyrId&&void 0!==e.countyrId&&t.append("countyrId",e.countyrId),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(n.a)({url:"/erp/repository/searchRepository",method:"post",data:t})}function p(e){var t=new URLSearchParams;return""!==e.repositoryName&&null!==e.repositoryName&&void 0!==e.repositoryName&&t.append("repositoryName",e.repositoryName),""!==e.address&&null!==e.address&&void 0!==e.address&&t.append("address",e.address),""!==e.longitude&&null!==e.longitude&&void 0!==e.longitude&&t.append("longitude",e.longitude),""!==e.latitude&&null!==e.latitude&&void 0!==e.latitude&&t.append("latitude",e.latitude),""!==e.createTime&&null!==e.createTime&&void 0!==e.createTime&&t.append("createTime",e.createTime),""!==e.managerPeopleId&&null!==e.managerPeopleId&&void 0!==e.managerPeopleId&&t.append("managerPeopleId",e.managerPeopleId),""!==e.stat&&null!==e.stat&&void 0!==e.stat&&t.append("stat",e.stat),""!==e.description&&null!==e.description&&void 0!==e.description&&t.append("description",e.description),""!==e.regionId&&null!==e.regionId&&void 0!==e.regionId&&t.append("regionId",e.regionId),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),""!==e.regionManagerId&&null!==e.regionManagerId&&void 0!==e.regionManagerId&&t.append("regionManagerId",e.regionManagerId),""!==e.attributes&&null!==e.attributes&&void 0!==e.attributes&&t.append("attributes",e.attributes),""!==e.countryId&&null!==e.countryId&&void 0!==e.countryId&&t.append("countryId",e.countryId),""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(n.a)({url:"/erp/repository/update",method:"post",data:t})}function s(e){var t=new URLSearchParams;return""!==e.categoryname&&null!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.iseffective&&null!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.type&&null!==e.type&&t.append("type",e.type),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(n.a)({url:"/erp/repository/searchRepCategory",method:"post",data:t})}function d(e){var t=new URLSearchParams;return""!==e.categoryname&&null!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.category&&null!==e.category&&t.append("category",e.category),""!==e.iseffective&&null!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.type&&null!==e.type&&t.append("type",e.type),Object(n.a)({url:"/erp/repository/addRepCategory",method:"post",data:t})}function l(e){var t=new URLSearchParams;return""!==e.categoryName&&null!==e.categoryName&&t.append("categoryname",e.categoryName),""!==e.isEffective&&null!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.id&&null!==e.id&&t.append("id",e.id),Object(n.a)({url:"/erp/repository/updateRepCategory",method:"post",data:t})}function c(e){var t=new URLSearchParams;return""!==e&&null!==e&&t.append("modelids",e),Object(n.a)({url:"/erp/repository/delateRepCategory",method:"post",data:t})}function u(e){var t=new URLSearchParams;return""!==e&&null!==e&&t.append("modelids",e),Object(n.a)({url:"/erp/repository/deleteRepository",method:"post",data:t})}function m(e,t){var a=new URLSearchParams;return""!==e&&null!==e&&a.append("modelids",e),""!==t&&null!==t&&a.append("iseffective",t),Object(n.a)({url:"/erp/repository/startorend",method:"post",data:a})}function g(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("repositoryJson",e),Object(n.a)({url:"/erp/repository/manyinsert",method:"post",data:t})}},"4f+d":function(e,t,a){"use strict";var n=a("fwUS");a.n(n).a},"6HaC":function(e,t,a){"use strict";a.d(t,"d",function(){return r}),a.d(t,"h",function(){return o}),a.d(t,"i",function(){return i}),a.d(t,"f",function(){return p}),a.d(t,"c",function(){return s}),a.d(t,"a",function(){return d}),a.d(t,"b",function(){return l}),a.d(t,"e",function(){return c}),a.d(t,"g",function(){return u});var n=a("t3Un");function r(e){return Object(n.a)({url:"/erp/country/getcountrylist",method:"post",params:e})}function o(e){return Object(n.a)({url:"/erp/region/detaillist",method:"post",params:e})}function i(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("regionId",e),t.append("pagenum",1),t.append("pagesize",99999),Object(n.a)({url:"/erp/repository/searchRepository",method:"post",data:t})}function p(e){var t=new URLSearchParams;return t.append("countryid",e),Object(n.a)({url:"/erp/country/getprovincelist",method:"post",data:t})}function s(e){var t=new URLSearchParams;return t.append("provinceid",e),Object(n.a)({url:"/erp/country/getcitylist",method:"post",data:t})}function d(e,t){var a=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&a.append("repositoryId",e),""!==t&&null!==t&&void 0!==t&&a.append("productCode",t),Object(n.a)({url:"/erp/location/batchlist",method:"post",data:a})}function l(e,t,a,r){var o=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&o.append("repositoryId",e),""!==t&&null!==t&&void 0!==t&&o.append("locationId",t),""!==a&&null!==a&&void 0!==a&&o.append("productCode",a),""!==r&&null!==r&&void 0!==r&&o.append("batch",r),Object(n.a)({url:"/erp/location/getQuantity",method:"post",data:o})}function c(e,t){var a=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&a.append("repositoryId",e),""!==t.productCode&&null!==t.productCode&&void 0!==t.productCode&&a.append("productCode",t.productCode),Object(n.a)({url:"/erp/location/getlocation",method:"post",data:a})}function u(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("repositoryId",e),t.append("pageNum",1),t.append("pageSize",99999),Object(n.a)({url:"/erp/location/locationlist",method:"post",data:t})}},"A4/D":function(e,t,a){"use strict";a.d(t,"c",function(){return r}),a.d(t,"d",function(){return o}),a.d(t,"a",function(){return i}),a.d(t,"e",function(){return p}),a.d(t,"b",function(){return s});var n=a("t3Un");function r(e){var t=new URLSearchParams;return""!==e.searchRepositoryId&&null!==e.searchRepositoryId&&void 0!==e.searchRepositoryId&&t.append("searchRepositoryId",e.searchRepositoryId),""!==e.code&&null!==e.code&&void 0!==e.code&&t.append("code",e.code),""!==e.productName&&null!==e.productName&&void 0!==e.productName&&t.append("productName",e.productName),t.append("pageNum",e.pageNum),t.append("pageSize",e.pageSize),t.append("repositoryId",e.repositoryId),t.append("regionIds",e.regionIds),Object(n.a)({url:"/erp/stockAlarm/searchalarm",method:"post",data:t})}function o(e){var t=new URLSearchParams;return""!==e.searchRepositoryId&&null!==e.searchRepositoryId&&void 0!==e.searchRepositoryId&&t.append("repositoryId",e.searchRepositoryId),""!==e.productId&&null!==e.productId&&void 0!==e.productId&&t.append("productId",e.productId),""!==e.productName&&null!==e.productName&&void 0!==e.productName&&t.append("productName",e.productName),t.append("pagenum",e.pageNum),t.append("pagesize",e.pageSize),t.append("repositoryId2",e.repositoryId2),t.append("regionIds",e.regionIds),Object(n.a)({url:"/erp/stockAlarm/search",method:"post",data:t})}function i(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("modelids",e),Object(n.a)({url:"/erp/stockAlarm/delete",method:"post",data:t})}function p(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("Json",e),Object(n.a)({url:"/erp/stockAlarm/update",method:"post",data:t})}function s(e){var t=new URLSearchParams;return""!==e.searchRepositoryId&&null!==e.searchRepositoryId&&void 0!==e.searchRepositoryId&&t.append("repositoryId",e.searchRepositoryId),""!==e.code&&null!==e.code&&void 0!==e.code&&t.append("code",e.code),""!==e.productName&&null!==e.productName&&void 0!==e.productName&&t.append("productName",e.productName),t.append("pagenum",e.pageNum),t.append("pagesize",e.pageSize),t.append("repositoryId",e.repositoryId),t.append("regionIds",e.regionIds),Object(n.a)({url:"/erp/stockAlarm/searchBatchAlarm",method:"post",data:t})}},LMrS:function(e,t,a){"use strict";var n=a("6HaC"),r=a("2H35"),o=a("ZySA"),i=a("Mz3J"),p={directives:{waves:o.a},components:{Pagination:i.a},filters:{iseffectiveFilter:function(e){return{1:"停用",2:"启用"}[e]},genderFilter:function(e){return{1:"男",2:"女"}[e]}},props:{repositorycontrol:{type:Boolean,default:!1}},data:function(){return{repositoryVisible:this.repositorycontrol,choosedata:"",types:[],nations:[],downloadLoading:!1,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{repositoryName:"",type:"",iseffective:"",regionId:"",countyrId:"",id:"",pagenum:1,pagesize:10},depts:[],props:{value:"id",label:"regionName",children:"regionListVos"},regions:[],getemplistregions:[],getemplistregions0:[]}},watch:{repositorycontrol:function(){this.repositoryVisible=this.repositorycontrol}},created:function(){this.getlist()},methods:{getlist:function(){var e=this;Object(n.d)().then(function(t){200===t.data.ret&&(e.nations=t.data.data.content)}),this.listLoading=!0,Object(r.h)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)}),Object(r.f)().then(function(t){200===t.data.ret&&(console.log(t),e.types=t.data.data.content.list)}),Object(n.h)().then(function(t){200===t.data.ret&&(e.regions=e.tranKTree(t.data.data.content))})},handleFilter:function(){var e=this;this.getemplist.pagenum=1,this.getemplist.regionId=this.getemplistregions[this.getemplistregions.length-1],console.log(this.getemplist),Object(r.h)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount,e.repositoryVisible=!0)})},handleAdd:function(){this.$router.push("/Repository/NewRepository"),this.repositoryVisible=!1},tranKTree:function(e){var t=this;if(e&&e.length)return e.map(function(e){return{id:e.id,regionName:e.regionName,regionListVos:t.tranKTree(e.regionListVos)}})},handleConfirm:function(){this.$emit("repositoryname",this.choosedata),this.repositoryVisible=!1},handleCurrentChange:function(e){this.choosedata=e}}},s=(a("4f+d"),a("KHd+")),d=Object(s.a)(p,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.repositoryVisible,repositorycontrol:e.repositorycontrol,"close-on-press-escape":!1,top:"10px",title:"选择仓库","append-to-body":""},on:{"update:visible":function(t){e.repositoryVisible=t},close:function(t){e.$emit("update:repositorycontrol",!1)}}},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Repository.id"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.id,callback:function(t){e.$set(e.getemplist,"id",t)},expression:"getemplist.id"}}),e._v(" "),a("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("Repository.repositoryname"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.repositoryName,callback:function(t){e.$set(e.getemplist,"repositoryName",t)},expression:"getemplist.repositoryName"}}),e._v(" "),a("el-select",{staticClass:"filter-item",attrs:{value:e.getemplist.type,placeholder:e.$t("Repository.type2"),clearable:""},model:{value:e.getemplist.type,callback:function(t){e.$set(e.getemplist,"type",t)},expression:"getemplist.type"}},e._l(e.types,function(e,t){return a("el-option",{key:t,attrs:{value:e.id,label:e.categoryName}})})),e._v(" "),a("el-select",{staticClass:"filter-item",attrs:{value:e.getemplist.iseffective,placeholder:e.$t("Repository.iseffective"),clearable:""},model:{value:e.getemplist.iseffective,callback:function(t){e.$set(e.getemplist,"iseffective",t)},expression:"getemplist.iseffective"}},[a("el-option",{attrs:{label:"启用",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"停用",value:"2"}})],1),e._v(" "),a("el-cascader",{staticClass:"filter-item",attrs:{options:e.regions,props:e.props,"show-all-levels":!1,placeholder:"请选择区域","change-on-select":"",filterable:"",clearable:""},model:{value:e.getemplistregions,callback:function(t){e.getemplistregions=t},expression:"getemplistregions"}}),e._v(" "),a("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择国家",clearable:""},model:{value:e.getemplist.countyrId,callback:function(t){e.$set(e.getemplist,"countyrId",t)},expression:"getemplist.countyrId"}},e._l(e.nations,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"current-change":e.handleCurrentChange}},[a("el-table-column",{attrs:{label:e.$t("Repository.id"),resizable:!1,prop:"id",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Repository.repositoryname"),resizable:!1,prop:"repositoryName",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.repositoryName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Repository.type2"),resizable:!1,prop:"categoryName",align:"center",width:"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.categoryName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Repository.iseffective"),resizable:!1,prop:"stat",align:"center",width:"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("iseffectiveFilter")(t.row.stat)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Repository.managerPeople"),resizable:!1,align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.managerName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("Repository.regionId"),resizable:!1,prop:"regionName",align:"center",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.regionName))])]}}])})],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"100px",float:"left","margin-top":"10px"},attrs:{type:"success"},on:{click:e.handleConfirm}},[e._v("确认添加")]),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.getlist}})],1)},[],!1,null,"ba1e97ee",null);d.options.__file="MyRepository.vue";t.a=d.exports},Y5bG:function(e,t,a){"use strict";a.d(t,"a",function(){return r}),Math.easeInOutQuad=function(e,t,a,n){return(e/=n/2)<1?a/2*e*e+t:-a/2*(--e*(e-2)-1)+t};var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function r(e,t,a){var r=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,o=e-r,i=0;t=void 0===t?500:t;!function e(){i+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(i,r,o,t)),i<t?n(e):a&&"function"==typeof a&&a()}()}},ZySA:function(e,t,a){"use strict";var n=a("P2sY"),r=a.n(n),o=(a("jUE0"),{bind:function(e,t){e.addEventListener("click",function(a){var n=r()({},t.value),o=r()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),i=o.ele;if(i){i.style.position="relative",i.style.overflow="hidden";var p=i.getBoundingClientRect(),s=i.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":((s=document.createElement("span")).className="waves-ripple",s.style.height=s.style.width=Math.max(p.width,p.height)+"px",i.appendChild(s)),o.type){case"center":s.style.top=p.height/2-s.offsetHeight/2+"px",s.style.left=p.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(a.pageY-p.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(a.pageX-p.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=o.color,s.className="waves-ripple z-active",!1}},!1)}}),i=function(e){e.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(i)),o.install=i;t.a=o},fwUS:function(e,t,a){},jUE0:function(e,t,a){}}]);