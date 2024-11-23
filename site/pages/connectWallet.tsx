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
        <CardanoWallet />
    )
}

export default ConnectWallet;