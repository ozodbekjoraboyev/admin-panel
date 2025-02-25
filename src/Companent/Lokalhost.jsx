import { Button } from "antd";
import React, { useState } from "react";

function Lokalhost() {
  const [count, setCount] = useState(Number(localStorage.getItem("joy")));
  console.log(Number(localStorage.getItem("joy")));

  return (
    <div>
      <Button
        onClick={() => {
          const saqlangan = count + 1;
          setCount(saqlangan);
          localStorage.setItem("joy", saqlangan);
        }}
      >
        oshrish ({count})
      </Button>{" "}
      <Button
        onClick={() => {
          localStorage.clear();
        }}
      >
        o'chrish
      </Button>
    </div>
  );
}

export default Lokalhost;
