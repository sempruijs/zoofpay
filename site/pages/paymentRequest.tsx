import { useState, useEffect } from "react";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import { NextPage } from "next";
import { Transaction } from '@meshsdk/core';

interface PaymentRequestProps {
    to_addres: string;
    amount_in_lovelace: string;
}

const PaymentRequest: NextPage<PaymentRequestProps> = ({ to_addres, amount_in_lovelace }) => {
    const { connected, wallet } = useWallet();

    const amount_in_ada = lovelace_to_ada(amount_in_lovelace);

    // amount is in lovelace
    async function send_ada(addr: string, amount: string) {
        const tx = new Transaction({ initiator: wallet })
            .sendLovelace(
                "addr1q8ja7ny7rf8ty6gs3d298kyw4cwl8yaets0pg9tm944kjatsu6zkeupreealc2urfwyct3le8se8adqmt0q52fg5653sy0a4dq",
                amount
            );

        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        console.log(txHash)
    }

    function lovelace_to_ada(x: string): string {
        const lovelace: number = parseInt(x, 10);
        const ada: number = lovelace / 1000000;
        return ada.toString();
    }

    return (
        <>
            <h1>You will pay {amount_in_ada} ada</h1>
            <h3>Connect to pay</h3>
            <CardanoWallet />
            {connected && (
                <>
                    <button
                        type="button"
                        onClick={() => {
                            send_ada(to_addres, amount_in_lovelace)
                        }}
                    >
                        send {amount_in_ada} ada to addres
                    </button>
                </>
            )}

        </>
    );
};

export default PaymentRequest;