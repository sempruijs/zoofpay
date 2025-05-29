<script lang="ts">
  import { CreateLinkStep } from "./createLink";
  import { type Writable } from "svelte/store";

  export let viewState: Writable<CreateLinkStep>;
</script>
<h1>Is this your address?</h1>
<button onclick={() => viewState.set(CreateLinkStep.EnterAmount)}>Yes, this is my address</button>
<button onclick={() => viewState.set(CreateLinkStep.ChooseMethod)}>No, I made a typo</button>
