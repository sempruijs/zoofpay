import { NextPage } from "next";
import { StateOptions } from "../types";

interface NextButtonProps {
    setState: React.Dispatch<React.SetStateAction<StateOptions>>;
    showNext: boolean;
    next: StateOptions;
}

const NextButton: NextPage<NextButtonProps> = (
    {
        setState,
        showNext,
        next
    }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '100vw',
            gridTemplateRows: '50% 50%',
            justifyItems: 'center',
            height: '220px'
        }}>
            <button
                disabled={!showNext}
                className={showNext ? "big-button next-color" : "big-button disabled-color"}
                onClick={() => setState(next)}
            >
                Next
            </button>
        </div>
    )
};

export default NextButton;