<script lang="ts">
  import { CreateLinkStep } from "$lib/ts/createLink";
  import { type Writable } from "svelte/store";
  import { Option } from "effect";

  let description = $state('');

  $effect(() => {
    let parsed: string = description;
    if (parsed != "") {
      (paymentRequest).update(pr => ({
        ...pr,
        description: Option.some(parsed)
      }));
    }
  })

 const { viewState, paymentRequest } = $props<{
    viewState: Writable<CreateLinkStep>;
    paymentRequest: Writable<PaymentRequest>;
  }>();
</script>
<h1>Enter description</h1>
<input
  type="text"
  bind:value={description}
  placeholder="banana"
/>
<button onclick={() => viewState.set(CreateLinkStep.ShareLink)}>Next</button>
<button onclick={() => viewState.set(CreateLinkStep.EnterAmount)}>Previous</button>
