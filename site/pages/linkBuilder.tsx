import { useState, useEffect } from "react";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import ShareLink from "./shareLink";
import NoWalletQuestion from "./noWalletQuestion";
import EnterAdaAmount from "./enterAdaAmount";
import { StateOptions } from "./types";
import NavigatorButtons from "./navigatorButtons";
import { create } from "domain";

const LinkBuilder = () => {
    const [state, setState] = useState<StateOptions>(StateOptions.ConnectWallet);

    const { connected, wallet } = useWallet();

    // const [adaAmount, setAdaAmount] = useState('');
    const [lovelaceAmount, setLovelaceAmount] = useState('');
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

    function create_link(addr: string, lovelace: string): string {
        return ("https://zoofpay.com/?to=" + addr + "&a=" + lovelace);
    }

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
                        <EnterAdaAmount lovelaceAmount={lovelaceAmount} setLovelaceAmount={setLovelaceAmount} />
                        <NavigatorButtons setState={setState} showNext={lovelaceAmount !== ''} />
                    </>
                )
            case StateOptions.ShareLink:
                return (
                    <>
                        <ShareLink url={create_link(address, lovelaceAmount)} />
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