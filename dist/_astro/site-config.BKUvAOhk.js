import{r as n}from"./index.DFXwRQuD.js";/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(...e)=>e.filter((a,r,s)=>!!a&&a.trim()!==""&&s.indexOf(a)===r).join(" ").trim();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,r,s)=>s?s.toUpperCase():r.toLowerCase());/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=e=>{const a=P(e);return a.charAt(0).toUpperCase()+a.slice(1)};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=e=>{for(const a in e)if(a.startsWith("aria-")||a==="role"||a==="title")return!0;return!1};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=n.forwardRef(({color:e="currentColor",size:a=24,strokeWidth:r=2,absoluteStrokeWidth:s,className:l="",children:o,iconNode:_,...c},C)=>n.createElement("svg",{ref:C,...w,width:a,height:a,stroke:e,strokeWidth:s?Number(r)*24/Number(a):r,className:p("lucide",l),...!o&&!g(c)&&{"aria-hidden":"true"},...c},[..._.map(([L,I])=>n.createElement(L,I)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=(e,a)=>{const r=n.forwardRef(({className:s,...l},o)=>n.createElement(U,{ref:o,iconNode:a,className:p(`lucide-${d(u(e))}`,`lucide-${e}`,s),...l}));return r.displayName=u(e),r};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],N=h("message-circle",A),B={},t=B,m="LauraBrowStudio",i={name:m,claim:"Microblading y micropigmentación de cejas en Palencia",city:"Palencia",region:"Castilla y León",country:"España",url:t.PUBLIC_SITE_URL??"https://laurabrowstudio.es",phoneDisplay:t.PUBLIC_PHONE_DISPLAY??"600 12 34 56",whatsappNumber:t.PUBLIC_WHATSAPP_NUMBER??"34600123456",email:t.PUBLIC_EMAIL??"hola@laurabrowstudio.es",address:t.PUBLIC_ADDRESS??"Calle Mayor Principal, 34001 Palencia",postalCode:t.PUBLIC_POSTAL_CODE??"34001",instagram:t.PUBLIC_INSTAGRAM??"laurabrowstudio",legalName:t.PUBLIC_LEGAL_NAME??m,nif:t.PUBLIC_NIF??"12345678A",geo:{lat:Number(t.PUBLIC_LAT)||null,lng:Number(t.PUBLIC_LNG)||null},businessHours:t.PUBLIC_BUSINESS_HOURS??"Mo-Sa 09:00-20:00",formEndpoint:t.PUBLIC_FORM_ENDPOINT??"",turnstileSiteKey:t.PUBLIC_TURNSTILE_SITE_KEY??"",plausibleDomain:t.PUBLIC_PLAUSIBLE_DOMAIN??""};i.instagram.startsWith("[")||`${i.instagram}`;function b(e){return i.whatsappNumber?`https://wa.me/${i.whatsappNumber}?text=${encodeURIComponent(e)}`:"#contacto"}const S={general:"Hola, me gustaría solicitar una valoración de mis cejas.",quiz:"Hola, he hecho el test de la web y me gustaría consultar mi caso."};export{N as M,b as a,h as c,i as s,S as w};
