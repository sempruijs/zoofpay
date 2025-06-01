<script lang="ts">
  import { page } from '$app/stores';
  import { Effect, Option } from 'effect';
  import  { type PaymentRequest, paymentRequestFromBase64 } from "$lib/paymentRequest";

  let paymentRequest = $state<Option.Option<PaymentRequest>>(Option.none());
  
  $effect(() => {
    const data = $page.url.searchParams.get('d');
    Effect.runPromise(paymentRequestFromBase64(data)).then((pr) => {
      console.log(pr);
      paymentRequest = Option.some(pr);
    })
  })
</script>
{#if Option.isSome(paymentRequest)}
<h1>{paymentRequest.value.amount}</h1>
{:else}
<h1>Payment request not found</h1>
{/if}
