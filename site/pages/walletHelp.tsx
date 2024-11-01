import type { NextPage } from "next";

const WalletHelp: NextPage = () => {
    return (
        <>
            <h1>Cardano wallet</h1>
            <p>Zoofpay really shines when you use it with a browser wallet. Sometimes it can be a bit overwelming which wallet to choose. We are here to help.</p>
            <h3>What is a wallet</h3>
            <p>A wallet can do multiple things.</p>
            <p>A wallet is a sort of bridge between a decentrilised app (DApp) and the blockchain.</p>
            {/* <p> */}
            {/* [website] <-> [wallet] <-> [blockchain] */}
            {/* </p> */}
            <p>

                So in the context of zoofpay with a wallet called lace we have:
            </p>
            {/* <p>
                [zoofpay] <-> [lace] <-> [cardano]
            </p> */}
        </>
    )
};

export default WalletHelp;