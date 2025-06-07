<script lang="ts">
  import type { Writable } from "svelte/store";
  import { PayLinkStep } from "$lib/ts/payLink";

  const { viewState } = $props<{
    viewState: Writable<PayLinkStep>;
  }>();
</script>
<h1>Choose method</h1>
<button onclick={() => viewState.set(PayLinkStep.Automatic)}>Automatic</button>
<button onclick={() => viewState.set(PayLinkStep.Manual)}>Manual</button>
