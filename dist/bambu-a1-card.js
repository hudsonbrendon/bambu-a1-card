function t(t,e,i,s){var a,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(o=(r<3?a(o):r>3?a(e,i,o):a(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:n,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,f=m?m.emptyScript:"",b=u.reactiveElementPolyfillSupport,_=(t,e)=>t,g={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!n(t,e),y={attribute:!0,type:String,converter:g,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);a?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:g).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:g;this._$Em=s;const r=a.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const r=this.constructor;if(!1===s&&(a=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??v)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[_("elementProperties")]=new Map,$[_("finalized")]=new Map,b?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=t=>t,A=w.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+M,z=`<${E}>`,C=document,P=()=>C.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,j="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,T=/>/g,B=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,R=/"/g,I=/^(?:script|style|textarea|title)$/i,D=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=D(1),Z=D(2),q=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),W=new WeakMap,G=C.createTreeWalker(C,129);function Y(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let a,r=2===e?"<svg>":3===e?"<math>":"",o=U;for(let e=0;e<i;e++){const i=t[e];let n,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===U?"!--"===l[1]?o=O:void 0!==l[1]?o=T:void 0!==l[2]?(I.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=B):void 0!==l[3]&&(o=B):o===B?">"===l[0]?(o=a??U,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?B:'"'===l[3]?R:L):o===R||o===L?o=B:o===O||o===T?o=U:(o=B,a=void 0);const d=o===B&&t[e+1].startsWith("/>")?" ":"";r+=o===U?i+z:c>=0?(s.push(n),i.slice(0,c)+S+i.slice(c)+M+d):i+M+(-2===c?e:d)}return[Y(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,r=0;const o=t.length-1,n=this.parts,[l,c]=J(t,e);if(this.el=Q.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&n.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[r++],i=s.getAttribute(t).split(M),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:a,name:o[2],strings:i,ctor:"."===o[1]?it:"?"===o[1]?st:"@"===o[1]?at:et}),s.removeAttribute(t)}else t.startsWith(M)&&(n.push({type:6,index:a}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(M),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),G.nextNode(),n.push({type:2,index:++a});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===E)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(M,t+1));)n.push({type:7,index:a}),t+=M.length-1}a++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===q)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const r=H(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=K(t,a._$AS(t,e.values),a,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??C).importNode(e,!0);G.currentNode=s;let a=G.nextNode(),r=0,o=0,n=i[0];for(;void 0!==n;){if(r===n.index){let e;2===n.type?e=new tt(a,a.nextSibling,this,t):1===n.type?e=new n.ctor(a,n.name,n.strings,this,t):6===n.type&&(e=new rt(a,this,t)),this._$AV.push(e),n=i[++o]}r!==n?.index&&(a=G.nextNode(),r++)}return G.currentNode=C,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),H(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Q(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new tt(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const a=this.strings;let r=!1;if(void 0===a)t=K(this,t,e,0),r=!H(t)||t!==this._$AH&&t!==q,r&&(this._$AH=t);else{const s=t;let o,n;for(t=a[0],o=0;o<a.length-1;o++)n=K(this,s[i+o],e,o),n===q&&(n=this._$AH[o]),r||=!H(n)||n!==this._$AH[o],n===F?t=F:t!==F&&(t+=(n??"")+a[o+1]),this._$AH[o]=n}r&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class at extends et{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??F)===q)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(Q,tt),(w.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;class lt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new tt(e.insertBefore(P(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}lt._$litElement$=!0,lt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:lt});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:lt}),(nt.litElementVersions??=[]).push("4.2.2");const ht={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:v},dt=(t=ht,e,i)=>{const{kind:s,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}const ut=165,mt=112.5,ft=[0,-34,22,-10,30,-24,8,0],bt=292,_t=124,gt=[{x:266,y:95,r:22},{x:318,y:95,r:22},{x:263,y:152,r:24},{x:321,y:152,r:24}],vt=[{x:283,y:114},{x:301,y:114},{x:283,y:134},{x:301,y:134}];function yt(t,e,i){const s=vt[t],a=mt+e+1.1*(t-1.5),r=i-45;return`M${s.x} ${s.y-6} C${s.x-4} ${s.y-92} ${a+64} ${r-52} ${a} ${r}`}function $t(t,e,i){const{x:s,y:a,r:r}=gt[e],o=.38*r,n=!t||t.empty,l=n?0:(t.remain??100)/100,c=o+(r-2.2-o)*Math.max(.1,l),h=t?.color??"var(--bac-filament-unknown)",d=t=>{const e=t*Math.PI/180;return`M${s+Math.cos(e)*o*.45} ${a+Math.sin(e)*o*.45} L${s+Math.cos(e)*o*.85} ${a+Math.sin(e)*o*.85}`};return Z`
    <g class="spool s${e+1} ${n?"empty":""} ${t?.active?"active":""}">
      <circle cx=${s} cy=${a} r=${r} class="flange" />
      ${n?F:Z`<circle cx=${s} cy=${a} r=${c} fill=${h} class="filament" />`}
      <circle cx=${s} cy=${a} r=${r} class="perf" fill="url(#bac-perf)" />
      <circle cx=${s} cy=${a} r=${r} class="rim" />
      <circle cx=${s} cy=${a} r=${o} class="core" />
      <g class="reel ${i?"spinning":""}" style="transform-origin:${s}px ${a}px">
        <path d="${d(0)} ${d(120)} ${d(240)}" class="spoke" />
      </g>
      <circle cx=${s} cy=${a} r=${.32*o} class="axle" />
    </g>
  `}const wt="bambu-a1-card",xt=["bambulab_local","bambu_lab"],At={online:["binary_sensor","online"],print_status:["sensor","print_status"],stage:["sensor","stage"],progress:["sensor","print_progress","progress"],remaining:["sensor","remaining_time"],end_time:["sensor","end_time"],layer:["sensor","current_layer"],total_layers:["sensor","total_layers"],nozzle_temp:["sensor","nozzle_temp","nozzle_temperature"],nozzle_target:["number","target_nozzle_temperature","nozzle_target"],bed_temp:["sensor","bed_temp","bed_temperature"],bed_target:["number","target_bed_temperature","bed_target"],part_fan:["sensor","cooling_fan_speed","part_fan"],speed:["select","printing_speed","speed_profile"],speed_profile:["sensor","speed_profile"],light:["light","chamber_light"],task:["sensor","subtask_name","task_name"],cover:["image","cover_image"],camera:["camera","camera"],hms:["binary_sensor","hms_errors"],print_error:["binary_sensor","print_error"],wifi:["sensor","wifi_signal"],nozzle_size:["sensor","nozzle_diameter"],total_hours:["sensor","total_print_time","total_usage_hours"],firmware:["update","firmware_update","firmware"],pause:["button","pause"],resume:["button","resume"],stop:["button","stop"],clear_error:["button","clear_error"],home:["button","home"],cooldown:["button","cooldown"],bed_level:["button","calibrate_bed_leveling"],external_spool:["sensor","external_spool"],tray_1:["sensor"],tray_2:["sensor"],tray_3:["sensor"],tray_4:["sensor"]},kt=["tray_1","tray_2","tray_3","tray_4"],St=new Set(["printing","preparing"]),Mt=new Set(["printing","preparing","paused","error","finished","failed"]),Et=new Set(["unavailable","unknown",""]);function zt(t,e){const i={},s=[];if(e.device){const a=function(t,e){const i=t?.devices??{},s=new Set(i[e]?.config_entries??[]),a=new Set([e]);for(const t of Object.values(i))(t.via_device_id===e||t.config_entries?.some(t=>s.has(t)))&&a.add(t.id);return a}(t,e.device);for(const e of Object.values(t?.entities??{})){if(!e.platform||!xt.includes(e.platform)||!a.has(e.device_id??""))continue;const t=e.entity_id.split(".")[0],r=e.translation_key??"";if("sensor"!==t||"tray"!==r)for(const[s,[a,...o]]of Object.entries(At))a===t&&o.includes(r)&&!i[s]&&(i[s]=e.entity_id);else s.push(e.entity_id)}}return s.sort((t,e)=>t.localeCompare(e,void 0,{numeric:!0})),kt.forEach((t,e)=>{s[e]&&(i[t]=s[e])}),{...i,...e.entities??{}}}function Ct(t,e){const i=i=>e[i]?t?.states[e[i]]?.state:void 0,s=i("print_status");if("off"===i("online")||"offline"===s)return"offline";if(void 0===s||Et.has(s))return"unavailable";if("on"===i("print_error"))return"error";switch(s){case"running":return"printing";case"prepare":case"init":case"slicing":return"preparing";case"pause":return"paused";case"failed":return"failed";case"finish":return"finished";default:return"idle"}}function Pt(t){const e=t?.attributes??{},i=t?.state??"unavailable",s="string"!=typeof e.type||/^(empty|\?)$/i.test(e.type)?void 0:e.type,a=!t||!0===e.empty||Et.has(i)||/^empty$/i.test(i)||!s&&"?"===i,r=String(e.color??"").replace("#",""),o=/^[0-9a-f]{6}/i.test(r)&&!/^0{8}$/.test(r)?`#${r.slice(0,6)}`:void 0,n=null===e.remain||void 0===e.remain||""===e.remain?NaN:Number(e.remain),l=Number.isFinite(n)&&n>=0&&!1!==e.remain_enabled?Math.min(100,Math.round(n)):null,c="string"==typeof e.name&&"?"!==e.name?e.name:"string"==typeof e.sub_brands?e.sub_brands:i;return{entity_id:t?.entity_id,empty:a,color:o,type:s,name:c,remain:l,active:!0===e.active}}var Ht={common:{name:"Card da Bambu Lab A1",description:"Card animado da Bambu Lab A1 e do AMS lite (integração bambulab_local ou bambu_lab).",invalid_config:"Configuração inválida",more_info:"Mais informações"},status:{printing:"Imprimindo",preparing:"Preparando",paused:"Pausada",error:"Erro de impressão",failed:"Impressão falhou",finished:"Concluída",idle:"Ociosa",offline:"Desligada",unavailable:"Indisponível"},job:{layer:"Camada {layer}/{total}",left:"faltam {time}",eta:"termina {time}"},stat:{nozzle:"Bico",bed:"Mesa",target:"{name} · alvo {value}°",speed:"Velocidade",total_hours:"Uso total"},speed:{silent:"Silencioso",standard:"Padrão",sport:"Esportivo",ludicrous:"Insano"},ams:{empty:"Vazio",external:"Externo",slot:"Bandeja {n}"},tip:{wifi:"Sinal Wi-Fi",nozzle:"Diâmetro do bico",fan:"Ventoinha da peça",hms:"Erros HMS",update:"Atualização de firmware disponível"},action:{pause:"Pausar",resume:"Retomar",stop:"Parar",confirm_stop:"Parar a impressão atual? Não dá para retomar depois.",clear_error:"Limpar erro",light:"Luz",cooldown:"Resfriar",home:"Referenciar eixos",bed_level:"Nivelar mesa",confirm_bed_level:"Rodar a calibração de nivelamento da mesa agora?",lower:"Baixar alvo do {name}",raise:"Subir alvo do {name}"},editor:{device:"Impressora",name:"Nome",show_name:"Mostrar nome",show_status:"Mostrar status",show_toolbar:"Mostrar barra de ações",show_ams:"Mostrar AMS",compact_view:"Modo compacto",temperature_step:"Passo de temperatura (°C)"}};const Nt={en:{common:{name:"Bambu Lab A1 Card",description:"Animated card for the Bambu Lab A1 and its AMS lite (bambulab_local or bambu_lab integration).",invalid_config:"Invalid configuration",more_info:"More info"},status:{printing:"Printing",preparing:"Preparing",paused:"Paused",error:"Print error",failed:"Print failed",finished:"Finished",idle:"Idle",offline:"Offline",unavailable:"Unavailable"},job:{layer:"Layer {layer}/{total}",left:"{time} left",eta:"ends {time}"},stat:{nozzle:"Nozzle",bed:"Bed",target:"{name} · target {value}°",speed:"Speed",total_hours:"Total use"},speed:{silent:"Silent",standard:"Standard",sport:"Sport",ludicrous:"Ludicrous"},ams:{empty:"Empty",external:"External",slot:"Slot {n}"},tip:{wifi:"Wi-Fi signal",nozzle:"Nozzle diameter",fan:"Part fan",hms:"HMS errors",update:"Firmware update available"},action:{pause:"Pause",resume:"Resume",stop:"Stop",confirm_stop:"Stop the current print? It can't be resumed.",clear_error:"Clear error",light:"Light",cooldown:"Cool down",home:"Home axes",bed_level:"Bed leveling",confirm_bed_level:"Run the bed leveling calibration now?",lower:"Lower {name} target",raise:"Raise {name} target"},editor:{device:"Printer device",name:"Name",show_name:"Show name",show_status:"Show status",show_toolbar:"Show toolbar",show_ams:"Show AMS",compact_view:"Compact view",temperature_step:"Temperature step (°C)"}},"pt-BR":Ht,pt:Ht};function jt(t,e){let i=t;for(const t of e){if(!i||"object"!=typeof i||!(t in i))return;i=i[t]}return"string"==typeof i?i:void 0}function Ut(t,e="en",i={}){const s=t.split(".");return(jt(Nt[e],s)??jt(Nt[e.split("-")[0]],s)??jt(Nt.en,s)??t).replace(/\{(\w+)\}/g,(t,e)=>e in i?String(i[e]):`{${e}}`)}const Ot=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)})`
  :host {
    --bac-background: var(--ha-card-background, var(--card-background-color, transparent));
    --bac-primary-text-color: var(--primary-text-color);
    --bac-secondary-text-color: var(--secondary-text-color);
    --bac-divider-color: var(--entities-divider-color, var(--divider-color));
    --bac-ok: var(--success-color, #43a047);
    --bac-warning: var(--warning-color, #ffa600);
    --bac-error: var(--error-color, #db4437);
    --bac-accent: #00ae42; /* Bambu green */
    --bac-spacing: 10px;
    /* illustration palette, shared with the vacuum / printer / MiSTer cards */
    --bac-body: #f6f7f8;
    --bac-body-2: #e4e6e9;
    --bac-metal: #c9cdd2;
    --bac-metal-hi: #eceef0;
    --bac-metal-2: #a9afb6;
    --bac-cap: #6b7178;
    --bac-outline: #9aa0a6;
    --bac-panel: #2b2f36;
    --bac-plate: #1f2226;
    --bac-gold: #c9a23c;
    --bac-light: #fff4c8;
    --bac-flange: #eef0f2;
    --bac-filament-unknown: #b8bcc2;
    --bac-perf: rgba(255, 255, 255, 0.55);
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  :host([dark-mode]) {
    --bac-body: #4a4f58;
    --bac-body-2: #3a3f47;
    --bac-metal: #5d636c;
    --bac-metal-hi: #7a8089;
    --bac-metal-2: #474c54;
    --bac-cap: #2a2e34;
    --bac-outline: #6b7178;
    --bac-panel: #15171b;
    --bac-plate: #121417;
    --bac-flange: #5a5f68;
    --bac-perf: rgba(0, 0, 0, 0.3);
  }

  ha-card {
    background: var(--bac-background);
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  .preview {
    position: relative;
    text-align: center;
  }
  .preview.not-available {
    filter: grayscale(1);
  }

  /* ── header ─────────────────────────────────────────────────────────── */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .tips {
    display: flex;
    gap: var(--bac-spacing);
    flex-grow: 1;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--bac-spacing);
    color: var(--bac-secondary-text-color);
    font-size: 0.95rem;
  }
  .tip {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    line-height: 1;
    white-space: nowrap;
  }
  .tip ha-icon {
    --mdc-icon-size: 18px;
  }
  .tip.alert {
    color: var(--bac-error);
  }
  .tip.update {
    color: var(--bac-accent);
  }
  .more-info {
    color: var(--bac-secondary-text-color);
    margin: 2px;
  }

  /* ── illustration ───────────────────────────────────────────────────── */
  .hero {
    display: block;
    margin: 0 auto;
    cursor: pointer;
    width: min(94%, 420px);
  }
  .hero.solo {
    width: min(64%, 260px);
  }
  .a1 {
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .a1 .shadow {
    fill: rgba(0, 0, 0, 0.12);
  }
  .a1 .metal {
    stroke: var(--bac-outline);
    stroke-width: 0.8;
  }
  .a1 .cap {
    fill: var(--bac-cap);
  }
  .a1 .base {
    stroke: var(--bac-outline);
    stroke-width: 1.2;
  }
  .a1 .base-line {
    stroke: var(--bac-metal);
    stroke-width: 1;
  }
  .a1 .slot,
  .a1 .rivet {
    fill: var(--bac-outline);
  }
  .a1 .carriage {
    fill: var(--bac-cap);
  }
  .a1 .plate {
    fill: var(--bac-plate);
    stroke: var(--bac-panel);
    stroke-width: 0.8;
  }
  .a1 .plate-sheen {
    stroke: rgba(255, 255, 255, 0.18);
    stroke-width: 1;
  }
  .a1 .plate-edge {
    fill: var(--bac-metal-2);
  }
  .a1 .part {
    stroke: rgba(0, 0, 0, 0.25);
    stroke-width: 0.6;
  }
  .a1 .window {
    fill: rgba(0, 0, 0, 0.22);
  }
  .a1 .screen {
    fill: var(--bac-panel);
  }
  .a1 .display {
    fill: #3b4552;
  }
  .a1 .ui {
    fill: rgba(255, 255, 255, 0.45);
  }
  .a1:not(.offline):not(.unavailable) .display {
    fill: #1d3b52;
  }
  .a1 .block {
    fill: var(--bac-body);
    stroke: var(--bac-outline);
    stroke-width: 0.8;
  }
  .a1 .badge {
    font: 800 6px Arial, Helvetica, sans-serif;
    fill: var(--bac-panel);
    text-anchor: end;
  }
  .a1 .head {
    fill: var(--bac-body);
    stroke: var(--bac-outline);
    stroke-width: 1;
  }
  .a1 .head-side {
    fill: var(--bac-body-2);
    stroke: var(--bac-outline);
    stroke-width: 0.8;
  }
  .a1 .inlet {
    fill: var(--bac-cap);
  }
  .a1 .knob {
    fill: var(--bac-gold);
    stroke: #9c7a22;
    stroke-width: 0.6;
  }
  .a1 .knob-hole {
    fill: var(--bac-panel);
  }
  .a1 .logo {
    fill: var(--bac-outline);
  }
  .a1 .duct,
  .a1 .heater {
    fill: var(--bac-panel);
  }
  .a1 .nozzle {
    fill: var(--bac-gold);
  }
  .a1 .nozzle-glow,
  .a1 .cone,
  .a1 .heat {
    display: none;
  }
  .a1 .heat {
    fill: none;
    stroke: var(--bac-error);
    stroke-width: 1.4;
    stroke-linecap: round;
    opacity: 0.55;
  }
  .a1 .tube {
    fill: none;
    stroke: var(--bac-metal);
    stroke-width: 1.6;
    stroke-linecap: round;
    opacity: 0.45;
  }
  .a1 .tube.active {
    stroke-width: 2.2;
    opacity: 1;
  }
  .a1 .stand {
    fill: var(--bac-cap);
  }
  .a1 .hub {
    fill: var(--bac-body);
    stroke: var(--bac-outline);
    stroke-width: 1;
  }
  .a1 .feeder {
    fill: var(--bac-cap);
    stroke: var(--bac-panel);
    stroke-width: 0.6;
  }
  .a1 .lever {
    fill: #e8b923;
  }
  .a1 .spool .flange {
    fill: var(--bac-flange);
  }
  .a1 .spool .filament {
    stroke: rgba(0, 0, 0, 0.18);
    stroke-width: 0.6;
  }
  .a1 .spool .spoke {
    stroke: var(--bac-outline);
    stroke-width: 1.4;
    stroke-linecap: round;
  }
  .a1 .spool .rim {
    fill: none;
    stroke: var(--bac-outline);
    stroke-width: 1.2;
  }
  .a1 .spool .core {
    fill: var(--bac-body);
    stroke: var(--bac-outline);
    stroke-width: 0.8;
  }
  .a1 .spool .axle {
    fill: var(--bac-cap);
  }
  .a1 .spool.empty .rim {
    stroke-dasharray: 2 2;
  }
  .a1 .spool.active .rim {
    stroke: var(--bac-accent);
    stroke-width: 2;
  }
  .a1 .badge-warn,
  .a1 .badge-pause,
  .a1 .badge-done {
    display: none;
  }

  /* hot nozzle / bed */
  .a1.nozzle-hot .nozzle-glow {
    display: inline;
    fill: #ff7a1a;
    opacity: 0.55;
    animation: breathe 1.6s ease-in-out infinite;
  }
  .a1.nozzle-hot .nozzle {
    fill: #ff9a3c;
  }
  .a1.bed-hot .heat {
    display: inline;
    animation: rise 2.4s ease-in-out infinite;
  }
  .a1.bed-hot .plate-edge {
    fill: #e0703a;
  }
  /* toolhead LED */
  .a1.light-on .cone {
    display: inline;
  }
  /* printing: the bed slings on Y, the active spool turns */
  .a1.printing .bed {
    animation: sling 1.5s ease-in-out infinite;
  }
  .a1 .reel.spinning {
    animation: spin 5s linear infinite;
  }
  .a1.preparing .lever.on,
  .a1.printing .lever.on {
    fill: var(--bac-accent);
  }
  .a1.paused .badge-pause {
    display: inline;
  }
  .a1.error .badge-warn,
  .a1.failed .badge-warn {
    display: inline;
    animation: breathe 1.2s ease-in-out infinite;
  }
  .a1.finished .badge-done {
    display: inline;
  }
  .a1.offline,
  .a1.unavailable {
    opacity: 0.6;
  }

  @keyframes sling {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(1.6px);
    }
  }
  @keyframes spin {
    to {
      transform: rotate(-360deg);
    }
  }
  @keyframes rise {
    0% {
      transform: translateY(3px);
      opacity: 0;
    }
    40% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(-5px);
      opacity: 0;
    }
  }
  @keyframes breathe {
    0%,
    100% {
      opacity: 0.35;
    }
    50% {
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .a1 * {
      animation: none !important;
    }
  }

  /* ── metadata ───────────────────────────────────────────────────────── */
  .metadata {
    margin: var(--bac-spacing) auto;
  }
  .name {
    text-align: center;
    font-weight: bold;
    color: var(--bac-primary-text-color);
    font-size: 16px;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: var(--bac-secondary-text-color);
  }
  .status.error,
  .status.failed {
    color: var(--bac-error);
  }
  .status.paused {
    color: var(--bac-warning);
  }

  /* ── current job ────────────────────────────────────────────────────── */
  .job {
    display: flex;
    gap: 10px;
    align-items: center;
    margin: 0 14px 12px;
    text-align: left;
    cursor: pointer;
  }
  .job img {
    width: 44px;
    height: 44px;
    object-fit: contain;
    border-radius: 8px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    flex-shrink: 0;
  }
  .job-info {
    flex: 1;
    min-width: 0;
  }
  .job-name {
    color: var(--bac-primary-text-color);
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bar {
    height: 6px;
    border-radius: 3px;
    background: var(--bac-divider-color, rgba(0, 0, 0, 0.1));
    margin: 5px 0 4px;
    overflow: hidden;
  }
  .bar > div {
    height: 100%;
    border-radius: 3px;
    background: var(--bac-accent);
    transition: width 0.6s ease;
  }
  .job.paused .bar > div {
    background: var(--bac-warning);
  }
  .job.error .bar > div,
  .job.failed .bar > div {
    background: var(--bac-error);
  }
  .job-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 12px;
    font-size: 0.8rem;
    color: var(--bac-secondary-text-color);
  }
  .job-meta b {
    color: var(--bac-primary-text-color);
    font-weight: 600;
  }

  /* ── AMS slots ──────────────────────────────────────────────────────── */
  .ams {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    border-top: 1px solid var(--bac-divider-color);
  }
  .slot-chip {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 4px;
    cursor: pointer;
    min-width: 0;
    color: var(--bac-secondary-text-color);
    font-size: 0.82rem;
    border-right: 1px solid var(--bac-divider-color);
  }
  .slot-chip:last-child {
    border-right: 0;
  }
  .slot-chip .swatch {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  }
  .slot-chip.empty .swatch {
    background: transparent !important;
    box-shadow: inset 0 0 0 1.5px var(--bac-divider-color);
  }
  .slot-chip .slot-text {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
    text-align: left;
    min-width: 0;
  }
  .slot-chip .slot-type {
    color: var(--bac-primary-text-color);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .slot-chip.active {
    background: color-mix(in srgb, var(--bac-accent) 12%, transparent);
  }
  .slot-chip.active .slot-type {
    color: var(--bac-accent);
  }

  /* ── stats ──────────────────────────────────────────────────────────── */
  .stats {
    border-top: 1px solid var(--bac-divider-color);
    display: flex;
    justify-content: space-evenly;
    color: var(--bac-secondary-text-color);
  }
  .stats-block {
    padding: var(--bac-spacing) 4px;
    text-align: center;
    border-right: 1px solid var(--bac-divider-color);
    flex: 1 1 0;
    min-width: 0;
  }
  .stats-block:last-of-type {
    border-right: 0;
  }
  .stats-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }
  .stats-value {
    cursor: pointer;
    font-size: 20px;
    color: var(--bac-primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stats-value.hot {
    color: #e8701a;
  }
  .stats-subtitle {
    font-size: 0.82rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .step {
    border: 0;
    background: transparent;
    color: var(--bac-secondary-text-color);
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    border-radius: 50%;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  .step:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
  }
  .step ha-icon {
    --mdc-icon-size: 16px;
  }

  /* ── toolbar ────────────────────────────────────────────────────────── */
  .toolbar {
    min-height: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px;
    border-top: 1px solid var(--bac-divider-color);
  }
  .toolbar .fill-gap {
    flex-grow: 1;
  }
  .toolbar ha-icon-button {
    color: var(--bac-secondary-text-color);
    width: 44px;
    height: 44px;
    --mdc-icon-button-size: 44px;
  }
  .toolbar ha-icon-button ha-icon {
    display: flex;
  }
  .toolbar ha-icon-button.active {
    color: var(--bac-warning);
  }
  .toolbar .text-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 0;
    background: transparent;
    color: var(--bac-secondary-text-color);
    font: inherit;
    padding: 12px 10px;
    cursor: pointer;
    border-radius: 8px;
  }
  .toolbar .text-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }
  .toolbar .text-button.danger {
    color: var(--bac-error);
  }
  .toolbar .text-button ha-icon {
    --mdc-icon-size: 20px;
  }
  .speed {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--bac-secondary-text-color);
    padding: 0 6px;
  }
  .speed ha-icon {
    --mdc-icon-size: 20px;
  }
  .speed select {
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
    padding: 10px 2px;
  }
  .speed select option {
    color: initial;
  }
`;console.info("%c BAMBU-A1-CARD %c v0.1.1 ","color: white; background: #00ae42; font-weight: 700;","color: white; background: #23272e; font-weight: 700;");const Tt=new Set(["unavailable","unknown",""]),Bt=new Set(["printing","idle","none","unknown","unavailable","auto_bed_leveling_complete",""]);function Lt(t,e,i){t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))}let Rt=class extends lt{constructor(){super(...arguments),this._entities={}}static{this.styles=Ot}static getStubConfig(t){const e=Object.values(t?.entities??{});for(const t of xt){const i=e.find(e=>e.platform===t&&"print_status"===e.translation_key&&e.device_id);if(i)return{type:`custom:${wt}`,device:i.device_id}}return{type:`custom:${wt}`}}static getConfigForm(){return{schema:[{name:"device",selector:{device:{filter:xt.map(t=>({integration:t}))}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_status",selector:{boolean:{}}},{name:"show_ams",selector:{boolean:{}}},{name:"show_toolbar",selector:{boolean:{}}},{name:"compact_view",selector:{boolean:{}}},{name:"temperature_step",selector:{number:{min:1,max:20,mode:"box"}}}]}],computeLabel:t=>Ut(`editor.${t.name}`)}}setConfig(t){if(!t)throw new Error(Ut("common.invalid_config"));this._config={show_name:!0,show_status:!0,show_toolbar:!0,show_ams:!0,compact_view:!1,temperature_step:5,...t},this._entities=zt(this.hass,this._config)}getCardSize(){return this._config?.compact_view?4:9}getGridOptions(){return this._config?.compact_view?{columns:6,rows:4,min_columns:4,min_rows:3}:{columns:6,rows:9,min_columns:4,min_rows:6}}willUpdate(t){if(!t.has("hass")||!this._config)return;const e=t.get("hass");e&&e.entities===this.hass?.entities&&e.devices===this.hass?.devices&&this._entities.print_status||(this._entities=zt(this.hass,this._config)),e&&e.themes?.darkMode===this.hass?.themes?.darkMode||this.toggleAttribute("dark-mode",Boolean(this.hass?.themes?.darkMode))}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!e||!this.hass||Object.values(this._entities).some(t=>t&&e.states[t]!==this.hass.states[t])}get _lang(){return t=this.hass,e=this._config?.language,e??t?.locale?.language??t?.language??"en";var t,e}_t(t,e){return Ut(t,this._lang,e)}_state(t){const e=this._entities[t];return e?this.hass?.states[e]:void 0}_text(t){const e=this._state(t)?.state;return void 0===e||Tt.has(e)?void 0:e}_num(t){const e=Number(this._text(t));return void 0!==this._text(t)&&Number.isFinite(e)?e:null}_available(t){const e=this._state(t)?.state;return void 0!==e&&"unavailable"!==e}_formatState(t){try{if(this.hass?.formatEntityState)return this.hass.formatEntityState(t)}catch{}return t.state.replace(/_/g," ")}_duration(t){const e=Math.max(0,Math.round(t));if(e<60)return`${e} min`;const i=Math.floor(e/60);return i<48?e%60?`${i} h ${e%60} min`:`${i} h`:`${Math.floor(i/24)} d ${i%24} h`}_clock(t){return new Intl.DateTimeFormat(this._lang,{hour:"2-digit",minute:"2-digit"}).format(t)}_trays(){return kt.filter(t=>this._entities[t]).map(t=>Pt(this._state(t)))}_moreInfo(t="print_status"){const e=this._entities[t];e&&Lt(this,"hass-more-info",{entityId:e})}_moreInfoId(t){t&&Lt(this,"hass-more-info",{entityId:t})}_press(t,e){const i=this._entities[t];i&&this.hass&&(!e||window.confirm(this._t(e)))&&this.hass.callService("button","press",{entity_id:i})}_toggleLight(){const t=this._state("light");t&&this.hass&&this.hass.callService("light","on"===t.state?"turn_off":"turn_on",{entity_id:t.entity_id})}_setSpeed(t){const e=this._entities.speed;e&&this.hass&&this.hass.callService("select","select_option",{entity_id:e,option:t})}_stepTarget(t,e){const i=this._state(t);if(!i||!this.hass)return;const s=Number(this._config.temperature_step)||5,a=Number(i.attributes.min??0),r=Number(i.attributes.max??300),o=Number(i.state)||0,n=Math.min(r,Math.max(a,Math.round((o+e*s)/s)*s));n!==o&&this.hass.callService("number","set_value",{entity_id:i.entity_id,value:n})}_runShortcut(t){if(!this.hass||!t.service)return;const[e,i]=t.service.split(".");this.hass.callService(e,i,t.service_data,t.target)}render(){if(!this._config)return F;const t=Ct(this.hass,this._entities),e="unavailable"===t,i=e||"offline"===t,s=this._trays();return V`
      <ha-card>
        <div class="preview ${e?"not-available":""}">
          <div class="header">
            <div class="tips">${i?F:this._renderTips()}</div>
            <ha-icon-button class="more-info" .label=${this._t("common.more_info")} @click=${()=>this._moreInfo()}>
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._config.compact_view?F:this._renderHero(t,s)}
          <div class="metadata">${this._renderName()} ${this._renderStatus(t)}</div>
          ${i?F:this._renderJob(t)}
        </div>
        ${i||!this._config.show_ams?F:this._renderAms(s)}
        ${i||this._config.compact_view?F:this._renderStats(t)}
        ${this._renderToolbar(t)}
      </ha-card>
    `}_renderHero(t,e){const i=Boolean(this._config.show_ams)&&e.length>0,s=e.find(t=>t.active&&!t.empty&&t.color),a="offline"!==t&&"unavailable"!==t,r="function"==typeof window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=function(t){const e="printing"===t.state||"paused"===t.state||"error"===t.state||"finished"===t.state||"preparing"===t.state,i=e?"finished"===t.state?34:34*Math.min(100,Math.max(0,t.progress))/100:0,s=e?164-i:112,a="printing"===t.state,r=t.animate&&a,o=t.showAms?"14 6 340 200":"14 6 206 200",n=t.trays.findIndex(t=>t.active&&!t.empty);return Z`
    <svg class="a1 ${t.state} ${t.light?"light-on":""} ${t.nozzleHot?"nozzle-hot":""} ${t.bedHot?"bed-hot":""}"
      viewBox=${o} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bambu Lab A1">
      <defs>
        <linearGradient id="bac-alu" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="var(--bac-metal)" />
          <stop offset="0.55" stop-color="var(--bac-metal-hi)" />
          <stop offset="1" stop-color="var(--bac-metal-2)" />
        </linearGradient>
        <linearGradient id="bac-alu-h" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--bac-metal-hi)" />
          <stop offset="1" stop-color="var(--bac-metal-2)" />
        </linearGradient>
        <linearGradient id="bac-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--bac-body)" />
          <stop offset="1" stop-color="var(--bac-body-2)" />
        </linearGradient>
        <linearGradient id="bac-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--bac-light)" stop-opacity="0.75" />
          <stop offset="1" stop-color="var(--bac-light)" stop-opacity="0" />
        </linearGradient>
        <clipPath id="bac-part-clip"><rect x="-30" y=${-i} width="60" height=${i+1} /></clipPath>
        <pattern id="bac-perf" width="2.8" height="2.8" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="0.6" fill="var(--bac-perf)" />
        </pattern>
        <pattern id="bac-layers" width="4" height="1.6" patternUnits="userSpaceOnUse">
          <rect width="4" height="0.5" fill="rgba(0,0,0,0.16)" />
        </pattern>
      </defs>

      <ellipse cx="120" cy="200" rx="98" ry="4.5" class="shadow" />
      ${t.showAms?Z`<ellipse cx="292" cy="200" rx="44" ry="3.5" class="shadow" />`:F}

      <!-- aluminium arch: two uprights, top bar, grey corner caps -->
      <rect x="56" y="50" width="10" height="128" fill="url(#bac-alu)" class="metal" />
      <rect x="176" y="50" width="11" height="138" fill="url(#bac-alu)" class="metal" />
      <rect x="176" y="168" width="11" height="20" rx="1" class="cap" />
      <rect x="62" y="46" width="118" height="9" fill="url(#bac-alu-h)" class="metal" />
      <rect x="53" y="43.5" width="17" height="13" rx="2.5" class="cap" />
      <rect x="172" y="43.5" width="18" height="13" rx="2.5" class="cap" />

      <!-- base -->
      <rect x="32" y="174" width="176" height="24" rx="6" fill="url(#bac-base)" class="base" />
      <path d="M36 191 H204" class="base-line" />
      <rect x="146" y="193.5" width="9" height="1.6" rx="0.8" class="slot" />

      <!-- bed: carriage, black textured plate (slings on Y while printing) -->
      <g class="bed">
        <rect x="52" y="167" width="128" height="7" rx="1.5" class="carriage" />
        <path d="M56 158.5 H174 L183 170 H47 Z" class="plate" />
        <path d="M56 158.5 H174" class="plate-sheen" />
        <rect x="47" y="170" width="136" height="2.4" rx="1" class="plate-edge" />
        <g class="heat">
          <path d="M84 154 q3 -4 0 -8 q-3 -4 0 -8" /><path d="M115 154 q3 -4 0 -8 q-3 -4 0 -8" /><path d="M146 154 q3 -4 0 -8 q-3 -4 0 -8" />
        </g>
        ${i>0?Z`<g transform="translate(115 ${ut})" clip-path="url(#bac-part-clip)">
              <path d="M-19 0 H16 Q22 -4 25 -12 H-23 Q-21 -5 -19 0 Z M-12 -12 V-25 H7 V-12 Z M-15 -25 H9 V-28.5 H-15 Z M-5 -28.5 V-34 H1 V-28.5 Z"
                fill=${t.partColor} class="part" />
              <path d="M-19 0 H16 Q22 -4 25 -12 H-23 Q-21 -5 -19 0 Z M-12 -12 V-25 H7 V-12 Z M-15 -25 H9 V-28.5 H-15 Z M-5 -28.5 V-34 H1 V-28.5 Z"
                fill="url(#bac-layers)" />
              <rect x="-7" y="-22" width="6" height="6" rx="1" class="window" />
            </g>`:F}
      </g>

      <!-- touchscreen on the front right of the base -->
      <rect x="166" y="175" width="32" height="19" rx="3" class="screen" />
      <rect x="168.5" y="177.3" width="27" height="13.4" rx="1.5" class="display" />
      <rect x="171" y="180" width="9" height="2" rx="1" class="ui" /><rect x="171" y="184.5" width="18" height="1.6" rx="0.8" class="ui" />

      <!-- PTFE tubes from the AMS lite over to the toolhead -->
      ${t.showAms?vt.map((e,i)=>{const a=i===n,o=t.trays[i],l=o&&!o.empty?o.color:void 0;return Z`<path d=${yt(i,0,s)} class="tube ${a?"active":""}" style=${l?`stroke:${l}`:""}>
              ${r?Z`<animate attributeName="d" dur=${"6s"} repeatCount="indefinite" values=${ft.map(t=>yt(i,t,s)).join(";")} />`:F}
            </path>`}):F}

      <!-- X gantry: rides up (Z) with the part -->
      <g transform="translate(0 ${s})">
        <rect x="26" y="-27" width="160" height="9" fill="url(#bac-alu-h)" class="metal" />
        ${[40,52,76,88,136,148,160].map(t=>Z`<circle cx=${t} cy="-22.5" r="0.9" class="rivet" />`)}
        <path d="M20 -31 h10 v16 h-4 v6 h-6 z" class="cap" />
        <rect x="184" y="-31" width="24" height="17" rx="2" class="block" />
        <text x="203" y="-19.5" class="badge">A1</text>

        <g class="toolhead">
          ${r?Z`<animateTransform attributeName="transform" type="translate" dur=${"6s"} repeatCount="indefinite"
                values=${ft.map(t=>`${t} 0`).join(";")} />`:F}
          <path d="M101 -1 L124 -1 L${142.5} ${ut-s-4} L${82.5} ${ut-s-4} Z" class="cone" fill="url(#bac-cone)" />
          <rect x="110" y="-45" width="5" height="8" rx="1" class="inlet" />
          <rect x="98" y="-38" width="29" height="31" rx="3.5" class="head" />
          <rect x="119" y="-38" width="8" height="31" rx="2" class="head-side" />
          <circle cx="108" cy="-27" r="4.6" class="knob" />
          <circle cx="108" cy="-27" r="2" class="knob-hole" />
          <rect x="102" y="-17" width="12" height="1.4" rx="0.7" class="logo" />
          <rect x="103" y="-8" width="19" height="4" rx="1.2" class="duct" />
          <rect x="108.5" y="-5" width="8" height="3" rx="0.6" class="heater" />
          <path d="M110.8 -2.2 H114.2 L113 0.4 H112 Z" class="nozzle" />
          <circle cx=${mt} cy="0" r="3.2" class="nozzle-glow" />
        </g>
      </g>

      ${t.showAms?Z`
          <!-- AMS lite: stand, hub, four feeders, spools -->
          <path d="M260 198 L276 186 H308 L324 198 Z" class="stand" />
          <rect x="287.5" y="124" width="9" height="64" rx="2" class="stand" />
          ${[0,1].map(e=>$t(t.trays[e],e,a&&e===n))}
          <circle cx=${bt} cy=${_t} r="15" class="hub" />
          ${vt.map((t,e)=>Z`<rect x=${t.x-4} y=${t.y-6} width="8" height="12" rx="3" class="feeder" />
              <circle cx=${t.x} cy=${t.y+3} r="1.6" class="lever ${e===n?"on":""}" />`)}
          ${[2,3].map(e=>$t(t.trays[e],e,a&&e===n))}
        `:F}

      <!-- badges over the frame -->
      <g class="badge-warn" transform="translate(121 24)">
        <path d="M0 -10 l11 19 h-22 z" fill="var(--bac-error)" />
        <rect x="-1.2" y="-4" width="2.4" height="7" rx="1" fill="#fff" /><circle cy="5.6" r="1.4" fill="#fff" />
      </g>
      <g class="badge-pause" transform="translate(121 24)">
        <circle r="10" fill="var(--bac-warning)" />
        <rect x="-4.2" y="-5" width="3" height="10" rx="1" fill="#fff" /><rect x="1.2" y="-5" width="3" height="10" rx="1" fill="#fff" />
      </g>
      <g class="badge-done" transform="translate(121 24)">
        <circle r="10" fill="var(--bac-ok)" />
        <path d="M-4.5 0 l3 3.2 l6 -6.4" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>
  `}({state:t,trays:e,progress:this._num("progress")??0,partColor:s?.color??e.find(t=>!t.empty&&t.color)?.color??"#00ae42",light:a&&"on"===this._text("light"),nozzleHot:a&&(this._num("nozzle_temp")??0)>=50,bedHot:a&&(this._num("bed_temp")??0)>=40,animate:!r,showAms:i});return V`<div class="hero ${i?"":"solo"}" @click=${()=>this._moreInfo(this._entities.camera?"camera":"print_status")}>
      ${o}
    </div>`}_tip(t,e,i,s,a=""){return V`
      <div class="tip ${a}" title=${this._t(i)} @click=${()=>this._moreInfo(t)}>
        <ha-icon icon=${e}></ha-icon><span>${s}</span>
      </div>
    `}_renderTips(){const t=this._num("wifi"),e=this._text("nozzle_size"),i=this._num("part_fan"),s=this._state("hms"),a=Number(s?.attributes.count??s?.attributes.Count??0);return V`
      ${null!==t?this._tip("wifi",t>-60?"mdi:wifi":t>-75?"mdi:wifi-strength-2":"mdi:wifi-strength-1","tip.wifi",`${t} dBm`):F}
      ${e?this._tip("nozzle_size","mdi:printer-3d-nozzle-outline","tip.nozzle",`${e} mm`):F}
      ${i?this._tip("part_fan","mdi:fan","tip.fan",`${Math.round(i)}%`):F}
      ${"on"===s?.state?this._tip("hms","mdi:alert-circle-outline","tip.hms",a?String(a):"HMS","alert"):F}
      ${"on"===this._text("firmware")?this._tip("firmware","mdi:update","tip.update","","update"):F}
    `}_renderName(){if(!this._config.show_name)return F;const t=this._config.device?this.hass?.devices?.[this._config.device]:void 0,e=this._config.name??t?.name_by_user??t?.name??"Bambu Lab A1";return V`<div class="name">${e}</div>`}_renderStatus(t){if(!this._config.show_status)return F;const e=this._state("stage"),i=("printing"===t||"preparing"===t)&&e&&!Bt.has(e.state)?this._formatState(e):this._t(`status.${t}`);return V`
      <div class="status ${t}">
        ${St.has(t)?V`<ha-spinner class="status-spinner" size="tiny"></ha-spinner>`:F}
        <span>${i}</span>
      </div>
    `}_renderJob(t){if(!Mt.has(t)||this._config.compact_view)return F;const e="finished"===t?100:Math.min(100,Math.max(0,this._num("progress")??0)),i=this._text("task")?.replace(/\.(gcode|3mf)$/i,"").replace(/\.gcode$/i,""),s=this._num("layer"),a=this._num("total_layers"),r=function(t){const e=Number(t?.state);if(!t||!Number.isFinite(e))return null;const i=String(t.attributes.unit_of_measurement??"min");return"h"===i?60*e:"s"===i?e/60:e}(this._state("remaining")),o="finished"!==t&&"failed"!==t;let n;const l=this._text("end_time");o&&l&&!Number.isNaN(Date.parse(l))?n=new Date(l):o&&r&&(n=new Date(Date.now()+6e4*r));const c=this._state("cover"),h=c&&!Tt.has(c.state)?c.attributes.entity_picture:void 0,d="string"==typeof h?this.hass?.hassUrl?this.hass.hassUrl(h):h:void 0;return V`
      <div class="job ${t}" @click=${()=>this._moreInfo(c?"cover":"task")}>
        ${d?V`<img src=${d} alt="" @error=${t=>t.target.style.display="none"} />`:F}
        <div class="job-info">
          ${i?V`<div class="job-name" title=${i}>${i}</div>`:F}
          <div class="bar"><div style="width:${e}%"></div></div>
          <div class="job-meta">
            <span><b>${Math.round(e)}%</b></span>
            ${null!==s&&a?V`<span>${this._t("job.layer",{layer:s,total:a})}</span>`:F}
            ${o&&r?V`<span>${this._t("job.left",{time:this._duration(r)})}</span>`:F}
            ${n?V`<span>${this._t("job.eta",{time:this._clock(n)})}</span>`:F}
          </div>
        </div>
      </div>
    `}_renderAms(t){const e=Pt(this._state("external_spool")),i=t.map((t,e)=>[t,this._t("ams.slot",{n:e+1})]);return this._entities.external_spool&&!e.empty&&i.push([e,this._t("ams.external")]),i.length?V`<div class="ams">
      ${i.map(([t,e])=>V`
          <div
            class="slot-chip ${t.empty?"empty":""} ${t.active?"active":""}"
            title=${t.empty?e:`${e} · ${t.name??""}`}
            @click=${()=>this._moreInfoId(t.entity_id)}
          >
            <span class="swatch" style="background:${t.color??"var(--bac-filament-unknown)"}"></span>
            <span class="slot-text">
              <span class="slot-type">${t.empty?this._t("ams.empty"):t.type??t.name??"?"}</span>
              <span>${null===t.remain||t.empty?"—":`${t.remain}%`}</span>
            </span>
          </div>
        `)}
    </div>`:F}_tempBlock(t,e,i){const s=this._num(t);if(null===s&&!this._entities[e])return F;const a=this._t(i),r=this._num(e),o=this._available(e),n=(t,i,s)=>o?V`<button class="step" title=${this._t(s,{name:a.toLowerCase()})} @click=${()=>this._stepTarget(e,t)}>
            <ha-icon icon=${i}></ha-icon>
          </button>`:F;return V`
      <div class="stats-block">
        <div class="stats-row">
          ${n(-1,"mdi:minus","action.lower")}
          <span class="stats-value ${null!==s&&s>=50?"hot":""}" @click=${()=>this._moreInfo(o?e:t)}>
            ${null===s?"—":`${Math.round(s)}°`}
          </span>
          ${n(1,"mdi:plus","action.raise")}
        </div>
        <div class="stats-subtitle">${r?this._t("stat.target",{name:a,value:Math.round(r)}):a}</div>
      </div>
    `}_speedLabel(t){if(!t)return"—";const e=`speed.${t}`,i=this._t(e);return i===e?t:i}_renderStats(t){const e="printing"===t||"paused"===t||"preparing"===t||"error"===t,i=this._num("total_hours"),s=e?V`<div class="stats-block" @click=${()=>this._moreInfo(this._entities.speed?"speed":"speed_profile")}>
          <div class="stats-value">${this._speedLabel(this._text("speed")??this._text("speed_profile"))}</div>
          <div class="stats-subtitle">${this._t("stat.speed")}</div>
        </div>`:null!==i?V`<div class="stats-block" @click=${()=>this._moreInfo("total_hours")}>
            <div class="stats-value">${Math.round(i)} h</div>
            <div class="stats-subtitle">${this._t("stat.total_hours")}</div>
          </div>`:F;return V`<div class="stats">
      ${this._tempBlock("nozzle_temp","nozzle_target","stat.nozzle")} ${this._tempBlock("bed_temp","bed_target","stat.bed")} ${s}
    </div>`}_iconButton(t,e,i,s=""){const a=this._t(e);return V`
      <ha-icon-button class=${s} .label=${a} title=${a} @click=${i}>
        <ha-icon icon=${t}></ha-icon>
      </ha-icon-button>
    `}_textButton(t,e,i,s=""){return V`<button class="text-button ${s}" @click=${i}><ha-icon icon=${t}></ha-icon>${this._t(e)}</button>`}_renderSpeed(){const t=this._state("speed");if(!t||Tt.has(t.state))return F;const e=t.attributes.options??[];return V`
      <label class="speed" title=${this._t("stat.speed")}>
        <ha-icon icon="mdi:speedometer"></ha-icon>
        <select @change=${t=>this._setSpeed(t.target.value)}>
          ${e.map(e=>V`<option value=${e} ?selected=${e===t.state}>${this._speedLabel(e)}</option>`)}
        </select>
      </label>
    `}_renderToolbar(t){if(!this._config.show_toolbar||"unavailable"===t||"offline"===t)return F;const e=this._state("light"),i="on"===e?.state,s=e&&!Tt.has(e.state)?this._iconButton(i?"mdi:lightbulb-on":"mdi:lightbulb-outline","action.light",()=>this._toggleLight(),i?"active":""):F,a=this._available("stop")?this._textButton("mdi:stop","action.stop",()=>this._press("stop","action.confirm_stop"),"danger"):F;let r;r="printing"===t||"preparing"===t?[this._available("pause")?this._textButton("mdi:pause","action.pause",()=>this._press("pause")):F,a]:"paused"===t||"error"===t?[this._available("resume")?this._textButton("mdi:play","action.resume",()=>this._press("resume")):F,a,this._available("clear_error")?this._iconButton("mdi:alert-remove-outline","action.clear_error",()=>this._press("clear_error")):F]:[...(this._config.shortcuts??[]).map(t=>V`<button class="text-button" title=${t.name??t.service} @click=${()=>this._runShortcut(t)}>
            <ha-icon icon=${t.icon??"mdi:flash"}></ha-icon>${t.name??""}
          </button>`),this._available("cooldown")?this._iconButton("mdi:snowflake-thermometer","action.cooldown",()=>this._press("cooldown")):F,this._available("home")?this._iconButton("mdi:home-import-outline","action.home",()=>this._press("home")):F,this._available("bed_level")?this._iconButton("mdi:grid","action.bed_level",()=>this._press("bed_level","action.confirm_bed_level")):F];const o="printing"===t||"preparing"===t||"paused"===t?this._renderSpeed():F,n=[...r,s,o].filter(t=>t!==F);return n.length?V`<div class="toolbar">${n}</div>`:F}};t([pt({attribute:!1})],Rt.prototype,"hass",void 0),t([function(t){return pt({...t,state:!0,attribute:!1})}()],Rt.prototype,"_config",void 0),Rt=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})(wt)],Rt),window.customCards=window.customCards||[],window.customCards.push({type:wt,name:Ut("common.name"),description:Ut("common.description"),preview:!0,documentationURL:"https://github.com/hudsonbrendon/bambu-a1-card",getEntitySuggestion:(t,e)=>{const i=t.entities?.[e];return i&&xt.includes(i.platform??"")&&"print_status"===i.translation_key&&i.device_id?{config:{type:`custom:${wt}`,device:i.device_id}}:null}});export{Rt as BambuA1Card,Ct as computeState,Pt as parseTray,zt as resolveEntities};
//# sourceMappingURL=bambu-a1-card.js.map
