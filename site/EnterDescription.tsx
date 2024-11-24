import { NextPage } from "next";
import NextButton from "./pages/nextButton";

interface EnterDescriptionProps {
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const EnterDescription: NextPage<EnterDescriptionProps> = ({ description, setDescription }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(encodeURIComponent(event.target.value));
    };

    function getRandomSubject(): string {
        const subjects = [
            "pizza 🍕",
            "vacation 🏖️",
            "ice cream 🍦",
            "lunch 🍔",
            "movie tickets 🎟️",
            "concert 🎸",
            "coffee ☕",
            "groceries 🛒",
            "gas ⛽",
            "gym 🏋️",
            "birthday gift 🎂",
            "snacks 🍿"
        ];
        const randomIndex = Math.floor(Math.random() * subjects.length);
        return subjects[randomIndex];
    }

    return (
        <>
            <h1
                className="big-title"
            >
                Enter optional description
            </h1>
            <input
                type="text"
                value={decodeURIComponent(description)}
                onChange={handleInputChange}
                placeholder={getRandomSubject()}
                style={{
                    width: `${description.length}ch`,
                    minWidth: '10ch',
                    height: '80pt',
                    fontSize: '30pt',
                    textAlign: 'center',
                    outline: 'none',
                    border: 'none'
                }}
            />
        </>
    );


};


export default EnterDescription;