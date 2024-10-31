import { NextPage } from "next";

interface EnterRecieveAddressProps {
    address: string;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const EnterRecieveAddress: NextPage<EnterRecieveAddressProps> = ({ address, setAddress }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handlePasteClick = async () => {
        try {
            const text = await navigator.clipboard.readText();
            console.log("Clipboard content:", text); // Debugging line
            setAddress(text);
        } catch (error) {
            console.error("Failed to paste content from clipboard:", error);
        }
    };

    return (
        <div>
            <h1 className="big-title">Enter recieve address</h1>
            <p>This will be the address where you will recieve your assets.</p>
            <input
                type="text"
                value={address}
                onChange={handleInputChange}
                placeholder="Enter or paste address"
            />
            <button onClick={handlePasteClick}>Paste</button>
        </div>
    );
};

export default EnterRecieveAddress;