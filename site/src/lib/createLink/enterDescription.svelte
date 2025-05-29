<script lang="ts">
  import { CreateLinkStep } from "./createLink";
  import { type Writable } from "svelte/store";

  export let viewState: Writable<CreateLinkStep>;
</script>
<h1>Enter description</h1>
<button onclick={() => viewState.set(CreateLinkStep.ShareLink)}>Next</button>
<button onclick={() => viewState.set(CreateLinkStep.EnterAmount)}>Previous</button>
