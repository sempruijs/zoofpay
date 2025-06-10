<script lang="ts">
  import { type Writable } from "svelte/store";
  import { Option } from "effect";
  import { type PartialPaymentRequest } from "$lib/ts/paymentRequest";

  let description = $state('');

  $effect(() => {
    let parsed: string = description;
    if (parsed != "") {
      (partialPaymentRequest).update(pr => ({
        ...pr,
        description: Option.some(parsed)
      }));
    }
  })

  const { partialPaymentRequest, onNext, onPrevious } = $props<{
    partialPaymentRequest: Writable<PartialPaymentRequest>;
    onNext: () => void;
    onPrevious: () => void;
  }>();
</script>
<h1>Enter description</h1>
<input
  type="text"
  bind:value={description}
  placeholder="banana"
/>
<button onclick={onNext}>Next</button>
<button onclick={onPrevious}>Previous</button>
