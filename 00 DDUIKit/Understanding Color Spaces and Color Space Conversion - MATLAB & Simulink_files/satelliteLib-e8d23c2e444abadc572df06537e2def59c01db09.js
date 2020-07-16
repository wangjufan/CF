/**
 * @license
 * Adobe Visitor API for JavaScript version: 4.1.0
 * Copyright 2019 Adobe, Inc. All Rights Reserved
 * More info available at https://marketing.adobe.com/resources/help/en_US/mcvid/
 */
var e=function(){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function n(){return{callbacks:{},add:function(e,t){this.callbacks[e]=this.callbacks[e]||[];var n=this.callbacks[e].push(t)-1,i=this;return function(){i.callbacks[e].splice(n,1)}},execute:function(e,t){if(this.callbacks[e]){t=void 0===t?[]:t,t=t instanceof Array?t:[t];try{for(;this.callbacks[e].length;){var n=this.callbacks[e].shift();"function"==typeof n?n.apply(null,t):n instanceof Array&&n[1].apply(n[0],t)}delete this.callbacks[e]}catch(e){}}},executeAll:function(e,t){(t||e&&!x.isObjectEmpty(e))&&Object.keys(this.callbacks).forEach(function(t){var n=void 0!==e[t]?e[t]:"";this.execute(t,n)},this)},hasCallbacks:function(){return Boolean(Object.keys(this.callbacks).length)}}}function i(e){for(var t=/^\d+$/,n=0,i=e.length;n<i;n++)if(!t.test(e[n]))return!1;return!0}function r(e,t){for(;e.length<t.length;)e.push("0");for(;t.length<e.length;)t.push("0")}function a(e,t){for(var n=0;n<e.length;n++){var i=parseInt(e[n],10),r=parseInt(t[n],10);if(i>r)return 1;if(r>i)return-1}return 0}function o(e,t){if(e===t)return 0;var n=e.toString().split("."),o=t.toString().split(".");return i(n.concat(o))?(r(n,o),a(n,o)):NaN}function s(e){return e===Object(e)&&0===Object.keys(e).length}function l(e){return"function"==typeof e||e instanceof Array&&e.length}function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.isEnabled,n=e.cookieName,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=i.cookies;return t&&n&&r?{remove:function(){r.remove(n)},get:function(){var e=r.get(n),t={};try{t=JSON.parse(e)}catch(e){t={}}return t},set:function(e,t){t=t||{},r.set(n,JSON.stringify(e),{domain:t.optInCookieDomain||"",cookieLifetime:t.optInStorageExpiry||3419e4,expires:!0})}}:{get:be,set:be,remove:be}}function u(e){this.name=this.constructor.name,this.message=e,"function"==typeof Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error(e).stack}function d(){function e(e,t){var n=ge(e);return n.length?n.every(function(e){return!!t[e]}):pe(t)}function t(){M(y),O(oe.COMPLETE),_(h.status,h.permissions),m.set(h.permissions,{optInCookieDomain:l,optInStorageExpiry:u}),C.execute(Ee)}function n(e){return function(n,i){if(!me(n))throw new Error("[OptIn] Invalid category(-ies). Please use the `OptIn.Categories` enum.");return O(oe.CHANGED),Object.assign(y,he(ge(n),e)),i||t(),h}}var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=i.doesOptInApply,a=i.previousPermissions,o=i.preOptInApprovals,s=i.isOptInStorageEnabled,l=i.optInCookieDomain,u=i.optInStorageExpiry,d=i.isIabContext,f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},g=f.cookies,p=Ae(a);ye(p,"Invalid `previousPermissions`!"),ye(o,"Invalid `preOptInApprovals`!");var m=c({isEnabled:!!s,cookieName:"adobeujs-optin"},{cookies:g}),h=this,_=ae(h),C=de(),I=Ie(p),v=Ie(o),D=m.get(),S={},b=function(e,t){return ve(e)||t&&ve(t)?oe.COMPLETE:oe.PENDING}(I,D),A=function(e,t,n){var i=he(ue,!r);return r?Object.assign({},i,e,t,n):i}(v,I,D),y=_e(A),O=function(e){return b=e},M=function(e){return A=e};h.deny=n(!1),h.approve=n(!0),h.denyAll=h.deny.bind(h,ue),h.approveAll=h.approve.bind(h,ue),h.isApproved=function(t){return e(t,h.permissions)},h.isPreApproved=function(t){return e(t,v)},h.fetchPermissions=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t?h.on(oe.COMPLETE,e):be;return!r||r&&h.isComplete||!!o?e(h.permissions):t||C.add(Ee,function(){return e(h.permissions)}),n},h.complete=function(){h.status===oe.CHANGED&&t()},h.registerPlugin=function(e){if(!e||!e.name||"function"!=typeof e.onRegister)throw new Error(Te);S[e.name]||(S[e.name]=e,e.onRegister.call(e,h))},h.execute=ke(S),Object.defineProperties(h,{permissions:{get:function(){return A}},status:{get:function(){return b}},Categories:{get:function(){return se}},doesOptInApply:{get:function(){return!!r}},isPending:{get:function(){return h.status===oe.PENDING}},isComplete:{get:function(){return h.status===oe.COMPLETE}},__plugins:{get:function(){return Object.keys(S)}},isIabContext:{get:function(){return d}}})}function f(e,t){function n(){r=null,e.call(e,new u("The call took longer than you wanted!"))}function i(){r&&(clearTimeout(r),e.apply(e,arguments))}if(void 0===t)return e;var r=setTimeout(n,t);return i}function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Le(),t=this;t.name="iabPlugin",t.version="0.0.1";var n=de(),i={allConsentData:null},r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return i[e]=t};t.fetchConsentData=function(e){var t=e.callback,n=e.timeout,i=f(t,n);a({callback:i})},t.isApproved=function(e){var t=e.callback,n=e.category,r=e.timeout;if(i.allConsentData)return t(null,l(n,i.allConsentData.vendorConsents,i.allConsentData.purposeConsents));var o=f(function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=i.vendorConsents,a=i.purposeConsents;t(e,l(n,r,a))},r);a({category:n,callback:o})},t.onRegister=function(e){var n=Object.keys(le),i=function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=i.purposeConsents,a=i.gdprApplies,o=i.vendorConsents;!t&&a&&o&&r&&(n.forEach(function(t){var n=l(t,o,r);e[n?"approve":"deny"](t,!0)}),e.complete())};t.fetchConsentData({callback:i})};var a=function(e){var t=e.callback;if(i.allConsentData)return t(null,i.allConsentData);n.add("FETCH_CONSENT_DATA",t);var a={};s(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.purposeConsents,s=e.gdprApplies,l=e.vendorConsents;(arguments.length>1?arguments[1]:void 0)&&(a={purposeConsents:t,gdprApplies:s,vendorConsents:l},r("allConsentData",a)),o(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(arguments.length>1?arguments[1]:void 0)&&(a.consentString=e.consentData,r("allConsentData",a)),n.execute("FETCH_CONSENT_DATA",[null,i.allConsentData])})})},o=function(t){e("getConsentData",null,t)},s=function(t){var n=Me(le);e("getVendorConsents",n,t)},l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=!!t[le[e]];return i&&function(){return ce[e].every(function(e){return n[e]})}()}}function p(e,t,n){var i=null==e?void 0:e[t];return void 0===i?n:i}var m="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};Object.assign=Object.assign||function(e){for(var t,n,i=1;i<arguments.length;++i){n=arguments[i];for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e};var h,_,C={HANDSHAKE:"HANDSHAKE",GETSTATE:"GETSTATE",PARENTSTATE:"PARENTSTATE"},I={MCMID:"MCMID",MCAID:"MCAID",MCAAMB:"MCAAMB",MCAAMLH:"MCAAMLH",MCOPTOUT:"MCOPTOUT",CUSTOMERIDS:"CUSTOMERIDS"},v={MCMID:"getMarketingCloudVisitorID",MCAID:"getAnalyticsVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"getOptOut",ALLFIELDS:"getVisitorValues"},D={CUSTOMERIDS:"getCustomerIDs"},S={MCMID:"getMarketingCloudVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"getOptOut",MCAID:"getAnalyticsVisitorID",CUSTOMERIDS:"getCustomerIDs",ALLFIELDS:"getVisitorValues"},b={MC:"MCMID",A:"MCAID",AAM:"MCAAMB"},A={MCMID:"MCMID",MCOPTOUT:"MCOPTOUT",MCAID:"MCAID",MCAAMLH:"MCAAMLH",MCAAMB:"MCAAMB"},y={UNKNOWN:0,AUTHENTICATED:1,LOGGED_OUT:2},O={GLOBAL:"global"},M={MESSAGES:C,STATE_KEYS_MAP:I,ASYNC_API_MAP:v,SYNC_API_MAP:D,ALL_APIS:S,FIELDGROUP_TO_FIELD:b,FIELDS:A,AUTH_STATE:y,OPT_OUT:O},k=M.STATE_KEYS_MAP,E=function(e){function t(){}function n(t,n){var i=this;return function(){var r=e(0,t),a={};return a[t]=r,i.setStateAndPublish(a),n(r),r}}var i=this;this.getMarketingCloudVisitorID=function(e){e=e||t;var i=this.findField(k.MCMID,e),r=n.call(this,k.MCMID,e);return void 0!==i?i:r()},this.getVisitorValues=function(e){i.getMarketingCloudVisitorID(function(t){e({MCMID:t})})}},T=M.MESSAGES,L=M.ASYNC_API_MAP,P=M.SYNC_API_MAP,R=function(){function e(){}function t(e,t){var n=this;return function(){return n.callbackRegistry.add(e,t),n.messageParent(T.GETSTATE),""}}function n(n){this[L[n]]=function(i){i=i||e;var r=this.findField(n,i),a=t.call(this,n,i);return void 0!==r?r:a()}}function i(t){this[P[t]]=function(){return this.findField(t,e)||{}}}Object.keys(L).forEach(n,this),Object.keys(P).forEach(i,this)},w=M.ASYNC_API_MAP,F=function(){Object.keys(w).forEach(function(e){this[w[e]]=function(t){this.callbackRegistry.add(e,t)}},this)},x=function(e,t){return t={exports:{}},e(t,t.exports),t.exports}(function(t,n){n.isObjectEmpty=function(e){return e===Object(e)&&0===Object.keys(e).length},n.isValueEmpty=function(e){return""===e||n.isObjectEmpty(e)},n.getIeVersion=function(){if(document.documentMode)return document.documentMode;for(var e=7;e>4;e--){var t=document.createElement("div");if(t.innerHTML="\x3c!--[if IE "+e+"]><span></span><![endif]--\x3e",t.getElementsByTagName("span").length)return t=null,e;t=null}return null},n.encodeAndBuildRequest=function(e,t){return e.map(encodeURIComponent).join(t)},n.isObject=function(t){return null!==t&&"object"===e(t)&&!1===Array.isArray(t)},n.defineGlobalNamespace=function(){return window.adobe=n.isObject(window.adobe)?window.adobe:{},window.adobe},n.pluck=function(e,t){return t.reduce(function(t,n){return e[n]&&(t[n]=e[n]),t},Object.create(null))},n.parseOptOut=function(e,t,n){t||(t=n,e.d_optout&&e.d_optout instanceof Array&&(t=e.d_optout.join(",")));var i=parseInt(e.d_ottl,10);return isNaN(i)&&(i=7200),{optOut:t,d_ottl:i}},n.normalizeBoolean=function(e){var t=e;return"true"===e?t=!0:"false"===e&&(t=!1),t}}),N=(x.isObjectEmpty,x.isValueEmpty,x.getIeVersion,x.encodeAndBuildRequest,x.isObject,x.defineGlobalNamespace,x.pluck,x.parseOptOut,x.normalizeBoolean,n),j=M.MESSAGES,V={0:"prefix",1:"orgID",2:"state"},U=function(e,t){this.parse=function(e){try{var t={};return e.data.split("|").forEach(function(e,n){if(void 0!==e){t[V[n]]=2!==n?e:JSON.parse(e)}}),t}catch(e){}},this.isInvalid=function(n){var i=this.parse(n);if(!i||Object.keys(i).length<2)return!0;var r=e!==i.orgID,a=!t||n.origin!==t,o=-1===Object.keys(j).indexOf(i.prefix);return r||a||o},this.send=function(n,i,r){var a=i+"|"+e;r&&r===Object(r)&&(a+="|"+JSON.stringify(r));try{n.postMessage(a,t)}catch(e){}}},H=M.MESSAGES,B=function(e,t,n,i){function r(e){Object.assign(g,e)}function a(e){Object.assign(g.state,e),Object.assign(g.state.ALLFIELDS,e),g.callbackRegistry.executeAll(g.state)}function o(e){if(!_.isInvalid(e)){h=!1;var t=_.parse(e);g.setStateAndPublish(t.state)}}function s(e){!h&&p&&(h=!0,_.send(i,e))}function l(){r(new E(n._generateID)),g.getMarketingCloudVisitorID(),g.callbackRegistry.executeAll(g.state,!0),m.removeEventListener("message",c)}function c(e){if(!_.isInvalid(e)){var t=_.parse(e);h=!1,m.clearTimeout(g._handshakeTimeout),m.removeEventListener("message",c),r(new R(g)),m.addEventListener("message",o),g.setStateAndPublish(t.state),g.callbackRegistry.hasCallbacks()&&s(H.GETSTATE)}}function u(){p&&postMessage?(m.addEventListener("message",c),s(H.HANDSHAKE),g._handshakeTimeout=setTimeout(l,250)):l()}function d(){m.s_c_in||(m.s_c_il=[],m.s_c_in=0),g._c="Visitor",g._il=m.s_c_il,g._in=m.s_c_in,g._il[g._in]=g,m.s_c_in++}function f(){function e(e){0!==e.indexOf("_")&&"function"==typeof n[e]&&(g[e]=function(){})}Object.keys(n).forEach(e),g.getSupplementalDataID=n.getSupplementalDataID,g.isAllowed=function(){return!0}}var g=this,p=t.whitelistParentDomain;g.state={ALLFIELDS:{}},g.version=n.version,g.marketingCloudOrgID=e,g.cookieDomain=n.cookieDomain||"",g._instanceType="child";var h=!1,_=new U(e,p);g.callbackRegistry=N(),g.init=function(){d(),f(),r(new F(g)),u()},g.findField=function(e,t){if(g.state[e])return t(g.state[e]),g.state[e]},g.messageParent=s,g.setStateAndPublish=a},G=M.MESSAGES,q=M.ALL_APIS,Y=M.ASYNC_API_MAP,X=M.FIELDGROUP_TO_FIELD,z=function(e,t){function n(){var t={};return Object.keys(q).forEach(function(n){var i=q[n],r=e[i]();x.isValueEmpty(r)||(t[n]=r)}),t}function i(){var t=[];return e._loading&&Object.keys(e._loading).forEach(function(n){if(e._loading[n]){var i=X[n];t.push(i)}}),t.length?t:null}function r(t){return function n(r){var a=i();if(a){var o=Y[a[0]];e[o](n,!0)}else t()}}function a(e,i){var r=n();t.send(e,i,r)}function o(e){l(e),a(e,G.HANDSHAKE)}function s(e){r(function(){a(e,G.PARENTSTATE)})()}function l(n){function i(i){r.call(e,i),t.send(n,G.PARENTSTATE,{CUSTOMERIDS:e.getCustomerIDs()})}var r=e.setCustomerIDs;e.setCustomerIDs=i}return function(e){if(!t.isInvalid(e)){(t.parse(e).prefix===G.HANDSHAKE?o:s)(e.source)}}},W=function(e,t){function n(e){return function(n){i[e]=n,r++,r===a&&t(i)}}var i={},r=0,a=Object.keys(e).length;Object.keys(e).forEach(function(t){var i=e[t];if(i.fn){var r=i.args||[];r.unshift(n(t)),i.fn.apply(i.context||null,r)}})},J=function(e){var t;if(!e&&m.location&&(e=m.location.hostname),t=e)if(/^[0-9.]+$/.test(t))t="";else{var n=",ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,be,bf,bg,bh,bi,bj,bm,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,cl,cm,cn,co,cr,cu,cv,cw,cx,cz,de,dj,dk,dm,do,dz,ec,ee,eg,es,et,eu,fi,fm,fo,fr,ga,gb,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,im,in,io,iq,ir,is,it,je,jo,jp,kg,ki,km,kn,kp,kr,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,na,nc,ne,nf,ng,nl,no,nr,nu,nz,om,pa,pe,pf,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,rs,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,yt,",i=t.split("."),r=i.length-1,a=r-1;if(r>1&&i[r].length<=2&&(2===i[r-1].length||n.indexOf(","+i[r]+",")<0)&&a--,a>0)for(t="";r>=a;)t=i[r]+(t?".":"")+t,r--}return t},K={compare:o,isLessThan:function(e,t){return o(e,t)<0},areVersionsDifferent:function(e,t){return 0!==o(e,t)},isGreaterThan:function(e,t){return o(e,t)>0},isEqual:function(e,t){return 0===o(e,t)}},Q=!!m.postMessage,$={postMessage:function(e,t,n){var i=1;t&&(Q?n.postMessage(e,t.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):t&&(n.location=t.replace(/#.*$/,"")+"#"+ +new Date+i+++"&"+e))},receiveMessage:function(e,t){var n;try{Q&&(e&&(n=function(n){if("string"==typeof t&&n.origin!==t||"[object Function]"===Object.prototype.toString.call(t)&&!1===t(n.origin))return!1;e(n)}),m.addEventListener?m[e?"addEventListener":"removeEventListener"]("message",n):m[e?"attachEvent":"detachEvent"]("onmessage",n))}catch(e){}}},Z=function(e){var t,n,i="0123456789",r="",a="",o=8,s=10,l=10;if(1==e){for(i+="ABCDEF",t=0;16>t;t++)n=Math.floor(Math.random()*o),r+=i.substring(n,n+1),n=Math.floor(Math.random()*o),a+=i.substring(n,n+1),o=16;return r+"-"+a}for(t=0;19>t;t++)n=Math.floor(Math.random()*s),r+=i.substring(n,n+1),0===t&&9==n?s=3:(1==t||2==t)&&10!=s&&2>n?s=10:2<t&&(s=10),n=Math.floor(Math.random()*l),a+=i.substring(n,n+1),0===t&&9==n?l=3:(1==t||2==t)&&10!=l&&2>n?l=10:2<t&&(l=10);return r+a},ee=function(e,t){return{corsMetadata:function(){var e="none",t=!0;return"undefined"!=typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?e="XMLHttpRequest":"undefined"!=typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(t=!1),Object.prototype.toString.call(m.HTMLElement).indexOf("Constructor")>0&&(t=!1)),{corsType:e,corsCookiesEnabled:t}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new m[this.corsMetadata.corsType]},fireCORS:function(t,n,i){function r(e){var n;try{if((n=JSON.parse(e))!==Object(n))return void a.handleCORSError(t,null,"Response is not JSON")}catch(e){return void a.handleCORSError(t,e,"Error parsing response as JSON")}try{for(var i=t.callback,r=m,o=0;o<i.length;o++)r=r[i[o]];r(n)}catch(e){a.handleCORSError(t,e,"Error forming callback function")}}var a=this;n&&(t.loadErrorHandler=n);try{var o=this.getCORSInstance();o.open("get",t.corsUrl+"&ts="+(new Date).getTime(),!0),"XMLHttpRequest"===this.corsMetadata.corsType&&(o.withCredentials=!0,o.timeout=e.loadTimeout,o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.onreadystatechange=function(){4===this.readyState&&200===this.status&&r(this.responseText)}),o.onerror=function(e){a.handleCORSError(t,e,"onerror")},o.ontimeout=function(e){a.handleCORSError(t,e,"ontimeout")},o.send(),e._log.requests.push(t.corsUrl)}catch(e){this.handleCORSError(t,e,"try-catch")}},handleCORSError:function(t,n,i){e.CORSErrors.push({corsData:t,error:n,description:i}),t.loadErrorHandler&&("ontimeout"===i?t.loadErrorHandler(!0):t.loadErrorHandler(!1))}}},te={POST_MESSAGE_ENABLED:!!m.postMessage,DAYS_BETWEEN_SYNC_ID_CALLS:1,MILLIS_PER_DAY:864e5,ADOBE_MC:"adobe_mc",ADOBE_MC_SDID:"adobe_mc_sdid",VALID_VISITOR_ID_REGEX:/^[0-9a-fA-F\-]+$/,ADOBE_MC_TTL_IN_MIN:5,VERSION_REGEX:/vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/},ne=function(e,t){var n=m.document;return{THROTTLE_START:3e4,MAX_SYNCS_LENGTH:649,throttleTimerSet:!1,id:null,onPagePixels:[],iframeHost:null,getIframeHost:function(e){if("string"==typeof e){var t=e.split("/");return t[0]+"//"+t[2]}},subdomain:null,url:null,getUrl:function(){var t,i="http://fast.",r="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(n.location.origin);return this.subdomain||(this.subdomain="nosubdomainreturned"),e.loadSSL&&(i=e.idSyncSSLUseAkamai?"https://fast.":"https://"),t=i+this.subdomain+".demdex.net/dest5.html"+r,this.iframeHost=this.getIframeHost(t),this.id="destination_publishing_iframe_"+this.subdomain+"_"+e.idSyncContainerID,t},checkDPIframeSrc:function(){var t="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(n.location.href);"string"==typeof e.dpIframeSrc&&e.dpIframeSrc.length&&(this.id="destination_publishing_iframe_"+(e._subdomain||this.subdomain||(new Date).getTime())+"_"+e.idSyncContainerID,this.iframeHost=this.getIframeHost(e.dpIframeSrc),this.url=e.dpIframeSrc+t)},idCallNotProcesssed:null,doAttachIframe:!1,startedAttachingIframe:!1,iframeHasLoaded:null,iframeIdChanged:null,newIframeCreated:null,originalIframeHasLoadedAlready:null,iframeLoadedCallbacks:[],regionChanged:!1,timesRegionChanged:0,sendingMessages:!1,messages:[],messagesPosted:[],messagesReceived:[],messageSendingInterval:te.POST_MESSAGE_ENABLED?null:100,onPageDestinationsFired:[],jsonForComparison:[],jsonDuplicates:[],jsonWaiting:[],jsonProcessed:[],canSetThirdPartyCookies:!0,receivedThirdPartyCookiesNotification:!1,readyToAttachIframePreliminary:function(){return!(e.idSyncDisableSyncs||e.disableIdSyncs||e.idSyncDisable3rdPartySyncing||e.disableThirdPartyCookies||e.disableThirdPartyCalls)},readyToAttachIframe:function(){return this.readyToAttachIframePreliminary()&&(this.doAttachIframe||e._doAttachIframe)&&(this.subdomain&&"nosubdomainreturned"!==this.subdomain||e._subdomain)&&this.url&&!this.startedAttachingIframe},attachIframe:function(){function e(){r=n.createElement("iframe"),r.sandbox="allow-scripts allow-same-origin",r.title="Adobe ID Syncing iFrame",r.id=i.id,r.name=i.id+"_name",r.style.cssText="display: none; width: 0; height: 0;",r.src=i.url,i.newIframeCreated=!0,t(),n.body.appendChild(r)}function t(e){r.addEventListener("load",function(){r.className="aamIframeLoaded",i.iframeHasLoaded=!0,i.fireIframeLoadedCallbacks(e),i.requestToProcess()})}this.startedAttachingIframe=!0;var i=this,r=n.getElementById(this.id);r?"IFRAME"!==r.nodeName?(this.id+="_2",this.iframeIdChanged=!0,e()):(this.newIframeCreated=!1,"aamIframeLoaded"!==r.className?(this.originalIframeHasLoadedAlready=!1,t("The destination publishing iframe already exists from a different library, but hadn't loaded yet.")):(this.originalIframeHasLoadedAlready=!0,this.iframeHasLoaded=!0,this.iframe=r,this.fireIframeLoadedCallbacks("The destination publishing iframe already exists from a different library, and had loaded alresady."),this.requestToProcess())):e(),this.iframe=r},fireIframeLoadedCallbacks:function(e){this.iframeLoadedCallbacks.forEach(function(t){"function"==typeof t&&t({message:e||"The destination publishing iframe was attached and loaded successfully."})}),this.iframeLoadedCallbacks=[]},requestToProcess:function(t){function n(){r.jsonForComparison.push(t),r.jsonWaiting.push(t),r.processSyncOnPage(t)}var i,r=this;if(t===Object(t)&&t.ibs)if(i=JSON.stringify(t.ibs||[]),this.jsonForComparison.length){var a,o,s,l=!1;for(a=0,o=this.jsonForComparison.length;a<o;a++)if(s=this.jsonForComparison[a],i===JSON.stringify(s.ibs||[])){l=!0;break}l?this.jsonDuplicates.push(t):n()}else n();if((this.receivedThirdPartyCookiesNotification||!te.POST_MESSAGE_ENABLED||this.iframeHasLoaded)&&this.jsonWaiting.length){var c=this.jsonWaiting.shift();this.process(c),this.requestToProcess()}e.idSyncDisableSyncs||e.disableIdSyncs||!this.iframeHasLoaded||!this.messages.length||this.sendingMessages||(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){r.messageSendingInterval=te.POST_MESSAGE_ENABLED?null:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},getRegionAndCheckIfChanged:function(t,n){var i=e._getField("MCAAMLH"),r=t.d_region||t.dcs_region;return i?r&&(e._setFieldExpire("MCAAMLH",n),e._setField("MCAAMLH",r),parseInt(i,10)!==r&&(this.regionChanged=!0,this.timesRegionChanged++,e._setField("MCSYNCSOP",""),e._setField("MCSYNCS",""),i=r)):(i=r)&&(e._setFieldExpire("MCAAMLH",n),e._setField("MCAAMLH",i)),i||(i=""),i},processSyncOnPage:function(e){var t,n,i,r;if((t=e.ibs)&&t instanceof Array&&(n=t.length))for(i=0;i<n;i++)r=t[i],r.syncOnPage&&this.checkFirstPartyCookie(r,"","syncOnPage")},process:function(e){var t,n,i,r,a,o=encodeURIComponent,s=!1;if((t=e.ibs)&&t instanceof Array&&(n=t.length))for(s=!0,i=0;i<n;i++)r=t[i],a=[o("ibs"),o(r.id||""),o(r.tag||""),x.encodeAndBuildRequest(r.url||[],","),o(r.ttl||""),"","",r.fireURLSync?"true":"false"],r.syncOnPage||(this.canSetThirdPartyCookies?this.addMessage(a.join("|")):r.fireURLSync&&this.checkFirstPartyCookie(r,a.join("|")));s&&this.jsonProcessed.push(e)},checkFirstPartyCookie:function(t,n,i){var r="syncOnPage"===i,a=r?"MCSYNCSOP":"MCSYNCS";e._readVisitor();var o,s,l=e._getField(a),c=!1,u=!1,d=Math.ceil((new Date).getTime()/te.MILLIS_PER_DAY);l?(o=l.split("*"),s=this.pruneSyncData(o,t.id,d),c=s.dataPresent,u=s.dataValid,c&&u||this.fireSync(r,t,n,o,a,d)):(o=[],this.fireSync(r,t,n,o,a,d))},pruneSyncData:function(e,t,n){var i,r,a,o=!1,s=!1;for(r=0;r<e.length;r++)i=e[r],a=parseInt(i.split("-")[1],10),i.match("^"+t+"-")?(o=!0,n<a?s=!0:(e.splice(r,1),r--)):n>=a&&(e.splice(r,1),r--);return{dataPresent:o,dataValid:s}},manageSyncsSize:function(e){if(e.join("*").length>this.MAX_SYNCS_LENGTH)for(e.sort(function(e,t){return parseInt(e.split("-")[1],10)-parseInt(t.split("-")[1],10)});e.join("*").length>this.MAX_SYNCS_LENGTH;)e.shift()},fireSync:function(t,n,i,r,a,o){var s=this;if(t){if("img"===n.tag){var l,c,u,d,f=n.url,g=e.loadSSL?"https:":"http:";for(l=0,c=f.length;l<c;l++){u=f[l],d=/^\/\//.test(u);var p=new Image;p.addEventListener("load",function(t,n,i,r){return function(){s.onPagePixels[t]=null,e._readVisitor();var o,l=e._getField(a),c=[];if(l){o=l.split("*");var u,d,f;for(u=0,d=o.length;u<d;u++)f=o[u],f.match("^"+n.id+"-")||c.push(f)}s.setSyncTrackingData(c,n,i,r)}}(this.onPagePixels.length,n,a,o)),p.src=(d?g:"")+u,this.onPagePixels.push(p)}}}else this.addMessage(i),this.setSyncTrackingData(r,n,a,o)},addMessage:function(t){var n=encodeURIComponent,i=n(e._enableErrorReporting?"---destpub-debug---":"---destpub---");this.messages.push((te.POST_MESSAGE_ENABLED?"":i)+t)},setSyncTrackingData:function(t,n,i,r){t.push(n.id+"-"+(r+Math.ceil(n.ttl/60/24))),this.manageSyncsSize(t),e._setField(i,t.join("*"))},sendMessages:function(){var e,t=this,n="",i=encodeURIComponent;this.regionChanged&&(n=i("---destpub-clear-dextp---"),this.regionChanged=!1),this.messages.length?te.POST_MESSAGE_ENABLED?(e=n+i("---destpub-combined---")+this.messages.join("%01"),this.postMessage(e),this.messages=[],this.sendingMessages=!1):(e=this.messages.shift(),this.postMessage(n+e),setTimeout(function(){t.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1},postMessage:function(e){$.postMessage(e,this.url,this.iframe.contentWindow),this.messagesPosted.push(e)},receiveMessage:function(e){var t,n=/^---destpub-to-parent---/;"string"==typeof e&&n.test(e)&&(t=e.replace(n,"").split("|"),"canSetThirdPartyCookies"===t[0]&&(this.canSetThirdPartyCookies="true"===t[1],this.receivedThirdPartyCookiesNotification=!0,this.requestToProcess()),this.messagesReceived.push(e))},processIDCallData:function(i){(null==this.url||i.subdomain&&"nosubdomainreturned"===this.subdomain)&&("string"==typeof e._subdomain&&e._subdomain.length?this.subdomain=e._subdomain:this.subdomain=i.subdomain||"",this.url=this.getUrl()),i.ibs instanceof Array&&i.ibs.length&&(this.doAttachIframe=!0),this.readyToAttachIframe()&&(e.idSyncAttachIframeOnWindowLoad?(t.windowLoaded||"complete"===n.readyState||"loaded"===n.readyState)&&this.attachIframe():this.attachIframeASAP()),"function"==typeof e.idSyncIDCallResult?e.idSyncIDCallResult(i):this.requestToProcess(i),"function"==typeof e.idSyncAfterIDCallResult&&e.idSyncAfterIDCallResult(i)},canMakeSyncIDCall:function(t,n){return e._forceSyncIDCall||!t||n-t>te.DAYS_BETWEEN_SYNC_ID_CALLS},attachIframeASAP:function(){function e(){t.startedAttachingIframe||(n.body?t.attachIframe():setTimeout(e,30))}var t=this;e()}}},ie={audienceManagerServer:{},audienceManagerServerSecure:{},cookieDomain:{},cookieLifetime:{},cookieName:{},doesOptInApply:{},disableThirdPartyCalls:{},idSyncAfterIDCallResult:{},idSyncAttachIframeOnWindowLoad:{},idSyncContainerID:{},idSyncDisable3rdPartySyncing:{},disableThirdPartyCookies:{},idSyncDisableSyncs:{},disableIdSyncs:{},idSyncIDCallResult:{},idSyncSSLUseAkamai:{},isCoopSafe:{},isIabContext:{},isOptInStorageEnabled:{},loadSSL:{},loadTimeout:{},marketingCloudServer:{},marketingCloudServerSecure:{},optInCookieDomain:{},optInStorageExpiry:{},overwriteCrossDomainMCIDAndAID:{},preOptInApprovals:{},previousPermissions:{},resetBeforeVersion:{},sdidParamExpiry:{},serverState:{},sessionCookieName:{},secureCookie:{},takeTimeoutMetrics:{},trackingServer:{},trackingServerSecure:{},whitelistIframeDomains:{},whitelistParentDomain:{}},re={getConfigNames:function(){return Object.keys(ie)},getConfigs:function(){return ie},normalizeConfig:function(e){return"function"!=typeof e?e:e()}},ae=function(e){var t={};return e.on=function(e,n,i){if(!n||"function"!=typeof n)throw new Error("[ON] Callback should be a function.");t.hasOwnProperty(e)||(t[e]=[]);var r=t[e].push({callback:n,context:i})-1;return function(){t[e].splice(r,1),t[e].length||delete t[e]}},e.publish=function(e){if(t.hasOwnProperty(e)){var n=[].slice.call(arguments,1);t[e].slice(0).forEach(function(e){e.callback.apply(e.context,n)})}},e.publish},oe={PENDING:"pending",CHANGED:"changed",COMPLETE:"complete"},se={AAM:"aam",ADCLOUD:"adcloud",ANALYTICS:"aa",CAMPAIGN:"campaign",ECID:"ecid",LIVEFYRE:"livefyre",TARGET:"target",VIDEO_ANALYTICS:"videoaa"},le=(h={},t(h,se.AAM,565),t(h,se.ECID,565),h),ce=(_={},t(_,se.AAM,[1,2,5]),t(_,se.ECID,[1,2,5]),_),ue=function(e){return Object.keys(e).map(function(t){return e[t]})}(se),de=function(){var e={};return e.callbacks=Object.create(null),e.add=function(t,n){if(!l(n))throw new Error("[callbackRegistryFactory] Make sure callback is a function or an array of functions.");e.callbacks[t]=e.callbacks[t]||[];var i=e.callbacks[t].push(n)-1;return function(){e.callbacks[t].splice(i,1)}},e.execute=function(t,n){if(e.callbacks[t]){n=void 0===n?[]:n,n=n instanceof Array?n:[n];try{for(;e.callbacks[t].length;){var i=e.callbacks[t].shift();"function"==typeof i?i.apply(null,n):i instanceof Array&&i[1].apply(i[0],n)}delete e.callbacks[t]}catch(e){}}},e.executeAll=function(t,n){(n||t&&!s(t))&&Object.keys(e.callbacks).forEach(function(n){var i=void 0!==t[n]?t[n]:"";e.execute(n,i)},e)},e.hasCallbacks=function(){return Boolean(Object.keys(e.callbacks).length)},e},fe=function(t,n){return e(t)===n},ge=function(e,t){return e instanceof Array?e:fe(e,"string")?[e]:t||[]},pe=function(e){var t=Object.keys(e);return!!t.length&&t.every(function(t){return!0===e[t]})},me=function(e){return!(!e||Ce(e))&&ge(e).every(function(e){return ue.indexOf(e)>-1})},he=function(e,t){return e.reduce(function(e,n){return e[n]=t,e},{})},_e=function(e){return JSON.parse(JSON.stringify(e))},Ce=function(e){return"[object Array]"===Object.prototype.toString.call(e)&&!e.length},Ie=function(e){if(Se(e))return e;try{return JSON.parse(e)}catch(e){return{}}},ve=function(e){return void 0===e||(Se(e)?me(Object.keys(e)):De(e))},De=function(e){try{var t=JSON.parse(e);return!!e&&fe(e,"string")&&me(Object.keys(t))}catch(e){return!1}},Se=function(e){return null!==e&&fe(e,"object")&&!1===Array.isArray(e)},be=function(){},Ae=function(e){return fe(e,"function")?e():e},ye=function(e,t){if(!ve(e))throw new Error("[OptIn] ".concat(t))},Oe=function(e){return Object.keys(e).map(function(t){return e[t]})},Me=function(e){return Oe(e).filter(function(e,t,n){return n.indexOf(e)===t})},ke=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.command,i=t.params,r=void 0===i?{}:i,a=t.callback,o=void 0===a?be:a;if(!n||-1===n.indexOf("."))throw new Error("[OptIn.execute] Please provide a valid command.");try{var s=n.split("."),l=e[s[0]],c=s[1];if(!l||"function"!=typeof l[c])throw new Error("Make sure the plugin and API name exist.");var u=Object.assign(r,{callback:o});l[c].call(l,u)}catch(e){throw new Error("[OptIn.execute] Something went wrong: "+e.message)}}};u.prototype=Object.create(Error.prototype),u.prototype.constructor=u;var Ee="fetchPermissions",Te="[OptIn#registerPlugin] Plugin is invalid.";d.Categories=se,d.TimeoutError=u;var Le=function(){throw new Error("[IAB Plugin] A __cmp is required.")},Pe=Object.freeze({OptIn:d,IabPlugin:g}),Re={get:function(e){e=encodeURIComponent(e);var t=(";"+document.cookie).split(" ").join(";"),n=t.indexOf(";"+e+"="),i=n<0?n:t.indexOf(";",n+1);return n<0?"":decodeURIComponent(t.substring(n+2+e.length,i<0?t.length:i))},set:function(e,t,n){var i=p(n,"cookieLifetime"),r=p(n,"expires"),a=p(n,"domain");if(r&&"SESSION"!==i&&"NONE"!==i){var o=""!==t?parseInt(i||0,10):-60;if(o)r=new Date,r.setTime(r.getTime()+1e3*o);else if(1===r){r=new Date;var s=r.getYear();r.setYear(s+2+(s<1900?1900:0))}}else r=0;return e&&"NONE"!==i?(document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+"; path=/;"+(r?" expires="+r.toGMTString()+";":"")+(a?" domain="+a+";":""),this.get(e)===t):0},remove:function(e,t){var n=p(t,"domain");n=n?" domain="+n+";":"",document.cookie=encodeURIComponent(e)+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"+n}},we=function(e,t){e.publishDestinations=function(n){var i=arguments[1],r=arguments[2];try{r="function"==typeof r?r:n.callback}catch(e){r=function(){}}var a=t;if(!a.readyToAttachIframePreliminary())return void r({error:"The destination publishing iframe is disabled in the Visitor library."});if("string"==typeof n){if(!n.length)return void r({error:"subdomain is not a populated string."});if(!(i instanceof Array&&i.length))return void r({error:"messages is not a populated array."});var o=!1;if(i.forEach(function(e){"string"==typeof e&&e.length&&(a.addMessage(e),o=!0)}),!o)return void r({error:"None of the messages are populated strings."})}else{if(!x.isObject(n))return void r({error:"Invalid parameters passed."});var s=n;if("string"!=typeof(n=s.subdomain)||!n.length)return void r({error:"config.subdomain is not a populated string."});var l=s.urlDestinations;if(!(l instanceof Array&&l.length))return void r({error:"config.urlDestinations is not a populated array."});var c=[];l.forEach(function(e){
x.isObject(e)&&(e.hideReferrer?e.message&&a.addMessage(e.message):c.push(e))});!function e(){c.length&&setTimeout(function(){var t=new Image,n=c.shift();t.src=n.url,a.onPageDestinationsFired.push(n),e()},100)}()}a.iframe?(r({message:"The destination publishing iframe is already attached and loaded."}),a.requestToProcess()):!e.subdomain&&e._getField("MCMID")?(a.subdomain=n,a.doAttachIframe=!0,a.url=a.getUrl(),a.readyToAttachIframe()?(a.iframeLoadedCallbacks.push(function(e){r({message:"Attempted to attach and load the destination publishing iframe through this API call. Result: "+(e.message||"no result")})}),a.attachIframe()):r({error:"Encountered a problem in attempting to attach and load the destination publishing iframe through this API call."})):a.iframeLoadedCallbacks.push(function(e){r({message:"Attempted to attach and load the destination publishing iframe through normal Visitor API processing. Result: "+(e.message||"no result")})})}},Fe=Pe.OptIn;x.defineGlobalNamespace(),window.adobe.OptInCategories=Fe.Categories;var xe=function(t,n,i){function r(e){var t=e;return function(e){var n=e||h.location.href;try{var i=d._extractParamFromUri(n,t);if(i)return T.parsePipeDelimetedKeyValues(i)}catch(e){}}}function a(e){function t(e,t){e&&e.match(te.VALID_VISITOR_ID_REGEX)&&t(e)}t(e[I],d.setMarketingCloudVisitorID),d._setFieldExpire(A,-1),t(e[S],d.setAnalyticsVisitorID)}function o(e){e=e||{},d._supplementalDataIDCurrent=e.supplementalDataIDCurrent||"",d._supplementalDataIDCurrentConsumed=e.supplementalDataIDCurrentConsumed||{},d._supplementalDataIDLast=e.supplementalDataIDLast||"",d._supplementalDataIDLastConsumed=e.supplementalDataIDLastConsumed||{}}function s(e){function t(e,t,n){return n=n?n+="|":n,n+=e+"="+encodeURIComponent(t)}function n(e,n){var i=n[0],r=n[1];return null!=r&&r!==y&&(e=t(i,r,e)),e}var i=e.reduce(n,"");return function(e){var t=T.getTimestampInSeconds();return e=e?e+="|":e,e+="TS="+t}(i)}function l(e){var t=e.minutesToLive,n="";return(d.idSyncDisableSyncs||d.disableIdSyncs)&&(n=n||"Error: id syncs have been disabled"),"string"==typeof e.dpid&&e.dpid.length||(n=n||"Error: config.dpid is empty"),"string"==typeof e.url&&e.url.length||(n=n||"Error: config.url is empty"),void 0===t?t=20160:(t=parseInt(t,10),(isNaN(t)||t<=0)&&(n=n||"Error: config.minutesToLive needs to be a positive number")),{error:n,ttl:t}}function c(){return!(!d.configs.doesOptInApply||f.optIn.isComplete||u())}function u(){return d.configs.isIabContext?f.optIn.isApproved(f.optIn.Categories.ECID)&&p:f.optIn.isApproved(f.optIn.Categories.ECID)}if(!i||i.split("").reverse().join("")!==t)throw new Error("Please use `Visitor.getInstance` to instantiate Visitor.");var d=this,f=window.adobe,g="",p=!1;d.version="4.1.0";var h=m,_=h.Visitor;_.version=d.version,_.AuthState=M.AUTH_STATE,_.OptOut=M.OPT_OUT,h.s_c_in||(h.s_c_il=[],h.s_c_in=0),d._c="Visitor",d._il=h.s_c_il,d._in=h.s_c_in,d._il[d._in]=d,h.s_c_in++,d._instanceType="regular",d._log={requests:[]},d.marketingCloudOrgID=t,d.cookieName="AMCV_"+t,d.sessionCookieName="AMCVS_"+t,d.cookieDomain=J(),d.cookieDomain===h.location.hostname&&(d.cookieDomain=""),d.loadSSL=h.location.protocol.toLowerCase().indexOf("https")>=0,d.loadTimeout=3e4,d.CORSErrors=[],d.marketingCloudServer=d.audienceManagerServer="dpm.demdex.net",d.sdidParamExpiry=30;var C=null,I="MCMID",v="MCIDTS",D="A",S="MCAID",b="AAM",A="MCAAMB",y="NONE",O=function(e){return!Object.prototype[e]},k=ee(d);d.FIELDS=M.FIELDS,d.cookieRead=function(e){return Re.get(e)},d.cookieWrite=function(e,t,n){var i=d.cookieLifetime?(""+d.cookieLifetime).toUpperCase():"";return Re.set(e,""+t,{expires:n,domain:d.cookieDomain,cookieLifetime:i})},d.resetState=function(e){e?d._mergeServerState(e):o()},d._isAllowedDone=!1,d._isAllowedFlag=!1,d.isAllowed=function(){return d._isAllowedDone||(d._isAllowedDone=!0,(d.cookieRead(d.cookieName)||d.cookieWrite(d.cookieName,"T",1))&&(d._isAllowedFlag=!0)),"T"===d.cookieRead(d.cookieName)&&d._helpers.removeCookie(d.cookieName),d._isAllowedFlag},d.setMarketingCloudVisitorID=function(e){d._setMarketingCloudFields(e)},d._use1stPartyMarketingCloudServer=!1,d.getMarketingCloudVisitorID=function(e,t){d.marketingCloudServer&&d.marketingCloudServer.indexOf(".demdex.net")<0&&(d._use1stPartyMarketingCloudServer=!0);var n=d._getAudienceManagerURLData("_setMarketingCloudFields"),i=n.url;return d._getRemoteField(I,i,e,t,n)},d.getVisitorValues=function(e,t){var n={MCMID:{fn:d.getMarketingCloudVisitorID,args:[!0],context:d},MCOPTOUT:{fn:d.isOptedOut,args:[void 0,!0],context:d},MCAID:{fn:d.getAnalyticsVisitorID,args:[!0],context:d},MCAAMLH:{fn:d.getAudienceManagerLocationHint,args:[!0],context:d},MCAAMB:{fn:d.getAudienceManagerBlob,args:[!0],context:d}},i=t&&t.length?x.pluck(n,t):n;W(i,e)},d._currentCustomerIDs={},d._customerIDsHashChanged=!1,d._newCustomerIDsHash="",d.setCustomerIDs=function(t){function n(){d._customerIDsHashChanged=!1}if(t){if(!x.isObject(t)||x.isObjectEmpty(t))return!1;d._readVisitor();var i,r;for(i in t)if(O(i)&&(r=t[i]))if("object"===e(r)){var a={};r.id&&(a.id=r.id),void 0!=r.authState&&(a.authState=r.authState),d._currentCustomerIDs[i]=a}else d._currentCustomerIDs[i]={id:r};var o=d.getCustomerIDs(),s=d._getField("MCCIDH"),l="";s||(s=0);for(i in o)O(i)&&(r=o[i],l+=(l?"|":"")+i+"|"+(r.id?r.id:"")+(r.authState?r.authState:""));d._newCustomerIDsHash=String(d._hash(l)),d._newCustomerIDsHash!==s&&(d._customerIDsHashChanged=!0,d._mapCustomerIDs(n))}},d.getCustomerIDs=function(){d._readVisitor();var e,t,n={};for(e in d._currentCustomerIDs)O(e)&&(t=d._currentCustomerIDs[e],n[e]||(n[e]={}),t.id&&(n[e].id=t.id),void 0!=t.authState?n[e].authState=t.authState:n[e].authState=_.AuthState.UNKNOWN);return n},d.setAnalyticsVisitorID=function(e){d._setAnalyticsFields(e)},d.getAnalyticsVisitorID=function(e,t,n){if(!T.isTrackingServerPopulated()&&!n)return d._callCallback(e,[""]),"";var i="";if(n||(i=d.getMarketingCloudVisitorID(function(t){d.getAnalyticsVisitorID(e,!0)})),i||n){var r=n?d.marketingCloudServer:d.trackingServer,a="";d.loadSSL&&(n?d.marketingCloudServerSecure&&(r=d.marketingCloudServerSecure):d.trackingServerSecure&&(r=d.trackingServerSecure));var o={};if(r){var s="http"+(d.loadSSL?"s":"")+"://"+r+"/id",l="d_visid_ver="+d.version+"&mcorgid="+encodeURIComponent(d.marketingCloudOrgID)+(i?"&mid="+encodeURIComponent(i):"")+(d.idSyncDisable3rdPartySyncing||d.disableThirdPartyCookies?"&d_coppa=true":""),c=["s_c_il",d._in,"_set"+(n?"MarketingCloud":"Analytics")+"Fields"];a=s+"?"+l+"&callback=s_c_il%5B"+d._in+"%5D._set"+(n?"MarketingCloud":"Analytics")+"Fields",o.corsUrl=s+"?"+l,o.callback=c}return o.url=a,d._getRemoteField(n?I:S,a,e,t,o)}return""},d.getAudienceManagerLocationHint=function(e,t){if(d.getMarketingCloudVisitorID(function(t){d.getAudienceManagerLocationHint(e,!0)})){var n=d._getField(S);if(!n&&T.isTrackingServerPopulated()&&(n=d.getAnalyticsVisitorID(function(t){d.getAudienceManagerLocationHint(e,!0)})),n||!T.isTrackingServerPopulated()){var i=d._getAudienceManagerURLData(),r=i.url;return d._getRemoteField("MCAAMLH",r,e,t,i)}}return""},d.getLocationHint=d.getAudienceManagerLocationHint,d.getAudienceManagerBlob=function(e,t){if(d.getMarketingCloudVisitorID(function(t){d.getAudienceManagerBlob(e,!0)})){var n=d._getField(S);if(!n&&T.isTrackingServerPopulated()&&(n=d.getAnalyticsVisitorID(function(t){d.getAudienceManagerBlob(e,!0)})),n||!T.isTrackingServerPopulated()){var i=d._getAudienceManagerURLData(),r=i.url;return d._customerIDsHashChanged&&d._setFieldExpire(A,-1),d._getRemoteField(A,r,e,t,i)}}return""},d._supplementalDataIDCurrent="",d._supplementalDataIDCurrentConsumed={},d._supplementalDataIDLast="",d._supplementalDataIDLastConsumed={},d.getSupplementalDataID=function(e,t){d._supplementalDataIDCurrent||t||(d._supplementalDataIDCurrent=d._generateID(1));var n=d._supplementalDataIDCurrent;return d._supplementalDataIDLast&&!d._supplementalDataIDLastConsumed[e]?(n=d._supplementalDataIDLast,d._supplementalDataIDLastConsumed[e]=!0):n&&(d._supplementalDataIDCurrentConsumed[e]&&(d._supplementalDataIDLast=d._supplementalDataIDCurrent,d._supplementalDataIDLastConsumed=d._supplementalDataIDCurrentConsumed,d._supplementalDataIDCurrent=n=t?"":d._generateID(1),d._supplementalDataIDCurrentConsumed={}),n&&(d._supplementalDataIDCurrentConsumed[e]=!0)),n};var E=!1;d._liberatedOptOut=null,d.getOptOut=function(e,t){var n=d._getAudienceManagerURLData("_setMarketingCloudFields"),i=n.url;if(u())return d._getRemoteField("MCOPTOUT",i,e,t,n);if(d._registerCallback("liberatedOptOut",e),null!==d._liberatedOptOut)return d._callAllCallbacks("liberatedOptOut",[d._liberatedOptOut]),E=!1,d._liberatedOptOut;if(E)return null;E=!0;var r="liberatedGetOptOut";return n.corsUrl=n.corsUrl.replace(/dpm\.demdex\.net\/id\?/,"dpm.demdex.net/optOutStatus?"),n.callback=[r],m[r]=function(e){if(e===Object(e)){var t,n,i=x.parseOptOut(e,t,y);t=i.optOut,n=1e3*i.d_ottl,d._liberatedOptOut=t,setTimeout(function(){d._liberatedOptOut=null},n)}d._callAllCallbacks("liberatedOptOut",[t]),E=!1},k.fireCORS(n),null},d.isOptedOut=function(e,t,n){t||(t=_.OptOut.GLOBAL);var i=d.getOptOut(function(n){var i=n===_.OptOut.GLOBAL||n.indexOf(t)>=0;d._callCallback(e,[i])},n);return i?i===_.OptOut.GLOBAL||i.indexOf(t)>=0:null},d._fields=null,d._fieldsExpired=null,d._hash=function(e){var t,n,i=0;if(e)for(t=0;t<e.length;t++)n=e.charCodeAt(t),i=(i<<5)-i+n,i&=i;return i},d._generateID=Z,d._generateLocalMID=function(){var e=d._generateID(0);return P.isClientSideMarketingCloudVisitorID=!0,e},d._callbackList=null,d._callCallback=function(e,t){try{"function"==typeof e?e.apply(h,t):e[1].apply(e[0],t)}catch(e){}},d._registerCallback=function(e,t){t&&(null==d._callbackList&&(d._callbackList={}),void 0==d._callbackList[e]&&(d._callbackList[e]=[]),d._callbackList[e].push(t))},d._callAllCallbacks=function(e,t){if(null!=d._callbackList){var n=d._callbackList[e];if(n)for(;n.length>0;)d._callCallback(n.shift(),t)}},d._addQuerystringParam=function(e,t,n,i){var r=encodeURIComponent(t)+"="+encodeURIComponent(n),a=T.parseHash(e),o=T.hashlessUrl(e);if(-1===o.indexOf("?"))return o+"?"+r+a;var s=o.split("?"),l=s[0]+"?",c=s[1];return l+T.addQueryParamAtLocation(c,r,i)+a},d._extractParamFromUri=function(e,t){var n=new RegExp("[\\?&#]"+t+"=([^&#]*)"),i=n.exec(e);if(i&&i.length)return decodeURIComponent(i[1])},d._parseAdobeMcFromUrl=r(te.ADOBE_MC),d._parseAdobeMcSdidFromUrl=r(te.ADOBE_MC_SDID),d._attemptToPopulateSdidFromUrl=function(e){var n=d._parseAdobeMcSdidFromUrl(e),i=1e9;n&&n.TS&&(i=T.getTimestampInSeconds()-n.TS),n&&n.SDID&&n.MCORGID===t&&i<d.sdidParamExpiry&&(d._supplementalDataIDCurrent=n.SDID,d._supplementalDataIDCurrentConsumed.SDID_URL_PARAM=!0)},d._attemptToPopulateIdsFromUrl=function(){var e=d._parseAdobeMcFromUrl();if(e&&e.TS){var n=T.getTimestampInSeconds(),i=n-e.TS;if(Math.floor(i/60)>te.ADOBE_MC_TTL_IN_MIN||e.MCORGID!==t)return;a(e)}},d._mergeServerState=function(e){if(e)try{if(e=function(e){return T.isObject(e)?e:JSON.parse(e)}(e),e[d.marketingCloudOrgID]){var t=e[d.marketingCloudOrgID];!function(e){T.isObject(e)&&d.setCustomerIDs(e)}(t.customerIDs),o(t.sdid)}}catch(e){throw new Error("`serverState` has an invalid format.")}},d._timeout=null,d._loadData=function(e,t,n,i){t=d._addQuerystringParam(t,"d_fieldgroup",e,1),i.url=d._addQuerystringParam(i.url,"d_fieldgroup",e,1),i.corsUrl=d._addQuerystringParam(i.corsUrl,"d_fieldgroup",e,1),P.fieldGroupObj[e]=!0,i===Object(i)&&i.corsUrl&&"XMLHttpRequest"===k.corsMetadata.corsType&&k.fireCORS(i,n,e)},d._clearTimeout=function(e){null!=d._timeout&&d._timeout[e]&&(clearTimeout(d._timeout[e]),d._timeout[e]=0)},d._settingsDigest=0,d._getSettingsDigest=function(){if(!d._settingsDigest){var e=d.version;d.audienceManagerServer&&(e+="|"+d.audienceManagerServer),d.audienceManagerServerSecure&&(e+="|"+d.audienceManagerServerSecure),d._settingsDigest=d._hash(e)}return d._settingsDigest},d._readVisitorDone=!1,d._readVisitor=function(){if(!d._readVisitorDone){d._readVisitorDone=!0;var e,t,n,i,r,a,o=d._getSettingsDigest(),s=!1,l=d.cookieRead(d.cookieName),c=new Date;if(null==d._fields&&(d._fields={}),l&&"T"!==l)for(l=l.split("|"),l[0].match(/^[\-0-9]+$/)&&(parseInt(l[0],10)!==o&&(s=!0),l.shift()),l.length%2==1&&l.pop(),e=0;e<l.length;e+=2)t=l[e].split("-"),n=t[0],i=l[e+1],t.length>1?(r=parseInt(t[1],10),a=t[1].indexOf("s")>0):(r=0,a=!1),s&&("MCCIDH"===n&&(i=""),r>0&&(r=c.getTime()/1e3-60)),n&&i&&(d._setField(n,i,1),r>0&&(d._fields["expire"+n]=r+(a?"s":""),(c.getTime()>=1e3*r||a&&!d.cookieRead(d.sessionCookieName))&&(d._fieldsExpired||(d._fieldsExpired={}),d._fieldsExpired[n]=!0)));!d._getField(S)&&T.isTrackingServerPopulated()&&(l=d.cookieRead("s_vi"))&&(l=l.split("|"),l.length>1&&l[0].indexOf("v1")>=0&&(i=l[1],e=i.indexOf("["),e>=0&&(i=i.substring(0,e)),i&&i.match(te.VALID_VISITOR_ID_REGEX)&&d._setField(S,i)))}},d._appendVersionTo=function(e){var t="vVersion|"+d.version,n=e?d._getCookieVersion(e):null;return n?K.areVersionsDifferent(n,d.version)&&(e=e.replace(te.VERSION_REGEX,t)):e+=(e?"|":"")+t,e},d._writeVisitor=function(){var e,t,n=d._getSettingsDigest();for(e in d._fields)O(e)&&d._fields[e]&&"expire"!==e.substring(0,6)&&(t=d._fields[e],n+=(n?"|":"")+e+(d._fields["expire"+e]?"-"+d._fields["expire"+e]:"")+"|"+t);n=d._appendVersionTo(n),d.cookieWrite(d.cookieName,n,1)},d._getField=function(e,t){return null==d._fields||!t&&d._fieldsExpired&&d._fieldsExpired[e]?null:d._fields[e]},d._setField=function(e,t,n){null==d._fields&&(d._fields={}),d._fields[e]=t,n||d._writeVisitor()},d._getFieldList=function(e,t){var n=d._getField(e,t);return n?n.split("*"):null},d._setFieldList=function(e,t,n){d._setField(e,t?t.join("*"):"",n)},d._getFieldMap=function(e,t){var n=d._getFieldList(e,t);if(n){var i,r={};for(i=0;i<n.length;i+=2)r[n[i]]=n[i+1];return r}return null},d._setFieldMap=function(e,t,n){var i,r=null;if(t){r=[];for(i in t)O(i)&&(r.push(i),r.push(t[i]))}d._setFieldList(e,r,n)},d._setFieldExpire=function(e,t,n){var i=new Date;i.setTime(i.getTime()+1e3*t),null==d._fields&&(d._fields={}),d._fields["expire"+e]=Math.floor(i.getTime()/1e3)+(n?"s":""),t<0?(d._fieldsExpired||(d._fieldsExpired={}),d._fieldsExpired[e]=!0):d._fieldsExpired&&(d._fieldsExpired[e]=!1),n&&(d.cookieRead(d.sessionCookieName)||d.cookieWrite(d.sessionCookieName,"1"))},d._findVisitorID=function(t){return t&&("object"===e(t)&&(t=t.d_mid?t.d_mid:t.visitorID?t.visitorID:t.id?t.id:t.uuid?t.uuid:""+t),t&&"NOTARGET"===(t=t.toUpperCase())&&(t=y),t&&(t===y||t.match(te.VALID_VISITOR_ID_REGEX))||(t="")),t},d._setFields=function(t,n){if(d._clearTimeout(t),null!=d._loading&&(d._loading[t]=!1),P.fieldGroupObj[t]&&P.setState(t,!1),"MC"===t){!0!==P.isClientSideMarketingCloudVisitorID&&(P.isClientSideMarketingCloudVisitorID=!1);var i=d._getField(I);if(!i||d.overwriteCrossDomainMCIDAndAID){if(!(i="object"===e(n)&&n.mid?n.mid:d._findVisitorID(n))){if(d._use1stPartyMarketingCloudServer&&!d.tried1stPartyMarketingCloudServer)return d.tried1stPartyMarketingCloudServer=!0,void d.getAnalyticsVisitorID(null,!1,!0);i=d._generateLocalMID()}d._setField(I,i)}i&&i!==y||(i=""),"object"===e(n)&&((n.d_region||n.dcs_region||n.d_blob||n.blob)&&d._setFields(b,n),d._use1stPartyMarketingCloudServer&&n.mid&&d._setFields(D,{id:n.id})),d._callAllCallbacks(I,[i])}if(t===b&&"object"===e(n)){var r=604800;void 0!=n.id_sync_ttl&&n.id_sync_ttl&&(r=parseInt(n.id_sync_ttl,10));var a=L.getRegionAndCheckIfChanged(n,r);d._callAllCallbacks("MCAAMLH",[a]);var o=d._getField(A);(n.d_blob||n.blob)&&(o=n.d_blob,o||(o=n.blob),d._setFieldExpire(A,r),d._setField(A,o)),o||(o=""),d._callAllCallbacks(A,[o]),!n.error_msg&&d._newCustomerIDsHash&&d._setField("MCCIDH",d._newCustomerIDsHash)}if(t===D){var s=d._getField(S);s&&!d.overwriteCrossDomainMCIDAndAID||(s=d._findVisitorID(n),s?s!==y&&d._setFieldExpire(A,-1):s=y,d._setField(S,s)),s&&s!==y||(s=""),d._callAllCallbacks(S,[s])}if(d.idSyncDisableSyncs||d.disableIdSyncs)L.idCallNotProcesssed=!0;else{L.idCallNotProcesssed=!1;var l={};l.ibs=n.ibs,l.subdomain=n.subdomain,L.processIDCallData(l)}if(n===Object(n)){var c,f;u()&&d.isAllowed()&&(c=d._getField("MCOPTOUT"));var g=x.parseOptOut(n,c,y);c=g.optOut,f=g.d_ottl,d._setFieldExpire("MCOPTOUT",f,!0),d._setField("MCOPTOUT",c),d._callAllCallbacks("MCOPTOUT",[c])}},d._loading=null,d._getRemoteField=function(e,t,n,i,r){var a,o="",s=T.isFirstPartyAnalyticsVisitorIDCall(e),l={MCAAMLH:!0,MCAAMB:!0};if(u()&&d.isAllowed()){d._readVisitor(),o=d._getField(e,!0===l[e]);if(function(){return(!o||d._fieldsExpired&&d._fieldsExpired[e])&&(!d.disableThirdPartyCalls||s)}()){if(e===I||"MCOPTOUT"===e?a="MC":"MCAAMLH"===e||e===A?a=b:e===S&&(a=D),a)return!t||null!=d._loading&&d._loading[a]||(null==d._loading&&(d._loading={}),d._loading[a]=!0,d._loadData(a,t,function(t){if(!d._getField(e)){t&&P.setState(a,!0);var n="";e===I?n=d._generateLocalMID():a===b&&(n={error_msg:"timeout"}),d._setFields(a,n)}},r)),d._registerCallback(e,n),o||(t||d._setFields(a,{id:y}),"")}else o||(e===I?(d._registerCallback(e,n),o=d._generateLocalMID(),d.setMarketingCloudVisitorID(o)):e===S?(d._registerCallback(e,n),o="",d.setAnalyticsVisitorID(o)):(o="",i=!0))}return e!==I&&e!==S||o!==y||(o="",i=!0),n&&i&&d._callCallback(n,[o]),o},d._setMarketingCloudFields=function(e){d._readVisitor(),d._setFields("MC",e)},d._mapCustomerIDs=function(e){d.getAudienceManagerBlob(e,!0)},d._setAnalyticsFields=function(e){d._readVisitor(),d._setFields(D,e)},d._setAudienceManagerFields=function(e){d._readVisitor(),d._setFields(b,e)},d._getAudienceManagerURLData=function(e){var t=d.audienceManagerServer,n="",i=d._getField(I),r=d._getField(A,!0),a=d._getField(S),o=a&&a!==y?"&d_cid_ic=AVID%01"+encodeURIComponent(a):"";if(d.loadSSL&&d.audienceManagerServerSecure&&(t=d.audienceManagerServerSecure),t){var s,l,c=d.getCustomerIDs();if(c)for(s in c)O(s)&&(l=c[s],o+="&d_cid_ic="+encodeURIComponent(s)+"%01"+encodeURIComponent(l.id?l.id:"")+(l.authState?"%01"+l.authState:""));e||(e="_setAudienceManagerFields");var u="http"+(d.loadSSL?"s":"")+"://"+t+"/id",f="d_visid_ver="+d.version+(g&&-1!==u.indexOf("demdex.net")?"&gdpr=1&gdpr_force=1&gdpr_consent="+g:"")+"&d_rtbd=json&d_ver=2"+(!i&&d._use1stPartyMarketingCloudServer?"&d_verify=1":"")+"&d_orgid="+encodeURIComponent(d.marketingCloudOrgID)+"&d_nsid="+(d.idSyncContainerID||0)+(i?"&d_mid="+encodeURIComponent(i):"")+(d.idSyncDisable3rdPartySyncing||d.disableThirdPartyCookies?"&d_coppa=true":"")+(!0===C?"&d_coop_safe=1":!1===C?"&d_coop_unsafe=1":"")+(r?"&d_blob="+encodeURIComponent(r):"")+o,p=["s_c_il",d._in,e];return n=u+"?"+f+"&d_cb=s_c_il%5B"+d._in+"%5D."+e,{url:n,corsUrl:u+"?"+f,callback:p}}return{url:n}},d.appendVisitorIDsTo=function(e){try{var t=[[I,d._getField(I)],[S,d._getField(S)],["MCORGID",d.marketingCloudOrgID]];return d._addQuerystringParam(e,te.ADOBE_MC,s(t))}catch(t){return e}},d.appendSupplementalDataIDTo=function(e,t){if(!(t=t||d.getSupplementalDataID(T.generateRandomString(),!0)))return e;try{var n=s([["SDID",t],["MCORGID",d.marketingCloudOrgID]]);return d._addQuerystringParam(e,te.ADOBE_MC_SDID,n)}catch(t){return e}};var T={parseHash:function(e){var t=e.indexOf("#");return t>0?e.substr(t):""},hashlessUrl:function(e){var t=e.indexOf("#");return t>0?e.substr(0,t):e},addQueryParamAtLocation:function(e,t,n){var i=e.split("&");return n=null!=n?n:i.length,i.splice(n,0,t),i.join("&")},isFirstPartyAnalyticsVisitorIDCall:function(e,t,n){if(e!==S)return!1;var i;return t||(t=d.trackingServer),n||(n=d.trackingServerSecure),!("string"!=typeof(i=d.loadSSL?n:t)||!i.length)&&(i.indexOf("2o7.net")<0&&i.indexOf("omtrdc.net")<0)},isObject:function(e){return Boolean(e&&e===Object(e))},removeCookie:function(e){Re.remove(e,{domain:d.cookieDomain})},isTrackingServerPopulated:function(){return!!d.trackingServer||!!d.trackingServerSecure},getTimestampInSeconds:function(){return Math.round((new Date).getTime()/1e3)},parsePipeDelimetedKeyValues:function(e){return e.split("|").reduce(function(e,t){var n=t.split("=");return e[n[0]]=decodeURIComponent(n[1]),e},{})},generateRandomString:function(e){e=e||5;for(var t="",n="abcdefghijklmnopqrstuvwxyz0123456789";e--;)t+=n[Math.floor(Math.random()*n.length)];return t},normalizeBoolean:function(e){return"true"===e||"false"!==e&&e},parseBoolean:function(e){return"true"===e||"false"!==e&&null},replaceMethodsWithFunction:function(e,t){for(var n in e)e.hasOwnProperty(n)&&"function"==typeof e[n]&&(e[n]=t);return e}};d._helpers=T;var L=ne(d,_);d._destinationPublishing=L,d.timeoutMetricsLog=[];var P={isClientSideMarketingCloudVisitorID:null,MCIDCallTimedOut:null,AnalyticsIDCallTimedOut:null,AAMIDCallTimedOut:null,fieldGroupObj:{},setState:function(e,t){switch(e){case"MC":!1===t?!0!==this.MCIDCallTimedOut&&(this.MCIDCallTimedOut=!1):this.MCIDCallTimedOut=t;break;case D:!1===t?!0!==this.AnalyticsIDCallTimedOut&&(this.AnalyticsIDCallTimedOut=!1):this.AnalyticsIDCallTimedOut=t;break;case b:!1===t?!0!==this.AAMIDCallTimedOut&&(this.AAMIDCallTimedOut=!1):this.AAMIDCallTimedOut=t}}};d.isClientSideMarketingCloudVisitorID=function(){return P.isClientSideMarketingCloudVisitorID},d.MCIDCallTimedOut=function(){return P.MCIDCallTimedOut},d.AnalyticsIDCallTimedOut=function(){return P.AnalyticsIDCallTimedOut},d.AAMIDCallTimedOut=function(){return P.AAMIDCallTimedOut},d.idSyncGetOnPageSyncInfo=function(){return d._readVisitor(),d._getField("MCSYNCSOP")},d.idSyncByURL=function(e){var t=l(e||{});if(t.error)return t.error;var n,i,r=e.url,a=encodeURIComponent,o=L;return r=r.replace(/^https:/,"").replace(/^http:/,""),n=x.encodeAndBuildRequest(["",e.dpid,e.dpuuid||""],","),i=["ibs",a(e.dpid),"img",a(r),t.ttl,"",n],o.addMessage(i.join("|")),o.requestToProcess(),"Successfully queued"},d.idSyncByDataSource=function(e){return e===Object(e)&&"string"==typeof e.dpuuid&&e.dpuuid.length?(e.url="//dpm.demdex.net/ibs:dpid="+e.dpid+"&dpuuid="+e.dpuuid,d.idSyncByURL(e)):"Error: config or config.dpuuid is empty"},we(d,L),d._getCookieVersion=function(e){e=e||d.cookieRead(d.cookieName);var t=te.VERSION_REGEX.exec(e);return t&&t.length>1?t[1]:null},d._resetAmcvCookie=function(e){var t=d._getCookieVersion();t&&!K.isLessThan(t,e)||T.removeCookie(d.cookieName)},d.setAsCoopSafe=function(){C=!0},d.setAsCoopUnsafe=function(){C=!1},function(){if(d.configs=Object.create(null),T.isObject(n))for(var e in n)O(e)&&(d[e]=n[e],d.configs[e]=n[e])}(),function(){[["getMarketingCloudVisitorID"],["setCustomerIDs",void 0],["getAnalyticsVisitorID"],["getAudienceManagerLocationHint"],["getLocationHint"],["getAudienceManagerBlob"]].forEach(function(e){var t=e[0],n=2===e.length?e[1]:"",i=d[t];d[t]=function(e){return u()&&d.isAllowed()?i.apply(d,arguments):("function"==typeof e&&d._callCallback(e,[n]),n)}})}(),d.init=function(){if(c())var e=f.optIn.fetchPermissions(function(){f.optIn.isApproved(f.optIn.Categories.ECID)&&(d.configs.isIabContext?f.optIn.execute({command:"iabPlugin.fetchConsentData",callback:function(t,n){if(p=!0,t)throw new Error("[IAB plugin] : "+t);n.gdprApplies&&(g=n.consentString),d.init(),e()}}):(d.init(),e()))},!0);else!function(){if(T.isObject(n)){d.idSyncContainerID=d.idSyncContainerID||0,C="boolean"==typeof d.isCoopSafe?d.isCoopSafe:T.parseBoolean(d.isCoopSafe),d.resetBeforeVersion&&d._resetAmcvCookie(d.resetBeforeVersion),d._attemptToPopulateIdsFromUrl(),d._attemptToPopulateSdidFromUrl(),d._readVisitor();var e=d._getField(v),t=Math.ceil((new Date).getTime()/te.MILLIS_PER_DAY);d.idSyncDisableSyncs||d.disableIdSyncs||!L.canMakeSyncIDCall(e,t)||(d._setFieldExpire(A,-1),d._setField(v,t)),d.getMarketingCloudVisitorID(),d.getAudienceManagerLocationHint(),d.getAudienceManagerBlob(),d._mergeServerState(d.serverState)}else d._attemptToPopulateIdsFromUrl(),d._attemptToPopulateSdidFromUrl()}(),function(){if(!d.idSyncDisableSyncs&&!d.disableIdSyncs){L.checkDPIframeSrc();var e=function(){var e=L;e.readyToAttachIframe()&&e.attachIframe()};h.addEventListener("load",function(){_.windowLoaded=!0,e()});try{$.receiveMessage(function(e){L.receiveMessage(e.data)},L.iframeHost)}catch(e){}}}(),function(){d.whitelistIframeDomains&&te.POST_MESSAGE_ENABLED&&(d.whitelistIframeDomains=d.whitelistIframeDomains instanceof Array?d.whitelistIframeDomains:[d.whitelistIframeDomains],d.whitelistIframeDomains.forEach(function(e){var n=new U(t,e),i=z(d,n);$.receiveMessage(i,e)}))}()}};xe.config=re,m.Visitor=xe;var Ne=xe,je=Pe.OptIn,Ve=Pe.IabPlugin;return Ne.getInstance=function(e,t){if(!e)throw new Error("Visitor requires Adobe Marketing Cloud Org ID.");e.indexOf("@")<0&&(e+="@AdobeOrg");var n=function(){var t=m.s_c_il;if(t)for(var n=0;n<t.length;n++){var i=t[n];if(i&&"Visitor"===i._c&&i.marketingCloudOrgID===e)return i}}();if(n)return n;var i=function(){if(x.isObject(t))return Object.keys(t).reduce(function(e,n){var i="doesOptInApply"!==n?t[n]:!!re.normalizeConfig(t[n]),r=x.normalizeBoolean(i);return e[n]=r,e},Object.create(null))}();!function(e){m.adobe.optIn=m.adobe.optIn||function(){var t=x.pluck(e,["doesOptInApply","previousPermissions","preOptInApprovals","isOptInStorageEnabled","optInStorageExpiry","isIabContext"]),n=e.optInCookieDomain||e.cookieDomain;n=n||J(),n=n===window.location.hostname?"":n,t.optInCookieDomain=n;var i=new je(t,{cookies:Re});if(t.isIabContext){var r=new Ve(window.__cmp);i.registerPlugin(r)}return i}()}(i||{});var r=e,a=r.split("").reverse().join(""),o=new Ne(e,null,a);x.isObject(i)&&i.cookieDomain&&(o.cookieDomain=i.cookieDomain),function(){m.s_c_il.splice(--m.s_c_in,1)}();var s=x.getIeVersion();if("number"==typeof s&&s<10)return o._helpers.replaceMethodsWithFunction(o,function(){});var l=function(){try{return m.self!==m.parent}catch(e){return!0}}()&&!function(e){return e.cookieWrite("TEST_AMCV_COOKIE","T",1),"T"===e.cookieRead("TEST_AMCV_COOKIE")&&(e._helpers.removeCookie("TEST_AMCV_COOKIE"),!0)}(o)&&m.parent?new B(e,i,o,m.parent):new Ne(e,i,a);return o=null,l.init(),l},function(){function e(){Ne.windowLoaded=!0}m.addEventListener?m.addEventListener("load",e):m.attachEvent&&m.attachEvent("onload",e),Ne.codeLoadEnd=(new Date).getTime()}(),Ne}();// Dynamic Tag Management Library
// Property: MathWorks Website
// All code and conventions are protected by copyright
// Adobe Systems Incorporated

(function(window, document, undefined) {
// Satellite
// =========
//
// Satellite *core*. Yeah, you want it.
//
// In this first section, we have a some useful utility functions.
var ToString = Object.prototype.toString

var Overrides = window._satellite && window._satellite.override

function assert(cond, msg){
  if (!cond){
    throw new Error(msg || "Assertion Failure")
  }
}

var SL = {
  initialized: false,

  // `$data(elm, prop, [val])`
  // ----------------------------
  //
  // Our own `$data()` method, [a la jQuery](http://api.jquery.com/jQuery.data/)
  // , used to get or set
  // properties on DOM elements without going insane.
  // `uuid` and `dataCache` are used by `$data()`
  //
  // Parameters:
  //
  // - `elm` - the element to get or set a property to
  // - `prop` - the property name
  // - `val` - the value of the property, if omitted, the method will
  //      return the existing value of the property, if any
  $data: function(elm, prop, val){
    if (!elm) return;
    var __satellite__ = '__satellite__'
    var cache = SL.dataCache
    var uuid = elm[__satellite__]
    if (!uuid) uuid = elm[__satellite__] = SL.uuid++
    var datas = cache[uuid]
    if (!datas) datas = cache[uuid] = {}
    if (val === undefined)
      return datas[prop]
    else
      datas[prop] = val
  },
  uuid: 1,
  dataCache: {},

  // `keys(object)`
  // --------------
  //
  // Return all keys of an object in an array.
  keys: function(obj){
    var ret = []
    for (var key in obj) 
      if (obj.hasOwnProperty(key))
        ret.push(key)
    return ret
  },

  // `values(object)`
  // ----------------
  //
  // Return all values of an object in an array.
  values: function(obj){
    var ret = []
    for (var key in obj) 
      if (obj.hasOwnProperty(key))
        ret.push(obj[key])
    return ret
  },

  // `isArray(thing)`
  // --------------
  //
  // Returns whether the given thing is an array.
  isArray: Array.isArray || function(thing){
    return ToString.apply(thing) === "[object Array]"
  },

  // `isObject(thing)`
  // -----------------
  //
  // Returns whether the given thing is a plain object.
  isObject: function(thing){
    return thing != null && !SL.isArray(thing) &&
      typeof thing === 'object'
  },

  // `isString(thing)`
  // -----------------
  //
  // Returns whether thing is a string
  isString: function(thing){
    return typeof thing === 'string'
  },

  // `isNumber(thing)`
  // -----------------
  //
  // Returns whether thing is a number
  isNumber: function(thing){
    return ToString.apply(thing) === '[object Number]' && !SL.isNaN(thing)
  },

  // `isNaN(thing)`
  // --------------
  //
  // Return whether thing is NaN
  isNaN: function(thing){
    return thing !== thing
  },

  // `isRegex(thing)`
  // ----------------
  //
  // Returns whether thing is a RegExp object
  isRegex: function(thing){
    return thing instanceof RegExp
  },

  // `isLinkTag(thing)`
  // ----------------
  //
  // Returns whether thing is a DOM link element
  isLinkTag: function(thing){
    return !!(thing && thing.nodeName &&
      thing.nodeName.toLowerCase() === 'a')
  },

  // `each(arr, func, [context])`
  // ------------------
  //
  // A handy method for array iteration wo having to write a for-loop.
  //
  // Parameters:
  //
  // - `arr` - an array
  // - `func(item, index, arr)` - a function which accepts each item in the array
  //      once. I takes these arguments
  //      * `item` - an item
  //      * `index` - the array index of said item
  //      * `arr` - the array
  // - `context` - the context to be bound to `func` when it is invoked
  each: function(arr, func, context){
    for (var i = 0, len = arr.length; i < len; i++)
      func.call(context, arr[i], i, arr)
  },

  // `map(arr, func)`
  // ----------------
  //
  // A handy method for mapping an array to another array using a 1-to-1 mapping
  // for each element
  //
  // Parameters:
  //
  // Parameters are the same as `SL.each`, except that `func` is expected to return
  // a the value you want in the corresponding index of the returned array.
  map: function(arr, func, context){
    var ret = []
    for (var i = 0, len = arr.length; i < len; i++)
      ret.push(func.call(context, arr[i], i, arr))
    return ret
  },

  // `filter(arr, cond)`
  // -------------------
  //
  // Handy method for take an array and filtering down to a subset of the elements.
  //
  // Parameters:
  //
  // Parameters are the same as `SL.each` except the second argument is `cond`
  // instead of `func` and it is expected to return a truthy value respresenting
  // whether to include this item in the return array or not.
  filter: function(arr, cond, context){
    var ret = []
    for (var i = 0, len = arr.length; i < len; i++){
      var item = arr[i]
      if (cond.call(context, item, i, arr))
        ret.push(item)
    }
    return ret
  },

  // `any(arr, cond, context)`
  // -------------------------
  //
  // Another array helper function. Returns true if `cond(item)` returns true
  // for any item in the array.
  any: function(arr, cond, context){
    for (var i = 0, len = arr.length; i < len; i++){
      var item = arr[i]
      if (cond.call(context, item, i, arr))
        return true
    }
    return false
  },

  // `every(arr, cond, context)`
  // ---------------------------
  //
  // Another array helper function. Returns true if `cond(item)` returns true
  // for every item in the array.
  every: function(arr, cond, context){
    var retval = true
    for (var i = 0, len = arr.length; i < len; i++){
      var item = arr[i]
      retval = retval && cond.call(context, item, i, arr)
    }
    return retval
  },

  // `contains(arr, obj)`
  // -----------------------
  //
  // Tells you whether an array contains an object.
  //
  // Parameters:
  //
  // - `arr` - said array
  // - `obj` - said object
  contains: function(arr, obj){
    return SL.indexOf(arr, obj) !== -1
  },

  // `indexOf(arr, obj)`
  // -------------------
  //
  // Return the index of an object within an array.
  //
  // Parameters;
  //
  // - `arr` - said array
  // - `obj` - said object
  indexOf: function(arr, obj){
    if (arr.indexOf)
      return arr.indexOf(obj)
    for (var i = arr.length; i--;)
      if (obj === arr[i])
        return i
    return -1
  },


  // `find(arr, obj)`
  // -------------------
  //
  // Return the index of an object within an array.
  //
  // Parameters;
  //
  // - `arr` - said array
  // - `obj` - said object
  find: function(arr, cond, context){
    var ret = []
    if (!arr) return null
    for (var i = 0, len = arr.length; i < len; i++){
      var item = arr[i]
      if (cond.call(context, item, i, arr))
        return item
    }
    return null
  },

  // `textMatch(str, str_or_regex)`
  // ------------------------------
  //
  // Perform a string match based on another string or a regex.
  //
  // Parameters:
  //
  // `str` - the input string to be matched
  // `str_or_regex` - the pattern to match against, if this is a string, it requires exact match, if
  //      it's a regex, then it will do regex match
  textMatch: function(str, pattern){
    if (pattern == null) throw new Error('Illegal Argument: Pattern is not present')
    if (str == null) return false
    if (typeof pattern === 'string') return str === pattern
    else if (pattern instanceof RegExp) return pattern.test(str)
    else return false
  },

  // `stringify(obj, [seenValues])`
  // ------------------------------
  //
  // Stringify any type of object.
  //
  // Parameters:
  //
  // `obj` - the object that needs to be stringified
  // `seenValues` - pool of parsed resources; used to avoid circular references;
  stringify: function(obj, seenValues){
    seenValues = seenValues || [];
    if (SL.isObject(obj)) {
      if (SL.contains(seenValues, obj)) {
        return '<Cycle>';
      } else {
        seenValues.push(obj);
      }
    }

    if (SL.isArray(obj)) {
      return '[' + SL.map(obj, function(value){
        return SL.stringify(value, seenValues)
      }).join(',') + ']';
    } else if (SL.isString(obj)) {
      return '"' + String(obj) + '"';
    } if (SL.isObject(obj)) {
      var data = [];
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
          data.push(prop + ': ' + SL.stringify(obj[prop], seenValues));
      }
      return '{' + data.join(', ') + '}';
    } else {
      return String(obj);
    }
  },

  // `trim(str)`
  // -----------
  //
  // Trims a string.
  //
  // Parameters:
  //
  // `str` - the input string to be trimmed.
  trim: function(str){
    if (str == null) return null
    if (str.trim){
      return str.trim()
    }else{
      return str.replace(/^ */, '').replace(/ *$/, '')
    }
  },

  // `bind(func, context)`
  // ---------------------
  //
  // Binds a context permanently to a context. The returned function is a new function
  // which - when called - will call the passed in function with `context` bound to it.
  //
  // Parameters:
  //
  // `func` - a function
  // `context` - an object to be bound as the context of this function
  bind: function(func, context) {
    return function() {
      return func.apply(context, arguments)
    }
  },

  // `throttle(fn, delay)`
  // ---------------------
  //
  // *Throttles* a function `fn` to be called no more than once during the interval
  // specified by `delay`.
  //
  // Parameters:
  //
  // - `fn` - a function
  // - `delay` - delay in milliseconds
  //
  // *Throttle function stolen from
  //     <http://remysharp.com/2010/07/21/throttling-function-calls/>*
  throttle: function(fn, delay) {
    var timer = null;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  },

  // `domReady(callback)`
  // --------------------
  //
  // Registers a callback to be called when the DOM is fully parsed and loaded.
  //
  // Parameters:
  //
  // - `callback` - a function to be called at `domready`
  //
  // *domReady is borrowed from <https://github.com/ded/domready>*
  domReady: (function (ready) {

    var fns = [], fn, f = false
      , doc = document
      , testEl = doc.documentElement
      , hack = testEl.doScroll
      , domContentLoaded = 'DOMContentLoaded'
      , addEventListener = 'addEventListener'
      , onreadystatechange = 'onreadystatechange'
      , loaded = /^loade|^c/.test(doc.readyState)

    function flush(f) {
      loaded = 1
      while (f = fns.shift()) f()
    }

    doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
      doc.removeEventListener(domContentLoaded, fn, f)
      flush()
    }, f)


    hack && doc.attachEvent(onreadystatechange, (fn = function () {
      if (/^c/.test(doc.readyState)) {
        doc.detachEvent(onreadystatechange, fn)
        flush()
      }
    }))

    return (ready = hack ?
      function (fn) {
        self != top ?
          loaded ? fn() : fns.push(fn) :
          function () {
            try {
              testEl.doScroll('left')
            } catch (e) {
              return setTimeout(function() { ready(fn) }, 50)
            }
            fn()
          }()
      } :
      function (fn) {
        loaded ? fn() : fns.push(fn)
      })
  }()),

  // `loadScript(url, [callback])`
  // -----------------------------
  //
  // Load an external script.
  //
  // Parameters:
  //
  // - `url` - the URL of the script
  // - `callback`(optional) - the function to be called after the script has loaded.
  loadScript: function(url, callback){
    var script = document.createElement('script')
    SL.scriptOnLoad(url, script, callback)
    script.src = url
    document.getElementsByTagName('head')[0]
      .appendChild(script)
  },

  scriptOnLoad: function(url, script, callback){
    function cb(err){
      if (err) SL.logError(err)
      if (callback) callback(err)
    }
    if ('onload' in script){
      script.onload = function(){
        cb()
      }
      script.onerror = function(){
        cb(new Error('Failed to load script ' + url))
      }
    }else if ('readyState' in script){
      script.onreadystatechange = function(){
        var rs = script.readyState
        if (rs === 'loaded' || rs === 'complete'){
          script.onreadystatechange = null
          cb()
        }
      }
    }
  },

  // `loadScriptOnce(url, [callback])`
  // -----------------------------
  //
  // Load an external script only if it hasn't been loaded until now.
  //
  // Parameters:
  //
  // - `url` - the URL of the script
  // - `callback`(optional) - the function to be called after the script has loaded.
  loadScriptOnce: function(url, callback){
    if (SL.loadedScriptRegistry[url]) return

    SL.loadScript(url, function(err) {
      if (!err) {
        SL.loadedScriptRegistry[url] = true
      }

      if (callback) callback(err)
    })
  },

  loadedScriptRegistry: {},

  // `loadScriptSync(url)`
  // -----------------------------
  //
  // Load an external script using document.write.
  //
  // Parameters:
  //
  // - `url` - the URL of the script
  loadScriptSync: function(url){
    if (!document.write) {
      SL.notify('Cannot load sync the "' + url + '" script because "document.write" is not available', 1)
      return
    }

    if (SL.domReadyFired){
      SL.notify('Cannot load sync the "' + url + '" script after DOM Ready.', 1)
      return
    }

    // If the url contains a double quote, it could be someone trying to switch out of the
    // attribute to introduce an XSS hack. On the other hand, it could just be that the URL
    // was never escaped. We'll escape it to prevent the former while supporting the latter.
    if (url.indexOf('"') > -1) {
      url = encodeURI(url);
    }

    document.write('<script src="' + url + '"></scr' + 'ipt>');
  },

  // `pushAsyncScript(callback)`
  // -------------------
  //
  // Called by an async custom user script.
  pushAsyncScript: function(cb){
    SL.tools['default'].pushAsyncScript(cb)
  },

  // `pushBlockingScript(callback)`
  // ------------------------------
  //
  // Called by a blocking custom user script.
  pushBlockingScript: function(cb){
    SL.tools['default'].pushBlockingScript(cb)
  },

  // `addEventHandler(elm, evt, callback)`
  // -------------------------------------
  //
  // Register an event handler for a element
  //
  // Parameters:
  //
  // - `elm` - the element in question
  // - `evt` - the event type to listen to
  // - `callback` - callback function
  addEventHandler: window.addEventListener ?
    function(node, evt, cb){ node.addEventListener(evt, cb, false) } :
    function(node, evt, cb){ node.attachEvent('on' + evt, cb) },

  removeEventHandler: window.removeEventListener ?
    function(node, evt, cb){ node.removeEventListener(evt, cb, false) } :
    function(node, evt, cb){ node.detachEvent('on' + evt, cb) },

  // `preventDefault(evt)`
  // ---------------------
  //
  // Prevent the default browser behavior for this event
  //
  // Parameters:
  //
  // `evt` - the event triggered
  preventDefault: window.addEventListener ?
    function(e){ e.preventDefault() } :
    function(e){ e.returnValue = false },

  // `stopPropagation(evt)`
  // ----------------------
  //
  // Cross-browser `stopPropagation`
  //
  // Parameters:
  //
  // `evt` - the event triggered
  stopPropagation: function(e){
    e.cancelBubble = true
    if (e.stopPropagation) e.stopPropagation()
  },

  // `containsElement(container, elm)`
  // ----------------------
  //
  // Given DOM elements `container` and `elm`, returns whether `container` contains `elm`.
  //
  // Parameters:
  //
  // `elm1` - the possible parent
  // `elm2` - the possible child
  containsElement: function(container, elm) {
    return container.contains ? container.contains(elm) :
      !!(container.compareDocumentPosition(elm) & 16);
  },

  // `matchesCss(css, elm)`
  // ----------------------
  //
  // Returns whether a DOM element matches a given css selector
  //
  // Parameters:
  //
  // - `css` - the CSS selector
  // - `elm` - the element
  matchesCss: (function(docEl){

    function simpleTagMatch(selector, elm){
      var tagName = elm.tagName
      if (!tagName) return false
      return selector.toLowerCase() === tagName.toLowerCase()
    }

    var matches =
      docEl.matchesSelector ||
      docEl.mozMatchesSelector ||
      docEl.webkitMatchesSelector ||
      docEl.oMatchesSelector ||
      docEl.msMatchesSelector
    if (matches) {
      return function(selector, elm){
        if (elm === document || elm === window) return false
        try{
          return matches.call(elm, selector)
        }catch(e){
          return false
        }
      }
    } else if(docEl.querySelectorAll) {
      return function(selector, elm) {
        var parent = elm.parentNode
        if (!parent) return false
        if (selector.match(/^[a-z]+$/i)){
          return simpleTagMatch(selector, elm)
        }
        try{
          var nodeList = elm.parentNode.querySelectorAll(selector)
          for (var i = nodeList.length; i--;)
          if (nodeList[i] === elm) return true
        }catch(e){
          //
        }
        return false
      }
    }else{
      return function(selector, elm){
        if (selector.match(/^[a-z]+$/i)){
          return simpleTagMatch(selector, elm)
        }
        try{
          return SL.Sizzle.matches(selector, [elm]).length > 0
        }catch(e){
          return false
        }
      }
    }
  }(document.documentElement)),

  // `cssQuery(css)`
  // ---------------
  //
  // Return a list of element matching the given css selector
  //
  // Parameters:
  //
  // - `css` - the CSS selector
  cssQuery: (function(doc){
    if (doc.querySelectorAll) {
      return function(css, cb){
        var results
        try{
          results = doc.querySelectorAll(css)
        }catch(e){
          results = []
        }
        cb(results)
      }
    }else{
      return function(css, cb){
        if (SL.Sizzle){
          var results
          try{
            results = SL.Sizzle(css)
          }catch(e){
            results = []
          }
          cb(results)
        }else
          SL.sizzleQueue.push([css, cb])
      }
    }
  })(document),

  // `hasAttr(elem, attrName)`
  // ---------------
  //
  // Check if attribute is defined on element
  //
  // Parameters:
  //
  // - `elem` - the DOM element
  // - `attrName` - attribute name
  hasAttr: function(elem, attrName) {
    return elem.hasAttribute ? elem.hasAttribute(attrName) : elem[attrName] !== undefined;
  },

  // `inherit(subClass, superClass)`
  // -------------------------------
  //
  // Make `subClass` inherit `superClass`.
  //
  // Parameters:
  //
  // - `subClass` - a Javascript function representing a constructor - the inheritor
  // - `superClass` - another constructor - the one to inherit from
  inherit: function(subClass, superClass){
    var f = function() {}
    f.prototype = superClass.prototype
    subClass.prototype = new f()
    subClass.prototype.constructor = subClass
  },

  // `extend(dst, src)`
  // ----------------
  //
  // Extend an object with the properties of another.
  //
  // Parameters:
  //
  // - `dst` - object to copy to
  // - `src` - object to copy from
  extend: function(dst, src){
    for (var prop in src)
      if (src.hasOwnProperty(prop))
        dst[prop] = src[prop]
  },

  // `toArray(arrayLike)`
  // --------------------
  //
  // Converts an array-like object to an array.
  //
  // Parameters:
  //
  // - `arrayLike` - an array-like object, meaning it has a length property
  //   which is a number
  toArray: (function(){
    try {
      var slice = Array.prototype.slice
      slice.call( document.documentElement.childNodes, 0 )[0].nodeType;
      return function(thing){
        return slice.call(thing, 0)
      }
    // Provide a fallback method if it does not work
    } catch( e ) {
      return function(thing){
        var ret = []
        for (var i = 0, len = thing.length; i < len; i++)
          ret.push(thing[i])
        return ret
      }
    }
  })(),

  // `equalsIgnoreCase(str1, str2)`
  // ------------------------------
  //
  // Returns true iff str1 and str2 are equal ignoring case.
  //
  // Parameters:
  //
  // * `str1` - the first string
  // * `str2` - the second string
  equalsIgnoreCase: function(str1, str2){
    if (str1 == null) return str2 == null
    if (str2 == null) return false
    return String(str1).toLowerCase() === String(str2).toLowerCase()
  },

  // `poll(fn, [freq], [max_retries])`
  // ------------------
  //
  // Runs `fn` for every `freq` ms. `freq` defaults to 1000. If any
  // invocation of `fn()` returns true, polling will stop.
  // The polling will stop if the number or retries exceeds the
  // provided `max_retries`.
  //
  // Parameters:
  //
  // * `fn` - function to be called repeatedly
  // * `freq` - frequency to call the function
  // * `max_retries` - number of times to retry
  poll: function(fn, freq, max_retries){
    var retries = 0

    freq = freq || 1000
    check()

    function check(){
      if (SL.isNumber(max_retries) && retries++ >= max_retries) {
        return;
      }

      if (!fn()){
        setTimeout(check, freq)
      }
    }
  },
  // ``Html(str)`
  // --------------------
  //
  // Escapes a string for being used in an HTML context. Returns
  // the escaped version of the string. Replaces the characters
  // `&` `<` `>` `"` `'` and `/`.
  //
  // Parameters:
  //
  // * `str` - the string to be escaped
  escapeForHtml: function(str){
    if (!str) return str
    return String(str)
      .replace(/\&/g, '&amp;')
      .replace(/\</g, '&lt;')
      .replace(/\>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }
}

// The available tools to use.
SL.availableTools = {}

// The avaliable event emitters to use.
SL.availableEventEmitters = []

// The names of the events which can only fire once.
SL.fireOnceEvents = ['condition', 'elementexists']

// Initialize all event emitters.
SL.initEventEmitters = function(){
  SL.eventEmitters = SL.map(SL.availableEventEmitters, function(ee){
    return new ee()
  })
}

// Call `registerElements` on all event emitters.
SL.eventEmitterBackgroundTasks = function(){
  SL.each(SL.eventEmitters, function(ee){
    if ('backgroundTasks' in ee)
      ee.backgroundTasks()
  })
}

// Initialize all tools.
SL.initTools = function(toolSpecs){
  var tools = { 'default': new DefaultTool() }
  var euCookieName = SL.settings.euCookieName || 'sat_track'
  for (var id in toolSpecs){
    if(toolSpecs.hasOwnProperty(id)) {
      var toolSpec, ctr, tool
      toolSpec = toolSpecs[id]
      if (toolSpec.euCookie){
        var cookieSet = SL.readCookie(euCookieName) !== 'true'
        if (cookieSet) continue
      }
      ctr = SL.availableTools[toolSpec.engine]
      if (!ctr){
        var available = []
        for (var key in SL.availableTools){
          if (SL.availableTools.hasOwnProperty(key)) {
            available.push(key)  
          }
        }
        throw new Error('No tool engine named ' + toolSpec.engine +
          ', available: ' + available.join(',') + '.')
      }
      tool = new ctr(toolSpec)
      tool.id = id
      tools[id] = tool
    }
  }
  return tools
}

// Pre-process arguments (variable substitutions and lower-casing) before
// feeding them to the tools.
SL.preprocessArguments = function(args, elm, evt, forceLowerCase, escapeHtml){
  if (!args) return args
  return preprocessArray(args, forceLowerCase)
  function forceLowerCaseIfNeeded(value) {
    return forceLowerCase && SL.isString(value) ? value.toLowerCase() : value
  }

  function preprocessObject(obj){
    var ret = {}
    for (var key in obj){
      if (obj.hasOwnProperty(key)){
        var value = obj[key]
        if (SL.isObject(value)){
          ret[key] = preprocessObject(value)
        }else if (SL.isArray(value)){
          ret[key] = preprocessArray(value, forceLowerCase)
        }else{
          ret[key] = forceLowerCaseIfNeeded(SL.replace(value, elm, evt, escapeHtml))
        }
      }
    }
    return ret
  }

  function preprocessArray(args, forceLowerCase){
    var ret = []
    for (var i = 0, len = args.length; i < len; i++){
      var value = args[i]
      if (SL.isString(value)){
        value = forceLowerCaseIfNeeded(SL.replace(value, elm, evt))
      }else if (value && value.constructor === Object){
        value = preprocessObject(value)
      }
      ret.push(value)
    }
    return ret
  }

}

// Execute a command.
SL.execute = function(trig, elm, evt, tools){
  if (_satellite.settings.hideActivity) return
  tools = tools || SL.tools

  function doit(toolName){
    var tool = tools[toolName || 'default']
    if (!tool)
      return
    try{
      tool.triggerCommand(trig, elm, evt)
    }catch(e){
      SL.logError(e)
    }
  }
  if (trig.engine){
    var engine = trig.engine
    for (var toolName in tools){
      if (tools.hasOwnProperty(toolName)) {
        var tool = tools[toolName]
        if (tool.settings && tool.settings.engine === engine)
          doit(toolName)
      }
    }
  }else if (trig.tool instanceof Array)
    SL.each(trig.tool, function(toolName){
      doit(toolName)
    })
  else
    doit(trig.tool)
}

// Wrapper object that handles Satellite internal logging.
//
// It saves all messages for future reference (up to `keepLimit`, default 100) and
// outputs to browser's console if `_satellite.settings.notifications` is `true`.
// -----------------------------------------------------
SL.Logger = {
  outputEnabled: false,

  messages: [],
  keepLimit: 100,
  flushed: false,

  // @fixme: remove first 2 items when legacy code is updated
  LEVELS: [null, null, 'log', 'info', 'warn', 'error'],

  // `lvl` should be the index of a level defined in `LEVELS`
  message: function(msg, lvl) {
    var level = this.LEVELS[lvl] || 'log';

    this.messages.push([level, msg]);
    if (this.messages.length > this.keepLimit) {
      this.messages.shift();
    }

    if (this.outputEnabled) {
      this.echo(level, msg)
    }
  },

  getHistory: function() {
    return this.messages;
  },

  clearHistory: function() {
    this.messages = [];
  },

  setOutputState: function(state) {
    if (this.outputEnabled == state) return;

    this.outputEnabled = state;
    if (state) {
      this.flush();
    } else {
      this.flushed = false;
    }
  },

  // Private
  // ----------------------------------------
  echo: function(func, msg) {
    if (!window.console) return;
    window.console[func]("SATELLITE: " + msg);
  },

  flush: function() {
    if (this.flushed) return;

    SL.each(this.messages, function(item) {
      if (item[2] === true) return; // message already flushed
      this.echo(item[0], item[1]);
      item[2] = true;
    }, this);
    this.flushed = true;
  }
};

// `notify(msg, pty)`
// ------------------
//
// Notify the user of things happening in Satellite using `console.log`
//
// - msg - message to print
// - pty - priority
SL.notify = SL.bind(SL.Logger.message, SL.Logger);

// `cleanText(str)`
// ================
//
// "Cleans" the text from an element's innerText. This is used directly by the
// @cleanText special property.
SL.cleanText = function(str){
  if (str == null) return null
  return SL.trim(str).replace(/\s+/g, ' ')
}

SL.cleanText.legacy = function(str){
  if (str == null) return null
  return SL.trim(str).replace(/\s{2,}/g, ' ')
    .replace(/[^\000-\177]*/g, '')
}

SL.text = function(obj){
  return obj.textContent || obj.innerText
}

// Special Properties for DOM elements. You use special properties using
// the @ prefix. Example:
//
//     this.@text
SL.specialProperties = {
  text: SL.text,
  cleanText: function(obj){
    return SL.cleanText(SL.text(obj))
  }
}

// `getObjectProperty(obj, property)`
// ============================
//
// Get property(potentially nested) from an object.
SL.getObjectProperty = function(obj, property, supportSpecial){
  var propChain = property.split('.')
  var currValue = obj
  var special = SL.specialProperties
  var attrMatch
  for (var i = 0, len = propChain.length; i < len; i++){
    if (currValue == null) return undefined
    var prop = propChain[i]
    if (supportSpecial && prop.charAt(0) === '@'){
      var specialProp = prop.slice(1)
      currValue = special[specialProp](currValue)
      continue
    }
    if (currValue.getAttribute &&
      (attrMatch = prop.match(/^getAttribute\((.+)\)$/))){
      var attr = attrMatch[1]
      currValue = currValue.getAttribute(attr)
      continue
    }
    currValue = currValue[prop]
  }
  return currValue
}

// `getToolsByType(type)`
// ------------------------------------------------
//
// Returns an array containing all the tools whose engine property match
// the provided type.
//
// - `type` - The searched tool type
SL.getToolsByType = function(type){
  if (!type) {
    throw new Error('Tool type is missing')
  }

  var result = []
  for (var t in SL.tools) {
    if (SL.tools.hasOwnProperty(t)) {
      var tool = SL.tools[t]
      if (tool.settings && tool.settings.engine === type) {
        result.push(tool)
      }
    }
  }

  return result
}

// `setVar(name, value)` or `setVar(mapping)`
// ==========================================
//
// Set a customer variable. Can be either called like this
//
//     _satellite.setVar('name', 'value')
//
// Or by passing in a mapping(object literall) which allows setting multiple variables at
// the same time.
//
//     _satellite.setVar({name: 'value', foo: 'bar'})
SL.setVar = function(){
  var customVars = SL.data.customVars
  if(customVars == null) SL.data.customVars = {}, customVars = SL.data.customVars
  if (typeof arguments[0] === 'string'){
    var prop = arguments[0]
    customVars[prop] = arguments[1]
  }else if (arguments[0]){ // assume an object literal
    var mapping = arguments[0]
    for (var key in mapping)
      if (mapping.hasOwnProperty(key))
        customVars[key] = mapping[key]
  }
}

SL.dataElementSafe = function(key, length){
  if (arguments.length > 2){
    // setter
    var value = arguments[2]
    if (length === 'pageview'){
      SL.dataElementSafe.pageviewCache[key] = value
    }else if (length === 'session'){
      SL.setCookie('_sdsat_' + key, value)
    }else if (length === 'visitor') {
      SL.setCookie('_sdsat_' + key, value, 365 * 2)
    }
  }else{
    // getter
    if (length === 'pageview'){
      return SL.dataElementSafe.pageviewCache[key]
    }else if (length === 'session' || length === 'visitor'){
      return SL.readCookie('_sdsat_' + key)
    }
  }
}
SL.dataElementSafe.pageviewCache = {}

SL.realGetDataElement = function(dataDef){
  var ret
  if (dataDef.selector) {
    if (SL.hasSelector) {
      SL.cssQuery(dataDef.selector, function(elms) {
        if (elms.length > 0) {
          var elm = elms[0]
          if (dataDef.property === 'text') {
            ret = elm.innerText || elm.textContent
          }else if (dataDef.property in elm){
            ret = elm[dataDef.property]
          }else if (SL.hasAttr(elm, dataDef.property)){
            ret = elm.getAttribute(dataDef.property)
          }
        }
      })
    }
  }else if (dataDef.queryParam) {
    if (dataDef.ignoreCase){
      ret = SL.getQueryParamCaseInsensitive(dataDef.queryParam)
    }else{
      ret = SL.getQueryParam(dataDef.queryParam)
    }
  }else if (dataDef.cookie) {
    ret = SL.readCookie(dataDef.cookie)
  }else if (dataDef.jsVariable) {
    ret = SL.getObjectProperty(window, dataDef.jsVariable)
  }else if (dataDef.customJS) {
    ret = dataDef.customJS()
  }else if (dataDef.contextHub) {
    ret = dataDef.contextHub()
  }
  if (SL.isString(ret) && dataDef.cleanText){
    ret = SL.cleanText(ret)
  }
  return ret
}

SL.getDataElement = function(variable, suppressDefault, dataDef) {
  dataDef = dataDef || SL.dataElements[variable]
  if (dataDef == null) {
    return SL.settings.undefinedVarsReturnEmpty ? '' : null; 
  }
  var ret = SL.realGetDataElement(dataDef)
  if (ret === undefined && dataDef.storeLength) {
    ret = SL.dataElementSafe(variable, dataDef.storeLength)
  }else if (ret !== undefined && dataDef.storeLength) {
    SL.dataElementSafe(variable, dataDef.storeLength, ret)
  }
  if (!ret && !suppressDefault) {
    ret = dataDef['default'] || ''
  }
  if (SL.isString(ret) && dataDef.forceLowerCase) {
    ret = ret.toLowerCase()
  }
  return ret
}

// getVar(variable, elm, evt)
// ==========================
//
// Return the value of a variable, where the variable
// can be a data element, defined in the "data" section
// of the initial settings, or reference properties on
// an element, event, or target of the event in question,
// a query parameter, or a random number.
//
// - `variable` - the name of the variable to get
// - `[elm]` - the associated element, if any
// - `[evt]` - the associated event, if any
SL.getVar = function(variable, elm, evt){
  var custVars = SL.data.customVars
    , target = evt ? (evt.target || evt.srcElement) : null
    , randMatch
    , value
  var map = {
    uri: SL.URI(),
    protocol: document.location.protocol,
    hostname: document.location.hostname
  }
  if (SL.dataElements && variable in SL.dataElements){
    return SL.getDataElement(variable)
  }
  value = map[variable.toLowerCase()]
  if (value === undefined){
    if (variable.substring(0, 5) === 'this.'){
      variable = variable.slice(5)
      value = SL.getObjectProperty(elm, variable, true)
    }else if(variable.substring(0, 6) === 'event.'){
      variable = variable.slice(6)
      value = SL.getObjectProperty(evt, variable)
    }else if(variable.substring(0, 7) === 'target.'){
      variable = variable.slice(7)
      value = SL.getObjectProperty(target, variable)
    }else if(variable.substring(0, 7) === 'window.'){
      variable = variable.slice(7)
      value = SL.getObjectProperty(window, variable)
    }else if (variable.substring(0, 6) === 'param.'){
      variable = variable.slice(6)
      value = SL.getQueryParam(variable)
    }else if(randMatch = variable.match(/^rand([0-9]+)$/)){
      var len = Number(randMatch[1])
        , s = (Math.random() * (Math.pow(10, len) - 1)).toFixed(0)
      value = Array(len - s.length + 1).join('0') + s
    }else{
      value = SL.getObjectProperty(custVars, variable)
    }
  }
  return value
}

SL.getVars = function(variables, elm, evt){
  var ret = {}
  SL.each(variables, function(variable){
    ret[variable] = SL.getVar(variable, elm, evt)
  })
  return ret
}

// `replace(str, [elm], [target])`
// ---------------------
//
// Perform variable subtitutions substitute to a string where subtitions are
// specified in the form `"%foo%"`. Variables are lookup either in `SL.data.customVars`, or
// if the `elm` parameter is passed it, and the variable spec is of the form `"%this.tagName%"`, it
// is subsituted with the properties on `elm`, *i.e. `elm.tagName`.
//
// Parameters:
//
// - `str` - string to apply substitutions to
// - `elm`(optional) - object or element to use for substitutions of the form `%this.property%`
// - `target`(optional) - element to use for subsitution of the form `%target.property%`
// - `escapeHtml` (optional) - whether or not to escape substitutions for embedding in HTML
SL.replace = function(str, elm, evt, escapeHtml) {
  if (typeof str !== 'string') return str
  return str
    .replace(/%(.*?)%/g, function(m, variable){
      var val = SL.getVar(variable, elm, evt)
      if (val == null) {
        return SL.settings.undefinedVarsReturnEmpty ? '' : m; 
      } else {
        if (escapeHtml) {
          return SL.escapeForHtml(val);
        } else {
          return val;
        }
      }
    });
}

SL.escapeHtmlParams = function(fn){
  fn.escapeHtml = true
  return fn
}

// From a object literal of variable, generate a query string.
SL.searchVariables = function(vars, elm, evt){
  if (!vars || vars.length === 0) return ''
  var qsParts = []
  for (var i = 0, len = vars.length; i < len; i++){
    var varr = vars[i]
      , value = SL.getVar(varr, elm, evt)
       qsParts.push(varr + '=' + escape(value))
  }
  return '?' + qsParts.join('&')
}

// Fire all the trigger actions associated with a rule.
SL.fireRule = function(rule, elm, evt){
  var triggers = rule.trigger
  if (!triggers) return
  for (var i = 0, len = triggers.length; i < len; i++){
    var trig = triggers[i]
    SL.execute(trig, elm, evt)
  }
  if (SL.contains(SL.fireOnceEvents, rule.event))
    rule.expired = true
}

// `isLinked(elm)`
// ---------------
//
// Returns whether the element is either an anchor or a descendant of an anchor or contains an anchor.
//
// `elm` - the element to test
SL.isLinked = function(elm){
  for (var cur = elm; cur; cur = cur.parentNode) {
    if (SL.isLinkTag(cur))
      return true
  }
  return false
}

// Fire a page load event. `type` is one of `pagetop`, `pagebottom`, `domready` and
// `windowload`.
SL.firePageLoadEvent = function(type) {
  var location = document.location
  var evt = {type: type, target: location}
  var rules = SL.pageLoadRules
  var handlers = SL.evtHandlers[evt.type];
  for (var i = rules.length; i--;){
    var rule = rules[i]
    if (SL.ruleMatches(rule, evt, location)){
      SL.notify('Rule "' + rule.name + '" fired.', 1)
      SL.fireRule(rule, location, evt)
    }
  }
  for (var id in SL.tools){
    if (SL.tools.hasOwnProperty(id)) {
      var tool = SL.tools[id]
      if (tool.endPLPhase) {
        tool.endPLPhase(type)
      }
    }
  }
  if (handlers){
    SL.each(handlers, function(cb){
      cb(evt)
    })
  }
}

// `track(id)`
// -----------
//
// Directly fire a direct call rule by id.
SL.track = function(ruleName) {
  // trim extra spaces that may exist at beginning or end of string
  ruleName = ruleName.replace(/^\s*/,"").replace(/\s*$/,"")
  for (var i = 0; i < SL.directCallRules.length; i++){
    var rule = SL.directCallRules[i]
    if (rule.name === ruleName){
      SL.notify('Direct call Rule "' + ruleName + '" fired.', 1)
      SL.fireRule(rule, location, {type: ruleName})
      return
    }
  }
  SL.notify('Direct call Rule "' + ruleName + '" not found.', 1)
}

// `basePath()`
// ------------
//
// Returns the base path of all Satellite generated assets.
SL.basePath = function(){
  if (SL.data.host)
    return (document.location.protocol === 'https:' ?
    'https://' + SL.data.host.https :
    'http://' + SL.data.host.http) + '/'
  else
    return this.settings.basePath
}

// `setLocation(url)`
// ------------------
//
// Set the current URL
//
// - `url` - the URL to set to
SL.setLocation = function(url){
  window.location = url
}

SL.parseQueryParams = function(str){
  var URIDecode = function (str) {
    var result = str
    try {
      result = decodeURIComponent(str)
    } catch(err) {}

    return result
  }

  if (str === '' || SL.isString(str) === false) return {}
  if (str.indexOf('?') === 0) {
    str = str.substring(1)
  }
  var ret = {}
    , pairs = str.split('&')
  SL.each(pairs, function(pair){
    pair = pair.split('=')
    if (!pair[1]) {
      return
    }
    ret[URIDecode(pair[0])] = URIDecode(pair[1])
  })
  return ret
}

SL.getCaseSensitivityQueryParamsMap = function (str) {
  var normal = SL.parseQueryParams(str)
  var insensitive = {}

  for (var prop in normal)
    if (normal.hasOwnProperty(prop))
      insensitive[prop.toLowerCase()] = normal[prop]

  return {
    normal: normal,
    caseInsensitive: insensitive
  }
}

SL.updateQueryParams = function(){
  SL.QueryParams = SL.getCaseSensitivityQueryParamsMap(window.location.search)
}
SL.updateQueryParams()

SL.getQueryParam = function(key){
  return SL.QueryParams.normal[key]
}

SL.getQueryParamCaseInsensitive = function(key){
  return SL.QueryParams.caseInsensitive[key.toLowerCase()]
}

SL.encodeObjectToURI = function(obj) {
  if (SL.isObject(obj) === false) {
    return ''
  }

  var uri = []
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      uri.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    }
  }

  return uri.join('&')
}

SL.readCookie = function(name) {
  var nameEQ = name + "="
  var parts = document.cookie.split(';')
  for(var i=0;i < parts.length;i++) {
    var c = parts[i]
    while (c.charAt(0)==' '){
      c = c.substring(1,c.length)
    }
    if (c.indexOf(nameEQ) === 0){
      return c.substring(nameEQ.length,c.length)
    }
  }
  return undefined
}

SL.setCookie = function(name,value,days) {
  var expires
  if (days) {
    var date = new Date()
    date.setTime(date.getTime()+(days*24*60*60*1000))
    expires = "; expires="+date.toGMTString()
  }
  else{
    expires = ""
  }
  document.cookie = name+"="+value+expires+"; path=/"
}

SL.removeCookie = function(name) {
  SL.setCookie(name,"",-1);
}


SL.getElementProperty = function(elm, prop){
  if (prop.charAt(0) === '@'){
    var special = SL.specialProperties[prop.substring(1)]
    if (special){
      return special(elm)
    }
  }
  if (prop === 'innerText'){
    return SL.text(elm)
  }
  if (prop in elm)
    return elm[prop]
  return elm.getAttribute ? elm.getAttribute(prop) : undefined
}

SL.propertiesMatch = function(property, elm){
  if (property){
    for (var prop in property){
      if (property.hasOwnProperty(prop)) {
        var target = property[prop]
        var value = SL.getElementProperty(elm, prop)
        if (typeof target === 'string' && target !== value) return false
        if (target instanceof RegExp && !target.test(value)) return false
      }
    }
  }
  return true
}

// from http://www.quirksmode.org/js/events_properties.html
SL.isRightClick = function(e){
  var ret
  if (e.which){
    ret = e.which == 3
  }else if (e.button){
    ret = e.button == 2
  }
  return ret
}

// `ruleMatches(rule, evt, elm, eventEntriesFound)`
// ------------------------------------------------
//
// - `rule` - the rules to match
// - `evt` - the event triggered
// - `elm` - the element the event was on
// - `eventEntriesFound` - number of rules matched so far
SL.ruleMatches = function(rule, evt, elm, eventEntriesFound){
  var cnd = rule.condition
  var cnds = rule.conditions
  var property = rule.property
  var eventType = evt.type
  var matchValue = rule.value
  var target = evt.target || evt.srcElement
  var initialTarget = elm === target

  if (rule.event !== eventType && (rule.event !== 'custom' || rule.customEvent !== eventType)) return false
  if (!SL.ruleInScope(rule)) return false
  // ignore all right-clicks
  if (rule.event === 'click' && SL.isRightClick(evt)){
    return false
  }
  if (rule.isDefault && eventEntriesFound > 0)
    return false
  if (rule.expired) return false
  if (eventType === 'inview' && evt.inviewDelay !== rule.inviewDelay){
    return false
  }
  if (!(initialTarget ||
          ((rule.bubbleFireIfParent !== false) && (eventEntriesFound === 0 || (rule.bubbleFireIfChildFired !== false))))) return false

  if (rule.selector && !SL.matchesCss(rule.selector, elm)) return false
  if (!SL.propertiesMatch(property, elm)) return false
  if (matchValue != null){
    if (typeof matchValue === 'string'){
      if (matchValue !== elm.value)
        return false
    }else if (!matchValue.test(elm.value))
      return false
  }
  if (cnd){
    try{
      if (!cnd.call(elm, evt, target)){
        SL.notify('Condition for rule "' + rule.name + '" not met.', 1)
        return false
      }
    }catch(e){
      SL.notify('Condition for rule "' + rule.name + '" not met. Error: ' + e.message, 1)
      return false
    }
  }
  if (cnds){
    var failed = SL.find(cnds, function(cnd){
      try{
        return !cnd.call(elm, evt, target)
      }catch(e){
        SL.notify('Condition for rule "' + rule.name + '" not met. Error: ' + e.message, 1)
        return true
      }
    })
    if (failed){
      SL.notify('Condition ' + failed.toString() + ' for rule "' + rule.name + '" not met.', 1)
      return false
    }
  }
  return true
}


SL.evtHandlers = {}
// `bindEvent(evtName, callback)`
// ------------------------------
//
// Register for an event by name. Alias: `whenEvent`.
//
// `evtName` - the name of the event
// `callback` - the function to be called when even fires
SL.bindEvent = function(evtName, callback){
  var handlers = SL.evtHandlers
  if (!handlers[evtName])
    handlers[evtName] = []
  handlers[evtName].push(callback)
}
SL.whenEvent = SL.bindEvent

// `unbindEvent(evtName, callback)
// -------------------------------
//
// Unregister for an event by name.
//
// `evtName` - the name of the event
// `callback` - the function to unregister
SL.unbindEvent = function(evtName, callback){
  var handlers = SL.evtHandlers
  if (!handlers[evtName]) return
  var idx = SL.indexOf(handlers[evtName], callback)
  handlers[evtName].splice(idx, 1)
}

SL.bindEventOnce = function(evtName, callback){
  var wrapped = function(){
    SL.unbindEvent(evtName, wrapped)
    callback.apply(null, arguments)
  }
  SL.bindEvent(evtName, wrapped)
}

// See <http://tobyho.com/2014/02/26/attribute-only-valid-on-v-image/>
SL.isVMLPoisoned = function(elm){
  if (!elm) return false
  try{
    elm.nodeName
  }catch(e){
    if (e.message === 'Attribute only valid on v:image'){
      return true
    }
  }
  return false
}

SL.handleEvent = function(evt) {
  // Don't process an event twice.
  if (SL.$data(evt, 'eventProcessed')) return

  var eventType = evt.type.toLowerCase()
    , target = evt.target || evt.srcElement
    , rulesMatched = 0
    , rules = SL.rules
    , tools = SL.tools
    , handlers = SL.evtHandlers[evt.type]

  if (SL.isVMLPoisoned(target)){
    SL.notify('detected ' + eventType + ' on poisoned VML element, skipping.', 1)
    return
  }

  if (handlers){
    SL.each(handlers, function(cb){
      cb(evt)
    })
  }

  var nodeName = target && target.nodeName;
  if (nodeName)
    SL.notify("detected " + eventType + " on " + target.nodeName, 1)
  else
    SL.notify("detected " + eventType, 1)

  for (var curr = target; curr; curr = curr.parentNode) {
    var bubbleStop = false
    SL.each(rules, function(rule){
      if (SL.ruleMatches(rule, evt, curr, rulesMatched)){
        SL.notify('Rule "' + rule.name + '" fired.', 1)
        SL.fireRule(rule, curr, evt)
        rulesMatched++
        if (rule.bubbleStop)
          bubbleStop = true
      }
    })
    if (bubbleStop) break
  }


  SL.$data(evt, 'eventProcessed', true)
}

// `onEvent(evt)`
// ------------
//
// Handle an event, whether it is a DOM event or a synthetic event.
//
// - `evt` - the event triggered
SL.onEvent = document.querySelectorAll ?
function(evt){ SL.handleEvent(evt) } :
(function(){
  var q = []
  var onEvent = function(evt) {
    if (evt.selector)
      q.push(evt)
    else
      SL.handleEvent(evt)
  }
  onEvent.pendingEvents = q
  return onEvent
})()

// `fireEvent(eventType, eventTarget)`
// ------------
//
// Conviniently programmatically fire an event.
//
// - `eventType` - the type of event
// - `eventTarget` - the target object that fired the event
SL.fireEvent = function(type, target){
  SL.onEvent({type: type, target: target})
}

// `registerEvents(elm, events)`
// -----------------------------
//
// Register events for an element using `track` as the callback
//
// - `elm` - the element to listen for events on
// - `events` - an array of event types (strings)
SL.registerEvents = function(elm, events){
  for (var i = events.length - 1; i >= 0; i--){
    var event = events[i]
    if (!SL.$data(elm, event + '.tracked')){
      SL.addEventHandler(elm, event, SL.onEvent)
      SL.$data(elm, event + '.tracked', true)
    }
  }
}

// `registerEventsForTags(tags, events)`
// -------------------------------------
//
// Register events for all element that have the specified tags
//
// - `tags` - an array of tags to match for (strings)
// - `events` - an array of event types (strings)
SL.registerEventsForTags = function(tags, events){
  for (var i = tags.length - 1; i >= 0; i--){
    var tag = tags[i]
    var elms = document.getElementsByTagName(tag);
    for (var j = elms.length - 1; j >= 0; j--)
      SL.registerEvents(elms[j], events)
  }
}

// `setListeners()`
// ----------------
//
// Set events for `document`
SL.setListeners = function() {
  var events = ['click', 'submit'];

  SL.each(SL.rules, function(rule) {
    if (rule.event === 'custom' &&
        rule.hasOwnProperty('customEvent') &&
        !SL.contains(events, rule.customEvent)) {
      events.push(rule.customEvent);
    }
  });

  SL.registerEvents(document, events);
};

// `getUniqueRuleEvents()`
// -----------------------
//
// Returns an array of unique event types for which event-based rules
// have been configured.
SL.getUniqueRuleEvents = function() {
  if (!SL._uniqueRuleEvents) {
    SL._uniqueRuleEvents = [];
    SL.each(SL.rules, function(rule) {
      if (SL.indexOf(SL._uniqueRuleEvents, rule.event) === -1) {
        SL._uniqueRuleEvents.push(rule.event);
      }
    });
  }

  return SL._uniqueRuleEvents;
};

// `setFormListeners()`
// --------------------
//
// Listen for events on form elements. Listeners for these events are added directly to form
// elements since they don't bubble (though some do in modern browsers).
SL.setFormListeners = function() {
  if (!SL._relevantFormEvents) {
    var formEvents = [
      "change",
      "focus",
      "blur",
      // Why do we add event listeners directly to form elements for the keypress event? The
      // keypress event bubbles so we could add it directly to document. Note that keypress
      // events can be triggered when any element has focus which means that by adding the event
      // listener directly to form elements we're filtering any keypress events from other elements.
      // Is this the intention? If so, we could still add a single listener directly to document
      // and filter on event.target.nodeName.
      "keypress"
    ];

    SL._relevantFormEvents = SL.filter(SL.getUniqueRuleEvents(), function(event) {
      return SL.indexOf(formEvents, event) !== -1;
    });
  }

  if (SL._relevantFormEvents.length) {
    SL.registerEventsForTags(['input', 'select', 'textarea', 'button'], SL._relevantFormEvents);
  }
};

// `setVideoListeners()`
// ---------------------
//
// Listen for events on video elements. Listeners for these events are added directly to form
// elements since they don't bubble.
SL.setVideoListeners = function() {
  if (!SL._relevantVideoEvents) {
    var videoEvents = [
      "play",
      "pause",
      "ended",
      "volumechange",
      "stalled",
      "loadeddata"
    ];

    SL._relevantVideoEvents = SL.filter(SL.getUniqueRuleEvents(), function(event) {
      return SL.indexOf(videoEvents, event) !== -1;
    });
  }

  if (SL._relevantVideoEvents.length) {
    SL.registerEventsForTags(['video'], SL._relevantVideoEvents);
  }
};

// `readStoredSetting(name)`
// ==================
//
// Reads the cookie of the given name.
// Stolen from <http://www.quirksmode.org/js/cookies.html>
SL.readStoredSetting = function(name) {
  // When local storage is disabled on Safari, the mere act of referencing window.localStorage
  // throws an error. For this reason, referencing window.localStorage without being inside
  // a try-catch should be avoided.
  try{
    name = 'sdsat_' + name
    return window.localStorage.getItem(name)
  }catch(e){
    SL.notify('Cannot read stored setting from localStorage: ' + e.message, 2)
    return null
  }
}

// Read satelliteUtilsCookie values to see about getting bookmarklet running / settings
SL.loadStoredSettings = function () {
  var debug = SL.readStoredSetting('debug')
    , hideActivity = SL.readStoredSetting('hide_activity')
  if (debug)
    SL.settings.notifications = debug === 'true'
  if (hideActivity)
    SL.settings.hideActivity = hideActivity === 'true'
}

SL.isRuleActive = function(rule, date){
  var schd = rule.schedule
  if (!schd) return true

  var utc = schd.utc
    , getDate = utc ? 'getUTCDate' : 'getDate'
    , getDay = utc ? 'getUTCDay' : 'getDay'
    , getFullYear = utc ? 'getUTCFullYear' : 'getFullYear'
    , getMonth = utc ? 'getUTCMonth' : 'getMonth'
    , getHours = utc ? 'getUTCHours' : 'getHours'
    , getMinutes = utc ? 'getUTCMinutes' : 'getMinutes'
    , setHours = utc ? 'setUTCHours' : 'setHours'
    , setMinutes = utc ? 'setUTCMinutes' : 'setMinutes'
    , setDate = utc ? 'setUTCDate' : 'setDate'

  date = date || new Date()

  function dayDiff(one, other){
    other = modifyDate(other, {
      hour: one[getHours](),
      minute: one[getMinutes]()
    })
    return Math.floor(Math.abs((one.getTime() - other.getTime()) / (1000 * 60 * 60 * 24)))
  }
  function monthDiff(one, other){
    function months(date){
      return date[getFullYear]() * 12 + date[getMonth]()
    }
    return Math.abs(months(one) - months(other))
  }
  function modifyDate(date, fields){
    var retval = new Date(date.getTime())
    for (var field in fields){
      if (fields.hasOwnProperty(field)) {
        var val = fields[field]
        switch(field){
          case 'hour':
            retval[setHours](val)
            break
          case 'minute':
            retval[setMinutes](val)
            break
          case 'date':
            retval[setDate](val)
            break
        }
      }
    }
    return retval
  }
  function timeGreaterThan(one, other){
    var h1 = one[getHours]()
      , m1 = one[getMinutes]()
      , h2 = other[getHours]()
      , m2 = other[getMinutes]()
    return (h1 * 60 + m1) > (h2 * 60 + m2)
  }
  function timeLessThan(one, other){
    var h1 = one[getHours]()
      , m1 = one[getMinutes]()
      , h2 = other[getHours]()
      , m2 = other[getMinutes]()
    return (h1 * 60 + m1) < (h2 * 60 + m2)
  }


  if (schd.repeat){
    if (timeGreaterThan(schd.start, date)) return false
    if (timeLessThan(schd.end, date)) return false
    if (date < schd.start) return false
    if (schd.endRepeat && date >= schd.endRepeat) return false
    if (schd.repeat === 'daily'){
      if (schd.repeatEvery){
        var dd = dayDiff(schd.start, date)
        if (dd % schd.repeatEvery !== 0) return false
      }
    }else if (schd.repeat === 'weekly'){
      if (schd.days){
        if (!SL.contains(schd.days, date[getDay]())) return false
      }else
        if (schd.start[getDay]() !== date[getDay]()) return false
      if (schd.repeatEvery){
        var diff = dayDiff(schd.start, date)
        if (diff % (7 * schd.repeatEvery) !== 0)
          return false
      }
    }else if (schd.repeat === 'monthly'){
      if (schd.repeatEvery){
        var md = monthDiff(schd.start, date)
        if (md % schd.repeatEvery !== 0) return false
      }
      if (schd.nthWeek && schd.mthDay){
        if (schd.mthDay !== date[getDay]()) return false
        var nthWeek = Math.floor((date[getDate]() - date[getDay]() + 1) / 7)
        if (schd.nthWeek !== nthWeek) return false
      }else
        if (schd.start[getDate]() !== date[getDate]()) return false
    }else if (schd.repeat === 'yearly'){
      if (schd.start[getMonth]() !== date[getMonth]()) return false
      if (schd.start[getDate]() !== date[getDate]()) return false
      if (schd.repeatEvery){
        var diff = Math.abs(schd.start[getFullYear]() - date[getFullYear]())
        if (diff % schd.repeatEvery !== 0) return false
      }
    }
  }else{
    if (schd.start > date) return false
    if (schd.end < date) return false
  }
  return true
}

SL.isOutboundLink = function(elm){
  if (!elm.getAttribute('href')) return false
  var hostname = elm.hostname
  var href = elm.href
  var protocol = elm.protocol
  if (protocol !== 'http:' && protocol !== 'https:') return false
  var isMyDomain = SL.any(SL.settings.domainList, function(domain){
    return SL.isSubdomainOf(hostname, domain)
  })
  if (isMyDomain) return false
  return hostname !== location.hostname
}

SL.isLinkerLink = function(elm){
  if (!elm.getAttribute || !elm.getAttribute('href')) return false
  return SL.hasMultipleDomains() &&
    elm.hostname != location.hostname &&
    !elm.href.match(/^javascript/i) &&
    !SL.isOutboundLink(elm)
}

SL.isSubdomainOf = function(sub, root){
  if (sub === root) return true
  var idx = sub.length - root.length
  if (idx > 0)
    return SL.equalsIgnoreCase(sub.substring(idx), root)
  return false
}

// `getVisitorId()`
// ------------------------------------------------
//
// Returns the library instance associated to a VisitorId tool if the tool exists
//
SL.getVisitorId = function(){
  var visitorIdTools = SL.getToolsByType('visitor_id')
  if (visitorIdTools.length === 0) {
    return null;
  }

  return visitorIdTools[0].getInstance()
}

SL.URI = function(){
  var ret = document.location.pathname + document.location.search
  if (SL.settings.forceLowerCase){
    ret = ret.toLowerCase()
  }
  return ret
}

SL.URL = function(){
  var ret = document.location.href
  if (SL.settings.forceLowerCase){
    ret = ret.toLowerCase()
  }
  return ret
}

// Filter `SL.rules` down to only the once relevant for the current page.
SL.filterRules = function(){
  function matches(rule){
    if (!SL.isRuleActive(rule)) return false
    return true
  }

  SL.rules = SL.filter(SL.rules, matches)
  SL.pageLoadRules = SL.filter(SL.pageLoadRules, matches)

}

SL.ruleInScope = function(rule, location){
  location = location || document.location
  var scope = rule.scope
  if (!scope) return true
  var URI = scope.URI
  var subdomains = scope.subdomains
  var domains = scope.domains
  var protocols = scope.protocols
  var hashes = scope.hashes

  if (URI && includeExcludeFails(URI, location.pathname + location.search)) return false
  if (subdomains && includeExcludeFails(subdomains, location.hostname)) return false
  if (domains && matchFails(domains, location.hostname)) return false
  if (protocols && matchFails(protocols, location.protocol)) return false
  if (hashes && includeExcludeFails(hashes, location.hash)) return false

  function includeExcludeFails(matcher, matchee){
    var include = matcher.include
    var exclude = matcher.exclude
    if (include && matchFails(include, matchee)) return true
    if (exclude){
      if (SL.isString(exclude) && exclude === matchee)
        return true
      if (SL.isArray(exclude) && SL.any(exclude, matches))
        return true
      if (SL.isRegex(exclude) && matches(exclude))
        return true
    }

    return false

    function matches(regex){
      return matchee.match(regex)
    }
  }

  function matchFails(matcher, matchee){
    if (SL.isString(matcher) && matcher !== matchee)
      return true
    if (SL.isArray(matcher) && !SL.any(matcher, matches))
      return true
    if (SL.isRegex(matcher) && !matches(matcher))
      return true
    return false

    function matches(regex){
      return matchee.match(regex)
    }

  }

  return true
}


// Run background tasks once. This will get invoked periodically.
SL.backgroundTasks = function(){
  var start = +new Date()
  SL.setFormListeners()
  SL.setVideoListeners()
  SL.loadStoredSettings()
  SL.registerNewElementsForDynamicRules()
  SL.eventEmitterBackgroundTasks()

  // Trigger condition events
  //SL.onEvent({type: 'condition', target: 'document'})
  var end = +new Date()
  // We want to keep an eye on the execution time here.
  // If it gets to around 50ms for any customer site,
  // we want to either optimize or start using a task queue
  //SL.notify('Background tasks executed in ' + (end - start) + 'ms', 3)
}



// For rules that poll for dynamically injected elements on the page,
// find them and register events for them.
SL.registerNewElementsForDynamicRules = function(){
  function cssQuery(selector, callback){
    var hit = cssQuery.cache[selector]
    if (hit){
      return callback(hit)
    }else{
      SL.cssQuery(selector, function(elms){
        cssQuery.cache[selector] = elms
        callback(elms)
      })
    }
  }
  cssQuery.cache = {}


  SL.each(SL.dynamicRules, function(rule){
    cssQuery(rule.selector, function(elms){
      SL.each(elms, function(elm){
        var event = rule.event === 'custom' ? rule.customEvent : rule.event;
        if (SL.$data(elm, 'dynamicRules.seen.' + event)) return
        SL.$data(elm, 'dynamicRules.seen.' + event, true)
        if (SL.propertiesMatch(rule.property, elm)){
          SL.registerEvents(elm, [event])
        }
      })
    })
  })
}

// If the browser doesn't support CSS selector queries, we have to include one.
SL.ensureCSSSelector = function(){
  if (document.querySelectorAll){
    SL.hasSelector = true
    return
  }
  SL.loadingSizzle = true
  SL.sizzleQueue = []
  SL.loadScript(SL.basePath() + 'selector.js', function(){
    if (!SL.Sizzle){
      SL.logError(new Error('Failed to load selector.js'))
      return
    }
    var pending = SL.onEvent.pendingEvents
    SL.each(pending, function(evt){
      SL.handleEvent(evt)
    }, this)
    SL.onEvent = SL.handleEvent
    SL.hasSelector = true
    ;delete SL.loadingSizzle
    SL.each(SL.sizzleQueue, function(item){
      SL.cssQuery(item[0], item[1])
    })
    ;delete SL.sizzleQueue

  })
}

// Error Handling

SL.errors = []
SL.logError = function(err){
  SL.errors.push(err)
  SL.notify(err.name + ' - ' + err.message, 5)
}

// `pageBottom()`
// --------------
//
// The function is to be called by the web page using an script tag like so:
//
//     <script>_satellite.pageBottom()</script>
//
// just before the `</body>` tag.
SL.pageBottom = function(){
  if (!SL.initialized) return
  SL.pageBottomFired = true
  SL.firePageLoadEvent('pagebottom')
}

// This allows Rover to configure the browser to use the staging library instead.
SL.stagingLibraryOverride = function(){
  /*jshint evil:true */
  var libraryOverride = SL.readStoredSetting('stagingLibrary') === 'true'
  if (libraryOverride){ // allow Rover to override the library to staging
    var scripts = document.getElementsByTagName('script')
      , regex = /^(.*)satelliteLib-([a-f0-9]{40})\.js$/
      , regexStaging = /^(.*)satelliteLib-([a-f0-9]{40})-staging\.js$/
      , match
      , matchStaging
      , src
    for (var i = 0, len = scripts.length; i < len; i++){
      src = scripts[i].getAttribute('src')
      if (!src) continue
      if (!match) match = src.match(regex)
      if (!matchStaging) matchStaging = src.match(regexStaging)
      if (matchStaging) break
    }
    if (match && !matchStaging){
      var stagingURL = match[1] + 'satelliteLib-' + match[2] + '-staging.js'
      if (document.write) {
        document.write('<script src="' + stagingURL + '"></script>')
      } else {
        var s = document.createElement('script')
        s.src = stagingURL
        document.head.appendChild(s)
      }
      return true
    }
  }
  return false
}

SL.checkAsyncInclude = function(){
  if (window.satellite_asyncLoad)
    SL.notify('You may be using the async installation of Satellite. In-page HTML and the "pagebottom" event will not work. Please update your Satellite installation for these features.', 5)
}

SL.hasMultipleDomains = function(){
  return !!SL.settings.domainList && SL.settings.domainList.length > 1
}

SL.handleOverrides = function(){
  if (Overrides){
    for (var key in Overrides){
      if (Overrides.hasOwnProperty(key)){
        SL.data[key] = Overrides[key]
      }
    }
  }
}

SL.privacyManagerParams = function(){
  var params = {}
  SL.extend(params, SL.settings.privacyManagement)
  var analyticsTools = []
  for (var key in SL.tools){
    if (SL.tools.hasOwnProperty(key)) {
      var tool = SL.tools[key]
      var settings = tool.settings
      if (!settings) continue
      if (settings.engine === 'sc'){
        analyticsTools.push(tool)
      }
    }
  }
  var analyticsTrackingServers = SL.filter(SL.map(analyticsTools, function(tool){
    return tool.getTrackingServer()
  }), function(s){ return s != null })
  params.adobeAnalyticsTrackingServers = analyticsTrackingServers
  var substitutable = [
    'bannerText',
    'headline',
    'introductoryText',
    'customCSS'
  ]
  for (var i = 0; i < substitutable.length; i++){
    var prop = substitutable[i]
    var spec = params[prop]
    if (!spec) continue
    if (spec.type === 'text'){
      params[prop] = spec.value
    }else if (spec.type === 'data'){
      params[prop] = SL.getVar(spec.value)
    }else{
      throw new Error('Invalid type: ' + spec.type)
    }
  }
  return params
}

SL.prepareLoadPrivacyManager = function(){
  SL.addEventHandler(window, 'load', function(){
    loadWhenAllSCToolsLoaded(SL.loadPrivacyManager)
  })

  function loadWhenAllSCToolsLoaded(callback){
    var scTools = SL.filter(SL.values(SL.tools), function(tool){
      return tool.settings && tool.settings.engine === 'sc'
    })
    if (scTools.length === 0){
      return callback()
    }
    var numLoaded = 0
    SL.each(scTools, function(tool){
      SL.bindEvent(tool.id + '.load', onLoad)
    })
    var tid = setTimeout(onTimeout, 5000)

    function onLoad(){
      numLoaded++
      if (numLoaded === scTools.length){
        cleanUp()
        clearTimeout(tid)
        callback()
      }
    }

    function cleanUp(){
      SL.each(scTools, function(tool){
        SL.unbindEvent(tool.id + '.load', onLoad)
      })
    }

    function onTimeout(){
      cleanUp()
      callback()
    }
  }

}

// `loadPrivacyManager()`
// ----------------------
//
// Initialize privacy manager
SL.loadPrivacyManager = function(){
  var scriptUrl = SL.basePath() + 'privacy_manager.js'
  SL.loadScript(scriptUrl, function(){
    var pm = SL.privacyManager
    pm.configure(SL.privacyManagerParams())
    pm.openIfRequired()
  })
}

// `init()`
// --------
//
// Initialize Satellite.
//
// - `settings` - all the settings that comprising a library.
SL.init = function(settings) {
  if (SL.stagingLibraryOverride())
    return

  SL.configurationSettings = settings
  var tools = settings.tools
  ;delete settings.tools
  for (var key in settings){
    if (settings.hasOwnProperty(key)){
      SL[key] = settings[key]
    }
  }

  if(SL.data.customVars === undefined)
    SL.data.customVars = {}

  SL.data.queryParams = SL.QueryParams.normal

  SL.handleOverrides()

  SL.detectBrowserInfo()

  if (SL.trackVisitorInfo)
    SL.trackVisitorInfo()

  SL.loadStoredSettings()
  SL.Logger.setOutputState(SL.settings.notifications)

  SL.checkAsyncInclude()

  SL.ensureCSSSelector()

  SL.filterRules()
  SL.dynamicRules = SL.filter(SL.rules, function(rule){
    return rule.eventHandlerOnElement
  })

  SL.tools = SL.initTools(tools)
  SL.initEventEmitters()

  SL.firePageLoadEvent('aftertoolinit')

  if (SL.settings.privacyManagement){
    SL.prepareLoadPrivacyManager()
  }

  if (SL.hasSelector)
    SL.domReady(SL.eventEmitterBackgroundTasks)

  SL.setListeners()

  // Setup background tasks
  SL.domReady(function() {
    SL.poll(
      function() { SL.backgroundTasks() },
      SL.settings.recheckEvery || 3000
    )
  })

  // Setup page load events
  SL.domReady(function(){
    SL.domReadyFired = true
    if (!SL.pageBottomFired)
      SL.pageBottom()

    SL.firePageLoadEvent('domready')
  })

  SL.addEventHandler(window, 'load', function(){
    SL.firePageLoadEvent('windowload')
  })

  SL.firePageLoadEvent('pagetop')
  SL.initialized = true
}

SL.pageLoadPhases = ['aftertoolinit', 'pagetop', 'pagebottom', 'domready', 'windowload']

SL.loadEventBefore = function(one, other){
  return SL.indexOf(SL.pageLoadPhases, one) <= SL.indexOf(SL.pageLoadPhases, other)
}

SL.flushPendingCalls = function(tool){
  if (tool.pending){
    SL.each(tool.pending, function(call){
      var cmd = call[0]
        , elm = call[1]
        , evt = call[2]
        , args = call[3]
      if (cmd in tool)
        tool[cmd].apply(tool, [elm, evt].concat(args))
      else if (tool.emit)
        tool.emit(cmd, elm, evt, args)
      else
        SL.notify('Failed to trigger ' + cmd +
          ' for tool ' + tool.id, 1)
    })
    ;delete tool.pending
  }
}

// setDebug(debug)
// --------------
//
// Activate or deactivate debug mode - within which
// log statements will be printed to the JS console.
//
// - `debug` - a boolean indicating whether debug mode
//   should be turned on.
SL.setDebug = function(debug){
  // When local storage is disabled on Safari, the mere act of referencing window.localStorage
  // throws an error. For this reason, referencing window.localStorage without being inside
  // a try-catch should be avoided.
  try {
    window.localStorage.setItem('sdsat_debug', debug)
  } catch (e) {
    SL.notify('Cannot set debug mode: ' + e.message, 2)
  };
}

SL.getUserAgent = function() {
  return navigator.userAgent;
};

SL.detectBrowserInfo = function(){
  // Based on <http://jsbin.com/inubez/3/>
  function matcher(regexs){
    return function(userAgent){
      for (var key in regexs){
        if (regexs.hasOwnProperty(key)) {          
          var regex = regexs[key];
          var match = regex.test(userAgent);
          if (match) return key;
        }
      }
      return "Unknown";
    };
  }

  // The order in which these regular expressions are evaluated is important.

  var getBrowser = matcher({
    "IE Edge Mobile": /Windows Phone.*Edge/,
    "IE Edge": /Edge/,
    OmniWeb: /OmniWeb/,
    "Opera Mini": /Opera Mini/,
    "Opera Mobile": /Opera Mobi/,
    Opera: /Opera/,
    Chrome: /Chrome|CriOS|CrMo/,
    Firefox: /Firefox|FxiOS/,
    "IE Mobile": /IEMobile/,
    IE: /MSIE|Trident/,
    "Mobile Safari": /Mobile(\/[0-9A-z]+)? Safari/,
    Safari: /Safari/
  });

  var getOS = matcher({
    Blackberry: /BlackBerry|BB10/,
    "Symbian OS": /Symbian|SymbOS/,
    Maemo: /Maemo/,
    Android: /Android/,
    Linux: / Linux /,
    Unix: /FreeBSD|OpenBSD|CrOS/,
    Windows: /[\( ]Windows /,
    iOS: /iPhone|iPad|iPod/,
    MacOS: /Macintosh;/
  });

  var getDeviceType = matcher({
    // This is not entirely accurate. A few old Samsung, Motorola, and Sony Ericsson phones
    // will match but the majority and best guess is Nokia. Also, Nokia makes Windows phones and
    // for those we will make it match Windows Phone and not Nokia.
    Nokia: /Symbian|SymbOS|Maemo/,
    "Windows Phone": /Windows Phone/,
    Blackberry: /BlackBerry|BB10/,
    Android: /Android/,
    iPad: /iPad/,
    iPod: /iPod/,
    iPhone: /iPhone/,
    Desktop: /.*/
  });

  var userAgent = SL.getUserAgent();
  SL.browserInfo = {
    browser: getBrowser(userAgent)
    , os: getOS(userAgent)
    , deviceType: getDeviceType(userAgent)
  }
}

SL.isHttps = function(){
  return 'https:' == document.location.protocol
}

SL.BaseTool = function(settings){
  this.settings = settings || {}

  this.forceLowerCase = SL.settings.forceLowerCase
  if ('forceLowerCase' in this.settings){
    this.forceLowerCase = this.settings.forceLowerCase
  }
}
SL.BaseTool.prototype = {
  triggerCommand: function(trig, elm, evt){
    var settings = this.settings || {}

    if (this.initialize && this.isQueueAvailable()){
      if (this.isQueueable(trig) && evt && SL.loadEventBefore(evt.type, settings.loadOn)){
        this.queueCommand(trig, elm, evt)
        return
      }
    }

    var cmd = trig.command
    var method = this['$' + cmd]
    var escapeHtml = method ? method.escapeHtml : false
    var args = SL.preprocessArguments(
      trig['arguments'],
      elm,
      evt,
      this.forceLowerCase,
      escapeHtml)

    if (method){
      method.apply(this, [elm, evt].concat(args))
    }else if (this.$missing$){
      this.$missing$(cmd, elm, evt, args)
    }else
      SL.notify('Failed to trigger ' + cmd +
        ' for tool ' + this.id, 1)

  },
  endPLPhase: function(pageLoadEvent){
    // override to handle end initialization
  },
  isQueueable: function(trig){
    // everything is queueable except `cancelToolInit`
    return trig.command !== 'cancelToolInit'
  },
  isQueueAvailable: function(){
    return !this.initialized && !this.initializing
  },
  flushQueue: function(){
    if (this.pending){
      SL.each(this.pending, function(args){
        this.triggerCommand.apply(this, args)
      }, this)
      this.pending = []
    }
  },
  queueCommand: function(trig, elm, evt){
    if (!this.pending)
      this.pending = []
    this.pending.push([trig, elm, evt])
  },
  $cancelToolInit: function(){
    this._cancelToolInit = true
  }
}

// Set Satellite to the global variable `_satellite`.
window._satellite = SL

!function(){

function key(name){
  return '_sdsat_' + name
}

SL.trackVisitorInfo = function(){
  var newSession = SL.trackLandingPage()
  SL.trackSessionCount(newSession)
  SL.trackLifetimePagesViewed()
  SL.trackSessionPagesViewed()
  SL.trackTrafficSource()
}

// returns whether this is a new visitor session
SL.trackLandingPage = function(){
  // landing page
  var landingPageKey = key('landing_page')
  var existingLanding = SL.readCookie(landingPageKey)
  if (!existingLanding || existingLanding.split('|').length < 2)
    SL.setCookie(landingPageKey, location.href + '|' + (new Date().getTime()))
  return !existingLanding
}

SL.visitorLandingPage = function(){
  var value = SL.readCookie(key('landing_page'))
  if (!value) return null
  return value.split('|')[0]
}

SL.visitorLandingTime = function(){
  var value = SL.readCookie(key('landing_page'))
  if (!value) return null
  return Number(value.split('|')[1])
}

SL.minutesOnSite = function(){
  var now = new Date().getTime()
  return Math.floor((now - SL.visitorLandingTime()) / 1000 / 60)
}

SL.trackSessionCount = function(newSession){
  if (!newSession) return
  var session = SL.visitorSessionCount()
  SL.setCookie(key('session_count'), session + 1, 365 * 2 /* two years */)
}

SL.visitorSessionCount = function(){
  return Number(SL.readCookie(key('session_count')) || '0')
}

SL.isNewVisitor = function(){
  return SL.visitorSessionCount() === 1
}

SL.trackSessionPagesViewed = function(){
  SL.setCookie(key('pages_viewed'), SL.visitorSessionPagesViewed() + 1)
}

SL.trackLifetimePagesViewed = function(){
  SL.setCookie(key('lt_pages_viewed'), SL.visitorLifetimePagesViewed() + 1, 365 * 2)
}

SL.visitorLifetimePagesViewed = function(){
  return Number(SL.readCookie(key('lt_pages_viewed')) || 0)
}

SL.visitorSessionPagesViewed = function(){
  return Number(SL.readCookie(key('pages_viewed')) || '0')
}

SL.trackTrafficSource = function(){
  var k = key('traffic_source')
  if (!SL.readCookie(k)){
    SL.setCookie(k, document.referrer)
  }
}

SL.trafficSource = function(){
  return SL.readCookie(key('traffic_source'))
}

}()

// E-Commerce APIs
// ---------------
//
// The ecommerce API allows web admins to integrate e-commerce tracking with Satellite.
// More details on the [GA E-Commerce API's](http://code.google.com/apis/analytics/docs/gaJS/gaJSApiEcommerce.html).
// Upon any of the methods on the API being called, they will fire an event, which
// in turn can be handled by a rule in the library.

SL.ecommerce = {
  // `addItem(orderId, sku, name, category, price, quantity)`
  // -------------------------------------
  //
  // Add an item to the transaction.
  addItem: function(){
    var args = [].slice.call(arguments)
    SL.onEvent({type: 'ecommerce.additem', target: args})
  },

  // `addTrans(orderId, affiliation, total, tax, shipping, city, state, country)`
  // ----------------------------------------------------------------------------
  //
  // Add a new transaction.
  addTrans: function(){
    var args = [].slice.call(arguments)
    SL.data.saleData.sale = {
      orderId: args[0],
      revenue: args[2]
    }
    SL.onEvent({type: 'ecommerce.addtrans', target: args})
  },

  // `trackTrans()`
  // --------------
  //
  // Send the transaction data that's been set up using `addItem()` and `addTrans()`
  // to GA to be tracked.
  trackTrans: function(){
    SL.onEvent({type: 'ecommerce.tracktrans', target: []})
  }
}

// Visibility API Event Emitter
// ============================
//
// The `visibility API` is used when the browser's tab gets hidden because
// another tab now is visible. For more information see Mozilla's [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API)

SL.visibility = {
  // Public
  // ------------------------------------------------

  // `isHidden()`
  //
  // The method returns true if the tab is hidden, otherwise false.
  isHidden: function() {
    var prop = this.getHiddenProperty();
    if (!prop) return false;
    return document[prop];
  },

  // `isVisible()`
  //
  // The method is an alias for the `!isHidden`.
  isVisible: function() {
    return !this.isHidden();
  },

  // Private
  // ------------------------------------------------
  getHiddenProperty: function() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];
    if ('hidden' in document) return 'hidden';
    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++) {
      if ((prefixes[i] + 'Hidden') in document)
        return prefixes[i] + 'Hidden';
    }
    // otherwise it's not supported
    return null;
  },

  getVisibilityEvent: function() {
    var ve = this.getHiddenProperty();
    if (!ve) return null;
    return ve.replace(/[H|h]idden/,'') + 'visibilitychange';
  }
};

// Leave Event Emitter
// ============================
//
// The page leave is an event that is used to detect the moment when the
// browser's tab gets closed.
//

function LeaveEventEmitter() {
  if (SL.getToolsByType('nielsen').length > 0) {
    SL.domReady(SL.bind(this.initialize, this));
  }
}

LeaveEventEmitter.prototype = {
  obue: false,
  initialize: function() {
    this.attachCloseListeners();
  },
  obuePrevUnload: function() {},
  obuePrevBeforeUnload: function() {},
  newObueListener: function() {
    if (!this.obue) {
      this.obue = true;
      this.triggerBeacons();
    }
  },
  attachCloseListeners: function() {
    this.prevUnload = window.onunload;
    this.prevBeforeUnload = window.onbeforeunload;

    window.onunload = SL.bind(function(e) {
      if (this.prevUnload) {
        setTimeout(SL.bind(function() {
          this.prevUnload.call(window, e);
        }, this), 1);
      }
      this.newObueListener();
    }, this);
    window.onbeforeunload = SL.bind(function(e) {
      if (this.prevBeforeUnload) {
        setTimeout(SL.bind(function() {
          this.prevBeforeUnload.call(window, e);
        }, this), 1);
      }
      this.newObueListener();
    }, this);
  },
  triggerBeacons: function() {
    SL.fireEvent('leave', document);
  }
}
SL.availableEventEmitters.push(LeaveEventEmitter);

// Twitter Event Emitter
// =====================
//
// Emits the `twitter.tweet` event in the event a user tweets from the site.
function TwitterEventEmitter(twttr){
  SL.domReady(SL.bind(function () {
    this.twttr = twttr || window.twttr;
    this.initialize();
  }, this));
}

TwitterEventEmitter.prototype = {
  initialize: function(){
    var twttr = this.twttr;
    if (twttr && typeof twttr.ready === 'function') {
      twttr.ready(SL.bind(this.bind, this));
    }
  },

  bind: function(){
    this.twttr.events.bind('tweet', function(event) {
      if (event) {
        SL.notify("tracking a tweet button", 1);
        SL.onEvent({type: 'twitter.tweet', target: document});
      }
    });

  }
}
SL.availableEventEmitters.push(TwitterEventEmitter)

// Location Change Event Emitter
// =============================
//
// Will fire `locationchange` event whenever the browser location
// changes due to `hashchange`, `popstate`, `history.pushState()`,
// or `history.replaceState()`. 

function LocationChangeEventEmitter(){
  this.lastURL = SL.URL()
  this._fireIfURIChanged = SL.bind(this.fireIfURIChanged, this)
  this._onPopState = SL.bind(this.onPopState, this)
  this._onHashChange = SL.bind(this.onHashChange, this)
  this._pushState = SL.bind(this.pushState, this)
  this._replaceState = SL.bind(this.replaceState, this)
  this.initialize()
}

LocationChangeEventEmitter.prototype = {
  initialize: function(){
    this.setupHistoryAPI()
    this.setupHashChange()
  },

  fireIfURIChanged: function(){
    var URL = SL.URL()
    if (this.lastURL !== URL){
      this.fireEvent()
      this.lastURL = URL
    }
  },

  fireEvent: function(){
    SL.updateQueryParams()
    SL.onEvent({ type: 'locationchange', target: document })
  },

  setupSPASupport: function(){
    this.setupHistoryAPI()
    this.setupHashChange()
  },

  setupHistoryAPI: function(){
    var history = window.history
    if (history){
      if (history.pushState){
        this.originalPushState = history.pushState
        history.pushState = this._pushState
      }
      if (history.replaceState){
        this.originalReplaceState = history.replaceState
        history.replaceState = this._replaceState
      }
    }
    SL.addEventHandler(window, 'popstate', this._onPopState)
  },

  pushState: function(){
    var ret = this.originalPushState.apply(history, arguments)
    this.onPushState()
    return ret
  },

  replaceState: function(){
    var ret = this.originalReplaceState.apply(history, arguments)
    this.onReplaceState()
    return ret
  },

  setupHashChange: function(){
    SL.addEventHandler(window, 'hashchange', this._onHashChange)
  },

  onReplaceState: function(){
    setTimeout(this._fireIfURIChanged, 0)
  },

  onPushState: function(){
    setTimeout(this._fireIfURIChanged, 0)
  },

  onPopState: function(){
    setTimeout(this._fireIfURIChanged, 0)
  },

  onHashChange: function(){
    setTimeout(this._fireIfURIChanged, 0)
  },

  uninitialize: function(){
    this.cleanUpHistoryAPI()
    this.cleanUpHashChange()
  },

  cleanUpHistoryAPI: function(){
    if (history.pushState === this._pushState){
      history.pushState = this.originalPushState
    }
    if (history.replaceState === this._replaceState){
      history.replaceState = this.originalReplaceState
    }
    SL.removeEventHandler(window, 'popstate', this._onPopState)
  },

  cleanUpHashChange: function(){
    SL.removeEventHandler(window, 'hashchange', this._onHashChange)
  }

}

SL.availableEventEmitters.push(LocationChangeEventEmitter);

function DataElementChangeEmitter() {
  var rules = SL.filter(SL.rules, function(rule) {
    return rule.event.indexOf('dataelementchange') === 0;
  });

  this.dataElementsNames = SL.map(rules, function(rule) {
    var matchedSubstrings = rule.event.match(/dataelementchange\((.*)\)/i);
    return matchedSubstrings[1];
  }, this);

  this.initPolling();
}

// SL.stringify is not 100% compatible with JSON.stringify (for example JSON.stringify breaks
// whenever it encounters a cyclic reference). Since this check might become intensive,
// only for this case we would prefer using JSON.stringify whenever that's available.
DataElementChangeEmitter.prototype.getStringifiedValue =
    (window.JSON && window.JSON.stringify) || SL.stringify;

DataElementChangeEmitter.prototype.initPolling = function() {
  if (this.dataElementsNames.length === 0) {
    return;
  }

  this.dataElementsStore = this.getDataElementsValues();
  SL.poll(SL.bind(this.checkDataElementValues, this), 1000);
};

DataElementChangeEmitter.prototype.getDataElementsValues = function() {
  var values = {};
  SL.each(this.dataElementsNames, function(dataElementName) {
    var value = SL.getVar(dataElementName);
    values[dataElementName] = this.getStringifiedValue(value);
  }, this);

  return values;
};

DataElementChangeEmitter.prototype.checkDataElementValues = function() {
  SL.each(this.dataElementsNames, SL.bind(function(dataElementName) {
    var currentStringifiedValue = this.getStringifiedValue(SL.getVar(dataElementName));
    var previousStringifiedValue =  this.dataElementsStore[dataElementName];

    if (currentStringifiedValue !== previousStringifiedValue) {
      this.dataElementsStore[dataElementName] = currentStringifiedValue;

      SL.onEvent({
        type: 'dataelementchange(' + dataElementName + ')',
        target: document
      });
    }
  }, this));
};

SL.availableEventEmitters.push(DataElementChangeEmitter);

// Orientation Change Event Emitter
// ================================
//
// The `orientationchange` event on mobile devices fire when the devices switchs between
// portrait and landscape modes. You can use `%event.orientation%` in your command arguments
// to evaluate to either `portrait` or `landscape`.
function OrientationChangeEventEmitter(){
  SL.addEventHandler(window, "orientationchange", OrientationChangeEventEmitter.orientationChange)
}
OrientationChangeEventEmitter.orientationChange = function (e) {
  var orientation = window.orientation === 0 ? 
    'portrait' : 
    'landscape'
  e.orientation = orientation
  SL.onEvent(e)
}
SL.availableEventEmitters.push(OrientationChangeEventEmitter)

// VideoPlayedEventEmitter
// =======================
//
// Emits the `videoplayed` event, given a specified percentage or duration, i.e. `videoplayed`
// is a parameterized event. A rule looks like this
//
//      {
//          name: "Video 10% complete",
//          event: "videoplayed(10%)",
//          selector: "#video",
//          trigger: [
//              {
//                  tool: "ga",
//                  command: "trackEvent",
//                  arguments: [
//                      "video",
//                      "video 10% complete",
//                      "from: %URI%"
//                  ]
//              }
//          ]
//      }
//
// `10%` is in the paranthesis which indicates this rule will only fire when the 10%
// of the total length of the video has been played.
// You can also specifiy a duration in seconds, which looks like `videoplayed(8s)` - which
// stands for 8 seconds.

function VideoPlayedEventEmitter(){
  this.rules = SL.filter(SL.rules, function(rule){
    return rule.event.substring(0, 11) === 'videoplayed'
  })
  this.eventHandler = SL.bind(this.onUpdateTime, this)
}
VideoPlayedEventEmitter.prototype = {
  backgroundTasks: function(){
    var eventHandler = this.eventHandler
    SL.each(this.rules, function(rule){
      SL.cssQuery(rule.selector || 'video', function(elms){
        SL.each(elms, function(elm){
          if (SL.$data(elm, 'videoplayed.tracked')) return
          SL.addEventHandler(elm, 'timeupdate', SL.throttle(eventHandler, 100))
          SL.$data(elm, 'videoplayed.tracked', true)
        })
      })
    })
  },
  evalRule: function(elm, rule){
    var eventType = rule.event
      , seekable = elm.seekable
      , startTime = seekable.start(0)
      , endTime = seekable.end(0)
      , currentTime = elm.currentTime
      , m = rule.event.match(/^videoplayed\(([0-9]+)([s%])\)$/)
    if (!m) return
    var unit = m[2]
      , amount = Number(m[1])
    var func = unit === '%' ?
      function(){
        return amount <= 
          100 * (currentTime - startTime) / (endTime - startTime)
      } :
      function(){
        return amount <= currentTime - startTime
      }
    if (!SL.$data(elm, eventType) && func()){
      SL.$data(elm, eventType, true)
      SL.onEvent({type: eventType, target: elm})
    }
  },
  onUpdateTime: function(e){
    var rules = this.rules
      , elm = e.target
    if (!elm.seekable || elm.seekable.length === 0) return
    for (var i = 0, len = rules.length; i < len; i++)
      this.evalRule(elm, rules[i])
  }
}
SL.availableEventEmitters.push(VideoPlayedEventEmitter)

// Visibility API Event Emitter
// ============================
//
// The `visibility API` is used when the browser's tab gets hidden because
// another tab now is visible. For more information see Mozilla's [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API)

function VisibilityEventEmitter() {
  this.defineEvents();
  this.visibilityApiHasPriority = true;
  if (!document.addEventListener) { // Older browers (e.g.: IE8)
    this.attachDetachOlderEventListeners(true, document, 'focusout');
  } else {
    this.setVisibilityApiPriority(false);
  }
  var context = this;
  SL.bindEvent('aftertoolinit', function() {
    SL.fireEvent(SL.visibility.isHidden() ? 'tabblur' : 'tabfocus');
  });
}

VisibilityEventEmitter.prototype = {
  defineEvents: function() {
    this.oldBlurClosure = function() {
      SL.fireEvent('tabblur', document)
    };
    this.oldFocusClosure = SL.bind(function() {
      if (this.visibilityApiHasPriority) {
        SL.fireEvent('tabfocus', document);
      } else {
        if (SL.visibility.getHiddenProperty() != null) {
          if(!SL.visibility.isHidden()) {
            SL.fireEvent('tabfocus', document);
          }
        } else {
          SL.fireEvent('tabfocus', document);
        }
      }
    }, this);
  },
  attachDetachModernEventListeners: function(add) {
    var method = (add == false ? 'removeEventHandler' : 'addEventHandler');
    SL[method](document,
      SL.visibility.getVisibilityEvent(),
      this.handleVisibilityChange
    );
  },
  attachDetachOlderEventListeners: function(add, blurTarget, blurEventName) {
    var method = (add == false ? 'removeEventHandler' : 'addEventHandler');
    SL[method](blurTarget, blurEventName, this.oldBlurClosure);
    SL[method](window, 'focus', this.oldFocusClosure);
  },
  handleVisibilityChange: function() {
    if (SL.visibility.isHidden()) {
      SL.fireEvent('tabblur', document);
    } else {
      SL.fireEvent('tabfocus', document);
    }
  },
  setVisibilityApiPriority: function(visibilityApiHasPriority) {
    this.visibilityApiHasPriority = visibilityApiHasPriority;
    this.attachDetachOlderEventListeners(false, window, 'blur');
    this.attachDetachModernEventListeners(false);
    if (visibilityApiHasPriority) {
      if (SL.visibility.getHiddenProperty() != null) { // Modern browsers
        this.attachDetachModernEventListeners(true);
      } else {
        this.attachDetachOlderEventListeners(true, window, 'blur');
      }
    } else {
      this.attachDetachOlderEventListeners(true, window, 'blur');
      if (SL.visibility.getHiddenProperty() != null) { // Modern browsers
        this.attachDetachModernEventListeners(true);
      }
    }
  },
  oldBlurClosure: null,
  oldFocusClosure: null,
  visibilityApiHasPriority: true
};

SL.availableEventEmitters.push(VisibilityEventEmitter);

// InviewEventEmitter
// ==================
//
// Emits the `inview` event. The `inview` event fires on an element when the element
// first comes into the view of the user. If the element is in view immediately upon page
// load, it will be fired right away, if it only comes in view after some scrolling, it
// will fire then. An optional delay interval `inviewDelay` can be specified in the rule
// which determine how long the element has to be in view for before the event fires,
// of which the default value is 1 second.

function InViewEventEmitter(rules){
  rules = rules || SL.rules
  this.rules = SL.filter(rules, function(rule){
    return rule.event === 'inview'
  })
  this.elements = []
  this.eventHandler = SL.bind(this.track, this)
  SL.addEventHandler(window, 'scroll', this.eventHandler)
  SL.addEventHandler(window, 'load', this.eventHandler)
}

// Util functions needed by `InViewEventEmitter`
InViewEventEmitter.offset = function(elem) {
  var top = null, left = null;

  try {
    var box = elem.getBoundingClientRect(),
      doc = document,
      docElem = doc.documentElement,
      body = doc.body,
      win = window,
      clientTop  = docElem.clientTop  || body.clientTop  || 0,
      clientLeft = docElem.clientLeft || body.clientLeft || 0,
      scrollTop  = win.pageYOffset || docElem.scrollTop  || body.scrollTop,
      scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    top  = box.top  + scrollTop  - clientTop;
    left = box.left + scrollLeft - clientLeft;
  } catch(e) {
  }

  return { top: top, left: left }
}
InViewEventEmitter.getViewportHeight = function() {
  var height = window.innerHeight // Safari, Opera
  var mode = document.compatMode

  if (mode) { // IE, Gecko
    height = (mode == 'CSS1Compat') ?
    document.documentElement.clientHeight : // Standards
    document.body.clientHeight // Quirks
  }

  return height
}
InViewEventEmitter.getScrollTop = function(){
  return (document.documentElement.scrollTop ?
    document.documentElement.scrollTop :
    document.body.scrollTop)
}

InViewEventEmitter.isElementInDocument = function(el) {
  return document.body.contains(el);
}

InViewEventEmitter.isElementInView = function(el) {
  if (!InViewEventEmitter.isElementInDocument(el)) {
    return false;
  }

  var vpH = InViewEventEmitter.getViewportHeight()
      , scrolltop = InViewEventEmitter.getScrollTop()
      , top = InViewEventEmitter.offset(el).top
      , height = el.offsetHeight;

  if (top !== null) {
    return !(scrolltop > (top + height) || scrolltop + vpH < top)
  }

  return false;
}

InViewEventEmitter.prototype = {
  backgroundTasks: function(){
    var elements = this.elements
    SL.each(this.rules, function(rule){
      SL.cssQuery(rule.selector, function(elms){
        var addCount = 0
        SL.each(elms, function(elm){
          if (!SL.contains(elements, elm)){
            elements.push(elm)
            addCount++
          }
        })
        if (addCount){
          SL.notify(rule.selector + ' added ' + addCount + ' elements.', 1)
        }
      })
    })
    this.track()
  },

  checkInView: function(el, recheck, delay){
    var inview = SL.$data(el, 'inview');
    if (InViewEventEmitter.isElementInView(el)) {
      // it is in view now
      if (!inview)
        SL.$data(el, 'inview', true)
      var self = this
      this.processRules(el, function(rule, viewedProp, timeoutIdProp){
        if (recheck || !rule.inviewDelay){
          SL.$data(el, viewedProp, true)
          SL.onEvent({type: 'inview', target: el, inviewDelay: rule.inviewDelay})
        }else if(rule.inviewDelay){
          var timeout = SL.$data(el, timeoutIdProp)
          if (!timeout) {
            timeout = setTimeout(function(){
              self.checkInView(el, true, rule.inviewDelay)
            }, rule.inviewDelay)
            SL.$data(el, timeoutIdProp, timeout)
          }
        }
      }, delay)
    } else {
      if (!InViewEventEmitter.isElementInDocument(el)) {
        var idx = SL.indexOf(this.elements, el);
        this.elements.splice(idx, 1)
      }

      // it is not in view now
      if (inview)
        SL.$data(el, 'inview', false)
      this.processRules(el, function(rule, viewedProp, timeoutIdProp){
        var timeout = SL.$data(el, timeoutIdProp)
        if (timeout){
          clearTimeout(timeout)
        }
      }, delay)
    }
  },
  track: function(){
    // We are not using SL.each here because we might do a splice inisde
    // `checkInView` method.
    for (var i = this.elements.length - 1; i >=0; i--) {
      this.checkInView(this.elements[i]);
    }
  },
  processRules: function(elm, callback, delay){
    var filteredRules = this.rules;
    if (delay) {
        filteredRules = SL.filter(this.rules, function(e){
          return e.inviewDelay == delay;
        });
    }
    SL.each(filteredRules, function(rule, i){
      // viewedProp: for rules that has a timeout, the definition for
      // "viewed" is rule dependent. But for all rules that do not have
      // a timeout, it is independent.
      var viewedProp = rule.inviewDelay ? 'viewed_' + rule.inviewDelay : 'viewed'
      var timeoutIdProp = 'inview_timeout_id_' + i
      if (SL.$data(elm, viewedProp)) return
      if (SL.matchesCss(rule.selector, elm)){
        callback(rule, viewedProp, timeoutIdProp)
      }
    })
  }
}

SL.availableEventEmitters.push(InViewEventEmitter)

// ElementExistsEventEmitter
// ==================
//
// Emits the `elementexists` event. The `elementexists` event fires when an element
// of a specified selector becomes into existance - either because it's in the page
// markup or dynamically injected later on. *Each rule only fires once.*

function ElementExistsEventEmitter() {
  this.rules = SL.filter(SL.rules, function(rule) {
    return rule.event === 'elementexists';
  });
}
ElementExistsEventEmitter.prototype.backgroundTasks = function() {
  SL.each(this.rules, function(rule) {
    SL.cssQuery(rule.selector, function(elms) {
      if (elms.length > 0){
        // This results in a bug: https://jira.corp.adobe.com/browse/DTM-6681
        // The fix was reverted due to: https://jira.corp.adobe.com/browse/DTM-7377
        var elm = elms[0];
        if (SL.$data(elm, 'elementexists.seen')) return;
        SL.$data(elm, 'elementexists.seen', true);
        SL.onEvent({type: 'elementexists', target: elm});
      }
    })
  })
}

SL.availableEventEmitters.push(ElementExistsEventEmitter);

// Facebook Event Emitter
// ======================
//
// Will track `edge.create`, `edge.remove` and `message.send` events from the Facebook
// Javascript API and emit `facebook.like`, `facebook.unlike` and `facebook.send` events
// respectively.

function FacebookEventEmitter(FB){
  this.delay = 250;
  this.FB = FB;

  SL.domReady(SL.bind(function () {
    SL.poll(SL.bind(this.initialize, this), this.delay, 8);
  }, this));
}

FacebookEventEmitter.prototype = {
  initialize: function() {
    this.FB = this.FB || window.FB;

    if (this.FB && this.FB.Event && this.FB.Event.subscribe) {
      this.bind();
      return true;
    }
  },

  bind: function(){
    this.FB.Event.subscribe('edge.create', function() {
      SL.notify("tracking a facebook like", 1)
      SL.onEvent({type: 'facebook.like', target: document})
    });

    this.FB.Event.subscribe('edge.remove', function() {
      SL.notify("tracking a facebook unlike", 1)
      SL.onEvent({type: 'facebook.unlike', target: document})
    });

    this.FB.Event.subscribe('message.send', function() {
      SL.notify("tracking a facebook share", 1)
      SL.onEvent({type: 'facebook.send', target: document})
    });
  }
}
SL.availableEventEmitters.push(FacebookEventEmitter);

// Hover Event Emitter
// =====================
//
// Emits the `hover` event in the event. This is better than `mouseover` because you can introduce a certain delay.
// 
//  {
//        name: "Hover for 1 second"
//        event: "hover(1000)",
//        ...
//  }
function HoverEventEmitter(){
  var eventRegex = this.eventRegex = /^hover\(([0-9]+)\)$/
  var rules = this.rules = []
  SL.each(SL.rules, function(rule){
    var m = rule.event.match(eventRegex)
    if (m){
      rules.push([
        Number(rule.event.match(eventRegex)[1]), 
        rule.selector
      ])
    }
  })
}
HoverEventEmitter.prototype = {
  backgroundTasks: function(){
    var self = this
    SL.each(this.rules, function(rule){
      var selector = rule[1]
        , delay = rule[0]
      SL.cssQuery(selector, function(newElms){
        SL.each(newElms, function(elm){
          self.trackElement(elm, delay)
        })
      })
    }, this)
  },
  trackElement: function(elm, delay){
    var self = this
      , trackDelays = SL.$data(elm, 'hover.delays')
    if (!trackDelays){
      SL.addEventHandler(elm, 'mouseover', function(e){
        self.onMouseOver(e, elm)
      })
      SL.addEventHandler(elm, 'mouseout', function(e){
        self.onMouseOut(e, elm)
      })
      SL.$data(elm, 'hover.delays', [delay])
    }
    else if (!SL.contains(trackDelays, delay)){
      trackDelays.push(delay)
    }
  },
  onMouseOver: function(e, elem){
    var target = e.target || e.srcElement
      , related = e.relatedTarget || e.fromElement
      , hit = (elem === target || SL.containsElement(elem, target)) && 
            !SL.containsElement(elem, related)
    if (hit)
      this.onMouseEnter(elem)
  },
  onMouseEnter: function(elm){
    var delays = SL.$data(elm, 'hover.delays')
    var delayTimers = SL.map(delays, function(delay){
      return setTimeout(function(){
        SL.onEvent({type: 'hover(' + delay + ')', target: elm})
      }, delay)
    })
    SL.$data(elm, 'hover.delayTimers', delayTimers)
  },
  onMouseOut: function(e, elem){
    var target = e.target || e.srcElement
      , related = e.relatedTarget || e.toElement
      , hit = (elem === target || SL.containsElement(elem, target)) && 
            !SL.containsElement(elem, related)
    if (hit)
      this.onMouseLeave(elem)
  },
  onMouseLeave: function(elm){
    var delayTimers = SL.$data(elm, 'hover.delayTimers')
    if (delayTimers)
      SL.each(delayTimers, function(timer){
        clearTimeout(timer)
      })
  }
}
SL.availableEventEmitters.push(HoverEventEmitter)

// The Nielsen Tool
// ================
//
// This tool provides the means to make Nielsen tracking possible.
//
// The tool accepts the following settings:
//
// - `collectionServer` - The collection server to be used. The variable
//      specifies the nearest collection server.
// - `clientId` - The client identifier. A unique Nielsen supplied ID that
//      should be alphanumeric and lowercase. A dash (-) character is allowed.
// - `contentGroup` - The content group. A historical variable used for
//      grouping/aggregating content into channels. Currently the
//      default value is "0".
function NielsenTool(settings) {
  SL.BaseTool.call(this, settings);
  this.defineListeners();
  this.beaconMethod = 'plainBeacon';
  this.adapt = new NielsenTool.DataAdapters();
  this.dataProvider = new NielsenTool.DataProvider.Aggregate();
}

SL.inherit(NielsenTool, SL.BaseTool);
SL.extend(NielsenTool.prototype, {
  // Public
  // ------------------------------------------------
  name: 'Nielsen',

  // Private
  // ------------------------------------------------

  // `endPLPhase()`
  // ------------------------------------------------
  //
  // Method that starts the tool initialization when the page load phase is
  // matched and only if the tool initialization has not been previously
  // cancelled.
  //
  // This is needed in order to be able to properly hook the needed events.
  endPLPhase: function(pageLoadEvent) {
    switch (pageLoadEvent) {
      case 'pagetop':
        this.initialize();
        break;
      case 'pagebottom':
        if (this.enableTracking) {
          this.queueCommand({ command: 'sendFirstBeacon', "arguments": [] });
          this.flushQueueWhenReady();
        }
        break;
    }
  },

  defineListeners: function() {
    this.onTabFocus = SL.bind(function() {
      this.notify('Tab visible, sending view beacon when ready', 1);
      this.tabEverVisible = true;
      this.flushQueueWhenReady();
    }, this);
    this.onPageLeave = SL.bind(function() {
      this.notify('isHuman? : '+ this.isHuman(), 1);
      if (this.isHuman()) {
        this.sendDurationBeacon(); // track page leave
      }
    }, this);
    this.onHumanDetectionChange = SL.bind(function(e) {
      if (this == e.target.target) this.human = e.target.isHuman;
    }, this);
  },

  initialize: function() {
    this.initializeTracking();
    this.initializeDataProviders();
    this.initializeNonHumanDetection();
    this.tabEverVisible = SL.visibility.isVisible();
    if (!this.tabEverVisible) {
      SL.bindEventOnce('tabfocus', this.onTabFocus);
    }
    else {
      this.notify('Tab visible, sending view beacon when ready', 1);
    }

    this.initialized = true;
  },

  // `initializeTracking()`
  // ------------------------------------------------
  //
  // The method starts the time tracking and hooks on the leave event.
  initializeTracking: function() {
    if (this.initialized) return;
    this.notify('Initializing tracking', 1);
    this.addRemovePageLeaveEvent(this.enableTracking);
    this.addRemoveHumanDetectionChangeEvent(this.enableTracking);
    this.initialized = true;
  },

  // `initializeDataProviders()`
  // ------------------------------------------------
  //
  // The method initializes default data providers for:
  // - Analytics Report Suite ID, if Analytics account is linked
  // - Marketing Cloud Visitor ID, with fallback to auto-generated UUID
  initializeDataProviders: function() {
    var analytics = this.getAnalyticsTool(), rsid;

    this.dataProvider.register(
      new NielsenTool.DataProvider.VisitorID(
        SL.getVisitorId()
      )
    );
    if (analytics) {
      rsid = new NielsenTool.DataProvider.Generic('rsid', function() {
        return analytics.settings.account;
      });
      this.dataProvider.register(rsid);
    }
    else {
      this.notify('Missing integration with Analytics: rsid will not be sent.');
    }
  },

  initializeNonHumanDetection: function() {
    if (SL.nonhumandetection) {
      SL.nonhumandetection.init();
      this.setEnableNonHumanDetection(
        this.settings.enableNonHumanDetection == false ? false : true);
      if (this.settings.nonHumanDetectionDelay > 0) {
        this.setNonHumanDetectionDelay(
          parseInt(this.settings.nonHumanDetectionDelay) * 1000);
      }
    } else {
      this.notify('NHDM is not available.');
    }
  },

  // `getAnalyticsTool()`
  // ------------------------------------------------
  //
  // If integration is defined, this method returns the tool instance of
  // the linked Analytics account
  getAnalyticsTool: function() {
    if (this.settings.integratesWith) {
      return SL.tools[this.settings.integratesWith];
    }
  },

  flushQueueWhenReady: function() {
    if (!this.enableTracking || !this.tabEverVisible) return;
    SL.poll(SL.bind(function() {
      if (this.isReadyToTrack()) {
        this.flushQueue();
        return true;
      }
    }, this), 100, 20);
  },

  isReadyToTrack: function() {
    return this.tabEverVisible && this.dataProvider.isReady();
  },

  // `setVars(vars)`
  // ------------------------------------------------
  //
  // The method is used to set variables on the tool
  $setVars: function(elm, evt, vars) {
    for (var v in vars) {
      var val = vars[v];
      if (typeof val === 'function')
        val = val();
      this.settings[v] = val;
    }
    this.notify('Set variables done', 2);
    this.prepareContextData();
  },

  // `setEnableTracking()`
  // ------------------------------------------------
  //
  // The method triggers the view tracking call.
  $setEnableTracking: function(elm, evt, bool) {
    this.notify('Will' + (!bool ? ' not' : '') + ' track time on page', 1);
    if (this.enableTracking != bool) {
      this.addRemovePageLeaveEvent(bool);
      this.addRemoveHumanDetectionChangeEvent(bool);
      this.enableTracking = bool;
    }
  },

  // `sendFirstBeacon()`
  // ------------------------------------------------
  //
  // The method is called as soon as everything is in place.
  $sendFirstBeacon: function(elm, evt, settings) {
    this.sendViewBeacon();
  },

  // `setEnableNonHumanDetection()`
  // ------------------------------------------------
  //
  // The method enables/disables the human detection mechanism.
  setEnableNonHumanDetection: function(bool) {
    if (bool) {
      SL.nonhumandetection.register(this);
    } else {
      SL.nonhumandetection.unregister(this);
    }
  },

  // `setNonHumanDetectionDelay()`
  // ------------------------------------------------
  //
  // The method set the timeout for entering in non human state.
  setNonHumanDetectionDelay: function(delay) {
    SL.nonhumandetection.register(this, delay);
  },

  addRemovePageLeaveEvent: function(add) {
    this.notify((add ? 'Attach onto' : 'Detach from') + ' page leave event', 1);
    var method = (add == false ? 'unbindEvent' : 'bindEvent');
    SL[method]('leave', this.onPageLeave);
  },

  addRemoveHumanDetectionChangeEvent: function(add) {
    this.notify((add ? 'Attach onto' : 'Detach from') + ' human detection change event', 1);
    var method = (add == false ? 'unbindEvent' : 'bindEvent');
    SL[method]('humandetection.change', this.onHumanDetectionChange);
  },

  // `sendViewBeacon()`
  // ------------------------------------------------
  //
  // The method triggers the view tracking call.
  sendViewBeacon: function() {
    this.notify('Tracked page view.', 1);
    this.sendBeaconWith();
  },

  // `sendDurationBeacon()`
  // ------------------------------------------------
  //
  // The method triggers the duration tracking call. This adds the time
  // spent on the page to the call and is triggered when the user leaves
  // the current web page.
  sendDurationBeacon: function() {
    if (
      !SL.timetracking ||
      typeof SL.timetracking.timeOnPage != 'function' ||
      SL.timetracking.timeOnPage() == null
    ) {
      this.notify('Could not track close due missing time on page', 5);
      return;
    }
    this.notify('Tracked close', 1);
    this.sendBeaconWith({
      timeOnPage: Math.round(SL.timetracking.timeOnPage() / 1000),
      duration: 'D',
      timer: 'timer'
    });
    // a bit of delay to let the network thread finish sending data
    var i,s='';for(i=0;i<this.magicConst;i++){s+='0'};
  },

  // `sendBeaconWith(obj)`
  // ------------------------------------------------
  //
  // The method builds the tracking call based on provided settings and
  // parameters.
  sendBeaconWith: function(params) {
    if (this.enableTracking) {
      this[this.beaconMethod].call(this, this.prepareUrl(params));
    }
  },
  plainBeacon: function(url) {
    var img = new Image();
    img.src = url;
    img.width = 1;
    img.height = 1;
    img.alt = '';
  },
  navigatorSendBeacon: function(url) {
    navigator.sendBeacon(url);
  },
  prepareUrl: function(params) {
    var obj = this.settings;
    SL.extend(obj, this.dataProvider.provide());
    SL.extend(obj, params);
    return this.preparePrefix(this.settings.collectionServer) +
      this.adapt.convertToURI(
        this.adapt.toNielsen(
          this.substituteVariables(obj)));
  },
  preparePrefix: function(server) {
    return '//' + encodeURIComponent(server) + '.imrworldwide.com/cgi-bin/gn?';
  },
  substituteVariables: function(hash){
    var obj = {};
    for (var v in hash) {
      if (hash.hasOwnProperty(v)) {
        obj[v] = SL.replace(hash[v]);
      }
    }
    return obj;
  },
  prepareContextData: function() {
    if (!this.getAnalyticsTool()) {
      this.notify('Adobe Analytics missing.');
      return;
    }
    var obj = this.settings;
    obj.sdkVersion =_satellite.publishDate;
    this.getAnalyticsTool().$setVars(null, null, {
      contextData: this.adapt.toAnalytics(
        this.substituteVariables(obj))
    });
  },
  isHuman: function() {
    return this.human;
  },
  onTabFocus: function() {},
  onPageLeave: function() {},
  onHumanDetectionChange: function() {},
  notify: function(msg, lvl) {
    SL.notify(this.logPrefix + msg, lvl);
  },
  beaconMethod: 'plainBeacon',
  adapt: null,
  enableTracking: false,
  logPrefix: "Nielsen: ",
  tabEverVisible: false,
  human: true,
  magicConst: 0x1e8480
});

// `NielsenTool.DataProvider`
// ==========================
//
// The following components handle the task of providing extra information
// for the Nielsen beacon, with support for asynchronous data
//
NielsenTool.DataProvider = {};
NielsenTool.DataProvider.Generic = function(key, valueFn) {
  this.key = key;
  this.valueFn = valueFn;
};

SL.extend(NielsenTool.DataProvider.Generic.prototype, {
  isReady: function() {
    return true;
  },

  getValue: function() {
    return this.valueFn();
  },

  provide: function() {
    if (!this.isReady()) {
      NielsenTool.prototype.notify('Not yet ready to provide value for: ' + this.key, 5)
    }
    var data = {};
    data[this.key] = this.getValue();
    return data;
  }
});

// `NielsenTool.DataProvider.VisitorID`
// ====================================
//
// Gets and optionally waits for Marketing Cloud ID to be loaded.
// If no visitor instance is provided, then it falls-back to generated UUID.
//
NielsenTool.DataProvider.VisitorID = function(visitorInstance, key, fallbackProvider) {
  this.key = key || 'uuid';
  this.visitorInstance = visitorInstance;
  if (this.visitorInstance) {
    this.visitorId = visitorInstance.getMarketingCloudVisitorID([this, this._visitorIdCallback]);
  }
  this.fallbackProvider = fallbackProvider || new NielsenTool.UUID();
};

SL.inherit(NielsenTool.DataProvider.VisitorID, NielsenTool.DataProvider.Generic);
SL.extend(NielsenTool.DataProvider.VisitorID.prototype, {
  isReady: function() {
    if (this.visitorInstance === null) {
      return true;
    }
    return !!this.visitorId;
  },

  getValue: function() {
    return this.visitorId || this.fallbackProvider.get();
  },

  _visitorIdCallback: function(id) {
    this.visitorId = id;
  }
});

// `NielsenTool.DataProvider.Aggregate`
// ====================================
//
// Aggregates data from multiple providers, being aware of their ready-state.
//
NielsenTool.DataProvider.Aggregate = function() {
  this.providers = [];
  for (var i=0; i<arguments.length; i++) {
    this.register(arguments[i]);
  }
};

SL.extend(NielsenTool.DataProvider.Aggregate.prototype, {
  register: function(provider) {
    this.providers.push(provider);
  },

  isReady: function() {
    return SL.every(this.providers, function(provider) {
      return provider.isReady();
    });
  },

  provide: function() {
    var data = {};
    SL.each(this.providers, function(provider) {
      SL.extend(data, provider.provide());
    });
    return data;
  }
});

// `UUID`
// ===============
//
// The follwing generates an [RFC 4122 version 4](https://www.ietf.org/rfc/rfc4122.txt)
// uinique ID and stores it in a cookie.

NielsenTool.UUID = function() {};

SL.extend(NielsenTool.UUID.prototype, {
  // `generate()`
  // ------------------------------------------------
  //
  // Method that generates an [RFC 4122 version 4](https://www.ietf.org/rfc/rfc4122.txt)
  // compliant unique ID.
  //
  // This is needed in for Nielsen tracking w/o Analytics integration.
  generate: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  get: function() {
    var cookieUUID = SL.readCookie(this.key('uuid'));
    if (cookieUUID) return cookieUUID;
    cookieUUID = this.generate();
    SL.setCookie(this.key('uuid'), cookieUUID);
    return cookieUUID;
  },
  key: function(name) {
    return '_dtm_nielsen_' + name;
  }
});

// `Data Adapters`
// ===============
//
// The follwing adapters are used to adapt the settings to the proper format
// for both Nielsen tracking call and AA tracking calls

NielsenTool.DataAdapters = function() {};

SL.extend(NielsenTool.DataAdapters.prototype, {
  toNielsen: function(settings) {
    var cdate = new Date().getTime(),
        nielsenPrefixes = {
          c6: 'vc,',
          c13: 'asid,',
          c15: 'apn,',
          c27: 'cln,',
          c32: 'segA,',
          c33: 'segB,',
          c34: 'segC,',
          c35: 'adrsid,',
          c29: 'plid,',
          c30: 'bldv,',
          c40: 'adbid,'
        },
        nielsenObj = {
          ci: settings.clientId,
          c6: settings.vcid,
          c13: settings.appId,
          c15: settings.appName,
          prv: 1,
          forward: 0,
          ad: 0,
          cr: settings.duration || 'V', // [V|D], default V
          rt: 'text',
          st: 'dcr',
          prd: 'dcr',
          r: cdate,
          at: settings.timer || 'view', // [view|timer], default view
          c16: settings.sdkVersion,
          c27: settings.timeOnPage || 0,
          c40: settings.uuid,
          c35: settings.rsid,
          ti: cdate,
          sup: 0,
          c32: settings.segmentA,
          c33: settings.segmentB,
          c34: settings.segmentC,
          asn: settings.assetName,
          c29: settings.playerID,
          c30: settings.buildVersion
        };
    for (key in nielsenObj) {
      if (nielsenObj[key] !== undefined && nielsenObj[key] != null) {
        if (nielsenObj[key] !== undefined && nielsenObj != null && nielsenObj != '') {
          var val = encodeURIComponent(nielsenObj[key]);
          if (nielsenPrefixes.hasOwnProperty(key) && val) {
            val = nielsenPrefixes[key] + val;
          }
          nielsenObj[key] = val;
        }
      }
    }
    return this.filterObject(nielsenObj);
  },
  toAnalytics: function(settings) {
    return this.filterObject({
      'a.nielsen.clientid': settings.clientId,
      'a.nielsen.vcid': settings.vcid,
      'a.nielsen.appid': settings.appId,
      'a.nielsen.appname': settings.appName,
      'a.nielsen.accmethod': "0",
      'a.nielsen.ctype': "text",
      'a.nielsen.sega': settings.segmentA,
      'a.nielsen.segb': settings.segmentB,
      'a.nielsen.segc': settings.segmentC,
      'a.nielsen.asset': settings.assetName
    });
  },
  convertToURI: function(obj) {
    if (SL.isObject(obj) === false) return '';
    var uri = []
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) uri.push(key + '=' + obj[key]);
    }
    return uri.join('&')
  },
  filterObject: function(obj) {
    for (var k in obj) {
      if (obj.hasOwnProperty(k) &&
        (obj[k] == null || obj[k] === undefined)) {
        delete obj[k];
      }
    }
    return obj;
  }
});

SL.availableTools.nielsen = NielsenTool;

// The Adobe Target Tool
// ==================
//
// This tool interacts with [Adobe Target library](https://git.corp.adobe.com/mc-visitor/VisitorAPI).
//
// The tool accepts the following settings:
//
// - `engine` - The engine identifier (tnt)
// - `mboxURL` - The URL where the mbox can be found
// - `loadSync` - Specifies how the mbox should be loaded. A true value means
//      that it should be loaded in a synchronous mode.
// - `pageParams` - Object containing key/value pairs used in the mbox retrieval
//      call. The pairs are merged onto the `targetPageParams` property of
//      Target Javascript library. For more information click
//      [here](https://marketing.adobe.com/resources/help/en_US/target/target/c_pass_parameters_to_global_mbox.html).

function Tnt(settings){
  SL.BaseTool.call(this, settings)

  this.styleElements = {}
  this.targetPageParamsStore = {}
}

SL.inherit(Tnt, SL.BaseTool)

SL.extend(Tnt.prototype, {
  // Public
  // ------------------------------------------------
  name: 'tnt',

  // `endPLPhase()`
  // ------------------------------------------------
  //
  // Method that starts the tool initialization when the page load phase is
  // matched and only if the tool initialization has not been previously
  // cancelled.
  //
  // When the tool is initialized the global `targetPageParams` are updated with
  // the parameters provided in the settings.
  //
  // It is important to know that the `targetPageParams` property is not
  // overwritten instead a merging process is taking place. If a key is already
  // present then its value is updated.
  //
  // The last step is the loading of the mbox where the `mboxURL` is used.

  endPLPhase: function(pageLoadEvent) {
    if (pageLoadEvent === 'aftertoolinit') {
      this.initialize();
    }
  },

  // Private
  // ------------------------------------------------
  initialize: function() {
    SL.notify('Test & Target: Initializing', 1)
    this.initializeTargetPageParams()
    this.load()
  },

  initializeTargetPageParams: function() {
    if (window.targetPageParams) {
      this.updateTargetPageParams(
        this.parseTargetPageParamsResult(
          window.targetPageParams()
        )
      )
    }

    this.updateTargetPageParams(this.settings.pageParams)
    this.setTargetPageParamsFunction()
  },

  load: function(){
    var url = this.getMboxURL(this.settings.mboxURL)
    if (this.settings.initTool !== false){
      if (this.settings.loadSync) {
        SL.loadScriptSync(url)
        this.onScriptLoaded()
      } else {
        SL.loadScript(url, SL.bind(this.onScriptLoaded, this))
        this.initializing = true
      }
    } else {
      this.initialized = true
    }
  },

  getMboxURL: function(urlData) {
    var url = urlData
    if (SL.isObject(urlData)) {
      if (window.location.protocol === 'https:')
        url = urlData.https
      else
        url = urlData.http
    }
    if (!url.match(/^https?:/))
      return SL.basePath() + url
    else
      return url
  },

  onScriptLoaded: function(){
    SL.notify('Test & Target: loaded.', 1)

    this.flushQueue()

    this.initialized = true
    this.initializing = false
  },

  $addMbox: function(elm, evt, settings){
    var mboxGoesAround = settings.mboxGoesAround
    var styleText = mboxGoesAround + '{visibility: hidden;}'
    var styleElm = this.appendStyle(styleText)
    if (!(mboxGoesAround in this.styleElements)){
      this.styleElements[mboxGoesAround] = styleElm
    }

    if (this.initialized){
      this.$addMBoxStep2(null, null, settings)
    }else if (this.initializing){
      this.queueCommand({
        command: 'addMBoxStep2'
        , "arguments": [settings]
      }, elm, evt)
    }
  },
  $addMBoxStep2: function(elm, evt, settings){
    var mboxID = this.generateID()
    var self = this
    SL.addEventHandler(window, 'load', SL.bind(function(){
      SL.cssQuery(settings.mboxGoesAround, function(elms){
        var elem = elms[0]
        if (!elem) return
        var newDiv = document.createElement("div")
        newDiv.id = mboxID
        elem.parentNode.replaceChild(newDiv, elem)
        newDiv.appendChild(elem)
        window.mboxDefine(mboxID, settings.mboxName)
        var args = [settings.mboxName]
        if (settings.arguments){
          args = args.concat(settings.arguments)
        }
        window.mboxUpdate.apply(null, args)
        self.reappearWhenCallComesBack(elem, mboxID, settings.timeout, settings)
      });
    }, this))
    this.lastMboxID = mboxID // leave this here for easier testing
  },

  $addTargetPageParams: function(elm, evt, pageParams) {
    this.updateTargetPageParams(pageParams)
  },

  generateID: function(){
    var id = '_sdsat_mbox_' + String(Math.random()).substring(2) + '_'
    return id
  },
  appendStyle: function(css){
    var head = document.getElementsByTagName('head')[0], 
        style = document.createElement('style');
        
    style.type = 'text/css';
    if(style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    
    head.appendChild(style);
    return style;
  },
  reappearWhenCallComesBack: function(elmGoesAround, mboxID, timeout, settings){
    var self = this

    function reappear(){
      var styleElm = self.styleElements[settings.mboxGoesAround]
      if (styleElm){
        styleElm.parentNode.removeChild(styleElm)
        ;delete self.styleElements[settings.mboxGoesAround]
      }
    }

    SL.cssQuery('script[src*="omtrdc.net"]', function(results){
      var script = results[0]
      if (script){
        SL.scriptOnLoad(script.src, script, function(){
          SL.notify('Test & Target: request complete', 1)
          reappear()
          clearTimeout(timeoutID)
        })
        var timeoutID = setTimeout(function(){
          SL.notify('Test & Target: bailing after ' + timeout + 'ms', 1)
          reappear()
        }, timeout)
      }else{
        SL.notify('Test & Target: failed to find T&T ajax call, bailing', 1)
        reappear()
      }
    })
  },

  updateTargetPageParams: function(obj) {
    var o = {}
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        o[SL.replace(key)] = SL.replace(obj[key])
      }
    }
    SL.extend(
      this.targetPageParamsStore,
      o
    )
  },

  getTargetPageParams: function() {
    return this.targetPageParamsStore
  },

  setTargetPageParamsFunction: function() {
    window.targetPageParams = SL.bind(this.getTargetPageParams, this)
  },

  parseTargetPageParamsResult: function(data) {
    var result = data

    if(SL.isArray(data)) {
      data = data.join('&')
    }

    if (SL.isString(data)) {
      result = SL.parseQueryParams(data)
    }

    return result
  }
})
SL.availableTools.tnt = Tnt

// The Default Tool
// ================
//
// The default tool comes with several handy utilities.

function DefaultTool(){
  SL.BaseTool.call(this)

  this.asyncScriptCallbackQueue = []
  this.argsForBlockingScripts = []
}
SL.inherit(DefaultTool, SL.BaseTool)
SL.extend(DefaultTool.prototype, {
  name: 'Default',

  // `loadIframe(src, variables)`
  // ----------------------------
  //
  // Dynamically create an iframe to load a URL.
  //
  // - src - the URL to load
  // - variables - an object literal of which the key/value pairs will be used
  //      to create the query string to use in the src URL
  $loadIframe: function(elm, evt, options){
    var pages = options.pages
      , loadOn = options.loadOn
    var doit = SL.bind(function(){
      SL.each(pages, function(page){
        this.loadIframe(elm, evt, page)
      }, this)
    }, this)
    if (!loadOn) doit()
    if (loadOn === 'domready') SL.domReady(doit)
    if (loadOn === 'load') SL.addEventHandler(window, 'load', doit)
  },

  loadIframe: function(elm, evt, page){
    var iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    var host = SL.data.host
      , data = page.data
      , src = this.scriptURL(page.src)
      , search = SL.searchVariables(data, elm, evt)
    if (host)
      src = SL.basePath() + src
    src += search
    iframe.src = src
    var body = document.getElementsByTagName('body')[0]
    if (body)
      body.appendChild(iframe)
    else
      SL.domReady(function(){
        document.getElementsByTagName('body')[0].appendChild(iframe)
      })
  },

  scriptURL: function(url){
    var scriptDir = SL.settings.scriptDir || ''
    return scriptDir + url
  },

  // `loadScript(options)
  // ------------------------------
  //
  // Load any number of Javascript files using dynamically generated script tags.
  // If you provide multiple file URLs, they will be loaded sequentially.
  $loadScript: function(elm, evt, options){
    var scripts = options.scripts
      , sequential = options.sequential
      , loadOn = options.loadOn
    var doit = SL.bind(function(){
      if (sequential){
        this.loadScripts(elm, evt, scripts)
      }else{
        SL.each(scripts, function(script){
          this.loadScripts(elm, evt, [script])
        }, this)
      }
    }, this)

    if (!loadOn) doit()
    else if (loadOn === 'domready') SL.domReady(doit)
    else if (loadOn === 'load') SL.addEventHandler(window, 'load', doit)
  },

  loadScripts: function(elm, evt, scripts) {
    try{
    var scripts = scripts.slice(0)
      , q = this.asyncScriptCallbackQueue
      , lastScript
      , target = evt.target || evt.srcElement
      , self = this
    }catch(e){
      console.error('scripts is', SL.stringify(scripts))
    }
    function loadNext(){
      if (q.length > 0 && lastScript){
        var callback = q.shift()
        callback.call(elm, evt, target)
      }
      var script = scripts.shift()
      if (script){
        var host = SL.data.host
          , src = self.scriptURL(script.src)
        if (host)
          src = SL.basePath() + src
        lastScript = script
        SL.loadScript(src, loadNext)
      }
    }
    loadNext()
  },

  $loadBlockingScript: function(elm, evt, options){
    var scripts = options.scripts
      , loadOn = options.loadOn
    var doit = SL.bind(function(){
      SL.each(scripts, function(script){
        this.loadBlockingScript(elm, evt, script)
      }, this)
    }, this)
    //if (!loadOn || loadOn === evt.type) doit()
    doit()
  },

  loadBlockingScript: function(elm, evt, script){
    /*jshint evil:true */
    var src = this.scriptURL(script.src)
      , host = SL.data.host
      , target = evt.target || evt.srcElement
    if (host)
      src = SL.basePath() + src
    this.argsForBlockingScripts.push([elm, evt, target])
    SL.loadScriptSync(src)
  },

  pushAsyncScript: function(callback){
    this.asyncScriptCallbackQueue.push(callback)
  },

  pushBlockingScript: function(callback){
    var args = this.argsForBlockingScripts.shift()
    var element = args[0]
    callback.apply(element, args.slice(1))
  },

  // `writeHTML(html)`
  // -----------------
  //
  // Write an HTML fragment onto the page using `document.write()`.
  //
  // - `html` - the HTML fragment
  $writeHTML: SL.escapeHtmlParams(function(elm, evt){
    /*jshint evil:true */
    if (SL.domReadyFired || !document.write){
      SL.notify('Command writeHTML failed. You should try appending HTML using the async option.', 1)
      return
    }
    if (evt.type !== 'pagebottom' && evt.type !== 'pagetop'){
      SL.notify('You can only use writeHTML on the `pagetop` and `pagebottom` events.', 1)
      return
    }
    for (var i = 2, len = arguments.length; i < len; i++){
      var html = arguments[i].html
      html = SL.replace(html, elm, evt)
      document.write(html)
    }
  }),

  linkNeedsDelayActivate: function(a, win){
    win = win || window
    var tagName = a.tagName
      , target = a.getAttribute('target')
      , location = a.getAttribute('href')
    if (tagName && tagName.toLowerCase() !== 'a')
      return false
    if (!location)
      return false
    else if (!target)
      return true
    else if (target === '_blank')
      return false
    else if (target === '_top')
      return win.top === win
    else if (target === '_parent')
      return false
    else if (target === '_self')
      return true
    else if (win.name)
      return target === win.name
    else
      return true
  },

  // `delayActivateLink()`
  // ---------------------
  //
  // Delay the activation of an anchor link by first using `evt.preventDefault()` on
  // the click event, and then setting the window location to the destination after
  // a small delay. The default delay is 100 milliseconds, which can be configured in
  // `_satellite.settings.linkDelay`
  $delayActivateLink: function(elm, evt){
    if (!this.linkNeedsDelayActivate(elm)) return
    SL.preventDefault(evt)
    var linkDelay = SL.settings.linkDelay || 100
    setTimeout(function(){
      SL.setLocation(elm.href)
    }, linkDelay)
  },

  isQueueable: function(trig){
    return trig.command !== 'writeHTML'
  }
})
SL.availableTools['default'] = DefaultTool

// Adobe Analytics Tool
// ================
//
// This tool interacts with the [AppMeasurement library](http://microsite.omniture.com/t2/help/en_US/sc/appmeasurement/release/c_release_notes_mjs.html)
//
// Beside the settings that are processed by the BaseTool code, this tool uses
// the following extra settings:
//
// - `engine` - The engine identifier (sc)
// - `initVars` - It's an array containing key/value pair of AppMeasurement's
//      properties that are used in tracking and for settings. An example of
//      such pair would be: `{ eVar6: "6", server: "tracking.server"}`. For a
//      list of all supported properties please consult the [AppMeasurement's
//      documentation](http://microsite.omniture.com/t2/help/en_US/sc/implement/sc_variables.html).
// - `initTool` - Boolean flag that can suppress the tool initialization phase.
//      When set to `false` no JS library will be loaded and no initial command
//      will be executed. All the later commands triggered by this tool will
//      piggy back on any availble `ga` function from the page.
// - `sCodeURL` - Custom URL of the AppMeasurement Javascript library URL
//      location.
// - `loadOn` - The PL phase when this tool will be initialized (top | bottom)
// - `account` - String containing the report suite ID to track to.
// - `skipSetAccount` - Boolean value that when true disables setting
//      of the `account` with the value provided in settings. Default value
//      is no being set.
// - `euCookie' - Please see the description on SL (core.js) code
// - `renameS` - String specifying the name of the global AppMeasurement
//      instance. If no provided `s` is implied.
// - `executeCustomPageCodeFirst` - Boolean flag that lets the custom
//      initialization code be executed before or after the `initVars` method
//      call. Default value is not set which means false.
// - `customInit` - JS code that will be executed immediately after the tool is
//      initialized. The boolean result from `customInit` will affect the
//      initial page view call. A false value results in disabling the initial
//      page view tracking call.
//
// The SiteCatalystTool allows to set variables, add events, track link, etc.
// Example:
//
//      trigger: [
//          {
//              tool: "sc",
//              command: "trackLink"
//          }
//      ]
//
function SiteCatalystTool(settings){
  SL.BaseTool.call(this, settings)

  this.varBindings = {}
  this.events = []
  this.products = []
  this.customSetupFuns = []
}
SL.inherit(SiteCatalystTool, SL.BaseTool)
SL.extend(SiteCatalystTool.prototype, {
  // Public
  // ------------------------------------------------
  name: 'SC',

  // `endPLPhase()`
  // ------------------------------------------------
  //
  // Method that starts the tool initialization when the page load phase is
  // matched and only if the tool initialization has not been previously
  // cancelled. Find out more info about the initializing sequence by clicking
  // [here](#-initialize-).
  //
  // After the tool is initialized a page view call is triggered if
  // `suppressInitialPageView` flag is not set to `true`.
  endPLPhase: function(pageLoadEvent){
    var loadOn = this.settings.loadOn
    if (pageLoadEvent === loadOn){
      this.initialize(pageLoadEvent)
    }
  },

  // Private
  // ------------------------------------------------

  // `initialize()`
  // ------------------------------------------------
  //
  // The method first check to see if the default initialization is specifically
  // canceled.
  //
  // Then it sets an event listener on `pageLoadeEvent` to update the tracking
  // variables with the ones provided in `initVars` setting object.
  //
  // In case that the user chosen to provide the Javascript code for
  // AppMeasurement by himself instead of using the automatic management
  // then we wait for the library to load.
  //
  // Otherwise we load the AppMeasurement from the storage and then set the
  // setup variables on the tracker object.
  initialize: function(pageLoadEvent){
    if (this._cancelToolInit) return
    this.settings.initVars = this.substituteVariables(
      this.settings.initVars, { type: pageLoadEvent }
    )

    if (this.settings.initTool !== false){
      var url = this.settings.sCodeURL || SL.basePath() + 's_code.js'
      if (typeof url === 'object'){
        if (window.location.protocol === 'https:')
          url = url.https
        else
          url = url.http
      }
      if (!url.match(/^https?:/))
        url = SL.basePath() + url
      if (this.settings.initVars){
        this.$setVars(null, null, this.settings.initVars)
      }
      SL.loadScript(url, SL.bind(this.onSCodeLoaded, this))
      this.initializing = true
    }else{
      // Set to initializing because we are
      // waiting on the AppMeasurement/s_code library to be loaded by
      // the site and we'll detect the completion of the load
      // in a background task.
      this.initializing = true
      this.pollForSC()
    }
  },

  // `getS(s, options)`
  // ------------------------------------------------
  //
  // The method initializes the `s` object.
  //
  // A notificaiton is given and `null` is returned in case of not finding
  // the account/RSID.
  //
  // If Marketing Cloud Visitor ID Service is used that instance is linked
  // with the instatiated `s` object.
  getS: function(s, options){
    var hostname = options && options.hostname || window.location.hostname
    var varBindings = this.concatWithToolVarBindings(
      options && options.setVars || this.varBindings
    )
    var events = options && options.addEvent || this.events
    var acct = this.getAccount(hostname)
    var s_gi = window.s_gi
    if (!s_gi) return null
    if (!this.isValidSCInstance(s)) s = null
    if (!acct && !s) {
      SL.notify('Adobe Analytics: tracker not initialized because account was not found', 1)
      return null
    }
    var s = s || s_gi(acct)

    var DTMversion = 'D' + SL.appVersion;
    if(typeof s.tagContainerMarker !== 'undefined') {
      s.tagContainerMarker = DTMversion
    } else {
      if (typeof s.version === 'string' &&
        s.version.substring(s.version.length - 5) !==
          ('-' + DTMversion)){
        s.version += '-' + DTMversion
      }
    }

    if (s.sa && this.settings.skipSetAccount !== true && this.settings.initTool !== false) s.sa(this.settings.account)
    this.applyVarBindingsOnTracker(s, varBindings)
    if (events.length > 0)
      s.events = events.join(',')

    var visitorIdInstance = SL.getVisitorId()
    if (visitorIdInstance) {
      s.visitor = SL.getVisitorId()
    }

    return s
  },

  // `onSCodeLoaded()`
  // ------------------------------------------------
  //
  // The method triggers load event on Analytics tool so all subsequent and
  // listening methods would be properly triggered.
  //
  // Before cleaning up the queue the tracking beacon call is made.
  onSCodeLoaded: function(loaded_manually){
    this.initialized = true
    this.initializing = false

    var msg = [
      'Adobe Analytics: loaded',
      loaded_manually ? ' (manual)' : '',
      '.'
    ]
    SL.notify(msg.join(''), 1)

    SL.fireEvent(this.id + '.load', this.getS())

    if (!loaded_manually) {
      this.flushQueueExceptTrackLink()
      this.sendBeacon()
    }

    this.flushQueue()
  },

  // `getAccount(hostname)`
  // ------------------------------------------------
  //
  // The returns the `s_account` for a specified `hostname`
  //
  // TODO: need to be refactored because `accountByHost` is no longer used.
  getAccount: function(hostname){
    if (window.s_account){
      return window.s_account
    }
    if (hostname && this.settings.accountByHost){
      return this.settings.accountByHost[hostname] || this.settings.account
    }else{
      return this.settings.account
    }
  },

  // `getTrackingServer()`
  // ------------------------------------------------
  //
  // The method tries to retrieve the tracking server from the `s` object
  // otherwise falls back on generating one based on the `account`.
  //
  // If neither `account` or `trackingServer` are availalble, `null` is
  // returned.
  //
  // TODO: need to be refactored to remove the tracking server generate method
  // as Analytics now offers a central point to shoot to.
  getTrackingServer: function(){
    var tool = this
    var s = tool.getS()
    if (s) {
      if (s.ssl && s.trackingServerSecure) {
        return s.trackingServerSecure
      }
      else if (s.trackingServer) {
        return s.trackingServer
      }
    }
    var account = tool.getAccount(window.location.hostname)
    if (!account) return null
    // Based on code in app measurement.
    var w
    var c = ''
    var d = s && s.dc
    var e
    var f
    w = account
    e = w.indexOf(",")
    e >= 0 && (w = w.gb(0, e))
    w = w.replace(/[^A-Za-z0-9]/g, "")
    c || (c = "2o7.net")
    d = d ? ("" + d).toLowerCase() : "d1"
    c == "2o7.net" && (d == "d1" ? d = "112" : d == "d2" && (d = "122"), f = "")
    e = w + "." + d + "." + f + c
    return e
  },

  // `sendBeacon()`
  // ------------------------------------------------
  //
  // The method triggers the tracking call.
  //
  // If custom initialization is used the beacon is supressed. Also, if custom
  // code is provided and specifically stated that it should be executed first
  // (`executeCustomPageCodeFirst`) the tracker get updated with the result of
  // the code.
  sendBeacon: function(){
    var s = this.getS(window[this.settings.renameS || 's'])
    if (!s){
      SL.notify('Adobe Analytics: page code not loaded', 1)
      return
    }
    if (this.settings.customInit){
      if (this.settings.customInit(s) === false){
        SL.notify("Adobe Analytics: custom init suppressed beacon", 1)
        return
      }
    }

    if (this.settings.executeCustomPageCodeFirst) {
      this.applyVarBindingsOnTracker(s, this.varBindings)
    }
    this.executeCustomSetupFuns(s)
    s.t()
    this.clearVarBindings()
    this.clearCustomSetup()
    SL.notify("Adobe Analytics: tracked page view", 1)
  },
  pollForSC: function(){
    SL.poll(SL.bind(function(){
      if (typeof window.s_gi === 'function'){
        this.onSCodeLoaded(true)
        return true
      }
    }, this))
  },
  flushQueueExceptTrackLink: function(){
    // Because we always s.tl() after the first s.t()
    // that way the variables set by s.tl() will not
    // contaminate the s.t() call.
    if (!this.pending) return
    var left = []
    for (var i = 0; i < this.pending.length; i++){
      var args = this.pending[i]
      var trig = args[0]
      if (trig.command === 'trackLink'){
        left.push(args)
      }else{
        this.triggerCommand.apply(this, args)
      }
    }
    this.pending = left
  },
  isQueueAvailable: function(){
    return !this.initialized
  },
  substituteVariables: function(obj, evt){
    var ret = {}
    for (var key in obj){
      if (obj.hasOwnProperty(key)) {
        var value = obj[key]
        ret[key] = SL.replace(value, location, evt)
      }
    }
    return ret
  },
  $setVars: function(elm, evt, vars){
    for (var v in vars){
      if (vars.hasOwnProperty(v)) {
        var val = vars[v]
        if (typeof val === 'function')
          val = val()
        this.varBindings[v] = val
      }
    }
    SL.notify('Adobe Analytics: set variables.', 2)
  },
  $customSetup: function(elm, evt, setup){
    this.customSetupFuns.push(function(s){
      setup.call(elm, evt, s)
    })
  },
  isValidSCInstance: function(s) {
    return !!s && typeof s.t === 'function' && typeof s.tl === 'function'
  },
  concatWithToolVarBindings: function(varBindings){
    var settingsInitVars = this.settings.initVars || {}

    SL.map(['trackingServer', 'trackingServerSecure'], function (item) {
      if (settingsInitVars[item] && !varBindings[item]) {
        varBindings[item] = settingsInitVars[item]
      }
    });

    return varBindings
  },
  applyVarBindingsOnTracker: function (s, varBindings) {
    for (var v in varBindings){
      if (varBindings.hasOwnProperty(v)) {
        s[v] = varBindings[v]
      }
    }
  },
  clearVarBindings: function(){
    this.varBindings = {}
  },
  clearCustomSetup: function(){
    this.customSetupFuns = []
  },
  executeCustomSetupFuns: function(s){
    SL.each(this.customSetupFuns, function(fun){
      fun.call(window, s)
    })
  },
  $trackLink: function(elm, evt, params){
    params = params || {}
    var type = params.type
    var linkName = params.linkName
    if (!linkName &&
      elm &&
      elm.nodeName &&
      elm.nodeName.toLowerCase() === 'a'){
      linkName = elm.innerHTML
    }
    if (!linkName){
      linkName = 'link clicked'
    }
    var vars = params && params.setVars
    var events = (params && params.addEvent) || []

    var s = this.getS(null, {
      setVars: vars,
      addEvent: events
    })

    if (!s){
      SL.notify('Adobe Analytics: page code not loaded', 1)
      return
    }

    var orgLinkTrackVars = s.linkTrackVars
    var orgLinkTrackEvents = s.linkTrackEvents
    var definedVarNames = this.definedVarNames(vars)

    if (params && params.customSetup){
      params.customSetup.call(elm, evt, s)
    }

    if (events.length > 0)
      definedVarNames.push('events')
    if (s.products)
      definedVarNames.push('products')

    // add back the vars from s
    definedVarNames = this.mergeTrackLinkVars(s.linkTrackVars, definedVarNames)

    // add back events from s
    events = this.mergeTrackLinkVars(s.linkTrackEvents, events)

    s.linkTrackVars = this.getCustomLinkVarsList(definedVarNames)

    var eventsKeys = SL.map(events, function(item) {
      return item.split(':')[0]
    });
    s.linkTrackEvents = this.getCustomLinkVarsList(eventsKeys)

    s.tl(true, type || 'o', linkName)
    SL.notify([
      'Adobe Analytics: tracked link ',
      'using: linkTrackVars=',
      SL.stringify(s.linkTrackVars),
      '; linkTrackEvents=',
      SL.stringify(s.linkTrackEvents)
    ].join(''), 1)

    s.linkTrackVars = orgLinkTrackVars
    s.linkTrackEvents = orgLinkTrackEvents
  },
  mergeTrackLinkVars: function(newVarsStr, varsArr){
    if (newVarsStr) {
      varsArr = newVarsStr.split(',').concat(varsArr)
    }

    return varsArr
  },
  getCustomLinkVarsList: function (keysArr) {
    var noneIndex = SL.indexOf(keysArr, 'None');
    if (noneIndex > -1 && keysArr.length > 1) {
      keysArr.splice(noneIndex, 1)
    }

    return keysArr.join(',');
  },
  definedVarNames: function(vars){
    vars = vars || this.varBindings
    var ret = []
    for (var varname in vars){
      if (vars.hasOwnProperty(varname) && /^(eVar[0-9]+)|(prop[0-9]+)|(hier[0-9]+)|campaign|purchaseID|channel|server|state|zip|pageType$/.test(varname))
        ret.push(varname)
    }
    return ret
  },
  $trackPageView: function(elm, evt, params){
    var vars = params && params.setVars
    var events = (params && params.addEvent) || []

    var s = this.getS(null, {
      setVars: vars,
      addEvent: events
    })

    if (!s){
      SL.notify('Adobe Analytics: page code not loaded', 1)
      return
    }
    s.linkTrackVars = ''
    s.linkTrackEvents = ''
    this.executeCustomSetupFuns(s)
    if (params && params.customSetup){
      params.customSetup.call(elm, evt, s)
    }
    s.t()
    this.clearVarBindings()
    this.clearCustomSetup()
    SL.notify("Adobe Analytics: tracked page view", 1)
  },
  $postTransaction: function(elm, evt, varname){
    var trans = SL.data.transaction = window[varname]
      , s = this.varBindings
      , mapping = this.settings.fieldVarMapping

    SL.each(trans.items, function(item){
      this.products.push(item)
    }, this)

    s.products = SL.map(this.products, function(item){
      var vars = []
      if (mapping && mapping.item){
        for (var field in mapping.item){
          if (mapping.item.hasOwnProperty(field)) {
            var varname = mapping.item[field]
            vars.push(varname + '=' + item[field])
            if (varname.substring(0, 5) === 'event')
              this.events.push(varname)
          }
        }
      }
      var arr = ['', item.product, item.quantity, item.unitPrice * item.quantity]
      if (vars.length > 0)
        arr.push(vars.join('|'))
      return arr.join(';')
    }, this).join(',')

    if (mapping && mapping.transaction){
      // Add top-level events/eVars to products string.
      var topLevelVars = []
      for (var field in mapping.transaction){
        if (mapping.transaction.hasOwnProperty(field)) { 
          var varname = mapping.transaction[field]
          topLevelVars.push(varname + '=' + trans[field])
          if (varname.substring(0, 5) === 'event')
            this.events.push(varname)
        }
      }
      if (s.products.length > 0)
        s.products += ','
      s.products += ';;;;' + topLevelVars.join('|')
    }


  },
  $addEvent: function(elm, evt){
    for (var i = 2, len = arguments.length; i < len; i++){
      this.events.push(arguments[i])
    }
  },
  $addProduct: function(elm, evt){
    for (var i = 2, len = arguments.length; i < len; i++){
      this.products.push(arguments[i])
    }
  }

})
SL.availableTools.sc = SiteCatalystTool

// Basic Tool
// ------------
//
// This is a generic tool that allows integrating with
// various simple tools.
//

function BasicTool(settings){
  SL.BaseTool.call(this, settings)

  this.name = settings.name || 'Basic'
}

SL.inherit(BasicTool, SL.BaseTool)

SL.extend(BasicTool.prototype, {
  initialize: function(){
    var settings = this.settings
    if (this.settings.initTool !== false){
      var url = settings.url
      if (typeof url === 'string'){
        url = SL.basePath() + url
      }else{
        url = SL.isHttps() ? url.https : url.http
      }
      SL.loadScript(url, SL.bind(this.onLoad, this))
      this.initializing = true
    }else{
      this.initialized = true
    }
  },
  isQueueAvailable: function(){
    return !this.initialized
  },
  onLoad: function(){
    this.initialized = true
    this.initializing = false
    if (this.settings.initialBeacon){
      this.settings.initialBeacon()
    }
    this.flushQueue()
  },
  endPLPhase: function(pageLoadEvent){
    var loadOn = this.settings.loadOn
    if (pageLoadEvent === loadOn){
      SL.notify(this.name + ': Initializing at ' + pageLoadEvent, 1)
      this.initialize()
    }
  },
  $fire: function(elm, evt, fun){
    if (this.initializing){
      this.queueCommand({
        command: 'fire',
        arguments: [fun]
      }, elm, evt)
      return
    }
    fun.call(this.settings, elm, evt)
  }
})

SL.availableTools.am = BasicTool
SL.availableTools.adlens = BasicTool
SL.availableTools.aem = BasicTool
SL.availableTools.__basic = BasicTool

// Google Analytics Tool
// ---------------------
//
// The GATool allows you to use any Google Analytics command.
// Example:
//
//      trigger: [
//          {
//              tool: "ga",
//              command: "trackEvent",
//              arguments: [
//                  "video",
//                  "video 10% complete"
//              ]
//          }
//      ]
//
// This trigger will call the `trackEvent` method, which is equivalent to
//
//     _gaq.push(['_trackEvent', 'video', 'video 10% complete'])
function GATool(settings){
  SL.BaseTool.call(this, settings)
}
SL.inherit(GATool, SL.BaseTool)
SL.extend(GATool.prototype, {
  name: 'GA',
  initialize: function(){
    var settings = this.settings
    var before = window._gaq
      , initCommands = settings.initCommands || []
      , customInit = settings.customInit

    if (!before){
      // And yes, I *do* mean to set a global variable
      // of `_gaq` here
      _gaq = []
    }

    if (!this.isSuppressed()){
      if (!before && !GATool.scriptLoaded){
        var https = SL.isHttps()
        var url =
          (https ? 'https://ssl' : 'http://www') +
          '.google-analytics.com/ga.js'
        if (settings.url){
          url = https ? settings.url.https : settings.url.http
        }
        SL.loadScript(url)
        GATool.scriptLoaded = true
        SL.notify('GA: page code loaded.', 1)
      }
      var domain = settings.domain
        , trackerName = settings.trackerName
        , allowLinker = GAUtils.allowLinker()
        , account = SL.replace(settings.account, location)
        , domainList = SL.settings.domainList || []
      _gaq.push([this.cmd('setAccount'), account])
      if (allowLinker)
        _gaq.push([this.cmd('setAllowLinker'), allowLinker])
      _gaq.push([this.cmd('setDomainName'), GAUtils.cookieDomain()])
      SL.each(initCommands, function(cmd){
        var arr = [this.cmd(cmd[0])].concat(SL.preprocessArguments(cmd.slice(1), location, null, this.forceLowerCase))
        _gaq.push(arr)
      }, this)
      if (customInit)
        this.suppressInitialPageView = false === customInit(_gaq, trackerName)
      if (settings.pageName)
        this.$overrideInitialPageView(null, null, settings.pageName)
    }else{
      SL.notify('GA: page code not loaded(suppressed).', 1)
    }

    this.initialized = true
    SL.fireEvent(this.id + '.configure', _gaq, trackerName)

  },
  isSuppressed: function(){
    return this._cancelToolInit || this.settings.initTool === false
  },
  tracker: function(){
    return this.settings.trackerName
  },
  cmd: function(cmd){
    var tracker = this.tracker()
    return tracker ? tracker + '._' + cmd : '_' + cmd
  },
  $overrideInitialPageView: function(elm, evt, url){
    this.urlOverride = url
  },
  trackInitialPageView: function(){
    if (this.isSuppressed()) return
    if (this.suppressInitialPageView) return
    if (this.urlOverride){
      var args = SL.preprocessArguments([this.urlOverride], location, null, this.forceLowerCase)
      this.$missing$('trackPageview', null, null, args)
    }else{
      this.$missing$('trackPageview')
    }
  },
  endPLPhase: function(pageLoadEvent){
    var loadOn = this.settings.loadOn
    if (pageLoadEvent === loadOn){
      SL.notify('GA: Initializing at ' + pageLoadEvent, 1)
      this.initialize()
      this.flushQueue()
      this.trackInitialPageView()
    }
  },
  call: function(cmd, elm, evt, args){
    if (this._cancelToolInit) return
    var settings = this.settings
      , tracker = this.tracker()
      , fullCmd = this.cmd(cmd)
      , args = args ? [fullCmd].concat(args) : [fullCmd]
    _gaq.push(args)
    if (tracker)
      SL.notify("GA: sent command " + cmd + " to tracker " + tracker +
        (args.length > 1 ?
          " with parameters [" + args.slice(1).join(', ') + "]" :
          '') + ".", 1)
    else
      SL.notify("GA: sent command " + cmd +
        (args.length > 1 ?
          " with parameters [" + args.slice(1).join(', ') + "]":
          '') + ".", 1)
  },
  $missing$: function(cmd, elm, evt, args){
    this.call(cmd, elm, evt, args)
  },
  // individual command methods
  $postTransaction: function(elm, evt, varname){
    var trans = SL.data.customVars.transaction = window[varname]
    this.call('addTrans', elm, evt, [
      trans.orderID,
      trans.affiliation,
      trans.total,
      trans.tax,
      trans.shipping,
      trans.city,
      trans.state,
      trans.country
    ])
    SL.each(trans.items, function(item){
      this.call('addItem', elm, evt, [
        item.orderID,
        item.sku,
        item.product,
        item.category,
        item.unitPrice,
        item.quantity
      ])
    }, this)
    this.call('trackTrans', elm, evt)
  },
  delayLink: function(elm, evt){
    var ga = this
    if (!GAUtils.allowLinker()) return
    if (!elm.hostname.match(this.settings.linkerDomains)) return
    if (SL.isSubdomainOf(elm.hostname, location.hostname)) return
    SL.preventDefault(evt)
    var linkDelay = SL.settings.linkDelay || 100
    setTimeout(function(){
      ga.call('link', elm, evt, [elm.href])
    }, linkDelay)
  },
  popupLink: function(elm, evt){
    if (!window._gat) return
    SL.preventDefault(evt)
    var account = this.settings.account
    var tracker = window._gat._createTracker(account)
    var url = tracker._getLinkerUrl(elm.href)
    window.open(url)
  },
  $link: function(elm, evt){
    if (elm.getAttribute('target') === '_blank'){
      this.popupLink(elm, evt)
    }else{
      this.delayLink(elm, evt)
    }
  },
  $trackEvent: function(elm, evt){
    var args = Array.prototype.slice.call(arguments, 2)
    if (args.length >= 4 && args[3] != null){
      // acertain that the 4th element is a number, falling back to 1
      var value = parseInt(args[3], 10)
      if (SL.isNaN(value)){
        value = 1
      }
      args[3] = value
    }
    this.call('trackEvent', elm, evt, args)
  }
})
SL.availableTools.ga = GATool

var GAUtils = {
  allowLinker: function() {
    return SL.hasMultipleDomains();
  },
  cookieDomain: function() {
    var domainList = SL.settings.domainList;
    var domainName = SL.find(domainList, function(domain) {
      var hostname = window.location.hostname;
      return SL.equalsIgnoreCase(
        hostname.slice(hostname.length - domain.length),
        domain);
    });
    var cookieDomain = domainName ? ('.' + domainName) : 'auto';

    return cookieDomain;
  }
};

// The Google Analytics Universal Tool
// ================
//
// This tool interacts with the [GAU library](https://developers.google.com/analytics/devguides/collection/analyticsjs/).
//
// From a high end perspective the following steps will happen. A `ga` dummy
// object will be initialized. Until the `analytics.js` file will be loaded in
// the browser, any triggered command will be queued in the `ga` object. Once
// the `analytics.js` will finish to load, all the queued commands will be
// executed.
//
// The tool is initialized during one of the following page load phases:
// top, bottom. Find out more info about the initializing sequence by clicking
// [here](#-endplphase-).
//
// Data elements are replaced when the tracker is created and on the commands
// from `initCommands` array. For the other situations, the data elements are
// replaced in the `triggerCommand` method from BaseTool.
//
// Beside the settings that are processed by the BaseTool code, this tool uses
// the following extra settings:
//
// - `engine` - The engine identifier (ga_universal)
// - `loadOn` - The PL phase when this tool will be initialized (top | bottom)
// - `url` - Custom URL of the `analytics.js` URL location. If none is provided
//      the Google default URL will be used.
// - `initTool` - Boolean flag that can suppress the tool initialization phase.
//      When set to `false` no JS library will be loaded and no initial command
//      will be executed. All the later commands triggered by this tool will
//      piggy back on any availble `ga` function from the page.
// - `trackerSettings` - Object containing properties that will be added on the
//      command that will create the GAU tracker. For a list of all supported
//      properties please click [here](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#create)
// - `initCommands` - It's an array containing commands. A command example:
//      `["set", "anonymizeIp", true]`. For a list of all supported commands
//      please click [here](https://developers.google.com/analytics/devguides/collection/analyticsjs/method-reference#tracker)
//      The commands defined here will be executed after the tracker is created.
// - `allowLinker` - Flag that will make the GAU library load the cross domain
//      linking plugin.
// - `customInit` - JS code that will be executed immediately after the tool is
//      initialized. The boolean result from `customInit` will affect the
//      initial page view call.

function GAUniversalTool(settings) {
  SL.BaseTool.call(this, settings)
}

SL.inherit(GAUniversalTool, SL.BaseTool);

SL.extend(GAUniversalTool.prototype, {
  // Public
  // ------------------------------------------------
  name: 'GAUniversal',

  // `endPLPhase()`
  // ------------------------------------------------
  //
  // Method that starts the tool initialization when the page load phase is
  // matched and only if the tool initialization has not been previously
  // cancelled. Find out more info about the initializing sequence by clicking
  // [here](#-initialize-).
  //
  // After the tool is initialized a page view call is triggered if
  // `suppressInitialPageView` flag is not set to `true`.
  endPLPhase: function(pageLoadEvent) {
    var settings = this.settings;
    var loadOn = settings.loadOn;

    if (pageLoadEvent === loadOn) {
      SL.notify('GAU: Initializing at ' + pageLoadEvent, 1);
      this.initialize();
      this.flushQueue();
      this.trackInitialPageView();
    }
  },

  // `getTrackerName()`
  // ------------------------------------------------
  //
  // Returns the name of the GA tracker initialized by this tool.
  getTrackerName: function () {
    return this.settings.trackerSettings.name || '';
  },

  // Private
  // ------------------------------------------------
  isPageCodeLoadSuppressed: function() {
    return this.settings.initTool === false || this._cancelToolInit === true;
  },

  // `initialize()`
  // ------------------------------------------------
  //
  // The method first creates the GA scaffolding objects (the `ga` object and
  // the `GoogleAnalyticsObject` object.
  //
  // Then it loads the `analytics.js` library and append the command that will
  // create the GAU tracker object to the `ga` object.
  //
  // Next, the commands from the `initCommands` array will be appended to
  // the `ga` object. Finally the JS code defined in the `customInit` setting
  // variable will be called.
  initialize: function() {
    if (this.isPageCodeLoadSuppressed()) {
      this.initialized = true;
      SL.notify('GAU: Page code not loaded (suppressed).', 1);
      return;
    }

    var gaName = 'ga';

    window[gaName] = window[gaName] || this.createGAObject();
    window.GoogleAnalyticsObject = gaName;

    SL.notify('GAU: Page code loaded.', 1);
    SL.loadScriptOnce(this.getToolUrl());

    var settings = this.settings;

    if (GAUtils.allowLinker() && settings.allowLinker !== false) {
      this.createAccountForLinker();
    } else {
      this.createAccount();
    }

    this.executeInitCommands();

    if (settings.customInit){
      var customInit = settings.customInit
      var result = customInit(window[gaName], this.getTrackerName())
      if (result === false){
        this.suppressInitialPageView = true;
      }
    }

    this.initialized = true;
  },

  createGAObject: function() {
    var ga = function() {
      ga.q.push(arguments);
    };

    ga.q = [];
    ga.l = 1 * new Date();
    return ga;
  },

  createAccount: function() {
    this.create();
  },

  createAccountForLinker: function() {
    var options = {};
    if (GAUtils.allowLinker())
      options.allowLinker = true;

    this.create(options);
    this.call('require', 'linker');
    this.call('linker:autoLink', this.autoLinkDomains(), false, true);
  },

  create: function(extra){
    var options = this.settings.trackerSettings;
    options =
      SL.preprocessArguments([options], location, null, this.forceLowerCase)[0];
    options.trackingId =
      SL.replace(this.settings.trackerSettings.trackingId, location);

    if (!options.cookieDomain) {
      options.cookieDomain = GAUtils.cookieDomain();
    }

    SL.extend(options, extra || {});
    this.call('create', options);
  },

  autoLinkDomains: function() {
    var ourDomain = location.hostname;
    return SL.filter(SL.settings.domainList, function(domain) {
      return domain !== ourDomain;
    });
  },

  executeInitCommands: function() {
    var settings = this.settings;

    if (settings.initCommands) {
      SL.each(settings.initCommands, function(command) {
        var args = command.splice(2, command.length - 2);
        command = command.concat(
          SL.preprocessArguments(args, location, null, this.forceLowerCase)
        );
        this.call.apply(this, command);
      }, this);
    }
  },

  trackInitialPageView: function(){
    if (this.suppressInitialPageView || this.isPageCodeLoadSuppressed()) {
      return;
    }

    this.call('send', 'pageview');
  },

  call: function() {
    if (typeof ga !== 'function') {
      SL.notify('GA Universal function not found!', 4);
      return;
    }

    if (this.isCallSuppressed()) {
      return;
    }

    arguments[0] = this.cmd(arguments[0]);
    this.log(SL.toArray(arguments));
    ga.apply(window, arguments);
  },

  isCallSuppressed: function() {
    return this._cancelToolInit === true;
  },

  $missing$: function(command, elm, evt, args) {
    args = args || [];

    args = [command].concat(args);
    this.call.apply(this, args);
  },

  getToolUrl: function() {
    var settings = this.settings;
    var isHttps = SL.isHttps();

    if (settings.url) {
      return isHttps ? settings.url.https : settings.url.http;
    }

    return (isHttps ? 'https://ssl' : 'http://www') + '.google-analytics.com/analytics.js';
  },

  cmd: function(command) {
    var trackerCommands = ['send', 'set', 'get'];
    var trackerName = this.getTrackerName();

    if (!trackerName || SL.indexOf(trackerCommands, command) === -1) {
      return command;
    }

    return trackerName + '.' + command;
  },

  log: function(args) {
    var cmd = args[0];
    var tracker = this.getTrackerName() || 'default';

    var msg = 'GA Universal: sent command ' + cmd + ' to tracker ' + tracker;
    if (args.length > 1) {
      var parameters = SL.stringify(args.slice(1));
      msg += ' with parameters ' + SL.stringify(args.slice(1));
    }
    msg += '.';
    SL.notify(msg, 1);
  }
});

SL.availableTools.ga_universal = GAUniversalTool;

// The Marketing Cloud Visitor ID Service Tool
// ================
//
// This tool interacts with the [Visitor ID library](https://git.corp.adobe.com/mc-visitor/VisitorAPI/tree/master/js/src).
// The tool initilizes the Visitor ID library as soon as the tool itself is
// created, by calling the `initialize` method. Find out more info about the
// initializing sequence by clicking [here](#-initialize-).
//
// The tool accepts the following settings:
//
// - `mcOrgId` - The Adobe Marketing Cloud Organization ID (Required)
// - `initVars` - Map containing properties that can be set on the Visitor ID
//      instance. The following keys can be set here:
//      * `trackingServer`,
//      * `trackingServerSecure`,
//      * `marketingCloudServer`
//      * `marketingCloudServerSecure`
// - `customerIDs` - Map containing Customer IDs values that will be set on the
//      instance
// - `autoRequest` - Flag that will read the Marketing Cloud Visitor ID by
//      calling `getMarketingCloudVisitorID` method
function VisitorIdTool(settings) {
  SL.BaseTool.call(this, settings);
  this.name = settings.name || 'VisitorID';

  this.initialize();
}

SL.extend(VisitorIdTool.prototype, {
  // Public
  // ------------------------------------------------
  //
  // `getInstance()`
  // ------------------------------------------------
  //
  // Returns the Visitor ID instance that was created when the tool was
  // initialized.
  getInstance: function() {
    return this.instance;
  },

  // Private
  // ------------------------------------------------
  //
  // `initialize()`
  // ------------------------------------------------
  //
  // The method creates a Visitor ID instance if all the data provided is valid.
  // The instance will contain all the keys defined in the `initVar` setting.
  // Any `dataElement` present as a value in the initVars map will be replaced
  // with the correct value.
  //
  // It applies then a the map of Customer IDs by calling the `setCustomerIDs`
  // method from the newly created instance. Any `dataElement` present as a
  // value in the Customer IDs map will be replaced with the correct value.
  //
  // After that, the `getMarketingCloudVisitorID` method from the newly created
  // instance is called, provided that the `autoRequest` settings is set to true.
  initialize: function() {
    var settings = this.settings, visitor;

    SL.notify('Visitor ID: Initializing tool', 1);

    visitor = this.createInstance(
      settings.mcOrgId,
      settings.initVars
    );
    if (visitor === null) {
      return;
    }

    if (settings.customerIDs) {
      this.applyCustomerIDs(visitor, settings.customerIDs);
    }

    if (settings.autoRequest) {
      visitor.getMarketingCloudVisitorID();
    }

    this.instance = visitor;
  },

  createInstance: function(mcOrgId, initVars) {
    if(!SL.isString(mcOrgId)) {
      SL.notify(
        'Visitor ID: Cannot create instance using mcOrgId: "' + mcOrgId + '"', 4);
      return null;
    }

    mcOrgId = SL.replace(mcOrgId);
    SL.notify(
      'Visitor ID: Create instance using mcOrgId: "' + mcOrgId + '"', 1);

    initVars = this.parseValues(initVars);
    var instance = Visitor.getInstance(mcOrgId, initVars);
    SL.notify('Visitor ID: Set variables: ' + SL.stringify(initVars), 1);

    return instance;
  },

  applyCustomerIDs: function(instance, ids) {
    var parsedIds = this.parseIds(ids);
    instance.setCustomerIDs(parsedIds);
    SL.notify('Visitor ID: Set Customer IDs: ' + SL.stringify(parsedIds), 1);
  },

  parseValues: function(hash) {
    if (SL.isObject(hash) === false) {
      return {};
    }

    var obj = {};

    for (var v in hash) {
      if (hash.hasOwnProperty(v)) {
        obj[v] = SL.replace(hash[v]);
      }
    }

    return obj;
  },

  parseIds: function(hash) {
    var parsedIds = {};
    if (SL.isObject(hash) === false) {
      return {};
    }

    for (var v in hash) {
      if (hash.hasOwnProperty(v)) {
        var id = SL.replace(hash[v]['id']);
        // All IDs should be data elements. If no replacement has taken place,
        // then we can conclude that the data element doesn't exists.
        // Also we should ignore existing data elements that are empty.
        if (id !== hash[v]['id'] && id) {
          parsedIds[v] = {};
          parsedIds[v]['id'] = id;
          parsedIds[v]['authState'] = Visitor.AuthState[hash[v]['authState']];
        }
      }
    }

    return parsedIds;
  }
});

SL.availableTools.visitor_id = VisitorIdTool;

_satellite.init({
  "tools": {
    "172e7c297bc09100207ca8bd65f3dbe7": {
      "engine": "sc",
      "loadOn": "pagebottom",
      "account": "mathglobaltest",
      "euCookie": false,
      "sCodeURL": "d0cc0600946eb3957f703b9fe43c3590597a8c2c/s-code-contents-73da148cb454c4f6e395aa8df704854c99540662.js",
      "renameS": "s",
      "initVars": {
        "charSet": "UTF-8",
        "server": "%server%",
        "currencyCode": "USD",
        "visitorNamespace": "mathworks",
        "trackingServer": "%trackingServer%",
        "trackingServerSecure": "%trackingServerSecure%",
        "cookieDomainPeriods": "%fpCookieDomainPeriods%",
        "fpCookieDomainPeriods": "%fpCookieDomainPeriods%",
        "campaign": "%campaign%",
        "pageName": "%pageName%",
        "pageURL": "%pageFullUrl%",
        "channel": "%channel%",
        "trackInlineStats": true,
        "trackDownloadLinks": true,
        "linkDownloadFileTypes": "avi,bin,css,csv,dmg,doc,docx,eps,exe,jpg,js,m,m4v,mov,mp3,mpg,msg,pdf,png,ppt,pptx,rar,svg,tab,txt,vsd,vxd,wav,wma,wmv,xls,xlsx,xml,zip",
        "trackExternalLinks": true,
        "linkInternalFilters": "force.com,javascript:,mailto:,mathworks.,tel:",
        "linkLeaveQueryString": false,
        "dynamicVariablePrefix": "D=",
        "eVar65": "%visitorId%",
        "eVar4": "%mwaAuthStaus%",
        "eVar70": "%trialScenario%",
        "eVar13": "%queryStringExternalCampaignId%",
        "eVar14": "%queryStringOtherCampaignId%",
        "eVar15": "%queryStringInternalCampaignId%",
        "eVar35": "%queryStringOldCampaignId%",
        "eVar63": "%potentialUseQueryString%",
        "eVar1": "%emailCampaign%",
        "eVar59": "%queryStringEmailElq_cid%",
        "eVar58": "%Eloqua2%",
        "eVar73": "%queryStringEmailElqem%",
        "prop41": "%visitorId%",
        "prop4": "%pageNameUrl%",
        "prop5": "%majorAreaLevel1%",
        "prop6": "%majorAreaLevel2%",
        "prop7": "%majorAreaLevel3%",
        "prop34": "D=g",
        "prop35": "%PageTitle%",
        "prop53": "%queryStringEmailElqsid%"
      },
      "skipSetAccount": true
    },
    "95c6a4d9c82a8d20476522984666120b54192e9b": {
      "engine": "tnt",
      "mboxURL": "d0cc0600946eb3957f703b9fe43c3590597a8c2c/mbox-contents-95c6a4d9c82a8d20476522984666120b54192e9b.js",
      "loadSync": true,
      "pageParams": {
        "entity.id": "%recsEntity%",
        "entity.categoryId": "%recsCategory%"
      }
    },
    "b2fb20c2c8a888d7202d723b160648cd156c893f": {
      "engine": "visitor_id",
      "loadOn": "pagetop",
      "name": "VisitorID",
      "mcOrgId": "B1441C8B533095C00A490D4D@AdobeOrg",
      "autoRequest": true,
      "initVars": {
        "trackingServer": "metrics.mathworks.com",
        "trackingServerSecure": "smetrics.mathworks.com",
        "marketingCloudServer": "metrics.mathworks.com",
        "marketingCloudServerSecure": "smetrics.mathworks.com"
      },
      "customerIDs": {
        "Eloqua2": {
          "id": "%Eloqua2%",
          "authState": "AUTHENTICATED"
        }
      }
    }
  },
  "pageLoadRules": [
    {"name":"Add-on Client","trigger":[{"engine":"sc","command":"setVars","arguments":[{"prop66":"%Addons_client%"}]}],"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("Addons_client"), /.*/i);
}],"event":"pagetop"},
    {"name":"AddOns_entitlement","trigger":[{"engine":"sc","command":"setVars","arguments":[{"prop68":"%Addons_Entitlement%"}]}],"scope":{"URI":{"include":["/add-ons"]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("Addons_Entitlement"), /(.*)/i);
}],"event":"pagebottom"},
    {"name":"AddOns_release","trigger":[{"engine":"sc","command":"setVars","arguments":[{"prop69":"%Addons_Release%"}]}],"scope":{"URI":{"include":["/add-ons"]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("Addons_Release"), /(.*)/i);
}],"event":"pagebottom"},
    {"name":"BaiduAnalytics","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-59ea15a564746d0348002f90.js"}]}]}],"scope":{"URI":{"include":[/(^\/$|^\/\?|\/products|\/pricing-licensing|\/services|\/discovery|\/company\/newsroom|\/company\/newsletters|\/company\/user_stories|\/company\/events|\/company\/aboutus|\/academia|\/campaigns|\/programs|\/videos|\/hardware-support|\/matlabcentral\/maker|training-schedule|\/solutions)/i],"exclude":[/(academia\/highschool|\/quality\/site-performance|add-ons|company\/jobs|matlabcentral|help)/i]},"subdomains":{"include":[/(ww2|explore)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"BaiduLookaLikeBase","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5b6ca5a364746d665d000c9f.js"}]}]}],"scope":{"URI":{"exclude":[/(academia\/highschool|\/quality\/site-performance|add-ons|company\/jobs|matlabcentral|help|company\/events)/i,/(academia\/highschool|\/quality\/site-performance|add-ons)/i]},"subdomains":{"include":[/(ww2|explore)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagetop"},
    {"name":"BaiduLookaLikeConversion","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5b27ede864746d3655000148.js"}]}]}],"scope":{"URI":{"exclude":[/(academia\/highschool|\/quality\/site-performance|add-ons|company\/jobs|matlabcentral|help|company\/events)/i,/(academia\/highschool|\/quality\/site-performance|add-ons)/i]},"subdomains":{"include":[/(ww2)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("eloquaFormSubmitId"), /\d/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"BaiduSitePerformance","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-59a7093664746d35240067fa.js"}]}]}],"scope":{"URI":{"include":[/(\/quality\/site-performance\/baidu.html)/i]}},"event":"pagebottom"},
    {"name":"CareersEidGoogle","trigger":[{"engine":"sc","command":"setVars","arguments":[{"eVar13":"rcj_16135"}]}],"conditions":[function(){
return _satellite.textMatch(_satellite.getQueryParam('utm_source'), /(google_jobs_apply)/i)
}],"event":"pagebottom"},
    {"name":"CrazyEgg_academia_research","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5c9e6ea164746d76e600426b.js"}]}]}],"scope":{"URI":{"include":[/(\/academia\/research.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"CrazyEgg_ipt","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5b60789964746d6e5800160d.js"}]}]}],"scope":{"URI":{"include":[/(\/image.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"CrazyEgg_online-learning","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5e1f39f964746d7ea80018e3.js"}]}]}],"scope":{"URI":{"include":[/(\/academia\/targeted\/online-learning.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"CrazyEgg_products-video","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5af4810c64746d3251007006.js"}]}]}],"scope":{"URI":{"include":["(\\/products\\/statistics\\/videos\\/index.html|\\/products\\/statistics\\/videos\\.html|\\/products\\/statistics\\/videos/\\?)"]},"subdomains":{"exclude":["(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)"]}},"event":"pagetop"},
    {"name":"CrazyEgg_solutions_deep_learning (Restored)","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5b0eb9eb64746d04eb000072.js"}]}]}],"scope":{"URI":{"include":[/(\/cloud.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazy_egg_campus_resources","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5e2755cb64746d0d06000161.js"}]}]}],"scope":{"URI":{"include":[/(\/academia\/campus\/resources.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazy_egg_educators","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5e27554264746d62d400122d.js"}]}]}],"scope":{"URI":{"include":[/(\/academia\/educators.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazy_egg_tutorials","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5c9a5c6a64746d755b003298.js"}]}]}],"scope":{"URI":{"include":[/(\/support\/learn-with-matlab-tutorials.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg-getting-started-matlab","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5ce4159564746d74f90011ce.js"}]}]}],"scope":{"URI":{"include":[/(\/videos\/getting-started-with-matlab-68985.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_Colorado_School_of_Mines","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5a660e6f64746d333f00960d.js"}]}]}],"scope":{"URI":{"include":["/academia/tah-portal/colorado-school-of-mines-40579029.html"]},"subdomains":{"exclude":["(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)"]}},"event":"pagetop"},
    {"name":"Crazyegg_Doc_Pages","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-58d3f31a64746d2ccd00a816.js"}]}]}],"scope":{"URI":{"include":["(\\/help\\/simulink\\/slref\\/scope.html|\\/help\\/matlab\\/matlab_prog\\/array-vs-matrix-operations\\.html|\\/help\\/symbolic\\/solve\\.html)"]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_New_York_University","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5a65f79664746d1acb00301f.js"}]}]}],"scope":{"URI":{"include":[/\/academia\/tah-portal\/new-york-university-618777.html/i]},"subdomains":{"exclude":["(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)"]}},"event":"pagetop"},
    {"name":"Crazyegg_Northern_Arizona_University","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5a65f69564746d3edc0025e4.js"}]}]}],"scope":{"URI":{"include":["/academia/tah-portal/northern-arizona-university-40584506.html"]},"subdomains":{"exclude":["(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)"]}},"event":"pagetop"},
    {"name":"Crazyegg_Rice_University","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5a98344b64746d405100960b.js"}]}]}],"scope":{"URI":{"include":["/academia/tah-portal/rice-university-40580441.html"]},"subdomains":{"exclude":["(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)"]}},"event":"pagetop"},
    {"name":"Crazyegg_University_of_Virginia","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5af5fe9164746d0feb00b327.js"}]}]}],"scope":{"URI":{"include":[/\/academia\/tah-portal\/university-of-virginia-40704757.html/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_Youngstow_State_University","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5a98351264746d4729001091.js"}]}]}],"scope":{"URI":{"include":["/academia/tah-portal/youngstown-state-university-40588590.html"]},"subdomains":{"exclude":["(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)"]}},"event":"pagetop"},
    {"name":"Crazyegg_academia_b","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-591dbead64746d061f003679.js"}]}]}],"scope":{"URI":{"include":["/academia-b.html"]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_data-analytics","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5a4fa2ea64746d35e6003c31.js"}]}]}],"scope":{"URI":{"include":["(\\/solutions\\/data-analytics\\/index.html|\\/solutions\\/data-analytics\\.html|\\/solutions\\/data-analytics/\\?)"]},"subdomains":{"exclude":["(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)"]}},"event":"pagetop"},
    {"name":"Crazyegg_demo_matlab","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5ce417cd64746d08f500028a.js"}]}]}],"scope":{"URI":{"include":[/(\/videos\/optimising-vehicle-dynamics-development-with-matlab-1541023257620.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_demo_simulink","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5ce4184464746d3e72000a36.js"}]}]}],"scope":{"URI":{"include":[/(\/videos\/programming-beaglebone-blue-with-simulink-1554893454283.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_getting_started_simulink","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5ce4162564746d21f9000e15.js"}]}]}],"scope":{"URI":{"include":[/(\/videos\/getting-started-with-simulink-part-1-building-and-simulating-a-simple-simulink-model-1508442030520.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_mathworks_stories","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5a98303e64746d6f63003e1e.js"}]}]}],"scope":{"URI":{"include":["(\\/company\\/mathworks-stories\\/index.html|\\/company\\/mathworks-stories.html|\\/company\\/mathworks-stories/\\?)"]},"subdomains":{"exclude":["(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)"]}},"event":"pagetop"},
    {"name":"Crazyegg_matlab-and-simulink-pass-competitions-hub","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5dbae59164746d78200016a6.js"}]}]}],"scope":{"URI":{"include":[/(\/videos\/series\/matlab-and-simulink-pass-competitions-hub.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_mwaccount","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-58a73dfc64746d3e94011033.js"}]}]}],"scope":{"URI":{"include":["/mwaccount/"]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_services_training","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5af45be464746d0ab7002a95.js"}]}]}],"scope":{"URI":{"include":[/(\/serices\/training\/index.html|\/services\/training\.html|\/services\/training\/\?)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_services_training","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5c25222a64746d408b01ad5d.js"}]}]}],"scope":{"URI":{"include":[/(\/services\/training.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_services_training_courses","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5af5fbad64746d0ab7003a67.js"}]}]}],"scope":{"URI":{"include":[/(\/serices\/training\/courses\/index.html|\/services\/training\/courses\.html|\/services\/training\/courses\/\?)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_solving-ordinary-differential-equations","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5d93696b64746d209d00095b.js"}]}]}],"scope":{"URI":{"include":[/(\/learn\/tutorials\/solving-ordinary-differential-equations-with-matlab.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_topic-overview","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5ce416e464746d74f3000d58.js"}]}]}],"scope":{"URI":{"include":[/(\/videos\/predictive-maintenance-part-1-introduction-1545827554336.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"Crazyegg_topic-overview-2","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5ce4174f64746d74f0000b7e.js"}]}]}],"scope":{"URI":{"include":[/(\/videos\/understanding-kalman-filters-part-1-why-use-kalman-filters--1485813028675.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"FIMTAH_login_failure","trigger":[{"command":"loadScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-55b93fae62353000140007dd.js"}]}]}],"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("FIMTAH"), "failure");
}],"event":"windowload"},
    {"name":"FIMTAH_login_success","trigger":[{"command":"loadScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-55b93fe43339300014000dab.js"}]}]}],"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("FIMTAH"), "success");
}],"event":"windowload"},
    {"name":"GP_blogs_conv","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-56f01ddb64746d3118000e84.js"}]}]}],"scope":{"URI":{"include":["/headlines/$"]}},"event":"pagetop"},
    {"name":"GP_event_conv","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-56e095a264746d05240023b2.js"}]}]}],"scope":{"URI":{"include":["(/events/(seminars|conferences|tradeshows|webinars))|(/videos/search)"]},"domains":[/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"MOATS_univID","trigger":[{"engine":"sc","command":"setVars","arguments":[{"prop71":"%MOATS_univID%"}]}],"scope":{"URI":{"include":[/(\/apex\/registertraining|enroll\/selfEnrollment)/i]}},"event":"pagebottom"},
    {"name":"Pers_DA (form submit)","scope":{"URI":{"include":[/\/campaigns\/offers\/machine-learning-with-matlab.confirmation.html/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"Pers_DA (profile+category)","scope":{"URI":{"include":[/(machine-learning|risk-management-solution-for-energy-markets|adaboost|algorithme-genetique|composantes-principales|clusteranalyse|cluster-analysis|cross-validation|feature-selection|\/kreuzvalidierung|linear-model|linear-programming|linear-regression|load-forecasting|matlab-gpu|monte-carlo|programmation-lineaire|programmazione-lineare|regressione-lineare|regression-lineaire|supervised-learning|support-vector-machine|\/analyzing-|market-basket|bayesian|data-science|artificial-neural-networks-for-beginners|text-mining|social-network-analysis|organize-data|crash-detection|algorithmic-trading-and-artificial-intelligence|visualizing-data|analyzing-test-data|big-data|data-analysis|data-driven|data-mining|neural-network|price-forecasting|face-recognition|mathematical-modeling|matlab-for-excel|statistical|sensor-data-analy|database-explorer|time-series|prescriptive-analytics|big\+data|data-analytics|numeros-aleatorios|smoothing|dan.html|analyzing-and-visualizing|mal.html|text-analytics|control-chart|natural-language-processing|sentiment-analysis|camera-calibration|Machine\+learning|Cluster\+Analysis|linear\+model|linear\+programming|linear\+regression|load\+forecasting|monte\+carlo|supervised\+learning|market\+basket|data\+science|text\+mining|artificial\+intelligence|neural\+network|price\+forecasting|face\+recognition|time\+series|prescriptive\+analytics|data\+analysis|text\+analytics|data\+analytics|hadoop|mapreduce|statistic)/i],"exclude":[/(machine-learning-with-matlab.confirmation.html|matlab-analytics|matlab-vs-r|computer-vision-and-machine-learning|object-recognition-deep-learning-and-machine-learning-for-computer-vision|machine-learning-vs-deep-learning|machine\+learning\+vs\+deep\+learning|matlab\+vs\+r|predictive|predictivo|predittiva)/i]}},"event":"pagetop"},
    {"name":"Pers_DA cheat sheet (form submit)","scope":{"URI":{"include":[/\/campaigns\/offers\/data-science-cheat-sheets.confirmation.html/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"Pers_DA-Dl combined (category+profile)","scope":{"URI":{"include":[/(matlab-analytics|matlab-vs-r|computer-vision-and-machine-learning|object-recognition-deep-learning-and-machine-learning-for-computer-vision|machine-learning-vs-deep-learning|machine\+learning\+vs\+deep\+learning|matlab\+vs\+r)/i]}},"event":"pagetop"},
    {"name":"Pers_DL (form submit)","scope":{"URI":{"include":[/\/campaigns\/offers\/deep-learning-with-matlab.confirmation.html/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"Pers_DL (profile+category)","scope":{"URI":{"include":[/(deep-learning|opencv|image|motion-detection|video-processing|feature-extraction|optical-flow|color-profile|edge-detection|lab-color|stereo-vision|kalman|color-based-segmentation|thermal-analysis|appearance-check|camera-calibration|robotic-vision|visual-inspection|object-detection|reconnaissance-faciale|computer-vision|face-recognition|pattern-recognition|ransac|digitale-bildverarbeitung|reconocimiento-facial|vision-artificial|riconoscimento-facciale|semantic-segmentation|neural-network|object-recognition|lstm|tensorflow|\/ai-|ground-truth-labeler-app|deep\+learning|neural\+network|computer\+vision|face recognition|face\+recognition|computer\+vision|pattern\+recognition|semantic\+segmentation|convolutional|object\+recognition|-ai-|visual\+inspection|tensorflow|spectroscopy|nnet|artificial-intelligence|artificial\+intelligence|cnn)/i],"exclude":[/(deep-learning-with-matlab.confirmation|matlab-analytics|matlab-vs-r|computer-vision-and-machine-learning|object-recognition-deep-learning-and-machine-learning-for-computer-vision|machine-learning-vs-deep-learning|machine\+learning\+vs\+deep\+learning|matlab\+vs\+r|predictive|predictivo|predittiva)/i]}},"event":"pagetop"},
    {"name":"Pers_DL-ipcv","scope":{"URI":{"include":[/(semantic-segmentation|image|optical-flow|color-profile|edge-detection|lab-color|color-based-segmentation|motion-detection|opencv|thermal-analysis|appearance-check|camera-calibration|robotic-vision|visual-inspection|object-detection|reconnaissance-faciale|computer-vision|face-recognition|pattern-recognition|ransac|digitale-bildverarbeitung|reconocimiento-facial|vision-artificial|riconoscimento-facciale|object-recognition|computer\+vision|face recognition|face\+recognition|computer\+vision|pattern\+recognition|semantic\+segmentation)/i],"exclude":[/(deep-learning-with-matlab.confirmation)/i]}},"event":"pagetop"},
    {"name":"Pers_DL-signal(profile)","scope":{"URI":{"include":[/(feature-extraction|acoustic-scene-recognition|voice-activity-detection|speech2text|signallabeler|waveform|radar-target-classification|speech|noise|audio|wavelet|signal)/i],"exclude":[/(\/campaigns\/offers\/deep-learning-for-signal-processing-white-paper.confirmation.html)/i]}},"event":"pagetop"},
    {"name":"Pers_DLvsML (form submit)","scope":{"URI":{"include":[/\/campaigns\/offers\/deep-learning-vs-machine-learning-algorithm.confirmation.html/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"Pers_MPCL (form submit)","scope":{"URI":{"include":[/\/campaigns\/offers\/mppt-algorithm-models.confirmation.html/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"Pers_MPCL(profile+category)","scope":{"URI":{"include":[/(motor|battery|mppt|pulse-width|data-driven-control|f28069|infusion-pump|power-network|lithium|real-time-simulation|buckeye-bullet|ac-power|power-point-tracking|roadster|surgical-stapler|li-ion|plug-in-series-hybrid|electric-vehicle|boost-converter|control-system|power-converter|physmod|hybrid-electric|vehicle-electrical|multilevel-converters|solar-power|real-time-hardware-testing|power-electronic|hydraulic-pump|solar-inverter|servo-drive|wind-power|photovoltaic|electric-bike|hybrid-truck|hybrid-powertrain|pid-controller|solar|pmsm|power-system|buck-converter|power-electronics|field-oriented-control|field oriented control|pid-control|clarke-and-park|power-conver|targeted\/mpc|motor-modeling|system-control|power-control|pulse\+width|infusion\+pump|real\+time+simulation|buckeye\+bullet|ac\+power|power\+point\+tracking|surgical\+stapler|li\+ion|plug-in\+hybrid|electric\+vehicle|boost\+converter|control\+system|power\+converter|hybrid\+electric|multilevel\+converters|solar\+power|real\+time\+testing|power\+electronic|hydraulic\+pump|solar\+inverter|servo\+drive|wind\+power|electric\+bike|hybrid\+truck|hybrid\+powertrain|pid\+controller|power\+system|buck\+converter|power\+electronics|pid\+control|clarke\+and\+park|incremental\+conductance|voltage|lithium\+ion|Perturb\+and\+Observe|BMS|wind|pv|Li\+ion|pwm|dc-dc|ac-dc|dc-ac|ac-ac|powertrain|pump|bldc)/i],"exclude":[/\/campaigns\/offers\/mppt-algorithm-models.confirmation.html/i]}},"event":"pagetop"},
    {"name":"Pers_TAH_clickers","scope":{"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"conditions":[function(){
return _satellite.textMatch(_satellite.getQueryParam('s_tid'), /(try_offer_pers_tahpor|aa_pers_tahgen|sv_offer1_pers_tahpor|sv_offer2_pers_tahpor|hp_offer_pers_tahpor|hp_offer_pers_rampuni|aa_ei_pers_tahgen|aa_wfn_pers_tahgen|edunudge_dl2|edunudge_learn2|edunudge_ml2|aa_getml_pers_tahgen|aa_mlst_pers_tahgen)/i)
}],"event":"pagetop"},
    {"name":"Pers_WL (form submit)","scope":{"URI":{"include":[/\/campaigns\/offers\/wireless-design-ebook.confirmation.html/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"Pers_WL (profile+category)","scope":{"URI":{"include":[/(wireless|channel-model|mimo|ofdm|radar|s-parameter|lte|communication|5g|802-11|beamforming|rfsoc|radio|sensor-fusion|rf-|phased-array|\/comm\/|waveform|qam|doppler|ldpc|awgn|frequency|acpr|ber-simulations|spatial-multiplexing|802-15-4|fading-channel|modem|near-field|ber-performance|baseband|qpsk|bit-error-rate|bluetooth|\/ble-|far-field|fpga|microwave|\/wds|802.11|ccdf|ber\+simulations|spatial\+multiplexing|802.15.4|fading\+channel|near\+field|bit\+error\+rate|far\+field)/i],"exclude":[/\/campaigns\/offers\/wireless-design-ebook.confirmation.html/i]}},"event":"pagetop"},
    {"name":"Pers_WL_topic: 5G-LTE","scope":{"URI":{"include":[/(-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-)/i],"exclude":[/(\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|communications-system-toolbox|antenna|jobs|\/rf-|-rf-|-mimo-|hybrid-beamforming|radar|bluetooth|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design|wlan|wifi)/i]}},"event":"pagetop"},
    {"name":"Pers_WL_topic: RF","scope":{"URI":{"include":[/(\/rf-|-rf-|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design)/i],"exclude":[/(antenna|-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-|\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|communications-system-toolbox|jobs|-mimo-|hybrid-beamforming|radar|bluetooth|wlan|wifi)/i]}},"event":"pagetop"},
    {"name":"Pers_WL_topic: Radar","scope":{"URI":{"include":[/radar/i],"exclude":[/(antenna|-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-|\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|communications-system-toolbox|jobs|\/rf-|-rf-|-mimo-|hybrid-beamforming|bluetooth|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design|wlan|wifi)/i]}},"event":"pagetop"},
    {"name":"Pers_WL_topic: WLAN","scope":{"URI":{"include":[/(wlan|wifi)/i],"exclude":[/(antenna|jobs|\/rf-|-rf-|-mimo-|hybrid-beamforming|radar|bluetooth|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design)/i]}},"event":"pagetop"},
    {"name":"Pers_WL_topic: Wireless","scope":{"URI":{"include":[/(\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|digital-communication|communications-system-toolbox|signal-processing-communications|mmwave-communication|signal-processing-and-communications)/i],"exclude":[/(-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-|antenna|jobs|\/rf-|-rf-|-mimo-|hybrid-beamforming|radar|bluetooth|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design|wlan|wifi)/i]}},"event":"pagetop"},
    {"name":"Pers_WL_topic: antenna","scope":{"URI":{"include":[/antenna/i],"exclude":[/(-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-|\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|communications-system-toolbox|jobs|\/rf-|-rf-|-mimo-|hybrid-beamforming|radar|bluetooth|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design|wlan|wifi)/i]}},"event":"pagetop"},
    {"name":"Pers_WL_topic: bluetooth","scope":{"URI":{"include":[/bluetooth/i],"exclude":[/(antenna|-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-|\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|communications-system-toolbox|jobs|\/rf-|-rf-|-mimo-|hybrid-beamforming|radar|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design|wlan|wifi)/i]}},"event":"pagetop"},
    {"name":"Pers_WL_topic: mimo","scope":{"URI":{"include":[/(-mimo-|hybrid-beamforming)/i],"exclude":[/(bluetooth|antenna|-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-|\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|communications-system-toolbox|jobs|\/rf-|-rf-|radar|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design|wlan|wifi)/i]}},"event":"pagetop"},
    {"name":"Pers_autosar_offer","scope":{"URI":{"include":[/\/campaigns\/offers\/deploy-autosar-using-simulink/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"Pers_da-dlexit_offer","scope":{"URI":{"include":[/\/videos\/introduction-to-deep-learning-machine-learning-vs-deep-learning/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"Pers_exitint","conditions":[function(){
return _satellite.textMatch(_satellite.getQueryParam('s_tid'), /exitint_.*/i)
}],"event":"pagetop"},
    {"name":"Pers_mpclexit_offer","scope":{"URI":{"include":[/\/videos\/series\/field-oriented-control-with-simulink/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"Pers_predictive (category)","scope":{"URI":{"include":[/(predictive|predictivo|predittiva)/i]}},"event":"pagetop"},
    {"name":"Pers_predmaint_offer","scope":{"URI":{"include":[/\/campaigns\/offers\/introduction-to-predictive-maintenance-with-matlab/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"Pers_topic_autosar (profile)","scope":{"URI":{"include":[/(autosar|embedded-coder|iso26262|simulink-coder)/i],"exclude":[/(\/offers\/deploy-autosar-using-simulink)/i]}},"event":"pagetop"},
    {"name":"Pers_wfnudge","conditions":[function(){
return _satellite.textMatch(_satellite.getQueryParam('s_tid'), /nudge_.*/i)
}],"event":"pagetop"},
    {"name":"Pers_wlexit_offer","scope":{"URI":{"include":[/(\/videos\/series\/5g-explained|\/videos\/5g-explained)/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"Quora","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5cca0a4c64746d22ac001daf.js"}]}]}],"scope":{"URI":{"exclude":[/ (academia\/highschool)|(\/add-ons)|(quality\/site-performance)|(matlabcentral\/answers\/.*)|(matlabcentral\/cody\/problems)|(matlabcentral\/cody\/solutions)|(matlabcentral\/cody\/groups)|(matlabcentral\/cody\/activities)|(support\/search.html)|(matlabcentral\/index)|(^matlabcentral\/$)|(^\/matlabcentral\/\?)/i]},"subdomains":{"include":[/(www)/i],"exclude":[/(au|ch|ww2|cn|de|es[^A-Za-z]|fr|in[^A-Za-z]|it|jp|kr|nl|se|uk|dev|stage|integ|aem-auth)/i]}},"conditions":[function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
},function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
}],"event":"pagetop"},
    {"name":"RW_registration","trigger":[{"engine":"sc","command":"addEvent","arguments":["event7:%elqsid%"]}],"scope":{"URI":{"include":["/videos/"]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("eloquaFormSubmitId"), /\d/i);
}],"event":"pagebottom"},
    {"name":"Training gateway page","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-547498fc38353300188b0100.js"}]}]}],"scope":{"URI":{"include":[/\/services\/training\/index.html/i]}},"event":"pagetop"},
    {"name":"across","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003cscript type=\"text/javascript\"\u003e\nvar adn_param = adn_param || [];\nadn_param.push([{  \n ui:'100069',\n ut:'Home'\n}]);\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" async src=\"//fin.rainbownine.net/js/adn_tags_1.0.0.js\"\u003e\u003c/script\u003e\t\t"}]}],"scope":{"URI":{"exclude":[/(quality\/site-performance)/i]},"subdomains":{"include":[/(kr|explore)/i],"exclude":[/(grader|go2|matlab|matlabacademy|thingspeak|dev|integ|perf|aem-auth)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"acrossConversion","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!-- ADN Tracker[?=$strData[\"subject\"]?\u003e] start --\u003e\n\u003cscript type=\"text/javascript\"\u003e\nvar adn_param = adn_param || [];\nadn_param.push([{  \n ui:'100069',\n ut:'Complete',\n uo:'types1'\n}]);\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" async src=\"//fin.rainbownine.net/js/adn_tags_1.0.0.js\"\u003e\u003c/script\u003e\t"}]}],"scope":{"URI":{"include":[/(.*campaigns\/.*)(.*-conf.html.*)|(.*campaigns\/.*)(.*confirmation.*)|(company\/aboutus\/contact_us\/confirmation.html)|(company\/aboutus\/contact_us\/quote_confirmation.html)|(downloads\/web_downloads)|(\/campaigns\/products\/trials\/assisted\/confirmation.html)|(\/campaigns\/products\/*\/matlab-convert-to-c-trial-request-conf.html)|(campaigns\/products\/*\/matlab-compiler-trial-conf.html)|(videos)/i],"exclude":[/(dev|integ|perf)/i]},"subdomains":{"include":[/(kr)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("eloquaFormSubmitId"), /\d/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"acrossConversionWebStore","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!-- ADN Tracker[?=$strData[\"subject\"]?\u003e] start --\u003e\n\u003cscript type=\"text/javascript\"\u003e\nvar adn_param = adn_param || [];\nadn_param.push([{  \n ui:'100069',\n ut:'Complete',\n uo:'types1'\n}]);\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" async src=\"//fin.rainbownine.net/js/adn_tags_1.0.0.js\"\u003e\u003c/script\u003e\t"}]}],"scope":{"URI":{"include":[/(store\/checkout\/completed)/i],"exclude":[/(dev|integ|perf)/i]},"subdomains":{"include":[/(kr)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"acrossSitePerformance","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003cscript type=\"text/javascript\"\u003e\nvar adn_param = adn_param || [];\nadn_param.push([{  \n ui:'100069',\n ut:'Home'\n}]);\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" async src=\"//fin.rainbownine.net/js/adn_tags_1.0.0.js\"\u003e\u003c/script\u003e\t\t"}]}],"scope":{"URI":{"include":[/(\/quality\/site-performance\/across.html)/i]}},"conditions":[function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"adCloudEventId","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003cscript src=\"https://www.everestjs.net/static/le/last-event-tag-latest.min.js\"\u003e\u003c/script\u003e\n\u003cscript\u003e\nvar adCloudCheck = 0;\nvar adCloudInterval = setInterval(function () {\n\tif (typeof AdCloudEvent !== \"undefined\") { \n\t\tAdCloudEvent(\"B1441C8B533095C00A490D4D@AdobeOrg\",\"mathwgbl\");\n\t\twindow.clearInterval(adCloudInterval);\n\t}\n\tif (++adCloudCheck === 5) {\n\t\twindow.clearInterval(adCloudInterval);\n\t}\n}, 200);\n\u003c/script\u003e"}]}],"scope":{"URI":{"exclude":[/(site-performance)/i]},"subdomains":{"include":[/(www|jp|nl|se|es|se|fr|uk|it|nl|de|ch|matlabacademy|au|in|ww2|explore)/i],"exclude":[/(grader|go2|dev|matlab[^A-Za-z]|aem-auth)/i]}},"event":"pagetop"},
    {"name":"adCloudEventIdSitePerformance ","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003cscript src=\"https://www.everestjs.net/static/le/last-event-tag-latest.min.js\"\u003e\u003c/script\u003e\n\u003cscript\u003eAdCloudEvent(\"B1441C8B533095C00A490D4D@AdobeOrg\",\"mathwgbl\");\u003c/script\u003e"}]}],"scope":{"URI":{"include":[/(quality\/site-performance\/adcloud.html)/i]}},"event":"pagetop"},
    {"name":"bingBaseScript","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5b27fc4d64746d3f950001c1.js"}]}]}],"scope":{"URI":{"exclude":[/(academia\/highschool|\/quality\/site-performance)/i]},"subdomains":{"include":[/(www|uk|matlabacademy|explore)/i],"exclude":[/(grader|matlab[^A-Za-z]|go2|dev|aem-auth)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagetop"},
    {"name":"bingSitePerformance","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5b199de764746d3e13000f39.js"}]}]}],"scope":{"URI":{"include":[/(quality\/site-performance\/bing.html)/i]}},"conditions":[function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"contactExpert","trigger":[{"engine":"sc","command":"addEvent","arguments":["event25"]}],"scope":{"URI":{"include":[/(expert_contact_conf.html|expert-contact-confirmation.html)/i]}},"event":"pagebottom"},
    {"name":"crazyEgg_academia_student_version","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-584f213064746d1fb900b65d.js"}]}]}],"scope":{"URI":{"include":[/(^\/academia\/student_version.html|^\/academia\/student_version|^\/academia\/student_version\/index.html\?)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyEgg_deep_learning_onramp","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5d264e3a64746d7a40000780.js"}]}]}],"scope":{"URI":{"include":[/(\/learn\/tutorials\/deep-learning-onramp.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyEgg_event_main","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-594d22d764746d6f1a00d050.js"}]}]}],"scope":{"URI":{"include":["(\\/company\\/events\\/index.html|\\/company\\/events\\.html|\\/company\\/events/\\?)"]},"subdomains":{"exclude":[/(au|ch|cn|es|fr|in|it|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyEgg_machine_learning_onramp","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5d264d7564746d582900065a.js"}]}]}],"scope":{"URI":{"include":[/(\/learn\/tutorials\/machine-learning-onramp.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyEgg_matlab","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5bef241664746d408b00a6b9.js"}]}]}],"scope":{"URI":{"include":[/(\/products\/matlab.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyEgg_matlab_fundamentals","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5bb7a3b964746d02b6000491.js"}]}]}],"scope":{"URI":{"include":[/(\/training-schedule\/matlab-fundamentals.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyEgg_polyspace","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-59f3943964746d14ca0053a8.js"}]}]}],"scope":{"URI":{"include":["(\\/products\\/polyspace-bug-finder\\/index.html|\\/products\\/polyspace-bug-finder\\.html|\\/products\\/polyspace-bug-finder/\\?)"]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyEgg_simulink","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5bef249b64746d101a001997.js"}]}]}],"scope":{"URI":{"include":[/(\/products\/simulink.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyEgg_super_computing","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5be454c064746d259f0045cb.js"}]}]}],"scope":{"URI":{"include":[/(\/campaigns\/portals\/super-computing.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyegg-help","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5e83739264746d2f88000789.js"}]}]}],"scope":{"URI":{"include":[/(\/help\/)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyegg_consulting","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5a67a0c964746d6db0004a4b.js"}]}]}],"scope":{"URI":{"include":["(\\/services\\/consulting\\/index.html|\\/services\\/consulting\\.html|\\/services\\/consulting/\\?)"]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyegg_differential-equations-and-linear-algebra","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5dbae62f64746d730b001be2.js"}]}]}],"scope":{"URI":{"include":[/(\/videos\/series\/differential-equations-and-linear-algebra-117657.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyegg_matlab-and-simulink-robotics-arena","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5dbae44564746d563200189a.js"}]}]}],"scope":{"URI":{"include":[/(\/videos\/series\/matlab-and-simulink-robotics-arena.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyegg_pass-competitions-hub","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5dbae6fe64746d730b001bf7.js"}]}]}],"scope":{"URI":{"include":[/(\/academia\/pass-competitions-hub.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyegg_performance_test","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5d30d9e064746d51c20010cb.js"}]}]}],"scope":{"URI":{"include":[/(\/quality\/site-performance\/crazyegg.html)/i]}},"event":"pagetop"},
    {"name":"crazyegg_roboticsarena","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5dbaf6d764746d1c48002901.js"}]}]}],"scope":{"URI":{"include":[/(\/academia\/student-competitions\/roboticsarena.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyegg_signal","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-59fce3ce64746d7042001890.js"}]}]}],"scope":{"URI":{"include":["(\\/products\\/signal\\/index.html|\\/products\\/signal\\.html|\\/products\\/signal/\\?)"]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyegg_stateflow_onramp","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5ea1e90564746d7b16000213.js"}]}]}],"scope":{"URI":{"include":[/(\/learn\/tutorials\/stateflow-onramp.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyegg_teaching_with_matlab","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5d5d7c6564746d68d20000e2.js"}]}]}],"scope":{"URI":{"include":[/(\/learn\/teaching-with-matlab.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"crazyegg_webinar","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5ce4189f64746d74f900122f.js"}]}]}],"scope":{"URI":{"include":[/(\/videos\/comprehensive-workflow-for-autosar-classic-adaptive-using-model-based-design-1557258949531.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"data-acquisition_crazyEgg","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5a294d6f64746d0e33000654.js"}]}]}],"scope":{"URI":{"include":["(\\/solutions\\/data-acquisition\\/index.html|\\/solutions\\/data-acquisition\\.html|\\/solutions\\/data-acquisition/\\?)"]},"subdomains":{"exclude":["(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)"]}},"event":"pagetop"},
    {"name":"digitalDataInternalTraffic","conditions":[function(){
return _satellite.textMatch(_satellite.getVar("digitalDataInternalTraffic"), /.*/i);
}],"event":"domready"},
    {"name":"docTranslationCookiePresent","trigger":[{"engine":"sc","command":"setVars","arguments":[{"prop70":"cookie | %docTranslate% | %pageName%"}]}],"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docTranslate"), /\w/i);
}],"event":"pagebottom"},
    {"name":"dtmDefaultCookies","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-57b7530f64746d192c002edf.js"}]}]}],"scope":{"URI":{"include":["test/cg/pushDataElement.html"]}},"conditions":[function(){
return _satellite.visitorSessionPagesViewed() > 1;
}],"event":"pagebottom"},
    {"name":"eid","trigger":[{"engine":"sc","command":"setVars","arguments":[{"prop75":"%eid%"}]}],"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("eid"), /.*/i);
}],"event":"pagebottom"},
    {"name":"eloquaFormName","trigger":[{"engine":"sc","command":"setVars","arguments":[{"eVar66":"%eloquaFormName%"}]}],"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("eloquaFormName"), /(.*)/i);
}],"event":"pagebottom"},
    {"name":"eloquaVisitorTrackingScript","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-56972e2c64746d54aa00cb73.js"}]}]}],"scope":{"URI":{"exclude":[/help(?!\/control|\/stateflow|\/slcontrol|\/physmod\/sps|\/physmod\/simscape|\/physmod\/elec|\/signal|\/comm|\/dsp|\/distcomp|\/phased|\/rf|\/antenna|\/simrf|\/optim|\/nnet|\/curvefit|\/gads|\/database|\/stats|\/symbolic|\/images|\/vision|\/imaq|\/lte|\/wlan|\/ltehdl|\/instrument|\/textanalytics|\/deeplearning)|(matlabcentral(?!\/fileexchange))|(company\/jobs|licensecenter|support\/bugreports|\/quality\/site-performance)/i]},"subdomains":{"exclude":[/(matlabacademy|coursework|thingspeak|go2|dev|stage|integ|perf|test)/i]}},"event":"pagetop"},
    {"name":"eloquaVisitorTrackingScript - NonProds","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-570d2a1664746d1d41005b96.js"}]}]}],"scope":{"URI":{"exclude":[/(\/help|matlabcentral|company\/jobs|licensecenter|support\/bugreports)/i]},"subdomains":{"include":[/(test|stage|integ|perf|auth|dev)/i],"exclude":[/(matlabacademy|coursework|thingspeak|go2)/i]}},"event":"pagetop"},
    {"name":"eloquaVisitorTrackingScriptSitePerformance","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-58c9a8ca64746d2cd0006c99.js"}]}]}],"scope":{"URI":{"include":[/(\/quality\/site-performance\/eloqua-tracking.html)/i]}},"event":"pagetop"},
    {"name":"entryPageName","trigger":[{"engine":"sc","command":"setVars","arguments":[{"eVar26":"%pageName%"}]}],"conditions":[function(){
return _satellite.visitorSessionPagesViewed() === 1;
}],"event":"pagebottom"},
    {"name":"facebook","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-58fe08cb64746d190500a115.js"}]}]}],"scope":{"URI":{"exclude":[/(academia\/highschool)|(\/add-ons)|(quality\/site-performance)/i]},"subdomains":{"exclude":[/(grader|matlab[^A-Za-z]|go2|dev|ww2|aem-auth)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagetop"},
    {"name":"facebookOrder","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-58fe2f3a64746d77f5007986.js"}]}]}],"scope":{"URI":{"include":[/(store\/checkout\/completed)/i]},"subdomains":{"exclude":[/(grader|matlab[^A-Za-z]|go2|dev|ww2|aem-auth)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("webStoreOrderId"), /(.*)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"facebookSitePerformance","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-59a9c4b964746d7ade008628.js"}]}]}],"scope":{"URI":{"include":[/(\/quality\/site-performance\/facebook-pixel.html)/i]}},"conditions":[function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagetop"},
    {"name":"googleGtag","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003cscript async src=\"https://www.googletagmanager.com/gtag/js?id=AW-1023777138\"\u003e\u003c/script\u003e\n\u003cscript\u003e\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'AW-1023777138');\n\u003c/script\u003e"}]}],"scope":{"URI":{"exclude":[/(academia\/highschool|\/quality\/site-performance)/i,/(\/contribute)/i]},"subdomains":{"exclude":[/(cn|grader|go2|dev|aem-auth|matlab[^A-Za-z]|aem-auth)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagetop"},
    {"name":"googleOrderAcademic","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-589b6ecb64746d715a008452.js"}]}]}],"scope":{"URI":{"include":[/(store\/checkout\/completed)/i]},"subdomains":{"exclude":[/(cn|go2|dev|aem-auth)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("webStoreOrderSector"), /(academic)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"googleOrderCommercial","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-589b6f5a64746d11870070ff.js"}]}]}],"scope":{"URI":{"include":[/(store\/checkout\/completed)/i]},"subdomains":{"exclude":[/(cn|go2|dev|aem-auth)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("webStoreOrderSector"), /(standard)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"googleOrderHome","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-589b6f5a64746d11870070e5.js"}]}]}],"scope":{"URI":{"include":[/(store\/checkout\/completed)/i]},"subdomains":{"exclude":[/(cn|go2|dev|aem-auth)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("webStoreOrderSector"), /(home)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"googleOrderStudent","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5898d83964746d778600555d.js"}]}]}],"scope":{"URI":{"include":[/(store\/checkout\/completed)/i]},"subdomains":{"exclude":[/(cn|go2|dev|aem-auth)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("webStoreOrderSector"), /(student)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"googleRemarketingSitePerformance","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5b4f913e64746d482f001a65.js"}]}]}],"scope":{"URI":{"include":[/(\/quality\/site-performance\/google-remarketing.html)/i]}},"conditions":[function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"gp_event_gtwy","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-56df331564746d052f000e67.js"}]}]}],"scope":{"URI":{"include":[/\/company\/events\/($|index.html|\?)/i]},"domains":[/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"helpsearch_crazyegg","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-57fcfd5d64746d4cc8001ff2.js"}]}]}],"scope":{"URI":{"include":[/(\/help\/search.html|\/help\/index.html|\/hardware-support\/index.html|\/help\/$|\/hardware-support\/$)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"linkedIn","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!--DTM LinkedIn Pixel--\u003e\n\u003cimg height=\"1\" width=\"1\" style=\"display:none;\" alt=\"\" src=\"https://dc.ads.linkedin.com/collect/?pid=34128\u0026fmt=gif\"/\u003e"}]}],"scope":{"URI":{"exclude":[/(academia\/highschool)|(\/add-ons\/)|(quality\/site-performance)/i,/(\/contribute)/i]},"subdomains":{"exclude":[/(grader|go2|matlab|matlabacademy|thingspeak|dev|jp|kr|ww2|cn|aem-auth)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"linkedInSitePerformance","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!--DTM LinkedIn Pixel--\u003e\n\u003cimg height=\"1\" width=\"1\" style=\"display:none;\" alt=\"\" src=\"https://dc.ads.linkedin.com/collect/?pid=34128\u0026fmt=gif\"/\u003e"}]}],"scope":{"URI":{"include":[/(\/quality\/site-performance\/linkedin.html|quality\/performance-linkedin.html)/i]}},"conditions":[function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"mlHomeTargetBanner","trigger":[{"engine":"tnt","command":"addMbox","arguments":[{"mboxGoesAround":"#target_pricingHomeNotAvailable_banner","mboxName":"target_pricingHomeNotAvailable_banner","arguments":[],"timeout":"1500"}]}],"scope":{"URI":{"include":[/products\/matlab-home.html/i]}},"event":"pagetop"},
    {"name":"mlHomeTargetTable","trigger":[{"engine":"tnt","command":"addMbox","arguments":[{"mboxGoesAround":"#target_pricingHomeNotAvailable_table","mboxName":"target_pricingHomeNotAvailable_table","arguments":[],"timeout":"1500"}]}],"scope":{"URI":{"include":[/products\/matlab-home.html/i]}},"event":"pagetop"},
    {"name":"mwaPopUpAssc","trigger":[{"engine":"sc","command":"setVars","arguments":[{"eVar67":"%mwaPopUpAssc%"}]}],"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("mwaPopUpAssc"), /.*/i);
}],"event":"pagebottom"},
    {"name":"pageScroll","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5e7a5c7764746d6cc5000b72.js"}]}]}],"scope":{"URI":{"include":[/(hybrid-beamforming-white-paper0.html)/i]}},"event":"domready"},
    {"name":"partnerTrial","trigger":[{"engine":"sc","command":"setVars","arguments":[{"eVar70":"Partner Trial"}]}],"scope":{"URI":{"include":[/(products\/connections\/trials)/i],"exclude":[/(.*mwaccount.*|.*login.*)/i]}},"event":"pagebottom"},
    {"name":"productCode","trigger":[{"engine":"sc","command":"setVars","arguments":[{"eVar69":"%productCode%"}]}],"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("productCode"), /.*/i);
}],"event":"pagebottom"},
    {"name":"qualarooHelp","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5b6ca51c64746d665d000c7d.js"}]}]}],"scope":{"URI":{"include":[/(\/help|matlabcentral)/i]},"subdomains":{"exclude":[/(au|ch[^A-Za-z]|cn|de[^A-Za-z]|es[^A-Za-z]|fr|in[^A-Za-z]|it|nl|se[^A-Za-z]|uk|dev|la)/i]}},"event":"domready"},
    {"name":"qualarooHomepage","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5900d79264746d190500bb96.js"}]}]}],"scope":{"URI":{"include":[/(^$|^\/$|^\/\?)/i]},"subdomains":{"exclude":[/(blogs|matlabacademy|coursework|thingspeak|go2|matlab|au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]},"domains":[/mathworks\.com$/i]},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("digitalDataInternalTraffic"), "0");
}],"event":"windowload"},
    {"name":"qualarooPromotional","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5480c4083639370018670600.js"}]}]}],"scope":{"URI":{"include":[/(^\/$|^\/\?|academia|company|products|solutions|services|training-schedule|pricing-licensing|discovery|support\/books|campaigns|videos|hardware-support|support)/i],"exclude":[/(^contribute)/i]},"subdomains":{"exclude":[/(grader|matlab|matlabacademy|thingspeak|au|ch|cn|de[^A-Za-z]|es[^A-Za-z]|fr|in[^A-Za-z]|it|jp|kr|nl|se[^A-Za-z]|uk|dev|la)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("digitalDataInternalTraffic"), "0");
}],"event":"domready"},
    {"name":"qualarooSitePerformance","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-58da967c64746d397200beb4.js"}]}]}],"scope":{"URI":{"include":[/(\/quality\/site-performance\/qualaroo.html)/i]}},"event":"pagebottom"},
    {"name":"qualarooSiteWideChina","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5ae8e4be64746d748d0012eb.js"}]}]}],"scope":{"URI":{"include":[/(academia|company|products|solutions)/i]},"domains":[/mathworks\.cn$/i]},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("digitalDataInternalTraffic"), /0/i);
}],"event":"domready"},
    {"name":"qualarooTranslationSurvey","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5be1f63d64746d398c002494.js"}]}]}],"scope":{"URI":{"include":[/(products|solutions|campaigns|services|hardware-support|academia|training-schedule)/i]},"subdomains":{"include":[/(ww2|it|de|es|fr|jp|kr)/i]}},"event":"domready"},
    {"name":"quantcast","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5672ffbd64746d5bd3002853.js"}]}]}],"scope":{"URI":{"exclude":[/(academia\/highschool|quality\/site-performance)/i]},"subdomains":{"exclude":[/(la|cn|in|kr|cn|matlabacademy|grader|matlab|go2|dev|aem-auth)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"quantcastGlobalSitePerformance","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-58c9a9ca64746d2cd0006cb6.js"}]}]}],"scope":{"URI":{"include":[/(\/quality\/site-performance\/quantcast-remarketing.html)/i]}},"conditions":[function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"quantcastOrder","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5c38f46864746d516c015615.js"}]}]}],"scope":{"URI":{"include":[/(store\/checkout\/completed)/i]},"subdomains":{"exclude":[/(cn|go2|dev|ww2|in|kr|la|jp)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"resumeSubmit","trigger":[{"engine":"sc","command":"addEvent","arguments":["event20"]}],"scope":{"URI":{"include":[/(company\/jobs\/apply\/job_bids\/confirmation)/i]}},"event":"pagebottom"},
    {"name":"tah-administrators","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5c0e7faf64746d408b01532e.js"}]}]}],"scope":{"URI":{"include":["(/academia/tah-support-program/administrators.html)"]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"tah-educators","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5c0e857e64746d19e600fb4c.js"}]}]}],"scope":{"URI":{"include":[/(\/academia\/tah-support-program\/educators.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"tah-students","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5c0e860f64746d019e014da2.js"}]}]}],"scope":{"URI":{"include":[/(\/academia\/tah-support-program\/students.html)/i]},"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"event":"pagetop"},
    {"name":"target_install_matlab_support_a","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-56ce147464746d5356002237.js"}]}]}],"scope":{"URI":{"include":["support/install-matlab.html"]}},"event":"pagetop"},
    {"name":"tfa_landing_page_conv","trigger":[{"engine":"tnt","command":"addMbox","arguments":[{"mboxGoesAround":"#email_submit_button","mboxName":"tfa_landing_pg_submit_button","arguments":[],"timeout":"1500"}]}],"scope":{"URI":{"include":["/programs/trials/trial_request.html"]},"subdomains":{"include":[/uk/i]},"domains":[/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"tfa_landing_page_h1","trigger":[{"engine":"tnt","command":"addMbox","arguments":[{"mboxGoesAround":"h1","mboxName":"tfa_landing_pg_h1","arguments":[],"timeout":"1500"}]}],"scope":{"URI":{"include":["/programs/trials/trial_request.html"]},"subdomains":{"include":[/uk/i]},"domains":[/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"tfa_landing_page_text","trigger":[{"engine":"tnt","command":"addMbox","arguments":[{"mboxGoesAround":"#content_container \u003e div \u003e div.grid_104 \u003e p:nth-child(1)","mboxName":"tfa_landing_pg_text","arguments":[],"timeout":"1500"}]}],"scope":{"URI":{"include":["programs/trials/trial_request.html"]},"subdomains":{"include":["uk"]},"domains":[/mathworks\.com$/i]},"event":"pagetop"},
    {"name":"training brochure confirmation","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5474952c37643500159c0200.js"}]}]}],"scope":{"URI":{"include":[/\/services\/training\/conf_brochure.html/i]}},"event":"pagetop"},
    {"name":"training onsite conf","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-547495dd3530630015a20200.js"}]}]}],"scope":{"URI":{"include":[/\/services\/training\/confirm_training.html/i]}},"event":"pagetop"},
    {"name":"training quote confirmation","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5473aa533566370015fa0600.js"}]}]}],"scope":{"URI":{"include":["/store/createTrainingQuote.do"]},"protocols":[/https:/i]},"event":"pagetop"},
    {"name":"training store confirmation","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5474937f3835330018710100.js"}]}]}],"scope":{"URI":{"include":[/\/store\/verifySubmit.do/i]}},"event":"pagetop"},
    {"name":"training-browse offering","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-546ce7f06134620015de0100.js"}]}]}],"scope":{"URI":{"include":["/services/training/courses/index.html"]}},"event":"pagetop"},
    {"name":"trg-certified","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-546ce8606237660015670100.js"}]}]}],"scope":{"URI":{"include":["/services/training/certification/index.html"]}},"event":"pagetop"},
    {"name":"trg-download brochure","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-546ccadf3238360018240000.js"}]}]}],"scope":{"URI":{"include":["/services/training/req_brochure.html"]}},"event":"pagetop"},
    {"name":"trial_conv","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-54e3b5e13939370019f70500.js"}]}]}],"scope":{"URI":{"include":["/programs/trials/trial_confirmation.html"]},"domains":[/mathworks\.com$/i]},"event":"pagebottom"},
    {"name":"trials_for_all_landing_conv","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-54e3b49d3939370016880400.js"}]}]}],"scope":{"URI":{"include":["programs/trials/trial_options.html"]},"domains":[/mathworks\.com$/i]},"event":"pagebottom"},
    {"name":"twitter","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5a6285a664746d3edc002109.js"}]}]}],"scope":{"URI":{"exclude":[/(academia\/highschool|\/quality\/site-performance|\/add-ons)/i,/(\/contribute)/i]},"subdomains":{"exclude":[/(coursework|go2|matlab|thingspeak|cn|ww2|kr|dev|aem-auth)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"twitterSitePerformance","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5a46739d64746d7b98002765.js"}]}]}],"scope":{"URI":{"include":[/(\/quality\/site-performance\/twitter.html)/i]}},"conditions":[function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"universityName","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-55cbbb54636135217f0009f6.js"}]}]}],"scope":{"URI":{"include":[/\/tah\//i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("universityName"), /.*/i);
}],"event":"windowload"},
    {"name":"weChat","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5e28b7e364746d2b7a000241.js"}]}]}],"scope":{"URI":{"exclude":[/(academia\/highschool|\/quality\/site-performance)/i]},"subdomains":{"include":[/(ww2)/i],"exclude":[/(grader|go2|dev|matlab[^A-Za-z])/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
}],"event":"pagetop"},
    {"name":"weChatPerformance","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5deeb38264746d3de1000447.js"}]}]}],"scope":{"URI":{"include":[/(quality\/site-performance\/wechat.html)/i]}},"event":"pagetop"},
    {"name":"webStoreDigitalData","trigger":[{"engine":"sc","command":"setVars","arguments":[{"prop36":"digitalDataStatus::true","pageName":"%digitalDataPagePageInfoPageID%"}]}],"conditions":[function(event,target){
if (typeof digitalData.page.pageInfo.status !== "undefined" && digitalData.page.pageInfo.pageID !== "") {
   return true;
}
}],"event":"pagebottom"},
    {"name":"webStoreOrderSector","trigger":[{"command":"loadBlockingScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5851a8b364746d1be9007166.js"}]}]}],"scope":{"URI":{"include":[/(test\/cg\/wsconfirm.html)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("webStoreOrderSector"), /.*/i);
}],"event":"pagetop"},
    {"name":"webStoreOrderSubmit","trigger":[{"engine":"sc","command":"addEvent","arguments":["event35"]}],"scope":{"URI":{"include":[/(store\/verifysubmit.do|store\/checkoutconfirmed.do|checkout\/completed)/i]}},"event":"pagebottom"},
    {"name":"webstoreOrderId","trigger":[{"engine":"sc","command":"setVars","arguments":[{"prop72":"%webStoreOrderId%"}]}],"scope":{"URI":{"include":[/(store\/)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("webStoreOrderId"), /.*/i);
}],"event":"pagebottom"},
    {"name":"yahooCampaigns","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!-- Yahoo Code for your Conversion Page --\u003e\n\u003cscript type=\"text/javascript\"\u003e\n    /* \u003c![CDATA[ */\n    var yahoo_conversion_id = 1000315120;\n    var yahoo_conversion_label = \"XRlUCLHnnHAQy6mOuAM\";\n    var yahoo_conversion_value = 1;\n    /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" src=\"//s.yimg.jp/images/listing/tool/cv/conversion.js\"\u003e\n\u003c/script\u003e\n\n\u003cscript type=\"text/javascript\" language=\"javascript\"\u003e\n  /* \u003c![CDATA[ */\n  var yahoo_ydn_conv_io = \"g4ZvwO4OLDVmfCZwx5Sw\";\n  var yahoo_ydn_conv_label = \"96XJYJY0LA2BPI1L6X7312911\";\n  var yahoo_ydn_conv_transaction_id = _satellite.getVar(\"eloquaFormSubmitId\");\n  var yahoo_ydn_conv_amount = \"1\";\n  /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" language=\"javascript\" charset=\"UTF-8\" src=\"//b90.yahoo.co.jp/conv.js\"\u003e\u003c/script\u003e"}]}],"scope":{"URI":{"include":[/(.*campaigns\/.*)(.*-conf.html.*)|(.*campaigns\/.*)(.*confirmation.*)|(company\/aboutus\/contact_us\/confirmation.html)|(\/company\/aboutus\/contact_us\/quote_confirmation.html)/i]},"subdomains":{"include":[/(jp)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("eloquaFormSubmitId"), /\d/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"yahooOrderAcademic","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!-- Yahoo Code for your Conversion Page --\u003e\n\u003cscript type=\"text/javascript\"\u003e\n    /* \u003c![CDATA[ */\n    var yahoo_conversion_id = 1000315120;\n    var yahoo_conversion_label = \"BWeuCP_ahWkQy6mOuAM\";\n    var yahoo_conversion_value = 1;\n    /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" src=\"//s.yimg.jp/images/listing/tool/cv/conversion.js\"\u003e\n\u003c/script\u003e\n\n\u003cscript type=\"text/javascript\" language=\"javascript\"\u003e\n  /* \u003c![CDATA[ */\n  var yahoo_ydn_conv_io = \"g4ZvwO4OLDVmfCZwx5Sw\";\n  var yahoo_ydn_conv_label = \"HTWH80VBWOMSVE58IS6184465\";\n  var yahoo_ydn_conv_transaction_id = _satellite.getVar(\"webStoreOrderId\");;\n  var yahoo_ydn_conv_amount = \"1\";\n  /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" language=\"javascript\" charset=\"UTF-8\" src=\"//b90.yahoo.co.jp/conv.js\"\u003e\u003c/script\u003e\n"}]}],"scope":{"URI":{"include":[/(store\/checkout\/completed)/i]},"subdomains":{"include":[/(jp)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("webStoreOrderSector"), /(academic)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"yahooOrderComm","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!-- Yahoo Code for your Conversion Page --\u003e\n\u003cscript type=\"text/javascript\"\u003e\n    /* \u003c![CDATA[ */\n    var yahoo_conversion_id = 1000315120;\n    var yahoo_conversion_label = \"1o6fCOrahWkQy6mOuAM\";\n    var yahoo_conversion_value = 1;\n    /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" src=\"//s.yimg.jp/images/listing/tool/cv/conversion.js\"\u003e\n\u003c/script\u003e\n\n\u003cscript type=\"text/javascript\" language=\"javascript\"\u003e\n  /* \u003c![CDATA[ */\n  var yahoo_ydn_conv_io = \"g4ZvwO4OLDVmfCZwx5Sw\";\n  var yahoo_ydn_conv_label = \"59994VOF7YD71AWXOFI184466\";\n  var yahoo_ydn_conv_transaction_id = _satellite.getVar(\"webStoreOrderId\");\n  var yahoo_ydn_conv_amount = \"1\";\n  /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" language=\"javascript\" charset=\"UTF-8\" src=\"//b90.yahoo.co.jp/conv.js\"\u003e\u003c/script\u003e\n"}]}],"scope":{"URI":{"include":[/(store\/checkout\/completed)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("webStoreOrderSector"), /(standard)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"yahooOrderHome","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!-- Yahoo Code for your Conversion Page --\u003e\n\u003cscript type=\"text/javascript\"\u003e\n    /* \u003c![CDATA[ */\n    var yahoo_conversion_id = 1000315120;\n    var yahoo_conversion_label = \"n-c3CJTVhWkQy6mOuAM\";\n    var yahoo_conversion_value = 1;\n    /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" src=\"//s.yimg.jp/images/listing/tool/cv/conversion.js\"\u003e\n\u003c/script\u003e\n\n\u003cscript type=\"text/javascript\" language=\"javascript\"\u003e\n  /* \u003c![CDATA[ */\n  var yahoo_ydn_conv_io = \"g4ZvwO4OLDVmfCZwx5Sw\";\n  var yahoo_ydn_conv_label = \"875PDCKNFULV1HHDB12184467\";\n  var yahoo_ydn_conv_transaction_id = _satellite.getVar(\"webStoreOrderId\");\n  var yahoo_ydn_conv_amount = \"1\";\n  /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" language=\"javascript\" charset=\"UTF-8\" src=\"//b90.yahoo.co.jp/conv.js\"\u003e\u003c/script\u003e\n"}]}],"scope":{"URI":{"include":[/(store\/checkout\/completed)/i]},"subdomains":{"include":[/(jp)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("webStoreOrderSector"), /(home)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"yahooOrderStudent","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!-- Yahoo Code for your Conversion Page --\u003e\n\u003cscript type=\"text/javascript\"\u003e\n    /* \u003c![CDATA[ */\n    var yahoo_conversion_id = 1000315120;\n    var yahoo_conversion_label = \"euYHCJ-ygGkQy6mOuAM\";\n    var yahoo_conversion_value = 1;\n    /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" src=\"//s.yimg.jp/images/listing/tool/cv/conversion.js\"\u003e\n\u003c/script\u003e\n\n\u003cscript type=\"text/javascript\" language=\"javascript\"\u003e\n  /* \u003c![CDATA[ */\n  var yahoo_ydn_conv_io = \"g4ZvwO4OLDVmfCZwx5Sw\";\n  var yahoo_ydn_conv_label = \"LQD3BCCLCC2AU45LOEF184468\";\n  var yahoo_ydn_conv_transaction_id = _satellite.getVar(\"webStoreOrderId\");\n  var yahoo_ydn_conv_amount = \"1\";\n  /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" language=\"javascript\" charset=\"UTF-8\" src=\"//b90.yahoo.co.jp/conv.js\"\u003e\u003c/script\u003e\n"}]}],"scope":{"URI":{"include":[/(store\/checkout\/completed)/i]},"subdomains":{"include":[/(jp)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("webStoreOrderSector"), /(student)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"yahooSS","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!-- Yahoo Code for your Target List --\u003e\n\u003cscript type=\"text/javascript\"\u003e\n/* \u003c![CDATA[ */\nvar yahoo_ss_retargeting_id = 1000315120;\nvar yahoo_sstag_custom_params = window.yahoo_sstag_params;\nvar yahoo_ss_retargeting = true;\n/* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" src=\"//s.yimg.jp/images/listing/tool/cv/conversion.js\"\u003e\n\u003c/script\u003e"}]}],"scope":{"URI":{"exclude":[/(academia\/highschool|\/quality\/site-performance)/i]},"subdomains":{"include":[/(jp|explore)/i],"exclude":[/(matlabacademy|grader|matlab|go2|dev)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"yahooSSSitePerformance","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!-- Yahoo Code for your Target List --\u003e\n\u003cscript type=\"text/javascript\"\u003e\n/* \u003c![CDATA[ */\nvar yahoo_ss_retargeting_id = 1000315120;\nvar yahoo_sstag_custom_params = window.yahoo_sstag_params;\nvar yahoo_ss_retargeting = true;\n/* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" src=\"//s.yimg.jp/images/listing/tool/cv/conversion.js\"\u003e\n\u003c/script\u003e"}]}],"scope":{"URI":{"include":[/(\/quality\/site-performance\/yahoo-remarketing-ss.html)/i]}},"conditions":[function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"yahooSiteGeneral","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003cscript async src=\"https://s.yimg.jp/images/listing/tool/cv/ytag.js\"\u003e\u003c/script\u003e\n\u003cscript\u003e\nwindow.yjDataLayer = window.yjDataLayer || [];\nfunction ytag()\n\n{ yjDataLayer.push(arguments); }\nytag(\n\n{\"type\":\"ycl_cookie\"}\n);\n\u003c/script\u003e"}]}],"scope":{"URI":{"exclude":[/(academia\/highschool|\/quality\/site-performance)/i]},"subdomains":{"include":[/(jp|explore)/i],"exclude":[/(matlabacademy|grader|matlab|go2|dev)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagetop"},
    {"name":"yahooSiteGeneralPerformance","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003cscript async src=\"https://s.yimg.jp/images/listing/tool/cv/ytag.js\"\u003e\u003c/script\u003e\n\u003cscript\u003e\nwindow.yjDataLayer = window.yjDataLayer || [];\nfunction ytag() { yjDataLayer.push(arguments); }\nytag({\"type\":\"ycl_cookie\"});\n\u003c/script\u003e"}]}],"scope":{"URI":{"include":[/(quality\/site-performance\/yahoo)/i]}},"event":"pagetop"},
    {"name":"yahooTrial","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!-- Yahoo Code for your Conversion Page --\u003e\n\u003cscript type=\"text/javascript\"\u003e\n    /* \u003c![CDATA[ */\n    var yahoo_conversion_id = 1000315120;\n    var yahoo_conversion_label = \"r_a-CP6xgGkQy6mOuAM\";\n    var yahoo_conversion_value = 1;\n    /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" src=\"//s.yimg.jp/images/listing/tool/cv/conversion.js\"\u003e\n\u003c/script\u003e\n\n\u003cscript type=\"text/javascript\" language=\"javascript\"\u003e\n  /* \u003c![CDATA[ */\n  var yahoo_ydn_conv_io = \"g4ZvwO4OLDVmfCZwx5Sw\";\n  var yahoo_ydn_conv_label = \"D7766LUK3BS2HXUGEFI184458\";\n  var yahoo_ydn_conv_transaction_id = _satellite.getVar(\"eloquaFormSubmitId\");\n  var yahoo_ydn_conv_amount = \"1\";\n  /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" language=\"javascript\" charset=\"UTF-8\" src=\"//b90.yahoo.co.jp/conv.js\"\u003e\u003c/script\u003e\n\n\u003cimg src=\"//b90.yahoo.co.jp/c?yahoo_ydn_conv_io=g4ZvwO4OLDVmfCZwx5Sw\u0026yahoo_ydn_conv_label=D7766LUK3BS2HXUGEFI184458\u0026yahoo_ydn_conv_transaction_id=\u0026yahoo_ydn_conv_amount=1\u0026guid=ON\" width=\"1\" height=\"1\" border=\"0\" /\u003e"}]}],"scope":{"URI":{"include":[/(downloads|campaigns\/products\/trials\/assisted\/confirmation.html|matlab-convert-to-c-trial-request-conf.html|matlab-compiler-trial-conf.html)/i]},"subdomains":{"include":[/(jp)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("eloquaFormSubmitId"), /\d/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"yahooWebinars","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!-- Yahoo Code for your Conversion Page --\u003e\n\u003cscript type=\"text/javascript\"\u003e\n    /* \u003c![CDATA[ */\n    var yahoo_conversion_id = 1000315120;\n    var yahoo_conversion_label = \"3aSlCLrnnHAQy6mOuAM\";\n    var yahoo_conversion_value = 1;\n    /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" src=\"//s.yimg.jp/images/listing/tool/cv/conversion.js\"\u003e\n\u003c/script\u003e\n\n\u003cscript type=\"text/javascript\" language=\"javascript\"\u003e\n  /* \u003c![CDATA[ */\n  var yahoo_ydn_conv_io = \"g4ZvwO4OLDVmfCZwx5Sw\";\n  var yahoo_ydn_conv_label = \"XVTMNEXQV8O3VEWXG6M312912\";\n  var yahoo_ydn_conv_transaction_id = _satellite.getVar(\"eloquaFormSubmitId\");\n  var yahoo_ydn_conv_amount = \"1\";\n  /* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" language=\"javascript\" charset=\"UTF-8\" src=\"//b90.yahoo.co.jp/conv.js\"\u003e\u003c/script\u003e"}]}],"scope":{"URI":{"include":[/(.*\/videos\/.*)/i]},"subdomains":{"include":[/(jp)/i],"exclude":[/(matlabacademy|coursework|go2)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(){
return _satellite.textMatch(_satellite.getVar("eloquaFormSubmitId"), /\d/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"yahooYDN","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!-- Yahoo Code for your Target List --\u003e\n\u003cscript type=\"text/javascript\" language=\"javascript\"\u003e\n/* \u003c![CDATA[ */\nvar yahoo_retargeting_id = 'LQTLVL8PN4';\nvar yahoo_retargeting_page_type = '';\nif (typeof _satellite.getVar(\"potentialUseQueryString\") !== 'undefined' \u0026\u0026 _satellite.getVar(\"potentialUseQueryString\") !== \"\")\n{\n  var yahoo_retargeting_label = _satellite.getVar(\"potentialUseQueryString\");\n}\na = '';\nb = '';\n\n// if (typeof _satellite.getVar(\"eloquaFormName\") !== 'undefined' \u0026\u0026 _satellite.getVar(\"eloquaFormName\") !== \"\")\n// {\n//  var a = _satellite.getVar(\"eloquaFormName\");\n// }\n\nif (typeof _satellite.getVar(\"productInfo\") !== 'undefined' \u0026\u0026 _satellite.getVar(\"productInfo\") !== \"\")\n{\n  var b = _satellite.getVar(\"productInfo\");\n}\nvar yahoo_retargeting_items = [{item_id: b, category_id: '', price: '', quantity: ''}];\n\n/* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" language=\"javascript\" src=\"//b92.yahoo.co.jp/js/s_retargeting.js\"\u003e\u003c/script\u003e"}]}],"scope":{"URI":{"exclude":[/(academia\/highschool|\/quality\/site-performance)/i]},"subdomains":{"include":[/(jp|explore)/i],"exclude":[/(matlabacademy|grader|matlab|go2|dev)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("docViewer"), /(""|^((?!product|online).)*$)/i);
},function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"yahooYDNSitePerformance","trigger":[{"command":"writeHTML","arguments":[{"html":"\u003c!-- Yahoo Code for your Target List --\u003e\n\u003cscript type=\"text/javascript\" language=\"javascript\"\u003e\n/* \u003c![CDATA[ */\nvar yahoo_retargeting_id = 'LQTLVL8PN4';\nvar yahoo_retargeting_page_type = '';\nif (typeof _satellite.getVar(\"potentialUseQueryString\") !== 'undefined' \u0026\u0026 _satellite.getVar(\"potentialUseQueryString\") !== \"\")\n{\n  var yahoo_retargeting_label = _satellite.getVar(\"potentialUseQueryString\");\n}\na = '';\nb = '';\n\nif (typeof _satellite.getVar(\"eloquaFormName\") !== 'undefined' \u0026\u0026 _satellite.getVar(\"eloquaFormName \") !== \"\")\n{\n  var a = _satellite.getVar(\"eloquaFormName\");\n}\n\nif (typeof _satellite.getVar(\"productInfo\") !== 'undefined' \u0026\u0026 _satellite.getVar(\"productInfo\") !== \"\")\n{\n  var b = _satellite.getVar(\"productInfo\");\n}\nvar yahoo_retargeting_items = [{item_id: b, category_id: a, price: '', quantity: ''}];\n\n/* ]]\u003e */\n\u003c/script\u003e\n\u003cscript type=\"text/javascript\" language=\"javascript\" src=\"//b92.yahoo.co.jp/js/s_retargeting.js\"\u003e\u003c/script\u003e"}]}],"scope":{"URI":{"include":[/(\/quality\/site-performance\/yahoo-remarketing-ydn.html)/i]}},"conditions":[function(event,target){
var inboundUrl = window.location.href; 
var inboundEmailPosition = inboundUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/);
if (inboundEmailPosition < 0){
  return true; 
}
}],"event":"pagebottom"},
    {"name":"Pers_DA (form submit) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/\/campaigns\/offers\/machine-learning-with-matlab.confirmation.html/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.da_conf":"true"}]}]},
    {"name":"Pers_DA (profile+category) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(machine-learning|risk-management-solution-for-energy-markets|adaboost|algorithme-genetique|composantes-principales|clusteranalyse|cluster-analysis|cross-validation|feature-selection|\/kreuzvalidierung|linear-model|linear-programming|linear-regression|load-forecasting|matlab-gpu|monte-carlo|programmation-lineaire|programmazione-lineare|regressione-lineare|regression-lineaire|supervised-learning|support-vector-machine|\/analyzing-|market-basket|bayesian|data-science|artificial-neural-networks-for-beginners|text-mining|social-network-analysis|organize-data|crash-detection|algorithmic-trading-and-artificial-intelligence|visualizing-data|analyzing-test-data|big-data|data-analysis|data-driven|data-mining|neural-network|price-forecasting|face-recognition|mathematical-modeling|matlab-for-excel|statistical|sensor-data-analy|database-explorer|time-series|prescriptive-analytics|big\+data|data-analytics|numeros-aleatorios|smoothing|dan.html|analyzing-and-visualizing|mal.html|text-analytics|control-chart|natural-language-processing|sentiment-analysis|camera-calibration|Machine\+learning|Cluster\+Analysis|linear\+model|linear\+programming|linear\+regression|load\+forecasting|monte\+carlo|supervised\+learning|market\+basket|data\+science|text\+mining|artificial\+intelligence|neural\+network|price\+forecasting|face\+recognition|time\+series|prescriptive\+analytics|data\+analysis|text\+analytics|data\+analytics|hadoop|mapreduce|statistic)/i],"exclude":[/(machine-learning-with-matlab.confirmation.html|matlab-analytics|matlab-vs-r|computer-vision-and-machine-learning|object-recognition-deep-learning-and-machine-learning-for-computer-vision|machine-learning-vs-deep-learning|machine\+learning\+vs\+deep\+learning|matlab\+vs\+r|predictive|predictivo|predittiva)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"user.categoryId":"Data Analytics","profile.MI-EDA":"Data Analytics","profile.MI-last":"Data Analytics","profile.MI-last2":"Data Analytics"}]}]},
    {"name":"Pers_DA cheat sheet (form submit) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/\/campaigns\/offers\/data-science-cheat-sheets.confirmation.html/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.dscheatsheet_conf":"true"}]}]},
    {"name":"Pers_DA-Dl combined (category+profile) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(matlab-analytics|matlab-vs-r|computer-vision-and-machine-learning|object-recognition-deep-learning-and-machine-learning-for-computer-vision|machine-learning-vs-deep-learning|machine\+learning\+vs\+deep\+learning|matlab\+vs\+r)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"user.categoryId":"Deep Learning, Data Analytics","profile.MI-EDA":"Data Analytics","profile.MI-DL":"Deep Learning"}]}]},
    {"name":"Pers_DL (form submit) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/\/campaigns\/offers\/deep-learning-with-matlab.confirmation.html/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.dl_conf":"true"}]}]},
    {"name":"Pers_DL (profile+category) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(deep-learning|opencv|image|motion-detection|video-processing|feature-extraction|optical-flow|color-profile|edge-detection|lab-color|stereo-vision|kalman|color-based-segmentation|thermal-analysis|appearance-check|camera-calibration|robotic-vision|visual-inspection|object-detection|reconnaissance-faciale|computer-vision|face-recognition|pattern-recognition|ransac|digitale-bildverarbeitung|reconocimiento-facial|vision-artificial|riconoscimento-facciale|semantic-segmentation|neural-network|object-recognition|lstm|tensorflow|\/ai-|ground-truth-labeler-app|deep\+learning|neural\+network|computer\+vision|face recognition|face\+recognition|computer\+vision|pattern\+recognition|semantic\+segmentation|convolutional|object\+recognition|-ai-|visual\+inspection|tensorflow|spectroscopy|nnet|artificial-intelligence|artificial\+intelligence|cnn)/i],"exclude":[/(deep-learning-with-matlab.confirmation|matlab-analytics|matlab-vs-r|computer-vision-and-machine-learning|object-recognition-deep-learning-and-machine-learning-for-computer-vision|machine-learning-vs-deep-learning|machine\+learning\+vs\+deep\+learning|matlab\+vs\+r|predictive|predictivo|predittiva)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"user.categoryId":"Deep Learning","profile.MI-DL":"Deep Learning","profile.MI-last":"Deep Learning","profile.MI-last2":"Deep Learning"}]}]},
    {"name":"Pers_DL-ipcv - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(semantic-segmentation|image|optical-flow|color-profile|edge-detection|lab-color|color-based-segmentation|motion-detection|opencv|thermal-analysis|appearance-check|camera-calibration|robotic-vision|visual-inspection|object-detection|reconnaissance-faciale|computer-vision|face-recognition|pattern-recognition|ransac|digitale-bildverarbeitung|reconocimiento-facial|vision-artificial|riconoscimento-facciale|object-recognition|computer\+vision|face recognition|face\+recognition|computer\+vision|pattern\+recognition|semantic\+segmentation)/i],"exclude":[/(deep-learning-with-matlab.confirmation)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.dl-ipcv":"true"}]}]},
    {"name":"Pers_DL-signal(profile) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(feature-extraction|acoustic-scene-recognition|voice-activity-detection|speech2text|signallabeler|waveform|radar-target-classification|speech|noise|audio|wavelet|signal)/i],"exclude":[/(\/campaigns\/offers\/deep-learning-for-signal-processing-white-paper.confirmation.html)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.dl-signal":"true"}]}]},
    {"name":"Pers_DLvsML (form submit) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/\/campaigns\/offers\/deep-learning-vs-machine-learning-algorithm.confirmation.html/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.dsml-conf":"true"}]}]},
    {"name":"Pers_MPCL (form submit) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/\/campaigns\/offers\/mppt-algorithm-models.confirmation.html/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.mi-mpcl_conf":"true"}]}]},
    {"name":"Pers_MPCL(profile+category) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(motor|battery|mppt|pulse-width|data-driven-control|f28069|infusion-pump|power-network|lithium|real-time-simulation|buckeye-bullet|ac-power|power-point-tracking|roadster|surgical-stapler|li-ion|plug-in-series-hybrid|electric-vehicle|boost-converter|control-system|power-converter|physmod|hybrid-electric|vehicle-electrical|multilevel-converters|solar-power|real-time-hardware-testing|power-electronic|hydraulic-pump|solar-inverter|servo-drive|wind-power|photovoltaic|electric-bike|hybrid-truck|hybrid-powertrain|pid-controller|solar|pmsm|power-system|buck-converter|power-electronics|field-oriented-control|field oriented control|pid-control|clarke-and-park|power-conver|targeted\/mpc|motor-modeling|system-control|power-control|pulse\+width|infusion\+pump|real\+time+simulation|buckeye\+bullet|ac\+power|power\+point\+tracking|surgical\+stapler|li\+ion|plug-in\+hybrid|electric\+vehicle|boost\+converter|control\+system|power\+converter|hybrid\+electric|multilevel\+converters|solar\+power|real\+time\+testing|power\+electronic|hydraulic\+pump|solar\+inverter|servo\+drive|wind\+power|electric\+bike|hybrid\+truck|hybrid\+powertrain|pid\+controller|power\+system|buck\+converter|power\+electronics|pid\+control|clarke\+and\+park|incremental\+conductance|voltage|lithium\+ion|Perturb\+and\+Observe|BMS|wind|pv|Li\+ion|pwm|dc-dc|ac-dc|dc-ac|ac-ac|powertrain|pump|bldc)/i],"exclude":[/\/campaigns\/offers\/mppt-algorithm-models.confirmation.html/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"user.categoryId":"Motor and Power control","profile.MI-last":"Motor and Power control","profile.MI-MPC":"Motor and Power control","profile.MI-last2":"Motor and Power control"}]}]},
    {"name":"Pers_TAH_clickers - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.tah_click":"true"}]}],"conditions":[function(){
return _satellite.textMatch(_satellite.getQueryParam('s_tid'), /(try_offer_pers_tahpor|aa_pers_tahgen|sv_offer1_pers_tahpor|sv_offer2_pers_tahpor|hp_offer_pers_tahpor|hp_offer_pers_rampuni|aa_ei_pers_tahgen|aa_wfn_pers_tahgen|edunudge_dl2|edunudge_learn2|edunudge_ml2|aa_getml_pers_tahgen|aa_mlst_pers_tahgen)/i)
}]},
    {"name":"Pers_WL (form submit) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/\/campaigns\/offers\/wireless-design-ebook.confirmation.html/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.wl_conf":"true"}]}]},
    {"name":"Pers_WL (profile+category) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(wireless|channel-model|mimo|ofdm|radar|s-parameter|lte|communication|5g|802-11|beamforming|rfsoc|radio|sensor-fusion|rf-|phased-array|\/comm\/|waveform|qam|doppler|ldpc|awgn|frequency|acpr|ber-simulations|spatial-multiplexing|802-15-4|fading-channel|modem|near-field|ber-performance|baseband|qpsk|bit-error-rate|bluetooth|\/ble-|far-field|fpga|microwave|\/wds|802.11|ccdf|ber\+simulations|spatial\+multiplexing|802.15.4|fading\+channel|near\+field|bit\+error\+rate|far\+field)/i],"exclude":[/\/campaigns\/offers\/wireless-design-ebook.confirmation.html/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"user.categoryId":"Wireless","profile.MI-last":"Wireless","profile.MI-WL":"Wireless","profile.MI-last2":"Wireless"}]}]},
    {"name":"Pers_WL_topic: 5G-LTE - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-)/i],"exclude":[/(\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|communications-system-toolbox|antenna|jobs|\/rf-|-rf-|-mimo-|hybrid-beamforming|radar|bluetooth|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design|wlan|wifi)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.MI-WL":"Wireless","profile.MI-last2":"Wireless","profile.topic-WL-5g-lte":"true","user.categoryId":"Wireless,5g-lte"}]}]},
    {"name":"Pers_WL_topic: RF - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(\/rf-|-rf-|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design)/i],"exclude":[/(antenna|-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-|\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|communications-system-toolbox|jobs|-mimo-|hybrid-beamforming|radar|bluetooth|wlan|wifi)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.MI-WL":"Wireless","profile.MI-last2":"Wireless","profile.topic-WL-RF":"true","user.categoryId":"Wireless,RF"}]}]},
    {"name":"Pers_WL_topic: Radar - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/radar/i],"exclude":[/(antenna|-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-|\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|communications-system-toolbox|jobs|\/rf-|-rf-|-mimo-|hybrid-beamforming|bluetooth|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design|wlan|wifi)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.MI-WL":"Wireless","profile.MI-last2":"Wireless","profile.topic-WL-radar":"true","user.categoryId":"Wireless,radar"}]}]},
    {"name":"Pers_WL_topic: WLAN - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(wlan|wifi)/i],"exclude":[/(antenna|jobs|\/rf-|-rf-|-mimo-|hybrid-beamforming|radar|bluetooth|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.MI-WL":"Wireless","profile.MI-last2":"Wireless","profile.topic-WL-WLAN":"true","user.categoryId":"Wireless,WLAN"}]}]},
    {"name":"Pers_WL_topic: Wireless - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|digital-communication|communications-system-toolbox|signal-processing-communications|mmwave-communication|signal-processing-and-communications)/i],"exclude":[/(-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-|antenna|jobs|\/rf-|-rf-|-mimo-|hybrid-beamforming|radar|bluetooth|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design|wlan|wifi)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.MI-WL":"Wireless","profile.MI-last2":"Wireless","  profile.topic-WL-Wireless":"true","user.categoryId":"Wireless,wireless-topic"}]}]},
    {"name":"Pers_WL_topic: antenna - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/antenna/i],"exclude":[/(-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-|\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|communications-system-toolbox|jobs|\/rf-|-rf-|-mimo-|hybrid-beamforming|radar|bluetooth|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design|wlan|wifi)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.MI-WL":"Wireless","profile.MI-last2":"Wireless","  profile.topic-WL-antenna":"true","user.categoryId":"Wireless,antenna"}]}]},
    {"name":"Pers_WL_topic: bluetooth - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/bluetooth/i],"exclude":[/(antenna|-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-|\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|communications-system-toolbox|jobs|\/rf-|-rf-|-mimo-|hybrid-beamforming|radar|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design|wlan|wifi)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.MI-WL":"Wireless","profile.MI-last2":"Wireless","profile.topic-WL-bluetooth":"true","user.categoryId":"Wireless,bluetooth"}]}]},
    {"name":"Pers_WL_topic: mimo - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(-mimo-|hybrid-beamforming)/i],"exclude":[/(bluetooth|antenna|-lte-|\/lte.|-5g-|\/5g\/|\/5g.|\/5g-|\/examples\/communications|\/solutions\/communications|communication-toolbox|\/products\/communications|wireless|communication-systems-course-using-sdr|communications-toolbox|communications-system-toolbox|jobs|\/rf-|-rf-|radar|rfsoc|xilinx|rf-power-amps|rfblockset|rf-simulation|-dpd|-fpga|software-defined-ratio|fixed-point-design|wlan|wifi)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.MI-WL":"Wireless","profile.MI-last2":"Wireless","  profile.topic-WL-mimo":"true","user.categoryId":"Wireless,mimo"}]}]},
    {"name":"Pers_autosar_offer - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/\/campaigns\/offers\/deploy-autosar-using-simulink/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.autosaroffer":"true"}]}]},
    {"name":"Pers_da-dlexit_offer - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/\/videos\/introduction-to-deep-learning-machine-learning-vs-deep-learning/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.DA-DLexitoffer":"true"}]}]},
    {"name":"Pers_exitint - (Global Mbox Parameters)","event":"aftertoolinit","trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.exitint":"true"}]}],"conditions":[function(){
return _satellite.textMatch(_satellite.getQueryParam('s_tid'), /exitint_.*/i)
}]},
    {"name":"Pers_mpclexit_offer - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/\/videos\/series\/field-oriented-control-with-simulink/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.mpclexitoffer":"true"}]}]},
    {"name":"Pers_predictive (category) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(predictive|predictivo|predittiva)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"user.categoryId":"Predictive Analytics","profile.MI-Pred":"Perdictive","profile.MI-last":"Predictive","profile.MI-last2":"Predictive"}]}]},
    {"name":"Pers_predmaint_offer - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/\/campaigns\/offers\/introduction-to-predictive-maintenance-with-matlab/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.predmainoffer":"true"}]}]},
    {"name":"Pers_topic_autosar (profile) - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(autosar|embedded-coder|iso26262|simulink-coder)/i],"exclude":[/(\/offers\/deploy-autosar-using-simulink)/i]}},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.topic-last":"autosar","profile.topic":"autosar"}]}]},
    {"name":"Pers_wfnudge - (Global Mbox Parameters)","event":"aftertoolinit","trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.nudge":"true"}]}],"conditions":[function(){
return _satellite.textMatch(_satellite.getQueryParam('s_tid'), /nudge_.*/i)
}]},
    {"name":"Pers_wlexit_offer - (Global Mbox Parameters)","event":"aftertoolinit","scope":{"URI":{"include":[/(\/videos\/series\/5g-explained|\/videos\/5g-explained)/i]},"domains":[/mathworks\.cn$/i,/mathworks\.com$/i]},"trigger":[{"engine":"tnt","command":"addTargetPageParams","arguments":[{"profile.wlexitoffer":"true"}]}]}
  ],
  "rules": [
    {"name":"AdRollTrngSch","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5ab2ab2464746d58b400850e.js"}]}]}],"scope":{"URI":{"include":[/(training-schedule\/deep-learning-onramp)/i]}},"selector":"a[href*=\"matlabacademy.mathworks.com/selfpaced/deeplearning\"]","event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"IID","trigger":[{"command":"loadScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-56a84f5964746d77c900040d.js"}]}]},{"command":"delayActivateLink"}],"scope":{"URI":{"exclude":[/(campaigns\/products\/trials.confirmation.html)/i]}},"selector":"a","property":{"data-link":"lead","data-toggle":/^(?!lightbox).*$/i},"event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"analyticsMlcProfileLink","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"MlcProfileLink","setVars":{"server":"%server%","channel":"%pageName%"}}]}],"selector":".analyticsMlcProfileLink","event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"analyticsMlcProfileModal","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"MlcProfileModal","setVars":{"server":"%server%"}}]}],"selector":".analyticsMlcProfileModal","event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"analyticsMlcProfileView","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"MlcProfileView","setVars":{"server":"%server%","channel":"%pageName%"}}]}],"selector":".anlalyticsMlcProfileView","event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"answersMtOff","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"answersMtOff","setVars":{"referrer":"%referrer%","server":"%server%"}}]}],"scope":{"URI":{"include":[/(answers)/i]},"subdomains":{"include":[/(jp)/i]}},"selector":".turn_off_mt","event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"answersMtOn","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"answersMtOn","setVars":{"referrer":"%referrer%","server":"%server%"}}]}],"scope":{"URI":{"include":[/(answers)/i]}},"selector":".turn_on_mt","event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"campaignFormPathOfferClick","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"CampaignModalClick","setVars":{"eVar35":"%campaignFormPathOfferClick%"}}]},{"command":"delayActivateLink"}],"selector":"[data-link]","property":{"data-link":"lead-modal"},"eventHandlerOnElement":true,"event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"confirmationChat","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"Chat Impression","setVars":{"eVar80":"%pageName%","pageURL":"%pageName%"}}]},{"command":"loadScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5dd41f8464746d5348003a1c.js"}]}]}],"scope":{"URI":{"include":[/(campaigns\/offers.*confirmation)|(target-chat.html)/i]}},"conditions":[function(){
return _satellite.textMatch(_satellite.getVar("chatImpressions"), "chat is visible");
}],"selector":".chatnow_button","eventHandlerOnElement":true,"event":"inview","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false,"inviewDelay":1000},
    {"name":"docMchTrns","trigger":[{"command":"loadScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-56c75c2564746d4bf0000e02.js"}]}]},{"command":"delayActivateLink"}],"scope":{"URI":{"include":[/.*help.*/i]}},"selector":"button#translateBtn.btn.btn-primary","event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"epsClickTracking","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"%epsClickTracking%","setVars":{"eVar14":"%epsClickTracking%"}}]},{"command":"delayActivateLink"}],"selector":"[data-track-click]","eventHandlerOnElement":true,"event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"fxGitHubBadge","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"fxGitHubBadge","setVars":{"pageURL":"%pageName%"}}]}],"selector":"#matlab_fileexchange_badge_copy","event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"hamburgerMenuOpen","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"hamburgerMenuOpen"}]}],"scope":{"subdomains":{"exclude":[/(au|ch|cn|de|es|fr|in|it|jp|kr|nl|se|uk)/i]}},"selector":"#nav-expander","event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"hardwareSupportDownloads","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"%hardwareSupportDownloadID%"}]},{"command":"delayActivateLink"}],"scope":{"URI":{"include":[/(hardware-support\/)/i]}},"selector":"#mw_spi_button_top","event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"interactiveExampleAttribute","trigger":[{"command":"loadScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5c33ab3d64746d728c01b66a.js"}]}]},{"command":"delayActivateLink"}],"selector":"[data-liveeditorexample]","eventHandlerOnElement":true,"event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"internalSearchFacet","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"setVars":{"prop49":"%internalSearchApp%","prop50":"%internalSearchTerm%","prop51":"%internalSearchPage%","prop52":"%internalSearchFacet%","prop63":"%internalSearchTypeAhead%"}}]}],"conditions":[function(event,target){
if (typeof SearchTracking != 'undefined' && (typeof SearchTracking.term != 'undefined' || typeof SearchTracking.facets != 'undefined')) {
  return true;
}
}],"event":"locationchange","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"mlPythonLearnView","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"ml_python_view","setVars":{"eVar14":"ml_python_view"}}]}],"scope":{"URI":{"include":["/products/matlab/matlab-vs-python.html"]}},"selector":"#rotating_features \u003e div \u003e div \u003e div \u003e div.container.hidden-md.hidden-sm \u003e div \u003e div.col-xs-12.col-sm-10 \u003e div \u003e div \u003e a:nth-child(2)","event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"mlPythonLearnWhy","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"ml_python_why","setVars":{"eVar14":"ml_python_why"}}]}],"scope":{"URI":{"include":["/products/matlab/matlab-vs-python.html"]}},"selector":"#rotating_features \u003e div \u003e div \u003e div \u003e div.container.hidden-md.hidden-sm \u003e div \u003e div.col-xs-12.col-sm-10 \u003e div \u003e div \u003e a:nth-child(1)","event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"mlcHomepageTabs","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"%this.name%"}]}],"scope":{"URI":{"include":[/(matlabcentral)/i]}},"selector":"#mlc-home-tab","eventHandlerOnElement":true,"event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"openWith","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"openWith","addEvent":["event68"]}]}],"selector":".analyticsOpenWith","event":"click","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false},
    {"name":"pricingLicensingProductCode","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"setVars":{"eVar69":"%productCode%"}}]}],"scope":{"URI":{"include":[/\/pricing-licensing.html/i]}},"event":"locationchange","bubbleFireIfParent":true,"bubbleFireIfChildFired":true,"bubbleStop":false}
  ],
  "directCallRules": [
    {"name":"moats_success","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"moatsRegistration","addEvent":["event61"]}]}]},
    {"name":"trialChat","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"TrialChat","setVars":{"eVar66":"%trialChatEventName%","eVar75":"%trialChatEmailDomain%","eVar76":"%trialChatEmailFlag%","prop53":"%trialChatEventId%","server":"%server%","pageURL":"%pageName%"},"addEvent":["event79"]}]}]},
    {"name":"eloquaEmailNextStep","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"formSubmit","setVars":{"eVar66":"%eloquaFormName%","eVar78":"%campaignFormPath%","prop75":"%campaignFormPath%","server":"%server%","pageName":"%pageName%","channel":"%pageName%"}}]}]},
    {"name":"cruxTypeAhead","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"Crux Typeahead","setVars":{"prop49":"%internalSearchApp%","prop50":"%internalSearchTerm%","prop51":"%internalSearchPage%","prop52":"%internalSearchFacet%","prop63":"%cruxTypeAheadSearch%"}}]}]},
    {"name":"eloquaEmail","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"eloquaFormSubmitted","setVars":{"eVar75":"%eloquaEmailDomain%","eVar76":"%eloquaEmailFlag%","server":"%server%","pageURL":"%pageName%"}}]},{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5b0d9b7864746d45be002eae.js"}]}]}]},
    {"name":"eloquaFormSubmit","trigger":[{"command":"loadScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5c116e9164746d415a015ba2.js"}]}]}]},
    {"name":"inboundConversion","trigger":[{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5e58436664746d600e0007de.js"}]}]}]},
    {"name":"mlac_accessed","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"matlabAcademyCourseAccess","setVars":{"eVar77":"%matlabAcademyCourseName%","server":"%server%","pageURL":"%pageName%"},"addEvent":["event70"]}]}]},
    {"name":"mlac_halfway","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"matlabAcademyCourseHalfway","setVars":{"eVar77":"%matlabAcademyCourseName%","server":"%server%","channel":"%pageName%","pageURL":"%pageName%"},"addEvent":["event72"]}]},{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5b43cb0a64746d314f001e3b.js"}]}]}]},
    {"name":"mlac_start","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"matlabAcademyCourseStart","setVars":{"eVar77":"%matlabAcademyCourseName%","server":"%server%","pageURL":"%pageName%"},"addEvent":["event71"]}]},{"command":"loadScript","arguments":[{"sequential":false,"scripts":[{"src":"satellite-5b43ca6c64746d314f001e31.js"}]}]}]},
    {"name":"matrixClose","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"MatrixClose","setVars":{"eVar24":"%pageName%","server":"%server%","visitorID":"%Visitor ID%","pageURL":"%pageName%"},"addEvent":["event85"]}]}]},
    {"name":"matrixOpen","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"MatrixLink","setVars":{"eVar24":"%pageName%","server":"%server%","visitorID":"%Visitor ID%","pageURL":"%pageName%"},"addEvent":["event86"]}]}]},
    {"name":"matrixOpen","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"MatrixOpen","setVars":{"eVar24":"%pageName%","server":"%server%","visitorID":"%Visitor ID%","pageURL":"%pageName%"},"addEvent":["event84"]}]}]},
    {"name":"mlcEvents","trigger":[{"command":"loadScript","arguments":[{"sequential":true,"scripts":[{"src":"satellite-5bda106764746d7783000aa5.js"}]}]}]},
    {"name":"mwaCreated","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"mwaCreated","setVars":{"eVar58":"%Eloqua2%"},"addEvent":["event69"]}]}]},
    {"name":"onramp_success","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"moatsRegistration","addEvent":["event64"]}]}]},
    {"name":"pagescroll_percent_hit","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"pageScroll","setVars":{"eVar86":"%pageScroll%"}}]}]},
    {"name":"videoMeta","trigger":[{"engine":"sc","command":"trackLink","arguments":[{"type":"o","linkName":"videoMeta","setVars":{"eVar14":"%otherCampaignID%","eVar16":"%server%","eVar22":"%pageName%","eVar23":"%referrer%","eVar71":"%videoType%","eVar72":"%videoRegistration%","pageURL":"%pageName%"}}]}]}
  ],
  "settings": {
    "trackInternalLinks": true,
    "libraryName": "satelliteLib-e8d23c2e444abadc572df06537e2def59c01db09",
    "isStaging": false,
    "allowGATTcalls": false,
    "downloadExtensions": /\.(?:doc|docx|eps|jpg|png|svg|xls|ppt|pptx|pdf|xlsx|tab|csv|zip|txt|vsd|vxd|xml|js|css|rar|exe|wma|mov|avi|wmv|mp3|wav|m4v)($|\&|\?)/i,
    "notifications": false,
    "utilVisible": false,
    "domainList": [
      "mathworks.ch",
      "mathworks.cn",
      "mathworks.co.jp",
      "mathworks.co.kr",
      "mathworks.co.uk",
      "mathworks.com",
      "mathworks.com.au",
      "mathworks.de",
      "mathworks.es",
      "mathworks.fr",
      "mathworks.in",
      "mathworks.it",
      "mathworks.nl",
      "mathworks.se"
    ],
    "scriptDir": "d0cc0600946eb3957f703b9fe43c3590597a8c2c/scripts/",
    "tagTimeout": 3000
  },
  "data": {
    "URI": 
document.location.pathname + document.location.search
,
    "browser": {
    },
    "cartItems": [

    ],
    "revenue": "",
    "host": {
      "http": "assets.adobedtm.com",
      "https": "assets.adobedtm.com"
    }
  },
  "dataElements": {
    "Addons_client": {"queryParam":"client","storeLength":"pageview","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "Addons_Entitlement": {"jsVariable":"addOnExplorerReporting.entitlementId","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "Addons_Release": {"jsVariable":"addOnExplorerReporting.releaseFamily","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "campaign": {"customJS":function(){
const params = new URLSearchParams(location.search);
if (params.has('s_eid')) {
  var campaign = String(params.get('s_eid'));
} else {
  if (params.has('s_v1')) {
    var campaign = String(params.get('s_v1'));
    if(campaign.indexOf('_') > 0) {
      campaign = campaign.substring(0, campaign.indexOf('_'));
    }
  }
  }
 return campaign;
},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "campaignFormPath": {"customJS":function(){
for (i = 0; i < digitalData.event.length; i++) {
  if (i ==  digitalData.event.length -1 && digitalData.event[i].eventInfo.eventAction =='eloquaEmailNextStep'){
    var path = (digitalData.event[i].eventInfo.eventName.toLowerCase());
}
}

if (typeof digitalData.user[0].profile[0].profileInfo.eloquaContactStatus !== 'undefined' && digitalData.user[0].profile[0].profileInfo.eloquaContactStatus !== "")
        {
         var contactStatus = digitalData.user[0].profile[0].profileInfo.eloquaContactStatus;
        }

return contactStatus +":"+ path; 

},"storeLength":"pageview"},
    "campaignFormPathOfferClick": {"customJS":function(){
var offerElement = document.getElementsByTagName('h1');
var offerTitle = offerElement[0].innerHTML;
return "cmpofr_"+offerTitle; 
},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "channel": {"customJS":function(){
var channel = window.location.pathname.split(/#|;jsessionid=|\?|\./gi)[0];
if(channel == '/'){
  channel = 'homepage';
  if(window.location.hostname == 'blogs.mathworks.com'){
    channel = 'blogs index page';
  }
}
return channel;
},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "chatImpressions": {"customJS":function(){
if ($('#target_personalization_spotlight_campaignoffer_chat').attr('class').indexOf('add_display_none') == -1 && $('#target_personalization_spotlight_campaignoffer_chat .chatnow_button').is(":visible")) { return ("chat is visible")} else { return ("chat is hidden")}

},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "cruxTypeAheadSearch": {"jsVariable":"SearchTracking.typeahead","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "digitalDataInternalSearchBoxName": {"customJS":function(){
if (typeof digitalData !== 'undefined' && typeof digitalData.event !== 'undefined' && typeof digitalData.event[1].eventInfo.eventName !== 'undefined')
{
   return digitalData.event[1].eventInfo.eventName;
}
},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "digitalDataInternalTraffic": {"customJS":function(){
if (typeof digitalData.user[0].segment.internalTraffic !== 'undefined' && digitalData.user[0].segment.internalTraffic!== "")
        {
         return digitalData.user[0].segment.internalTraffic;
        }
},"storeLength":"session"},
    "digitalDataPagePageInfoPageID": {"customJS":function(){
if (typeof digitalData.page.pageInfo.pageID !== 'undefined' && digitalData.page.pageInfo.pageID !== "")
{
   return digitalData.page.pageInfo.pageID;
}
},"storeLength":"session"},
    "docTranslate": {"cookie":"targetLang","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "docViewer": {"cookie":"MW_Doc_Template","storeLength":"session","forceLowerCase":true,"cleanText":true},
    "eid": {"queryParam":"s_eid","storeLength":"session","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "Eloqua2": {"customJS":function(){
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
var ele=getCookie("ELOQUA");

var new_Cookie=ele.split('&');var jst_value= new_Cookie[0].split('=');
return(jst_value[1]);
},"storeLength":"session","forceLowerCase":true,"cleanText":true},
    "eloquaFormName": {"customJS":function(){
if (typeof digitalData !=='undefined' && typeof digitalData.event !== 'undefined' && typeof digitalData.event[0].eventInfo !=='undefined' )
{
   return digitalData.event[0].eventInfo.eventName;
}
},"storeLength":"session","forceLowerCase":true,"cleanText":true},
    "eloquaFormSubmitCampaignOffer": {"customJS":function(){
var x = digitalData.event;
var lastArrary = (digitalData.event.length -1);
var correctArrary = digitalData.event[lastArrary];
var campaignOffer = correctArrary.eventInfo.campaignOffer;
return campaignOffer;

},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "eloquaFormSubmitEmailDomain": {"customJS":function(){
var x = digitalData.event;
var lastArrary = (digitalData.event.length -1);
var correctArrary = digitalData.event[lastArrary];
var emailDomain = correctArrary.eventInfo.emailDomain;
return emailDomain;

},"storeLength":"pageview"},
    "eloquaFormSubmitEmailFlag": {"customJS":function(){
var x = digitalData.event;
var lastArrary = (digitalData.event.length -1);
var correctArrary = digitalData.event[lastArrary];
var emailDomain = correctArrary.eventInfo.emailDomain;
var emailFlag = correctArrary.eventInfo.emailFlag;
if (emailFlag =='1'){
  return 'true';
} else 
	if(emailFlag =='0'){
     return 'false';}


},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "eloquaFormSubmitFormName": {"customJS":function(){
var x = digitalData.event;
var lastArrary = (digitalData.event.length -1);
var correctArrary = digitalData.event[lastArrary];
var formName = correctArrary.eventInfo.eventName;
return formName;

},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "eloquaFormSubmitId": {"queryParam":"elqsid","storeLength":"pageview","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "eloquaFormSubmitIdDirectCall": {"customJS":function(){
var x = digitalData.event;
var lastArrary = (digitalData.event.length -1);
var correctArrary = digitalData.event[lastArrary];
var elqsid = correctArrary.eventInfo.elqsid;
return elqsid;

},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "eloquaFormSubmitPotentialUse": {"customJS":function(){
var x = digitalData.event;
var lastArrary = (digitalData.event.length -1);
var correctArrary = digitalData.event[lastArrary];
var use = correctArrary.eventInfo.use;
return use;

},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "eloquaFormSubmitTrialProducts": {"customJS":function(){
var x = digitalData.event;
var lastArrary = (digitalData.event.length -1);
var correctArrary = digitalData.event[lastArrary];
var trialProducts = correctArrary.eventInfo.trialProducts;
return trialProducts;

},"storeLength":"pageview","cleanText":true},
    "eloquaFormSubmitTrialSource": {"customJS":function(){
var x = digitalData.event;
var lastArrary = (digitalData.event.length -1);
var correctArrary = digitalData.event[lastArrary];
var trialOffer = correctArrary.eventInfo.trialOfferSource
return trialOffer;

},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "emailCampaign": {"customJS":function(){
const params = new URLSearchParams(location.search);
if (params.has('s_v1')) {
  var campaign = String(params.get('s_v1'));
  if(campaign.indexOf('_') > 0) {
    campaign = campaign.substring(0, campaign.indexOf('_'));
      }
    } else {
      if(params.has('elqaid')){
        var campaign = String(params.get('elqaid'));
        if(campaign.indexOf('_') > 0) {
          campaign = campaign.substring(0, campaign.indexOf('_'));
            }
          }
      }
  return campaign;
},"storeLength":"pageview"},
    "epsClickTracking": {"customJS":function(){
var el = document.querySelector("[data-track-click]");
return el.dataset.trackClick;
},"storeLength":"pageview"},
    "eventNumber": {"customJS":function(){
var x = digitalData.event;
var lastArrary = (digitalData.event.length -1);
var correctArrary = digitalData.event[lastArrary];
var formName = correctArrary.eventInfo.eventName.toLowerCase();
var pageName = document.location.pathname;
var eventNumber = '';
var trialSource = '';
if (typeof correctArrary.eventInfo.trialOfferSource !== 'undefined' && correctArrary.eventInfo.trialOfferSource !==''){
	trialSource = correctArrary.eventInfo.trialOfferSource.toLowerCase();
}
if (formName.indexOf('_qur_') > -1 || formName.indexOf('quote-request') > -1 ) {
  eventNumber = 'event17';
} else if (formName.indexOf('_vid_') > -1 || formName.indexOf('event-proceedings') > -1) {
  eventNumber = 'event7';
} else if (formName.indexOf('_contact-sales') > -1) {
  eventNumber = 'event2';
} else if (formName.indexOf('_contact-maintenance') > -1) {
  eventNumber = 'event16';
} else if (formName.indexOf('_contact-consulting') > -1) {
  eventNumber = 'event22';
} else if (formName.indexOf('_contact-training') > -1) {
  eventNumber = 'event11';
} else if (formName.indexOf('_training-inquiry') > -1) {
  eventNumber = 'event60';  
} else if ((formName.indexOf('other-download') > -1 || formName.indexOf('collateral') > -1 ) && (pageName.indexOf('_brochure') > -1 || pageName.indexOf('training-request') > -1)) {
  eventNumber = 'event13';
} else if (formName.indexOf('collateral') > -1 && pageName.indexOf('courseware') > -1) {
  eventNumber = 'event56';
} else if (formName.indexOf('collateral') > -1 || formName.indexOf('other-download') > -1) {
  eventNumber = 'event63';
} else if (formName.indexOf('_pricing-information') > -1) {
  eventNumber = 'event57';
} else if (formName.indexOf('physical-event') > -1) {
  eventNumber = 'event6';
} else if (formName.indexOf('virtual-event') > -1) {
  eventNumber = 'event8';
} else if (formName.indexOf('_lev_') > -1) {
  eventNumber = 'event82';
} else if (formName.indexOf('_mwa-create') > -1) {
  eventNumber = 'event69';
} else if (formName.indexOf('trial-agree') > -1) {
  eventNumber ='event1';
} else if (formName.indexOf('trial-targeted') > -1) {
  eventNumber = 'event65';
} else if (formName.indexOf('web-trial-download') > -1 && (pageName.indexOf('targeted') > -1||trialSource.indexOf('target') > -1)){
  eventNumber = 'event65';
} else if (formName.indexOf('web-trial-download') > -1) {
  eventNumber = 'event67';
} else if (formName.indexOf('live-chat') > -1) {
  eventNumber = 'event79';
} else if (formName.indexOf('matlab-online') > -1 && formName.indexOf('trl') > -1) {
  eventNumber = 'event83';
} else if (formName.indexOf('web-trial-request') > -1 && pageName.indexOf('assisted-trial.html') > -1) {
  eventNumber = 'event52';
} else if (formName.indexOf('web-trial-request') > -1) {
  eventNumber = 'event52';
} else if (formName.indexOf('self-serve-act-lic') > -1) {
  eventNumber = 'event66';
} else if (formName.indexOf('self-serve-assisted') > -1) {
  eventNumber = 'event52';
} else if (formName.indexOf('web-trial-mobile') > -1) {
  eventNumber = 'event87';
} else if (formName.indexOf('startup') > -1 || formName.indexOf('accelerators') > -1) {
  eventNumber ='event81';
} else if (formName.indexOf('matlab-home-availability') > -1) {
  eventNumber = 'event80';
} else {
  eventNumber = 'TDB';
};
return eventNumber;
},"storeLength":"pageview","cleanText":true},
    "externalCampaignId": {"queryParam":"s_eid","storeLength":"session","cleanText":true,"ignoreCase":1},
    "facebookEmail": {"customJS":function(){
if (_satellite.getQueryParam("em") !== undefined) {
  var email = _satellite.getQueryParam("em");
} else if (_satellite.getQueryParam("email") !== undefined) {
  var email = _satellite.getQueryParam("email");
}
return email;
},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "FIMTAH": {"jsVariable":"window.studentVerification","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "fpCookieDomainPeriods": {"customJS":function(){
var fpCookieDomainPeriods = "2"; 
var analyticsHostName = window.location.hostname;
if(analyticsHostName.indexOf('.co.uk')>-1||analyticsHostName.indexOf('.co.jp')>-1||analyticsHostName.indexOf('.co.kr')>-1||analyticsHostName.indexOf('.com.au')>-1){
  fpCookieDomainPeriods="3"
};
return fpCookieDomainPeriods; 
},"storeLength":"pageview"},
    "hardwareSupportDownloadID": {"customJS":function(){
a = document.getElementById("mw_spi_button_top") ;
b = a.href ;
c = b.match(/\d+/)[0] ;
return "hardware_mw_spi_button_" +c+ "_top" ;
},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "inquiryType": {"customJS":function(){
var x = digitalData.event;
var lastArrary = (digitalData.event.length -1);
var correctArrary = digitalData.event[lastArrary];
var formName = correctArrary.eventInfo.eventName.toLowerCase();
var pageName = document.location.pathname;
var inquiryType = '';
var trialSource = '';
if (typeof correctArrary.eventInfo.trialOfferSource !== 'undefined' && correctArrary.eventInfo.trialOfferSource !==''){
  trialSource = correctArrary.eventInfo.trialOfferSource.toLowerCase();
}

if (formName.indexOf('_qur_') > -1 || formName.indexOf('quote-request') > -1 ) {
  inquiryType = 'Quote Request';
} else if (formName.indexOf('_vid_') > -1 || formName.indexOf('event-proceedings') > -1) {
  inquiryType = 'Video Registration';
} else if (formName.indexOf('_contact-sales') > -1) {
  inquiryType = 'Contact Sales';
} else if (formName.indexOf('_contact-maintenance') > -1) {
  inquiryType = 'Contact Maintenance'
} else if (formName.indexOf('_contact-consulting') > -1) {
  inquiryType = 'Contact Consulting';
} else if (formName.indexOf('_contact-training') > -1) {
  inquiryType = 'Training At Your Facility';
} else if (formName.indexOf('_training-inquiry') > -1) {
  inquiryType = 'Contact Training';
} else if ((formName.indexOf('other-download') > -1 || formName.indexOf('collateral') > -1 ) && (pageName.indexOf('_brochure') > -1 || pageName.indexOf('training-request') > -1)) {
  inquiryType = 'Training Brouchure Request';
} else if (formName.indexOf('collateral') > -1 && pageName.indexOf('courseware') > -1) {
  inquiryType = 'Courseware Request';
} else if (formName.indexOf('collateral') > -1 || formName.indexOf('other-download') > -1) {
  inquiryType = 'Collateral Request';
} else if (formName.indexOf('_pricing-information') > -1) {
  inquiryType = 'Price List Request';
} else if (formName.indexOf('physical-event') > -1) {
  inquiryType = 'Seminar Registration';
} else if (formName.indexOf('virtual-event') > -1) {
  inquiryType = 'Live Webinar Registration';
} else if (formName.indexOf('_lev_') > -1) {
  inquiryType = 'Large Event Registration';
} else if (formName.indexOf('_mwa-create') > -1) {
  inquiryType = 'MWA Create';
} else if (formName.indexOf('trial-agree') > -1) {
  inquiryType= 'Trial Interest';
} else if (formName.indexOf('trial-targeted') > -1) {
  inquiryType = 'Targeted Trial';
} else if (formName.indexOf('web-trial-download') > -1 && (pageName.indexOf('targeted') > -1||trialSource.indexOf('target') > -1)){
  inquiryType = 'Targeted Trial';
} else if (formName.indexOf('web-trial-download') > -1) {
  inquiryType = 'Package Trial';
} else if (formName.indexOf('live-chat') > -1) {
  inquiryType = 'Live Chat';
} else if (formName.indexOf('matlab-online') > -1 && formName.indexOf('trl') > -1) {
  inquiryType = 'MATLAB Online Trial';
} else if (formName.indexOf('web-trial-request') > -1 && pageName.indexOf('assisted-trial.html') > -1) {
  inquiryType = 'Assisted Trial';
} else if (formName.indexOf('web-trial-request') > -1) {
  inquiryType = 'Restricted Trial';
} else if (formName.indexOf('self-serve-act-lic') > -1) {
  inquiryType = 'Self Serve Trial';
} else if (formName.indexOf('self-serve-assisted') > -1) {
  inquiryType = 'Assisted Trial';
} else if (formName.indexOf('web-trial-mobile') > -1) {
  inquiryType = 'Mobile Trial';
} else if (formName.indexOf('startup') > -1 || formName.indexOf('accelerators') > -1) {
  inquiryType = 'Startup Accelerators Request';
} else if (formName.indexOf('matlab-home-availability') > -1) {
  inquiryType = 'MATLAB Home Availability';
} else {
  inquiryType = 'unknown';
};
return inquiryType;
},"storeLength":"pageview","cleanText":true},
    "internalSearchApp": {"jsVariable":"SearchTracking.app","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "internalSearchFacet": {"jsVariable":"SearchTracking.facets","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "internalSearchPage": {"jsVariable":"SearchTracking.page","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "internalSearchTerm": {"jsVariable":"SearchTracking.term","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "internalSearchTypeAhead": {"jsVariable":"SearchTracking.typeahead","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "majorAreaLevel1": {"customJS":function(){
var pathName = window.location.pathname.split(/#|;jsessionid=|\?/gi)[0];
if(pathName == '/'){
	var MAL = 'homepage';
}else
  if(pathName.indexOf('.') > -1){
 	pathName = pathName.split('.',1);
  var pathSplit = String(pathName).split('/',4);
 } else {
	var pathSplit = String(pathName).split('/',4);
}
if(typeof MAL =='undefined'){
  var MAL = pathSplit[1];
}
return MAL;
},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "majorAreaLevel2": {"customJS":function(){
var pathName = window.location.pathname.split(/#|;jsessionid=|\?/gi)[0];
if(pathName == '/'){
	var MAL2 = 'homepage';
}else{
 if(pathName.indexOf('.') > -1){
 	pathName = pathName.split('.',1);
  var pathSplit = String(pathName).split('/',4);
 } else {
   var pathSplit = String(pathName).split('/',4);
 }
}
  if(typeof pathSplit !=='undefined' && pathSplit.length >= 3 && pathSplit[2]!==''){
  	var MAL = pathSplit[1] + '/' + pathSplit[2];
 }
return MAL;
},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "majorAreaLevel3": {"customJS":function(){
var pathName = window.location.pathname.split(/#|;jsessionid=|\?/gi)[0];
if(pathName == '/'){
	var MAL1 = 'homepage';
}else{
 if(pathName.indexOf('.') > -1){
 	pathName = pathName.split('.',1);
  var pathSplit = String(pathName).split('/',4);
 } else {
   var pathSplit = pathName.split('/',4);
 }
}
 if(typeof pathSplit !=='undefined' && pathSplit.length >= 4 && pathSplit[3]!==''){
  	var MAL = pathSplit[1] + '/' + pathSplit[2] + '/' + pathSplit[3];
 }
return MAL;
},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "matlabAcademyCourseName": {"customJS":function(){
if (typeof digitalData !== 'undefined' && typeof digitalData.page.attributes.courseName !== 'undefined' && digitalData.page.attributes.courseName !== "" )
{
   return digitalData.page.attributes.courseName;
}
},"storeLength":"pageview"},
    "MOATS_univID": {"queryParam":"code","storeLength":"pageview","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "mwaAuthStaus": {"customJS":function(){
if (document.cookie.match(/mwa=/)) {
		return 'logged in';
	}
	else {
		return 'not logged in';
	}
},"storeLength":"pageview"},
    "mwaPopUpAssc": {"jsVariable":"window.mwaPopUpAssc","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "pageFullUrl": {"customJS":function(){
if (window.location.pathname == '/'){
  var fullUrl = window.location.hostname;
}else{
var fullUrl = window.location.host + window.location.pathname + window.location.search;
}
if(fullUrl.search(/[a-zA-Z0-9]+(@|%40|%2540)[a-zA-Z0-9]+\.[a-zA-Z]+/) == -1){
	return fullUrl;
}


},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "pageName": {"customJS":function(){
var pathName = window.location.pathname.split(/#|;jsessionid=|\?/gi)[0];
if(pathName == '/'){
  pathName = 'homepage';
  if(window.location.hostname == 'blogs.mathworks.com'){
    pathName = 'blogs index page';
	}
}
if(_satellite.getVar('queryStringFile') !==''){
  pathName = pathName + '?file=' + _satellite.getVar('queryStringFile');
}
return pathName;
},"storeLength":"pageview"},
    "pageNameUrl": {"customJS":function(){
if (window.location.pathname == '/'){
  var urlPageName = _satellite.getVar('server');
   }else{
    var urlPageName = window.location.hostname + window.location.pathname;
}
return urlPageName;
},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "pageScroll": {"jsVariable":"_satellite._scrollTracker.percent","storeLength":"pageview"},
    "PageTitle": {"jsVariable":"document.title","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "potentialUseQueryString": {"queryParam":"potential_use","storeLength":"visitor","cleanText":true,"ignoreCase":1},
    "productCode": {"queryParam":"prodcode","storeLength":"session","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "productInfo": {"queryParam":"product_info","default":"na","storeLength":"session","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "queryStringEmailElq_cid": {"queryParam":"elq_cid","storeLength":"pageview","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "queryStringEmailElqem": {"queryParam":"elqem","storeLength":"pageview","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "queryStringEmailElqsid": {"queryParam":"elqsid","storeLength":"pageview","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "queryStringExternalCampaignId": {"queryParam":"s_eid","storeLength":"pageview","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "queryStringFile": {"queryParam":"file","storeLength":"pageview","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "queryStringInternalCampaignId": {"queryParam":"s_iid","storeLength":"pageview","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "queryStringOldCampaignId": {"queryParam":"s_cid","storeLength":"pageview","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "queryStringOtherCampaignId": {"queryParam":"s_tid","storeLength":"pageview","forceLowerCase":true,"cleanText":true,"ignoreCase":1},
    "recsCategory": {"customJS":function(){
if (location.pathname.indexOf("/videos/") !== -1 && location.hostname !== 'blogs.mathworks.com' && typeof digitalData !== 'undefined') {
  if (typeof digitalData.product !== 'undefined' && typeof digitalData.product[0] !== 'undefined' && typeof digitalData.product[0].productInfo.productName !== 'undefined') {
    var cat = digitalData.product[0].productInfo.productName;
    return cat;
  }
}

},"storeLength":"pageview","cleanText":true},
    "recsEntity": {"customJS":function(){
if (location.pathname.indexOf("/videos/") !== -1 && location.hostname !== 'blogs.mathworks.com' && typeof digitalData !== 'undefined') {
  if (typeof digitalData.product !== 'undefined' && typeof digitalData.product[0] !== 'undefined' && typeof digitalData.product[0].productInfo.productName !== 'undefined') {
    var entity = digitalData.page.attributes.descriptonCode;
    return entity;
  }
}
},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "referrer": {"customJS":function(){
return document.referrer;
},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "server": {"customJS":function(){
return window.location.hostname;
},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "trackingServer": {"customJS":function(){
var trackingServer = 'metrics.mathworks.com'; 
if(location.hostname.indexOf('matlab.com') !== -1){
  trackingServer = 'metrics.matlab.com';
} else if (location.hostname.indexOf('mathworks.cn') !== -1) {
  trackingServer = 'metrics.mathworks.cn';
}
return trackingServer ;

},"storeLength":"pageview"},
    "trackingServerSecure": {"customJS":function(){
var trackingServer = 'smetrics.mathworks.com'; 
if(location.hostname.indexOf('matlab.com') !== -1){
  trackingServer = 'smetrics.matlab.com';
} else if (location.hostname.indexOf('mathworks.cn') !== -1) {
  trackingServer = 'smetrics.mathworks.cn';
}
return trackingServer ;

},"storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "trialChatEmailDomain": {"jsVariable":"chatTrial.emailDomain","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "trialChatEmailFlag": {"jsVariable":"chatTrial.emailFlag","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "trialChatEventId": {"jsVariable":"chatTrial.elqsid","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "trialChatEventName": {"jsVariable":"chatTrial.eventName","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "trialChatPotentialUse": {"jsVariable":"chatTrial.use","storeLength":"pageview","forceLowerCase":true,"cleanText":true},
    "trialPageName": {"customJS":function(){
var a = window.location.pathname;
return a;
},"storeLength":"pageview"},
    "trialScenario": {"customJS":function(){
if (typeof digitalData !== 'undefined' && digitalData.page.category !== 'undefined')
  	{ return digitalData.page.category.trialScenario; }
},"storeLength":"pageview","cleanText":true},
    "universityName": {"jsVariable":"window.universityName","storeLength":"session","forceLowerCase":true,"cleanText":true},
    "videoRegistration": {"customJS":function(){
if (typeof digitalData.component !=='undefined' && typeof digitalData.component[0] !=='undefined' && typeof digitalData.component[0].componentInfo.componentRegistrationRequired !=='undefined')
{
 return digitalData.component[0].componentInfo.componentRegistrationRequired;
}


},"storeLength":"pageview"},
    "videoType": {"customJS":function(){
if (typeof digitalData.component !=='undefined' && typeof digitalData.component[0] !=='undefined' && typeof digitalData.component[0].componentCategory.subCategory !=='undefined')
{
   return digitalData.component[0].componentCategory.subCategory;
}
},"storeLength":"pageview"},
    "visitorId": {"customJS":function(){
return _satellite.getVisitorId().getMarketingCloudVisitorID();
},"storeLength":"pageview"},
    "webStoreOrderId": {"customJS":function(){
if (typeof digitalData !== 'undefined' && typeof digitalData.transaction !== 'undefined' && typeof digitalData.transaction.trasactionID !== 'undefined' && digitalData.transaction.trasactionID !== "")
{
    return digitalData.transaction.trasactionID;
}
},"storeLength":"session"},
    "webStoreOrderSector": {"customJS":function(){
if (typeof digitalData !== 'undefined' && typeof digitalData.transaction !== 'undefined' && typeof digitalData.transaction.profile.profileInfo.orderSector !=='undefined' && digitalData.transaction.profile.profileInfo.orderSector !== "")
{
    return digitalData.transaction.profile.profileInfo.orderSector;
}
},"storeLength":"session"}
  },
  "appVersion": "7QN",
  "buildDate": "2020-04-30 19:07:46 UTC",
  "publishDate": "2020-04-30 19:07:43 UTC"
});
})(window, document);
