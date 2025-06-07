<script lang="ts">
  import { Option } from "effect";
  import { type TxHash } from "$lib/ts/wallet/sendAsset";
  import { type PaymentRequest } from "$lib/ts/paymentRequest";

  const { txHash, paymentReqest } = $props<{
    txHash: Option.Option<TxHash>,
    paymentRequest: PaymentRequest;
  }>();

  const explorerLink = (tx: TxHash) => `https://cexplorer.io/tx/${tx as string}`;
  const link: Option.Option<string> = Option.map(txHash, (tx: TxHash) => explorerLink(tx));
</script>
<h1>Thank you</h1>
{#if Option.isSome(txHash) && Option.isSome(link)}
  <h1>txHash: {txHash.value}</h1>
  <a class="text-blue-500" href={link.value}>view on explorer</a>
{:else}
<h1>false</h1>
{/if}
