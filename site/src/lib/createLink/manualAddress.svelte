<script lang="ts">
  import { CreateLinkStep } from "./createLink";

  export let viewState: CreateLinkStep;
</script>
<h1>Enter address</h1>
<button onclick={() => viewState = CreateLinkStep.ComfirmAddress}>next</button>
<button onclick={() => viewState = CreateLinkStep.ChooseMethod}>Back</button>
