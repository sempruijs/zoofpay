<script lang="ts">
  import { Effect, Option } from "effect";
  import type { Writable } from "svelte/store";
  import { writable } from "svelte/store";
  import { PayLinkStep } from "$lib/ts/payLink";
  import { type PaymentRequest, type Quantity} from "$lib/ts/paymentRequest";
  import ConnectWallet from "$lib/components/ConnectWallet.svelte";
  import { connectedWallet } from "../../../stores/wallet";
  import { provideWallet } from "$lib/ts/wallet";
  import { sendAssets } from "$lib/ts/wallet/sendAsset";
  import { type TxHash } from "$lib/ts/wallet/sendAsset"; 
  import { quantityToAda } from "$lib/ts/paymentRequest";

  const { viewState, paymentRequest, txHash } = $props<{
    viewState: Writable<PayLinkStep>;
    paymentRequest: PaymentRequest;
    txHash: Writable<Option.Option<TxHash>>;
  }>();

  function handlePayment(pr: PaymentRequest) {
    Option.match($connectedWallet, {
      onNone: () => console.error("Problem while finding connectedWallet"),
      onSome: (wallet) => {
        Effect.runPromise(provideWallet(wallet)(sendAssets(quantity, pr.asset, pr.address))).then((hash) => {
          txHash.set(Option.some(hash));
          viewState.set(PayLinkStep.ThankYou)
        }).catch((e) => {
          console.error("failed to send assets ", e);
        }) 
      }
    })
  }

  //TODO: throw error if payment request is open
  const quantity = paymentRequest.variant.quantity;
</script>
<h1>Automatic</h1>
<ConnectWallet />
{#if Option.isSome($connectedWallet)}
  <button onclick={() => handlePayment(paymentRequest)}>Pay {quantityToAda(quantity)} ada</button>
{/if}
<button onclick={() => viewState.set(PayLinkStep.ChooseMethod)}>previous</button>
