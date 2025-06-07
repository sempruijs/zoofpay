<script lang="ts">
  import { type Writable } from "svelte/store";
  import { CreateLinkStep } from "$lib/ts/createLink";

  export let viewState: Writable<PayLinkStep>;
</script>
<h1>Choose method</h1>
<button onclick={() => viewState.set(CreateLinkStep.AutomaticAddress)}>automatic</button>
<button onclick={() => viewState.set(CreateLinkStep.ManualAddress)}>manual</button>
