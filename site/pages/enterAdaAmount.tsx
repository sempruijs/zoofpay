import { NextPage } from "next";

interface DonateToZoofpayProps {
    lovelaceAmount: string;
    setLovelaceAmount: React.Dispatch<React.SetStateAction<string>>;
}

const EnterAdaAmount: NextPage<DonateToZoofpayProps> = ({ lovelaceAmount, setLovelaceAmount }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAdaAmount = event.target.value;
        let lovelace = ada_to_lovelace(newAdaAmount); // Use newAdaAmount directly
        setLovelaceAmount(lovelace);
        // let link = create_link(address ?? '', lovelace);
        // setLink(link);
    };

    function ada_to_lovelace(x: string): string {
        if (x === '') {
            return '';
        } else {
            const ada: number = parseInt(x, 10);
            const lovelace: number = ada * 1000000;
            return lovelace.toString();
        }
    }

    function lovelace_to_ada(x: string): string {
        if (x === '') {
            return '';
        } else {
            const lovelace: number = parseInt(x, 10);
            const ada: number = lovelace / 1000000;
            return ada.toString();
        }
    }

    return (
        <>
            <h1 className="big-title">Enter ada amount</h1>
            <div>
                <input
                    type="text"
                    id="my-text-field"
                    value={lovelace_to_ada(lovelaceAmount)}
                    onChange={handleInputChange}
                    placeholder="Enter ada amount"
                />
                <span aria-label="ada">₳</span>
            </div>
        </>
    );
};

export default EnterAdaAmount;
