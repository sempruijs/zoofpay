<script lang="ts">
  import { Equal } from "effect";
  import ChooseMethod from "$lib/components/createLink/ChooseMethod.svelte";
  import { Step, type CreateLinkStep } from "$lib/ts/createLink";

  let step: CreateLinkStep = $state(CreateLinkStepConstructor.ChooseMethod());
</script>
{#if Equal.equals(step, Step.ChooseMethod())}
  <ChooseMethod
    onAutomatic={() => {
      step = Step.AutomaticAddress();
    }}
    onManual={() => {
      step = Step.ManualAddress();
    }}
  />
{:else}
   <h1 class="text-red-500">404 view state not found</h1>
{/if}
