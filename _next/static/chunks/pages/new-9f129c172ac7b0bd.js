(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[971],{10877:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/new",function(){return n(37650)}])},63826:function(e,t,n){"use strict";var i=n(85893);t.Z=e=>{let{description:t,setDescription:n}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h1",{className:"big-title",children:"Enter optional description"}),(0,i.jsx)("input",{type:"text",value:decodeURIComponent(t),onChange:e=>{n(encodeURIComponent(e.target.value))},placeholder:function(){let e=["pizza \uD83C\uDF55","vacation \uD83C\uDFD6️","ice cream \uD83C\uDF66","lunch \uD83C\uDF54","movie tickets \uD83C\uDF9F️","concert \uD83C\uDFB8","coffee ☕","groceries \uD83D\uDED2","gas ⛽","gym \uD83C\uDFCB️","birthday gift \uD83C\uDF82","snacks \uD83C\uDF7F"],t=Math.floor(Math.random()*e.length);return e[t]}(),style:{width:"".concat(t.length,"ch"),minWidth:"10ch",height:"80pt",fontSize:"5vw",textAlign:"center",outline:"none",border:"none"}})]})}},87810:function(e,t,n){"use strict";n.r(t);var i=n(85893);t.default=e=>{let{state:t,setState:n,content:s}=e;return(0,i.jsxs)("label",{children:[(0,i.jsx)("input",{type:"checkbox",checked:t,onChange:e=>{n(e.target.checked)}}),s]})}},33775:function(e,t,n){"use strict";n.a(e,async function(e,i){try{n.r(t);var s=n(85893),r=n(24905),a=n(22393),l=e([r]);r=(l.then?(await l)():l)[0],t.default=e=>{let{connected:t,setState:n,next:i,noWallet:l}=e;return(0,s.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"25% 40% 35%",justifyItems:"center",alignItems:"center"},children:[(0,s.jsx)("h1",{className:"big-title",children:"Connect wallet"}),(0,s.jsx)(r.tZ,{}),(0,s.jsxs)("div",{className:"next-previous-container",children:[t&&(0,s.jsx)("button",{className:"next-color big-button",onClick:()=>n(i),children:"Next"}),!t&&(0,s.jsxs)("div",{children:[(0,s.jsx)(a.default,{}),(0,s.jsx)("button",{className:"previous-color big-button",onClick:()=>n(l),children:"Continue without a wallet."})]})]})]})},i()}catch(e){i(e)}})},3728:function(e,t,n){"use strict";n.r(t);var i=n(85893);t.default=e=>{let{lovelaceAmount:t,setLovelaceAmount:n}=e;function s(e){return""===e?"":(parseInt(e,10)/1e6).toString()}return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h1",{className:"big-title",children:"Enter ada amount"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("input",{type:"text",value:s(t),onChange:e=>{var t;n(""===(t=e.target.value)?"":(1e6*parseInt(t,10)).toString())},placeholder:"0",className:"ada-amount-textfield",style:{width:"".concat(s(t).length,"ch"),minWidth:"40pt",height:"80pt",fontSize:"5vw",textAlign:"center",outline:"none",border:"none"}}),(0,i.jsx)("span",{"aria-label":"ada",style:{margin:"1vw",fontSize:"5vw"},children:"₳"})]})]})}},17023:function(e,t,n){"use strict";n.r(t);var i=n(85893);t.default=e=>{let{address:t,setAddress:n}=e,s=async()=>{try{let e=await navigator.clipboard.readText();console.log("Clipboard content:",e),n(e)}catch(e){console.error("Failed to paste content from clipboard:",e)}};return(0,i.jsxs)("div",{children:[(0,i.jsx)("h1",{className:"big-title",children:"Enter recieve address"}),(0,i.jsx)("p",{children:"This will be the address where you will recieve your assets."}),(0,i.jsx)("input",{type:"text",value:t,onChange:e=>{n(e.target.value)},placeholder:"Enter or paste address"}),(0,i.jsx)("button",{onClick:s,children:"Paste"})]})}},40945:function(e,t,n){"use strict";n.a(e,async function(e,i){try{n.r(t);var s=n(85893),r=n(67294),a=n(24905),l=n(58088),c=n(3728),o=n(47190),u=n(38781),d=n(17023),h=n(33775),p=n(87810),g=n(63826),m=e([a,h]);[a,h]=m.then?(await m)():m,t.default=()=>{let[e,t]=(0,r.useState)(o.i.ConnectWallet),[n,i]=(0,r.useState)(!1),{connected:m,wallet:x}=(0,a.Os)(),[v,f]=(0,r.useState)(""),[j,y]=(0,r.useState)(""),[w,C]=(0,r.useState)(""),b=(0,r.useCallback)(async()=>await x.getChangeAddress(),[x]);return(0,r.useEffect)(()=>{m&&(async()=>{let e=await b();console.log(e),y(e),console.log(j)})()},[j,b,m]),(0,s.jsx)("div",{className:"center",children:(()=>{switch(e){case o.i.ConnectWallet:return(0,s.jsx)(h.default,{connected:m,wallet:x,setState:t,next:o.i.EnterDescription,noWallet:o.i.EnterRecieveAddres});case o.i.EnterAdaAmount:return(0,s.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"25% 25% 35%",justifyItems:"center"},children:[(0,s.jsx)(c.default,{lovelaceAmount:v,setLovelaceAmount:f}),(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"20% 80%",height:"240pt",justifyItems:"center",alignItems:"center"},children:[(0,s.jsx)(p.default,{state:n,setState:i,content:"Let people decide how much they want to give"}),(0,s.jsx)(u.default,{setState:t,showNext:""!==v||n,previous:o.i.ConnectWallet,next:o.i.ShareLink})]})]});case o.i.ShareLink:return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(l.default,{url:n?"https://zoofpay.com/?to="+j+"&d="+w:"https://zoofpay.com/?to="+j+"&a="+v+"&d="+w})});case o.i.EnterRecieveAddres:return(0,s.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"70% 30%",justifyItems:"center",textAlign:"center"},children:[(0,s.jsx)(d.default,{address:j,setAddress:y}),(0,s.jsx)(u.default,{setState:t,showNext:""!==j,previous:o.i.ConnectWallet,next:o.i.EnterAdaAmount})]});case o.i.EnterDescription:return(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"15% 55% 30%",height:"100vh",justifyItems:"center",alignItems:"center"},children:[(0,s.jsx)(g.Z,{description:w,setDescription:C}),(0,s.jsx)(u.default,{setState:t,next:o.i.EnterAdaAmount,previous:o.i.ConnectWallet,showNext:!0})]});default:return null}})()})},i()}catch(e){i(e)}})},38781:function(e,t,n){"use strict";n.r(t);var i=n(85893);t.default=e=>{let{setState:t,showNext:n,previous:s,next:r}=e;return(0,i.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"50% 50%",justifyItems:"center",height:"220px"},children:[(0,i.jsx)("button",{disabled:!n,className:n?"big-button next-color":"big-button disabled-color",onClick:()=>t(r),children:"Next"}),(0,i.jsx)("button",{className:"previous-color big-button",onClick:()=>t(s),children:"Previous"})]})}},37650:function(e,t,n){"use strict";n.a(e,async function(e,i){try{n.r(t);var s=n(85893),r=n(40945),a=e([r]);r=(a.then?(await a)():a)[0],t.default=()=>(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"center-horizontal",children:(0,s.jsx)(r.default,{})})}),i()}catch(e){i(e)}})},22393:function(e,t,n){"use strict";n.r(t);var i=n(85893),s=n(41664),r=n.n(s);t.default=()=>(0,i.jsxs)("p",{style:{marginBottom:"10pt",textAlign:"center"},children:["Don't have a wallet yet?",(0,i.jsx)(r(),{href:"/walletHelp",children:"We can help"})]})},58088:function(e,t,n){"use strict";n.r(t);var i=n(85893);t.default=e=>{let{url:t}=e;return(0,i.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100%",gridTemplateRows:"50% 50%",justifyItems:"center"},children:[(0,i.jsx)("h1",{className:"big-title",children:"Share payment request"}),(0,i.jsx)("button",{className:"big-button next-color",onClick:()=>{t&&navigator.clipboard.writeText(t).then(()=>{console.log("link copied.")}).catch(e=>{console.error("Failed to copy: ",e)})},children:"Copy link"})," "]})}},47190:function(e,t,n){"use strict";var i,s;n.d(t,{i:function(){return i}}),(s=i||(i={})).ConnectWallet="ConnectWallet",s.EnterAdaAmount="EnterAdaAmount",s.ShareLink="ShareLink",s.EnterRecieveAddres="EnterRecieveAddres",s.PayNow="PayNow",s.ThankYou="ThankYou",s.QRCode="QRCode",s.Description="Description",s.EnterDescription="Enter Description"}},function(e){e.O(0,[888,774,179],function(){return e(e.s=10877)}),_N_E=e.O()}]);