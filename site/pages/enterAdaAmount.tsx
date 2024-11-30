import { NextPage } from "next";
import NextButton from "./nextButton";
import Checkbox from "./checkbox";
import { StateOptions } from "@/types";

interface EnterAdaAmountProps {
    lovelaceAmount: string;
    setLovelaceAmount: React.Dispatch<React.SetStateAction<string>>;
    setOpenRequest: React.Dispatch<React.SetStateAction<boolean>>;
    openRequest: boolean
    setState: React.Dispatch<React.SetStateAction<StateOptions>>;
}

const EnterAdaAmount: NextPage<EnterAdaAmountProps> = (
    {
        lovelaceAmount,
        setLovelaceAmount,
        setOpenRequest,
        openRequest,
        setState
    }) => {

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
                        fontSize: '40pt',
                        textAlign: 'center',
                        outline: 'none',
                        border: 'none'
                    }}
                />
                <span
                    aria-label="ada"
                    style={{
                        margin: '1vw',
                        fontSize: '40pt'
                    }}
                >₳</span>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '100vw',
                    gridTemplateRows: '300px 300px 300px',
                    height: '240pt',
                    justifyItems: 'center',
                    alignItems: 'center'
                }}
            >
                <Checkbox
                    state={openRequest}
                    setState={setOpenRequest}
                    content="Let people decide how much they want to give"
                />
                <NextButton
                    setState={setState}
                    showNext={lovelaceAmount !== '' || openRequest}
                    next={StateOptions.ShareLink}
                    text="next"
                />
            </div>
        </>
    );
};

export default EnterAdaAmount;
