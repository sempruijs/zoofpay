import { NextPage } from "next";
import { BrowserWallet } from "@meshsdk/core";
import { CardanoWallet } from '@meshsdk/react';
import NextButton from "./nextButton";
import { StateOptions } from "../types";

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
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '100vw',
                gridTemplateRows: '100px 400px 500px 200px',
                justifyItems: 'center',
                alignItems: 'center',
            }}
        >
            <h1 className="big-title">Enter recieve address</h1>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '100vw',
                    gridTemplate: '20% 20% 60%',
                    justifyItems: 'center',
                    alignItems: 'center'
                }}
            >
                <h3
                    style={{
                        fontSize: '30pt',
                        fontWeight: 'bold'
                    }}
                >
                    With browser wallet
                </h3>
                <p>You do not have to copy paste your address with a supported cardano wallet.</p>
                <CardanoWallet />
            </div>
            {!connected && (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '100vw',
                        gridTemplate: '20% 20% 60%',
                        justifyItems: 'center',
                        alignItems: 'center'
                    }}
                >
                    <h3
                        style={{
                            fontSize: '30pt',
                            fontWeight: 'bold'
                        }}
                    >
                        Manually
                    </h3>
                    <p>Usefull for cardano wallets that are not integrated with your browser but more vulmerable for adress typo mistakes.</p>
                    <div>
                        <input
                            type="text"
                            value={address}
                            onChange={handleInputChange}
                            placeholder="Enter or paste address"
                        />
                        <button onClick={handlePasteClick}>Paste</button>
                    </div>
                </div>
            )}
            <NextButton
                setState={setState}
                showNext={address !== ''}
                next={connected ? StateOptions.EnterDescription : StateOptions.ComfirmAddress}
                text="Next"
            />
        </div>
    );
};

export default EnterRecieveAddress;