<script lang="ts">
  import { CreateLinkStep } from "./createLink";

  export let viewState: CreateLinkStep;
</script>
<h1>Enter description</h1>
<button onclick={() => viewState = CreateLinkStep.ShareLink}>Next</button>
<button onclick={() => viewState = CreateLinkStep.EnterAmount}>Previous</button>
