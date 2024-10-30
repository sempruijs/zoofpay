import { NextPage } from "next";
import { StateOptions } from "./types";

interface NavigatorButtons {
    setState: React.Dispatch<React.SetStateAction<StateOptions>>;
    showNext: boolean;
    previous: StateOptions;
    next: StateOptions;
}

const NavigatorButtons: NextPage<NavigatorButtons> = ({ setState, showNext, previous, next }) => {
    return (
        <>
            {showNext && (

                <button
                    className="next-color big-button"
                    onClick={() => setState(next)}
                >
                    Next
                </button>
            )}
            <button
                className="previous-color big-button"
                onClick={() => setState(previous)}
            >
                Previous
            </button>
        </>
    )
};

export default NavigatorButtons;