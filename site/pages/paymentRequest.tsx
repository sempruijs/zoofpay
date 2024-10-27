import { useState } from "react";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import { NextPage } from "next";
import { Transaction } from '@meshsdk/core';
import ThankYou from './thankYou';
import QRCodeView from "./qrcode";
import TransactionSummery from "./transaction-summery";

enum StateOptions {
    ConnectWallet = "ConnectWallet",
    PayNow = "PayNow",
    ThankYou = "ThankYou",
    QRCode = "QRCode"
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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDonate(event.target.checked);
    };

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

    const renderView = () => {
        switch (state) {
            case StateOptions.ConnectWallet:
                return (
                    <div className="center-horizontal-vertical">
                        <div className="center">
                            <h1 className="big-title">Connect wallet</h1>
                            <CardanoWallet />
                        </div>
                        <div className="next-previous-container">
                            {connected && (
                                <button className="next-color big-button" onClick={() => setState(StateOptions.PayNow)}>Next</button>
                            )}
                            {!connected && (
                                <div>
                                    <div className="next-previous-button">
                                        <p>
                                            Don&apos;t have a wallet yet?
                                            {/* todo make wallet support page. */}
                                            <a href="https://pizzagezond.nl">We can help.</a>
                                        </p>
                                    </div>
                                    <button
                                        className="previous-color big-button"
                                        onClick={() => setState(StateOptions.QRCode)}
                                    >
                                        Continue without a wallet.

                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case StateOptions.QRCode:
                return (
                    <div>
                        <QRCodeView to_addres={to_addres} amount_in_lovelace={amount_in_lovelace} />
                        <div className="next-previous-container">

                            <button
                                className="next-color big-button"
                                onClick={() => setState(StateOptions.ThankYou)}
                            >
                                Next
                            </button>
                            <button
                                className="previous-color big-button"
                                onClick={() => setState(StateOptions.ConnectWallet)}
                            >
                                Previous
                            </button>
                        </div>
                    </div>
                );
            case StateOptions.PayNow:
                return (
                    <div className="center">
                        <h1 className="big-title">You will pay</h1>
                        <TransactionSummery
                            amount_in_lovelace={amount_in_lovelace}
                        />
                        <div className="next-previous-container">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={donate}
                                    onChange={handleCheckboxChange}
                                />
                                Donate 2 ada to zoofpay ❤️
                            </label>


                            <button
                                className="next-color big-button"
                                type="button"
                                onClick={() => {
                                    send_ada(to_addres, amount_in_lovelace, donate)
                                }}
                            >
                                pay now
                            </button>
                            <button
                                className="previous-color big-button"
                                onClick={() => setState(StateOptions.ConnectWallet)}
                            >
                                Previous
                            </button>
                        </div>
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