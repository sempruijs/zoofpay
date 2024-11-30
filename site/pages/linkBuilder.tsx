import { useState, useEffect, useCallback } from "react";
import { useWallet } from '@meshsdk/react';
import ShareLink from "./shareLink";
import EnterAdaAmount from "./enterAdaAmount";
import { StateOptions } from "../types";
import EnterRecieveAddress from "./enterRecieveAddress";
import Checkbox from "./checkbox";
import EnterDescription from "@/EnterDescription";
import NextButton from "./nextButton";
import ComfirmAddress from "./comfirmAddress";

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
                            setState={setState}
                            setOpenRequest={setOpenRequest}
                            openRequest={openRequest}
                        />
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
                    <EnterRecieveAddress
                        address={address}
                        setAddress={setAddress}
                        setState={setState}
                        wallet={wallet}
                        connected={connected}
                    />
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
                        <NextButton
                            setState={setState}
                            next={StateOptions.EnterAdaAmount}
                            showNext={true}
                        />
                    </div>
                )
            case StateOptions.ComfirmAddress:
                return (
                    <>
                        <ComfirmAddress
                            address={address}
                            setState={setState}
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