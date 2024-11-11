"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[289],{53379:function(e,t,n){var i=n(85893);t.Z=e=>{let{handle:t,description:n,lovelace:s}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h1",{className:"big-title",children:"Payment request"}),(0,i.jsxs)("p",{style:{fontSize:"30pt",textAlign:"center"},children:[(0,i.jsx)("b",{children:""===t?"Someone":"$"+t}),(0,i.jsxs)("div",{children:["wants ",(0,i.jsxs)("b",{children:[(parseInt(s,10)/1e6).toString()," ₳"]})]}),""!==n&&(0,i.jsxs)("div",{children:["for ",(0,i.jsx)("b",{children:n})]})]})]})}},87810:function(e,t,n){n.r(t);var i=n(85893);t.default=e=>{let{state:t,setState:n,content:s}=e;return(0,i.jsxs)("label",{children:[(0,i.jsx)("input",{type:"checkbox",checked:t,onChange:e=>{n(e.target.checked)}}),s]})}},33775:function(e,t,n){n.a(e,async function(e,i){try{n.r(t);var s=n(85893),a=n(24905),l=n(22393),r=e([a]);a=(r.then?(await r)():r)[0],t.default=e=>{let{connected:t,setState:n,next:i,noWallet:r}=e;return(0,s.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"25% 40% 35%",justifyItems:"center",alignItems:"center"},children:[(0,s.jsx)("h1",{className:"big-title",children:"Connect wallet"}),(0,s.jsx)(a.tZ,{}),(0,s.jsxs)("div",{className:"next-previous-container",children:[t&&(0,s.jsx)("button",{className:"next-color big-button",onClick:()=>n(i),children:"Next"}),!t&&(0,s.jsxs)("div",{children:[(0,s.jsx)(l.default,{}),(0,s.jsx)("button",{className:"previous-color big-button",onClick:()=>n(r),children:"Continue without a wallet."})]})]})]})},i()}catch(e){i(e)}})},3728:function(e,t,n){n.r(t);var i=n(85893);t.default=e=>{let{lovelaceAmount:t,setLovelaceAmount:n}=e;function s(e){return""===e?"":(parseInt(e,10)/1e6).toString()}return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h1",{className:"big-title",children:"Enter ada amount"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("input",{type:"text",value:s(t),onChange:e=>{var t;n(""===(t=e.target.value)?"":(1e6*parseInt(t,10)).toString())},placeholder:"0",className:"ada-amount-textfield",style:{width:"".concat(s(t).length,"ch"),minWidth:"40pt",height:"80pt",fontSize:"5vw",textAlign:"center",outline:"none",border:"none"}}),(0,i.jsx)("span",{"aria-label":"ada",style:{margin:"1vw",fontSize:"5vw"},children:"₳"})]})]})}},38781:function(e,t,n){n.r(t);var i=n(85893);t.default=e=>{let{setState:t,showNext:n,previous:s,next:a}=e;return(0,i.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"50% 50%",justifyItems:"center",height:"220px"},children:[(0,i.jsx)("button",{disabled:!n,className:n?"big-button next-color":"big-button disabled-color",onClick:()=>t(a),children:"Next"}),(0,i.jsx)("button",{className:"previous-color big-button",onClick:()=>t(s),children:"Previous"})]})}},22393:function(e,t,n){n.r(t);var i=n(85893),s=n(41664),a=n.n(s);t.default=()=>(0,i.jsxs)("p",{style:{marginBottom:"10pt",textAlign:"center"},children:["Don't have a wallet yet?",(0,i.jsx)(a(),{href:"/walletHelp",children:"We can help"})]})},26289:function(e,t,n){n.a(e,async function(e,i){try{n.r(t);var s=n(85893),a=n(67294),l=n(24905),r=n(41154),o=n(20842),c=n(63875),d=n(60543),u=n(38781),h=n(47190),x=n(33775),m=n(3728),g=n(87810),j=n(53379),p=e([l,r,x]);[l,r,x]=p.then?(await p)():p,t.default=e=>{let{to_addres:t,amount_in_lovelace:n,description:i}=e,[p,v]=(0,a.useState)(h.i.Description),f=""==n,{connected:w,wallet:b}=(0,l.Os)(),[y,C]=(0,a.useState)(""),[k,N]=(0,a.useState)(!1),[T,S]=(0,a.useState)("");async function I(e,t,n){let i=new r.YW({initiator:b}).sendLovelace(e,t);n&&(i=i.sendLovelace("addr1q9k2dmeh8wuahemw8gq8ezlkhgjkka0h57pxw7sr5k86ds3qs4ejfy2evem83nzms4q6vfmegst93qa395348jqzvrpqwl34yg","2000000"));let s=await i.build(),a=await b.signTx(s),l=await b.submitTx(a);S(l),v(h.i.ThankYou)}return(0,s.jsx)(s.Fragment,{children:(()=>{switch(p){case h.i.ConnectWallet:return(0,s.jsxs)(s.Fragment,{children:[f&&(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(x.default,{connected:w,wallet:b,setState:v,next:h.i.EnterAdaAmount,noWallet:h.i.QRCode})}),!f&&(0,s.jsx)(x.default,{connected:w,wallet:b,setState:v,next:h.i.PayNow,noWallet:h.i.QRCode})]});case h.i.QRCode:return(0,s.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"20% 50% 30%",justifyItems:"center",alignItems:"center"},children:[(0,s.jsx)(c.default,{to_addres:t,amount_in_lovelace:n}),(0,s.jsx)(u.default,{setState:v,next:h.i.ThankYou,previous:h.i.ConnectWallet,showNext:!0})]});case h.i.PayNow:return(0,s.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"15% 40% 45%",justifyItems:"center",alignItems:"center"},children:[(0,s.jsx)("h1",{className:"big-title",children:"You will pay"}),(0,s.jsx)(d.default,{amount_in_lovelace:f?y:n}),(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"20% 40% 40%",justifyItems:"center",alignItems:"center"},children:[(0,s.jsx)(g.default,{state:k,setState:N,content:"Donate 2 ada to zoofpay ❤️"}),(0,s.jsx)("button",{className:"next-color big-button",type:"button",onClick:()=>{let e=f?y:n;I(t,e,k)},children:"pay now"}),(0,s.jsx)("button",{className:"previous-color big-button",onClick:()=>v(h.i.ConnectWallet),children:"Previous"})]})]});case h.i.ThankYou:return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(o.default,{txHash:T})});case h.i.EnterAdaAmount:return(0,s.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"25% 25% 35%",justifyItems:"center"},children:[(0,s.jsx)(m.default,{lovelaceAmount:y,setLovelaceAmount:C}),(0,s.jsx)(u.default,{setState:v,showNext:""!==y,previous:h.i.ConnectWallet,next:h.i.PayNow})]});case h.i.Description:return(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"15% 55% 30%",height:"90vh",justifyItems:"center",alignItems:"center"},children:[(0,s.jsx)(j.Z,{description:null===i?"":i,lovelace:n,handle:""}),(0,s.jsx)("div",{children:(0,s.jsx)("button",{className:"next-color big-button",onClick:()=>v(h.i.ConnectWallet),children:"Next"})})]});default:return null}})()})},i()}catch(e){i(e)}})},63875:function(e,t,n){n.r(t);var i=n(85893),s=n(1653);t.default=e=>{let{to_addres:t,amount_in_lovelace:n}=e,a=(parseInt(n,10)/1e6).toString();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("h1",{className:"big-title",children:["Send ",a," ₳ to:"]}),(0,i.jsxs)("div",{children:[t?(0,i.jsx)(s.ZP,{value:t,size:200}):(0,i.jsx)("p",{children:"Address is not available"}),(0,i.jsx)("button",{onClick:()=>{navigator.clipboard.writeText(t).then(()=>{console.log("link copied.")}).catch(e=>{console.error("Failed to copy: ",e)})},children:"Copy address"})," "]})]})}},20842:function(e,t,n){n.r(t);var i=n(85893);t.default=e=>{let{txHash:t}=e;return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:"center",children:[(0,i.jsx)("h1",{className:"big-title",children:"Thank You!"}),t?(0,i.jsxs)("p",{children:["View transaction on:",(0,i.jsx)("a",{href:"https://cardanoscan.io/transaction/"+t,children:"cardanoscan"})]}):(0,i.jsx)(i.Fragment,{})]})})}},60543:function(e,t,n){n.r(t);var i=n(85893);t.default=e=>{let{amount_in_lovelace:t}=e,n=(parseInt(t,10)/1e6).toString();return(0,i.jsx)("div",{children:(0,i.jsxs)("p",{className:"big-title",children:[n," ₳"]})})}},47190:function(e,t,n){var i,s;n.d(t,{i:function(){return i}}),(s=i||(i={})).ConnectWallet="ConnectWallet",s.EnterAdaAmount="EnterAdaAmount",s.ShareLink="ShareLink",s.EnterRecieveAddres="EnterRecieveAddres",s.PayNow="PayNow",s.ThankYou="ThankYou",s.QRCode="QRCode",s.Description="Description",s.EnterDescription="Enter Description"}}]);