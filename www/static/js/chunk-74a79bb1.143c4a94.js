(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74a79bb1"],{"21ed":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"f",(function(){return o})),n.d(e,"a",(function(){return u})),n.d(e,"e",(function(){return l})),n.d(e,"d",(function(){return c}));var r=n("b775");function a(t){return Object(r["a"])({url:"/tutorial/list",method:"get",params:t})}function i(t){return Object(r["a"])({url:"/tutorial/".concat(t),method:"get"})}function o(t,e){return Object(r["a"])({url:"/tutorial/".concat(t),method:"put",data:e})}function u(t){return Object(r["a"])({url:"/tutorial/",method:"post",data:t})}function l(t){return Object(r["a"])({url:"/trigger/play/".concat(t.word),method:"put",data:t})}function c(t){return Object(r["a"])({url:"/trigger/open/".concat(t.word),method:"put",data:t})}},"857a":function(t,e,n){var r=n("1d80"),a=/"/g;t.exports=function(t,e,n,i){var o=String(r(t)),u="<"+e;return""!==n&&(u+=" "+n+'="'+String(i).replace(a,"&quot;")+'"'),u+">"+o+"</"+e+">"}},9648:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"chatroom-text"},[n("el-container",[n("el-header",[n("div",[n("el-button",{attrs:{type:"text",plain:""},on:{click:function(e){return t.$router.push("/story")}}},[t._v("返回")])],1)]),n("el-row",[n("el-col",[n("h2",{staticStyle:{"text-align":"center"}},[t._v("文章修改")]),n("br")]),n("el-col",[n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"編號"}},[n("el-input",{model:{value:t.form.ranking,callback:function(e){t.$set(t.form,"ranking",e)},expression:"form.ranking"}})],1),n("el-form-item",{attrs:{label:"文章標題"}},[n("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),n("el-form-item",{attrs:{label:"文章內容"}},[n("el-input",{attrs:{rows:"7",type:"textarea"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1),n("el-form-item",{attrs:{label:"Prompt"}},[n("el-input",{attrs:{rows:"7",type:"textarea"},model:{value:t.form.prompt,callback:function(e){t.$set(t.form,"prompt",e)},expression:"form.prompt"}})],1),n("el-form-item",{attrs:{label:"連結"}},[t._l(t.form.link,(function(e){return n("el-tag",{key:e,attrs:{closable:"","disable-transitions":!1},on:{close:function(n){return t.handleClose(e)}}},[t._v(" "+t._s(e)+" ")])})),t.inputVisible?n("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",on:{blur:t.handleInputConfirm},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm(e)}},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}}):n("el-button",{staticClass:"button-new-tag",on:{click:t.showInput}},[t._v("+ 新增連結")])],2),n("el-form-item",[n("el-button",{attrs:{loading:t.loading,type:"primary"},on:{click:t.onSubmit}},[t._v("存檔")]),n("el-button",{on:{click:t.onCancel}},[t._v("取消")])],1)],1)],1)],1)],1)],1)])},a=[],i=n("c7eb"),o=n("1da1"),u=(n("a434"),n("9911"),n("21ed")),l=n("5c96"),c={data:function(){return{form:{title:"",content:"",prompt:"",ranking:"",link:[]},loading:!1,inputVisible:!1,inputValue:""}},created:function(){this.initGptData(this.$route.params.id)},methods:{initGptData:function(t){var e=this;return Object(o["a"])(Object(i["a"])().mark((function n(){var r,a;return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,r=l["Loading"].service({fullscreen:!0}),n.next=4,Object(u["c"])(t);case 4:a=n.sent,r.close(),e.form.title=a.data.title,e.form.content=a.data.content,e.form.ranking=a.data.ranking,e.form.prompt=a.data.prompt,e.form.link=a.data.link||[],e.initData={role:"assistant",content:a.data.content},e.initGptData2(e.initData),n.next=18;break;case 15:n.prev=15,n.t0=n["catch"](0),e.$message(n.t0);case 18:case"end":return n.stop()}}),n,null,[[0,15]])})))()},onSubmit:function(){var t=this;return Object(o["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$message("submit!"),t.loading=!0,e.next=4,Object(u["f"])(t.$route.params.id,t.form);case 4:t.loading=!1,t.$router.push("/story/");case 6:case"end":return e.stop()}}),e)})))()},onCancel:function(){this.$message({message:"取消!",type:"warning"}),this.$router.push("/story/")},handleClose:function(t){this.form.link.splice(this.form.link.indexOf(t),1)},showInput:function(){var t=this;this.inputVisible=!0,this.$nextTick((function(e){t.$refs.saveTagInput.$refs.input.focus()}))},handleInputConfirm:function(){var t=this.inputValue;t&&(-1===this.form.link.indexOf(t)?this.form.link.push(t):this.$message({type:"warn",message:"".concat(t," 已經重複瞜")})),this.inputVisible=!1,this.inputValue=""}}},s=c,f=(n("c28a"),n("2877")),p=Object(f["a"])(s,r,a,!1,null,"59541172",null);e["default"]=p.exports},9911:function(t,e,n){"use strict";var r=n("23e7"),a=n("857a"),i=n("af03");r({target:"String",proto:!0,forced:i("link")},{link:function(t){return a(this,"a","href",t)}})},"9f48":function(t,e,n){},a434:function(t,e,n){"use strict";var r=n("23e7"),a=n("23cb"),i=n("a691"),o=n("50c4"),u=n("7b0b"),l=n("65f0"),c=n("8418"),s=n("1dde"),f=n("ae40"),p=s("splice"),m=f("splice",{ACCESSORS:!0,0:0,1:2}),d=Math.max,h=Math.min,b=9007199254740991,g="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!p||!m},{splice:function(t,e){var n,r,s,f,p,m,k=u(this),v=o(k.length),w=a(t,v),x=arguments.length;if(0===x?n=r=0:1===x?(n=0,r=v-w):(n=x-2,r=h(d(i(e),0),v-w)),v+n-r>b)throw TypeError(g);for(s=l(k,r),f=0;f<r;f++)p=w+f,p in k&&c(s,f,k[p]);if(s.length=r,n<r){for(f=w;f<v-r;f++)p=f+r,m=f+n,p in k?k[m]=k[p]:delete k[m];for(f=v;f>v-r+n;f--)delete k[f-1]}else if(n>r)for(f=v-r;f>w;f--)p=f+r-1,m=f+n-1,p in k?k[m]=k[p]:delete k[m];for(f=0;f<n;f++)k[f+w]=arguments[f+2];return k.length=v-r+n,s}})},af03:function(t,e,n){var r=n("d039");t.exports=function(t){return r((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},c28a:function(t,e,n){"use strict";n("9f48")}}]);