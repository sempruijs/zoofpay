import type { NextPage } from "next";
import LinkBuilder from "./linkBuilder";
import EnterRecieveAddress from "./enterRecieveAddress";

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