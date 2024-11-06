import { NextPage } from "next";
import Link from 'next/link';

const NoWalletQuestion: NextPage = () => {
    return (
        <p
            style={{
                marginBottom: '10pt',
                textAlign: 'center'
            }}
        >
            Don&apos;t have a wallet yet?
            <Link href="/walletHelp">We can help</Link>
        </p>
    );
};

export default NoWalletQuestion;

