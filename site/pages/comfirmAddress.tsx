import { NextPage } from "next";
import { StateOptions } from "../types";

interface ComfirmAddressProps {
    address: string;
    setState: React.Dispatch<React.SetStateAction<StateOptions>>;
}

const ComfirmAddress: NextPage<ComfirmAddressProps> = (
    {
        address,
        setState,
    }) => {

    function short_addr(address: string): string {
        if (address.length <= 10) {
            return address;
        }
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    }

    return (
        <>
            <h1>Is this your address?</h1>
            <p>{short_addr(address)}</p>
        </>
    )
}

export default ComfirmAddress;
