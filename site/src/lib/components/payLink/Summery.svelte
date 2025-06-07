<script lang="ts">
  import type { Writable } from "svelte/store";
  import { Option } from "effect";
  import { PayLinkStep } from "$lib/ts/payLink";
  import { type PaymentRequest, type Quantity } from "$lib/ts/paymentRequest";

  const { viewState, paymentRequest } = $props<{
    viewState: Writable<PayLinkStep>;
    paymentRequest: PaymentRequest;
  }>();

  const name = Option.getOrElse(paymentRequest.handle, () => "Someone");
  const quantity: Option.Option<Quantity> = paymentRequest.variant.type === "open" ? paymentRequest.variant.suggestion : Option.some(paymentRequest.variant.quantity);
  const description = paymentRequest.description;
</script>
{#if Option.isSome(quantity)}
  {#if Option.isSome(description)}
    <h1>{name} wants {quantity.value} for {description.value}</h1>
  {:else}
  <h1>{name} wants {quantity.value}</h1>
  {/if}
{:else}
  <h1>{name} made an open payment request</h1>
{/if}
<button onclick={() => viewState.set(PayLinkStep.ChooseMethod)}>next</button>
