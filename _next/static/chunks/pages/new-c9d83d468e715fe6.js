(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[971],{10877:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/new",function(){return n(37650)}])},87810:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{state:t,setState:n,content:a}=e;return(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"checkbox",checked:t,onChange:e=>{n(e.target.checked)}}),a]})}},33775:function(e,t,n){"use strict";n.a(e,async function(e,s){try{n.r(t);var a=n(85893),i=n(24905),r=n(22393),l=e([i]);i=(l.then?(await l)():l)[0],t.default=e=>{let{connected:t,setState:n,next:s,noWallet:l}=e;return(0,a.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"25% 40% 35%",justifyItems:"center",alignItems:"center"},children:[(0,a.jsx)("h1",{className:"big-title",children:"Connect wallet"}),(0,a.jsx)(i.tZ,{}),(0,a.jsxs)("div",{className:"next-previous-container",children:[t&&(0,a.jsx)("button",{className:"next-color big-button",onClick:()=>n(s),children:"Next"}),!t&&(0,a.jsxs)("div",{children:[(0,a.jsx)(r.default,{}),(0,a.jsx)("button",{className:"previous-color big-button",onClick:()=>n(l),children:"Continue without a wallet."})]})]})]})},s()}catch(e){s(e)}})},3728:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{lovelaceAmount:t,setLovelaceAmount:n}=e;function a(e){return""===e?"":(parseInt(e,10)/1e6).toString()}return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("h1",{className:"big-title",children:"Enter ada amount"}),(0,s.jsxs)("div",{children:[(0,s.jsx)("input",{type:"text",value:a(t),onChange:e=>{var t;n(""===(t=e.target.value)?"":(1e6*parseInt(t,10)).toString())},placeholder:"0",className:"ada-amount-textfield",style:{width:"".concat(a(t).length,"ch"),minWidth:"40pt",height:"80pt",fontSize:"5vw",textAlign:"center",outline:"none",border:"none"}}),(0,s.jsx)("span",{"aria-label":"ada",style:{margin:"1vw",fontSize:"5vw"},children:"₳"})]})]})}},17023:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{address:t,setAddress:n}=e,a=async()=>{try{let e=await navigator.clipboard.readText();console.log("Clipboard content:",e),n(e)}catch(e){console.error("Failed to paste content from clipboard:",e)}};return(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"big-title",children:"Enter recieve address"}),(0,s.jsx)("p",{children:"This will be the address where you will recieve your assets."}),(0,s.jsx)("input",{type:"text",value:t,onChange:e=>{n(e.target.value)},placeholder:"Enter or paste address"}),(0,s.jsx)("button",{onClick:a,children:"Paste"})]})}},40945:function(e,t,n){"use strict";n.a(e,async function(e,s){try{n.r(t);var a=n(85893),i=n(67294),r=n(24905),l=n(58088),c=n(3728),o=n(47190),d=n(38781),u=n(17023),h=n(33775),x=n(87810),g=e([r,h]);[r,h]=g.then?(await g)():g,t.default=()=>{let[e,t]=(0,i.useState)(o.i.ConnectWallet),[n,s]=(0,i.useState)(!1),{connected:g,wallet:p}=(0,r.Os)(),[m,v]=(0,i.useState)(""),[f,j]=(0,i.useState)(""),w=(0,i.useCallback)(async()=>await p.getChangeAddress(),[p]);return(0,i.useEffect)(()=>{g&&(async()=>{let e=await w();console.log(e),j(e),console.log(f)})()},[f,w,g]),(0,a.jsx)("div",{className:"center",children:(()=>{switch(e){case o.i.ConnectWallet:return(0,a.jsx)(h.default,{connected:g,wallet:p,setState:t,next:o.i.EnterAdaAmount,noWallet:o.i.EnterRecieveAddres});case o.i.EnterAdaAmount:return(0,a.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"25% 25% 35%",justifyItems:"center"},children:[(0,a.jsx)(c.default,{lovelaceAmount:m,setLovelaceAmount:v}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"20% 80%",height:"240pt",justifyItems:"center",alignItems:"center"},children:[(0,a.jsx)(x.default,{state:n,setState:s,content:"Let people decide how much they want to give"}),(0,a.jsx)(d.default,{setState:t,showNext:""!==m||n,previous:o.i.ConnectWallet,next:o.i.ShareLink})]})]});case o.i.ShareLink:return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(l.default,{url:n?"https://zoofpay.com/?to="+f:"https://zoofpay.com/?to="+f+"&a="+m})});case o.i.EnterRecieveAddres:return(0,a.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"70% 30%",justifyItems:"center",textAlign:"center"},children:[(0,a.jsx)(u.default,{address:f,setAddress:j}),(0,a.jsx)(d.default,{setState:t,showNext:""!==f,previous:o.i.ConnectWallet,next:o.i.EnterAdaAmount})]});default:return null}})()})},s()}catch(e){s(e)}})},38781:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{setState:t,showNext:n,previous:a,next:i}=e;return(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"50% 50%",justifyItems:"center",height:"220px"},children:[(0,s.jsx)("button",{disabled:!n,className:n?"big-button next-color":"big-button disabled-color",onClick:()=>t(i),children:"Next"}),(0,s.jsx)("button",{className:"previous-color big-button",onClick:()=>t(a),children:"Previous"})]})}},37650:function(e,t,n){"use strict";n.a(e,async function(e,s){try{n.r(t);var a=n(85893),i=n(40945),r=e([i]);i=(r.then?(await r)():r)[0],t.default=()=>(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"center-horizontal",children:(0,a.jsx)(i.default,{})})}),s()}catch(e){s(e)}})},22393:function(e,t,n){"use strict";n.r(t);var s=n(85893),a=n(41664),i=n.n(a);t.default=()=>(0,s.jsxs)("p",{style:{marginBottom:"10pt",textAlign:"center"},children:["Don't have a wallet yet?",(0,s.jsx)(i(),{href:"/walletHelp",children:"We can help"})]})},58088:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{url:t}=e;return(0,s.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100%",gridTemplateRows:"50% 50%",justifyItems:"center"},children:[(0,s.jsx)("h1",{className:"big-title",children:"Share payment request"}),(0,s.jsx)("button",{className:"big-button next-color",onClick:()=>{t&&navigator.clipboard.writeText(t).then(()=>{console.log("link copied.")}).catch(e=>{console.error("Failed to copy: ",e)})},children:"Copy link"})," "]})}},47190:function(e,t,n){"use strict";var s,a;n.d(t,{i:function(){return s}}),(a=s||(s={})).ConnectWallet="ConnectWallet",a.EnterAdaAmount="EnterAdaAmount",a.ShareLink="ShareLink",a.EnterRecieveAddres="EnterRecieveAddres",a.PayNow="PayNow",a.ThankYou="ThankYou",a.QRCode="QRCode"}},function(e){e.O(0,[888,774,179],function(){return e(e.s=10877)}),_N_E=e.O()}]);