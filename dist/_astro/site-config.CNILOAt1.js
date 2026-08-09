import{r as n}from"./index.D-Pb_x6I.js";/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=(...e)=>e.filter((t,r,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,s)=>s?s.toUpperCase():r.toLowerCase());/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=e=>{const t=P(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var d={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=n.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:s,className:c="",children:o,iconNode:L,...l},p)=>n.createElement("svg",{ref:p,...d,width:t,height:t,stroke:e,strokeWidth:s?Number(r)*24/Number(t):r,className:I("lucide",c),...!o&&!N(l)&&{"aria-hidden":"true"},...l},[...L.map(([_,C])=>n.createElement(_,C)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=(e,t)=>{const r=n.forwardRef(({className:s,...c},o)=>n.createElement(w,{ref:o,iconNode:t,className:I(`lucide-${A(u(e))}`,`lucide-${e}`,s),...c}));return r.displayName=u(e),r};/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],B=E("message-circle",g),U={},a=U,m="LauraBrowStudio",i={name:m,claim:"Microblading y micropigmentación de cejas en Palencia",city:"Palencia",region:"Castilla y León",country:"España",url:a.PUBLIC_SITE_URL??"https://laurabrowstudio.es",phoneDisplay:a.PUBLIC_PHONE_DISPLAY??"[TELÉFONO / WHATSAPP]",whatsappNumber:a.PUBLIC_WHATSAPP_NUMBER??"",email:a.PUBLIC_EMAIL??"[EMAIL]",address:a.PUBLIC_ADDRESS??"[DIRECCIÓN / ZONA DE PALENCIA]",instagram:a.PUBLIC_INSTAGRAM??"[INSTAGRAM]",legalName:a.PUBLIC_LEGAL_NAME??m,nif:a.PUBLIC_NIF??"[NIF]",geo:{lat:Number(a.PUBLIC_LAT)||null,lng:Number(a.PUBLIC_LNG)||null},businessHours:a.PUBLIC_BUSINESS_HOURS??"Mo-Sa 09:00-20:00",formEndpoint:a.PUBLIC_FORM_ENDPOINT??"",turnstileSiteKey:a.PUBLIC_TURNSTILE_SITE_KEY??"",plausibleDomain:a.PUBLIC_PLAUSIBLE_DOMAIN??""};i.instagram.startsWith("[")||`${i.instagram}`;function S(e){return i.whatsappNumber?`https://wa.me/${i.whatsappNumber}?text=${encodeURIComponent(e)}`:"#contacto"}const f={general:"Hola, me gustaría solicitar una valoración de mis cejas.",quiz:"Hola, he hecho el test de la web y me gustaría consultar mi caso."};export{B as M,S as a,E as c,i as s,f as w};
