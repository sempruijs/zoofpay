import { NextPage } from "next";
import Feature from "./pages/feature";

const WhatIsZoofpay: NextPage = () => {
    return (
        <div
            style={{
                width: '100vw',
                height: '80vh',
                display: 'grid',
                gridTemplateColumns: '100%',
                gridTemplateRows: '100%',
                alignItems: 'center',
                padding: '50pt'
            }}
        >
            <div>
                <h1
                    style={{
                        fontSize: '5vw',
                        fontWeight: 'bold'
                    }}
                >
                    What is zoofpay?
                </h1>
                <p
                    style={{
                        maxWidth: '600pt'
                    }}
                >
                    Zoofpay is a powerful yet simple DApp built to streamline payment requests on the Cardano blockchain. Designed with ease of use, transparency, and accessibility in mind, Zoofpay allows you to create and share payment requests effortlessly. Whether you’re sending or receiving ADA, Zoofpay removes the guesswork, enabling you to connect your wallet, set an amount, and generate a secure payment link in seconds. With a focus on user empowerment and seamless transactions, Zoofpay transforms how you engage with digital payments on Cardano—faster, easier, and always in your control.
                </p>
            </div>
        </div>
    );
};

export default WhatIsZoofpay;