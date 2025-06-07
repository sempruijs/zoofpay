<script lang="ts">
  import type { Writable } from "svelte/store";
  import { PayLinkStep } from "$lib/ts/payLink";
  import { type PaymentRequest } from "$lib/ts/paymentRequest";
  import QRCode from '@castlenine/svelte-qrcode';

  const { viewState, paymentRequest } = $props<{
    viewState: Writable<PayLinkStep>;
    paymentRequest: PaymentRequest;
  }>();

  const addr = paymentRequest.address;
</script>
<h1>{addr}</h1>
<QRCode data={addr} />
<button onclick={() => viewState.set(PayLinkStep.ThankYou)}>next</button>
<button onclick={() => viewState.set(PayLinkStep.ChooseMethod)}>previous</button>
