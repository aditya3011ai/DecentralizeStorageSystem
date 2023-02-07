import { useState } from "react";
import "./display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  
  const getData = async () => {
    let dataArray;
    const otherAddress = document.querySelector(".address").value;
    try {
      if (otherAddress) {
        dataArray = await contract.displayImages(otherAddress);
      } else {
        dataArray = await contract.displayImages(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    try {
      const isEmpty = Object.keys(dataArray).length === 0;

      if (!isEmpty) {
        function formatSizeUnits(bytes) {
          if (bytes >= 1073741824) {
            bytes = (bytes / 1073741824).toFixed(2) + " GB";
          } else if (bytes >= 1048576) {
            bytes = (bytes / 1048576).toFixed(2) + " MB";
          } else if (bytes >= 1024) {
            bytes = (bytes / 1024).toFixed(2) + " KB";
          } else if (bytes > 1) {
            bytes = bytes + " bytes";
          } else if (bytes === 1) {
            bytes = bytes + " byte";
          } else {
            bytes = "0 bytes";
          }
          return bytes;
        }

        const list = (
          <>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {dataArray.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <a
                          href={item[0]}
                          key={i}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item[1]}
                        </a>
                      </td>
                      <td>
                        <a
                          href={item[0]}
                          key={i}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item[2]}
                        </a>
                      </td>
                      <td>
                        <a
                          href={item[0]}
                          key={i}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {formatSizeUnits(item[3])}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        );
        setData(list);
      } else {
        alert("No image To Display");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {data?<p style={{color:"white", fontSize:"15px"}} >*Click the name to see your files</p>:""}
      <div className="tableContainer">{data}</div>
      <input type="text" className="address" placeholder="Enter address" />
      <button className="button center" onClick={getData}>
        Get Data
      </button>
    </>
  );
};

export default Display;
