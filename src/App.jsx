import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hammasi from "./Companent/Hammasi";
import Nav from "./Companent/Nav";
import Saitbar from "./Companent/Saitbar";
import LoginPage from "./Produkt/LoginPage";
import useMyStor from "./my-stor";

function App() {
  const [saitBar, setSetsaitBar] = useState(false);
  const saitbars = () => {
    setSetsaitBar(!saitBar);
  };

  const authState = useMyStor()
  return (
    <>
      {authState.token ? (
        <>
          <Nav saitBar={saitBar} saitbars={saitbars} />
          <div className=" flex ">
            <Saitbar saitBar={saitBar} />
            <Hammasi />
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
