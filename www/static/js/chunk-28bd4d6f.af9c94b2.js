(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28bd4d6f"],{"21ed":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"f",(function(){return i})),n.d(e,"a",(function(){return s})),n.d(e,"e",(function(){return u})),n.d(e,"d",(function(){return o}));var r=n("b775");function a(t){return Object(r["a"])({url:"/tutorial/list",method:"get",params:t})}function c(t){return Object(r["a"])({url:"/tutorial/".concat(t),method:"get"})}function i(t,e){return Object(r["a"])({url:"/tutorial/".concat(t),method:"put",data:e})}function s(t){return Object(r["a"])({url:"/tutorial/",method:"post",data:t})}function u(t){return Object(r["a"])({url:"/trigger/play/".concat(t.word),method:"put",data:t})}function o(t){return Object(r["a"])({url:"/trigger/open/".concat(t.word),method:"put",data:t})}},"7d63":function(t,e,n){},9406:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dashboard-container"},[n("div",{staticClass:"dashboard-text"},["admin-token"===t.token?n("span",[t._v("老師介面")]):n("span",[t._v("名稱: "+t._s(t.username))]),"admin-token"===t.token?n("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(e){return t.go(t.nulll,"created")}}},[t._v("建立新的故事")]):t._e()],1),n("el-row",{attrs:{gutter:20}},t._l(t.items,(function(e){return n("el-col",{key:e.id,staticStyle:{"margin-top":"15px"},attrs:{span:8}},[n("div",{staticClass:"grid-content bg-purple"},[n("el-card",{attrs:{"body-style":{padding:"0px"}}},[n("div",{staticStyle:{padding:"14px"}},[n("span",[t._v("編號: "),n("b",[t._v(t._s(e.ranking))])]),n("p",[t._v("教程標題: "),n("b",[t._v(t._s(e.title))])]),"admin-token"===t.token?n("div",{staticStyle:{height:"85px"}},[t._v(" 連結:"),n("br"),t._l(e.words,(function(e){return n("el-tag",{key:e,attrs:{type:"info",effect:"plain",size:"mini"}},[t._v(t._s(e))])}))],2):t._e(),n("div",{staticClass:"bottom clearfix",staticStyle:{"text-align":"center","margin-top":"10px"}},[n("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(n){return t.go(e.id,"story")}}},[t._v("進入")]),"admin-token"===t.token?n("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(n){return t.go(e.id,"edit")}}},[t._v("修改")]):t._e()],1)])])],1)])})),1)],1)},a=[],c=n("c7eb"),i=n("1da1"),s=n("5530"),u=n("2f62"),o=n("5c96"),d=n("21ed"),l={name:"Dashboard",data:function(){return{items:[],listLoading:!1}},computed:Object(s["a"])({},Object(u["b"])(["name","username","token"])),created:function(){this.initData()},methods:{initData:function(){var t=this;return Object(i["a"])(Object(c["a"])().mark((function e(){var n,r;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n=o["Loading"].service({fullscreen:!0}),e.next=4,Object(d["b"])();case 4:r=e.sent,n.close(),t.items=r.data.items,e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),t.$message(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()},go:function(t,e){var n=this;return Object(i["a"])(Object(c["a"])().mark((function r(){return Object(c["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:r.prev=0,r.t0=e,r.next="edit"===r.t0?4:"created"===r.t0?6:8;break;case 4:return n.$router.push("/story/edit/"+t),r.abrupt("break",10);case 6:return n.$router.push("/story/create/"),r.abrupt("break",10);case 8:return n.$router.push("/story/"+t),r.abrupt("break",10);case 10:r.next=15;break;case 12:r.prev=12,r.t1=r["catch"](0),n.$message(r.t1);case 15:case"end":return r.stop()}}),r,null,[[0,12]])})))()}}},p=l,b=(n("d525"),n("2877")),f=Object(b["a"])(p,r,a,!1,null,"032e0c2a",null);e["default"]=f.exports},d525:function(t,e,n){"use strict";n("7d63")}}]);