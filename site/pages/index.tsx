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

  return (
    <div>
      {!pay_mode && (
        <>
          <LinkBuilder />
        </>
      )}
      {/* {!pay_mode && (
        <>
          {address ? (
            <LinkBuilder addr={address} />
          ) : (
            <h1>fetching address</h1>
          )}

        </>
      )
      } */}
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
