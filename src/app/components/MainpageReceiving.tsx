import React, { useState } from "react";
import httprequest from "../httprequest";

function MainpageReceiving({ setParcelsinfo, setStep }: any) {
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await httprequest.get(`/parcel/${passcode}`);
      setParcelsinfo(data.data);
      setStep(3);
    } catch (err) {
      console.log(err);
      setErr("package such code does not exist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <div className="buttons">
        <div className="formgroup">
          <label className="label">Package passcode</label>
          <input
            type="text"
            onChange={(e) => setPasscode(e.target.value)}
            value={passcode}
            className="passcodeinput"
          />
          {err && <p className="err">{err}</p>}
        </div>
        <button className="receivebtn" onClick={handleSubmit}>
          {loading ? "loading..." : "RECEIVE INFORMATION"}
        </button>
      </div>
    </main>
  );
}

export default MainpageReceiving;
