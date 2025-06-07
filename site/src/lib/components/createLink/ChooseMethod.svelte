<script lang="ts">
  import { type Writable } from "svelte/store";
  import { PayLinkStep } from "$lib/ts/payLink";

  export let viewState: Writable<PayLinkStep>;
</script>
<h1>Choose method</h1>
<button onclick={() => viewState.set(PayLinkStep.Automatic)}>automatic</button>
<button onclick={() => viewState.set(PayLinkStep.Manual)}>manual</button>
