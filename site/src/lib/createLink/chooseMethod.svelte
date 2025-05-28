<script lang="ts">
  import { CreateLinkStep } from "./createLink";

  export let viewState: CreateLinkStep;
</script>
<h1>Choose method</h1>
<button onclick={() => viewState = CreateLinkStep.AutomaticAddress}>automatic</button>
<button onclick={() => viewState = CreateLinkStep.ManualAddress}>manual</button>
