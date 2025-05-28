<script lang="ts">
  import { Option } from "effect";
  import { CreateLinkStep } from "$lib/createLink/createLink";
  import ChooseMethod from "$lib/createLink/chooseMethod.svelte";
  import AutomaticAddress from "$lib/createLink/AutomaticAddress.svelte";
  import ComfirmAddress from "$lib/createLink/comfirmAddress.svelte";
  import ShareLink from "$lib/createLink/shareLink.svelte";
  import EnterAmount from "$lib/createLink/enterAmount.svelte";
  import ManualAddress from "$lib/createLink/manualAddress.svelte";
  import EnterDescription from "$lib/createLink/enterDescription.svelte";

  let viewState: CreateLinkStep = CreateLinkStep.ChooseMethod;

  let paymentRequest = PaymentRequest {
    address = "",
    amount = "",
    handle = Option.none()
  }
</script>
{#if viewState === CreateLinkStep.ChooseMethod}
  <ChooseMethod bind:viewState />
{:else if viewState === CreateLinkStep.AutomaticAddress}
  <AutomaticAddress bind:viewState bind:paymentRequest/>
{:else if viewState === CreateLinkStep.EnterAmount}
  <EnterAmount bind:viewState />
{:else if viewState === CreateLinkStep.EnterDescription}
  <EnterDescription bind:viewState />
{:else if viewState === CreateLinkStep.ShareLink}
  <ShareLink bind:viewState />
{:else if viewState === CreateLinkStep.ComfirmAddress}
  <ComfirmAddress bind:viewState />
{:else if viewState === CreateLinkStep.ManualAddress}
  <ManualAddress bind:viewState />
{:else}
  <h1 class="text-red-500">404 view state not found</h1>
{/if}
