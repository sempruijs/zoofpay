import type { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import PaymentRequest from './paymentRequest';
import Welcome from "./welcome";
import WhyZoofpay from "@/whyZoofpay";
import WhatIsZoofpay from "./whatIsZoofpay";

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
          <WhatIsZoofpay />
          <WhyZoofpay />
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
