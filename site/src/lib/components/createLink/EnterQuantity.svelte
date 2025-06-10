<script lang="ts">
  import { type Writable } from "svelte/store";
  import { type PartialPaymentRequest, type Quantity, Open, Closed } from "$lib/ts/paymentRequest";
  import { Effect, Option } from "effect";
  import { parseAdaToLovelace } from "$lib/ts/paymentRequest";

  let quantity = $state('');

  $effect(() => {
    // Run the Effect and handle the result
    Effect.runPromise(parseAdaToLovelace(quantity)).then((quaentity) => {
      partialPaymentRequest.update((pr: PartialPaymentRequest) => ({
        ...pr,
        variant: Option.some(Closed({quantity: quantity as Quantity}))
      }));
    }).catch((err) => {
      console.error("Invalid ADA input:", err.message);
    });
  });

  const { partialPaymentRequest, onNext, onPrevious } = $props<{
    partialPaymentRequest: Writable<PartialPaymentRequest>;
    onNext: () => void;
    onPrevious: () => void;
  }>();
</script>
<h1>Enter amount</h1>
<input
  type="text"
  bind:value={quantity}
  placeholder="0"
/>
<button onclick={onNext}>next</button>
<button onclick={onPrevious}>previous</button>
