import type { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import PaymentRequest from './paymentRequest';
import Link from "next/link";

const Home: NextPage = () => {
  const searchParams = useSearchParams();

  const to_addres = searchParams.get("to");
  const amount_in_lovelace = searchParams.get("a");

  const pay_mode = to_addres != null && amount_in_lovelace != null;

  return (
    <>
      {!pay_mode && (
        <>
          <h1>zoofpay</h1>
          <p>Easily create payment request for cardano.</p>
          <Link href="/new">Create payment request</Link>
          <h1>What is zoofpay?</h1>
          <h1>Why zoofpay?</h1>
          <h3>Easier</h3>
          <h3>Safer</h3>
          <h3>Faster</h3>
          <h3>Transparent</h3>
          <h3>0% fees</h3>
          <h3>Accessible</h3>
        </>
      )}
      {pay_mode && (
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
