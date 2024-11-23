import { NextPage } from "next";
import { BrowserWallet } from "@meshsdk/core";
import { CardanoWallet } from '@meshsdk/react';

interface EnterRecieveAddressProps {
    wallet: BrowserWallet;
    address: string;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const EnterRecieveAddress: NextPage<EnterRecieveAddressProps> = ({ address, setAddress }) => {
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
            <h3>Manually</h3>
            <p>Usefull for cardano wallets that are not integrated with your browser.</p>
            <input
                type="text"
                value={address}
                onChange={handleInputChange}
                placeholder="Enter or paste address"
            />
            <button onClick={handlePasteClick}>Paste</button>
        </div>
    );
};

export default EnterRecieveAddress;