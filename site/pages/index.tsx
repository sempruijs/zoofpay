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
        <div style={{
          display: 'grid',
          gridTemplateColumns: '100vw',
          gridTemplateRows: '80vh 60vh 40vh 50vh 50vh 50vh 50vh'
        }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '100vw',
              gridTemplateRows: '60% 40%',
              textAlign: 'center',
              alignItems: 'center'
            }}
          >
            <div>
              <h1 style={{
                fontSize: '10vw',
                fontWeight: 'bolder'
              }}
              >
                zoofpay
              </h1>
              <p style={{
                fontSize: '3vw'
              }}
              >
                Easily create payment request for cardano.
              </p>
            </div>
            <Link href="/new">
              <p className="create-link-button">
                Create payment request
              </p>
            </Link>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '60% 40%',
              gridTemplateRows: '100%',
              alignItems: 'center',
              padding: '5%'
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: '5vw',
                  fontWeight: 'bold'
                }}
              >
                What is zoofpay?
              </h1>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor veniam eveniet repellat incidunt id nesciunt quo libero magnam praesentium, eum autem tenetur ut repudiandae sunt vero? Hic itaque numquam quas.</p>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              alignItems: 'center',
              justifyItems: 'center'
            }}
          >
            <h1 style={{
              fontSize: '6vw',
              fontWeight: 'bolder'
            }}>Why zoofpay?</h1>
          </div>
          <div
            style={{
              backgroundColor: 'purple'
            }}
          >
            <h3>Easier</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste magni ab dolorem. Ducimus iste velit itaque adipisci similique dolores. Voluptas, excepturi! Ullam, esse quaerat ea consequatur est vel provident dolore!</p>
          </div>
          <div
            style={{
              backgroundColor: 'yellow'
            }}
          >
            <h3>Safer</h3>
          </div>
          <h3>Faster</h3>
          <h3>Transparent</h3>
          <h3>0% fees</h3>
          <h3>Accessible</h3>
        </div >
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
