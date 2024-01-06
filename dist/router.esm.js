var M=class{constructor(o,c={}){this.params={};this.handlers=[];this.handlersDone=!1;this.path=o,Object.keys(c).forEach(d=>{this[d]=c[d]})}},L=M;function k(a){return a.replace(/(^\/+|\/+$)/g,"").split("/")}function C(a,o){let c=/(?:\?([^#]*))?(#.*)?$/,d=a.match(c),p={},x;if(d&&d[1]){let l=d[1].split("&");for(let E=0;E<l.length;E++){let f=l[E].split("=");p[decodeURIComponent(f[0])]=decodeURIComponent(f.slice(1).join("="))}}let b=k(a.replace(c,"")),h=k(o||""),T=Math.max(b.length,h.length);for(let l=0;l<T;l++)if(h[l]&&h[l].charAt(0)===":"){let E=h[l].replace(/(^:|[+*?]+$)/g,""),f=(h[l].match(/[+*?]+$/)||{}).toString()[0],y=~f.indexOf("+"),v=~f.indexOf("*"),R=b[l]||"";if(!R&&!v&&(f.indexOf("?")<0||y)){x=!1;break}if(p[E]=decodeURIComponent(R),y||v){p[E]=b.slice(l).map(decodeURIComponent).join("/");break}}else if(h[l]!==b[l]){x=!1;break}return x===!1?!1:p}function P(a,...o){if(!!window.PineconeRouterMiddlewares)for(let c in window.PineconeRouterMiddlewares){let d=window.PineconeRouterMiddlewares[c];if(d[a]==null)return;if(d[a](...o)=="stop")return"stop"}}function S(a){document.dispatchEvent(new CustomEvent("fetch-error",{detail:a}))}function D(a){let o=a.reactive({version:"4.1.0",name:"pinecone-router",settings:{hash:!1,basePath:"/",templateTargetId:null},notfound:new L("notfound"),routes:[],context:{route:"",path:"",params:{},query:window.location.search.substring(1),hash:window.location.hash.substring(1),redirect(t){return m(t),"stop"},navigate(t){m(t)}},add(t,e){if(this.routes.find(n=>n.path==t)!=null)throw new Error("Pinecone Router: route already exist");return this.routes.push(new L(t,e))-1},remove(t){this.routes=this.routes.filter(e=>e.path!=t)},loadStart:new Event("pinecone-start"),loadEnd:new Event("pinecone-end")});window.PineconeRouter=o;var c={},d={};let p=new Set;var x={};let b=(t,e)=>(c[e]?c[e].then(n=>t.innerHTML=n):c[e]=fetch(e).then(n=>n.ok?n.text():(S(n.statusText),null)).then(n=>n==null?(d[e]=null,c[e]=null,null):(d[e]=n,t.innerHTML=n,n)),c[e]),h=(t,e,n)=>{if(p.has(e))return;p.add(e);let r=t.content.cloneNode(!0).firstElementChild;!r||(a.addScopeToNode(r,{},t),a.mutateDom(()=>{n!=null?n.appendChild(r):t.after(r),a.initTree(r)}),t._x_currentIfEl=r,t._x_undoIf=()=>{r.remove(),delete t._x_currentIfEl},a.nextTick(()=>p.delete(e)))};function T(t){t._x_undoIf&&(t._x_undoIf(),delete t._x_undoIf)}function l(t,e,n,r){if(t._x_currentIfEl)return t._x_currentIfEl;t.content.firstElementChild?(h(t,e),f()):n&&(d[n]?(t.innerHTML=d[n],h(t,e,r),f()):x[n]?x[n].then(()=>h(t,e,r)):b(t,n).then(()=>h(t,e,r)).finally(()=>f()))}let E=()=>{document.dispatchEvent(o.loadStart)},f=()=>{document.dispatchEvent(o.loadEnd)},y=t=>!o.settings.hash&&o.settings.basePath!="/"?o.settings.basePath+t:t,v=t=>o.routes.findIndex(e=>e.path==t);a.directive("route",(t,{expression:e},{effect:n,cleanup:r})=>{let i=e;if(P("onBeforeRouteProcessed",t,i),i.indexOf("#")>-1)throw new Error("Pinecone Router: A route's path may not have a hash character.");let s=null;i!="notfound"&&(i=y(i),s=o.add(i));let u=o.routes[s]??o.notfound;!t.hasAttribute("x-template")&&t.content.firstElementChild!=null&&a.nextTick(()=>{n(()=>{u.handlersDone&&o.context.route==i?l(t,e):T(t)})}),r(()=>{t._x_undoIf&&t._x_undoIf(),o.remove(i)}),P("onAfterRouteProcessed",t,i)}),a.directive("handler",(t,{expression:e},{evaluate:n,cleanup:r})=>{if(!t.hasAttribute("x-route"))throw new Error("Pinecone Router: x-handler must be set on the same element as x-route.");let i;!(e.startsWith("[")&&e.endsWith("]"))&&!(e.startsWith("Array(")&&e.endsWith(")"))&&(e=`[${e}]`);let s=n(e),u=t.getAttribute("x-route");if(typeof s=="object")i=s;else throw new Error(`Pinecone Router: Invalid handler type: ${typeof s}.`);for(let w=0;w<i.length;w++)i[w]=i[w].bind(a.$data(t));let g;if(u=="notfound")g=o.notfound;else{u=y(u);let w=v(u);g=o.routes[w]}g.handlers=i,r(()=>{g.handlers=[],g.handlersDone=!0})}),a.directive("template",(t,{modifiers:e,expression:n},{Alpine:r,effect:i,cleanup:s})=>{if(!t.hasAttribute("x-route"))throw new Error("Pinecone Router: x-template must be used on the same element as x-route.");let u=n,g=W(e,"target",null)??window.PineconeRouter.settings.templateTargetId,w=document.getElementById(g);if(g&&!w)throw new Error("Pinecone Router: Can't find an element with the suplied x-template target ID ("+g+")");e.includes("preload")&&(x[u]=b(t,u).finally(()=>x[u]=null));let _=t.getAttribute("x-route"),I,H;_=="notfound"?(o.notfound.template=u,I=o.notfound):(_=y(_),H=v(_),o.routes[H].template=u,I=o.routes[H]),r.nextTick(()=>{i(()=>{I.handlersDone&&o.context.route==I.path?l(t,n,u,w):T(t)})}),s(()=>{t._x_undoIf&&t._x_undoIf()})}),a.$router=o.context,a.magic("router",()=>o.context),document.addEventListener("alpine:initialized",()=>{P("init"),o.settings.hash==!1?m(location.pathname,!1,!0):m(location.hash.substring(1),!1,!0)}),window.addEventListener("popstate",()=>{o.settings.hash?window.location.hash!=""&&m(window.location.hash.substring(1),!0):m(window.location.pathname,!0)}),R();function R(){function t(e){if(!e||!e.getAttribute)return;let n=e.getAttribute("href"),r=e.getAttribute("target");if(!(!n||!n.match(/^\//g)||r&&!r.match(/^_?self$/i)))return typeof n!="string"&&n.url&&(n=n.url),n}window.document.body.addEventListener("click",function(e){if(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button||e.defaultPrevented)return;let n=o.routes[v(o.context.route)]??o.notfound;n.handlersDone||(n.cancelHandlers=!0,f());let r=e.target;do if(r.localName==="a"&&r.getAttribute("href")){if(r.hasAttribute("data-native")||r.hasAttribute("native"))return;let i=t(r);i&&(m(i),e.stopImmediatePropagation&&e.stopImmediatePropagation(),e.stopPropagation&&e.stopPropagation(),e.preventDefault());break}while(r=r.parentNode)})}async function m(t,e=!1,n=!1){t||(t="/"),o.context.path=t,o.settings.hash||(o.settings.basePath!="/"&&!t.startsWith(o.settings.basePath)&&(t=o.settings.basePath+t),t==o.settings.basePath&&!t.endsWith("/")&&(t+="/"));let r=o.routes.find(s=>{let u=C(t,s.path);return s.params=u!=!1?u:{},u!=!1})??o.notfound;r.handlersDone=!r.handlers.length,(r.handlers.length||r.template)&&E();let i=$(r.path,t,r.params);if(o.context=i,P("onBeforeHandlersExecuted",r,t,n)=="stop"){f();return}if(!e){let s="";if(o.settings.hash?(s="#",s+=window.location.search+t):s=t+window.location.search+window.location.hash,!n)history.pushState({path:s},"",s);else if(o.settings.hash&&t=="/")return o.context=i,m("/",!1,!1)}if(r&&r.handlers.length){if(r.cancelHandlers=!1,!await O(r.handlers,i)){f();return}r.handlersDone=!0,r.template||f()}P("onHandlersExecuted",r,t,n)}function $(t,e,n){return{route:t,path:e,params:n,query:window.location.search.substring(1),hash:window.location.hash.substring(1),redirect(r){return m(r),"stop"},navigate(r){m(r)}}}function W(t,e,n){if(t.indexOf(e)===-1)return n;let r=t[t.indexOf(e)+1];if(!r)return n;if(e==="target"){let i=r.match(/([a-z0-9_-]+)/);if(i)return i[1]}return r}async function O(t,e){for(let n=0;n<t.length;n++)if(typeof t[n]=="function"){let r=o.routes[v(e.route)]??o.notfound;if(r.cancelHandlers)return r.cancelHandlers=!1,!1;let i;if(t[n].constructor.name==="AsyncFunction"?i=await t[n](e):i=t[n](e),i=="stop")return!1}return!0}}var q=D;export{q as default};
//# sourceMappingURL=router.esm.js.map
