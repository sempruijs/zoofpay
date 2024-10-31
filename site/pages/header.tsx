import type { NextPage } from "next";
import Link from "next/link";

const Header: NextPage = () => {
    return (
        <nav className="center-text">
            <Link href="/">
                <p>
                    zoofpay
                </p>
            </Link>
        </nav>
    );
};

export default Header;