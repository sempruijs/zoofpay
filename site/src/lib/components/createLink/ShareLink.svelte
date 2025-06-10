<script lang="ts">
  import { paymentRequestToUrl } from "$lib/ts/paymentRequest";
  import { type PaymentRequest } from "$lib/ts/paymentRequest";

  const { paymentRequest } = $props<{
    paymentRequest: PaymentRequest;
  }>();

  function copyLink(pr: PaymentRequest) {
    const link = paymentRequestToUrl(pr);
    navigator.clipboard.writeText(link).then(() => {
      console.log("Link copied!");
    }).catch(err => {
      console.error("Failed to copy:", err);
    });
  }
</script>
<h1>Share link</h1>
<button onclick={() => copyLink($paymentRequest)}>Copy</button>
