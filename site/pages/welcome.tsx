import { NextPage } from "next"
import Link from "next/link";

const Welcome: NextPage = () => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '100vw',
                gridTemplateRows: '60% 40%',
                height: '80vh',
                textAlign: 'center',
                alignItems: 'center'
            }}
        >
            <div>
                <h1 style={{
                    fontSize: '10vw',
                    fontWeight: 'bolder'
                }}
                >
                    zoofpay
                </h1>
                <p style={{
                    fontSize: '3vw'
                }}
                >
                    Easily create payment requests for Cardano
                </p>
            </div>
            <Link href="/new">
                <p className="create-link-button">
                    Create payment request
                </p>
            </Link>
        </div>
    );
};

export default Welcome;