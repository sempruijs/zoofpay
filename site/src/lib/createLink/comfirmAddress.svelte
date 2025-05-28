<script lang="ts">
  import { CreateLinkStep } from "./createLink";

  export let viewState: CreateLinkStep;
</script>
<h1>Is this your address?</h1>
<button onclick={() => viewState = CreateLinkStep.EnterAmount}>Yes, this is my address</button>
<button onclick={() => viewState = CreateLinkStep.ChooseMethod}>No, I made a typo</button>
