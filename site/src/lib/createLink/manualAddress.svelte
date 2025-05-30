<script lang="ts">
  import { CreateLinkStep } from "./createLink";
  import { type Writable } from "svelte/store";

  const { viewState, paymentRequest } = $props<{
    viewState: Writable<CreateLinkStep>;
    paymentRequest: Writable<PaymentRequest>;
  }>();
</script>
<h1>Enter address</h1>
<button onclick={() => viewState.set(CreateLinkStep.ComfirmAddress)}>next</button>
<button onclick={() => viewState.set(CreateLinkStep.ChooseMethod)}>Back</button>
