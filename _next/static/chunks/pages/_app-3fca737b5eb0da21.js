 ${r}`),"string"==typeof t&&(e=`${e} due to
 For txHex: ${o}`)});this.updateRedeemer(this.meshTxBuilderBody,e),o=this.serializer.serializeTxBody(this.meshTxBuilderBody,this._protocolParams)}return this.txHex=o,o};completeSync=e=>(e?this.meshTxBuilderBody=e:this.queueAllLastItem(),this.addUtxosFromSelection(),this.serializer.serializeTxBody(this.meshTxBuilderBody,this._protocolParams));completeSigning=()=>{let e=this.serializer.addSigningKeys(this.txHex,this.meshTxBuilderBody.signingKey);return this.txHex=e,e};submitTx=async e=>await this.submitter?.submitTx(e);getUTxOInfo=async e=>{let t=[];this.queriedTxHashes.has(e)||(this.queriedTxHashes.add(e),t=await this.fetcher?.fetchUTxOs(e)||[],this.queriedUTxOs[e]=t)};queryAllTxInfo=(e,t)=>{let r=[];if((e.length>0||t.length>0)&&!this.fetcher)throw Error("Transaction information is incomplete while no fetcher instance is provided");for(let t=0;t<e.length;t++){let i=e[t];this.isInputInfoComplete(i)||r.push(this.getUTxOInfo(i.txIn.txHash)),"Script"!==i.type||i.scriptTxIn.scriptSource?.type!=="Inline"||this.isRefScriptInfoComplete(i.scriptTxIn.scriptSource)||r.push(this.getUTxOInfo(i.scriptTxIn.scriptSource.txHash))}for(let e=0;e<t.length;e++){let i=t[e];if("Plutus"===i.type){let e=i.scriptSource;"Inline"!==e.type||this.isRefScriptInfoComplete(e)||r.push(this.getUTxOInfo(e.txHash))}}return Promise.all(r)};completeTxInformation=e=>{if(this.isInputInfoComplete(e)||this.completeInputInfo(e),"Script"===e.type&&!this.isRefScriptInfoComplete(e.scriptTxIn.scriptSource)){let t=e.scriptTxIn.scriptSource;this.completeScriptInfo(t)}};completeInputInfo=e=>{let t=this.queriedUTxOs[e.txIn.txHash],r=t?.find(t=>t.input.outputIndex===e.txIn.txIndex),i=r?.output.amount,a=r?.output.address;if(!i||0===i.length)throw Error(`Couldn't find value information for ${e.txIn.txHash}#${e.txIn.txIndex}`);if(e.txIn.amount=i,"PubKey"===e.type){if(!a||""===a)throw Error(`Couldn't find address information for ${e.txIn.txHash}#${e.txIn.txIndex}`);e.txIn.address=a}};completeScriptInfo=e=>{if(e?.type!="Inline")return;let t=this.queriedUTxOs[e.txHash].find(t=>t.input.outputIndex===e.txIndex);if(!t)throw Error(`Couldn't find script reference utxo for ${e.txHash}#${e.txIndex}`);e.scriptHash=t?.output.scriptHash,e.scriptSize=(t?.output.scriptRef.length/2).toString()};completeSimpleScriptInfo=e=>{if("Inline"!==e.type)return;let t=this.queriedUTxOs[e.txHash].find(t=>t.input.outputIndex===e.txIndex);if(!t)throw Error(`Couldn't find script reference utxo for ${e.txHash}#${e.txIndex}`);e.simpleScriptHash=t?.output.scriptHash};isInputComplete=e=>{if("PubKey"===e.type)return this.isInputInfoComplete(e);if("Script"===e.type){let{scriptSource:t}=e.scriptTxIn;return this.isInputInfoComplete(e)&&this.isRefScriptInfoComplete(t)}return!0};isInputInfoComplete=e=>{let{amount:t,address:r}=e.txIn;return!!t&&!!r};isMintComplete=e=>{if("Plutus"===e.type){let t=e.scriptSource;return this.isRefScriptInfoComplete(t)}if("Native"===e.type){let t=e.scriptSource;if("Inline"===t.type&&!t?.simpleScriptHash)return!1}return!0};isRefScriptInfoComplete=e=>!!(e?.type!=="Inline"||e?.scriptHash&&e?.scriptSize)},h=class{txBuilder;initiator;isCollateralNeeded=!1;constructor(e){this.txBuilder=new f(e),this.initiator=e.initiator}static attachMetadata(e,t){let r=(0,A.zo)(e),i=r.auxiliaryData()??new A.GC.TO;if(i.setMetadata(A.GC.y2.fromCbor(A.QX.HexBlob(t))),A.Pt.computeAuxiliaryDataHash(i.toCore())?.toString()!==r.body().auxiliaryDataHash()?.toString())throw Error("[Transaction] attachMetadata: The metadata hash does not match the auxiliary data hash.");return new A.YW(r.body(),r.witnessSet(),i).toCbor().toString()}static deattachMetadata(e){let t=(0,A.zo)(e);return new A.YW(t.body(),t.witnessSet()).toCbor().toString()}static maskMetadata(e){let t=(0,A.zo)(e),r=t.auxiliaryData()?.metadata();if(void 0!==r){let e=new Map;r.metadata()?.forEach((t,r)=>e.set(r,u(t)));let i=t.auxiliaryData();return r.setMetadata(e),i?.setMetadata(r),new A.YW(t.body(),t.witnessSet(),i).toCbor().toString()}return e}static readMetadata(e){let t=(0,A.zo)(e);return t.auxiliaryData()?.metadata()?.toCbor().toString()??""}static writeMetadata(e,t){let r=(0,A.zo)(e),i=r.auxiliaryData()??new A.GC.TO;return i.setMetadata(A.GC.y2.fromCbor(A.QX.HexBlob(t))),new A.YW(r.body(),r.witnessSet(),i).toCbor().toString()}sendAssets(e,t){return"string"==typeof t&&(t=[{unit:"lovelace",quantity:t}]),"string"==typeof e&&this.txBuilder.txOut(e,t),"object"==typeof e&&(this.txBuilder.txOut(e.address,t),e.datum&&(e.datum.inline?this.txBuilder.txOutInlineDatumValue(e.datum.value):this.txBuilder.txOutDatumHashValue(e.datum.value))),this}sendLovelace(e,t){return this.sendAssets(e,t)}sendToken(e,t,r){let i=[{unit:o.wo[t],quantity:r}];return this.sendAssets(e,i)}sendValue(e,t){let r=t.output.amount;return this.sendAssets(e,r)}setTxInputs(e){return e.forEach(e=>{this.txBuilder.txIn(e.input.txHash,e.input.outputIndex,e.output.amount,e.output.address)}),this}setTxRefInputs(e){return e.forEach(e=>{this.txBuilder.readOnlyTxInReference(e.input.txHash,e.input.outputIndex)}),this}setNativeScriptInput(e,t){let{scriptCbor:r}=this.txBuilder.serializer.deserializer.script.deserializeNativeScript(e);return this.txBuilder.txIn(t.input.txHash,t.input.outputIndex,t.output.amount,t.output.address).txInScript(r),this}redeemValue(e){let{value:t,script:r,datum:i,redeemer:a}=e,n=a||{data:{alternative:0,fields:["mesh"]},budget:o.Vi};if("code"in r&&(this.isCollateralNeeded=!0,this.spendingPlutusScript(r).txIn(t.input.txHash,t.input.outputIndex,t.output.amount,t.output.address).txInScript(r.code).txInRedeemerValue(n.data,"Mesh",n.budget)),"output"in r){if(!r.output.scriptRef)throw Error("redeemValue: No script reference found in UTxO");let e=(0,A.rm)(r.output.scriptRef);if(!e||!("code"in e))throw Error("redeemValue: Script reference not found");this.isCollateralNeeded=!0,this.spendingPlutusScript(e).txIn(t.input.txHash,t.input.outputIndex,t.output.amount,t.output.address).spendingTxInReference(r.input.txHash,r.input.outputIndex,(r.output.scriptRef.length/2).toString(),r.output.scriptHash).txInRedeemerValue(n.data,"Mesh",n.budget)}return i?this.txBuilder.txInDatumValue(i):this.txBuilder.txInInlineDatumPresent(),this}mintAsset(e,t,r){let i=t.assetQuantity,a=(0,o.zm)(t.assetName),n=(0,o.bR)(a);t.cip68ScriptAddress&&(a=(0,o.wX)(a));let s="";switch(typeof e){case"string":s=(0,A.$w)(e).hash().toString(),this.txBuilder.mint(i,s,a).mintingScript(e),t.cip68ScriptAddress&&this.txBuilder.mint(i,s,n).mintingScript(e);break;case"object":if(!r)throw Error("burnAsset: Redeemer data is required for Plutus minting");if("code"in e){s=(0,A.rt)(e.code,e.version).hash().toString(),this.isCollateralNeeded=!0,this.mintPlutusScript(e).mint(i,s,a).mintingScript(e.code).mintRedeemerValue(r.data,"Mesh",r.budget),t.cip68ScriptAddress&&this.mintPlutusScript(e).mint(i,s,n).mintingScript(e.code).mintRedeemerValue(r.data,"Mesh",r.budget);break}if("output"in e){if(!e.output.scriptRef)throw Error("mintAsset: No script reference found in UTxO");let o=(0,A.rm)(e.output.scriptRef);if(!o)throw Error("mintAsset: Script reference not found");if("code"in o)s=(0,A.rt)(o.code,o.version).hash().toString(),this.isCollateralNeeded=!0,this.mintPlutusScript(o).mint(i,s,a).mintTxInReference(e.input.txHash,e.input.outputIndex,(e.output.scriptRef.length/2).toString(),e.output.scriptHash).mintRedeemerValue(r.data,"Mesh",r.budget),t.cip68ScriptAddress&&this.mintPlutusScript(o).mint(i,s,n).mintTxInReference(e.input.txHash,e.input.outputIndex,(e.output.scriptRef.length/2).toString(),e.output.scriptHash).mintRedeemerValue(r.data,"Mesh",r.budget);else throw Error("mintAsset: Reference script minting not implemented")}}return t.recipient&&this.sendAssets(t.recipient,[{unit:s+a,quantity:t.assetQuantity}]),t.cip68ScriptAddress&&this.sendAssets({address:t.cip68ScriptAddress,datum:{inline:!0,value:(0,o.bb)(t.metadata)}},[{unit:s+n,quantity:t.assetQuantity}]),!t.cip68ScriptAddress&&t.metadata&&t.label&&("721"===t.label||"20"===t.label?this.setMetadata(Number(t.label),{[s]:{[t.assetName]:t.metadata}}):this.setMetadata(Number(t.label),t.metadata)),this}burnAsset(e,t,r){let i="-"+t.quantity,a={assetName:(0,o.rR)(t.unit.slice(o.Ot)),assetQuantity:i};try{this.mintAsset(e,a,r)}catch(e){throw Error("burnAsset: "+e)}return this}setChangeAddress(e){return this.txBuilder.changeAddress(e),this}setCollateral(e){return e.forEach(e=>{this.txBuilder.txInCollateral(e.input.txHash,e.input.outputIndex,e.output.amount,e.output.address)}),this}setNetwork=e=>(this.txBuilder.setNetwork(e),this);setRequiredSigners(e){return e.forEach(e=>{let{pubKeyHash:t}=this.txBuilder.serializer.deserializer.key.deserializeAddress(e);this.txBuilder.requiredSignerHash(t)}),this}setTimeToExpire(e){return this.txBuilder.invalidHereafter(Number(e)),this}setTimeToStart(e){return this.txBuilder.invalidBefore(Number(e)),this}setMetadata(e,t){return this.txBuilder.metadataValue(e.toString(),t),this}withdrawRewards(e,t){return this.txBuilder.withdrawal(e,t),this}delegateStake(e,t){return this.txBuilder.delegateStakeCertificate(e,this.txBuilder.serializer.resolver.keys.resolveEd25519KeyHash(t)),this}deregisterStake(e){return this.txBuilder.deregisterStakeCertificate(e),this}registerStake(e){return this.txBuilder.registerStakeCertificate(e),this}registerPool(e){return this.txBuilder.registerPoolCertificate(e),this}retirePool(e,t){return this.txBuilder.retirePoolCertificate(e,t),this}async build(){try{return await this.addCollateralIfNeeded(),await this.addTxInputsAsNeeded(),await this.addChangeAddress(),this.txBuilder.complete()}catch(e){throw Error(`[Transaction] An error occurred during build: ${e}.`)}}mintPlutusScript(e){switch(e.version){case"V1":this.txBuilder.mintPlutusScriptV1();break;case"V2":this.txBuilder.mintPlutusScriptV2();break;case"V3":this.txBuilder.mintPlutusScriptV3()}return this.txBuilder}spendingPlutusScript(e){switch(e.version){case"V1":this.txBuilder.spendingPlutusScriptV1();break;case"V2":this.txBuilder.spendingPlutusScriptV2();break;case"V3":this.txBuilder.spendingPlutusScriptV3()}return this.txBuilder}async addCollateralIfNeeded(){if(this.isCollateralNeeded){let e=await this.initiator.getCollateral();if(e.length>0){this.setCollateral(e);return}let t=(await this.initiator.getUtxos()).filter(e=>1===e.output.amount.length);for(let e of(t.sort((e,t)=>Number(e.output.amount[0]?.quantity)-Number(e.output.amount[0]?.quantity)),t))if(Number(e.output.amount[0]?.quantity)>=5e6)return[e];if(0===t.length)throw Error("No pure lovelace utxos found for collateral");this.setCollateral([t[0]])}}async addTxInputsAsNeeded(){if(0===this.txBuilder.meshTxBuilderBody.extraInputs.length){let e=await this.initiator.getUtxos();this.txBuilder.selectUtxosFrom(e)}}async addChangeAddress(){if(""===this.txBuilder.meshTxBuilderBody.changeAddress){let e=await this.initiator.getChangeAddress();this.setChangeAddress(e)}}};function u(e){switch(e.getKind()){case A.GC.jU.Text:return A.GC.T0.newText("0".repeat(e.asText()?.length??0));case A.GC.jU.Bytes:case A.GC.jU.Integer:return e;case A.GC.jU.List:let t=new A.GC.M_;for(let r=0;r<(e.asList()?.getLength()??0);r++)t.add(u(e.asList()?.get(r)));return A.GC.T0.newList(t);case A.GC.jU.Map:let r=new A.GC.k$;for(let t=0;t<(e.asMap()?.getLength()??0);t++){let i=e.asMap()?.getKeys().get(t),a=e.asMap()?.get(i);r.insert(i,u(a))}return A.GC.T0.newMap(r);default:throw Error(`Unsupported metadatum kind: ${e.getKind()}`)}}i()}catch(e){i(e)}})},44353:function(e,t,r){"use strict";r.a(e,async function(e,i){try{r.d(t,{DG:function(){return C}});var a=r(41952),n=r(33317),o=r(75345),A=r(77964),s=r(59270),c=r(14319);r(48764).Buffer;var f=e([o,c]);function h(...e){let t=e=>e,r=(e,t)=>r=>e(t(r)),i=e.map(e=>e.encode).reduceRight(r,t),a=e.map(e=>e.decode).reduce(r,t);return{encode:i,decode:a}}function u(e){return{encode:t=>{if(!Array.isArray(t)||t.length&&"number"!=typeof t[0])throw Error("alphabet.encode input should be an array of numbers");return t.map(t=>{if(t<0||t>=e.length)throw Error(`Digit index outside alphabet: ${t} (alphabet: ${e.length})`);return e[t]})},decode:t=>{if(!Array.isArray(t)||t.length&&"string"!=typeof t[0])throw Error("alphabet.decode input should be array of strings");return t.map(t=>{if("string"!=typeof t)throw Error(`alphabet.decode: not string element=${t}`);let r=e.indexOf(t);if(-1===r)throw Error(`Unknown letter: "${t}". Allowed: ${e}`);return r})}}}function g(e=""){if("string"!=typeof e)throw Error("join separator should be string");return{encode:t=>{if(!Array.isArray(t)||t.length&&"string"!=typeof t[0])throw Error("join.encode input should be array of strings");for(let e of t)if("string"!=typeof e)throw Error(`join.encode: non-string input=${e}`);return t.join(e)},decode:t=>{if("string"!=typeof t)throw Error("join.decode input should be string");return t.split(e)}}}[o,c]=f.then?(await f)():f;var l=(e,t)=>t?l(t,e%t):e,d=(e,t)=>e+(t-l(e,t)),p=[996825010,642813549,513874426,1027748829,705979059],I={id:"nufiSnap",name:"MetaMask",icon:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjkuMiAxNjMuNzEiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6ICNlMjc2MjU7CiAgICAgIH0KCiAgICAgIC5jbHMtMSwgLmNscy0yLCAuY2xzLTMsIC5jbHMtNCwgLmNscy01LCAuY2xzLTYsIC5jbHMtNywgLmNscy04LCAuY2xzLTkgewogICAgICAgIHN0cm9rZS13aWR0aDogMHB4OwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6ICM3NjNlMWE7CiAgICAgIH0KCiAgICAgIC5jbHMtMyB7CiAgICAgICAgZmlsbDogI2MwYWQ5ZTsKICAgICAgfQoKICAgICAgLmNscy00IHsKICAgICAgICBmaWxsOiAjMzQ2OGQxOwogICAgICB9CgogICAgICAuY2xzLTUgewogICAgICAgIGZpbGw6ICNjYzYyMjg7CiAgICAgIH0KCiAgICAgIC5jbHMtNiB7CiAgICAgICAgZmlsbDogI2Y1ODQxZjsKICAgICAgfQoKICAgICAgLmNscy03IHsKICAgICAgICBmaWxsOiAjZDdjMWIzOwogICAgICB9CgogICAgICAuY2xzLTggewogICAgICAgIGZpbGw6ICNmZmY7CiAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkOwogICAgICB9CgogICAgICAuY2xzLTkgewogICAgICAgIGZpbGw6ICMyZjM0M2I7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+CiAgICA8ZyBpZD0iTU1fSGVhZF9iYWNrZ3JvdW5kX0RvX25vdF9lZGl0XyIgZGF0YS1uYW1lPSJNTSBIZWFkIGJhY2tncm91bmQgKERvIG5vdCBlZGl0KSI+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtNiIgZD0iTTE0MS44LDcwLjVsNi45LTguMS0zLTIuMiw0LjgtNC40LTMuNy0yLjgsNC44LTMuNi0zLjEtMi40LDUtMjQuNC03LjYtMjIuNk0xNDUuOSwwbC00OC44LDE4LjFoLTQwLjdMNy42LDBsLjMuMkw3LjYsMCwwLDIyLjZsNS4xLDI0LjQtMy4yLDIuNCw0LjksMy42LTMuNywyLjgsNC44LDQuNC0zLDIuMiw2LjksOC4xTDEuMywxMDIuOWgwbDkuNywzMy4xLDM0LjEtOS40di0uMS4xaDBsNi42LDUuNCwxMy41LDkuMmgyMy4xbDEzLjUtOS4yLDYuNi01LjRoMGwzNC4yLDkuNCw5LjgtMzMuMWgwbC0xMC42LTMyLjQiLz4KICAgIDwvZz4KICAgIDxnIGlkPSJMb2dvcyI+CiAgICAgIDxnPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxNDUuOSAwIDg2IDQ0LjEgOTcuMSAxOC4xIDE0NS45IDAiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iNy42IDAgNjcgNDQuNSA1Ni40IDE4LjEgNy42IDAiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMTI0LjQgMTAyLjMgMTA4LjQgMTI2LjUgMTQyLjYgMTM1LjkgMTUyLjQgMTAyLjggMTI0LjQgMTAyLjMiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMS4zIDEwMi44IDExIDEzNS45IDQ1LjEgMTI2LjUgMjkuMiAxMDIuMyAxLjMgMTAyLjgiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iNDMuMyA2MS4zIDMzLjggNzUuNiA2Ny42IDc3LjEgNjYuNSA0MC45IDQzLjMgNjEuMyIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxMTAuMyA2MS4zIDg2LjcgNDAuNSA4NiA3Ny4xIDExOS44IDc1LjYgMTEwLjMgNjEuMyIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSI0NS4xIDEyNi41IDY1LjYgMTE2LjcgNDcuOSAxMDMuMSA0NS4xIDEyNi41Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9Ijg4IDExNi43IDEwOC40IDEyNi41IDEwNS42IDEwMy4xIDg4IDExNi43Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy03IiBwb2ludHM9IjEwOC40IDEyNi41IDg4IDExNi43IDg5LjcgMTI5LjkgODkuNSAxMzUuNSAxMDguNCAxMjYuNSIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNyIgcG9pbnRzPSI0NS4xIDEyNi41IDY0LjEgMTM1LjUgNjQgMTI5LjkgNjUuNiAxMTYuNyA0NS4xIDEyNi41Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy05IiBwb2ludHM9IjY0LjQgOTQuMyA0Ny41IDg5LjQgNTkuNSA4My45IDY0LjQgOTQuMyIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtOSIgcG9pbnRzPSI4OS4xIDk0LjMgOTQuMSA4My45IDEwNi4xIDg5LjQgODkuMSA5NC4zIi8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjQ1LjEgMTI2LjUgNDguMSAxMDIuMyAyOS4yIDEwMi44IDQ1LjEgMTI2LjUiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTUiIHBvaW50cz0iMTA1LjUgMTAyLjMgMTA4LjQgMTI2LjUgMTI0LjQgMTAyLjggMTA1LjUgMTAyLjMiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTUiIHBvaW50cz0iMTE5LjggNzUuNiA4NiA3Ny4xIDg5LjEgOTQuMyA5NC4xIDgzLjkgMTA2LjEgODkuNCAxMTkuOCA3NS42Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjQ3LjUgODkuNCA1OS41IDgzLjkgNjQuNCA5NC4zIDY3LjYgNzcuMSAzMy44IDc1LjYgNDcuNSA4OS40Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjMzLjggNzUuNiA0Ny45IDEwMy4xIDQ3LjUgODkuNCAzMy44IDc1LjYiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMTA2LjEgODkuNCAxMDUuNiAxMDMuMSAxMTkuOCA3NS42IDEwNi4xIDg5LjQiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iNjcuNiA3Ny4xIDY0LjQgOTQuMyA2OC40IDExNC43IDY5LjMgODcuOSA2Ny42IDc3LjEiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iODYgNzcuMSA4NC4zIDg3LjggODUuMSAxMTQuNyA4OS4xIDk0LjMgODYgNzcuMSIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSI4OS4xIDk0LjMgODUuMSAxMTQuNyA4OCAxMTYuNyAxMDUuNiAxMDMuMSAxMDYuMSA4OS40IDg5LjEgOTQuMyIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSI0Ny41IDg5LjQgNDcuOSAxMDMuMSA2NS42IDExNi43IDY4LjQgMTE0LjcgNjQuNCA5NC4zIDQ3LjUgODkuNCIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMyIgcG9pbnRzPSI4OS41IDEzNS41IDg5LjcgMTI5LjkgODguMSAxMjguNiA2NS40IDEyOC42IDY0IDEyOS45IDY0LjEgMTM1LjUgNDUuMSAxMjYuNSA1MS43IDEzMS45IDY1LjIgMTQxLjIgODguMyAxNDEuMiAxMDEuOCAxMzEuOSAxMDguNCAxMjYuNSA4OS41IDEzNS41Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy05IiBwb2ludHM9Ijg4IDExNi43IDg1LjEgMTE0LjcgNjguNCAxMTQuNyA2NS42IDExNi43IDY0IDEyOS45IDY1LjQgMTI4LjYgODguMSAxMjguNiA4OS43IDEyOS45IDg4IDExNi43Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjE0OC41IDQ3IDE1My41IDIyLjYgMTQ1LjkgMCA4OCA0Mi42IDExMC4zIDYxLjMgMTQxLjggNzAuNSAxNDguNyA2Mi40IDE0NS43IDYwLjIgMTUwLjUgNTUuOSAxNDYuOCA1MyAxNTEuNiA0OS40IDE0OC41IDQ3Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjAgMjIuNiA1LjEgNDcgMS45IDQ5LjQgNi43IDUzLjEgMyA1NS45IDcuOCA2MC4yIDQuOCA2Mi40IDExLjggNzAuNSA0My4zIDYxLjMgNjUuNiA0Mi42IDcuNiAwIDAgMjIuNiIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtNiIgcG9pbnRzPSIxNDEuOCA3MC41IDExMC4zIDYxLjMgMTE5LjggNzUuNiAxMDUuNiAxMDMuMSAxMjQuNCAxMDIuOCAxNTIuNCAxMDIuOCAxNDEuOCA3MC41Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy02IiBwb2ludHM9IjQzLjMgNjEuMyAxMS44IDcwLjUgMS4zIDEwMi44IDI5LjIgMTAyLjggNDcuOSAxMDMuMSAzMy44IDc1LjYgNDMuMyA2MS4zIi8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy02IiBwb2ludHM9Ijg2IDc3LjEgODggNDIuNiA5Ny4xIDE4LjEgNTYuNCAxOC4xIDY1LjYgNDIuNiA2Ny42IDc3LjEgNjguNCA4Ny45IDY4LjQgMTE0LjcgODUuMSAxMTQuNyA4NS4yIDg3LjkgODYgNzcuMSIvPgogICAgICA8L2c+CiAgICA8L2c+CiAgICA8ZyBpZD0iY2FyZGFub19hZGEiIGRhdGEtbmFtZT0iY2FyZGFubyBhZGEiPgogICAgICA8ZyBpZD0iY2FyZGFub19hZGEtMiIgZGF0YS1uYW1lPSJjYXJkYW5vIGFkYS0yIj4KICAgICAgICA8Y2lyY2xlIGlkPSJf0K3Qu9C70LjQv9GBXzYiIGRhdGEtbmFtZT0i0K3Qu9C70LjQv9GBIDYiIGNsYXNzPSJjbHMtNCIgY3g9IjEyOC4wNSIgY3k9IjEyMi41NiIgcj0iNDEuMTUiLz4KICAgICAgICA8cGF0aCBpZD0iX9Ct0LvQu9C40L/RgV82X9C60L7Qv9C40Y9fMjkiIGRhdGEtbmFtZT0i0K3Qu9C70LjQv9GBIDYg0LrQvtC/0LjRjyAyOSIgY2xhc3M9ImNscy04IiBkPSJNMTIzLjQ2LDEwOS45M2MyLjI1LDAsNC4wNywxLjgyLDQuMDcsNC4wNywwLDIuMjUtMS44Miw0LjA3LTQuMDcsNC4wNy0yLjI1LDAtNC4wNy0xLjgyLTQuMDctNC4wNywwLTIuMjUsMS44Mi00LjA3LDQuMDctNC4wN1pNMTMzLjI4LDEwOS45M2MyLjI1LDAsNC4wNywxLjgyLDQuMDcsNC4wNywwLDIuMjUtMS44Miw0LjA3LTQuMDcsNC4wNy0yLjI1LDAtNC4wNy0xLjgyLTQuMDctNC4wNywwLTIuMjUsMS44Mi00LjA3LDQuMDctNC4wN2gwWk0xMzMuMjgsMTI3LjA1YzIuMjUsMCw0LjA3LDEuODIsNC4wNyw0LjA3LDAsMi4yNS0xLjgyLDQuMDctNC4wNyw0LjA3LTIuMjUsMC00LjA3LTEuODItNC4wNy00LjA3LDAtMi4yNSwxLjgyLTQuMDcsNC4wNy00LjA3aDAsMFpNMTIzLjQ2LDEyNy4wNWMyLjI1LDAsNC4wNywxLjgyLDQuMDcsNC4wNywwLDIuMjUtMS44Miw0LjA3LTQuMDcsNC4wNy0yLjI1LDAtNC4wNy0xLjgyLTQuMDctNC4wNywwLTIuMjUsMS44Mi00LjA3LDQuMDctNC4wN1pNMTE4LjQxLDExOC42M2MyLjI1LDAsNC4wNywxLjgyLDQuMDcsNC4wNywwLDIuMjUtMS44Miw0LjA3LTQuMDcsNC4wNy0yLjI1LDAtNC4wNy0xLjgyLTQuMDctNC4wNywwLTIuMjUsMS44Mi00LjA3LDQuMDctNC4wN2gwWk0xMzguMzMsMTE4LjYzYzIuMjUsMCw0LjA3LDEuODIsNC4wNyw0LjA3LDAsMi4yNS0xLjgyLDQuMDctNC4wNyw0LjA3LTIuMjUsMC00LjA3LTEuODItNC4wNy00LjA3LDAtMi4yNSwxLjgyLTQuMDcsNC4wNy00LjA3aDBaTTE0Mi45NiwxMTEuNjJjMS4zOSwwLDIuNTIsMS4xMywyLjUyLDIuNTMsMCwxLjM5LTEuMTMsMi41Mi0yLjUzLDIuNTItMS4zOSwwLTIuNTItMS4xMy0yLjUyLTIuNTJzMS4xMy0yLjUyLDIuNTItMi41MmgwWk0xNDIuOTYsMTI4LjQ1YzEuMzksMCwyLjUyLDEuMTMsMi41MiwyLjUzLDAsMS4zOS0xLjEzLDIuNTItMi41MywyLjUyLTEuMzksMC0yLjUyLTEuMTMtMi41Mi0yLjUyczEuMTMtMi41MiwyLjUyLTIuNTJoMFpNMTEzLjc4LDEyOC40NWMxLjM5LDAsMi41MiwxLjEzLDIuNTIsMi41MywwLDEuMzktMS4xMywyLjUyLTIuNTMsMi41Mi0xLjM5LDAtMi41Mi0xLjEzLTIuNTItMi41MiwwLTEuMzksMS4xMy0yLjUyLDIuNTMtMi41MmgwWk0xMTMuNzgsMTExLjYyYzEuMzksMCwyLjUyLDEuMTMsMi41MiwyLjUzLDAsMS4zOS0xLjEzLDIuNTItMi41MywyLjUyLTEuMzksMC0yLjUyLTEuMTMtMi41Mi0yLjUyLDAtMS4zOSwxLjEzLTIuNTIsMi41My0yLjUyaDBaTTEyOC4zNywxMDMuMmMxLjM5LDAsMi41MiwxLjEzLDIuNTIsMi41MywwLDEuMzktMS4xMywyLjUyLTIuNTMsMi41Mi0xLjM5LDAtMi41Mi0xLjEzLTIuNTItMi41MnMxLjEzLTIuNTIsMi41Mi0yLjUyaDBaTTEyOC4zNywxMzYuODZjMS4zOSwwLDIuNTIsMS4xMywyLjUyLDIuNTMsMCwxLjM5LTEuMTMsMi41Mi0yLjUzLDIuNTItMS4zOSwwLTIuNTItMS4xMy0yLjUyLTIuNTJzMS4xMy0yLjUyLDIuNTItMi41MmgwWk0xMzkuMTcsMTM5LjM5YzEuMTYsMCwyLjEuOTQsMi4xLDIuMSwwLDEuMTYtLjk0LDIuMS0yLjEsMi4xLTEuMTYsMC0yLjEtLjk0LTIuMS0yLjFzLjk0LTIuMSwyLjEtMi4xaDBaTTExNy41NywxMzkuMzljMS4xNiwwLDIuMS45NCwyLjEsMi4xLDAsMS4xNi0uOTQsMi4xLTIuMSwyLjEtMS4xNiwwLTIuMS0uOTQtMi4xLTIuMXMuOTQtMi4xLDIuMS0yLjFoMFpNMTE3LjU3LDEwMS41MmMxLjE2LDAsMi4xLjk0LDIuMSwyLjEsMCwxLjE2LS45NCwyLjEtMi4xLDIuMS0xLjE2LDAtMi4xLS45NC0yLjEtMi4xcy45NC0yLjEsMi4xLTIuMWgwWk0xMzkuMTcsMTAxLjUyYzEuMTYsMCwyLjEuOTQsMi4xLDIuMSwwLDEuMTYtLjk0LDIuMS0yLjEsMi4xLTEuMTYsMC0yLjEtLjk0LTIuMS0yLjFzLjk0LTIuMSwyLjEtMi4xaDBaTTE1MC4xMSwxMjAuMzFjMS4xNiwwLDIuMS45NCwyLjEsMi4xLDAsMS4xNi0uOTQsMi4xLTIuMSwyLjEtMS4xNiwwLTIuMS0uOTQtMi4xLTIuMSwwLTEuMTYuOTQtMi4xLDIuMS0yLjFoMFpNMTA2LjYyLDEyMC4zMWMxLjE2LDAsMi4xLjk0LDIuMSwyLjEsMCwxLjE2LS45NCwyLjEtMi4xLDIuMS0xLjE2LDAtMi4xLS45NC0yLjEtMi4xcy45NC0yLjEsMi4xLTIuMWgwWk0xMDUuMDgsMTA3LjQxYy45MywwLDEuNjguNzUsMS42OCwxLjY4cy0uNzUsMS42OC0xLjY4LDEuNjgtMS42OC0uNzUtMS42OC0xLjY4aDBjMC0uOTMuNzUtMS42OCwxLjY4LTEuNjhoMFpNMTA1LjA4LDEzNC4zNGMuOTMsMCwxLjY4Ljc1LDEuNjgsMS42OHMtLjc1LDEuNjgtMS42OCwxLjY4LTEuNjgtLjc1LTEuNjgtMS42OGgwYzAtLjkzLjc1LTEuNjgsMS42OC0xLjY4aDBaTTE1MS42NiwxMzQuMzRjLjkzLDAsMS42OC43NSwxLjY4LDEuNjgsMCwuOTMtLjc1LDEuNjgtMS42OCwxLjY4cy0xLjY4LS43NS0xLjY4LTEuNjhoMGMwLS45My43NS0xLjY4LDEuNjgtMS42OGgwWk0xNTEuNjYsMTA3LjQxYy45MywwLDEuNjguNzUsMS42OCwxLjY4LDAsLjkzLS43NSwxLjY4LTEuNjgsMS42OHMtMS42OC0uNzUtMS42OC0xLjY4aDBjMC0uOTMuNzUtMS42OCwxLjY4LTEuNjhoMFpNMTI4LjM3LDkzLjk0Yy45MywwLDEuNjguNzUsMS42OCwxLjY4LDAsLjkzLS43NSwxLjY4LTEuNjgsMS42OC0uOTMsMC0xLjY4LS43NS0xLjY4LTEuNjhoMGMwLS45My43NS0xLjY4LDEuNjgtMS42OGgwWk0xMjguMzcsMTQ3LjhjLjkzLDAsMS42OC43NSwxLjY4LDEuNjgsMCwuOTMtLjc1LDEuNjgtMS42OCwxLjY4LS45MywwLTEuNjgtLjc1LTEuNjgtMS42OHMuNzUtMS42OCwxLjY4LTEuNjhoMFpNMTQzLjI0LDE0Ni42OGMuNzcsMCwxLjQuNjMsMS40LDEuNCwwLC43Ny0uNjMsMS40LTEuNCwxLjRzLTEuNC0uNjMtMS40LTEuNGgwYzAtLjc3LjYzLTEuNCwxLjQtMS40Wk0xMTMuNSwxNDYuNjhjLjc3LDAsMS40LjYzLDEuNCwxLjRzLS42MywxLjQtMS40LDEuNC0xLjQtLjYzLTEuNC0xLjRoMGMwLS43Ny42My0xLjQsMS40LTEuNFpNMTEzLjUsOTUuNjNjLjc3LDAsMS40LjYzLDEuNCwxLjRzLS42MywxLjQtMS40LDEuNC0xLjQtLjYzLTEuNC0xLjRoMGMwLS43Ny42My0xLjQsMS40LTEuNGgwWk0xNDMuMjQsOTUuNjNjLjc3LDAsMS40LjYzLDEuNCwxLjQsMCwuNzctLjYzLDEuNC0xLjQsMS40cy0xLjQtLjYzLTEuNC0xLjRoMGMwLS43Ny42My0xLjQsMS40LTEuNGgwWk0xNTcuODMsMTIxLjE2Yy43NywwLDEuNC42MywxLjQsMS40LDAsLjc3LS42MywxLjQtMS40LDEuNHMtMS40LS42My0xLjQtMS40aDBjMC0uNzguNjMtMS40LDEuNC0xLjRoMFpNOTguOTEsMTIxLjE2Yy43NywwLDEuNC42MywxLjQsMS40cy0uNjMsMS40LTEuNCwxLjQtMS40LS42My0xLjQtMS40aDBjMC0uNzguNjMtMS40LDEuNC0xLjRoMFoiLz4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9zdmc+",version:"version"},_={production:"https://wallet.nu.fi",mainnet:"https://wallet-staging.nu.fi",preprod:"https://wallet-testnet-staging.nu.fi",preview:"https://wallet-preview-staging.nu.fi"};async function y(e="preprod"){try{let t=s.default;if(Object.keys(_).includes(e)?t.init(_[e]):t.init(e),window.ethereum._metamask)return(0,A.initNufiDappCardanoSdk)(t,"snap"),I;return}catch(e){return Promise.resolve(void 0)}}var C=class e{constructor(e,t){this._walletInstance=e,this._walletName=t,this.walletInstance={...e}}walletInstance;static async getAvailableWallets({metamask:t}={}){return void 0===window?[]:(t&&await y(t.network),e.getInstalledWallets())}static getInstalledWallets(){if(void 0===window||void 0===window.cardano)return[];let e=[];for(let t in window.cardano)try{let r=window.cardano[t];if(void 0===r||void 0===r.name||void 0===r.icon||void 0===r.apiVersion)continue;e.push({id:t,name:"nufiSnap"==t?"MetaMask":r.name,icon:r.icon,version:r.apiVersion})}catch(e){}return e}static async enable(t,r=[]){try{let i=await e.resolveInstance(t,r);if(void 0!==i)return new e(i,t);throw Error(`Couldn't create an instance of wallet: ${t}`)}catch(e){throw Error(`[BrowserWallet] An error occurred during enable: ${JSON.stringify(e)}.`)}}async getBalance(){let e=await this._walletInstance.getBalance();return(0,a._A)((0,a.fI)(e))}async getChangeAddress(){let e=await this._walletInstance.getChangeAddress();return(0,a.Xj)((0,a.BR)(e))}async getCollateral(){return(await this.getCollateralUnspentOutput()).map(e=>(0,a.ye)(e))}async getExtensions(){try{return(await this._walletInstance.getExtensions()).map(e=>e.cip)}catch(e){return[]}}getNetworkId(){return this._walletInstance.getNetworkId()}async getRewardAddresses(){return(await this._walletInstance.getRewardAddresses()).map(e=>(0,a.Xj)((0,a.BR)(e)))}async getUnusedAddresses(){return(await this._walletInstance.getUnusedAddresses()).map(e=>(0,a.Xj)((0,a.BR)(e)))}async getUsedAddresses(){return(await this._walletInstance.getUsedAddresses()).map(e=>(0,a.Xj)((0,a.BR)(e)))}async getUtxos(){return(await this.getUsedUTxOs()).map(e=>(0,a.ye)(e))}async signData(e,t){if(void 0===t&&(t=(await this.getUsedAddresses())[0]),t.startsWith("drep1"))return this._walletInstance.cip95.signData(t,(0,n.W_)(e));let r=(0,a.Hc)(t).toBytes().toString();return this._walletInstance.signData(r,(0,n.W_)(e))}async signTx(t,r=!1){let i=await this._walletInstance.signTx(t,r);return""===i?t:e.addBrowserWitnesses(t,i)}async signTxs(t,r=!1){let i;if("Typhon Wallet"===this._walletName?this._walletInstance.signTxs&&(i=await this._walletInstance.signTxs(t,r)):this._walletInstance.signTxs?i=await this._walletInstance.signTxs(t.map(e=>({cbor:e,partialSign:r}))):this._walletInstance.experimental.signTxs&&(i=await this._walletInstance.experimental.signTxs(t.map(e=>({cbor:e,partialSign:r})))),!i)throw Error("Wallet does not support signTxs");let a=[];for(let r=0;r<i.length;r++){let n=t[r],o=i[r];if(""===o)a.push(n);else{let t=e.addBrowserWitnesses(n,o);a.push(t)}}return a}submitTx(e){return this._walletInstance.submitTx(e)}async getUsedAddress(){let e=await this._walletInstance.getUsedAddresses();if(0===e.length)throw Error("No used addresses found");return(0,a.BR)(e[0])}async getCollateralUnspentOutput(e=n.FW.maxCollateralInputs){let t=[];try{t=await this._walletInstance.getCollateral()??[]}catch(e){try{t=await this._walletInstance.experimental.getCollateral()??[]}catch(e){console.error(e)}}return t.map(e=>(0,a.MO)(e)).slice(0,e)}async getUsedUTxOs(){return(await this._walletInstance.getUtxos()??[]).map(e=>(0,a.MO)(e))}async getAssets(){return(await this.getBalance()).filter(e=>"lovelace"!==e.unit).map(e=>{let t=e.unit.slice(0,n.Ot),r=e.unit.slice(n.Ot),i=(0,n.vi)(t,r);return{unit:e.unit,policyId:t,assetName:r,fingerprint:i,quantity:e.quantity}})}async getLovelace(){let e=(await this.getBalance()).find(e=>"lovelace"===e.unit);return void 0!==e?e.quantity:"0"}async getPolicyIdAssets(e){return(await this.getAssets()).filter(t=>t.policyId===e)}async getPolicyIds(){let e=await this.getBalance();return Array.from(new Set(e.map(e=>e.unit.slice(0,n.Ot)))).filter(e=>"lovelace"!==e)}async getDRep(){try{if(void 0===this._walletInstance.cip95)return;let t=await this._walletInstance.cip95.getPubDRepKey(),{dRepIDHash:r}=await e.dRepKeyToDRepID(t),i=o.oy.nhX.from_hex(t).hash().to_bech32("drep");return{publicKey:t,publicKeyHash:r,dRepIDCip105:i}}catch(e){console.error(e);return}}async getPubDRepKey(){try{if(void 0===this._walletInstance.cip95)return;let t=await this._walletInstance.cip95.getPubDRepKey(),{dRepIDHash:r}=await e.dRepKeyToDRepID(t),i=o.oy.nhX.from_hex(t).hash().to_bech32("drep");return{pubDRepKey:t,dRepIDHash:r,dRepIDBech32:i}}catch(e){console.error(e);return}}async getRegisteredPubStakeKeys(){try{if(void 0===this._walletInstance.cip95)return;let t=await this._walletInstance.cip95.getRegisteredPubStakeKeys(),r=await Promise.all(t.map(async t=>{let{dRepIDHash:r}=await e.dRepKeyToDRepID(t);return r}));return{pubStakeKeys:t,pubStakeKeyHashes:r}}catch(e){console.error(e);return}}async getUnregisteredPubStakeKeys(){try{if(void 0===this._walletInstance.cip95)return;let t=await this._walletInstance.cip95.getUnregisteredPubStakeKeys(),r=await Promise.all(t.map(async t=>{let{dRepIDHash:r}=await e.dRepKeyToDRepID(t);return r}));return{pubStakeKeys:t,pubStakeKeyHashes:r}}catch(e){console.error(e);return}}static async dRepKeyToDRepID(e){let t=(0,a._K)(e),r=a.EZ.fromHex(t),i=(await r.hash()).hex();return{dRepKeyHex:t,dRepID:r,dRepIDHash:i}}static resolveInstance(e,t=[]){if(void 0===window.cardano||void 0===window.cardano[e])return;let r=window.cardano[e];if(!(t.length>0))return r?.enable();{let e=t.map(e=>({cip:e}));return r.enable({extensions:e})}}static addBrowserWitnesses(e,t){let r=a.GC.Xg.fromCbor(a.QX.HexBlob(t)).vkeys()?.values();if(void 0===r)return e;let i=(0,a.zo)(e),n=i.witnessSet(),o=n.vkeys(),A=o?[...o.values(),...r]:[...r];return n.setVkeys(a.GC.A0.fromCore(A.map(e=>e.toCore()),a.I1.fromCore)),new a.YW(i.body(),n,i.auxiliaryData()).toCbor()}static getSupportedExtensions(e){return window?.cardano?.[e]?.supportedExtensions||[]}};i()}catch(e){i(e)}})},51317:function(e,t,r){"use strict";r.a(e,async function(e,i){try{r.d(t,{$xJ:function(){return n.$xJ},$zK:function(){return n.$zK},B9l:function(){return n.B9l},BSq:function(){return n.BSq},Cj9:function(){return n.Cj9},EQY:function(){return n.EQY},Emq:function(){return n.Emq},EuU:function(){return n.EuU},FRj:function(){return n.FRj},Gfb:function(){return n.Gfb},Gwp:function(){return n.Gwp},LvZ:function(){return n.LvZ},QSL:function(){return n.QSL},SQ0:function(){return n.SQ0},SZC:function(){return n.SZC},WbW:function(){return n.WbW},Yx7:function(){return n.Yx7},_6O:function(){return n._6O},_Sb:function(){return n._Sb},_Wl:function(){return n._Wl},a5u:function(){return n.a5u},eBP:function(){return n.eBP},f_G:function(){return n.f_G},hJE:function(){return n.hJE},hSQ:function(){return n.hSQ},jEh:function(){return n.jEh},kLt:function(){return n.kLt},kYq:function(){return n.kYq},kjx:function(){return n.kjx},lDB:function(){return n.lDB},mf5:function(){return n.mf5},moL:function(){return n.moL},nJe:function(){return n.nJe},nhX:function(){return n.nhX},pv:function(){return n.pv},qPp:function(){return n.qPp},qR2:function(){return n.qR2},tkx:function(){return n.tkx}});var a=r(31119),n=r(24888),o=e([a]);a=(o.then?(await o)():o)[0],(0,n.oTL)(a),i()}catch(e){i(e)}})},24888:function(e,t,r){"use strict";let i;function a(e){i=e}r.d(t,{$xJ:function(){return e_},$zK:function(){return ev},B1s:function(){return tx},B9l:function(){return ew},BSq:function(){return q},CBX:function(){return tQ},Cj9:function(){return R},EQY:function(){return e0},Emq:function(){return v},EuU:function(){return eZ},Ezf:function(){return tv},FRj:function(){return eS},Gfb:function(){return k},GqI:function(){return tB},Gwp:function(){return e1},H7p:function(){return tk},I0_:function(){return tm},Iui:function(){return td},Ks4:function(){return ty},LvZ:function(){return Z},NRn:function(){return tP},ONh:function(){return tw},OQ_:function(){return th},Or8:function(){return tY},Q$$:function(){return tb},QSL:function(){return eP},RVh:function(){return ta},Ruq:function(){return tI},SQ0:function(){return ep},SZC:function(){return F},SaM:function(){return tj},Tqz:function(){return tM},UZK:function(){return tU},WbW:function(){return O},Whx:function(){return tD},Wl7:function(){return to},WlW:function(){return ti},XP4:function(){return tE},YqC:function(){return tT},Yx7:function(){return e6},ZU4:function(){return tF},_6O:function(){return eG},_Sb:function(){return ex},_Wl:function(){return eo},a5u:function(){return eC},cMo:function(){return tL},dVC:function(){return tH},doE:function(){return tS},eBP:function(){return eW},eYF:function(){return te},eoR:function(){return ts},fDz:function(){return tN},fYP:function(){return tG},f_G:function(){return eO},h4u:function(){return e7},hJE:function(){return ee},hSQ:function(){return ek},hcz:function(){return tg},hdV:function(){return tt},idS:function(){return tC},iqB:function(){return t_},j8U:function(){return tz},jEh:function(){return M},kLt:function(){return P},kYq:function(){return Q},kjx:function(){return E},lDB:function(){return el},m_1:function(){return tn},mf5:function(){return eK},moL:function(){return U},nJe:function(){return eq},neC:function(){return tR},nhX:function(){return eU},o$X:function(){return tu},oH7:function(){return tl},oHO:function(){return tO},oTL:function(){return a},pT7:function(){return e5},pv:function(){return K},q4o:function(){return tA},qPp:function(){return eL},qR2:function(){return B},qtq:function(){return tr},qxi:function(){return tf},tkx:function(){return G},uYV:function(){return tc},ug$:function(){return e9},yfN:function(){return tK},zQI:function(){return tp}});let n=Array(128).fill(void 0);n.push(void 0,null,!0,!1);let o=n.length;function A(e){o===n.length&&n.push(n.length+1);let t=o;return o=n[t],n[t]=e,t}function s(e){return n[e]}function c(e){e<132||(n[e]=o,o=e)}function f(e){let t=s(e);return c(e),t}let h=new("undefined"==typeof TextDecoder?(0,module.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});h.decode();let u=null;function g(){return(null===u||0===u.byteLength)&&(u=new Uint8Array(i.memory.buffer)),u}function l(e,t){return e>>>=0,h.decode(g().subarray(e,e+t))}let d=0,p=new("undefined"==typeof TextEncoder?(0,module.require)("util").TextEncoder:TextEncoder)("utf-8"),I="function"==typeof p.encodeInto?function(e,t){return p.encodeInto(e,t)}:function(e,t){let r=p.encode(e);return t.set(r),{read:e.length,written:r.length}};function _(e,t,r){if(void 0===r){let r=p.encode(e),i=t(r.length,1)>>>0;return g().subarray(i,i+r.length).set(r),d=r.length,i}let i=e.length,a=t(i,1)>>>0,n=g(),o=0;for(;o<i;o++){let t=e.charCodeAt(o);if(t>127)break;n[a+o]=t}if(o!==i){0!==o&&(e=e.slice(o)),a=r(a,i,i=o+3*e.length,1)>>>0;let t=I(e,g().subarray(a+o,a+i));o+=t.written,a=r(a,i,o,1)>>>0}return d=o,a}function y(e){return null==e}let C=null;function b(){return(null===C||0===C.byteLength)&&(C=new Int32Array(i.memory.buffer)),C}function w(e){let t;let r=typeof e;if("number"==r||"boolean"==r||null==e)return`${e}`;if("string"==r)return`"${e}"`;if("symbol"==r){let t=e.description;return null==t?"Symbol":`Symbol(${t})`}if("function"==r){let t=e.name;return"string"==typeof t&&t.length>0?`Function(${t})`:"Function"}if(Array.isArray(e)){let t=e.length,r="[";t>0&&(r+=w(e[0]));for(let i=1;i<t;i++)r+=", "+w(e[i]);return r+"]"}let i=/\[object ([^\]]+)\]/.exec(toString.call(e));if(!(i.length>1))return toString.call(e);if("Object"==(t=i[1]))try{return"Object("+JSON.stringify(e)+")"}catch(e){return"Object"}return e instanceof Error?`${e.name}: ${e.message}