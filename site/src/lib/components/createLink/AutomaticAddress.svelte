<script lang="ts">
  import { connectedWallet } from "../../../stores/wallet";
  import { Effect, Option } from "effect";
  import ConnectWallet from "$lib/components/ConnectWallet.svelte";
  import type { Writable } from "svelte/store";
  import type { PartialPaymentRequest } from "$lib/ts/paymentRequest";
  import { getAddress } from "$lib/ts/wallet/getAddress";
  import { provideWallet } from "$lib/ts/wallet";

  const { partialPaymentRequest, onNext, onPrevious } = $props<{
    partialPaymentRequest: Writable<PartialPaymentRequest>;
    onNext: () => void;
    onPrevious: () => void;
  }>();

  $effect(() => {
    if (Option.isSome($connectedWallet)) {
      Effect.runPromise(provideWallet($connectedWallet.value)(getAddress()))
        .then(addr => {
          partialPaymentRequest.update(pr => ({
            ...pr,
            address: Option.some(addr)
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

{#if Option.isSome($connectedWallet)}
  <button onclick={onNext}>Next</button>
{/if}
<button onclick={onPrevious}>Previous</button>
