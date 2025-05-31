<script lang="ts">
  import { CreateLinkStep } from "./createLink";
  import { type Writable } from "svelte/store";
  import { type PaymentRequest } from "$lib/paymentRequest";
  import { Effect } from "effect";
  import { parseAdaToLovelace } from "$lib/paymentRequest";

  let amount = $state('');

  $effect(() => {
    // Run the Effect and handle the result
    Effect.runPromise(parseAdaToLovelace(amount)).then((lovelace) => {
      paymentRequest.update((pr) => ({
        ...pr,
        amount: lovelace
      }));
    }).catch((err) => {
      console.error("Invalid ADA input:", err.message);
      // Optionally, set validation state or user feedback here
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
  bind:value={amount}
  placeholder="0"
/>
<button onclick={() => viewState.set(CreateLinkStep.EnterDescription)}>next</button>
<button onclick={() => viewState.set(CreateLinkStep.EnterAmount)}>previous</button>
