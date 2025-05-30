import { Option } from "effect";

export type PaymentRequest = {
  address: string;
  amount: string;
  handle: Option.Option<string>;
}

export function paymentRequestToUrl(pr: PaymentRequest): string {
  const baseUrl = 'https://zoofpay.com/';
  const params = new URLSearchParams();

  params.set('to', pr.address);
  params.set('a', pr.amount);

  return `${baseUrl}?${params.toString()}`;
}
