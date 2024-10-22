import { useState } from "react";

type LinkBuilderProps = {
    addr: string; // Define a type for props that includes addr as a string
};

const LinkBuilder: React.FC<LinkBuilderProps> = ({ addr }) => {
    const [adaAmount, setAdaAmount] = useState('');
    const [link, setLink] = useState<string | null>(null);

    function ada_to_lovelace(x: string): string {
        const ada: number = parseInt(x, 10);
        const lovelace: number = ada * 1000000;
        return lovelace.toString();
    }

    function create_link(addr: string, lovelace: string): string {
        return ("http://localhost:3000/?to=" + addr + "&a=" + lovelace);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdaAmount(event.target.value); // Update state with the current value
        setLink(null); // Hide the link when the text field changes
    };

    const handleGenerateLink = () => {
        if (adaAmount.trim() !== '') { // Check if adaAmount is not empty
            const lovelace = ada_to_lovelace(adaAmount);
            const generatedLink = create_link(addr, lovelace);
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

    return (
        <>
            <input
                type="text"
                id="my-text-field"
                value={adaAmount}
                onChange={handleInputChange}
                placeholder="Enter ada amount"
            />
            {adaAmount.trim() !== '' && ( // Show button only if adaAmount is not empty
                <button onClick={handleGenerateLink}>Generate Link</button>
            )}
            {link && (
                <div>
                    <p>{link}</p>
                    <button onClick={handleCopyToClipboard}>Copy to Clipboard</button> {/* Copy to clipboard button */}
                </div>
            )}
        </>
    );
};

export default LinkBuilder;