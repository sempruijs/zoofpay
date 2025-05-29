<script lang="ts">
  import { CreateLinkStep } from "./createLink";
  import { type Writable } from "svelte/store";

  export let viewState: Writable<CreateLinkStep>;
</script>
<h1>Choose method</h1>
<button onclick={() => viewState.set(CreateLinkStep.AutomaticAddress)}>automatic</button>
<button onclick={() => viewState.set(CreateLinkStep.ManualAddress)}>manual</button>
