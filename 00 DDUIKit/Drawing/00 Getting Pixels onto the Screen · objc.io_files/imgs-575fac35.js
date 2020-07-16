/*! Picturefill - v2.3.1 - 2015-04-09
* http://scottjehl.github.io/picturefill
* Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),r=document.getElementsByTagName("script")[0],n=null;t.type="text/css",t.id="matchmediajs-test",r.parentNode.insertBefore(t,r),n="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle,e={matchMedium:function(e){var r="@media "+e+"{ #matchmediajs-test { width: 1px; } }";return t.styleSheet?t.styleSheet.cssText=r:t.textContent=r,"1px"===n.width}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}()),/*! Picturefill - Responsive Images that work today.
*  Author: Scott Jehl, Filament Group, 2012 ( new proposal implemented by Shawn Jansepar )
*  License: MIT/GPLv2
*  Spec: http://picture.responsiveimages.org/
*/
function(e,t,r){"use strict";function n(t){"object"==typeof module&&"object"==typeof module.exports?module.exports=t:"function"==typeof define&&define.amd&&define("picturefill",function(){return t}),"object"==typeof e&&(e.picturefill=t)}function i(e){var t,r,n,i,s,l=e||{};t=l.elements||a.getAllElements();for(var c=0,u=t.length;u>c;c++)if(r=t[c],n=r.parentNode,i=void 0,s=void 0,"IMG"===r.nodeName.toUpperCase()&&(r[a.ns]||(r[a.ns]={}),l.reevaluate||!r[a.ns].evaluated)){if(n&&"PICTURE"===n.nodeName.toUpperCase()){if(a.removeVideoShim(n),i=a.getMatch(r,n),i===!1)continue}else i=void 0;(n&&"PICTURE"===n.nodeName.toUpperCase()||!a.sizesSupported&&r.srcset&&o.test(r.srcset))&&a.dodgeSrcset(r),i?(s=a.processSourceSet(i),a.applyBestCandidate(s,r)):(s=a.processSourceSet(r),(void 0===r.srcset||r[a.ns].srcset)&&a.applyBestCandidate(s,r)),r[a.ns].evaluated=!0}}function s(){function r(){clearTimeout(n),n=setTimeout(o,60)}a.initTypeDetects(),i();var n,s=setInterval(function(){return i(),/^loaded|^i|^c/.test(t.readyState)?void clearInterval(s):void 0},250),o=function(){i({reevaluate:!0})};e.addEventListener?e.addEventListener("resize",r,!1):e.attachEvent&&e.attachEvent("onresize",r)}if(e.HTMLPictureElement)return void n(function(){});t.createElement("picture");var a=e.picturefill||{},o=/\s+\+?\d+(e\d+)?w/;a.ns="picturefill",function(){a.srcsetSupported="srcset"in r,a.sizesSupported="sizes"in r,a.curSrcSupported="currentSrc"in r}(),a.trim=function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},a.makeUrl=function(){var e=t.createElement("a");return function(t){return e.href=t,e.href}}(),a.restrictsMixedContent=function(){return"https:"===e.location.protocol},a.matchesMedia=function(t){return e.matchMedia&&e.matchMedia(t).matches},a.getDpr=function(){return e.devicePixelRatio||1},a.getWidthFromLength=function(e){var r;if(!e||e.indexOf("%")>-1!=!1||!(parseFloat(e)>0||e.indexOf("calc(")>-1))return!1;e=e.replace("vw","%"),a.lengthEl||(a.lengthEl=t.createElement("div"),a.lengthEl.style.cssText="border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden",a.lengthEl.className="helper-from-picturefill-js"),a.lengthEl.style.width="0px";try{a.lengthEl.style.width=e}catch(n){}return t.body.appendChild(a.lengthEl),r=a.lengthEl.offsetWidth,0>=r&&(r=!1),t.body.removeChild(a.lengthEl),r},a.detectTypeSupport=function(t,r){var n=new e.Image;return n.onerror=function(){a.types[t]=!1,i()},n.onload=function(){a.types[t]=1===n.width,i()},n.src=r,"pending"},a.types=a.types||{},a.initTypeDetects=function(){a.types["image/jpeg"]=!0,a.types["image/gif"]=!0,a.types["image/png"]=!0,a.types["image/svg+xml"]=t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),a.types["image/webp"]=a.detectTypeSupport("image/webp","data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")},a.verifyTypeSupport=function(e){var t=e.getAttribute("type");if(null===t||""===t)return!0;var r=a.types[t];return"string"==typeof r&&"pending"!==r?(a.types[t]=a.detectTypeSupport(t,r),"pending"):"function"==typeof r?(r(),"pending"):r},a.parseSize=function(e){var t=/(\([^)]+\))?\s*(.+)/g.exec(e);return{media:t&&t[1],length:t&&t[2]}},a.findWidthFromSourceSize=function(r){for(var n,i=a.trim(r).split(/\s*,\s*/),s=0,o=i.length;o>s;s++){var l=i[s],c=a.parseSize(l),u=c.length,d=c.media;if(u&&(!d||a.matchesMedia(d))&&(n=a.getWidthFromLength(u)))break}return n||Math.max(e.innerWidth||0,t.documentElement.clientWidth)},a.parseSrcset=function(e){for(var t=[];""!==e;){e=e.replace(/^\s+/g,"");var r,n=e.search(/\s/g),i=null;if(-1!==n){r=e.slice(0,n);var s=r.slice(-1);if((","===s||""===r)&&(r=r.replace(/,+$/,""),i=""),e=e.slice(n+1),null===i){var a=e.indexOf(",");-1!==a?(i=e.slice(0,a),e=e.slice(a+1)):(i=e,e="")}}else r=e,e="";(r||i)&&t.push({url:r,descriptor:i})}return t},a.parseDescriptor=function(e,t){var r,n=t||"100vw",i=e&&e.replace(/(^\s+|\s+$)/g,""),s=a.findWidthFromSourceSize(n);if(i)for(var o=i.split(" "),l=o.length-1;l>=0;l--){var c=o[l],u=c&&c.slice(c.length-1);if("h"!==u&&"w"!==u||a.sizesSupported){if("x"===u){var d=c&&parseFloat(c,10);r=d&&!isNaN(d)?d:1}}else r=parseFloat(parseInt(c,10)/s)}return r||1},a.getCandidatesFromSourceSet=function(e,t){for(var r=a.parseSrcset(e),n=[],i=0,s=r.length;s>i;i++){var o=r[i];n.push({url:o.url,resolution:a.parseDescriptor(o.descriptor,t)})}return n},a.dodgeSrcset=function(e){e.srcset&&(e[a.ns].srcset=e.srcset,e.srcset="",e.setAttribute("data-pfsrcset",e[a.ns].srcset))},a.processSourceSet=function(e){var t=e.getAttribute("srcset"),r=e.getAttribute("sizes"),n=[];return"IMG"===e.nodeName.toUpperCase()&&e[a.ns]&&e[a.ns].srcset&&(t=e[a.ns].srcset),t&&(n=a.getCandidatesFromSourceSet(t,r)),n},a.backfaceVisibilityFix=function(e){var t=e.style||{},r="webkitBackfaceVisibility"in t,n=t.zoom;r&&(t.zoom=".999",r=e.offsetWidth,t.zoom=n)},a.setIntrinsicSize=function(){var r={},n=function(e,t,r){t&&e.setAttribute("width",parseInt(t/r,10))};return function(i,s){var o;i[a.ns]&&!e.pfStopIntrinsicSize&&(void 0===i[a.ns].dims&&(i[a.ns].dims=i.getAttribute("width")||i.getAttribute("height")),i[a.ns].dims||(s.url in r?n(i,r[s.url],s.resolution):(o=t.createElement("img"),o.onload=function(){if(r[s.url]=o.width,!r[s.url])try{t.body.appendChild(o),r[s.url]=o.width||o.offsetWidth,t.body.removeChild(o)}catch(e){}i.src===s.url&&n(i,r[s.url],s.resolution),i=null,o.onload=null,o=null},o.src=s.url)))}}(),a.applyBestCandidate=function(e,t){var r,n,i;e.sort(a.ascendingSort),n=e.length,i=e[n-1];for(var s=0;n>s;s++)if(r=e[s],r.resolution>=a.getDpr()){i=r;break}i&&(i.url=a.makeUrl(i.url),t.src!==i.url&&(a.restrictsMixedContent()&&"http:"===i.url.substr(0,"http:".length).toLowerCase()?void 0!==window.console&&console.warn("Blocked mixed content image "+i.url):(t.src=i.url,a.curSrcSupported||(t.currentSrc=t.src),a.backfaceVisibilityFix(t))),a.setIntrinsicSize(t,i))},a.ascendingSort=function(e,t){return e.resolution-t.resolution},a.removeVideoShim=function(e){var t=e.getElementsByTagName("video");if(t.length){for(var r=t[0],n=r.getElementsByTagName("source");n.length;)e.insertBefore(n[0],r);r.parentNode.removeChild(r)}},a.getAllElements=function(){for(var e=[],r=t.getElementsByTagName("img"),n=0,i=r.length;i>n;n++){var s=r[n];("PICTURE"===s.parentNode.nodeName.toUpperCase()||null!==s.getAttribute("srcset")||s[a.ns]&&null!==s[a.ns].srcset)&&e.push(s)}return e},a.getMatch=function(e,t){for(var r,n=t.childNodes,i=0,s=n.length;s>i;i++){var o=n[i];if(1===o.nodeType){if(o===e)return r;if("SOURCE"===o.nodeName.toUpperCase()){null!==o.getAttribute("src")&&void 0!==typeof console&&console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");var l=o.getAttribute("media");if(o.getAttribute("srcset")&&(!l||a.matchesMedia(l))){var c=a.verifyTypeSupport(o);if(c===!0){r=o;break}if("pending"===c)return!1}}}}return r},s(),i._=a,n(i)}(window,window.document,new window.Image),function(e,t){var r=t(e,e.document);e.lazySizes=r,"object"==typeof module&&module.exports?module.exports=r:"function"==typeof define&&define.amd&&define(r)}(window,function(e,t){"use strict";if(t.getElementsByClassName){var r,n=t.documentElement,i=e.addEventListener,s=e.setTimeout,a=e.requestAnimationFrame||s,o=e.setImmediate||s,l=/^picture$/i,c=["load","error","lazyincluded","_lazyloaded"],u=function(e,t){var r=new RegExp("(\\s|^)"+t+"(\\s|$)");return e.className.match(r)&&r},d=function(e,t){u(e,t)||(e.className+=" "+t)},f=function(e,t){var r;(r=u(e,t))&&(e.className=e.className.replace(r," "))},p=function(e,t,r){var n=r?"addEventListener":"removeEventListener";r&&p(e,t),c.forEach(function(r){e[n](r,t)})},m=function(e,r,n,i,s){var a=t.createEvent("CustomEvent");return a.initCustomEvent(r,!i,!s,n||{}),e.dispatchEvent(a),a},g=function(t,n){var i;e.HTMLPictureElement||((i=e.picturefill||e.respimage||r.pf)?i({reevaluate:!0,elements:[t]}):n&&n.src&&(t.src=n.src))},h=function(e,t){return(getComputedStyle(e,null)||{})[t]},v=function(e,t,n){for(n=n||e.offsetWidth;n<r.minSize&&t&&!e._lazysizesWidth;)n=t.offsetWidth,t=t.parentNode;return n},y=function(t){var n,i=0,l=e.Date,c=function(){n=!1,i=l.now(),t()},u=function(){o(c)},d=function(){a(u)};return function(){if(!n){var e=r.throttle-(l.now()-i);n=!0,6>e&&(e=6),s(d,e)}}},b=function(){var o,c,v,b,A,S,C,E,w,N,M,x,T,B=/^img$/i,I=/^iframe$/i,L="onscroll"in e&&!/glebot/.test(navigator.userAgent),W=0,k=0,F=0,R=0,U=function(e){F--,e&&e.target&&p(e.target,U),(!e||0>F||!e.target)&&(F=0)},_=function(e,t){var r,n=e,i="hidden"!=h(e,"visibility");for(E-=t,M+=t,w-=t,N+=t;i&&(n=n.offsetParent);)i=(h(n,"opacity")||1)>0,i&&"visible"!=h(n,"overflow")&&(r=n.getBoundingClientRect(),i=N>r.left&&w<r.right&&M>r.top-1&&E<r.bottom+1);return i},D=function(){var e,t,n,i,s,a,l,u,d;if((A=r.loadMode)&&8>F&&(e=o.length)){for(t=0,R++,T>k&&1>F&&R>3&&A>2?(k=T,R=0):k=A>1&&R>2&&6>F?x:W;e>t;t++)if(o[t]&&!o[t]._lazyRace)if(L)if((u=o[t].getAttribute("data-expand"))&&(a=1*u)||(a=k),d!==a&&(S=innerWidth+a,C=innerHeight+a,l=-1*a,d=a),n=o[t].getBoundingClientRect(),(M=n.bottom)>=l&&(E=n.top)<=C&&(N=n.right)>=l&&(w=n.left)<=S&&(M||N||w||E)&&(v&&3>F&&!u&&(3>A||4>R)||_(o[t],a))){if(V(o[t]),s=!0,F>12)break;F>7&&(k=W)}else!s&&v&&!i&&3>F&&4>R&&A>2&&(c[0]||r.preloadAfterLoad)&&(c[0]||!u&&(M||N||w||E||"auto"!=o[t].getAttribute(r.sizesAttr)))&&(i=c[0]||o[t]);else V(o[t]);i&&!s&&V(i)}},O=y(D),P=function(e){d(e.target,r.loadedClass),f(e.target,r.loadingClass),p(e.target,P)},j=function(e,t){try{e.contentWindow.location.replace(t)}catch(r){e.setAttribute("src",t)}},$=function(){var e,t=[],r=function(){for(;t.length;)t.shift()();e=!1};return function(n){t.push(n),e||(e=!0,a(r))}}(),V=function(e){var t,n,i,a,o,c,h,y,A,S,C,E,w=B.test(e.nodeName),N=w&&(e.getAttribute(r.sizesAttr)||e.getAttribute("sizes")),M="auto"==N;(!M&&v||!w||!e.src&&!e.srcset||e.complete||u(e,r.errorClass))&&(M&&(E=e.offsetWidth),e._lazyRace=!0,F++,$(function(){if(e._lazyRace&&delete e._lazyRace,f(e,r.lazyClass),!(A=m(e,"lazybeforeunveil")).defaultPrevented){if(N&&(M?(d(e,r.autosizesClass),z.updateElem(e,!0,E)):e.setAttribute("sizes",N)),c=e.getAttribute(r.srcsetAttr),o=e.getAttribute(r.srcAttr),w&&(h=e.parentNode,y=h&&l.test(h.nodeName||"")),S=A.detail.firesLoad||"src"in e&&(c||o||y),A={target:e},S&&(p(e,U,!0),clearTimeout(b),b=s(U,2500),d(e,r.loadingClass),p(e,P,!0)),y)for(t=h.getElementsByTagName("source"),n=0,i=t.length;i>n;n++)(C=r.customMedia[t[n].getAttribute("data-media")||t[n].getAttribute("media")])&&t[n].setAttribute("media",C),a=t[n].getAttribute(r.srcsetAttr),a&&t[n].setAttribute("srcset",a);c?e.setAttribute("srcset",c):o&&(I.test(e.nodeName)?j(e,o):e.setAttribute("src",o)),(c||y)&&g(e,{src:o})}(!S||e.complete)&&(S?U(A):F--,P(A))}))},G=function(){if(!v){var e,t=function(){r.loadMode=3,O()};v=!0,r.loadMode=3,R++,i("scroll",function(){3==r.loadMode&&(r.loadMode=2),clearTimeout(e),e=s(t,99)},!0)}};return{_:function(){o=t.getElementsByClassName(r.lazyClass),c=t.getElementsByClassName(r.lazyClass+" "+r.preloadClass),x=r.expand,T=Math.round(x*r.expFactor),i("scroll",O,!0),i("resize",O,!0),e.MutationObserver?new MutationObserver(O).observe(n,{childList:!0,subtree:!0,attributes:!0}):(n.addEventListener("DOMNodeInserted",O,!0),n.addEventListener("DOMAttrModified",O,!0),setInterval(O,999)),i("hashchange",O,!0),["focus","mouseover","click","load","transitionend","animationend","webkitAnimationEnd"].forEach(function(e){t.addEventListener(e,O,!0)}),/d$|^c/.test(t.readyState)?G():(i("load",G),t.addEventListener("DOMContentLoaded",O),s(G,25e3)),O()},checkElems:O,unveil:V}}(),z=function(){var e,n=function(e,t,r){var n,i,s,a,o=e.parentNode;if(o&&(r=v(e,o,r),a=m(e,"lazybeforesizes",{width:r,dataAttr:!!t}),!a.defaultPrevented&&(r=a.detail.width,r&&r!==e._lazysizesWidth))){if(e._lazysizesWidth=r,r+="px",e.setAttribute("sizes",r),l.test(o.nodeName||""))for(n=o.getElementsByTagName("source"),i=0,s=n.length;s>i;i++)n[i].setAttribute("sizes",r);a.detail.dataAttr||g(e,a.detail)}},s=function(){var t,r=e.length;if(r)for(t=0;r>t;t++)n(e[t])},a=y(s);return{_:function(){e=t.getElementsByClassName(r.autosizesClass),i("resize",a)},checkElems:a,updateElem:n}}(),A=function(){A.i||(A.i=!0,z._(),b._())};return function(){var t,n={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:2,expand:359,loadMode:2,throttle:125};r=e.lazySizesConfig||e.lazysizesConfig||{};for(t in n)t in r||(r[t]=n[t]);e.lazySizesConfig=r,s(function(){r.init&&A()})}(),{cfg:r,autoSizer:z,loader:b,init:A,uP:g,aC:d,rC:f,hC:u,fire:m,gW:v}}});