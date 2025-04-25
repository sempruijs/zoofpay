<script>
	import { CardanoWallet, BrowserWalletState } from '@meshsdk/svelte';

  let address = '';
  let loading = true;

  async function afterConnectedWallet() {
    if (BrowserWalletState.wallet) {
      address = await BrowserWalletState.wallet.getChangeAddress();
    }
    loading = false;
  }
</script>
<div>
  <h1 class="bg-purple">Connect your wallet</h1>
  <CardanoWallet onConnected={afterConnectedWallet} />
  <h3>About your wallet</h3>
  <p>connected: {BrowserWalletState.connected}</p>
  <p>Your wallet name is: {BrowserWalletState.name}</p>
  <p>{address}</p>
</div>
