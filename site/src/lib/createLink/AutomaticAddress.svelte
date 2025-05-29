<script lang="ts">
  import { connectedWallet } from "../../stores/wallet";
  import { Option } from "effect";
  import ConnectWallet from "$lib/components/ConnectWallet.svelte";
  import { CreateLinkStep } from "./createLink";
  import { type Writable } from "svelte/store";

  export let viewState: Writable<CreateLinkStep>;
</script>
<h1>connect wallet</h1>
<ConnectWallet />
{#if $connectedWallet}
<button onclick={() => viewState.set(CreateLinkStep.EnterAmount)}>Next</button>
{/if}
<button onclick={() => viewState.set(CreateLinkStep.ChooseMethod)}>Previous</button>

