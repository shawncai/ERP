(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3814"],{"0FQL":function(e,t,n){},"0zGY":function(e,t,n){"use strict";n.d(t,"n",function(){return r}),n.d(t,"s",function(){return o}),n.d(t,"f",function(){return i}),n.d(t,"o",function(){return d}),n.d(t,"l",function(){return p}),n.d(t,"j",function(){return l}),n.d(t,"m",function(){return c}),n.d(t,"k",function(){return s}),n.d(t,"i",function(){return u}),n.d(t,"h",function(){return m}),n.d(t,"a",function(){return g}),n.d(t,"v",function(){return v}),n.d(t,"q",function(){return f}),n.d(t,"p",function(){return h}),n.d(t,"c",function(){return y}),n.d(t,"d",function(){return b}),n.d(t,"u",function(){return w}),n.d(t,"g",function(){return I}),n.d(t,"r",function(){return N}),n.d(t,"b",function(){return R}),n.d(t,"t",function(){return S}),n.d(t,"e",function(){return j});var a=n("t3Un");function r(e){return Object(a.a)({url:"/country/getdeptlist",method:"post",params:e})}function o(e,t){var n=new URLSearchParams;return""!==e&&null!==e&&n.append("empids",e),""!==t&&null!==t&&n.append("stat",t),Object(a.a)({url:"/employee/startorendemp",method:"post",data:n})}function i(e,t){var n=new URLSearchParams;return""!==e&&null!==e&&n.append("empids",e),""!==t&&null!==t&&void 0!==t&&n.append("operatorId",t),Object(a.a)({url:"/employee/deleteemp",method:"post",data:n})}function d(e){var t=new URLSearchParams;return""!==e&&null!==e&&t.append("id",e),Object(a.a)({url:"/employee/getempinfo",method:"post",data:t})}function p(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),t.append("pageNum",e.pagenum),t.append("pageSize",e.pagesize),Object(a.a)({url:"/employee/getEmpStockInfo",method:"post",data:t})}function l(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),t.append("pageNum",e.pagenum),t.append("pageSize",e.pagesize),Object(a.a)({url:"/employee/getEmpCollect",method:"post",data:t})}function c(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),""!==e.customerName&&null!==e.customerName&&void 0!==e.customerName&&t.append("customerName",e.customerName),""!==e.beginTime&&null!==e.beginTime&&void 0!==e.beginTime&&t.append("beginTime",e.beginTime),""!==e.endTime&&null!==e.endTime&&void 0!==e.endTime&&t.append("endTime",e.endTime),t.append("pageNum",e.pagenum),t.append("pageSize",e.pagesize),Object(a.a)({url:"/employee/getEmpVisitInfo",method:"post",data:t})}function s(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("id",e.id),Object(a.a)({url:"/employee/getEmpServiceInfo",method:"post",data:t})}function u(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("handlerid",e.id),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(a.a)({url:"/admin/complaint/listcomplaintsemp",method:"post",data:t})}function m(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("empId",e.id),t.append("pageNum",e.pagenum),t.append("pageSize",e.pagesize),Object(a.a)({url:"/SaleReport/empCommission",method:"post",data:t})}function g(e){var t=new URLSearchParams;return""!==e.account&&null!==e.account&&void 0!==e.account&&t.append("account",e.account),Object(a.a)({url:"/employee/validation",method:"post",data:t})}function v(e){var t=new URLSearchParams;return""!==e.chargeRegions&&null!==e.chargeRegions&&void 0!==e.chargeRegions&&t.append("chargeRegions",e.chargeRegions),""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("employeeid",e.id),""!==e.firstName&&null!==e.firstName&&void 0!==e.firstName&&t.append("firstname",e.firstName),""!==e.middleName&&null!==e.middleName&&void 0!==e.middleName&&t.append("middlename",e.middleName),""!==e.lastName&&null!==e.lastName&&void 0!==e.lastName&&t.append("lastname",e.lastName),""!==e.password&&null!==e.password&&void 0!==e.password&&t.append("passwd",e.password),""!==e.email&&null!==e.email&&void 0!==e.email&&t.append("email",e.email),""!==e.phone&&null!==e.phone&&void 0!==e.phone&&t.append("phone",e.phone),""!==e.gender&&null!==e.gender&&void 0!==e.gender&&t.append("gender",e.gender),""!==e.countryId&&null!==e.countryId&&void 0!==e.countryId&&t.append("countryid",e.countryId),""!==e.provinceId&&null!==e.provinceId&&void 0!==e.provinceId&&t.append("provinceid",e.provinceId),""!==e.cityId&&null!==e.cityId&&void 0!==e.cityId&&t.append("cityid",e.cityId),""!==e.address&&null!==e.address&&void 0!==e.address&&t.append("address",e.address),""!==e.birthday&&null!==e.birthday&&void 0!==e.birthday&&t.append("birthday",e.birthday),""!==e.deptId&&null!==e.deptId&&void 0!==e.deptId&&t.append("deptid",e.deptId),""!==e.postId&&null!==e.postId&&void 0!==e.postId&&t.append("postid",e.postId),""!==e.repositoryId&&null!==e.repositoryId&&void 0!==e.repositoryId&&t.append("repositoryid",e.repositoryId),""!==e.roleId&&null!==e.roleId&&void 0!==e.roleId&&t.append("roleid",e.roleId),""!==e.regionId&&null!==e.regionId&&void 0!==e.regionId&&t.append("regionid",e.regionId),""!==e.certificateType&&null!==e.certificateType&&void 0!==e.certificateType&&t.append("certificatetype",e.certificateType),""!==e.certificateNumber&&null!==e.certificateNumber&&void 0!==e.certificateNumber&&t.append("certificatenumber",e.certificateNumber),Object(a.a)({url:"/employee/updateemp",method:"post",data:t})}function f(e){var t=new URLSearchParams;return t.append("firstname",e.firstname),t.append("middlename",e.middlename),t.append("lastname",e.lastname),t.append("passwd",e.passwd),t.append("email",e.email),t.append("phone",e.phone),t.append("gender",e.gender),t.append("countryid",e.country),t.append("provinceid",e.provinceid),t.append("cityid",e.cityid),t.append("address",e.address),""===e.birthday&&null===e.birthday||t.append("birthday",e.birthday),t.append("account",e.account),t.append("jobnumber",e.jobnumber),t.append("deptid",e.deptid),t.append("roleid",e.roleid),t.append("postid",e.postid),t.append("repositoryid",e.repositoryid),t.append("regionid",e.regionid1),t.append("certificatetype",e.certificatetype),t.append("certificatenumber",e.certificatenumber),""!==e.chargeRegions&&null!==e.chargeRegions&&void 0!==e.chargeRegions&&t.append("chargeRegions",e.chargeRegions),Object(a.a)({url:"/employee/register",method:"post",data:t})}function h(e){var t=new URLSearchParams;return""!==e.roleid&&null!==e.roleid&&void 0!==e.roleid&&t.append("roleid",e.roleid),""!==e.repositoryid&&null!==e.repositoryid&&void 0!==e.repositoryid&&t.append("repositoryid",e.repositoryid),""!==e.regionid&&null!==e.regionid&&void 0!==e.regionid&&t.append("regionid",e.regionid),""!==e.loginRepositoryId&&void 0!==e.loginRepositoryId&&null!==e.loginRepositoryId&&t.append("loginRepositoryId",e.loginRepositoryId),""!==e.regionIds&&void 0!==e.regionIds&&null!==e.regionIds&&t.append("regionIds",e.regionIds),""!==e.postid&&null!==e.postid&&void 0!==e.postid&&t.append("postid",e.postid),""!==e.deptid&&null!==e.deptid&&void 0!==e.deptid&&t.append("deptid",e.deptid),""!==e.employeename&&null!==e.employeename&&void 0!==e.employeename&&t.append("employeename",e.employeename),""!==e.stat&&null!==e.stat&&void 0!==e.stat&&t.append("stat",e.stat),""!==e.time&&null!==e.time&&t.append("time",e.time),""!==e.jobnumber&&null!==e.jobnumber&&void 0!==e.jobnumber&&t.append("jobnumber",e.jobnumber),""!==e.phonenumber&&void 0!==e.phonenumber&&null!==e.phonenumber&&t.append("phonenumber",e.phonenumber),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(a.a)({url:"/employee/getemplist",method:"post",data:t})}function y(e){var t=new URLSearchParams;return""!==e.employeeid&&t.append("employeeid",e.employeeid),""!==e.contractname&&t.append("contractname",e.contractname),""!==e.signtime&&null!==e.signtime&&t.append("signtime",e.signtime),""!==e.expiredtime&&null!==e.expiredtime&&t.append("expiredtime",e.expiredtime),""!==e.effectivetime&&null!==e.effectivetime&&t.append("effectivetime",e.effectivetime),""!==e.typeid&&t.append("typeid",e.typeid),""!==e.attribute&&t.append("attribute",e.attribute),""!==e.period&&t.append("period",e.period),""!==e.iscorrection&&t.append("iscorrection",e.iscorrection),""!==e.stat&&t.append("stat",e.stat),""!==e.advanceday&&t.append("advanceday",e.advanceday),""!==e.trialsalary&&t.append("trialsalary",e.trialsalary),""!==e.correctionsalary&&t.append("correctionsalary",e.correctionsalary),""!==e.remindpersonid&&t.append("remindpersonid",e.remindpersonid),Object(a.a)({url:"/contract/addcontract",method:"post",data:t})}function b(e){var t=new URLSearchParams;return""!==e.contractname&&t.append("contractname",e.contractname),""!==e.contractnumber&&t.append("contractnumber",e.contractnumber),""!==e.empnumber&&t.append("empnumber",e.empnumber),""!==e.empname&&t.append("empname",e.empname),""!==e.isEnd&&void 0!==e.isEnd&&null!==e.isEnd&&t.append("isEnd",e.isEnd),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(a.a)({url:"/contract/contractlist",method:"post",data:t})}function w(e){var t=new URLSearchParams;return""!==e.id&&t.append("contractid",e.id),""!==e.contractName&&t.append("contractname",e.contractName),""!==e.signTime&&t.append("signtime",e.signTime),""!==e.expiredTime&&t.append("expiredtime",e.expiredTime),""!==e.effectiveTime&&t.append("effectivetime",e.effectiveTime),""!==e.type&&t.append("typeid",e.type),""!==e.contractAttribute&&t.append("attribute",e.contractAttribute),""!==e.contractAttribute&&t.append("period",e.period),""!==e.isCorrection&&t.append("iscorrection",e.isCorrection),""!==e.stat&&t.append("stat",e.stat),""!==e.advanceDay&&t.append("advanceday",e.advanceDay),""!==e.trialSalary&&t.append("trialsalary",e.trialSalary),""!==e.correctionSalary&&t.append("correctionsalary",e.correctionSalary),""!==e.expiredRemindPersonId&&null!==e.expiredRemindPersonId&&t.append("remindpersonid",e.expiredRemindPersonId),Object(a.a)({url:"/contract/updatecontract",method:"post",data:t})}function I(e,t){var n=new URLSearchParams;return""!==e&&null!==e&&n.append("empcontractids",e),""!==t&&null!==t&&void 0!==t&&n.append("operatorId",t),Object(a.a)({url:"/contract/deleteempcontract",method:"post",data:n})}function N(e){var t=new URLSearchParams;return""!==e.categoryname&&null!==e.categoryname&&void 0!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.iseffective&&null!==e.iseffective&&void 0!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.type&&null!==e.type&&void 0!==e.type&&t.append("type",e.type),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(a.a)({url:"/employee/searchEmpCategory",method:"post",data:t})}function R(e){var t=new URLSearchParams;return""!==e.categoryname&&null!==e.categoryname&&t.append("categoryname",e.categoryname),""!==e.category&&null!==e.category&&t.append("category",e.category),""!==e.iseffective&&null!==e.iseffective&&t.append("iseffective",e.iseffective),""!==e.type&&null!==e.type&&t.append("type",e.type),Object(a.a)({url:"/employee/addEmpCategory",method:"post",data:t})}function S(e){var t=new URLSearchParams;return""!==e.categoryName&&null!==e.categoryName&&t.append("categoryname",e.categoryName),""!==e.isEffective&&null!==e.isEffective&&t.append("iseffective",e.isEffective),""!==e.id&&null!==e.id&&t.append("id",e.id),Object(a.a)({url:"/employee/updateEmpCategory",method:"post",data:t})}function j(e,t){var n=new URLSearchParams;return""!==e&&null!==e&&n.append("ids",e),""!==t&&null!==t&&void 0!==t&&n.append("operatorId",t),Object(a.a)({url:"/employee/delateEmpCategory",method:"post",data:n})}},"6D7i":function(e,t,n){"use strict";var a=n("0FQL");n.n(a).a},"6HaC":function(e,t,n){"use strict";n.d(t,"Q",function(){return r}),n.d(t,"r",function(){return o}),n.d(t,"k",function(){return i}),n.d(t,"j",function(){return d}),n.d(t,"i",function(){return p}),n.d(t,"t",function(){return l}),n.d(t,"v",function(){return c}),n.d(t,"E",function(){return s}),n.d(t,"F",function(){return u}),n.d(t,"A",function(){return m}),n.d(t,"M",function(){return g}),n.d(t,"J",function(){return v}),n.d(t,"K",function(){return f}),n.d(t,"y",function(){return h}),n.d(t,"u",function(){return y}),n.d(t,"b",function(){return b}),n.d(t,"p",function(){return w}),n.d(t,"q",function(){return I}),n.d(t,"w",function(){return N}),n.d(t,"x",function(){return R}),n.d(t,"B",function(){return S}),n.d(t,"C",function(){return j}),n.d(t,"L",function(){return C}),n.d(t,"O",function(){return L}),n.d(t,"G",function(){return O}),n.d(t,"H",function(){return P}),n.d(t,"s",function(){return U}),n.d(t,"D",function(){return z}),n.d(t,"I",function(){return _}),n.d(t,"N",function(){return k}),n.d(t,"P",function(){return x}),n.d(t,"o",function(){return E}),n.d(t,"l",function(){return T}),n.d(t,"a",function(){return $}),n.d(t,"n",function(){return A}),n.d(t,"z",function(){return F}),n.d(t,"c",function(){return V}),n.d(t,"h",function(){return H}),n.d(t,"f",function(){return M}),n.d(t,"g",function(){return q}),n.d(t,"e",function(){return K}),n.d(t,"d",function(){return Q}),n.d(t,"m",function(){return B});var a=n("t3Un");function r(e){var t=new URLSearchParams;return""!==e.carCode&&null!==e.carCode&&void 0!==e.carCode&&t.append("carCode",e.carCode),""!==e.batteryCode&&null!==e.batteryCode&&void 0!==e.batteryCode&&t.append("batteryCode",e.batteryCode),""!==e.motorCode&&null!==e.motorCode&&void 0!==e.motorCode&&t.append("motorCode",e.motorCode),""!==e.snCode&&null!==e.snCode&&void 0!==e.snCode&&t.append("snCode",e.snCode),Object(a.a)({url:"/vehicleTrack/vehicleInfo",method:"post",params:t})}function o(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("currencyId",e),Object(a.a)({url:"/zcc/getRate",method:"post",params:t})}function i(e){var t=new URLSearchParams;return""!==e.searchRepositoryId&&null!==e.searchRepositoryId&&void 0!==e.searchRepositoryId&&t.append("searchRepositoryId",e.searchRepositoryId),""!==e.productCode&&null!==e.productCode&&void 0!==e.productCode&&t.append("productCode",e.productCode),""!==e.productName&&null!==e.productName&&void 0!==e.productName&&t.append("productName",e.productName),""!==e.date&&null!==e.date&&void 0!==e.date&&t.append("date",e.date),""!==e.pageNum&&null!==e.pageNum&&void 0!==e.pageNum&&t.append("pageNum",e.pageNum),""!==e.pageSize&&null!==e.pageSize&&void 0!==e.pageSize&&t.append("pageSize",e.pageSize),""!==e.repositoryId&&null!==e.repositoryId&&void 0!==e.repositoryId&&t.append("repositoryId",e.repositoryId),""!==e.regionIds&&null!==e.regionIds&&void 0!==e.regionIds&&t.append("regionIds",e.regionIds),Object(a.a)({url:"/endmonth/endMonthCount",method:"post",params:t})}function d(e,t){var n=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&n.append("searchRepositoryId",e),""!==t&&null!==t&&void 0!==t&&n.append("code",t),Object(a.a)({url:"/allinventory/countlist3",method:"post",params:n})}function p(e,t,n){var r=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&r.append("repositoryId",e),""!==t&&null!==t&&void 0!==t&&r.append("regionIds",t),""!==n&&null!==n&&void 0!==n&&r.append("code",n),Object(a.a)({url:"/allinventory/countlist",method:"post",params:r})}function l(){return Object(a.a)({url:"/materialslist/getBomNumber",method:"post"})}function c(e){return Object(a.a)({url:"/country/getcountrylist",method:"post",params:e})}function s(e){return Object(a.a)({url:"/region/detaillist",method:"post",params:e})}function u(e){return Object(a.a)({url:"/region/detaillist",method:"post",params:e})}function m(e){var t=new URLSearchParams;return""!==e.region&&null!==e.region&&void 0!==e.region&&t.append("parentid",e.region),Object(a.a)({url:"/region/listbyparentid",method:"post",data:t})}function g(e){var t=new URLSearchParams;return""!==e.regionid&&null!==e.regionid&&void 0!==e.regionid&&t.append("regionid",e.regionid),Object(a.a)({url:"/region/list",method:"post",data:t})}function v(e,t,n){var r=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&r.append("regionId",e),""!==t&&null!==t&&void 0!==t&&r.append("loginRepositoryId",t),""!==n&&null!==n&&void 0!==n&&r.append("regionIds",n),r.append("iseffective",1),r.append("pagenum",1),r.append("pagesize",99999),Object(a.a)({url:"/repository/searchRepository",method:"post",data:r})}function f(e,t,n){var r=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&r.append("regionId",e),""!==t&&null!==t&&void 0!==t&&r.append("loginRepositoryId",t),""!==n&&null!==n&&void 0!==n&&r.append("regionIds",n),r.append("iseffective",1),r.append("pagenum",1),r.append("pagesize",99999),Object(a.a)({url:"/repository/searchRepository",method:"post",data:r})}function h(e){var t=new URLSearchParams;return t.append("countryid",e),Object(a.a)({url:"/country/getprovincelist",method:"post",data:t})}function y(e){var t=new URLSearchParams;return t.append("provinceid",e),Object(a.a)({url:"/country/getcitylist",method:"post",data:t})}function b(e,t){var n=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&n.append("repositoryId",e),""!==t&&null!==t&&void 0!==t&&n.append("productCode",t),Object(a.a)({url:"/location/batchlist",method:"post",data:n})}function w(e,t,n,r){var o=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&o.append("repositoryId",e),""!==t&&null!==t&&void 0!==t&&o.append("locationId",t),""!==n&&null!==n&&void 0!==n&&o.append("productCode",n),""!==r&&null!==r&&void 0!==r&&o.append("batch",r),Object(a.a)({url:"/location/getQuantity",method:"post",data:o})}function I(e,t,n,r){var o=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&o.append("repositoryId",e),""!==t&&null!==t&&void 0!==t&&o.append("locationId",t),""!==n&&null!==n&&void 0!==n&&o.append("productCode",n),""!==r&&null!==r&&void 0!==r&&o.append("batch",r),Object(a.a)({url:"/location/getQuantity2",method:"post",data:o})}function N(e,t){var n=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&n.append("repositoryId",e),""!==t&&null!==t&&void 0!==t&&""!==t.productCode&&null!==t.productCode&&void 0!==t.productCode&&n.append("productCode",t.productCode),n.append("isEffective",1),Object(a.a)({url:"/location/getlocation",method:"post",data:n})}function R(e,t){var n=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&n.append("repositoryId",e),""!==t.toolsCode&&null!==t.toolsCode&&void 0!==t.toolsCode&&n.append("productCode",t.toolsCode),n.append("isEffective",1),Object(a.a)({url:"/location/getlocation",method:"post",data:n})}function S(e,t){var n=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&n.append("searchRepositoryId",e),""!==t&&null!==t&&void 0!==t&&n.append("locationCode",t),n.append("isEffective",1),n.append("pageNum",1),n.append("pageSize",99999),Object(a.a)({url:"/location/locationlist",method:"post",data:n})}function j(){var e=new URLSearchParams;return e.append("pageNum",1),e.append("pageSize",9999),Object(a.a)({url:"/materialslist/materialslist",method:"post",data:e})}function C(){var e=new URLSearchParams;return e.append("stat",1),e.append("pageNum",1),e.append("pageSize",9999),Object(a.a)({url:"/processFile/search",method:"post",data:e})}function L(e){var t=new URLSearchParams;return t.append("deptId",e),t.append("stat",1),t.append("pageNum",1),t.append("pageSize",99999),Object(a.a)({url:"/workCenter/search",method:"post",data:t})}function O(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("sourceNumber",e),Object(a.a)({url:"/requireplan/requireplanlist",method:"post",data:t})}function P(e,t){var n=new URLSearchParams;return n.append("zcc",e),n.append("regionId",t),Object(a.a)({url:"/zcc/saveRegion",method:"post",data:n})}function U(e){var t=new URLSearchParams;return t.append("regionId",e),Object(a.a)({url:"/zcc/getRegion",method:"post",data:t})}function z(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("code",e),t.append("pagenum",1),t.append("pagesize",99999),Object(a.a)({url:"/product/productlist",method:"post",data:t})}function _(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("categoryname",e),t.append("pagenum",1),t.append("pagesize",9999),Object(a.a)({url:"/measurement/search",method:"post",data:t})}function k(e){var t=new URLSearchParams;return t.append("supplierName",e),t.append("pagenum",1),t.append("pagesize",99999),Object(a.a)({url:"/supplier/search",method:"post",data:t})}function x(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("supplierId",e),t.append("pageNum",1),t.append("pageSize",9999),Object(a.a)({url:"/payment/shouldPayList",method:"post",data:t})}function E(){return Object(a.a)({url:"/zcc/getId",method:"post"})}function T(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("customerPhone",e),Object(a.a)({url:"/installmentapply/existList",method:"post",data:t})}function $(e){var t=new URLSearchParams;return""!==e.collectId&&null!==e.collectId&&void 0!==e.collectId&&t.append("collectId",e.collectId),""!==e.sourceNumber&&null!==e.sourceNumber&&void 0!==e.sourceNumber&&t.append("sourceNumber",e.sourceNumber),""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("agentId",e.id),t.append("repositoryId",0),t.append("pageNum",1),t.append("pageSize",9999),Object(a.a)({url:"/agentCollect/agentCollectList",method:"post",data:t})}function A(e){var t=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&t.append("detailId",e),Object(a.a)({url:"/role/getDetailById",method:"post",data:t})}function F(e){var t=new URLSearchParams;return""!==e.loginRepositoryId&&null!==e.loginRepositoryId&&void 0!==e.loginRepositoryId&&t.append("repositoryid",e.loginRepositoryId),""!==e.regionIds&&null!==e.regionIds&&void 0!==e.regionIds&&t.append("regionid",e.regionIds),Object(a.a)({url:"/region/getregionlistbyreid",method:"post",data:t})}function V(e){var t=new URLSearchParams;return t.append("applyNumber",e),Object(a.a)({url:"/receiptStat/checkReceiptApply",method:"post",data:t})}function H(e){var t=new URLSearchParams;return t.append("planNumber",e),Object(a.a)({url:"/receiptStat/checkReceiptPlan",method:"post",data:t})}function M(e){var t=new URLSearchParams;return t.append("orderNumber",e),Object(a.a)({url:"/receiptStat/checkReceiptOrder",method:"post",data:t})}function q(e){var t=new URLSearchParams;return t.append("orderNumber",e),Object(a.a)({url:"/saleReceiptStat/checkReceiptOrder",method:"post",data:t})}function K(e){var t=new URLSearchParams;return t.append("opportunityNumber",e),Object(a.a)({url:"/saleReceiptStat/checkReceiptOpportunity",method:"post",data:t})}function Q(e){var t=new URLSearchParams;return t.append("applyNumber",e),Object(a.a)({url:"/installmentReceiptStat/checkReceiptApply",method:"post",data:t})}function B(e){var t=new URLSearchParams;return""!==e.productCode&&null!==e.productCode&&void 0!==e.productCode&&t.append("productCode",e.productCode),""!==e.batch&&null!==e.batch&&void 0!==e.batch&&t.append("batch",e.batch),""!==e.repositoryId&&null!==e.repositoryId&&void 0!==e.repositoryId&&t.append("repositoryId",e.repositoryId),""!==e.locationId&&null!==e.locationId&&void 0!==e.locationId&&t.append("locationId",e.locationId),Object(a.a)({url:"/allinventory/getAllBatch",method:"post",data:t})}},GAWx:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return o}),n.d(t,"e",function(){return i}),n.d(t,"c",function(){return d}),n.d(t,"d",function(){return p});var a=n("t3Un");function r(e){var t=new URLSearchParams;return""!==e.cartype&&null!==e.cartype&&void 0!==e.cartype&&t.append("cartype",e.cartype),""!==e.carnumber&&null!==e.carnumber&&void 0!==e.carnumber&&t.append("carnumber",e.carnumber),""!==e.carname&&null!==e.carname&&void 0!==e.carname&&t.append("carname",e.carname),""!==e.licencenumber&&null!==e.licencenumber&&void 0!==e.licencenumber&&t.append("licencenumber",e.licencenumber),""!==e.carload&&null!==e.carload&&void 0!==e.carload&&t.append("carload",e.carload),""!==e.stat&&null!==e.stat&&void 0!==e.stat&&t.append("stat",e.stat),""!==e.drivers&&null!==e.drivers&&void 0!==e.drivers&&t.append("drivers",e.drivers),""!==e.createid&&null!==e.createid&&void 0!==e.createid&&t.append("createid",e.createid),""!==e.driverNames&&null!==e.driverNames&&void 0!==e.driverNames&&t.append("driverNames",e.driverNames),Object(a.a)({url:"/logisticsCar/addcar",method:"post",data:t})}function o(e){var t=new URLSearchParams;return""!==e.cartype&&null!==e.cartype&&void 0!==e.cartype&&t.append("cartype",e.cartype),""!==e.carnumber&&null!==e.carnumber&&void 0!==e.carnumber&&t.append("carnumber",e.carnumber),""!==e.carname&&null!==e.carname&&void 0!==e.carname&&t.append("carname",e.carname),""!==e.licencenumber&&null!==e.licencenumber&&void 0!==e.licencenumber&&t.append("licencenumber",e.licencenumber),""!==e.stat&&null!==e.stat&&void 0!==e.stat&&t.append("stat",e.stat),t.append("pagenum",e.pagenum),t.append("pagesize",e.pagesize),Object(a.a)({url:"/logisticsCar/carlist",method:"post",data:t})}function i(e){var t=new URLSearchParams;return""!==e.outPersonId&&null!==e.outPersonId&&void 0!==e.outPersonId&&t.append("outPersonId",e.outPersonId),""!==e.carId&&null!==e.carId&&void 0!==e.carId&&t.append("carId",e.carId),t.append("pageNum",e.pagenum),t.append("pageSize",e.pagesize),Object(a.a)({url:"/logisticsCar/useLogList",method:"post",data:t})}function d(e,t){var n=new URLSearchParams;return""!==e&&null!==e&&void 0!==e&&n.append("logicarids",e),""!==t&&null!==t&&void 0!==t&&n.append("operatorId",t),Object(a.a)({url:"/logisticsCar/deletecar",method:"post",data:n})}function p(e){var t=new URLSearchParams;return""!==e.id&&null!==e.id&&void 0!==e.id&&t.append("logicarid",e.id),""!==e.carType&&null!==e.carType&&void 0!==e.carType&&t.append("cartype",e.carType),""!==e.carNumber&&null!==e.carNumber&&void 0!==e.carNumber&&t.append("carnumber",e.carNumber),""!==e.carName&&null!==e.carName&&void 0!==e.carName&&t.append("carname",e.carName),""!==e.licenceNumber&&null!==e.licenceNumber&&void 0!==e.licenceNumber&&t.append("licencenumber",e.licenceNumber),""!==e.carLoad&&null!==e.carLoad&&void 0!==e.carLoad&&t.append("carload",e.carLoad),""!==e.stat&&null!==e.stat&&void 0!==e.stat&&t.append("stat",e.stat),""!==e.driverNames&&null!==e.driverNames&&void 0!==e.driverNames&&t.append("driverNames",e.driverNames),Object(a.a)({url:"/logisticsCar/updatecar",method:"post",data:t})}},U0yH:function(e,t,n){"use strict";var a=n("6HaC"),r=n("0zGY"),o=n("ZySA"),i=n("Mz3J"),d={directives:{waves:o.a},components:{Pagination:i.a},filters:{genderFilter:function(e){return{1:"男",2:"女"}[e]}},props:{control:{type:Boolean,default:!1}},data:function(){return{jobCat:{type:2,pagenum:1,pagesize:9999},jobs:[],moreaction:"",managerPeople:"",regionManagerId:"",currentRow:null,list:[],total:0,tableKey:0,listLoading:!0,getemplist:{repositoryid:"",regionid:"",postid:"",deptid:"",employeename:"",pagenum:1,pagesize:10,stat:1,loginRepositoryId:this.$store.getters.repositoryId,regionIds:this.$store.getters.regionIds,time:"",jobnumber:""},depts:[],props2:{value:"id",label:"regionName",children:"regionListVos"},regions2:[],getemplistregions:[],repositories:[],employeeVisible:this.control,regionManagerVisible:!1}},watch:{control:function(){this.employeeVisible=this.control,console.log(this.control),this.gitemplist()}},created:function(){this.gitemplist()},beforeCreate:function(){this},methods:{gitemplist:function(){var e=this;this.listLoading=!0,console.log(this.getemplist),Object(r.p)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount),setTimeout(function(){e.listLoading=!1},50)}),Object(r.n)().then(function(t){200===t.data.ret&&(e.depts=t.data.data.content)}),Object(a.E)().then(function(t){200===t.data.ret&&(e.regions2=e.tranKTree(t.data.data.content))}),Object(r.r)(this.jobCat).then(function(t){200===t.data.ret?e.jobs=t.data.data.content.list:console.log("职位列表出错")})},tranKTree:function(e){var t=this;if(e&&e.length)return e.map(function(e){return{id:e.id,regionName:e.regionName,regionListVos:t.tranKTree(e.regionListVos)}})},handleFilter:function(){var e=this;this.getemplist.regionid=this.getemplistregions[this.getemplistregions.length-1],Object(r.p)(this.getemplist).then(function(t){200===t.data.ret&&(e.list=t.data.data.content.list,e.total=t.data.data.content.totalCount)})},handleAdd:function(){this.employeeVisible=!1,this.$router.push("/EmployeeInformation/NewEmployeeInformation")},handlechange4:function(e){var t=this;console.log(e);var n=e[e.length-1];Object(a.J)(n).then(function(e){200===e.data.ret?(console.log(e),t.repositories=e.data.data.content.list):t.$message.error("出错了")})},restemplist:function(){this.getemplist={repositoryid:"",regionid:"",postid:"",deptid:"",employeename:"",pagenum:1,pagesize:10,stat:1,loginRepositoryId:this.$store.getters.repositoryId,regionIds:this.$store.getters.regionIds,time:"",jobnumber:""},this.getemplistregions=[]},handleCurrentChange:function(e){this.moreaction=e},handleAddTo:function(){this.employeeVisible=!1;var e=this.moreaction.map(function(e){return e.id}).join(),t=this.moreaction.map(function(e){return e.personName}).join();this.$emit("personName",t),this.$emit("personIds",e)}}},p=(n("6D7i"),n("KHd+")),l=Object(p.a)(d,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{attrs:{visible:e.employeeVisible,control:e.control,"close-on-press-escape":!1,title:e.$t("Hmodule.xzyg"),top:"10px","append-to-body":""},on:{"update:visible":function(t){e.employeeVisible=t},close:function(t){e.$emit("update:control",!1)}}},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("NewEmployeeInformation.employeename"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.employeename,callback:function(t){e.$set(e.getemplist,"employeename",t)},expression:"getemplist.employeename"}}),e._v(" "),n("el-input",{staticClass:"filter-item",attrs:{placeholder:e.$t("NewEmployeeInformation.jobnumber2"),clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.getemplist.jobnumber,callback:function(t){e.$set(e.getemplist,"jobnumber",t)},expression:"getemplist.jobnumber"}}),e._v(" "),n("el-date-picker",{staticClass:"filter-item",attrs:{placeholder:e.$t("Hmodule.xzrq"),type:"date","value-format":"yyyy-MM-dd"},model:{value:e.getemplist.time,callback:function(t){e.$set(e.getemplist,"time",t)},expression:"getemplist.time"}}),e._v(" "),n("el-popover",{attrs:{placement:"bottom",width:"500",trigger:"click"}},[n("el-cascader",{staticStyle:{width:"40%",float:"left","margin-left":"20px"},attrs:{options:e.regions2,props:e.props2,"show-all-levels":!1,placeholder:e.$t("Hmodule.xzqy"),"change-on-select":"",filterable:"",clearable:""},on:{change:e.handlechange4},model:{value:e.getemplistregions,callback:function(t){e.getemplistregions=t},expression:"getemplistregions"}}),e._v(" "),n("el-select",{staticStyle:{width:"40%",float:"right","margin-right":"20px"},attrs:{placeholder:e.$t("Hmodule.xzmd"),clearable:"",filterable:""},model:{value:e.getemplist.repositoryid,callback:function(t){e.$set(e.getemplist,"repositoryid",t)},expression:"getemplist.repositoryid"}},e._l(e.repositories,function(e,t){return n("el-option",{key:t,attrs:{label:e.repositoryName,value:e.id}})})),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"40%",float:"left","margin-top":"10px","margin-left":"20px"},attrs:{value:e.getemplist.postid,placeholder:e.$t("NewEmployeeInformation.postid2"),clearable:""},model:{value:e.getemplist.postid,callback:function(t){e.$set(e.getemplist,"postid",t)},expression:"getemplist.postid"}},e._l(e.jobs,function(e,t){return n("el-option",{key:t,attrs:{label:e.categoryName,value:e.id}})})),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"40%",float:"right","margin-top":"10px","margin-right":"20px"},attrs:{placeholder:e.$t("NewEmployeeInformation.deptid2"),clearable:""},model:{value:e.getemplist.deptid,callback:function(t){e.$set(e.getemplist,"deptid",t)},expression:"getemplist.deptid"}},e._l(e.depts,function(e,t){return n("el-option",{key:t,attrs:{label:e.deptName,value:e.id}})})),e._v(" "),n("div",{staticClass:"seachbutton",staticStyle:{width:"100%",float:"right","margin-top":"20px"}},[n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))])],1),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{slot:"reference",type:"primary"},slot:"reference"},[e._v(e._s(e.$t("public.filter"))),n("svg-icon",{staticStyle:{"margin-left":"4px"},attrs:{"icon-class":"shaixuan"}})],1)],1),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("public.search")))]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px"},attrs:{icon:"el-icon-plus",type:"success"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("public.add")))])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleCurrentChange}},[n("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.id"),resizable:!1,property:"id",align:"center",width:"50"}}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.jobNumber"),resizable:!1,property:"jobNumber",align:"center",width:"100"}}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.account"),resizable:!1,property:"account",width:"150",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.name"),resizable:!1,align:"center",width:"109"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.firstName)+" "+e._s(t.row.middleName)+" "+e._s(t.row.lastName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.gender"),resizable:!1,prop:"gender",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("genderFilter")(t.row.gender)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.deptName"),resizable:!1,prop:"deptName",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.deptName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.regionName"),resizable:!1,prop:"regionName",align:"center",width:"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.regionName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("NewEmployeeInformation.repositoryName"),resizable:!1,prop:"repositoryName",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.repositoryName))])]}}])})],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],staticStyle:{padding:"0"},attrs:{total:e.total,page:e.getemplist.pagenum,limit:e.getemplist.pagesize},on:{"update:page":function(t){e.$set(e.getemplist,"pagenum",t)},"update:limit":function(t){e.$set(e.getemplist,"pagesize",t)},pagination:e.gitemplist}}),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"86px","margin-top":"20px"},attrs:{type:"success"},on:{click:e.handleAddTo}},[e._v(e._s(e.$t("public.addTo")))])],1)],1)},[],!1,null,"25bedcd4",null);l.options.__file="MyEmp.vue";t.a=l.exports},Y5bG:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),Math.easeInOutQuad=function(e,t,n,a){return(e/=a/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t};var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function r(e,t,n){var r=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,o=e-r,i=0;t=void 0===t?500:t;!function e(){i+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(i,r,o,t)),i<t?a(e):n&&"function"==typeof n&&n()}()}},ZySA:function(e,t,n){"use strict";var a=n("P2sY"),r=n.n(a),o=(n("jUE0"),{bind:function(e,t){e.addEventListener("click",function(n){var a=r()({},t.value),o=r()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),i=o.ele;if(i){i.style.position="relative",i.style.overflow="hidden";var d=i.getBoundingClientRect(),p=i.querySelector(".waves-ripple");switch(p?p.className="waves-ripple":((p=document.createElement("span")).className="waves-ripple",p.style.height=p.style.width=Math.max(d.width,d.height)+"px",i.appendChild(p)),o.type){case"center":p.style.top=d.height/2-p.offsetHeight/2+"px",p.style.left=d.width/2-p.offsetWidth/2+"px";break;default:p.style.top=(n.pageY-d.top-p.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",p.style.left=(n.pageX-d.left-p.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return p.style.backgroundColor=o.color,p.className="waves-ripple z-active",!1}},!1)}}),i=function(e){e.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(i)),o.install=i;t.a=o},jUE0:function(e,t,n){}}]);