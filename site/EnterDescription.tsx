import { NextPage } from "next";

interface EnterDescriptionProps {
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const EnterDescription: NextPage<EnterDescriptionProps> = ({ description, setDescription }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    return (
        <div>
            <h1 className="big-title">Enter optional description</h1>
            <input
                type="text"
                value={description}
                onChange={handleInputChange}
                placeholder="description"
            />
        </div>
    );


};


export default EnterDescription;