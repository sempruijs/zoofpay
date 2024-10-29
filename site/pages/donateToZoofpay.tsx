import { NextPage } from "next";

interface DonateToZoofpayProps {
    donate: boolean;
    setDonate: React.Dispatch<React.SetStateAction<boolean>>;
}

const DonateToZoofpay: NextPage<DonateToZoofpayProps> = ({ donate, setDonate }) => {
    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDonate(event.target.checked); // Update based on current checkbox state
    };

    return (
        <label>
            <input
                type="checkbox"
                checked={donate}
                onChange={handleToggle}
            />
            Donate 2 ada to zoofpay ❤️
        </label>
    );
};

export default DonateToZoofpay;
