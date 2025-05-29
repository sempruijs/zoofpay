<script lang="ts">
  import { CreateLinkStep } from "./createLink";
  import { type Writable } from "svelte/store";

  export let viewState: Writable<CreateLinkStep>;
</script>
<h1>Share link</h1>
<button onclick={() => console.log("copy")}>Copy</button>
