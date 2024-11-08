import { NextPage } from "next";

interface CheckboxProps {
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    content: String;
}

const Checkbox: NextPage<CheckboxProps> = ({ state, setState, content }) => {
    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.checked); // Update based on current checkbox state
    };

    return (
        <label>
            <input
                type="checkbox"
                checked={state}
                onChange={handleToggle}
            />
            {content}
        </label>
    );
};

export default Checkbox;
