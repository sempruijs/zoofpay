(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[319],{14593:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/paymentRequest",function(){return n(26289)}])},33775:function(e,t,n){"use strict";n.a(e,async function(e,s){try{n.r(t);var a=n(85893),i=n(24905),l=n(22393),r=e([i]);i=(r.then?(await r)():r)[0],t.default=e=>{let{connected:t,setState:n,next:s,noWallet:r}=e;return(0,a.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"25% 40% 35%",justifyItems:"center",alignItems:"center"},children:[(0,a.jsx)("h1",{className:"big-title",children:"Connect wallet"}),(0,a.jsx)(i.tZ,{}),(0,a.jsxs)("div",{className:"next-previous-container",children:[t&&(0,a.jsx)("button",{className:"next-color big-button",onClick:()=>n(s),children:"Next"}),!t&&(0,a.jsxs)("div",{children:[(0,a.jsx)(l.default,{}),(0,a.jsx)("button",{className:"previous-color big-button",onClick:()=>n(r),children:"Continue without a wallet."})]})]})]})},s()}catch(e){s(e)}})},58959:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{donate:t,setDonate:n}=e;return(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"checkbox",checked:t,onChange:e=>{n(e.target.checked)}}),"Donate 2 ada to zoofpay ❤️"]})}},38781:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{setState:t,showNext:n,previous:a,next:i}=e;return(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"50% 50%",justifyItems:"center",height:"220px"},children:[(0,s.jsx)("button",{disabled:!n,className:n?"big-button next-color":"big-button disabled-color",onClick:()=>t(i),children:"Next"}),(0,s.jsx)("button",{className:"previous-color big-button",onClick:()=>t(a),children:"Previous"})]})}},22393:function(e,t,n){"use strict";n.r(t);var s=n(85893),a=n(41664),i=n.n(a);t.default=()=>(0,s.jsxs)("p",{children:["Don't have a wallet yet?",(0,s.jsx)(i(),{href:"/walletHelp",children:"We can help"})]})},26289:function(e,t,n){"use strict";n.a(e,async function(e,s){try{n.r(t);var a=n(85893),i=n(67294),l=n(24905),r=n(41154),c=n(20842),o=n(63875),d=n(60543),u=n(58959),h=n(38781),x=n(47190),m=n(33775),g=e([l,r,m]);[l,r,m]=g.then?(await g)():g,t.default=e=>{let{to_addres:t,amount_in_lovelace:n}=e,[s,g]=(0,i.useState)(x.i.ConnectWallet),{connected:j,wallet:p}=(0,l.Os)(),[f,v]=(0,i.useState)(!1),[w,y]=(0,i.useState)("");async function b(e,t,n){let s=new r.YW({initiator:p}).sendLovelace("addr1q8ja7ny7rf8ty6gs3d298kyw4cwl8yaets0pg9tm944kjatsu6zkeupreealc2urfwyct3le8se8adqmt0q52fg5653sy0a4dq",t);n&&(s=s.sendLovelace("addr1q9k2dmeh8wuahemw8gq8ezlkhgjkka0h57pxw7sr5k86ds3qs4ejfy2evem83nzms4q6vfmegst93qa395348jqzvrpqwl34yg","2000000"));let a=await s.build(),i=await p.signTx(a),l=await p.submitTx(i);y(l),g(x.i.ThankYou)}return(0,a.jsx)(a.Fragment,{children:(()=>{switch(s){case x.i.ConnectWallet:return(0,a.jsx)(m.default,{connected:j,wallet:p,setState:g,next:x.i.PayNow,noWallet:x.i.QRCode});case x.i.QRCode:return(0,a.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"20% 50% 30%",justifyItems:"center",alignItems:"center"},children:[(0,a.jsx)(o.default,{to_addres:t,amount_in_lovelace:n}),(0,a.jsx)(h.default,{setState:g,next:x.i.ThankYou,previous:x.i.ConnectWallet,showNext:!0})]});case x.i.PayNow:return(0,a.jsxs)("div",{style:{display:"grid",height:"90vh",gridTemplateColumns:"100vw",gridTemplateRows:"15% 40% 45%",justifyItems:"center",alignItems:"center"},children:[(0,a.jsx)("h1",{className:"big-title",children:"You will pay"}),(0,a.jsx)(d.default,{amount_in_lovelace:n}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100vw",gridTemplateRows:"20% 40% 40%",justifyItems:"center",alignItems:"center"},children:[(0,a.jsx)(u.default,{donate:f,setDonate:v}),(0,a.jsx)("button",{className:"next-color big-button",type:"button",onClick:()=>{b(t,n,f)},children:"pay now"}),(0,a.jsx)("button",{className:"previous-color big-button",onClick:()=>g(x.i.ConnectWallet),children:"Previous"})]})]});case x.i.ThankYou:return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(c.default,{txHash:w})});default:return null}})()})},s()}catch(e){s(e)}})},63875:function(e,t,n){"use strict";n.r(t);var s=n(85893),a=n(1653);t.default=e=>{let{to_addres:t,amount_in_lovelace:n}=e,i=(parseInt(n,10)/1e6).toString();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("h1",{className:"big-title",children:["Send ",i," ₳ to:"]}),(0,s.jsxs)("div",{children:[t?(0,s.jsx)(a.ZP,{value:t,size:200}):(0,s.jsx)("p",{children:"Address is not available"}),(0,s.jsx)("button",{onClick:()=>{navigator.clipboard.writeText(t).then(()=>{console.log("link copied.")}).catch(e=>{console.error("Failed to copy: ",e)})},children:"Copy address"})," "]})]})}},20842:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{txHash:t}=e;return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:"center",children:[(0,s.jsx)("h1",{className:"big-title",children:"Thank You!"}),t?(0,s.jsxs)("p",{children:["View transaction on:",(0,s.jsx)("a",{href:"https://cardanoscan.io/transaction/"+t,children:"cardanoscan"})]}):(0,s.jsx)(s.Fragment,{})]})})}},60543:function(e,t,n){"use strict";n.r(t);var s=n(85893);t.default=e=>{let{amount_in_lovelace:t}=e,n=(parseInt(t,10)/1e6).toString();return(0,s.jsx)("div",{children:(0,s.jsxs)("p",{className:"big-title",children:[n," ₳"]})})}},47190:function(e,t,n){"use strict";var s,a;n.d(t,{i:function(){return s}}),(a=s||(s={})).ConnectWallet="ConnectWallet",a.EnterAdaAmount="EnterAdaAmount",a.ShareLink="ShareLink",a.EnterRecieveAddres="EnterRecieveAddres",a.PayNow="PayNow",a.ThankYou="ThankYou",a.QRCode="QRCode"}},function(e){e.O(0,[460,653,154,888,774,179],function(){return e(e.s=14593)}),_N_E=e.O()}]);