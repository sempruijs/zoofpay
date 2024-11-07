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

    // const short_addr = shorten_addr('addr1qyvt4enyyra4ss3q7qugzwf60r8lxggj8tvdd356pj5ez93024gfv5ckw0h2vg0t64ww3aep2gljy3nyyjrgs2ua0e4smx5sxa');
    const amount_in_ada = lovelace_to_ada(amount_in_lovelace);

    return (
        <div>
            <p className="big-title">{amount_in_ada} ₳</p>
        </div>
    );
};

export default TransactionSummery;