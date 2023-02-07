import { useEffect } from "react";
import "./modal.css";

const Modal = ({ setOpenModal, contract }) => {
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccessList();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  const share = async () => {
    const address = document.querySelector(".address").value;
    if (address == "") {
      alert("Please enter the address");
    } else {
      await contract.allowAccess(address);
      setOpenModal(false);
    }
  };
  const dissAllow = async () => {
    const address = document.querySelector(".address").value;
    if (address == 0) {
      alert("Please select the address");
    } else {
      await contract.disAllowAccess(address);
      setOpenModal(false);
    }
  };
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address" value="0">
                People With Access
              </option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => dissAllow()}>Disallow</button>
            <button onClick={() => share()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
