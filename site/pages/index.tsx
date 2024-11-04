import type { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import PaymentRequest from './paymentRequest';
import Link from "next/link";
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
        <Welcome />
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
