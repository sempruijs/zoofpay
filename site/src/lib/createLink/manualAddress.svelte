<script lang="ts">
  import { CreateLinkStep } from "./createLink";
  import { type Writable } from "svelte/store";

  export let viewState: Writable<CreateLinkStep>;
</script>
<h1>Enter address</h1>
<button onclick={() => viewState.set(CreateLinkStep.ComfirmAddress)}>next</button>
<button onclick={() => viewState.set(CreateLinkStep.ChooseMethod)}>Back</button>
