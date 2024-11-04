import type { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import PaymentRequest from './paymentRequest';
import Feature from "./feature";
import Welcome from "./welcome";

const Home: NextPage = () => {
  const searchParams = useSearchParams();

  const to_addres = searchParams.get("to");
  const amount_in_lovelace = searchParams.get("a");

  const pay_mode = to_addres != null && amount_in_lovelace != null;

  return (
    <>
      {!pay_mode && (
        <>
          <Welcome />
          <Feature
            title="Easy"
            content="With Zoofpay, there's no need to manually enter an address. Connect your wallet, sign the transaction, and you're all set."
            right={false}
          />
          <Feature
            title="Reduce Errors"
            content="Zoofpay minimizes the risk of mistakes by automating the payment process, allowing you to avoid copy-paste errors and manual address entries."
            right={true}
          />
          <Feature
            title="Fast"
            content="Say goodbye to copying addresses or double-checking amounts. With Zoofpay, your payment is a click away."
            right={true}
          />
          <Feature
            title="Transparent"
            content="Zoofpay is free and open-source, perfectly aligned with the transparent nature of the Cardano blockchain. Verify transactions on Cardanoscan and review our source code yourself."
            right={false}
          />
          <Feature
            title="0% Fees"
            content="Zoofpay charges zero fees. You can optionally donate 2 ADA when making a payment, but the choice is yours."
            right={true}
          />
          <Feature
            title="Accessible"
            content="Zoofpay is designed for accessibility, making it possible for everyone, including screen reader users, to send ADA with ease."
            right={false}
          />
          <Feature
            title="Increase Adoption"
            content="By simplifying transactions, Zoofpay makes Cardano more accessible, supporting its growth and encouraging adoption across a broader audience."
            right={false}
          />
        </>
      )}
      {
        pay_mode && (
          <>
            <div className="center-horizontal">
              <PaymentRequest to_addres={to_addres} amount_in_lovelace={amount_in_lovelace} />
            </div>
          </>
        )
      }
    </>
  );
};

export default Home;
