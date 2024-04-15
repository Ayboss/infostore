import React from "react";

function Mainpage({ setStep }: any) {
  return (
    <main className="main">
      <div className="buttons">
        <button
          className="sendbtn"
          onClick={() => {
            setStep(1);
          }}
        >
          SEND INFORMATION
        </button>
        <button
          onClick={() => {
            setStep(2);
          }}
          className="receivebtn"
        >
          RECEIVE INFORMATION
        </button>
      </div>
    </main>
  );
}

export default Mainpage;
