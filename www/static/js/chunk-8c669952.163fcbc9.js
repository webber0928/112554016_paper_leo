(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8c669952"],{"4cc5":function(t,e,n){},"577a":function(t,e,n){"use strict";n("4cc5")},bd5f:function(t,e,n){"use strict";n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return o}));var r=n("b775");function a(t){return Object(r["a"])({url:"/gpt-message",method:"post",data:t})}function c(t){return Object(r["a"])({url:"/prompt/edit",method:"put",data:t})}function o(){return Object(r["a"])({url:"/prompt",method:"get"})}},ec23:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"機器人Prompt"}},[n("el-input",{attrs:{rows:"20",type:"textarea"},model:{value:t.form.prompt,callback:function(e){t.$set(t.form,"prompt",e)},expression:"form.prompt"}})],1),n("el-form-item",[n("el-button",{attrs:{loading:t.loading,type:"primary"},on:{click:t.onSubmit}},[t._v("存檔")]),n("el-button",{on:{click:t.onCancel}},[t._v("取消")])],1)],1)],1)},a=[],c=n("c7eb"),o=n("1da1"),i=n("bd5f"),u=n("5c96"),s={data:function(){return{form:{prompt:""},result:{},loading:!1}},created:function(){this.initGptData()},methods:{initGptData:function(){var t=this;return Object(o["a"])(Object(c["a"])().mark((function e(){var n,r;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n=u["Loading"].service({fullscreen:!0}),e.next=4,Object(i["b"])();case 4:r=e.sent,t.form.prompt=r.data.prompt,n.close(),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),t.$message(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()},onSubmit:function(){var t=this;return Object(o["a"])(Object(c["a"])().mark((function e(){return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$message("submit!"),t.loading=!0,e.next=4,Object(i["a"])(t.form);case 4:t.loading=!1,t.$router.push("/prompt/");case 6:case"end":return e.stop()}}),e)})))()},onCancel:function(){this.$message({message:"取消!",type:"warning"}),this.$router.push("/prompt/")}}},p=s,l=(n("577a"),n("2877")),m=Object(l["a"])(p,r,a,!1,null,"4acaa540",null);e["default"]=m.exports}}]);