import { CardanoWallet } from '@meshsdk/react';
import { NextPage } from "next";
import { BrowserWallet } from '@meshsdk/core';
import { StateOptions } from "../types";
import NoWalletQuestion from "./noWalletQuestion";

interface ConnectWalletProps {
    connected: boolean;
    wallet: BrowserWallet;
    setState: React.Dispatch<React.SetStateAction<StateOptions>>;
    noWallet: StateOptions;
    next: StateOptions;
}

const ConnectWallet: NextPage<ConnectWalletProps> = (
    { connected,
        setState,
        next,
        noWallet
    }) => {
    return (
        <div
            style={{
                display: 'grid',
                height: '90vh',
                gridTemplateColumns: '100vw',
                gridTemplateRows: '25% 40% 35%',
                justifyItems: 'center',
                alignItems: 'center'
            }}
        >
            <h1 className="big-title">Connect wallet</h1>
            <CardanoWallet />
            <div className="next-previous-container">
                {connected && (
                    <button
                        className="next-color big-button"
                        onClick={() => setState(next)}>
                        Next
                    </button>
                )}
                {!connected && (
                    <div>
                        <NoWalletQuestion />
                        <button
                            className="previous-color big-button"
                            onClick={() => setState(noWallet)}
                        >
                            Continue without a wallet.
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ConnectWallet;