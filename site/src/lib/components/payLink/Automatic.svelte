<script lang="ts">
  import type { Writable } from "svelte/store";
  import { PayLinkStep } from "$lib/payLink";
  import { type PaymentRequest } from "$lib/paymentRequest";

  const { viewState, paymentRequest } = $props<{
    viewState: Writable<PayLinkStep>;
    paymentRequest: PaymentRequest;
  }>();

  const addr = paymentRequest.address;
</script>
<h1>Automatic</h1>
<h1>{addr}</h1>
<button onclick={() => viewState.set(PayLinkStep.ThankYou)}>next</button>
<button onclick={() => viewState.set(PayLinkStep.ChooseMethod)}>previous</button>
