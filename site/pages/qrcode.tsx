import { NextPage } from "next";
import QRCode from 'react-qr-code';

interface QRCodeProps {
    to_addres: string;
    amount_in_lovelace: string;
}

const QRCodeView: NextPage<QRCodeProps> = ({ to_addres, amount_in_lovelace }) => {
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
        <div className="center">
            <h1 className="big-title">Send {amount_in_ada} ada to:</h1>
            <QRCode value={to_addres} size={200} />
            <button onClick={handleCopyToClipboard}>Copy address</button> {/* Copy to clipboard button */}
        </div>
    );
};

export default QRCodeView;