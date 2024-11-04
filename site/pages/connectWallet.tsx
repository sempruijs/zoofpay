import { useState } from "react";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import { NextPage } from "next";
import { BrowserWallet, Transaction } from '@meshsdk/core';
import ThankYou from './thankYou';
import QRCodeView from "./qrcode";
import TransactionSummery from "./transaction-summery";
import NoWalletQuestion from "./noWalletQuestion";
import DonateToZoofpay from "./donateToZoofpay";
import NavigatorButtons from "./navigatorButtons";

interface ConnectWalletProps {
    connected: boolean;
    wallet: BrowserWallet;
}

const ConnectWallet: NextPage<ConnectWalletProps> = ({ connected, wallet }) => {
    return (
        <>
            <div
                style={{

                }}
            >
                <h1 className="big-title">Connect wallet</h1>
                <CardanoWallet />
            </div>
        </>
    )
}

export default ConnectWallet;