import { NextPage } from "next";

interface ShareLinkProps {
    url: string;
}

const ShareLink: NextPage<ShareLinkProps> = ({ url }) => {
    return (
        <>
            <h1>{url}</h1>
        </>
    )
};

export default ShareLink;