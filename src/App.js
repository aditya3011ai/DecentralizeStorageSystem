import "./App.css";
import AppContract from "./artifacts/contracts/AppContract.sol/AppContract.json";
import Backgound from "./components/BackGround/Background"; 
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Modal from "./components/modal/Modal";
import FileUpload from "./components/fileupload/FileUpload";
import Display from "./components/display/Display";
import Icon from '../src/sources/blockchain.png'

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contractAddress = "0x41189854e309BD621aF826416572f4138BBc8347";

        const contract = new ethers.Contract(
          contractAddress,
          AppContract.abi,
          signer
        );

        setContract(contract);
        setProvider(provider);
      } else {
        console.error("MetaMaks is not insalled");
        
      }
    };
    provider && loadProvider();
  }catch{
    console.error("MetaMaks is not Installed")
  }
  }, []);

  return (
    <>
      {!openModal && (
        <button className="share" onClick={() => setOpenModal(true)}>
          Share
        </button>
      )}
      {openModal && <Modal setOpenModal={setOpenModal} contract={contract} />}
      <div className="App">
        <img src={Icon} className="icon" alt="logo"></img>
        <h1 style={{ color: "white" }} className="bg-heading">
          Cloud Storage 3.0
        </h1>
        <div className="bg"></div>
        <p style={{ color: "white" }} className="accountDisplay">
          Account :-
        </p>
        <p style={{ color: "white" }}>
        {account ? account : "Not Connected"}
        </p>
        {provider?
        <>
        <FileUpload provider={provider} contract={contract} account={account} />
        <Display contract={contract} account={account} />
        </>:<h1 style={{color:"red", fontSize:"34px",fontFamily:"monospace"}}>Please Connect MetaMask to Continue</h1>}
        <Backgound className="background1" />
      </div>
    </>
  );
}

export default App;
