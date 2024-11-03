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
        <div
            style={{
                display: 'grid',
                height: '90vh',
                gridTemplateColumns: '100%',
                gridTemplateRows: '50% 50%',
                justifyItems: 'center'
            }}
        >
            <h1 className="big-title">Share payment request</h1>
            <button
                className="big-button next-color"
                onClick={handleCopyToClipboard}
            >
                Copy link
            </button> {/* Copy to clipboard button */}
        </div>
    )
};

export default ShareLink;