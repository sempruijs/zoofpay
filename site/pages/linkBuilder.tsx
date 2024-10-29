import { useState, useEffect } from "react";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import ShareLink from "./shareLink";

enum StateOptions {
    ConnectWallet = "ConnectWallet",
    EnterAdaAmount = "EnterAdaAmount",
    ShareLink = "ShareLink"
}

const LinkBuilder = () => {
    const [state, setState] = useState<StateOptions>(StateOptions.ConnectWallet);

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
        handleGenerateLink()
        // setLink(null); // Hide the link when the text field changes
    };

    const handleGenerateLink = () => {
        if (adaAmount.trim() !== '') { // Check if adaAmount is not empty
            const lovelace = ada_to_lovelace(adaAmount);
            const generatedLink = create_link(address ?? "", lovelace);
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

    const renderView = () => {
        switch (state) {
            case StateOptions.ConnectWallet:
                return (
                    <>
                        <h1 className="big-title">Connect wallet</h1>
                        <CardanoWallet />
                        {connected && (
                            <button
                                className="next-color big-button"
                                onClick={() => setState(StateOptions.EnterAdaAmount)}
                            >
                                Next
                            </button>
                        )}
                        {!connected && (
                            <button
                                className="previous-color big-button"
                                onClick={() => setState(StateOptions.ConnectWallet)}
                            >
                                Previous
                            </button>
                        )}
                    </>
                )
            case StateOptions.EnterAdaAmount:
                return (
                    <>
                        <h3>Enter ada amount</h3>
                        <input
                            type="text"
                            id="my-text-field"
                            value={adaAmount}
                            onChange={handleInputChange}
                            placeholder="Enter ada amount"
                        />
                        <button
                            className="next-color big-button"
                            onClick={() => setState(StateOptions.ShareLink)}
                        >
                            Next
                        </button>
                        <button
                            className="previous-color big-button"
                            onClick={() => setState(StateOptions.ConnectWallet)}
                        >
                            Previous
                        </button>
                    </>
                );
            case StateOptions.ShareLink:
                return (
                    <>
                        <ShareLink url="ppizagezond" />
                        <h3>Share payment request</h3>
                        <div>
                            <button onClick={handleCopyToClipboard}>Copy link</button> {/* Copy to clipboard button */}
                        </div>
                    </>
                );
            default:
                return null
        }
    };

    return (
        <>
            {renderView()}
        </>
    );
};

export default LinkBuilder;