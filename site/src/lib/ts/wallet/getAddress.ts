import { Effect } from "effect";
import { Wallet } from "$lib/ts/wallet";

export function getAddress() {
  return Effect.gen(function* () {
    const wallet = yield* Wallet;
    return yield* wallet.getChangeAddress;
  });
}
