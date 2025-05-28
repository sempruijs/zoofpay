<script lang="ts">
  import { CreateLinkStep } from "./createLink";

  export let viewState: CreateLinkStep;
</script>
<h1>Enter amount</h1>
<button onclick={() => viewState = CreateLinkStep.EnterDescription}>next</button>
<button onclick={() => viewState = CreateLinkStep.EnterAmount}>previous</button>
