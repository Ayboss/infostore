import Image from "next/image";
import React, { InputHTMLAttributes, useState } from "react";
import attach from "../../../public/attach.svg";
import httprequest from "../httprequest";
import fileimg from "../../../public/file.svg";
import textimg from "../../../public/text.svg";

function Sending() {
  const [text, setText] = useState("");
  const [allText, setallText] = useState<string[]>([]);
  const [allMedia, setAllMedia] = useState<(File | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const handleAddToQueue = () => {
    if (text == "") {
      return;
    }
    setallText([...allText, text]);
    setText("");
  };
  const handleFileStorage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    console.log(files);
    if (files && files.length > 0) {
      const newarr = Array.from(files);
      console.log(newarr);
      setAllMedia([...allMedia, ...newarr]);
    }
  };

  const handleSubmit = async () => {
    if (allText.length == 0 && allMedia.length == 0) {
      return;
    }
    try {
      const formdata = new FormData();
      for (let text of allText) {
        formdata.append("payload", text);
      }
      for (let media of allMedia) {
        console.log(media);
        if (media) {
          formdata.append("media", media as Blob);
        }
      }
      setLoading(true);
      const response = await httprequest.post("/parcel", formdata);
      console.log(response, "good");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="main">
      <div className="sendingarea dropareabackground">
        <div className="sendinggroup">
          <div className="sendingdiv">
            <h3 className="sendingtext">What package would you like to send</h3>
            <button className="shipout" onClick={handleSubmit}>
              {loading ? "loading..." : " SHIP OUT"}
            </button>
          </div>
          {/* DROP BOX */}
          <div className="dropboxarea ">
            <ul className="dropboxlist">
              {allText.map((txt) => (
                <li className="dropboxitem">
                  <Image
                    src={textimg}
                    alt="file"
                    className="dropboxitem__img"
                  />
                  <span>{txt}</span>
                </li>
              ))}
              {allMedia.map((file) => (
                <li className="dropboxitem">
                  <Image
                    src={fileimg}
                    alt="file"
                    className="dropboxitem__img"
                  />
                  {file && <span>{file?.name}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sendcontent">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="sendinginput"
            type="text"
          />
          <label htmlFor="file" className="sendinglabel">
            <input
              id="file"
              onChange={handleFileStorage}
              multiple
              className="sendingfile"
              type="file"
            />
            <Image className="sendingimage" src={attach} alt="file" />
          </label>
          <button onClick={handleAddToQueue} className="sendingbtn">
            send
          </button>
        </div>
      </div>
    </main>
  );
}

export default Sending;
