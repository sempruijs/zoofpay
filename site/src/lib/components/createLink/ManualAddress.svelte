<script lang="ts">
  import { Option } from "effect";
  import { type Writable } from "svelte/store";
  import { type PartialPaymentRequest, type Address } from "$lib/ts/paymentRequest";

  let address = $state('');

  const { partialPaymentRequest, onNext, onPrevious } = $props<{
    partialPaymentRequest: Writable<PartialPaymentRequest>;
    onNext: () => void;
    onPrevious: () => void;
  }>();


  $effect(() => {
    let parsed: Address = address as Address;
    partialPaymentRequest.update(pr => ({
      ...pr,
      address: Option.some(parsed)
    }));
  })
</script>
<h1>Enter address</h1>
<input
  type="text"
  bind:value={address}
  placeholder="addr"
/>
<button onclick={onNext}>next</button>
<button onclick={onPrevious}>Back</button>
