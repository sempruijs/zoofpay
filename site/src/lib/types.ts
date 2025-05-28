import { Option } from "effect";
export type WalletInfo = {
  name: String;
  image: String;
  version: String;
};

export type Utxo = {
  input: {
    outputIndex: number;
    txHash: string;
  };
  output: {
    address: string;
    amount: {
      unit: string;
      quantity: string;
    }[];
  };
};

export type PaymentRequest {
  address: string;
  amount: string;
  handle: Option.Option<string>;
}
