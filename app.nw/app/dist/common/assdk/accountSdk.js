"use strict";function init(){function e(e,r){var a=e.appid,s=e.ext_appid,t=o.getCurrentProject()||{};p({url:g+"?appid="+a+"&ext_appid="+s+"&platform="+(t.platform?1:0),method:"post",needToken:1},function(e,a,s){var o={},t="";if(e||200!==a.statusCode)t=e.toString();else if(s=JSON.parse(s),s.baseresponse){var p=s.baseresponse.errcode;0==p?o={errMsg:"refreshSession:ok",expireIn:s.session_expire_in,err_code:s.baseresponse.errcode}:t=p==n?"invalid extAppID":p==d?"extAppID not auth":s.baseresponse.errmsg}o.errMsg||(o.errMsg="refreshSession:fail "+t),r(o)})}function r(e,r){var a=e.appid,s=e.ext_appid,t={scope:["snsapi_base"]},i=o.getCurrentProject()||{};p({url:c+"?appid="+a+"&ext_appid="+s+"&platform="+(i.platform?1:0),method:"post",body:JSON.stringify(t),needToken:1},function(e,a,s){var o={},t="";if(e)t=e.toString();else{try{s=JSON.parse(s)}catch(e){s={},t=s}if(s.baseresponse){var p=s.baseresponse.errcode;0==p?o={errMsg:"login:ok",code:s.code}:t=p==n?"invalid extAppID":p==d?"extAppID not auth":s.baseresponse.errmsg}}o.errMsg||(o.errMsg="login:fail "+t),r(o)})}function a(e,r){var a="",s="",i="",u=e.args,c=u.data.api_name,g=o.getCurrentProject(),h={};g&&(a=e.appid,s=e.ext_appid,i=g.platform,h=o.getSdkUserAuthStorage(g));var _=function(e){"function"==typeof r&&(r(e),r=void 0)};p({url:l+"?appid="+a+"&ext_appid="+s+"&platform="+(i?1:0),method:"post",body:JSON.stringify({data:JSON.stringify(u.data||{})}),needToken:1},function(e,m,v){var b={},M="";if(!e&&200===m.statusCode&&(v=JSON.parse(v),v.baseresponse)){var S=v.baseresponse.errcode;if(0==S)try{b.data=JSON.parse(v.data),b.errMsg="operateWXData:ok"}catch(e){b.errMsg="operateWXData:fail"}else if(S==n)b.errMsg="operateWXData:fail invalid extAppID";else if(S==d)b.errMsg="operateWXData:fail extAppID not auth";else{if(S==f){var D=function(e,r){b.errMsg=e?"operateWXData:ok":"operateWXData:fail auth deny";var t=r[0];e?(h["operateWXData_"+c]=1,o.setUserAuthPemissionStorage(g,h)):_(b);var n={data:JSON.stringify(u.data||{}),grant_scope:t.scope,opt:e?1:2};p({url:l+"?appid="+a+"&ext_appid="+s+"&platform="+(i?1:0),method:"post",body:JSON.stringify(n),needToken:1},function(e,r,a){var s={};if(!e&&200===r.statusCode&&(a=JSON.parse(a),a.baseresponse&&0===a.baseresponse.errcode))try{s.data=JSON.parse(a.data),s.errMsg="operateWXData:ok"}catch(e){s.errMsg="operateWXData:fail"}s.errMsg||(s.errMsg="operateWXData:fail"),_(s)})};return void t.showAuthorizeConfirm({appicon_url:""+v.appicon_url,appname:v.appname,scope_list:[v.scope],callback:D})}M=v.baseresponse.errmsg||S}}b.errMsg||(b.errMsg="operateWXData:fail "+M),r(b)})}function s(e,r){var a="",s="",i=0,n=e.args,d=o.getCurrentProject();d&&(i=d.platform,a=e.appid,s=e.ext_appid);var f=function(e){"function"==typeof r&&(r(e),r=void 0)};p({url:h+"?appid="+a+"&ext_appid="+s+"&platform="+(i?1:0),method:"post",body:JSON.stringify({scope:n.scope||[]}),needToken:1},function(e,s,o){var i={},n="";if(!e&&200===s.statusCode&&(o=JSON.parse(o),o.baseresponse))if(i.body=o,0==o.baseresponse.errcode)i.errMsg="authorize:ok";else{if(o.baseresponse.errcode==-12e3){var d=function(e,r){i.errMsg=e?"authorize:ok":"authorize:fail auth deny",e||f(i);for(var s=[],o=0;o<r.length;++o){var t=r[o];t.checked&&s.push(t.scope)}p({url:_+"?appid="+a,method:"post",body:JSON.stringify({scope:s,opt:e?1:2}),needToken:1},function(e,r,a){var s={};e||200!==r.statusCode||(a=JSON.parse(a),a.baseresponse&&0===a.baseresponse.errcode&&(s.errMsg="authorize:ok")),s.errMsg||(s.errMsg="authorize:fail"),f(s)})};return void t.showAuthorizeConfirm({appicon_url:""+o.appicon_url,appname:o.appname,scope_list:o.scope_list,callback:d})}n=o.baseresponse.errmsg}i.errMsg||(i.errMsg="authorize:fail "+n),r(i)})}var o=require("../../stores/projectStores.js"),t=(require("../../stores/webviewStores.js"),require("../../actions/windowActions.js")),p=require("../../common/request/request.js"),i=require("../../config/errcodeConfig.js"),n=i.DEV_PLATFORM_INVALID_EXT_APPID,d=i.DEV_PLATFORM_EXT_APPID_NOT_AUTH,f=i.NEED_CONFORM,u=require("../../config/urlConfig.js"),c=u.jsLoginURL,g=u.jsRefreshSessionURL,l=u.jsOperateWXDATAURL,h=u.jsAuthorizeURL,_=u.jsAuthorizeConfirmURL;_exports={login:r,refreshSession:e,operateWXData:a,authorize:s}}var _exports;init(),module.exports=_exports;