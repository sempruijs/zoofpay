import { useState, useEffect } from "react";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import { NextPage } from "next";
import { Transaction } from '@meshsdk/core';
import ThankYou from './thankYou';

enum StateOptions {
    ConnectWallet = "ConnectWallet",
    SendAda = "SendAda",
    ThankYou = "ThankYou"
}
interface PaymentRequestProps {
    to_addres: string;
    amount_in_lovelace: string;
}

const PaymentRequest: NextPage<PaymentRequestProps> = ({ to_addres, amount_in_lovelace }) => {
    const [state, setState] = useState<StateOptions>(StateOptions.ConnectWallet);

    const { connected, wallet } = useWallet();

    const [donate, setDonate] = useState(false);
    const [txHash, setTxHash] = useState("");

    const handleCheckboxChange = (event) => {
        setDonate(event.target.checked);
    };



    const amount_in_ada = lovelace_to_ada(amount_in_lovelace);

    // amount is in lovelace
    async function send_ada(addr: string, amount: string, donate: boolean) {
        let tx = new Transaction({ initiator: wallet })
            .sendLovelace(
                "addr1q8ja7ny7rf8ty6gs3d298kyw4cwl8yaets0pg9tm944kjatsu6zkeupreealc2urfwyct3le8se8adqmt0q52fg5653sy0a4dq",
                amount
            );


        if (donate) {
            tx = tx.sendLovelace(
                "addr1q9k2dmeh8wuahemw8gq8ezlkhgjkka0h57pxw7sr5k86ds3qs4ejfy2evem83nzms4q6vfmegst93qa395348jqzvrpqwl34yg",
                "2000000"
            );
        }

        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        setTxHash(txHash)
        setState(StateOptions.ThankYou)
    }

    function lovelace_to_ada(x: string): string {
        const lovelace: number = parseInt(x, 10);
        const ada: number = lovelace / 1000000;
        return ada.toString();
    }

    const renderView = () => {
        switch (state) {
            case StateOptions.ConnectWallet:
                return (
                    <div>
                        <h1>1. Connect wallet</h1>
                        <CardanoWallet />
                        {connected && (
                            <button onClick={() => setState(StateOptions.SendAda)}>Next</button>
                        )}
                    </div>
                );
            case StateOptions.SendAda:
                return (
                    <div>
                        <h1>Send ada</h1>
                        <label>
                            <input
                                type="checkbox"
                                checked={donate}
                                onChange={handleCheckboxChange}
                            />
                            Donate 2 ada to zoofpay ❤️
                        </label>
                        <button
                            type="button"
                            onClick={() => {
                                send_ada(to_addres, amount_in_lovelace, donate)
                            }}
                        >
                            pay now
                        </button>
                    </div>
                );
            case StateOptions.ThankYou:
                return (
                    <>
                        <ThankYou txHash={txHash} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {renderView()}
        </>
    );
};

export default PaymentRequest;