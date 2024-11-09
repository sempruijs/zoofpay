import { NextPage } from "next";

interface DescriptionProps {
    description: string;
    lovelace: string;
    handle: string;
}

const Description: NextPage<DescriptionProps> = ({ handle, description, lovelace }) => {
    function lovelace_to_ada(x: string): string {
        const lovelace: number = parseInt(x, 10);
        const ada: number = lovelace / 1000000;
        return ada.toString();
    }

    return (
        <>
            <h1
                className="big-title"
            >
                Payment request</h1>
            <p
                style={{
                    fontSize: '30pt',
                    textAlign: 'center'
                }}
            >
                <b>
                    {
                        handle === "" ? "Someone" : ("$" + handle)
                    }
                </b>
                <div>
                    wants <b>
                        {lovelace_to_ada(lovelace)} ₳
                    </b>
                </div>
                {description !== "" && (
                    <div>
                        for <b>
                            {description}
                        </b>
                    </div>
                )}
            </p>
        </>
    )
};

export default Description;