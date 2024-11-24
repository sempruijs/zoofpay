import { NextPage } from "next";
import { BrowserWallet } from "@meshsdk/core";
import { CardanoWallet } from '@meshsdk/react';
import NavigatorButtons from "./navigatorButtons";
import { StateOptions } from "../types";
import NextButton from "./nextButton";

interface EnterRecieveAddressProps {
    wallet: BrowserWallet;
    address: string;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    setState: React.Dispatch<React.SetStateAction<StateOptions>>;
    connected: boolean,
}

const EnterRecieveAddress: NextPage<EnterRecieveAddressProps> = (
    {
        address,
        setAddress,
        setState,
        connected
    }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handlePasteClick = async () => {
        try {
            const text = await navigator.clipboard.readText();
            console.log("Clipboard content:", text); // Debugging line
            setAddress(text);
        } catch (error) {
            console.error("Failed to paste content from clipboard:", error);
        }
    };

    return (
        <div>
            <h1 className="big-title">Enter recieve address</h1>
            <h3>Automatically</h3>
            <p>You do not have to copy paste your address with a supported cardano wallet.</p>
            <CardanoWallet />
            {!connected && (
                <>
                    <h3>Manually</h3>
                    <p>Usefull for cardano wallets that are not integrated with your browser.</p>
                    <input
                        type="text"
                        value={address}
                        onChange={handleInputChange}
                        placeholder="Enter or paste address"
                    />
                    <button onClick={handlePasteClick}>Paste</button>
                </>
            )}
            <NextButton
                setState={setState}
                showNext={address !== ''}
                next={StateOptions.EnterDescription}
            />
        </div>
    );
};

export default EnterRecieveAddress;