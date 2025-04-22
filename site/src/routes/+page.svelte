<script lang="ts">
	import { CardanoWallet, BrowserWalletState } from '@meshsdk/svelte';
	import { Effect } from 'effect';

	$effect(() => {
    if (BrowserWalletState.wallet) {
      const name = BrowserWalletState.wallet._walletName;
      console.log(name);
    }
  });
</script>

<div class="m-8 p-4 border border-gray-300 rounded-md shadow-sm">
	<h1>Connect your wallet</h1>
	<CardanoWallet isDark={true} />
</div>
