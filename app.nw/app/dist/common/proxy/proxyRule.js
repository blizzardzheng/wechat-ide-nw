"use strict";function init(){function e(e){var r=e.headers.host,i=e.connection.encrypted&&!/^http:/.test(e.url)?"https":"http",s="http"===i?e.url:i+"://"+r+e.url,n=t.parse(s);return n.pureHref=n.href.replace(/\?.*/,"").replace(/\#.*/,""),n}var t=(require("fs"),require("url")),r=require("path"),i=(require("zlib"),require("../../utils/report.js"),require("../../weapp/weApp.js")),s=require("../../config/config.js"),n="https://clients1.google.com/tbproxy/af/",o=s.weappURLRegular,p=s.weappASURLRegular,u=s.weappLocalIdRegular,a=s.weappWidgetPageRegular,c=s.weappWidgetServiceRegular,l=s.weappTraceRegular;_exports={shouldUseLocalResponse:function(t,r){var i=e(t),s=i.pureHref;return!!o.test(s)||(0===s.indexOf(n)||(!!p.test(s)||(!!u.test(s)||(!!a.test(s)||(!!c.test(s)||!!l.test(s))))))},dealLocalResponse:function(t,s,f){var g=e(t),d=g.pureHref;if(o.test(d)){var v=g.href;i.getResponse(v,function(e,t,i){if(e)return void f(e,t,i||"");r.extname(v).replace(".","");f(200,t,i)})}else 0===d.indexOf(n)?f(400,{},""):p.test(d)?i.getAppservice(d,function(e,t,r){return e?void f(e,{},r):void f(200,t,r)}):c.test(d)?i.getWidget(d,function(e,t,r){return e?void f(e,{},r):void f(200,t,r)}):a.test(d)?i.getWidgetPage(d,function(e,t,r){return e?void f(e,{},r):void f(200,t,r)}):u.test(d)?i.getLocalIdResponse(d.replace(u,"wxfile://"),function(e,t,r){return e?void f(e,{},r):void f(200,t,r)}):l.test(d)&&i.getTraceRoute(g,function(e,t){e?f(500,{},JSON.stringify(e.message)):f(200,{},JSON.stringify(t))})}}}var _exports;init(),module.exports=_exports;