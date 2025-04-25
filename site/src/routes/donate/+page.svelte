<script>
  	import { CardanoWallet, BrowserWalletState } from '@meshsdk/svelte';
</script>
<div>
  <h1 class="bg-purple">Donate</h1>
  <CardanoWallet />
  <h3>About your wallet</h3>
  <p>connected: {BrowserWalletState.connected}</p>
  <p>Your wallet name is: {BrowserWalletState.name}</p>
</div>
