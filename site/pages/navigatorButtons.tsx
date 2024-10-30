import { NextPage } from "next";
import { StateOptions } from "./types";

interface NavigatorButtons {
    setState: React.Dispatch<React.SetStateAction<StateOptions>>;
    showNext: boolean;

}

const NavigatorButtons: NextPage<NavigatorButtons> = ({ setState, showNext }) => {
    return (
        <>
            {showNext && (

                <button
                    className="next-color big-button"
                    onClick={() => setState(StateOptions.ShareLink)}
                >
                    Next
                </button>
            )}
            <button
                className="previous-color big-button"
                onClick={() => setState(StateOptions.ConnectWallet)}
            >
                Previous
            </button>
        </>
    )
};

export default NavigatorButtons;