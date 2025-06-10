<script lang="ts">
  import { Equal, Option, Effect } from "effect";
  import ChooseMethod from "$lib/components/createLink/ChooseMethod.svelte";
  import { Step, type CreateLinkStep } from "$lib/ts/createLink";
  import AutomaticAddress from "$lib/components/createLink/AutomaticAddress.svelte";
  import { type PartialPaymentRequest, Lovelace, parsePartialToPaymentRequest, type PaymentRequest } from "$lib/ts/paymentRequest";
  import { version } from "../../stores/config";
  import { writable } from "svelte/store";
  import { type Writable } from "svelte/store";
  import EnterQuantity from "$lib/components/createLink/EnterQuantity.svelte";
  import EnterDescription from "$lib/components/createLink/enterDescription.svelte";
  import ShareLink from "$lib/components/createLink/ShareLink.svelte";
    import ManualAddress from "$lib/components/createLink/ManualAddress.svelte";
    import ComfirmAddress from "$lib/components/createLink/ComfirmAddress.svelte";

  let step: CreateLinkStep = $state(Step.ChooseMethod());
  let partialPaymentRequest: Writable<PartialPaymentRequest> = writable({
    version: version,
    address: Option.none(),
    quantity: Option.none(),
    description: Option.none(),
    handle: Option.none(),
    asset: Lovelace(),
    variant: Option.none()
  });
  let paymentRequest: Option.Option<PaymentRequest> = $state(Option.none());

  $effect(() => {
    console.log(partialPaymentRequest);
    Effect.runPromise(parsePartialToPaymentRequest($partialPaymentRequest)).then((pr) => {
      paymentRequest = Option.some(pr);
    }).catch(() => {
      paymentRequest = Option.none();
    })
  })
</script>
{#if Equal.equals(step, Step.ChooseMethod())}
  <ChooseMethod
    onAutomatic={() => {
      step = Step.AutomaticAddress();
    }}
    onManual={() => {
      step = Step.ManualAddress();
    }}
  />
{:else if Equal.equals(step, Step.AutomaticAddress())}
  <AutomaticAddress
    onNext={() => {
      step = Step.EnterQuantity();
    }}
    onPrevious={() => {
      step = Step.ChooseMethod();
    }}
    partialPaymentRequest={partialPaymentRequest}
  />
{:else if Equal.equals(step, Step.ManualAddress())}
  <ManualAddress
    onNext={() => {
      step = Step.ComfirmAddress();
    }}
    onPrevious={() => {
      step = Step.ChooseMethod();
    }}
    partialPaymentRequest={partialPaymentRequest}
  />
{:else if Equal.equals(step, Step.ComfirmAddress())}
  {#if Option.isSome($partialPaymentRequest.address)}
    <ComfirmAddress
      onNext={() => {
        step = Step.EnterQuantity();
      }}
      onPrevious={() => {
        step = Step.ChooseMethod();
      }}
      address={$partialPaymentRequest.address.value}
    />
  {:else}
    <h1>Error, could not render address</h1>
  {/if}
{:else if Equal.equals(step, Step.EnterQuantity())}
  <EnterQuantity
    onNext={() => {
      step = Step.EnterDescription();
    }}
    onPrevious={() => {
      step = Step.ChooseMethod();
    }}
    partialPaymentRequest={partialPaymentRequest}
  />
{:else if Equal.equals(step, Step.EnterDescription())}
  <EnterDescription
    onNext={() => {
      step = Step.ShareLink();
    }}
    onPrevious={() => {
      step = Step.EnterQuantity();
    }}
    partialPaymentRequest={partialPaymentRequest}
  />
{:else if Equal.equals(step, Step.ShareLink())}
{#if Option.isSome(paymentRequest)}
  <ShareLink paymentRequest={paymentRequest.value} />
{:else}
  <h1>Failed parse partialPaymentRequest to paymentRequest</h1>
{/if}
{:else}
   <h1 class="text-red-500">404 view state not found</h1>
{/if}
