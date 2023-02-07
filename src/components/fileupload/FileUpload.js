import React from "react";
import axios from "axios";
import "./fileupload.css";
import { useState } from "react";

const FileUpload = ({ account, provider, contract }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No Image Selected");
  const [fileType, setFileType] = useState("Not Supported");
  const [fileSize, setFileSize] = useState("0");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "6b5c651f860eaf23ff72",
            pinata_secret_api_key:
              "dc333906aefdd9c4f5796e994e8da3dbd3a4189cf56d1cb627a43488797a702d",
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        const signer = contract.connect(provider.getSigner());
        signer.add(account,ImgHash, fileName,fileType,fileSize.toString());
      } catch (e) {
        setFileName("No image selected");
        setFile(null);
        console.log(e);
        return alert("Unable to upload image to Pinata");
      }
    }
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
       setFileName(data.name.split(".")[0]);
       setFileSize(data.size);
       setFileType(data.type.split("/")[1]);
    };
    e.preventDefault();
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image :{fileName} </span>
        <button type="submit" className="upload" disabled={!file}>
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
