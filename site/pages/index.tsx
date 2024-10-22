import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import { Transaction } from '@meshsdk/core';
import { useSearchParams } from "next/navigation";

const Home: NextPage = () => {
  const [adaAmount, setInputValue] = useState('');
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const to_addres = searchParams.get("to");
  const amount_in_lovelace = searchParams.get("a");

  const pay_mode = to_addres != null

  const [link, setLink] = useState<string | null>(null);

  function ada_to_lovelace(x: string): string {
    const ada: number = parseInt(x, 10);
    const lovelace: number = ada * 1000000;
    return lovelace.toString();
  }

  async function get_address(): Promise<string> {
    let addresses = await wallet.getUnusedAddresses();
    console.log(addresses[0])
    return addresses[0]
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update state with the current value
  };

  function create_link(addr: string, lovelace: string): string {
    return ("http://localhost:3000/?to=" + addr + "&a=" + lovelace);
  }

  // Use useEffect to call the async function when the component mounts or adaAmount changes
  useEffect(() => {
    // Call the async function and store the result in state
    const fetchLink = async () => {
      if (connected) {
        const addr = await get_address();
        const lovelace = ada_to_lovelace(adaAmount);
        const link = create_link(addr, lovelace);
        setLink(link);
      }
    };

    fetchLink();
  }, [adaAmount]); // Add adaAmount as a dependency to re-trigger if adaAmount changes

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
      {connected && !pay_mode && (
        <>
          <h1>enter ada amount</h1>
          <input
            type="text"
            id="my-text-field"
            value={adaAmount}
            onChange={handleInputChange}
            placeholder="Type something..."
          />
          <h3>
            {link}
          </h3>
        </>
      )
      }
      {connected && pay_mode && (
        <>

          <button
            type="button"
            onClick={() => {
              send_ada(to_addres, amount_in_lovelace)
            }}
          >
            send {adaAmount} ada to addres
          </button>
        </>
      )
      }
    </div >
  );
};

export default Home;
