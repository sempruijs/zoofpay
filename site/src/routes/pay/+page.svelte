<script lang="ts">
  import { page } from '$app/stores';
  import { Effect, Option } from 'effect';
  import  { type PaymentRequest, paymentRequestFromBase64 } from "$lib/paymentRequest";
  import { writable } from 'svelte/store';
  import { PayLinkStep } from '$lib/payLink';

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
    <h1>summery {paymentRequest.value.amount}</h1>
  {:else if $viewState == PayLinkStep.ChooseMethod}
    <h1>Choose method</h1>
  {:else if $viewState == PayLinkStep.Manual}
    <h1>Manual</h1>
  {:else if $viewState == PayLinkStep.Automatic}
    <h1>Automatic</h1>
  {:else if $viewState == PayLinkStep.ThankYou}
    <h1>Thank you</h1>
  {:else}
    <h1>Could not render viewState, {viewState}</h1>
  {/if}
{:else}
  <h1>Loading...</h1>
{/if}
