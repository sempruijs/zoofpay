import { NextPage } from "next";

interface DonateToZoofpayProps {
    lovelaceAmount: string;
    setLovelaceAmount: React.Dispatch<React.SetStateAction<string>>;
}

const EnterAdaAmount: NextPage<DonateToZoofpayProps> = ({ lovelaceAmount, setLovelaceAmount }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAdaAmount = event.target.value;
        const lovelace = ada_to_lovelace(newAdaAmount); // Use newAdaAmount directly
        setLovelaceAmount(lovelace);
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
                    value={lovelace_to_ada(lovelaceAmount)}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="ada-amount-textfield"
                    style={{
                        width: `${lovelace_to_ada(lovelaceAmount).length}ch`,
                        minWidth: '40pt',
                        height: '80pt',
                        fontSize: '5vw',
                        textAlign: 'center',
                        outline: 'none',
                        border: 'none'
                    }}
                />
                <span
                    aria-label="ada"
                    style={{
                        margin: '1vw',
                        fontSize: '5vw'
                    }}
                >₳</span>
            </div>
        </>
    );
};

export default EnterAdaAmount;
