import { useState } from "react";
import type { NextPage } from "next";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import { Transaction } from '@meshsdk/core';
import { useSearchParams } from "next/navigation";

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState('');
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const to_addres = searchParams.get("to");
  const amount_in_lovelace = searchParams.get("a");

  function get_tx_info() {
    if (to_addres != null && amount_in_lovelace != null) {
      return (to_addres, amount_in_lovelace);
    }
    return ('', '')
  }

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      setAssets(_assets);
      setLoading(false);
    }
  }

  async function get_address(): Promise<string> {
    let addresses = await wallet.getUnusedAddresses();
    console.log(addresses[0])
    return addresses[0]
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update state with the current value
  };

  async function send_ada(addr: string, amount: string) {
    const tx = new Transaction({ initiator: wallet })
      .sendLovelace(
        addr,
        amount
      );

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
  }

  return (
    <div>
      <h1>Create payment request</h1>
      <CardanoWallet />
      {connected && (
        <>
          <h1>{to_addres}</h1>
          <h1>{amount_in_lovelace}</h1>
          <h1>enter ada amount</h1>
          <input
            type="text"
            id="my-text-field"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type something..."
          />
          <button
            type="button"
            onClick={() => {
              send_ada(to_addres, amount_in_lovelace)
            }}
          >
            send 2 ada to saas
          </button>
          <h1>Get Wallet Assets</h1>
          {assets ? (
            <pre>
              <code className="language-js">
                {JSON.stringify(assets, null, 2)}
              </code>
            </pre>
          ) : (
            <button
              type="button"
              onClick={() => getAssets()}
              disabled={loading}
              style={{
                margin: "8px",
                backgroundColor: loading ? "orange" : "grey",
              }}
            >
              Get Wallet Assets
            </button>
          )}
        </>
      )
      }
    </div >
  );
};

export default Home;
