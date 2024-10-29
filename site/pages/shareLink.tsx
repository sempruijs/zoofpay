import { NextPage } from "next";

interface ShareLinkProps {
    url: string;
}

const ShareLink: NextPage<ShareLinkProps> = ({ url }) => {
    const handleCopyToClipboard = () => {
        if (url) {
            navigator.clipboard.writeText(url) // Use the Clipboard API to copy the link
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
            <h1>{url}</h1>
            <h3>Share payment request</h3>
            <div>
                <button onClick={handleCopyToClipboard}>Copy link</button> {/* Copy to clipboard button */}
            </div>
        </>
    )
};

export default ShareLink;