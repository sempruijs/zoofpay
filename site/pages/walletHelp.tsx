import type { NextPage } from "next";

const WalletHelp: NextPage = () => {
    return (
        <div>
            <div
                style={{
                    maxWidth: '800pt',
                    margin: 'auto',
                    padding: '0 50pt'
                }}
            >
                <h1
                    className="big-title"
                >Cardano wallet</h1>
                <p>Zoofpay shines when connected to a Cardano wallet, offering seamless, secure, and efficient transactions on the blockchain.</p>
                <h2
                    className="wallet-help-heading-2"
                >What is a Wallet?</h2>
                <p>
                    A Cardano wallet is a tool that allows you to securely manage your ADA (Cardano’s cryptocurrency) and interact with decentralized applications like Zoofpay. Think of it as a secure digital bank, where you can store, send, and receive ADA as well as connect to services on the Cardano network.
                </p>

                <h2>Which Wallet Should You Use?</h2>
                <p>
                    There are <a href="https://www.essentialcardano.io/article/wallets">many Cardano wallets</a> available, each with its own unique features and strengths. Here are a couple of recommendations to help you get started.
                </p>

                <h3>Lace</h3>
                <p>
                    Lace is a user-friendly and open-source wallet designed with simplicity in mind, making it an excellent option for those new to Cardano. It’s intuitive, reliable, and offers a great starting point for exploring Cardano’s ecosystem.
                </p>
                <p>
                    Note: Lace currently supports only Chromium-based browsers, such as Chrome, Edge, and Brave. If you need a wallet compatible with Firefox, consider using <a href="https://yoroi-wallet.com/">Yoroi</a>. You can download Lace from <a href="https://www.lace.io/">lace.io</a>.
                </p>

                <h3>Tokeo for Mobile</h3>
                <p>
                    Tokeo is optimized for speed and is built natively for mobile devices, providing an efficient user experience. While Tokeo is not open-source, it’s a popular choice for mobile users seeking a reliable, quick, and secure wallet. Learn more on the <a href="https://tokeopay.io/">Tokeo website</a>.
                </p>
            </div>
        </div>
    )
};

export default WalletHelp;