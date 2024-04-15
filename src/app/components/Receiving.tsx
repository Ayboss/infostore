import React from "react";
import fileimg from "../../../public/file.svg";
import textimg from "../../../public/text.svg";
import downloadimg from "../../../public/download.svg";
import copyimg from "../../../public/copy.svg";
import Image from "next/image";
import copy from "copy-to-clipboard";

function Receiving({ setStep, parcelinfo }: any) {
  console.log(parcelinfo);
  const copytoclip = (txt: string) => {
    copy(txt);
  };
  return (
    <main className="main">
      <div className="receiveingarea">
        <h3 className="receivingtext">Your Packages</h3>

        <div className="dropboxarea ">
          <ul className="dropboxlist">
            {parcelinfo.text.map((txt: string) => (
              <li className="dropboxitem">
                <Image src={textimg} alt="file" className="dropboxitem__img" />
                <span className="dropboxitem__span">{txt}</span>
                <Image
                  src={copyimg}
                  onClick={() => copytoclip(txt)}
                  alt="file"
                  className="dropboxitem__img"
                  style={{ cursor: "pointer" }}
                />
              </li>
            ))}
            {parcelinfo.media.map((file: string) => (
              <li className="dropboxitem">
                <Image src={fileimg} alt="file" className="dropboxitem__img" />
                {file && <span className="dropboxitem__span">{file}</span>}
                <a
                  href={file}
                  download={true}
                  target="_blank"
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={downloadimg}
                    alt="file"
                    className="dropboxitem__img"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Receiving;
