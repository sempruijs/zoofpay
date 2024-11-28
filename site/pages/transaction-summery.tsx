import { NextPage } from "next";

interface TransactionSummeryProps {
    // to_addres: string;
    amount_in_lovelace: string;
    // donate: boolean;
}

const TransactionSummery: NextPage<TransactionSummeryProps> = ({ amount_in_lovelace }) => {
    function lovelace_to_ada(x: string): string {
        const lovelace: number = parseInt(x, 10);
        const ada: number = lovelace / 1000000;
        return ada.toString();
    }

    const amount_in_ada = lovelace_to_ada(amount_in_lovelace);

    return (
        <div>
            <p className="big-title">{amount_in_ada} ₳</p>
        </div>
    );
};

export default TransactionSummery;