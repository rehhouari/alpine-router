var k=class{constructor(e,a={}){this.params={};this.handlers=[];this.handlersDone=!1;this.path=e,Object.keys(a).forEach(l=>{this[l]=a[l]})}},H=k;var M=window.location;function C(o){return o.replace(/(^\/+|\/+$)/g,"").split("/")}function S(o,e){let a=/(?:\?([^#]*))?(#.*)?$/,l=o.match(a),p={},x;if(l&&l[1]){let d=l[1].split("&");for(let v=0;v<d.length;v++){let c=d[v].split("=");p[decodeURIComponent(c[0])]=decodeURIComponent(c.slice(1).join("="))}}let E=C(o.replace(a,"")),h=C(e||""),R=Math.max(E.length,h.length);for(let d=0;d<R;d++)if(h[d]&&h[d].charAt(0)===":"){let v=h[d].replace(/(^:|[+*?]+$)/g,""),c=(h[d].match(/[+*?]+$/)||{}).toString()[0],y=~c.indexOf("+"),b=~c.indexOf("*"),T=E[d]||"";if(!T&&!b&&(c.indexOf("?")<0||y)){x=!1;break}if(p[v]=decodeURIComponent(T),y||b){p[v]=E.slice(d).map(decodeURIComponent).join("/");break}}else if(h[d]!==E[d]){x=!1;break}return x===!1?!1:p}function N(o){if(typeof URL=="function"&&M)return new URL(o,window.location.toString());var e=window.document.createElement("a");return e.href=o,e}function j(o){if(!o||!M)return!1;var e=N(o),a=window.location;return a.protocol===e.protocol&&a.hostname===e.hostname&&(a.port===e.port||a.port===""&&(e.port=="80"||e.port=="443"))}function B(o){if(!M)return!1;var e=window.location;return o.pathname===e.pathname&&o.search===e.search}function U(o,e){let a={valid:!1,link:""};for(;o&&o.nodeName.toUpperCase()!=="A";)o=o.parentNode;if(!o||o.nodeName.toUpperCase()!=="A")return a;var l=typeof o.href=="object"&&o.href.constructor.name==="SVGAnimatedString";return o.hasAttribute("download")||o.getAttribute("rel")==="external"||(a.link=o.getAttribute("href")??"",!e&&B(o)&&(o.hash||a.link==="#"))||a.link&&a.link.indexOf("mailto:")>-1||(l?o.target.baseVal:o.target)||!l&&!j(o.href)||(a.valid=!0),a}function P(o,...e){if(!!window.PineconeRouterMiddlewares)for(let a in window.PineconeRouterMiddlewares){let l=window.PineconeRouterMiddlewares[a];if(l[o]==null)return;if(l[o](...e)=="stop")return"stop"}}function D(o){document.dispatchEvent(new CustomEvent("fetch-error",{detail:o}))}function A(o){let e=o.reactive({version:"4.1.0",name:"pinecone-router",settings:{hash:!1,basePath:"/",templateTargetId:null},notfound:new H("notfound"),routes:[],context:{route:"",path:"",params:{},query:window.location.search.substring(1),hash:window.location.hash.substring(1),redirect(t){return m(t),"stop"},navigate(t){m(t)}},add(t,n){if(this.routes.find(r=>r.path==t)!=null)throw new Error("Pinecone Router: route already exist");return this.routes.push(new H(t,n))-1},remove(t){this.routes=this.routes.filter(n=>n.path!=t)},loadStart:new Event("pinecone-start"),loadEnd:new Event("pinecone-end")});window.PineconeRouter=e;var a={},l={};let p=new Set;var x;let E=(t,n)=>(a[n]?a[n].then(r=>t.innerHTML=r):a[n]=fetch(n).then(r=>r.ok?r.text():(D(r.statusText),null)).then(r=>r==null?(l[n]=null,a[n]=null,null):(l[n]=r,t.innerHTML=r,r)),a[n]),h=(t,n,r)=>{if(p.has(n))return;p.add(n);let i=t.content.cloneNode(!0).firstElementChild;!i||(o.addScopeToNode(i,{},t),o.mutateDom(()=>{r!=null?r.appendChild(i):t.after(i),o.initTree(i)}),t._x_currentIfEl=i,t._x_undoIf=()=>{i.remove(),delete t._x_currentIfEl},o.nextTick(()=>p.delete(n)))};function R(t){t._x_undoIf&&(t._x_undoIf(),delete t._x_undoIf)}function d(t,n,r,i){if(t._x_currentIfEl)return t._x_currentIfEl;t.content.firstElementChild?(h(t,n),c()):r&&(l[r]?(t.innerHTML=l[r],h(t,n,i),c()):x?x.then(()=>h(t,n,i)):E(t,r).then(()=>h(t,n,i)).finally(()=>c()))}let v=()=>{document.dispatchEvent(e.loadStart)},c=()=>{document.dispatchEvent(e.loadEnd)},y=t=>!e.settings.hash&&e.settings.basePath!="/"?e.settings.basePath+t:t,b=t=>e.routes.findIndex(n=>n.path==t);o.directive("route",(t,{expression:n},{effect:r,cleanup:i})=>{let s=n;if(P("onBeforeRouteProcessed",t,s),s.indexOf("#")>-1)throw new Error("Pinecone Router: A route's path may not have a hash character.");let u=null;s!="notfound"&&(s=y(s),u=e.add(s));let f=e.routes[u]??e.notfound;!t.hasAttribute("x-template")&&t.content.firstElementChild!=null&&o.nextTick(()=>{r(()=>{f.handlersDone&&e.context.route==s?d(t,n):R(t)})}),i(()=>{t._x_undoIf&&t._x_undoIf(),e.remove(s)}),P("onAfterRouteProcessed",t,s)}),o.directive("handler",(t,{expression:n},{evaluate:r,cleanup:i})=>{if(!t.hasAttribute("x-route"))throw new Error("Pinecone Router: x-handler must be set on the same element as x-route.");let s;!(n.startsWith("[")&&n.endsWith("]"))&&!(n.startsWith("Array(")&&n.endsWith(")"))&&(n=`[${n}]`);let u=r(n),f=t.getAttribute("x-route");if(typeof u=="object")s=u;else throw new Error(`Pinecone Router: Invalid handler type: ${typeof u}.`);for(let w=0;w<s.length;w++)s[w]=s[w].bind(o.$data(t));let g;if(f=="notfound")g=e.notfound;else{f=y(f);let w=b(f);g=e.routes[w]}g.handlers=s,i(()=>{g.handlers=[],g.handlersDone=!0})}),o.directive("template",(t,{modifiers:n,expression:r},{Alpine:i,effect:s,cleanup:u})=>{if(!t.hasAttribute("x-route"))throw new Error("Pinecone Router: x-template must be used on the same element as x-route.");let f=r,g=W(n,"target",null)??window.PineconeRouter.settings.templateTargetId,w=document.getElementById(g);if(g&&!w)throw new Error("Pinecone Router: Can't find an element with the suplied x-template target ID ("+g+")");n.includes("preload")&&(x=E(t,f).finally(()=>x=null));let I=t.getAttribute("x-route"),_,L;I=="notfound"?(e.notfound.template=f,_=e.notfound):(I=y(I),L=b(I),e.routes[L].template=f,_=e.routes[L]),i.nextTick(()=>{s(()=>{_.handlersDone&&e.context.route==_.path?d(t,r,f,w):R(t)})}),u(()=>{t._x_undoIf&&t._x_undoIf()})}),o.$router=e.context,o.magic("router",()=>e.context),document.addEventListener("alpine:initialized",()=>{P("init"),e.settings.hash?m(location.hash.substring(1),!1,!0):m(location.pathname,!1,!0)}),window.addEventListener("popstate",()=>{e.settings.hash?window.location.hash!=""&&m(window.location.hash.substring(1),!0):m(window.location.pathname,!0)}),T();function T(){window.document.body.addEventListener(document.ontouchstart?"touchstart":"click",function(t){if(t.metaKey||t.ctrlKey||t.shiftKey||t.defaultPrevented)return;let n=t.target,r=t.composedPath();if(r){for(let u=0;u<r.length;u++)if(!!r[u].nodeName&&r[u].nodeName.toUpperCase()==="A"&&!!r[u].href){n=r[u];break}}if(n==null||n.hasAttribute("native"))return;let i=U(n,e.settings.hash);if(!i.valid)return;let s=e.routes[b(e.context.route)]??e.notfound;s.handlersDone||(s.cancelHandlers=!0,c()),t.stopImmediatePropagation&&t.stopImmediatePropagation(),t.stopPropagation&&t.stopPropagation(),t.preventDefault(),m(i.link)})}async function m(t,n=!1,r=!1){t||(t="/"),e.context.path=t,e.settings.hash||(e.settings.basePath!="/"&&!t.startsWith(e.settings.basePath)&&(t=e.settings.basePath+t),t==e.settings.basePath&&!t.endsWith("/")&&(t+="/"));let i=e.routes.find(u=>{let f=S(t,u.path);return u.params=f!=!1?f:{},f!=!1})??e.notfound;i.handlersDone=!i.handlers.length,(i.handlers.length||i.template)&&v();let s=O(i.path,t,i.params);if(e.context=s,P("onBeforeHandlersExecuted",i,t,r)=="stop"){c();return}if(!n){let u="";if(e.settings.hash?(u="#",u+=window.location.search+t):u=t+window.location.search+window.location.hash,!r)history.pushState({path:u},"",u);else if(e.settings.hash&&t=="/")return e.context=s,m("/",!1,!1)}if(i&&i.handlers.length){if(i.cancelHandlers=!1,!await $(i.handlers,s)){c();return}i.handlersDone=!0,i.template||c()}P("onHandlersExecuted",i,t,r)}function O(t,n,r){return{route:t,path:n,params:r,query:window.location.search.substring(1),hash:window.location.hash.substring(1),redirect(i){return m(i),"stop"},navigate(i){m(i)}}}function W(t,n,r){if(t.indexOf(n)===-1)return r;let i=t[t.indexOf(n)+1];if(!i)return r;if(n==="target"){let s=i.match(/([a-z0-9_-]+)/);if(s)return s[1]}return i}async function $(t,n){for(let r=0;r<t.length;r++)if(typeof t[r]=="function"){let i=e.routes[b(n.route)]??e.notfound;if(i.cancelHandlers)return i.cancelHandlers=!1,!1;let s;if(t[r].constructor.name==="AsyncFunction"?s=await t[r](n):s=t[r](n),s=="stop")return!1}return!0}}var Q=A;export{Q as default};
//# sourceMappingURL=router.esm.js.map
