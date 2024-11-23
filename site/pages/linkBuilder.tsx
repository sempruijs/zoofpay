import { useState, useEffect, useCallback } from "react";
import { useWallet } from '@meshsdk/react';
import ShareLink from "./shareLink";
import EnterAdaAmount from "./enterAdaAmount";
import { StateOptions } from "../types";
import NavigatorButtons from "./navigatorButtons";
import EnterRecieveAddress from "./enterRecieveAddress";
import ConnectWallet from "./connectWallet";
import Checkbox from "./checkbox";
import EnterDescription from "@/EnterDescription";

const LinkBuilder = () => {
    const [state, setState] = useState<StateOptions>(StateOptions.EnterRecieveAddres);
    const [openRequest, setOpenRequest] = useState(false);

    const { connected, wallet } = useWallet();

    // const [adaAmount, setAdaAmount] = useState('');
    const [lovelaceAmount, setLovelaceAmount] = useState('');
    const [address, setAddress] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const get_address = useCallback(async () => {
        const address = await wallet.getChangeAddress();
        return address;
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

    function create_link(addr: string, lovelace: string, open: boolean, description: string): string {
        // base
        const url = "https://zoofpay.com/?";
        // to address
        const to = "to=" + addr;
        // description
        const d = "&d=" + description;
        // amount in lovelace
        const a = "&a=" + lovelace;
        // mode, open or closed
        const m = open ? "&m=o" : "&m=c";

        return (url + to + d + a + m);
    }

    const renderView = () => {
        switch (state) {
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
                        <EnterAdaAmount
                            lovelaceAmount={lovelaceAmount}
                            setLovelaceAmount={setLovelaceAmount}
                        />
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '100vw',
                                gridTemplateRows: '20% 80%',
                                height: '240pt',
                                justifyItems: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Checkbox
                                state={openRequest}
                                setState={setOpenRequest}
                                content="Let people decide how much they want to give"
                            />
                            <NavigatorButtons
                                setState={setState}
                                showNext={lovelaceAmount !== '' || openRequest}
                                previous={StateOptions.ConnectWallet}
                                next={StateOptions.ShareLink}
                            />
                        </div>
                    </div>
                )
            case StateOptions.ShareLink:
                return (
                    <>
                        <ShareLink
                            url={create_link(address, lovelaceAmount, openRequest, description)}
                        />
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
                            next={StateOptions.EnterDescription}
                        />
                    </div>
                )
            case StateOptions.EnterDescription:
                return (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '100vw',
                            gridTemplateRows: '15% 55% 30%',
                            height: '100vh',
                            justifyItems: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <EnterDescription
                            description={description}
                            setDescription={setDescription}
                        />
                        <NavigatorButtons
                            setState={setState}
                            next={StateOptions.EnterAdaAmount}
                            previous={StateOptions.ConnectWallet}
                            showNext={true}
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