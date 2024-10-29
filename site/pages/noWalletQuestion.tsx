import { NextPage } from "next";

const NoWalletQuestion: NextPage = () => {
    return (
        <p>
            Don&apos;t have a wallet yet?
            {/* todo make wallet support page. */}
            <a href="https://pizzagezond.nl">We can help.</a>
        </p>
    );
};

export default NoWalletQuestion;

