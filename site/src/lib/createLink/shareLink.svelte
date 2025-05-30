<script lang="ts">
  import { CreateLinkStep } from "./createLink";
  import { type Writable } from "svelte/store";
  import { paymentRequestToUrl } from "$lib/paymentRequest";

  const { viewState, paymentRequest } = $props<{
    viewState: Writable<CreateLinkStep>;
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
