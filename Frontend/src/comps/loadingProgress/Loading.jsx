import React, {useContext} from "react";
import "./Loading.css";
import { AppContext } from "../../App";

function Loading() {
  const {dialog, setDialog} = useContext(AppContext);
  return (
    <div style={{display : dialog.loadingDisplay}} className="loaderParent">
      <div className="loaderChild"></div>
    </div>
  );
}

export default Loading;
