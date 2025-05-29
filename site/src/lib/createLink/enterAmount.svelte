<script lang="ts">
  import { CreateLinkStep } from "./createLink";
  import { type Writable } from "svelte/store";

  export let viewState: Writable<CreateLinkStep>;
</script>
<h1>Enter amount</h1>
<button onclick={() => viewState.set(CreateLinkStep.EnterDescription)}>next</button>
<button onclick={() => viewState.set(CreateLinkStep.EnterAmount)}>previous</button>
