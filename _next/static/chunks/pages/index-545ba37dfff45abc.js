(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{48312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(51854)}])},87810:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{state:t,setState:n,content:a}=e;return(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"checkbox",checked:t,onChange:e=>{n(e.target.checked)}}),a]})}},33775:function(e,t,n){"use strict";n.a(e,async function(e,s){try{n.r(t);var a=n(85893),i=n(24905),r=n(22393),l=e([i]);i=(l.then?(await l)():l)[0],t.default=e=>{let{connected:t,setState:n,next:s,noWallet:l}=e;return(0,a.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"25% 40% 35%",justifyItems:"center",alignItems:"center"},children:[(0,a.jsx)("h1",{className:"big-title",children:"Connect wallet"}),(0,a.jsx)(i.tZ,{}),(0,a.jsxs)("div",{className:"next-previous-container",children:[t&&(0,a.jsx)("button",{className:"next-color big-button",onClick:()=>n(s),children:"Next"}),!t&&(0,a.jsxs)("div",{children:[(0,a.jsx)(r.default,{}),(0,a.jsx)("button",{className:"previous-color big-button",onClick:()=>n(l),children:"Continue without a wallet."})]})]})]})},s()}catch(e){s(e)}})},3728:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{lovelaceAmount:t,setLovelaceAmount:n}=e;function a(e){return""===e?"":(parseInt(e,10)/1e6).toString()}return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("h1",{className:"big-title",children:"Enter ada amount"}),(0,s.jsxs)("div",{children:[(0,s.jsx)("input",{type:"text",value:a(t),onChange:e=>{var t;n(""===(t=e.target.value)?"":(1e6*parseInt(t,10)).toString())},placeholder:"0",className:"ada-amount-textfield",style:{width:"".concat(a(t).length,"ch"),minWidth:"40pt",height:"80pt",fontSize:"5vw",textAlign:"center",outline:"none",border:"none"}}),(0,s.jsx)("span",{"aria-label":"ada",style:{margin:"1vw",fontSize:"5vw"},children:"₳"})]})]})}},19636:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{title:t,content:n,right:a}=e;return(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:a?"35% 65%":"65% 35%",gridTemplateRows:"50% 50%",width:"100vw",height:"50vh",alignItems:"center"},children:[a&&(0,s.jsx)("div",{}),(0,s.jsxs)("div",{style:{padding:"5%"},children:[(0,s.jsx)("h3",{style:{fontSize:"5vw",fontWeight:"bold"},children:t}),(0,s.jsx)("p",{children:n})]})]})}},51854:function(e,t,n){"use strict";n.a(e,async function(e,s){try{n.r(t);var a=n(85893),i=n(39332),r=n(26289),l=n(10674),o=n(35563),c=n(21375),d=e([r]);r=(d.then?(await d)():d)[0],t.default=()=>{let e=(0,i.useSearchParams)(),t=e.get("to"),n=e.get("a"),s=null!=t&&null!=n,d=null!=t&&null==n,u=null==t&&null==n;return(0,a.jsxs)(a.Fragment,{children:[u&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.default,{}),(0,a.jsx)(c.default,{}),(0,a.jsx)(o.Z,{})]}),s&&(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"center-horizontal",children:(0,a.jsx)(r.default,{to_addres:t,amount_in_lovelace:n})})}),d&&(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"center-horizontal",children:(0,a.jsx)(r.default,{to_addres:t,amount_in_lovelace:""})})})]})},s()}catch(e){s(e)}})},38781:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{setState:t,showNext:n,previous:a,next:i}=e;return(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"50% 50%",justifyItems:"center",height:"220px"},children:[(0,s.jsx)("button",{disabled:!n,className:n?"big-button next-color":"big-button disabled-color",onClick:()=>t(i),children:"Next"}),(0,s.jsx)("button",{className:"previous-color big-button",onClick:()=>t(a),children:"Previous"})]})}},22393:function(e,t,n){"use strict";n.r(t);var s=n(85893),a=n(41664),i=n.n(a);t.default=()=>(0,s.jsxs)("p",{style:{marginBottom:"10pt",textAlign:"center"},children:["Don't have a wallet yet?",(0,s.jsx)(i(),{href:"/walletHelp",children:"We can help"})]})},26289:function(e,t,n){"use strict";n.a(e,async function(e,s){try{n.r(t);var a=n(85893),i=n(67294),r=n(24905),l=n(41154),o=n(20842),c=n(63875),d=n(60543),u=n(38781),h=n(47190),g=n(33775),m=n(3728),p=n(87810),f=e([r,l,g]);[r,l,g]=f.then?(await f)():f,t.default=e=>{let{to_addres:t,amount_in_lovelace:n}=e,[s,f]=(0,i.useState)(h.i.ConnectWallet),y=""==n,{connected:x,wallet:j}=(0,r.Os)(),[v,w]=(0,i.useState)(""),[b,C]=(0,i.useState)(!1),[k,N]=(0,i.useState)("");async function T(e,t,n){let s=new l.YW({initiator:j}).sendLovelace("addr1q8ja7ny7rf8ty6gs3d298kyw4cwl8yaets0pg9tm944kjatsu6zkeupreealc2urfwyct3le8se8adqmt0q52fg5653sy0a4dq",t);n&&(s=s.sendLovelace("addr1q9k2dmeh8wuahemw8gq8ezlkhgjkka0h57pxw7sr5k86ds3qs4ejfy2evem83nzms4q6vfmegst93qa395348jqzvrpqwl34yg","2000000"));let a=await s.build(),i=await j.signTx(a),r=await j.submitTx(i);N(r),f(h.i.ThankYou)}return(0,a.jsx)(a.Fragment,{children:(()=>{switch(s){case h.i.ConnectWallet:return(0,a.jsxs)(a.Fragment,{children:[y&&(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(g.default,{connected:x,wallet:j,setState:f,next:h.i.EnterAdaAmount,noWallet:h.i.QRCode})}),!y&&(0,a.jsx)(g.default,{connected:x,wallet:j,setState:f,next:h.i.PayNow,noWallet:h.i.QRCode})]});case h.i.QRCode:return(0,a.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"20% 50% 30%",justifyItems:"center",alignItems:"center"},children:[(0,a.jsx)(c.default,{to_addres:t,amount_in_lovelace:n}),(0,a.jsx)(u.default,{setState:f,next:h.i.ThankYou,previous:h.i.ConnectWallet,showNext:!0})]});case h.i.PayNow:return(0,a.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"15% 40% 45%",justifyItems:"center",alignItems:"center"},children:[(0,a.jsx)("h1",{className:"big-title",children:"You will pay"}),(0,a.jsx)(d.default,{amount_in_lovelace:y?v:n}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"20% 40% 40%",justifyItems:"center",alignItems:"center"},children:[(0,a.jsx)(p.default,{state:b,setState:C,content:"Donate 2 ada to zoofpay ❤️"}),(0,a.jsx)("button",{className:"next-color big-button",type:"button",onClick:()=>{let e=y?v:n;T(t,e,b)},children:"pay now"}),(0,a.jsx)("button",{className:"previous-color big-button",onClick:()=>f(h.i.ConnectWallet),children:"Previous"})]})]});case h.i.ThankYou:return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(o.default,{txHash:k})});case h.i.EnterAdaAmount:return(0,a.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"25% 25% 35%",justifyItems:"center"},children:[(0,a.jsx)(m.default,{lovelaceAmount:v,setLovelaceAmount:w}),(0,a.jsx)(u.default,{setState:f,showNext:""!==v,previous:h.i.ConnectWallet,next:h.i.PayNow})]});default:return null}})()})},s()}catch(e){s(e)}})},63875:function(e,t,n){"use strict";n.r(t);var s=n(85893),a=n(1653);t.default=e=>{let{to_addres:t,amount_in_lovelace:n}=e,i=(parseInt(n,10)/1e6).toString();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("h1",{className:"big-title",children:["Send ",i," ₳ to:"]}),(0,s.jsxs)("div",{children:[t?(0,s.jsx)(a.ZP,{value:t,size:200}):(0,s.jsx)("p",{children:"Address is not available"}),(0,s.jsx)("button",{onClick:()=>{navigator.clipboard.writeText(t).then(()=>{console.log("link copied.")}).catch(e=>{console.error("Failed to copy: ",e)})},children:"Copy address"})," "]})]})}},20842:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{txHash:t}=e;return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:"center",children:[(0,s.jsx)("h1",{className:"big-title",children:"Thank You!"}),t?(0,s.jsxs)("p",{children:["View transaction on:",(0,s.jsx)("a",{href:"https://cardanoscan.io/transaction/"+t,children:"cardanoscan"})]}):(0,s.jsx)(s.Fragment,{})]})})}},60543:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{amount_in_lovelace:t}=e,n=(parseInt(t,10)/1e6).toString();return(0,s.jsx)("div",{children:(0,s.jsxs)("p",{className:"big-title",children:[n," ₳"]})})}},10674:function(e,t,n){"use strict";n.r(t);var s=n(85893),a=n(41664),i=n.n(a);t.default=()=>(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"60% 40%",height:"80vh",textAlign:"center",alignItems:"center"},children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{style:{fontSize:"10vw",fontWeight:"bolder"},children:"zoofpay"}),(0,s.jsx)("p",{style:{fontSize:"3vw"},children:"Easily create payment requests for Cardano"})]}),(0,s.jsx)(i(),{href:"/new",children:(0,s.jsx)("p",{className:"create-link-button",children:"Create payment request"})})]})},21375:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=()=>(0,s.jsx)("div",{style:{width:"100vw",height:"80vh",display:"grid",gridTemplateColumns:"100%",gridTemplateRows:"100%",alignItems:"center",padding:"50pt"},children:(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{style:{fontSize:"5vw",fontWeight:"bold"},children:"What is zoofpay?"}),(0,s.jsx)("p",{style:{maxWidth:"600pt"},children:"Zoofpay is a powerful yet simple DApp built to streamline payment requests on the Cardano blockchain. Designed with ease of use, transparency, and accessibility in mind, Zoofpay allows you to create and share payment requests effortlessly. Whether you’re sending or receiving ADA, Zoofpay removes the guesswork, enabling you to connect your wallet, set an amount, and generate a secure payment link in seconds. With a focus on user empowerment and seamless transactions, Zoofpay transforms how you engage with digital payments on Cardano—faster, easier, and always in your control."})]})})},47190:function(e,t,n){"use strict";var s,a;n.d(t,{i:function(){return s}}),(a=s||(s={})).ConnectWallet="ConnectWallet",a.EnterAdaAmount="EnterAdaAmount",a.ShareLink="ShareLink",a.EnterRecieveAddres="EnterRecieveAddres",a.PayNow="PayNow",a.ThankYou="ThankYou",a.QRCode="QRCode"},35563:function(e,t,n){"use strict";var s=n(85893),a=n(19636);t.Z=()=>(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"40vh",fontSize:"5vw",fontWeight:"bold",textAlign:"center",height:"40vh",justifyItems:"center",alignItems:"center"},children:"Why zoofpay?"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(a.default,{title:"Easy",content:"With Zoofpay, there's no need to manually enter an address. Connect your wallet, sign the transaction, and you're all set.",right:!1}),(0,s.jsx)(a.default,{title:"Reduce Errors",content:"Zoofpay minimizes the risk of mistakes by automating the payment process, allowing you to avoid copy-paste errors and manual address entries.",right:!0}),(0,s.jsx)(a.default,{title:"Fast",content:"Say goodbye to copying addresses or double-checking amounts. With Zoofpay, your payment is a click away.",right:!0}),(0,s.jsx)(a.default,{title:"Transparent",content:"Zoofpay is free and open-source, perfectly aligned with the transparent nature of the Cardano blockchain. Verify transactions on Cardanoscan and review our source code yourself.",right:!1}),(0,s.jsx)(a.default,{title:"0% Fees",content:"Zoofpay charges zero fees. You can optionally donate 2 ADA when making a payment, but the choice is yours.",right:!0}),(0,s.jsx)(a.default,{title:"Accessible",content:"Zoofpay is designed for accessibility, making it possible for everyone, including screen reader users, to send ADA with ease.",right:!1}),(0,s.jsx)(a.default,{title:"Increase Adoption",content:"By simplifying transactions, Zoofpay makes Cardano more accessible, supporting its growth and encouraging adoption across a broader audience.",right:!1})]})]})}},function(e){e.O(0,[460,653,154,332,888,774,179],function(){return e(e.s=48312)}),_N_E=e.O()}]);