import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

const Header: NextPage = () => {
    return (
        <nav>
            <Link href="/">
                <p className="nav-title">
                    zoofpay
                </p>
            </Link>
            <Link href="https://github.com/sempruijs/zoofpay" aria-label="GitHub repository" target="_blank">
                <Image src="" alt="github repository" width={40} height={40} className="github-logo" />
            </Link>
        </nav>
    );
};

export default Header;