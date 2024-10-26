import { NextPage } from "next";

interface TransactionSummeryProps {
    to_addres: string;
    amount_in_lovelace: string;
    donate: boolean;
}

const TransactionSummery: NextPage<TransactionSummeryProps> = ({ to_addres, amount_in_lovelace, donate }) => {

    function shorten_addr(addr: string): string {
        if (addr != null && addr != undefined) {
            const start = addr.slice(0, 8);     // First 8 characters
            const end = addr.slice(-6);         // Last 6 characters
            return `${start}.....${end}`;
        } else {
            return '';
        }
    }

    const short_addr = shorten_addr('addr1qyvt4enyyra4ss3q7qugzwf60r8lxggj8tvdd356pj5ez93024gfv5ckw0h2vg0t64ww3aep2gljy3nyyjrgs2ua0e4smx5sxa');

    return (
        <div>
            {/* <h1>bla {to_addres}</h1> */}
            <h1>{short_addr}</h1>
        </div>
    );
};

export default TransactionSummery;