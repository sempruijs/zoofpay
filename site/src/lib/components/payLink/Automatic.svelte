<script lang="ts">
  import { Effect, Option } from "effect";
  import type { Writable } from "svelte/store";
  import { PayLinkStep } from "$lib/payLink";
  import { type PaymentRequest } from "$lib/paymentRequest";
  import ConnectWallet from "$lib/components/ConnectWallet.svelte";
  import { connectedWallet } from "../../../stores/wallet";
  import { provideWallet } from "$lib/wallet";
  import { sendAssets } from "$lib/wallet/sendAsset";

  function handlePayment(pr: PaymentRequest) {
    Option.match($connectedWallet, {
      onNone: () => console.error("Problem while finding connectedWallet"),
      onSome: (wallet) => {
        Effect.runPromise(provideWallet(wallet)(sendAssets(pr.amount, "lovelace", pr.address))).then(() => {
          viewState.set(PayLinkStep.ThankYou)
        }).catch((e) => {
          console.error("failed to send assets ", e);
        }) 
      }
    })
  }

  const { viewState, paymentRequest } = $props<{
    viewState: Writable<PayLinkStep>;
    paymentRequest: PaymentRequest;
  }>();

  const amount = paymentRequest.amount;
</script>
<h1>Automatic</h1>
<ConnectWallet />
{#if Option.isSome($connectedWallet)}
  <button onclick={() => handlePayment(paymentRequest)}>Pay {amount}</button>
{/if}
<button onclick={() => viewState.set(PayLinkStep.ChooseMethod)}>previous</button>
