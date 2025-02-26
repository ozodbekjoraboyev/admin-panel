import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Produkt/Home";
import Categori from "../Produkt/Categori";
import Produkt from "../Produkt/Produkt";
import Ijaralar from "../Produkt/Ijaralar";
import UserPeg from "../Produkt/UserPeg";

function Hammasi() {
  return (
    <div className="flex w-full">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mahsulotlar" element={<Categori />} />
        <Route path="/kategores" element={<Produkt />} />
        <Route path="/ijaralar" element={<Ijaralar />} />
        <Route path="/userpeg" element={<UserPeg />} />
      </Routes>
    </div>
  );
}

export default Hammasi;
