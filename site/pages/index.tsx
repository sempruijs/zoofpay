import type { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import LinkBuilder from './linkBuilder';
import PaymentRequest from './paymentRequest';
// import { get } from "http";

const Home: NextPage = () => {
  const searchParams = useSearchParams();

  const to_addres = searchParams.get("to");
  const amount_in_lovelace = searchParams.get("a");

  const pay_mode = to_addres != null && amount_in_lovelace != null;

  return (
    <>
      {!pay_mode && (
        <>
          <div className="center-horizontal">
            <LinkBuilder />
          </div>
        </>
      )}
      {pay_mode && (
        <>
          <PaymentRequest to_addres={to_addres} amount_in_lovelace={amount_in_lovelace} />
        </>
      )}
    </>
  );
};

export default Home;
