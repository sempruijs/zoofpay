import { NextPage } from "next";

interface ThankYouProps {
    txHash: string;
}

const ThankYou: NextPage<ThankYouProps> = ({ to_addres, amount_in_lovelace }) => {
    function txHashToCardanoScan(txHash: string): string {
        return "https://cardanoscan.io/transaction/" + txHash;
    }

    const cardanoscanLink = txHashToCardanoScan(to_addres);

    return (
        <>
            <h1>thank you</h1>
            <div>
                <h1>Thank You!</h1>
                <p>
                    View transaction on:
                    <a href={cardanoscanLink}>cardanoscan</a>
                </p>
            </div>
        </>
    );
};

export default ThankYou;