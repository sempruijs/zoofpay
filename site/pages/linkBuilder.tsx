import { useState, useEffect } from "react";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import ShareLink from "./shareLink";
import NoWalletQuestion from "./noWalletQuestion";
import EnterAdaAmount from "./enterAdaAmount";
import { StateOptions } from "./types";
import NavigatorButtons from "./navigatorButtons";
import EnterRecieveAddress from "./enterRecieveAddress";

const LinkBuilder = () => {
    const [state, setState] = useState<StateOptions>(StateOptions.ConnectWallet);

    const { connected, wallet } = useWallet();

    // const [adaAmount, setAdaAmount] = useState('');
    const [lovelaceAmount, setLovelaceAmount] = useState('');

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

    const [address, setAddress] = useState<string>('');

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
                        <NavigatorButtons
                            setState={setState}
                            showNext={lovelaceAmount !== ''}
                            previous={StateOptions.ConnectWallet}
                            next={StateOptions.ShareLink}
                        />
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
                        <EnterRecieveAddress address={address} setAddress={setAddress} />
                        <NavigatorButtons
                            setState={setState}
                            showNext={address !== ''}
                            previous={StateOptions.ConnectWallet}
                            next={StateOptions.EnterAdaAmount}
                        />
                    </>
                )
            default:
                return null
        }
    };

    return (
        <div className="center">
            {renderView()}
        </div>
    );
};

export default LinkBuilder;