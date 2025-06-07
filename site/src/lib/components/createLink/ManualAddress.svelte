<script lang="ts">
  import { CreateLinkStep } from "$lib/ts/createLink";
  import { type Writable } from "svelte/store";

  let address = $state('');

  const { viewState, paymentRequest } = $props<{
    viewState: Writable<CreateLinkStep>;
    paymentRequest: Writable<PaymentRequest>;
  }>();

  $effect(() => {
    let parsed: string = address;
    paymentRequest.update(pr => ({
      ...pr,
      address: parsed
    }));
  })
</script>
<h1>Enter address</h1>
<input
  type="text"
  bind:value={address}
  placeholder="addr"
/>
<button onclick={() => viewState.set(CreateLinkStep.ComfirmAddress)}>next</button>
<button onclick={() => viewState.set(CreateLinkStep.ChooseMethod)}>Back</button>
