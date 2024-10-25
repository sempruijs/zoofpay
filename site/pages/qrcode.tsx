import { NextPage } from "next";

interface QRCodeProps {
    to_addres: string;
    amount_in_lovelace: string;
}

const QRCode: NextPage<QRCodeProps> = ({ to_addres, amount_in_lovelace }) => {
    function lovelace_to_ada(x: string): string {
        const lovelace: number = parseInt(x, 10);
        const ada: number = lovelace / 1000000;
        return ada.toString();
    }

    const amount_in_ada = lovelace_to_ada(amount_in_lovelace);

    return (
        <>
            <h1>Send {amount_in_ada} ada to:</h1>
        </>
    );
};

export default QRCode;