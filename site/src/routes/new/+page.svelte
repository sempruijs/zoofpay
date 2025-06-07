<script lang="ts">
  import { Option } from "effect";
  import { writable } from "svelte/store";
  import { version } from "../../stores/config";
  import { CreateLinkStep } from "$lib/ts/createLink";
  import { type PaymentRequest, PaymentVariant, type Quantity, type Address, Asset } from "$lib/ts/paymentRequest";
  import ChooseMethod from "$lib/components/createLink/ChooseMethod.svelte";
  import AutomaticAddress from "$lib/components/createLink/AutomaticAddress.svelte";
  import ManualAddress from "$lib/components/createLink/ManualAddress.svelte";
  import ComfirmAddress from "$lib/components/createLink/ComfirmAddress.svelte";
  import EnterQuantity from "$lib/components/createLink/EnterQuantity.svelte";
  import EnterDescription from "$lib/components/createLink/enterDescription.svelte";
  import ShareLink from "$lib/components/createLink/ShareLink.svelte";

  const viewState = writable<CreateLinkStep>(CreateLinkStep.ChooseMethod);
  const paymentRequest = writable<PaymentRequest>({
    version: version,
    address: "" as Address,
    variant: PaymentVariant.closed("" as Quantity),
    description: Option.none(),
    handle: Option.none(),
    asset: Asset.Lovelace,
  });  
</script>
{#if $viewState === CreateLinkStep.ChooseMethod}
  <ChooseMethod {viewState} />
{:else if $viewState === CreateLinkStep.AutomaticAddress}
  <AutomaticAddress {viewState} {paymentRequest} />
{:else if $viewState === CreateLinkStep.EnterAmount}
  <EnterQuantity {viewState} {paymentRequest}/>
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
