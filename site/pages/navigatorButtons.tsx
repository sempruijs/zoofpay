import { NextPage } from "next";
import { StateOptions } from "../types";

interface NavigatorButtons {
    setState: React.Dispatch<React.SetStateAction<StateOptions>>;
    showNext: boolean;
    previous: StateOptions;
    next: StateOptions;
}

const NavigatorButtons: NextPage<NavigatorButtons> = ({ setState, showNext, previous, next }) => {
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
                className="big-button"
                style={{
                    backgroundColor: showNext ? '#7220ff' : '#dfdfdf'
                }}
                onClick={() => setState(next)}
            >
                Next
            </button>
            <button
                className="previous-color big-button"
                onClick={() => setState(previous)}
            >
                Previous
            </button>
        </div>
    )
};

export default NavigatorButtons;