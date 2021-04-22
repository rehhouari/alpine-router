!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t||self).alpineAlpine=e()}(this,function(){const t={isLocation:!(!window.history.location&&!window.location),validLink(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;if(!t||"A"!==t.nodeName.toUpperCase())return!1;var e="object"==typeof t.href&&"SVGAnimatedString"===t.href.constructor.name;if(t.hasAttribute("download")||"external"===t.getAttribute("rel"))return!1;var n=t.getAttribute("href");return!(n&&n.indexOf("mailto:")>-1||(e?t.target.baseVal:t.target)||!e&&!this.sameOrigin(t.href))},buildContext:(t,e,n)=>({route:t,path:e,props:n,query:window.location.search.substring(1),hash:window.location.hash.substring(1)}),processRoutersInFetchedDoc(t,e,n){let i=t.querySelectorAll("[x-router]");switch(i.length){case 0:"body"==e&&(n=[]);break;case 1:document.querySelector("[x-router]").setAttribute("x-router",""),i[0].isEqualNode(document.querySelector("[x-router]"))?(i[0].setAttribute("x-router","loaded"),document.querySelector("[x-router]").remove()):(n=[],document.querySelector("[x-router]").remove());break;default:throw new Error("Alpine Router: there can only be one router in the same page")}return{doc:t,routes:n}},match(t,e){let n=[],i=t.path.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&").replace(/([:^\s])(\w+)/g,(t,e,i)=>(n.push(i),"([^/]+)"))+"(?:/|$)",r={},o=e.match(new RegExp(i));if(null!==o){if(0!=o.index)return null;if(o.input!=o[0])return null;r=o.slice(1).reduce((t,e,i)=>(null===t&&(t={}),t[n[i]]=e,t),null)}return t.setProps(r),o},toURL(t){if("function"==typeof URL&&this.isLocation)return new URL(t,window.location.toString());var e=window.document.createElement("a");return e.href=t,e},sameOrigin(t){if(!t||!this.isLocation)return!1;var e=this.toURL(t),n=window.location;return n.protocol===e.protocol&&n.hostname===e.hostname&&(n.port===e.port||""===n.port&&(80==e.port||443==e.port))},samePath(t){if(!this.isLocation)return!1;var e=window.location;return t.pathname===e.pathname&&t.search===e.search}};class e{constructor(t,e,n){this.path=t,this.handler=e,this.view=n}setProps(t){this.props=t}handle(e){if("function"==typeof this.handler)return this.handler(t.buildContext(this.route,e,this.props))}}const n={routes:[],settings:{interceptLinks:!0,basepath:"/",hash:!1,pushNotfoundToHistory:!0,render:{enabled:!1,selector:"body",preload:!0,preloadtime:200,preloaded:{path:null,content:null}},views:{enabled:!1,basepath:"/",selector:"#content",notfound:null,static:!1,cached:[]}},loaded:!1,currentContext:null,routerloaded:new Event("routerloaded"),loadstart:new Event("loadstart"),loadend:new Event("loadend"),notfound:function(t){console.error(`Alpine Router: requested path ${t.path} was not found`)},start(){if(!window.Alpine)throw new Error("Alpine is require for `Alpine Router` to work.");let t=0;Alpine.onComponentInitialized(e=>{if(e.$el.hasAttribute("x-router")){if("loaded"==e.$el.getAttribute("x-router"))return;if(t>1)throw new Error("Alpine Router: Only one router can be in a page.");if(e.$el.hasAttribute("x-base")&&(this.settings.basepath=el.getAttribute("x-base")),e.$el.hasAttribute("x-render")){this.settings.render.enabled=!0;let t=e.$el.getAttribute("x-render");""!=t&&(this.settings.render.selector=t),this.notfound=null}else e.$el.hasAttribute("x-hash")&&(this.settings.hash=!0);if(e.$el.hasAttribute("x-views")){this.settings.views.enabled=!0;let t=e.$el.getAttribute("x-views");if("body"==t)throw new Error("Alpine Router: Do not use body as the selector, it will cause the router component to be removed");""!=t&&(this.settings.views.selector=t),e.$el.hasAttribute("x-static")&&(this.settings.views.static=!0),this.notfound=null}if(Array.from(e.$el.children).forEach(t=>{t.hasAttribute("x-route")&&this.processRoute(t,e)}),e.$el.setAttribute("x-router","loaded"),t++,this.settings.hash){if(""==window.location.hash)return void(document.location.href=window.location.pathname+"#/");this.navigate(window.location.hash.substring(1),!0,!0)}else this.navigate(window.location.pathname,!1,!0);this.loaded=!0,e.$el.dispatchEvent(this.routerloaded)}}),this.interceptLinks(),window.addEventListener("popstate",()=>{this.settings.hash?""!=window.location.hash&&this.navigate(window.location.hash.substring(1),!0):this.navigate(window.location.pathname,!0)})},interceptLinks(){this.settings.interceptLinks&&document.querySelectorAll("a").forEach(e=>{e.hasAttribute("x-link")||0!=t.validLink(e)&&(e.setAttribute("x-link",""),e.addEventListener("mouseover",t=>{if(!this.settings.render.enabled||!this.settings.render.preload)return;let e=t.target.getAttribute("href");null==e&&(e="/"),this.settings.render.preloaded.path!=e&&window.setTimeout(function(){fetch(e).then(t=>t.text()).then(t=>{window.AlpineRouter.settings.render.preloaded.path=e,window.AlpineRouter.settings.render.preloaded.content=t})},this.settings.render.preloadtime)}),e.addEventListener("click",t=>{t.preventDefault();let n=e.pathname;this.settings.hash?window.location.hash="#"+n:this.navigate(n)},!1))})},processRoute(t,e){if("template"!==t.tagName.toLowerCase())throw new Error("Alpine Router: x-route must be used on a template tag.");let n=t.getAttribute("x-route");if("string"!=typeof n)throw new Error(`Alpine Router: x-route must be a string, ${typeof n} given.`);if(n.indexOf("#")>-1)throw new Error("Alpine Router: A route's path may not have a hash, setting Alpinethis.settings.hash to true is sufficiant.");let i=null;if(this.settings.views.enabled){if(0==t.hasAttribute("x-view"))throw new Error("Alpine Router: route must have an x-view attribute when using x-views.");i=t.getAttribute("x-view"),"/"!=this.settings.views.basepath&&(i=this.settings.views.basepath+i),"notfound"==n&&(this.settings.views.notfound=i)}let r=null;if(0==t.hasAttribute("x-handler")&&0==this.settings.views.enabled&&0==this.settings.render.enabled)throw new Error('Alpine Router: x-route must have a handler (x-handler="handler") unless using x-render.');if(t.hasAttribute("x-handler")){let i=t.getAttribute("x-handler");try{r=e.getUnobservedData()[i]}catch(t){throw new Error("Alpine Router: "+t)}if("function"!=typeof r)throw new Error(`Alpine Router: handler must be a callback function, ${typeof r} given.`);"notfound"==n&&(this.notfound=r)}"notfound"!=n&&("/"!=this.settings.basepath&&(n=this.settings.basepath+n),this.addRoute(n,r,i))},navigate(e,n=!1,i=!1){window.dispatchEvent(this.loadstart),null==e&&(e="/",console.log({path:e}));const r=this.routes.find(n=>t.match(n,e));let o,s=null==r&&(!this.settings.render.enabled||this.settings.render.enabled&&null!=this.notfound);s?(o=t.buildContext("notfound",e,{}),null!=this.notfound&&this.notfound(o)):o=t.buildContext(r.path,e,r.props),!this.settings.render.enabled||i||s||(this.settings.render.preloaded.path==e?(this.renderContent(this.settings.render.preloaded.content,this.settings.render.selector,!0),this.settings.render.preloaded.path=null,this.settings.render.preloaded.content=null):fetch(e).then(t=>t.text()).then(t=>{this.renderContent(t,this.settings.render.selector,!1)}));let a=null!=r?r.view:this.settings.views.notfound;if(this.settings.views.enabled&&null!=a){if(this.settings.views.static){var l=this.settings.views.cached.find(t=>t.view==a);null!=l&&this.renderContent(l.content,this.settings.views.selector)}fetch(a).then(t=>t.text()).then(t=>{this.renderContent(t,this.settings.views.selector),this.settings.views.static&&null==l&&this.settings.views.cached.push({view:a,content:t})})}if(!(n||s&&this.settings.pushNotfoundToHistory)){let t;t=this.settings.hash?window.location.pathname+window.location.search+e:e+window.location.search+window.location.hash,history.pushState({path:t},"",t)}null!=r&&null!=r.handler&&r.handle(e),this.currentContext=o,window.dispatchEvent(this.loadend)},addRoute(t,n,i){if(null!=this.routes.find(e=>e.path==t))throw new Error("Alpine Router: route already exist");this.routes.push(new e(t,n,i))},removeRoute(t){this.routes=this.routes.filter(e=>e.path!=t)},renderContent(e,n,i){if(i){let i=(new DOMParser).parseFromString(e,"text/html");i=i.querySelector(n);let r=t.processRoutersInFetchedDoc(i,n,this.routes);i=r.doc,this.routes=r.routes,e=i.innerHTML}document.querySelector(n).innerHTML=e,this.interceptLinks()}},i=window.deferLoadingAlpine||(t=>t());return window.AlpineRouter=n,window.deferLoadingAlpine=function(t){window.AlpineRouter.start(),i(t)},n});
//# sourceMappingURL=alpine-router.umd.js.map
