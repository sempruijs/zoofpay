<script lang="ts">
  import { Option } from "effect";
  import { CreateLinkStep } from "$lib/createLink/createLink";
  import ChooseMethod from "$lib/createLink/chooseMethod.svelte";
  import AutomaticAddress from "$lib/createLink/AutomaticAddress.svelte";
  import ComfirmAddress from "$lib/createLink/comfirmAddress.svelte";
  import ShareLink from "$lib/createLink/shareLink.svelte";
  import EnterAmount from "$lib/createLink/enterAmount.svelte";
  import ManualAddress from "$lib/createLink/manualAddress.svelte";
  import EnterDescription from "$lib/createLink/enterDescription.svelte";
  import type { PaymentRequest } from "$lib/types";
  import { writable } from "svelte/store";

  const viewState = writable<CreateLinkStep>(CreateLinkStep.ChooseMethod);
  const paymentRequest = writable<PaymentRequest>({
    address: "",
    amount: "",
    description: Option.none(),
    handle: Option.none(),
    cnt: "ada",
    open: false
  });  
</script>
{#if $viewState === CreateLinkStep.ChooseMethod}
  <ChooseMethod {viewState} />
{:else if $viewState === CreateLinkStep.AutomaticAddress}
  <AutomaticAddress {viewState} {paymentRequest} />
{:else if $viewState === CreateLinkStep.EnterAmount}
  <EnterAmount {viewState} {paymentRequest}/>
{:else if $viewState === CreateLinkStep.EnterDescription}
  <EnterDescription {viewState} {paymentRequest} />
{:else if $viewState === CreateLinkStep.ShareLink}
  <ShareLink {viewState} {paymentRequest} />
{:else if $viewState === CreateLinkStep.ComfirmAddress}
  <ComfirmAddress {viewState} {paymentRequest} />
{:else if $viewState === CreateLinkStep.ManualAddress}
  <ManualAddress {viewState} {paymentRequest} />
{:else}
   <h1 class="text-red-500">404 view state not found</h1>
{/if}
