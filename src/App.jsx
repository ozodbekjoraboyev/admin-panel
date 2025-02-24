import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hammasi from "./Companent/Hammasi";
import Nav from "./Companent/Nav";
import Saitbar from "./Companent/Saitbar";

function App() {
  const [saitBar, setSetsaitBar] = useState(false);
  const saitbars = () => {
    setSetsaitBar(!saitBar);
  };
  return (
    <>
        <Nav saitBar={saitBar} saitbars={saitbars} />
      <div className=" flex container m-auto">
        <Saitbar saitBar={saitBar} />
        <Hammasi />
      </div>
    </>
  );
}

export default App;
