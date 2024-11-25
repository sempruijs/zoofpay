import { NextPage } from "next";
import QRCode from 'react-qr-code';
import { BrowserWallet } from "@meshsdk/core";
import { CardanoWallet } from "@meshsdk/react";


interface QRCodeProps {
    to_addres: string;
    amount_in_lovelace: string;
    wallet: BrowserWallet;
    connected: boolean,
}

const QRCodeView: NextPage<QRCodeProps> = (
    {
        to_addres,
        amount_in_lovelace,
        connected,
        wallet
    }) => {
    function lovelace_to_ada(x: string): string {
        const lovelace: number = parseInt(x, 10);
        const ada: number = lovelace / 1000000;
        return ada.toString();
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(to_addres) // Use the Clipboard API to copy the link
            .then(() => {
                console.log("link copied.");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    }

    const amount_in_ada = lovelace_to_ada(amount_in_lovelace);

    return (
        <>
            <h1 className="big-title">Payment request</h1>
            <h3>Automatically with integrated wallet</h3>
            <CardanoWallet />
            {!connected && (
                <>
                    <h3>Or manually</h3>
                    {to_addres ? (
                        <QRCode value={to_addres} size={200} />
                    ) : (
                        <p>Address is not available</p>
                    )}
                    <button onClick={handleCopyToClipboard}>Copy address</button> {/* Copy to clipboard button */}
                </>
            )}
        </>
    );
};

export default QRCodeView;