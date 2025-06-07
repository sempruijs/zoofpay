import { Effect, Option } from "effect";

export type PaymentRequest = {
  version: number,
  address: Address;
  description: Option.Option<string>;
  handle: Option.Option<string>;
  asset: Asset;
  variant: PaymentVariant;
}

export const PaymentVariant = {
  open: (suggestion: Option.Option<Quantity>): PaymentVariant => ({
    type: "open",
    suggestion,
  }),
  closed: (amount: Quantity): PaymentVariant => ({
    type: "closed",
    amount,
  }),
} as const;

export type PaymentVariant =
  | { type: "open"; suggestion: Option.Option<Quantity> }
  | { type: "closed"; amount: Quantity };

export const Asset = {
  Lovelace: "lovelace",
  //TODO: support more tokens
} as const;

export type Asset = typeof Asset[keyof typeof Asset];

// You can read this as bigInt
export type Quantity = string & { readonly __brand: "Quantity" };
export type Address = string & { readonly __brand: "Address"};

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

  const jsonSerializable = {
    ...pr,
    description: Option.getOrNull(pr.description),
    handle: Option.getOrNull(pr.handle),
  };

  const json = JSON.stringify(jsonSerializable);
  const base64 = btoa(json); // base64 encode

  return `${baseUrl}pay/?pr=${encodeURIComponent(base64)}`;
}

export const paymentRequestFromBase64 = (data: string) =>
  Effect.gen(function* (_) {
    const decoded = atob(decodeURIComponent(data));
    const parsed = JSON.parse(decoded);

    const paymentRequest: PaymentRequest = {
      address: parsed.address,
      version: parsed.version,
      amount: parsed.amount as Lovelace,
      description: parsed.description != null
        ? Option.some(parsed.description)
        : Option.none(),
      open: parsed.open,
      handle: parsed.handle != null
        ? Option.some(parsed.handle)
        : Option.none(),
      cnt: parsed.cnt,
    };

    return paymentRequest;
  })
