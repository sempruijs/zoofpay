<script lang="ts">
  import { type Writable } from "svelte/store";
  import { CreateLinkStep } from "$lib/ts/createLink";
  import { PaymentVariant, type PaymentRequest, type Quantity } from "$lib/ts/paymentRequest";
  import { Effect } from "effect";
  import { parseAdaToLovelace } from "$lib/ts/paymentRequest";

  let quantity = $state('');

  $effect(() => {
    // Run the Effect and handle the result
    Effect.runPromise(parseAdaToLovelace(quantity)).then((quaentity) => {
      paymentRequest.update((pr: PaymentRequest) => ({
        ...pr,
        variant: PaymentVariant.closed(quaentity as Quantity)
      }));
    }).catch((err) => {
      console.error("Invalid ADA input:", err.message);
    });
  });

  const { viewState, paymentRequest } = $props<{
    viewState: Writable<CreateLinkStep>;
    paymentRequest: Writable<PaymentRequest>;
  }>();
</script>
<h1>Enter amount</h1>
<input
  type="text"
  bind:value={quantity}
  placeholder="0"
/>
<button onclick={() => viewState.set(CreateLinkStep.EnterDescription)}>next</button>
<button onclick={() => viewState.set(CreateLinkStep.EnterAmount)}>previous</button>
