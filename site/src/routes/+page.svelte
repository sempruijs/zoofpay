<script lang="ts">
	import { CardanoWallet, BrowserWalletState } from '@meshsdk/svelte';

	$effect(() => {
    if (BrowserWalletState.wallet) {
      const name = BrowserWalletState.wallet._walletName;
      console.log(name);
    }
  });
</script>

<div class="m-8 p-4 border border-gray-300 rounded-md shadow-sm">
	<h1>Congratulations!</h1>
	<p>You've successfully setup this template</p>
	<h3>What's next?</h3>
	<div>
		<a href="https://meshjs.dev/">Learn about mesh sdk</a>
		<a href="https://svelte.dev/tutorial/svelte/welcome-to-svelte">Learn svelte</a>
		<a href="https://v1.tailwindcss.com/course">Learn tailwind</a>
		<a href="https://effect.website/">Learn effect</a>
	</div>
</div>
