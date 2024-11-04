import { useState, useEffect, useCallback } from "react";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import ShareLink from "./shareLink";
import NoWalletQuestion from "./noWalletQuestion";
import EnterAdaAmount from "./enterAdaAmount";
import { StateOptions } from "../types";
import NavigatorButtons from "./navigatorButtons";
import EnterRecieveAddress from "./enterRecieveAddress";
import ConnectWallet from "./connectWallet";

const LinkBuilder = () => {
    const [state, setState] = useState<StateOptions>(StateOptions.ConnectWallet);

    const { connected, wallet } = useWallet();

    // const [adaAmount, setAdaAmount] = useState('');
    const [lovelaceAmount, setLovelaceAmount] = useState('');
    const [address, setAddress] = useState<string>('');

    const get_address = useCallback(async () => {
        const addresses = await wallet.getUnusedAddresses();
        console.log(addresses[0])
        return addresses[0]
    }, [wallet])

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
    }, [address, get_address, connected]);

    function create_link(addr: string, lovelace: string): string {
        return ("https://zoofpay.com/?to=" + addr + "&a=" + lovelace);
    }


    const renderView = () => {
        switch (state) {
            case StateOptions.ConnectWallet:
                return (
                    <div
                        style={{
                            display: 'grid',
                            height: '90vh',
                            gridTemplateColumns: '100vw',
                            gridTemplateRows: '50% 50%',
                            justifyItems: 'center'
                        }}
                    >
                        <ConnectWallet connected={connected} wallet={wallet} />
                        <NavigatorButtons
                            setState={setState}
                            showNext={connected}
                            previous={StateOptions.EnterRecieveAddres}
                            next={StateOptions.EnterAdaAmount}
                        />
                    </div>
                )
            case StateOptions.EnterAdaAmount:
                return (
                    <div
                        style={{
                            display: 'grid',
                            height: '90vh',
                            gridTemplateColumns: '100vw',
                            gridTemplateRows: '25% 25% 35%',
                            justifyItems: 'center'
                        }}
                    >
                        <EnterAdaAmount lovelaceAmount={lovelaceAmount} setLovelaceAmount={setLovelaceAmount} />
                        <NavigatorButtons
                            setState={setState}
                            showNext={lovelaceAmount !== ''}
                            previous={StateOptions.ConnectWallet}
                            next={StateOptions.ShareLink}
                        />
                    </div>
                )
            case StateOptions.ShareLink:
                return (
                    <>
                        <ShareLink url={create_link(address, lovelaceAmount)} />
                    </>
                );
            case StateOptions.EnterRecieveAddres:
                return (
                    <div
                        style={{
                            display: 'grid',
                            height: '90vh',
                            gridTemplateColumns: '100vw',
                            gridTemplateRows: '70% 30%',
                            justifyItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <EnterRecieveAddress address={address} setAddress={setAddress} />
                        <NavigatorButtons
                            setState={setState}
                            showNext={address !== ''}
                            previous={StateOptions.ConnectWallet}
                            next={StateOptions.EnterAdaAmount}
                        />
                    </div>
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