<script lang="ts">
  import type { Writable } from "svelte/store";
  import { Option } from "effect";
  import { PayLinkStep } from "$lib/payLink";
  import { type PaymentRequest } from "$lib/paymentRequest";

  const { viewState, paymentRequest } = $props<{
    viewState: Writable<PayLinkStep>;
  }>();
</script>
<h1>Choose method</h1>
<button onclick={() => viewState.set(PayLinkStep.Automatic)}>Automatic</button>
<button onclick={() => viewState.set(PayLinkStep.Manual)}>Manual</button>
