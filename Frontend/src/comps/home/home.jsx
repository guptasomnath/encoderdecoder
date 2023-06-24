import React, { useRef, useContext } from "react";
import "./home.css";
import axios from "axios";
import { AppContext } from "../../App";
import SettingIcon from "./settings.svg";

const Home = () => {
  const { dialog, setDialog } = useContext(AppContext);
  const hostUrl = "";
  let hashKey = dialog.copyKey;
  const handleUploadKey = () => {
    //when button clicked file picker will arrived
    document.querySelector(".input-field").click();
  };

  const loadingDialog = (display) => {
    const dialogUpdate = {
      ...dialog, 
      loadingDisplay : display
    }
    setDialog(dialogUpdate);
  }

  const onFilePicked = (e) => {
    //after file picker picked i am read the picked file content and store in a variable

    const file = e.target.files;
    if (file[0].type == "text/plain") {
      //create a new file reader instant
      let reader = new FileReader();
      reader.readAsText(file[0]);
      reader.onload = (e) => {
        //store readed file in a variable
        hashKey = e.target.result;
      };
      return;
    }

    alert("Pick The Correct File");
  };

  const handleGenerateKey = async () => {
    //hit the api of generate new hash code key
    loadingDialog('flex');
      try {

        const response = await axios.get(hostUrl + "/chl/" + dialog.keyLength);
  
        if (response.data.isSuccess) {
          hashKey = response.data.hashCodeKey;
          const dialogUpdate = {
            ...dialog, 
            display : true, 
            copyKey: hashKey,
            whichDialog : 'Save It In Secret',
            loadingDisplay : 'none'
          }
          setDialog(dialogUpdate);
  
        } else {
          loadingDialog('none');
          alert(response.data.message);
        }
      } catch (err) {
        loadingDialog('none');
        alert(err);
      }

  }

  const encodeRef = useRef(null);
  const handleEncodeText = async () => {
    //send a post request for encoding text
    loadingDialog('flex');
    try {
      const response = await axios.post(hostUrl + "/encode", {
        text: encodeRef.current.value,
        key: hashKey,
      });

      if (response.data.isSuccess) {
        decodeRef.current.value = response.data.encodeText;
        loadingDialog('none');
      } else {
        loadingDialog('none');
        alert(response.data.message);
      }
    } catch (err) {
      loadingDialog('none');
      alert(err);

    }
  };

  const decodeRef = useRef(null);
  const handleDecodeText = async () => {
  //send a post request for decodeing text
  loadingDialog('flex');
    try {
      const response = await axios.post(hostUrl + "/decode", {
        hashcode: decodeRef.current.value,
        key: hashKey,
      });

      if (response.data.isSuccess) {
        encodeRef.current.value = response.data.decodeText;
        loadingDialog('none');
      } else {
        loadingDialog('none');
        alert(response.data.message);
      }
    } catch (err) {
      loadingDialog('none');
      alert(err);
    }

  };

  const handleSetting = () => {
    //on click setting icon || show a popup
    const dialogUpdate = {
      ...dialog,
      display: true,
      whichDialog : "Settings",
      setIconAni :  "rotate 0.5s ease-in"
    }
    setDialog(dialogUpdate);

  };

  return (
    <section className="HomePage">
      <h1>Secure Text Encryptor and Decryptor</h1>
      <div className="keyGeneratorDiv">
        <button onClick={handleUploadKey} className="buttonDesign">
          Upload Key
        </button>
        <input
          onChange={(e) => onFilePicked(e)}
          style={{ display: "none" }}
          accept="text/*"
          type="file"
          className="input-field"
        />
        <button onClick={handleGenerateKey} className="buttonDesign">
          Generate Key
        </button>
        <img
          style={{ animation: dialog.setIconAni }}
          onClick={handleSetting}
          className="settingIcon"
          src={SettingIcon}
        />
      </div>
      <div className="encodeDecodeDiv">
        <div className="encodeDiv textFildDivDesign">
          <input ref={encodeRef} type="text" placeholder="Your text" />
          <button onClick={handleEncodeText} className="buttonDesign">
            Encode
          </button>
        </div>
        <div className="decodeDiv textFildDivDesign">
          <input ref={decodeRef} type="text" placeholder="Your encoded text" />
          <button onClick={handleDecodeText} className="buttonDesign">
            Decode
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
