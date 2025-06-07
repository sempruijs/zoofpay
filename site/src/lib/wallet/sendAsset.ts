import { Effect } from "effect";
import { MeshTxBuilder } from "@meshsdk/core";
import { Wallet } from "$lib/wallet";
import { type Amount } from "$lib/paymentRequest"; 

export const sendAssets = (
  amount: Amount,
  asset: string,
  address: string
) =>
  Effect.gen(function* (_) {
    const w = yield* _(Wallet);
    const utxos = yield* _(w.getUtxos);
    const changeAddress = yield* _(w.getChangeAddress);

    const txBuilder = new MeshTxBuilder();

    const unsignedTx = yield* _(
      Effect.tryPromise({
        try: () =>
          txBuilder
            .txOut(
              address,
              [{ unit: asset, quantity: amount }],
            )
            .changeAddress(changeAddress)
            .selectUtxosFrom(utxos)
            .complete(),
        catch: (e) => new Error("Failed to build transaction: " + String(e)),
      }),
    );

    const signedTx = yield* _(w.signTx(unsignedTx));

    const txHash = yield* _(w.submitTx(signedTx));
    return txHash;
  });

const explorerLink = (txHash: string) => `https://cexplorer.io/tx/${txHash}`;
