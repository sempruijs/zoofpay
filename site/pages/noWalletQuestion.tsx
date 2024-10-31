import { NextPage } from "next";
import Link from 'next/link';

const NoWalletQuestion: NextPage = () => {
    return (
        <p>
            Don&apos;t have a wallet yet?
            <Link href="/walletHelp">We can help</Link>
        </p>
    );
};

export default NoWalletQuestion;

