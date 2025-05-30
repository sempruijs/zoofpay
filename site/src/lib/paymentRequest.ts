import { Option } from "effect";

export type PaymentRequest = {
  address: string;
  amount: string;
  description: Option.Option<string>;
  open: boolean;
  handle: Option.Option<string>;
  cnt: string;
}

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
