<script lang="ts">
  import { connectedWallet } from "../../stores/wallet";
  import { Effect } from "effect";
  import ConnectWallet from "$lib/components/ConnectWallet.svelte";
  import { CreateLinkStep } from "./createLink";
  import type { Writable } from "svelte/store";
  import type { PaymentRequest } from "$lib/paymentRequest";
  import { getAddress } from "$lib/wallet/getAddress";
  import { provideWallet } from "$lib/wallet";

  const { viewState, paymentRequest } = $props<{
    viewState: Writable<CreateLinkStep>;
    paymentRequest: Writable<PaymentRequest>;
  }>();

  $effect(() => {
    if ($connectedWallet) {
      Effect.runPromise(provideWallet($connectedWallet)(getAddress()))
        .then(addr => {
          paymentRequest.update(pr => ({
            ...pr,
            address: addr
          }));
        })
        .catch(err => {
          console.error("error fetching address:", err);
        });
    }
  });
</script>

<h1>connect wallet</h1>
<ConnectWallet />

{#if $connectedWallet}
  <button onclick={() => viewState.set(CreateLinkStep.EnterAmount)}>Next</button>
{/if}
<button onclick={() => viewState.set(CreateLinkStep.ChooseMethod)}>Previous</button>
