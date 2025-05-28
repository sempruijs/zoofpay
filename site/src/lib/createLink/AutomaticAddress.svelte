<script lang="ts">
  import { connectedWallet } from "../../stores/wallet";
  import ConnectWallet from "$lib/components/ConnectWallet.svelte";
  import { CreateLinkStep } from "./createLink";
  import type { PaymentRequest } from "$lib/types";}

  export let viewState: CreateLinkStep;
  export let paymentRequest: PaymentRequest;
</script>
<h1>connect wallet</h1>
<ConnectWallet />
{#if $connectedWallet}
<button onclick={() => viewState = CreateLinkStep.EnterAmount}>Next</button>
{/if}
<button onclick={() => viewState = CreateLinkStep.ChooseMethod}>Previous</button>

