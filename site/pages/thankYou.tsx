import { NextPage } from "next";

interface ThankYouProps {
    txHash: string;
}

const ThankYou: NextPage<ThankYouProps> = ({ txHash }) => {
    function txHashToCardanoScan(txHash: string): string {
        return "https://cardanoscan.io/transaction/" + txHash;
    }

    const cardanoscanLink = txHashToCardanoScan(txHash);

    return (
        <>
            <div className="center">
                <h1 className="big-title">Thank You!</h1>
                {txHash ? (
                    <p>
                        View transaction on:
                        <a href={cardanoscanLink}>cardanoscan</a>
                    </p>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default ThankYou;