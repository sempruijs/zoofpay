import { Effect, Option } from "effect";

export type PaymentRequest = {
  address: string;
  amount: Lovelace;
  description: Option.Option<string>;
  open: boolean;
  handle: Option.Option<string>;
  cnt: string;
}

export type Lovelace = string & { readonly __brand: "Lovelace" };

export const parseAdaToLovelace = (ada: string) =>
  Effect.gen(function* (_) {
    const parsed = parseFloat(ada);

    if (isNaN(parsed)) {
      yield* _(Effect.fail(new Error(`Invalid ADA amount: "${ada}"`)));
    }

    const lovelace: Lovelace = Math.round(parsed * 1_000_000).toString() as Lovelace;
    return lovelace;
  })

export function paymentRequestToUrl(pr: PaymentRequest): string {
  const baseUrl = 'https://zoofpay.com/';
  const params = new URLSearchParams();

  params.set('to', pr.address);
  params.set('a', pr.amount);
  if (Option.isSome(pr.description)) {
    params.set('d', pr.description.value);
  }
  const mode = pr.open ? "o" : "c";
  params.set('m', mode);

  return `${baseUrl}?${params.toString()}`;
}
