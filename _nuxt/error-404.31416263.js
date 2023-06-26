"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("./entry.f2fdbdd2.js"),i=require("./composables.36293571.js");const r=t=>(e.pushScopeId("data-v-6a830dec"),t=t(),e.popScopeId(),t),n={class:"font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden"},a=r(()=>e.createBaseVNode("div",{class:"fixed left-0 right-0 spotlight z-10"},null,-1)),d={class:"max-w-520px text-center z-20"},c=["textContent"],l=["textContent"],p={class:"w-full flex items-center justify-center"},u={__name:"error-404",props:{appName:{type:String,default:"Nuxt"},version:{type:String,default:""},statusCode:{type:Number,default:404},statusMessage:{type:String,default:"Not Found"},description:{type:String,default:"Sorry, the page you are looking for could not be found."},backHome:{type:String,default:"Go back home"}},setup(t){const o=t;return i.useHead({title:`${o.statusCode} - ${o.statusMessage} | ${o.appName}`,script:[],style:[{children:'*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e0e0e0}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}h1,p{margin:0}h1{font-size:inherit;font-weight:inherit}'}]}),(m,g)=>{const s=e.__nuxt_component_0;return e.openBlock(),e.createElementBlock("div",n,[a,e.createBaseVNode("div",d,[e.createBaseVNode("h1",{class:"text-8xl sm:text-10xl font-medium mb-8",textContent:e.toDisplayString(t.statusCode)},null,8,c),e.createBaseVNode("p",{class:"text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight",textContent:e.toDisplayString(t.description)},null,8,l),e.createBaseVNode("div",p,[e.createVNode(s,{to:"/",class:"gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"},{default:e.withCtx(()=>[e.createTextVNode(e.toDisplayString(t.backHome),1)]),_:1})])])])}}},f=e._export_sfc(u,[["__scopeId","data-v-6a830dec"]]);exports.default=f;
