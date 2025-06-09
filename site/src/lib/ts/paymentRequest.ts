import { Data, Effect, Option } from "effect";

export type PaymentRequest = {
  version: number,
  address: Address;
  description: Option.Option<string>;
  handle: Option.Option<string>;
  asset: Asset;
  variant: PaymentVariant;
}

export type Payment = {
  quantity: Quantity,
  asset: Asset,
  address: Address
}

type Asset = Data.TaggedEnum<{
  Lovelace: {}
  //TODO add more tokens
}>

type PaymentVariant = Data.TaggedEnum<{
  Open: { readonly suggestion: Option.Option<Quantity> }
  Closed: { readonly quantity: Quantity }
}>

// You can read this as bigInt
export type Quantity = string & { readonly __brand: "Quantity" };
export type Address = string & { readonly __brand: "Address"};

export const quantityToAda = (quantity: Quantity): string => {
  const lovelace = parseInt(quantity, 10);

  if (isNaN(lovelace)) {
    throw new Error(`Invalid quantity: ${quantity}`);
  }

  return (lovelace / 1_000_000).toString(); // Removes trailing zeros automatically
};

export const parseAdaToLovelace = (ada: string) =>
  Effect.gen(function* (_) {
    const parsed = parseFloat(ada);

    if (isNaN(parsed)) {
      yield* _(Effect.fail(new Error(`Invalid ADA amount: "${ada}"`)));
    }

    const lovelace = Math.round(parsed * 1_000_000).toString() as Quantity;
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
      variant: parsed.variant,
      description: Option.fromNullable(parsed.description),
      handle: Option.fromNullable(parsed.handle),
      asset: parsed.asset,
    };

    return paymentRequest;
  })
