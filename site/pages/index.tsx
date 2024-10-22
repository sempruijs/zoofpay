import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import { Transaction } from '@meshsdk/core';
import { useSearchParams } from "next/navigation";
import LinkBuilder from './linkBuilder';
// import { get } from "http";

const Home: NextPage = () => {
  const { connected, wallet } = useWallet();

  const searchParams = useSearchParams();

  const to_addres = searchParams.get("to");
  const amount_in_lovelace = searchParams.get("a");

  const pay_mode = to_addres != null

  async function get_address(): Promise<string> {
    const addresses = await wallet.getUnusedAddresses();
    console.log(addresses[0])
    return addresses[0]
  }

  async function send_ada(addr: string, amount: string) {
    const tx = new Transaction({ initiator: wallet })
      .sendLovelace(
        addr,
        amount
      );

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log(txHash)
  }

  const [address, setAddress] = useState<string | null>(null);

  // Fetch the address when the component mounts
  useEffect(() => {
    if (connected) {
      const fetchAddress = async () => {
        const addr = await get_address();
        console.log(addr);
        setAddress(addr); // Set the address to state
        console.log(address)
      };

      fetchAddress();
    }
  }, [connected]);

  return (
    <div>
      <h1>Create payment request</h1>
      <CardanoWallet />
      {!connected && (
        <p>This will fetch your cardano recieve addres for your payment request.</p>
      )}
      {connected && !pay_mode && (
        <>
          {address ? (
            <LinkBuilder addr={address} />
          ) : (
            <h1>fetching address</h1>
          )}

        </>
      )
      }
      {connected && pay_mode && (
        <>
          <button
            type="button"
            onClick={() => {
              if (amount_in_lovelace != null) {
                send_ada(to_addres, amount_in_lovelace)
              }
            }}
          >
            send ada to addres
          </button>
        </>
      )
      }
    </div >
  );
};

export default Home;
