import { useState, useEffect } from "react";

type LinkBuilderProps = {
    addr: string; // Define a type for props that includes addr as a string
};

const LinkBuilder: React.FC<LinkBuilderProps> = ({ addr }) => {
    const [adaAmount, setInputValue] = useState('');
    const [link, setLink] = useState<string | null>(null);

    function ada_to_lovelace(x: string): string {
        const ada: number = parseInt(x, 10);
        const lovelace: number = ada * 1000000;
        return lovelace.toString();
    }

    function create_link(addr: string, lovelace: string): string {
        return ("http://localhost:3000/?to=" + addr + "&a=" + lovelace);
    }

    useEffect(() => {
        // Call the async function and store the result in state
        const fetchLink = async () => {
            // if (connected) {
            // const addr = await get_address();
            const lovelace = ada_to_lovelace(adaAmount);
            const link = create_link(addr, lovelace);
            setLink(link);
            // }
        };

        fetchLink();
    }, [adaAmount]); // Add adaAmount as a dependency to re-trigger if adaAmount changes

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value); // Update state with the current value
    };

    return (
        <>
            <input
                type="text"
                id="my-text-field"
                value={adaAmount}
                onChange={handleInputChange}
                placeholder="Enter ada amount"
            />
            <p>
                {link}
            </p>
        </>
    );
};

export default LinkBuilder;