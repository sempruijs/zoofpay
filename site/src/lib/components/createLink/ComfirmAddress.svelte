<script lang="ts">
  import { type Address } from "$lib/ts/paymentRequest";

  const { address, onNext, onPrevious } = $props<{
    address: Address;
    onNext: () => void;
    onPrevious: () => void;
  }>();
</script>
<h1>Is this your address?</h1>
<p>{address}</p>
<button onclick={onNext}>Yes, this is my address</button>
<button onclick={onPrevious}>No, I made a typo</button>
