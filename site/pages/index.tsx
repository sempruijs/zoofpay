import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import { Transaction } from '@meshsdk/core';
import { useSearchParams } from "next/navigation";
import LinkBuilder from './linkBuilder';
import PaymentRequest from './paymentRequest';
// import { get } from "http";

const Home: NextPage = () => {
  const { connected, wallet } = useWallet();

  const searchParams = useSearchParams();

  const to_addres = searchParams.get("to");
  const amount_in_lovelace = searchParams.get("a");

  const pay_mode = to_addres != null && amount_in_lovelace != null;



  return (
    <>
      {!pay_mode && (
        <>
          <LinkBuilder />
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
