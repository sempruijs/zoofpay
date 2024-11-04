import { useState } from "react";
import { useWallet } from '@meshsdk/react';
import { NextPage } from "next";
import { Transaction } from '@meshsdk/core';
import ThankYou from './thankYou';
import QRCodeView from "./qrcode";
import TransactionSummery from "./transaction-summery";
import DonateToZoofpay from "./donateToZoofpay";
import NavigatorButtons from "./navigatorButtons";
import { StateOptions } from "../types";
import ConnectWallet from "./connectWallet";
interface PaymentRequestProps {
    to_addres: string;
    amount_in_lovelace: string;
}

const PaymentRequest: NextPage<PaymentRequestProps> = ({ to_addres, amount_in_lovelace }) => {
    const [state, setState] = useState<StateOptions>(StateOptions.ConnectWallet);

    const { connected, wallet } = useWallet();

    const [donate, setDonate] = useState(false);
    const [txHash, setTxHash] = useState("");

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
                    <ConnectWallet
                        connected={connected}
                        wallet={wallet}
                        setState={setState}
                        next={StateOptions.PayNow}
                        noWallet={StateOptions.QRCode}
                    />
                );
            case StateOptions.QRCode:
                return (
                    <div
                        style={{
                            display: 'grid',
                            height: '90vh',
                            gridTemplateColumns: '100vw',
                            gridTemplateRows: '20% 50% 30%',
                            justifyItems: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <QRCodeView to_addres={to_addres} amount_in_lovelace={amount_in_lovelace} />
                        <NavigatorButtons
                            setState={setState}
                            next={StateOptions.ThankYou}
                            previous={StateOptions.ConnectWallet}
                            showNext={true}
                        />
                    </div>
                );
            case StateOptions.PayNow:
                return (
                    <div
                        style={{
                            display: 'grid',
                            height: '90vh',
                            gridTemplateColumns: '100vw',
                            gridTemplateRows: '15% 40% 45%',
                            justifyItems: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <h1 className="big-title">You will pay</h1>
                        <TransactionSummery
                            amount_in_lovelace={amount_in_lovelace}
                        />
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '100vw',
                                gridTemplateRows: '20% 40% 40%',
                                justifyItems: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <DonateToZoofpay donate={donate} setDonate={setDonate} />
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