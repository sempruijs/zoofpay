<script lang="ts">
  import { page } from '$app/stores';
  import { Effect, Option } from 'effect';
  import  { type PaymentRequest, paymentRequestFromBase64 } from "$lib/paymentRequest";
  import { writable } from 'svelte/store';
  import { PayLinkStep } from '$lib/payLink';
  import Summery from '$lib/components/payLink/Summery.svelte';
  import ChooseMethod from '$lib/createLink/chooseMethod.svelte';
  import Manual from '$lib/components/payLink/Manual.svelte';
  import Automatic from '$lib/components/payLink/Automatic.svelte';

  let paymentRequest = $state<Option.Option<PaymentRequest>>(Option.none());
  const base64 = Option.fromNullable($page.url.searchParams.get('pr'));
  const viewState = writable<PayLinkStep>(PayLinkStep.Summery);
  
  $effect(() => {
    Option.map(base64, (data) => Effect.runPromise(paymentRequestFromBase64(data)).then((pr) => {
      console.log(pr);
      paymentRequest = Option.some(pr);
    }).catch((err) => {
      alert("Login failed: " + err.message);
    }))
  })
</script>
{#if Option.isSome(paymentRequest)}
  {#if $viewState == PayLinkStep.Summery}
    <Summery viewState={viewState} paymentRequest={paymentRequest.value} />
  {:else if $viewState == PayLinkStep.ChooseMethod}
    <ChooseMethod {viewState} />
  {:else if $viewState == PayLinkStep.Manual}
    <Manual {viewState} paymentRequest={paymentRequest.value} />
  {:else if $viewState == PayLinkStep.Automatic}
    <Automatic {viewState} paymentRequest={paymentRequest.value}/>
  {:else if $viewState == PayLinkStep.ThankYou}
    <h1>Thank you</h1>
  {:else}
    <h1>Could not render viewState, {viewState}</h1>
  {/if}
{:else}
  <h1>Loading...</h1>
{/if}
