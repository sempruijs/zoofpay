<script lang="ts">
  import type { Writable } from "svelte/store";
  import { Option } from "effect";
  import { PayLinkStep } from "$lib/payLink";
  import { type PaymentRequest } from "$lib/paymentRequest";

  const { viewState, paymentRequest } = $props<{
    viewState: Writable<PayLinkStep>;
    paymentRequest: PaymentRequest;
  }>();

  const name = Option.getOrElse(paymentRequest.handle, () => "Someone");
  const amount = paymentRequest.amount;
  const description = paymentRequest.description;
</script>
{#if Option.isSome(description)}
<h1>{name} wants {amount} for {description.value}</h1>
{:else}
<h1>{name} wants {amount}</h1>
{/if}
<button onclick={() => viewState.set(PayLinkStep.ChooseMethod)}>next</button>
