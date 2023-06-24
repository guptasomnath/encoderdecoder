import React, { createContext, useState } from "react";
import "./App.css";
import Home from "./comps/home/home";
import CopyKeyDialog from "./comps/dialogs/copykey";
import Loading from "./comps/loadingProgress/Loading";
export const AppContext = createContext(null);

function App() {
const [dialog, setDialog] = useState({
  display : false,
  copyKey : '',
  whichDialog : 'Save It In Secret',
  keyLength : 5,
  setIconAni : '',
  loadingDisplay : "none"
});


  return (
    <AppContext.Provider value={{dialog: dialog, setDialog : setDialog}}>
    <div className="App">
      <CopyKeyDialog />
      <Loading />
      <Home />
    </div>
    </AppContext.Provider>
  );
}

export default App;
