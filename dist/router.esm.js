var M=class{constructor(t,a={}){this.params={};this.handlers=[];this.handlersDone=!1;this.path=t,Object.keys(a).forEach(d=>{this[d]=a[d]})}},C=M;var I=window.location;function S(o){return o.replace(/(^\/+|\/+$)/g,"").split("/")}function U(o,t){let a=/(?:\?([^#]*))?(#.*)?$/,d=o.match(a),v={},x;if(d&&d[1]){let u=d[1].split("&");for(let w=0;w<u.length;w++){let m=u[w].split("=");v[decodeURIComponent(m[0])]=decodeURIComponent(m.slice(1).join("="))}}let b=S(o.replace(a,"")),p=S(t||""),k=Math.max(b.length,p.length);for(let u=0;u<k;u++)if(p[u]&&p[u].charAt(0)===":"){let w=p[u].replace(/(^:|[+*?]+$)/g,""),m=(p[u].match(/[+*?]+$/)||{}).toString()[0],H=~m.indexOf("+"),c=~m.indexOf("*"),L=b[u]||"";if(!L&&!c&&(m.indexOf("?")<0||H)){x=!1;break}if(v[w]=decodeURIComponent(L),H||c){v[w]=b.slice(u).map(decodeURIComponent).join("/");break}}else if(p[u]!==b[u]){x=!1;break}return x===!1?!1:v}function j(o){if(typeof URL=="function"&&I)return new URL(o,window.location.toString());var t=window.document.createElement("a");return t.href=o,t}function N(o){if(!o||!I)return!1;var t=j(o),a=window.location;return a.protocol===t.protocol&&a.hostname===t.hostname&&(a.port===t.port||a.port===""&&(t.port=="80"||t.port=="443"))}function B(o){if(!I)return!1;var t=window.location;return o.pathname===t.pathname&&o.search===t.search}function $(o,t){let a={valid:!1,link:""};for(;o&&o.nodeName.toUpperCase()!=="A";)o=o.parentNode;if(!o||o.nodeName.toUpperCase()!=="A")return a;var d=typeof o.href=="object"&&o.href.constructor.name==="SVGAnimatedString";return o.hasAttribute("download")||o.getAttribute("rel")==="external"||(a.link=o.getAttribute("href")??"",!t&&B(o)&&(o.hash||a.link==="#"))||a.link&&a.link.indexOf("mailto:")>-1||(d?o.target.baseVal:o.target)||!d&&!N(o.href)||(a.valid=!0),a}function y(o,...t){if(!!window.PineconeRouterMiddlewares)for(let a in window.PineconeRouterMiddlewares){let d=window.PineconeRouterMiddlewares[a];if(d[o]==null)return;if(d[o](...t)=="stop")return"stop"}}function D(o){let t=o.reactive({version:"4.0.0",name:"pinecone-router",settings:{hash:!1,basePath:"/",templateTargetId:null},notfound:new C("notfound"),routes:[],context:{route:"",path:"",params:{},query:window.location.search.substring(1),hash:window.location.hash.substring(1),redirect(e){return c(e),"stop"},navigate(e){c(e)}},add(e,r){if(this.routes.find(i=>i.path==e)!=null)throw new Error("Pinecone Router: route already exist");return this.routes.push(new C(e,r))-1},remove(e){this.routes=this.routes.filter(r=>r.path!=e)},loadStart:new Event("pinecone-start"),loadEnd:new Event("pinecone-end")});window.PineconeRouter=t;var a={},d={};let v=(e,r,i)=>(a[r]?a[r].then(n=>{i==null&&(e.innerHTML=n)}):a[r]=fetch(r).then(n=>n.text()).then(n=>(d[r]=n,i==null&&(e.innerHTML=n),n)),a[r]),x=(e,r,i)=>{let n=r!=null?`PineconeRouter.routes[${r}]`:"PineconeRouter.notfound",s=`$router.route == "${i}" && ${n}.handlersDone`;e.hasAttribute("x-if")||(e.setAttribute("x-if",s),u())},b=e=>{!e.hasAttribute("x-if")||e.removeAttribute("x-if")},p=(e,r)=>{u(),e.innerHTML=d[r]},k=()=>{document.dispatchEvent(t.loadStart)},u=()=>{document.dispatchEvent(t.loadEnd)},w=e=>!t.settings.hash&&t.settings.basePath!="/"?t.settings.basePath+e:e,m=e=>t.routes.findIndex(r=>r.path==e);o.directive("route",(e,{expression:r},{cleanup:i})=>{let n=r;if(y("onBeforeRouteProcessed",e,n),n.indexOf("#")>-1)throw new Error("Pinecone Router: A route's path may not have a hash character.");let s=null;if(n!="notfound"&&(n=w(n),s=t.add(n)),e.content.firstElementChild!=null){let l=t.routes[s]??t.notfound;x(e,s,n)}y("onAfterRouteProcessed",e,n),i(()=>{t.remove(n),b(e)})}),o.directive("handler",(e,{expression:r},{evaluate:i,cleanup:n})=>{if(!e.hasAttribute("x-route"))throw new Error("Pinecone Router: x-handler must be set on the same element as x-route.");let s;!(r.startsWith("[")&&r.endsWith("]"))&&!(r.startsWith("Array(")&&r.endsWith(")"))&&(r=`[${r}]`);let l=i(r),h=e.getAttribute("x-route");if(typeof l=="object")s=l;else throw new Error(`Pinecone Router: Invalid handler type: ${typeof l}.`);let f;if(h=="notfound")f=t.notfound;else{h=w(h);let g=m(h);f=t.routes[g]}f.handlers=s,n(()=>{f.handlers=[],f.handlersDone=!0})}),o.directive("template",(e,{modifiers:r,expression:i},{Alpine:n,effect:s,cleanup:l})=>{if(!e.hasAttribute("x-route"))throw new Error("Pinecone Router: x-template must be used on the same element as x-route.");var h;let f=i,g=O(r,"target",null)??window.PineconeRouter.settings.templateTargetId,T=document.getElementById(g);if(g&&!T)throw new Error("Pinecone Router: Can't find an element with the suplied x-template target ID ("+g+")");r.includes("preload")&&(h=v(e,f,g).finally(()=>{h=!1,g||x(e,R,P)}).catch(A=>{document.dispatchEvent(new CustomEvent("fetch-error",{detail:A}))}));let P=e.getAttribute("x-route"),E,R;P=="notfound"?(t.notfound.template=f,E=t.notfound):(P=w(P),R=m(P),t.routes[R].template=f,E=t.routes[R]),n.nextTick(()=>{s(()=>{if(E.handlersDone&&t.context.route==P)if(d[f])if(g)p(T,f);else{if(u(),e.content.firstElementChild)return;e.innerHTML=d[f]}else h?h.finally(()=>{g&&p(T,f)}):v(e,f,g).finally(()=>{g?p(T,f):x(e,R,P)}).catch(A=>{document.dispatchEvent(new CustomEvent("fetch-error",{detail:A}))})})}),l(()=>{delete d[E.template],E.template="",b(e)})}),o.$router=t.context,o.magic("router",()=>t.context),document.addEventListener("alpine:initialized",()=>{y("init"),t.settings.hash?c(location.hash.substring(1),!1,!0):c(location.pathname,!1,!0)}),window.addEventListener("popstate",()=>{t.settings.hash?window.location.hash!=""&&c(window.location.hash.substring(1),!0):c(window.location.pathname,!0)}),H();function H(){window.document.body.addEventListener(document.ontouchstart?"touchstart":"click",function(e){if(e.metaKey||e.ctrlKey||e.shiftKey||e.detail!=1||e.defaultPrevented)return;let r=e.target,i=e.composedPath();if(i){for(let l=0;l<i.length;l++)if(!!i[l].nodeName&&i[l].nodeName.toUpperCase()==="A"&&!!i[l].href){r=i[l];break}}if(r==null||r.hasAttribute("native"))return;let n=$(r,t.settings.hash);if(!n.valid)return;let s=t.routes[m(t.context.route)]??t.notfound;s.handlersDone||(s.cancelHandlers=!0,u()),e.stopImmediatePropagation&&e.stopImmediatePropagation(),e.stopPropagation&&e.stopPropagation(),e.preventDefault(),c(n.link)})}async function c(e,r=!1,i=!1){e||(e="/"),t.context.path=e,t.settings.hash||(t.settings.basePath!="/"&&!e.startsWith(t.settings.basePath)&&(e=t.settings.basePath+e),e==t.settings.basePath&&!e.endsWith("/")&&(e+="/"));let n=t.routes.find(l=>{let h=U(e,l.path);return l.params=h!=!1?h:{},h!=!1})??t.notfound;n.handlersDone=!n.handlers.length,(n.handlers.length||n.template)&&k();let s=L(n.path,e,n.params);if(t.context=s,y("onBeforeHandlersExecuted",n,e,i)=="stop"){u();return}if(!r){let l="";if(t.settings.hash?(l="#",l+=window.location.search+e):l=e+window.location.search+window.location.hash,!i)history.pushState({path:l},"",l);else if(t.settings.hash&&e=="/")return t.context=s,c("/",!1,!1)}if(n&&n.handlers.length){if(n.cancelHandlers=!1,!await W(n.handlers,s)){u();return}n.handlersDone=!0,n.template||u()}y("onHandlersExecuted",n,e,i)}function L(e,r,i){return{route:e,path:r,params:i,query:window.location.search.substring(1),hash:window.location.hash.substring(1),redirect(n){return c(n),"stop"},navigate(n){c(n)}}}function O(e,r,i){if(e.indexOf(r)===-1)return i;let n=e[e.indexOf(r)+1];if(!n)return i;if(r==="target"){let s=n.match(/([a-z0-9_-]+)/);if(s)return s[1]}return n}async function W(e,r){for(let i=0;i<e.length;i++)if(typeof e[i]=="function"){let n=t.routes[m(r.route)]??t.notfound;if(n.cancelHandlers)return n.cancelHandlers=!1,!1;let s;if(e[i].constructor.name==="AsyncFunction"?s=await e[i](r):s=e[i](r),s=="stop")return!1}return!0}}var G=D;export{G as default};
//# sourceMappingURL=router.esm.js.map
