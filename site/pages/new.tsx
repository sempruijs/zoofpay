import type { NextPage } from "next";
import LinkBuilder from "./linkBuilder";

const New: NextPage = () => {
    return (
        <>
            <div className="center-horizontal">
                <LinkBuilder />
            </div>
        </>
    );
};

export default New;