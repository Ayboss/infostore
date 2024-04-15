"use client";
import { useState } from "react";
import Mainpage from "./components/Mainpage";
import Sending from "./components/Sending";
import Receiving from "./components/Receiving";
import MainpageReceiving from "./components/MainpageReceiving";

export default function Home() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [parcelinfo, setParcelsinfo] = useState({});
  if (step == 0) {
    return <Mainpage setStep={setStep} />;
  }
  if (step == 1) {
    return <Sending />;
  }
  if (step == 2) {
    return (
      <MainpageReceiving setParcelsinfo={setParcelsinfo} setStep={setStep} />
    );
  }
  if (step == 3) {
    return <Receiving setStep={setStep} parcelinfo={parcelinfo} />;
  }
  return <Mainpage />;
}
