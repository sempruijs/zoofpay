<script lang="ts">
  import { CreateLinkStep } from "$lib/ts/createLink";
  import { type Writable } from "svelte/store";

  const { viewState, paymentRequest } = $props<{
    viewState: Writable<CreateLinkStep>;
    paymentRequest: PaymentRequest;
  }>();
</script>
<h1>Is this your address?</h1>
<p>{$paymentRequest.address}</p>
<button onclick={() => viewState.set(CreateLinkStep.EnterAmount)}>Yes, this is my address</button>
<button onclick={() => viewState.set(CreateLinkStep.ChooseMethod)}>No, I made a typo</button>
