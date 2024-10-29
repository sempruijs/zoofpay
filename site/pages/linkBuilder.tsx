import { useState, useEffect } from "react";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import ShareLink from "./shareLink";
import NoWalletQuestion from "./noWalletQuestion";

enum StateOptions {
    ConnectWallet = "ConnectWallet",
    EnterAdaAmount = "EnterAdaAmount",
    ShareLink = "ShareLink",
    EnterRecieveAddres = "EnterRecieveAddres"
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
        const newAdaAmount = event.target.value;
        setAdaAmount(newAdaAmount);
        let lovelace = ada_to_lovelace(newAdaAmount); // Use newAdaAmount directly
        let link = create_link(address ?? '', lovelace);
        setLink(link);
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
                            <div>
                                <NoWalletQuestion />
                                <button
                                    className="previous-color big-button"
                                    onClick={() => setState(StateOptions.EnterRecieveAddres)}
                                >
                                    Continue without a wallet
                                </button>
                            </div>
                        )}
                    </>
                )
            case StateOptions.EnterAdaAmount:
                return (
                    <>
                        <h1 className="big-title">Enter ada amount</h1>
                        <div>

                            <input
                                type="text"
                                id="my-text-field"
                                value={adaAmount}
                                onChange={handleInputChange}
                                placeholder="Enter ada amount"
                            />
                            <span aria-label="ada">₳</span>
                        </div>
                        {adaAmount !== '' && (

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
                );
            case StateOptions.ShareLink:
                return (
                    <>
                        <ShareLink url={link} />
                    </>
                );
            case StateOptions.EnterRecieveAddres:
                return (
                    <>
                        <h1 className="big-title">Enter recieve address</h1>
                        <p>This will be the address where you will recieve your assets.</p>

                        <button
                            className="next-color big-button"
                            onClick={() => setState(StateOptions.EnterAdaAmount)}
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
                )
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