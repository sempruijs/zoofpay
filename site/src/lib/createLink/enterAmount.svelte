<script lang="ts">
  import { CreateLinkStep } from "./createLink";
  import { type Writable } from "svelte/store";
  import { type PaymentRequest } from "$lib/paymentRequest";

  let amount = $state('');

  $effect(() => {
    let parsed: string = amount;
    paymentRequest.update(pr => ({
      ...pr,
      amount: parsed
    }));
  })

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
