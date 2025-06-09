<script lang="ts">
  import { connectedWallet } from "../../../stores/wallet";
  import { Effect, Option } from "effect";
  import ConnectWallet from "$lib/components/ConnectWallet.svelte";
  import { CreateLinkStep } from "$lib/ts/createLink";
  import type { Writable } from "svelte/store";
  import type { PaymentRequest } from "$lib/ts/paymentRequest";
  import { getAddress } from "$lib/ts/wallet/getAddress";
  import { provideWallet } from "$lib/ts/wallet";

  const { viewState, paymentRequest } = $props<{
    viewState: Writable<CreateLinkStep>;
    paymentRequest: Writable<PaymentRequest>;
    onConfirm: (address: String) => void);
  }>();

  $effect(() => {
    if (Option.isSome($connectedWallet)) {
      Effect.runPromise(provideWallet($connectedWallet.value)(getAddress()))
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

{#if Option.isSome($connectedWallet)}
  <button onclick={() => viewState.set(CreateLinkStep.EnterAmount)}>Next</button>
{/if}
<button onclick={() => onConfirm(address);}>Previous</button>
