import { useState, useEffect } from "react";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';

const LinkBuilder = () => {
    const { connected, wallet } = useWallet();

    const [adaAmount, setAdaAmount] = useState('');
    const [link, setLink] = useState<string | null>(null);

    // Fetch the address when the component mounts
    useEffect(() => {
        if (connected) {
            const fetchAddress = async () => {
                const addr = await get_address();
                console.log(addr);
                setAddress(addr); // Set the address to state
                console.log(address)
            };

            fetchAddress();
        }
    }, [connected]);

    async function get_address(): Promise<string> {
        const addresses = await wallet.getUnusedAddresses();
        console.log(addresses[0])
        return addresses[0]
    }

    function ada_to_lovelace(x: string): string {
        const ada: number = parseInt(x, 10);
        const lovelace: number = ada * 1000000;
        return lovelace.toString();
    }

    function create_link(addr: string, lovelace: string): string {
        return ("https://zoofpay.com/?to=" + addr + "&a=" + lovelace);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdaAmount(event.target.value); // Update state with the current value
        setLink(null); // Hide the link when the text field changes
    };

    const handleGenerateLink = () => {
        if (adaAmount.trim() !== '') { // Check if adaAmount is not empty
            const lovelace = ada_to_lovelace(adaAmount);
            const generatedLink = create_link(address, lovelace);
            setLink(generatedLink); // Set the generated link to state
        }
    };

    const handleCopyToClipboard = () => {
        if (link) {
            navigator.clipboard.writeText(link) // Use the Clipboard API to copy the link
                .then(() => {
                    console.log("link copied.");
                })
                .catch(err => {
                    console.error("Failed to copy: ", err);
                });
        }
    };

    const [address, setAddress] = useState<string | null>(null);

    return (
        <>
            <h1>Create payment request</h1>
            <h3>1. Connect wallet</h3>
            <CardanoWallet />
            {connected && (
                <>
                    <h3>2. Enter ada amount</h3>
                    <input
                        type="text"
                        id="my-text-field"
                        value={adaAmount}
                        onChange={handleInputChange}
                        placeholder="Enter ada amount"
                    />
                    {
                        adaAmount.trim() !== '' && ( // Show button only if adaAmount is not empty
                            <button onClick={handleGenerateLink}>Generate Link</button>
                        )
                    }
                    {
                        link && (
                            <>
                                <h3>3. Share payment request</h3>
                                <div>
                                    <button onClick={handleCopyToClipboard}>Copy link</button> {/* Copy to clipboard button */}
                                </div>
                            </>
                        )
                    }
                </>
            )}
        </>
    );
};

export default LinkBuilder;