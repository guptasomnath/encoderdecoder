import React, { useContext } from "react";
import "./copykey.css";
import closeIcon from './close.png';
import { AppContext } from "../../App";

const CopyKey = () => {
const {dialog, setDialog} = useContext(AppContext);
const onCloeseIconClicked = () =>{
  const dialogUpdate = {
    ...dialog,
    display: false,
    setIconAni : ''
  }
  setDialog(dialogUpdate);
}
//This code for settings items start---

const keyLengthOptions = [];
keyLengthOptions.length = 0;
let i = 2;
while(i <= 25){
  keyLengthOptions.push(i.toString());
  i++;
}

const onOptionItemSelect = (e) => {

  const dialogUpdate = {
    ...dialog,
    keyLength : e.target.value
  }
  setDialog(dialogUpdate);

}

//This code for settings items end---

 const copyToClipboard = () => {
    const element = document.createElement('a');
    const textFIle = new Blob([dialog.copyKey], {
      type : "text/plain;charset=utf-8"
    });

    element.href = URL.createObjectURL(textFIle);
    element.download = "secretkey.txt";
    document.body.appendChild(element);
    element.click();
 }
  return (
    <div style={{display : dialog.display == true ? 'flex' : 'none'}} className="popUpDialog">
      <div className="dialogBody">
        <div className="dialogHead">
          <label>{dialog.whichDialog}</label>
          <img onClick={onCloeseIconClicked} src={closeIcon} />
        </div>
        <div className="dialogContent">
           <button style={{display: dialog.whichDialog == 'Settings' ? 'none' : 'block'}} onClick={copyToClipboard}>Download Key</button>

           {/*This is the settings items*/}
           <div style={{display: dialog.whichDialog == 'Settings' ? 'block' : 'none'}} className="keyLengthDiv">
            <label>Per Key Length</label>
            <select onChange={onOptionItemSelect} value = {dialog.keyLength} className="keyLengthSelector">
              {keyLengthOptions.map((value, index) => {
                 return( 
                 <option className="LengthOptions" key={`keyLengthOptions${index}`} value={value}>
                    {value}
                  </option>
                 );
              })}
            </select>
          </div>

        </div>
      </div>
    </div>
  );
};
export default CopyKey;
